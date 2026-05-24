// ===== Supabase chrome.storage.local Adapter =====
// Provides an async storage interface that Supabase GoTrueClient
// uses for persisting auth sessions (tokens, refresh tokens).
// In a Chrome extension, this ensures sessions persist across
// all extension contexts (new tab page, popup, service worker).

(function() {
  'use strict';

  // Note: This runs BEFORE config.js, so window.IS_EXTENSION is not yet set.
  // We always register the adapter; supabase-client.js checks IS_EXTENSION
  // before using it, so this is harmless in web mode.

  // Key prefix to namespace extension auth session data
  // Supabase stores keys like:
  //   supabase.auth.token
  //   sb-<project-ref>-auth-token
  var AUTH_KEY_PREFIX = 'sb_auth_';

  function normalizeKey(key) {
    if (key == null) return key;
    var s = String(key);
    if (s.indexOf(AUTH_KEY_PREFIX) === 0) return s;
    if (s.indexOf('auth') !== -1 || s.indexOf('supabase') !== -1 || s.indexOf('sb-') === 0) {
      return AUTH_KEY_PREFIX + s;
    }
    return s;
  }

  // In-memory cache to serve synchronous reads.
  // Supabase GoTrueClient may call getItem synchronously during init;
  // the cache bridges async chrome.storage.local with sync consumers.
  var _cache = {};
  var _loaded = false;

  function loadCache() {
    try {
      chrome.storage.local.get(null, function(result) {
        if (chrome.runtime.lastError) {
          console.error('Extension storage adapter: loadCache error', chrome.runtime.lastError);
          _loaded = true;
          return;
        }
        _cache = {};
        var keys = Object.keys(result || {});
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (k.indexOf(AUTH_KEY_PREFIX) === 0) {
            _cache[k] = result[k];
          }
        }
        _loaded = true;
      });
    } catch (e) {
      console.error('Extension storage adapter: failed to load cache', e);
      _loaded = true;
    }
  }

  loadCache();

  window.extensionStorageAdapter = {
    getItem: function(key) {
      var nk = normalizeKey(key);
      if (_loaded) {
        return _cache[nk] != null ? _cache[nk] : null;
      }
      // Cache not yet loaded - return null for synchronous callers
      // but the callback-based loadCache should finish before Supabase
      // actually needs the stored values
      return null;
    },

    setItem: function(key, value) {
      var nk = normalizeKey(key);
      _cache[nk] = value;
      try {
        var obj = {};
        obj[nk] = value;
        chrome.storage.local.set(obj, function() {
          if (chrome.runtime.lastError) {
            console.error('Extension storage adapter: setItem error', chrome.runtime.lastError);
          }
        });
      } catch (e) {
        console.error('Extension storage adapter: failed to set', key, e);
      }
    },

    removeItem: function(key) {
      var nk = normalizeKey(key);
      delete _cache[nk];
      try {
        chrome.storage.local.remove(nk, function() {
          if (chrome.runtime.lastError) {
            console.error('Extension storage adapter: removeItem error', chrome.runtime.lastError);
          }
        });
      } catch (e) {
        console.error('Extension storage adapter: failed to remove', key, e);
      }
    }
  };
})();
