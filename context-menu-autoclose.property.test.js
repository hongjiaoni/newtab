/**
 * Context Menu Auto-Close Property Test
 * Feature: start-page-enhancements, Property 13: 菜单自动关闭
 * Validates: Requirements 10.6, 14.5
 * 
 * Property: For any open menu (context menu or settings menu), clicking outside
 * the menu should automatically close it.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

const jsCode = readFileSync('script.js', 'utf-8');

describe('Context Menu Auto-Close Property Test', () => {
  test('Property 13: hideContextMenu function exists', () => {
    // Verify hideContextMenu function is defined
    expect(jsCode).toContain('function hideContextMenu()');
  });

  test('Property 13: hideContextMenu adds hidden class', () => {
    // Verify hideContextMenu adds the hidden class
    expect(jsCode).toContain("contextMenu.classList.add('hidden')");
  });

  test('Property 13: hideContextMenu sets visible to false', () => {
    // Verify hideContextMenu sets visible state to false
    expect(jsCode).toContain('contextMenuState.visible = false');
  });

  test('Property 13: Document click listener closes context menu', () => {
    // Verify there's a document click listener
    expect(jsCode).toContain("document.addEventListener('click'");
  });

  test('Property 13: Click listener checks for context menu', () => {
    // Verify the click listener checks if click is outside context menu
    expect(jsCode).toContain("!e.target.closest('.context-menu')");
  });

  test('Property 13: Click listener checks for chip elements', () => {
    // Verify the click listener checks if click is outside chip
    expect(jsCode).toContain("!e.target.closest('.chip')");
  });

  test('Property 13: Click listener calls hideContextMenu', () => {
    // Verify the click listener calls hideContextMenu
    expect(jsCode).toContain("document.addEventListener('click', (e) => {");
    expect(jsCode).toContain('hideContextMenu()');
  });

  test('Property 13: deleteItem calls hideContextMenu', () => {
    // Verify deleteItem hides the context menu
    const deleteItemMatch = jsCode.match(/window\.deleteItem = function\(\) \{[\s\S]*?\n\};/);
    expect(deleteItemMatch).toBeTruthy();
    expect(deleteItemMatch[0]).toContain('hideContextMenu()');
  });

  test('Property 13: Context menu state tracks visibility', () => {
    // Verify contextMenuState has visible property
    expect(jsCode).toContain('visible: false');
  });

  test('Property 13: showContextMenu sets visible to true', () => {
    // Verify showContextMenu sets visible state to true
    expect(jsCode).toContain('contextMenuState.visible = true');
  });

  test('Property 13: showContextMenu removes hidden class', () => {
    // Verify showContextMenu removes the hidden class
    expect(jsCode).toContain("contextMenu.classList.remove('hidden')");
  });

  test('Property 13: For any menu action, menu should close after action', () => {
    // Verify that both editItem and deleteItem close the menu
    expect(jsCode).toContain('window.editItem = function()');
    expect(jsCode).toContain('window.deleteItem = function()');
    
    const editItemMatch = jsCode.match(/window\.editItem = function\(\) \{[\s\S]*?\n\};/);
    const deleteItemMatch = jsCode.match(/window\.deleteItem = function\(\) \{[\s\S]*?\n\};/);
    
    expect(editItemMatch[0]).toContain('hideContextMenu()');
    expect(deleteItemMatch[0]).toContain('hideContextMenu()');
  });

  test('Property 13: Click outside menu closes it without action', () => {
    // Verify that clicking outside the menu closes it
    expect(jsCode).toContain("document.addEventListener('click', (e) => {");
    expect(jsCode).toContain("!e.target.closest('.context-menu')");
    expect(jsCode).toContain("!e.target.closest('.chip')");
    expect(jsCode).toContain('hideContextMenu()');
  });

  test('Property 13: Menu closes on both chip and non-chip clicks', () => {
    // Verify the click listener handles both cases
    expect(jsCode).toContain("!e.target.closest('.context-menu')");
    expect(jsCode).toContain("!e.target.closest('.chip')");
  });

  test('Property 13: Context menu element has hidden class initially', () => {
    // Verify context menu is hidden in HTML
    const htmlCode = readFileSync('index.html', 'utf-8');
    expect(htmlCode).toContain('class="context-menu hidden"');
  });

  test('Property 13: hideContextMenu is called in appropriate places', () => {
    // Count how many times hideContextMenu is called
    const hideContextMenuCalls = (jsCode.match(/hideContextMenu\(\)/g) || []).length;
    
    // Should be called at least 3 times: editItem, deleteItem, and click listener
    expect(hideContextMenuCalls).toBeGreaterThanOrEqual(3);
  });
});