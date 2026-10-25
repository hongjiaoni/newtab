// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const handler = require('../api/rss-proxy.js');
const { isPrivateAddress, validateUrl } = handler;

function call(query) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
      end(body) { resolve({ status: this.statusCode, body: String(body || '') }); }
    };
    handler({ method: 'GET', query, url: '/api/rss-proxy' }, res);
  });
}

describe('rss-proxy', () => {
  it('blocks private, loopback, link-local and reserved addresses', () => {
    ['127.0.0.1', '10.1.2.3', '172.20.0.1', '192.168.1.1', '169.254.169.254', '100.64.0.1',
      '0.0.0.0', '224.0.0.1', '::1', '::', 'fd00::1', 'fe80::1', '::ffff:127.0.0.1', 'not-an-ip']
      .forEach((ip) => expect(isPrivateAddress(ip), ip).toBe(true));
  });

  it('allows public addresses', () => {
    ['8.8.8.8', '1.1.1.1', '172.15.255.255', '2606:4700:4700::1111', '::ffff:8.8.8.8']
      .forEach((ip) => expect(isPrivateAddress(ip), ip).toBe(false));
  });

  it('only accepts plain http(s) URLs on default ports', () => {
    expect(validateUrl('https://sspai.com/feed')).toBeTruthy();
    expect(validateUrl('http://example.com:80/rss')).toBeTruthy();
    expect(validateUrl('file:///etc/passwd')).toBeNull();
    expect(validateUrl('ftp://example.com/feed')).toBeNull();
    expect(validateUrl('https://user:pw@example.com/feed')).toBeNull();
    expect(validateUrl('https://example.com:8443/feed')).toBeNull();
    expect(validateUrl('http://localhost/feed')).toBeNull();
    expect(validateUrl('not a url')).toBeNull();
    expect(validateUrl('http://127.0.0.1/feed')).toBeNull();
    expect(validateUrl('http://2130706433/feed')).toBeNull(); // 127.0.0.1 in decimal
    expect(validateUrl('http://[::1]/feed')).toBeNull();
    expect(validateUrl('http://169.254.169.254/latest/meta-data')).toBeNull();
    expect(validateUrl('http://8.8.8.8/feed')).toBeTruthy();
  });

  it('rejects disallowed URLs before any network request', async () => {
    expect((await call({ url: 'http://localhost:3000/' })).status).toBe(400);
    expect((await call({ url: 'javascript:alert(1)' })).status).toBe(400);
    expect((await call({})).status).toBe(400);
  });

  it('rejects IP-literal hosts in private ranges without connecting', async () => {
    expect((await call({ url: 'http://127.0.0.1/feed' })).status).toBe(400);
    expect((await call({ url: 'http://[::1]/feed' })).status).toBe(400);
  });

  it('rejects hostnames that resolve to private addresses at connect time', async () => {
    // localhost.localdomain-style names are not caught by validateUrl; the
    // socket lookup must still refuse them.
    const res = await call({ url: 'http://127.0.0.1.nip.io/feed' });
    expect([400, 502]).toContain(res.status); // 502 only if DNS is unavailable offline
    expect(res.body).not.toContain('<');
  });
});
