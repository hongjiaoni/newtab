// ===== Workspace (page 2): widget grid =====
// Liquid Glass widgets in a 12-column bento grid: Agent, Calendar, Notes,
// Todo, Recently visited, RSS. State lives in the `workbench` object, which is
// saved to localStorage and synced through data-sync.js (home config).
// Loaded after script.js and uses its globals (i18n, state, generateUuid,
// modalOverlay, openLink, openRenameModal).

// ---------- Strings (new keys; older ones come from script.js translations) ----------
const WS_STRINGS = {
  zh: {
    widgetAgent: 'AI Agent', widgetHistory: '最近浏览', widgetRss: '订阅',
    addWidget: '添加组件', edit: '编辑', done: '完成', removeWidget: '移除组件', pickerAllAdded: '所有组件都已添加',
    todayEvents: '今天有 {n} 个日程', noEventsToday: '今天没有日程', viewAll: '全部',
    historyEmptyWeb: '通过 NewTab 打开的网站会显示在这里', historyGrant: '显示浏览历史',
    historyGrantDesc: '授权后可在这里查看最近 7 天的浏览记录，数据只保存在本机浏览器中。', historyDenied: '未获得浏览历史权限',
    rssEmpty: '还没有订阅源', rssAddFeed: '添加订阅', rssManage: '管理订阅', rssUrlPlaceholder: '输入 RSS / Atom 地址',
    rssAddFailed: '无法读取这个订阅源', rssRefresh: '刷新', rssLoading: '正在加载…', rssRemove: '移除',
    agentNew: '新建 Agent', agentEdit: '编辑 Agent', agentName: '名称', agentEmoji: '图标',
    agentPrompt: '角色设定（系统提示词）', agentPromptPlaceholder: '例如：你是一名中文写作助手，回答简洁，必要时给出修改建议。',
    agentModelLabel: '模型', agentSave: '保存', agentDeleteAgent: '删除 Agent', agentDeleteConfirm: '删除这个 Agent 及其全部对话？',
    agentDefaultName: '通用助手', agentMessagePlaceholder: '给 {name} 发消息', agentEmpty: '开始和 {name} 对话吧',
    agentChats: '对话', cancel: '取消', weekStart: '0',
    storageFull: '本地存储空间不足，已压缩较早聊天中的图片'
  },
  en: {
    widgetAgent: 'AI Agent', widgetHistory: 'Recently Visited', widgetRss: 'Feeds',
    addWidget: 'Add Widget', edit: 'Edit', done: 'Done', removeWidget: 'Remove widget', pickerAllAdded: 'All widgets are already added',
    todayEvents: '{n} events today', noEventsToday: 'No events today', viewAll: 'All',
    historyEmptyWeb: 'Sites you open from NewTab will show up here', historyGrant: 'Show browsing history',
    historyGrantDesc: 'Allow access to list the last 7 days of browsing here. The data stays in this browser.', historyDenied: 'History access was not granted',
    rssEmpty: 'No feeds yet', rssAddFeed: 'Add Feed', rssManage: 'Manage Feeds', rssUrlPlaceholder: 'RSS / Atom URL',
    rssAddFailed: 'Could not read this feed', rssRefresh: 'Refresh', rssLoading: 'Loading…', rssRemove: 'Remove',
    agentNew: 'New Agent', agentEdit: 'Edit Agent', agentName: 'Name', agentEmoji: 'Icon',
    agentPrompt: 'Role (system prompt)', agentPromptPlaceholder: 'e.g. You are a concise writing assistant who suggests edits when useful.',
    agentModelLabel: 'Model', agentSave: 'Save', agentDeleteAgent: 'Delete Agent', agentDeleteConfirm: 'Delete this agent and all its chats?',
    agentDefaultName: 'Assistant', agentMessagePlaceholder: 'Message {name}', agentEmpty: 'Start a conversation with {name}',
    agentChats: 'Chats', cancel: 'Cancel', weekStart: '0',
    storageFull: 'Local storage is full; images in older chats were compacted'
  },
  fr: {
    widgetAgent: 'Agent IA', widgetHistory: 'Visités récemment', widgetRss: 'Flux',
    addWidget: 'Ajouter un widget', edit: 'Modifier', done: 'Terminé', removeWidget: 'Retirer le widget', pickerAllAdded: 'Tous les widgets sont déjà ajoutés',
    todayEvents: '{n} événements aujourd\'hui', noEventsToday: 'Aucun événement aujourd\'hui', viewAll: 'Tout',
    historyEmptyWeb: 'Les sites ouverts depuis NewTab apparaîtront ici', historyGrant: 'Afficher l\'historique',
    historyGrantDesc: 'Autorisez l\'accès pour voir ici les 7 derniers jours de navigation. Les données restent dans ce navigateur.', historyDenied: 'Accès à l\'historique refusé',
    rssEmpty: 'Aucun flux pour l\'instant', rssAddFeed: 'Ajouter un flux', rssManage: 'Gérer les flux', rssUrlPlaceholder: 'Adresse RSS / Atom',
    rssAddFailed: 'Impossible de lire ce flux', rssRefresh: 'Actualiser', rssLoading: 'Chargement…', rssRemove: 'Retirer',
    agentNew: 'Nouvel agent', agentEdit: 'Modifier l\'agent', agentName: 'Nom', agentEmoji: 'Icône',
    agentPrompt: 'Rôle (prompt système)', agentPromptPlaceholder: 'Ex. : Tu es un assistant de rédaction concis qui propose des corrections utiles.',
    agentModelLabel: 'Modèle', agentSave: 'Enregistrer', agentDeleteAgent: 'Supprimer l\'agent', agentDeleteConfirm: 'Supprimer cet agent et toutes ses conversations ?',
    agentDefaultName: 'Assistant', agentMessagePlaceholder: 'Écrire à {name}', agentEmpty: 'Commencez une conversation avec {name}',
    agentChats: 'Conversations', cancel: 'Annuler', weekStart: '1',
    storageFull: 'Stockage local plein : les images des anciennes conversations ont été compactées'
  },
  es: {
    widgetAgent: 'Agente IA', widgetHistory: 'Visitados recientemente', widgetRss: 'Fuentes',
    addWidget: 'Añadir widget', edit: 'Editar', done: 'Listo', removeWidget: 'Quitar widget', pickerAllAdded: 'Ya están todos los widgets',
    todayEvents: '{n} eventos hoy', noEventsToday: 'Sin eventos hoy', viewAll: 'Todo',
    historyEmptyWeb: 'Aquí aparecerán los sitios que abras desde NewTab', historyGrant: 'Mostrar historial',
    historyGrantDesc: 'Permite el acceso para ver aquí los últimos 7 días de navegación. Los datos se quedan en este navegador.', historyDenied: 'No se concedió acceso al historial',
    rssEmpty: 'Aún no hay fuentes', rssAddFeed: 'Añadir fuente', rssManage: 'Gestionar fuentes', rssUrlPlaceholder: 'Dirección RSS / Atom',
    rssAddFailed: 'No se pudo leer esta fuente', rssRefresh: 'Actualizar', rssLoading: 'Cargando…', rssRemove: 'Quitar',
    agentNew: 'Nuevo agente', agentEdit: 'Editar agente', agentName: 'Nombre', agentEmoji: 'Icono',
    agentPrompt: 'Rol (prompt del sistema)', agentPromptPlaceholder: 'P. ej.: Eres un asistente de redacción conciso que sugiere mejoras útiles.',
    agentModelLabel: 'Modelo', agentSave: 'Guardar', agentDeleteAgent: 'Eliminar agente', agentDeleteConfirm: '¿Eliminar este agente y todas sus conversaciones?',
    agentDefaultName: 'Asistente', agentMessagePlaceholder: 'Escribe a {name}', agentEmpty: 'Empieza una conversación con {name}',
    agentChats: 'Conversaciones', cancel: 'Cancelar', weekStart: '1',
    storageFull: 'Almacenamiento local lleno: se compactaron las imágenes de conversaciones antiguas'
  },
  ja: {
    widgetAgent: 'AI エージェント', widgetHistory: '最近のアクセス', widgetRss: 'フィード',
    addWidget: 'ウィジェットを追加', edit: '編集', done: '完了', removeWidget: 'ウィジェットを削除', pickerAllAdded: 'すべてのウィジェットが追加済みです',
    todayEvents: '今日の予定 {n} 件', noEventsToday: '今日の予定はありません', viewAll: 'すべて',
    historyEmptyWeb: 'NewTab から開いたサイトがここに表示されます', historyGrant: '閲覧履歴を表示',
    historyGrantDesc: '許可すると過去 7 日間の閲覧履歴をここに表示します。データはこのブラウザ内にのみ保存されます。', historyDenied: '閲覧履歴へのアクセスが許可されませんでした',
    rssEmpty: 'フィードがまだありません', rssAddFeed: 'フィードを追加', rssManage: 'フィードを管理', rssUrlPlaceholder: 'RSS / Atom の URL',
    rssAddFailed: 'このフィードを読み込めませんでした', rssRefresh: '更新', rssLoading: '読み込み中…', rssRemove: '削除',
    agentNew: '新しいエージェント', agentEdit: 'エージェントを編集', agentName: '名前', agentEmoji: 'アイコン',
    agentPrompt: '役割（システムプロンプト）', agentPromptPlaceholder: '例：簡潔に答え、必要に応じて修正案を出す文章アシスタントです。',
    agentModelLabel: 'モデル', agentSave: '保存', agentDeleteAgent: 'エージェントを削除', agentDeleteConfirm: 'このエージェントとすべての会話を削除しますか？',
    agentDefaultName: 'アシスタント', agentMessagePlaceholder: '{name} にメッセージ', agentEmpty: '{name} との会話を始めましょう',
    agentChats: '会話', cancel: 'キャンセル', weekStart: '0',
    storageFull: 'ローカル保存容量が不足したため、古い会話の画像を圧縮しました'
  },
  ko: {
    widgetAgent: 'AI 에이전트', widgetHistory: '최근 방문', widgetRss: '피드',
    addWidget: '위젯 추가', edit: '편집', done: '완료', removeWidget: '위젯 제거', pickerAllAdded: '모든 위젯이 이미 추가되었습니다',
    todayEvents: '오늘 일정 {n}개', noEventsToday: '오늘 일정이 없습니다', viewAll: '전체',
    historyEmptyWeb: 'NewTab에서 연 사이트가 여기에 표시됩니다', historyGrant: '방문 기록 표시',
    historyGrantDesc: '허용하면 최근 7일간의 방문 기록을 여기에 표시합니다. 데이터는 이 브라우저에만 저장됩니다.', historyDenied: '방문 기록 접근 권한이 없습니다',
    rssEmpty: '아직 피드가 없습니다', rssAddFeed: '피드 추가', rssManage: '피드 관리', rssUrlPlaceholder: 'RSS / Atom 주소',
    rssAddFailed: '이 피드를 읽을 수 없습니다', rssRefresh: '새로고침', rssLoading: '불러오는 중…', rssRemove: '제거',
    agentNew: '새 에이전트', agentEdit: '에이전트 편집', agentName: '이름', agentEmoji: '아이콘',
    agentPrompt: '역할 (시스템 프롬프트)', agentPromptPlaceholder: '예: 간결하게 답하고 필요할 때 수정안을 제시하는 글쓰기 도우미입니다.',
    agentModelLabel: '모델', agentSave: '저장', agentDeleteAgent: '에이전트 삭제', agentDeleteConfirm: '이 에이전트와 모든 대화를 삭제하시겠습니까?',
    agentDefaultName: '어시스턴트', agentMessagePlaceholder: '{name}에게 메시지', agentEmpty: '{name}와(과) 대화를 시작하세요',
    agentChats: '대화', cancel: '취소', weekStart: '0',
    storageFull: '로컬 저장 공간이 부족하여 이전 대화의 이미지를 정리했습니다'
  }
};

