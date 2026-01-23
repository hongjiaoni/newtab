/**
 * Settings Menu Tests
 * Requirements: 14.1, 14.3
 * 
 * These tests verify that the settings menu button exists and contains
 * theme and language toggle options.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

describe('Settings Menu Tests', () => {
  let dom;
  let document;
  let window;
  let settingsToggle;
  let settingsMenu;

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
      getItem: vi.fn((key) => {
        if (key === 'theme') return 'dark';
        if (key === 'locale') return 'zh';
        return null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;
    
    settingsToggle = document.getElementById('settingsToggle');
    settingsMenu = document.getElementById('settingsMenu');
  });

  it('should have settings button in top-right (Requirement 14.1)', () => {
    expect(settingsToggle).toBeTruthy();
    expect(settingsToggle.className).toContain('settings-btn');
    expect(settingsToggle.textContent).toBe('⋯');
  });

  it('should have settings menu with theme and language options (Requirement 14.3)', () => {
    expect(settingsMenu).toBeTruthy();
    
    // Check for theme option
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    expect(themeIcon).toBeTruthy();
    expect(themeText).toBeTruthy();
    
    // Check for language option
    const langText = document.getElementById('langText');
    expect(langText).toBeTruthy();
  });

  it('should have settings menu items with correct structure', () => {
    const menuItems = settingsMenu.querySelectorAll('.settings-menu-item');
    expect(menuItems.length).toBe(2);
    
    // First item should be theme
    expect(menuItems[0].querySelector('span:first-child')).toBeTruthy();
    expect(menuItems[0].querySelector('span:last-child')).toBeTruthy();
    
    // Second item should be language
    expect(menuItems[1].querySelector('span:first-child')).toBeTruthy();
    expect(menuItems[1].querySelector('span:last-child')).toBeTruthy();
  });

  it('should have settings menu initially hidden', () => {
    expect(settingsMenu.classList.contains('hidden')).toBe(true);
  });

  it('should have theme icon and text elements', () => {
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    expect(themeIcon).toBeTruthy();
    expect(themeText).toBeTruthy();
    expect(themeIcon.textContent).toBeTruthy();
    expect(themeText.textContent).toBeTruthy();
  });

  it('should have language text element', () => {
    const langText = document.getElementById('langText');
    
    expect(langText).toBeTruthy();
    expect(langText.textContent).toBeTruthy();
  });
});
