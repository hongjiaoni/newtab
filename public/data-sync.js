// ===== Data Synchronization Module (Refactored) =====

let syncDebounceTimer = null;
const SYNC_DEBOUNCE_MS = 500;
const USER_DATA_REFRESH_MS = 20 * 1000;
const PENDING_SYNC_MAX_AGE_MS = 2 * 60 * 1000;
const HOME_CONFIG_KEY_PREFIX = 'user_home_config_';
const CONFIG_META_KEY_PREFIX = 'user_config_meta_';
const CURRENT_SYNC_SESSION_ID = `sync-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
const SYNC_ERROR_NOTIFICATION_THROTTLE_MS = 30 * 1000;
let userDataLoadPromise = null;
let userDataRefreshTimer = null;
let lastSyncNotificationAt = 0;

function getSupabaseClient() {
    const client = window.supabase;
    if (client && typeof client.from === 'function') {
        return client;
    }
    return null;
}

function notifySyncStatus(messageKey, fallback, type = 'warning') {
    if (typeof window.showNotification !== 'function') return;
    const now = Date.now();
    if (now - lastSyncNotificationAt < SYNC_ERROR_NOTIFICATION_THROTTLE_MS) return;
    lastSyncNotificationAt = now;

    const message = (typeof i18n !== 'undefined' && typeof i18n.t === 'function')
        ? (i18n.t(messageKey) !== messageKey ? i18n.t(messageKey) : fallback)
        : fallback;
    window.showNotification(message, type);
}

function isUserDataRuntimeReady() {
    return (
        typeof state !== 'undefined' &&
        typeof i18n !== 'undefined' &&
        typeof window.renderHome === 'function' &&
        typeof window.renderSearchEngine === 'function' &&
        typeof window.updateTime === 'function'
    );
}

async function waitForUserDataRuntimeReady(timeoutMs = 4000) {
    const deadline = Date.now() + timeoutMs;
    while (!isUserDataRuntimeReady()) {
        if (Date.now() >= deadline) {
            return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 25));
    }
    return true;
}

function getHomeConfigCacheKey(uid) {
    return HOME_CONFIG_KEY_PREFIX + uid;
}

function parseTimestamp(value) {
    if (!value) return 0;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
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

function isCurrentSessionPending(sectionMeta) {
    if (!sectionMeta?.pending) return false;
    if (!sectionMeta.pendingSessionId) return false;

    const pendingTs = parseTimestamp(sectionMeta.pendingSince || sectionMeta.localUpdatedAt);
    const ageMs = pendingTs ? Math.max(0, Date.now() - pendingTs) : Number.POSITIVE_INFINITY;

    return sectionMeta.pendingSessionId === CURRENT_SYNC_SESSION_ID && ageMs <= PENDING_SYNC_MAX_AGE_MS;
}

function clearExpiredPendingMeta(uid, section) {
    if (!uid || !section) return false;

    const sectionMeta = getConfigMeta(uid)[section] || {};
    if (!sectionMeta.pending) return false;
    if (isCurrentSessionPending(sectionMeta)) return true;

    updateConfigMeta(uid, section, {
        pending: false,
        pendingSince: null,
        pendingSessionId: null
    });
    return false;
}

function shouldApplyRemoteConfig(uid, section, remoteUpdatedAt) {
    const sectionMeta = getConfigMeta(uid)[section] || {};
    const remoteTs = parseTimestamp(remoteUpdatedAt);
    const localTs = parseTimestamp(sectionMeta.localUpdatedAt);
    const hasFreshPending = clearExpiredPendingMeta(uid, section);

    if (!remoteTs) return !hasFreshPending;
    if (hasFreshPending && localTs > remoteTs) return false;
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
    return clearExpiredPendingMeta(uid, section);
}

function hasAnyPendingUserConfig(uid) {
    if (!uid) return false;
    return hasPendingConfigSync(uid, 'home');
}

function clearPendingMeta(uid, section, syncedAt) {
    updateConfigMeta(uid, section, {
        localUpdatedAt: syncedAt,
        remoteUpdatedAt: syncedAt,
        pending: false,
        pendingSince: null,
        pendingSessionId: null
    });
}

function normalizeAppearanceValue(value) {
    if (value === 'system') return 'auto';
    return ['light', 'dark', 'auto'].includes(value) ? value : 'auto';
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

function isMissingRelationError(err) {
    const message = String(err?.message || '').toLowerCase();
    const details = String(err?.details || '').toLowerCase();
    return String(err?.code || '') === '42P01'
        || ((message + details).includes('relation') && (message + details).includes('does not exist'));
}

function isMissingFunctionError(err) {
    const message = String(err?.message || '').toLowerCase();
    const details = String(err?.details || '').toLowerCase();
    return String(err?.code || '') === '42883'
        || ((message + details).includes('function') && (message + details).includes('does not exist'));
}

function isNoRowsError(err) {
    return String(err?.code || '') === 'PGRST116';
}

function isUuidLike(value) {
    return typeof value === 'string'
        && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function generateSyncUuid() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
        return globalThis.crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function ensureSiteIdsAreUuid() {
    if (typeof state === 'undefined' || !Array.isArray(state.sites)) return;

    const idMap = new Map();
    let changed = false;

    state.sites = state.sites.map((site) => {
        if (isUuidLike(site?.id)) return site;
        const nextId = generateSyncUuid();
        idMap.set(String(site?.id), nextId);
        changed = true;
        return { ...site, id: nextId };
    });

    if (!changed) return;

    if (Array.isArray(state.siteOrder)) {
        state.siteOrder = state.siteOrder.map((id) => idMap.get(String(id)) || id);
    }

    try {
        localStorage.setItem('sites', JSON.stringify(state.sites));
        localStorage.setItem('siteOrder', JSON.stringify(state.siteOrder || []));
    } catch (_err) {
    }
}

function compactSupabaseError(err) {
    if (!err) return '';
    return [err.code, err.message, err.details].filter(Boolean).join(' | ');
}

async function readMaybe(queryPromise) {
    const res = await queryPromise;
    if (res?.error && !isNoRowsError(res.error) && !isMissingRelationError(res.error)) {
        console.warn('Optional sync read failed:', compactSupabaseError(res.error));
    }
    if (res?.error) {
        return { data: null, error: res.error };
    }
    return res || { data: null, error: null };
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
        url: row.url || '',
        showOnHome: row.show_on_home !== false,
        tags: siteTagMap.get(row.id) || [],
        type: row.type === 'folder' ? 'folder' : 'link',
        children: row.type === 'folder' ? (Array.isArray(row.children) ? row.children : []) : undefined,
        customIcon: row.icon || undefined
    }));

    const orderedSiteIds = (legacy.siteOrderRows || [])
        .slice()
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((row) => row.site_id);

    const orderedTagNames = (legacy.tagOrderRows || [])
        .slice()
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((row) => row.tag_name);

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
            // color_mode now stores 'light' | 'dark' | 'auto'
            appearance: normalizeAppearanceValue(legacy.settingsRow.color_mode),
            // undefined when the accent column doesn't exist yet: the local choice stays
            accent: legacy.settingsRow.accent_color || undefined,
            zoomLevel: legacy.settingsRow?.zoom_level || '100',
            openBehavior: legacy.settingsRow?.open_behavior || 'newtab'
        },
        workbench: legacy.settingsRow?.workbench || null
    };
}

async function fetchLegacyConfigs(uid) {
    const db = getSupabaseClient();
    if (!db) {
        throw new Error('Supabase client is not ready');
    }

    const [
        settingsRes,
        sitesRes,
        tagsRes,
        siteTagsRes,
        siteOrderRes,
        tagOrderRes
    ] = await Promise.all([
        readMaybe(db.from('user_home_settings').select('*').eq('user_id', uid).single()),
        readSitesRows(db, uid),
        readMaybe(db.from('user_tags').select('name').eq('user_id', uid)),
        readMaybe(db.from('user_site_tags').select('site_id,tag_name').eq('user_id', uid)),
        readMaybe(db.from('user_site_order').select('site_id,position').eq('user_id', uid)),
        readMaybe(db.from('user_tag_order').select('tag_name,position').eq('user_id', uid))
    ]);

    const homeConfig = buildHomeConfigFromLegacy({
        settingsRow: settingsRes.data,
        sitesRows: Array.isArray(sitesRes) ? sitesRes : (sitesRes?.data || []),
        tagsRows: tagsRes.data || [],
        siteTagsRows: siteTagsRes.data || [],
        siteOrderRows: siteOrderRes.data || [],
        tagOrderRows: tagOrderRes.data || []
    });

    return {
        homeConfig,
        homeUpdatedAt: settingsRes.data?.updated_at
    };
}

// True once a read shows user_sites has no `icon` column yet
// (supabase_glass_migration.sql not applied). Custom icons then stay local.
let siteIconColumnMissing = false;

async function readSitesRows(db, uid) {
    const withIcon = await readMaybe(db.from('user_sites').select('id,name,url,show_on_home,type,children,icon').eq('user_id', uid));
    if (withIcon && Array.isArray(withIcon.data)) {
        siteIconColumnMissing = false;
        return withIcon.data;
    }
    siteIconColumnMissing = true;
    const full = await readMaybe(db.from('user_sites').select('id,name,url,show_on_home,type,children').eq('user_id', uid));
    if (full && Array.isArray(full.data)) {
        return full.data;
    }
    // Columns may not exist yet (migration not applied) — fall back to the basic schema.
    const basic = await readMaybe(db.from('user_sites').select('id,name,url,show_on_home').eq('user_id', uid));
    if (basic && Array.isArray(basic.data)) {
        return basic.data;
    }
    return [];
}

function buildHomeSettingsRow(uid, payload, syncedAt) {
    const s = payload?.settings || {};
    return {
        user_id: uid,
        view_mode: s.viewMode || 'general',
        engine_index: Number.isFinite(s.engineIndex) ? s.engineIndex : 0,
        engine_id: s.engineId || null,
        enabled_engine_ids: Array.isArray(s.enabledEngineIds) ? s.enabledEngineIds : [],
        date_format_index: Number.isFinite(s.dateFormatIndex) ? s.dateFormatIndex : 0,
        time_format: s.timeFormat || '24h',
        locale: s.locale || 'zh',
        wallpaper: Object.prototype.hasOwnProperty.call(s, 'wallpaper') ? s.wallpaper : null,
        theme: 'glass',
        color_mode: normalizeAppearanceValue(s.appearance),
        accent_color: s.accent || 'blue',
        zoom_level: s.zoomLevel || '100',
        open_behavior: s.openBehavior || 'newtab',
        workbench: payload?.workbench || null,
        updated_at: syncedAt
    };
}

async function writeOptionalTable(operationName, runner) {
    const res = await runner();
    if (res?.error) {
        if (isMissingRelationError(res.error)) {
            console.warn(`Skipping missing optional sync table during ${operationName}:`, compactSupabaseError(res.error));
            return false;
        }
        throw res.error;
    }
    return true;
}

async function writeRequiredTable(operationName, runner) {
    const res = await runner();
    if (res?.error) {
        throw new Error(`${operationName} failed: ${compactSupabaseError(res.error)}`);
    }
    return true;
}

async function writeHomeSettingsRow(uid, payload, syncedAt) {
    const db = getSupabaseClient();
    try {
        await writeRequiredTable('home settings upsert', () => (
            db
                .from('user_home_settings')
                .upsert(buildHomeSettingsRow(uid, payload, syncedAt), { onConflict: 'user_id' })
        ));
        return;
    } catch (err) {
        // Migration not applied yet: the new columns (zoom_level / open_behavior / workbench)
        // are missing, so retry with the legacy column set instead of failing the whole sync.
        const msg = compactSupabaseError(err).toLowerCase();
        if (msg.includes('zoom_level') || msg.includes('open_behavior') || msg.includes('workbench') || msg.includes('accent_color') || msg.includes('column')) {
            const s = payload?.settings || {};
            await writeRequiredTable('home settings upsert (legacy)', () => (
                db
                    .from('user_home_settings')
                    .upsert({
                        user_id: uid,
                        view_mode: s.viewMode || 'general',
                        engine_index: Number.isFinite(s.engineIndex) ? s.engineIndex : 0,
                        engine_id: s.engineId || null,
                        enabled_engine_ids: Array.isArray(s.enabledEngineIds) ? s.enabledEngineIds : [],
                        date_format_index: Number.isFinite(s.dateFormatIndex) ? s.dateFormatIndex : 0,
                        time_format: s.timeFormat || '24h',
                        locale: s.locale || 'zh',
                        wallpaper: Object.prototype.hasOwnProperty.call(s, 'wallpaper') ? s.wallpaper : null,
                        theme: 'glass',
                        color_mode: normalizeAppearanceValue(s.appearance),
                        updated_at: syncedAt
                    }, { onConflict: 'user_id' })
            ));
            return;
        }
        throw err;
    }
}

async function saveLegacyHomeConfigFallback(uid, payload, syncedAt) {
    const db = getSupabaseClient();
    if (!db) {
        throw new Error('Supabase client is not ready');
    }

    const sites = Array.isArray(payload?.sites) ? payload.sites : [];
    const tags = Array.isArray(payload?.tags) ? payload.tags : [];
    const siteOrder = Array.isArray(payload?.site_order) ? payload.site_order : [];
    const tagOrder = Array.isArray(payload?.tag_order) ? payload.tag_order : [];

    await writeHomeSettingsRow(uid, payload, syncedAt);

    const hasSitesTable = await writeOptionalTable('sites delete', () => (
        db.from('user_sites').delete().eq('user_id', uid)
    ));
    if (hasSitesTable && sites.length) {
        const rowsFull = sites.map((site) => ({
            id: site.id,
            user_id: uid,
            name: site.name || '',
            url: site.url || '',
            show_on_home: site.showOnHome !== false,
            type: site.type === 'folder' ? 'folder' : 'link',
            children: site.type === 'folder' ? (Array.isArray(site.children) ? site.children : []) : [],
            icon: site.customIcon || null,
            updated_at: syncedAt
        }));
        let ok;
        try {
            ok = await writeOptionalTable('sites insert', () => db.from('user_sites').insert(rowsFull));
        } catch (err) {
            // `icon` column missing (migration not applied): retry without it.
            if (!/icon/i.test(compactSupabaseError(err))) throw err;
            siteIconColumnMissing = true;
            ok = await writeOptionalTable('sites insert (no icon)', () => (
                db.from('user_sites').insert(rowsFull.map(({ icon, ...row }) => row))
            ));
        }
        if (!ok) {
            // Migration not applied: retry without type/children columns
            const rowsLegacy = rowsFull.map((r) => ({
                id: r.id,
                user_id: r.user_id,
                name: r.name,
                url: r.url,
                show_on_home: r.show_on_home,
                updated_at: r.updated_at
            }));
            await writeOptionalTable('sites insert (legacy)', () => db.from('user_sites').insert(rowsLegacy));
        }
    }

    const hasTagsTable = await writeOptionalTable('tags delete', () => (
        db.from('user_tags').delete().eq('user_id', uid)
    ));
    if (hasTagsTable && tags.length) {
        await writeOptionalTable('tags insert', () => (
            db.from('user_tags').insert(tags.map((name) => ({
                user_id: uid,
                name,
                updated_at: syncedAt
            })))
        ));
    }

    const hasSiteTagsTable = await writeOptionalTable('site tags delete', () => (
        db.from('user_site_tags').delete().eq('user_id', uid)
    ));
    if (hasSiteTagsTable) {
        const rows = [];
        for (const site of sites) {
            if (!site?.id || !Array.isArray(site.tags)) continue;
            for (const tagName of site.tags) {
                if (tagName) {
                    rows.push({
                        user_id: uid,
                        site_id: site.id,
                        tag_name: tagName
                    });
                }
            }
        }
        if (rows.length) {
            await writeOptionalTable('site tags insert', () => db.from('user_site_tags').insert(rows));
        }
    }

    const hasSiteOrderTable = await writeOptionalTable('site order delete', () => (
        db.from('user_site_order').delete().eq('user_id', uid)
    ));
    if (hasSiteOrderTable && siteOrder.length) {
        await writeOptionalTable('site order insert', () => (
            db.from('user_site_order').insert(siteOrder.map((siteId, index) => ({
                user_id: uid,
                site_id: siteId,
                position: index
            })))
        ));
    }

    const hasTagOrderTable = await writeOptionalTable('tag order delete', () => (
        db.from('user_tag_order').delete().eq('user_id', uid)
    ));
    if (hasTagOrderTable && tagOrder.length) {
        await writeOptionalTable('tag order insert', () => (
            db.from('user_tag_order').insert(tagOrder.map((tagName, index) => ({
                user_id: uid,
                tag_name: tagName,
                position: index
            })))
        ));
    }
}

let rpcDisabledForSession = false;

async function saveLegacyHomeConfig(payload, syncedAt) {
    const db = getSupabaseClient();
    if (!db) {
        throw new Error('Supabase client is not ready');
    }

    const uid = window.authState?.user?.id;
    if (!uid) throw new Error('Missing authenticated user id');

    // If the RPC proved incompatible (e.g. missing ::uuid casts on an old schema),
    // skip it for the rest of the session and write tables directly.
    if (rpcDisabledForSession) {
        await saveLegacyHomeConfigFallback(uid, payload, syncedAt);
        return;
    }

    const { error } = await db.rpc('sync_home_config', {
        p_payload: {
            ...payload,
            updated_at: syncedAt
        }
    });
    if (!error) return;

    const code = String(error.code || '');
    const detail = String(error.message || '') + ' ' + String(error.details || '');
    if (['42804', '42703', '42P01', '42704'].includes(code) || /uuid|type text|type mismatch|does not exist|column .* does not exist|relation .* does not exist/i.test(detail)) {
        // Deployed RPC predates the latest schema (missing ::uuid casts / columns).
        // Table sync still works, so disable the RPC for this session and log once.
        rpcDisabledForSession = true;
        console.warn('sync_home_config RPC incompatible with the current schema (' + code + '). Using direct table sync for this session. Re-run supabase_folders_migration.sql to re-enable the RPC.');
    } else {
        console.warn('sync_home_config failed, falling back to table sync:', compactSupabaseError(error));
    }
    await saveLegacyHomeConfigFallback(uid, payload, syncedAt);
}

function buildCurrentHomePayload() {
    ensureSiteIdsAreUuid();

    return {
        sites: (state.sites || []).map(s => ({
            id: s.id,
            name: s.name,
            url: s.url || '',
            tags: Array.isArray(s.tags) ? s.tags : [],
            showOnHome: !!s.showOnHome,
            type: s.type === 'folder' ? 'folder' : 'link',
            children: s.type === 'folder' ? (Array.isArray(s.children) ? s.children : []) : undefined,
            customIcon: s.customIcon || undefined
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
            appearance: normalizeAppearanceValue(window.getAppearance?.()),
            // Same value under the old key: the sync_home_config RPC deployed
            // before supabase_glass_migration.sql reads settings.colorMode.
            colorMode: normalizeAppearanceValue(window.getAppearance?.()),
            accent: window.getAccent?.() || 'blue',
            zoomLevel: state.zoomLevel || '100',
            openBehavior: state.openBehavior || 'newtab'
        },
        // Chat messages stay on this device (see workbenchSyncPayload in workspace.js)
        workbench: window.getWorkbenchSyncPayload ? window.getWorkbenchSyncPayload() : (window.workbench || undefined)
    };
}

async function persistHomeConfig(uid, payload, syncedAt) {
    localStorage.setItem(getHomeConfigCacheKey(uid), JSON.stringify(payload));
    updateConfigMeta(uid, 'home', {
        localUpdatedAt: syncedAt,
        pending: true,
        pendingSince: syncedAt,
        pendingSessionId: CURRENT_SYNC_SESSION_ID
    });

    await saveLegacyHomeConfig(payload, syncedAt);
    clearPendingMeta(uid, 'home', syncedAt);
}

// Applies the parsed Home Config payload directly to internal running state
function applyHomeConfig(config) {
    if (!config || typeof config !== 'object') return;

    if (Array.isArray(config.sites)) {
        // Without the icon column the server can't return custom icons; keep
        // the ones this device has instead of wiping them on every refresh.
        if (siteIconColumnMissing && Array.isArray(state.sites)) {
            const localIcons = new Map(state.sites.filter((x) => x && x.customIcon).map((x) => [x.id, x.customIcon]));
            config.sites.forEach((site) => {
                if (site && !site.customIcon && localIcons.has(site.id)) site.customIcon = localIcons.get(site.id);
            });
        }
        state.sites = config.sites;
    }
    if (Array.isArray(config.tags)) state.tags = config.tags;
    if (Array.isArray(config.site_order)) state.siteOrder = config.site_order;
    if (Array.isArray(config.tag_order)) state.tagOrder = config.tag_order;
    // Tags became folders: convert cloud data from older clients, then save the
    // converted layout back (deferred so it doesn't run inside the load).
    if (window.migrateTagsToFolders?.()) setTimeout(() => window.saveData?.(), 0);

    const s = config.settings || {};
    state.openFolderId = null;

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

    if (typeof s.openBehavior === 'string') {
        state.openBehavior = s.openBehavior === 'current' ? 'current' : 'newtab';
        localStorage.setItem('openBehavior', state.openBehavior);
    }

    if (config.workbench && typeof window.applyRemoteWorkbench === 'function') {
        window.applyRemoteWorkbench(config.workbench);
    }

    if (typeof s.zoomLevel === 'string' && window.applyZoomLevel) {
        window.applyZoomLevel(s.zoomLevel, false);
    }

    if (Object.prototype.hasOwnProperty.call(s, 'wallpaper') && window.applyWallpaper) {
        window.applyWallpaper(s.wallpaper, { sync: false });
    }

    if (typeof s.appearance === 'string') {
        window.setAppearance?.(s.appearance, { sync: false });
    }
    if (typeof s.accent === 'string') {
        window.setAccent?.(s.accent, { sync: false });
    }
}

// 1. Initial Cached Load -> 2. Remote Fetch Overwrite
// The app now standardizes on the normalized Supabase schema:
// user_home_settings + user_sites + user_tags + user_site_tags + order tables
async function loadUserData(options = {}) {
    const db = getSupabaseClient();
    if (!window.authState || !window.authState.isLoggedIn || !db) {
        return;
    }

    if (userDataLoadPromise) {
        return userDataLoadPromise;
    }

    const uid = window.authState.user.id;
    userDataLoadPromise = (async () => {

        const preferRemote = options.force === true || options.skipLocalHydration === true;

        clearExpiredPendingMeta(uid, 'home');

        // === Phase 1: Local Cache Immediate Hydration ===
        if (!options.skipLocalHydration) {
            try {
                const localHome = localStorage.getItem(getHomeConfigCacheKey(uid));
                
                if (localHome) applyHomeConfig(JSON.parse(localHome));

                window.renderHome?.();
                window.renderSearchEngine?.();
                window.updateTime?.();
            } catch (e) {
                console.warn('Failed to parse local cached configs', e);
            }
        }

        // === Phase 2: Remote DB Overwrite ===
        try {

            let requiresRender = false;
            const remoteRes = await fetchLegacyConfigs(uid);
            const homeCacheKey = getHomeConfigCacheKey(uid);
            const currentHomeRaw = localStorage.getItem(homeCacheKey);

            if (remoteRes.homeConfig && (preferRemote || shouldApplyRemoteConfig(uid, 'home', remoteRes.homeUpdatedAt))) {
                const nextHomeRaw = stringifyConfig(remoteRes.homeConfig);
                const homeChanged = currentHomeRaw !== nextHomeRaw;

                localStorage.setItem(homeCacheKey, nextHomeRaw);
                updateConfigMeta(uid, 'home', {
                    localUpdatedAt: remoteRes.homeUpdatedAt || new Date().toISOString(),
                    remoteUpdatedAt: remoteRes.homeUpdatedAt || new Date().toISOString(),
                    pending: false,
                    pendingSince: null,
                    pendingSessionId: null
                });

                applyHomeConfig(remoteRes.homeConfig);
                if (homeChanged) {
                    requiresRender = true;
                }
            }

            if (requiresRender) {
                window.renderHome?.();
                window.renderSearchEngine?.();
                window.updateTime?.();
            }
        } catch (err) {
            console.error('Error fetching remote configs:', err);
            notifySyncStatus('syncLoadFailed', 'Failed to sync the latest settings. Please try again later.');
        } finally {
            userDataLoadPromise = null;
        }
    })();

    return userDataLoadPromise;
}

// Aggressive overwrite save for Home Config
async function saveUserDataToBackend(immediate = true) {
    if (!window.authState || !window.authState.isLoggedIn || !getSupabaseClient()) return false;

    const doSync = async () => {
        try {
            const uid = window.authState.user.id;
            const syncedAt = new Date().toISOString();
            const payload = buildCurrentHomePayload();
            await persistHomeConfig(uid, payload, syncedAt);
            return true;
        } catch (err) {
            console.error('Error saving home config:', err);
            notifySyncStatus('syncSaveFailed', 'Save failed: ' + String(err?.message || err), 'error');
            return false;
        }
    };

    if (immediate !== false) {
        return await doSync();
    }

    if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(async () => {
        await doSync();
    }, SYNC_DEBOUNCE_MS);
    return true;
}

function markHomeConfigUpdated() {
    return saveUserDataToBackend(true);
}

function flushPendingProfileSync() {
    if (!navigator.onLine || !window.authState?.user || !getSupabaseClient()) {
        return Promise.resolve();
    }

    const uid = window.authState.user.id;

    return (async () => {
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
        if (!hasAnyPendingUserConfig(uid)) return;
        waitForUserDataRuntimeReady().then((ready) => {
            if (!ready) return;
            try {
                const h = localStorage.getItem(getHomeConfigCacheKey(uid));
                if (h) applyHomeConfig(JSON.parse(h));
            } catch (e) {
                console.warn('Failed to apply cached user data:', e);
            }
        });
    }
}

function hydrateCachedConfigFromLastUser() {
    // Instantly apply the last user's cached config (appearance, zoom, sites, workbench...)
    // so a second open renders immediately, before the remote fetch completes.
    try {
        const uid = localStorage.getItem('lastAuthUid');
        if (!uid) return false;
        const h = localStorage.getItem(getHomeConfigCacheKey(uid));
        if (!h) return false;
        applyHomeConfig(JSON.parse(h));
        window.renderHome?.();
        window.renderSearchEngine?.();
        window.updateAllText?.();
        window.updateTime?.();
        window.renderWorkbench?.();
        return true;
    } catch (err) {
        console.warn('Cached config hydration failed:', err);
        return false;
    }
}

window.hydrateCachedConfigFromLastUser = hydrateCachedConfigFromLastUser;

function shouldRefreshUserData() {
    return !!(window.authState && window.authState.isLoggedIn && getSupabaseClient() && navigator.onLine && !document.hidden);
}

function scheduleUserDataRefresh() {
    if (userDataRefreshTimer) return;
    userDataRefreshTimer = setInterval(() => {
        if (!shouldRefreshUserData()) return;
        loadUserData({ skipLocalHydration: true, force: true });
    }, USER_DATA_REFRESH_MS);
}

// Attach to Global Scope
window.loadUserData = loadUserData;
window.saveUserDataToBackend = saveUserDataToBackend;
window.markHomeConfigUpdated = markHomeConfigUpdated;
window.flushPendingProfileSync = flushPendingProfileSync;
window.applyCachedUserData = applyCachedUserData;
window.waitForUserDataRuntimeReady = waitForUserDataRuntimeReady;
window.hasAnyPendingUserConfig = hasAnyPendingUserConfig;

window.addEventListener('online', async () => {
    if (window.authState && window.authState.isLoggedIn) {
        await loadUserData({ skipLocalHydration: true, force: true });
        await flushPendingProfileSync();
    }
});

window.addEventListener('focus', () => {
    if (shouldRefreshUserData()) {
        loadUserData({ skipLocalHydration: true, force: true });
    }
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && shouldRefreshUserData()) {
        loadUserData({ skipLocalHydration: true, force: true });
    }
});

scheduleUserDataRefresh();
