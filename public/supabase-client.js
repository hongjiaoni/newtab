// ===== Supabase Client Initialization =====

let supabaseClient; // Use a distinct name for the instance

if (typeof supabase !== 'undefined' && supabase.createClient) {
    const looksLikePlaceholder = (v) => {
        const s = String(v || '').trim();
        return !s || s.includes('YOUR_');
    };

    const prodUrl = 'https://jmexpjhpqrydmswxiomt.supabase.co';
    if (typeof APP_ENV !== 'undefined' && APP_ENV !== 'production' && String(SUPABASE_URL || '').trim() === prodUrl) {
        console.error('Refusing to initialize Supabase: APP_ENV is not production but SUPABASE_URL points to production. Check config.js staging settings.');
    } else if (looksLikePlaceholder(SUPABASE_URL) || looksLikePlaceholder(SUPABASE_ANON_KEY)) {
        console.warn('Supabase credentials not set in config.js');
    } else {
        // Correct SDK usage: supabase.createClient
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase client initialized');
        // Export to short name for legacy support or internal use
        window.supabase = supabaseClient;
    }
} else {
    console.error('Supabase SDK not loaded or window.supabase is missing');
}
