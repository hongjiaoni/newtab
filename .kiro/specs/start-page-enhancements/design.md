# 设计文档

## 概述

本设计文档描述了起始页（Start Page）Web 项目的增强功能实现方案。该项目使用纯 HTML、CSS 和 JavaScript 构建，无需外部框架。增强功能包括改进的 UI 元素、拖放排序、国际化支持和优化的用户交互体验。

设计遵循现有代码的简约风格，保持轻量级和高性能，所有数据存储在浏览器的 localStorage 中。

## 架构

### 整体架构

应用程序采用客户端单页面架构：

```
┌─────────────────────────────────────┐
│         index.html                  │
│  ┌───────────────────────────────┐  │
│  │  Header (Theme + Language)    │  │
│  ├───────────────────────────────┤  │
│  │  Time & Date Display          │  │
│  ├───────────────────────────────┤  │
│  │  Search Box + Engine Selector │  │
│  ├───────────────────────────────┤  │
│  │  Content Area                 │  │
│  │  - Tags (draggable)           │  │
│  │  - Sites (draggable)          │  │
│  │  - Add Button (as chip)       │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         script.js                   │
│  ┌───────────────────────────────┐  │
│  │  State Management             │  │
│  │  - sites, tags, preferences   │  │
│  ├───────────────────────────────┤  │
│  │  I18n Module                  │  │
│  │  - translations, locale       │  │
│  ├───────────────────────────────┤  │
│  │  Drag & Drop Handler          │  │
│  │  - reordering logic           │  │
│  ├───────────────────────────────┤  │
│  │  UI Rendering                 │  │
│  │  - dynamic content generation │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         style.css                   │
│  - Theme variables                  │
│  - Component styles                 │
│  - Drag & drop visual feedback      │
│  - Rounded corners (maximized)      │
└─────────────────────────────────────┘
```

### 数据流

```
用户操作 → 事件处理器 → 状态更新 → localStorage 持久化 → UI 重新渲染
```

## 组件和接口

### 1. 主题切换组件

**现有实现：** 使用文本符号 (☀︎/☾)  
**新实现：** 使用 SVG 图标

```javascript
// SVG 图标定义
const THEME_ICONS = {
  sun: `<svg>...</svg>`,  // 简约太阳图标
  moon: `<svg>...</svg>`  // 简约月亮图标
};

// 更新主题切换函数
function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === 'dark' ? THEME_ICONS.sun : THEME_ICONS.moon;
}
```

**样式更新：**
- 按钮圆角设置为 50%（完全圆形）
- 保持现有的悬停效果和过渡动画

### 2. 搜索框组件

**样式更新：**
```css
.search-box {
  border-radius: 32px; /* 从 24px 增加到 32px */
}
```

### 3. 拖放排序系统

**接口设计：**

```javascript
// 拖放状态
const dragState = {
  draggedElement: null,
  draggedIndex: null,
  draggedType: null, // 'tag' 或 'site'
  dropTarget: null
};

// 核心函数
function initDragAndDrop() {
  // 为所有 chip 添加拖放事件监听器
}

function handleDragStart(event, index, type) {
  // 设置拖动数据和视觉反馈
  event.dataTransfer.effectAllowed = 'move';
  dragState.draggedIndex = index;
  dragState.draggedType = type;
}

function handleDragOver(event) {
  // 允许放置
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event, targetIndex, targetType) {
  // 重新排序数组
  // 保存到 localStorage
  // 重新渲染
}
```

**实现细节：**
- 使用 HTML5 Drag and Drop API
- 标签和网站分别维护独立的排序
- 拖动时添加视觉反馈（半透明、边框高亮）
- 放置时平滑动画过渡

**数据模型更新：**
```javascript
state = {
  // ... 现有字段
  tagOrder: [],    // 标签 ID 的排序数组
  siteOrder: []    // 网站 ID 的排序数组
};
```

### 4. 添加按钮重新设计

**现有实现：** 独立按钮  
**新实现：** 作为最后一个 chip 卡片

```javascript
function renderHome() {
  // 1. 渲染标签
  // 2. 渲染网站
  // 3. 渲染添加按钮作为 chip
  const addChip = document.createElement('div');
  addChip.className = 'chip add-chip';
  addChip.innerHTML = '＋';
  addChip.onclick = openAddModal;
  contentEl.appendChild(addChip);
}
```

