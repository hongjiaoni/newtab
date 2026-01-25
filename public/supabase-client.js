// ===== Supabase Client Initialization =====

let supabaseClient; // Use a distinct name for the instance

if (typeof supabase !== 'undefined' && supabase.createClient) {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
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
