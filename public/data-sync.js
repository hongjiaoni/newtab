// ===== Data Synchronization Module =====

let syncDebounceTimer = null;
const SYNC_DEBOUNCE_MS = 500;

// Load user data from Supabase
async function loadUserData() {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping data load');
        return;
    }

    try {
        console.log('Loading user data from Supabase...');

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', window.authState.user.id)
            .single();

        if (error) {
            console.error('Failed to load user data:', error);
            return;
        }

        if (data) {
            // Merge server data with local state
            if (data.sites && data.sites.length > 0) {
                state.sites = data.sites;
            }
            if (data.tags && data.tags.length > 0) {
                state.tags = data.tags;
            }
            if (data.tag_order && data.tag_order.length > 0) {
                state.tagOrder = data.tag_order;
            }
            if (data.site_order && data.site_order.length > 0) {
                state.siteOrder = data.site_order;
            }

            // Load settings
            if (data.settings) {
                if (data.settings.viewMode) {
                    state.viewMode = data.settings.viewMode;
                }
                if (data.settings.engineIndex !== undefined) {
                    state.engineIndex = data.settings.engineIndex;
                }
                if (data.settings.dateFormatIndex !== undefined) {
                    state.dateFormatIndex = data.settings.dateFormatIndex;
                }
                if (data.settings.timeFormat) {
                    state.timeFormat = data.settings.timeFormat;
                }
                if (data.settings.wallpaper) {
                    if (window.applyWallpaper) {
                        window.applyWallpaper(data.settings.wallpaper);
                    }
                }
                if (data.settings.theme) {
                    state.currentTheme = data.settings.theme;
                }
            }

            // Load theme settings (tier 2+)
            if (data.theme_settings && Object.keys(data.theme_settings).length > 0) {
                if (window.applyThemeSettings) {
                    window.applyThemeSettings(data.theme_settings);
                }
            }

            // Load font settings (tier 2+)
            if (data.font_settings && Object.keys(data.font_settings).length > 0) {
                if (window.applyFontSettings) {
                    window.applyFontSettings(data.font_settings);
                }
            }

            // Save to localStorage for offline access
            saveData(false); // Don't trigger sync back

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
async function saveUserDataToBackend() {
    if (!window.authState || !window.authState.isLoggedIn || !supabase) {
        console.log('Not logged in, skipping save');
        return;
    }

    // Clear existing timer
    if (syncDebounceTimer) {
        clearTimeout(syncDebounceTimer);
    }

    // Debounce: wait 500ms before actually saving
    syncDebounceTimer = setTimeout(async () => {
        try {
            console.log('Syncing data to Supabase...');

            const userData = {
                sites: state.sites || [],
                tags: state.tags || [],
                tag_order: state.tagOrder || [],
                site_order: state.siteOrder || [],
                settings: {
                    viewMode: state.viewMode || 'general',
                    engineIndex: state.engineIndex || 0,
                    dateFormatIndex: state.dateFormatIndex || 0,
                    timeFormat: state.timeFormat || '24h',
                    wallpaper: window.wallpaperState?.selectedWallpaper || null,
                    theme: state.currentTheme || 'handdrawn'
                },
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('profiles')
                .update(userData)
                .eq('id', window.authState.user.id);

            if (error) {
                console.error('Failed to sync data:', error);
            } else {
                console.log('Data synced successfully');
            }
        } catch (err) {
            console.error('Error syncing data:', err);
        }
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
        const { error } = await supabase
            .from('profiles')
            .update({
                theme_settings: themeSettings,
                updated_at: new Date().toISOString()
            })
            .eq('id', window.authState.user.id);

        if (error) {
            console.error('Failed to save theme settings:', error);
        } else {
            console.log('Theme settings saved');
        }
    } catch (err) {
        console.error('Error saving theme settings:', err);
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
        const { error } = await supabase
            .from('profiles')
            .update({
                font_settings: fontSettings,
                updated_at: new Date().toISOString()
            })
            .eq('id', window.authState.user.id);

        if (error) {
            console.error('Failed to save font settings:', error);
        } else {
            console.log('Font settings saved');
        }
    } catch (err) {
        console.error('Error saving font settings:', err);
    }
}

// Export functions
window.loadUserData = loadUserData;
window.saveUserDataToBackend = saveUserDataToBackend;
window.saveThemeSettings = saveThemeSettings;
window.saveFontSettings = saveFontSettings;