**样式：**
```css
.add-chip {
  border: 2px dashed var(--border-color);
  opacity: 0.6;
}
```

### 5. 时间显示组件

**样式更新：**
```css
.time {
  font-weight: 700; /* 从 300 改为 700 */
}
```

### 6. 国际化（i18n）系统

**架构：**

```javascript
// 翻译字典
const translations = {
  zh: {
    search: '搜索...',
    addNew: '添加',
    addNewTitle: '添加新项目',
    site: '网站',
    tag: '标签',
    name: '名称',
    url: '网址',
    tagName: '标签名称',
    selectTags: '选择标签',
    pinToHome: '固定在首页',
    cancel: '取消',
    save: '保存',
    close: '关闭',
    delete: '删除',
    deleteConfirm: '确定删除',
    noSites: '此标签下没有网站',
    // 星期
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    // 月份
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    search: 'Search...',
    addNew: 'Add',
    addNewTitle: 'Add New',
    site: 'Site',
    tag: 'Tag',
    name: 'Name',
    url: 'URL',
    tagName: 'Tag Name',
    selectTags: 'Select Tags',
    pinToHome: 'Pin to Home',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    delete: 'Delete',
    deleteConfirm: 'Confirm delete',
    noSites: 'No sites in this tag',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

// i18n 核心函数
const i18n = {
  currentLocale: localStorage.getItem('locale') || 'zh',
  
  t(key) {
    return translations[this.currentLocale][key] || key;
  },
  
  setLocale(locale) {
    this.currentLocale = locale;
    localStorage.setItem('locale', locale);
    updateAllText();
  },
  
  toggleLocale() {
    const newLocale = this.currentLocale === 'zh' ? 'en' : 'zh';
    this.setLocale(newLocale);
  }
};

// 更新所有文本
function updateAllText() {
  // 更新占位符
  searchInput.placeholder = i18n.t('search');
  // 更新按钮文本
  // 更新模态框文本
  // 重新渲染内容
}
```

**语言切换按钮：**
```html
<button id="languageToggle" class="lang-btn">中/EN</button>
```

位置：右上角，主题切换按钮旁边

### 7. 添加弹窗优化

**布局改进：**

```html
<div id="addModal" class="modal">
  <h3>添加新项目</h3>
  
  <!-- 类型选择 -->
  <div class="modal-section">
    <label class="section-label">类型</label>
    <div class="modal-type-switch">
      <label><input type="radio" name="addType" value="site" checked> 网站</label>
      <label><input type="radio" name="addType" value="tag"> 标签</label>
    </div>
  </div>
  
  <!-- 网站表单 -->
  <div id="siteForm">
    <div class="modal-section">
      <label class="section-label">名称</label>
      <input type="text" id="siteName" class="modal-input" />
    </div>
    
    <div class="modal-section">
      <label class="section-label">网址</label>
      <input type="url" id="siteUrl" class="modal-input" />
    </div>
    
    <div class="modal-section">
      <label class="section-label">标签（多选）</label>
      <div class="tags-select" id="tagSelector">
        <!-- 复选框 -->
      </div>
    </div>
    
    <div class="modal-section">
      <label class="checkbox-label">
        <input type="checkbox" id="showOnHome" checked>
        <span>固定在首页</span>
      </label>
    </div>
  </div>
  
  <!-- 标签表单 -->
  <div id="tagForm" class="hidden">
    <div class="modal-section">
      <label class="section-label">标签名称</label>
      <input type="text" id="tagName" class="modal-input" />
    </div>
  </div>
  
  <div class="modal-actions">
    <button id="closeAddModal">取消</button>
    <button id="saveItem" class="primary-btn">保存</button>
  </div>
</div>
```

**样式：**
```css
.modal-section {
  margin-bottom: 16px;
  text-align: left;
}

.section-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
}

.tags-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### 8. 搜索引擎菜单自动关闭

**实现：**
```javascript
window.selectEngine = (index) => {
  state.engineIndex = index;
  saveData();
  renderSearchEngine();
  engineMenu.classList.add('hidden'); // 已存在，确保执行
};
```

当前代码已经实现了此功能，需要确保在所有情况下都正确执行。

### 9. 按钮圆角最大化

**全局样式更新：**
```css
/* 所有按钮 */
button {
  border-radius: 50px; /* 或 50% 对于正方形按钮 */
}

