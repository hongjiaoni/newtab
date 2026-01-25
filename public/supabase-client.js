// ===== Supabase Client Initialization =====

let supabase;

if (typeof createClient !== 'undefined') {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
        console.warn('Supabase credentials not set in config.js');
    } else {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase client initialized');
    }
} else {
    console.error('Supabase SDK not loaded');
}
