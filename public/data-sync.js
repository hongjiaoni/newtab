// ===== Data Synchronization Module =====

let syncDebounceTimer = null;
const SYNC_DEBOUNCE_MS = 500;
const LOCAL_UPDATED_AT_KEY = 'home_config_updated_at';
const PENDING_HOME_SYNC_KEY = 'home_config_pending_home_sync';
const SETTINGS_SCHEMA_VERSION = 2;
const USER_CACHE_VERSION = 1;
const USER_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const USER_CACHE_THEME_PREFIX = `user_cache_theme_v${USER_CACHE_VERSION}_`;
const USER_CACHE_FONT_PREFIX = `user_cache_font_v${USER_CACHE_VERSION}_`;
const USER_CACHE_HOME_PREFIX = `user_cache_home_v${USER_CACHE_VERSION}_`;
let flushPendingInProgress = false;

function normalizeEngineId(input) {
    if (!input) return '';
    const v = String(input).trim();
    return v;
}

function normalizeEnabledEngineIds(input) {
    if (!Array.isArray(input)) return null;
    const cleaned = input
        .map(v => String(v || '').trim())
        .filter(Boolean);
    return cleaned.length ? cleaned : null;
}

function getUserCacheKey(prefix, uid) {
    if (!uid) return null;
    return `${prefix}${uid}`;
}

function parseIsoToMs(v) {
    if (!v) return 0;
    const t = Date.parse(v);
    return Number.isFinite(t) ? t : 0;
}

function getPendingHomeSync() {
    const raw = localStorage.getItem(PENDING_HOME_SYNC_KEY);
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (!obj || typeof obj !== 'object') return null;
        if (!obj.payload || typeof obj.payload !== 'object') return null;
        return obj;
    } catch {
        return null;
    }
}

function setPendingHomeSync(obj) {
    if (!obj) {
        localStorage.removeItem(PENDING_HOME_SYNC_KEY);
        return;
    }
    localStorage.setItem(PENDING_HOME_SYNC_KEY, JSON.stringify(obj));
}

function getLocalUpdatedAt() {
    const v = localStorage.getItem(LOCAL_UPDATED_AT_KEY);
    const t = v ? Date.parse(v) : 0;
    return Number.isFinite(t) ? t : 0;
}

function setLocalUpdatedAt(isoString) {
    if (!isoString) {
        localStorage.removeItem(LOCAL_UPDATED_AT_KEY);
        return;
    }
    localStorage.setItem(LOCAL_UPDATED_AT_KEY, isoString);
}

function queueHomeSync(payload, reason = 'unknown') {
    const updatedAt = payload.updated_at || new Date().toISOString();
    payload.updated_at = updatedAt;

    const pending = getPendingHomeSync();
    setPendingHomeSync({
        payload,
        reason,
        updated_at: updatedAt,
        created_at: pending?.created_at || new Date().toISOString(),
        attempts: (pending?.attempts || 0)
    });

    setLocalUpdatedAt(updatedAt);
}

async function syncHomeConfigWithRetry(payload, { queueReason = 'sync_failed' } = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        return { ok: false, queued: false };
    }

    if (!navigator.onLine) {
        queueHomeSync(payload, 'offline');
        return { ok: false, queued: true };
    }

    const { error } = await supabase.rpc('sync_home_config', { p_payload: payload });
    if (error) {
        console.error('Failed to sync home config:', error);
        queueHomeSync(payload, queueReason);
        return { ok: false, queued: true, error };
    }

    if (payload.updated_at) {
        setLocalUpdatedAt(payload.updated_at);
    }

    return { ok: true, queued: false };
}

async function flushPendingProfileSync() {
    if (flushPendingInProgress) return;
    if (!window.authState || !window.authState.isLoggedIn || !supabase) return;

    const pending = getPendingHomeSync();
    if (!pending || !pending.payload) return;
    if (!navigator.onLine) return;

    flushPendingInProgress = true;
    try {
        const next = {
            ...pending.payload,
            updated_at: pending.payload.updated_at || new Date().toISOString()
        };

        const { ok } = await syncHomeConfigWithRetry(next, { queueReason: 'flush_failed' });
        if (ok) {
            setPendingHomeSync(null);
            return { status: 'flushed' };
        }

        const latest = getPendingHomeSync();
        if (latest) {
            latest.attempts = (latest.attempts || 0) + 1;
            setPendingHomeSync(latest);
        }
        return { status: 'failed' };
    } finally {
        flushPendingInProgress = false;
    }
}

