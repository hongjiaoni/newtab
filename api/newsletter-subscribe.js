export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string'
      ? (() => {
        try { return JSON.parse(req.body); } catch { return {}; }
      })()
      : (req.body || {});

    const { email } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Here you can integrate with your preferred email service
    // For now, we'll just log it and return success
    console.log('Newsletter subscription:', email);

    // You can integrate with services like:
    // - Mailchimp
    // - ConvertKit
    // - Supabase (store in database)
    // - SendGrid
    // etc.

    // For demonstration, we'll store it in a simple way
    // In production, you should use a proper database
    await storeSubscription(email);

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to subscribe to newsletter'
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function storeSubscription(email) {
  // Simple storage implementation
  // In production, replace this with your database logic
  
  // Option 1: Store in Supabase
  // const { createClient } = require('@supabase/supabase-js');
  // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  // await supabase.from('newsletter_subscriptions').insert({ email, created_at: new Date() });

  // Option 2: Store in a file (for development only)
  try {
    const { default: path } = await import('path');
    const fs = await import('fs/promises');

    const filePath = path.join(process.cwd(), 'newsletter-subscriptions.json');
    let subscriptions = [];
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      subscriptions = JSON.parse(data);
    } catch (err) {
      // File doesn't exist, start with empty array
    }
    
    // Check if email already exists
    if (!subscriptions.some(sub => sub.email === email)) {
      subscriptions.push({
        email,
        subscribed_at: new Date().toISOString(),
        ip: null // You can add IP tracking if needed
      });
      
      await fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2));
    }
  } catch (error) {
    console.error('Error storing subscription:', error);
  }
}
