// ===== NewTab RSS Proxy (Vercel Serverless + local express) =====
// GET /api/rss-proxy?url=<feed url>
// Fetches a public RSS/Atom feed for the workspace RSS widget (browsers can't
// read most feeds directly because of CORS). Guard rails against SSRF:
// - only http/https on the default ports, no credentials in the URL
// - every DNS answer is checked inside the socket's lookup, so the address
//   that is validated is the address that is connected to (no rebinding gap)
// - redirects are followed manually (max 3) and re-validated
// - 8 s timeout, 2 MB body limit, identity encoding only
const http = require('node:http');
const https = require('node:https');
const dns = require('node:dns');
const net = require('node:net');

const MAX_BYTES = 2 * 1024 * 1024;
const TIMEOUT_MS = 8000;
const MAX_REDIRECTS = 3;

function ipv4ToInt(ip) {
  return ip.split('.').reduce((acc, part) => (acc << 8) + Number(part), 0) >>> 0;
}

function inV4Range(ip, base, bits) {
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipv4ToInt(ip) & mask) === (ipv4ToInt(base) & mask);
}

const V4_BLOCKED = [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24],
  ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24],
  ['224.0.0.0', 3] // multicast + reserved + broadcast
];

function isPrivateAddress(address) {
  if (net.isIPv4(address)) return V4_BLOCKED.some(([base, bits]) => inV4Range(address, base, bits));
  if (!net.isIPv6(address)) return true;
  const ip = address.toLowerCase();
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateAddress(mapped[1]);
  if (ip === '::' || ip === '::1') return true;
  const first = parseInt(ip.split(':')[0] || '0', 16);
  if ((first & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
  if ((first & 0xffc0) === 0xfe80) return true; // fe80::/10 link local
  if ((first & 0xff00) === 0xff00) return true; // ff00::/8 multicast
  return false;
}

function safeLookup(hostname, options, callback) {
  dns.lookup(hostname, { all: true, family: options && options.family }, (err, addresses) => {
    if (err) return callback(err);
    if (!addresses.length || addresses.some((a) => isPrivateAddress(a.address))) {
      return callback(Object.assign(new Error('Blocked address'), { code: 'EBLOCKED' }));
    }
    if (options && options.all) return callback(null, addresses);
    return callback(null, addresses[0].address, addresses[0].family);
  });
}

function validateUrl(raw) {
  let url;
  try {
    url = new URL(String(raw || ''));
  } catch (_err) {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  if (url.username || url.password) return null;
  if (url.port && !['80', '443'].includes(url.port)) return null;
  if (!url.hostname || url.hostname === 'localhost' || url.hostname.endsWith('.localhost')) return null;
  // Node skips the custom lookup for IP-literal hosts, so check those here.
  // (The URL parser already normalizes forms like http://2130706433/.)
  const literal = url.hostname.replace(/^\[|\]$/g, '');
  if (net.isIP(literal) && isPrivateAddress(literal)) return null;
  return url;
}

function fetchOnce(url) {
  const client = url.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = client.get(url, {
      lookup: safeLookup,
      timeout: TIMEOUT_MS,
      headers: {
        'User-Agent': 'NewTab-RSS/1.0 (+https://newtab.online)',
        Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.9, */*;q=0.5',
        'Accept-Encoding': 'identity'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        resolve({ redirect: res.headers.location });
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(Object.assign(new Error('Upstream status ' + res.statusCode), { status: 502 }));
        return;
      }
      const chunks = [];
      let size = 0;
      res.on('data', (chunk) => {
        size += chunk.length;
        if (size > MAX_BYTES) {
          req.destroy();
          reject(Object.assign(new Error('Feed too large'), { status: 413 }));
          return;
        }
        chunks.push(chunk);
      });
      res.on('end', () => resolve({ body: Buffer.concat(chunks), contentType: res.headers['content-type'] || '' }));
      res.on('error', reject);
    });
    req.on('timeout', () => req.destroy(Object.assign(new Error('Upstream timeout'), { status: 504 })));
    req.on('error', reject);
  });
}

async function fetchFeed(rawUrl) {
  let url = validateUrl(rawUrl);
  for (let hop = 0; url && hop <= MAX_REDIRECTS; hop++) {
    const result = await fetchOnce(url);
    if (!result.redirect) return result;
    url = validateUrl(new URL(result.redirect, url).href);
  }
  throw Object.assign(new Error(url ? 'Too many redirects' : 'URL not allowed'), { status: 400 });
}

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
  const raw = (req.query && req.query.url) || new URL(req.url, 'http://localhost').searchParams.get('url');
  if (!validateUrl(raw)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'URL not allowed' }));
  }
  try {
    const { body, contentType } = await fetchFeed(raw);
    const xmlish = /xml|rss|atom/i.test(contentType);
    res.statusCode = 200;
    // Pass the upstream charset through so the client can decode GBK etc.
    res.setHeader('Content-Type', xmlish ? contentType : 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.end(body);
  } catch (err) {
    res.statusCode = err.status || (err.code === 'EBLOCKED' ? 400 : 502);
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: err.code === 'EBLOCKED' ? 'URL not allowed' : 'Could not fetch feed' }));
  }
}

module.exports = handler;
module.exports.isPrivateAddress = isPrivateAddress;
module.exports.validateUrl = validateUrl;
