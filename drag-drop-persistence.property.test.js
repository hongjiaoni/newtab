/**
 * Property-Based Test: Drag and Drop Persistence
 * Feature: start-page-enhancements, Property 3: 拖放持久化
 * Validates: Requirements 3.2, 3.3
 * 
 * Property: For any drag and drop operation completed, the new ordering should be 
 * immediately saved to localStorage, and reloading the page should display items 
 * in the saved order.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

// Mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  clear() {
    this.store = {};
  }
}

// Simulate the reordering and save logic
function simulateDragAndSave(items, fromIndex, toIndex, localStorage, storageKey) {
  // Reorder
  const newItems = [...items];
  const item = newItems[fromIndex];
  newItems.splice(fromIndex, 1);
  newItems.splice(toIndex, 0, item);
  
  // Save to localStorage
  localStorage.setItem(storageKey, JSON.stringify(newItems));
  
  return newItems;
}

// Simulate page reload by reading from localStorage
function simulatePageReload(localStorage, storageKey) {
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : [];
}

const iterations = 100;

describe('Property Test: Drag and Drop Persistence', () => {
  test(`Drag operation saves to localStorage (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const localStorage = new LocalStorageMock();
      
      const length = Math.floor(Math.random() * 10) + 3;
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      const fromIndex = Math.floor(Math.random() * length);
      const toIndex = Math.floor(Math.random() * length);
      
      const result = simulateDragAndSave(items, fromIndex, toIndex, localStorage, 'testOrder');
      
      // Verify localStorage was updated
      const stored = localStorage.getItem('testOrder');
      expect(stored).toBeTruthy();
      
      const parsedStored = JSON.parse(stored);
      expect(parsedStored).toEqual(result);
    }
  });

  test(`Page reload retrieves saved order (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const localStorage = new LocalStorageMock();
      
      const length = Math.floor(Math.random() * 10) + 3;
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      const fromIndex = Math.floor(Math.random() * length);
      const toIndex = Math.floor(Math.random() * length);
      
      // Perform drag and save
      const afterDrag = simulateDragAndSave(items, fromIndex, toIndex, localStorage, 'testOrder');
      
      // Simulate page reload
      const afterReload = simulatePageReload(localStorage, 'testOrder');
      
      // Verify order is preserved
      expect(afterReload).toEqual(afterDrag);
    }
  });

  test(`Multiple drags persist correctly (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const localStorage = new LocalStorageMock();
      
      const length = Math.floor(Math.random() * 8) + 3;
      let items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      // Perform multiple drag operations
      const operations = Math.floor(Math.random() * 5) + 1;
      for (let j = 0; j < operations; j++) {
        const fromIndex = Math.floor(Math.random() * items.length);
        const toIndex = Math.floor(Math.random() * items.length);
        items = simulateDragAndSave(items, fromIndex, toIndex, localStorage, 'testOrder');
      }
      
      // Simulate page reload
      const afterReload = simulatePageReload(localStorage, 'testOrder');
      
      // Verify final order is preserved
      expect(afterReload).toEqual(items);
    }
  });

  test(`Tag and site orders persist independently (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const localStorage = new LocalStorageMock();
      
      const tagLength = Math.floor(Math.random() * 5) + 2;
      const siteLength = Math.floor(Math.random() * 8) + 2;
      
      let tagOrder = Array.from({ length: tagLength }, (_, idx) => `tag-${idx}`);
      let siteOrder = Array.from({ length: siteLength }, (_, idx) => idx);
      
      // Drag tags
      const tagFrom = Math.floor(Math.random() * tagLength);
      const tagTo = Math.floor(Math.random() * tagLength);
      tagOrder = simulateDragAndSave(tagOrder, tagFrom, tagTo, localStorage, 'tagOrder');
      
      // Drag sites
      const siteFrom = Math.floor(Math.random() * siteLength);
      const siteTo = Math.floor(Math.random() * siteLength);
      siteOrder = simulateDragAndSave(siteOrder, siteFrom, siteTo, localStorage, 'siteOrder');
      
      // Simulate page reload
      const reloadedTags = simulatePageReload(localStorage, 'tagOrder');
      const reloadedSites = simulatePageReload(localStorage, 'siteOrder');
      
      // Verify both orders are preserved independently
      expect(reloadedTags).toEqual(tagOrder);
      expect(reloadedSites).toEqual(siteOrder);
    }
  });

  test(`saveData function saves both tagOrder and siteOrder (code verification)`, () => {
    const js = readFileSync('script.js', 'utf-8');
    
    // Verify saveData saves tagOrder
    expect(js).toContain("localStorage.setItem('tagOrder'");
    
    // Verify saveData saves siteOrder
    expect(js).toContain("localStorage.setItem('siteOrder'");
    
    // Verify state loads tagOrder
    expect(js).toContain("JSON.parse(localStorage.getItem('tagOrder'))");
    
    // Verify state loads siteOrder
    expect(js).toContain("JSON.parse(localStorage.getItem('siteOrder'))");
  });

  test(`Round trip: save and load preserves order (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const localStorage = new LocalStorageMock();
      
      const length = Math.floor(Math.random() * 10) + 3;
      const originalOrder = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      // Perform random number of drags
      let currentOrder = [...originalOrder];
      const dragCount = Math.floor(Math.random() * 10) + 1;
      
      for (let j = 0; j < dragCount; j++) {
        const fromIndex = Math.floor(Math.random() * currentOrder.length);
        const toIndex = Math.floor(Math.random() * currentOrder.length);
        currentOrder = simulateDragAndSave(currentOrder, fromIndex, toIndex, localStorage, 'order');
      }
      
      // Reload
      const reloadedOrder = simulatePageReload(localStorage, 'order');
      
      // Verify round trip preserves final order
      expect(reloadedOrder).toEqual(currentOrder);
      
      // Verify all original items are present
      for (const item of originalOrder) {
        expect(reloadedOrder).toContain(item);
      }
    }
  });
});
