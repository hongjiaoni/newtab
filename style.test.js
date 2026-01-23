/**
 * CSS Style Consistency Tests
 * Requirements: 2.1, 5.1
 * 
 * These tests verify that CSS styles meet the specified requirements.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Simple CSS parser to extract values
function getCSSValue(css, selector, property) {
  const selectorRegex = new RegExp(`${selector.replace('.', '\\.')}\\s*{([^}]*)}`, 'i');
  const match = css.match(selectorRegex);
  
  if (!match) return null;
  
  const rules = match[1];
  const propertyRegex = new RegExp(`${property}\\s*:\\s*([^;]+);`, 'i');
  const propMatch = rules.match(propertyRegex);
  
  return propMatch ? propMatch[1].trim() : null;
}

// Read CSS file
const css = readFileSync('style.css', 'utf-8');

describe('CSS Style Tests', () => {
  test('Search box border-radius > 24px (Requirement 2.1)', () => {
    const searchBoxRadius = getCSSValue(css, '.search-box', 'border-radius');
    expect(searchBoxRadius).toBeTruthy();
    const radiusValue = parseFloat(searchBoxRadius);
    expect(radiusValue).toBeGreaterThan(24);
  });

  test('Time element font-weight is bold (≥700) (Requirement 5.1)', () => {
    const timeWeight = getCSSValue(css, '.time', 'font-weight');
    expect(timeWeight).toBeTruthy();
    const weightValue = parseInt(timeWeight);
    expect(weightValue).toBeGreaterThanOrEqual(700);
  });

  test('Chip border-radius is 50px', () => {
    const chipRadius = getCSSValue(css, '.chip', 'border-radius');
    expect(chipRadius).toBeTruthy();
    const radiusValue = parseFloat(chipRadius);
    expect(radiusValue).toBe(50);
  });

  test('Button border-radius is 50px', () => {
    const buttonRadius = getCSSValue(css, 'button', 'border-radius');
    expect(buttonRadius).toBeTruthy();
    const radiusValue = parseFloat(buttonRadius);
    expect(radiusValue).toBe(50);
  });
});
