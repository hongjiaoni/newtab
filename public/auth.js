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
      console.log('Profile already exists');
      return;
    }

    // Profile doesn't exist, create it
    if (fetchError && fetchError.code === 'PGRST116') {
      console.log('Creating new profile for user:', user.id);

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
      } else {
        console.log('Profile created successfully');
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
      console.log('Profile loaded:', data);
    } else if (error) {
      console.error('Error fetching profile:', error);
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
  }

  updateAuthUI();

  cleanUrlToHome();

  if (window.flushPendingProfileSync) {
    try {
      await window.flushPendingProfileSync();
    } catch (err) {
      console.error('Error flushing pending sync:', err);
    }
  }

  // IMPORTANT: membership tier is needed before loading premium settings (theme/font)
  if (window.initializeMembership) {
    await window.initializeMembership();
  }

  // Fast path: apply cached premium settings immediately (theme/font) before hitting network.
  if (window.applyCachedUserData) {
    try {
      window.applyCachedUserData({ uid: session.user.id, effectiveTier: window.membershipState?.tier || 1 });
    } catch (err) {
      console.error('Failed to apply cached user data:', err);
    }
  }

  // Trigger data load from server
  if (window.loadUserData) {
    await window.loadUserData();
  }
}

// Google Login
async function handleLoginClick() {
  console.log('Login button clicked');
  if (!supabase) {
    console.error('Supabase object is missing!');
    return alert('Supabase not initialized. Please check your config.js credentials.');
  }

  localStorage.setItem(AUTH_PENDING_LOGIN_AT_KEY, String(Date.now()));

  console.log('Starting OAuth flow...');
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

window.handleLoginClick = handleLoginClick; // Ensure global access

// Logout
async function handleLogout() {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error);
  } else {
    // Clear all local storage data
    localStorage.clear();

    // Reset state to defaults if available
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

    // Reload page to reset all UI
    window.location.reload();
  }
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
      <div class="settings-menu-item" id="loginMenuItem" onclick="openGoogleSignInModal()">
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
      <button class="primary-btn sketchy-border" style="width: 100%;" onclick="openSubscriptionRecords()">
        ${isZh ? '订阅记录' : 'Subscription records'}
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('settingsMenu').classList.add('hidden');
};

async function openSubscriptionRecords() {
  const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const isZh = currentLocale === 'zh';

  const titleEl = document.getElementById('subscriptionRecordsTitle');
  if (titleEl && typeof i18n !== 'undefined') titleEl.textContent = i18n.t('subscriptionRecords');
  const backBtnText = document.getElementById('backToUserProfile');
  if (backBtnText && typeof i18n !== 'undefined') backBtnText.textContent = i18n.t('back');
  const closeBtnText = document.getElementById('closeSubscriptionRecords');
  if (closeBtnText && typeof i18n !== 'undefined') closeBtnText.textContent = i18n.t('close');

  const profileModal = document.getElementById('userProfileModal');
  const recordsModal = document.getElementById('subscriptionRecordsModal');
  const content = document.getElementById('subscriptionRecordsContent');

  if (!authState.user) return;
  if (!recordsModal || !content) return;

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
  const modal = document.getElementById('googleSignInModal');
  if (modal) modal.classList.remove('hidden');
}

function closeGoogleSignInModal() {
  const modal = document.getElementById('googleSignInModal');
  if (modal) modal.classList.add('hidden');
}

// Notification Helper
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    padding: 12px 20px; border-radius: 8px; z-index: 9999;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white; font-size: 14px; animation: slideDown 0.3s ease;
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Event Listeners Setup
function setupAuthEventListeners() {
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
window.updateAuthUI = updateAuthUI;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  setupAuthEventListeners();
  initializeAuth();
});
