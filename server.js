const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const db = require('./database');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = '608226137663-n7g5fqo6268rqs51nu6iv4m9d202phah.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public')); // Serve frontend files

// Configure Multer for wallpaper uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/uploads/wallpapers';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- Auth Routes ---

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

app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);

    if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { sub: googleId, email, name, picture } = payload;

    try {
        let user = await db.get('SELECT * FROM users WHERE google_id = ?', [googleId]);

        if (!user) {
            const result = await db.run(
                'INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)',
                [googleId, email, name, picture]
            );
            user = { id: result.id, google_id: googleId, email, name, picture };
        }

        // Log activity
        const today = new Date().toISOString().slice(0, 10);
        await db.run(
            'INSERT INTO user_activity (user_id, action, login_date, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
            [user.id, 'login', today, req.ip, req.headers['user-agent']]
        );

        // Return user info
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// --- Settings Routes ---

app.get('/api/settings', async (req, res) => {
    const userId = req.headers['x-user-id']; // Simple authentication for now
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const row = await db.get('SELECT settings_json FROM settings WHERE user_id = ?', [userId]);
        res.json(row ? JSON.parse(row.settings_json) : null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/settings', async (req, res) => {
    const userId = req.headers['x-user-id'];
    const settings = req.body; // Full settings object

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Check if settings exist
        const existing = await db.get('SELECT user_id FROM settings WHERE user_id = ?', [userId]);

        if (existing) {
            await db.run('UPDATE settings SET settings_json = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
                [JSON.stringify(settings), userId]);
        } else {
            await db.run('INSERT INTO settings (user_id, settings_json) VALUES (?, ?)',
                [userId, JSON.stringify(settings)]);
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Admin Routes ---

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'hongjiaoni@gmail.com' && password === '1qazwsx#') {
        res.json({ success: true, token: 'mock-admin-token', admin: { name: 'Admin', email } });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Admin Middleware
const requireAdmin = (req, res, next) => {
    if (req.headers.authorization !== 'Bearer mock-admin-token') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.use('/api/admin', (req, res, next) => {
    if (req.path === '/login') return next();
    requireAdmin(req, res, next);
});

// Get Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const userCount = await db.get('SELECT COUNT(*) as count FROM users');
        const today = new Date().toISOString().slice(0, 10);
        const todayLogins = await db.get('SELECT COUNT(DISTINCT user_id) as count FROM user_activity WHERE login_date = ? AND action = "login"', [today]);
        const onlineUsers = 1; // Simplified
        const totalWallpapers = await db.get('SELECT COUNT(*) as count FROM daily_wallpapers');
        const categories = await db.all('SELECT * FROM wallpaper_categories');

        res.json({
            success: true,
            stats: {
                totalUsers: userCount.count,
                todayLogins: todayLogins.count,
                onlineUsers: onlineUsers,
                totalWallpapers: totalWallpapers.count,
                categories: categories.length
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/stats/trending', async (req, res) => {
    try {
        // Last 7 days
        const trending = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().slice(0, 10);
            const row = await db.get('SELECT COUNT(DISTINCT user_id) as count FROM user_activity WHERE login_date = ? AND action = "login"', [dateStr]);
            trending.push({ date: dateStr, count: row.count || 0 });
        }
        res.json({ success: true, trending });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/stats/sessions', async (req, res) => {
    try {
        // Last 10 logins
        const sessions = await db.all(`
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
        const categories = await db.all('SELECT * FROM wallpaper_categories ORDER BY created_at DESC');
        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/categories', async (req, res) => {
    const { name, name_en } = req.body;
    try {
        await db.run('INSERT INTO wallpaper_categories (name, name_en) VALUES (?, ?)', [name, name_en]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/categories/:id', async (req, res) => {
    try {
        const category = await db.get('SELECT name FROM wallpaper_categories WHERE id = ?', [req.params.id]);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        // Check if category in use
        const inUse = await db.get('SELECT COUNT(*) as count FROM daily_wallpapers WHERE type = ?', [category.name]);
        if (inUse.count > 0) {
            return res.status(400).json({ error: 'Cannot delete category in use' });
        }

        await db.run('DELETE FROM wallpaper_categories WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Public Categories API
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await db.all('SELECT * FROM wallpaper_categories ORDER BY created_at DESC');
        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Users List (Recent 50)
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await db.all('SELECT id, name, email, picture, created_at as registeredAt FROM users ORDER BY created_at DESC LIMIT 50');
        // Map to match admin.js expectation (_id -> id handled by client mostly, but check admin.js use)
        const mappedUsers = users.map(u => ({ ...u, _id: u.id }));
        res.json({ success: true, users: mappedUsers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User's Home Preview
app.get('/api/admin/users/:id/preview', async (req, res) => {
    try {
        const user = await db.get('SELECT * FROM users WHERE id = ?', [req.params.id]);
        const row = await db.get('SELECT settings_json FROM settings WHERE user_id = ?', [req.params.id]);
        res.json({
            success: true,
            user: { ...user, registeredAt: user.created_at, _id: user.id },
            data: row ? JSON.parse(row.settings_json) : {}
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Public Wallpapers API
app.get('/api/wallpapers', async (req, res) => {
    const userId = req.headers['x-user-id'];
    try {
        let sql = 'SELECT id, date as title, url, type as category FROM daily_wallpapers';
        let params = [];

        if (userId) {
            sql += ' UNION ALL SELECT id, "Custom" as title, url, "Custom" as category FROM user_wallpapers WHERE user_id = ?';
            params.push(userId);
        }

        const wallpapers = await db.all(sql + ' ORDER BY id DESC', params);
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

// Admin: Get Wallpapers
app.get('/api/admin/wallpapers', async (req, res) => {
    try {
        const sql = `
            SELECT id, date as title, url, type as category, 'system' as source FROM daily_wallpapers
            UNION ALL
            SELECT id, 'User Upload' as title, url, category, 'user' as source FROM user_wallpapers
            ORDER BY id DESC
        `;
        const wallpapers = await db.all(sql);
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

// User Wallpaper Upload
app.post('/api/wallpapers/user-upload', upload.single('image'), async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const imageUrl = req.file ? `/uploads/wallpapers/${req.file.filename}` : req.body.imageUrl;
    if (!imageUrl) return res.status(400).json({ error: 'No image provided' });

    try {
        await db.run('INSERT INTO user_wallpapers (user_id, url, category) VALUES (?, ?, ?)',
            [userId, imageUrl, 'Custom']);
        res.json({ success: true, url: imageUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/wallpapers', upload.single('image'), async (req, res) => {
    // Logic to handle admin upload
    // admin.js sends JSON body if just URL, or formData?
    // Actually admin.js sends JSON with imageUrl.
    const { title, description, category, imageUrl, color } = req.body;

    // Use current date or provided date? Admin.js doesn't seem to send date, so maybe just add as "daily"?
    // Or maybe admin.js was built for a "Wallpaper Gallery" not just daily.
    // Let's assume it adds to a daily queue or just stores it.
    // For now, let's just insert into daily_wallpapers using today/random date to satisfy DB constraint
    const date = new Date().toISOString().slice(0, 10) + '-' + Math.random().toString(36).substring(7);

    try {
        await db.run(`INSERT INTO daily_wallpapers (date, url, type) VALUES (?, ?, ?)`,
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
            await db.run('DELETE FROM user_wallpapers WHERE id = ?', [req.params.id]);
        } else {
            await db.run('DELETE FROM daily_wallpapers WHERE id = ?', [req.params.id]);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/wallpaper/daily', async (req, res) => {
    const today = new Date().toISOString().slice(0, 10);
    try {
        const wallpaper = await db.get('SELECT * FROM daily_wallpapers WHERE date = ?', [today]);
        res.json(wallpaper || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
