// ===== Authentication Module (Supabase) =====

const authState = {
  isLoggedIn: false,
  user: null,
  profile: null // Stores extra profile data
};

// Export authState to window for other modules
window.authState = authState;

const AUTH_LAST_LOGIN_AT_KEY = 'auth_last_login_at';
const AUTH_PENDING_LOGIN_AT_KEY = 'auth_pending_login_at';
const AUTH_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

function getOAuthRedirectUrl() {
  // Extension takes priority
  if (typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION && EXTENSION_ORIGIN) {
    return EXTENSION_ORIGIN + '/';
  }
  if (typeof OAUTH_REDIRECT_URL === 'string' && OAUTH_REDIRECT_URL.trim()) {
    return OAUTH_REDIRECT_URL.trim();
  }
  if (typeof SITE_URL === 'string' && SITE_URL.trim()) {
    return SITE_URL.trim();
  }
  return window.location.origin;
}

function getHomeRedirectUrl() {
  const base = getOAuthRedirectUrl();
  try {
    return new URL('/', base).toString();
  } catch (_err) {
    return window.location.origin + '/';
  }
}

function cleanUrlToHome() {
  // In extension mode, the URL is already at chrome-extension://<id>/index.html.
  // Changing it via replaceState (e.g. to chrome-extension://<id>/) causes
  // "file not found" on page refresh since Chrome doesn't auto-resolve
  // extension origin directory paths to index.html.
  if (typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION) return;

  try {
    const base = getOAuthRedirectUrl();
    const home = new URL('/', base);
    const current = new URL(window.location.href);
    const lang = current.searchParams.get('lang');
    if (lang) home.searchParams.set('lang', lang);

    const desired = home.toString();
    if (window.location.href !== desired) {
      window.history.replaceState({}, document.title, desired);
    }
  } catch (_err) {
    // no-op
  }
}

function getUserNickname() {
  const meta = authState.user?.user_metadata || {};
  const given = typeof meta.given_name === 'string' ? meta.given_name.trim() : '';
  if (given) return given;

  const full = typeof meta.full_name === 'string' ? meta.full_name.trim() : '';
  if (full) return full.split(/\s+/)[0];

  const name = typeof meta.name === 'string' ? meta.name.trim() : '';
  if (name) return name.split(/\s+/)[0];

  return (typeof i18n !== 'undefined' && i18n.currentLocale === 'en') ? 'User' : '用户';
}

// Ensure user profile exists in Supabase (create if not exists)
async function ensureProfileExists(user) {
  if (!supabase || !user) return;

  try {
    // First check if profile exists
    const { data: existing, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (existing) {
      return;
    }

    // Profile doesn't exist, create it
    if (fetchError && fetchError.code === 'PGRST116') {

      const meta = user.user_metadata || {};
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          full_name: meta.full_name || meta.name || '',
          avatar_url: meta.avatar_url || meta.picture || '',
          membership_tier: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Failed to create profile:', insertError);
      }

      // Ensure default home settings row exists
      const { error: settingsError } = await supabase
        .from('user_home_settings')
        .upsert({
          user_id: user.id,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (settingsError) {
        console.error('Failed to create user_home_settings:', settingsError);
      }
    }
  } catch (err) {
    console.error('Error ensuring profile exists:', err);
  }
}

// Initialize auth on page load
async function initializeAuth() {
  if (!supabase) return;

  // Check active session
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    const lastLoginAt = Number(localStorage.getItem(AUTH_LAST_LOGIN_AT_KEY) || 0);
    if (lastLoginAt && Date.now() - lastLoginAt > AUTH_MAX_AGE_MS) {
      try {
        await supabase.auth.signOut();
      } finally {
        showNotification(
          (typeof i18n !== 'undefined' && i18n.currentLocale === 'en')
            ? 'Session expired, please login again'
            : '登录已过期，请重新登录',
          'info'
        );
      }
    } else {
      handleSession(session);
    }
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      handleSession(session);
    } else {
      authState.isLoggedIn = false;
      authState.user = null;
      authState.profile = null;
      updateAuthUI();
      if (window.initializeMembership) {
        window.initializeMembership();
      }
    }
  });
}