function wsT(key, vars) {
  const locale = (typeof i18n !== 'undefined' && i18n.currentLocale) || 'zh';
  let text = (WS_STRINGS[locale] || WS_STRINGS.en)[key];
  if (text == null) text = WS_STRINGS.en[key];
  if (text == null && typeof i18n !== 'undefined') text = i18n.t(key);
  text = text == null ? key : String(text);
  if (vars) Object.keys(vars).forEach((k) => { text = text.split('{' + k + '}').join(vars[k]); });
  return text;
}

function wsIntlLocale() {
  const map = { zh: 'zh-CN', en: 'en-US', fr: 'fr-FR', es: 'es-ES', ja: 'ja-JP', ko: 'ko-KR' };
  return map[(typeof i18n !== 'undefined' && i18n.currentLocale) || 'zh'] || 'en-US';
}

function wsRelativeTime(ts) {
  if (!ts) return '';
  const diff = Math.round((ts - Date.now()) / 1000);
  const abs = Math.abs(diff);
  try {
    const rtf = new Intl.RelativeTimeFormat(wsIntlLocale(), { numeric: 'auto', style: 'short' });
    if (abs < 60) return rtf.format(0, 'second');
    if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
    if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
    if (abs < 86400 * 7) return rtf.format(Math.round(diff / 86400), 'day');
  } catch (_err) { /* old browsers */ }
  return new Date(ts).toLocaleDateString(wsIntlLocale(), { month: 'short', day: 'numeric' });
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Only http(s) links from feeds/history may become hrefs or be opened.
function safeHttpUrl(url) {
  try {
    const u = new URL(String(url || ''));
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : '';
  } catch (_err) {
    return '';
  }
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch (_err) { return ''; }
}

function wsFavicon(url) {
  return typeof getSiteFaviconUrl === 'function' ? getSiteFaviconUrl(url) : '';
}

// SF Symbols-style line icons (1.75 stroke via .sym)
const WS_ICONS = {
  agent: '<path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  notes: '<path d="M5 3h10l4 4v14H5z"/><path d="M9 9h6M9 13h6M9 17h3"/>',
  todo: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  rss: '<path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14"/><circle cx="6" cy="18" r="1.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  up: '<path d="m18 15-6-6-6 6"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7L20 8"/><path d="M20 3v5h-5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  send: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
  minus: '<path d="M6 12h12"/>',
  chevronL: '<path d="m15 18-6-6 6-6"/>',
  chevronR: '<path d="m9 18 6-6-6-6"/>'
};

function sym(name, extraClass) {
  return '<svg class="sym' + (extraClass ? ' ' + extraClass : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (WS_ICONS[name] || '') + '</svg>';
}

// ---------- State ----------
const WORKBENCH_KEY = 'workbench';
const AGENT_PROVIDERS = {
  deepseek: { name: 'DeepSeek', models: [{ id: 'deepseek-chat', name: 'DeepSeek Chat' }] },
  doubao: { name: '豆包', models: [
    { id: 'doubao-pro-32k', name: 'Doubao Pro 32k' },
    { id: 'doubao-1.5-vision-pro-32k', name: 'Doubao Vision Pro', vision: true }
  ] },
  qwen: { name: '通义千问', models: [
    { id: 'qwen-plus', name: 'Qwen Plus' },
    { id: 'qwen-vl-plus', name: 'Qwen VL Plus', vision: true }
  ] },
  minimax: { name: 'MiniMax', models: [{ id: 'MiniMax-Text-01', name: 'MiniMax Text' }] },
  openai: { name: 'OpenAI', models: [{ id: 'gpt-4o-mini', name: 'GPT-4o mini', vision: true }] }
};
const NOTE_COLORS = ['#fff3bf', '#ffe0b2', '#ffd8e4', '#d3f2ff', '#e0f7e9', '#f3e6ff'];
const AGENT_IMAGE_MAX = 3;
const AGENT_EMOJIS = ['✨', '✍️', '🌐', '🧑‍💻', '📰', '📊', '🎨', '🧠', '📚', '🤖'];
const WIDGET_TYPES = ['agent', 'calendar', 'notes', 'todo', 'history', 'rss'];
const WIDGET_NAME_KEYS = {
  agent: 'widgetAgent', calendar: 'pluginCalendar', notes: 'pluginNotes',
  todo: 'pluginTodo', history: 'widgetHistory', rss: 'widgetRss'
};

function widgetName(type) {
  return wsT(WIDGET_NAME_KEYS[type] || type);
}

// '新对话' is the stored "untitled" marker (older data uses it too); it is
// shown localized and replaced by the first message on send.
const UNTITLED_CHAT = '新对话';

function newChat() {
  return { id: generateUuid(), title: UNTITLED_CHAT, messages: [], createdAt: Date.now(), updatedAt: Date.now() };
}

function chatTitle(chat) {
  return !chat.title || chat.title === UNTITLED_CHAT ? (i18n.t('agentNewChat') || UNTITLED_CHAT) : chat.title;
}

function newAgent(overrides) {
  return {
    id: generateUuid(),
    name: wsT('agentDefaultName'),
    emoji: '✨',
    systemPrompt: '',
    provider: 'deepseek',
    model: 'deepseek-chat',
    chats: [newChat()],
    ...overrides
  };
}

function defaultWorkbench() {
  return {
    widgets: WIDGET_TYPES.slice(),
    notes: [],
    todos: [],
    calendar: [],
    calView: null,
    calSel: null,
    rss: { feeds: [] },
    agent: { projects: [newAgent()], activeProjectId: null, activeChatId: null }
  };
}

// Fills defaults and upgrades older shapes: `plugins` -> `widgets`, and agent
// "projects" gain emoji / system prompt / their own provider + model.
function normalizeWorkbench(raw) {
  const base = defaultWorkbench();
  const wb = { ...base, ...(raw || {}) };
  if (!Array.isArray(raw?.widgets)) {
    // Older data listed only notes/todo/calendar under `plugins`; keep that choice.
    wb.widgets = Array.isArray(raw?.plugins)
      ? ['agent', ...raw.plugins.filter((t) => WIDGET_TYPES.includes(t)), 'history', 'rss']
      : WIDGET_TYPES.slice();
  }
  wb.widgets = wb.widgets.filter((t, i, arr) => WIDGET_TYPES.includes(t) && arr.indexOf(t) === i);
  delete wb.plugins;
  ['notes', 'todos', 'calendar'].forEach((k) => { if (!Array.isArray(wb[k])) wb[k] = []; });
  wb.rss = { feeds: Array.isArray(wb.rss?.feeds) ? wb.rss.feeds : [] };

  const agent = { ...base.agent, ...(raw?.agent || {}) };
  const legacyProvider = AGENT_PROVIDERS[agent.provider] ? agent.provider : 'deepseek';
  const legacyModel = agent.model || AGENT_PROVIDERS[legacyProvider].models[0].id;
  agent.projects = (Array.isArray(agent.projects) && agent.projects.length ? agent.projects : base.agent.projects).map((p) => ({
    ...p,
    name: p.name === '默认项目' ? wsT('agentDefaultName') : (p.name || wsT('agentDefaultName')),
    emoji: p.emoji || '✨',
    systemPrompt: typeof p.systemPrompt === 'string' ? p.systemPrompt : '',
    provider: AGENT_PROVIDERS[p.provider] ? p.provider : legacyProvider,
    model: p.model || legacyModel,
    chats: Array.isArray(p.chats) && p.chats.length ? p.chats : [newChat()]
  }));
  delete agent.provider;
  delete agent.model;
  wb.agent = agent;
  return wb;
}

function loadWorkbench() {
  try {
    const raw = localStorage.getItem(WORKBENCH_KEY);
    return normalizeWorkbench(raw ? JSON.parse(raw) : null);
  } catch (_err) {
    return normalizeWorkbench(null);
  }
}

// Chats (with pasted images) only live in localStorage, which is ~5 MB.
// When a save hits the quota, compact step by step instead of losing data:
// 1) drop images except in each chat's last 6 messages, 2) drop all images,
// 3) keep only the 10 most recent chats per agent.
function stripMessageImages(msg) {
  if (Array.isArray(msg.content)) msg.content = messageTextContent(msg) + ' [image]';
}

function compactChats(level) {
  workbench.agent.projects.forEach((p) => {
    if (level === 1) p.chats.forEach((c) => c.messages.slice(0, -6).forEach(stripMessageImages));
    if (level === 2) p.chats.forEach((c) => c.messages.forEach(stripMessageImages));
    if (level === 3) {
      p.chats = p.chats.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).slice(0, 10);
    }
  });
}

function isQuotaError(err) {
  return !!err && (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014);
}

let storageFullNotified = false;

function saveWorkbench() {
  for (let level = 0; level <= 3; level++) {
    if (level) compactChats(level);
    try {
      localStorage.setItem(WORKBENCH_KEY, JSON.stringify(workbench));
      if (level && !storageFullNotified) {
        storageFullNotified = true;
        window.showNotification?.(wsT('storageFull'), 'warning');
      }
      return true;
    } catch (err) {
      if (!isQuotaError(err)) return false;
    }
  }
  return false;
}

// What syncs to the cloud: everything except chat messages (they can hold
// large images and stay on this device) and per-device UI state.
function workbenchSyncPayload() {
  const { calView, calSel, todoFilter, ...rest } = workbench;
  return {
    ...rest,
    agent: {
      projects: workbench.agent.projects.map(({ chats, ...config }) => ({ ...config, chats: [] }))
    }
  };
}

// Save, re-render and sync. The Agent widget keeps its draft (see renderAgentPanel).
function persistWorkbenchSync() {
  saveWorkbench();
  renderWorkbench();
  if (window.markHomeConfigUpdated) window.markHomeConfigUpdated();
}

let workbench = loadWorkbench();
let workspaceEditing = false;

function ensureAgentActive() {
  const agent = workbench.agent;
  if (!agent.projects.length) agent.projects.push(newAgent());
  if (!agent.activeProjectId || !agent.projects.find((pr) => pr.id === agent.activeProjectId)) {
    agent.activeProjectId = agent.projects[0].id;
  }
  const project = agent.projects.find((pr) => pr.id === agent.activeProjectId);
  if (!project.chats.length) project.chats.push(newChat());
  if (!agent.activeChatId || !project.chats.find((c) => c.id === agent.activeChatId)) {
    agent.activeChatId = project.chats[0].id;
  }
  return project;
}

function getActiveProject() {
  ensureAgentActive();
  return workbench.agent.projects.find((pr) => pr.id === workbench.agent.activeProjectId);
}

function getActiveChat() {
  const project = getActiveProject();
  return project.chats.find((c) => c.id === workbench.agent.activeChatId);
}

// ---------- Modal shell shared by the full editors ----------
function ensurePluginModal() {
  let modal = document.getElementById('pluginModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'pluginModal';
  modal.className = 'modal hidden ws-modal';
  modal.innerHTML = `
    <h3 id="pluginModalTitle"></h3>
    <div id="pluginModalBody"></div>
    <div class="modal-actions">
      <button id="pluginModalClose" class="cancel-btn"></button>
    </div>`;
  modalOverlay.appendChild(modal);
  document.getElementById('pluginModalClose').addEventListener('click', closePluginModal);
  return modal;
}

function openPluginModal(title, bodyHtml, afterBind) {
  const modal = ensurePluginModal();
  modalOverlay.querySelectorAll(':scope > .modal').forEach((m) => { if (m !== modal) m.classList.add('hidden'); });
  document.getElementById('pluginModalTitle').textContent = title;
  document.getElementById('pluginModalBody').innerHTML = bodyHtml;
  document.getElementById('pluginModalClose').textContent = i18n.t('close') || 'Close';
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  if (typeof afterBind === 'function') afterBind();
}

function closePluginModal() {
  const modal = document.getElementById('pluginModal');
  if (modal) modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

// ---------- Layout ----------
function initWorkbench() {
  if (!document.getElementById('pageWorkspace')) return;
  renderWorkbench();
}

function scrollToHomeScreen() {
  window.scrollPagerTo?.(0);
}

function scrollToWorkbenchScreen() {
  window.scrollPagerTo?.(1);
}

function renderWorkspaceHeader() {
  const header = document.getElementById('workbenchHeader');
  if (!header) return;
  const now = new Date();
  const weekday = now.toLocaleDateString(wsIntlLocale(), { weekday: 'long' });
  const today = (workbench.calendar || []).filter((ev) => ev.date === todayKey()).length;
  const sub = weekday + ' · ' + (today ? wsT('todayEvents', { n: today }) : wsT('noEventsToday'));
  header.innerHTML =
    '<div class="ws-title-block"><h1 class="ws-title">' + escapeHtml(i18n.t('workbench') || 'Workbench') + '</h1>' +
    '<span class="ws-sub">' + escapeHtml(sub) + '</span></div>' +
    '<span class="spacer"></span>' +
    '<div class="ws-actions glass glass--capsule">' +
    '<button type="button" class="btn btn--sm" id="wsAddWidget">' + sym('plus') + escapeHtml(wsT('addWidget')) + '</button>' +
    '<button type="button" class="btn btn--sm' + (workspaceEditing ? ' is-active' : '') + '" id="wsEdit">' + escapeHtml(workspaceEditing ? wsT('done') : wsT('edit')) + '</button>' +
    '<button type="button" class="icon-btn" id="wsBackHome" aria-label="' + escapeHtml(i18n.t('wbBackHome') || 'Home') + '" title="' + escapeHtml(i18n.t('wbBackHome') || 'Home') + '">' + sym('up') + '</button>' +
    '</div>';
  document.getElementById('wsAddWidget').addEventListener('click', openPluginPicker);
  document.getElementById('wsEdit').addEventListener('click', () => {
    workspaceEditing = !workspaceEditing;
    renderWorkbench();
  });
  document.getElementById('wsBackHome').addEventListener('click', scrollToHomeScreen);
}

const WIDGET_RENDERERS = {
  agent: renderAgentWidget,
  calendar: renderCalendarWidget,
  notes: renderNotesWidget,
  todo: renderTodoWidget,
  history: renderHistoryWidget,
  rss: renderRssWidget
};

function renderWorkbench() {
  renderWorkspaceHeader();
  const grid = document.getElementById('wsGrid');
  if (!grid) return;
  grid.classList.toggle('is-editing', workspaceEditing);
  grid.querySelector('.ws-empty')?.remove();

  // Keep existing widget elements (so the Agent chat keeps its scroll and
  // draft); rebuild only what changed.
  const existing = new Map(Array.from(grid.children).map((el) => [el.dataset.widget, el]));
  const order = workbench.widgets || [];
  order.forEach((type) => {
    let el = existing.get(type);
    if (!el) {
      el = document.createElement('article');
      el.className = 'widget glass w-' + type;
      el.dataset.widget = type;
      el.innerHTML = '<div class="widget-head"></div><div class="widget-body"></div>';
      bindWidgetDrag(el);
    }
    existing.delete(type);
    el.draggable = workspaceEditing;
    grid.appendChild(el); // appendChild moves it into order
    WIDGET_RENDERERS[type](el);
    renderEditBadge(el, type);
  });
  existing.forEach((el) => el.remove());

  if (!order.length) {
    const empty = document.createElement('button');
    empty.type = 'button';
    empty.className = 'ws-empty glass glass--clear';
    empty.innerHTML = sym('plus') + escapeHtml(wsT('addWidget'));
    empty.addEventListener('click', openPluginPicker);
    grid.appendChild(empty);
  }
}

function widgetHead(el, type, actionsHtml) {
  el.querySelector('.widget-head').innerHTML =
    sym(type) + '<span class="widget-title">' + escapeHtml(widgetName(type)) + '</span><span class="spacer"></span>' + (actionsHtml || '');
}

function renderEditBadge(el, type) {
  el.querySelector('.widget-remove')?.remove();
  if (!workspaceEditing) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'widget-remove';
  btn.setAttribute('aria-label', wsT('removeWidget'));
  btn.title = wsT('removeWidget');
  btn.innerHTML = sym('minus');
  btn.addEventListener('click', () => {
    workbench.widgets = workbench.widgets.filter((t) => t !== type);
    persistWorkbenchSync();
  });
  el.appendChild(btn);
}

let draggedWidget = null;

function bindWidgetDrag(el) {
  el.addEventListener('dragstart', (e) => {
    if (!workspaceEditing) { e.preventDefault(); return; }
    draggedWidget = el.dataset.widget;
    el.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  el.addEventListener('dragend', () => {
    el.classList.remove('is-dragging');
    draggedWidget = null;
  });
  el.addEventListener('dragover', (e) => {
    if (!workspaceEditing || !draggedWidget) return;
    e.preventDefault();
  });
  el.addEventListener('drop', (e) => {
    if (!workspaceEditing || !draggedWidget) return;
    e.preventDefault();
    const target = el.dataset.widget;
    if (target === draggedWidget) return;
    const list = workbench.widgets.filter((t) => t !== draggedWidget);
    list.splice(list.indexOf(target), 0, draggedWidget);
    workbench.widgets = list;
    persistWorkbenchSync();
  });
}

function openPluginPicker() {
  const missing = WIDGET_TYPES.filter((t) => !(workbench.widgets || []).includes(t));
  const body = missing.length
    ? '<div class="ws-picker">' + missing.map((type) =>
      '<button type="button" class="ws-picker-item" data-add-widget="' + type + '">' +
      '<span class="ws-picker-icon">' + sym(type) + '</span><span>' + escapeHtml(widgetName(type)) + '</span>' + sym('plus', 'ws-picker-plus') + '</button>'
    ).join('') + '</div>'
    : '<p class="ws-muted">' + escapeHtml(wsT('pickerAllAdded')) + '</p>';
  openPluginModal(wsT('addWidget'), body, () => {
    document.querySelectorAll('#pluginModalBody [data-add-widget]').forEach((btn) => {
      btn.addEventListener('click', () => {
        workbench.widgets = [...(workbench.widgets || []), btn.dataset.addWidget];
        closePluginModal();
        persistWorkbenchSync();
      });
    });
  });
}

function openPluginEditor(type) {
  if (type === 'notes') openNotesEditor();
  else if (type === 'todo') openTodoEditor();
  else if (type === 'calendar') openCalendarEditor();
}

// ---------- Calendar ----------
function formatDateKey(y, m, d) {
  return y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}

function todayKey() {
  const now = new Date();
  return formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function weekdayLabels() {
  const start = Number(wsT('weekStart')) || 0;
  const labels = [];
  // 2023-01-01 was a Sunday
  for (let i = 0; i < 7; i++) {
    const d = new Date(2023, 0, 1 + ((i + start) % 7));
    labels.push(d.toLocaleDateString(wsIntlLocale(), { weekday: 'narrow' }));
  }
  return labels;
}

// Month grid cells: { key, day, muted } for 6 weeks max, honoring week start.
function monthCells(y, m) {
  const start = Number(wsT('weekStart')) || 0;
  const firstDow = (new Date(y, m, 1).getDay() - start + 7) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = firstDow; i > 0; i--) {
    const d = new Date(y, m, 1 - i);
    cells.push({ key: formatDateKey(d.getFullYear(), d.getMonth(), d.getDate()), day: d.getDate(), muted: true });
  }
  for (let d = 1; d <= days; d++) cells.push({ key: formatDateKey(y, m, d), day: d, muted: false });
  while (cells.length % 7) {
    const d = new Date(y, m + 1, cells.length - firstDow - days + 1);
    cells.push({ key: formatDateKey(d.getFullYear(), d.getMonth(), d.getDate()), day: d.getDate(), muted: true });
  }
  return cells;
}

function eventsOn(key) {
  return (workbench.calendar || []).filter((ev) => ev.date === key)
    .sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')));
}

function renderCalendarWidget(el) {
  widgetHead(el, 'calendar',
    '<button type="button" class="btn btn--plain btn--sm" data-cal-open>' + sym('plus') + '</button>');
  const now = new Date();
  const todayK = todayKey();
  const selKey = workbench.calSel || todayK;
  const marked = new Set((workbench.calendar || []).map((ev) => ev.date));
  const cells = monthCells(now.getFullYear(), now.getMonth());
  const monthLabel = now.toLocaleDateString(wsIntlLocale(), { month: 'long' });
  const events = eventsOn(selKey);

  el.querySelector('.widget-body').innerHTML =
    '<div class="cal-month">' + escapeHtml(monthLabel) + '</div>' +
    '<div class="cal-mini">' +
    weekdayLabels().map((w) => '<span class="cal-dow">' + escapeHtml(w) + '</span>').join('') +
    cells.map((c) => '<button type="button" class="cal-cell' + (c.muted ? ' muted' : '') + (c.key === todayK ? ' today' : '') +
      (c.key === selKey && c.key !== todayK ? ' selected' : '') + (marked.has(c.key) ? ' has-ev' : '') +
      '" data-cal-key="' + c.key + '">' + c.day + '</button>').join('') +
    '</div>' +
    '<div class="cal-events">' + (events.length
      ? events.map((ev) => '<div class="cal-event"><b>' + escapeHtml(ev.title) + '</b><span>' + escapeHtml(ev.time || '') + '</span></div>').join('')
      : '<div class="ws-muted">' + escapeHtml(selKey === todayK ? wsT('noEventsToday') : (i18n.t('calendarEmpty') || '')) + '</div>') +
    '</div>';

  el.querySelector('[data-cal-open]').addEventListener('click', openCalendarEditor);
  el.querySelectorAll('[data-cal-key]').forEach((btn) => {
    btn.addEventListener('click', () => {
      workbench.calSel = btn.dataset.calKey;
      saveWorkbench();
      renderCalendarWidget(el);
    });
    btn.addEventListener('dblclick', () => {
      workbench.calSel = btn.dataset.calKey;
      openCalendarEditor();
    });
  });
}

function openCalendarEditor() {
  const now = new Date();
  const view = workbench.calView || { y: now.getFullYear(), m: now.getMonth() };
  const viewY = view.y;
  const viewM = view.m;
  const todayK = todayKey();
  const selKey = workbench.calSel || todayK;
  const marked = new Set((workbench.calendar || []).map((ev) => ev.date));
  const monthLabel = new Date(viewY, viewM, 1).toLocaleDateString(wsIntlLocale(), { year: 'numeric', month: 'long' });

  const cells = weekdayLabels().map((w) => '<div class="cal-weekday">' + escapeHtml(w) + '</div>').join('') +
    monthCells(viewY, viewM).map((c) => (c.muted
      ? '<div class="cal-day blank"></div>'
      : '<div class="cal-day' + (c.key === todayK ? ' today' : '') + (c.key === selKey ? ' selected' : '') + (marked.has(c.key) ? ' has-events' : '') +
        '" data-cal-date="' + c.key + '">' + c.day + (marked.has(c.key) ? '<span class="cal-dot"></span>' : '') + '</div>')).join('');

  const events = eventsOn(selKey);
  const eventsHtml = events.length
    ? events.map((ev) => (
      '<div class="plugin-list-item"><span class="item-text">' + (ev.time ? '<b>' + escapeHtml(ev.time) + '</b> ' : '') + escapeHtml(ev.title) + '</span>' +
      '<button class="item-del" data-edit-event="' + ev.id + '">✎</button>' +
      '<button class="item-del" data-del-event="' + ev.id + '">✕</button></div>'
    )).join('')
    : '<div class="folder-empty-hint">' + escapeHtml(i18n.t('calendarEmpty') || '') + '</div>';

  const bodyHtml =
    '<div class="plugin-editor">' +
    '<div class="calendar-nav"><button id="calPrev" class="icon-btn">' + sym('chevronL') + '</button><span class="cal-month-label">' + escapeHtml(monthLabel) + '</span><button id="calNext" class="icon-btn">' + sym('chevronR') + '</button></div>' +
    '<div class="calendar-grid">' + cells + '</div>' +
    '<div class="calendar-events">' + eventsHtml + '</div>' +
    '</div>' +
    '<div class="plugin-add-row"><input id="eventInput" class="modal-input" placeholder="' + escapeHtml(i18n.t('eventPlaceholder') || '') + '">' +
    '<input id="eventTime" type="time" class="modal-input" style="max-width:110px;">' +
    '<button id="eventAddBtn" class="primary-btn">＋</button></div>';

  openPluginModal(widgetName('calendar'), bodyHtml, () => {
    const shift = (delta) => {
      const d = new Date(viewY, viewM + delta, 1);
      workbench.calView = { y: d.getFullYear(), m: d.getMonth() };
      saveWorkbench();
      openCalendarEditor();
    };
    document.getElementById('calPrev').addEventListener('click', () => shift(-1));
    document.getElementById('calNext').addEventListener('click', () => shift(1));
    document.querySelectorAll('#pluginModalBody [data-cal-date]').forEach((cell) => {
      cell.addEventListener('click', () => {
        workbench.calSel = cell.dataset.calDate;
        saveWorkbench();
        openCalendarEditor();
      });
    });
    document.querySelectorAll('#pluginModalBody [data-del-event]').forEach((btn) => {
      btn.addEventListener('click', () => {
        workbench.calendar = workbench.calendar.filter((ev) => ev.id !== btn.dataset.delEvent);
        persistWorkbenchSync();
        openCalendarEditor();
      });
    });
    document.querySelectorAll('#pluginModalBody [data-edit-event]').forEach((btn) => {
      btn.addEventListener('click', () => openRenameModal(btn.dataset.editEvent, 'calendar-event'));
    });
    const addEvent = () => {
      const input = document.getElementById('eventInput');
      const title = (input && input.value.trim()) || '';
      if (!title) return;
      workbench.calendar.push({ id: generateUuid(), date: selKey, title, time: document.getElementById('eventTime')?.value || '', updatedAt: Date.now() });
      persistWorkbenchSync();
      openCalendarEditor();
    };
    document.getElementById('eventAddBtn').addEventListener('click', addEvent);
    document.getElementById('eventInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addEvent();
    });
  });
}

// ---------- Notes ----------
function sortedNotes() {
  return (workbench.notes || []).slice().sort((a, b) => (b.pinned - a.pinned) || ((b.updatedAt || 0) - (a.updatedAt || 0)));
}

function renderNotesWidget(el) {
  const notes = sortedNotes();
  widgetHead(el, 'notes',
    (notes.length ? '<span class="widget-badge">' + notes.length + '</span>' : '') +
    '<button type="button" class="btn btn--plain btn--sm" data-note-new aria-label="' + escapeHtml(i18n.t('addNote') || '') + '">' + sym('plus') + '</button>');
  const body = el.querySelector('.widget-body');
  body.innerHTML = notes.length
    ? notes.slice(0, 4).map((n) => '<button type="button" class="note-card" style="--note:' + (NOTE_COLORS.includes(n.color) ? n.color : NOTE_COLORS[0]) + '">' +
      (n.pinned ? '<span class="note-pin">📌</span>' : '') + escapeHtml(n.text || '…') + '</button>').join('')
    : '<button type="button" class="ws-empty-cta" data-note-new>' + escapeHtml(i18n.t('notesEmpty') || '') + '</button>';
  el.querySelectorAll('[data-note-new]').forEach((btn) => btn.addEventListener('click', () => {
    workbench.notes.unshift({ id: generateUuid(), text: '', color: NOTE_COLORS[0], pinned: false, updatedAt: Date.now() });
    saveWorkbench();
    openNotesEditor();
  }));
  body.querySelectorAll('.note-card').forEach((card) => card.addEventListener('click', openNotesEditor));
}

function openNotesEditor() {
  const items = (workbench.notes || []).map((n) => {
    const color = NOTE_COLORS.includes(n.color) ? n.color : NOTE_COLORS[0];
    return '<div class="plugin-note-card" style="background:' + color + ';">' +
      '<div class="plugin-note-head">' +
      '<span class="plugin-note-pin' + (n.pinned ? ' pinned' : '') + '" data-pin-note="' + n.id + '">' + (n.pinned ? '📌' : '📍') + '</span>' +
      '<span class="plugin-note-color">' + NOTE_COLORS.map((c) => '<button type="button" class="note-swatch' + (color === c ? ' active' : '') + '" style="background:' + c + '" data-color-note="' + n.id + '" data-color="' + c + '"></button>').join('') + '</span>' +
      '<button class="item-del" data-del-note="' + n.id + '">✕</button>' +
      '</div>' +
      '<textarea data-note-id="' + n.id + '" class="plugin-note-text" placeholder="' + escapeHtml(i18n.t('addNote') || '') + '">' + escapeHtml(n.text || '') + '</textarea>' +
      '</div>';
  }).join('');

  openPluginModal(widgetName('notes'),
    '<div class="plugin-editor plugin-note-grid">' + (items || '<div class="folder-empty-hint">' + escapeHtml(i18n.t('notesEmpty') || '') + '</div>') + '</div>' +
    '<div class="plugin-add-row"><button id="noteAddBtn" class="primary-btn" style="width:100%;">＋ ' + escapeHtml(i18n.t('addNote') || '') + '</button></div>',
    () => {
      document.querySelectorAll('#pluginModalBody textarea[data-note-id]').forEach((ta) => {
        ta.addEventListener('input', () => {
          const note = workbench.notes.find((n) => n.id === ta.dataset.noteId);
          if (note) { note.text = ta.value; note.updatedAt = Date.now(); saveWorkbench(); }
        });
        ta.addEventListener('change', persistWorkbenchSync);
      });
      document.querySelector('#pluginModalBody textarea[data-note-id]')?.focus();
      document.querySelectorAll('#pluginModalBody [data-del-note]').forEach((btn) => {
        btn.addEventListener('click', () => {
          workbench.notes = workbench.notes.filter((n) => n.id !== btn.dataset.delNote);
          persistWorkbenchSync();
          openNotesEditor();
        });
      });
      document.querySelectorAll('#pluginModalBody [data-pin-note]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const note = workbench.notes.find((n) => n.id === btn.dataset.pinNote);
          if (note) { note.pinned = !note.pinned; persistWorkbenchSync(); openNotesEditor(); }
        });
      });
      document.querySelectorAll('#pluginModalBody [data-color-note]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const note = workbench.notes.find((n) => n.id === btn.dataset.colorNote);
          if (note) { note.color = btn.dataset.color; persistWorkbenchSync(); openNotesEditor(); }
        });
      });
      document.getElementById('noteAddBtn').addEventListener('click', () => {
        workbench.notes.unshift({ id: generateUuid(), text: '', color: NOTE_COLORS[0], pinned: false, updatedAt: Date.now() });
        saveWorkbench();
        openNotesEditor();
      });
    });
}

