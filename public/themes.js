// ===== Theme Customization Module =====

const themeState = {
  currentTheme: typeof localStorage !== 'undefined' ? localStorage.getItem('currentTheme') || 'handdrawn' : 'handdrawn', // handdrawn, minimal, modern, glassmorphism
  customSettings: {
    fontChinese: '优设好身体',
    fontEnglish: 'Patrick Hand',
    bgColor: '#f9f9f9',
    borderColor: '#444444',
    textColor: '#141414',
    textActiveColor: '#ffffff',
    buttonBg: '#ffffff',
    modalBg: '#ffffff',
    inputBg: '#ffffff',
    hoverBg: '#f0f0f0',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    darkMode: {
      bgColor: '#1e1e1e',
      borderColor: '#ecf0f1',
      textColor: '#f4f4f5',
      textActiveColor: '#1e1e1e',
      buttonBg: '#2c2c2c',
      modalBg: '#2c2c2c',
      inputBg: '#1e1e1e',
      hoverBg: '#383838',
      shadowColor: 'rgba(0, 0, 0, 0.1)'
    }
  }
};

const APPEARANCE_SNAPSHOT_KEY = 'last_applied_appearance';

function readAppearanceSnapshot() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(APPEARANCE_SNAPSHOT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_err) {
    return null;
  }
}

function mergeThemeSettings(baseSettings, incomingSettings) {
  if (!incomingSettings || typeof incomingSettings !== 'object') {
    return JSON.parse(JSON.stringify(baseSettings));
  }

  return {
    ...JSON.parse(JSON.stringify(baseSettings)),
    ...incomingSettings,
    darkMode: {
      ...(baseSettings.darkMode || {}),
      ...(incomingSettings.darkMode || {})
    }
  };
}

const CYBER_PRESET = {
  bgColor: '#f6f6f6',
  borderColor: '#2a2a2a',
  textColor: '#141414',
  textActiveColor: '#ffffff',
  buttonBg: '#ffffff',
  modalBg: '#ffffff',
  inputBg: '#ffffff',
  hoverBg: '#eeeeee',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  darkMode: {
    bgColor: '#1a1c20',
    borderColor: '#4b5059',
    textColor: '#f4f4f5',
    textActiveColor: '#141416',
    buttonBg: '#202328',
    modalBg: '#202328',
    inputBg: '#262a30',
    hoverBg: '#2f343c',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  }
};

const DEFAULT_CUSTOM_SETTINGS = JSON.parse(JSON.stringify(themeState.customSettings));
const bootstrapAppearance = readAppearanceSnapshot();

function normalizeThemeSettings(settings) {
  const merged = mergeThemeSettings(DEFAULT_CUSTOM_SETTINGS, settings || {});
  return {
    fontChinese: merged.fontChinese,
    fontEnglish: merged.fontEnglish,
    bgColor: merged.bgColor,
    borderColor: merged.borderColor,
    textColor: merged.textColor,
    textActiveColor: merged.textActiveColor,
    buttonBg: merged.buttonBg,
    modalBg: merged.modalBg,
    inputBg: merged.inputBg,
    hoverBg: merged.hoverBg,
    shadowColor: merged.shadowColor,
    darkMode: {
      bgColor: merged.darkMode?.bgColor,
      borderColor: merged.darkMode?.borderColor,
      textColor: merged.darkMode?.textColor,
      textActiveColor: merged.darkMode?.textActiveColor,
      buttonBg: merged.darkMode?.buttonBg,
      modalBg: merged.darkMode?.modalBg,
      inputBg: merged.darkMode?.inputBg,
      hoverBg: merged.darkMode?.hoverBg,
      shadowColor: merged.darkMode?.shadowColor
    }
  };
}

if (bootstrapAppearance?.currentTheme) {
  themeState.currentTheme = bootstrapAppearance.currentTheme;
}

if (bootstrapAppearance?.customSettings) {
  themeState.customSettings = normalizeThemeSettings(bootstrapAppearance.customSettings);
}

// Available fonts
const AVAILABLE_FONTS = {
  chinese: [
    { name: '优设好身体', value: '优设好身体', package: 'yshst' },
    { name: '字魂扁桃体', value: '字魂扁桃体', package: 'zhbtt' },
    { name: '优设标题黑', value: '优设标题黑', package: 'ysbth' }
  ],
  english: [
    { name: 'Patrick Hand', value: 'Patrick Hand', google: true },
    { name: 'Quicksand', value: 'Quicksand', google: true },
    { name: 'Inter', value: 'Inter', google: true },
    { name: 'Newsreader', value: 'Newsreader', google: true },
    { name: 'Poppins', value: 'Poppins', google: true },
    { name: 'Nunito', value: 'Nunito', google: true },
    { name: 'Anonymous Pro', value: 'Anonymous Pro', google: true }
  ]
};

const FONT_STYLESHEET_MAP = {
  '优设好身体': 'https://chinese-fonts-cdn.deno.dev/packages/yshst/dist/result.css',
  '字魂扁桃体': 'https://chinese-fonts-cdn.deno.dev/packages/zhbtt/dist/result.css',
  '优设标题黑': 'https://chinese-fonts-cdn.deno.dev/packages/ysbth/dist/result.css'
};

function ensureFontStylesheet(fontName) {
  const href = FONT_STYLESHEET_MAP[String(fontName || '').trim()];
  if (!href || typeof document === 'undefined') return;

  const existing = document.querySelector(`link[data-font-href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.fontHref = href;
  document.head.appendChild(link);
}

function ensureThemeFontAssets(fontSettings = {}) {
  const fontChinese = fontSettings.fontChinese || themeState.customSettings.fontChinese;
  const fontEnglish = fontSettings.fontEnglish || themeState.customSettings.fontEnglish;

  ensureFontStylesheet(fontChinese);

  if (document.fonts?.load) {
    const jobs = [];
    if (fontEnglish) jobs.push(document.fonts.load(`16px "${fontEnglish}"`));
    if (fontChinese) jobs.push(document.fonts.load(`16px "${fontChinese}"`));
    return Promise.allSettled(jobs);
  }

  return Promise.resolve();
}

function hexToRgba(hex, alpha) {
  const h = String(hex || '').trim();
  if (!h.startsWith('#')) return String(hex || '');
  const v = h.slice(1);
  const full = v.length === 3
    ? v.split('').map(ch => ch + ch).join('')
    : v.padEnd(6, '0').slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const a = typeof alpha === 'number' ? alpha : 0.2;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function toHexColor(color) {
  const v = String(color || '').trim();
  if (!v) return '#000000';
  if (v.startsWith('#')) {
    const hex = v.slice(0, 7);
    if (hex.length === 4) {
      const s = hex.slice(1);
      return `#${s.split('').map(ch => ch + ch).join('')}`;
    }
    if (hex.length === 7) return hex;
    return '#000000';
  }

  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) {
    const r = Math.max(0, Math.min(255, parseInt(m[1], 10) || 0));
    const g = Math.max(0, Math.min(255, parseInt(m[2], 10) || 0));
    const b = Math.max(0, Math.min(255, parseInt(m[3], 10) || 0));
    return `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`;
  }
  return '#000000';
}

