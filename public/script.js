// ===== Theme Icons =====
const THEME_ICONS = {
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

// ===== Internationalization (i18n) =====
const translations = {
  zh: {
    search: '想要搜点什么吗？',
    addNew: '添加',
    addNewTitle: '添加新项目',
    site: '网站',
    tag: '标签',
    name: '名称',
    url: '网址',
    urlPlaceholder: '网址 (https://...)',
    tagName: '标签名称',
    selectTags: '选择标签',
    pinToHome: '固定在首页',
    cancel: '取消',
    save: '保存',
    close: '关闭',
    delete: '删除',
    deleteConfirm: '确定删除',
    edit: '编辑',
    noSites: '此标签下没有网站',
    nameRequired: '名称和网址必填',
    tagNameRequired: '标签名称必填',
    tagExists: '标签已存在',
    darkMode: '深色模式',
    lightMode: '浅色模式',
    login: '登录',
    logout: '退出',
    googleSignIn: '登录',
    loginSuccess: '登录成功！',
    logoutSuccess: '已退出登录',
    wallpaper: '壁纸',
    wallpaperTitle: '选择壁纸',
    landscape: '风景',
    solid: '纯色',
    daily: '每日推荐',
    wallpaperChanged: '壁纸已更换',
    restoreDefault: '恢复默认',
    restoredDefault: '已恢复默认壁纸',
    userProfile: '个人信息',
    minimalist: '极简模式',
    general: '一般模式',
    language: '语言',
    chinese: '中文',
    english: '英文',
    custom: '自定义',
    upload: '上传',
    uploadWallpaper: '上传壁纸',
    themeCustomization: '主题定制',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    search: 'What would you like to search?',
    addNew: 'Add',
    addNewTitle: 'Add New',
    site: 'Site',
    tag: 'Tag',
    name: 'Name',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'Tag Name',
    selectTags: 'Select Tags',
    pinToHome: 'Pin to Home',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    delete: 'Delete',
    deleteConfirm: 'Confirm delete',
    edit: 'Edit',
    noSites: 'No sites in this tag',
    nameRequired: 'Name and URL required',
    tagNameRequired: 'Tag name required',
    tagExists: 'Tag already exists',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    login: 'Login',
    logout: 'Logout',
    googleSignIn: 'Login',
    loginSuccess: 'Login successful!',
    logoutSuccess: 'Logged out',
    wallpaper: 'Wallpaper',
    wallpaperTitle: 'Select Wallpaper',
    landscape: 'Landscape',
    solid: 'Solid Color',
    daily: 'Daily Recommendation',
    wallpaperChanged: 'Wallpaper changed',
    restoreDefault: 'Restore Default',
    restoredDefault: 'Restored default wallpaper',
    userProfile: 'User Profile',
    minimalist: 'Minimalist',
    general: 'General',
    language: 'Language',
    chinese: 'Chinese',
    english: 'English',
    custom: 'Custom',
    upload: 'Upload',
    uploadWallpaper: 'Upload Wallpaper',
    themeCustomization: 'Theme Customization',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

const i18n = {
  currentLocale: localStorage.getItem('locale') || 'zh',

  t(key) {
    return translations[this.currentLocale][key] || key;
  },

  setLocale(locale) {
    this.currentLocale = locale;
    localStorage.setItem('locale', locale);
    updateAllText();
    updateTime(); // Update date format when language changes
  },

  toggleLocale() {
    const newLocale = this.currentLocale === 'zh' ? 'en' : 'zh';
    this.setLocale(newLocale);
  }
};

// Update all text elements with current locale
window.updateAllText = function () {
  // Update search input placeholder
  searchInput.placeholder = i18n.t('search');

  // Update modal title
  const modalTitle = document.getElementById('addModalTitle');
  if (modalTitle) modalTitle.textContent = i18n.t('addNewTitle');

  // Update modal type switch labels
  const typeLabel1 = document.getElementById('typeLabel1');
  const typeLabel2 = document.getElementById('typeLabel2');
  if (typeLabel1) typeLabel1.textContent = i18n.t('site');
  if (typeLabel2) typeLabel2.textContent = i18n.t('tag');

  // Update section labels
  const nameLabel = document.getElementById('nameLabel');
  const urlLabel = document.getElementById('urlLabel');
  const selectTagsLabel = document.getElementById('selectTagsLabel');
  const tagNameLabel = document.getElementById('tagNameLabel');
  if (nameLabel) nameLabel.textContent = i18n.t('name');
  if (urlLabel) urlLabel.textContent = i18n.t('url');
  if (selectTagsLabel) selectTagsLabel.textContent = i18n.t('selectTags');
  if (tagNameLabel) tagNameLabel.textContent = i18n.t('tagName');

  // Update input placeholders
  document.getElementById('siteName').placeholder = i18n.t('name');
  document.getElementById('siteUrl').placeholder = i18n.t('urlPlaceholder');
  document.getElementById('tagName').placeholder = i18n.t('tagName');

  // Update checkbox label
  const pinToHomeLabel = document.getElementById('pinToHomeLabel');
  if (pinToHomeLabel) pinToHomeLabel.textContent = i18n.t('pinToHome');

  // Update modal buttons
  document.getElementById('closeAddModal').textContent = i18n.t('cancel');
  document.getElementById('saveItem').textContent = i18n.t('save');
  document.getElementById('closeTagModal').textContent = i18n.t('cancel');

  // Update time and date display
  updateTime();

  // Update settings menu text
  const themeText = document.getElementById('themeText');
  const langText = document.getElementById('langText');
  const minimalistText = document.getElementById('minimalistText');
  const wallpaperText = document.getElementById('wallpaperText');

  if (themeText) {
    themeText.textContent = document.body.classList.contains('dark') ? i18n.t('lightMode') : i18n.t('darkMode');
  }

  if (langText) {
    langText.textContent = i18n.t('language');
  }

  if (minimalistText) {
    minimalistText.textContent = state.viewMode === 'general' ? i18n.t('minimalist') : i18n.t('general');
  }

  if (wallpaperText) {
    wallpaperText.textContent = i18n.t('wallpaper');
  }

  // Auth UI logic: update the auth container handled by auth.js but ensure we call it
  // Ensure auth UI is updated
  if (window.updateAuthUI) {
    window.updateAuthUI();
  }

  // Login Modal Title
  const googleSignInTitle = document.getElementById('googleSignInTitle');
  const closeGoogleSignIn = document.getElementById('closeGoogleSignIn');
  if (googleSignInTitle) {
    googleSignInTitle.textContent = i18n.t('googleSignIn');
  }
  if (closeGoogleSignIn) {
    closeGoogleSignIn.textContent = i18n.t('cancel');
  }

  // Update wallpaper modal translation
  const landscapeTabText = document.getElementById('landscapeTabText');
  const solidTabText = document.getElementById('solidTabText');
  const dailyTabText = document.getElementById('dailyTabText');
  const wallpaperModalTitle = document.getElementById('wallpaperModalTitle');
  const closeWallpaperModal = document.getElementById('closeWallpaperModal');
  const restoreWallpaperBtn = document.getElementById('restoreDefaultWallpaper');

  if (landscapeTabText) landscapeTabText.textContent = i18n.t('landscape');
  if (solidTabText) solidTabText.textContent = i18n.t('solid');
  if (dailyTabText) dailyTabText.textContent = i18n.t('daily');
  if (wallpaperModalTitle) wallpaperModalTitle.textContent = i18n.t('wallpaperTitle');
  if (closeWallpaperModal) closeWallpaperModal.textContent = i18n.t('cancel');
  if (restoreWallpaperBtn) restoreWallpaperBtn.textContent = i18n.t('restoreDefault');

  // Update Profile Modal
  const userProfileTitle = document.getElementById('userProfileTitle');
  const closeUserProfile = document.getElementById('closeUserProfile');

  if (userProfileTitle) userProfileTitle.textContent = i18n.t('userProfile');
  if (closeUserProfile) closeUserProfile.textContent = i18n.t('cancel');
  if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').textContent = i18n.t('logout');
  }

  // Update Theme Customization button
  const themeCustomizationText = document.getElementById('themeCustomizationText');
  if (themeCustomizationText) themeCustomizationText.textContent = i18n.t('themeCustomization');

  // Re-render content to update any dynamic text
  renderHome();
}

// ===== Data & State =====
const SEARCH_ENGINES = [
  { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'https://www.google.com/favicon.ico' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: 'https://www.bing.com/favicon.ico' },
  { name: 'Baidu', url: 'https://www.baidu.com/s?wd=', icon: 'https://www.baidu.com/favicon.ico' },
  { name: 'Xiaohongshu', url: 'https://www.xiaohongshu.com/search_result?keyword=', icon: 'https://www.xiaohongshu.com/favicon.ico' },
];

let state = {
  engineIndex: parseInt(localStorage.getItem('engineIndex')) || 0,
  dateFormatIndex: parseInt(localStorage.getItem('dateFormatIndex')) || 0, // 0: YMD, 1: MDY, 2: DMY
  timeFormat: localStorage.getItem('timeFormat') || '24h', // '24h' or '12h'
  sites: JSON.parse(localStorage.getItem('sites')) || [],
  tags: JSON.parse(localStorage.getItem('tags')) || [],
  tagOrder: JSON.parse(localStorage.getItem('tagOrder')) || [],
  siteOrder: JSON.parse(localStorage.getItem('siteOrder')) || [],
  viewMode: localStorage.getItem('viewMode') || 'general' // 'general' or 'minimalist'
};

// Drag and drop state
const dragState = {
  draggedElement: null,
  draggedIndex: null,
  draggedType: null, // 'tag' or 'site'
  dropTarget: null
};

// Context menu state
const contextMenuState = {
  visible: false,
  targetItem: null,
  targetType: null, // 'tag' or 'site'
  x: 0,
  y: 0
};

// Migrate old data if exists
const oldLinks = JSON.parse(localStorage.getItem('links'));
if (oldLinks && oldLinks.length > 0 && state.sites.length === 0) {
  state.sites = oldLinks.map(link => ({
    id: Date.now() + Math.random(),
    name: link.name,
    url: link.url,
    tags: [],
    showOnHome: true
  }));
  localStorage.removeItem('links');
  saveData();
}

// Initialize order arrays if empty (data migration)
if (state.tagOrder.length === 0 && state.tags.length > 0) {
  state.tagOrder = [...state.tags];
}
if (state.siteOrder.length === 0 && state.sites.length > 0) {
  state.siteOrder = state.sites.map(s => s.id);
}

function saveData(syncToBackend = true) {
  localStorage.setItem('sites', JSON.stringify(state.sites));
  localStorage.setItem('tags', JSON.stringify(state.tags));
  localStorage.setItem('tagOrder', JSON.stringify(state.tagOrder));
  localStorage.setItem('siteOrder', JSON.stringify(state.siteOrder));
  localStorage.setItem('engineIndex', state.engineIndex);
  localStorage.setItem('dateFormatIndex', state.dateFormatIndex);
  localStorage.setItem('timeFormat', state.timeFormat);
  localStorage.setItem('viewMode', state.viewMode);

  if (syncToBackend && window.authState && window.authState.isLoggedIn) {
    window.saveUserDataToBackend();
  }
}

function toggleMinimalist() {
  state.viewMode = state.viewMode === 'general' ? 'minimalist' : 'general';
  saveData();
  renderHome();
  updateAllText();
}

// ===== DOM Elements =====
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchEngineEl = document.getElementById('searchEngine');
const engineIcon = document.getElementById('engineIcon');
const engineMenu = document.getElementById('engineMenu');
const contentEl = document.getElementById('content');
const settingsToggle = document.getElementById('settingsToggle');
const settingsMenu = document.getElementById('settingsMenu');

// Modals
const modalOverlay = document.getElementById('modalOverlay');
const addModal = document.getElementById('addModal');
const tagViewModal = document.getElementById('tagViewModal');
const closeAddModalBtn = document.getElementById('closeAddModal');
const closeTagModalBtn = document.getElementById('closeTagModal');
const saveItemBtn = document.getElementById('saveItem');
const addTypeRadios = document.getElementsByName('addType');
const siteForm = document.getElementById('siteForm');
const tagForm = document.getElementById('tagForm');

// Context Menu
const contextMenu = document.getElementById('contextMenu');

// ===== Time & Date =====
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Time format logic
  if (state.timeFormat === '12h') {
    const hour12 = now.getHours() % 12 || 12;
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    timeEl.textContent = `${hour12}:${minutes} ${ampm}`;
  } else {
    timeEl.textContent = `${hours}:${minutes}`;
  }

  // Date Logic - use i18n for days and months
  const DAYS = i18n.t('days');
  const MONTHS = i18n.t('months');

  const dayName = DAYS[now.getDay()];
  const y = now.getFullYear();
  const m = now.getMonth() + 1; // numeric
  const mStr = MONTHS[now.getMonth()];
  const d = now.getDate();

  let dateStr = '';

  // Chinese mode: fixed format "YYYY年MM月DD日 星期X"
  if (i18n.currentLocale === 'zh') {
    dateStr = `${y}年${String(m).padStart(2, '0')}月${String(d).padStart(2, '0')}日 ${dayName}`;
  }
  // English mode: support format switching
  else {
    // 0: YMD (2024-01-20 Saturday)
    if (state.dateFormatIndex === 0) {
      dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} ${dayName}`;
    }
    // 1: MDY (Jan 20, 2024 Saturday)
    else if (state.dateFormatIndex === 1) {
      dateStr = `${mStr} ${d}, ${y} ${dayName}`;
    }
    // 2: DMY (20 Jan 2024 Saturday)
    else {
      dateStr = `${d} ${mStr} ${y} ${dayName}`;
    }
  }

  dateEl.textContent = dateStr;
}

dateEl.addEventListener('click', () => {
  // Only allow format switching in English mode
  if (i18n.currentLocale === 'en') {
    state.dateFormatIndex = (state.dateFormatIndex + 1) % 3;
    saveData();
    updateTime();
  }
});

// Time format toggle
timeEl.addEventListener('click', () => {
  state.timeFormat = state.timeFormat === '24h' ? '12h' : '24h';
  localStorage.setItem('timeFormat', state.timeFormat);
  saveData();
  updateTime();
});

setInterval(updateTime, 1000);
updateTime();

// ===== Search Engine =====
function renderSearchEngine() {
  const engine = SEARCH_ENGINES[state.engineIndex];
  engineIcon.src = engine.icon;
  // Fallback if icon fails
  engineIcon.onerror = () => { engineIcon.src = 'https://www.google.com/favicon.ico'; };

  engineMenu.innerHTML = SEARCH_ENGINES.map((eng, idx) => `
    <div class="engine-option" onclick="selectEngine(${idx})">
      <img src="${eng.icon}" alt="${eng.name}" onerror="this.src='https://www.google.com/favicon.ico'">
      <span>${eng.name}</span>
    </div>
  `).join('');
}

window.selectEngine = (index) => {
  state.engineIndex = index;
  saveData();
  renderSearchEngine();
  engineMenu.classList.add('hidden');
};

searchEngineEl.addEventListener('click', (e) => {
  e.stopPropagation();
  engineMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  engineMenu.classList.add('hidden');
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  const engine = SEARCH_ENGINES[state.engineIndex];
  window.location.href = engine.url + encodeURIComponent(query);
});

renderSearchEngine();

// ===== Context Menu Functions =====
function showContextMenu(event, item, type) {
  event.preventDefault();
  contextMenuState.visible = true;
  contextMenuState.targetItem = item;
  contextMenuState.targetType = type;
  contextMenuState.x = event.clientX;
  contextMenuState.y = event.clientY;
  renderContextMenu();
}

function hideContextMenu() {
  contextMenuState.visible = false;
  contextMenu.classList.add('hidden');
}

function renderContextMenu() {
  contextMenu.innerHTML = `
    <div class="context-menu-item" onclick="editItem()">
      ✏️ ${i18n.t('edit') || 'Edit'}
    </div>
    <div class="context-menu-item" onclick="deleteItem()">
      🗑️ ${i18n.t('delete')}
    </div>
  `;

  contextMenu.style.left = contextMenuState.x + 'px';
  contextMenu.style.top = contextMenuState.y + 'px';
  contextMenu.classList.remove('hidden');
}

window.editItem = function () {
  const item = contextMenuState.targetItem;
  const type = contextMenuState.targetType;

  // Reset form
  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
  document.getElementById('tagName').value = '';

  if (type === 'site') {
    // Set form to site type
    document.querySelector('input[name="addType"][value="site"]').checked = true;
    document.getElementById('siteForm').classList.remove('hidden');
    document.getElementById('tagForm').classList.add('hidden');

    // Pre-fill site data
    document.getElementById('siteName').value = item.name;
    document.getElementById('siteUrl').value = item.url;
    document.getElementById('showOnHome').checked = item.showOnHome;

    // Render tag checkboxes
    const tagSelector = document.getElementById('tagSelector');
    tagSelector.innerHTML = '';
    state.tags.forEach(tag => {
      const label = document.createElement('label');
      label.className = 'chip tag';
      label.style.border = '1px solid transparent';
      label.style.opacity = '0.6';
      label.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = tag;
      checkbox.checked = item.tags.includes(tag);
      checkbox.style.display = 'none';

      // Handle visual state on change
      checkbox.addEventListener('change', () => {
        label.style.opacity = checkbox.checked ? '1' : '0.6';
        label.style.borderColor = checkbox.checked ? 'var(--text-color)' : 'transparent';
      });

      // Set initial visual state
      if (checkbox.checked) {
        label.style.opacity = '1';
        label.style.borderColor = 'var(--text-color)';
      }

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(' ' + tag));

      tagSelector.appendChild(label);
    });
  } else {
    // Set form to tag type
    document.querySelector('input[name="addType"][value="tag"]').checked = true;
    document.getElementById('siteForm').classList.add('hidden');
    document.getElementById('tagForm').classList.remove('hidden');

    // Pre-fill tag data
    document.getElementById('tagName').value = item;
  }

  // Store the item being edited for save logic
  window.editingItem = { item, type };

  addModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  hideContextMenu();

  // Disable type switching during edit
  addTypeRadios.forEach(r => r.disabled = true);
};

// Delete Modal State
let pendingDelete = null;

window.deleteItem = function () {
  const item = contextMenuState.targetItem;
  const type = contextMenuState.targetType;

  const itemName = type === 'site' ? item.name : item;

  // Setup Modal
  pendingDelete = { item, type };
  document.getElementById('deleteTitle').textContent = i18n.t('delete');
  document.getElementById('deleteMessage').textContent = `${i18n.t('deleteConfirm')} "${itemName}"?`;

  // Show Modal
  document.getElementById('deleteModal').classList.remove('hidden');
  modalOverlay.classList.remove('hidden');

  hideContextMenu();
};

// Confirm Delete Handler
document.getElementById('confirmDelete').addEventListener('click', () => {
  if (!pendingDelete) return;

  const { item, type } = pendingDelete;

  if (type === 'site') {
    state.sites = state.sites.filter(s => s.id !== item.id);
    state.siteOrder = state.siteOrder.filter(id => id !== item.id);
  } else {
    state.tags = state.tags.filter(t => t !== item);
    state.tagOrder = state.tagOrder.filter(t => t !== item);
    // Remove tag from all sites
    state.sites.forEach(site => {
      site.tags = site.tags.filter(t => t !== item);
    });
  }
  saveData();
  renderHome();

  // Close Modal
  document.getElementById('deleteModal').classList.add('hidden');
  modalOverlay.classList.add('hidden');
  pendingDelete = null;
});

// Cancel Delete Handler
document.getElementById('cancelDelete').addEventListener('click', () => {
  document.getElementById('deleteModal').classList.add('hidden');
  modalOverlay.classList.add('hidden');
  pendingDelete = null;
});

// Close context menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.context-menu') && !e.target.closest('.chip')) {
    hideContextMenu();
  }
});

// ===== Content Rendering =====
function renderHome() {
  contentEl.innerHTML = '';

  // Minimalist mode check
  if (state.viewMode === 'minimalist') {
    return;
  }

  // 1. Render Tags (sorted by tagOrder)
  const orderedTags = state.tagOrder.length > 0
    ? state.tagOrder.filter(tag => state.tags.includes(tag))
    : state.tags;

  orderedTags.forEach((tag, index) => {
    const chip = document.createElement('div');
    chip.className = 'chip tag';
    chip.textContent = '# ' + tag;
    chip.onclick = () => openTagView(tag);
    chip.oncontextmenu = (e) => showContextMenu(e, tag, 'tag');

    // Add drag and drop attributes
    chip.draggable = true;
    chip.addEventListener('dragstart', (e) => handleDragStart(e, index, 'tag'));
    chip.addEventListener('dragover', handleDragOver);
    chip.addEventListener('drop', (e) => handleDrop(e, index, 'tag'));
    chip.addEventListener('dragend', handleDragEnd);

    contentEl.appendChild(chip);
  });

  // 2. Render Pinned Sites (sorted by siteOrder)
  const pinnedSites = state.sites.filter(s => s.showOnHome);
  const orderedSites = state.siteOrder.length > 0
    ? state.siteOrder
      .map(id => pinnedSites.find(s => s.id === id))
      .filter(s => s !== undefined)
    : pinnedSites;

  orderedSites.forEach((site, index) => {
    const chip = document.createElement('div');
    chip.className = 'chip site';
    chip.textContent = site.name;
    chip.onclick = () => window.location.href = site.url;
    chip.oncontextmenu = (e) => showContextMenu(e, site, 'site');

    // Add drag and drop attributes
    chip.draggable = true;
    chip.addEventListener('dragstart', (e) => handleDragStart(e, index, 'site'));
    chip.addEventListener('dragover', handleDragOver);
    chip.addEventListener('drop', (e) => handleDrop(e, index, 'site'));
    chip.addEventListener('dragend', handleDragEnd);

    contentEl.appendChild(chip);
  });

  // 3. Render Add Button as chip (after all sites)
  const addChip = document.createElement('div');
  addChip.className = 'chip add-chip';
  addChip.textContent = '＋';
  addChip.onclick = () => {
    // Reset form
    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
    document.getElementById('tagName').value = '';

    // Render tag checkboxes
    const tagSelector = document.getElementById('tagSelector');
    tagSelector.innerHTML = '';
    state.tags.forEach(tag => {
      const label = document.createElement('label');
      label.className = 'chip tag';
      label.style.border = '1px solid transparent';
      label.style.opacity = '0.6';
      label.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = tag;
      checkbox.style.display = 'none';

      // Handle visual state on change
      checkbox.addEventListener('change', () => {
        label.style.opacity = checkbox.checked ? '1' : '0.6';
        label.style.borderColor = checkbox.checked ? 'var(--text-color)' : 'transparent';
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(' ' + tag));

      tagSelector.appendChild(label);
    });

    addModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');

    // Enable radios for new item
    addTypeRadios.forEach(r => r.disabled = false);
  };

  contentEl.appendChild(addChip);
}

// ===== Drag and Drop Event Handlers =====
function handleDragStart(event, index, type) {
  dragState.draggedElement = event.target;
  dragState.draggedIndex = index;
  dragState.draggedType = type;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', event.target.innerHTML);

  // Add visual feedback
  event.target.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const target = event.target.closest('.chip');
  if (target && target !== dragState.draggedElement) {
    dragState.dropTarget = target;

    // Get the target index from the DOM
    const chips = Array.from(contentEl.querySelectorAll('.chip'));
    const targetIndex = chips.indexOf(target);

    // Only reorder if target is valid and different from current position
    if (targetIndex !== -1 && targetIndex !== dragState.draggedIndex) {
      const fromIndex = dragState.draggedIndex;
      const toIndex = targetIndex;

      // Only allow reordering same type
      if (dragState.draggedType === 'tag') {
        const item = state.tagOrder[fromIndex];
        state.tagOrder.splice(fromIndex, 1);
        state.tagOrder.splice(toIndex, 0, item);
        dragState.draggedIndex = toIndex;
      } else if (dragState.draggedType === 'site') {
        const item = state.siteOrder[fromIndex];
        state.siteOrder.splice(fromIndex, 1);
        state.siteOrder.splice(toIndex, 0, item);
        dragState.draggedIndex = toIndex;
      }

      // Re-render in real-time
      renderHome();
    }
  }

  return false;
}

function handleDrop(event, targetIndex, targetType) {
  event.preventDefault();
  event.stopPropagation();

  // Only allow dropping on same type
  if (dragState.draggedType !== targetType) {
    return false;
  }

  // Reordering is already done in handleDragOver
  // Just save the data
  saveData();

  return false;
}

function handleDragEnd(event) {
  // Remove visual feedback
  event.target.classList.remove('dragging');

  // Clear drag state
  dragState.draggedElement = null;
  dragState.draggedIndex = null;
  dragState.draggedType = null;
  dragState.dropTarget = null;
}

// ===== Add/Edit Modal =====
// Note: Add button is now rendered as a chip in renderHome()

function closeModals() {
  modalOverlay.classList.add('hidden');
  addModal.classList.add('hidden');
  tagViewModal.classList.add('hidden');
  document.getElementById('deleteModal').classList.add('hidden'); // Close delete modal
}

closeAddModalBtn.onclick = closeModals;
closeTagModalBtn.onclick = closeModals;
modalOverlay.onclick = (e) => {
  if (e.target === modalOverlay) closeModals();
};

// Switch Add Type
addTypeRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === 'site') {
      siteForm.classList.remove('hidden');
      tagForm.classList.add('hidden');
    } else {
      siteForm.classList.add('hidden');
      tagForm.classList.remove('hidden');
    }
  });
});

// Save Logic
saveItemBtn.addEventListener('click', () => {
  const type = document.querySelector('input[name="addType"]:checked').value;
  const isEditing = window.editingItem !== undefined;

  if (type === 'site') {
    const name = document.getElementById('siteName').value.trim();
    let url = document.getElementById('siteUrl').value.trim();
    if (!name || !url) return alert(i18n.t('nameRequired'));

    if (!url.startsWith('http')) url = 'https://' + url;

    const selectedTags = Array.from(document.querySelectorAll('#tagSelector input:checked')).map(cb => cb.value);
    const showOnHome = document.getElementById('showOnHome').checked;

    if (isEditing) {
      // Update existing site
      const siteIndex = state.sites.findIndex(s => s.id === window.editingItem.item.id);
      if (siteIndex !== -1) {
        state.sites[siteIndex].name = name;
        state.sites[siteIndex].url = url;
        state.sites[siteIndex].tags = selectedTags;
        state.sites[siteIndex].showOnHome = showOnHome;

        // Update siteOrder if showOnHome changed
        const inOrder = state.siteOrder.includes(state.sites[siteIndex].id);
        if (showOnHome && !inOrder) {
          state.siteOrder.push(state.sites[siteIndex].id);
        } else if (!showOnHome && inOrder) {
          state.siteOrder = state.siteOrder.filter(id => id !== state.sites[siteIndex].id);
        }
      }
    } else {
      // Create new site
      const newSite = {
        id: Date.now(),
        name,
        url,
        tags: selectedTags,
        showOnHome
      };

      state.sites.push(newSite);

      // Add to siteOrder
      if (showOnHome) {
        state.siteOrder.push(newSite.id);
      }
    }
  } else {
    const tagName = document.getElementById('tagName').value.trim();
    if (!tagName) return alert(i18n.t('tagNameRequired'));

    if (isEditing) {
      // Update existing tag
      const oldTagName = window.editingItem.item;
      const tagIndex = state.tags.indexOf(oldTagName);
      if (tagIndex !== -1) {
        // Check if new name already exists
        if (state.tags.includes(tagName) && tagName !== oldTagName) {
          return alert(i18n.t('tagExists'));
        }

        state.tags[tagIndex] = tagName;

        // Update tagOrder
        const orderIndex = state.tagOrder.indexOf(oldTagName);
        if (orderIndex !== -1) {
          state.tagOrder[orderIndex] = tagName;
        }

        // Update all sites that have this tag
        state.sites.forEach(site => {
          const siteTagIndex = site.tags.indexOf(oldTagName);
          if (siteTagIndex !== -1) {
            site.tags[siteTagIndex] = tagName;
          }
        });
      }
    } else {
      // Create new tag
      if (state.tags.includes(tagName)) return alert(i18n.t('tagExists'));
      state.tags.push(tagName);

      // Add to tagOrder
      state.tagOrder.push(tagName);
    }
  }

  // Clear editing state
  window.editingItem = undefined;

  saveData();
  renderHome();
  closeModals();
});

// ===== Tag View Logic =====
function openTagView(tagName) {
  document.getElementById('tagViewTitle').textContent = '# ' + tagName;
  const grid = document.getElementById('tagViewLinks');
  grid.innerHTML = '';

  const tagSites = state.sites.filter(s => s.tags.includes(tagName));

  if (tagSites.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; opacity: 0.5;">${i18n.t('noSites')}</div>`;
  } else {
    // Collect all links first
    tagSites.forEach((site, index) => {
      const el = document.createElement('a');
      el.className = 'tag-link-item';
      el.href = site.url;
      el.textContent = site.name;
      grid.appendChild(el);

      // Add separator if not last
      if (index < tagSites.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'tag-view-separator';
        sep.textContent = '、';
        grid.appendChild(sep);
      }
    });
  }

  tagViewModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}


// ===== Theme =====
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(savedTheme);

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (themeText) {
    themeText.textContent = theme === 'dark' ? i18n.t('darkMode') || '深色模式' : i18n.t('lightMode') || '浅色模式';
  }
}

