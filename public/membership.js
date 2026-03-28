// ===== Membership System Module =====

const membershipState = {
    tier: 1, // 1=basic, 2=premium, 3=super
    status: 'inactive',
    endDate: null,
    stripeCustomerId: null
};

function membershipText(key, fallback) {
    if (typeof i18n !== 'undefined' && typeof i18n.t === 'function') {
        const translated = i18n.t(key);
        if (translated && translated !== key) {
            return translated;
        }
    }
    return fallback;
}

// Membership tier configuration
const MEMBERSHIP_CONFIG = {
    1: {
        name: '基础会员',
        nameEn: 'Basic',
        features: ['基础壁纸库', '网站标签管理', '数据同步'],
        limitations: ['无法自定义主题', '无法上传壁纸', '无法自定义字体']
    },
    2: {
        name: '高级会员',
        nameEn: 'Premium',
        priceMonthly: 4.99,
        priceYearly: 49.99,
        features: ['所有基础功能', '自定义主题', '自定义字体', '上传壁纸 (50张)', '优先支持'],
        badge: '⭐'
    },
    3: {
        name: '超级会员',
        nameEn: 'Super',
        priceMonthly: 9.99,
        priceYearly: 99.99,
        features: ['所有高级功能', '无限壁纸上传', '专属主题', 'API访问', '专属客服'],
        badge: '👑'
    }
};

window.MEMBERSHIP_CONFIG = MEMBERSHIP_CONFIG;

// Initialize membership from profile
async function initializeMembership() {
    if (!window.authState || !window.authState.isLoggedIn) {
        membershipState.tier = 1;
        membershipState.status = 'inactive';
        membershipState.endDate = null;
        membershipState.stripeCustomerId = null;
        updateMembershipUI();
        return;
    }

    try {
        const prevTier = membershipState.tier;
        const { data, error } = await supabase
            .from('profiles')
            .select('membership_tier, subscription_status, subscription_end_date, stripe_customer_id')
            .eq('id', window.authState.user.id)
            .single();

        if (data) {
            membershipState.tier = data.membership_tier || 1;
            membershipState.status = data.subscription_status || 'inactive';
            membershipState.endDate = data.subscription_end_date;
            membershipState.stripeCustomerId = data.stripe_customer_id;

            console.log('Membership initialized:', membershipState);
            updateMembershipUI();

            // If tier changed (e.g. upgrade completed) reload user data so premium settings load/clear correctly.
            if (membershipState.tier !== prevTier) {
                try {
                    await window.loadUserData?.({ force: true });
                } catch (err) {
                    console.error('Failed to reload user data after membership update:', err);
                }
            }
        }
    } catch (err) {
        console.error('Failed to load membership:', err);
    }
}

// Update UI based on membership tier
function updateMembershipUI() {
    // Ensure the settings menu user row (rendered by auth.js) reflects the latest tier/badge
    if (typeof window.updateAuthUI === 'function') {
        window.updateAuthUI();
    }

    // Show/hide premium features
    updateFeatureLocks();
}

// Update feature locks based on tier
function updateFeatureLocks() {
    // Theme customization is handled centrally in themes.js.
    // Avoid rebinding click handlers here, otherwise the menu item can
    // end up with competing listeners after auth/membership refreshes.
    const themeBtn = document.getElementById('themeCustomizationBtn');
    if (themeBtn) {
        themeBtn.classList.remove('locked-feature');
        themeBtn.onclick = null;
    }

    // Custom wallpaper category
    const customCategory = document.querySelector('[data-category="Custom"]');
    if (customCategory) {
        if (membershipState.tier < 2) {
            customCategory.classList.add('locked-feature');
            customCategory.onclick = (e) => {
                e.preventDefault();
                if (!window.authState || !window.authState.isLoggedIn) {
                    window.openGoogleSignInModal?.();
                    return;
                }
                showUpgradeModal('wallpaper');
            };
        } else {
            customCategory.classList.remove('locked-feature');
        }
    }
}

// Check if user has access to a feature
function hasFeatureAccess(feature) {
    const accessMap = {
        'theme_customization': 2,
        'font_customization': 2,
        'custom_wallpaper': 2,
        'unlimited_upload': 3,
        'api_access': 3
    };

    const requiredTier = accessMap[feature] || 1;
    return membershipState.tier >= requiredTier;
}

