// ===== Appearance: light / dark / auto =====
// Loaded in <head> so html[data-appearance] is set before first paint.
// 'auto' leaves data-appearance unset and tokens.css follows the system.
// body.dark / body.light are kept in sync for rules and code that still read them.
(function () {
  const KEY = 'appearance';
  const MODES = ['light', 'dark', 'auto'];
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readStoredMode() {
    try {
      const stored = localStorage.getItem(KEY);
      if (MODES.includes(stored)) return stored;
      // Migrate from the retired theme system ('themeMode' / 'theme').
      const legacy = localStorage.getItem('themeMode') || localStorage.getItem('theme');
      if (legacy === 'system') return 'auto';
      if (legacy === 'light' || legacy === 'dark') return legacy;
    } catch (_err) {
    }
    return 'auto';
  }

  let mode = readStoredMode();

  function isDark() {
    return mode === 'dark' || (mode === 'auto' && !!media?.matches);
  }

  function syncBodyClass() {
    if (!document.body) return;
    const dark = isDark();
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
  }

  function apply() {
    const root = document.documentElement;
    if (mode === 'auto') root.removeAttribute('data-appearance');
    else root.setAttribute('data-appearance', mode);
    syncBodyClass();
  }

  function normalizeAppearance(value) {
    if (value === 'system') return 'auto';
    return MODES.includes(value) ? value : 'auto';
  }

  // options.sync === false: apply only (e.g. when the value came from the cloud).
  function setAppearance(next, options = {}) {
    mode = normalizeAppearance(next);
    try {
      localStorage.setItem(KEY, mode);
    } catch (_err) {
    }
    apply();
    window.syncSettingsModalUI?.();
    if (options.sync !== false) window.markHomeConfigUpdated?.();
  }

  function getAppearance() {
    return mode;
  }

  function setAppearanceViewMode(viewMode) {
    if (typeof state === 'undefined') return;
    state.viewMode = viewMode === 'minimalist' ? 'minimalist' : 'general';
    try {
      localStorage.setItem('viewMode', state.viewMode);
    } catch (_err) {
    }
    window.renderHome?.();
    window.updateAllText?.();
    window.saveData?.();
  }

  if (media) {
    const onChange = () => {
      if (mode === 'auto') apply();
    };
    if (media.addEventListener) media.addEventListener('change', onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  apply();
  if (!document.body) document.addEventListener('DOMContentLoaded', syncBodyClass, { once: true });

  window.setAppearance = setAppearance;
  window.getAppearance = getAppearance;
  window.isDarkAppearance = isDark;
  window.normalizeAppearance = normalizeAppearance;
  window.setAppearanceViewMode = setAppearanceViewMode;
})();
