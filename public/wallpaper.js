// ===== Wallpaper Management Module =====

const wallpaperState = {
  selectedWallpaper: localStorage.getItem('selectedWallpaper') || null,
  pendingWallpaper: undefined,
  baseWallpaper: null,
  guestDefaultWallpaper: null,
  activeCategory: null,
  categories: [],
  wallpapers: [],
  isLoading: false,
  customAddOpen: false,
  customAddMode: 'upload' // 'upload' | 'link'
};

window.wallpaperState = wallpaperState;

const MAX_WALLPAPER_UPLOAD_BYTES = 15 * 1024 * 1024;
const WALLPAPER_UPLOAD_COOLDOWN_MS = 10 * 1000;
const LAST_WALLPAPER_UPLOAD_AT_KEY = 'wallpaper_last_upload_at';

// Initialize wallpaper system
async function initializeWallpaper() {
  await loadCategories();
  await loadWallpapers();

  const isLoggedIn = !!window.authState?.isLoggedIn;
  if (!isLoggedIn) {
    wallpaperState.selectedWallpaper = null;
  }

  // Apply saved selection
  if (wallpaperState.selectedWallpaper) {
    applyWallpaper(wallpaperState.selectedWallpaper);
    return;
  }

  if (!window.authState?.isLoggedIn) {
    const guestDailyWallpaper = wallpaperState.wallpapers.find((item) => item.category === 'daily' || item.category === '每日推荐')
      || wallpaperState.wallpapers[0];

    if (guestDailyWallpaper?.url) {
      wallpaperState.guestDefaultWallpaper = guestDailyWallpaper.url;
      wallpaperState.selectedWallpaper = guestDailyWallpaper.url;
      previewWallpaper(guestDailyWallpaper.url);
    }
  }
}

