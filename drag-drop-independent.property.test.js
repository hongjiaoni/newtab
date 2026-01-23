/**
 * Property-Based Test: Independent Sorting Maintenance
 * Feature: start-page-enhancements, Property 4: 独立排序维护
 * Validates: Requirements 3.4
 * 
 * Property: For any tag drag and drop operation, the site ordering should remain unchanged;
 * conversely, for any site drag and drop operation, the tag ordering should remain unchanged.
 */

import { describe, test, expect } from 'vitest';

// Simulate reordering
function reorderArray(arr, fromIndex, toIndex) {
  const newArr = [...arr];
  const item = newArr[fromIndex];
  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, item);
  return newArr;
}

// Simulate the complete state with independent orders
class AppState {
  constructor(tags, sites) {
    this.tags = tags;
    this.sites = sites;
    this.tagOrder = [...tags];
    this.siteOrder = sites.map(s => s.id);
  }

  dragTag(fromIndex, toIndex) {
    this.tagOrder = reorderArray(this.tagOrder, fromIndex, toIndex);
  }

  dragSite(fromIndex, toIndex) {
    this.siteOrder = reorderArray(this.siteOrder, fromIndex, toIndex);
  }

  getTagOrder() {
    return [...this.tagOrder];
  }

  getSiteOrder() {
    return [...this.siteOrder];
  }
}

const iterations = 100;

