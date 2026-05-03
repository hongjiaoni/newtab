// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

// Point DB to a temp file before importing server
const TEST_DB_PATH = path.join(process.cwd(), 'data', 'test-newtab.db');
process.env.DB_PATH = TEST_DB_PATH;
process.env.NODE_ENV = 'test';

// Clean up any previous test DB
if (fs.existsSync(TEST_DB_PATH)) {
  fs.unlinkSync(TEST_DB_PATH);
}

let request;
let app;
let db;

beforeAll(async () => {
  const supertest = await import('supertest');
  request = supertest.default;
  app = (await import('../server.js')).default;

  // Connect to the test database that server.js already initialized
  // and insert a test user for foreign key reference
  db = new Database(TEST_DB_PATH);
  db.prepare(`
    INSERT OR IGNORE INTO users (id, google_id, email, name)
    VALUES (999, 'test-google-id', 'test@example.com', 'Test User')
  `).run();
  db.close();
});

afterAll(() => {
  // Clean up test database
  try {
    if (fs.existsSync(TEST_DB_PATH)) {
      fs.unlinkSync(TEST_DB_PATH);
    }
    const walPath = TEST_DB_PATH + '-wal';
    const shmPath = TEST_DB_PATH + '-shm';
    if (fs.existsSync(walPath)) fs.unlinkSync(walPath);
    if (fs.existsSync(shmPath)) fs.unlinkSync(shmPath);
  } catch (_err) {
    // ignore cleanup errors
  }
});

// ─── Security Headers ─────────────────────────────────────────────────

describe('Security Headers', () => {
  it('should set X-Content-Type-Options: nosniff', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('should set X-Frame-Options: DENY', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.headers['x-frame-options']).toBe('DENY');
  });

  it('should set Referrer-Policy', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });

  it('should set Permissions-Policy', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.headers['permissions-policy']).toBeDefined();
  });
});

// ─── Auth Endpoints ───────────────────────────────────────────────────

describe('POST /api/auth/google', () => {
  it('should return 400 when token is missing', async () => {
    const res = await request(app)
      .post('/api/auth/google')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Token is required');
  });

  it('should return 401 when token is invalid', async () => {
    const res = await request(app)
      .post('/api/auth/google')
      .send({ token: 'invalid-token' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid token');
  }, 15000);
});

// ─── Settings Endpoints ───────────────────────────────────────────────

describe('Settings API', () => {
  it('GET /api/settings should return 401 without auth', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });

  it('GET /api/settings should return null for new user', async () => {
    const res = await request(app)
      .get('/api/settings')
      .set('x-user-id', '998');
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });

  it('POST /api/settings should create settings', async () => {
    const testSettings = { theme: 'dark', viewMode: 'general' };
    const res = await request(app)
      .post('/api/settings')
      .set('x-user-id', '999')
      .send(testSettings);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/settings should return saved settings', async () => {
    const res = await request(app)
      .get('/api/settings')
      .set('x-user-id', '999');
    expect(res.status).toBe(200);
    expect(res.body.theme).toBe('dark');
    expect(res.body.viewMode).toBe('general');
  });

  it('POST /api/settings should update existing settings', async () => {
    await request(app)
      .post('/api/settings')
      .set('x-user-id', '999')
      .send({ theme: 'light', viewMode: 'minimalist' });

    const res = await request(app)
      .get('/api/settings')
      .set('x-user-id', '999');
    expect(res.body.theme).toBe('light');
    expect(res.body.viewMode).toBe('minimalist');
  });
});

// ─── Admin Endpoints ──────────────────────────────────────────────────

describe('Admin Login', () => {
  it('POST /api/admin/login should accept dev fallback credentials', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'hongjiaoni@gmail.com', password: '1qazwsx#' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBe('mock-admin-token');
  });

  it('POST /api/admin/login should reject wrong credentials', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'wrong@email.com', password: 'wrongpass' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/admin/login should reject when email is missing', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ password: '1qazwsx#' });
    expect(res.status).toBe(401);
  });
});

describe('Admin API (with auth)', () => {
  let adminToken;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'hongjiaoni@gmail.com', password: '1qazwsx#' });
    adminToken = res.body.token;
  });

  it('GET /api/admin/stats should return stats', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toBeDefined();
    expect(typeof res.body.stats.totalUsers).toBe('number');
    expect(typeof res.body.stats.todayLogins).toBe('number');
  });

  it('GET /api/admin/stats/trending should return 7-day trend', async () => {
    const res = await request(app)
      .get('/api/admin/stats/trending')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.trending).toHaveLength(7);
    expect(res.body.trending[0].date).toBeDefined();
    expect(typeof res.body.trending[0].count).toBe('number');
  });

  it('GET /api/admin/users should return users list', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  it('Admin endpoints should reject without auth token', async () => {
    const res = await request(app).get('/api/admin/stats');
    expect(res.status).toBe(401);
  });

  it('Admin endpoints should reject with bad token', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', 'Bearer wrong-token');
    expect(res.status).toBe(401);
  });
});

// ─── Categories CRUD ──────────────────────────────────────────────────

describe('Categories API', () => {
  let adminToken;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'hongjiaoni@gmail.com', password: '1qazwsx#' });
    adminToken = res.body.token;
  });

  it('GET /api/categories (public) should return categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.categories)).toBe(true);
  });

  it('POST /api/admin/categories should create a category', async () => {
    const res = await request(app)
      .post('/api/admin/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: '测试分类', name_en: 'Test Category' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/admin/categories should reject without name', async () => {
    const res = await request(app)
      .post('/api/admin/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name_en: 'Only English' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name is required');
  });

  it('GET /api/categories should include newly created category', async () => {
    const res = await request(app).get('/api/categories');
    const names = res.body.categories.map(c => c.name);
    expect(names).toContain('测试分类');
  });

  it('DELETE /api/admin/categories/:id should return 404 for nonexistent', async () => {
    const res = await request(app)
      .delete('/api/admin/categories/99999')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(404);
  });
});

// ─── Wallpaper API ────────────────────────────────────────────────────

describe('Wallpapers API', () => {
  let adminToken;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'hongjiaoni@gmail.com', password: '1qazwsx#' });
    adminToken = res.body.token;
  });

  it('GET /api/wallpapers should return wallpaper list', async () => {
    const res = await request(app).get('/api/wallpapers');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.wallpapers)).toBe(true);
  });

  it('GET /api/wallpaper/daily should return null or wallpaper', async () => {
    const res = await request(app).get('/api/wallpaper/daily');
    expect(res.status).toBe(200);
    // Can be null or an object - just ensure it doesn't error
  });

  it('POST /api/wallpapers/user-upload should require auth', async () => {
    const res = await request(app)
      .post('/api/wallpapers/user-upload')
      .send({ imageUrl: 'https://example.com/img.jpg' });
    expect(res.status).toBe(401);
  });

  it('POST /api/admin/wallpapers should require admin auth', async () => {
    const res = await request(app)
      .post('/api/admin/wallpapers')
      .send({ imageUrl: 'https://example.com/img.jpg', category: 'test' });
    expect(res.status).toBe(401);
  });

  it('DELETE /api/admin/wallpapers/:id should require admin auth', async () => {
    const res = await request(app).delete('/api/admin/wallpapers/1');
    expect(res.status).toBe(401);
  });
});
