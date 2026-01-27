async function createCheckoutSession(tier = 2, billingCycle = 'monthly') {
  if (!window.authState || !window.authState.isLoggedIn || !window.authState.user) {
    throw new Error('Not logged in');
  }

  const sessionRes = await window.supabase?.auth?.getSession?.();
  const accessToken = sessionRes?.data?.session?.access_token || '';
  if (!accessToken) {
    throw new Error('Missing access token');
  }

  const payload = {
    tier,
    billingCycle,
    userId: window.authState.user.id,
    email: window.authState.user.email
  };

  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to create checkout session');
  }

  const data = await res.json();
  if (!data || !data.url) {
    throw new Error('Invalid checkout response');
  }

  window.location.href = data.url;
}

function handleCheckoutReturn() {
  try {
    const url = new URL(window.location.href);
    const status = url.searchParams.get('checkout');
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
      }, 1200);

      setTimeout(() => {
        window.initializeMembership?.();
      }, 3500);
    }

    if (status === 'cancel') {
      const currentLocale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
      if (window.showNotification) {
        window.showNotification(
          currentLocale === 'zh' ? '已取消支付' : 'Payment canceled',
          'info'
        );
      }
    }

    url.searchParams.delete('checkout');
    url.searchParams.delete('session_id');
    window.history.replaceState({}, document.title, url.toString());
  } catch (_err) {
    // no-op
  }
}

window.createCheckoutSession = createCheckoutSession;

document.addEventListener('DOMContentLoaded', () => {
  handleCheckoutReturn();
});
