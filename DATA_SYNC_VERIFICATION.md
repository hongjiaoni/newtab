# Data Sync Verification Guide

## How to Verify Data Synchronization

### 1. Check if Data Loads on Login

**Steps:**
1. Open browser DevTools (F12) → Console tab
2. Login with Google
3. Look for these console messages:
   ```
   Login button clicked
   Starting OAuth flow...
   Membership initialized: {tier: 1, ...}
   Loading user data from Supabase...
   User data loaded successfully
   ```

**What happens:**
- `auth.js` → `handleSession()` → calls `window.loadUserData()`
- `data-sync.js` → `loadUserData()` fetches from `profiles` table
- Data is merged into `state` object
- UI re-renders with loaded data

**Troubleshooting:**
- If you don't see "Loading user data from Supabase...", check:
  - Is `data-sync.js` loaded? (Check Network tab)
  - Is `window.loadUserData` defined? (Type in console: `typeof window.loadUserData`)

---

### 2. Check if Data Saves on Changes

**Steps:**
1. While logged in, make a change (add a website, change wallpaper, etc.)
2. Watch Console for:
   ```
   Syncing data to Supabase...
   Data synced successfully
   ```

**What happens:**
- Any `saveData()` call triggers `window.saveUserDataToBackend()`
- After 500ms debounce, data is sent to Supabase
- `profiles` table is updated

**Verify in Supabase:**
1. Go to Supabase Dashboard → Table Editor → `profiles`
2. Find your user row (by email)
3. Check `sites`, `tags`, `settings` columns
4. Check `updated_at` timestamp (should be recent)

**Troubleshooting:**
- If no sync message appears:
  - Check: `typeof window.saveUserDataToBackend` in console
  - Check: `window.authState.isLoggedIn` should be `true`
  - Add debug: Open `script.js`, find `saveData()`, verify it calls `window.saveUserDataToBackend()`

---

### 3. Test Cross-Device Sync

**Steps:**
1. Device A: Login → Add websites → Logout
2. Device B: Login with same account
3. Should see websites from Device A

**Expected Flow:**
- Device A saves to database
- Device B loads from database on login
- Both devices stay in sync

---

## Current Implementation Status

✅ **Implemented:**
- `loadUserData()` - Loads on login
- `saveUserDataToBackend()` - Auto-saves with 500ms debounce
- Syncs: sites, tags, orders, settings, wallpaper
- Conflict resolution: Server data wins on login

✅ **Integration Points:**
- `auth.js` line 56-58: Calls `loadUserData()` after login
- `script.js` line 318-320: Calls `saveUserDataToBackend()` on changes
- All `saveData()` calls trigger sync if logged in

⚠️ **Known Limitations:**
- No offline queue (changes made offline won't sync until online)
- No real-time sync (requires manual refresh to see other device changes)
- No conflict resolution for concurrent edits

---

## Quick Debug Commands

Run these in browser console:

```javascript
// Check if modules loaded
console.log('Auth:', typeof window.authState);
console.log('Sync:', typeof window.loadUserData);
console.log('Membership:', typeof window.membershipState);

// Check login status
console.log('Logged in:', window.authState?.isLoggedIn);
console.log('User:', window.authState?.user?.email);

// Manually trigger sync
window.saveUserDataToBackend();

// Manually load data
window.loadUserData();

// Check current state
console.log('Sites:', state.sites);
console.log('Tags:', state.tags);
```
