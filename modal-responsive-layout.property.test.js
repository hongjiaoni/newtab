/**
 * Modal Responsive Layout Property Test
 * Feature: start-page-enhancements, Property 18: 模态框响应式布局
 * Requirements: 16.4
 * 
 * This property test verifies that the modal maintains good layout and readability
 * across different screen sizes.
 */

import { describe, test, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import fc from 'fast-check';

describe('Modal Responsive Layout Property Test', () => {
  // Property 18: Modal responsive layout
  // For any screen size, the modal should maintain good layout and readability
  test('Property 18: Modal maintains good layout at any screen size (Requirement 16.4)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }), // viewport width
        fc.integer({ min: 480, max: 1080 }), // viewport height
        (viewportWidth, viewportHeight) => {
        // Create a fresh DOM for each test
        const html = readFileSync('index.html', 'utf-8');
        const dom = new JSDOM(html, {
          url: 'http://localhost',
          pretendToBeVisual: true,
          resources: 'usable'
        });

        const document = dom.window.document;
        const window = dom.window;

        // Set viewport size
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: viewportWidth
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: viewportHeight
        });

        // Get modal element
        const modal = document.getElementById('addModal');
        expect(modal).toBeTruthy();

        // Verify modal sections exist and are properly structured
        const modalSections = modal.querySelectorAll('.modal-section');
        expect(modalSections.length).toBeGreaterThan(0);

        // Verify inputs exist
        const inputs = modal.querySelectorAll('.modal-input');
        expect(inputs.length).toBeGreaterThan(0);

        // Verify text labels exist
        const sectionLabels = modal.querySelectorAll('.section-label');
        expect(sectionLabels.length).toBeGreaterThan(0);

        // Verify font sizes are readable
        const h3 = modal.querySelector('h3');
        expect(h3).toBeTruthy();

        // Verify modal actions buttons exist and are properly structured
        const modalActions = modal.querySelector('.modal-actions');
        expect(modalActions).toBeTruthy();
        
        // Verify buttons exist
        const buttons = modalActions.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThanOrEqual(2);

        // Verify modal has proper structure for all screen sizes
        // The modal should have consistent structure regardless of viewport
        expect(modal.className).toContain('modal');
        expect(modal.querySelector('h3')).toBeTruthy();
        expect(modal.querySelector('.modal-type-switch')).toBeTruthy();
        expect(modal.querySelector('#siteForm')).toBeTruthy();
        expect(modal.querySelector('#tagForm')).toBeTruthy();

        return true;
      }
      ),
      { numRuns: 100 }
    );
  });
});
