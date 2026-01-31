// ===== Theme Customization Module =====

const themeState = {
  currentTheme: 'handdrawn', // handdrawn, minimal, modern, glassmorphism
  customSettings: {
    fontChinese: '优设好身体',
    fontEnglish: 'Patrick Hand',
    bgColor: '#f9f9f9',
    borderColor: '#444444',
    textColor: '#333333',
    cardBg: '#ffffff',
    modalBg: '#ffffff',
    inputBg: '#ffffff',
    hoverBg: '#f0f0f0',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    accentColor: '#4A90E2',
    darkMode: {
      bgColor: '#1e1e1e',
      borderColor: '#ecf0f1',
      textColor: '#ecf0f1',
      cardBg: '#2c2c2c',
      modalBg: '#2c2c2c',
      inputBg: '#1e1e1e',
      hoverBg: '#383838',
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      accentColor: '#4A90E2'
    }
  }
};

const DEFAULT_CUSTOM_SETTINGS = JSON.parse(JSON.stringify(themeState.customSettings));

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
    { name: 'Roboto', value: 'Roboto', google: true },
    { name: 'Inter', value: 'Inter', google: true },
    { name: 'Poppins', value: 'Poppins', google: true },
    { name: 'Nunito', value: 'Nunito', google: true }
  ]
};

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