function applyStyleTheme(style) {
  const v = String(style || 'handdrawn');
  document.documentElement.dataset.style = v;
  document.body.dataset.style = v;
}

// Open theme customization modal
function openThemeCustomization() {
  console.log('openThemeCustomization called');
  console.log('authState:', window.authState);
  console.log('membershipState:', window.membershipState);
  document.getElementById('settingsMenu')?.classList.add('hidden');

  /* Guest users can preview customization; login is required only when saving.
  if (!window.authState || !window.authState.isLoggedIn) {
    console.log('Not logged in, showing login modal');
    window.showNotification?.(
      (typeof i18n !== 'undefined' && i18n.currentLocale === 'en')
        ? 'Please login to customize theme'
        : '请先登录后再设置主题',
      'info'
    );
    if (window.openGoogleSignInModal) {
      window.openGoogleSignInModal();
    } else {
      document.getElementById('googleSignInModal')?.classList.remove('hidden');
    }
    return;
  }

  */
  // Then check membership tier
  const effectiveTier = window.membershipState?.tier ?? window.authState?.profile?.membership_tier ?? 1;
  if (effectiveTier < 1) {
    console.log('Tier insufficient, showing upgrade modal');
    window.showNotification?.(
      (typeof i18n !== 'undefined' && i18n.currentLocale === 'en')
        ? 'Theme customization is not available for this account'
        : '当前账号暂不可使用主题设置',
      'info'
    );
    const settingsMenu = document.getElementById('settingsMenu');
    if (settingsMenu) settingsMenu.classList.add('hidden');

    setTimeout(() => {
      if (window.showUpgradeModal) {
        window.showUpgradeModal('theme');
      }
    }, 300);
    return;
  }

  console.log('Opening theme customization modal');
  try {
    createThemeModal();
    // Store original theme for restore on cancel
    originalThemeOnOpen = themeState.currentTheme;
    const modal = document.getElementById('themeCustomizationModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
    renderThemePreview();
  } catch (error) {
    console.error('Failed to open theme customization modal:', error);
    window.showNotification?.(
      (typeof i18n !== 'undefined' && i18n.currentLocale === 'en')
        ? 'Theme panel failed to open'
        : '主题设置面板打开失败',
      'error'
    );
  }
}

// Current theme tab
let currentThemeTab = 'font';

// Create theme customization modal
function createThemeModal() {
  const existing = document.getElementById('themeCustomizationModal');
  if (existing) {
    existing.remove();
  }

  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  const modalHTML = `
    <div id="themeCustomizationModal" class="modal-overlay hidden" onclick="handleThemeModalOverlayClick(event)">
      <div class="modal" style="max-width: 700px; max-height: 85vh; overflow-y: auto;" onclick="event.stopPropagation()">
        <h3>${isZh ? '主题定制' : 'Theme Customization'}</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
          <!-- Left: Settings with Tabs -->
          <div>
            <!-- Tab Buttons -->
            <div style="display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap;">
              <button class="theme-tab-btn" id="tabStyle" onclick="switchThemeTab('style')">
                ${isZh ? '风格' : 'Style'}
              </button>
              <button class="theme-tab-btn active" id="tabFont" onclick="switchThemeTab('font')">
                ${isZh ? '字体' : 'Font'}
              </button>
              <button class="theme-tab-btn" id="tabLight" onclick="switchThemeTab('light')">
                ${isZh ? '浅色模式' : 'Light'}
              </button>
              <button class="theme-tab-btn" id="tabDark" onclick="switchThemeTab('dark')">
                ${isZh ? '深色模式' : 'Dark'}
              </button>
            </div>

            <!-- Style Tab -->
            <div id="themePanelStyle" class="theme-panel hidden">
              <div class="theme-color-row">
                <label>${isZh ? '当前风格' : 'Current Style'}</label>
                <select id="themeStyleSelect" class="modal-input" onchange="updateThemePreview()">
                  <option value="handdrawn" ${themeState.currentTheme === 'handdrawn' ? 'selected' : ''}>
                    ${isZh ? '手绘（默认）' : 'Hand-drawn (Default)'}
                  </option>
                  <option value="comic" ${themeState.currentTheme === 'comic' ? 'selected' : ''}>
                    ${isZh ? '漫画' : 'Comic'}
                  </option>
                  <option value="cyber" ${themeState.currentTheme === 'cyber' ? 'selected' : ''}>
                    ${isZh ? '赛博（黑白）' : 'Cyber (Mono)'}
                  </option>
                </select>
              </div>
              <div style="font-size: 12px; opacity: 0.7; line-height: 1.4;">
                ${isZh ? '更多付费风格后续会陆续上线。' : 'More premium styles will be available later.'}
              </div>
            </div>

            <!-- Font Tab -->
            <div id="themePanelFont" class="theme-panel">
              <div class="theme-color-row">
                <label>${isZh ? '英文字体' : 'English Font'}</label>
                <select id="fontEnglishSelect" class="modal-input" onchange="handleThemeFontChange()">
                  ${AVAILABLE_FONTS.english.map(f => `
                    <option value="${f.value}" ${themeState.customSettings.fontEnglish === f.value ? 'selected' : ''}>
                      ${f.name}
                    </option>
                  `).join('')}
                </select>
              </div>
              <div class="theme-color-row">
                <label>${isZh ? '中文字体' : 'Chinese Font'}</label>
                <select id="fontChineseSelect" class="modal-input" onchange="handleThemeFontChange()">
                  ${AVAILABLE_FONTS.chinese.map(f => `
                    <option value="${f.value}" ${themeState.customSettings.fontChinese === f.value ? 'selected' : ''}>
                      ${f.name}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Light Mode Tab -->
            <div id="themePanelLight" class="theme-panel hidden">
              <div class="theme-color-grid">
                <div class="theme-color-item">
                  <label>${isZh ? '背景' : 'Background'}</label>
                  <input type="color" id="bgColorInput" value="${themeState.customSettings.bgColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '按钮' : 'Button'}</label>
                  <input type="color" id="buttonBgInput" value="${themeState.customSettings.buttonBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '输入框' : 'Input'}</label>
                  <input type="color" id="inputBgInput" value="${themeState.customSettings.inputBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '边框' : 'Border'}</label>
                  <input type="color" id="borderColorInput" value="${themeState.customSettings.borderColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '文字' : 'Text'}</label>
                  <input type="color" id="textColorInput" value="${themeState.customSettings.textColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '文字(按下)' : 'Text Active'}</label>
                  <input type="color" id="textActiveColorInput" value="${themeState.customSettings.textActiveColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '弹窗' : 'Modal'}</label>
                  <input type="color" id="modalBgInput" value="${themeState.customSettings.modalBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '悬浮' : 'Hover'}</label>
                  <input type="color" id="hoverBgInput" value="${themeState.customSettings.hoverBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '强调' : 'Accent'}</label>
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '阴影' : 'Shadow'}</label>
                  <input type="color" id="shadowColorInput" value="${toHexColor(themeState.customSettings.shadowColor)}" onchange="updateThemePreview()">
                </div>
              </div>
            </div>

            <!-- Dark Mode Tab -->
            <div id="themePanelDark" class="theme-panel hidden">
              <div class="theme-color-grid">
                <div class="theme-color-item">
                  <label>${isZh ? '背景' : 'Background'}</label>
                  <input type="color" id="bgColorDarkInput" value="${themeState.customSettings.darkMode.bgColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '按钮' : 'Button'}</label>
                  <input type="color" id="buttonBgDarkInput" value="${themeState.customSettings.darkMode.buttonBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '输入框' : 'Input'}</label>
                  <input type="color" id="inputBgDarkInput" value="${themeState.customSettings.darkMode.inputBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '边框' : 'Border'}</label>
                  <input type="color" id="borderColorDarkInput" value="${themeState.customSettings.darkMode.borderColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '文字' : 'Text'}</label>
                  <input type="color" id="textColorDarkInput" value="${themeState.customSettings.darkMode.textColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '文字(按下)' : 'Text Active'}</label>
                  <input type="color" id="textActiveColorDarkInput" value="${themeState.customSettings.darkMode.textActiveColor}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '弹窗' : 'Modal'}</label>
                  <input type="color" id="modalBgDarkInput" value="${themeState.customSettings.darkMode.modalBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '悬浮' : 'Hover'}</label>
                  <input type="color" id="hoverBgDarkInput" value="${themeState.customSettings.darkMode.hoverBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '强调' : 'Accent'}</label>
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '阴影' : 'Shadow'}</label>
                  <input type="color" id="shadowColorDarkInput" value="${toHexColor(themeState.customSettings.darkMode.shadowColor)}" onchange="updateThemePreview()">
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Preview -->
          <div>
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
              <button class="theme-tab-btn active" onclick="setPreviewMode('light')" id="previewLightBtn">
                ${isZh ? '浅色预览' : 'Light'}
              </button>
              <button class="theme-tab-btn" onclick="setPreviewMode('dark')" id="previewDarkBtn">
                ${isZh ? '深色预览' : 'Dark'}
              </button>
            </div>
            <div id="themePreview" style="border: 2px solid var(--border-color); border-radius: 8px; padding: 15px; min-height: 280px;">
            </div>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 20px;">
          <button class="cancel-btn" onclick="closeThemeModal()">${isZh ? '取消' : 'Cancel'}</button>
          <button class="cancel-btn" onclick="resetThemeCustomization()">${isZh ? '重置' : 'Reset'}</button>
          <button class="primary-btn" onclick="saveThemeCustomization()">${isZh ? '保存' : 'Save'}</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.querySelectorAll('#themeCustomizationModal .theme-color-item').forEach((item) => {
    if (!item.querySelector('input')) {
      item.remove();
    }
  });
}