// ---------- Todo ----------
function renderTodoWidget(el) {
  const todos = workbench.todos || [];
  const done = todos.filter((t) => t.done).length;
  widgetHead(el, 'todo',
    (todos.length ? '<span class="widget-badge">' + done + ' / ' + todos.length + '</span>' : '') +
    '<button type="button" class="btn btn--plain btn--sm" data-todo-all>' + escapeHtml(wsT('viewAll')) + '</button>');
  // Open items first, then the most recently finished.
  const list = todos.slice().sort((a, b) => (a.done - b.done) || ((b.updatedAt || 0) - (a.updatedAt || 0)));
  el.querySelector('.widget-body').innerHTML =
    '<div class="todo-list">' + list.map((t) =>
      '<label class="todo-row' + (t.done ? ' done' : '') + '"><input type="checkbox" data-todo-id="' + t.id + '"' + (t.done ? ' checked' : '') + '>' +
      '<span class="todo-text">' + escapeHtml(t.text) + '</span>' +
      (t.priority === 'high' ? '<span class="todo-flag high"></span>' : t.priority === 'medium' ? '<span class="todo-flag medium"></span>' : '') +
      '</label>').join('') + '</div>' +
    '<input class="todo-quick-add" placeholder="' + escapeHtml(i18n.t('todoPlaceholder') || '') + '" aria-label="' + escapeHtml(i18n.t('todoPlaceholder') || '') + '">';

  el.querySelector('[data-todo-all]').addEventListener('click', () => openTodoEditor());
  el.querySelectorAll('[data-todo-id]').forEach((box) => {
    box.addEventListener('change', () => {
      const todo = workbench.todos.find((t) => t.id === box.dataset.todoId);
      if (todo) { todo.done = box.checked; todo.updatedAt = Date.now(); persistWorkbenchSync(); }
    });
  });
  const quick = el.querySelector('.todo-quick-add');
  quick.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing) return;
    const text = quick.value.trim();
    if (!text) return;
    workbench.todos.push({ id: generateUuid(), text, done: false, priority: 'low', due: '', createdAt: Date.now(), updatedAt: Date.now() });
    persistWorkbenchSync();
    el.querySelector('.todo-quick-add')?.focus();
  });
}

