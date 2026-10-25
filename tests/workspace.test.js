import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = fs.readFileSync(path.join(__dirname, '..', 'public', 'workspace.js'), 'utf8');

beforeAll(() => {
  // Globals workspace.js expects from script.js
  let n = 0;
  window.i18n = { currentLocale: 'en', t: (k) => k };
  window.generateUuid = () => 'id-' + (++n);
  window.modalOverlay = document.createElement('div');
  window.getSiteFaviconUrl = () => '';
  localStorage.clear();
  window.eval(SOURCE);
});

beforeEach(() => {
  localStorage.clear();
});

describe('workspace.js', () => {
  it('migrates legacy workbench data', () => {
    const wb = window.normalizeWorkbench({
      plugins: ['todo', 'notes', 'bogus'],
      todos: [{ id: 't', text: 'x', done: false }],
      agent: {
        provider: 'qwen',
        model: 'qwen-plus',
        projects: [{ id: 'p', name: '默认项目', chats: [{ id: 'c', title: '新对话', messages: [] }] }]
      }
    });
    expect(wb.widgets).toEqual(['agent', 'todo', 'notes', 'history', 'rss']);
    expect(wb.plugins).toBeUndefined();
    expect(wb.todos).toHaveLength(1);
    expect(wb.rss).toEqual({ feeds: [] });
    const agent = wb.agent.projects[0];
    expect(agent.name).toBe('Assistant');
    expect(agent.provider).toBe('qwen');
    expect(agent.model).toBe('qwen-plus');
    expect(agent.systemPrompt).toBe('');
    expect(agent.emoji).toBeTruthy();
    expect(wb.agent.provider).toBeUndefined();
  });

  it('gives new users a default layout that fills the 4 x 4 grid', () => {
    const wb = window.normalizeWorkbench(null);
    expect(wb.widgets).toEqual(['agent', 'calendar', 'notes', 'history', 'rss', 'todo']);
    expect(wb.widgetSizes).toEqual({ agent: 'l', calendar: 'v', notes: 's', history: 's', rss: 'l', todo: 'l' });
    const units = { s: 1, m: 2, v: 2, l: 4 };
    expect(wb.widgets.reduce((n, t) => n + units[wb.widgetSizes[t]], 0)).toBe(16);
  });

  it('keeps valid widget sizes and replaces sizes a widget does not offer', () => {
    const wb = window.normalizeWorkbench({ widgets: ['todo', 'agent'], widgetSizes: { todo: 'v', agent: 's', notes: 'bogus' } });
    expect(wb.widgetSizes.todo).toBe('v');
    expect(wb.widgetSizes.agent).toBe('l');  // agent has no small size
    expect(wb.widgetSizes.notes).toBe('s');
  });

  it('keeps an existing widget order and drops unknown or duplicate widgets', () => {
    const wb = window.normalizeWorkbench({ widgets: ['rss', 'rss', 'agent', 'nope'] });
    expect(wb.widgets).toEqual(['rss', 'agent']);
  });

  it('parses RSS 2.0 and drops non-http links', () => {
    const feed = window.parseFeed(`<?xml version="1.0"?><rss version="2.0"><channel><title>Demo</title>
      <item><title>One</title><link>https://example.com/1</link><pubDate>Sun, 25 Oct 2026 10:00:00 GMT</pubDate></item>
      <item><title>Bad</title><link>javascript:alert(1)</link></item>
    </channel></rss>`);
    expect(feed.title).toBe('Demo');
    expect(feed.items).toHaveLength(1);
    expect(feed.items[0]).toMatchObject({ title: 'One', link: 'https://example.com/1' });
    expect(feed.items[0].ts).toBe(Date.parse('Sun, 25 Oct 2026 10:00:00 GMT'));
  });

  it('parses Atom feeds using the alternate link', () => {
    const feed = window.parseFeed(`<feed xmlns="http://www.w3.org/2005/Atom"><title>Atom Demo</title>
      <entry><title>Post</title><link rel="self" href="https://example.com/self"/><link rel="alternate" href="https://example.com/post"/>
      <updated>2026-10-24T08:00:00Z</updated></entry></feed>`);
    expect(feed.title).toBe('Atom Demo');
    expect(feed.items[0].link).toBe('https://example.com/post');
  });

  it('rejects malformed XML', () => {
    expect(() => window.parseFeed('<rss><channel>')).toThrow();
  });

  it('decodes GBK feeds using the declared charset', () => {
    const gbk = new Uint8Array([0xc4, 0xe3, 0xba, 0xc3]); // 你好
    const head = new TextEncoder().encode('<?xml version="1.0" encoding="gbk"?><t>');
    const buf = new Uint8Array(head.length + gbk.length);
    buf.set(head);
    buf.set(gbk, head.length);
    expect(window.decodeFeed(buf.buffer, 'application/xml')).toContain('你好');
  });

  it('records visits newest first, without duplicates or unsafe URLs', () => {
    window.recordVisit('https://a.com/', 'A');
    window.recordVisit('https://b.com/', 'B');
    window.recordVisit('https://a.com/', 'A again');
    window.recordVisit('javascript:alert(1)', 'bad');
    const visits = window.readVisits();
    expect(visits.map((v) => v.url)).toEqual(['https://a.com/', 'https://b.com/']);
    expect(visits[0].title).toBe('A again');
  });

  it('sends the agent role as a system message', () => {
    const chat = { messages: [{ role: 'user', content: 'hi' }, { role: 'error', content: 'x' }, { role: 'assistant', content: 'hello' }] };
    const withRole = window.apiMessages(chat, { systemPrompt: 'Translate.' });
    expect(withRole[0]).toEqual({ role: 'system', content: 'Translate.' });
    expect(withRole.map((m) => m.role)).toEqual(['system', 'user', 'assistant']);
    expect(window.apiMessages(chat, { systemPrompt: '' }).map((m) => m.role)).toEqual(['user', 'assistant']);
  });

  it('syncs config but not chat messages or per-device UI state', () => {
    window.applyRemoteWorkbench({
      notes: [{ id: 'n', text: 'hi' }],
      calSel: '2026-01-01',
      agent: { projects: [{ id: 'a1', name: 'Writer', systemPrompt: 'Be brief', chats: [{ id: 'c', title: 't', messages: [{ role: 'user', content: 'secret' }] }] }] }
    });
    const payload = window.getWorkbenchSyncPayload();
    expect(payload.notes).toHaveLength(1);
    expect(payload.calSel).toBeUndefined();
    expect(payload.agent.projects[0]).toMatchObject({ id: 'a1', name: 'Writer', systemPrompt: 'Be brief', chats: [] });
    expect(JSON.stringify(payload)).not.toContain('secret');
  });

  it('keeps local chats when remote config arrives, matched by agent id', () => {
    window.applyRemoteWorkbench({ agent: { projects: [{ id: 'a1', name: 'Writer', chats: [] }] } });
    const local = window.getWorkbench().agent.projects[0];
    local.chats = [{ id: 'local-chat', title: 'mine', messages: [{ role: 'user', content: 'keep me' }] }];
    window.applyRemoteWorkbench({ agent: { projects: [{ id: 'a1', name: 'Writer v2', chats: [] }, { id: 'a2', name: 'New', chats: [] }] } });
    const [a1, a2] = window.getWorkbench().agent.projects;
    expect(a1.name).toBe('Writer v2');
    expect(a1.chats[0].id).toBe('local-chat');
    expect(a2.chats).toHaveLength(1); // fresh empty chat
    expect(a2.chats[0].messages).toEqual([]);
  });

  it('compacts chat images instead of failing when storage is full', () => {
    const wb = window.getWorkbench();
    const img = { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + 'x'.repeat(10) } };
    wb.agent.projects[0].chats = [{ id: 'c', title: 't', updatedAt: 1, messages: Array.from({ length: 8 }, (_, i) => ({ role: 'user', content: [{ type: 'text', text: 'm' + i }, img] })) }];
    const realSet = Storage.prototype.setItem;
    let calls = 0;
    Storage.prototype.setItem = function (k, v) {
      calls++;
      if (calls === 1) throw Object.assign(new Error('full'), { name: 'QuotaExceededError' });
      return realSet.call(this, k, v);
    };
    try {
      expect(window.saveWorkbench()).toBe(true);
    } finally {
      Storage.prototype.setItem = realSet;
    }
    const msgs = wb.agent.projects[0].chats[0].messages;
    expect(typeof msgs[0].content).toBe('string');      // older: image stripped
    expect(msgs[0].content).toContain('m0');
    expect(Array.isArray(msgs[7].content)).toBe(true);   // recent: image kept
  });
});