// Handle Valid Session
async function handleSession(session) {
  authState.isLoggedIn = true;
  authState.user = session.user;
  window.authState = authState; // Ensure window reference is updated

  const pendingLoginAt = Number(localStorage.getItem(AUTH_PENDING_LOGIN_AT_KEY) || 0);
  if (pendingLoginAt) {
    localStorage.setItem(AUTH_LAST_LOGIN_AT_KEY, String(pendingLoginAt));
    localStorage.removeItem(AUTH_PENDING_LOGIN_AT_KEY);
  } else if (!localStorage.getItem(AUTH_LAST_LOGIN_AT_KEY)) {
    localStorage.setItem(AUTH_LAST_LOGIN_AT_KEY, String(Date.now()));
  }

  // Ensure profile exists in database (create if not exists)
  await ensureProfileExists(session.user);

  // Load extra profile data
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (data) {
      authState.profile = data;
    } else if (error) {
      console.error('Error fetching profile:', error);
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
  }

  updateAuthUI();

  cleanUrlToHome();

  // IMPORTANT: membership tier is needed before loading premium settings (theme/font)
  if (window.initializeMembership) {
    await window.initializeMembership();
  }

  if (window.waitForUserDataRuntimeReady) {
    try {
      await window.waitForUserDataRuntimeReady();
    } catch (err) {
      console.error('Failed while waiting for user data runtime:', err);
    }
  }

  const hasLocalPendingConfig = !!window.hasAnyPendingUserConfig?.(session.user.id);

  // Fast path: apply cached premium settings immediately (theme/font) before hitting network.
  if (hasLocalPendingConfig && window.applyCachedUserData) {
    try {
      window.applyCachedUserData({ uid: session.user.id, effectiveTier: window.membershipState?.tier || 1 });
    } catch (err) {
      console.error('Failed to apply cached user data:', err);
    }
  }

  // Trigger data load from server
  if (window.loadUserData) {
    await window.loadUserData({ force: true, skipLocalHydration: !hasLocalPendingConfig });
  }

  if (window.flushPendingProfileSync) {
    try {
      await window.flushPendingProfileSync();
    } catch (err) {
      console.error('Error flushing pending sync:', err);
    }
  }
}

// Google Login (Web)
async function handleWebLogin() {
  localStorage.setItem(AUTH_PENDING_LOGIN_AT_KEY, String(Date.now()));

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getHomeRedirectUrl()
    }
  });

  if (error) {
    console.error('Supabase OAuth Error:', error);
    showNotification('Login failed: ' + error.message, 'error');
  }
}

// Google Login (Extension)
// Uses chrome.identity.launchWebAuthFlow to handle OAuth in a popup,
// so the redirect returns to the extension instead of the web site.
async function handleExtensionLogin() {
  try {
    // Build the Supabase OAuth authorization URL
    const redirectURL = chrome.identity.getRedirectURL();
    // redirectURL is like: https://<extid>.chromiumapp.org/
    const oauthUrl = SUPABASE_URL
      + '/auth/v1/authorize'
      + '?provider=google'
      + '&redirect_to=' + encodeURIComponent(redirectURL);

    // Open OAuth flow in a Chrome-managed popup
    const responseUrl = await new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        { url: oauthUrl, interactive: true },
        (url) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (!url) {
            reject(new Error('No redirect URL returned — the login window may have been closed.'));
          } else {
            resolve(url);
          }
        }
      );
    });

    // Parse tokens from the hash fragment
    // Format: https://<extid>.chromiumapp.org/#access_token=...&refresh_token=...&...
    const hashStart = responseUrl.indexOf('#');
    if (hashStart === -1) {
      throw new Error('No token data in redirect URL. Make sure the URL '
        + redirectURL + ' is added to your Supabase project Redirect URLs.');
    }

    const hash = responseUrl.substring(hashStart + 1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (!accessToken || !refreshToken) {
      throw new Error('Missing tokens in redirect URL. The OAuth flow may have failed.');
    }

    // Establish the Supabase session with the returned tokens
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (sessionError) {
      throw new Error('Failed to set session: ' + sessionError.message);
    }

    // Wait for full data loading to complete before showing success.
    // setSession() triggers onAuthStateChange → handleSession() (fire-and-forget).
    // We explicitly await handleSession() here so user data finishes loading
    // before the "Login successful" notification is shown.
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await handleSession(session);
    }

    showNotification(
      (typeof i18n !== 'undefined' && i18n.currentLocale === 'zh')
        ? '登录成功！' : 'Login successful!',
      'success'
    );
  } catch (err) {
    console.error('Extension login failed:', err);
    showNotification(
      (typeof i18n !== 'undefined' && i18n.currentLocale === 'zh')
        ? '登录失败：' + err.message
        : 'Login failed: ' + err.message,
      'error'
    );
  }
}

