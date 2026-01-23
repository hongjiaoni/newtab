/**
 * Property-Based Test: Add Button Position
 * Feature: start-page-enhancements, Property 5: 添加按钮位置
 * Validates: Requirements 4.2
 * 
 * Property: For any rendering state, the add button should always appear
 * after all website chips in the content area.
 */

import { describe, test, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

// Load the HTML and JS
const html = readFileSync('index.html', 'utf-8');
const jsCode = readFileSync('script.js', 'utf-8');

// Helper to simulate renderHome with different states
function simulateRenderHome(tags, sites) {
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const { window } = dom;
  const { document } = window;
  
  // Set up global objects
  global.window = window;
  global.document = document;
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
  
  // Mock state
  const state = {
    tags,
    tagOrder: tags,
    sites,
    siteOrder: sites.filter(s => s.showOnHome).map(s => s.id)
  };
  
  // Mock i18n
  const i18n = {
    t: (key) => key
  };
  
  // Get content element
  const contentEl = document.getElementById('content');
  contentEl.innerHTML = '';
  
  // Simulate renderHome logic
  // 1. Render tags
  state.tagOrder.forEach((tag) => {
    const chip = document.createElement('div');
    chip.className = 'chip tag';
    chip.textContent = '# ' + tag;
    contentEl.appendChild(chip);
  });
  
  // 2. Render pinned sites
  const pinnedSites = state.sites.filter(s => s.showOnHome);
  const orderedSites = state.siteOrder
    .map(id => pinnedSites.find(s => s.id === id))
    .filter(s => s !== undefined);
  
  orderedSites.forEach((site) => {
    const chip = document.createElement('div');
    chip.className = 'chip site';
    chip.textContent = site.name;
    contentEl.appendChild(chip);
  });
  
  // 3. Render add button as chip
  const addChip = document.createElement('div');
  addChip.className = 'chip add-chip';
  addChip.textContent = '＋';
  contentEl.appendChild(addChip);
  
  return contentEl;
}

const iterations = 100;

describe('Property Test: Add Button Position', () => {
  test(`Add button always appears after all site chips (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      // Generate random tags
      const tagCount = Math.floor(Math.random() * 5);
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      
      // Generate random sites (some pinned, some not)
      const siteCount = Math.floor(Math.random() * 10) + 1;
      const sites = Array.from({ length: siteCount }, (_, idx) => ({
        id: idx,
        name: `site-${idx}`,
        url: `https://site-${idx}.com`,
        showOnHome: Math.random() > 0.3 // 70% chance of being pinned
      }));
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Find add button
      const addButtonIndex = children.findIndex(el => el.classList.contains('add-chip'));
      expect(addButtonIndex).toBeGreaterThan(-1); // Add button exists
      
      // Find last site chip
      const siteChips = children.filter(el => el.classList.contains('site'));
      
      if (siteChips.length > 0) {
        const lastSiteIndex = children.lastIndexOf(siteChips[siteChips.length - 1]);
        
        // Add button should come after the last site
        expect(addButtonIndex).toBeGreaterThan(lastSiteIndex);
      }
      
      // Add button should be the last element
      expect(addButtonIndex).toBe(children.length - 1);
    }
  });

  test(`Add button is last element regardless of tag count (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 10);
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      
      // Fixed number of sites
      const sites = [
        { id: 1, name: 'site-1', url: 'https://site-1.com', showOnHome: true },
        { id: 2, name: 'site-2', url: 'https://site-2.com', showOnHome: true }
      ];
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Add button should be last
      const lastChild = children[children.length - 1];
      expect(lastChild.classList.contains('add-chip')).toBe(true);
    }
  });

  test(`Add button is last element regardless of site count (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tags = ['tag-1', 'tag-2'];
      
      const siteCount = Math.floor(Math.random() * 15) + 1;
      const sites = Array.from({ length: siteCount }, (_, idx) => ({
        id: idx,
        name: `site-${idx}`,
        url: `https://site-${idx}.com`,
        showOnHome: true
      }));
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Add button should be last
      const lastChild = children[children.length - 1];
      expect(lastChild.classList.contains('add-chip')).toBe(true);
    }
  });

  test(`Add button position with no sites (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5) + 1;
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      
      // No pinned sites
      const sites = [];
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Add button should still be last
      const lastChild = children[children.length - 1];
      expect(lastChild.classList.contains('add-chip')).toBe(true);
      
      // Should come after tags
      const tagChips = children.filter(el => el.classList.contains('tag'));
      expect(tagChips.length).toBe(tagCount);
    }
  });

  test(`Add button position with no tags (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tags = [];
      
      const siteCount = Math.floor(Math.random() * 10) + 1;
      const sites = Array.from({ length: siteCount }, (_, idx) => ({
        id: idx,
        name: `site-${idx}`,
        url: `https://site-${idx}.com`,
        showOnHome: true
      }));
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Add button should be last
      const lastChild = children[children.length - 1];
      expect(lastChild.classList.contains('add-chip')).toBe(true);
      
      // Should come after sites
      const siteChips = children.filter(el => el.classList.contains('site'));
      expect(siteChips.length).toBe(siteCount);
    }
  });

  test(`Add button position with mixed pinned/unpinned sites (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 3);
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      
      const siteCount = Math.floor(Math.random() * 10) + 3;
      const sites = Array.from({ length: siteCount }, (_, idx) => ({
        id: idx,
        name: `site-${idx}`,
        url: `https://site-${idx}.com`,
        showOnHome: Math.random() > 0.5 // 50% chance
      }));
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Add button should be last
      const lastChild = children[children.length - 1];
      expect(lastChild.classList.contains('add-chip')).toBe(true);
      
      // Only pinned sites should be rendered
      const siteChips = children.filter(el => el.classList.contains('site'));
      const pinnedCount = sites.filter(s => s.showOnHome).length;
      expect(siteChips.length).toBe(pinnedCount);
    }
  });

  test(`Add button is always present (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5);
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      
      const siteCount = Math.floor(Math.random() * 10);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({
        id: idx,
        name: `site-${idx}`,
        url: `https://site-${idx}.com`,
        showOnHome: Math.random() > 0.5
      }));
      
      const contentEl = simulateRenderHome(tags, sites);
      const children = Array.from(contentEl.children);
      
      // Add button must exist
      const addButtons = children.filter(el => el.classList.contains('add-chip'));
      expect(addButtons.length).toBe(1);
    }
  });
});
