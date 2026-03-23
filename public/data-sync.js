// ===== Data Synchronization Module (Refactored) =====

let syncDebounceTimer = null;
const SYNC_DEBOUNCE_MS = 500;
const USER_DATA_REFRESH_MS = 20 * 1000;
const HOME_CONFIG_KEY_PREFIX = 'user_home_config_';
const COLOR_CONFIG_KEY_PREFIX = 'user_color_config_';
const CONFIG_META_KEY_PREFIX = 'user_config_meta_';
const APPEARANCE_SNAPSHOT_KEY = 'last_applied_appearance';
let userDataLoadPromise = null;
let userDataRefreshTimer = null;

function getHomeConfigCacheKey(uid) {
    return HOME_CONFIG_KEY_PREFIX + uid;
}

function getColorConfigCacheKey(uid) {
    return COLOR_CONFIG_KEY_PREFIX + uid;
}

function parseTimestamp(value) {
    if (!value) return 0;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
}

function latestTimestamp(...values) {
    let winner = '';
    let winnerTs = 0;

    for (const value of values) {
        const currentTs = parseTimestamp(value);
        if (currentTs >= winnerTs) {
            winnerTs = currentTs;
            winner = value || winner;
        }
    }

    return winner;
}

function getConfigMeta(uid) {
    if (!uid) return {};
    try {
        return JSON.parse(localStorage.getItem(CONFIG_META_KEY_PREFIX + uid) || '{}') || {};
    } catch (_err) {
        return {};
    }
}

function setConfigMeta(uid, nextMeta) {
    if (!uid) return;
    localStorage.setItem(CONFIG_META_KEY_PREFIX + uid, JSON.stringify(nextMeta || {}));
}

function updateConfigMeta(uid, section, patch) {
    if (!uid || !section) return;
    const meta = getConfigMeta(uid);
    meta[section] = {
        ...(meta[section] || {}),
        ...(patch || {})
    };
    setConfigMeta(uid, meta);
}

function shouldApplyRemoteConfig(uid, section, remoteUpdatedAt) {
    const sectionMeta = getConfigMeta(uid)[section] || {};
    const remoteTs = parseTimestamp(remoteUpdatedAt);
    const localTs = parseTimestamp(sectionMeta.localUpdatedAt);

    if (!remoteTs) return !sectionMeta.pending;
    if (sectionMeta.pending && localTs >= remoteTs) return false;
    if (localTs > remoteTs) return false;
    return true;
}

function stringifyConfig(config) {
    try {
        return JSON.stringify(config ?? null);
    } catch (_err) {
        return '';
    }
}

function hasPendingConfigSync(uid, section) {
    if (!uid || !section) return false;
    return !!getConfigMeta(uid)?.[section]?.pending;
}

function buildThemeSettingsFromLocalCache(uid) {
    if (!uid) return null;

    try {
        const rawColor = localStorage.getItem(getColorConfigCacheKey(uid));
        if (!rawColor) return null;

        const colorPayload = JSON.parse(rawColor);
        if (!colorPayload || typeof colorPayload !== 'object') return null;

        const snapshot = JSON.parse(localStorage.getItem(APPEARANCE_SNAPSHOT_KEY) || '{}') || {};
        const snapshotSettings = snapshot.customSettings || {};

        return {
            style: snapshot.currentTheme || window.themeState?.currentTheme || localStorage.getItem('currentTheme') || 'handdrawn',
            fontChinese: snapshotSettings.fontChinese || window.themeState?.customSettings?.fontChinese || '优设好身体',
            fontEnglish: snapshotSettings.fontEnglish || window.themeState?.customSettings?.fontEnglish || 'Patrick Hand',
            ...(colorPayload.light || {}),
            darkMode: {
                ...(colorPayload.dark || {})
            }
        };
    } catch (_err) {
        return null;
    }
}

