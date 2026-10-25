import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = fs.readFileSync(path.join(__dirname, '..', 'public', 'pager.js'), 'utf8');

// jsdom has no layout, so give elements the scroll geometry the pager reads.
function setScrollBox(el, { scrollHeight, clientHeight, scrollTop = 0 }) {
  Object.defineProperty(el, 'scrollHeight', { configurable: true, value: scrollHeight });
  Object.defineProperty(el, 'clientHeight', { configurable: true, value: clientHeight });
  el.scrollTop = scrollTop;
}

function wheel(target, deltaY, deltaX = 0) {
  const e = new WheelEvent('wheel', { deltaY, deltaX, bubbles: true, cancelable: true });
  target.dispatchEvent(e);
  return e;
}

function key(name, opts = {}) {
  const e = new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true, ...opts });
  (opts.target || document.body).dispatchEvent(e);
  return e;
}

describe('pager.js', () => {
  let clock;
  let pager;
  let changes;
  let blocked;

  function setup(hash = '') {
    history.replaceState(null, '', '/' + hash);
    document.body.innerHTML = `
      <main id="pager">
        <section class="page" data-page="home"><div class="inner"></div><input id="q"></section>
        <section class="page" data-page="workspace" data-hash="workspace">
          <div class="list" style="overflow-y:auto"></div>
        </section>
      </main>
      <nav><button id="d0"></button><button id="d1"></button></nav>`;
    const container = document.getElementById('pager');
    container.scrollTo = () => {};
    clock = 1000;
    changes = [];
    blocked = false;
    pager = window.createPager({
      container,
      dots: document.querySelectorAll('nav button'),
      now: () => clock,
      isBlocked: () => blocked,
      onChange: (i, name) => changes.push(name)
    });
    return container;
  }

  beforeEach(() => {
    window.eval(SOURCE);
  });

  afterEach(() => {
    pager?.destroy();
  });

  it('starts on home and marks the current dot and page', () => {
    setup();
    expect(pager.name()).toBe('home');
    expect(document.body.dataset.page).toBe('home');
    expect(document.getElementById('d0').getAttribute('aria-current')).toBe('true');
    expect(document.querySelector('[data-page="workspace"]').getAttribute('aria-hidden')).toBe('true');
  });

  it('opens on the workspace when the URL has #workspace', () => {
    setup('#workspace');
    expect(pager.name()).toBe('workspace');
  });

  it('turns one page per wheel gesture and ignores inertia', () => {
    const container = setup();
    const target = container.querySelector('.inner');
    wheel(target, 30);
    expect(pager.index()).toBe(0); // below threshold
    clock += 16;
    const e = wheel(target, 30);
    expect(e.defaultPrevented).toBe(true);
    expect(pager.index()).toBe(1);
    expect(location.hash).toBe('#workspace');

    // Trackpad inertia keeps arriving for a second; the lock rides along.
    for (let t = 0; t < 60; t++) {
      clock += 16;
      wheel(container.querySelector('.list'), -80);
    }
    expect(pager.index()).toBe(1);

    // After a quiet gap a new gesture turns back.
    clock += 400;
    wheel(container.querySelector('.list'), -120);
    expect(pager.index()).toBe(0);
    expect(location.hash).toBe('');
    expect(changes).toEqual(['workspace', 'home']);
  });

  it('lets a scrollable element scroll before the page turns', () => {
    const container = setup('#workspace');
    const list = container.querySelector('.list');
    setScrollBox(list, { scrollHeight: 600, clientHeight: 200, scrollTop: 100 });
    const e = wheel(list, -120);
    expect(e.defaultPrevented).toBe(false);
    expect(pager.index()).toBe(1);

    list.scrollTop = 0; // at the top edge now
    clock += 400;
    wheel(list, -120);
    expect(pager.index()).toBe(0);
  });

  it('leaves horizontal gestures alone', () => {
    const container = setup();
    const e = wheel(container.querySelector('.inner'), 10, 200);
    expect(e.defaultPrevented).toBe(false);
    expect(pager.index()).toBe(0);
  });

  it('does nothing while a modal or menu is open', () => {
    const container = setup();
    blocked = true;
    wheel(container.querySelector('.inner'), 200);
    key('PageDown');
    expect(pager.index()).toBe(0);
  });

  it('pages with PageDown/PageUp and Alt+Arrow, but not while typing', () => {
    setup();
    key('PageDown', { target: document.getElementById('q') });
    expect(pager.index()).toBe(0);
    key('PageDown');
    expect(pager.index()).toBe(1);
    key('ArrowUp', { altKey: true });
    expect(pager.index()).toBe(0);
    key('PageUp');
    expect(pager.index()).toBe(0); // clamped at the first page
  });

  it('jumps when a dot is clicked and follows hash changes', () => {
    setup();
    document.getElementById('d1').click();
    expect(pager.name()).toBe('workspace');
    history.replaceState(null, '', '/');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(pager.name()).toBe('home');
  });
});
