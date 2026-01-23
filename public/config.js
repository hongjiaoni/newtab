// ===== Configuration =====

// Google OAuth Configuration
// Replace with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = '608226137663-n7g5fqo6268rqs51nu6iv4m9d202phah.apps.googleusercontent.com';

// API Configuration
const API_CONFIG = {
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3
};

// Feature Flags
const FEATURES = {
  enableAutoLogin: true,
  enableDataSync: true,
  enableWallpaperSystem: true,
  enableOfflineMode: true
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GOOGLE_CLIENT_ID, API_CONFIG, FEATURES };
}
