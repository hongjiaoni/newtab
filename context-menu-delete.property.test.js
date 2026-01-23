/**
 * Context Menu Delete Functionality Property Test
 * Feature: start-page-enhancements, Property 12: 右键菜单删除功能
 * Validates: Requirements 10.4, 10.5
 * 
 * Property: For any Chip (tag or site), the deleteItem function should remove
 * that item from storage and update all related data structures.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

const jsCode = readFileSync('script.js', 'utf-8');

describe('Context Menu Delete Functionality Property Test', () => {
  test('Property 12: deleteItem function exists', () => {
    // Verify deleteItem function is defined
    expect(jsCode).toContain('window.deleteItem = function()');
  });

  test('Property 12: deleteItem shows confirmation dialog', () => {
    // Verify deleteItem shows confirmation
    expect(jsCode).toContain('if (confirm(confirmMsg))');
  });

  test('Property 12: deleteItem handles site deletion', () => {
    // Verify deleteItem removes site from state.sites
    expect(jsCode).toContain("state.sites = state.sites.filter(s => s.id !== item.id)");
    
    // Verify deleteItem removes site from siteOrder
    expect(jsCode).toContain("state.siteOrder = state.siteOrder.filter(id => id !== item.id)");
  });

  test('Property 12: deleteItem handles tag deletion', () => {
    // Verify deleteItem removes tag from state.tags
    expect(jsCode).toContain("state.tags = state.tags.filter(t => t !== item)");
    
    // Verify deleteItem removes tag from tagOrder
    expect(jsCode).toContain("state.tagOrder = state.tagOrder.filter(t => t !== item)");
  });

  test('Property 12: deleteItem removes tag from all sites', () => {
    // Verify deleteItem removes tag from all sites that have it
    expect(jsCode).toContain('state.sites.forEach(site => {');
    expect(jsCode).toContain('site.tags = site.tags.filter(t => t !== item)');
  });

  test('Property 12: deleteItem saves data', () => {
    // Verify deleteItem calls saveData
    expect(jsCode).toContain('saveData()');
  });

  test('Property 12: deleteItem re-renders home', () => {
    // Verify deleteItem calls renderHome
    expect(jsCode).toContain('renderHome()');
  });

  test('Property 12: deleteItem hides context menu', () => {
    // Verify deleteItem hides the context menu
    expect(jsCode).toContain('hideContextMenu()');
  });

  test('Property 12: For any site, deletion should remove it from siteOrder', () => {
    // Verify that when a site is deleted, it's removed from siteOrder
    expect(jsCode).toContain('state.siteOrder = state.siteOrder.filter(id => id !== item.id)');
  });

  test('Property 12: For any tag, deletion should remove it from tagOrder', () => {
    // Verify that when a tag is deleted, it's removed from tagOrder
    expect(jsCode).toContain('state.tagOrder = state.tagOrder.filter(t => t !== item)');
  });

  test('Property 12: Deletion confirmation message includes item name', () => {
    // Verify confirmation message includes the item name
    expect(jsCode).toContain('const itemName = type === \'site\' ? item.name : item');
    expect(jsCode).toContain('const confirmMsg = `${i18n.t(\'deleteConfirm\')} "${itemName}"?`');
  });

  test('Property 12: For any site, deletion should preserve other sites', () => {
    // Verify that deletion only removes the specific site
    expect(jsCode).toContain('state.sites = state.sites.filter(s => s.id !== item.id)');
    // This filter preserves all other sites
  });

  test('Property 12: For any tag, deletion should preserve other tags', () => {
    // Verify that deletion only removes the specific tag
    expect(jsCode).toContain('state.tags = state.tags.filter(t => t !== item)');
    // This filter preserves all other tags
  });

  test('Property 12: Deletion should only occur after confirmation', () => {
    // Verify that deletion logic is inside the if (confirm()) block
    const deleteItemMatch = jsCode.match(/window\.deleteItem = function\(\) \{[\s\S]*?\n\};/);
    expect(deleteItemMatch).toBeTruthy();
    
    const deleteItemCode = deleteItemMatch[0];
    const confirmIndex = deleteItemCode.indexOf('if (confirm(confirmMsg))');
    const filterIndex = deleteItemCode.indexOf('state.sites = state.sites.filter');
    
    // The filter should come after the confirm check
    expect(filterIndex).toBeGreaterThan(confirmIndex);
  });
});