function migrateSettings(rawSettings) {
    const s = (rawSettings && typeof rawSettings === 'object') ? { ...rawSettings } : {};
    const v = Number.isFinite(s.schema_version) ? s.schema_version : 0;

    if (v < 1) {
        if (typeof s.viewMode !== 'string') s.viewMode = 'general';
        if (!Number.isFinite(s.engineIndex)) s.engineIndex = 0;
        if (typeof s.engineId !== 'string') s.engineId = '';
        if (!Array.isArray(s.enabledEngineIds)) s.enabledEngineIds = [];
        if (!Number.isFinite(s.dateFormatIndex)) s.dateFormatIndex = 0;
        if (typeof s.timeFormat !== 'string') s.timeFormat = '24h';
        if (typeof s.theme !== 'string') s.theme = 'handdrawn';
        if (typeof s.colorMode !== 'string') s.colorMode = (localStorage.getItem('theme') || 'light');
        if (typeof s.locale !== 'string') s.locale = (localStorage.getItem('locale') || 'zh');
        if (!Object.prototype.hasOwnProperty.call(s, 'wallpaper')) s.wallpaper = (localStorage.getItem('selectedWallpaper') || null);
        s.schema_version = SETTINGS_SCHEMA_VERSION;
    } else {
        if (typeof s.engineId !== 'string') s.engineId = '';
        if (!Array.isArray(s.enabledEngineIds)) s.enabledEngineIds = [];
        if (v !== SETTINGS_SCHEMA_VERSION) {
            s.schema_version = SETTINGS_SCHEMA_VERSION;
        }
    }

    return s;
}

function getCachedUserHomeConfig(uid) {
    const key = getUserCacheKey(USER_CACHE_HOME_PREFIX, uid);
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (!obj || typeof obj !== 'object') return null;
        return obj;
    } catch {
        return null;
    }
}

function setCachedUserHomeConfig(uid, homeConfig) {
    const key = getUserCacheKey(USER_CACHE_HOME_PREFIX, uid);
    if (!key) return;
    if (!homeConfig || typeof homeConfig !== 'object') {
        localStorage.removeItem(key);
        return;
    }
    localStorage.setItem(key, JSON.stringify(homeConfig));
}

function getCachedUserThemeSettings(uid) {
    const key = getUserCacheKey(USER_CACHE_THEME_PREFIX, uid);
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (!obj || typeof obj !== 'object') return null;
        return obj;
    } catch {
        return null;
    }
}

function setCachedUserThemeSettings(uid, themeSettings) {
    const key = getUserCacheKey(USER_CACHE_THEME_PREFIX, uid);
    if (!key) return;
    if (!themeSettings || typeof themeSettings !== 'object' || Object.keys(themeSettings).length === 0) {
        localStorage.removeItem(key);
        return;
    }
    localStorage.setItem(key, JSON.stringify(themeSettings));
}

function getCachedUserFontSettings(uid) {
    const key = getUserCacheKey(USER_CACHE_FONT_PREFIX, uid);
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (!obj || typeof obj !== 'object') return null;
        return obj;
    } catch {
        return null;
    }
}

function setCachedUserFontSettings(uid, fontSettings) {
    const key = getUserCacheKey(USER_CACHE_FONT_PREFIX, uid);
    if (!key) return;
    if (!fontSettings || typeof fontSettings !== 'object' || Object.keys(fontSettings).length === 0) {
        localStorage.removeItem(key);
        return;
    }
    localStorage.setItem(key, JSON.stringify(fontSettings));
}

