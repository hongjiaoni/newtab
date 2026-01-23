/**
 * Add Button Unit Tests
 * Requirements: 4.1, 4.3, 4.4
 * 
 * These tests verify that the add button is rendered as a chip with proper styling.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Read files
const jsCode = readFileSync('script.js', 'utf-8');
const css = readFileSync('style.css', 'utf-8');

// Simple CSS parser to extract values
function getCSSValue(css, selector, property) {
  const selectorRegex = new RegExp(`${selector.replace(/\./g, '\\.').replace(/\s+/g, '\\s*')}\\s*{([^}]*)}`, 'i');
  const match = css.match(selectorRegex);
  
  if (!match) return null;
  
  const rules = match[1];
  const propertyRegex = new RegExp(`${property}\\s*:\\s*([^;]+);`, 'i');
  const propMatch = rules.match(propertyRegex);
  
  return propMatch ? propMatch[1].trim() : null;
}

describe('Add Button Tests', () => {
  test('Add button is rendered as chip element (Requirement 4.1)', () => {
    // Check that renderHome creates an element with 'chip add-chip' classes
    expect(jsCode).toContain("addChip.className = 'chip add-chip'");
  });

  test('Add button has chip styling (Requirement 4.1)', () => {
    // Verify add-chip class exists in CSS
    expect(css).toContain('.chip.add-chip');
  });

  test('Add button is clickable and opens modal (Requirement 4.3)', () => {
    // Check that add chip has onclick handler
    expect(jsCode).toContain('addChip.onclick');
    
    // Check that it opens the modal
    const addChipSection = jsCode.match(/addChip\.onclick = \(\) => \{[\s\S]*?\};/);
    expect(addChipSection).toBeTruthy();
    expect(addChipSection[0]).toContain("addModal.classList.remove('hidden')");
    expect(addChipSection[0]).toContain("modalOverlay.classList.remove('hidden')");
  });

  test('Add button has hover effect (Requirement 4.4)', () => {
    // Check that add-chip has hover styling
    const hoverOpacity = getCSSValue(css, '.chip.add-chip:hover', 'opacity');
    expect(hoverOpacity).toBeTruthy();
    expect(parseFloat(hoverOpacity)).toBe(1);
  });

  test('Add button uses dashed border style', () => {
    const borderStyle = getCSSValue(css, '.chip.add-chip', 'border');
    expect(borderStyle).toBeTruthy();
    expect(borderStyle).toContain('dashed');
  });

  test('Add button has appropriate opacity', () => {
    const opacity = getCSSValue(css, '.chip.add-chip', 'opacity');
    expect(opacity).toBeTruthy();
    expect(parseFloat(opacity)).toBeLessThan(1);
  });

  test('Add button is appended after all sites', () => {
    // Check that addChip is appended at the end of renderHome
    const renderHomeMatch = jsCode.match(/function renderHome\(\) \{[\s\S]*?\n\}/);
    expect(renderHomeMatch).toBeTruthy();
    
    const renderHomeCode = renderHomeMatch[0];
    const addChipIndex = renderHomeCode.indexOf('addChip');
    const siteRenderIndex = renderHomeCode.lastIndexOf("chip.className = 'chip site'");
    
    // addChip should come after site rendering
    expect(addChipIndex).toBeGreaterThan(siteRenderIndex);
  });
});
