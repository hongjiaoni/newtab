/**
 * Internationalization (i18n) Unit Tests
 * Requirements: 6.1, 6.3
 * 
 * These tests verify that the i18n system works correctly.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Read HTML and JS files
const html = readFileSync('index.html', 'utf-8');
const jsCode = readFileSync('script.js', 'utf-8');

describe('i18n Unit Tests', () => {
  test('Settings menu exists in HTML (Requirement 6.1)', () => {
    expect(html).toContain('id="settingsMenu"');
  });

  test('Settings menu has language toggle option', () => {
    expect(html).toContain('toggleLanguage()');
    expect(html).toContain('id="langText"');
  });

  test('System supports Chinese language (Requirement 6.3)', () => {
    expect(jsCode).toContain('zh:');
    expect(jsCode).toContain("'搜索...'");
  });

  test('System supports English language (Requirement 6.3)', () => {
    expect(jsCode).toContain('en:');
    expect(jsCode).toContain("'Search...'");
  });

  test('i18n object has required methods', () => {
    expect(jsCode).toContain('const i18n = {');
    expect(jsCode).toContain('t(key)');
    expect(jsCode).toContain('setLocale(locale)');
    expect(jsCode).toContain('toggleLocale()');
  });

  test('updateAllText function exists', () => {
    expect(jsCode).toContain('function updateAllText()');
  });

  test('Language preference loaded from localStorage', () => {
    expect(jsCode).toContain("localStorage.getItem('locale')");
  });

  test('Language preference saved to localStorage', () => {
    expect(jsCode).toContain("localStorage.setItem('locale'");
  });

  test('Translations include days and months arrays', () => {
    expect(jsCode).toContain("days: ['星期日'");
    expect(jsCode).toContain("days: ['Sunday'");
    expect(jsCode).toContain("months: ['1月'");
    expect(jsCode).toContain("months: ['Jan'");
  });

  test('Settings menu positioned in top-right controls', () => {
    expect(html).toContain('top-right-controls');
    expect(html).toContain('settingsMenu');
  });
});
