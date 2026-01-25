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
    const modal = document.getElementById('upgradeModal');
    if (!modal) {
        createUpgradeModal();
    }

    const modalTitle = document.getElementById('upgradeModalTitle');
    const modalDesc = document.getElementById('upgradeModalDesc');

    // Customize message based on context
    const messages = {
        theme: {
            title: '解锁主题定制',
            desc: '升级至高级会员，自由定制您的专属主题风格！'
        },
        wallpaper: {
            title: '解锁自定义壁纸',
            desc: '升级至高级会员，上传您喜爱的壁纸，打造个性化首页！'
        },
        font: {
            title: '解锁字体定制',
            desc: '升级至高级会员，选择您喜欢的中英文字体组合！'
        },
        general: {
            title: '升级会员',
            desc: '解锁更多高级功能，提升您的使用体验！'
        }
    };

    const msg = messages[context] || messages.general;
    if (modalTitle) modalTitle.textContent = msg.title;
    if (modalDesc) modalDesc.textContent = msg.desc;

    document.getElementById('upgradeModal').classList.remove('hidden');
}

// Create upgrade modal HTML
function createUpgradeModal() {
    const modalHTML = `
    <div id="upgradeModal" class="modal-overlay hidden">
      <div class="modal upgrade-modal">
        <h3 id="upgradeModalTitle">升级会员</h3>
        <p id="upgradeModalDesc" style="margin-bottom: 20px; opacity: 0.8;">解锁更多高级功能,提升您的使用体验!</p>
        
        <div class="membership-tiers">
          <div class="tier-card ${membershipState.tier === 2 ? 'current' : ''}" data-tier="2">
            <div class="tier-badge">⭐</div>
            <h4>高级会员</h4>
            <div class="tier-price">¥9.99<span>/月</span></div>
            <ul class="tier-features">
              <li>✓ 自定义主题</li>
              <li>✓ 自定义字体</li>
              <li>✓ 上传壁纸 (50张)</li>
              <li>✓ 优先支持</li>
            </ul>
            <button class="btn primary-btn" onclick="handleUpgrade(2)" ${membershipState.tier >= 2 ? 'disabled' : ''}>
              ${membershipState.tier >= 2 ? '当前方案' : '立即升级'}
            </button>
          </div>

          <div class="tier-card ${membershipState.tier === 3 ? 'current' : ''}" data-tier="3">
            <div class="tier-badge">👑</div>
            <h4>超级会员</h4>
            <div class="tier-price">¥19.99<span>/月</span></div>
            <ul class="tier-features">
              <li>✓ 所有高级功能</li>
              <li>✓ 无限壁纸上传</li>
              <li>✓ 专属主题</li>
              <li>✓ API访问</li>
              <li>✓ 专属客服</li>
            </ul>
            <button class="btn primary-btn" onclick="handleUpgrade(3)" ${membershipState.tier >= 3 ? 'disabled' : ''}>
              ${membershipState.tier >= 3 ? '当前方案' : '立即升级'}
            </button>
          </div>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" onclick="closeUpgradeModal()">稍后再说</button>
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

// Handle upgrade button click
async function handleUpgrade(tier) {
    if (!window.authState || !window.authState.isLoggedIn) {
        alert('请先登录');
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
            alert('升级失败,请稍后重试');
        }
    } else {
        console.error('Stripe integration not loaded');
        alert('支付系统未加载,请刷新页面重试');
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