// Google Login (dispatches to web or extension flow)
async function handleLoginClick() {
  if (!supabase) {
    console.error('Supabase object is missing!');
    showNotification(getSystemMessage('supabaseMissing', 'Supabase is not initialized. Please check your config.js credentials.'), 'error');
    return;
  }

  localStorage.setItem(AUTH_PENDING_LOGIN_AT_KEY, String(Date.now()));

  if (
    typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION &&
    typeof chrome !== 'undefined' && chrome.identity && chrome.identity.launchWebAuthFlow
  ) {
    return handleExtensionLogin();
  }

  return handleWebLogin();
}

window.handleLoginClick = handleLoginClick; // Ensure global access

// Logout
async function handleLogout() {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error (server-side):', error);
    // Continue with local cleanup even if server request fails
  }

  // Always clear local state regardless of server response
  signOutLocally();
}

function signOutLocally() {
  // Clear only NewTab-related local storage data
  const keysToRemove = [
    'auth_last_login_at', 'auth_pending_login_at',
    'user_sites', 'user_tags', 'user_site_tags',
    'user_site_order', 'user_tag_order',
    'cached_user_data', 'cached_settings',
    'selectedWallpaper', 'userDataCache', 'themeConfig'
  ];
  keysToRemove.forEach(key => localStorage.removeItem(key));

  // Reset local state to defaults
  if (typeof state !== 'undefined') {
    state.sites = [];
    state.tags = [];
    state.tagOrder = [];
    state.siteOrder = [];
    state.engineIndex = 0;
    state.dateFormatIndex = 0;
    state.timeFormat = '24h';
    state.viewMode = 'general';
  }

  // Reset wallpaper
  if (window.wallpaperState) {
    window.wallpaperState.selectedWallpaper = null;
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '';
  }

  // Clear chrome.storage.local in extension mode, then reload
  // so Supabase doesn't find a stale session on next load.
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    try {
      chrome.storage.local.clear(function() {
        if (chrome.runtime.lastError) {
          console.error('Failed to clear chrome.storage.local:', chrome.runtime.lastError);
        }
        window.location.reload();
      });
      return;
    } catch (e) {
      console.error('Failed to clear chrome.storage.local:', e);
    }
  }

  window.location.reload();
}

// Update auth UI (Avatar vs Login button)
function updateAuthUI() {
  const authMenuContainer = document.getElementById('authMenuContainer');
  if (!authMenuContainer) return;

  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';

  if (authState.isLoggedIn && authState.user) {
    const avatarUrl = authState.user.user_metadata.avatar_url || authState.user.user_metadata.picture || 'https://via.placeholder.com/32';
    const name = getUserNickname();

    const tier = window.membershipState?.tier || 1;
    const badge = (tier > 1 && window.MEMBERSHIP_CONFIG) ? window.MEMBERSHIP_CONFIG[tier].badge : '';
    const badgeHtml = badge ? `<span class="membership-badge" title="${tier}" style="margin-left:6px; font-size:1.2em;">${badge}</span>` : '';

    // Show user info
    authMenuContainer.innerHTML = `
      <div class="settings-menu-item" onclick="openUserProfile()">
        <div class="user-info-menu">
            <img src="${avatarUrl}" alt="Avatar" style="width:24px;height:24px;border-radius:50%;margin-right:8px;">
            <span>${name}</span>
            ${badgeHtml}
        </div>
      </div>
    `;

    // Close login modal if it was open
    closeGoogleSignInModal();
  } else {
    // Show login trigger button
    authMenuContainer.innerHTML = `
      <div class="settings-menu-item" id="loginMenuItem">
        <span id="loginText">${typeof i18n !== 'undefined' ? i18n.t('login') : '登录'}</span>
      </div>
    `;
  }
}

