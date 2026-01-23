// ===== Authentication Module =====

const API_BASE_URL = API_CONFIG.baseURL;

// Auth state
const authState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loginTime: null
};

// Initialize auth on page load
function initializeAuth() {
  // Check for existing token
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  const loginTime = localStorage.getItem('loginTime');

  if (token && user && loginTime) {
    authState.token = token;
    authState.user = JSON.parse(user);
    authState.loginTime = parseInt(loginTime);
    authState.isLoggedIn = true;

    // Check if 90 days have passed
    const daysPassed = (Date.now() - authState.loginTime) / (1000 * 60 * 60 * 24);

    if (daysPassed > 90) {
      // Clear expired login
      logout();
    } else {
      // Verify token is still valid
      verifyToken();
      updateAuthUI();
      loadUserData();
    }
  }

  updateAuthUI();
}

// Handle Google Sign-In response
async function handleCredentialResponse(response) {
  try {
    const idToken = response.credential;

    // Get user email from JWT (decode without verification on client)
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    const email = payload.email;

    // Send to backend
    const response_data = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: idToken })
    });

    const data = await response_data.json();

    if (data.success) {
      // Store auth info
      authState.token = data.token;
      authState.user = data.user;
      authState.isLoggedIn = true;
      authState.loginTime = Date.now();

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('loginTime', authState.loginTime.toString());

      // Close modal
      closeGoogleSignInModal();

      // Update UI
      updateAuthUI();

      // Load user data
      loadUserData();

      // Show success message
      showNotification('登录成功！', 'success');
    } else {
      showNotification('登录失败：' + data.error, 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showNotification('登录出错：' + error.message, 'error');
  }
}

// Verify token with backend
async function verifyToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    if (!response.ok) {
      logout();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

// Load user data from backend
async function loadUserData() {
  if (!authState.isLoggedIn || !authState.token) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      headers: {
        'Authorization': `Bearer ${authState.token}`,
        'x-user-id': authState.user.id // Simple auth
      }
    });

    // Check if response is null (no settings yet)
    const backendData = await response.json();

    if (backendData) {
      // Update state with backend data
      if (backendData.sites) state.sites = backendData.sites;
      if (backendData.tags) state.tags = backendData.tags;
      if (backendData.tagOrder) state.tagOrder = backendData.tagOrder;
      if (backendData.siteOrder) state.siteOrder = backendData.siteOrder;
      if (backendData.wallpaper) state.wallpaper = backendData.wallpaper;
      if (backendData.engineIndex !== undefined) state.engineIndex = backendData.engineIndex;
      if (backendData.dateFormatIndex !== undefined) state.dateFormatIndex = backendData.dateFormatIndex;
      if (backendData.timeFormat) state.timeFormat = backendData.timeFormat;

      // Save to local storage to keep in sync
      saveData(false); // false = don't sync back to server to avoid loop

      // Re-render
      renderHome();
      renderSearchEngine();
      updateTime();
    }
  } catch (error) {
    console.error('Load user data error:', error);
  }
}

