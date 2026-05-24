// ===== NewTab Backend Server =====
// Note: This server is for local development only.
// Production uses Supabase (frontend directly connects) + Vercel serverless functions.

const express = require('express');
const cors = require('cors');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const db = require('./database');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration — prefer environment variables, fall back for dev convenience
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '608226137663-n7g5fqo6268rqs51nu6iv4m9d202phah.apps.googleusercontent.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const client = new OAuth2Client(CLIENT_ID);

// ===== Security Middleware =====
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// ===== Middleware =====
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Configure Multer for wallpaper uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/uploads/wallpapers';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ===== Helper Functions =====

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

function requireAuth(req, res, next) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.userId = userId;
  next();
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const expectedToken = ADMIN_TOKEN || 'mock-admin-token';
  if (token !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ===== Auth Routes =====

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const payload = await verifyGoogleToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { sub: googleId, email, name, picture } = payload;

  try {
    let user = db.get('SELECT * FROM users WHERE google_id = ?', [googleId]);

    if (!user) {
      const result = db.run(
        'INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)',
        [googleId, email, name, picture]
      );
      user = { id: result.id, google_id: googleId, email, name, picture };
    }

    // Log activity
    const today = new Date().toISOString().slice(0, 10);
    db.run(
      'INSERT INTO user_activity (user_id, action, login_date, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [user.id, 'login', today, req.ip, req.headers['user-agent']]
    );

    res.json({ user });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ===== Settings Routes =====

app.get('/api/settings', requireAuth, async (req, res) => {
  try {
    const row = db.get('SELECT settings_json FROM settings WHERE user_id = ?', [req.userId]);
    res.json(row ? JSON.parse(row.settings_json) : null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings', requireAuth, async (req, res) => {
  const settings = req.body;

  try {
    const existing = db.get('SELECT user_id FROM settings WHERE user_id = ?', [req.userId]);

    if (existing) {
      db.run(
        'UPDATE settings SET settings_json = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
        [JSON.stringify(settings), req.userId]
      );
    } else {
      db.run(
        'INSERT INTO settings (user_id, settings_json) VALUES (?, ?)',
        [req.userId, JSON.stringify(settings)]
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Admin Routes =====

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  // In production, set ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_TOKEN environment variables
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      res.json({ success: true, token: ADMIN_TOKEN, admin: { name: 'Admin', email } });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } else {
    // Dev-only fallback (no env vars set)
    if (email === 'hongjiaoni@gmail.com' && password === '1qazwsx#') {
      res.json({ success: true, token: 'mock-admin-token', admin: { name: 'Admin', email } });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  }
});

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (req.path === '/login') return next();
  requireAdmin(req, res, next);
};

app.use('/api/admin', adminMiddleware);

// Get Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const userCount = db.get('SELECT COUNT(*) as count FROM users');
    const today = new Date().toISOString().slice(0, 10);
    const todayLogins = db.get(
      'SELECT COUNT(DISTINCT user_id) as count FROM user_activity WHERE login_date = ? AND action = \'login\'',
      [today]
    );
    const totalWallpapers = db.get('SELECT COUNT(*) as count FROM daily_wallpapers');
    const categories = db.all('SELECT * FROM wallpaper_categories');

    res.json({
      success: true,
      stats: {
        totalUsers: userCount?.count || 0,
        todayLogins: todayLogins?.count || 0,
        onlineUsers: 1,
        totalWallpapers: totalWallpapers?.count || 0,
        categories: categories?.length || 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/stats/trending', async (req, res) => {
  try {
    const trending = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);
      const row = db.get(
        'SELECT COUNT(DISTINCT user_id) as count FROM user_activity WHERE login_date = ? AND action = \'login\'',
        [dateStr]
      );
      trending.push({ date: dateStr, count: row?.count || 0 });
    }
    res.json({ success: true, trending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/stats/sessions', async (req, res) => {
  try {
    const sessions = db.all(`
      SELECT u.email as userEmail, ua.created_at as loginTime, ua.ip_address as ipAddress, ua.user_agent as userAgent
      FROM user_activity ua
      JOIN users u ON ua.user_id = u.id
      WHERE ua.action = 'login'
      ORDER BY ua.created_at DESC
      LIMIT 10
    `);
    res.json({ success: true, sessions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Categories CRUD
app.get('/api/admin/categories', async (req, res) => {
  try {
    const categories = db.all('SELECT * FROM wallpaper_categories ORDER BY created_at DESC');
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/categories', async (req, res) => {
  const { name, name_en } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  try {
    db.run('INSERT INTO wallpaper_categories (name, name_en) VALUES (?, ?)', [name, name_en]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/categories/:id', async (req, res) => {
  try {
    const category = db.get('SELECT name FROM wallpaper_categories WHERE id = ?', [req.params.id]);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const inUse = db.get('SELECT COUNT(*) as count FROM daily_wallpapers WHERE type = ?', [category.name]);
    
    if (inUse?.count > 0) {
      return res.status(400).json({ error: 'Cannot delete category in use' });
    }

    db.run('DELETE FROM wallpaper_categories WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public Categories API
app.get('/api/categories', async (req, res) => {
  try {
    const categories = db.all('SELECT * FROM wallpaper_categories ORDER BY created_at DESC');
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Users List
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = db.all(
      'SELECT id, name, email, picture, created_at as registeredAt FROM users ORDER BY created_at DESC LIMIT 50'
    );
    const mappedUsers = users.map(u => ({ ...u, _id: u.id }));
    res.json({ success: true, users: mappedUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/users/:id/preview', async (req, res) => {
  try {
    const user = db.get('SELECT * FROM users WHERE id = ?', [req.params.id]);
    const row = db.get('SELECT settings_json FROM settings WHERE user_id = ?', [req.params.id]);
    
    res.json({
      success: true,
      user: { ...user, registeredAt: user?.created_at, _id: user?.id },
      data: row ? JSON.parse(row.settings_json) : {}
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Wallpaper Routes =====

app.get('/api/wallpapers', async (req, res) => {
  const userId = req.headers['x-user-id'];
  
  try {
    let sql = 'SELECT id, date as title, url, type as category FROM daily_wallpapers';
    let params = [];

    if (userId) {
      sql += ' UNION ALL SELECT id, "Custom" as title, url, "Custom" as category FROM user_wallpapers WHERE user_id = ?';
      params.push(userId);
    }

    const wallpapers = db.all(sql + ' ORDER BY id DESC', params);
    
    res.json({
      success: true,
      wallpapers: wallpapers.map(w => ({
        _id: w.id,
        title: w.title,
        imageUrl: w.url,
        category: w.category
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/wallpapers', async (req, res) => {
  try {
    const sql = `
      SELECT id, date as title, url, type as category, 'system' as source FROM daily_wallpapers
      UNION ALL
      SELECT id, 'User Upload' as title, url, category, 'user' as source FROM user_wallpapers
      ORDER BY id DESC
    `;
    const wallpapers = db.all(sql);
    
    res.json({
      success: true,
      wallpapers: wallpapers.map(w => ({
        _id: w.id,
        title: w.title,
        imageUrl: w.url,
        category: w.category,
        source: w.source
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/wallpapers/user-upload', requireAuth, upload.single('image'), async (req, res) => {
  const imageUrl = req.file ? `/uploads/wallpapers/${req.file.filename}` : req.body.imageUrl;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    db.run(
      'INSERT INTO user_wallpapers (user_id, url, category) VALUES (?, ?, ?)',
      [req.userId, imageUrl, 'Custom']
    );
    res.json({ success: true, url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/wallpapers', upload.single('image'), async (req, res) => {
  const { title, description, category, imageUrl, color } = req.body;
  const date = new Date().toISOString().slice(0, 10) + '-' + Math.random().toString(36).substring(7);

  try {
    db.run(
      'INSERT INTO daily_wallpapers (date, url, type) VALUES (?, ?, ?)',
      [date, imageUrl, category]
    );
    res.json({ success: true, url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/wallpapers/:id', async (req, res) => {
  const source = req.query.source || 'system';
  
  try {
    if (source === 'user') {
      db.run('DELETE FROM user_wallpapers WHERE id = ?', [req.params.id]);
    } else {
      db.run('DELETE FROM daily_wallpapers WHERE id = ?', [req.params.id]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/wallpaper/daily', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  
  try {
    const wallpaper = db.get('SELECT * FROM daily_wallpapers WHERE date = ?', [today]);
    res.json(wallpaper || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Start Server =====
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
