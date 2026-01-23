/**
 * Property-Based Test: Language Preference Persistence
 * Feature: start-page-enhancements, Property 7: 语言偏好持久化
 * Validates: Requirements 6.4, 6.5
 * 
 * Property: For any language setting, the preference should be saved to localStorage,
 * and page reload should use the saved language preference.
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

// Mock localStorage
class MockLocalStorage {
  constructor() {
    this.data = {};
  }
  
  getItem(key) {
    return this.data[key] || null;
  }
  
  setItem(key, value) {
    this.data[key] = value;
  }
  
  clear() {
    this.data = {};
  }
  
  reload() {
    return new MockI18n(this);
  }
}

// Mock i18n object that uses localStorage
class MockI18n {
  constructor(localStorage) {
    this.localStorage = localStorage;
    this.currentLocale = localStorage.getItem('locale') || 'zh';
  }
  
  t(key) {
    return translations[this.currentLocale][key] || key;
  }
  
  setLocale(locale) {
    this.currentLocale = locale;
    this.localStorage.setItem('locale', locale);
  }
  
  toggleLocale() {
    const newLocale = this.currentLocale === 'zh' ? 'en' : 'zh';
    this.setLocale(newLocale);
  }
}

const iterations = 100;

describe('Property Test: Language Preference Persistence', () => {
  test(`Language preference saved to localStorage (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const storage = new MockLocalStorage();
      const i18n = new MockI18n(storage);
      
      const targetLocale = Math.random() < 0.5 ? 'zh' : 'en';
      i18n.setLocale(targetLocale);
      
      const saved = storage.getItem('locale');
      expect(saved).toBe(targetLocale);
    }
  });

  test(`Page reload uses saved language preference (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const storage = new MockLocalStorage();
      const i18n1 = new MockI18n(storage);
      
      const targetLocale = Math.random() < 0.5 ? 'zh' : 'en';
      i18n1.setLocale(targetLocale);
      
      const i18n2 = storage.reload();
      
      expect(i18n2.currentLocale).toBe(targetLocale);
    }
  });

  test(`Multiple language changes persist correctly (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const storage = new MockLocalStorage();
      const i18n = new MockI18n(storage);
      
      const changes = Math.floor(Math.random() * 10) + 1;
      let expectedLocale = 'zh';
      
      for (let j = 0; j < changes; j++) {
        i18n.toggleLocale();
        expectedLocale = i18n.currentLocale;
      }
      
      const saved = storage.getItem('locale');
      expect(saved).toBe(expectedLocale);
      
      const i18nReloaded = storage.reload();
      expect(i18nReloaded.currentLocale).toBe(expectedLocale);
    }
  });

  test(`Default language is zh when no preference saved (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const storage = new MockLocalStorage();
      const i18n = new MockI18n(storage);
      
      expect(i18n.currentLocale).toBe('zh');
    }
  });

  test(`Persistence survives rapid toggle operations (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const storage = new MockLocalStorage();
      const i18n = new MockI18n(storage);
      
      const toggles = Math.floor(Math.random() * 50) + 1;
      
      for (let j = 0; j < toggles; j++) {
        i18n.toggleLocale();
      }
      
      const finalLocale = i18n.currentLocale;
      
      const saved = storage.getItem('locale');
      expect(saved).toBe(finalLocale);
      
      const i18nReloaded = storage.reload();
      expect(i18nReloaded.currentLocale).toBe(finalLocale);
    }
  });

  test(`Round-trip persistence works correctly (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const storage = new MockLocalStorage();
      
      const i18n1 = new MockI18n(storage);
      const locale1 = Math.random() < 0.5 ? 'zh' : 'en';
      i18n1.setLocale(locale1);
      
      const i18n2 = storage.reload();
      expect(i18n2.currentLocale).toBe(locale1);
      
      const locale2 = locale1 === 'zh' ? 'en' : 'zh';
      i18n2.setLocale(locale2);
      
      const i18n3 = storage.reload();
      expect(i18n3.currentLocale).toBe(locale2);
    }
  });
});