/* 主题切换按钮 */
.theme-btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

/* 语言切换按钮 */
.lang-btn {
  border-radius: 50px;
}

/* 模态框按钮 */
.modal-actions button {
  border-radius: 50px;
}

/* Chip 元素 */
.chip {
  border-radius: 50px;
}
```

### 10. 右键菜单系统

**接口设计：**

```javascript
// 右键菜单状态
const contextMenuState = {
  visible: false,
  targetItem: null,
  targetType: null, // 'tag' 或 'site'
  x: 0,
  y: 0
};

// 显示右键菜单
function showContextMenu(event, item, type) {
  event.preventDefault();
  contextMenuState.visible = true;
  contextMenuState.targetItem = item;
  contextMenuState.targetType = type;
  contextMenuState.x = event.clientX;
  contextMenuState.y = event.clientY;
  renderContextMenu();
}

// 隐藏右键菜单
function hideContextMenu() {
  contextMenuState.visible = false;
  const menu = document.getElementById('contextMenu');
  if (menu) menu.remove();
}

// 编辑项目
function editItem(item, type) {
  // 打开模态框并预填充数据
  if (type === 'site') {
    document.getElementById('siteName').value = item.name;
    document.getElementById('siteUrl').value = item.url;
    // 预选标签
    // 预选固定首页选项
  } else {
    document.getElementById('tagName').value = item;
  }
  openAddModal(type, item);
  hideContextMenu();
}

// 删除项目
function deleteItem(item, type) {
  const confirmMsg = i18n.t('deleteConfirm') + ` "${type === 'site' ? item.name : item}"?`;
  if (confirm(confirmMsg)) {
    if (type === 'site') {
      state.sites = state.sites.filter(s => s.id !== item.id);
      state.siteOrder = state.siteOrder.filter(id => id !== item.id);
    } else {
      state.tags = state.tags.filter(t => t !== item);
      state.tagOrder = state.tagOrder.filter(t => t !== item);
      // 从所有网站中移除该标签
      state.sites.forEach(site => {
        site.tags = site.tags.filter(t => t !== item);
      });
    }
    saveData();
    renderHome();
  }
  hideContextMenu();
}
```

**HTML 结构：**
```html
<div id="contextMenu" class="context-menu" style="left: Xpx; top: Ypx;">
  <div class="context-menu-item" onclick="editItem()">
    <span>✏️ 编辑</span>
  </div>
  <div class="context-menu-item" onclick="deleteItem()">
    <span>🗑️ 删除</span>
  </div>
</div>
```

**样式：**
```css
.context-menu {
  position: fixed;
  background: var(--modal-bg);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 4px;
  z-index: 1000;
  min-width: 120px;
}

.context-menu-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  transition: background 0.2s;
}

.context-menu-item:hover {
  background: var(--hover-bg);
}
```

### 11. 改进的拖放排序（自动排序）

**增强实现：**

```javascript
function handleDragOver(event, targetIndex, targetType) {
  event.preventDefault();
  
  // 只允许同类型拖放
  if (dragState.draggedType !== targetType) {
    return;
  }
  
  const fromIndex = dragState.draggedIndex;
  
  // 实时重新排序（不等待 drop）
  if (fromIndex !== targetIndex) {
    if (targetType === 'tag') {
      const item = state.tagOrder[fromIndex];
      state.tagOrder.splice(fromIndex, 1);
      state.tagOrder.splice(targetIndex, 0, item);
    } else {
      const item = state.siteOrder[fromIndex];
      state.siteOrder.splice(fromIndex, 1);
      state.siteOrder.splice(targetIndex, 0, item);
    }
    
    dragState.draggedIndex = targetIndex;
    renderHome(); // 实时更新显示
  }
}