function applyCachedHomeConfig(homeConfig) {
    if (!homeConfig || typeof homeConfig !== 'object') return;

    const sites = Array.isArray(homeConfig.sites) ? homeConfig.sites : null;
    const tags = Array.isArray(homeConfig.tags) ? homeConfig.tags : null;
    const siteOrder = Array.isArray(homeConfig.site_order) ? homeConfig.site_order : null;
    const tagOrder = Array.isArray(homeConfig.tag_order) ? homeConfig.tag_order : null;
    const settings = (homeConfig.settings && typeof homeConfig.settings === 'object') ? homeConfig.settings : null;

    if (sites) state.sites = sites;
    if (tags) state.tags = tags;
    if (siteOrder) state.siteOrder = siteOrder;
    if (tagOrder) state.tagOrder = tagOrder;

    if (settings) {
        if (typeof settings.viewMode === 'string') state.viewMode = settings.viewMode;
        if (Number.isFinite(settings.engineIndex)) state.engineIndex = settings.engineIndex;
        if (typeof settings.engineId === 'string') state.engineId = normalizeEngineId(settings.engineId);

        const normalizedEnabled = normalizeEnabledEngineIds(settings.enabledEngineIds);
        if (normalizedEnabled) {
            state.enabledEngineIds = normalizedEnabled;
        }
        if (Number.isFinite(settings.dateFormatIndex)) state.dateFormatIndex = settings.dateFormatIndex;
        if (typeof settings.timeFormat === 'string') state.timeFormat = settings.timeFormat;

        if (typeof settings.locale === 'string') {
            if (typeof i18n !== 'undefined' && i18n.setLocale) {
                i18n.setLocale(settings.locale, false);
            } else {
                localStorage.setItem('locale', settings.locale);
            }
        }

        if (Object.prototype.hasOwnProperty.call(settings, 'wallpaper') && window.applyWallpaper) {
            window.applyWallpaper(settings.wallpaper);
        }

        if (typeof settings.theme === 'string') {
            state.currentTheme = settings.theme;
            window.applyStyleTheme?.(state.currentTheme);
        }

        if (typeof settings.colorMode === 'string') {
            const mode = settings.colorMode === 'dark' ? 'dark' : 'light';
            document.body.classList.toggle('dark', mode === 'dark');
            document.body.classList.toggle('light', mode !== 'dark');
            localStorage.setItem('theme', mode);
            window.applyCustomThemeForCurrentMode?.();
        }
    }
}

function applyCachedUserData({ uid, effectiveTier } = {}) {
    if (!uid) return;
    const tier = Number(effectiveTier || window.membershipState?.tier || 1);

    const cachedHome = getCachedUserHomeConfig(uid);
    if (cachedHome) {
        applyCachedHomeConfig(cachedHome);
    }

    if (tier >= 2) {
        const cachedTheme = getCachedUserThemeSettings(uid);
        if (cachedTheme && window.applyThemeSettings) {
            window.applyThemeSettings(cachedTheme);
            window.applyCustomThemeForCurrentMode?.();
        }

        const cachedFont = getCachedUserFontSettings(uid);
        if (cachedFont && window.applyFontSettings) {
            window.applyFontSettings(cachedFont);
        }
    }

    window.renderHome?.();
    window.renderSearchEngine?.();
    window.updateTime?.();
}

function markHomeConfigUpdated() {
    const now = new Date().toISOString();
    setLocalUpdatedAt(now);
    if (window.authState && window.authState.isLoggedIn) {
        saveUserDataToBackend();
    }
}

