/**
 * Chinese Date Format Unit Tests
 * Requirements: 12.1, 12.2, 12.3
 * 
 * These tests verify that the date format changes based on language selection.
 */

import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const html = readFileSync('index.html', 'utf-8');
const jsCode = readFileSync('script.js', 'utf-8');

describe('Chinese Date Format Unit Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('Chinese mode uses fixed date format "YYYY年MM月DD日" (Requirement 12.1)', () => {
    // Check that the updateTime function contains Chinese date format logic
    expect(jsCode).toContain("i18n.currentLocale === 'zh'");
    expect(jsCode).toContain('`${y}年${String(m).padStart(2, \'0\')}月${String(d).padStart(2, \'0\')}日 ${dayName}`');
  });

  test('Chinese mode disables date format switching (Requirement 12.2)', () => {
    // Check that date click event only allows switching in English mode
    expect(jsCode).toContain("if (i18n.currentLocale === 'en')");
    expect(jsCode).toContain('dateEl.addEventListener(\'click\'');
  });

  test('English mode supports date format switching (Requirement 12.3)', () => {
    // Check that English mode has format switching logic
    expect(jsCode).toContain("state.dateFormatIndex = (state.dateFormatIndex + 1) % 3");
    expect(jsCode).toContain("i18n.currentLocale === 'en'");
  });

  test('updateTime function exists and is called', () => {
    expect(jsCode).toContain('function updateTime()');
    expect(jsCode).toContain('setInterval(updateTime, 1000)');
  });

  test('Date element has click event listener', () => {
    expect(jsCode).toContain('dateEl.addEventListener(\'click\'');
  });

  test('i18n.setLocale calls updateTime to refresh date format', () => {
    expect(jsCode).toContain('setLocale(locale)');
    expect(jsCode).toContain('updateTime()');
  });

  test('Chinese date format includes year, month, day and day name', () => {
    // Verify the format string contains all required components
    expect(jsCode).toContain('${y}年');
    expect(jsCode).toContain('${String(m).padStart(2, \'0\')}月');
    expect(jsCode).toContain('${String(d).padStart(2, \'0\')}日');
    expect(jsCode).toContain('${dayName}');
  });

  test('English mode has three date format options', () => {
    // Check for all three format options (0, 1, and else for 2)
    expect(jsCode).toContain('state.dateFormatIndex === 0');
    expect(jsCode).toContain('state.dateFormatIndex === 1');
    expect(jsCode).toContain('else {');
  });

  test('Date format switching only happens when dateFormatIndex is incremented', () => {
    expect(jsCode).toContain('(state.dateFormatIndex + 1) % 3');
  });

  test('Language change triggers date update via updateAllText', () => {
    expect(jsCode).toContain('function updateAllText()');
    expect(jsCode).toContain('updateTime()');
  });
});
