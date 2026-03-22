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
    accentColor: '#141414',
    darkMode: {
      bgColor: '#1e1e1e',
      borderColor: '#ecf0f1',
      textColor: '#f4f4f5',
      textActiveColor: '#1e1e1e',
      buttonBg: '#2c2c2c',
      modalBg: '#2c2c2c',
      inputBg: '#1e1e1e',
      hoverBg: '#383838',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      accentColor: '#f4f4f5'
    }
  }
};

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
  accentColor: '#1f49d8',
  darkMode: {
    bgColor: '#0f0f10',
    borderColor: '#3a3a3d',
    textColor: '#f4f4f5',
    textActiveColor: '#1e1e1e',
    buttonBg: '#141416',
    modalBg: '#141416',
    inputBg: '#141416',
    hoverBg: '#1b1b1e',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    accentColor: '#2c5cff'
  }
};

let cyberTrailCleanup = null;

function setCyberTrailEnabled(enabled) {
  const next = Boolean(enabled);
  if (next && cyberTrailCleanup) return;
  if (!next && !cyberTrailCleanup) return;

  if (!next && cyberTrailCleanup) {
    try {
      cyberTrailCleanup();
    } finally {
      cyberTrailCleanup = null;
    }
    return;
  }

  const dots = new Set();
  let lastX = null;
  let lastY = null;
  let lastAt = 0;

  const createDot = (x, y, dx, dy, opacity, scale) => {
    const el = document.createElement('div');
    el.className = 'cyber-trail-dot';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--trail-dx', `${dx}px`);
    el.style.setProperty('--trail-dy', `${dy}px`);
    if (typeof opacity === 'number') el.style.setProperty('--trail-opacity', String(opacity));
    if (typeof scale === 'number') el.style.setProperty('--trail-scale', String(scale));
    document.body.appendChild(el);
    dots.add(el);

    requestAnimationFrame(() => {
      el.classList.add('fade');
    });

    window.setTimeout(() => {
      dots.delete(el);
      el.remove();
    }, 500);
  };

  const onMove = (ev) => {
    if (!document.body || document.body.dataset.style !== 'cyber') return;

    const now = performance.now();
    if (now - lastAt < 6) return;

    const x = ev.clientX;
    const y = ev.clientY;
    if (typeof x !== 'number' || typeof y !== 'number') return;

    if (lastX != null && lastY != null) {
      const ddx = x - lastX;
      const ddy = y - lastY;
      const dist2 = ddx * ddx + ddy * ddy;
      if (dist2 < 36) return;

      const mag = Math.max(1, Math.sqrt(dist2));
      const nx = ddx / mag;
      const ny = ddy / mag;
      const offset = 48;

      const steps = Math.max(1, Math.min(7, Math.floor(mag / 14)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = lastX + ddx * t;
        const py = lastY + ddy * t;

        const trail = (1 - t);
        const dx = -nx * offset * trail;
        const dy = -ny * offset * trail;
        const op = 0.86 - trail * 0.22;
        const sc = 0.95 - trail * 0.25;
        createDot(px, py, dx, dy, op, sc);
      }
    } else {
      createDot(x, y, 0, 0, 0.86, 0.95);
    }

    lastX = x;
    lastY = y;
    lastAt = now;
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  cyberTrailCleanup = () => {
    window.removeEventListener('pointermove', onMove);
    dots.forEach((el) => {
      try {
        el.remove();
      } catch (_err) {
      }
    });
    dots.clear();
  };
}

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
    { name: 'Inter', value: 'Inter', google: true },
    { name: 'Newsreader', value: 'Newsreader', google: true },
    { name: 'Poppins', value: 'Poppins', google: true },
    { name: 'Nunito', value: 'Nunito', google: true },
    { name: 'Anonymous Pro', value: 'Anonymous Pro', google: true }
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

function applyStyleTheme(style) {
  const v = String(style || 'handdrawn');
  document.body.dataset.style = v;
  setCyberTrailEnabled(v === 'cyber');
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
  if (!window.membershipState || window.membershipState.tier < 1) {
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
  // Store original theme for restore on cancel
  originalThemeOnOpen = themeState.currentTheme;
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
                  <input type="color" id="accentColorInput" value="${themeState.customSettings.accentColor}" onchange="updateThemePreview()">
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
                  <input type="color" id="accentColorDarkInput" value="${themeState.customSettings.darkMode.accentColor}" onchange="updateThemePreview()">
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

  preview.innerHTML = `
    <style>
      #themePreview .preview-btn {
        font-family: inherit;
        border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        border: 2px solid var(--border-color);
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
        background: var(--button-bg);
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
  const buttonBgEl = document.getElementById('buttonBgInput');
  const inputBgEl = document.getElementById('inputBgInput');
  const borderColorEl = document.getElementById('borderColorInput');
  const textColorEl = document.getElementById('textColorInput');
  const textActiveColorEl = document.getElementById('textActiveColorInput');
  const modalBgEl = document.getElementById('modalBgInput');
  const hoverBgEl = document.getElementById('hoverBgInput');
  const accentColorEl = document.getElementById('accentColorInput');
  const shadowColorEl = document.getElementById('shadowColorInput');

  const bgColorDarkEl = document.getElementById('bgColorDarkInput');
  const buttonBgDarkEl = document.getElementById('buttonBgDarkInput');
  const inputBgDarkEl = document.getElementById('inputBgDarkInput');
  const borderColorDarkEl = document.getElementById('borderColorDarkInput');
  const textColorDarkEl = document.getElementById('textColorDarkInput');
  const textActiveColorDarkEl = document.getElementById('textActiveColorDarkInput');
  const modalBgDarkEl = document.getElementById('modalBgDarkInput');
  const hoverBgDarkEl = document.getElementById('hoverBgDarkInput');
  const accentColorDarkEl = document.getElementById('accentColorDarkInput');
  const shadowColorDarkEl = document.getElementById('shadowColorDarkInput');

  const shadowLightBase = shadowColorEl?.value || toHexColor(themeState.customSettings.shadowColor);
  const shadowDarkBase = shadowColorDarkEl?.value || toHexColor(themeState.customSettings.darkMode?.shadowColor);

  const nextStyle = styleEl?.value || themeState.currentTheme;
  if (nextStyle !== lastStyleValue && nextStyle === 'cyber') {
    const keepFonts = {
      fontChinese: themeState.customSettings.fontChinese,
      fontEnglish: themeState.customSettings.fontEnglish
    };

    themeState.customSettings = {
      ...themeState.customSettings,
      ...CYBER_PRESET,
      ...keepFonts
    };

    if (bgColorEl) bgColorEl.value = CYBER_PRESET.bgColor;
    if (buttonBgEl) buttonBgEl.value = CYBER_PRESET.buttonBg;
    if (inputBgEl) inputBgEl.value = CYBER_PRESET.inputBg;
    if (borderColorEl) borderColorEl.value = CYBER_PRESET.borderColor;
    if (textColorEl) textColorEl.value = CYBER_PRESET.textColor;
    if (textActiveColorEl) textActiveColorEl.value = CYBER_PRESET.textActiveColor;
    if (modalBgEl) modalBgEl.value = CYBER_PRESET.modalBg;
    if (hoverBgEl) hoverBgEl.value = CYBER_PRESET.hoverBg;
    if (accentColorEl) accentColorEl.value = CYBER_PRESET.accentColor;
    if (shadowColorEl) shadowColorEl.value = toHexColor(CYBER_PRESET.shadowColor);

    if (bgColorDarkEl) bgColorDarkEl.value = CYBER_PRESET.darkMode.bgColor;
    if (buttonBgDarkEl) buttonBgDarkEl.value = CYBER_PRESET.darkMode.buttonBg;
    if (inputBgDarkEl) inputBgDarkEl.value = CYBER_PRESET.darkMode.inputBg;
    if (borderColorDarkEl) borderColorDarkEl.value = CYBER_PRESET.darkMode.borderColor;
    if (textColorDarkEl) textColorDarkEl.value = CYBER_PRESET.darkMode.textColor;
    if (textActiveColorDarkEl) textActiveColorDarkEl.value = CYBER_PRESET.darkMode.textActiveColor;
    if (modalBgDarkEl) modalBgDarkEl.value = CYBER_PRESET.darkMode.modalBg;
    if (hoverBgDarkEl) hoverBgDarkEl.value = CYBER_PRESET.darkMode.hoverBg;
    if (accentColorDarkEl) accentColorDarkEl.value = CYBER_PRESET.darkMode.accentColor;
    if (shadowColorDarkEl) shadowColorDarkEl.value = toHexColor(CYBER_PRESET.darkMode.shadowColor);
  }

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
    accentColor: document.getElementById('accentColorInput').value,
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
      accentColor: document.getElementById('accentColorDarkInput').value,
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
    if (window.saveFontSettings) {
      await window.saveFontSettings({
        fontChinese: settings.fontChinese,
        fontEnglish: settings.fontEnglish
      });
    }

    if (window.markHomeConfigUpdated) {
      window.markHomeConfigUpdated();
    }

    closeThemeModal();
    
    // Clear original theme tracker
    originalThemeOnOpen = null;

    if (window.showNotification) {
      window.showNotification(
        isZh ? '主题已保存！' : 'Theme saved!',
        'success'
      );
    }
    
    // Automatically reload the page to apply massive style & DOM updates instantly
    setTimeout(() => {
      window.location.reload();
    }, 400);
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
  if (modeSettings.accentColor) rootEl.style.setProperty('--accent-color', modeSettings.accentColor);

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
  if (modeSettings.accentColor) bodyEl.style.setProperty('--accent-color', modeSettings.accentColor);

  if (s.fontEnglish || s.fontChinese) {
    document.body.style.fontFamily = `"${s.fontEnglish || 'Patrick Hand'}", "${s.fontChinese || '优设好身体'}", sans-serif`;
  }

  // Dynamic Accent Cursor
  let cursorStyle = document.getElementById('dynamic-cursor-style');
  if (!cursorStyle) {
    cursorStyle = document.createElement('style');
    cursorStyle.id = 'dynamic-cursor-style';
    document.head.appendChild(cursorStyle);
  }
  const curColor = modeSettings.accentColor || '#141414';
  const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${curColor}" stroke="white" stroke-width="1.5"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L5.5 3.21z"/></svg>`;
  const pointerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${curColor}" stroke="white" stroke-width="1.5"><path d="M14 8c0-1.1-1.34-2-2.5-2S9 6.9 9 8v3.5a2.5 2.5 0 0 0-4 0V15c0 2.7 2.2 5 5 5h3c2.7 0 5-2.2 5-5V11a2.5 2.5 0 0 0-4 0V8z"/></svg>`;
  const cursorUrl = `url("data:image/svg+xml,${encodeURIComponent(cursorSvg)}") 0 0, auto`;
  const pointerUrl = `url("data:image/svg+xml,${encodeURIComponent(pointerSvg)}") 6 2, pointer`;
  
  cursorStyle.innerHTML = `
    body, .modal-overlay, .modal { cursor: ${cursorUrl}; }
    a, button, [role="button"], input[type="submit"], input[type="button"], input[type="checkbox"], select, .clickable, .button, .engine-item, .chip, .date, .feature-card, .menu-item, .theme-color-item { cursor: ${pointerUrl} !important; }
    input[type="text"], input[type="search"], textarea { cursor: text !important; }
  `;

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
  if (fontEn) fontEn.value = themeState.customSettings.fontEnglish;
  if (fontZh) fontZh.value = themeState.customSettings.fontChinese;

  const bg = document.getElementById('bgColorInput');
  const card = document.getElementById('buttonBgInput');
  const input = document.getElementById('inputBgInput');
  const border = document.getElementById('borderColorInput');
  const text = document.getElementById('textColorInput');
  const modal = document.getElementById('modalBgInput');
  const hover = document.getElementById('hoverBgInput');
  const accent = document.getElementById('accentColorInput');
  const shadow = document.getElementById('shadowColorInput');

  if (bg) bg.value = themeState.customSettings.bgColor;
  if (card) card.value = themeState.customSettings.buttonBg;
  if (input) input.value = themeState.customSettings.inputBg;
  if (border) border.value = themeState.customSettings.borderColor;
  if (text) text.value = themeState.customSettings.textColor;
  if (textActive) textActive.value = themeState.customSettings.textActiveColor; // Added
  if (modal) modal.value = themeState.customSettings.modalBg;
  if (hover) hover.value = themeState.customSettings.hoverBg;
  if (accent) accent.value = themeState.customSettings.accentColor;
  if (shadow) shadow.value = toHexColor(themeState.customSettings.shadowColor);

  const bgD = document.getElementById('bgColorDarkInput');
  const cardD = document.getElementById('buttonBgDarkInput');
  const inputD = document.getElementById('inputBgDarkInput');
  const borderD = document.getElementById('borderColorDarkInput');
  const textD = document.getElementById('textColorDarkInput');
  const textActiveD = document.getElementById('textActiveColorDarkInput'); // Added
  const modalD = document.getElementById('modalBgDarkInput');
  const hoverD = document.getElementById('hoverBgDarkInput');
  const accentD = document.getElementById('accentColorDarkInput');
  const shadowD = document.getElementById('shadowColorDarkInput');

  if (bgD) bgD.value = themeState.customSettings.darkMode.bgColor;
  if (cardD) cardD.value = themeState.customSettings.darkMode.buttonBg;
  if (inputD) inputD.value = themeState.customSettings.darkMode.inputBg;
  if (borderD) borderD.value = themeState.customSettings.darkMode.borderColor;
  if (textD) textD.value = themeState.customSettings.darkMode.textColor;
  if (textActiveD) textActiveD.value = themeState.customSettings.darkMode.textActiveColor; // Added
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

// Store original theme for restore
let originalThemeOnOpen = null;

// Close theme modal and restore original theme
function closeThemeModal() {
  // Restore original theme if changed
  if (originalThemeOnOpen !== null) {
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
