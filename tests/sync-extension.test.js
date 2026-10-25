import { describe, expect, test } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformIndexHtml, COPY_FILES } from '../scripts/sync-extension.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = (rel) => path.join(ROOT, 'public', rel);
const EXT = (rel) => path.join(ROOT, 'extension', rel);

describe('extension index.html transform', () => {
  const html = fs.readFileSync(PUBLIC('index.html'), 'utf8');
  const out = transformIndexHtml(html);

  test('strips inline event handlers for MV3 CSP', () => {
    expect(out).not.toMatch(/\sonclick="/);
    expect(out).not.toMatch(/\sonchange="/);
    expect(out).toContain('id="appearanceMenuItem"');
  });

  test('swaps CDN SDKs for local vendor copies', () => {
    expect(out).toContain('vendor/supabase.min.js');
    expect(out).toContain('vendor/paddle.min.js');
    expect(out).not.toContain('cdn.jsdelivr.net');
    expect(out).not.toContain('cdn.paddle.com');
  });

  test('strips cache-busting query strings and leading slashes', () => {
    expect(out).not.toMatch(/\?v=/);
    expect(out).toContain('src="themes.js"');
    expect(out).toContain('src="script.js"');
  });

  test('injects adapter scripts in dependency order', () => {
    const cfg = out.indexOf('<script src="config.js"></script>');
    const ss = out.indexOf('<script src="adapter/supabase-storage.js"></script>');
    const sb = out.indexOf('<script src="adapter/storage-bridge.js"></script>');
    const fp = out.indexOf('<script src="adapter/fetch-polyfill.js"></script>');
    const sc = out.indexOf('<script src="supabase-client.js"></script>');
    const ch = out.indexOf('<script src="adapter/click-handler.js"></script>');
    expect(cfg).toBeGreaterThan(-1);
    expect(ss).toBeGreaterThan(cfg);
    expect(sb).toBeGreaterThan(ss);
    expect(fp).toBeGreaterThan(sb);
    expect(sc).toBeGreaterThan(fp);
    expect(ch).toBeGreaterThan(sc);
  });

  test('keeps the paddle inline checkout container', () => {
    expect(out).toContain('paddle-checkout-container');
    expect(out).toContain('paddle-inline-root');
  });

  test('keeps remote font stylesheets (allowed by CSP)', () => {
    expect(out).toContain('chinese-fonts-cdn.deno.dev');
    expect(out).toContain('fonts.googleapis.com');
  });
});

describe('extension/public two-end sync', () => {
  test('all shared files are byte-identical to public/', () => {
    for (const rel of COPY_FILES) {
      const a = fs.readFileSync(PUBLIC(rel));
      const b = fs.readFileSync(EXT(rel));
      expect(a.equals(b), `${rel} out of sync — run npm run build:extension`).toBe(true);
    }
  });

  test('generated index.html matches extension/index.html', () => {
    const a = transformIndexHtml(fs.readFileSync(PUBLIC('index.html'), 'utf8'));
    const b = fs.readFileSync(EXT('index.html'), 'utf8');
    expect(a).toBe(b);
  });

  test('manifest version matches package.json version', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    const manifest = JSON.parse(fs.readFileSync(EXT('manifest.json'), 'utf8'));
    expect(manifest.version).toBe(pkg.version);
  });

  test('manifest declares a stable key, identity and storage permissions', () => {
    const manifest = JSON.parse(fs.readFileSync(EXT('manifest.json'), 'utf8'));
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.key).toBeTruthy();
    expect(manifest.permissions).toContain('identity');
    expect(manifest.permissions).toContain('storage');
    expect(manifest.chrome_url_overrides.newtab).toBe('index.html');
    expect(manifest.action.default_icon['128']).toBe('icons/icon128.png');
  });
});