function getThemeDisplayName(style) {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';
  const names = {
    handdrawn: isZh ? '手绘' : 'Hand-drawn',
    comic: isZh ? '漫画' : 'Comic',
    cyber: isZh ? 'Cyber' : 'Cyber'
  };
  return names[String(style || 'handdrawn')] || String(style || 'handdrawn');
}

function updateThemeStyleStatus() {
  const status = document.getElementById('themeStyleStatus');
  if (!status) return;
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const selectedStyle = document.getElementById('themeStyleSelect')?.value || themeState.currentTheme;
  const appliedStyle = themeState.currentTheme || 'handdrawn';
  status.textContent = currentLocale === 'zh'
    ? `当前生效：${getThemeDisplayName(appliedStyle)}；正在查看：${getThemeDisplayName(selectedStyle)}`
    : `Applied: ${getThemeDisplayName(appliedStyle)}; Previewing: ${getThemeDisplayName(selectedStyle)}`;
}

// Switch theme tab
function switchThemeTab(tab) {
  currentThemeTab = tab;
  // Update tab buttons
  document.getElementById('tabStyle')?.classList.toggle('active', tab === 'style');
  document.getElementById('tabFont')?.classList.toggle('active', tab === 'font');
  document.getElementById('tabLight')?.classList.toggle('active', tab === 'light');
  document.getElementById('tabDark')?.classList.toggle('active', tab === 'dark');
  // Update panels
  document.getElementById('themePanelStyle')?.classList.toggle('hidden', tab !== 'style');
  document.getElementById('themePanelFont')?.classList.toggle('hidden', tab !== 'font');
  document.getElementById('themePanelLight')?.classList.toggle('hidden', tab !== 'light');
  document.getElementById('themePanelDark')?.classList.toggle('hidden', tab !== 'dark');
  
  // Auto-switch preview mode
  if (tab === 'light') setPreviewMode('light');
  if (tab === 'dark') setPreviewMode('dark');
}

// Handle overlay click to close modal
function handleThemeModalOverlayClick(event) {
  if (event.target.id === 'themeCustomizationModal') {
    closeThemeModal();
  }
}

// Preview mode state
let previewMode = 'light';

let lastStyleValue = themeState.currentTheme;

function setPreviewMode(mode) {
  previewMode = mode;
  document.getElementById('previewLightBtn')?.classList.toggle('active', mode === 'light');
  document.getElementById('previewDarkBtn')?.classList.toggle('active', mode === 'dark');
  renderThemePreview();
}

function handleThemeFontChange() {
  renderThemePreview();
  const fontEnglish = document.getElementById('fontEnglishSelect')?.value;
  const fontChinese = document.getElementById('fontChineseSelect')?.value;
  ensureThemeFontAssets({ fontChinese, fontEnglish }).finally(() => {
    requestAnimationFrame(() => renderThemePreview());
  });
}

