// ===== Vertical pager: home <-> workspace =====
// Full-height pages stacked in a scroll-snap container. One wheel gesture turns
// exactly one page: deltas accumulate past a threshold, then input is locked
// until the gesture (including trackpad inertia) goes quiet. Anything that can
// still scroll in the wheel direction (a page taller than the window, a chat
// log, a widget list) scrolls first; the page only turns at its edge.
(function () {
  const DEFAULTS = {
    threshold: 40,      // accumulated deltaY before a page turn
    lockMs: 650,        // minimum time between page turns
    quietMs: 140,       // inertia must pause this long before the lock lifts
    resetMs: 220        // accumulated delta is forgotten after this idle time
  };

  function isEditable(el) {
    return !!el?.closest?.('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
  }

  function canScrollInside(target, dy, stopAt) {
    for (let el = target; el && el !== stopAt && el.nodeType === 1; el = el.parentElement) {
      if (el.scrollHeight <= el.clientHeight + 1) continue;
      const overflowY = getComputedStyle(el).overflowY;
      if (overflowY !== 'auto' && overflowY !== 'scroll') continue;
      if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
      if (dy < 0 && el.scrollTop > 0) return true;
    }
    return false;
  }

  function createPager(options) {
    const opts = { ...DEFAULTS, ...options };
    const { container } = opts;
    const pages = Array.from(container.querySelectorAll(opts.pageSelector || '.page'));
    const dots = Array.from(opts.dots || []);
    const now = opts.now || (() => performance.now());
    let index = 0;
    let acc = 0;
    let lastWheelAt = 0;
    let lockedUntil = 0;

    function pageName(i) {
      return pages[i]?.dataset.page || String(i);
    }

    function render() {
      pages.forEach((p, i) => {
        p.setAttribute('aria-hidden', String(i !== index));
        p.inert = i !== index;
      });
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
      document.body.dataset.page = pageName(index);
    }

    function writeHash() {
      if (opts.hash === false || typeof history === 'undefined') return;
      const hash = pages[index]?.dataset.hash;
      const url = location.pathname + location.search + (hash ? '#' + hash : '');
      if (url !== location.pathname + location.search + location.hash) history.replaceState(null, '', url);
    }

    function go(i, goOpts = {}) {
      const next = Math.max(0, Math.min(pages.length - 1, i));
      const changed = next !== index;
      index = next;
      acc = 0;
      lockedUntil = now() + opts.lockMs;
      container.scrollTo({ top: pages[index].offsetTop, behavior: goOpts.instant ? 'auto' : 'smooth' });
      render();
      writeHash();
      if (changed) opts.onChange?.(index, pageName(index));
      return index;
    }

    function onWheel(e) {
      if (opts.isBlocked?.()) return;
      // Horizontal gestures (trackpad swipes, shift+wheel) are left alone.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (canScrollInside(e.target, e.deltaY, container)) return;
      e.preventDefault();

      const t = now();
      const idle = t - lastWheelAt;
      lastWheelAt = t;
      if (t < lockedUntil) {
        // Still inside the previous gesture: keep the lock while inertia flows.
        lockedUntil = Math.max(lockedUntil, t + opts.quietMs);
        return;
      }
      if (idle > opts.resetMs) acc = 0;
      acc += e.deltaY;
      if (Math.abs(acc) >= opts.threshold) {
        const dir = Math.sign(acc);
        const target = index + dir;
        if (target >= 0 && target < pages.length) go(target);
        else acc = 0;
        lockedUntil = Math.max(lockedUntil, t + opts.lockMs);
      }
    }

    function onKey(e) {
      if (e.defaultPrevented || opts.isBlocked?.() || isEditable(e.target)) return;
      let dir = 0;
      if (e.key === 'PageDown' || (e.altKey && e.key === 'ArrowDown')) dir = 1;
      else if (e.key === 'PageUp' || (e.altKey && e.key === 'ArrowUp')) dir = -1;
      if (!dir) return;
      e.preventDefault();
      go(index + dir);
    }

    // Touch swipes and scrollbar drags move the container natively; follow them.
    let scrollTimer = null;
    function onScroll() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const mid = container.scrollTop + container.clientHeight / 2;
        const i = pages.findIndex((p) => mid >= p.offsetTop && mid < p.offsetTop + p.offsetHeight);
        if (i >= 0 && i !== index) {
          index = i;
          render();
          writeHash();
          opts.onChange?.(index, pageName(index));
        }
      }, 120);
    }

    function onHashChange() {
      const target = pages.findIndex((p) => p.dataset.hash && '#' + p.dataset.hash === location.hash);
      go(target >= 0 ? target : 0);
    }

    function onResize() {
      container.scrollTo({ top: pages[index].offsetTop, behavior: 'auto' });
    }

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('resize', onResize);
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    const initial = pages.findIndex((p) => p.dataset.hash && '#' + p.dataset.hash === location.hash);
    index = initial >= 0 ? initial : 0;
    container.scrollTo({ top: pages[index].offsetTop, behavior: 'auto' });
    render();

    return {
      go,
      index: () => index,
      name: () => pageName(index),
      destroy() {
        container.removeEventListener('wheel', onWheel);
        container.removeEventListener('scroll', onScroll);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('hashchange', onHashChange);
        window.removeEventListener('resize', onResize);
        clearTimeout(scrollTimer);
      }
    };
  }

  window.createPager = createPager;
})();