function mergeAppearanceSnapshot(partial) {
    if (!partial || typeof partial !== 'object') return;

    let current = {};
    try {
        current = JSON.parse(localStorage.getItem(APPEARANCE_SNAPSHOT_KEY) || '{}') || {};
    } catch (_err) {
        current = {};
    }

    const next = {
        ...current,
        ...partial
    };

    if (partial.customSettings || current.customSettings) {
        const currentCustom = current.customSettings || {};
        const partialCustom = partial.customSettings || {};
        next.customSettings = {
            ...currentCustom,
            ...partialCustom,
            darkMode: {
                ...(currentCustom.darkMode || {}),
                ...(partialCustom.darkMode || {})
            }
        };
    }

    localStorage.setItem(APPEARANCE_SNAPSHOT_KEY, JSON.stringify(next));
}

function normalizeEngineId(input) {
    if (!input) return '';
    return String(input).trim();
}

function normalizeEnabledEngineIds(input) {
    if (!Array.isArray(input)) return null;
    const cleaned = input.map(v => String(v || '').trim()).filter(Boolean);
    return cleaned.length ? cleaned : null;
}

function toColorPayloadFromLegacy(themeSettings) {
    if (!themeSettings || typeof themeSettings !== 'object') return null;
    if (themeSettings.light || themeSettings.dark) {
        return {
            light: { ...(themeSettings.light || {}) },
            dark: { ...(themeSettings.dark || {}) }
        };
    }

    const { style, fontChinese, fontEnglish, darkMode, ...light } = themeSettings;
    return {
        light,
        dark: { ...(darkMode || {}) }
    };
}

function toFontPayloadFromLegacy(fontSettings) {
    if (!fontSettings || typeof fontSettings !== 'object') return {};
    return {
        fontChinese: fontSettings.fontChinese || '',
        fontEnglish: fontSettings.fontEnglish || ''
    };
}

function buildHomeConfigFromLegacy(legacy) {
    if (!legacy || !legacy.settingsRow) return null;

    const siteTagMap = new Map();
    for (const row of legacy.siteTagsRows || []) {
        if (!siteTagMap.has(row.site_id)) {
            siteTagMap.set(row.site_id, []);
        }
        siteTagMap.get(row.site_id).push(row.tag_name);
    }

    const sites = (legacy.sitesRows || []).map((row) => ({
        id: row.id,
        name: row.name,
        url: row.url,
        showOnHome: row.show_on_home !== false,
        tags: siteTagMap.get(row.id) || []
    }));

    const orderedSiteIds = (legacy.siteOrderRows || [])
        .slice()
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((row) => row.site_id);

    const orderedTagNames = (legacy.tagOrderRows || [])
        .slice()
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((row) => row.tag_name);

    const fontSettings = toFontPayloadFromLegacy(legacy.fontSettings);

    return {
        sites,
        tags: (legacy.tagsRows || []).map((row) => row.name),
        site_order: orderedSiteIds,
        tag_order: orderedTagNames,
        settings: {
            viewMode: legacy.settingsRow.view_mode || 'general',
            engineIndex: legacy.settingsRow.engine_index || 0,
            engineId: legacy.settingsRow.engine_id || '',
            enabledEngineIds: Array.isArray(legacy.settingsRow.enabled_engine_ids) ? legacy.settingsRow.enabled_engine_ids : [],
            dateFormatIndex: legacy.settingsRow.date_format_index || 0,
            timeFormat: legacy.settingsRow.time_format || '24h',
            locale: legacy.settingsRow.locale || 'zh',
            wallpaper: legacy.settingsRow.wallpaper || null,
            theme: legacy.settingsRow.theme || 'handdrawn',
            colorMode: legacy.settingsRow.color_mode || 'light',
            fontChinese: fontSettings.fontChinese || undefined,
            fontEnglish: fontSettings.fontEnglish || undefined
        }
    };
}

