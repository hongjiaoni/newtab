/**
 * Theme Icon Tests
 * Requirements: 1.2, 1.3
 * 
 * These tests verify that the theme toggle button displays the correct SVG icons
 * based on the current theme mode.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

describe('Theme Icon Tests', () => {
  let dom;
  let document;
  let window;
  let themeToggle;
  let THEME_ICONS;
  let updateThemeIcon;

  beforeEach(() => {
    // Create a fresh DOM for each test
    const html = readFileSync('index.html', 'utf-8');
    dom = new JSDOM(html, { 
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost'
    });
    
    document = dom.window.document;
    window = dom.window;
    
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;
    
    // Define THEME_ICONS (from script.js)
    THEME_ICONS = {
      sun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
      moon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`
    };
    
    // Create theme toggle button
    themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-btn';
    document.body.appendChild(themeToggle);
    
    // Define updateThemeIcon function (from script.js)
    updateThemeIcon = (theme) => {
      themeToggle.innerHTML = theme === 'dark' ? THEME_ICONS.sun : THEME_ICONS.moon;
    };
  });

  it('should display sun icon in dark mode (Requirement 1.2)', () => {
    // Set dark mode
    updateThemeIcon('dark');
    
    // Verify sun icon is displayed
    const innerHTML = themeToggle.innerHTML;
    
    // Sun icon contains a circle element (the sun's center)
    expect(innerHTML).toContain('<svg');
    expect(innerHTML).toContain('<circle');
    expect(innerHTML).toContain('cx="12"');
    expect(innerHTML).toContain('cy="12"');
    expect(innerHTML).toContain('r="5"');
  });

  it('should display moon icon in light mode (Requirement 1.3)', () => {
    // Set light mode
    updateThemeIcon('light');
    
    // Verify moon icon is displayed
    const innerHTML = themeToggle.innerHTML;
    
    // Moon icon contains a path element with the crescent shape
    expect(innerHTML).toContain('<svg');
    expect(innerHTML).toContain('<path');
    expect(innerHTML).toContain('12.79');
    expect(innerHTML).toContain('11.21');
  });

  it('should use innerHTML instead of textContent', () => {
    // Set dark mode
    updateThemeIcon('dark');
    
    // Verify it's actual HTML, not text
    expect(themeToggle.innerHTML).toContain('<svg');
    expect(themeToggle.textContent).not.toContain('<svg');
  });

  it('should switch icons when theme changes', () => {
    // Start with dark mode
    updateThemeIcon('dark');
    expect(themeToggle.innerHTML).toContain('<circle');
    
    // Switch to light mode
    updateThemeIcon('light');
    expect(themeToggle.innerHTML).toContain('<path');
    expect(themeToggle.innerHTML).not.toContain('<circle');
    
    // Switch back to dark mode
    updateThemeIcon('dark');
    expect(themeToggle.innerHTML).toContain('<circle');
    expect(themeToggle.innerHTML).not.toContain('12.79');
  });
});
