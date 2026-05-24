// ===== XHR-based fetch() Polyfill for Chrome Extension Context =====
// Manifest V3 extension newtab pages can fail on native fetch() even with
// host_permissions granted. XMLHttpRequest works reliably in this context.
// This script replaces window.fetch with an XHR-backed implementation
// when running as a Chrome extension.

(function() {
  'use strict';

  // Only activate in extension context
  if (typeof IS_EXTENSION === 'undefined' || !IS_EXTENSION) return;

  var nativeFetch = window.fetch;

  function xhrFetch(input, init) {
    // For non-http/https URLs (blob:, data:, chrome-extension:, etc.),
    // and relative URLs, use native fetch
    if (typeof input === 'string') {
      if (input.indexOf('http://') !== 0 && input.indexOf('https://') !== 0) {
        return nativeFetch.call(window, input, init);
      }
    } else if (input instanceof Request) {
      if (input.url.indexOf('http://') !== 0 && input.url.indexOf('https://') !== 0) {
        return nativeFetch.call(window, input, init);
      }
    }

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      var url;
      var method = 'GET';
      var requestHeaders = {};
      var body = null;
      var signal = null;

      // ── Parse input ──────────────────────────────────────────
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
        method = input.method || 'GET';
        if (input.headers) {
          input.headers.forEach(function(value, key) {
            requestHeaders[key.toLowerCase()] = value;
          });
        }
        if (input.signal) signal = input.signal;
        // Request body would need async reading — handled via init.body below
      }

      // ── Parse init ───────────────────────────────────────────
      if (init) {
        if (init.method) method = init.method.toUpperCase();
        if (init.headers) {
          if (init.headers instanceof Headers) {
            init.headers.forEach(function(value, key) {
              requestHeaders[key.toLowerCase()] = value;
            });
          } else if (Array.isArray(init.headers)) {
            for (var i = 0; i < init.headers.length; i++) {
              requestHeaders[init.headers[i][0].toLowerCase()] = init.headers[i][1];
            }
          } else if (typeof init.headers === 'object') {
            var hKeys = Object.keys(init.headers);
            for (var j = 0; j < hKeys.length; j++) {
              requestHeaders[hKeys[j].toLowerCase()] = init.headers[hKeys[j]];
            }
          }
        }
        if (init.body !== undefined) body = init.body;
        if (init.signal) signal = init.signal;
      }

      // ── Open connection ──────────────────────────────────────
      xhr.open(method, url, true);

      // Set request headers
      var headerKeys = Object.keys(requestHeaders);
      for (var k = 0; k < headerKeys.length; k++) {
        var hKey = headerKeys[k];
        // Skip forbidden headers that XHR sets automatically
        if (hKey === 'host' || hKey === 'connection' || hKey === 'content-length' ||
            hKey === 'user-agent' || hKey === 'referer' || hKey === 'origin') {
          continue;
        }
        try {
          xhr.setRequestHeader(hKey, requestHeaders[hKey]);
        } catch (_) {
          // Some headers may throw if set incorrectly
        }
      }

      // Use arraybuffer for binary fidelity; Supabase returns JSON
      xhr.responseType = 'arraybuffer';

      // ── Response handler ─────────────────────────────────────
      xhr.onload = function() {
        var responseHeaders = xhr.getAllResponseHeaders();
        var responseInit = {
          status: xhr.status,
          statusText: xhr.statusText
        };

        // Parse response headers into a Headers object
        var respHeaders = new Headers();
        if (responseHeaders) {
          var headerLines = responseHeaders.trim().split(/[\r\n]+/);
          for (var li = 0; li < headerLines.length; li++) {
            var colonIdx = headerLines[li].indexOf(':');
            if (colonIdx > 0) {
              var name = headerLines[li].substring(0, colonIdx).trim();
              var value = headerLines[li].substring(colonIdx + 1).trim();
              respHeaders.append(name, value);
            }
          }
        }
        responseInit.headers = respHeaders;

        resolve(new Response(xhr.response, responseInit));
      };

      xhr.onerror = function() {
        reject(new TypeError('Failed to fetch'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request timed out'));
      };

      // ── Abort signal support ─────────────────────────────────
      if (signal) {
        if (signal.aborted) {
          xhr.abort();
          reject(new DOMException('The operation was aborted.', 'AbortError'));
          return;
        }
        signal.addEventListener('abort', function() {
          xhr.abort();
          reject(new DOMException('The operation was aborted.', 'AbortError'));
        });
      }

      // ── Send ─────────────────────────────────────────────────
      try {
        if (body && method !== 'GET' && method !== 'HEAD') {
          // Handle different body types
          if (typeof body === 'string') {
            xhr.send(body);
          } else if (body instanceof FormData) {
            // For FormData, don't set Content-Type header — XHR sets it with boundary
            xhr.send(body);
          } else if (body instanceof Blob || body instanceof ArrayBuffer ||
                     body instanceof Uint8Array || body instanceof DataView) {
            xhr.send(body);
          } else if (body instanceof URLSearchParams) {
            xhr.send(body.toString());
          } else if (typeof body === 'object') {
            // Plain object — serialize as JSON if Content-Type is JSON
            var ct = requestHeaders['content-type'] || '';
            if (ct.indexOf('application/json') !== -1) {
              xhr.send(JSON.stringify(body));
            } else {
              xhr.send(String(body));
            }
          } else {
            xhr.send(body);
          }
        } else {
          xhr.send(null);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  window.fetch = xhrFetch;
  console.log('[NewTab] XHR-based fetch polyfill activated for extension context');
})();