async function loadUserData(options = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping data load');
        return;
    }

    try {
        console.log('Loading user data from Supabase...');

        const uid = window.authState.user.id;
        const effectiveTier = window.membershipState?.tier || 1;

        if (!options.force) {
            const cachedHome = getCachedUserHomeConfig(uid);
            const cachedHomeAt = parseIsoToMs(cachedHome?.updated_at);
            const localUpdatedAt = getLocalUpdatedAt();
            const hasPending = !!getPendingHomeSync();
            const isFresh = cachedHomeAt > 0 && (Date.now() - cachedHomeAt) < USER_CACHE_TTL_MS;

            let hasPremiumCaches = true;
            if (Number(effectiveTier || 1) >= 2) {
                hasPremiumCaches = !!getCachedUserThemeSettings(uid) && !!getCachedUserFontSettings(uid);
            }

            if (cachedHome && isFresh && !hasPending && (localUpdatedAt === 0 || cachedHomeAt >= localUpdatedAt) && hasPremiumCaches) {
                console.log('Using cached user data, skipping Supabase load');
                return;
            }
        }

        const loadThemeAndFontSettings = async () => {
            if (effectiveTier >= 2) {
                const [themeRes, fontRes] = await Promise.all([
                    supabase.from('user_theme_settings').select('theme_settings').eq('user_id', uid).single(),
                    supabase.from('user_font_settings').select('font_settings').eq('user_id', uid).single()
                ]);

                const themeSettings = themeRes.error ? null : themeRes.data?.theme_settings;
                const fontSettings = fontRes.error ? null : fontRes.data?.font_settings;

                if (themeSettings && Object.keys(themeSettings).length > 0) {
                    setCachedUserThemeSettings(uid, themeSettings);
                    window.applyThemeSettings?.(themeSettings);
                    window.applyCustomThemeForCurrentMode?.();
                } else {
                    setCachedUserThemeSettings(uid, null);
                    window.clearCustomThemeSettings?.();
                }

                if (fontSettings && Object.keys(fontSettings).length > 0) {
                    setCachedUserFontSettings(uid, fontSettings);
                    window.applyFontSettings?.(fontSettings);
                } else {
                    setCachedUserFontSettings(uid, null);
                    window.clearCustomFontSettings?.();
                }
            } else {
                window.clearCustomThemeSettings?.();
                window.clearCustomFontSettings?.();
            }
        };

        const [homeRes, sitesRes, tagsRes, siteTagsRes, siteOrderRes, tagOrderRes] = await Promise.all([
            supabase.from('user_home_settings').select('*').eq('user_id', uid).single(),
            supabase.from('user_sites').select('id,name,url,show_on_home,created_at,updated_at').eq('user_id', uid),
            supabase.from('user_tags').select('name').eq('user_id', uid),
            supabase.from('user_site_tags').select('site_id,tag_name').eq('user_id', uid),
            supabase.from('user_site_order').select('site_id,position').eq('user_id', uid).order('position', { ascending: true }),
            supabase.from('user_tag_order').select('tag_name,position').eq('user_id', uid).order('position', { ascending: true })
        ]);

        if (homeRes.error && homeRes.error.code !== 'PGRST116') {
            console.error('Failed to load home settings:', homeRes.error);
            return;
        }

        const home = homeRes.data || null;
        const serverUpdatedAt = parseIsoToMs(home?.updated_at);
        const localUpdatedAt = getLocalUpdatedAt();
        const pending = getPendingHomeSync();
        const pendingUpdatedAt = parseIsoToMs(pending?.payload?.updated_at || pending?.updated_at);

        if (pending && pendingUpdatedAt > 0 && serverUpdatedAt > 0 && serverUpdatedAt > pendingUpdatedAt) {
            console.warn('Server data is newer than pending local sync. Discarding pending payload.');
            setPendingHomeSync(null);
        }

        if (localUpdatedAt > 0 && serverUpdatedAt > 0 && localUpdatedAt > serverUpdatedAt) {
            if (pending) {
                await flushPendingProfileSync();
            }
            await saveUserDataToBackend({ immediate: true });
            await loadThemeAndFontSettings();
            return;
        }

        const sites = Array.isArray(sitesRes.data) ? sitesRes.data : [];
        const tags = Array.isArray(tagsRes.data) ? tagsRes.data.map(t => t.name) : [];
        const siteTags = Array.isArray(siteTagsRes.data) ? siteTagsRes.data : [];

        const tagsBySiteId = new Map();
        siteTags.forEach((row) => {
            const list = tagsBySiteId.get(row.site_id) || [];
            list.push(row.tag_name);
            tagsBySiteId.set(row.site_id, list);
        });

        state.sites = sites.map((s) => ({
            id: s.id,
            name: s.name,
            url: s.url,
            tags: tagsBySiteId.get(s.id) || [],
            showOnHome: !!s.show_on_home
        }));
        state.tags = tags;

        const orderedSiteIds = Array.isArray(siteOrderRes.data) ? siteOrderRes.data.map(r => r.site_id) : [];
        state.siteOrder = orderedSiteIds.length ? orderedSiteIds : state.sites.filter(s => s.showOnHome).map(s => s.id);

        const orderedTags = Array.isArray(tagOrderRes.data) ? tagOrderRes.data.map(r => r.tag_name) : [];
        state.tagOrder = orderedTags.length ? orderedTags : [...state.tags];

        const serverSettings = migrateSettings({
            viewMode: home?.view_mode,
            engineIndex: home?.engine_index,
            engineId: home?.engine_id,
            enabledEngineIds: Array.isArray(home?.enabled_engine_ids) ? home.enabled_engine_ids : (home?.enabled_engine_ids || []),
            dateFormatIndex: home?.date_format_index,
            timeFormat: home?.time_format,
            locale: home?.locale,
            wallpaper: home?.wallpaper,
            theme: home?.theme,
            colorMode: home?.color_mode,
            schema_version: home?.schema_version
        });

        if (serverSettings) {
            if (typeof serverSettings.viewMode === 'string') state.viewMode = serverSettings.viewMode;
            if (serverSettings.engineIndex !== undefined) state.engineIndex = serverSettings.engineIndex;
            if (typeof serverSettings.engineId === 'string') state.engineId = normalizeEngineId(serverSettings.engineId);
            const normalizedEnabled = normalizeEnabledEngineIds(serverSettings.enabledEngineIds);
            if (normalizedEnabled) state.enabledEngineIds = normalizedEnabled;
            if (serverSettings.dateFormatIndex !== undefined) state.dateFormatIndex = serverSettings.dateFormatIndex;
            if (typeof serverSettings.timeFormat === 'string') state.timeFormat = serverSettings.timeFormat;

            if (typeof serverSettings.locale === 'string') {
                if (typeof i18n !== 'undefined' && i18n.setLocale) {
                    i18n.setLocale(serverSettings.locale, false);
                } else {
                    localStorage.setItem('locale', serverSettings.locale);
                }
            }

            if (Object.prototype.hasOwnProperty.call(serverSettings, 'wallpaper')) {
                window.applyWallpaper?.(serverSettings.wallpaper);
            }

            if (typeof serverSettings.theme === 'string') {
                state.currentTheme = serverSettings.theme;
                window.applyStyleTheme?.(state.currentTheme);
            }

            if (typeof serverSettings.colorMode === 'string') {
                const mode = serverSettings.colorMode === 'dark' ? 'dark' : 'light';
                document.body.classList.toggle('dark', mode === 'dark');
                document.body.classList.toggle('light', mode !== 'dark');
                localStorage.setItem('theme', mode);
                window.applyCustomThemeForCurrentMode?.();
            }
        }

        setCachedUserHomeConfig(uid, {
            sites: state.sites,
            tags: state.tags,
            site_order: state.siteOrder,
            tag_order: state.tagOrder,
            settings: {
                viewMode: state.viewMode,
                engineIndex: state.engineIndex,
                engineId: state.engineId || '',
                enabledEngineIds: Array.isArray(state.enabledEngineIds) ? state.enabledEngineIds : [],
                dateFormatIndex: state.dateFormatIndex,
                timeFormat: state.timeFormat,
                locale: (typeof i18n !== 'undefined' && i18n.currentLocale) ? i18n.currentLocale : (localStorage.getItem('locale') || 'zh'),
                wallpaper: window.wallpaperState?.selectedWallpaper || null,
                theme: state.currentTheme || 'handdrawn',
                colorMode: document.body.classList.contains('dark') ? 'dark' : 'light',
                schema_version: SETTINGS_SCHEMA_VERSION
            },
            updated_at: home?.updated_at || new Date().toISOString()
        });

        await loadThemeAndFontSettings();

        saveData(false);
        setLocalUpdatedAt(home?.updated_at || new Date().toISOString());

        window.renderHome?.();
        window.renderSearchEngine?.();
        window.updateTime?.();

        console.log('User data loaded successfully');
    } catch (err) {
        console.error('Error loading user data:', err);
    }
}

