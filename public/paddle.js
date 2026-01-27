// ===== Paddle Payment Integration =====

// Paddle environment config (set via window or fallback)
const PADDLE_ENVIRONMENT = window.PADDLE_ENVIRONMENT || 'sandbox'; // 'sandbox' or 'production'
const PADDLE_CLIENT_TOKEN = window.PADDLE_CLIENT_TOKEN || '';

// Price IDs for different tiers and billing cycles (set in config.js or here)
const PADDLE_PRICES = {
  tier2_monthly: window.PADDLE_PRICE_TIER2_MONTHLY || '',
  tier2_yearly: window.PADDLE_PRICE_TIER2_YEARLY || '',
  tier3_monthly: window.PADDLE_PRICE_TIER3_MONTHLY || '',
  tier3_yearly: window.PADDLE_PRICE_TIER3_YEARLY || ''
};

let paddleInitialized = false;

// Initialize Paddle
function initializePaddle() {
  if (paddleInitialized) return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    if (typeof Paddle === 'undefined') {
      console.error('Paddle.js SDK not loaded');
      reject(new Error('Paddle SDK not loaded'));
      return;
    }

    try {
      Paddle.Initialize({
        token: PADDLE_CLIENT_TOKEN,
        environment: PADDLE_ENVIRONMENT,
        eventCallback: handlePaddleEvent
      });
      paddleInitialized = true;
      console.log('Paddle initialized:', PADDLE_ENVIRONMENT);
      resolve();
    } catch (err) {
      console.error('Paddle initialization failed:', err);
      reject(err);
    }
  });
}

// Handle Paddle events (checkout completed, closed, etc.)
function handlePaddleEvent(event) {
  console.log('Paddle event:', event);

  if (event.name === 'checkout.completed') {
    const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
    if (window.showNotification) {
      window.showNotification(
        currentLocale === 'zh' ? '支付成功，正在激活会员...' : 'Payment successful. Activating membership...',
        'success'
      );
    }

    // Refresh membership after webhook processes (give it time)
    setTimeout(() => {
      window.initializeMembership?.();
    }, 2000);

    setTimeout(() => {
      window.initializeMembership?.();
    }, 5000);

    // Close upgrade modal if open
    window.closeUpgradeModal?.();
  }

  if (event.name === 'checkout.closed') {
    console.log('Checkout closed by user');
  }
}

// Open Paddle Checkout
async function createCheckoutSession(tier = 2, billingCycle = 'monthly') {
  if (!window.authState || !window.authState.isLoggedIn || !window.authState.user) {
    throw new Error('Not logged in');
  }

  // Get price ID based on tier and billing cycle
  let priceId = '';
  if (tier === 2 && billingCycle === 'monthly') priceId = PADDLE_PRICES.tier2_monthly;
  if (tier === 2 && billingCycle === 'yearly') priceId = PADDLE_PRICES.tier2_yearly;
  if (tier === 3 && billingCycle === 'monthly') priceId = PADDLE_PRICES.tier3_monthly;
  if (tier === 3 && billingCycle === 'yearly') priceId = PADDLE_PRICES.tier3_yearly;

  if (!priceId) {
    throw new Error('Price ID not configured for this tier/billing cycle');
  }

  // Initialize Paddle if not already
  await initializePaddle();

  const userId = window.authState.user.id;
  const userEmail = window.authState.user.email || '';

  // Open Paddle Checkout overlay
  try {
    Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customer: {
        email: userEmail
      },
      customData: {
        user_id: userId,
        tier: String(tier),
        billing_cycle: billingCycle
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: (typeof i18n !== 'undefined' && i18n.currentLocale === 'zh') ? 'zh' : 'en',
        allowLogout: false
      }
    });
  } catch (err) {
    console.error('Failed to open Paddle checkout:', err);
    throw err;
  }
}

// Handle return from Paddle (if using redirect mode instead of overlay)
function handlePaddleReturn() {
  try {
    const url = new URL(window.location.href);
    const status = url.searchParams.get('paddle_status');
    if (!status) return;

    if (status === 'success') {
      const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
      if (window.showNotification) {
        window.showNotification(
          currentLocale === 'zh' ? '支付成功，正在激活会员...' : 'Payment successful. Activating membership...',
          'success'
        );
      }

      setTimeout(() => {
        window.initializeMembership?.();
      }, 2000);

      setTimeout(() => {
        window.initializeMembership?.();
      }, 5000);
    }

    // Clean URL
    url.searchParams.delete('paddle_status');
    url.searchParams.delete('transaction_id');
    window.history.replaceState({}, document.title, url.toString());
  } catch (_err) {
    // no-op
  }
}

// Export
window.createCheckoutSession = createCheckoutSession;
window.initializePaddle = initializePaddle;

document.addEventListener('DOMContentLoaded', () => {
  handlePaddleReturn();
  
  // Pre-initialize Paddle if token is available
  if (PADDLE_CLIENT_TOKEN) {
    initializePaddle().catch(() => {});
  }
});
