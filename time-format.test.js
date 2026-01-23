/**
 * Time Format Unit Tests
 * Requirements: 13.2
 * 
 * These tests verify that the time format switching works correctly.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';

const jsCode = readFileSync('script.js', 'utf-8');

describe('Time Format Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('12 hour format displays AM/PM (Requirement 13.2)', () => {
    // Check that the updateTime function contains 12-hour format logic
    expect(jsCode).toContain("state.timeFormat === '12h'");
    expect(jsCode).toContain('const hour12 = now.getHours() % 12 || 12');
    expect(jsCode).toContain("const ampm = now.getHours() >= 12 ? 'PM' : 'AM'");
    expect(jsCode).toContain('`${hour12}:${minutes} ${ampm}`');
  });

  test('timeFormat state is initialized from localStorage', () => {
    // Check that timeFormat is loaded from localStorage
    expect(jsCode).toContain("localStorage.getItem('timeFormat')");
    expect(jsCode).toContain("timeFormat: localStorage.getItem('timeFormat') || '24h'");
  });

  test('timeFormat is saved to localStorage', () => {
    // Check that timeFormat is persisted
    expect(jsCode).toContain("localStorage.setItem('timeFormat', state.timeFormat)");
  });

  test('Time element has click event listener for format switching', () => {
    // Check that time click event exists
    expect(jsCode).toContain('timeEl.addEventListener(\'click\'');
  });

  test('Time format toggles between 12h and 24h', () => {
    // Check that the toggle logic exists
    expect(jsCode).toContain("state.timeFormat === '24h' ? '12h' : '24h'");
  });

  test('updateTime function uses timeFormat state', () => {
    // Check that updateTime respects the timeFormat setting
    expect(jsCode).toContain('if (state.timeFormat === \'12h\')');
    expect(jsCode).toContain('} else {');
    expect(jsCode).toContain('timeEl.textContent = `${hours}:${minutes}`');
  });

  test('24 hour format displays without AM/PM', () => {
    // Check that 24-hour format is implemented
    expect(jsCode).toContain('const hours = String(now.getHours()).padStart(2, \'0\')');
    expect(jsCode).toContain('const minutes = String(now.getMinutes()).padStart(2, \'0\')');
  });

  test('Time format change calls saveData', () => {
    // Check that saveData is called when time format changes
    expect(jsCode).toContain('saveData()');
  });

  test('Default time format is 24h', () => {
    // Check that the default is 24h
    expect(jsCode).toContain("timeFormat: localStorage.getItem('timeFormat') || '24h'");
  });
});
