// ===== Persistent media cache for wallpapers and favicons =====
// Keeps the browser's HTTP cache as the first line of defence and adds a
// Cache Storage layer for fast, same-page and next-page rendering. Remote
// responses without CORS are skipped so images still fall back to their
// normal <img> URL.
(function () {
  'use strict';

  const CACHE_NAME = 'newtab-media-v2';
  const MAX_ENTRIES = 240;
  const memory = new Map();
  const inFlight = new Map();

  function isCacheable(url) {
    return typeof url === 'string' && /^https?:\/\//i.test(url);
  }

  function remember(url, blobUrl) {
    const existing = memory.get(url);
    if (existing && existing.blobUrl !== blobUrl) URL.revokeObjectURL(existing.blobUrl);
    memory.set(url, { blobUrl, at: Date.now() });
    while (memory.size > MAX_ENTRIES) {
      const oldest = memory.keys().next().value;
      const entry = memory.get(oldest);
      if (entry?.blobUrl) URL.revokeObjectURL(entry.blobUrl);
      memory.delete(oldest);
    }
    return blobUrl;
  }

  async function trimCache(cache) {
    try {
      const keys = await cache.keys();
      const excess = keys.length - MAX_ENTRIES;
      for (let i = 0; i < excess; i += 1) await cache.delete(keys[i]);
    } catch (_err) {
      // Cache Storage is an optimisation; never let trimming break rendering.
    }
  }

  async function lookup(url) {
    if (!isCacheable(url)) return null;
    const hit = memory.get(url);
    if (hit) {
      hit.at = Date.now();
      return hit.blobUrl;
    }
    if (typeof caches === 'undefined' || typeof caches.open !== 'function') return null;
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(url);
      if (!response || !response.ok) return null;
      const blob = await response.blob();
      if (!blob.size) return null;
      return remember(url, URL.createObjectURL(blob));
    } catch (_err) {
      return null;
    }
  }

  async function warmOne(url) {
    if (!isCacheable(url)) return null;
    const hit = memory.get(url);
    if (hit) return hit.blobUrl;
    if (inFlight.has(url)) return inFlight.get(url);

    const job = (async () => {
      try {
        const response = await fetch(url, {
          mode: 'cors',
          credentials: 'omit',
          cache: 'force-cache'
        });
        if (!response || !response.ok || response.type === 'opaque') return null;
        const copy = response.clone();
        const blob = await response.blob();
        if (!blob.size) return null;
        if (typeof caches !== 'undefined' && typeof caches.open === 'function') {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(url, copy);
          await trimCache(cache);
        }
        return remember(url, URL.createObjectURL(blob));
      } catch (_err) {
        return null;
      } finally {
        inFlight.delete(url);
      }
    })();

    inFlight.set(url, job);
    return job;
  }

  async function warm(urls) {
    const list = (Array.isArray(urls) ? urls : [urls])
      .filter(isCacheable)
      .filter((url, index, array) => array.indexOf(url) === index);
    if (!list.length) return;
    let cursor = 0;
    const worker = async () => {
      while (cursor < list.length) {
        const url = list[cursor];
        cursor += 1;
        await warmOne(url);
      }
    };
    await Promise.all(Array.from({ length: Math.min(4, list.length) }, worker));
  }

  async function resolveFirst(urls) {
    for (const url of (Array.isArray(urls) ? urls : [])) {
      const cached = await lookup(url);
      if (cached) return cached;
    }
    return null;
  }

  function bindImage(img, url, options = {}) {
    if (!img) return;
    const source = String(url || '');
    if (!source) {
      if (options.fallback) img.src = options.fallback;
      return;
    }
    img.dataset.mediaCacheSrc = source;
    lookup(source).then((cached) => {
      if (!img.isConnected || img.dataset.mediaCacheSrc !== source) return;
      if (cached) {
        img.src = cached;
        img.classList.add('is-loaded');
        return;
      }
      img.src = source;
      img.addEventListener('load', () => { warmOne(source); }, { once: true });
    });
  }

  async function clear() {
    memory.forEach((entry) => {
      if (entry?.blobUrl) URL.revokeObjectURL(entry.blobUrl);
    });
    memory.clear();
    if (typeof caches !== 'undefined' && typeof caches.delete === 'function') {
      try { await caches.delete(CACHE_NAME); } catch (_err) {}
    }
  }

  window.MediaCache = {
    lookup,
    resolve: lookup,
    resolveFirst,
    warm,
    warmOne,
    bindImage,
    isCacheable,
    clear
  };
})();