function previewWallpaper(wallpaperId) {
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

    let query = supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false });

    const userId = window.authState?.user?.id;
    if (userId) {
      // Custom wallpapers are only visible to their uploader
      query = query.or(`category.neq.Custom,user_id.eq.${userId}`);
    } else {
      query = query.neq('category', 'Custom');
    }

    const { data, error } = await query;

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
function applyWallpaper(wallpaperId, options = {}) {
  const shouldSync = options.sync !== false;
  const syncWallpaperSelection = () => {
    if (!shouldSync || !window.authState || !window.authState.isLoggedIn) return;
    if (window.saveUserDataToBackend) {
      window.saveUserDataToBackend(true);
    } else if (window.markHomeConfigUpdated) {
      window.markHomeConfigUpdated();
    }
  };

  if (!wallpaperId) {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '';
    wallpaperState.selectedWallpaper = null;
    localStorage.removeItem('selectedWallpaper');

    syncWallpaperSelection();
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

  syncWallpaperSelection();
}

// Open wallpaper selection modal
function openWallpaperModal() {
  if (window.hideFloatingLayer) {
    window.hideFloatingLayer('settingsMenu');
  } else {
    document.getElementById('settingsMenu')?.classList.add('hidden');
  }
  const modal = document.getElementById('wallpaperModal');
  if (modal) {
    wallpaperState.baseWallpaper = wallpaperState.selectedWallpaper;
    wallpaperState.pendingWallpaper = wallpaperState.selectedWallpaper;
    if (window.showFloatingLayer) {
      window.showFloatingLayer(modal);
    } else {
      modal.classList.remove('hidden');
    }
    renderWallpaperUI();
  }
}

// Close wallpaper selection modal
function closeWallpaperModal() {
  const modal = document.getElementById('wallpaperModal');
  if (modal) {
    // Revert preview if user didn't save
    if (wallpaperState.pendingWallpaper !== undefined && wallpaperState.pendingWallpaper !== wallpaperState.selectedWallpaper) {
      previewWallpaper(wallpaperState.selectedWallpaper);
    }
    wallpaperState.pendingWallpaper = undefined;
    wallpaperState.baseWallpaper = null;
    if (window.hideFloatingLayer) {
      window.hideFloatingLayer(modal);
    } else {
      modal.classList.add('hidden');
    }
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
  const isLoggedIn = !!(window.authState && window.authState.isLoggedIn);

  // Toggle upload container visibility and content
  if (uploadContainer) {
    if (wallpaperState.activeCategory === 'Custom') {
      uploadContainer.classList.remove('hidden');

      const t = (key) => (typeof i18n !== 'undefined' ? i18n.t(key) : key);

      // Update upload button based on membership tier
      if (memberTier < 2) {
        if (!isLoggedIn) {
          uploadContainer.innerHTML = `
            <div style="text-align: center; padding: 24px 30px 10px;">
              <p style="margin-bottom: 15px; opacity: 0.8;">
                ${currentLocale === 'zh' ? '登录后可添加自定义壁纸' : 'Login to add custom wallpapers'}
              </p>
              <button onclick="
                if (window.closeWallpaperModal) window.closeWallpaperModal();
                window.openGoogleSignInModal?.();
              " class="primary-btn sketchy-border"
                style="padding: 15px 30px; margin: 0 auto; display: block;">
                ${currentLocale === 'zh' ? '立即登录' : 'Login'}
              </button>
            </div>
          `;
        } else {
          uploadContainer.innerHTML = `
            <div style="text-align: center; padding: 24px 30px 10px;">
              <p style="margin-bottom: 15px; opacity: 0.8;">
                ${currentLocale === 'zh' ? '自定义壁纸需要高级会员' : 'Premium membership required for custom wallpapers'}
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
        }
      } else {
        // Premium/Super member - show add flow with quota
        supabase
          .from('upload_quota')
          .select('wallpaper_count, max_wallpapers')
          .eq('user_id', window.authState.user.id)
          .single()
          .then(({ data }) => {
            const count = data?.wallpaper_count || 0;
            const max = data?.max_wallpapers || 50;

            uploadContainer.innerHTML = `
              <div style="text-align: center; padding: 12px 20px 0;">
                <p style="margin: 0 0 10px; opacity: 0.7; font-size: 14px;">
                  ${currentLocale === 'zh' ? `已添加 ${count}/${max} 张` : `Added ${count}/${max} images`}
                </p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; align-items: center;">
                  <input type="text" id="customWallpaperUrlInput" class="modal-input"
                    placeholder="${t('pasteImageUrl')}" style="max-width: 360px; margin-bottom: 0;">
                  <button class="primary-btn sketchy-border" onclick="uploadCustomWallpaperFromUrl()"
                    style="padding: 10px 18px;">
                    ${t('confirmUpload')}
                  </button>
                  <input type="file" id="wallpaperFileInput" class="hidden" accept="image/*" onchange="handleUserWallpaperUpload(event)">
                  <button class="cancel-btn sketchy-border" onclick="document.getElementById('wallpaperFileInput').click()"
                    style="padding: 10px 18px;">
                    ${t('localUpload')}
                  </button>
                </div>
              </div>
            `;
          })
          .catch(() => {
            uploadContainer.innerHTML = `
              <div style="text-align: center; padding: 12px 20px 0;">
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; align-items: center;">
                  <input type="text" id="customWallpaperUrlInput" class="modal-input"
                    placeholder="${t('pasteImageUrl')}" style="max-width: 360px; margin-bottom: 0;">
                  <button class="primary-btn sketchy-border" onclick="uploadCustomWallpaperFromUrl()"
                    style="padding: 10px 18px;">
                    ${t('confirmUpload')}
                  </button>
                  <input type="file" id="wallpaperFileInput" class="hidden" accept="image/*" onchange="handleUserWallpaperUpload(event)">
                  <button class="cancel-btn sketchy-border" onclick="document.getElementById('wallpaperFileInput').click()"
                    style="padding: 10px 18px;">
                    ${t('localUpload')}
                  </button>
                </div>
              </div>
            `;
          });
      }
    } else {
      uploadContainer.classList.add('hidden');
    }
  }

  // Render Tabs - filter out Custom category
  const filteredCategories = wallpaperState.categories.filter(cat => cat.name !== 'Custom');
  tabsContainer.innerHTML = filteredCategories.map(cat => `
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
    const currentSelected = wallpaperState.pendingWallpaper !== undefined
      ? wallpaperState.pendingWallpaper
      : wallpaperState.selectedWallpaper;
    gridContainer.innerHTML = filteredWallpapers.map(w => `
      <div class="wallpaper-item ${currentSelected === w.url ? 'selected' : ''}" onclick="selectWallpaper('${w.url}')">
        <img src="${w.url}" alt="Wallpaper" title="Wallpaper">
      </div>
    `).join('');
  }
}

function toggleCustomWallpaperAdd() {
  wallpaperState.customAddOpen = !wallpaperState.customAddOpen;
  renderWallpaperUI();
}

function setCustomWallpaperAddMode(mode) {
  wallpaperState.customAddMode = mode;
  renderWallpaperUI();
}

async function uploadCustomWallpaperFromUrl() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const input = document.getElementById('customWallpaperUrlInput');
  const url = (input?.value || '').trim();

  if (!url || !/^https?:\/\//i.test(url)) {
    showNotification(typeof i18n !== 'undefined' ? i18n.t('invalidImageUrl') : (currentLocale === 'zh' ? '请输入正确的图片链接' : 'Invalid image url'), 'error');
    return;
  }

  if (!window.authState || !window.authState.isLoggedIn) {
    showNotification(currentLocale === 'zh' ? '请先登录' : 'Please login first', 'error');
    window.openGoogleSignInModal?.();
    return;
  }

  if (!window.membershipState || window.membershipState.tier < 1) {
    showNotification(currentLocale === 'zh' ? '上传壁纸需要高级会员' : 'Premium membership required for uploads', 'error');
    window.showUpgradeModal?.('wallpaper');
    return;
  }

  // Check quota
  try {
    const { data: quotaData, error: quotaError } = await supabase
      .from('upload_quota')
      .select('wallpaper_count, max_wallpapers')
      .eq('user_id', authState.user.id)
      .single();

    if (!quotaError && quotaData && quotaData.wallpaper_count >= quotaData.max_wallpapers) {
      showNotification(
        currentLocale === 'zh'
          ? `已达上传上限 (${quotaData.max_wallpapers}张)`
          : `Upload limit reached (${quotaData.max_wallpapers} images)`,
        'error'
      );
      return;
    }
  } catch (_err) {
    // no quota record yet
  }

  const lastUploadAt = Number(localStorage.getItem(LAST_WALLPAPER_UPLOAD_AT_KEY) || 0);
  if (lastUploadAt && Date.now() - lastUploadAt < WALLPAPER_UPLOAD_COOLDOWN_MS) {
    showNotification(
      currentLocale === 'zh' ? '操作太频繁，请稍后再试' : 'Too many requests, please try again later',
      'error'
    );
    return;
  }

  try {
    showNotification(currentLocale === 'zh' ? '正在拉取图片...' : 'Fetching image...', 'info');

    const res = await fetch(url);
    if (!res.ok) {
      showNotification(currentLocale === 'zh' ? '图片拉取失败' : 'Failed to fetch image', 'error');
      return;
    }

    const contentType = String(res.headers.get('content-type') || '').toLowerCase();
    const blob = await res.blob();
    const effectiveType = (contentType && contentType.includes('image/')) ? contentType : (blob.type || contentType);

    if (!String(effectiveType || '').startsWith('image/')) {
      showNotification(currentLocale === 'zh' ? '链接不是图片资源' : 'URL is not an image', 'error');
      return;
    }

    if (blob.size > MAX_WALLPAPER_UPLOAD_BYTES) {
      showNotification(
        currentLocale === 'zh' ? '图片太大，请选择小于15MB的图片' : 'Image too large, max 15MB',
        'error'
      );
      return;
    }

    localStorage.setItem(LAST_WALLPAPER_UPLOAD_AT_KEY, String(Date.now()));

    let ext = '';
    if (effectiveType === 'image/jpeg' || effectiveType === 'image/jpg') ext = 'jpg';
    else if (effectiveType === 'image/png') ext = 'png';
    else if (effectiveType === 'image/webp') ext = 'webp';
    else if (effectiveType === 'image/gif') ext = 'gif';
    else if (effectiveType === 'image/bmp') ext = 'bmp';
    else if (effectiveType === 'image/svg+xml') ext = 'svg';
    else ext = 'jpg';

    const remoteFile = new File([blob], `wallpaper.${ext}`, { type: effectiveType || 'image/jpeg' });

    showNotification(currentLocale === 'zh' ? '正在上传...' : 'Uploading...', 'info');

    let fileToUpload = remoteFile;
    if (remoteFile.size > 500 * 1024) {
      fileToUpload = await compressImage(remoteFile);
    }

    const fileName = `${authState.user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('wallpapers')
      .upload(fileName, fileToUpload, {
        cacheControl: '3600',
        contentType: fileToUpload.type || effectiveType || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload by url error:', uploadError);
      localStorage.removeItem(LAST_WALLPAPER_UPLOAD_AT_KEY);
      showNotification(
        currentLocale === 'zh'
          ? `上传失败：${uploadError.message || '请检查存储桶/权限配置'}`
          : `Upload failed: ${uploadError.message || 'Please check bucket/policies'}`,
        'error'
      );
      return;
    }

    const { data: urlData } = supabase.storage
      .from('wallpapers')
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('wallpapers')
      .insert({
        url: urlData.publicUrl,
        category: 'Custom',
        source: 'user',
        user_id: authState.user.id
      });

    if (dbError) {
      console.error('Database error:', dbError);
      localStorage.removeItem(LAST_WALLPAPER_UPLOAD_AT_KEY);
      showNotification(
        currentLocale === 'zh'
          ? `保存失败：${dbError.message || '请检查数据库权限'}`
          : `Save failed: ${dbError.message || 'Please check database RLS policy'}`,
        'error'
      );
      return;
    }

    await loadWallpapers();
    wallpaperState.pendingWallpaper = urlData.publicUrl;
    previewWallpaper(urlData.publicUrl);
    renderWallpaperUI();
    if (input) input.value = '';
    showNotification(currentLocale === 'zh' ? '上传成功！' : 'Upload successful!', 'success');
  } catch (err) {
    console.error('Upload by url exception:', err);
    localStorage.removeItem(LAST_WALLPAPER_UPLOAD_AT_KEY);
    showNotification(
      currentLocale === 'zh'
        ? `上传出错：${err?.message || '请稍后重试'}`
        : `Upload error: ${err?.message || 'Please try again later'}`,
      'error'
    );
  }
}

async function addCustomWallpaperByUrl() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const input = document.getElementById('customWallpaperUrlInput');
  const url = (input?.value || '').trim();

  if (!url || !/^https?:\/\//i.test(url)) {
    showNotification(typeof i18n !== 'undefined' ? i18n.t('invalidImageUrl') : (currentLocale === 'zh' ? '请输入正确的图片链接' : 'Invalid image url'), 'error');
    return;
  }

  if (!window.authState || !window.authState.isLoggedIn) {
    showNotification(currentLocale === 'zh' ? '请先登录' : 'Please login first', 'error');
    window.openGoogleSignInModal?.();
    return;
  }

  if (!window.membershipState || window.membershipState.tier < 1) {
    showNotification(currentLocale === 'zh' ? '自定义壁纸需要高级会员' : 'Premium membership required', 'error');
    window.showUpgradeModal?.('wallpaper');
    return;
  }

  try {
    const { data: quotaData, error: quotaError } = await supabase
      .from('upload_quota')
      .select('wallpaper_count, max_wallpapers')
      .eq('user_id', authState.user.id)
      .single();

    if (!quotaError && quotaData && quotaData.wallpaper_count >= quotaData.max_wallpapers) {
      showNotification(
        currentLocale === 'zh'
          ? `已达上传上限 (${quotaData.max_wallpapers}张)`
          : `Upload limit reached (${quotaData.max_wallpapers} images)`,
        'error'
      );
      return;
    }
  } catch (err) {
    // no quota record yet
  }

  try {
    showNotification(currentLocale === 'zh' ? '正在添加...' : 'Adding...', 'info');

    const { error: dbError } = await supabase
      .from('wallpapers')
      .insert({
        url,
        category: 'Custom',
        source: 'user',
        user_id: authState.user.id
      });

    if (dbError) {
      console.error('Add link wallpaper error:', dbError);
      showNotification(
        currentLocale === 'zh' ? `添加失败：${dbError.message || ''}` : `Add failed: ${dbError.message || ''}`,
        'error'
      );
      return;
    }

    // Apply immediately and refresh list
    applyWallpaper(url);
    await loadWallpapers();
    renderWallpaperUI();
    if (input) input.value = '';
    showNotification(currentLocale === 'zh' ? '已添加并应用' : 'Added and applied', 'success');
  } catch (err) {
    console.error('Add link wallpaper exception:', err);
    showNotification(currentLocale === 'zh' ? '添加出错' : 'Add error', 'error');
  }
}

window.toggleCustomWallpaperAdd = toggleCustomWallpaperAdd;
window.setCustomWallpaperAddMode = setCustomWallpaperAddMode;
window.addCustomWallpaperByUrl = addCustomWallpaperByUrl;
window.uploadCustomWallpaperFromUrl = uploadCustomWallpaperFromUrl;

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
  if (!window.membershipState || window.membershipState.tier < 1) {
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
    const { data: quotaData, error: quotaError } = await supabase
      .from('upload_quota')
      .select('wallpaper_count, max_wallpapers')
      .eq('user_id', authState.user.id)
      .single();

    if (!quotaError && quotaData && quotaData.wallpaper_count >= quotaData.max_wallpapers) {
      showNotification(
        currentLocale === 'zh'
          ? `已达上传上限 (${quotaData.max_wallpapers}张)`
          : `Upload limit reached (${quotaData.max_wallpapers} images)`,
        'error'
      );
      event.target.value = '';
      return;
    }
  } catch (err) {
    console.log('No quota record yet, proceeding with upload');
  }

  // Validate file
  if (!file.type.startsWith('image/')) {
    showNotification(currentLocale === 'zh' ? '请选择图片文件' : 'Please select an image file', 'error');
    event.target.value = '';
    return;
  }

  const lastUploadAt = Number(localStorage.getItem(LAST_WALLPAPER_UPLOAD_AT_KEY) || 0);
  if (lastUploadAt && Date.now() - lastUploadAt < WALLPAPER_UPLOAD_COOLDOWN_MS) {
    showNotification(
      currentLocale === 'zh' ? '操作太频繁，请稍后再试' : 'Too many requests, please try again later',
      'error'
    );
    event.target.value = '';
    return;
  }

  if (file.size > MAX_WALLPAPER_UPLOAD_BYTES) {
    showNotification(
      currentLocale === 'zh' ? '图片太大，请选择小于15MB的图片' : 'Image too large, max 15MB',
      'error'
    );
    event.target.value = '';
    return;
  }

  try {
    showNotification(currentLocale === 'zh' ? '正在上传...' : 'Uploading...', 'info');
    localStorage.setItem(LAST_WALLPAPER_UPLOAD_AT_KEY, String(Date.now()));

    // Compress image if needed
    let fileToUpload = file;
    if (file.size > 500 * 1024) { // Compress if > 500KB
      fileToUpload = await compressImage(file);
    }

    // Generate unique filename
    const originalExt = file.name.split('.').pop();
    const fileExt = (fileToUpload.type === 'image/jpeg' || fileToUpload.type === 'image/jpg') ? 'jpg' : originalExt;
    const fileName = `${authState.user.id}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('wallpapers')
      .upload(fileName, fileToUpload, {
        cacheControl: '3600',
        contentType: fileToUpload.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      localStorage.removeItem(LAST_WALLPAPER_UPLOAD_AT_KEY);
      showNotification(
        currentLocale === 'zh'
          ? `上传失败：${uploadError.message || '请检查存储桶/权限配置'}`
          : `Upload failed: ${uploadError.message || 'Please check bucket/policies'}`,
        'error'
      );
      event.target.value = '';
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
        url: urlData.publicUrl,
        category: 'Custom',
        source: 'user',
        user_id: authState.user.id
      });

    if (dbError) {
      console.error('Database error:', dbError);
      localStorage.removeItem(LAST_WALLPAPER_UPLOAD_AT_KEY);
      showNotification(
        currentLocale === 'zh'
          ? `保存失败：${dbError.message || '请检查数据库权限'}`
          : `Save failed: ${dbError.message || 'Please check database RLS policy'}`,
        'error'
      );
      event.target.value = '';
      return;
    }

    showNotification(currentLocale === 'zh' ? '上传成功！' : 'Upload successful!', 'success');

    // Reload wallpapers and re-render
    await loadWallpapers();
    wallpaperState.pendingWallpaper = urlData.publicUrl;
    previewWallpaper(urlData.publicUrl);
    renderWallpaperUI();

    // Reset file input
    event.target.value = '';
  } catch (err) {
    console.error('Upload exception:', err);
    localStorage.removeItem(LAST_WALLPAPER_UPLOAD_AT_KEY);
    showNotification(
      currentLocale === 'zh'
        ? `上传出错：${err?.message || '请稍后重试'}`
        : `Upload error: ${err?.message || 'Please try again later'}`,
      'error'
    );
    event.target.value = '';
  }
}

function applyCustomWallpaperUrl() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const input = document.getElementById('customWallpaperUrlInput');
  const url = (input?.value || '').trim();

  if (!url || !/^https?:\/\//i.test(url)) {
    showNotification(
      typeof i18n !== 'undefined' ? i18n.t('invalidImageUrl') : (currentLocale === 'zh' ? '请输入正确的图片链接' : 'Invalid image url'),
      'error'
    );
    return;
  }

  applyWallpaper(url);
  closeWallpaperModal();
  showNotification(currentLocale === 'zh' ? '壁纸已更换' : 'Wallpaper changed', 'success');
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
  wallpaperState.pendingWallpaper = wallpaperId;
  previewWallpaper(wallpaperId);
  renderWallpaperUI();
}

function restoreDefaultWallpaper() {
  wallpaperState.pendingWallpaper = null;
  previewWallpaper(null);
  renderWallpaperUI();
}

// Setup wallpaper event listeners
function setupWallpaperEventListeners() {
  const wallpaperBtn = document.getElementById('wallpaperBtn');
  const closeWallpaperModalBtn = document.getElementById('closeWallpaperModal');
  const wallpaperModal = document.getElementById('wallpaperModal');
  const restoreBtn = document.getElementById('restoreDefaultWallpaper');
  const saveBtn = document.getElementById('saveWallpaperSelection');

  if (wallpaperBtn) wallpaperBtn.addEventListener('click', openWallpaperModal);
  if (closeWallpaperModalBtn) closeWallpaperModalBtn.addEventListener('click', closeWallpaperModal);
  if (restoreBtn) restoreBtn.addEventListener('click', restoreDefaultWallpaper);
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
      const next = wallpaperState.pendingWallpaper;

      if (!window.authState || !window.authState.isLoggedIn) {
        window.requireLoginForPersistentChange?.();
        return;
      }

      applyWallpaper(next || null);
      wallpaperState.pendingWallpaper = undefined;
      wallpaperState.baseWallpaper = null;

      closeWallpaperModal();
      showNotification(typeof i18n !== 'undefined' ? i18n.t('wallpaperChanged') : (currentLocale === 'zh' ? '壁纸已更换' : 'Wallpaper changed'), 'success');
    });
  }

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