// Render theme preview
function renderThemePreview() {
  const preview = document.getElementById('themePreview');
  if (!preview) return;
  const previewStyle = document.getElementById('themeStyleSelect')?.value || themeState.currentTheme || 'handdrawn';

  const fontChinese = document.getElementById('fontChineseSelect')?.value || themeState.customSettings.fontChinese;
  const fontEnglish = document.getElementById('fontEnglishSelect')?.value || themeState.customSettings.fontEnglish;
  const bgColor = previewMode === 'light'
    ? (document.getElementById('bgColorInput')?.value || themeState.customSettings.bgColor)
    : (document.getElementById('bgColorDarkInput')?.value || themeState.customSettings.darkMode.bgColor);
  const buttonBg = previewMode === 'light'
    ? (document.getElementById('buttonBgInput')?.value || themeState.customSettings.buttonBg)
    : (document.getElementById('buttonBgDarkInput')?.value || themeState.customSettings.darkMode.buttonBg);
  const inputBg = previewMode === 'light'
    ? (document.getElementById('inputBgInput')?.value || themeState.customSettings.inputBg)
    : (document.getElementById('inputBgDarkInput')?.value || themeState.customSettings.darkMode.inputBg);
  const borderColor = previewMode === 'light'
    ? (document.getElementById('borderColorInput')?.value || themeState.customSettings.borderColor)
    : (document.getElementById('borderColorDarkInput')?.value || themeState.customSettings.darkMode.borderColor);
  const textColor = previewMode === 'light'
    ? (document.getElementById('textColorInput')?.value || themeState.customSettings.textColor)
    : (document.getElementById('textColorDarkInput')?.value || themeState.customSettings.darkMode.textColor);
  const modalBg = previewMode === 'light'
    ? (document.getElementById('modalBgInput')?.value || themeState.customSettings.modalBg)
    : (document.getElementById('modalBgDarkInput')?.value || themeState.customSettings.darkMode.modalBg);
  const hoverBg = previewMode === 'light'
    ? (document.getElementById('hoverBgInput')?.value || themeState.customSettings.hoverBg)
    : (document.getElementById('hoverBgDarkInput')?.value || themeState.customSettings.darkMode.hoverBg);
  const shadowBase = previewMode === 'light'
    ? (document.getElementById('shadowColorInput')?.value || themeState.customSettings.shadowColor)
    : (document.getElementById('shadowColorDarkInput')?.value || themeState.customSettings.darkMode.shadowColor);
  const shadowColor = String(shadowBase).trim().startsWith('#')
    ? hexToRgba(shadowBase, previewMode === 'light' ? 0.2 : 0.5)
    : shadowBase;

  preview.style.setProperty('--bg-color', bgColor);
  preview.style.setProperty('--button-bg', buttonBg);
  preview.style.setProperty('--modal-bg', modalBg);
  preview.style.setProperty('--input-bg', inputBg);
  preview.style.setProperty('--border-color', borderColor);
  preview.style.setProperty('--text-color', textColor);
  preview.style.setProperty('--hover-bg', hoverBg);
  preview.style.setProperty('--text-color', textColor);
  const textActiveColor = previewMode === 'light'
    ? (document.getElementById('textActiveColorInput')?.value || themeState.customSettings.textActiveColor)
    : (document.getElementById('textActiveColorDarkInput')?.value || themeState.customSettings.darkMode.textActiveColor);
  preview.style.setProperty('--text-active-color', textActiveColor);
  preview.style.setProperty('--shadow-color', shadowColor);
  preview.style.background = bgColor;
  preview.style.color = textColor;
  preview.style.fontFamily = `"${fontEnglish || 'Patrick Hand'}", "${fontChinese || '优设好身体'}", sans-serif`;
  preview.dataset.style = previewStyle;
  preview.classList.toggle('dark', previewMode === 'dark');
  preview.classList.toggle('light', previewMode !== 'dark');

  preview.innerHTML = `
    <style>
      #themePreview,
      #themePreview * {
        animation: none !important;
        font-family: var(--preview-font-stack) !important;
      }

      #themePreview .container,
      #themePreview .content-area,
      #themePreview .search-box,
      #themePreview .chip,
      #themePreview .preview-btn {
        transition: none !important;
      }

      #themePreview .time,
      #themePreview .date,
      #themePreview .chip,
      #themePreview .tag,
      #themePreview .search-engine,
      #themePreview .preview-search-icon {
        color: var(--text-color) !important;
      }

      #themePreview .search-box {
        display: flex;
        align-items: center;
        background: var(--input-bg) !important;
        border-color: var(--border-color) !important;
      }

      #themePreview .search-engine {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
      }

      #themePreview .preview-search-icon {
        width: 28px;
        height: 28px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        background: transparent;
      }

      #themePreview .search-box input {
        flex: 1;
        min-width: 0;
        opacity: 1 !important;
        color: var(--text-color) !important;
        border: none !important;
        outline: none !important;
        background: var(--input-bg) !important;
        box-shadow: none !important;
      }

      #themePreview .search-box input::placeholder {
        color: var(--text-color) !important;
        opacity: 0.68 !important;
      }

      #themePreview .preview-btn {
        font-family: inherit;
        border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        border: 2px solid var(--border-color);
        font-weight: 700;
        font-size: 14px;
        background: var(--button-bg);
        color: var(--text-color);
        box-shadow: 3px 3px 0 var(--shadow-color);
        padding: 8px 16px;
      }

      #themePreview .preview-btn:hover {
        background: var(--hover-bg);
      }

      #themePreview .preview-btn.primary {
        background: var(--text-color);
        color: var(--bg-color);
        border-color: var(--text-color);
      }

      #themePreview .preview-btn.primary:hover {
        background: var(--hover-bg);
        color: var(--text-color);
        border-color: var(--border-color);
      }
    </style>
    <div class="preview-stage" style="display:flex; justify-content:center; background: var(--bg-color); border-radius: 10px; padding: 10px;">
      <div class="container" style="max-width: 460px; width: 100%; padding: 12px;">
        <div class="time" style="font-size: 54px;">12:34</div>
        <div class="date" style="margin-bottom: 22px;">2026/01/25 Sat</div>
        <div class="search-box" style="margin: 0 auto 26px; max-width: 420px;">
          <div class="search-engine" style="border-right: 2px solid var(--border-color); margin-right: 12px; padding-right: 12px;">
            <div class="preview-search-icon">G</div>
          </div>
          <input type="text" placeholder="${(typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'Search...' : '想要搜点什么吗？'}" readonly tabindex="-1" style="opacity:1; border:none; outline:none; background:transparent;" />
        </div>

        <div class="content-area" style="max-width: 520px;">
          <div class="chip">Google</div>
          <div class="chip tag">Work</div>
        </div>

        <div style="display:flex; justify-content:center; gap: 10px; margin-top: 18px;">
          <button type="button" class="preview-btn" onclick="return false" onmousedown="return false">${(typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'Cancel' : '取消'}</button>
          <button type="button" class="preview-btn primary" onclick="return false" onmousedown="return false">${(typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'Confirm' : '确认'}</button>
        </div>
      </div>
    </div>
  `;
}