// Open theme customization modal
function openThemeCustomization() {
  console.log('openThemeCustomization called');
  console.log('authState:', window.authState);
  console.log('membershipState:', window.membershipState);

  // Check login FIRST
  if (!window.authState || !window.authState.isLoggedIn) {
    console.log('Not logged in, showing login modal');
    if (window.openGoogleSignInModal) {
      window.openGoogleSignInModal();
    }
    return;
  }

  // Then check membership tier
  if (!window.membershipState || window.membershipState.tier < 2) {
    console.log('Tier insufficient, showing upgrade modal');
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
  createThemeModal();
  document.getElementById('themeCustomizationModal').classList.remove('hidden');
  renderThemePreview();
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
                  <label>${isZh ? '卡片' : 'Card'}</label>
                  <input type="color" id="cardBgInput" value="${themeState.customSettings.cardBg}" onchange="updateThemePreview()">
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
                  <label>${isZh ? '弹窗' : 'Modal'}</label>
                  <input type="color" id="modalBgInput" value="${themeState.customSettings.modalBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '悬浮' : 'Hover'}</label>
                  <input type="color" id="hoverBgInput" value="${themeState.customSettings.hoverBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '强调' : 'Accent'}</label>
                  <input type="color" id="accentColorInput" value="${themeState.customSettings.accentColor}" onchange="updateThemePreview()">
                </div>
              </div>
              <div class="theme-color-row" style="margin-top: 10px;">
                <label>${isZh ? '阴影' : 'Shadow'}</label>
                <input type="color" id="shadowColorInput" value="${toHexColor(themeState.customSettings.shadowColor)}" onchange="updateThemePreview()">
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
                  <label>${isZh ? '卡片' : 'Card'}</label>
                  <input type="color" id="cardBgDarkInput" value="${themeState.customSettings.darkMode.cardBg}" onchange="updateThemePreview()">
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
                  <label>${isZh ? '弹窗' : 'Modal'}</label>
                  <input type="color" id="modalBgDarkInput" value="${themeState.customSettings.darkMode.modalBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '悬浮' : 'Hover'}</label>
                  <input type="color" id="hoverBgDarkInput" value="${themeState.customSettings.darkMode.hoverBg}" onchange="updateThemePreview()">
                </div>
                <div class="theme-color-item">
                  <label>${isZh ? '强调' : 'Accent'}</label>
                  <input type="color" id="accentColorDarkInput" value="${themeState.customSettings.darkMode.accentColor}" onchange="updateThemePreview()">
                </div>
              </div>
              <div class="theme-color-row" style="margin-top: 10px;">
                <label>${isZh ? '阴影' : 'Shadow'}</label>
                <input type="color" id="shadowColorDarkInput" value="${toHexColor(themeState.customSettings.darkMode.shadowColor)}" onchange="updateThemePreview()">
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

function setPreviewMode(mode) {
  previewMode = mode;
  document.getElementById('previewLightBtn')?.classList.toggle('active', mode === 'light');
  document.getElementById('previewDarkBtn')?.classList.toggle('active', mode === 'dark');
  renderThemePreview();
}

function handleThemeFontChange() {
  const fontChinese = document.getElementById('fontChineseSelect')?.value;
  const fontEnglish = document.getElementById('fontEnglishSelect')?.value;
  if (fontChinese) themeState.customSettings.fontChinese = fontChinese;
  if (fontEnglish) themeState.customSettings.fontEnglish = fontEnglish;
  applyCustomThemeForCurrentMode();
  renderThemePreview();
}

// Render theme preview
function renderThemePreview() {
  const preview = document.getElementById('themePreview');
  if (!preview) return;

  const fontChinese = document.getElementById('fontChineseSelect')?.value || themeState.customSettings.fontChinese;
  const fontEnglish = document.getElementById('fontEnglishSelect')?.value || themeState.customSettings.fontEnglish;
  const bgColor = previewMode === 'light'
    ? (document.getElementById('bgColorInput')?.value || themeState.customSettings.bgColor)
    : (document.getElementById('bgColorDarkInput')?.value || themeState.customSettings.darkMode.bgColor);
  const cardBg = previewMode === 'light'
    ? (document.getElementById('cardBgInput')?.value || themeState.customSettings.cardBg)
    : (document.getElementById('cardBgDarkInput')?.value || themeState.customSettings.darkMode.cardBg);
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
  const accentColor = previewMode === 'light'
    ? (document.getElementById('accentColorInput')?.value || themeState.customSettings.accentColor)
    : (document.getElementById('accentColorDarkInput')?.value || themeState.customSettings.darkMode.accentColor);
  const shadowBase = previewMode === 'light'
    ? (document.getElementById('shadowColorInput')?.value || themeState.customSettings.shadowColor)
    : (document.getElementById('shadowColorDarkInput')?.value || themeState.customSettings.darkMode.shadowColor);
  const shadowColor = String(shadowBase).trim().startsWith('#')
    ? hexToRgba(shadowBase, previewMode === 'light' ? 0.2 : 0.5)
    : shadowBase;

  preview.style.setProperty('--bg-color', bgColor);
  preview.style.setProperty('--card-bg', cardBg);
  preview.style.setProperty('--modal-bg', modalBg);
  preview.style.setProperty('--input-bg', inputBg);
  preview.style.setProperty('--border-color', borderColor);
  preview.style.setProperty('--text-color', textColor);
  preview.style.setProperty('--hover-bg', hoverBg);
  preview.style.setProperty('--shadow-color', shadowColor);
  preview.style.setProperty('--accent-color', accentColor);
  preview.style.fontFamily = `"${fontEnglish}", "${fontChinese}", sans-serif`;
  preview.style.backgroundColor = 'var(--bg-color)';
  preview.style.color = 'var(--text-color)';

  preview.innerHTML = `
    <style>
      #themePreview .preview-btn {
        font-family: inherit;
        border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        border: 2px solid var(--border-color);
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
        background: var(--card-bg);
        color: var(--text-color);
        box-shadow: 3px 3px 0 var(--shadow-color);
        transition: all 0.2s ease;
        padding: 8px 16px;
      }

      #themePreview .preview-btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: 5px 5px 0 var(--shadow-color);
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
    <div style="display:flex; justify-content:center;">
      <div class="container" style="max-width: 460px; width: 100%; padding: 12px;">
        <div class="time" style="font-size: 54px;">12:34</div>
        <div class="date" style="margin-bottom: 22px;">2026/01/25 Sat</div>
        <div class="search-box" style="margin: 0 auto 26px; max-width: 420px;">
          <div class="search-engine" style="border-right: 2px solid var(--border-color); margin-right: 12px; padding-right: 12px;">
            <div style="width: 28px; height: 28px; border: 1px solid var(--border-color); border-radius: 4px; display:flex; align-items:center; justify-content:center; font-weight:700;">G</div>
          </div>
          <input type="text" placeholder="${(typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'Search...' : '想要搜点什么吗？'}" readonly tabindex="-1" style="opacity:1; border:none; outline:none; background:transparent;" />
        </div>

        <div class="content-area" style="max-width: 520px;">
          <div class="chip">Google</div>
          <div class="chip tag">Work</div>
        </div>

        <div style="display:flex; justify-content:center; margin-top: 14px;">
          <div style="width: 220px; height: 44px; border: 2px solid var(--border-color); border-radius: 10px; background: var(--card-bg); box-shadow: 6px 6px 0 var(--shadow-color);"></div>
        </div>

        <div style="display:flex; justify-content:center; gap: 10px; margin-top: 18px;">
          <button type="button" class="preview-btn" onclick="return false" onmousedown="return false">${(typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'Cancel' : '取消'}</button>
          <button type="button" class="preview-btn primary" onclick="return false" onmousedown="return false">${(typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'Confirm' : '确认'}</button>
        </div>
      </div>
    </div>
  `;
}

// Update preview when settings change
function updateThemePreview() {
  const styleEl = document.getElementById('themeStyleSelect');
  const fontChineseEl = document.getElementById('fontChineseSelect');
  const fontEnglishEl = document.getElementById('fontEnglishSelect');
  const bgColorEl = document.getElementById('bgColorInput');
  const cardBgEl = document.getElementById('cardBgInput');
  const inputBgEl = document.getElementById('inputBgInput');
  const borderColorEl = document.getElementById('borderColorInput');
  const textColorEl = document.getElementById('textColorInput');
  const modalBgEl = document.getElementById('modalBgInput');
  const hoverBgEl = document.getElementById('hoverBgInput');
  const accentColorEl = document.getElementById('accentColorInput');
  const shadowColorEl = document.getElementById('shadowColorInput');

  const bgColorDarkEl = document.getElementById('bgColorDarkInput');
  const cardBgDarkEl = document.getElementById('cardBgDarkInput');
  const inputBgDarkEl = document.getElementById('inputBgDarkInput');
  const borderColorDarkEl = document.getElementById('borderColorDarkInput');
  const textColorDarkEl = document.getElementById('textColorDarkInput');
  const modalBgDarkEl = document.getElementById('modalBgDarkInput');
  const hoverBgDarkEl = document.getElementById('hoverBgDarkInput');
  const accentColorDarkEl = document.getElementById('accentColorDarkInput');
  const shadowColorDarkEl = document.getElementById('shadowColorDarkInput');

  const shadowLightBase = shadowColorEl?.value || toHexColor(themeState.customSettings.shadowColor);
  const shadowDarkBase = shadowColorDarkEl?.value || toHexColor(themeState.customSettings.darkMode?.shadowColor);

  const draft = {
    ...themeState.customSettings,
    style: styleEl?.value || themeState.currentTheme,
    fontChinese: fontChineseEl?.value || themeState.customSettings.fontChinese,
    fontEnglish: fontEnglishEl?.value || themeState.customSettings.fontEnglish,
    bgColor: bgColorEl?.value || themeState.customSettings.bgColor,
    cardBg: cardBgEl?.value || themeState.customSettings.cardBg,
    inputBg: inputBgEl?.value || themeState.customSettings.inputBg,
    borderColor: borderColorEl?.value || themeState.customSettings.borderColor,
    textColor: textColorEl?.value || themeState.customSettings.textColor,
    modalBg: modalBgEl?.value || themeState.customSettings.modalBg,
    hoverBg: hoverBgEl?.value || themeState.customSettings.hoverBg,
    accentColor: accentColorEl?.value || themeState.customSettings.accentColor,
    shadowColor: hexToRgba(shadowLightBase, 0.2),
    darkMode: {
      ...(themeState.customSettings.darkMode || {}),
      bgColor: bgColorDarkEl?.value || themeState.customSettings.darkMode?.bgColor,
      cardBg: cardBgDarkEl?.value || themeState.customSettings.darkMode?.cardBg,
      inputBg: inputBgDarkEl?.value || themeState.customSettings.darkMode?.inputBg,
      borderColor: borderColorDarkEl?.value || themeState.customSettings.darkMode?.borderColor,
      textColor: textColorDarkEl?.value || themeState.customSettings.darkMode?.textColor,
      modalBg: modalBgDarkEl?.value || themeState.customSettings.darkMode?.modalBg,
      hoverBg: hoverBgDarkEl?.value || themeState.customSettings.darkMode?.hoverBg,
      accentColor: accentColorDarkEl?.value || themeState.customSettings.darkMode?.accentColor,
      shadowColor: hexToRgba(shadowDarkBase, 0.5)
    }
  };

  applyThemeSettings(draft);
  applyCustomThemeForCurrentMode();
  renderThemePreview();
}

// Save theme settings
async function saveThemeCustomization() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  const shadowLightHex = document.getElementById('shadowColorInput')?.value || toHexColor(themeState.customSettings.shadowColor);
  const shadowDarkHex = document.getElementById('shadowColorDarkInput')?.value || toHexColor(themeState.customSettings.darkMode?.shadowColor);

  const settings = {
    style: document.getElementById('themeStyleSelect')?.value || themeState.currentTheme,
    fontChinese: document.getElementById('fontChineseSelect').value,
    fontEnglish: document.getElementById('fontEnglishSelect').value,
    bgColor: document.getElementById('bgColorInput').value,
    cardBg: document.getElementById('cardBgInput').value,
    inputBg: document.getElementById('inputBgInput').value,
    borderColor: document.getElementById('borderColorInput').value,
    textColor: document.getElementById('textColorInput').value,
    modalBg: document.getElementById('modalBgInput').value,
    hoverBg: document.getElementById('hoverBgInput').value,
    accentColor: document.getElementById('accentColorInput').value,
    shadowColor: hexToRgba(shadowLightHex, 0.2),
    darkMode: {
      bgColor: document.getElementById('bgColorDarkInput').value,
      cardBg: document.getElementById('cardBgDarkInput').value,
      inputBg: document.getElementById('inputBgDarkInput').value,
      borderColor: document.getElementById('borderColorDarkInput').value,
      textColor: document.getElementById('textColorDarkInput').value,
      modalBg: document.getElementById('modalBgDarkInput').value,
      hoverBg: document.getElementById('hoverBgDarkInput').value,
      accentColor: document.getElementById('accentColorDarkInput').value,
      shadowColor: hexToRgba(shadowDarkHex, 0.5)
    }
  };

  themeState.currentTheme = settings.style;

  // Apply to current page (respect current mode)
  applyThemeSettings(settings);
  applyCustomThemeForCurrentMode();

  // Save to database
  try {
    if (window.initializeMembership) {
      await window.initializeMembership();
    }
    if (!window.membershipState || window.membershipState.tier < 2) {
      throw new Error('premium membership required');
    }
    if (window.saveThemeSettings) {
      await window.saveThemeSettings(settings);
    }
    if (window.saveFontSettings) {
      await window.saveFontSettings({
        fontChinese: settings.fontChinese,
        fontEnglish: settings.fontEnglish
      });
    }

    closeThemeModal();

    if (window.showNotification) {
      window.showNotification(
        isZh ? '主题已保存！' : 'Theme saved!',
        'success'
      );
    }
  } catch (err) {
    console.error('Failed to persist theme customization:', err);
    if (window.showNotification) {
      window.showNotification(
        isZh ? '保存失败，请稍后重试' : 'Save failed, please try again',
        'error'
      );
    }
  }
}

// Apply theme settings to page
function applyThemeSettings(settings) {
  themeState.customSettings = settings;
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
  if (modeSettings.cardBg) rootEl.style.setProperty('--card-bg', modeSettings.cardBg);
  if (modeSettings.modalBg) rootEl.style.setProperty('--modal-bg', modeSettings.modalBg);
  if (modeSettings.inputBg) rootEl.style.setProperty('--input-bg', modeSettings.inputBg);
  if (modeSettings.borderColor) rootEl.style.setProperty('--border-color', modeSettings.borderColor);
  if (modeSettings.textColor) rootEl.style.setProperty('--text-color', modeSettings.textColor);
  if (modeSettings.hoverBg) rootEl.style.setProperty('--hover-bg', modeSettings.hoverBg);
  if (modeSettings.shadowColor) rootEl.style.setProperty('--shadow-color', modeSettings.shadowColor);
  if (modeSettings.accentColor) rootEl.style.setProperty('--accent-color', modeSettings.accentColor);

  if (modeSettings.bgColor) bodyEl.style.setProperty('--bg-color', modeSettings.bgColor);
  if (modeSettings.cardBg) bodyEl.style.setProperty('--card-bg', modeSettings.cardBg);
  if (modeSettings.modalBg) bodyEl.style.setProperty('--modal-bg', modeSettings.modalBg);
  if (modeSettings.inputBg) bodyEl.style.setProperty('--input-bg', modeSettings.inputBg);
  if (modeSettings.borderColor) bodyEl.style.setProperty('--border-color', modeSettings.borderColor);
  if (modeSettings.textColor) bodyEl.style.setProperty('--text-color', modeSettings.textColor);
  if (modeSettings.hoverBg) bodyEl.style.setProperty('--hover-bg', modeSettings.hoverBg);
  if (modeSettings.shadowColor) bodyEl.style.setProperty('--shadow-color', modeSettings.shadowColor);
  if (modeSettings.accentColor) bodyEl.style.setProperty('--accent-color', modeSettings.accentColor);

  if (s.fontEnglish || s.fontChinese) {
    document.body.style.fontFamily = `"${s.fontEnglish || 'Patrick Hand'}", "${s.fontChinese || '优设好身体'}", sans-serif`;
  }
}

function clearCustomThemeSettings() {
  const rootEl = document.documentElement;
  rootEl.style.removeProperty('--bg-color');
  rootEl.style.removeProperty('--card-bg');
  rootEl.style.removeProperty('--border-color');
  rootEl.style.removeProperty('--text-color');
  rootEl.style.removeProperty('--modal-bg');
  rootEl.style.removeProperty('--input-bg');
  rootEl.style.removeProperty('--hover-bg');
  rootEl.style.removeProperty('--shadow-color');
  rootEl.style.removeProperty('--accent-color');

  document.body.style.removeProperty('--bg-color');
  document.body.style.removeProperty('--card-bg');
  document.body.style.removeProperty('--border-color');
  document.body.style.removeProperty('--text-color');
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
  applyCustomThemeForCurrentMode();
}

async function resetThemeCustomization() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  themeState.currentTheme = 'handdrawn';
  themeState.customSettings = JSON.parse(JSON.stringify(DEFAULT_CUSTOM_SETTINGS));

  applyThemeSettings(themeState.customSettings);
  applyCustomThemeForCurrentMode();

  const fontEn = document.getElementById('fontEnglishSelect');
  const fontZh = document.getElementById('fontChineseSelect');
  if (fontEn) fontEn.value = themeState.customSettings.fontEnglish;
  if (fontZh) fontZh.value = themeState.customSettings.fontChinese;

  const bg = document.getElementById('bgColorInput');
  const card = document.getElementById('cardBgInput');
  const input = document.getElementById('inputBgInput');
  const border = document.getElementById('borderColorInput');
  const text = document.getElementById('textColorInput');
  const modal = document.getElementById('modalBgInput');
  const hover = document.getElementById('hoverBgInput');
  const accent = document.getElementById('accentColorInput');
  const shadow = document.getElementById('shadowColorInput');

  if (bg) bg.value = themeState.customSettings.bgColor;
  if (card) card.value = themeState.customSettings.cardBg;
  if (input) input.value = themeState.customSettings.inputBg;
  if (border) border.value = themeState.customSettings.borderColor;
  if (text) text.value = themeState.customSettings.textColor;
  if (modal) modal.value = themeState.customSettings.modalBg;
  if (hover) hover.value = themeState.customSettings.hoverBg;
  if (accent) accent.value = themeState.customSettings.accentColor;
  if (shadow) shadow.value = toHexColor(themeState.customSettings.shadowColor);

  const bgD = document.getElementById('bgColorDarkInput');
  const cardD = document.getElementById('cardBgDarkInput');
  const inputD = document.getElementById('inputBgDarkInput');
  const borderD = document.getElementById('borderColorDarkInput');
  const textD = document.getElementById('textColorDarkInput');
  const modalD = document.getElementById('modalBgDarkInput');
  const hoverD = document.getElementById('hoverBgDarkInput');
  const accentD = document.getElementById('accentColorDarkInput');
  const shadowD = document.getElementById('shadowColorDarkInput');

  if (bgD) bgD.value = themeState.customSettings.darkMode.bgColor;
  if (cardD) cardD.value = themeState.customSettings.darkMode.cardBg;
  if (inputD) inputD.value = themeState.customSettings.darkMode.inputBg;
  if (borderD) borderD.value = themeState.customSettings.darkMode.borderColor;
  if (textD) textD.value = themeState.customSettings.darkMode.textColor;
  if (modalD) modalD.value = themeState.customSettings.darkMode.modalBg;
  if (hoverD) hoverD.value = themeState.customSettings.darkMode.hoverBg;
  if (accentD) accentD.value = themeState.customSettings.darkMode.accentColor;
  if (shadowD) shadowD.value = toHexColor(themeState.customSettings.darkMode.shadowColor);

  renderThemePreview();

  if (window.resetThemeCustomizationOnBackend) {
    await window.resetThemeCustomizationOnBackend();
  }

  if (window.markHomeConfigUpdated) {
    window.markHomeConfigUpdated();
  }

  if (window.showNotification) {
    window.showNotification(isZh ? '已重置主题定制' : 'Theme customization reset', 'success');
  }
}

// Close theme modal
function closeThemeModal() {
  document.getElementById('themeCustomizationModal')?.classList.add('hidden');
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