function openTodoEditor(filter) {
  const currentFilter = filter || workbench.todoFilter || 'all';
  workbench.todoFilter = currentFilter;
  let todos = workbench.todos || [];
  if (currentFilter === 'active') todos = todos.filter((t) => !t.done);
  else if (currentFilter === 'done') todos = todos.filter((t) => t.done);
  const doneCount = (workbench.todos || []).filter((t) => t.done).length;
  const totalCount = (workbench.todos || []).length;

  const items = todos.map((t) => (
    '<div class="plugin-list-item' + (t.done ? ' done' : '') + '">' +
    '<input type="checkbox" data-todo-id="' + t.id + '" ' + (t.done ? 'checked' : '') + '>' +
    '<div class="todo-main">' +
    '<span class="item-text">' + escapeHtml(t.text || '') + '</span>' +
    '<span class="todo-meta">' + (t.priority === 'high' ? '🔴' : t.priority === 'medium' ? '🟡' : '') + (t.due ? ' · ' + escapeHtml(t.due) : '') + '</span>' +
    '</div>' +
    '<button class="item-del" data-del-todo="' + t.id + '">✕</button></div>'
  )).join('');

  const filterTabs = [
    ['all', i18n.t('todoAll') || 'All'],
    ['active', i18n.t('todoActive') || 'Active'],
    ['done', i18n.t('todoDone') || 'Done']
  ].map(([key, label]) =>
    '<button class="seg-btn' + (currentFilter === key ? ' active' : '') + '" data-todo-filter="' + key + '">' + escapeHtml(label) + '</button>'
  ).join('');

  const progress = totalCount ? '<div class="todo-progress"><div class="todo-progress-bar" style="width:' + Math.round(doneCount / totalCount * 100) + '%"></div></div>' : '';

  openPluginModal(widgetName('todo'),
    '<div class="todo-progress-row"><span>' + doneCount + '/' + totalCount + '</span>' + progress + '</div>' +
    '<div class="segmented-control" style="margin-bottom:10px;">' + filterTabs + '</div>' +
    '<div class="plugin-editor">' + (items || '<div class="folder-empty-hint">' + escapeHtml(i18n.t('todoEmpty') || '') + '</div>') + '</div>' +
    '<div class="plugin-add-row">' +
    '<input id="todoInput" class="modal-input" placeholder="' + escapeHtml(i18n.t('todoPlaceholder') || '') + '">' +
    '<select id="todoPriority" class="modal-input" style="max-width:86px;">' +
    '<option value="low">' + escapeHtml(i18n.t('todoLow') || 'Low') + '</option>' +
    '<option value="medium">' + escapeHtml(i18n.t('todoMedium') || 'Medium') + '</option>' +
    '<option value="high">' + escapeHtml(i18n.t('todoHigh') || 'High') + '</option>' +
    '</select>' +
    '<input id="todoDue" type="date" class="modal-input" style="max-width:140px;">' +
    '<button id="todoAddBtn" class="primary-btn">＋</button></div>',
    () => {
      document.querySelectorAll('#pluginModalBody [data-todo-filter]').forEach((btn) => {
        btn.addEventListener('click', () => openTodoEditor(btn.dataset.todoFilter));
      });
      document.querySelectorAll('#pluginModalBody [data-todo-id]').forEach((box) => {
        box.addEventListener('change', () => {
          const todo = workbench.todos.find((t) => t.id === box.dataset.todoId);
          if (todo) { todo.done = box.checked; todo.updatedAt = Date.now(); persistWorkbenchSync(); openTodoEditor(currentFilter); }
        });
      });
      document.querySelectorAll('#pluginModalBody [data-del-todo]').forEach((btn) => {
        btn.addEventListener('click', () => {
          workbench.todos = workbench.todos.filter((t) => t.id !== btn.dataset.delTodo);
          persistWorkbenchSync();
          openTodoEditor(currentFilter);
        });
      });
      const addTodo = () => {
        const input = document.getElementById('todoInput');
        const text = (input && input.value.trim()) || '';
        if (!text) return;
        workbench.todos.push({
          id: generateUuid(),
          text,
          done: false,
          priority: document.getElementById('todoPriority')?.value || 'low',
          due: document.getElementById('todoDue')?.value || '',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        persistWorkbenchSync();
        openTodoEditor(currentFilter);
      };
      document.getElementById('todoAddBtn').addEventListener('click', addTodo);
      document.getElementById('todoInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.isComposing) addTodo();
      });
    });
}

// ---------- Recently visited ----------
// Extension: chrome.history (optional permission, requested on click).
// Web: sites opened from NewTab, recorded locally by recordVisit().
const VISITS_KEY = 'nt_visits';
const VISITS_MAX = 50;

function readVisits() {
  try {
    const list = JSON.parse(localStorage.getItem(VISITS_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch (_err) {
    return [];
  }
}

function recordVisit(url, title) {
  const safe = safeHttpUrl(url);
  if (!safe) return;
  const list = readVisits().filter((v) => v.url !== safe);
  list.unshift({ url: safe, title: title || hostOf(safe), ts: Date.now() });
  try {
    localStorage.setItem(VISITS_KEY, JSON.stringify(list.slice(0, VISITS_MAX)));
  } catch (_err) { /* quota */ }
  const el = document.querySelector('#wsGrid [data-widget="history"]');
  if (el && !hasChromeHistoryApi()) renderHistoryWidget(el);
}

function hasChromeHistoryApi() {
  return typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION && typeof chrome !== 'undefined' && !!chrome.permissions;
}

function historyRowsHtml(rows) {
  return rows.map((r) => {
    const url = safeHttpUrl(r.url);
    if (!url) return '';
    const fav = wsFavicon(url);
    return '<a class="list-row" href="' + escapeHtml(url) + '" data-open-url="' + escapeHtml(url) + '">' +
      (fav ? '<img src="' + escapeHtml(fav) + '" alt="" loading="lazy">' : '') +
      '<span class="main"><span class="t">' + escapeHtml(r.title || hostOf(url)) + '</span><span class="s">' + escapeHtml(hostOf(url)) + '</span></span>' +
      '<span class="meta">' + escapeHtml(wsRelativeTime(r.ts)) + '</span></a>';
  }).join('');
}

function bindOpenLinks(container) {
  container.querySelectorAll('[data-open-url]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return; // let the browser handle new-tab clicks
      e.preventDefault();
      if (typeof openLink === 'function') openLink(a.dataset.openUrl);
      else window.open(a.dataset.openUrl, '_blank', 'noopener');
    });
  });
}

function renderHistoryWidget(el) {
  const body = el.querySelector('.widget-body');
  if (!hasChromeHistoryApi()) {
    widgetHead(el, 'history');
    const rows = readVisits();
    body.innerHTML = rows.length ? historyRowsHtml(rows) : '<div class="ws-muted ws-center">' + escapeHtml(wsT('historyEmptyWeb')) + '</div>';
    bindOpenLinks(body);
    return;
  }

  widgetHead(el, 'history', '<button type="button" class="btn btn--plain btn--sm" data-history-all>' + escapeHtml(wsT('viewAll')) + '</button>');
  el.querySelector('[data-history-all]').addEventListener('click', () => {
    if (chrome.tabs?.create) chrome.tabs.create({ url: 'chrome://history' });
  });

  chrome.permissions.contains({ permissions: ['history'] }, (granted) => {
    if (!granted || !chrome.history) {
      body.innerHTML = '<div class="ws-grant"><p>' + escapeHtml(wsT('historyGrantDesc')) + '</p>' +
        '<button type="button" class="btn btn--primary btn--sm" data-history-grant>' + escapeHtml(wsT('historyGrant')) + '</button></div>';
      body.querySelector('[data-history-grant]').addEventListener('click', () => {
        chrome.permissions.request({ permissions: ['history'] }, (ok) => {
          if (ok) renderHistoryWidget(el);
          else window.showNotification?.(wsT('historyDenied'), 'warning');
        });
      });
      return;
    }
    chrome.history.search({ text: '', startTime: Date.now() - 7 * 86400000, maxResults: 40 }, (items) => {
      const rows = (items || [])
        .filter((it) => safeHttpUrl(it.url))
        .map((it) => ({ url: it.url, title: it.title, ts: it.lastVisitTime }));
      body.innerHTML = rows.length ? historyRowsHtml(rows) : '<div class="ws-muted ws-center">—</div>';
      bindOpenLinks(body);
    });
  });
}

// ---------- RSS ----------
// Feeds are fetched through /api/rss-proxy (CORS + SSRF checks server side)
// and parsed here. Items are cached locally; only the feed list syncs.
const RSS_CACHE_KEY = 'nt_rss_cache';
const RSS_READ_KEY = 'nt_rss_read';
const RSS_TTL_MS = 30 * 60 * 1000;
let rssLoading = false;

function readJson(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key) || 'null');
    return v == null ? fallback : v;
  } catch (_err) {
    return fallback;
  }
}

