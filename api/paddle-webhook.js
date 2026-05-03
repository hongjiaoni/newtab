const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// Verify Paddle webhook signature
function verifyPaddleSignature(rawBody, signature, secretKey) {
  if (!signature || !secretKey) return false;
  
  try {
    // Paddle uses ts;h1=hash format
    const parts = signature.split(';');
    const tsMatch = parts.find(p => p.startsWith('ts='));
    const h1Match = parts.find(p => p.startsWith('h1='));
    
    if (!tsMatch || !h1Match) return false;
    
    const ts = tsMatch.replace('ts=', '');
    const h1 = h1Match.replace('h1=', '');
    
    // Build signed payload: ts:rawBody
    const signedPayload = `${ts}:${rawBody.toString('utf8')}`;
    
    // Compute HMAC SHA256
    const expectedSig = crypto
      .createHmac('sha256', secretKey)
      .update(signedPayload)
      .digest('hex');
    
    return crypto.timingSafeEqual(Buffer.from(h1), Buffer.from(expectedSig));
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}

module.exports = async (req, res) => {
  const {
    PADDLE_WEBHOOK_SECRET,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
  } = process.env;

  if (!PADDLE_WEBHOOK_SECRET) {
    res.statusCode = 500;
    res.end('Missing PADDLE_WEBHOOK_SECRET');
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

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    res.statusCode = 400;
    res.end('Failed to read body');
    return;
  }

  // Verify signature
  const signature = req.headers['paddle-signature'] || '';
  if (!verifyPaddleSignature(rawBody, signature, PADDLE_WEBHOOK_SECRET)) {
    console.error('Invalid Paddle signature');
    res.statusCode = 401;
    res.end('Invalid signature');
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch (err) {
    res.statusCode = 400;
    res.end('Invalid JSON');
    return;
  }

  try {
    // Handle subscription activated (payment successful)
    if (event.event_type === 'subscription.activated' || event.event_type === 'subscription.created') {
      const data = event.data || {};
      const customData = data.custom_data || {};
      const userId = customData.user_id;
      const tier = Number(customData.tier || 2);
      const customerId = data.customer_id || '';

      // Get subscription end date
      let endDate = null;
      if (data.current_billing_period && data.current_billing_period.ends_at) {
        endDate = data.current_billing_period.ends_at;
      } else if (data.next_billed_at) {
        endDate = data.next_billed_at;
      } else {
        // Fallback: 30 days from now
        endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      if (userId) {
        // Use RPC to update membership tier securely
        const { error } = await supabaseAdmin.rpc('update_membership_tier', {
          p_user_id: userId,
          p_tier: tier,
          p_stripe_customer_id: customerId, // Reusing field for Paddle customer ID
          p_subscription_end_date: endDate
        });

        if (error) {
          console.error('Failed to update membership:', error);
          throw error;
        }
      } else {
        console.warn('No user_id in custom_data');
      }
    }

    // Handle subscription updated (renewal, plan change)
    if (event.event_type === 'subscription.updated') {
      const data = event.data || {};
      const customData = data.custom_data || {};
      const userId = customData.user_id;

      if (userId && data.current_billing_period) {
        const endDate = data.current_billing_period.ends_at || data.next_billed_at;
        if (endDate) {
          await supabaseAdmin
            .from('profiles')
            .update({ subscription_end_date: endDate })
            .eq('id', userId);
        }
      }
    }

    // Handle subscription canceled
    if (event.event_type === 'subscription.canceled') {
      const data = event.data || {};
      const customData = data.custom_data || {};
      const userId = customData.user_id;

      if (userId) {
        // Optionally downgrade to tier 1 or mark as canceled
        // For now, just update status - actual downgrade can happen at period end
        await supabaseAdmin
          .from('profiles')
          .update({ subscription_status: 'canceled' })
          .eq('id', userId);
      }
    }

    // Handle transaction completed (one-time or first subscription payment)
    if (event.event_type === 'transaction.completed') {
      const data = event.data || {};
      const customData = data.custom_data || {};
      const userId = customData.user_id;
      const tier = Number(customData.tier || 2);
      const customerId = data.customer_id || '';

      // Only process if this is a subscription transaction
      if (userId && data.subscription_id) {
        
        // The subscription.activated event should handle this, but as backup:
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('membership_tier')
          .eq('id', userId)
          .single();

        // Only update if not already at this tier
        if (profile && profile.membership_tier < tier) {
          await supabaseAdmin.rpc('update_membership_tier', {
            p_user_id: userId,
            p_tier: tier,
            p_stripe_customer_id: customerId,
            p_subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          });
        }
      }
    }

    res.statusCode = 200;
    res.end('ok');
  } catch (err) {
    console.error('Webhook handler error:', err);
    res.statusCode = 500;
    res.end(err?.message || 'Webhook handler error');
  }
};
