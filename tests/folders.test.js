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
  'getVisibleSites',
  'getFolderChildren',
  'renderHome',
  'renderFolderView',
  'openFolder',
  'closeFolder',
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
  document.body.innerHTML = '';
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
    document,
    window,
    saveData: () => {},
    showContextMenu: () => {},
    handleDragStart: () => {},
    handleDragOver: () => {},
    handleDrop: () => {},
    handleDragEnd: () => {},
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

  it('renders folder view with back button when open', () => {
    ctx.state.openFolderId = 'f1';
    ctx.renderHome();
    expect(ctx.contentEl.querySelector('.folder-header')).toBeTruthy();
    expect(ctx.contentEl.querySelector('.folder-back-btn')).toBeTruthy();
    expect(ctx.contentEl.querySelectorAll('.site-tile.link-tile').length).toBe(1);
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

  it('moves a site out of a folder', () => {
    ctx.state.openFolderId = 'f1';
    ctx.moveSiteOutOfFolder('a');
    const folder = ctx.state.sites.find((s) => s.id === 'f1');
    expect(folder.children).toEqual([]);
    expect(ctx.state.siteOrder).toContain('a');
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