// User Profile Modal logic
window.openUserProfile = function () {
  const modal = document.getElementById('userProfileModal');
  const content = document.getElementById('userProfileContent');

  if (!authState.user) return;

  const avatarUrl = authState.user.user_metadata.avatar_url || authState.user.user_metadata.picture || 'https://via.placeholder.com/80';
  const name = getUserNickname();
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';
  const tier = window.membershipState?.tier || 1;

  const tierIcon = tier === 3 ? '👑' : (tier === 2 ? '⭐' : '');

  content.innerHTML = `
    <div style="text-align: center; padding: 20px;">
        <img src="${avatarUrl}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--border-color); margin-bottom: 10px;">
        <h3 style="margin: 0; display:flex; align-items:center; justify-content:center; gap: 8px;">${name}${tierIcon ? `<span style=\"font-size:18px; line-height:1;\">${tierIcon}</span>` : ''}</h3>
        <p style="opacity: 0.7; margin: 5px 0;">${authState.user.email}</p>
    </div>
    <div style="padding: 0 20px 20px; display: grid; gap: 12px;">
      <!-- Subscription records button hidden
      <button class="primary-btn sketchy-border" style="width: 100%;" onclick="openSubscriptionRecords()">
        ${isZh ? '订阅记录' : 'Subscription records'}
      </button>
      -->
    </div>
  `;

  modal.classList.remove('hidden');
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('settingsMenu').classList.add('hidden');
};

async function openSubscriptionRecords() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  const profileModal = document.getElementById('userProfileModal');
  const recordsModal = document.getElementById('subscriptionRecordsModal');
  const content = document.getElementById('subscriptionRecordsContent');
  const titleEl = document.getElementById('subscriptionRecordsTitle');
  const backBtn = document.getElementById('backToUserProfile');
  const closeBtn = document.getElementById('closeSubscriptionRecords');

  if (!authState.user) return;
  if (!recordsModal || !content) return;

  if (typeof i18n !== 'undefined') {
    if (titleEl) titleEl.textContent = i18n.t('subscriptionRecords');
    if (backBtn) backBtn.textContent = i18n.t('back');
    if (closeBtn) closeBtn.textContent = i18n.t('close');
  } else {
    if (titleEl) titleEl.textContent = isZh ? '订阅记录' : 'Subscription records';
    if (backBtn) backBtn.textContent = isZh ? '返回' : 'Back';
    if (closeBtn) closeBtn.textContent = isZh ? '关闭' : 'Close';
  }

  if (profileModal) profileModal.classList.add('hidden');
  recordsModal.classList.remove('hidden');
  document.getElementById('modalOverlay')?.classList.remove('hidden');

  content.innerHTML = `
    <div style="padding: 20px; opacity: 0.8;">${isZh ? '加载中…' : 'Loading…'}</div>
  `;

  if (!window.supabase) {
    content.innerHTML = `
      <div style="padding: 20px;">${isZh ? 'Supabase 未初始化，无法加载订阅记录。' : 'Supabase not initialized. Cannot load subscription records.'}</div>
    `;
    return;
  }

  try {
    const { data, error } = await window.supabase
      .from('user_subscriptions')
      .select('id,tier,amount,currency,status,started_at,ends_at,created_at')
      .eq('user_id', authState.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load subscription records:', error);
      content.innerHTML = `
        <div style="padding: 20px;">${isZh ? '加载失败，请稍后重试。' : 'Failed to load. Please try again later.'}</div>
      `;
      return;
    }

    const rows = Array.isArray(data) ? data : [];
    if (!rows.length) {
      content.innerHTML = `
        <div style="padding: 20px; opacity: 0.8;">${isZh ? '暂无订阅记录。' : 'No subscription records yet.'}</div>
      `;
      return;
    }

    const money = (amount, currency) => {
      const v = Number(amount || 0) / 100;
      const code = String(currency || 'usd').toUpperCase();
      return `${v.toFixed(2)} ${code}`;
    };

    const formatTime = (iso) => {
      if (!iso) return '-';
      try {
        return new Date(iso).toLocaleString();
      } catch {
        return String(iso);
      }
    };

    const periodText = (s, e) => {
      if (!s && !e) return '-';
      const ss = formatTime(s);
      const ee = formatTime(e);
      return `${ss} ~ ${ee}`;
    };

    content.innerHTML = `
      <div style="padding: 16px; display: grid; gap: 12px;">
        ${rows.map((r) => {
      const paidAt = formatTime(r.created_at);
      const period = periodText(r.started_at, r.ends_at);
      const product = (isZh ? `会员等级 ${r.tier}` : `Tier ${r.tier}`);
      const status = String(r.status || '').toLowerCase() || '-';
      return `
            <div style="border: 2px solid var(--border-color); border-radius: 12px; padding: 12px; background: var(--card-bg);">
              <div style="display:flex; justify-content: space-between; gap: 12px; align-items: baseline;">
                <strong>${product}</strong>
                <span style="opacity: 0.75; font-size: 12px;">${paidAt}</span>
              </div>
              <div style="margin-top: 8px; display:grid; gap: 6px; font-size: 13px;">
                <div style="display:flex; justify-content: space-between; gap: 12px;">
                  <span style="opacity: 0.75;">${isZh ? '金额' : 'Amount'}</span>
                  <span>${money(r.amount, r.currency)}</span>
                </div>
                <div style="display:flex; justify-content: space-between; gap: 12px;">
                  <span style="opacity: 0.75;">${isZh ? '订阅周期' : 'Period'}</span>
                  <span style="text-align:right;">${period}</span>
                </div>
                <div style="display:flex; justify-content: space-between; gap: 12px;">
                  <span style="opacity: 0.75;">${isZh ? '状态' : 'Status'}</span>
                  <span>${status}</span>
                </div>
              </div>
            </div>
          `;
    }).join('')}
      </div>
    `;
  } catch (err) {
    console.error('Error loading subscription records:', err);
    content.innerHTML = `
      <div style="padding: 20px;">${isZh ? '加载失败，请稍后重试。' : 'Failed to load. Please try again later.'}</div>
    `;
  }
}

window.openSubscriptionRecords = openSubscriptionRecords;

function closeSubscriptionRecords() {
  const recordsModal = document.getElementById('subscriptionRecordsModal');
  if (recordsModal) recordsModal.classList.add('hidden');
  document.getElementById('modalOverlay')?.classList.add('hidden');
}

function backToUserProfile() {
  const profileModal = document.getElementById('userProfileModal');
  const recordsModal = document.getElementById('subscriptionRecordsModal');
  if (recordsModal) recordsModal.classList.add('hidden');
  if (profileModal) profileModal.classList.remove('hidden');
}

function closeUserProfile() {
  document.getElementById('userProfileModal').classList.add('hidden');
  document.getElementById('modalOverlay').classList.add('hidden');
}

// Modal Helpers
function openGoogleSignInModal() {
  openManagedOverlay('googleSignInModal');
}

function closeGoogleSignInModal() {
  closeManagedOverlay('googleSignInModal');
}

function requireLoginForPersistentChange() {
  showNotification(getSystemMessage('loginBeforeSave', 'Please login before saving and syncing this change'), 'info');
  openGoogleSignInModal();
  return false;
}

function getSystemMessage(key, fallback) {
  if (typeof i18n !== 'undefined' && typeof i18n.t === 'function') {
    const translated = i18n.t(key);
    if (translated && translated !== key) {
      return translated;
    }
  }
  return fallback;
}

function ensureNotificationRoot() {
  let root = document.getElementById('notificationRoot');
  if (!root) {
    root = document.createElement('div');
    root.id = 'notificationRoot';
    root.className = 'notification-root';
    document.body.appendChild(root);
  }
  return root;
}

const MANAGED_OVERLAY_IDS = [
  'googleSignInModal',
  'aboutModal',
  'coffeeModal',
  'feedbackModal',
  'upgradeModal',
  'loginRequiredModal'
];

function closeManagedOverlay(id, options = {}) {
  const { remove = false } = options;
  const modal = document.getElementById(id);
  if (!modal) return;
  if (remove) {
    modal.remove();
    return;
  }
  modal.classList.add('hidden');
}

function closeManagedOverlays(exceptId = null) {
  MANAGED_OVERLAY_IDS.forEach((id) => {
    if (id === exceptId) return;
    closeManagedOverlay(id, { remove: id === 'loginRequiredModal' });
  });
}

function openManagedOverlay(id, options = {}) {
  const { closeSettings = true } = options;
  closeManagedOverlays(id);
  if (closeSettings) {
    window.closeSettingsLayers?.();
  }
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
  }
  return modal;
}

// Notification Helper
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  ensureNotificationRoot().appendChild(notification);
  requestAnimationFrame(() => notification.classList.add('is-visible'));
  setTimeout(() => {
    notification.classList.remove('is-visible');
    setTimeout(() => notification.remove(), 220);
  }, 3000);
}

function showConfirmDialog({
  title,
  message,
  confirmText,
  cancelText,
  tone = 'warning'
} = {}) {
  return new Promise((resolve) => {
    document.getElementById('systemConfirmDialog')?.remove();

    const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
    const isZh = currentLocale === 'zh';
    const confirmTitle = title || (isZh ? '请确认' : 'Please Confirm');
    const confirmMessage = message || (isZh ? '确认继续吗？' : 'Do you want to continue?');
    const confirmLabel = confirmText || getSystemMessage('confirmText', 'Confirm');
    const cancelLabel = cancelText || getSystemMessage('cancel', 'Cancel');

    const overlay = document.createElement('div');
    overlay.id = 'systemConfirmDialog';
    overlay.className = 'modal-overlay system-confirm-overlay';
    overlay.innerHTML = `
      <div class="modal system-confirm-dialog ${tone}">
        <h3>${confirmTitle}</h3>
        <p class="system-confirm-message">${confirmMessage}</p>
        <div class="modal-actions system-confirm-actions">
          <button class="cancel-btn" type="button">${cancelLabel}</button>
          <button class="primary-btn" type="button">${confirmLabel}</button>
        </div>
      </div>
    `;

    const cleanup = (result) => {
      overlay.classList.add('hidden');
      setTimeout(() => {
        overlay.remove();
        resolve(result);
      }, 180);
    };

    const [cancelBtn, confirmBtn] = overlay.querySelectorAll('button');
    cancelBtn?.addEventListener('click', () => cleanup(false));
    confirmBtn?.addEventListener('click', () => cleanup(true));
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        cleanup(false);
      }
    });

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.remove('hidden'));
  });
}

// Event Listeners Setup
function setupAuthEventListeners() {
  const authMenuContainer = document.getElementById('authMenuContainer');
  if (authMenuContainer) {
    authMenuContainer.onclick = (event) => {
      if (event.target.closest('#loginMenuItem')) {
        openGoogleSignInModal();
      }
    };
  }

  const googleLoginAction = document.getElementById('googleLoginAction');
  if (googleLoginAction) {
    googleLoginAction.onclick = handleLoginClick;
  }

  const closeLoginBtn = document.getElementById('closeGoogleSignIn');
  if (closeLoginBtn) {
    closeLoginBtn.onclick = closeGoogleSignInModal;
  }

  const googleSignInModal = document.getElementById('googleSignInModal');
  if (googleSignInModal) {
    googleSignInModal.onclick = (e) => {
      if (e.target === googleSignInModal) closeGoogleSignInModal();
    };
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  }

  const closeProfileBtn = document.getElementById('closeUserProfile');
  if (closeProfileBtn) {
    closeProfileBtn.onclick = closeUserProfile;
  }

  const closeRecordsBtn = document.getElementById('closeSubscriptionRecords');
  if (closeRecordsBtn) {
    closeRecordsBtn.onclick = closeSubscriptionRecords;
  }

  const backBtn = document.getElementById('backToUserProfile');
  if (backBtn) {
    backBtn.onclick = backToUserProfile;
  }
}

// Export for global access
window.handleLoginClick = handleLoginClick;
window.handleLogout = handleLogout;
window.openGoogleSignInModal = openGoogleSignInModal;
window.closeGoogleSignInModal = closeGoogleSignInModal;
window.requireLoginForPersistentChange = requireLoginForPersistentChange;
window.updateAuthUI = updateAuthUI;
window.showNotification = showNotification;
window.showConfirmDialog = showConfirmDialog;
window.openManagedOverlay = openManagedOverlay;
window.closeManagedOverlay = closeManagedOverlay;
window.closeManagedOverlays = closeManagedOverlays;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  setupAuthEventListeners();
  initializeAuth();
});
