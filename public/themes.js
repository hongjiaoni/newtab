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

// Available fonts
const AVAILABLE_FONTS = {
  chinese: [
    { name: '优设好身体', value: '优设好身体', package: 'yshst' },
    { name: '字魂扁桃体', value: '字魂扁桃体', package: 'zhbtt' },
    { name: '站酷快乐体', value: '站酷快乐体', package: 'zkklt' }
  ],
  english: [
    { name: 'Patrick Hand', value: 'Patrick Hand', google: true },
    { name: 'Quicksand', value: 'Quicksand', google: true },
    { name: 'Roboto', value: 'Roboto', google: true }
  ]
};

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

// Create theme customization modal
function createThemeModal() {
  const existing = document.getElementById('themeCustomizationModal');
  if (existing) {
    existing.remove();
  }

  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  const modalHTML = `
    <div id="themeCustomizationModal" class="modal-overlay hidden">
      <div class="modal" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
        <h3>${isZh ? '主题定制' : 'Theme Customization'}</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
          <!-- Left: Settings -->
          <div>
            <h4 style="margin-bottom: 15px;">${isZh ? '字体设置' : 'Font Settings'}</h4>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '中文字体' : 'Chinese Font'}
              </label>
              <select id="fontChineseSelect" class="modal-input" onchange="updateThemePreview()">
                ${AVAILABLE_FONTS.chinese.map(f => `
                  <option value="${f.value}" ${themeState.customSettings.fontChinese === f.value ? 'selected' : ''}>
                    ${f.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '英文字体' : 'English Font'}
              </label>
              <select id="fontEnglishSelect" class="modal-input" onchange="updateThemePreview()">
                ${AVAILABLE_FONTS.english.map(f => `
                  <option value="${f.value}" ${themeState.customSettings.fontEnglish === f.value ? 'selected' : ''}>
                    ${f.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <h4 style="margin: 25px 0 15px;">${isZh ? '颜色设置' : 'Color Settings'}</h4>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '背景颜色 (浅色模式)' : 'Background Color (Light Mode)'}
              </label>
              <input type="color" id="bgColorInput" class="modal-input"
                     value="${themeState.customSettings.bgColor}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '卡片背景 (浅色模式)' : 'Card Background (Light Mode)'}
              </label>
              <input type="color" id="cardBgInput" class="modal-input"
                     value="${themeState.customSettings.cardBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '输入框背景 (浅色模式)' : 'Input Background (Light Mode)'}
              </label>
              <input type="color" id="inputBgInput" class="modal-input"
                     value="${themeState.customSettings.inputBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '边框颜色 (浅色模式)' : 'Border Color (Light Mode)'}
              </label>
              <input type="color" id="borderColorInput" class="modal-input" 
                     value="${themeState.customSettings.borderColor}" 
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '文字颜色 (浅色模式)' : 'Text Color (Light Mode)'}
              </label>
              <input type="color" id="textColorInput" class="modal-input" 
                     value="${themeState.customSettings.textColor}" 
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '弹窗背景 (浅色模式)' : 'Modal Background (Light Mode)'}
              </label>
              <input type="color" id="modalBgInput" class="modal-input"
                     value="${themeState.customSettings.modalBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '悬浮背景 (浅色模式)' : 'Hover Background (Light Mode)'}
              </label>
              <input type="color" id="hoverBgInput" class="modal-input"
                     value="${themeState.customSettings.hoverBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '强调色 (浅色模式)' : 'Accent Color (Light Mode)'}
              </label>
              <input type="color" id="accentColorInput" class="modal-input"
                     value="${themeState.customSettings.accentColor}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '阴影颜色 (浅色模式，支持 rgba/hex)' : 'Shadow Color (Light Mode, rgba/hex)'}
              </label>
              <input type="text" id="shadowColorInput" class="modal-input"
                     value="${themeState.customSettings.shadowColor}"
                     onchange="updateThemePreview()">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '背景颜色 (深色模式)' : 'Background Color (Dark Mode)'}
              </label>
              <input type="color" id="bgColorDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.bgColor}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '卡片背景 (深色模式)' : 'Card Background (Dark Mode)'}
              </label>
              <input type="color" id="cardBgDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.cardBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '输入框背景 (深色模式)' : 'Input Background (Dark Mode)'}
              </label>
              <input type="color" id="inputBgDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.inputBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '边框颜色 (深色模式)' : 'Border Color (Dark Mode)'}
              </label>
              <input type="color" id="borderColorDarkInput" class="modal-input" 
                     value="${themeState.customSettings.darkMode.borderColor}" 
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '文字颜色 (深色模式)' : 'Text Color (Dark Mode)'}
              </label>
              <input type="color" id="textColorDarkInput" class="modal-input" 
                     value="${themeState.customSettings.darkMode.textColor}" 
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '弹窗背景 (深色模式)' : 'Modal Background (Dark Mode)'}
              </label>
              <input type="color" id="modalBgDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.modalBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '悬浮背景 (深色模式)' : 'Hover Background (Dark Mode)'}
              </label>
              <input type="color" id="hoverBgDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.hoverBg}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '强调色 (深色模式)' : 'Accent Color (Dark Mode)'}
              </label>
              <input type="color" id="accentColorDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.accentColor}"
                     onchange="updateThemePreview()" style="height: 50px;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                ${isZh ? '阴影颜色 (深色模式，支持 rgba/hex)' : 'Shadow Color (Dark Mode, rgba/hex)'}
              </label>
              <input type="text" id="shadowColorDarkInput" class="modal-input"
                     value="${themeState.customSettings.darkMode.shadowColor}"
                     onchange="updateThemePreview()">
            </div>
          </div>

          <!-- Right: Preview -->
          <div>
            <h4 style="margin-bottom: 15px;">${isZh ? '预览' : 'Preview'}</h4>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
              <button class="cancel-btn" onclick="setPreviewMode('light')" id="previewLightBtn">
                ${isZh ? '浅色' : 'Light'}
              </button>
              <button class="cancel-btn" onclick="setPreviewMode('dark')" id="previewDarkBtn">
                ${isZh ? '深色' : 'Dark'}
              </button>
            </div>
            <div id="themePreview" style="border: 2px solid var(--border-color); border-radius: 8px; padding: 20px; min-height: 400px;">
              <!-- Preview content will be rendered here -->
            </div>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 30px;">
          <button class="cancel-btn" onclick="closeThemeModal()">${isZh ? '取消' : 'Cancel'}</button>
          <button class="cancel-btn" onclick="resetThemeCustomization()">${isZh ? '重置' : 'Reset'}</button>
          <button class="primary-btn" onclick="saveThemeSettings()">${isZh ? '保存' : 'Save'}</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Preview mode state
let previewMode = 'light';

function setPreviewMode(mode) {
  previewMode = mode;
  document.getElementById('previewLightBtn').classList.toggle('primary-btn', mode === 'light');
  document.getElementById('previewDarkBtn').classList.toggle('primary-btn', mode === 'dark');
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
  const shadowColor = previewMode === 'light'
    ? (document.getElementById('shadowColorInput')?.value || themeState.customSettings.shadowColor)
    : (document.getElementById('shadowColorDarkInput')?.value || themeState.customSettings.darkMode.shadowColor);

  preview.style.backgroundColor = bgColor;
  preview.style.color = textColor;
  preview.innerHTML = `
    <div style="font-family: '${fontEnglish}', '${fontChinese}', sans-serif;">
      <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px;">12:34</div>
      <div style="font-size: 18px; margin-bottom: 30px;">2026年1月25日 星期六</div>
      
      <div style="border: 2px solid ${borderColor}; border-radius: 12px; padding: 15px; background: ${modalBg}; margin-bottom: 15px; box-shadow: 4px 4px 0 ${shadowColor};">
        <input type="text" placeholder="想要搜点什么吗？" 
               style="width: 100%; border: none; background: ${inputBg}; font-family: inherit; color: ${textColor}; font-size: 16px; outline: none; padding: 8px; border-radius: 6px;">
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <div style="border: 2px solid ${borderColor}; border-radius: 20px; padding: 10px 20px; background: ${cardBg}; box-shadow: 2px 2px 0 ${shadowColor};">
          Google
        </div>
        <div style="border: 2px solid ${borderColor}; border-radius: 20px; padding: 10px 20px; background: ${hoverBg}; box-shadow: 2px 2px 0 ${shadowColor};">
          GitHub
        </div>
        <div style="border: 2px solid ${borderColor}; border-radius: 20px; padding: 10px 20px; background: ${cardBg}; box-shadow: 2px 2px 0 ${shadowColor};">
          开发
        </div>
      </div>

      <div style="margin-top: 20px;">
        <button style="background: ${accentColor}; color: #fff; border: 2px solid ${borderColor};">Accent</button>
      </div>
    </div>
  `;
}

// Update preview when settings change
function updateThemePreview() {
  renderThemePreview();
}

// Save theme settings
async function saveThemeSettings() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  const settings = {
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
    shadowColor: document.getElementById('shadowColorInput').value,
    darkMode: {
      bgColor: document.getElementById('bgColorDarkInput').value,
      cardBg: document.getElementById('cardBgDarkInput').value,
      inputBg: document.getElementById('inputBgDarkInput').value,
      borderColor: document.getElementById('borderColorDarkInput').value,
      textColor: document.getElementById('textColorDarkInput').value,
      modalBg: document.getElementById('modalBgDarkInput').value,
      hoverBg: document.getElementById('hoverBgDarkInput').value,
      accentColor: document.getElementById('accentColorDarkInput').value,
      shadowColor: document.getElementById('shadowColorDarkInput').value
    }
  };

  // Apply to current page (respect current mode)
  applyThemeSettings(settings);
  applyCustomThemeForCurrentMode();

  // Save to database
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

  if (modeSettings.bgColor) document.documentElement.style.setProperty('--bg-color', modeSettings.bgColor);
  if (modeSettings.cardBg) document.documentElement.style.setProperty('--card-bg', modeSettings.cardBg);
  if (modeSettings.modalBg) document.documentElement.style.setProperty('--modal-bg', modeSettings.modalBg);
  if (modeSettings.inputBg) document.documentElement.style.setProperty('--input-bg', modeSettings.inputBg);
  if (modeSettings.borderColor) document.documentElement.style.setProperty('--border-color', modeSettings.borderColor);
  if (modeSettings.textColor) document.documentElement.style.setProperty('--text-color', modeSettings.textColor);
  if (modeSettings.hoverBg) document.documentElement.style.setProperty('--hover-bg', modeSettings.hoverBg);
  if (modeSettings.shadowColor) document.documentElement.style.setProperty('--shadow-color', modeSettings.shadowColor);
  if (modeSettings.accentColor) document.documentElement.style.setProperty('--accent-color', modeSettings.accentColor);

  if (s.fontEnglish || s.fontChinese) {
    document.body.style.fontFamily = `"${s.fontEnglish || 'Patrick Hand'}", "${s.fontChinese || '优设好身体'}", sans-serif`;
  }
}

function clearCustomThemeSettings() {
  document.documentElement.style.removeProperty('--bg-color');
  document.documentElement.style.removeProperty('--card-bg');
  document.documentElement.style.removeProperty('--border-color');
  document.documentElement.style.removeProperty('--text-color');
  document.documentElement.style.removeProperty('--modal-bg');
  document.documentElement.style.removeProperty('--input-bg');
  document.documentElement.style.removeProperty('--hover-bg');
  document.documentElement.style.removeProperty('--shadow-color');
  document.documentElement.style.removeProperty('--accent-color');
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
  document.body.style.fontFamily = `"${fontEnglish}", "${fontChinese}", sans-serif`;
}

async function resetThemeCustomization() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  clearCustomThemeSettings();
  clearCustomFontSettings();

  // Close modal first for better UX
  closeThemeModal();

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
window.resetThemeCustomization = resetThemeCustomization;
window.themeState = themeState;
