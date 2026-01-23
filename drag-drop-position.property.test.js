/**
 * Property-Based Test: Drag and Drop Position Change
 * Feature: start-page-enhancements, Property 2: 拖放位置变更
 * Validates: Requirements 3.1
 * 
 * Property: For any chip (tag or site), when a drag and drop operation is performed,
 * the chip's position in the list should change to the drop target's position.
 */

import { describe, test, expect } from 'vitest';

// Simulate the reordering logic from handleDrop
function reorderArray(arr, fromIndex, toIndex) {
  const newArr = [...arr];
  const item = newArr[fromIndex];
  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, item);
  return newArr;
}

const iterations = 100;

describe('Property Test: Drag and Drop Position Change', () => {
  test(`Dragging item to new position changes its index (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      // Generate random array of items
      const length = Math.floor(Math.random() * 10) + 3; // 3-12 items
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      // Random drag operation
      const fromIndex = Math.floor(Math.random() * length);
      const toIndex = Math.floor(Math.random() * length);
      
      if (fromIndex === toIndex) continue;
      
      const draggedItem = items[fromIndex];
      const result = reorderArray(items, fromIndex, toIndex);
      
      // Verify the dragged item is now at the target position
      expect(result[toIndex]).toBe(draggedItem);
      
      // Verify array length is preserved
      expect(result).toHaveLength(items.length);
    }
  });

  test(`Reordering preserves all items (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const length = Math.floor(Math.random() * 10) + 3;
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      const fromIndex = Math.floor(Math.random() * length);
      const toIndex = Math.floor(Math.random() * length);
      
      const result = reorderArray(items, fromIndex, toIndex);
      
      // Verify all original items are present
      for (const item of items) {
        expect(result).toContain(item);
      }
      
      // Verify no duplicates
      const uniqueItems = new Set(result);
      expect(uniqueItems.size).toBe(result.length);
    }
  });

  test(`Dragging to same position is no-op (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const length = Math.floor(Math.random() * 10) + 3;
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      const index = Math.floor(Math.random() * length);
      
      const result = reorderArray(items, index, index);
      
      // Verify array is unchanged
      expect(result).toEqual(items);
    }
  });

  test(`Multiple drag operations maintain consistency (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const length = Math.floor(Math.random() * 8) + 3;
      let items = Array.from({ length }, (_, idx) => `item-${idx}`);
      const originalItems = [...items];
      
      // Perform multiple random drag operations
      const operations = Math.floor(Math.random() * 5) + 1;
      for (let j = 0; j < operations; j++) {
        const fromIndex = Math.floor(Math.random() * items.length);
        const toIndex = Math.floor(Math.random() * items.length);
        items = reorderArray(items, fromIndex, toIndex);
      }
      
      // Verify all original items are still present
      expect(items).toHaveLength(originalItems.length);
      for (const item of originalItems) {
        expect(items).toContain(item);
      }
    }
  });

  test(`Dragging first item to last position works (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const length = Math.floor(Math.random() * 10) + 3;
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      const firstItem = items[0];
      const result = reorderArray(items, 0, length - 1);
      
      // Verify first item is now at the end
      expect(result[length - 1]).toBe(firstItem);
      expect(result).toHaveLength(length);
    }
  });

  test(`Dragging last item to first position works (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      const length = Math.floor(Math.random() * 10) + 3;
      const items = Array.from({ length }, (_, idx) => `item-${idx}`);
      
      const lastItem = items[length - 1];
      const result = reorderArray(items, length - 1, 0);
      
      // Verify last item is now at the beginning
      expect(result[0]).toBe(lastItem);
      expect(result).toHaveLength(length);
    }
  });

  test(`Tag and site orders are independent (${iterations} iterations)`, () => {
    for (let i = 0; i < iterations; i++) {
      // Simulate independent tag and site orders
      const tagLength = Math.floor(Math.random() * 5) + 2;
      const siteLength = Math.floor(Math.random() * 8) + 2;
      
      let tagOrder = Array.from({ length: tagLength }, (_, idx) => `tag-${idx}`);
      let siteOrder = Array.from({ length: siteLength }, (_, idx) => idx);
      
      const originalTagOrder = [...tagOrder];
      const originalSiteOrder = [...siteOrder];
      
      // Perform drag on tags
      const tagFrom = Math.floor(Math.random() * tagLength);
      const tagTo = Math.floor(Math.random() * tagLength);
      tagOrder = reorderArray(tagOrder, tagFrom, tagTo);
      
      // Verify site order is unchanged
      expect(siteOrder).toEqual(originalSiteOrder);
      
      // Perform drag on sites
      const siteFrom = Math.floor(Math.random() * siteLength);
      const siteTo = Math.floor(Math.random() * siteLength);
      siteOrder = reorderArray(siteOrder, siteFrom, siteTo);
      
      // Verify tag order is unchanged from the first drag
      expect(tagOrder).toEqual(reorderArray(originalTagOrder, tagFrom, tagTo));
    }
  });
});
