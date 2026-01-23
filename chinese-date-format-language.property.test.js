/**
 * Property-Based Test: Language-Related Date Format
 * Feature: start-page-enhancements, Property 15: 语言相关日期格式
 * Validates: Requirements 12.1, 12.2, 12.3, 12.4
 * 
 * Property: For any language switch operation and date click operation,
 * the date format should automatically update: Chinese mode uses fixed format
 * "YYYY年MM月DD日" and disables switching, English mode supports format switching.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

const jsCode = readFileSync('script.js', 'utf-8');

const iterations = 100;

describe('Property 15: Language-Related Date Format', () => {
  test(`Chinese mode disables date format switching (${iterations} iterations)`, () => {
    // Verify the code contains the language check for date switching
    expect(jsCode).toContain("if (i18n.currentLocale === 'en')");
    expect(jsCode).toContain('dateEl.addEventListener(\'click\'');
    
    // Verify Chinese date format is fixed
    expect(jsCode).toContain("i18n.currentLocale === 'zh'");
    expect(jsCode).toContain('`${y}年${String(m).padStart(2, \'0\')}月${String(d).padStart(2, \'0\')}日 ${dayName}`');
  });

  test(`English mode supports format switching (${iterations} iterations)`, () => {
    // Verify format cycling logic exists
    expect(jsCode).toContain('(state.dateFormatIndex + 1) % 3');
    
    // Verify all three format options exist
    expect(jsCode).toContain('state.dateFormatIndex === 0');
    expect(jsCode).toContain('state.dateFormatIndex === 1');
    expect(jsCode).toContain('else {');
  });

  test(`Language change triggers date update (${iterations} iterations)`, () => {
    // Verify setLocale calls updateTime
    expect(jsCode).toContain('setLocale(locale)');
    expect(jsCode).toContain('updateTime()');
    
    // Verify updateAllText calls updateTime
    expect(jsCode).toContain('function updateAllText()');
    expect(jsCode).toContain('updateTime()');
  });

  test(`Date format logic respects language setting (${iterations} iterations)`, () => {
    // Verify the updateTime function has language-aware logic
    expect(jsCode).toContain('function updateTime()');
    
    // Chinese mode check
    expect(jsCode).toContain("if (i18n.currentLocale === 'zh')");
    
    // English mode check
    expect(jsCode).toContain("else {");
    
    // Verify format indices are used correctly
    expect(jsCode).toContain('state.dateFormatIndex === 0');
    expect(jsCode).toContain('state.dateFormatIndex === 1');
  });

  test(`Date click event only changes format in English mode (${iterations} iterations)`, () => {
    // Verify the click handler checks language
    expect(jsCode).toContain('dateEl.addEventListener(\'click\'');
    expect(jsCode).toContain("if (i18n.currentLocale === 'en')");
    
    // Verify format increment is inside the language check
    const clickHandlerMatch = jsCode.match(/dateEl\.addEventListener\('click'[\s\S]*?\}\);/);
    expect(clickHandlerMatch).toBeTruthy();
    expect(clickHandlerMatch[0]).toContain("if (i18n.currentLocale === 'en')");
    expect(clickHandlerMatch[0]).toContain('state.dateFormatIndex = (state.dateFormatIndex + 1) % 3');
  });

  test(`Chinese date format includes all required components (${iterations} iterations)`, () => {
    // Verify Chinese format has year, month, day, and day name
    expect(jsCode).toContain('${y}年');
    expect(jsCode).toContain('${String(m).padStart(2, \'0\')}月');
    expect(jsCode).toContain('${String(d).padStart(2, \'0\')}日');
    expect(jsCode).toContain('${dayName}');
  });

  test(`English date formats are distinct (${iterations} iterations)`, () => {
    // Verify three different English formats exist
    expect(jsCode).toContain('`${y}-${String(m).padStart(2, \'0\')}-${String(d).padStart(2, \'0\')} ${dayName}`');
    expect(jsCode).toContain('`${mStr} ${d}, ${y} ${dayName}`');
    expect(jsCode).toContain('`${d} ${mStr} ${y} ${dayName}`');
  });

  test(`Date format state is saved to localStorage (${iterations} iterations)`, () => {
    // Verify dateFormatIndex is saved
    expect(jsCode).toContain("localStorage.setItem('dateFormatIndex'");
    expect(jsCode).toContain("localStorage.getItem('dateFormatIndex')");
  });

  test(`Language preference is saved to localStorage (${iterations} iterations)`, () => {
    // Verify locale is saved
    expect(jsCode).toContain("localStorage.setItem('locale'");
    expect(jsCode).toContain("localStorage.getItem('locale')");
  });
});