function handleDrop(event) {
  event.preventDefault();
  // 保存最终排序
  saveData();
}
```

**CSS 动画：**
```css
.chip {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.chip.dragging {
  opacity: 0.5;
  transform: scale(1.05);
}
```

### 12. 中文日期格式优化

**实现：**

```javascript
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  // 根据时间格式显示
  if (state.timeFormat === '12h') {
    const hour12 = now.getHours() % 12 || 12;
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    timeEl.textContent = `${hour12}:${minutes} ${ampm}`;
  } else {
    timeEl.textContent = `${hours}:${minutes}`;
  }

  // 日期逻辑
  const DAYS = i18n.t('days');
  const MONTHS = i18n.t('months');
  const dayName = DAYS[now.getDay()];
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const mStr = MONTHS[now.getMonth()];
  const d = now.getDate();

  let dateStr = '';
  
  // 中文模式：固定格式，不可切换
  if (i18n.currentLocale === 'zh') {
    dateStr = `${y}年${m}月${d}日 ${dayName}`;
  } 
  // 英文模式：支持格式切换
  else {
    if (state.dateFormatIndex === 0) {
      dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} ${dayName}`;
    } else if (state.dateFormatIndex === 1) {
      dateStr = `${mStr} ${d}, ${y} ${dayName}`;
    } else {
      dateStr = `${d} ${mStr} ${y} ${dayName}`;
    }
  }

  dateEl.textContent = dateStr;
}

// 日期点击事件
dateEl.addEventListener('click', () => {
  // 仅在英文模式下允许切换
  if (i18n.currentLocale === 'en') {
    state.dateFormatIndex = (state.dateFormatIndex + 1) % 3;
    saveData();
    updateTime();
  }
});
```

### 13. 时间格式切换

**实现：**

```javascript
// 添加到 state
state.timeFormat = localStorage.getItem('timeFormat') || '24h'; // '12h' 或 '24h'

// 时间点击事件
timeEl.addEventListener('click', () => {
  state.timeFormat = state.timeFormat === '24h' ? '12h' : '24h';
  localStorage.setItem('timeFormat', state.timeFormat);
  updateTime();
});

// 更新 updateTime 函数（见上面第 12 点）
```

### 14. 统一设置菜单

**HTML 结构：**

```html
<div class="top-right-controls">
  <button id="settingsToggle" class="settings-btn">⋯</button>
  <div id="settingsMenu" class="settings-menu hidden">
    <div class="settings-menu-item" onclick="toggleTheme()">
      <span id="themeIcon">🌙</span>
      <span id="themeText">深色模式</span>
    </div>
    <div class="settings-menu-item" onclick="toggleLanguage()">
      <span>🌐</span>
      <span id="langText">中文</span>
    </div>
  </div>
</div>
```

**JavaScript：**

```javascript
const settingsToggle = document.getElementById('settingsToggle');
const settingsMenu = document.getElementById('settingsMenu');

settingsToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  settingsMenu.classList.add('hidden');
});

function toggleTheme() {
  // 现有主题切换逻辑
  updateSettingsMenu();
}

function toggleLanguage() {
  i18n.toggleLocale();
  updateSettingsMenu();
}

function updateSettingsMenu() {
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeIcon').textContent = isDark ? '☀️' : '🌙';
  document.getElementById('themeText').textContent = isDark ? i18n.t('lightMode') : i18n.t('darkMode');
  document.getElementById('langText').textContent = i18n.currentLocale === 'zh' ? '中文' : 'English';
}
```

**样式：**

```css
.settings-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-btn:hover {
  opacity: 1;
}

.settings-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: var(--modal-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 8px;
  min-width: 160px;
  z-index: 100;
}

.settings-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.settings-menu-item:hover {
  background: var(--hover-bg);
}

.settings-menu-item span:first-child {
  font-size: 18px;
}
```

### 15. 移除独立添加按钮

**实现：**

```javascript
// 在 renderHome() 中移除以下代码：
// const addBtn = document.getElementById('addBtn');
// addBtn.addEventListener('click', ...);

// 保留内联添加按钮（作为 chip）
// 已在第 4 点实现
```

**HTML 更新：**
```html
<!-- 移除此按钮 -->
<!-- <button id="addBtn" class="add-btn">＋ Add</button> -->
```

### 16. 优化弹窗字体和布局

**样式更新：**

```css
.modal {
  font-size: 13px; /* 从 14px 减小 */
}

.modal h3 {
  font-size: 16px; /* 从 18px 减小 */
}

.modal-input {
  font-size: 13px;
}

.section-label {
  font-size: 12px; /* 从 14px 减小 */
}

.modal-section {
  text-align: left; /* 确保左对齐 */
}

.tags-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start; /* 左对齐 */
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start; /* 左对齐 */
}
```

## 数据模型

### 状态对象

```javascript
state = {
  // 搜索引擎索引
  engineIndex: 0,
  
  // 日期格式索引（仅英文模式使用）
  dateFormatIndex: 0,
  
  // 时间格式：'12h' 或 '24h'
  timeFormat: '24h',
  
  // 网站数组
  sites: [
    {
      id: number,
      name: string,
      url: string,
      tags: string[],
      showOnHome: boolean
    }
  ],
  
  // 标签数组
  tags: string[],
  
  // 排序数组
  tagOrder: string[],    // 标签名称的排序
  siteOrder: number[],   // 网站 ID 的排序
  
  // 语言偏好
  locale: 'zh' | 'en'
};
```

### localStorage 键

- `engineIndex`: 搜索引擎索引
- `dateFormatIndex`: 日期格式索引（仅英文模式）
- `timeFormat`: 时间格式（'12h' | '24h'）
- `sites`: 网站数据（JSON）
- `tags`: 标签数据（JSON）
- `tagOrder`: 标签排序（JSON）
- `siteOrder`: 网站排序（JSON）
- `theme`: 主题（'dark' | 'light'）
- `locale`: 语言（'zh' | 'en'）

## 正确性属性

*属性是关于系统应该满足的特征或行为的形式化陈述，它应该在所有有效执行中保持为真。属性是人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: 主题模式下样式一致性

*对于任何* 主题模式（深色或浅色），搜索框的圆角、时间字体加粗和按钮圆角样式应该保持一致的值，不受主题切换影响。

**验证：需求 2.2, 5.2, 9.3**

### 属性 2: 拖放位置变更

*对于任何* Chip（标签或网站），当用户执行拖放操作时，该 Chip 在列表中的位置应该改变为放置目标的位置。

**验证：需求 3.1**

### 属性 3: 拖放持久化

*对于任何* 拖放操作完成后，新的排序应该立即保存到 localStorage，并且重新加载页面后应该按照保存的顺序显示。

**验证：需求 3.2, 3.3**

### 属性 4: 独立排序维护

*对于任何* 标签的拖放操作，网站的排序应该保持不变；反之，对于任何网站的拖放操作，标签的排序应该保持不变。

**验证：需求 3.4**

### 属性 5: 添加按钮位置

*对于任何* 渲染状态，添加按钮应该始终出现在所有网站 Chip 之后的位置。

**验证：需求 4.2**

### 属性 6: 语言切换行为

*对于任何* 语言切换操作，所有界面文本（按钮、标签、占位符、提示信息）应该更新为目标语言的翻译，并且日期格式应该与目标语言匹配。

**验证：需求 6.2, 6.6, 6.7**

### 属性 7: 语言偏好持久化

*对于任何* 语言设置，该偏好应该保存到 localStorage，并且页面重新加载后应该使用保存的语言偏好。

**验证：需求 6.4, 6.5**

### 属性 8: 表单字段标签

*对于任何* 添加模态框中的输入字段，应该有对应的清晰标签文本标识该字段。

**验证：需求 7.4**

### 属性 9: 搜索引擎菜单自动关闭

*对于任何* 搜索引擎选项的点击操作，系统应该先完成搜索引擎切换，然后立即关闭引擎菜单。

**验证：需求 8.1, 8.2**

### 属性 10: 按钮圆角一致性

*对于所有* 按钮元素（主题切换、语言切换、添加按钮、模态框按钮），border-radius 应该设置为最大值并保持一致。

**验证：需求 9.1, 9.2**

### 属性 11: 右键菜单编辑功能

*对于任何* Chip（标签或网站），点击右键菜单的"编辑"选项应该打开模态框并正确预填充该项的数据。

**验证：需求 10.3**

### 属性 12: 右键菜单删除功能

*对于任何* Chip（标签或网站），点击右键菜单的"删除"选项并确认后，该项应该从存储中移除并从显示中消失。

**验证：需求 10.4, 10.5**

### 属性 13: 菜单自动关闭

*对于任何* 打开的菜单（右键菜单或设置菜单），点击菜单外部区域应该自动关闭该菜单。

**验证：需求 10.6, 14.5**

### 属性 14: 拖放实时排序

*对于任何* 拖动操作，当拖动的 Chip 经过其他 Chip 时，系统应该实时调整元素位置并在释放时立即保存新排序。

**验证：需求 11.1, 11.3, 11.4**

### 属性 15: 语言相关日期格式

*对于任何* 语言切换操作，日期格式应该自动更新：中文模式使用固定格式"YYYY年MM月DD日"且不可切换，英文模式支持格式切换。

**验证：需求 12.1, 12.2, 12.3, 12.4**

### 属性 16: 时间格式切换和持久化

*对于任何* 时间格式设置，点击时间应该在 12H 和 24H 之间切换，该偏好应该保存到 localStorage，并且页面重新加载后应该使用保存的格式。

**验证：需求 13.1, 13.3, 13.4**

### 属性 17: 设置菜单功能

*对于任何* 设置菜单中的选项（主题或语言），点击后应该立即应用更改并更新界面。

**验证：需求 14.2, 14.6**

### 属性 18: 模态框响应式布局

*对于任何* 屏幕尺寸，添加模态框应该保持良好的布局和可读性。

**验证：需求 16.4**

## 错误处理

### 拖放错误

- **无效放置目标：** 如果用户尝试将元素放置到无效位置，系统应该恢复到原始位置
- **拖放中断：** 如果拖放操作被中断（如按 ESC 键），系统应该取消操作并保持原始状态

### 本地存储错误

- **存储失败：** 如果 localStorage 写入失败（如配额超限），系统应该在控制台记录错误但继续运行
- **数据损坏：** 如果从 localStorage 读取的数据无效，系统应该使用默认值并尝试修复

### 国际化错误

- **缺失翻译：** 如果某个键没有翻译，系统应该显示键名作为后备
- **无效语言代码：** 如果 localStorage 中的语言代码无效，系统应该回退到默认语言（中文）

### SVG 图标加载错误

- **图标加载失败：** 如果 SVG 图标无法渲染，系统应该显示文本后备（☀︎/☾）

## 测试策略

### 单元测试

单元测试用于验证特定示例、边缘情况和错误条件：

**UI 组件测试：**
- 主题切换按钮在深色模式显示太阳图标（需求 1.2）
- 主题切换按钮在浅色模式显示月亮图标（需求 1.3）
- 搜索框 border-radius 大于 24px（需求 2.1）
- 时间元素 font-weight 为加粗（需求 5.1）
- 语言切换按钮存在于右上角（需求 6.1）
- 系统支持中文和英文（需求 6.3）

**模态框测试：**
- 标签选择显示为多选框（需求 7.1）
- "固定在首页"显示为独立勾选框（需求 7.2）
- 表单元素左对齐（需求 7.3）
- 标签多选框和固定首页勾选框之间有适当间距（需求 7.5）

**添加按钮测试：**
- 添加按钮具有 chip 样式（需求 4.1）
- 添加按钮可点击并打开模态框（需求 4.3）
- 添加按钮有与其他 chip 一致的悬停效果（需求 4.4）

**拖放视觉反馈测试：**
- 拖动时添加视觉反馈类（需求 3.5）

**右键菜单测试：**
- 右键点击 Chip 显示菜单（需求 10.1）
- 菜单包含编辑和删除选项（需求 10.2）

**时间和日期测试：**
- 中文模式日期格式为"YYYY年MM月DD日"（需求 12.1）
- 中文模式禁用日期切换（需求 12.2）
- 英文模式支持日期切换（需求 12.3）
- 12 小时制显示 AM/PM（需求 13.2）

**设置菜单测试：**
- 设置按钮存在于右上角（需求 14.1）
- 设置菜单包含主题和语言选项（需求 14.3）

**添加按钮测试：**
- 独立添加按钮已移除（需求 15.1）
- 内联添加按钮存在（需求 15.2）
- 内联添加按钮可点击（需求 15.3）

**模态框样式测试：**
- 模态框字体大小更小（需求 16.1）
- 标签选择和固定首页选项左对齐（需求 16.2）

### 属性测试

属性测试用于验证跨所有输入的通用属性：

**配置：**
- 使用 JavaScript 原生测试框架（如 Jest 或 Vitest）
- 每个属性测试至少运行 100 次迭代
- 使用随机生成的测试数据

**属性测试列表：**

1. **属性 1：主题模式下样式一致性**
   - 生成：随机主题切换序列
   - 验证：样式值在主题切换后保持一致
   - 标签：**Feature: start-page-enhancements, Property 1: 主题模式下样式一致性**

2. **属性 2：拖放位置变更**
   - 生成：随机 chip 列表和拖放操作
   - 验证：拖放后位置正确改变
   - 标签：**Feature: start-page-enhancements, Property 2: 拖放位置变更**

3. **属性 3：拖放持久化**
   - 生成：随机拖放操作序列
   - 验证：保存和重新加载后顺序一致
   - 标签：**Feature: start-page-enhancements, Property 3: 拖放持久化**

4. **属性 4：独立排序维护**
   - 生成：随机标签和网站拖放操作
   - 验证：一种类型的拖放不影响另一种类型的排序
   - 标签：**Feature: start-page-enhancements, Property 4: 独立排序维护**

5. **属性 5：添加按钮位置**
   - 生成：随机数量的网站和标签
   - 验证：添加按钮始终在最后
   - 标签：**Feature: start-page-enhancements, Property 5: 添加按钮位置**

6. **属性 6：语言切换行为**
   - 生成：随机语言切换序列
   - 验证：所有文本和日期格式正确更新
   - 标签：**Feature: start-page-enhancements, Property 6: 语言切换行为**

7. **属性 7：语言偏好持久化**
   - 生成：随机语言设置
   - 验证：保存和重新加载后语言一致
   - 标签：**Feature: start-page-enhancements, Property 7: 语言偏好持久化**

8. **属性 8：表单字段标签**
   - 生成：遍历所有输入字段
   - 验证：每个字段都有对应标签
   - 标签：**Feature: start-page-enhancements, Property 8: 表单字段标签**

9. **属性 9：搜索引擎菜单自动关闭**
   - 生成：随机搜索引擎选择
   - 验证：选择后菜单关闭且引擎已切换
   - 标签：**Feature: start-page-enhancements, Property 9: 搜索引擎菜单自动关闭**

10. **属性 10：按钮圆角一致性**
    - 生成：遍历所有按钮元素
    - 验证：所有按钮的 border-radius 一致且为最大值
    - 标签：**Feature: start-page-enhancements, Property 10: 按钮圆角一致性**

11. **属性 11：右键菜单编辑功能**
    - 生成：随机 Chip 和编辑操作
    - 验证：编辑后模态框打开且数据正确填充
    - 标签：**Feature: start-page-enhancements, Property 11: 右键菜单编辑功能**

12. **属性 12：右键菜单删除功能**
    - 生成：随机 Chip 和删除操作
    - 验证：删除后数据从存储中移除
    - 标签：**Feature: start-page-enhancements, Property 12: 右键菜单删除功能**

13. **属性 13：菜单自动关闭**
    - 生成：随机菜单打开和外部点击
    - 验证：点击外部后菜单关闭
    - 标签：**Feature: start-page-enhancements, Property 13: 菜单自动关闭**

14. **属性 14：拖放实时排序**
    - 生成：随机拖放操作序列
    - 验证：拖动时实时更新位置，释放时保存
    - 标签：**Feature: start-page-enhancements, Property 14: 拖放实时排序**

15. **属性 15：语言相关日期格式**
    - 生成：随机语言切换和日期点击
    - 验证：中文固定格式，英文可切换
    - 标签：**Feature: start-page-enhancements, Property 15: 语言相关日期格式**

16. **属性 16：时间格式切换和持久化**
    - 生成：随机时间格式切换
    - 验证：切换生效且保存，重新加载后恢复
    - 标签：**Feature: start-page-enhancements, Property 16: 时间格式切换和持久化**

17. **属性 17：设置菜单功能**
    - 生成：随机设置选项点击
    - 验证：设置立即生效
    - 标签：**Feature: start-page-enhancements, Property 17: 设置菜单功能**

18. **属性 18：模态框响应式布局**
    - 生成：不同屏幕尺寸
    - 验证：布局保持良好
    - 标签：**Feature: start-page-enhancements, Property 18: 模态框响应式布局**

### 集成测试

- 完整的拖放流程：拖动 → 放置 → 保存 → 重新加载 → 验证
- 完整的语言切换流程：切换语言 → 验证所有文本 → 保存 → 重新加载 → 验证
- 完整的主题切换流程：切换主题 → 验证样式 → 保存 → 重新加载 → 验证

### 手动测试

以下方面需要手动测试：
- 拖放动画的平滑度和视觉反馈
- 主题切换的过渡动画效果（需求 1.4）
- 整体 UI 的美观性和一致性
- 不同浏览器的兼容性
- 触摸设备上的拖放体验