// Show upgrade modal
function showUpgradeModal(context = 'general') {
    // Always remove and recreate modal to ensure fresh i18n content
    const existingModal = document.getElementById('upgradeModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create fresh modal with current language
    createUpgradeModal();

    const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
    const isZh = currentLocale === 'zh';

    const modalTitle = document.getElementById('upgradeModalTitle');
    const modalDesc = document.getElementById('upgradeModalDesc');

    // Customize message based on context (multilingual)
    const messages = {
        theme: {
            title: membershipText('unlockThemeCustomization', 'Unlock Theme Customization'),
            desc: membershipText('upgradeThemeDesc', 'Upgrade to customize your theme freely.')
        },
        wallpaper: {
            title: membershipText('unlockCustomWallpapers', 'Unlock Custom Wallpapers'),
            desc: membershipText('upgradeWallpaperDesc', 'Upgrade to upload your own wallpapers.')
        },
        font: {
            title: membershipText('unlockFontCustomization', 'Unlock Font Customization'),
            desc: membershipText('upgradeFontDesc', 'Upgrade to choose your preferred Chinese and English fonts.')
        },
        general: {
            title: membershipText('upgradeMembership', 'Upgrade Membership'),
            desc: membershipText('upgradeDesc', 'Unlock premium features and improve your experience')
        }
    };

    const msg = messages[context] || messages.general;
    if (modalTitle) modalTitle.textContent = msg.title;
    if (modalDesc) modalDesc.textContent = msg.desc;

    window.openManagedOverlay?.('upgradeModal');
    const overlay = document.getElementById('upgradeModal');
    if (overlay) {
        overlay.onclick = (event) => {
            if (event.target === overlay) {
                closeUpgradeModal();
            }
        };
    }
}

// Create upgrade modal HTML with multilingual support
function createUpgradeModal() {
    const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
    const isZh = currentLocale === 'zh';

    const modalHTML = `
    <div id="upgradeModal" class="modal-overlay hidden">
      <div class="modal upgrade-modal" style="max-width: 500px;">
        <h3 id="upgradeModalTitle">${isZh ? '升级会员' : 'Upgrade Membership'}</h3>
        <p id="upgradeModalDesc" style="margin-bottom: 20px; opacity: 0.8;">
          ${isZh ? '解锁更多高级功能，提升您的使用体验！' : 'Unlock premium features and enhance your experience!'}
        </p>
        
        <div class="membership-tiers" style="display: flex; flex-direction: column; gap: 20px;">
          <div class="tier-card ${membershipState.tier === 2 ? 'current' : ''}" data-tier="2" 
               style="border: 3px solid var(--border-color); padding: 20px; border-radius: 12px; background: var(--card-bg);">
            <div class="tier-badge" style="font-size: 32px; text-align: center;">⭐</div>
            <h4 style="text-align: center; margin: 10px 0;">${isZh ? '高级会员' : 'Premium'}</h4>
            <div class="tier-price" style="text-align: center; font-size: 18px; font-weight: bold; margin: 10px 0;">
              $${MEMBERSHIP_CONFIG[2].priceMonthly}<span style="font-size: 14px; opacity: 0.7;">/${isZh ? '月' : 'month'}</span>
              <span style="opacity: 0.5; padding: 0 8px;">|</span>
              $${MEMBERSHIP_CONFIG[2].priceYearly}<span style="font-size: 14px; opacity: 0.7;">/${isZh ? '年' : 'year'}</span>
            </div>
            <ul class="tier-features" style="list-style: none; padding: 0; margin: 15px 0;">
              <li style="padding: 5px 0;">✓ ${isZh ? '自定义主题' : 'Custom themes'}</li>
              <li style="padding: 5px 0;">✓ ${isZh ? '自定义字体' : 'Custom fonts'}</li>
              <li style="padding: 5px 0;">✓ ${isZh ? '上传壁纸 (50张)' : 'Upload wallpapers (50 images)'}</li>
            </ul>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button class="btn primary-btn" onclick="handleUpgrade(2, 'monthly')" 
                      style="width: 100%; padding: 12px;" 
                      ${membershipState.tier >= 2 ? 'disabled' : ''}>
                ${membershipState.tier >= 2 ? (isZh ? '当前方案' : 'Current Plan') : (isZh ? '月付升级' : 'Upgrade Monthly')}
              </button>
              <button class="btn primary-btn" onclick="handleUpgrade(2, 'yearly')" 
                      style="width: 100%; padding: 12px;" 
                      ${membershipState.tier >= 2 ? 'disabled' : ''}>
                ${membershipState.tier >= 2 ? (isZh ? '当前方案' : 'Current Plan') : (isZh ? '年付升级' : 'Upgrade Yearly')}
              </button>
            </div>
          </div>

          <div class="tier-card ${membershipState.tier === 3 ? 'current' : ''}" data-tier="3" 
               style="border: 3px solid var(--border-color); padding: 20px; border-radius: 12px; background: var(--card-bg);">
            <div class="tier-badge" style="font-size: 32px; text-align: center;">👑</div>
            <h4 style="text-align: center; margin: 10px 0;">${isZh ? '超级会员' : 'Super'}</h4>
            <div class="tier-price" style="text-align: center; font-size: 18px; font-weight: bold; margin: 10px 0;">
              $${MEMBERSHIP_CONFIG[3].priceMonthly}<span style="font-size: 14px; opacity: 0.7;">/${isZh ? '月' : 'month'}</span>
              <span style="opacity: 0.5; padding: 0 8px;">|</span>
              $${MEMBERSHIP_CONFIG[3].priceYearly}<span style="font-size: 14px; opacity: 0.7;">/${isZh ? '年' : 'year'}</span>
            </div>
            <ul class="tier-features" style="list-style: none; padding: 0; margin: 15px 0;">
              <li style="padding: 5px 0;">✓ ${isZh ? '所有高级功能' : 'All Premium features'}</li>
              <li style="padding: 5px 0;">✓ ${isZh ? '无限壁纸上传' : 'Unlimited wallpaper uploads'}</li>
            </ul>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button class="btn primary-btn" onclick="handleUpgrade(3, 'monthly')" 
                      style="width: 100%; padding: 12px;" 
                      ${membershipState.tier >= 3 ? 'disabled' : ''}>
                ${membershipState.tier >= 3 ? (isZh ? '当前方案' : 'Current Plan') : (isZh ? '月付升级' : 'Upgrade Monthly')}
              </button>
              <button class="btn primary-btn" onclick="handleUpgrade(3, 'yearly')" 
                      style="width: 100%; padding: 12px;" 
                      ${membershipState.tier >= 3 ? 'disabled' : ''}>
                ${membershipState.tier >= 3 ? (isZh ? '当前方案' : 'Current Plan') : (isZh ? '年付升级' : 'Upgrade Yearly')}
              </button>
            </div>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 20px;">
          <button class="cancel-btn" onclick="closeUpgradeModal()">${isZh ? '稍后再说' : 'Maybe Later'}</button>
        </div>
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close upgrade modal
function closeUpgradeModal() {
    window.closeManagedOverlay?.('upgradeModal');
}

// Show custom notification modal (replaces alert)
function showLoginRequiredModal() {
    const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
    const isZh = currentLocale === 'zh';

    // Remove existing modal if any
    const existing = document.getElementById('loginRequiredModal');
    if (existing) existing.remove();

    const modalHTML = `
    <div id="loginRequiredModal" class="modal-overlay hidden">
      <div class="modal" style="max-width: 400px; text-align: center;">
        <h3>${membershipText('loginRequiredTitle', 'Login Required')}</h3>
        <p style="margin: 20px 0; opacity: 0.8;">
          ${membershipText('loginRequiredDesc', 'Please log in before using this feature')}
        </p>
        <div class="modal-actions" style="justify-content: center;">
          <button class="cancel-btn" onclick="
            document.getElementById('loginRequiredModal').remove();
          ">
            ${membershipText('cancel', 'Cancel')}
          </button>
          <button class="primary-btn" onclick="
            document.getElementById('loginRequiredModal').remove();
            window.closeUpgradeModal?.();
            window.openGoogleSignInModal?.();
          ">
            ${membershipText('loginNow', 'Login Now')}
          </button>
        </div>
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    window.openManagedOverlay?.('loginRequiredModal', { closeSettings: false });
    const overlay = document.getElementById('loginRequiredModal');
    if (overlay) {
        overlay.onclick = (event) => {
            if (event.target === overlay) {
                window.closeManagedOverlay?.('loginRequiredModal', { remove: true });
            }
        };
    }
}

// Handle upgrade button click
async function handleUpgrade(tier, billingCycle = 'monthly') {
    console.log('handleUpgrade called, tier:', tier);
    console.log('authState:', window.authState);

    // Check login with proper authState check
    if (!window.authState || !window.authState.isLoggedIn || !window.authState.user) {
        console.log('User not logged in');
        showLoginRequiredModal();
        return;
    }

    if (membershipState.tier >= tier) {
        return;
    }

    // Call Stripe integration
    if (window.createCheckoutSession) {
        try {
            await window.createCheckoutSession(tier, billingCycle);
        } catch (err) {
            console.error('Upgrade failed:', err);
            const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
            if (window.showNotification) {
                window.showNotification(
                    membershipText('upgradeFailed', 'Upgrade failed, please try again'),
                    'error'
                );
            }
        }
    } else {
        console.error('Stripe integration not loaded');
        const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
        if (window.showNotification) {
            window.showNotification(
                membershipText('paymentSystemNotLoaded', 'Payment system not loaded. Please refresh and try again.'),
                'error'
            );
        }
    }
}

// Export functions
window.membershipState = membershipState;
window.initializeMembership = initializeMembership;
window.hasFeatureAccess = hasFeatureAccess;
window.showUpgradeModal = showUpgradeModal;
window.closeUpgradeModal = closeUpgradeModal;
window.handleUpgrade = handleUpgrade;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for auth to initialize first
    setTimeout(initializeMembership, 1000);
});