async function fetchLegacyConfigs(uid) {
    const [
        settingsRes,
        sitesRes,
        tagsRes,
        siteTagsRes,
        siteOrderRes,
        tagOrderRes,
        themeSettingsRes,
        fontSettingsRes
    ] = await Promise.all([
        supabase.from('user_home_settings').select('*').eq('user_id', uid).single(),
        supabase.from('user_sites').select('id,name,url,show_on_home').eq('user_id', uid),
        supabase.from('user_tags').select('name').eq('user_id', uid),
        supabase.from('user_site_tags').select('site_id,tag_name').eq('user_id', uid),
        supabase.from('user_site_order').select('site_id,position').eq('user_id', uid),
        supabase.from('user_tag_order').select('tag_name,position').eq('user_id', uid),
        supabase.from('user_theme_settings').select('theme_settings, updated_at').eq('user_id', uid).single(),
        supabase.from('user_font_settings').select('font_settings, updated_at').eq('user_id', uid).single()
    ]);

    const homeConfig = buildHomeConfigFromLegacy({
        settingsRow: settingsRes.data,
        sitesRows: sitesRes.data,
        tagsRows: tagsRes.data,
        siteTagsRows: siteTagsRes.data,
        siteOrderRows: siteOrderRes.data,
        tagOrderRows: tagOrderRes.data,
        fontSettings: fontSettingsRes.data?.font_settings
    });

    const colorConfig = toColorPayloadFromLegacy(themeSettingsRes.data?.theme_settings);

    return {
        homeConfig,
        homeUpdatedAt: latestTimestamp(settingsRes.data?.updated_at, fontSettingsRes.data?.updated_at),
        colorConfig,
        colorUpdatedAt: themeSettingsRes.data?.updated_at
    };
}

async function saveLegacyHomeConfig(payload, syncedAt) {
    const { error } = await supabase.rpc('sync_home_config', {
        p_payload: {
            ...payload,
            updated_at: syncedAt
        }
    });
    if (error) throw error;
}

