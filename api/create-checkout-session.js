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
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const {
      STRIPE_SECRET_KEY,
      SITE_URL,
      STRIPE_PRICE_ID_TIER2_MONTHLY,
      STRIPE_PRICE_ID_TIER2_YEARLY,
      STRIPE_PRICE_ID_TIER3_MONTHLY,
      STRIPE_PRICE_ID_TIER3_YEARLY,
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    } = process.env;

    if (!STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY');
    if (!SUPABASE_URL) throw new Error('Missing SUPABASE_URL');
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing Authorization token' }));
      return;
    }

    let body = req.body;
    if (!body) {
      const raw = await getRawBody(req);
      const text = raw.toString('utf8');
      body = text ? JSON.parse(text) : {};
    } else if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    const tier = Number(body?.tier || 2);
    const billingCycle = String(body?.billingCycle || 'monthly');
    const userId = String(body?.userId || '');
    const email = body?.email ? String(body.email) : '';

    if (!userId) throw new Error('Missing userId');
    if (![2, 3].includes(tier)) throw new Error('Unsupported tier');

    if (!['monthly', 'yearly'].includes(billingCycle)) {
      throw new Error('Unsupported billingCycle');
    }

    let priceId = '';
    if (tier === 2 && billingCycle === 'monthly') priceId = STRIPE_PRICE_ID_TIER2_MONTHLY;
    if (tier === 2 && billingCycle === 'yearly') priceId = STRIPE_PRICE_ID_TIER2_YEARLY;
    if (tier === 3 && billingCycle === 'monthly') priceId = STRIPE_PRICE_ID_TIER3_MONTHLY;
    if (tier === 3 && billingCycle === 'yearly') priceId = STRIPE_PRICE_ID_TIER3_YEARLY;
    if (!priceId) throw new Error('Missing STRIPE_PRICE_ID for tier/billingCycle');

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: authUserData, error: authUserErr } = await supabaseAdmin.auth.getUser(token);
    if (authUserErr || !authUserData?.user?.id) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid token' }));
      return;
    }
    if (authUserData.user.id !== userId) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'User mismatch' }));
      return;
    }

    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (profileErr) throw new Error(profileErr.message);

    let customerId = profile?.stripe_customer_id || '';
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: email || undefined,
        metadata: { user_id: userId }
      });
      customerId = customer.id;

      await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    const baseUrl = (SITE_URL || '').trim() || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${baseUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?checkout=cancel`,
      metadata: { user_id: userId, tier: String(tier), billing_cycle: billingCycle }
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ url: session.url }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err?.message || 'Unknown error' }));
  }
};
