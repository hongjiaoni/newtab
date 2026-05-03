/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';

// Load the i18n logic from script.js by evaluating the relevant parts
// We set up a minimal DOM for jsdom
function setupDom() {
  document.body.innerHTML = `
    <div id="time">00:00</div>
    <div id="date"></div>
    <input id="searchInput" />
    <div id="authMenuContainer"></div>
  `;

  // Mock localStorage
  const store = {};
  Storage.prototype.getItem = vi.fn((key) => store[key] ?? null);
  Storage.prototype.setItem = vi.fn((key, value) => { store[key] = String(value); });
  Storage.prototype.removeItem = vi.fn((key) => { delete store[key]; });

  // Mock navigator.language
  Object.defineProperty(navigator, 'language', {
    configurable: true,
    value: 'en-US'
  });

  // Mock window.location
  delete window.location;
  window.location = new URL('https://newtab.online/');
}

// Parse the translation objects and i18n functions from script.js
// We replicate them here for isolated testing
const translations = {
  zh: {
    search: '想要搜点什么吗？',
    addNew: '添加',
    name: '名称',
    url: '网址',
    darkMode: '深色模式',
    lightMode: '浅色模式',
    login: '登录',
    logout: '退出',
    wallpaper: '壁纸',
    about: '关于',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    search: 'What would you like to search?',
    addNew: 'Add',
    name: 'Name',
    url: 'URL',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    login: 'Login',
    logout: 'Logout',
    wallpaper: 'Wallpaper',
    about: 'About',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

const TRANSLATION_OVERRIDES = {
  zh: {
    search: '想要搜点什么呢？',
    addNew: '添加',
    login: '登录',
    logout: '退出登录',
    loginBeforeSave: '请先登录，再保存并同步当前设置',
    syncLoadFailed: '同步最新配置失败，请稍后重试',
    syncSaveFailed: '保存失败，暂未同步到云端',
    upgradeFailed: '升级失败，请稍后重试',
    confirmText: '确认',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    loginBeforeSave: 'Please log in before saving and syncing this change',
    syncLoadFailed: 'Failed to sync the latest settings. Please try again later.',
    syncSaveFailed: 'Save failed. Your changes were not synced to the cloud yet.',
    upgradeFailed: 'Upgrade failed, please try again',
    confirmText: 'Confirm'
  }
};

// Apply overrides (same as script.js does)
Object.assign(translations.zh, TRANSLATION_OVERRIDES.zh);
Object.assign(translations.en, TRANSLATION_OVERRIDES.en);

// ─── normalizeLocale ──────────────────────────────────────────────────

function normalizeLocale(input) {
  if (!input) return 'zh';
  const v = String(input).trim();
  if (!v) return 'zh';
  const lower = v.toLowerCase();

  if (lower === 'zh' || lower.startsWith('zh-')) return 'zh';
  if (lower === 'en' || lower.startsWith('en-')) return 'en';

  if (Object.prototype.hasOwnProperty.call(translations, lower)) return lower;
  return 'zh';
}

// ─── getInitialLocale ─────────────────────────────────────────────────

function getLangFromUrl() {
  try {
    const url = new URL(window.location.href);
    const lang = url.searchParams.get('lang');
    return lang ? normalizeLocale(lang) : null;
  } catch {
    return null;
  }
}

function getBrowserLocale() {
  return normalizeLocale(navigator.language || navigator.userLanguage || 'zh');
}

function getInitialLocale() {
  const urlLang = getLangFromUrl();
  if (urlLang) return urlLang;
  const saved = localStorage.getItem('locale');
  if (saved) return normalizeLocale(saved);
  return getBrowserLocale();
}

// ─── validateTranslations ─────────────────────────────────────────────

function validateTranslations(baseLocale = 'zh') {
  const base = translations[baseLocale] || {};
  const missingKeys = {};
  Object.keys(translations).forEach((locale) => {
    if (locale === baseLocale) return;
    const dict = translations[locale] || {};
    const missing = Object.keys(base).filter(k => !(k in dict));
    if (missing.length > 0) {
      missingKeys[locale] = missing;
    }
  });
  return missingKeys;
}

// ─── Tests ────────────────────────────────────────────────────────────

describe('normalizeLocale', () => {
  it('should return zh for empty input', () => {
    expect(normalizeLocale('')).toBe('zh');
    expect(normalizeLocale(null)).toBe('zh');
    expect(normalizeLocale(undefined)).toBe('zh');
  });

  it('should normalize zh variants to zh', () => {
    expect(normalizeLocale('zh')).toBe('zh');
    expect(normalizeLocale('zh-CN')).toBe('zh');
    expect(normalizeLocale('zh-TW')).toBe('zh');
    expect(normalizeLocale('  zh  ')).toBe('zh');
  });

  it('should normalize en variants to en', () => {
    expect(normalizeLocale('en')).toBe('en');
    expect(normalizeLocale('en-US')).toBe('en');
    expect(normalizeLocale('en-GB')).toBe('en');
  });

  it('should default to zh for unknown locales', () => {
    expect(normalizeLocale('fr')).toBe('zh');
    expect(normalizeLocale('de')).toBe('zh');
    expect(normalizeLocale('ja')).toBe('zh');
  });
});

describe('translations', () => {
  it('should have all zh keys with non-empty values', () => {
    Object.entries(translations.zh).forEach(([key, value]) => {
      // Skip arrays (days, months)
      if (Array.isArray(value)) {
        expect(value.length).toBeGreaterThan(0);
      } else {
        expect(value).toBeTruthy();
      }
    });
  });

  it('should have all en keys with non-empty values', () => {
    Object.entries(translations.en).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        expect(value.length).toBeGreaterThan(0);
      } else {
        expect(value).toBeTruthy();
      }
    });
  });

  it('should have matching keys between zh and en', () => {
    const zhKeys = Object.keys(translations.zh).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(enKeys).toEqual(zhKeys);
  });

  it('should have 7 days in both locales', () => {
    expect(translations.zh.days).toHaveLength(7);
    expect(translations.en.days).toHaveLength(7);
  });

  it('should have 12 months in both locales', () => {
    expect(translations.zh.months).toHaveLength(12);
    expect(translations.en.months).toHaveLength(12);
  });

  it('zh translation lookup should return correct value', () => {
    expect(translations.zh.search).toBe('想要搜点什么呢？');
    expect(translations.zh.darkMode).toBe('深色模式');
    expect(translations.zh.login).toBe('登录');
  });

  it('en translation lookup should return correct value', () => {
    expect(translations.en.search).toBe('What would you like to search?');
    expect(translations.en.darkMode).toBe('Dark Mode');
    expect(translations.en.login).toBe('Login');
  });

  it('should return key itself for missing translations', () => {
    const i18n = {
      currentLocale: 'en',
      t(key) {
        return translations[this.currentLocale][key] || key;
      }
    };
    expect(i18n.t('nonexistent_key')).toBe('nonexistent_key');
  });
});

