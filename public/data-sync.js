// ===== Data Synchronization Module =====

let syncDebounceTimer = null;
const SYNC_DEBOUNCE_MS = 500;
const LOCAL_UPDATED_AT_KEY = 'home_config_updated_at';
const PENDING_PROFILE_PATCH_KEY = 'home_config_pending_profile_patch';
const SETTINGS_SCHEMA_VERSION = 1;
let flushPendingInProgress = false;

function parseIsoToMs(v) {
    if (!v) return 0;
    const t = Date.parse(v);
    return Number.isFinite(t) ? t : 0;
}

function getPendingProfilePatch() {
    const raw = localStorage.getItem(PENDING_PROFILE_PATCH_KEY);
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (!obj || typeof obj !== 'object') return null;
        if (!obj.patch || typeof obj.patch !== 'object') return null;
        return obj;
    } catch {
        return null;
    }
}

function setPendingProfilePatch(obj) {
    if (!obj) {
        localStorage.removeItem(PENDING_PROFILE_PATCH_KEY);
        return;
    }
    localStorage.setItem(PENDING_PROFILE_PATCH_KEY, JSON.stringify(obj));
}

function shallowMergeProfilePatch(existingPatch, nextPatch) {
    const out = { ...(existingPatch || {}), ...(nextPatch || {}) };

    if (existingPatch && typeof existingPatch.settings === 'object' && existingPatch.settings) {
        out.settings = { ...existingPatch.settings };
    }
    if (nextPatch && typeof nextPatch.settings === 'object' && nextPatch.settings) {
        out.settings = { ...(out.settings || {}), ...nextPatch.settings };
    }

    return out;
}

function queueProfilePatch(patch, reason = 'unknown') {
    const pending = getPendingProfilePatch();
    const mergedPatch = shallowMergeProfilePatch(pending?.patch, patch);

    const updatedAt = mergedPatch.updated_at || new Date().toISOString();
    mergedPatch.updated_at = updatedAt;

    setPendingProfilePatch({
        patch: mergedPatch,
        reason,
        updated_at: updatedAt,
        created_at: pending?.created_at || new Date().toISOString(),
        attempts: (pending?.attempts || 0)
    });

    setLocalUpdatedAt(updatedAt);
}

async function updateProfileWithRetry(patch, { queueReason = 'update_failed' } = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        return { ok: false, queued: false };
    }

    if (!navigator.onLine) {
        queueProfilePatch(patch, 'offline');
        return { ok: false, queued: true };
    }

    const { error } = await supabase
        .from('profiles')
        .update(patch)
        .eq('id', window.authState.user.id);

    if (error) {
        console.error('Failed to sync data:', error);
        queueProfilePatch(patch, queueReason);
        return { ok: false, queued: true, error };
    }

    if (patch.updated_at) {
        setLocalUpdatedAt(patch.updated_at);
    }

    return { ok: true, queued: false };
}

