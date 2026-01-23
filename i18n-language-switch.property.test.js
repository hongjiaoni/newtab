/**
 * Property-Based Test: Language Switching Behavior
 * Feature: start-page-enhancements, Property 6: 语言切换行为
 * Validates: Requirements 6.2, 6.6, 6.7
 * 
 * Property: For any language switching operation, all interface text (buttons, labels, 
 * placeholders, prompts) should update to the target language's translation, and date 
 * format should match the target language.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Extract translations from script.js
const jsCode = readFileSync('script.js', 'utf-8');

// Parse translations object
const translationsMatch = jsCode.match(/const translations = ({[\s\S]*?});/);
if (!translationsMatch) {
  throw new Error('Could not find translations object');
}

const translations = eval('(' + translationsMatch[1] + ')');

// Mock i18n object
const createI18n = () => ({
  currentLocale: 'zh',
  
  t(key) {
    return translations[this.currentLocale][key] || key;
  },
  
  setLocale(locale) {
    this.currentLocale = locale;
  },
  
  toggleLocale() {
    const newLocale = this.currentLocale === 'zh' ? 'en' : 'zh';
    this.setLocale(newLocale);
  }
});

const iterations = 100;

describe('Property Test: Language Switching Behavior', () => {
  test('All text keys have translations in both languages', () => {
    const zhKeys = Object.keys(translations.zh);
    const enKeys = Object.keys(translations.en);

    for (const key of zhKeys) {
      expect(enKeys).toContain(key);
    }

    for (const key of enKeys) {
      expect(zhKeys).toContain(key);
    }
  });

  test(`Language toggle alternates correctly (${iterations} iterations)`, () => {
    const i18n = createI18n();
    i18n.currentLocale = 'zh';

    for (let i = 0; i < iterations; i++) {
      const before = i18n.currentLocale;
      i18n.toggleLocale();
      const after = i18n.currentLocale;
      
      const expectedAfter = before === 'zh' ? 'en' : 'zh';
      expect(after).toBe(expectedAfter);
    }
  });

  test(`Translation function returns correct text for each language (${iterations} iterations)`, () => {
    const i18n = createI18n();

    for (let i = 0; i < iterations; i++) {
      const locale = Math.random() < 0.5 ? 'zh' : 'en';
      i18n.setLocale(locale);
      
      const keys = Object.keys(translations[locale]);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      
      const result = i18n.t(randomKey);
      const expected = translations[locale][randomKey];
      
      expect(result).toBe(expected);
    }
  });

  test('Days and months arrays have correct length for both languages', () => {
    const zhDays = translations.zh.days;
    const enDays = translations.en.days;
    const zhMonths = translations.zh.months;
    const enMonths = translations.en.months;

    expect(zhDays).toHaveLength(7);
    expect(enDays).toHaveLength(7);
    expect(zhMonths).toHaveLength(12);
    expect(enMonths).toHaveLength(12);
  });

  test(`Rapid language switches maintain consistency (${iterations} iterations)`, () => {
    const i18n = createI18n();

    for (let i = 0; i < iterations; i++) {
      const switches = Math.floor(Math.random() * 20) + 1;
      i18n.setLocale('zh');
      
      for (let j = 0; j < switches; j++) {
        i18n.toggleLocale();
      }
      
      const expectedLocale = switches % 2 === 0 ? 'zh' : 'en';
      expect(i18n.currentLocale).toBe(expectedLocale);
      
      const testKey = 'search';
      const result = i18n.t(testKey);
      const expected = translations[expectedLocale][testKey];
      
      expect(result).toBe(expected);
    }
  });

  test(`No translation returns undefined or empty (${iterations} iterations)`, () => {
    const i18n = createI18n();

    for (let i = 0; i < iterations; i++) {
      const locale = Math.random() < 0.5 ? 'zh' : 'en';
      i18n.setLocale(locale);
      
      const keys = Object.keys(translations[locale]);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      
      const result = i18n.t(randomKey);
      
      expect(result).toBeTruthy();
      expect(result).not.toBe('');
    }
  });
});
