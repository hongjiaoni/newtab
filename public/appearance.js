// ===== Appearance: light / dark / auto + accent color =====
// Loaded in <head> so html[data-appearance] and the accent are set before first paint.
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

  // Accent: an Apple system color (light / dark variants) or a custom #rrggbb.
  // Everything selected, focused or "tinted" reads --accent / --accent-contrast.
  const ACCENT_KEY = 'accent';
  const ACCENT_PRESETS = {
    blue: ['#007aff', '#0a84ff'],
    purple: ['#af52de', '#bf5af2'],
    pink: ['#ff2d55', '#ff375f'],
    red: ['#ff3b30', '#ff453a'],
    orange: ['#ff9500', '#ff9f0a'],
    yellow: ['#ffcc00', '#ffd60a'],
    green: ['#34c759', '#30d158'],
    graphite: ['#8e8e93', '#98989d']
  };

  function normalizeAccent(value) {
    if (typeof value !== 'string') return 'blue';
    const v = value.trim().toLowerCase();
    if (ACCENT_PRESETS[v]) return v;
    return /^#[0-9a-f]{6}$/.test(v) ? v : 'blue';
  }

  function readStoredAccent() {
    try {
      return normalizeAccent(localStorage.getItem(ACCENT_KEY));
    } catch (_err) {
      return 'blue';
    }
  }

  let accent = readStoredAccent();

  function luminance(hex) {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function accentHex(dark) {
    const preset = ACCENT_PRESETS[accent];
    return preset ? preset[dark ? 1 : 0] : accent;
  }

  function applyAccent() {
    const style = document.documentElement.style;
    if (accent === 'blue') {
      // tokens.css already defines the blue accent for both modes
      style.removeProperty('--accent');
      style.removeProperty('--accent-contrast');
      return;
    }
    const hex = accentHex(isDark());
    style.setProperty('--accent', hex);
    // Light accents (yellow, pale customs) need dark text to stay readable.
    style.setProperty('--accent-contrast', luminance(hex) > 0.55 ? 'rgba(0, 0, 0, 0.86)' : '#ffffff');
  }

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
    applyAccent();
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

  function setAccent(next, options = {}) {
    accent = normalizeAccent(next);
    try {
      localStorage.setItem(ACCENT_KEY, accent);
    } catch (_err) {
    }
    applyAccent();
    window.syncSettingsModalUI?.();
    if (options.sync !== false) window.markHomeConfigUpdated?.();
  }

  function getAccent() {
    return accent;
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
  window.setAccent = setAccent;
  window.getAccent = getAccent;
  window.normalizeAccent = normalizeAccent;
  window.ACCENT_PRESETS = ACCENT_PRESETS;
  window.accentHex = accentHex;
})();
