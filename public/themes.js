// ===== Theme Customization Module =====

const themeState = {
  currentTheme: 'handdrawn', // handdrawn, minimal, modern, glassmorphism
  customSettings: {
    fontChinese: '优设好身体',
    fontEnglish: 'Patrick Hand',
    borderColor: '#444444',
    textColor: '#333333',
    darkMode: {
      borderColor: '#ecf0f1',
      textColor: '#ecf0f1'
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
  const borderColor = previewMode === 'light'
    ? (document.getElementById('borderColorInput')?.value || themeState.customSettings.borderColor)
    : (document.getElementById('borderColorDarkInput')?.value || themeState.customSettings.darkMode.borderColor);
  const textColor = previewMode === 'light'
    ? (document.getElementById('textColorInput')?.value || themeState.customSettings.textColor)
    : (document.getElementById('textColorDarkInput')?.value || themeState.customSettings.darkMode.textColor);

  const bgColor = previewMode === 'light' ? '#f9f9f9' : '#1e1e1e';
  const cardBg = previewMode === 'light' ? '#ffffff' : '#2c2c2c';

  preview.style.backgroundColor = bgColor;
  preview.style.color = textColor;
  preview.innerHTML = `
    <div style="font-family: '${fontEnglish}', '${fontChinese}', sans-serif;">
      <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px;">12:34</div>
      <div style="font-size: 18px; margin-bottom: 30px;">2026年1月25日 星期六</div>
      
      <div style="border: 2px solid ${borderColor}; border-radius: 12px; padding: 15px; background: ${cardBg}; margin-bottom: 15px;">
        <input type="text" placeholder="想要搜点什么吗？" 
               style="width: 100%; border: none; background: transparent; font-family: inherit; color: ${textColor}; font-size: 16px; outline: none;">
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <div style="border: 2px solid ${borderColor}; border-radius: 20px; padding: 10px 20px; background: ${cardBg};">
          Google
        </div>
        <div style="border: 2px solid ${borderColor}; border-radius: 20px; padding: 10px 20px; background: ${cardBg};">
          GitHub
        </div>
        <div style="border: 2px solid ${borderColor}; border-radius: 20px; padding: 10px 20px; background: ${cardBg};">
          开发
        </div>
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
    borderColor: document.getElementById('borderColorInput').value,
    textColor: document.getElementById('textColorInput').value,
    darkMode: {
      borderColor: document.getElementById('borderColorDarkInput').value,
      textColor: document.getElementById('textColorDarkInput').value
    }
  };

  // Apply to current page
  applyThemeSettings(settings);

  // Save to database
  if (window.saveThemeSettings) {
    await window.saveThemeSettings(settings);
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

  // Update CSS variables
  document.documentElement.style.setProperty('--border-color', settings.borderColor);
  document.documentElement.style.setProperty('--text-color', settings.textColor);

  // Update font family
  document.body.style.fontFamily = `"${settings.fontEnglish}", "${settings.fontChinese}", sans-serif`;

  // Store in state for dark mode toggle
  window.themeState = themeState;
}

// Close theme modal
function closeThemeModal() {
  document.getElementById('themeCustomizationModal')?.classList.add('hidden');
}

// Export functions
window.openThemeCustomization = openThemeCustomization;
window.closeThemeModal = closeThemeModal;
window.applyThemeSettings = applyThemeSettings;
window.themeState = themeState;
