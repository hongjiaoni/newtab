// ===== Data Synchronization Module (Refactored) =====

let syncDebounceTimer = null;
const SYNC_DEBOUNCE_MS = 500;

function normalizeEngineId(input) {
    if (!input) return '';
    return String(input).trim();
}

function normalizeEnabledEngineIds(input) {
    if (!Array.isArray(input)) return null;
    const cleaned = input.map(v => String(v || '').trim()).filter(Boolean);
    return cleaned.length ? cleaned : null;
}

// Applies the parsed Home Config payload directly to internal running state
function applyHomeConfig(config) {
    if (!config || typeof config !== 'object') return;

    if (Array.isArray(config.sites)) state.sites = config.sites;
    if (Array.isArray(config.tags)) state.tags = config.tags;
    if (Array.isArray(config.site_order)) state.siteOrder = config.site_order;
    if (Array.isArray(config.tag_order)) state.tagOrder = config.tag_order;

    const s = config.settings || {};
    if (typeof s.viewMode === 'string') state.viewMode = s.viewMode;
    if (Number.isFinite(s.engineIndex)) state.engineIndex = s.engineIndex;
    if (typeof s.engineId === 'string') state.engineId = normalizeEngineId(s.engineId);
    
    const normalizedEnabled = normalizeEnabledEngineIds(s.enabledEngineIds);
    if (normalizedEnabled) state.enabledEngineIds = normalizedEnabled;
    
    if (Number.isFinite(s.dateFormatIndex)) state.dateFormatIndex = s.dateFormatIndex;
    if (typeof s.timeFormat === 'string') state.timeFormat = s.timeFormat;

    if (typeof s.locale === 'string') {
        if (typeof i18n !== 'undefined' && i18n.setLocale) {
            i18n.setLocale(s.locale, false);
        } else {
            localStorage.setItem('locale', s.locale);
        }
    }

    if (Object.prototype.hasOwnProperty.call(s, 'wallpaper') && window.applyWallpaper) {
        window.applyWallpaper(s.wallpaper);
    }

    if (typeof s.theme === 'string') {
        state.currentTheme = s.theme;
        window.applyStyleTheme?.(state.currentTheme);
        if (window.themeState) window.themeState.currentTheme = state.currentTheme;
    }

    if (s.fontChinese || s.fontEnglish) {
        if (window.themeState && window.themeState.customSettings) {
            if (s.fontChinese) window.themeState.customSettings.fontChinese = s.fontChinese;
            if (s.fontEnglish) window.themeState.customSettings.fontEnglish = s.fontEnglish;
        }
    }

    if (typeof s.colorMode === 'string') {
        const mode = s.colorMode === 'dark' ? 'dark' : 'light';
        document.body.classList.toggle('dark', mode === 'dark');
        document.body.classList.toggle('light', mode !== 'dark');
        localStorage.setItem('theme', mode);
        window.applyCustomThemeForCurrentMode?.();
    }
}

// Applies the parsed Color Config payload directly to themeState
function applyColorConfig(config) {
    if (!config || !window.themeState || !window.themeState.customSettings) return;
    
    // Config has format: { light: { ... }, dark: { ... } }
    if (config.light) {
        const mergedLight = { ...window.themeState.customSettings, ...config.light };
        // Clean out nested darkMode if it accidentally merged
        delete mergedLight.darkMode; 
        
        mergedLight.darkMode = {
            ...((window.themeState.customSettings.darkMode) || {}),
            ...(config.dark || {})
        };
        
        window.themeState.customSettings = mergedLight;
    }
    
    window.applyCustomThemeForCurrentMode?.();
}

// 1. Initial Cached Load -> 2. Remote Fetch Overwrite 
async function loadUserData(options = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping data load');
        return;
    }

    const uid = window.authState.user.id;

    // === Phase 1: Local Cache Immediate Hydration ===
    try {
        const localHome = localStorage.getItem('user_home_config_' + uid);
        const localColor = localStorage.getItem('user_color_config_' + uid);
        
        if (localHome) applyHomeConfig(JSON.parse(localHome));
        if (localColor) applyColorConfig(JSON.parse(localColor));

        window.renderHome?.();
        window.renderSearchEngine?.();
        window.updateTime?.();
    } catch (e) {
        console.warn('Failed to parse local cached configs', e);
    }

    // === Phase 2: Remote DB Overwrite ===
    try {
        console.log('Fetching remote configs from Supabase...');
        const [homeRes, colorRes] = await Promise.all([
            supabase.from('user_home_config').select('config').eq('user_id', uid).single(),
            supabase.from('user_color_config').select('config').eq('user_id', uid).single()
        ]);

        let requiresRender = false;

        if (homeRes.data && homeRes.data.config) {
            localStorage.setItem('user_home_config_' + uid, JSON.stringify(homeRes.data.config));
            applyHomeConfig(homeRes.data.config);
            requiresRender = true;
        }

        if (colorRes.data && colorRes.data.config) {
            localStorage.setItem('user_color_config_' + uid, JSON.stringify(colorRes.data.config));
            applyColorConfig(colorRes.data.config);
        }

        if (requiresRender) {
            window.renderHome?.();
            window.renderSearchEngine?.();
            window.updateTime?.();
        }
        console.log('User data successfully loaded from remote');
    } catch (err) {
        console.error('Error fetching remote configs:', err);
    }
}

