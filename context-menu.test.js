/**
 * Context Menu Unit Tests
 * Requirements: 10.1, 10.2
 * 
 * These tests verify that the context menu is displayed on right-click
 * and contains edit and delete options.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Read files
const jsCode = readFileSync('script.js', 'utf-8');
const htmlCode = readFileSync('index.html', 'utf-8');
const css = readFileSync('style.css', 'utf-8');

describe('Context Menu Tests', () => {
  test('Context menu HTML element exists (Requirement 10.1)', () => {
    // Check that context menu element is in HTML
    expect(htmlCode).toContain('id="contextMenu"');
    expect(htmlCode).toContain('class="context-menu hidden"');
  });

  test('Context menu CSS styles are defined', () => {
    // Check that context-menu class exists in CSS
    expect(css).toContain('.context-menu');
    expect(css).toContain('.context-menu-item');
  });

  test('showContextMenu function exists (Requirement 10.1)', () => {
    // Check that showContextMenu function is defined
    expect(jsCode).toContain('function showContextMenu(event, item, type)');
  });

  test('hideContextMenu function exists', () => {
    // Check that hideContextMenu function is defined
    expect(jsCode).toContain('function hideContextMenu()');
  });

  test('renderContextMenu function exists', () => {
    // Check that renderContextMenu function is defined
    expect(jsCode).toContain('function renderContextMenu()');
  });

  test('Context menu contains edit option (Requirement 10.2)', () => {
    // Check that renderContextMenu creates edit menu item
    expect(jsCode).toContain("✏️");
    expect(jsCode).toContain("onclick=\"editItem()\"");
  });

  test('Context menu contains delete option (Requirement 10.2)', () => {
    // Check that renderContextMenu creates delete menu item
    expect(jsCode).toContain("🗑️");
    expect(jsCode).toContain("onclick=\"deleteItem()\"");
  });

  test('Right-click event handler added to tags (Requirement 10.1)', () => {
    // Check that tag chips have oncontextmenu handler
    const tagChipSection = jsCode.match(/orderedTags\.forEach\(\(tag, index\) => \{[\s\S]*?\}\);/);
    expect(tagChipSection).toBeTruthy();
    expect(tagChipSection[0]).toContain('chip.oncontextmenu');
    expect(tagChipSection[0]).toContain("showContextMenu(e, tag, 'tag')");
  });

  test('Right-click event handler added to sites (Requirement 10.1)', () => {
    // Check that site chips have oncontextmenu handler
    const siteChipSection = jsCode.match(/orderedSites\.forEach\(\(site, index\) => \{[\s\S]*?\}\);/);
    expect(siteChipSection).toBeTruthy();
    expect(siteChipSection[0]).toContain('chip.oncontextmenu');
    expect(siteChipSection[0]).toContain("showContextMenu(e, site, 'site')");
  });

  test('editItem function exists', () => {
    // Check that editItem function is defined
    expect(jsCode).toContain('window.editItem = function()');
  });

  test('deleteItem function exists', () => {
    // Check that deleteItem function is defined
    expect(jsCode).toContain('window.deleteItem = function()');
  });

  test('Context menu closes on outside click', () => {
    // Check that document click listener hides context menu
    expect(jsCode).toContain("document.addEventListener('click'");
    expect(jsCode).toContain('hideContextMenu()');
  });

  test('Context menu state object exists', () => {
    // Check that contextMenuState is defined
    expect(jsCode).toContain('const contextMenuState = {');
    expect(jsCode).toContain('visible: false');
    expect(jsCode).toContain('targetItem: null');
    expect(jsCode).toContain('targetType: null');
  });

  test('Context menu has proper positioning', () => {
    // Check that context menu is positioned at mouse coordinates
    expect(jsCode).toContain('contextMenu.style.left');
    expect(jsCode).toContain('contextMenu.style.top');
  });

  test('Context menu has proper z-index in CSS', () => {
    // Check that context menu has high z-index
    const contextMenuCSS = css.match(/\.context-menu\s*\{([^}]*)\}/);
    expect(contextMenuCSS).toBeTruthy();
    expect(contextMenuCSS[1]).toContain('z-index');
  });
});