async function saveLegacyThemeConfig(uid, settings, syncedAt) {
    const [themeRes, fontRes] = await Promise.all([
        supabase.from('user_theme_settings').upsert({
            user_id: uid,
            theme_settings: settings,
            updated_at: syncedAt
        }, { onConflict: 'user_id' }),
        supabase.from('user_font_settings').upsert({
            user_id: uid,
            font_settings: {
                fontChinese: settings.fontChinese || '',
                fontEnglish: settings.fontEnglish || ''
            },
            updated_at: syncedAt
        }, { onConflict: 'user_id' })
    ]);
    if (themeRes.error) throw themeRes.error;
    if (fontRes.error) throw fontRes.error;
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
        window.applyWallpaper(s.wallpaper, { sync: false });
    }

    if (typeof s.theme === 'string') {
        state.currentTheme = s.theme;
        localStorage.setItem('currentTheme', s.theme);
        window.applyStyleTheme?.(state.currentTheme);
        if (window.themeState) window.themeState.currentTheme = state.currentTheme;
    }

    if (s.fontChinese || s.fontEnglish) {
        if (window.applyFontSettings) {
            window.applyFontSettings({
                fontChinese: s.fontChinese,
                fontEnglish: s.fontEnglish
            });
        } else if (window.themeState && window.themeState.customSettings) {
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

    mergeAppearanceSnapshot({
        currentTheme: state.currentTheme || 'handdrawn',
        colorMode: typeof s.colorMode === 'string' ? (s.colorMode === 'dark' ? 'dark' : 'light') : (localStorage.getItem('theme') || 'light'),
        customSettings: {
            fontChinese: window.themeState?.customSettings?.fontChinese,
            fontEnglish: window.themeState?.customSettings?.fontEnglish
        }
    });

    window.applyStyleTheme?.(state.currentTheme || window.themeState?.currentTheme || 'handdrawn');
    window.applyCustomThemeForCurrentMode?.();
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
    mergeAppearanceSnapshot({
        currentTheme: window.themeState?.currentTheme || localStorage.getItem('currentTheme') || 'handdrawn',
        colorMode: document.body.classList.contains('dark') ? 'dark' : 'light',
        customSettings: window.themeState?.customSettings || {}
    });
}

// 1. Initial Cached Load -> 2. Remote Fetch Overwrite
// The app now standardizes on the normalized Supabase schema:
// user_home_settings + user_sites + user_tags + user_site_tags + order tables
// plus user_theme_settings / user_font_settings.
async function loadUserData(options = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping data load');
        return;
    }

    if (userDataLoadPromise) {
        return userDataLoadPromise;
    }

    const uid = window.authState.user.id;
    userDataLoadPromise = (async () => {
        // === Phase 1: Local Cache Immediate Hydration ===
        if (!options.skipLocalHydration) {
            try {
                const localHome = localStorage.getItem(getHomeConfigCacheKey(uid));
                const localColor = localStorage.getItem(getColorConfigCacheKey(uid));
                
                if (localHome) applyHomeConfig(JSON.parse(localHome));
                if (localColor) applyColorConfig(JSON.parse(localColor));

                window.renderHome?.();
                window.renderSearchEngine?.();
                window.updateTime?.();
            } catch (e) {
                console.warn('Failed to parse local cached configs', e);
            }
        }

        // === Phase 2: Remote DB Overwrite ===
        try {
            console.log('Fetching remote configs from normalized Supabase tables...');

            let requiresRender = false;
            const remoteRes = await fetchLegacyConfigs(uid);
            const homeCacheKey = getHomeConfigCacheKey(uid);
            const colorCacheKey = getColorConfigCacheKey(uid);
            const currentHomeRaw = localStorage.getItem(homeCacheKey);
            const currentColorRaw = localStorage.getItem(colorCacheKey);

            if (remoteRes.homeConfig && shouldApplyRemoteConfig(uid, 'home', remoteRes.homeUpdatedAt)) {
                const nextHomeRaw = stringifyConfig(remoteRes.homeConfig);
                const homeChanged = currentHomeRaw !== nextHomeRaw;

                localStorage.setItem(homeCacheKey, nextHomeRaw);
                updateConfigMeta(uid, 'home', {
                    localUpdatedAt: remoteRes.homeUpdatedAt || new Date().toISOString(),
                    remoteUpdatedAt: remoteRes.homeUpdatedAt || new Date().toISOString(),
                    pending: false
                });

                if (homeChanged) {
                    applyHomeConfig(remoteRes.homeConfig);
                    requiresRender = true;
                }
            } else if (remoteRes.homeConfig) {
                console.log('Skipping stale remote home config');
            }

            if (remoteRes.colorConfig && shouldApplyRemoteConfig(uid, 'color', remoteRes.colorUpdatedAt)) {
                const nextColorRaw = stringifyConfig(remoteRes.colorConfig);
                const colorChanged = currentColorRaw !== nextColorRaw;

                localStorage.setItem(colorCacheKey, nextColorRaw);
                updateConfigMeta(uid, 'color', {
                    localUpdatedAt: remoteRes.colorUpdatedAt || new Date().toISOString(),
                    remoteUpdatedAt: remoteRes.colorUpdatedAt || new Date().toISOString(),
                    pending: false
                });

                if (colorChanged) {
                    applyColorConfig(remoteRes.colorConfig);
                }
            } else if (remoteRes.colorConfig) {
                console.log('Skipping stale remote color config');
            }

            if (requiresRender) {
                window.renderHome?.();
                window.renderSearchEngine?.();
                window.updateTime?.();
            }
            console.log('User data successfully loaded from remote');
        } catch (err) {
            console.error('Error fetching remote configs:', err);
        } finally {
            userDataLoadPromise = null;
        }
    })();

    return userDataLoadPromise;
}

