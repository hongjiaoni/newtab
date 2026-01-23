/**
 * Drag and Drop Visual Feedback Tests
 * Requirements: 3.5
 * 
 * These tests verify that dragging elements have visual feedback defined in CSS.
 */

import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('Drag and Drop Visual Feedback', () => {
  test('CSS defines dragging class with opacity (Requirement 3.5)', () => {
    const css = readFileSync('style.css', 'utf-8');
    
    // Check that .chip.dragging exists in CSS
    expect(css).toContain('.chip.dragging');
    
    // Check that it has opacity
    const draggingRegex = /\.chip\.dragging\s*{([^}]*)}/;
    const match = css.match(draggingRegex);
    expect(match).toBeTruthy();
    
    const rules = match[1];
    expect(rules).toContain('opacity');
    
    // Verify opacity is less than 1 (for visual feedback)
    const opacityMatch = rules.match(/opacity\s*:\s*([\d.]+)/);
    expect(opacityMatch).toBeTruthy();
    const opacityValue = parseFloat(opacityMatch[1]);
    expect(opacityValue).toBeLessThan(1);
  });

  test('CSS defines cursor move for draggable chips (Requirement 3.5)', () => {
    const css = readFileSync('style.css', 'utf-8');
    
    // Check that draggable chips have move cursor
    expect(css).toContain('cursor: move');
  });

  test('Chips have draggable attribute in rendered HTML (Requirement 3.5)', () => {
    const js = readFileSync('script.js', 'utf-8');
    
    // Verify that renderHome sets draggable = true
    expect(js).toContain('chip.draggable = true');
    
    // Verify drag event listeners are attached
    expect(js).toContain('dragstart');
    expect(js).toContain('dragover');
    expect(js).toContain('drop');
    expect(js).toContain('dragend');
  });

  test('Drag handlers add and remove dragging class (Requirement 3.5)', () => {
    const js = readFileSync('script.js', 'utf-8');
    
    // Verify handleDragStart adds dragging class
    expect(js).toContain("classList.add('dragging')");
    
    // Verify handleDragEnd removes dragging class
    expect(js).toContain("classList.remove('dragging')");
  });
});