function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_err) { /* quota */ }
}

function firstText(node, names) {
  for (const name of names) {
    const found = node.getElementsByTagName(name)[0];
    if (found && found.textContent.trim()) return found.textContent.trim();
  }
  return '';
}

// RSS 2.0, RSS 1.0 (RDF) and Atom.
function parseFeed(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) throw new Error('parse error');
  const root = doc.documentElement;
  const isAtom = root.nodeName.toLowerCase() === 'feed';
  const channel = isAtom ? root : (root.getElementsByTagName('channel')[0] || root);
  const title = firstText(channel, ['title']);
  const nodes = Array.from(root.getElementsByTagName(isAtom ? 'entry' : 'item')).slice(0, 25);
  const items = nodes.map((node) => {
    let link = '';
    if (isAtom) {
      const links = Array.from(node.getElementsByTagName('link'));
      const alt = links.find((l) => (l.getAttribute('rel') || 'alternate') === 'alternate') || links[0];
      link = alt ? alt.getAttribute('href') || '' : '';
    } else {
      link = firstText(node, ['link', 'guid']);
    }
    const dateText = firstText(node, ['pubDate', 'published', 'updated', 'dc:date']);
    const ts = Date.parse(dateText);
    return { title: firstText(node, ['title']) || link, link: safeHttpUrl(link), ts: Number.isFinite(ts) ? ts : 0 };
  }).filter((it) => it.link);
  return { title, items };
}

