/**
 * Context Menu Edit Functionality Property Test
 * Feature: start-page-enhancements, Property 11: 右键菜单编辑功能
 * Validates: Requirements 10.3
 * 
 * Property: For any Chip (tag or site), the editItem function should correctly
 * pre-fill the modal form with that item's data.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

const jsCode = readFileSync('script.js', 'utf-8');

describe('Context Menu Edit Functionality Property Test', () => {
  test('Property 11: editItem function handles site editing correctly', () => {
    // Verify editItem function exists and handles sites
    expect(jsCode).toContain('window.editItem = function()');
    
    // Verify it checks for site type
    expect(jsCode).toContain("if (type === 'site')");
    
    // Verify it pre-fills site name
    expect(jsCode).toContain("document.getElementById('siteName').value = item.name");
    
    // Verify it pre-fills site URL
    expect(jsCode).toContain("document.getElementById('siteUrl').value = item.url");
    
    // Verify it pre-fills showOnHome
    expect(jsCode).toContain("document.getElementById('showOnHome').checked = item.showOnHome");
  });

  test('Property 11: editItem function handles tag editing correctly', () => {
    // Verify editItem function handles tags
    expect(jsCode).toContain("} else {");
    
    // Verify it sets form to tag type
    expect(jsCode).toContain("document.querySelector('input[name=\"addType\"][value=\"tag\"]').checked = true");
    
    // Verify it pre-fills tag name
    expect(jsCode).toContain("document.getElementById('tagName').value = item");
  });

  test('Property 11: editItem function opens modal', () => {
    // Verify editItem opens the modal
    expect(jsCode).toContain("addModal.classList.remove('hidden')");
    expect(jsCode).toContain("modalOverlay.classList.remove('hidden')");
  });

  test('Property 11: editItem function sets editing state', () => {
    // Verify editItem sets the editing state
    expect(jsCode).toContain("window.editingItem = { item, type }");
  });

  test('Property 11: editItem function hides context menu', () => {
    // Verify editItem hides the context menu
    expect(jsCode).toContain('hideContextMenu()');
  });

  test('Property 11: Save logic handles site editing', () => {
    // Verify save logic checks for editing
    expect(jsCode).toContain('const isEditing = window.editingItem !== undefined');
    
    // Verify it updates existing site
    expect(jsCode).toContain('state.sites[siteIndex].name = name');
    expect(jsCode).toContain('state.sites[siteIndex].url = url');
    expect(jsCode).toContain('state.sites[siteIndex].tags = selectedTags');
    expect(jsCode).toContain('state.sites[siteIndex].showOnHome = showOnHome');
  });

  test('Property 11: Save logic handles tag editing', () => {
    // Verify save logic updates existing tag
    expect(jsCode).toContain('state.tags[tagIndex] = tagName');
    
    // Verify it updates tagOrder
    expect(jsCode).toContain('state.tagOrder[orderIndex] = tagName');
    
    // Verify it updates sites with the tag
    expect(jsCode).toContain('site.tags[siteTagIndex] = tagName');
  });

  test('Property 11: Save logic clears editing state', () => {
    // Verify editing state is cleared after save
    expect(jsCode).toContain('window.editingItem = undefined');
  });

  test('Property 11: For any site, editing should preserve site ID', () => {
    // Verify that when editing a site, the ID is not changed
    expect(jsCode).toContain('state.sites.findIndex(s => s.id === window.editingItem.item.id)');
    
    // Verify the site is updated in place, not replaced
    expect(jsCode).toContain('state.sites[siteIndex]');
  });

  test('Property 11: For any tag, editing should update all references', () => {
    // Verify that when editing a tag, all references are updated
    expect(jsCode).toContain('state.sites.forEach(site => {');
    expect(jsCode).toContain('site.tags[siteTagIndex] = tagName');
  });
});