// Aggressive overwrite save for Home Config
async function saveUserDataToBackend(immediate = false) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) return;

    const doSync = async () => {
        try {
            const uid = window.authState.user.id;
            const colorMode = document.body.classList.contains('dark') ? 'dark' : 'light';
            const syncedAt = new Date().toISOString();
            
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
            localStorage.setItem(getHomeConfigCacheKey(uid), JSON.stringify(payload));
            mergeAppearanceSnapshot({
                currentTheme: payload.settings.theme || 'handdrawn',
                colorMode,
                customSettings: {
                    ...(window.themeState?.customSettings || {}),
                    fontChinese: payload.settings.fontChinese,
                    fontEnglish: payload.settings.fontEnglish
                }
            });
            updateConfigMeta(uid, 'home', {
                localUpdatedAt: syncedAt,
                pending: true
            });

            // 2. Persist through the normalized sync RPC
            await saveLegacyHomeConfig(payload, syncedAt);

            updateConfigMeta(uid, 'home', {
                localUpdatedAt: syncedAt,
                remoteUpdatedAt: syncedAt,
                pending: false
            });

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
        const syncedAt = new Date().toISOString();
        
        // Settings object usually contains fonts & strings like 'style', but we want to strip those.
        // We separate them into light and dark structural buckets.
        const { style, fontChinese, fontEnglish, ...colorsOnly } = settings;
        
        const colorPayload = {
            light: { ...colorsOnly },
            dark: { ...(colorsOnly.darkMode || {}) }
        };
        delete colorPayload.light.darkMode; // Keep hygiene

        // 1. Cache Locally
        localStorage.setItem(getColorConfigCacheKey(uid), JSON.stringify(colorPayload));
        mergeAppearanceSnapshot({
            currentTheme: settings.style || window.themeState?.currentTheme || localStorage.getItem('currentTheme') || 'handdrawn',
            colorMode: document.body.classList.contains('dark') ? 'dark' : 'light',
            customSettings: settings
        });
        updateConfigMeta(uid, 'color', {
            localUpdatedAt: syncedAt,
            pending: true
        });

        // 2. Persist through normalized theme/font tables
        await saveLegacyThemeConfig(uid, settings, syncedAt);

        updateConfigMeta(uid, 'color', {
            localUpdatedAt: syncedAt,
            remoteUpdatedAt: syncedAt,
            pending: false
        });

        // Theme style and fonts are stored with the home config as well.
        await saveUserDataToBackend(true);

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
        const syncedAt = new Date().toISOString();
        localStorage.removeItem(getColorConfigCacheKey(uid));
        await saveLegacyThemeConfig(uid, {}, syncedAt);

        updateConfigMeta(uid, 'color', {
            localUpdatedAt: syncedAt,
            remoteUpdatedAt: syncedAt,
            pending: false
        });
        
        window.clearCustomThemeSettings?.();
    } catch (e) {
        console.error('Failed resetting theme', e);
    }
}

function markHomeConfigUpdated() {
    saveUserDataToBackend();
}

function flushPendingProfileSync() {
    if (!navigator.onLine || !window.authState?.user || !supabase) {
        return Promise.resolve();
    }

    const uid = window.authState.user.id;

    return (async () => {
        if (hasPendingConfigSync(uid, 'color')) {
            try {
                const settings = buildThemeSettingsFromLocalCache(uid);
                if (settings) {
                    const syncedAt = new Date().toISOString();
                    await saveLegacyThemeConfig(uid, settings, syncedAt);
                    updateConfigMeta(uid, 'color', {
                        localUpdatedAt: syncedAt,
                        remoteUpdatedAt: syncedAt,
                        pending: false
                    });
                }
            } catch (err) {
                console.error('Failed flushing pending color config:', err);
            }
        }

        if (hasPendingConfigSync(uid, 'home')) {
            try {
                await saveUserDataToBackend(true);
            } catch (err) {
                console.error('Failed flushing pending home config:', err);
            }
        }
    })();
}

function applyCachedUserData() {
    // Immediately fired post-login to hydrate screen.
    if (window.authState && window.authState.user) {
        const uid = window.authState.user.id;
        try {
            const h = localStorage.getItem(getHomeConfigCacheKey(uid));
            const c = localStorage.getItem(getColorConfigCacheKey(uid));
            if (h) applyHomeConfig(JSON.parse(h));
            if (c) applyColorConfig(JSON.parse(c));
        } catch(e){}
    }
}

function shouldRefreshUserData() {
    return !!(window.authState && window.authState.isLoggedIn && supabase && navigator.onLine && !document.hidden);
}

function scheduleUserDataRefresh() {
    if (userDataRefreshTimer) return;
    userDataRefreshTimer = setInterval(() => {
        if (!shouldRefreshUserData()) return;
        loadUserData({ skipLocalHydration: true });
    }, USER_DATA_REFRESH_MS);
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

window.addEventListener('online', async () => {
    if (window.authState && window.authState.isLoggedIn) {
        await loadUserData({ skipLocalHydration: true });
        await flushPendingProfileSync();
    }
});

window.addEventListener('focus', () => {
    if (shouldRefreshUserData()) {
        loadUserData({ skipLocalHydration: true });
    }
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && shouldRefreshUserData()) {
        loadUserData({ skipLocalHydration: true });
    }
});

scheduleUserDataRefresh();