function renderThemePreviewUnified() {
  const preview = document.getElementById('themePreview');
  if (!preview) return;

  const previewStyle = document.getElementById('themeStyleSelect')?.value || themeState.currentTheme || 'handdrawn';
  const fontChinese = document.getElementById('fontChineseSelect')?.value || themeState.customSettings.fontChinese;
  const fontEnglish = document.getElementById('fontEnglishSelect')?.value || themeState.customSettings.fontEnglish;
  const bgColor = previewMode === 'light'
    ? (document.getElementById('bgColorInput')?.value || themeState.customSettings.bgColor)
    : (document.getElementById('bgColorDarkInput')?.value || themeState.customSettings.darkMode.bgColor);
  const buttonBg = previewMode === 'light'
    ? (document.getElementById('buttonBgInput')?.value || themeState.customSettings.buttonBg)
    : (document.getElementById('buttonBgDarkInput')?.value || themeState.customSettings.darkMode.buttonBg);
  const inputBg = previewMode === 'light'
    ? (document.getElementById('inputBgInput')?.value || themeState.customSettings.inputBg)
    : (document.getElementById('inputBgDarkInput')?.value || themeState.customSettings.darkMode.inputBg);
  const borderColor = previewMode === 'light'
    ? (document.getElementById('borderColorInput')?.value || themeState.customSettings.borderColor)
    : (document.getElementById('borderColorDarkInput')?.value || themeState.customSettings.darkMode.borderColor);
  const textColor = previewMode === 'light'
    ? (document.getElementById('textColorInput')?.value || themeState.customSettings.textColor)
    : (document.getElementById('textColorDarkInput')?.value || themeState.customSettings.darkMode.textColor);
  const modalBg = previewMode === 'light'
    ? (document.getElementById('modalBgInput')?.value || themeState.customSettings.modalBg)
    : (document.getElementById('modalBgDarkInput')?.value || themeState.customSettings.darkMode.modalBg);
  const hoverBg = previewMode === 'light'
    ? (document.getElementById('hoverBgInput')?.value || themeState.customSettings.hoverBg)
    : (document.getElementById('hoverBgDarkInput')?.value || themeState.customSettings.darkMode.hoverBg);
  const textActiveColor = previewMode === 'light'
    ? (document.getElementById('textActiveColorInput')?.value || themeState.customSettings.textActiveColor)
    : (document.getElementById('textActiveColorDarkInput')?.value || themeState.customSettings.darkMode.textActiveColor);
  const shadowBase = previewMode === 'light'
    ? (document.getElementById('shadowColorInput')?.value || themeState.customSettings.shadowColor)
    : (document.getElementById('shadowColorDarkInput')?.value || themeState.customSettings.darkMode.shadowColor);
  const shadowColor = String(shadowBase).trim().startsWith('#')
    ? hexToRgba(shadowBase, previewMode === 'light' ? 0.2 : 0.5)
    : shadowBase;

  preview.style.setProperty('--bg-color', bgColor);
  preview.style.setProperty('--button-bg', buttonBg);
  preview.style.setProperty('--modal-bg', modalBg);
  preview.style.setProperty('--input-bg', inputBg);
  preview.style.setProperty('--border-color', borderColor);
  preview.style.setProperty('--text-color', textColor);
  preview.style.setProperty('--text-active-color', textActiveColor);
  preview.style.setProperty('--hover-bg', hoverBg);
  preview.style.setProperty('--shadow-color', shadowColor);
  preview.style.setProperty('--preview-font-stack', `"${fontEnglish || 'Patrick Hand'}", "${fontChinese || '优设好身体'}", sans-serif`);
  preview.style.background = modalBg;
  preview.style.color = textColor;
  preview.style.fontFamily = `"${fontEnglish || 'Patrick Hand'}", "${fontChinese || '优设好身体'}", sans-serif`;
  preview.dataset.style = previewStyle;
  preview.classList.toggle('dark', previewMode === 'dark');
  preview.classList.toggle('light', previewMode !== 'dark');

  const isEn = typeof i18n !== 'undefined' && i18n.currentLocale === 'en';
  const previewText = {
    search: isEn ? 'Search...' : '想要搜点什么吗？',
    site: isEn ? 'Example Site' : '示例网站',
    tag: isEn ? 'Work' : '工作',
    active: isEn ? 'Active' : '已选择',
    cancel: isEn ? 'Cancel' : '取消',
    confirm: isEn ? 'Confirm' : '确认',
    font: isEn ? 'Aa Sample Font 字体预览' : '字体预览 Aa Sample'
  };

  previewText.search = isEn ? 'Search...' : '搜索...';
  previewText.site = isEn ? 'Aa Example' : 'Aa 示例网站';
  previewText.tag = isEn ? 'Bb Work' : 'Bb 工作';
  previewText.cancel = isEn ? 'Cancel' : '取消';
  previewText.confirm = isEn ? 'Confirm' : '确认';

  preview.innerHTML = `
    <style>
      #themePreview,
      #themePreview * {
        animation: none !important;
        font-family: var(--preview-font-stack) !important;
      }

      #themePreview {
        min-height: 300px;
        overflow: hidden;
      }

      #themePreview .preview-stage {
        display: flex;
        justify-content: center;
        align-items: stretch;
        min-height: 262px;
        background: var(--bg-color);
        border-radius: 10px;
        padding: 14px;
      }

      #themePreview .preview-shell {
        width: 100%;
        max-width: 460px;
        min-height: 234px;
      }

      #themePreview .container,
      #themePreview .content-area,
      #themePreview .search-box,
      #themePreview .chip,
      #themePreview .preview-btn {
        transition: none !important;
      }

      #themePreview .container {
        width: 100% !important;
        max-width: none !important;
        padding: 14px !important;
      }

      #themePreview .content-area {
        width: 100% !important;
        max-width: none !important;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      #themePreview .time,
      #themePreview .date,
      #themePreview .chip,
      #themePreview .tag,
      #themePreview .search-engine,
      #themePreview .preview-search-icon {
        color: var(--text-color) !important;
      }

      #themePreview .time {
        font-size: 54px !important;
        margin-bottom: 2px;
      }

      #themePreview .date {
        margin-bottom: 18px !important;
      }

      #themePreview .search-box {
        display: flex;
        align-items: center;
        width: 100% !important;
        max-width: none !important;
        margin: 0 0 22px !important;
        padding: 12px 18px !important;
        background: var(--input-bg) !important;
        border-color: var(--border-color) !important;
        box-shadow: 4px 4px 0 var(--shadow-color) !important;
      }

      #themePreview .search-engine {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        border-right-color: var(--border-color) !important;
      }

      #themePreview .preview-search-icon {
        width: 28px;
        height: 28px;
        border: 2px solid var(--border-color);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        background: var(--button-bg);
        box-shadow: 2px 2px 0 var(--shadow-color);
      }

      #themePreview .search-box input {
        flex: 1;
        min-width: 0;
        opacity: 1 !important;
        color: var(--text-color) !important;
        border: none !important;
        outline: none !important;
        background: var(--input-bg) !important;
        box-shadow: none !important;
      }

      #themePreview .search-box input::placeholder {
        color: var(--text-color) !important;
        opacity: 0.68 !important;
      }

      #themePreview .preview-btn {
        font-family: inherit;
        border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        border: 2px solid var(--border-color);
        font-weight: 700;
        font-size: 14px;
        background: var(--button-bg);
        color: var(--text-color);
        box-shadow: 4px 4px 0 var(--shadow-color);
        padding: 8px 16px;
      }

      #themePreview .preview-btn:hover {
        background: var(--hover-bg);
      }

      #themePreview .preview-btn.primary {
        background: var(--text-color);
        color: var(--text-active-color) !important;
        border-color: var(--text-color);
      }

      #themePreview .preview-btn.primary:hover {
        background: var(--hover-bg);
        color: var(--text-color);
        border-color: var(--border-color);
      }

      #themePreview .chip {
        background: var(--button-bg) !important;
        border-color: var(--border-color) !important;
        box-shadow: 2px 2px 0 var(--shadow-color) !important;
      }
    </style>
    <div class="preview-stage">
      <div class="preview-shell">
        <div class="container">
          <div class="time">12:34</div>
          <div class="date">2026/01/25 Sat</div>
          <div class="search-box">
            <div class="search-engine" style="border-right: 2px solid var(--border-color); margin-right: 12px; padding-right: 12px;">
              <div class="preview-search-icon">G</div>
            </div>
            <input type="text" placeholder="${previewText.search}" readonly tabindex="-1" style="opacity:1; border:none; outline:none; background:transparent;" />
          </div>

          <div class="content-area">
            <div class="chip">${previewText.site}</div>
            <div class="chip tag"># ${previewText.tag}</div>
          </div>

          <div style="display:flex; justify-content:center; gap: 10px; margin-top: 18px;">
            <button type="button" class="preview-btn" onclick="return false" onmousedown="return false">${previewText.cancel}</button>
            <button type="button" class="preview-btn primary" onclick="return false" onmousedown="return false">${previewText.confirm}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

renderThemePreview = renderThemePreviewUnified;
window.renderThemePreview = renderThemePreviewUnified;

// Update preview when settings change
function updateThemePreview() {
  const styleEl = document.getElementById('themeStyleSelect');
  const fontChineseEl = document.getElementById('fontChineseSelect');
  const fontEnglishEl = document.getElementById('fontEnglishSelect');
  const bgColorEl = document.getElementById('bgColorInput');
  const buttonBgEl = document.getElementById('buttonBgInput');
  const inputBgEl = document.getElementById('inputBgInput');
  const borderColorEl = document.getElementById('borderColorInput');
  const textColorEl = document.getElementById('textColorInput');
  const textActiveColorEl = document.getElementById('textActiveColorInput');
  const modalBgEl = document.getElementById('modalBgInput');
  const hoverBgEl = document.getElementById('hoverBgInput');
  const shadowColorEl = document.getElementById('shadowColorInput');

  const bgColorDarkEl = document.getElementById('bgColorDarkInput');
  const buttonBgDarkEl = document.getElementById('buttonBgDarkInput');
  const inputBgDarkEl = document.getElementById('inputBgDarkInput');
  const borderColorDarkEl = document.getElementById('borderColorDarkInput');
  const textColorDarkEl = document.getElementById('textColorDarkInput');
  const textActiveColorDarkEl = document.getElementById('textActiveColorDarkInput');
  const modalBgDarkEl = document.getElementById('modalBgDarkInput');
  const hoverBgDarkEl = document.getElementById('hoverBgDarkInput');
  const shadowColorDarkEl = document.getElementById('shadowColorDarkInput');

  const shadowLightBase = shadowColorEl?.value || toHexColor(themeState.customSettings.shadowColor);
  const shadowDarkBase = shadowColorDarkEl?.value || toHexColor(themeState.customSettings.darkMode?.shadowColor);

  const nextStyle = styleEl?.value || themeState.currentTheme;

  lastStyleValue = nextStyle;
  const preview = document.getElementById('themePreview');
  if (preview) {
    preview.dataset.style = nextStyle;
  }

  renderThemePreview();
}

// Save theme settings
async function saveThemeCustomization() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  const shadowLightHex = document.getElementById('shadowColorInput')?.value || toHexColor(themeState.customSettings.shadowColor);
  const shadowDarkHex = document.getElementById('shadowColorDarkInput')?.value || toHexColor(themeState.customSettings.darkMode?.shadowColor);

  const settings = {
    style: document.getElementById('themeStyleSelect')?.value || themeState.currentTheme,
    fontChinese: document.getElementById('fontChineseSelect').value,
    fontEnglish: document.getElementById('fontEnglishSelect').value,
    bgColor: document.getElementById('bgColorInput').value,
    buttonBg: document.getElementById('buttonBgInput').value,
    inputBg: document.getElementById('inputBgInput').value,
    borderColor: document.getElementById('borderColorInput').value,
    textColor: document.getElementById('textColorInput').value,
    textActiveColor: document.getElementById('textActiveColorInput').value,
    modalBg: document.getElementById('modalBgInput').value,
    hoverBg: document.getElementById('hoverBgInput').value,
    shadowColor: hexToRgba(shadowLightHex, 0.1),
    darkMode: {
      bgColor: document.getElementById('bgColorDarkInput').value,
      buttonBg: document.getElementById('buttonBgDarkInput').value,
      inputBg: document.getElementById('inputBgDarkInput').value,
      borderColor: document.getElementById('borderColorDarkInput').value,
      textColor: document.getElementById('textColorDarkInput').value,
      textActiveColor: document.getElementById('textActiveColorDarkInput').value,
      modalBg: document.getElementById('modalBgDarkInput').value,
      hoverBg: document.getElementById('hoverBgDarkInput').value,
      shadowColor: hexToRgba(shadowDarkHex, 0.1)
    }
  };

  themeState.currentTheme = settings.style;

  applyStyleTheme(themeState.currentTheme);
  try {
    if (typeof state !== 'undefined') {
      state.currentTheme = themeState.currentTheme;
    }
    localStorage.setItem('currentTheme', themeState.currentTheme);
  } catch (_err) {
  }

  // Apply to current page (respect current mode)
  applyThemeSettings(settings);
  applyCustomThemeForCurrentMode();
  requestAnimationFrame(() => {
    applyStyleTheme(themeState.currentTheme);
    applyCustomThemeForCurrentMode();
  });

  // Save to database
  try {
    if (window.initializeMembership) {
      await window.initializeMembership();
    }
    if (!window.membershipState || window.membershipState.tier < 1) {
      throw new Error('premium membership required');
    }
    if (window.saveThemeSettings) {
      await window.saveThemeSettings(settings);
    }
    originalThemeOnOpen = null;
    closeThemeModal(false);
    requestAnimationFrame(() => {
      applyStyleTheme(themeState.currentTheme);
      applyCustomThemeForCurrentMode();
    });

    if (window.showNotification) {
      window.showNotification(i18n.t('saveThemeSuccess'), 'success');
    }
  } catch (err) {
    console.error('Failed to persist theme customization:', err);
    if (window.showNotification) {
      window.showNotification(i18n.t('saveThemeFailed'), 'error');
    }
  }
}

// Apply theme settings to page
function applyThemeSettings(settings) {
  themeState.customSettings = normalizeThemeSettings(settings);
  window.themeState = themeState;
}

function applyCustomThemeForCurrentMode() {
  const isDark = document.body.classList.contains('dark');
  const s = themeState.customSettings || {};
  const modeSettings = isDark ? (s.darkMode || {}) : s;

  if (!modeSettings) return;

  const rootEl = document.documentElement;
  const bodyEl = document.body;

  if (modeSettings.bgColor) rootEl.style.setProperty('--bg-color', modeSettings.bgColor);
  if (modeSettings.buttonBg) rootEl.style.setProperty('--button-bg', modeSettings.buttonBg);
  if (modeSettings.modalBg) rootEl.style.setProperty('--modal-bg', modeSettings.modalBg);
  if (modeSettings.inputBg) rootEl.style.setProperty('--input-bg', modeSettings.inputBg);
  if (modeSettings.borderColor) rootEl.style.setProperty('--border-color', modeSettings.borderColor);
  if (modeSettings.textColor) {
    rootEl.style.setProperty('--text-color', modeSettings.textColor);
    rootEl.style.setProperty('--text-active-color', modeSettings.textActiveColor || '#ffffff');
  }
  if (modeSettings.hoverBg) rootEl.style.setProperty('--hover-bg', modeSettings.hoverBg);
  if (modeSettings.shadowColor) rootEl.style.setProperty('--shadow-color', modeSettings.shadowColor);
  if (modeSettings.textColor) rootEl.style.setProperty('--accent-color', modeSettings.textColor);

  if (modeSettings.bgColor) bodyEl.style.setProperty('--bg-color', modeSettings.bgColor);
  if (modeSettings.buttonBg) bodyEl.style.setProperty('--button-bg', modeSettings.buttonBg);
  if (modeSettings.modalBg) bodyEl.style.setProperty('--modal-bg', modeSettings.modalBg);
  if (modeSettings.inputBg) bodyEl.style.setProperty('--input-bg', modeSettings.inputBg);
  if (modeSettings.borderColor) bodyEl.style.setProperty('--border-color', modeSettings.borderColor);
  if (modeSettings.textColor) {
    bodyEl.style.setProperty('--text-color', modeSettings.textColor);
    bodyEl.style.setProperty('--text-active-color', modeSettings.textActiveColor || '#ffffff');
  }
  if (modeSettings.hoverBg) bodyEl.style.setProperty('--hover-bg', modeSettings.hoverBg);
  if (modeSettings.shadowColor) bodyEl.style.setProperty('--shadow-color', modeSettings.shadowColor);
  if (modeSettings.textColor) bodyEl.style.setProperty('--accent-color', modeSettings.textColor);

  if (s.fontEnglish || s.fontChinese) {
    document.body.style.fontFamily = `"${s.fontEnglish || 'Patrick Hand'}", "${s.fontChinese || '优设好身体'}", sans-serif`;
  }

  applyStyleTheme(themeState.currentTheme || s.style || 'handdrawn');
}

function clearCustomThemeSettings() {
  const rootEl = document.documentElement;
  rootEl.style.removeProperty('--bg-color');
  rootEl.style.removeProperty('--button-bg');
  rootEl.style.removeProperty('--border-color');
  rootEl.style.removeProperty('--text-color');
  rootEl.style.removeProperty('--text-active-color');
  rootEl.style.removeProperty('--modal-bg');
  rootEl.style.removeProperty('--input-bg');
  rootEl.style.removeProperty('--hover-bg');
  rootEl.style.removeProperty('--shadow-color');
  rootEl.style.removeProperty('--accent-color');

  document.body.style.removeProperty('--bg-color');
  document.body.style.removeProperty('--button-bg');
  document.body.style.removeProperty('--border-color');
  document.body.style.removeProperty('--text-color');
  document.body.style.removeProperty('--text-active-color');
  document.body.style.removeProperty('--modal-bg');
  document.body.style.removeProperty('--input-bg');
  document.body.style.removeProperty('--hover-bg');
  document.body.style.removeProperty('--shadow-color');
  document.body.style.removeProperty('--accent-color');
}

function clearCustomFontSettings() {
  document.body.style.removeProperty('font-family');
}

function applyFontSettings(fontSettings) {
  if (!fontSettings) return;
  const fontChinese = fontSettings.fontChinese || themeState.customSettings.fontChinese;
  const fontEnglish = fontSettings.fontEnglish || themeState.customSettings.fontEnglish;
  themeState.customSettings.fontChinese = fontChinese;
  themeState.customSettings.fontEnglish = fontEnglish;
  ensureThemeFontAssets({ fontChinese, fontEnglish });
  applyCustomThemeForCurrentMode();
}

async function resetThemeCustomization() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  themeState.currentTheme = 'handdrawn';
  themeState.customSettings = JSON.parse(JSON.stringify(DEFAULT_CUSTOM_SETTINGS));

  lastStyleValue = themeState.currentTheme;
  applyStyleTheme(themeState.currentTheme);
  try {
    if (typeof state !== 'undefined') {
      state.currentTheme = themeState.currentTheme;
    }
    localStorage.setItem('currentTheme', themeState.currentTheme);
  } catch (_err) {
  }

  applyThemeSettings(themeState.customSettings);
  applyCustomThemeForCurrentMode();

  const fontEn = document.getElementById('fontEnglishSelect');
  const fontZh = document.getElementById('fontChineseSelect');
  const styleSelect = document.getElementById('themeStyleSelect');
  if (fontEn) fontEn.value = themeState.customSettings.fontEnglish;
  if (fontZh) fontZh.value = themeState.customSettings.fontChinese;
  if (styleSelect) styleSelect.value = themeState.currentTheme;

  const bg = document.getElementById('bgColorInput');
  const card = document.getElementById('buttonBgInput');
  const input = document.getElementById('inputBgInput');
  const border = document.getElementById('borderColorInput');
  const text = document.getElementById('textColorInput');
  const textActive = document.getElementById('textActiveColorInput');
  const modal = document.getElementById('modalBgInput');
  const hover = document.getElementById('hoverBgInput');
  const shadow = document.getElementById('shadowColorInput');

  if (bg) bg.value = themeState.customSettings.bgColor;
  if (card) card.value = themeState.customSettings.buttonBg;
  if (input) input.value = themeState.customSettings.inputBg;
  if (border) border.value = themeState.customSettings.borderColor;
  if (text) text.value = themeState.customSettings.textColor;
  if (textActive) textActive.value = themeState.customSettings.textActiveColor; // Added
  if (modal) modal.value = themeState.customSettings.modalBg;
  if (hover) hover.value = themeState.customSettings.hoverBg;
  if (shadow) shadow.value = toHexColor(themeState.customSettings.shadowColor);

  const bgD = document.getElementById('bgColorDarkInput');
  const cardD = document.getElementById('buttonBgDarkInput');
  const inputD = document.getElementById('inputBgDarkInput');
  const borderD = document.getElementById('borderColorDarkInput');
  const textD = document.getElementById('textColorDarkInput');
  const textActiveD = document.getElementById('textActiveColorDarkInput'); // Added
  const modalD = document.getElementById('modalBgDarkInput');
  const hoverD = document.getElementById('hoverBgDarkInput');
  const shadowD = document.getElementById('shadowColorDarkInput');

  if (bgD) bgD.value = themeState.customSettings.darkMode.bgColor;
  if (cardD) cardD.value = themeState.customSettings.darkMode.buttonBg;
  if (inputD) inputD.value = themeState.customSettings.darkMode.inputBg;
  if (borderD) borderD.value = themeState.customSettings.darkMode.borderColor;
  if (textD) textD.value = themeState.customSettings.darkMode.textColor;
  if (textActiveD) textActiveD.value = themeState.customSettings.darkMode.textActiveColor; // Added
  if (modalD) modalD.value = themeState.customSettings.darkMode.modalBg;
  if (hoverD) hoverD.value = themeState.customSettings.darkMode.hoverBg;
  if (shadowD) shadowD.value = toHexColor(themeState.customSettings.darkMode.shadowColor);

  renderThemePreview();

  const resetPayload = {
    style: themeState.currentTheme,
    ...JSON.parse(JSON.stringify(themeState.customSettings))
  };

  if (window.saveThemeSettings) {
    await window.saveThemeSettings(resetPayload);
  } else if (window.resetThemeCustomizationOnBackend) {
    await window.resetThemeCustomizationOnBackend();
  }

  if (window.markHomeConfigUpdated) {
    window.markHomeConfigUpdated();
  }

  if (window.showNotification) {
    window.showNotification(i18n.t('resetThemeSuccess'), 'success');
  }
}

// Store original theme for restore
let originalThemeOnOpen = null;

// Close theme modal and restore original theme
function closeThemeModal(restoreOriginal = true) {
  // Restore original theme if changed
  if (restoreOriginal && originalThemeOnOpen !== null) {
    themeState.currentTheme = originalThemeOnOpen;
    applyStyleTheme(originalThemeOnOpen);
    originalThemeOnOpen = null;
  }
  document.getElementById('themeCustomizationModal')?.classList.add('hidden');
}

// Before opening modal, store the original theme
function storeOriginalTheme() {
  originalThemeOnOpen = themeState.currentTheme;
}

function bootstrapThemeAppearance() {
  const preferredMode = localStorage.getItem('theme') || bootstrapAppearance?.colorMode || 'light';
  document.body.classList.toggle('dark', preferredMode === 'dark');
  document.body.classList.toggle('light', preferredMode !== 'dark');
  applyStyleTheme(themeState.currentTheme || 'handdrawn');
  applyCustomThemeForCurrentMode();
}

function handleThemeCustomizationTrigger(event) {
  const trigger = event.target?.closest?.('#themeCustomizationBtn');
  if (!trigger) return;
  event.preventDefault();
  event.stopPropagation();
  openThemeCustomization();
}

function handleThemeCustomizationMenuClick(event) {
  if (event) {
    event.preventDefault?.();
    event.stopPropagation?.();
  }
  window.showNotification?.(
    (typeof i18n !== 'undefined' && i18n.currentLocale === 'en')
      ? 'Opening theme settings...'
      : '正在打开主题设置...',
    'info'
  );
  openThemeCustomization();
  return false;
}

function bindThemeCustomizationTrigger() {
  const trigger = document.getElementById('themeCustomizationBtn');
  if (trigger && trigger.dataset.themeBound !== 'true') {
    trigger.dataset.themeBound = 'true';
    const openFromTrigger = (event) => {
      event.preventDefault();
      event.stopPropagation();
      openThemeCustomization();
    };
    trigger.addEventListener('click', openFromTrigger);
  }
}

function publishThemeCustomizationGlobals() {
  // Publish globals before any bootstrap work so the menu entry still works
  // even if later initialization throws during file evaluation.
  window.openThemeCustomization = openThemeCustomization;
  window.closeThemeModal = closeThemeModal;
  window.applyThemeSettings = applyThemeSettings;
  window.applyCustomThemeForCurrentMode = applyCustomThemeForCurrentMode;
  window.clearCustomThemeSettings = clearCustomThemeSettings;
  window.applyFontSettings = applyFontSettings;
  window.clearCustomFontSettings = clearCustomFontSettings;
  window.saveThemeCustomization = saveThemeCustomization;
  window.resetThemeCustomization = resetThemeCustomization;
  window.themeState = themeState;
  window.handleThemeFontChange = handleThemeFontChange;
  window.applyStyleTheme = applyStyleTheme;
  window.switchThemeTab = switchThemeTab;
  window.handleThemeModalOverlayClick = handleThemeModalOverlayClick;
  window.setPreviewMode = setPreviewMode;
  window.updateThemePreview = updateThemePreview;
  window.handleThemeCustomizationMenuClick = handleThemeCustomizationMenuClick;
}

publishThemeCustomizationGlobals();

try {
  ensureThemeFontAssets(themeState.customSettings);
  bootstrapThemeAppearance();
  document.addEventListener('click', handleThemeCustomizationTrigger, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeCustomizationTrigger);
  } else {
    bindThemeCustomizationTrigger();
  }
} catch (error) {
  console.error('Theme bootstrap failed:', error);
}

// Export functions
window.openThemeCustomization = openThemeCustomization;
window.closeThemeModal = closeThemeModal;
window.applyThemeSettings = applyThemeSettings;
window.applyCustomThemeForCurrentMode = applyCustomThemeForCurrentMode;
window.clearCustomThemeSettings = clearCustomThemeSettings;
window.applyFontSettings = applyFontSettings;
window.clearCustomFontSettings = clearCustomFontSettings;
window.saveThemeCustomization = saveThemeCustomization;
window.resetThemeCustomization = resetThemeCustomization;
window.themeState = themeState;
window.handleThemeFontChange = handleThemeFontChange;
window.applyStyleTheme = applyStyleTheme;
window.switchThemeTab = switchThemeTab;
window.handleThemeModalOverlayClick = handleThemeModalOverlayClick;
window.setPreviewMode = setPreviewMode;
window.updateThemePreview = updateThemePreview;
window.handleThemeCustomizationMenuClick = handleThemeCustomizationMenuClick;
