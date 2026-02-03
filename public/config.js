// ===== Configuration =====

// Google OAuth Configuration
// Replace with your actual Google Client ID from Google Cloud Console
let GOOGLE_CLIENT_ID = '';

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

const APP_ENV_CONFIG = {
  production: {
    googleClientId: '608226137663-n7g5fqo6268rqs51nu6iv4m9d202phah.apps.googleusercontent.com',
    siteUrl: 'https://newtab.online',
    oauthRedirectUrl: 'https://jmexpjhpqrydmswxiomt.supabase.co/auth/v1/callback',
    supabase: {
      url: 'https://jmexpjhpqrydmswxiomt.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZXhwamhwcXJ5ZG1zd3hpb210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjI3OTMsImV4cCI6MjA4NDg5ODc5M30.cwM-m8TCKpOLsCaT6xUEjEtSNH8KnQ7nawD9GvLEMWk'
    },
    paddle: {
      environment: 'production',
      clientToken: 'live_245fc506cb9dc81b3ff831cd963',
      prices: {
        tier2Monthly: 'pri_01kfyxzhfmthgs70hcv20zvkdc',
        tier2Yearly: 'pri_01kfyy17rj346xj7xj0k6vzem9',
        tier3Monthly: '',
        tier3Yearly: ''
      }
    }
  },
  staging: {
    googleClientId: '608226137663-lpjl8odq86ded8d8qc07ipvrjd1pq6iu.apps.googleusercontent.com',
    siteUrl: 'https://staging.newtab.online',
    oauthRedirectUrl: 'https://nxvcophrnhxtewqsewps.supabase.co/auth/v1/callback',
    supabase: {
      url: 'https://nxvcophrnhxtewqsewps.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dmNvcGhybmh4dGV3cXNld3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjQyNzgsImV4cCI6MjA4NTUwMDI3OH0.bPrRNyuKlZSPcfz5dzoft0jNNZrH7N4VJTEByj_1Lek'
    },
    paddle: {
      environment: 'sandbox',
      clientToken: 'test_0859109511be7a2606f2dfcdf50',
      prices: {
        tier2Monthly: 'pri_01kghqjbhbsm816ab2wg2ffwbg',
        tier2Yearly: 'pri_01kghqk21ed8ezbbc5p61mrzc0',
        tier3Monthly: '',
        tier3Yearly: ''
      }
    }
  }
};

const resolvedAppConfig = APP_ENV_CONFIG[APP_ENV] || APP_ENV_CONFIG.staging;

// Google OAuth Configuration
GOOGLE_CLIENT_ID = resolvedAppConfig.googleClientId;

const SUPABASE_ENV = {
  production: {
    url: APP_ENV_CONFIG.production.supabase.url,
    anonKey: APP_ENV_CONFIG.production.supabase.anonKey
  },
  staging: {
    url: APP_ENV_CONFIG.staging.supabase.url,
    anonKey: APP_ENV_CONFIG.staging.supabase.anonKey
  }
};

const resolvedSupabase = SUPABASE_ENV[APP_ENV] || SUPABASE_ENV.staging;
const SUPABASE_URL = resolvedSupabase.url;
const SUPABASE_ANON_KEY = resolvedSupabase.anonKey;

const SITE_URL = resolvedAppConfig.siteUrl;
const OAUTH_REDIRECT_URL = resolvedAppConfig.oauthRedirectUrl;

// Paddle Configuration
// Replace with your actual Paddle credentials from Paddle Dashboard
const PADDLE_ENVIRONMENT = resolvedAppConfig.paddle.environment; // 'sandbox' for testing, 'production' for live
const PADDLE_CLIENT_TOKEN = resolvedAppConfig.paddle.clientToken; // Your Paddle client-side token

// Paddle Price IDs (create these in Paddle Dashboard)
const PADDLE_PRICE_TIER2_MONTHLY = resolvedAppConfig.paddle.prices.tier2Monthly; // Premium tier monthly price ID
const PADDLE_PRICE_TIER2_YEARLY = resolvedAppConfig.paddle.prices.tier2Yearly;  // Premium tier yearly price ID
const PADDLE_PRICE_TIER3_MONTHLY = resolvedAppConfig.paddle.prices.tier3Monthly; // Super tier monthly price ID
const PADDLE_PRICE_TIER3_YEARLY = resolvedAppConfig.paddle.prices.tier3Yearly;  // Super tier yearly price ID

// Export Paddle config to window for paddle.js
window.PADDLE_ENVIRONMENT = PADDLE_ENVIRONMENT;
window.PADDLE_CLIENT_TOKEN = PADDLE_CLIENT_TOKEN;
window.PADDLE_PRICE_TIER2_MONTHLY = PADDLE_PRICE_TIER2_MONTHLY;
window.PADDLE_PRICE_TIER2_YEARLY = PADDLE_PRICE_TIER2_YEARLY;
window.PADDLE_PRICE_TIER3_MONTHLY = PADDLE_PRICE_TIER3_MONTHLY;
window.PADDLE_PRICE_TIER3_YEARLY = PADDLE_PRICE_TIER3_YEARLY;

window.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;

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
