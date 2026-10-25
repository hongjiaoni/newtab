import { describe, expect, test } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createLocalStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    }
  };
}

function createSupabaseMock(options = {}) {
  const calls = [];
  const missingTables = new Set(options.missingTables || []);

  const resultFor = (table) => {
    if (missingTables.has(table)) {
      return { data: null, error: { code: '42P01', message: `relation "${table}" does not exist` } };
    }
    return { data: null, error: null };
  };

  const makeBuilder = (table) => {
    const builder = {
      table,
      select(columns) {
        calls.push({ op: 'select', table, columns });
        return builder;
      },
      eq(column, value) {
        calls.push({ op: 'eq', table, column, value });
        return builder;
      },
      single() {
        calls.push({ op: 'single', table });
        return Promise.resolve(resultFor(table));
      },
      upsert(rows, opts) {
        calls.push({ op: 'upsert', table, rows, opts });
        return Promise.resolve(resultFor(table));
      },
      insert(rows) {
        calls.push({ op: 'insert', table, rows });
        return Promise.resolve(resultFor(table));
      },
      delete() {
        calls.push({ op: 'delete', table });
        return builder;
      }
    };
    return builder;
  };

  return {
    calls,
    rpc(name, payload) {
      calls.push({ op: 'rpc', name, payload });
      return Promise.resolve({
        data: null,
        error: options.rpcError || { code: '42883', message: 'function sync_home_config(jsonb) does not exist' }
      });
    },
    from(table) {
      return makeBuilder(table);
    }
  };
}

function loadDataSync(options = {}) {
  const localStorage = createLocalStorage();
  const supabase = createSupabaseMock(options.supabase || {});
  const notifications = [];
  const context = {
    console,
    setInterval: () => 1,
    clearTimeout,
    setTimeout,
    Date,
    Math,
    Promise,
    JSON,
    String,
    Number,
    Map,
    Object,
    Array,
    RegExp,
    localStorage,
    navigator: { onLine: true },
    document: {
      hidden: false,
      addEventListener() {},
      body: {
        classList: {
          contains(value) {
            return value === 'light';
          }
        }
      }
    },
    i18n: { currentLocale: 'zh', t: (key) => key },
    state: {
      viewMode: 'general',
      engineIndex: 0,
      engineId: 'google',
      enabledEngineIds: ['google'],
      dateFormatIndex: 0,
      timeFormat: '24h',
      sites: [
        { id: 'default-0', name: 'GitHub', url: 'https://github.com', tags: ['dev'], showOnHome: true }
      ],
      tags: ['dev'],
      tagOrder: ['dev'],
      siteOrder: ['default-0']
    },
    supabase,
    window: {
      supabase,
        authState: { isLoggedIn: true, user: { id: '11111111-1111-4111-8111-111111111111' } },
      appearance: 'dark',
      appliedAppearance: [],
      getAppearance() {
        return this.appearance;
      },
      setAppearance(mode, opts) {
        this.appliedAppearance.push({ mode, opts });
      },
      wallpaperState: { selectedWallpaper: '#123456' },
      showNotification(message, type) {
        notifications.push({ message, type });
      },
      addEventListener() {},
      renderHome() {},
      renderSearchEngine() {},
      updateTime() {}
    }
  };
  context.globalThis = context;
  context.window.window = context.window;
  context.window.localStorage = localStorage;
  context.window.document = context.document;

  vm.createContext(context);
  const source = fs.readFileSync(path.join(__dirname, '..', 'public', 'data-sync.js'), 'utf8');
  vm.runInContext(source, context, { filename: 'public/data-sync.js' });

  return { context, supabase, localStorage, notifications };
}

async function testHomeSaveFallsBackAndNormalizesSiteIds() {
  const { context, supabase, notifications } = loadDataSync();

  await context.window.saveUserDataToBackend(true);

  expect(notifications, 'home save should not show save failed notification').toHaveLength(0);
  expect(supabase.calls.some((call) => call.op === 'rpc' && call.name === 'sync_home_config')).toBe(true);
  expect(supabase.calls.some((call) => call.op === 'upsert' && call.table === 'user_home_settings')).toBe(true);

  const siteInsert = supabase.calls.find((call) => call.op === 'insert' && call.table === 'user_sites');
  expect(siteInsert, 'fallback should insert sites').toBeTruthy();
  expect(siteInsert.rows[0].id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}

async function testOptionalTablesCanBeMissing() {
  const { context, supabase, notifications } = loadDataSync({
    supabase: { missingTables: ['user_site_tags', 'user_site_order', 'user_tag_order'] }
  });

  await context.window.saveUserDataToBackend(true);

  expect(notifications, 'missing optional tables should not fail the entire save').toHaveLength(0);
  expect(supabase.calls.some((call) => call.op === 'upsert' && call.table === 'user_home_settings')).toBe(true);
  expect(supabase.calls.some((call) => call.op === 'insert' && call.table === 'user_sites')).toBe(true);
}

async function testAppearanceIsSavedAndNotThemeTables() {
  const { context, supabase, notifications } = loadDataSync();

  await context.window.saveUserDataToBackend(true);

  expect(notifications).toHaveLength(0);
  const homeUpsert = supabase.calls.find((call) => call.op === 'upsert' && call.table === 'user_home_settings');
  expect(homeUpsert.rows.color_mode).toBe('dark');
  expect(homeUpsert.rows.theme).toBe('glass');
  expect(supabase.calls.some((call) => call.table === 'user_theme_settings' || call.table === 'user_font_settings')).toBe(false);
}

async function testLegacyColorModeMapsToAppearance() {
  const { context } = loadDataSync();
  const uid = context.window.authState.user.id;
  context.localStorage.setItem('lastAuthUid', uid);
  context.localStorage.setItem('user_home_config_' + uid, JSON.stringify({ settings: { appearance: 'light' } }));

  context.window.hydrateCachedConfigFromLastUser();

  expect(context.window.appliedAppearance).toEqual([{ mode: 'light', opts: { sync: false } }]);
}

describe('data sync fallback', () => {
  test('falls back to table sync and normalizes legacy site ids', testHomeSaveFallsBackAndNormalizesSiteIds);
  test('keeps saving when optional sync tables are missing', testOptionalTablesCanBeMissing);
  test('saves appearance to color_mode and skips retired theme tables', testAppearanceIsSavedAndNotThemeTables);
  test('applies cached appearance without re-syncing', testLegacyColorModeMapsToAppearance);
});