// Aggressive overwrite save for Home Config
async function saveUserDataToBackend(immediate = false) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) return;

    const doSync = async () => {
        try {
            const uid = window.authState.user.id;
            const colorMode = document.body.classList.contains('dark') ? 'dark' : 'light';
            
            const payload = {
                sites: (state.sites || []).map(s => ({
                    id: s.id,
                    name: s.name,
                    url: s.url,
                    tags: Array.isArray(s.tags) ? s.tags : [],
                    showOnHome: !!s.showOnHome
                })),
                tags: state.tags || [],
                tag_order: state.tagOrder || [],
                site_order: state.siteOrder || [],
                settings: {
                    viewMode: state.viewMode || 'general',
                    engineIndex: state.engineIndex || 0,
                    engineId: state.engineId || '',
                    enabledEngineIds: Array.isArray(state.enabledEngineIds) ? state.enabledEngineIds : [],
                    dateFormatIndex: state.dateFormatIndex || 0,
                    timeFormat: state.timeFormat || '24h',
                    locale: (typeof i18n !== 'undefined' && i18n.currentLocale) ? i18n.currentLocale : (localStorage.getItem('locale') || 'zh'),
                    wallpaper: window.wallpaperState?.selectedWallpaper || null,
                    theme: state.currentTheme || 'handdrawn',
                    colorMode,
                    fontChinese: window.themeState?.customSettings?.fontChinese || '优设好身体',
                    fontEnglish: window.themeState?.customSettings?.fontEnglish || 'Patrick Hand'
                }
            };

            // 1. Cache Locally
            localStorage.setItem('user_home_config_' + uid, JSON.stringify(payload));

            // 2. Overwrite Remotely
            await supabase.from('user_home_config').upsert({
                user_id: uid,
                config: payload,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

        } catch (err) {
            console.error('Error saving home config:', err);
        }
    };

    if (immediate === true) {
        await doSync();
        return;
    }

    if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(async () => {
        await doSync();
    }, SYNC_DEBOUNCE_MS);
}

// Specialized save for strictly Color Configurations
async function saveThemeSettings(settings) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) return;

    try {
        const uid = window.authState.user.id;
        
        // Settings object usually contains fonts & strings like 'style', but we want to strip those.
        // We separate them into light and dark structural buckets.
        const { style, fontChinese, fontEnglish, ...colorsOnly } = settings;
        
        const colorPayload = {
            light: { ...colorsOnly },
            dark: { ...(colorsOnly.darkMode || {}) }
        };
        delete colorPayload.light.darkMode; // Keep hygiene

        // 1. Cache Locally
        localStorage.setItem('user_color_config_' + uid, JSON.stringify(colorPayload));

        // 2. Overwrite Remotely
        await supabase.from('user_color_config').upsert({
            user_id: uid,
            config: colorPayload,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

        // Since settings contained fonts and styles, we force a home config save too (debounced)
        saveUserDataToBackend();

    } catch (e) {
        console.error('Error saving color config:', e);
    }
}

// Proxies existing API bindings to the new system
async function saveFontSettings(fontSettings) {
    // Fonts are now embedded inside the Home Config payload
    saveUserDataToBackend();
}

async function resetThemeCustomizationOnBackend() {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) return;
    try {
        const uid = window.authState.user.id;
        localStorage.removeItem('user_color_config_' + uid);
        await supabase.from('user_color_config').upsert({
            user_id: uid,
            config: {},
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
        window.clearCustomThemeSettings?.();
    } catch (e) {
        console.error('Failed resetting theme', e);
    }
}

function markHomeConfigUpdated() {
    saveUserDataToBackend();
}

function flushPendingProfileSync() {
    // Deprecated queued syncs in favor of raw JSONB overwrites.
    // Trigger instant save unconditionally if online instead.
    if (navigator.onLine) {
        saveUserDataToBackend();
    }
}

function applyCachedUserData() {
    // Immediately fired post-login to hydrate screen.
    if (window.authState && window.authState.user) {
        const uid = window.authState.user.id;
        try {
            const h = localStorage.getItem('user_home_config_' + uid);
            const c = localStorage.getItem('user_color_config_' + uid);
            if (h) applyHomeConfig(JSON.parse(h));
            if (c) applyColorConfig(JSON.parse(c));
        } catch(e){}
    }
}

// Attach to Global Scope
window.loadUserData = loadUserData;
window.saveUserDataToBackend = saveUserDataToBackend;
window.saveThemeSettings = saveThemeSettings;
window.saveFontSettings = saveFontSettings;
window.resetThemeCustomizationOnBackend = resetThemeCustomizationOnBackend;
window.markHomeConfigUpdated = markHomeConfigUpdated;
window.flushPendingProfileSync = flushPendingProfileSync;
window.applyCachedUserData = applyCachedUserData;

window.addEventListener('online', () => {
    if (window.authState && window.authState.isLoggedIn) {
        flushPendingProfileSync();
    }
});