// Response.text() always assumes UTF-8; many Chinese feeds are GBK/Big5, so
// honor the header charset or the XML declaration.
function decodeFeed(buffer, contentType) {
  let charset = (String(contentType).match(/charset=["']?([\w-]+)/i) || [])[1];
  if (!charset) {
    const head = new TextDecoder('ascii').decode(buffer.slice(0, 256));
    charset = (head.match(/encoding=["']([\w-]+)["']/i) || [])[1];
  }
  try {
    return new TextDecoder(charset || 'utf-8').decode(buffer);
  } catch (_err) {
    return new TextDecoder('utf-8').decode(buffer);
  }
}

async function fetchFeed(url) {
  const endpoint = window.RSS_API_URL || '/api/rss-proxy';
  const res = await fetch(endpoint + '?url=' + encodeURIComponent(url));
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return parseFeed(decodeFeed(await res.arrayBuffer(), res.headers.get('content-type') || ''));
}

async function refreshFeeds(force) {
  const feeds = workbench.rss?.feeds || [];
  if (rssLoading || !feeds.length) return;
  const cache = readJson(RSS_CACHE_KEY, {});
  const stale = feeds.filter((f) => force || !cache[f.id] || Date.now() - cache[f.id].ts > RSS_TTL_MS);
  if (!stale.length) return;
  rssLoading = true;
  rerenderWidget('rss');
  await Promise.all(stale.map(async (feed) => {
    try {
      const parsed = await fetchFeed(feed.url);
      cache[feed.id] = { ts: Date.now(), items: parsed.items };
    } catch (_err) {
      cache[feed.id] = { ts: Date.now(), items: (cache[feed.id] && cache[feed.id].items) || [], error: true };
    }
  }));
  writeJson(RSS_CACHE_KEY, cache);
  rssLoading = false;
  rerenderWidget('rss');
}

function rerenderWidget(type) {
  const el = document.querySelector('#wsGrid [data-widget="' + type + '"]');
  if (el) WIDGET_RENDERERS[type](el);
}

function renderRssWidget(el) {
  const feeds = workbench.rss?.feeds || [];
  widgetHead(el, 'rss',
    (feeds.length ? '<button type="button" class="icon-btn icon-btn--sm" data-rss-refresh aria-label="' + escapeHtml(wsT('rssRefresh')) + '" title="' + escapeHtml(wsT('rssRefresh')) + '">' + sym('refresh', rssLoading ? 'is-spinning' : '') + '</button>' : '') +
    '<button type="button" class="btn btn--plain btn--sm" data-rss-manage>' + escapeHtml(feeds.length ? wsT('rssManage') : wsT('rssAddFeed')) + '</button>');
  el.querySelector('[data-rss-manage]').addEventListener('click', openRssManager);
  el.querySelector('[data-rss-refresh]')?.addEventListener('click', () => refreshFeeds(true));

  const body = el.querySelector('.widget-body');
  if (!feeds.length) {
    body.innerHTML = '<button type="button" class="ws-empty-cta" data-rss-add>' + escapeHtml(wsT('rssEmpty')) + ' · ' + escapeHtml(wsT('rssAddFeed')) + '</button>';
    body.querySelector('[data-rss-add]').addEventListener('click', openRssManager);
    return;
  }

  const cache = readJson(RSS_CACHE_KEY, {});
  const read = new Set(readJson(RSS_READ_KEY, []));
  const items = [];
  feeds.forEach((f) => (cache[f.id]?.items || []).forEach((it) => items.push({ ...it, source: f.title || hostOf(f.url), feedUrl: f.url })));
  items.sort((a, b) => b.ts - a.ts);

  body.innerHTML = items.length
    ? items.slice(0, 40).map((it) => {
      const fav = wsFavicon(it.link);
      return '<a class="rss-item' + (read.has(it.link) ? ' is-read' : '') + '" href="' + escapeHtml(it.link) + '" data-open-url="' + escapeHtml(it.link) + '">' +
        '<span class="t">' + escapeHtml(it.title) + '</span>' +
        '<span class="s">' + (fav ? '<img src="' + escapeHtml(fav) + '" alt="" loading="lazy">' : '') + escapeHtml(it.source) + '</span>' +
        '<span class="meta">' + escapeHtml(it.ts ? wsRelativeTime(it.ts) : '') + '</span></a>';
    }).join('')
    : '<div class="ws-muted ws-center">' + escapeHtml(rssLoading ? wsT('rssLoading') : '—') + '</div>';

  body.querySelectorAll('[data-open-url]').forEach((a) => a.addEventListener('click', () => {
    const list = readJson(RSS_READ_KEY, []);
    if (!list.includes(a.dataset.openUrl)) writeJson(RSS_READ_KEY, [a.dataset.openUrl, ...list].slice(0, 500));
    a.classList.add('is-read');
  }));
  bindOpenLinks(body);
  if (!rssLoading) refreshFeeds(false);
}

function openRssManager() {
  const feeds = workbench.rss?.feeds || [];
  const list = feeds.length
    ? '<div class="plugin-editor">' + feeds.map((f) => '<div class="plugin-list-item"><span class="item-text"><b>' + escapeHtml(f.title || hostOf(f.url)) + '</b><br><span class="ws-muted">' + escapeHtml(f.url) + '</span></span>' +
      '<button class="item-del" data-del-feed="' + f.id + '" title="' + escapeHtml(wsT('rssRemove')) + '">✕</button></div>').join('') + '</div>'
    : '<p class="ws-muted">' + escapeHtml(wsT('rssEmpty')) + '</p>';
  openPluginModal(wsT('rssManage'), list +
    '<div class="plugin-add-row"><input id="rssUrlInput" class="modal-input" type="url" placeholder="' + escapeHtml(wsT('rssUrlPlaceholder')) + '">' +
    '<button id="rssAddBtn" class="primary-btn">' + escapeHtml(wsT('rssAddFeed')) + '</button></div>', () => {
    document.querySelectorAll('#pluginModalBody [data-del-feed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        workbench.rss.feeds = workbench.rss.feeds.filter((f) => f.id !== btn.dataset.delFeed);
        const cache = readJson(RSS_CACHE_KEY, {});
        delete cache[btn.dataset.delFeed];
        writeJson(RSS_CACHE_KEY, cache);
        persistWorkbenchSync();
        openRssManager();
      });
    });
    const input = document.getElementById('rssUrlInput');
    const add = async () => {
      let url = input.value.trim();
      if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
      url = safeHttpUrl(url);
      if (!url) return;
      if (workbench.rss.feeds.some((f) => f.url === url)) {
        input.value = '';
        return;
      }
      const btn = document.getElementById('rssAddBtn');
      btn.disabled = true;
      btn.textContent = wsT('rssLoading');
      const stillOpen = () => btn.isConnected && !document.getElementById('pluginModal')?.classList.contains('hidden');
      try {
        const parsed = await fetchFeed(url);
        if (workbench.rss.feeds.some((f) => f.url === url)) return;
        const feed = { id: generateUuid(), url, title: parsed.title || hostOf(url) };
        workbench.rss.feeds.push(feed);
        const cache = readJson(RSS_CACHE_KEY, {});
        cache[feed.id] = { ts: Date.now(), items: parsed.items };
        writeJson(RSS_CACHE_KEY, cache);
        persistWorkbenchSync();
        // Don't pop the dialog back up if the user closed it while we waited.
        if (stillOpen()) openRssManager();
      } catch (_err) {
        window.showNotification?.(wsT('rssAddFailed'), 'error');
        if (btn.isConnected) {
          btn.disabled = false;
          btn.textContent = wsT('rssAddFeed');
        }
      }
    };
    document.getElementById('rssAddBtn').addEventListener('click', add);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) add(); });
    input.focus();
  });
}

// ---------- Agent ----------
// Each agent has its own role prompt, provider/model and chats. (Stored under
// `agent.projects` for compatibility with already-synced data.)
let agentPendingImages = [];
let agentIsStreaming = false;

function currentAgentModel() {
  const project = getActiveProject();
  const provider = AGENT_PROVIDERS[project.provider] || AGENT_PROVIDERS.deepseek;
  return provider.models.find((m) => m.id === project.model) || provider.models[0];
}

function renderAgentWidget(el) {
  widgetHead(el, 'agent',
    '<button type="button" class="btn btn--plain btn--sm" data-agent-new>' + sym('plus') + escapeHtml(wsT('agentNew')) + '</button>');
  el.querySelector('[data-agent-new]').addEventListener('click', () => openAgentEditor(null));
  const body = el.querySelector('.widget-body');
  if (!body.querySelector('#agentPanel')) body.innerHTML = '<div class="agent" id="agentPanel"></div>';
  renderAgentPanel();
}