async function saveUserDataToBackend(options = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping save');
        return;
    }

    const doSync = async () => {
        let payload = null;
        try {
            const colorMode = document.body.classList.contains('dark') ? 'dark' : 'light';
            const updatedAt = new Date().toISOString();

            payload = {
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
                    schema_version: SETTINGS_SCHEMA_VERSION
                },
                updated_at: updatedAt
            };

            setCachedUserHomeConfig(window.authState.user.id, payload);

            const { ok } = await syncHomeConfigWithRetry(payload, { queueReason: 'saveUserDataToBackend_failed' });
            if (ok) {
                return;
            }
        } catch (err) {
            console.error('Error syncing data:', err);
            if (payload) {
                queueHomeSync(payload, 'saveUserDataToBackend_exception');
            } else {
                queueHomeSync({ updated_at: new Date().toISOString(), sites: [], tags: [], site_order: [], tag_order: [], settings: {} }, 'saveUserDataToBackend_exception');
            }
        }
    };

    if (syncDebounceTimer) {
        clearTimeout(syncDebounceTimer);
    }

    if (options.immediate) {
        await doSync();
        return;
    }

    syncDebounceTimer = setTimeout(async () => {
        await doSync();
    }, SYNC_DEBOUNCE_MS);
}

async function saveThemeSettings(themeSettings) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        throw new Error('Not logged in');
    }

    if (!window.membershipState || window.membershipState.tier < 2) {
        console.warn('Theme customization requires premium membership');
        throw new Error('premium membership required');
    }

    try {
        const updatedAt = new Date().toISOString();
        const { error } = await supabase
            .from('user_theme_settings')
            .upsert({ user_id: window.authState.user.id, theme_settings: themeSettings, updated_at: updatedAt }, { onConflict: 'user_id' });

        if (error) {
            console.error('Failed to save theme settings:', error);
            throw error;
        }

        setCachedUserThemeSettings(window.authState.user.id, themeSettings);
        return { ok: true };
    } catch (err) {
        console.error('Error saving theme settings:', err);
        throw err;
    }
}