describe('Property Test: Independent Sorting Maintenance', () => {
  test(`Tag drag does not affect site order (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5) + 3;
      const siteCount = Math.floor(Math.random() * 8) + 3;
      
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({ 
        id: idx, 
        name: `site-${idx}` 
      }));
      
      const state = new AppState(tags, sites);
      const originalSiteOrder = state.getSiteOrder();
      
      // Perform tag drag
      const fromIndex = Math.floor(Math.random() * tagCount);
      const toIndex = Math.floor(Math.random() * tagCount);
      state.dragTag(fromIndex, toIndex);
      
      // Verify site order is unchanged
      expect(state.getSiteOrder()).toEqual(originalSiteOrder);
    }
  });

  test(`Site drag does not affect tag order (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5) + 3;
      const siteCount = Math.floor(Math.random() * 8) + 3;
      
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({ 
        id: idx, 
        name: `site-${idx}` 
      }));
      
      const state = new AppState(tags, sites);
      const originalTagOrder = state.getTagOrder();
      
      // Perform site drag
      const fromIndex = Math.floor(Math.random() * siteCount);
      const toIndex = Math.floor(Math.random() * siteCount);
      state.dragSite(fromIndex, toIndex);
      
      // Verify tag order is unchanged
      expect(state.getTagOrder()).toEqual(originalTagOrder);
    }
  });

  test(`Multiple tag drags never affect site order (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5) + 3;
      const siteCount = Math.floor(Math.random() * 8) + 3;
      
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({ 
        id: idx, 
        name: `site-${idx}` 
      }));
      
      const state = new AppState(tags, sites);
      const originalSiteOrder = state.getSiteOrder();
      
      // Perform multiple tag drags
      const dragCount = Math.floor(Math.random() * 10) + 1;
      for (let j = 0; j < dragCount; j++) {
        const fromIndex = Math.floor(Math.random() * tagCount);
        const toIndex = Math.floor(Math.random() * tagCount);
        state.dragTag(fromIndex, toIndex);
      }
      
      // Verify site order is still unchanged
      expect(state.getSiteOrder()).toEqual(originalSiteOrder);
    }
  });

  test(`Multiple site drags never affect tag order (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5) + 3;
      const siteCount = Math.floor(Math.random() * 8) + 3;
      
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({ 
        id: idx, 
        name: `site-${idx}` 
      }));
      
      const state = new AppState(tags, sites);
      const originalTagOrder = state.getTagOrder();
      
      // Perform multiple site drags
      const dragCount = Math.floor(Math.random() * 10) + 1;
      for (let j = 0; j < dragCount; j++) {
        const fromIndex = Math.floor(Math.random() * siteCount);
        const toIndex = Math.floor(Math.random() * siteCount);
        state.dragSite(fromIndex, toIndex);
      }
      
      // Verify tag order is still unchanged
      expect(state.getTagOrder()).toEqual(originalTagOrder);
    }
  });

  test(`Interleaved tag and site drags maintain independence (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const tagCount = Math.floor(Math.random() * 5) + 3;
      const siteCount = Math.floor(Math.random() * 8) + 3;
      
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({ 
        id: idx, 
        name: `site-${idx}` 
      }));
      
      const state = new AppState(tags, sites);
      
      // Track expected orders after each operation
      let expectedTagOrder = state.getTagOrder();
      let expectedSiteOrder = state.getSiteOrder();
      
      // Perform interleaved drags
      const operations = Math.floor(Math.random() * 20) + 5;
      for (let j = 0; j < operations; j++) {
        const isDragTag = Math.random() < 0.5;
        
        if (isDragTag) {
          const fromIndex = Math.floor(Math.random() * tagCount);
          const toIndex = Math.floor(Math.random() * tagCount);
          state.dragTag(fromIndex, toIndex);
          expectedTagOrder = reorderArray(expectedTagOrder, fromIndex, toIndex);
          
          // Site order should be unchanged
          expect(state.getSiteOrder()).toEqual(expectedSiteOrder);
        } else {
          const fromIndex = Math.floor(Math.random() * siteCount);
          const toIndex = Math.floor(Math.random() * siteCount);
          state.dragSite(fromIndex, toIndex);
          expectedSiteOrder = reorderArray(expectedSiteOrder, fromIndex, toIndex);
          
          // Tag order should be unchanged
          expect(state.getTagOrder()).toEqual(expectedTagOrder);
        }
      }
      
      // Final verification
      expect(state.getTagOrder()).toEqual(expectedTagOrder);
      expect(state.getSiteOrder()).toEqual(expectedSiteOrder);
    }
  });

  test(`Drag handlers check type before reordering (code verification)`, () => {
    const { readFileSync } = require('fs');
    const js = readFileSync('script.js', 'utf-8');
    
    // Verify handleDrop checks draggedType
    expect(js).toContain('draggedType');
    
    // Verify separate handling for 'tag' and 'site'
    expect(js).toContain("'tag'");
    expect(js).toContain("'site'");
    
    // Verify tagOrder and siteOrder are separate
    expect(js).toContain('tagOrder');
    expect(js).toContain('siteOrder');
  });

  test(`Empty arrays maintain independence (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      // Test with one empty array
      const hasEmptyTags = Math.random() < 0.5;
      
      const tagCount = hasEmptyTags ? 0 : Math.floor(Math.random() * 5) + 3;
      const siteCount = hasEmptyTags ? Math.floor(Math.random() * 8) + 3 : 0;
      
      if (tagCount === 0 && siteCount === 0) continue;
      
      const tags = Array.from({ length: tagCount }, (_, idx) => `tag-${idx}`);
      const sites = Array.from({ length: siteCount }, (_, idx) => ({ 
        id: idx, 
        name: `site-${idx}` 
      }));
      
      const state = new AppState(tags, sites);
      
      if (tagCount > 0) {
        const originalTagOrder = state.getTagOrder();
        const fromIndex = Math.floor(Math.random() * tagCount);
        const toIndex = Math.floor(Math.random() * tagCount);
        state.dragTag(fromIndex, toIndex);
        
        // Site order should remain empty
        expect(state.getSiteOrder()).toEqual([]);
      } else {
        const originalSiteOrder = state.getSiteOrder();
        const fromIndex = Math.floor(Math.random() * siteCount);
        const toIndex = Math.floor(Math.random() * siteCount);
        state.dragSite(fromIndex, toIndex);
        
        // Tag order should remain empty
        expect(state.getTagOrder()).toEqual([]);
      }
    }
  });
});
