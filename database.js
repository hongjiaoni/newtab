const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      google_id TEXT UNIQUE,
      name TEXT,
      picture TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        // Settings Table (Stores the JSON blob of user settings)
        db.run(`CREATE TABLE IF NOT EXISTS settings (
      user_id INTEGER PRIMARY KEY,
      settings_json TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

        // Daily Wallpapers Table
        db.run(`CREATE TABLE IF NOT EXISTS daily_wallpapers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT UNIQUE, -- YYYY-MM-DD
      url TEXT,
      type TEXT, -- 'image' or 'video'
      credit TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        // User Activity Table (Logins and daily stats)
        db.run(`CREATE TABLE IF NOT EXISTS user_activity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT, -- e.g. 'login'
      login_date TEXT, -- YYYY-MM-DD
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

        // Wallpaper Categories Table
        db.run(`CREATE TABLE IF NOT EXISTS wallpaper_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      name_en TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

        // User Wallpapers Table
        db.run(`CREATE TABLE IF NOT EXISTS user_wallpapers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      url TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

        // Ensure default categories exist
        db.get("SELECT COUNT(*) as count FROM wallpaper_categories", [], (err, row) => {
            if (!err && row.count === 0) {
                db.run("INSERT INTO wallpaper_categories (name, name_en) VALUES (?, ?)", ['风景', 'Landscape']);
                db.run("INSERT INTO wallpaper_categories (name, name_en) VALUES (?, ?)", ['纯色', 'Solid Color']);
                db.run("INSERT INTO wallpaper_categories (name, name_en) VALUES (?, ?)", ['每日推荐', 'Daily Recommendation']);
                db.run("INSERT INTO wallpaper_categories (name, name_en) VALUES (?, ?)", ['Custom', 'Custom']);
            }
        });
    });
}

// Helper methods
const Database = {
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    all: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, changes: this.changes });
            });
        });
    },
    close: () => {
        db.close();
    }
};

module.exports = Database;
