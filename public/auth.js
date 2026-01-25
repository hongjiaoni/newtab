// ===== Authentication Module (Supabase) =====

const authState = {
  isLoggedIn: false,
  user: null,
  profile: null // Stores extra profile data
};

// Initialize auth on page load
async function initializeAuth() {
  if (!supabase) return;

  // Check active session
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    handleSession(session);
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
    }
  });
}

// Handle Valid Session
async function handleSession(session) {
  authState.isLoggedIn = true;
  authState.user = session.user;

  // Load extra profile data (if any)
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (data) {
      authState.profile = data;
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
  }

  updateAuthUI();

  // Trigger data load from server
  if (window.loadUserData) {
    window.loadUserData();
  }
}

// Google Login
async function handleLoginClick() {
  console.log('Login button clicked');
  if (!supabase) {
    console.error('Supabase object is missing!');
    return alert('Supabase not initialized. Please check your config.js credentials.');
  }

  console.log('Starting OAuth flow...');
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
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
    const name = authState.user.user_metadata.full_name || authState.user.user_metadata.name || authState.user.email;

    // Show user info
    authMenuContainer.innerHTML = `
      <div class="settings-menu-item" onclick="openUserProfile()">
        <div class="user-info-menu">
            <img src="${avatarUrl}" alt="Avatar" style="width:24px;height:24px;border-radius:50%;margin-right:8px;">
            <span>${name}</span>
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
  const name = authState.user.user_metadata.full_name || authState.user.user_metadata.name || 'User';

  content.innerHTML = `
    <div style="text-align: center; padding: 20px;">
        <img src="${avatarUrl}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--border-color); margin-bottom: 10px;">
        <h3 style="margin: 0;">${name}</h3>
        <p style="opacity: 0.7; margin: 5px 0;">${authState.user.email}</p>
    </div>
  `;

  modal.classList.remove('hidden');
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('settingsMenu').classList.add('hidden');
};

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
