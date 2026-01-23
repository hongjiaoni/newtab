/**
 * Add Button Removal Unit Tests
 * Requirements: 15.1, 15.2, 15.3
 * 
 * These tests verify that:
 * 1. The standalone add button has been removed from HTML
 * 2. The inline add button (as chip) still exists
 * 3. The inline add button is clickable
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Read files
const htmlCode = readFileSync('index.html', 'utf-8');
const jsCode = readFileSync('script.js', 'utf-8');

describe('Add Button Removal Tests', () => {
  test('Standalone add button is removed from HTML (Requirement 15.1)', () => {
    // Check that the standalone button with id="addBtn" is not in HTML
    expect(htmlCode).not.toContain('id="addBtn"');
    expect(htmlCode).not.toContain('class="add-btn"');
  });

  test('Inline add button (as chip) exists in renderHome (Requirement 15.2)', () => {
    // Check that renderHome creates an add chip element
    expect(jsCode).toContain("addChip.className = 'chip add-chip'");
    expect(jsCode).toContain("addChip.textContent = '＋'");
  });

  test('Inline add button is appended to content area (Requirement 15.2)', () => {
    // Check that add chip is appended to contentEl
    expect(jsCode).toContain('contentEl.appendChild(addChip)');
  });

  test('Inline add button is clickable and opens modal (Requirement 15.3)', () => {
    // Check that add chip has onclick handler
    expect(jsCode).toContain('addChip.onclick = () => {');
    
    // Check that it opens the modal
    const addChipSection = jsCode.match(/addChip\.onclick = \(\) => \{[\s\S]*?contentEl\.appendChild\(addChip\);/);
    expect(addChipSection).toBeTruthy();
    expect(addChipSection[0]).toContain("addModal.classList.remove('hidden')");
    expect(addChipSection[0]).toContain("modalOverlay.classList.remove('hidden')");
  });

  test('No reference to standalone addBtn in JavaScript (Requirement 15.1)', () => {
    // Check that there's no reference to document.getElementById('addBtn')
    expect(jsCode).not.toContain("document.getElementById('addBtn')");
    expect(jsCode).not.toContain('const addBtn = ');
  });

  test('Inline add button is rendered after all sites (Requirement 15.2)', () => {
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