async function flushPendingProfileSync() {
    if (flushPendingInProgress) return;
    if (!window.authState || !window.authState.isLoggedIn || !supabase) return;

    const pending = getPendingProfilePatch();
    if (!pending || !pending.patch) return;

    if (!navigator.onLine) return;

    flushPendingInProgress = true;
    try {
        const pendingUpdatedAtMs = parseIsoToMs(pending.patch.updated_at || pending.updated_at);
        if (pendingUpdatedAtMs > 0) {
            const { data: serverMeta, error: metaError } = await supabase
                .from('profiles')
                .select('updated_at')
                .eq('id', window.authState.user.id)
                .single();

            if (!metaError && serverMeta?.updated_at) {
                const serverUpdatedAtMs = parseIsoToMs(serverMeta.updated_at);
                if (serverUpdatedAtMs > pendingUpdatedAtMs) {
                    console.warn('Pending local changes are older than server. Discarding pending patch.');
                    setPendingProfilePatch(null);
                    setLocalUpdatedAt(serverMeta.updated_at);
                    return { status: 'discarded' };
                }
            }
        }

        const next = {
            ...pending.patch,
            updated_at: pending.patch.updated_at || new Date().toISOString()
        };

        const { ok } = await updateProfileWithRetry(next, { queueReason: 'flush_failed' });
        if (ok) {
            setPendingProfilePatch(null);
            return { status: 'flushed' };
        } else {
            const latest = getPendingProfilePatch();
            if (latest) {
                latest.attempts = (latest.attempts || 0) + 1;
                setPendingProfilePatch(latest);
            }
            return { status: 'failed' };
        }
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
        if (!Number.isFinite(s.dateFormatIndex)) s.dateFormatIndex = 0;
        if (typeof s.timeFormat !== 'string') s.timeFormat = '24h';
        if (typeof s.theme !== 'string') s.theme = 'handdrawn';
        if (typeof s.colorMode !== 'string') s.colorMode = (localStorage.getItem('theme') || 'light');
        if (typeof s.locale !== 'string') s.locale = (localStorage.getItem('locale') || 'zh');
        if (!Object.prototype.hasOwnProperty.call(s, 'wallpaper')) s.wallpaper = (localStorage.getItem('selectedWallpaper') || null);

        s.schema_version = SETTINGS_SCHEMA_VERSION;
    } else if (v !== SETTINGS_SCHEMA_VERSION) {
        s.schema_version = SETTINGS_SCHEMA_VERSION;
    }

    return s;
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

function markHomeConfigUpdated() {
    const now = new Date().toISOString();
    setLocalUpdatedAt(now);

    if (window.authState && window.authState.isLoggedIn) {
        saveUserDataToBackend();
    }
}

// Load user data from Supabase
async function loadUserData() {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping data load');
        return;
    }

    try {
        console.log('Loading user data from Supabase...');

        let { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', window.authState.user.id)
            .single();

        if (error) {
            console.error('Failed to load user data:', error);
            return;
        }

        if (data) {
            const serverUpdatedAt = parseIsoToMs(data.updated_at);
            const localUpdatedAt = getLocalUpdatedAt();
            const effectiveTier = Number.isFinite(data.membership_tier) ? data.membership_tier : (window.membershipState?.tier || 1);
            const pending = getPendingProfilePatch();
            const pendingUpdatedAt = parseIsoToMs(pending?.patch?.updated_at || pending?.updated_at);

            if (pending && pendingUpdatedAt > 0 && serverUpdatedAt > 0 && serverUpdatedAt > pendingUpdatedAt) {
                console.warn('Server data is newer than pending local patch. Discarding pending patch.');
                setPendingProfilePatch(null);
            }

            if (localUpdatedAt > 0 && serverUpdatedAt > 0 && localUpdatedAt > serverUpdatedAt) {
                if (pending) {
                    console.log('Local pending changes are newer than server, flushing pending patch first...');
                    await flushPendingProfileSync();

                    // Re-fetch once after flush attempt (avoid recursive loops if flush keeps failing)
                    ({ data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', window.authState.user.id)
                        .single());

                    if (error || !data) {
                        console.error('Failed to reload user data after pending flush:', error);
                        return;
                    }
                }
                console.log('Local data is newer than server, pushing local data to Supabase...');
                await saveUserDataToBackend({ immediate: true });
                return;
            }

            if (Array.isArray(data.sites)) {
                state.sites = data.sites;
            }
            if (Array.isArray(data.tags)) {
                state.tags = data.tags;
            }
            if (Array.isArray(data.tag_order)) {
                state.tagOrder = data.tag_order;
            }
            if (Array.isArray(data.site_order)) {
                state.siteOrder = data.site_order;
            }

            // Load settings
            const serverSettings = migrateSettings(data.settings);
            if (serverSettings) {
                if (typeof serverSettings.viewMode === 'string') {
                    state.viewMode = serverSettings.viewMode;
                }
                if (serverSettings.engineIndex !== undefined) {
                    state.engineIndex = serverSettings.engineIndex;
                }
                if (serverSettings.dateFormatIndex !== undefined) {
                    state.dateFormatIndex = serverSettings.dateFormatIndex;
                }
                if (typeof serverSettings.timeFormat === 'string') {
                    state.timeFormat = serverSettings.timeFormat;
                }
                if (typeof serverSettings.locale === 'string') {
                    if (typeof i18n !== 'undefined' && i18n.setLocale) {
                        i18n.setLocale(serverSettings.locale, false);
                    } else {
                        localStorage.setItem('locale', serverSettings.locale);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(serverSettings, 'wallpaper')) {
                    if (window.applyWallpaper) {
                        window.applyWallpaper(serverSettings.wallpaper);
                    }
                }
                if (typeof serverSettings.theme === 'string') {
                    state.currentTheme = serverSettings.theme;
                }
                if (typeof serverSettings.colorMode === 'string') {
                    const mode = serverSettings.colorMode === 'dark' ? 'dark' : 'light';
                    document.body.classList.toggle('dark', mode === 'dark');
                    document.body.classList.toggle('light', mode !== 'dark');
                    localStorage.setItem('theme', mode);
                    if (window.applyCustomThemeForCurrentMode) {
                        window.applyCustomThemeForCurrentMode();
                    }
                }
            }

            if (effectiveTier >= 2) {
                if (data.theme_settings && Object.keys(data.theme_settings).length > 0) {
                    if (window.applyThemeSettings) {
                        window.applyThemeSettings(data.theme_settings);
                    }
                    if (window.applyCustomThemeForCurrentMode) {
                        window.applyCustomThemeForCurrentMode();
                    }
                } else {
                    if (window.clearCustomThemeSettings) {
                        window.clearCustomThemeSettings();
                    }
                }

                if (data.font_settings && Object.keys(data.font_settings).length > 0) {
                    if (window.applyFontSettings) {
                        window.applyFontSettings(data.font_settings);
                    }
                } else {
                    if (window.clearCustomFontSettings) {
                        window.clearCustomFontSettings();
                    }
                }
            } else {
                if (window.clearCustomThemeSettings) {
                    window.clearCustomThemeSettings();
                }
                if (window.clearCustomFontSettings) {
                    window.clearCustomFontSettings();
                }
            }

            // Save to localStorage for offline access
            saveData(false); // Don't trigger sync back
            setLocalUpdatedAt(data.updated_at || new Date().toISOString());

            // Re-render UI
            if (window.renderHome) window.renderHome();
            if (window.renderSearchEngine) window.renderSearchEngine();
            if (window.updateTime) window.updateTime();

            console.log('User data loaded successfully');
        }
    } catch (err) {
        console.error('Error loading user data:', err);
    }
}

// Save user data to Supabase (with debouncing)
async function saveUserDataToBackend(options = {}) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping save');
        return;
    }

    const doSync = async () => {
        let userData = null;
        try {
            console.log('Syncing data to Supabase...');

            const colorMode = document.body.classList.contains('dark') ? 'dark' : 'light';
            const updatedAt = new Date().toISOString();

            userData = {
                sites: state.sites || [],
                tags: state.tags || [],
                tag_order: state.tagOrder || [],
                site_order: state.siteOrder || [],
                settings: {
                    viewMode: state.viewMode || 'general',
                    engineIndex: state.engineIndex || 0,
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

            const { ok } = await updateProfileWithRetry(userData, { queueReason: 'saveUserDataToBackend_failed' });
            if (ok) {
                console.log('Data synced successfully');
            }
        } catch (err) {
            console.error('Error syncing data:', err);
            if (userData) {
                queueProfilePatch(userData, 'saveUserDataToBackend_exception');
            } else {
                queueProfilePatch({ updated_at: new Date().toISOString() }, 'saveUserDataToBackend_exception');
            }
        }
    };

    // Clear existing timer
    if (syncDebounceTimer) {
        clearTimeout(syncDebounceTimer);
    }

    if (options.immediate) {
        await doSync();
        return;
    }

    // Debounce: wait 500ms before actually saving
    syncDebounceTimer = setTimeout(async () => {
        await doSync();
    }, SYNC_DEBOUNCE_MS);
}

// Save theme settings (tier 2+ only)
async function saveThemeSettings(themeSettings) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        return;
    }

    if (!window.membershipState || window.membershipState.tier < 2) {
        console.warn('Theme customization requires premium membership');
        return;
    }

    try {
        const updatedAt = new Date().toISOString();
        const patch = {
            theme_settings: themeSettings,
            updated_at: updatedAt
        };
        const { ok } = await updateProfileWithRetry(patch, { queueReason: 'saveThemeSettings_failed' });
        if (ok) {
            console.log('Theme settings saved');
        }
    } catch (err) {
        console.error('Error saving theme settings:', err);
        queueProfilePatch({ theme_settings: themeSettings, updated_at: new Date().toISOString() }, 'saveThemeSettings_exception');
    }
}

// Save font settings (tier 2+ only)
async function saveFontSettings(fontSettings) {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        return;
    }

    if (!window.membershipState || window.membershipState.tier < 2) {
        console.warn('Font customization requires premium membership');
        return;
    }

    try {
        const updatedAt = new Date().toISOString();
        const patch = {
            font_settings: fontSettings,
            updated_at: updatedAt
        };
        const { ok } = await updateProfileWithRetry(patch, { queueReason: 'saveFontSettings_failed' });
        if (ok) {
            console.log('Font settings saved');
        }
    } catch (err) {
        console.error('Error saving font settings:', err);
        queueProfilePatch({ font_settings: fontSettings, updated_at: new Date().toISOString() }, 'saveFontSettings_exception');
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
        const patch = {
            theme_settings: {},
            font_settings: {},
            updated_at: updatedAt
        };
        await updateProfileWithRetry(patch, { queueReason: 'resetThemeCustomization_failed' });
    } catch (err) {
        console.error('Error resetting theme customization:', err);
        queueProfilePatch({ theme_settings: {}, font_settings: {}, updated_at: new Date().toISOString() }, 'resetThemeCustomization_exception');
    }
}

// Export functions
window.loadUserData = loadUserData;
window.saveUserDataToBackend = saveUserDataToBackend;
window.saveThemeSettings = saveThemeSettings;
window.saveFontSettings = saveFontSettings;
window.resetThemeCustomizationOnBackend = resetThemeCustomization;
window.markHomeConfigUpdated = markHomeConfigUpdated;
window.flushPendingProfileSync = flushPendingProfileSync;

window.addEventListener('online', () => {
    if (window.authState && window.authState.isLoggedIn) {
        flushPendingProfileSync();
    }
});
