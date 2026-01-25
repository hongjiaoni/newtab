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

// Load categories from Supabase
async function loadCategories() {
  if (!supabase) {
    console.error('Supabase not initialized');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('wallpaper_categories')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Load categories error:', error);
      return;
    }

    if (data && data.length > 0) {
      wallpaperState.categories = data;
      wallpaperState.activeCategory = data[0].name;
      console.log('Loaded categories:', data);
    }
  } catch (err) {
    console.error('Load categories exception:', err);
  }
}

// Load wallpapers from Supabase
async function loadWallpapers() {
  if (!supabase) {
    console.error('Supabase not initialized');
    return;
  }

  try {
    wallpaperState.isLoading = true;

    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Load wallpapers error:', error);
      wallpaperState.isLoading = false;
      return;
    }

    if (data) {
      wallpaperState.wallpapers = data;
      console.log('Loaded wallpapers:', data.length);
    }

    wallpaperState.isLoading = false;
  } catch (error) {
    console.error('Load wallpapers exception:', error);
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

  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const memberTier = window.membershipState?.tier || 1;

  // Toggle upload container visibility and content
  if (uploadContainer) {
    if (wallpaperState.activeCategory === 'Custom') {
      uploadContainer.classList.remove('hidden');

      // Update upload button based on membership tier
      if (memberTier < 2) {
        // Basic member - show upgrade button
        uploadContainer.innerHTML = `
          <div style="text-align: center; padding: 30px;">
            <p style="margin-bottom: 15px; opacity: 0.8;">
              ${currentLocale === 'zh' ? '上传自定义壁纸需要高级会员' : 'Premium membership required for custom wallpapers'}
            </p>
            <button onclick="
              if (window.closeWallpaperModal) window.closeWallpaperModal();
              window.showUpgradeModal?.('wallpaper');
            " class="primary-btn sketchy-border"
              style="padding: 15px 30px; margin: 0 auto; display: block;">
              ${currentLocale === 'zh' ? '升级会员' : 'Upgrade Membership'}
            </button>
          </div>
        `;
      } else {
        // Premium/Super member - show upload button with quota
        supabase.from('upload_quota')
          .select('wallpaper_count, max_wallpapers')
          .eq('user_id', window.authState.user.id)
          .single()
          .then(({ data }) => {
            const count = data?.wallpaper_count || 0;
            const max = data?.max_wallpapers || 50;

            uploadContainer.innerHTML = `
              <input type="file" id="wallpaperFileInput" class="hidden" accept="image/*" onchange="handleUserWallpaperUpload(event)">
              <div style="text-align: center; padding: 20px;">
                <p style="margin-bottom: 10px; opacity: 0.7; font-size: 14px;">
                  ${currentLocale === 'zh' ? `已上传 ${count}/${max} 张` : `Uploaded ${count}/${max} images`}
                </p>
                <button id="uploadWallpaperBtn" class="primary-btn sketchy-border"
                  style="padding: 15px 30px; margin: 0 auto; display: block;"
                  onclick="document.getElementById('wallpaperFileInput').click()">
                  ${currentLocale === 'zh' ? '上传图片' : 'Upload Image'}
                </button>
              </div>
            `;
          });
      }
    } else {
      uploadContainer.classList.add('hidden');
    }
  }

  // Render Tabs
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
      <div class="wallpaper-item" onclick="selectWallpaper('${w.url}')">
        <img src="${w.url}" alt="${w.title || 'Wallpaper'}" title="${w.title || 'Wallpaper'}">
        <div class="wallpaper-title">${w.title || ''}</div>
      </div>
    `).join('');
  }
}

// User Wallpaper Upload Logic (Tier 2+ only)
async function handleUserWallpaperUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';

  // Check login
  if (!authState.isLoggedIn) {
    // Close wallpaper modal first
    if (window.closeWallpaperModal) {
      window.closeWallpaperModal();
    }

    // Show login modal directly on top
    setTimeout(() => {
      if (window.openGoogleSignInModal) {
        window.openGoogleSignInModal();
      }
    }, 300);
    return;
  }

  // Check membership tier
  if (!window.membershipState || window.membershipState.tier < 2) {
    // Close wallpaper modal first
    if (window.closeWallpaperModal) {
      window.closeWallpaperModal();
    }

    // Show upgrade modal immediately
    showNotification(
      currentLocale === 'zh' ? '上传壁纸需要高级会员' : 'Premium membership required for uploads',
      'error'
    );
    if (window.showUpgradeModal) {
      window.showUpgradeModal('wallpaper');
    }
    return;
  }

  // Check quota
  try {
    const { data: quotaData } = await supabase
      .from('upload_quota')
      .select('wallpaper_count, max_wallpapers')
      .eq('user_id', authState.user.id)
      .single();

    if (quotaData && quotaData.wallpaper_count >= quotaData.max_wallpapers) {
      showNotification(
        currentLocale === 'zh'
          ? `已达上传上限 (${quotaData.max_wallpapers}张)`
          : `Upload limit reached (${quotaData.max_wallpapers} images)`,
        'error'
      );
      return;
    }
  } catch (err) {
    console.log('No quota record yet, proceeding with upload');
  }

  // Validate file
  if (!file.type.startsWith('image/')) {
    showNotification(currentLocale === 'zh' ? '请选择图片文件' : 'Please select an image file', 'error');
    return;
  }

  // Check file size (max 5MB before compression)
  if (file.size > 5 * 1024 * 1024) {
    showNotification(currentLocale === 'zh' ? '图片太大，请选择小于5MB的图片' : 'Image too large, max 5MB', 'error');
    return;
  }

  try {
    showNotification(currentLocale === 'zh' ? '正在上传...' : 'Uploading...', 'info');

    // Compress image if needed
    let fileToUpload = file;
    if (file.size > 500 * 1024) { // Compress if > 500KB
      fileToUpload = await compressImage(file);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${authState.user.id}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('wallpapers')
      .upload(fileName, fileToUpload, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      showNotification(currentLocale === 'zh' ? '上传失败' : 'Upload failed', 'error');
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('wallpapers')
      .getPublicUrl(fileName);

    // Save to database
    const { error: dbError } = await supabase
      .from('wallpapers')
      .insert({
        title: file.name.split('.')[0],
        url: urlData.publicUrl,
        category: 'Custom',
        source: 'user',
        user_id: authState.user.id
      });

    if (dbError) {
      console.error('Database error:', dbError);
      showNotification(currentLocale === 'zh' ? '保存失败' : 'Save failed', 'error');
      return;
    }

    showNotification(currentLocale === 'zh' ? '上传成功！' : 'Upload successful!', 'success');

    // Reload wallpapers and re-render
    await loadWallpapers();
    renderWallpaperUI();

    // Reset file input
    event.target.value = '';
  } catch (err) {
    console.error('Upload exception:', err);
    showNotification(currentLocale === 'zh' ? '上传出错' : 'Upload error', 'error');
  }
}

// Compress image using canvas (8K support for premium members)
async function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max dimensions for 8K
        const MAX_WIDTH = 7680;  // 8K horizontal
        const MAX_HEIGHT = 4320; // 8K vertical

        // Only compress if exceeds 8K
        let needsResize = false;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
            needsResize = true;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
            needsResize = true;
          }
        }

        // If no resize needed, return original file
        if (!needsResize) {
          resolve(file);
          return;
        }

        // Resize and compress
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.92); // Higher quality for 8K
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
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
