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
const PROD_HOSTNAMES = [
  'newtab-rfyoq591j-hongjiaonis-projects.vercel.app'
];

const APP_ENV = (() => {
  const host = String(window.location.hostname || '').toLowerCase();
  return PROD_HOSTNAMES.includes(host) ? 'production' : 'staging';
})();

const SUPABASE_ENV = {
  production: {
    url: 'https://jmexpjhpqrydmswxiomt.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZXhwamhwcXJ5ZG1zd3hpb210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjI3OTMsImV4cCI6MjA4NDg5ODc5M30.cwM-m8TCKpOLsCaT6xUEjEtSNH8KnQ7nawD9GvLEMWk'
  },
  staging: {
    url: 'YOUR_STAGING_SUPABASE_URL',
    anonKey: 'YOUR_STAGING_SUPABASE_ANON_KEY'
  }
};

const resolvedSupabase = SUPABASE_ENV[APP_ENV] || SUPABASE_ENV.staging;
const SUPABASE_URL = resolvedSupabase.url;
const SUPABASE_ANON_KEY = resolvedSupabase.anonKey;

const SITE_URL = '';
const OAUTH_REDIRECT_URL = APP_ENV === 'production'
  ? 'https://newtab-rfyoq591j-hongjiaonis-projects.vercel.app'
  : '';

// Paddle Configuration
// Replace with your actual Paddle credentials from Paddle Dashboard
const PADDLE_ENVIRONMENT = 'production'; // 'sandbox' for testing, 'production' for live
const PADDLE_CLIENT_TOKEN = 'live_245fc506cb9dc81b3ff831cd963'; // Your Paddle client-side token

// Paddle Price IDs (create these in Paddle Dashboard)
const PADDLE_PRICE_TIER2_MONTHLY = 'pri_01kfyxzhfmthgs70hcv20zvkdc'; // Premium tier monthly price ID
const PADDLE_PRICE_TIER2_YEARLY = 'pri_01kfyy17rj346xj7xj0k6vzem9';  // Premium tier yearly price ID
const PADDLE_PRICE_TIER3_MONTHLY = ''; // Super tier monthly price ID
const PADDLE_PRICE_TIER3_YEARLY = '';  // Super tier yearly price ID

// Export Paddle config to window for paddle.js
window.PADDLE_ENVIRONMENT = PADDLE_ENVIRONMENT;
window.PADDLE_CLIENT_TOKEN = PADDLE_CLIENT_TOKEN;
window.PADDLE_PRICE_TIER2_MONTHLY = PADDLE_PRICE_TIER2_MONTHLY;
window.PADDLE_PRICE_TIER2_YEARLY = PADDLE_PRICE_TIER2_YEARLY;
window.PADDLE_PRICE_TIER3_MONTHLY = PADDLE_PRICE_TIER3_MONTHLY;
window.PADDLE_PRICE_TIER3_YEARLY = PADDLE_PRICE_TIER3_YEARLY;

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
