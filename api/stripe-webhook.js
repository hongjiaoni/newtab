const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  const {
    STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
  } = process.env;

  if (!STRIPE_SECRET_KEY) {
    res.statusCode = 500;
    res.end('Missing STRIPE_SECRET_KEY');
    return;
  }
  if (!STRIPE_WEBHOOK_SECRET) {
    res.statusCode = 500;
    res.end('Missing STRIPE_WEBHOOK_SECRET');
    return;
  }
  if (!SUPABASE_URL) {
    res.statusCode = 500;
    res.end('Missing SUPABASE_URL');
    return;
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    res.statusCode = 500;
    res.end('Missing SUPABASE_SERVICE_ROLE_KEY');
    return;
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  let event;
  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.statusCode = 400;
    res.end(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session?.metadata?.user_id;
      const tier = Number(session?.metadata?.tier || 2);
      const customerId = session?.customer || '';

      let endDate = null;
      let startedAt = null;
      let subscriptionId = '';
      let paymentIntentId = '';
      let amount = null;
      let currency = (session?.currency || 'usd');

      if (session?.payment_intent) {
        paymentIntentId = String(session.payment_intent);
      }

      if (session?.subscription) {
        subscriptionId = String(session.subscription);
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        startedAt = sub?.current_period_start ? new Date(sub.current_period_start * 1000).toISOString() : null;
        endDate = sub?.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;

        try {
          const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
          const first = items?.data?.[0];
          amount = (first?.amount_total != null) ? Number(first.amount_total) : (session?.amount_total != null ? Number(session.amount_total) : null);
          currency = first?.currency || currency;

          const desc = (first?.description || '').trim();
          if (desc) {
            // kept for potential future use
          } else {
            const price = first?.price;
            const nickname = (price?.nickname || '').trim();
            if (nickname) {
              // kept for potential future use
            }
          }
        } catch (_err) {
          // best-effort
        }
      } else {
        startedAt = new Date().toISOString();
        endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      if (session?.amount_total != null && amount == null) {
        amount = Number(session.amount_total);
      }

      if (userId) {
        await supabaseAdmin.rpc('update_membership_tier', {
          p_user_id: userId,
          p_tier: tier,
          p_stripe_customer_id: customerId,
          p_subscription_end_date: endDate
        });

        // Record subscription history for UI display
        try {
          await supabaseAdmin
            .from('user_subscriptions')
            .insert({
              user_id: userId,
              stripe_subscription_id: subscriptionId || null,
              stripe_payment_intent_id: paymentIntentId || null,
              tier,
              amount: Number.isFinite(amount) ? amount : 0,
              currency: currency || 'usd',
              status: 'completed',
              started_at: startedAt,
              ends_at: endDate
            });
        } catch (err) {
          console.error('Failed to insert subscription record:', err);
        }
      }
    }

    res.statusCode = 200;
    res.end('ok');
  } catch (err) {
    res.statusCode = 500;
    res.end(err?.message || 'Webhook handler error');
  }
};