async function saveFontSettings(fontSettings) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        throw new Error('Not logged in');
    }

    if (!window.membershipState || window.membershipState.tier < 2) {
        console.warn('Font customization requires premium membership');
        throw new Error('premium membership required');
    }

    try {
        const updatedAt = new Date().toISOString();
        const { error } = await supabase
            .from('user_font_settings')
            .upsert({ user_id: window.authState.user.id, font_settings: fontSettings, updated_at: updatedAt }, { onConflict: 'user_id' });

        if (error) {
            console.error('Failed to save font settings:', error);
            throw error;
        }

        setCachedUserFontSettings(window.authState.user.id, fontSettings);
        return { ok: true };
    } catch (err) {
        console.error('Error saving font settings:', err);
        throw err;
    }
}

async function resetThemeCustomization() {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        return;
    }

    if (!window.membershipState || window.membershipState.tier < 2) {
        console.warn('Theme customization requires premium membership');
        return;
    }

    try {
        const updatedAt = new Date().toISOString();
        await supabase
            .from('user_theme_settings')
            .upsert({ user_id: window.authState.user.id, theme_settings: {}, updated_at: updatedAt }, { onConflict: 'user_id' });
        await supabase
            .from('user_font_settings')
            .upsert({ user_id: window.authState.user.id, font_settings: {}, updated_at: updatedAt }, { onConflict: 'user_id' });

        setCachedUserThemeSettings(window.authState.user.id, null);
        setCachedUserFontSettings(window.authState.user.id, null);
    } catch (err) {
        console.error('Error resetting theme customization:', err);
    }
}

window.loadUserData = loadUserData;
window.saveUserDataToBackend = saveUserDataToBackend;
window.saveThemeSettings = saveThemeSettings;
window.saveFontSettings = saveFontSettings;
window.resetThemeCustomizationOnBackend = resetThemeCustomization;
window.markHomeConfigUpdated = markHomeConfigUpdated;
window.flushPendingProfileSync = flushPendingProfileSync;
window.applyCachedUserData = applyCachedUserData;

window.addEventListener('online', () => {
    if (window.authState && window.authState.isLoggedIn) {
        flushPendingProfileSync();
    }
});
