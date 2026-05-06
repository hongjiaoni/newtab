// ===== CSP-safe Event Handler Polyfill =====
// Manifest V3 CSP blocks inline on* HTML attributes (onclick, onchange, etc.).
// This script restores that functionality by:
//   1. Reading data-onclick/data-onchange attributes (set by build script on static HTML)
//   2. Reading onclick/onchange attributes (dynamically generated HTML — CSP blocks
//      their execution but the attributes remain in the DOM)
//   3. Watching for newly inserted elements via MutationObserver
// The build script converts onclick -> data-onclick in extension HTML.

(function() {
  'use strict';

  // ── Initial scan ──────────────────────────────────────────────────

  function initHandlers() {
    // Process data-onclick (static HTML patched by build script)
    var dataOnclickEls = document.querySelectorAll('[data-onclick]');
    for (var i = 0; i < dataOnclickEls.length; i++) {
      convertDataAttr(dataOnclickEls[i], 'data-onclick', 'click');
    }

    // Process onclick (dynamically generated HTML)
    var onclickEls = document.querySelectorAll('[onclick]');
    for (var j = 0; j < onclickEls.length; j++) {
      convertInlineAttr(onclickEls[j], 'onclick', 'click');
    }

    // Process onchange (dynamically generated HTML)
    var onchangeEls = document.querySelectorAll('[onchange]');
    for (var k = 0; k < onchangeEls.length; k++) {
      convertInlineAttr(onchangeEls[k], 'onchange', 'change');
    }

    // Start watching for future dynamically added elements
    startObserver();
  }

  function convertDataAttr(el, attrName, eventType) {
    var handler = el.getAttribute(attrName);
    if (!handler) return;
    el._ceHandler = handler;
    el.removeAttribute(attrName);
    attachHandler(el, handler, eventType);
  }

  function convertInlineAttr(el, attrName, eventType) {
    var handler = el.getAttribute(attrName);
    if (!handler) return;
    el.removeAttribute(attrName);
    var dataAttr = 'data-' + attrName;
    el.setAttribute(dataAttr, handler);
    el._ceHandler = handler;
    attachHandler(el, handler, eventType);
  }

  function attachHandler(el, handler, eventType) {
    (function(capturedHandler) {
      el.addEventListener(eventType, function(evt) {
        invokeHandler(capturedHandler, evt);
      });
    })(handler);
  }

  // ── MutationObserver for dynamically added content ─────────────────

  function startObserver() {
    if (typeof MutationObserver === 'undefined') return;
    try {
      var observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (mutation.type === 'childList' && mutation.addedNodes) {
            for (var j = 0; j < mutation.addedNodes.length; j++) {
              processAddedNode(mutation.addedNodes[j]);
            }
          }
        }
      });
      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
      });
    } catch (_) { /* MutationObserver not supported */ }
  }

  function processAddedNode(node) {
    if (!node || node.nodeType !== 1) return;

    // Check the node itself for onclick and onchange
    if (node.hasAttribute) {
      if (node.hasAttribute('onclick')) convertInlineAttr(node, 'onclick', 'click');
      if (node.hasAttribute('onchange')) convertInlineAttr(node, 'onchange', 'change');
    }

    // Check descendants
    if (node.querySelectorAll) {
      var onclickDesc = node.querySelectorAll('[onclick]');
      for (var i = 0; i < onclickDesc.length; i++) {
        convertInlineAttr(onclickDesc[i], 'onclick', 'click');
      }
      var onchangeDesc = node.querySelectorAll('[onchange]');
      for (var j = 0; j < onchangeDesc.length; j++) {
        convertInlineAttr(onchangeDesc[j], 'onchange', 'change');
      }
    }
  }

  // ── Handler invocation ─────────────────────────────────────────────

  function invokeHandler(code, event) {
    try {
      // Special case: return false (common inline handler pattern)
      if (code === 'return false' || code === 'return false;') {
        event.preventDefault();
        return;
      }

      // Special case: event.method() — e.g. event.stopPropagation()
      var eventMethodMatch = code.match(/^\s*event\.(stopPropagation|preventDefault)\(\)\s*;?\s*$/);
      if (eventMethodMatch) {
        event[eventMethodMatch[1]]();
        return;
      }

      // Match: functionName(args) or namespace.functionName(args)
      var match = code.match(/^([a-zA-Z_$][\w.]*)\(([^)]*)\)\s*;?\s*$/);
      if (!match) {
        // Complex expression fallback — try as a simple reference
        if (typeof window[code] === 'function') {
          window[code](event);
        }
        return;
      }

      var fullName = match[1];  // e.g., "toggleTheme" or "i18n.setLocale"
      var argsStr  = match[2];  // e.g., "" or "'en'" or "event" or "2, 'monthly'"

      // Resolve nested function references via window.*
      var parts = fullName.split('.');
      var ctx = window;
      for (var j = 0; j < parts.length - 1; j++) {
        ctx = ctx[parts[j]];
        if (!ctx) return;
      }
      var fn = ctx[parts[parts.length - 1]];
      if (typeof fn !== 'function') return;

      // Parse arguments from the arg string
      var args = [];
      if (argsStr.trim()) {
        args = parseArgs(argsStr, event);
      }

      fn.apply(ctx, args);
    } catch (err) {
      console.warn('Event handler error for "' + code + '":', err);
    }
  }

  // ── Argument parsing ───────────────────────────────────────────────

  function parseArgs(argsStr, event) {
    var args = [];
    var current = '';
    var inQuote = false;
    var quoteChar = '';

    for (var k = 0; k < argsStr.length; k++) {
      var ch = argsStr[k];
      if (inQuote) {
        if (ch === quoteChar) {
          inQuote = false;
        } else {
          current += ch;
        }
      } else if (ch === "'" || ch === '"') {
        inQuote = true;
        quoteChar = ch;
      } else if (ch === ',') {
        pushArg(current.trim(), event, args);
        current = '';
      } else if (ch !== ' ') {
        current += ch;
      }
    }
    if (current.trim()) {
      pushArg(current.trim(), event, args);
    }
    return args;
  }

  function pushArg(val, event, args) {
    if (!val) return;
    // 'event' keyword → the event object
    if (val === 'event') {
      args.push(event);
      return;
    }
    args.push(parseArg(val));
  }

  function parseArg(val) {
    if (!val) return val;
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === 'null') return null;
    if (val === 'undefined') return undefined;
    if (!isNaN(Number(val))) return Number(val);
    return val;
  }

  // ── Boot ───────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHandlers);
  } else {
    initHandlers();
  }
})();
