import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = fs.readFileSync(path.join(__dirname, '..', 'public', 'script.js'), 'utf8');

// Extract a top-level `function name(...) { ... }` block by balanced braces,
// skipping strings, template literals and comments.
function extractFunction(src, name) {
  const sig = `function ${name}(`;
  const start = src.indexOf(sig);
  if (start === -1) throw new Error(`function not found: ${name}`);
  let depth = 0;
  let i = start;
  let inStr = null;
  let inTmpl = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    const next = src[i + 1];
    if (inStr) {
      if (ch === '\\') i++;
      else if (ch === inStr) inStr = null;
      continue;
    }
    if (inTmpl) {
      if (ch === '\\') i++;
      else if (ch === '`') inTmpl = false;
      continue;
    }
    if (ch === '/' && next === '/') { i = src.indexOf('\n', i); if (i === -1) break; continue; }
    if (ch === '/' && next === '*') { const endC = src.indexOf('*/', i + 2); i = endC === -1 ? src.length : endC + 1; continue; }
    if (ch === '"' || ch === "'") { inStr = ch; continue; }
    if (ch === '`') { inTmpl = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  throw new Error(`unbalanced function: ${name}`);
}

const FUNCS = [
  'isValidSiteIcon',
  'getFaviconSources',
  'getSiteFaviconUrl',
  'loadFavicon',
  'getSiteInitial',
  'createFaviconIcon',
  'createFolderIcon',
  'createSiteTile',
  'tileRenderKey',
  'reconcileTiles',
  'getVisibleSites',
  'getFolderChildren',
  'renderHome',
  'getOpenFolder',
  'renderFolderPopup',
  'openFolder',
  'closeFolder',
  'commitFolderName',
  'migrateTagsToFolders',
  'openAddSiteModal',
  'addSitesToFolder',
  'mergeSitesIntoNewFolder',
  'moveSiteOutOfFolder',
  'deleteFolder',
  'applyZoomLevel',
];

function makeContext(initialState) {
  const contentEl = document.createElement('div');
  contentEl.className = 'content-area';
  document.body.innerHTML = `
    <div id="folderOverlay" class="hidden"><div class="folder-sheet">
      <input id="folderNameInput"><div id="folderGrid"></div><p id="folderHint"></p>
    </div></div>`;
  document.body.appendChild(contentEl);

  const context = {
    state: initialState,
    i18n: { t: (k) => k, currentLocale: 'zh' },
    localStorage: {
      _s: {},
      getItem(k) { return this._s[k] ?? null; },
      setItem(k, v) { this._s[k] = String(v); },
      removeItem(k) { delete this._s[k]; }
    },
    generateUuid: () => 'uuid-' + Math.random().toString(36).slice(2, 10),
    ZOOM_FACTORS: { '100': 0.9, '125': 1.125, '150': 1.35 },
    SITE_ICON_MAX_CHARS: 60000,
    contentEl,
    folderOverlay: document.getElementById('folderOverlay'),
    folderGrid: document.getElementById('folderGrid'),
    folderNameInput: document.getElementById('folderNameInput'),
    folderHint: document.getElementById('folderHint'),
    document,
    window,
    saveData: () => {},
    showContextMenu: () => {},
    handleDragStart: () => {},
    handleDragOver: () => {},
    handleDrop: () => {},
    handleDragEnd: () => {},
    dragState: { draggedId: null },
    homeRenderDeferred: false,
    updateSettingsMenu: () => {},
    showNotification: () => {},
    URL,
  };
  context.window.i18n = context.i18n;

  const code = FUNCS.map((f) => extractFunction(SCRIPT, f)).join('\n');
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

function site(id, name, url, overrides = {}) {
  return { id, name, url, showOnHome: true, tags: [], type: 'link', ...overrides };
}

describe('site tiles rendering', () => {
  let ctx;
  beforeEach(() => {
    ctx = makeContext({
      viewMode: 'general',
      zoomLevel: '100',
      openFolderId: null,
      sites: [
        site('a', 'Google', 'https://google.com'),
        site('b', 'Baidu', 'https://baidu.com'),
        { id: 'f1', name: 'Tools', url: '', showOnHome: true, tags: [], type: 'folder', children: ['a'] }
      ],
      siteOrder: ['a', 'f1', 'b'],
      tags: [],
      tagOrder: []
    });
  });

  it('renders favicon tiles with rounded icon + name', () => {
    ctx.renderHome();
    const tiles = ctx.contentEl.querySelectorAll('.site-tile.link-tile');
    expect(tiles.length).toBe(2);
    const img = tiles[0].querySelector('img.site-tile-favicon');
    expect(img).toBeTruthy();
    expect(img.src).toContain('google.com');
    expect(tiles[0].querySelector('.site-tile-name').textContent).toBe('Google');
    expect(tiles[0].querySelector('.site-tile-icon')).toBeTruthy();
  });

  it('keeps unchanged tiles when re-rendering (background sync does not reload icons)', () => {
    ctx.renderHome();
    const before = Array.from(ctx.contentEl.querySelectorAll('.site-tile'));
    ctx.state.sites = ctx.state.sites.map((s) => ({ ...s })); // same data, new objects
    ctx.renderHome();
    const after = Array.from(ctx.contentEl.querySelectorAll('.site-tile'));
    expect(after).toEqual(before);
    expect(after.every((t, i) => t === before[i])).toBe(true);

    ctx.state.sites.find((s) => s.id === 'a').name = 'Renamed';
    ctx.renderHome();
    const renamed = ctx.contentEl.querySelector('.site-tile[data-id="a"]');
    expect(renamed).not.toBe(before[0]);
    expect(renamed.querySelector('.site-tile-name').textContent).toBe('Renamed');
    expect(ctx.contentEl.querySelectorAll('.site-tile').length).toBe(before.length);
  });

  it('defers re-rendering while a tile is being dragged', () => {
    ctx.renderHome();
    ctx.dragState.draggedId = 'a';
    ctx.state.siteOrder = ['b', 'f1', 'a'];
    ctx.renderHome();
    expect(ctx.contentEl.querySelector('.site-tile').dataset.id).toBe('a');
    expect(ctx.homeRenderDeferred).toBe(true);
    ctx.dragState.draggedId = null;
    ctx.renderHome();
    expect(ctx.contentEl.querySelector('.site-tile').dataset.id).toBe('b');
    expect(ctx.contentEl.querySelectorAll('.site-tile').length).toBe(3);
  });

  it('renders folder tiles as a grid of member icons', () => {
    ctx.renderHome();
    const folderTile = ctx.contentEl.querySelector('.site-tile.folder-tile');
    expect(folderTile).toBeTruthy();
    const minis = folderTile.querySelectorAll('.folder-tile-icon .folder-mini');
    expect(minis.length).toBe(1);
    expect(minis[0].querySelector('img').src).toContain('google.com');
  });

  it('uses a valid custom icon first and ignores unsafe ones', () => {
    const png = 'data:image/png;base64,iVBORw0KGgo=';
    ctx.state.sites[0].customIcon = png;
    ctx.state.sites[1].customIcon = 'javascript:alert(1)';
    ctx.renderHome();
    const tiles = ctx.contentEl.querySelectorAll('.site-tile.link-tile');
    expect(tiles[0].querySelector('img').src).toBe(png);
    expect(tiles[0].querySelector('.site-tile-icon').classList.contains('has-custom-icon')).toBe(true);
    expect(tiles[1].querySelector('img').src).toContain('baidu.com');
    // the folder (child 'a') shows the custom icon too
    expect(ctx.contentEl.querySelector('.folder-mini img').src).toBe(png);
  });

  it('rejects oversized or non-image icons', () => {
    expect(ctx.isValidSiteIcon('https://example.com/icon.png')).toBe(true);
    expect(ctx.isValidSiteIcon('http://example.com/icon.png')).toBe(false);
    expect(ctx.isValidSiteIcon('data:text/html;base64,PGgxPg==')).toBe(false);
    expect(ctx.isValidSiteIcon('data:image/png;base64,' + 'A'.repeat(60000))).toBe(false);
  });

  it('falls back through favicon sources, then to the letter tile', () => {
    ctx.renderHome();
    const icon = ctx.contentEl.querySelector('.site-tile.link-tile .site-tile-icon');
    const img = icon.querySelector('img.site-tile-favicon');
    expect(img.src).toContain('google.com/s2/favicons');
    img.dispatchEvent(new Event('error'));
    expect(img.src).toContain('icons.duckduckgo.com');
    img.dispatchEvent(new Event('error'));
    expect(icon.querySelector('img')).toBeNull();
    expect(icon.classList.contains('is-letter')).toBe(true);
    expect(icon.querySelector('.site-tile-letter').textContent).toBe('G');
  });

  it('opens a folder as a centered window and closes it again', () => {
    ctx.renderHome();
    ctx.openFolder('f1');
    const overlay = document.getElementById('folderOverlay');
    expect(overlay.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('folderNameInput').value).toBe('Tools');
    expect(document.querySelectorAll('#folderGrid .site-tile.link-tile').length).toBe(1);
    // the home grid stays rendered underneath
    expect(ctx.contentEl.querySelectorAll('.site-tile.link-tile').length).toBe(2);

    document.getElementById('folderNameInput').value = 'Dev';
    ctx.closeFolder();
    expect(overlay.classList.contains('hidden')).toBe(true);
    expect(ctx.state.sites.find((s) => s.id === 'f1').name).toBe('Dev');
  });

  it('no longer renders tag chips', () => {
    ctx.state.tags = ['dev'];
    ctx.renderHome();
    expect(ctx.contentEl.querySelector('.chip')).toBeNull();
  });
});

describe('folder operations', () => {
  let ctx;
  beforeEach(() => {
    ctx = makeContext({
      viewMode: 'general',
      zoomLevel: '100',
      openFolderId: null,
      sites: [
        site('a', 'A', 'https://a.com'),
        site('b', 'B', 'https://b.com'),
        site('c', 'C', 'https://c.com'),
        { id: 'f1', name: 'Folder', url: '', showOnHome: true, tags: [], type: 'folder', children: ['a'] }
      ],
      siteOrder: ['a', 'f1', 'b', 'c'],
      tags: [],
      tagOrder: []
    });
  });

  it('merges a site into an existing folder', () => {
    ctx.addSitesToFolder('f1', ['b']);
    const folder = ctx.state.sites.find((s) => s.id === 'f1');
    expect(folder.children).toEqual(['a', 'b']);
    expect(ctx.state.siteOrder).not.toContain('b');
    expect(ctx.state.siteOrder).toContain('f1');
  });

  it('merges two sites into a new folder', () => {
    ctx.mergeSitesIntoNewFolder('b', 'c');
    const folder = ctx.state.sites.find((s) => s.type === 'folder' && s.id !== 'f1');
    expect(folder).toBeTruthy();
    expect(folder.children).toEqual(['b', 'c']);
    expect(ctx.state.siteOrder).not.toContain('b');
    expect(ctx.state.siteOrder).not.toContain('c');
    expect(ctx.state.siteOrder).toContain(folder.id);
  });

  it('moves a site out of a folder and shows it on home', () => {
    ctx.state.sites[0].showOnHome = false;
    ctx.state.openFolderId = 'f1';
    ctx.moveSiteOutOfFolder('a');
    const folder = ctx.state.sites.find((s) => s.id === 'f1');
    expect(folder.children).toEqual([]);
    expect(ctx.state.siteOrder).toContain('a');
    expect(ctx.state.sites[0].showOnHome).toBe(true);
  });

  it('turns tags into folders (first tag wins, foldered sites stay put)', () => {
    ctx.state.sites[0].tags = ['work'];          // 'a' is already in f1
    ctx.state.sites[1].tags = ['work', 'fun'];   // 'b'
    ctx.state.sites[2].tags = ['fun'];           // 'c'
    ctx.state.tags = ['fun', 'work'];
    ctx.state.tagOrder = ['work', 'fun'];
    expect(ctx.migrateTagsToFolders()).toBe(true);
    const work = ctx.state.sites.find((s) => s.type === 'folder' && s.name === 'work');
    const fun = ctx.state.sites.find((s) => s.type === 'folder' && s.name === 'fun');
    expect(work.children).toEqual(['b']);
    expect(fun.children).toEqual(['c']);
    expect(ctx.state.siteOrder).toEqual(['a', 'f1', work.id, fun.id]);
    expect(ctx.state.tags).toEqual([]);
    expect(ctx.state.sites.every((s) => !s.tags || s.tags.length === 0)).toBe(true);
    expect(ctx.migrateTagsToFolders()).toBe(false); // idempotent
  });

  it('deletes a folder and moves children back home', () => {
    ctx.deleteFolder('f1');
    expect(ctx.state.sites.find((s) => s.id === 'f1')).toBeUndefined();
    expect(ctx.state.siteOrder).toContain('a');
    expect(ctx.state.siteOrder.indexOf('a')).toBeLessThan(ctx.state.siteOrder.indexOf('b'));
  });

  it('applies zoom level to documentElement', () => {
    ctx.applyZoomLevel('125', true);
    expect(ctx.state.zoomLevel).toBe('125');
    expect(ctx.localStorage.getItem('zoomLevel')).toBe('125');
    expect(ctx.document.documentElement.style.zoom).toBe('1.125');
    ctx.applyZoomLevel('999', true);
    expect(ctx.state.zoomLevel).toBe('100');
    expect(ctx.document.documentElement.style.zoom).toBe('0.9');
  });
});