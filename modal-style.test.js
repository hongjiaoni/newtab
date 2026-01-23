/**
 * Modal Style Tests
 * Requirements: 16.1, 16.2
 * 
 * These tests verify that the modal has smaller font sizes and proper left alignment.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

describe('Modal Style Tests', () => {
  let dom;
  let document;
  let window;
  let css;

  beforeEach(() => {
    // Read CSS file
    css = readFileSync('style.css', 'utf-8');
    
    // Create a fresh DOM for each test
    const html = readFileSync('index.html', 'utf-8');
    dom = new JSDOM(html, { 
      url: 'http://localhost'
    });
    
    document = dom.window.document;
    window = dom.window;
  });

  // Helper function to extract CSS values
  function getCSSValue(selector, property) {
    const selectorRegex = new RegExp(`${selector.replace(/\./g, '\\.')}\\s*{([^}]*)}`, 'i');
    const match = css.match(selectorRegex);
    
    if (!match) return null;
    
    const rules = match[1];
    const propertyRegex = new RegExp(`${property}\\s*:\\s*([^;]+);`, 'i');
    const propMatch = rules.match(propertyRegex);
    
    return propMatch ? propMatch[1].trim() : null;
  }

  test('Modal has smaller font size (13px) (Requirement 16.1)', () => {
    const modalFontSize = getCSSValue('.modal', 'font-size');
    expect(modalFontSize).toBeTruthy();
    const fontSize = parseFloat(modalFontSize);
    expect(fontSize).toBe(13);
  });

  test('Modal h3 has smaller font size (16px) (Requirement 16.1)', () => {
    const h3FontSize = getCSSValue('.modal h3', 'font-size');
    expect(h3FontSize).toBeTruthy();
    const fontSize = parseFloat(h3FontSize);
    expect(fontSize).toBe(16);
  });

  test('Modal input has smaller font size (13px) (Requirement 16.1)', () => {
    const inputFontSize = getCSSValue('.modal-input', 'font-size');
    expect(inputFontSize).toBeTruthy();
    const fontSize = parseFloat(inputFontSize);
    expect(fontSize).toBe(13);
  });

  test('Section label has smaller font size (12px) (Requirement 16.1)', () => {
    const labelFontSize = getCSSValue('.section-label', 'font-size');
    expect(labelFontSize).toBeTruthy();
    const fontSize = parseFloat(labelFontSize);
    expect(fontSize).toBe(12);
  });

  test('Modal section has left text alignment (Requirement 16.2)', () => {
    const sectionAlign = getCSSValue('.modal-section', 'text-align');
    expect(sectionAlign).toBe('left');
  });

  test('Tags select has left alignment (Requirement 16.2)', () => {
    const tagsAlign = getCSSValue('.tags-select', 'align-items');
    expect(tagsAlign).toBe('flex-start');
  });

  test('Checkbox label has left alignment (Requirement 16.2)', () => {
    const checkboxJustify = getCSSValue('.checkbox-label', 'justify-content');
    expect(checkboxJustify).toBe('flex-start');
  });

  test('Modal has section-label elements in HTML', () => {
    const sectionLabels = document.querySelectorAll('.section-label');
    expect(sectionLabels.length).toBeGreaterThan(0);
  });

  test('Modal has modal-section wrapper elements', () => {
    const modalSections = document.querySelectorAll('.modal-section');
    expect(modalSections.length).toBeGreaterThan(0);
  });

  test('Tags select is inside a modal-section', () => {
    const tagSelector = document.getElementById('tagSelector');
    const parentSection = tagSelector?.closest('.modal-section');
    expect(parentSection).toBeTruthy();
  });

  test('Checkbox label is inside a modal-section', () => {
    const checkboxLabel = document.querySelector('.checkbox-label');
    const parentSection = checkboxLabel?.closest('.modal-section');
    expect(parentSection).toBeTruthy();
  });
});
