// ===== Wallpaper Management Module =====

const wallpaperState = {
  selectedWallpaper: localStorage.getItem('selectedWallpaper') || null,
  activeCategory: null,
  categories: [],
  wallpapers: [],
  isLoading: false
};

// Initialize wallpaper system
async function initializeWallpaper() {
  await loadCategories();
  await loadWallpapers();

  // Apply saved selection
  if (wallpaperState.selectedWallpaper) {
    applyWallpaper(wallpaperState.selectedWallpaper);
  }
}

// Load categories
async function loadCategories() {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/categories`);
    const data = await response.json();
    if (data.success) {
      wallpaperState.categories = data.categories;
      if (data.categories.length > 0) {
        wallpaperState.activeCategory = data.categories[0].name;
      }
    }
  } catch (err) {
    console.error('Load categories error:', err);
  }
}

// Load wallpapers from backend
async function loadWallpapers() {
  try {
    wallpaperState.isLoading = true;
    const response = await fetch(`${API_CONFIG.baseURL}/wallpapers`);
    const data = await response.json();

    if (data.success && data.wallpapers) {
      wallpaperState.wallpapers = data.wallpapers;
    }
    wallpaperState.isLoading = false;
  } catch (error) {
    console.error('Load wallpapers error:', error);
    wallpaperState.isLoading = false;
  }
}

// Apply wallpaper to page
function applyWallpaper(wallpaperId) {
  if (!wallpaperId) {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '';
    return;
  }

  if (wallpaperId.startsWith('#') || wallpaperId.startsWith('rgb')) {
    document.body.style.backgroundColor = wallpaperId;
    document.body.style.backgroundImage = '';
  } else {
    document.body.style.backgroundImage = `url('${wallpaperId}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }

  wallpaperState.selectedWallpaper = wallpaperId;
  localStorage.setItem('selectedWallpaper', wallpaperId);

  if (typeof authState !== 'undefined' && authState.isLoggedIn) {
    saveWallpaperToBackend(wallpaperId);
  }
}

// Save wallpaper to backend
async function saveWallpaperToBackend(wallpaperId) {
  if (!authState.isLoggedIn || !authState.token) return;
  try {
    const userData = {
      sites: typeof state !== 'undefined' ? state.sites : [],
      tags: state.tags,
      tagOrder: state.tagOrder,
      siteOrder: state.siteOrder,
      viewMode: state.viewMode,
      wallpaper: wallpaperId
    };

    await fetch(`${API_CONFIG.baseURL}/user/data`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authState.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
  } catch (error) {
    console.error('Save wallpaper observer error:', error);
  }
}

// Open wallpaper selection modal
function openWallpaperModal() {
  const modal = document.getElementById('wallpaperModal');
  if (modal) {
    modal.classList.remove('hidden');
    renderWallpaperUI();
  }
}

// Close wallpaper selection modal
function closeWallpaperModal() {
  const modal = document.getElementById('wallpaperModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Switch wallpaper tab
function switchWallpaperTab(categoryName) {
  wallpaperState.activeCategory = categoryName;
  renderWallpaperUI();
}

// Render wallpaper UI (Tabs and Grid)
function renderWallpaperUI() {
  const tabsContainer = document.getElementById('wallpaperTabs');
  const gridContainer = document.getElementById('wallpaperGrid');
  const uploadContainer = document.getElementById('wallpaperUploadContainer');

  if (!tabsContainer || !gridContainer) return;

  // Toggle upload container visibility
  if (uploadContainer) {
    if (wallpaperState.activeCategory === 'Custom') {
      uploadContainer.classList.remove('hidden');
    } else {
      uploadContainer.classList.add('hidden');
    }
  }

  // Render Tabs
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  tabsContainer.innerHTML = wallpaperState.categories.map(cat => `
    <button class="wallpaper-tab ${wallpaperState.activeCategory === cat.name ? 'active' : ''}" 
            onclick="switchWallpaperTab('${cat.name}')">
      <span>${currentLocale === 'zh' ? i18n.t(cat.name.toLowerCase()) : (cat.name_en || cat.name)}</span>
    </button>
  `).join('');

  // Filter wallpapers
  const filteredWallpapers = wallpaperState.wallpapers.filter(w => {
    if (w.category === wallpaperState.activeCategory) return true;
    if (wallpaperState.activeCategory === '风景' && w.category === 'landscape') return true;
    if (wallpaperState.activeCategory === '每日推荐' && w.category === 'daily') return true;
    return false;
  });

  // Render Grid
  if (filteredWallpapers.length === 0 && !uploadContainer?.classList.contains('hidden') === false) {
    gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-color); opacity: 0.6;">
        ${currentLocale === 'zh' ? '该分类下暂无壁纸' : 'No wallpapers in this category'}
    </div>`;
  } else {
    gridContainer.innerHTML = filteredWallpapers.map(w => `
      <div class="wallpaper-item" onclick="selectWallpaper('${w.imageUrl}')">
        <img src="${w.imageUrl}" alt="${w.title}" title="${w.title}">
        <div class="wallpaper-title">${w.title}</div>
      </div>
    `).join('');
  }
}

// User Wallpaper Upload Logic
async function handleUserWallpaperUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!authState.isLoggedIn) {
    showNotification(i18n.currentLocale === 'zh' ? '请先登录' : 'Please login first', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_CONFIG.baseURL}/wallpapers/user-upload`, {
      method: 'POST',
      headers: {
        'x-user-id': authState.user.id
      },
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      showNotification(i18n.currentLocale === 'zh' ? '上传成功' : 'Upload successful', 'success');
      // Reload wallpapers and re-render
      await loadWallpapers();
      renderWallpaperUI();
    } else {
      showNotification(data.error || 'Upload failed', 'error');
    }
  } catch (err) {
    console.error('User upload error:', err);
    showNotification('Upload failed', 'error');
  }
}

// Select wallpaper
function selectWallpaper(wallpaperId) {
  applyWallpaper(wallpaperId);
  closeWallpaperModal();
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  showNotification(currentLocale === 'zh' ? '壁纸已更换' : 'Wallpaper changed', 'success');
}

function restoreDefaultWallpaper() {
  localStorage.removeItem('selectedWallpaper');
  wallpaperState.selectedWallpaper = null;
  document.body.style.backgroundImage = '';
  document.body.style.backgroundColor = '';

  if (typeof authState !== 'undefined' && authState.isLoggedIn) {
    saveWallpaperToBackend(null);
  }

  closeWallpaperModal();
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  showNotification(currentLocale === 'zh' ? '已恢复默认壁纸' : 'Restored default wallpaper', 'success');
}

// Setup wallpaper event listeners
function setupWallpaperEventListeners() {
  const wallpaperBtn = document.getElementById('wallpaperBtn');
  const closeWallpaperModalBtn = document.getElementById('closeWallpaperModal');
  const wallpaperModal = document.getElementById('wallpaperModal');
  const restoreBtn = document.getElementById('restoreDefaultWallpaper');

  if (wallpaperBtn) wallpaperBtn.addEventListener('click', openWallpaperModal);
  if (closeWallpaperModalBtn) closeWallpaperModalBtn.addEventListener('click', closeWallpaperModal);
  if (restoreBtn) restoreBtn.addEventListener('click', restoreDefaultWallpaper);

  if (wallpaperModal) {
    wallpaperModal.addEventListener('click', (e) => {
      if (e.target === wallpaperModal) closeWallpaperModal();
    });
  }

  const uploadBtn = document.getElementById('uploadWallpaperBtn');
  const fileInput = document.getElementById('wallpaperFileInput');
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleUserWallpaperUpload);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setupWallpaperEventListeners();
  initializeWallpaper();
});
