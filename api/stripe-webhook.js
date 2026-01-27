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
      if (session?.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription);
        endDate = new Date(sub.current_period_end * 1000).toISOString();
      } else {
        endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      if (userId) {
        await supabaseAdmin.rpc('update_membership_tier', {
          p_user_id: userId,
          p_tier: tier,
          p_stripe_customer_id: customerId,
          p_subscription_end_date: endDate
        });
      }
    }

    res.statusCode = 200;
    res.end('ok');
  } catch (err) {
    res.statusCode = 500;
    res.end(err?.message || 'Webhook handler error');
  }
};
