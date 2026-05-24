// ===== localStorage ↔ chrome.storage.local Bridge =====
// Optional: mirrors critical localStorage keys to chrome.storage.local
// for cross-context access (e.g., if a future options page or popup
// needs to read the user's theme, locale, or site data).

(function() {
  'use strict';

  // Runtime check: only activate in extension context.
  // This runs before config.js, so check chrome.runtime directly.
  var isExtension = (function() {
    try { return typeof chrome !== 'undefined' && !!chrome.runtime && !!chrome.runtime.id; }
    catch (_) { return false; }
  })();
  if (!isExtension) return;

  var BRIDGED_KEYS = [
    'theme',
    'locale',
    'sites',
    'tags',
    'tagOrder',
    'siteOrder',
    'currentTheme',
    'enabledEngineIds',
    'engineId',
    'engineIndex',
  ];

  // Mirror writes to chrome.storage.local
  var _origSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    _origSetItem.call(this, key, value);
    if (BRIDGED_KEYS.indexOf(key) !== -1) {
      try {
        var obj = {};
        obj['ls_' + key] = value;
        chrome.storage.local.set(obj, function() {
          if (chrome.runtime.lastError) { /* ignore */ }
        });
      } catch (_e) { /* ignore */ }
    }
  };

  // On init: restore from chrome.storage.local if localStorage is empty
  (function restoreFromExtensionStorage() {
    for (var i = 0; i < BRIDGED_KEYS.length; i++) {
      var key = BRIDGED_KEYS[i];
      if (localStorage.getItem(key) !== null) continue;
      try {
        (function(k) {
          chrome.storage.local.get('ls_' + k, function(result) {
            if (chrome.runtime.lastError) return;
            var value = result['ls_' + k];
            if (value !== undefined && value !== null) {
              localStorage.setItem(k, value);
            }
          });
        })(key);
      } catch (_e) { /* ignore */ }
    }
  })();
})();
