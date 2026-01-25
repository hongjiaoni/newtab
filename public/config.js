// ===== Configuration =====

// Google OAuth Configuration
// Replace with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = '608226137663-n7g5fqo6268rqs51nu6iv4m9d202phah.apps.googleusercontent.com';

// API Configuration
// API Configuration
// If using Supabase, baseURL is not strictly needed for data, but might be used for other things
// const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_CONFIG = {
  // baseURL: isProduction ? '/api' : 'http://localhost:3000/api', // Legacy Node.js API
  timeout: 10000,
  retryAttempts: 3
};

// Supabase Configuration
const SUPABASE_URL = 'https://jmexpjhpqrydmswxiomt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZXhwamhwcXJ5ZG1zd3hpb210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjI3OTMsImV4cCI6MjA4NDg5ODc5M30.cwM-m8TCKpOLsCaT6xUEjEtSNH8KnQ7nawD9GvLEMWk';

// Feature Flags
const FEATURES = {
  enableAutoLogin: true,
  enableDataSync: true,
  enableWallpaperSystem: true,
  enableOfflineMode: true
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GOOGLE_CLIENT_ID, API_CONFIG, FEATURES, SUPABASE_URL, SUPABASE_ANON_KEY };
}
