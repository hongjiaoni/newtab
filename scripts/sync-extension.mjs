#!/usr/bin/env node
// ===== NewTab Extension Sync & Build Script =====
// Single-source strategy: public/ is the only source of truth for app code.
// This script regenerates the shared files under extension/ and transforms
// index.html for the Chrome extension context (MV3 CSP, local vendor SDKs,
// adapter injection, stable asset paths).
//
// Usage:
//   node scripts/sync-extension.mjs build   # regenerate extension/ (default)
//   node scripts/sync-extension.mjs check   # verify extension/ is in sync, exit 1 if not
//   node scripts/sync-extension.mjs pack    # build + zip into dist/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const EXT_DIR = path.join(ROOT, 'extension');
const DIST_DIR = path.join(ROOT, 'dist');

// Files copied verbatim from public/ into extension/. Keep this list in
// sync with the script tags referenced by index.html.
export const COPY_FILES = [
  'appearance.js',
  'pager.js',
  'tokens.css',
  'glass.css',
  'glass.js',
  'home.css',
  'script.js',
  'style.css',
  'wallpaper-modal.css',
  'auth.js',
  'config.js',
  'data-sync.js',
  'membership.js',
  'paddle.js',
  'supabase-client.js',
  'time-display.js',
  'wallpaper.js',
  'badge.svg',
  'favicon.png',
  'favicon.svg',
];

// Inline event attributes converted to data-* so the click-handler
// polyfill (adapter/click-handler.js) can bind them under MV3 CSP.
const INLINE_EVENT_ATTRS = [
  'onclick', 'onchange', 'oninput', 'onkeydown', 'onkeyup',
  'onfocus', 'onblur', 'oncontextmenu', 'ondblclick', 'onsubmit',
  'ondragstart', 'ondragover', 'ondrop', 'onload', 'onerror',
  'onmouseover', 'onmouseout',
];

function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { fs.writeFileSync(p, s); }

export function transformIndexHtml(html) {
  let out = html;

  // 1) Local assets: strip cache-busting query (?v=...) and leading slash
  //    so they resolve inside chrome-extension://<id>/.
  out = out.replace(/(src|href)="([^"?]*)\?v=[^"]*"/g, '$1="$2"');
  out = out.replace(/(src|href)="\/(?!\/)/g, '$1="');

  // 2) Swap CDN SDKs for vendored copies (remote scripts would violate the
  //    extension CSP and hurt offline reliability).
  out = out.replace('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', 'vendor/supabase.min.js');
  out = out.replace('https://cdn.paddle.com/paddle/v2/paddle.js', 'vendor/paddle.min.js');

  // 3) MV3 CSP blocks inline event handlers; rename them so the
  //    click-handler polyfill can bind them safely.
  for (const attr of INLINE_EVENT_ATTRS) {
    out = out.split(' ' + attr + '=').join(' data-' + attr + '=');
  }

  // 4) apple-touch-icon is irrelevant in the extension context.
  out = out.replace(/<link rel="apple-touch-icon"[^>]*>\s*/g, '');

  // 5) Inject adapter scripts right after config.js. Order matters:
  //    supabase-storage must be registered before supabase-client.js.
  const configTag = '<script src="config.js"></script>';
  if (!out.includes(configTag)) throw new Error('transform: config.js script tag not found');
  const adapters = configTag
    + '\n  <script src="adapter/supabase-storage.js"></script>'
    + '\n  <script src="adapter/storage-bridge.js"></script>'
    + '\n  <script src="adapter/fetch-polyfill.js"></script>';
  out = out.replace(configTag, adapters);

  // 6) click-handler polyfill must load last so it can bind all handlers.
  if (!/<\/body>/i.test(out)) throw new Error('transform: </body> not found');
  out = out.replace(/<\/body>/i, '<script src="adapter/click-handler.js"></script>\n</body>');

  return out;
}

export function buildExtension() {
  for (const rel of COPY_FILES) {
    const src = path.join(PUBLIC_DIR, rel);
    const dst = path.join(EXT_DIR, rel);
    if (!fs.existsSync(src)) throw new Error('Missing source file: ' + rel);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }

  const html = read(path.join(PUBLIC_DIR, 'index.html'));
  write(path.join(EXT_DIR, 'index.html'), transformIndexHtml(html));

  const pkg = JSON.parse(read(path.join(ROOT, 'package.json')));
  const manifestPath = path.join(EXT_DIR, 'manifest.json');
  const manifest = JSON.parse(read(manifestPath));
  manifest.version = pkg.version;
  write(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

  console.log('[sync-extension] extension/ regenerated from public/');
}

export function checkExtension() {
  const errors = [];

  for (const rel of COPY_FILES) {
    const src = path.join(PUBLIC_DIR, rel);
    const dst = path.join(EXT_DIR, rel);
    if (!fs.existsSync(dst)) { errors.push('missing in extension/: ' + rel); continue; }
    if (!fs.readFileSync(src).equals(fs.readFileSync(dst))) {
      errors.push('out of sync (run npm run build:extension): ' + rel);
    }
  }

  const htmlA = read(path.join(PUBLIC_DIR, 'index.html'));
  const htmlB = read(path.join(EXT_DIR, 'index.html'));
  if (transformIndexHtml(htmlA) !== htmlB) {
    errors.push('out of sync (run npm run build:extension): index.html');
  }

  const pkg = JSON.parse(read(path.join(ROOT, 'package.json')));
  const manifest = JSON.parse(read(path.join(EXT_DIR, 'manifest.json')));
  if (manifest.version !== pkg.version) {
    errors.push('manifest version (' + manifest.version + ') != package.json version (' + pkg.version + ')');
  }

  if (errors.length) {
    console.error('[sync-extension] SYNC CHECK FAILED:');
    for (const e of errors) console.error('  - ' + e);
    process.exitCode = 1;
  } else {
    console.log('[sync-extension] extension/ is in sync with public/');
  }
}

export function packExtension() {
  // Never ship the private signing key inside the package.
  if (fs.existsSync(path.join(EXT_DIR, '.key.pem'))) {
    throw new Error('Refusing to pack: extension/.key.pem exists. Move the private key out of extension/ (e.g. keys/).');
  }
  buildExtension();
  const pkg = JSON.parse(read(path.join(ROOT, 'package.json')));
  fs.mkdirSync(DIST_DIR, { recursive: true });
  const zipName = 'newtab-extension-' + pkg.version + '.zip';
  const zipPath = path.join(DIST_DIR, zipName);
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath);

  try {
    // Windows: PowerShell Compress-Archive
    execFileSync('powershell.exe', ['-NoProfile', '-Command',
      "Compress-Archive -Path '" + path.join(EXT_DIR, '*') + "' -DestinationPath '" + zipPath + "' -Force"],
      { stdio: 'inherit' });
  } catch (_) {
    // POSIX fallback
    execFileSync('zip', ['-r', zipPath, '.'], { cwd: EXT_DIR, stdio: 'inherit' });
  }
  console.log('[sync-extension] packed ' + zipPath);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const mode = process.argv[2] || 'build';
  if (mode === 'build') buildExtension();
  else if (mode === 'check') checkExtension();
  else if (mode === 'pack') packExtension();
  else { console.error('Unknown mode: ' + mode); process.exit(1); }
}