// Save user data to backend
async function saveUserDataToBackend() {
  if (!authState.isLoggedIn || !authState.token) {
    return;
  }

  try {
    const userData = {
      sites: state.sites,
      tags: state.tags,
      tagOrder: state.tagOrder,
      siteOrder: state.siteOrder,
      wallpaper: state.wallpaper || null,
      engineIndex: state.engineIndex,
      dateFormatIndex: state.dateFormatIndex,
      timeFormat: state.timeFormat
    };

    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authState.token}`,
        'x-user-id': authState.user.id,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!data.success) {
      console.error('Save user data error:', data.error);
    }
  } catch (error) {
    console.error('Save user data error:', error);
  }
}

// Logout
async function logout() {
  try {
    // Notify backend
    if (authState.token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  }

  // Clear auth state
  authState.isLoggedIn = false;
  authState.user = null;
  authState.token = null;
  authState.loginTime = null;

  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('loginTime');

  // Update UI
  updateAuthUI();

  // Show message
  showNotification('已退出登录', 'info');
}

// Update auth UI
function updateAuthUI() {
  const authMenuContainer = document.getElementById('authMenuContainer');
  if (!authMenuContainer) return;

  if (authState.isLoggedIn && authState.user) {
    // Show user avatar that opens profile modal
    authMenuContainer.innerHTML = `
      <div class="settings-menu-item" onclick="openUserProfile()">
        <div class="user-info-menu">
            <span>${authState.user.name || authState.user.email}</span>
        </div>
      </div>
    `;
  } else {
    // Show login button
    authMenuContainer.innerHTML = `
      <div class="settings-menu-item" id="loginMenuItem" onclick="handleLoginClick()">
        <span id="loginText">${typeof i18n !== 'undefined' ? i18n.t('login') : '登录'}</span>
      </div>
    `;
  }
}

// User Profile Modal Logic
window.openUserProfile = function () {
  const modal = document.getElementById('userProfileModal');
  const content = document.getElementById('userProfileContent');

  if (!authState.user) return;

  content.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <img src="${authState.user.picture}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--border-color); margin-bottom: 10px;">
            <h3 style="margin: 0;">${authState.user.name}</h3>
            <p style="opacity: 0.7; margin: 5px 0;">${authState.user.email}</p>
        </div>
    `;

  modal.classList.remove('hidden');
  document.getElementById('modalOverlay').classList.remove('hidden');

  // Close settings menu if open
  document.getElementById('settingsMenu').classList.add('hidden');
};

function closeUserProfile() {
  document.getElementById('userProfileModal').classList.add('hidden');
  if (!document.getElementById('addModal').classList.contains('hidden') ||
    !document.getElementById('tagViewModal').classList.contains('hidden') ||
    !document.getElementById('deleteModal').classList.contains('hidden') ||
    !document.getElementById('wallpaperModal').classList.contains('hidden')) {
    // Don't close overlay if other modals are open (though unlikely stacked)
  } else {
    document.getElementById('modalOverlay').classList.add('hidden');
  }
}

// Attach listeners
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('closeUserProfile');
  const logoutBtn = document.getElementById('logoutBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeUserProfile);
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    closeUserProfile();
    logout();
  });
});

// Update text based on language
updateAuthText();

// Update auth text based on language
function updateAuthText() {
  const loginText = document.getElementById('loginText');
  const logoutText = document.getElementById('logoutText');

  if (loginText) {
    loginText.textContent = i18n.currentLocale === 'zh' ? '登录' : 'Login';
  }
  if (logoutText) {
    logoutText.textContent = i18n.currentLocale === 'zh' ? '退出' : 'Logout';
  }
}

// Handle login button click
function handleLoginClick() {
  openGoogleSignInModal();
}

// Open Google Sign-In modal
function openGoogleSignInModal() {
  const modal = document.getElementById('googleSignInModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close Google Sign-In modal
function closeGoogleSignInModal() {
  const modal = document.getElementById('googleSignInModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 8px;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    font-size: 14px;
    z-index: 2000;
    animation: slideDown 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Setup event listeners
function setupAuthEventListeners() {
  const closeGoogleSignInBtn = document.getElementById('closeGoogleSignIn');
  if (closeGoogleSignInBtn) {
    closeGoogleSignInBtn.addEventListener('click', closeGoogleSignInModal);
  }

  // Close modal when clicking overlay
  const googleSignInModal = document.getElementById('googleSignInModal');
  if (googleSignInModal) {
    googleSignInModal.addEventListener('click', (e) => {
      if (e.target === googleSignInModal) {
        closeGoogleSignInModal();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupAuthEventListeners();
  initializeAuth();
});

// Export functions if needed
window.saveUserDataToBackend = saveUserDataToBackend;
