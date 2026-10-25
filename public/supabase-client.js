// ===== Supabase Client Initialization =====

let supabaseClient; // Use a distinct name for the instance

if (typeof supabase !== 'undefined' && supabase.createClient) {
    const looksLikePlaceholder = (v) => {
        const s = String(v || '').trim();
        return !s || s.includes('YOUR_');
    };

    const prodUrl = 'https://jmexpjhpqrydmswxiomt.supabase.co';
    if (typeof APP_ENV !== 'undefined' && APP_ENV !== 'production' && String(SUPABASE_URL || '').trim() === prodUrl && !IS_EXTENSION) {
        console.error('Refusing to initialize Supabase: APP_ENV is not production but SUPABASE_URL points to production. Check config.js staging settings.');
    } else if (looksLikePlaceholder(SUPABASE_URL) || looksLikePlaceholder(SUPABASE_ANON_KEY)) {
        console.warn('Supabase credentials not set in config.js');
    } else {
        // Correct SDK usage: supabase.createClient
        try {
          const clientOptions = {};
          if (window.IS_EXTENSION && window.extensionStorageAdapter) {
            clientOptions.auth = {
              storage: window.extensionStorageAdapter,
              detectSessionInUrl: true
            };
          }
          supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, clientOptions);
          window.supabase = supabaseClient;
          if (window.IS_EXTENSION) {
            console.log('[NewTab] Supabase client initialized in extension mode. URL:', SUPABASE_URL);
          }
        } catch (err) {
          console.error('[NewTab] Failed to initialize Supabase client:', err);
          if (window.IS_EXTENSION) {
            console.error('[NewTab] Extension mode — check that vendor/supabase.min.js loaded correctly.');
            console.error('[NewTab] SUPABASE_URL:', SUPABASE_URL, 'SUPABASE_ANON_KEY length:', SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.length : 0);
          }
        }
    }
} else {
    console.error('Supabase SDK not loaded or window.supabase is missing');
}
