const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

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
      siteOrder: ['default-0'],
      currentTheme: 'comic'
    },
    supabase,
    window: {
      authState: { isLoggedIn: true, user: { id: '11111111-1111-4111-8111-111111111111' } },
      themeState: {
        currentTheme: 'comic',
        customSettings: {
          fontChinese: 'Test CN',
          fontEnglish: 'Test EN',
          bgColor: '#ffffff',
          darkMode: { bgColor: '#000000' }
        }
      },
      wallpaperState: { selectedWallpaper: '#123456' },
      showNotification(message, type) {
        notifications.push({ message, type });
      },
      addEventListener() {},
      renderHome() {},
      renderSearchEngine() {},
      updateTime() {},
      applyStyleTheme() {},
      applyCustomThemeForCurrentMode() {}
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

  assert.strictEqual(notifications.length, 0, 'home save should not show save failed notification');
  assert.ok(supabase.calls.some((call) => call.op === 'rpc' && call.name === 'sync_home_config'));
  assert.ok(supabase.calls.some((call) => call.op === 'upsert' && call.table === 'user_home_settings'));

  const siteInsert = supabase.calls.find((call) => call.op === 'insert' && call.table === 'user_sites');
  assert.ok(siteInsert, 'fallback should insert sites');
  assert.match(siteInsert.rows[0].id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}

async function testOptionalTablesCanBeMissing() {
  const { context, supabase, notifications } = loadDataSync({
    supabase: { missingTables: ['user_site_tags', 'user_site_order', 'user_tag_order'] }
  });

  await context.window.saveUserDataToBackend(true);

  assert.strictEqual(notifications.length, 0, 'missing optional tables should not fail the entire save');
  assert.ok(supabase.calls.some((call) => call.op === 'upsert' && call.table === 'user_home_settings'));
  assert.ok(supabase.calls.some((call) => call.op === 'insert' && call.table === 'user_sites'));
}

async function testThemeSaveFallsBackWhenThemeTablesAreMissing() {
  const { context, supabase, notifications } = loadDataSync({
    supabase: { missingTables: ['user_theme_settings', 'user_font_settings'] }
  });

  await context.window.saveThemeSettings({
    style: 'cyber',
    fontChinese: 'Test CN',
    fontEnglish: 'Test EN',
    bgColor: '#ffffff',
    borderColor: '#111111',
    darkMode: { bgColor: '#000000', borderColor: '#eeeeee' }
  });

  assert.strictEqual(notifications.length, 0, 'theme save should not show save failed notification');
  assert.ok(supabase.calls.some((call) => call.op === 'upsert' && call.table === 'user_home_settings'));
}

(async () => {
  await testHomeSaveFallsBackAndNormalizesSiteIds();
  await testOptionalTablesCanBeMissing();
  await testThemeSaveFallsBackWhenThemeTablesAreMissing();
  console.log('data-sync tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