window.toggleTheme = function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Update icon
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.innerHTML = isDark ? THEME_ICONS.sun : THEME_ICONS.moon;
  }

  // Update text
  const themeText = document.getElementById('themeText');
  if (themeText) {
    themeText.textContent = isDark ? i18n.t('lightMode') : i18n.t('darkMode');
  }
};

// ===== Language Toggle =====
window.toggleLanguage = function () {
  i18n.toggleLocale();
  updateSettingsMenu();
};

// ===== Settings Menu =====
function updateSettingsMenu() {
  const isDark = document.body.classList.contains('dark');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const langText = document.getElementById('langText');

  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  }
  if (themeText) {
    themeText.textContent = isDark ? i18n.t('darkMode') || '深色模式' : i18n.t('lightMode') || '浅色模式';
  }
  if (langText) {
    langText.textContent = i18n.currentLocale === 'zh' ? '中文' : 'English';
  }
}

settingsToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsMenu.classList.toggle('hidden');
});

document.getElementById('languageMenuItem').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('languageSubmenu').classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.settings-menu') && !e.target.closest('.settings-btn')) {
    settingsMenu.classList.add('hidden');
    document.getElementById('languageSubmenu').classList.add('hidden');
  } else if (!e.target.closest('#languageMenuItem')) {
    document.getElementById('languageSubmenu').classList.add('hidden');
  }
});

// ===== Initialize =====
searchInput.focus();
updateAllText();
renderHome();