function renderAgentPanel() {
  const panel = document.getElementById('agentPanel');
  if (!panel) return;
  const project = ensureAgentActive();
  const agent = workbench.agent;
  const chat = getActiveChat();
  const isLoggedIn = !!window.authState?.isLoggedIn;
  const model = currentAgentModel();
  // Keep the unsent draft and focus across re-renders.
  const prevInput = document.getElementById('agentInput');
  const draft = prevInput ? prevInput.value : '';
  const hadFocus = prevInput && document.activeElement === prevInput;

  const agentList = agent.projects.map((pr) =>
    '<button type="button" class="agent-item" data-agent-id="' + pr.id + '" aria-current="' + (pr.id === project.id) + '">' +
    '<span class="agent-ava">' + escapeHtml(pr.emoji || '✨') + '</span><span class="agent-item-name">' + escapeHtml(pr.name) + '</span></button>'
  ).join('');

  const chatOptions = project.chats.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).map((c) =>
    '<option value="' + c.id + '"' + (c.id === chat.id ? ' selected' : '') + '>' + escapeHtml(chatTitle(c)) + '</option>'
  ).join('');

  const imagePreview = agentPendingImages.length
    ? '<div class="agent-attach-preview">' + agentPendingImages.map((img, idx) =>
      '<span class="agent-attach-thumb"><img src="' + img + '" alt=""><button type="button" class="agent-thumb-del" data-remove-image="' + idx + '">✕</button></span>'
    ).join('') + '</div>'
    : '';

  panel.innerHTML = `
    <div class="agent-list">${agentList}</div>
    <div class="agent-chat">
      <div class="agent-chat-bar">
        <select id="agentChatSelect" class="agent-chat-select" aria-label="${escapeHtml(wsT('agentChats'))}">${chatOptions}</select>
        <button type="button" class="icon-btn icon-btn--sm" id="agentNewChat" title="${escapeHtml(i18n.t('agentNewChat') || '')}" aria-label="${escapeHtml(i18n.t('agentNewChat') || '')}">${sym('plus')}</button>
        <button type="button" class="icon-btn icon-btn--sm" id="agentRenameChat" title="${escapeHtml(i18n.t('agentRename') || '')}" aria-label="${escapeHtml(i18n.t('agentRename') || '')}">✎</button>
        <button type="button" class="icon-btn icon-btn--sm" id="agentDeleteChat" title="${escapeHtml(i18n.t('agentDelete') || '')}" aria-label="${escapeHtml(i18n.t('agentDelete') || '')}">✕</button>
        <span class="spacer"></span>
        <button type="button" class="icon-btn icon-btn--sm" id="agentEdit" title="${escapeHtml(wsT('agentEdit'))}" aria-label="${escapeHtml(wsT('agentEdit'))}">${sym('gear')}</button>
      </div>
      <div class="agent-messages" id="agentMessages"></div>
      ${imagePreview}
      <div class="composer">
        <button type="button" class="icon-btn icon-btn--sm" id="agentAttach" title="${escapeHtml(i18n.t('agentAttachImage') || '')}" aria-label="${escapeHtml(i18n.t('agentAttachImage') || '')}">${sym('image')}</button>
        <textarea id="agentInput" rows="1" placeholder="${escapeHtml(wsT('agentMessagePlaceholder', { name: project.name }))}"></textarea>
        <button type="button" class="model-chip" id="agentModelChip" title="${escapeHtml(wsT('agentModelLabel'))}">${escapeHtml(model.name)}</button>
        <button type="button" class="send" id="agentSend" aria-label="${escapeHtml(i18n.t('agentSend') || 'Send')}">${sym('send')}</button>
      </div>
      ${isLoggedIn ? '' : `<button type="button" class="agent-login" id="agentLogin">${escapeHtml(i18n.t('agentLoginRequired') || 'Log in')}</button>`}
      <input type="file" id="agentFileInput" accept="image/*" multiple class="hidden">
    </div>`;

  const input = document.getElementById('agentInput');
  input.value = draft;
  if (hadFocus) input.focus();
  bindAgentEvents(model);
  renderAgentMessages();
}

function addPendingImage(file) {
  compressImage(file).then((url) => {
    if (agentPendingImages.length >= AGENT_IMAGE_MAX) return;
    agentPendingImages.push(url);
    renderAgentPanel();
  }).catch(() => window.showNotification?.(i18n.t('agentImageFailed') || 'Image failed', 'error'));
}

function bindAgentEvents(model) {
  const panel = document.getElementById('agentPanel');
  panel.querySelectorAll('[data-agent-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (workbench.agent.activeProjectId === btn.dataset.agentId) return;
      workbench.agent.activeProjectId = btn.dataset.agentId;
      workbench.agent.activeChatId = null;
      saveWorkbench();
      renderAgentPanel();
    });
    btn.addEventListener('dblclick', () => openAgentEditor(btn.dataset.agentId));
  });

  document.getElementById('agentChatSelect').addEventListener('change', (e) => {
    workbench.agent.activeChatId = e.target.value;
    saveWorkbench();
    renderAgentPanel();
  });
  document.getElementById('agentNewChat').addEventListener('click', () => {
    const chat = newChat();
    getActiveProject().chats.push(chat);
    workbench.agent.activeChatId = chat.id;
    saveWorkbench();
    renderAgentPanel();
    document.getElementById('agentInput')?.focus();
  });
  document.getElementById('agentRenameChat').addEventListener('click', () => openRenameModal(workbench.agent.activeChatId, 'agent-chat'));
  document.getElementById('agentDeleteChat').addEventListener('click', () => {
    const project = getActiveProject();
    if (!window.confirm(i18n.t('agentChatDeleteConfirm') || 'Delete this chat?')) return;
    project.chats = project.chats.filter((c) => c.id !== workbench.agent.activeChatId);
    workbench.agent.activeChatId = null;
    persistWorkbenchSync();
  });
  document.getElementById('agentEdit').addEventListener('click', () => openAgentEditor(workbench.agent.activeProjectId));
  document.getElementById('agentModelChip').addEventListener('click', () => openAgentEditor(workbench.agent.activeProjectId));
  document.getElementById('agentLogin')?.addEventListener('click', () => window.openGoogleSignInModal?.());

  const input = document.getElementById('agentInput');
  const fileInput = document.getElementById('agentFileInput');
  document.getElementById('agentAttach').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    Array.from(fileInput.files || []).slice(0, AGENT_IMAGE_MAX - agentPendingImages.length).forEach(addPendingImage);
    fileInput.value = '';
  });
  input.addEventListener('paste', (e) => {
    const items = Array.from(e.clipboardData?.items || []).filter((it) => it.type && it.type.startsWith('image/'));
    if (!items.length) return;
    e.preventDefault();
    items.slice(0, AGENT_IMAGE_MAX - agentPendingImages.length).forEach((it) => {
      const file = it.getAsFile();
      if (file) addPendingImage(file);
    });
  });
  // Grow the composer with its content, up to ~5 lines.
  const autosize = () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  };
  input.addEventListener('input', autosize);
  autosize();

  panel.querySelectorAll('[data-remove-image]').forEach((btn) => {
    btn.addEventListener('click', () => {
      agentPendingImages.splice(Number(btn.dataset.removeImage), 1);
      renderAgentPanel();
    });
  });

  document.getElementById('agentSend').addEventListener('click', sendAgentMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      sendAgentMessage();
    }
  });

  if (!model.vision && agentPendingImages.length) {
    window.showNotification?.(i18n.t('agentVisionNotSupported') || '', 'warning');
  }
}

function openAgentEditor(agentId) {
  const existing = agentId ? workbench.agent.projects.find((p) => p.id === agentId) : null;
  const draft = existing ? { ...existing } : newAgent({ name: '', emoji: AGENT_EMOJIS[workbench.agent.projects.length % AGENT_EMOJIS.length] });
  const providerOptions = Object.keys(AGENT_PROVIDERS).map((k) =>
    '<option value="' + k + '"' + (draft.provider === k ? ' selected' : '') + '>' + escapeHtml(AGENT_PROVIDERS[k].name) + '</option>').join('');
  const modelOptions = (p) => (AGENT_PROVIDERS[p] || AGENT_PROVIDERS.deepseek).models.map((m) =>
    '<option value="' + m.id + '"' + (draft.model === m.id ? ' selected' : '') + '>' + escapeHtml(m.name) + (m.vision ? ' · 🖼' : '') + '</option>').join('');

  const body =
    '<div class="agent-form">' +
    '<div class="agent-form-row agent-form-name">' +
    '<label class="agent-emoji-pick"><span class="ws-label">' + escapeHtml(wsT('agentEmoji')) + '</span>' +
    '<input id="agentFormEmoji" class="field agent-emoji-input" maxlength="4" value="' + escapeHtml(draft.emoji) + '"></label>' +
    '<label><span class="ws-label">' + escapeHtml(wsT('agentName')) + '</span>' +
    '<input id="agentFormName" class="field" maxlength="30" value="' + escapeHtml(draft.name) + '" placeholder="' + escapeHtml(wsT('agentDefaultName')) + '"></label></div>' +
    '<div class="agent-emoji-row">' + AGENT_EMOJIS.map((e) => '<button type="button" class="agent-emoji-opt" data-emoji="' + e + '">' + e + '</button>').join('') + '</div>' +
    '<label class="agent-form-row"><span class="ws-label">' + escapeHtml(wsT('agentPrompt')) + '</span>' +
    '<textarea id="agentFormPrompt" class="field" rows="5" placeholder="' + escapeHtml(wsT('agentPromptPlaceholder')) + '">' + escapeHtml(draft.systemPrompt) + '</textarea></label>' +
    '<div class="agent-form-row agent-form-model"><span class="ws-label">' + escapeHtml(wsT('agentModelLabel')) + '</span>' +
    '<div class="agent-form-selects"><select id="agentFormProvider" class="field">' + providerOptions + '</select>' +
    '<select id="agentFormModel" class="field">' + modelOptions(draft.provider) + '</select></div></div>' +
    '<div class="agent-form-actions">' +
    (existing && workbench.agent.projects.length > 1 ? '<button type="button" class="btn btn--plain ws-danger" id="agentFormDelete">' + escapeHtml(wsT('agentDeleteAgent')) + '</button>' : '') +
    '<span class="spacer"></span>' +
    '<button type="button" class="btn btn--primary" id="agentFormSave">' + escapeHtml(wsT('agentSave')) + '</button></div>' +
    '</div>';

  openPluginModal(existing ? wsT('agentEdit') : wsT('agentNew'), body, () => {
    const providerSel = document.getElementById('agentFormProvider');
    const modelSel = document.getElementById('agentFormModel');
    providerSel.addEventListener('change', () => {
      draft.provider = providerSel.value;
      draft.model = AGENT_PROVIDERS[draft.provider].models[0].id;
      modelSel.innerHTML = modelOptions(draft.provider);
    });
    document.querySelectorAll('#pluginModalBody [data-emoji]').forEach((btn) => {
      btn.addEventListener('click', () => { document.getElementById('agentFormEmoji').value = btn.dataset.emoji; });
    });
    document.getElementById('agentFormName').focus();
    document.getElementById('agentFormSave').addEventListener('click', () => {
      const values = {
        name: document.getElementById('agentFormName').value.trim() || wsT('agentDefaultName'),
        emoji: document.getElementById('agentFormEmoji').value.trim() || '✨',
        systemPrompt: document.getElementById('agentFormPrompt').value.trim(),
        provider: providerSel.value,
        model: modelSel.value
      };
      if (existing) {
        Object.assign(existing, values);
      } else {
        const created = { ...draft, ...values };
        workbench.agent.projects.push(created);
        workbench.agent.activeProjectId = created.id;
        workbench.agent.activeChatId = created.chats[0].id;
      }
      closePluginModal();
      persistWorkbenchSync();
    });
    document.getElementById('agentFormDelete')?.addEventListener('click', () => {
      if (!window.confirm(wsT('agentDeleteConfirm'))) return;
      workbench.agent.projects = workbench.agent.projects.filter((p) => p.id !== existing.id);
      workbench.agent.activeProjectId = null;
      workbench.agent.activeChatId = null;
      closePluginModal();
      persistWorkbenchSync();
    });
  });
}

