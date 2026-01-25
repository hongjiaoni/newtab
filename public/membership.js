// ===== Membership System Module =====

const membershipState = {
    tier: 1, // 1=basic, 2=premium, 3=super
    status: 'inactive',
    endDate: null,
    stripeCustomerId: null
};

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
        price: 9.99,
        features: ['所有基础功能', '自定义主题', '自定义字体', '上传壁纸 (50张)', '优先支持'],
        badge: '⭐'
    },
    3: {
        name: '超级会员',
        nameEn: 'Super',
        price: 19.99,
        features: ['所有高级功能', '无限壁纸上传', '专属主题', 'API访问', '专属客服'],
        badge: '👑'
    }
};

// Initialize membership from profile
async function initializeMembership() {
    if (!window.authState || !window.authState.isLoggedIn) {
        membershipState.tier = 1;
        return;
    }

    try {
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
        }
    } catch (err) {
        console.error('Failed to load membership:', err);
    }
}

// Update UI based on membership tier
function updateMembershipUI() {
    // Add membership badge to settings menu
    const authContainer = document.getElementById('authMenuContainer');
    if (authContainer && membershipState.tier > 1) {
        const badge = MEMBERSHIP_CONFIG[membershipState.tier].badge;
        const existingBadge = authContainer.querySelector('.membership-badge');
        if (!existingBadge) {
            const badgeEl = document.createElement('span');
            badgeEl.className = 'membership-badge';
            badgeEl.textContent = badge;
            badgeEl.title = MEMBERSHIP_CONFIG[membershipState.tier].name;
            authContainer.querySelector('.settings-menu-item')?.appendChild(badgeEl);
        }
    }

    // Show/hide premium features
    updateFeatureLocks();
}

// Update feature locks based on tier
function updateFeatureLocks() {
    // Theme customization (tier 2+)
    const themeBtn = document.getElementById('themeCustomizationBtn');
    if (themeBtn) {
        if (membershipState.tier < 2) {
            themeBtn.classList.add('locked-feature');
            themeBtn.onclick = () => showUpgradeModal('theme');
        } else {
            themeBtn.classList.remove('locked-feature');
            themeBtn.onclick = () => window.openThemeCustomization?.();
        }
    }

    // Custom wallpaper category
    const customCategory = document.querySelector('[data-category="Custom"]');
    if (customCategory) {
        if (membershipState.tier < 2) {
            customCategory.classList.add('locked-feature');
            customCategory.onclick = (e) => {
                e.preventDefault();
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
            title: isZh ? '解锁主题定制' : 'Unlock Theme Customization',
            desc: isZh ? '升级至高级会员，自由定制您的专属主题风格！' : 'Upgrade to Premium to customize your theme!'
        },
        wallpaper: {
            title: isZh ? '解锁自定义壁纸' : 'Unlock Custom Wallpapers',
            desc: isZh ? '升级至高级会员，上传您喜爱的壁纸，打造个性化首页！' : 'Upgrade to Premium to upload your favorite wallpapers!'
        },
        font: {
            title: isZh ? '解锁字体定制' : 'Unlock Font Customization',
            desc: isZh ? '升级至高级会员，选择您喜欢的中英文字体组合！' : 'Upgrade to Premium to choose custom fonts!'
        },
        general: {
            title: isZh ? '升级会员' : 'Upgrade Membership',
            desc: isZh ? '解锁更多高级功能，提升您的使用体验！' : 'Unlock premium features and enhance your experience!'
        }
    };

    const msg = messages[context] || messages.general;
    if (modalTitle) modalTitle.textContent = msg.title;
    if (modalDesc) modalDesc.textContent = msg.desc;

    document.getElementById('upgradeModal').classList.remove('hidden');
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
            <div class="tier-price" style="text-align: center; font-size: 28px; font-weight: bold; margin: 10px 0;">
              $5.9<span style="font-size: 16px; opacity: 0.7;">/${isZh ? '月' : 'month'}</span>
            </div>
            <ul class="tier-features" style="list-style: none; padding: 0; margin: 15px 0;">
              <li style="padding: 5px 0;">✓ ${isZh ? '自定义主题' : 'Custom themes'}</li>
              <li style="padding: 5px 0;">✓ ${isZh ? '自定义字体' : 'Custom fonts'}</li>
              <li style="padding: 5px 0;">✓ ${isZh ? '上传壁纸 (50张)' : 'Upload wallpapers (50 images)'}</li>
            </ul>
            <button class="btn primary-btn" onclick="handleUpgrade(2)" 
                    style="width: 100%; padding: 12px;" 
                    ${membershipState.tier >= 2 ? 'disabled' : ''}>
              ${membershipState.tier >= 2 ? (isZh ? '当前方案' : 'Current Plan') : (isZh ? '立即升级' : 'Upgrade Now')}
            </button>
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
    document.getElementById('upgradeModal')?.classList.add('hidden');
}

// Show custom notification modal (replaces alert)
function showLoginRequiredModal() {
    const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
    const isZh = currentLocale === 'zh';

    // Remove existing modal if any
    const existing = document.getElementById('loginRequiredModal');
    if (existing) existing.remove();

    const modalHTML = `
    <div id="loginRequiredModal" class="modal-overlay">
      <div class="modal" style="max-width: 400px; text-align: center;">
        <h3>${isZh ? '需要登录' : 'Login Required'}</h3>
        <p style="margin: 20px 0; opacity: 0.8;">
          ${isZh ? '请先登录以使用此功能' : 'Please login to use this feature'}
        </p>
        <div class="modal-actions" style="justify-content: center;">
          <button class="cancel-btn" onclick="
            document.getElementById('loginRequiredModal').remove();
          ">
            ${isZh ? '取消' : 'Cancel'}
          </button>
          <button class="primary-btn" onclick="
            document.getElementById('loginRequiredModal').remove();
            window.closeUpgradeModal?.();
            window.openGoogleSignInModal?.();
          ">
            ${isZh ? '立即登录' : 'Login Now'}
          </button>
        </div>
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Handle upgrade button click
async function handleUpgrade(tier) {
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
            await window.createCheckoutSession(tier);
        } catch (err) {
            console.error('Upgrade failed:', err);
            const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
            if (window.showNotification) {
                window.showNotification(
                    currentLocale === 'zh' ? '升级失败，请稍后重试' : 'Upgrade failed, please try again',
                    'error'
                );
            }
        }
    } else {
        console.error('Stripe integration not loaded');
        const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
        if (window.showNotification) {
            window.showNotification(
                currentLocale === 'zh' ? '支付系统未加载，请刷新页面重试' : 'Payment system not loaded, please refresh',
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