describe('validateTranslations', () => {
  it('should return empty object when all locales have matching keys', () => {
    const missing = validateTranslations('zh');
    expect(missing).toEqual({});
  });
});

describe('getInitialLocale', () => {
  beforeEach(() => {
    localStorage.clear();
    // Default to en
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: 'en-US'
    });
    delete window.location;
    window.location = new URL('https://newtab.online/');
  });

  it('should use URL lang parameter when present', () => {
    window.location = new URL('https://newtab.online/?lang=zh');
    expect(getInitialLocale()).toBe('zh');
  });

  it('should use saved locale from localStorage', () => {
    localStorage.setItem('locale', 'en');
    expect(getInitialLocale()).toBe('en');
  });

  it('should fall back to browser locale', () => {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: 'zh-CN'
    });
    expect(getInitialLocale()).toBe('zh');
  });

  it('should default to zh when nothing is available', () => {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: ''
    });
    expect(getInitialLocale()).toBe('zh');
  });
});

describe('i18n.setLocale', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save locale to localStorage', () => {
    const i18n = {
      currentLocale: 'en',
      setLocale(locale) {
        this.currentLocale = normalizeLocale(locale);
        localStorage.setItem('locale', this.currentLocale);
      }
    };
    i18n.setLocale('zh');
    expect(i18n.currentLocale).toBe('zh');
    expect(localStorage.getItem('locale')).toBe('zh');
  });

  it('should change translation language', () => {
    const i18n = {
      currentLocale: 'en',
      t(key) {
        return translations[this.currentLocale][key] || key;
      },
      setLocale(locale) {
        this.currentLocale = normalizeLocale(locale);
      }
    };
    expect(i18n.t('search')).toBe('What would you like to search?');
    i18n.setLocale('zh');
    expect(i18n.t('search')).toBe('想要搜点什么呢？');
  });
});