function showLoginRequiredForAgent() {
  window.showNotification?.(i18n.t('agentLoginRequired') || 'Please log in', 'warning');
  window.openGoogleSignInModal?.();
}

function formatAgentTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function messageTextContent(m) {
  if (typeof m.content === 'string') return m.content;
  if (Array.isArray(m.content)) {
    return m.content.map((p) => (p && p.type === 'text' ? p.text : '')).join(' ');
  }
  return String(m.content || '');
}

function renderAgentMessages(autoScroll) {
  const container = document.getElementById('agentMessages');
  if (!container) return;
  const chat = getActiveChat();
  const project = getActiveProject();

  if (!chat.messages.length) {
    container.innerHTML = '<div class="agent-placeholder"><span class="agent-placeholder-ava">' + escapeHtml(project.emoji || '✨') + '</span>' +
      escapeHtml(wsT('agentEmpty', { name: project.name })) +
      (project.systemPrompt ? '<span class="agent-placeholder-role">' + escapeHtml(project.systemPrompt) + '</span>' : '') + '</div>';
    return;
  }

  container.innerHTML = chat.messages.map((m, idx) => {
    const isLast = idx === chat.messages.length - 1;
    const text = messageTextContent(m);
    const images = Array.isArray(m.content)
      ? m.content.filter((p) => p && p.type === 'image_url' && p.image_url?.url).map((p) => p.image_url.url)
      : [];
    const imgHtml = images.length
      ? '<div class="agent-msg-images">' + images.map((u) => '<img src="' + escapeHtml(u) + '" alt="">').join('') + '</div>'
      : '';
    const actions = (m.role === 'assistant' && isLast && !agentIsStreaming)
      ? '<span class="agent-msg-actions">' +
        '<button type="button" data-regen title="' + escapeHtml(i18n.t('agentRegenerate') || '') + '">⟳</button>' +
        '<button type="button" data-copy-msg title="' + escapeHtml(i18n.t('agentCopy') || '') + '">⧉</button>' +
        '</span>'
      : '';
    return '<div class="msg msg--' + (m.role === 'user' ? 'me' : m.role === 'error' ? 'error' : 'ai') + '">' + imgHtml + escapeHtml(text) +
      '<span class="msg-foot"><span class="msg-time">' + formatAgentTime(m.ts) + '</span>' + actions + '</span></div>';
  }).join('');

  container.querySelector('[data-regen]')?.addEventListener('click', regenerateAgentReply);
  container.querySelector('[data-copy-msg]')?.addEventListener('click', () => {
    const last = chat.messages[chat.messages.length - 1];
    navigator.clipboard?.writeText(messageTextContent(last)).then(() => {
      window.showNotification?.(i18n.t('agentCopied') || 'Copied', 'success');
    }).catch(() => {});
  });
  if (autoScroll !== false) container.scrollTop = container.scrollHeight;
}

function apiMessages(chat, project) {
  const history = chat.messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: Array.isArray(m.content) ? m.content : String(m.content || '') }))
    .slice(-40);
  return project && project.systemPrompt
    ? [{ role: 'system', content: project.systemPrompt }, ...history]
    : history;
}

async function consumeAgentStream(res, onDelta) {
  let buffer = '';
  let failed = null;

  const processChunk = async (chunkText) => {
    buffer += chunkText;
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith('data:')) continue;
      const payload = t.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const obj = JSON.parse(payload);
        if (obj.error) { failed = obj.error; return; }
        if (typeof obj.delta === 'string' && obj.delta) onDelta(obj.delta);
      } catch (_err) { /* partial line */ }
    }
  };

  if (res.body && typeof res.body.getReader === 'function') {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (value) await processChunk(decoder.decode(value, { stream: true }));
      if (done) break;
    }
    if (buffer) await processChunk(decoder.decode());
  } else {
    await processChunk(await res.text());
  }
  return { ok: !failed, error: failed };
}

function buildUserContent(text, images) {
  if (!images.length) return text;
  const parts = [{ type: 'text', text }];
  images.forEach((url) => parts.push({ type: 'image_url', image_url: { url } }));
  return parts;
}

async function sendAgentMessage() {
  if (agentIsStreaming) return;
  if (!window.authState?.isLoggedIn) {
    showLoginRequiredForAgent();
    return;
  }
  const input = document.getElementById('agentInput');
  const text = (input && input.value.trim()) || '';
  const images = agentPendingImages.slice();
  if (!text && !images.length) return;

  const project = getActiveProject();
  const model = currentAgentModel();
  const useImages = images.length && model.vision;
  if (images.length && !model.vision) {
    window.showNotification?.(i18n.t('agentVisionNotSupported') || '', 'warning');
  }

  const chat = getActiveChat();
  chat.messages.push({ role: 'user', content: buildUserContent(text, useImages ? images : []), ts: Date.now() });
  if (input) input.value = '';
  agentPendingImages = [];
  if (chat.title === UNTITLED_CHAT || !chat.title) {
    const firstText = text || (i18n.t('agentImageMessage') || 'Image');
    chat.title = firstText.length > 16 ? firstText.slice(0, 16) + '…' : firstText;
  }
  chat.updatedAt = Date.now();
  if (chat.messages.length > 100) chat.messages = chat.messages.slice(-100);
  saveWorkbench();
  renderAgentPanel();

  const assistantMsg = { role: 'assistant', content: '', ts: Date.now() };
  chat.messages.push(assistantMsg);
  agentIsStreaming = true;
  renderAgentMessages();

  try {
    const res = await fetch(window.AGENT_API_URL || '/api/agent-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: project.provider,
        model: model.id,
        messages: apiMessages(chat, project),
        stream: true
      })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || ('HTTP ' + res.status));
    }
    const result = await consumeAgentStream(res, (delta) => {
      assistantMsg.content += delta;
      chat.updatedAt = Date.now();
      renderAgentMessages(true);
    });
    if (!result.ok) throw new Error(result.error);
    if (!assistantMsg.content.trim()) assistantMsg.content = '…';
  } catch (err) {
    assistantMsg.role = 'error';
    assistantMsg.content = String(err?.message || err);
  }
  agentIsStreaming = false;
  chat.updatedAt = Date.now();
  saveWorkbench();
  renderAgentPanel();
}

async function regenerateAgentReply() {
  if (agentIsStreaming) return;
  const chat = getActiveChat();
  const lastUserIdx = chat.messages.map((m) => m.role).lastIndexOf('user');
  if (lastUserIdx === -1) return;
  const lastUserMsg = chat.messages[lastUserIdx];
  chat.messages = chat.messages.slice(0, lastUserIdx);
  saveWorkbench();
  renderAgentPanel();

  const text = messageTextContent(lastUserMsg);
  const images = Array.isArray(lastUserMsg.content)
    ? lastUserMsg.content.filter((p) => p && p.type === 'image_url' && p.image_url?.url).map((p) => p.image_url.url)
    : [];
  const input = document.getElementById('agentInput');
  if (input) input.value = text;
  agentPendingImages = images;
  await sendAgentMessage();
}

function compressImage(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const dim = maxDim || 768;
    const q = quality == null ? 0.7 : quality;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const scale = Math.min(1, dim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', q));
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image load failed')); };
    img.src = url;
  });
}

// ---------- Wiring ----------
// Remote config wins, but chats stay local: they are matched back to agents
// by id (older synced data may still carry chats; used only when this device
// has none for that agent). A refresh that changes nothing doesn't re-render,
// so a periodic sync never interrupts typing.
window.applyRemoteWorkbench = function (remote) {
  if (!remote || typeof remote !== 'object') return;
  try {
    const before = JSON.stringify(workbenchSyncPayload());
    const localChats = new Map(workbench.agent.projects.map((p) => [p.id, p.chats]));
    const next = normalizeWorkbench(remote);
    next.agent.projects.forEach((p) => {
      const local = localChats.get(p.id);
      if (local && local.length) p.chats = local;
    });
    next.calView = workbench.calView;
    next.calSel = workbench.calSel;
    next.todoFilter = workbench.todoFilter;
    next.agent.activeProjectId = workbench.agent.activeProjectId;
    next.agent.activeChatId = workbench.agent.activeChatId;
    workbench = next;
    window.workbench = workbench;
    saveWorkbench();
    if (JSON.stringify(workbenchSyncPayload()) !== before) renderWorkbench();
  } catch (_err) { /* best effort */ }
};

window.getWorkbenchSyncPayload = workbenchSyncPayload;

window.getWorkbench = function () {
  return workbench;
};

window.recordVisit = recordVisit;
window.initWorkbench = initWorkbench;
window.renderWorkbench = renderWorkbench;
window.openPluginEditor = openPluginEditor;
window.openPluginPicker = openPluginPicker;
window.closePluginModal = closePluginModal;
window.sendAgentMessage = sendAgentMessage;
window.regenerateAgentReply = regenerateAgentReply;
window.scrollToWorkbenchScreen = scrollToWorkbenchScreen;
window.scrollToHomeScreen = scrollToHomeScreen;
window.AGENT_PROVIDERS = AGENT_PROVIDERS;
window.workbench = workbench;

initWorkbench();
