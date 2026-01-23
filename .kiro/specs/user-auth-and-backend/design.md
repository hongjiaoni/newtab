# 设计文档：用户认证与后端系统

## 概述

本设计文档描述了起始页项目的用户认证、后端数据库、壁纸系统和运营后台的实现方案。该系统将支持用户账户管理、云端数据同步、个性化壁纸选择和运营管理功能。

## 架构

### 整体系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    用户浏览器                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  起始页应用 (index.html + script.js + style.css)     │  │
│  │  - Google OAuth 集成                                 │  │
│  │  - 用户认证管理                                      │  │
│  │  - 壁纸选择系统                                      │  │
│  │  - 本地数据缓存                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    后端服务器                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API 服务 (Node.js/Express 或 Python/Flask)         │  │
│  │  - Google OAuth 回调处理                            │  │
│  │  - 用户认证和会话管理                                │  │
│  │  - 用户数据 CRUD 操作                                │  │
│  │  - 壁纸管理 API                                      │  │
│  │  - 运营后台 API                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  数据库 (PostgreSQL/MongoDB)                         │  │
│  │  - 用户表 (users)                                    │  │
│  │  - 用户数据表 (user_data)                            │  │
│  │  - 壁纸表 (wallpapers)                               │  │
│  │  - 管理员表 (admins)                                 │  │
│  │  - 操作日志表 (audit_logs)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    运营后台                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Admin Dashboard (React/Vue 或纯 HTML/JS)           │  │
│  │  - 管理员登录                                        │  │
│  │  - 壁纸管理                                          │  │
│  │  - 用户管理                                          │  │
│  │  - 统计分析                                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 数据流

```
用户操作 → 前端处理 → API 请求 → 后端验证 → 数据库操作 → 响应 → 前端更新
```

## 组件和接口

### 1. Google OAuth 集成

**前端实现：**

```javascript
// Google OAuth 配置
const GOOGLE_CONFIG = {
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  redirectUri: 'https://yourdomain.com/auth/callback',
  scope: 'email profile'
};

// 登录函数
async function loginWithGoogle() {
  try {
    // 使用 Google Sign-In 库或 OAuth 2.0 流程
    const response = await gapi.auth2.getAuthInstance().signIn();
    const profile = response.getBasicProfile();
    const email = profile.getEmail();
    const idToken = response.getAuthResponse().id_token;
    
    // 发送到后端进行验证和注册
    const result = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, idToken })
    });
    
    const data = await result.json();
    if (data.success) {
      handleLoginSuccess(data);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// 处理登录成功
function handleLoginSuccess(data) {
  // 保存用户信息和令牌
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);
  localStorage.setItem('loginTime', Date.now());
  
  // 加载用户数据
  loadUserData();
  
  // 更新 UI
  updateAuthUI();
}
```

**后端实现（Node.js/Express）：**

```javascript
// 验证 Google ID Token
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.post('/api/auth/login', async (req, res) => {
  const { email, idToken } = req.body;
  
  try {
    // 验证 ID Token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    
    // 检查用户是否存在
    let user = await User.findOne({ email: payload.email });
    
    if (!user) {
      // 创建新用户
      user = await User.create({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        registeredAt: new Date()
      });
    }
    
    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await user.save();
    
    // 生成会话令牌
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '90d' }
    );
    
    res.json({
      success: true,
      user: { id: user._id, email: user.email, name: user.name },
      token
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
});
```

### 2. 会话管理和 90 天自动登录

**前端实现：**

```javascript
// 检查登录状态
function checkLoginStatus() {
  const user = localStorage.getItem('user');
  const loginTime = localStorage.getItem('loginTime');
  
  if (!user || !loginTime) {
    return false;
  }
  
  const now = Date.now();
  const daysSinceLogin = (now - parseInt(loginTime)) / (1000 * 60 * 60 * 24);
  
  if (daysSinceLogin > 90) {
    // 超过 90 天，清除登录信息
    logout();
    return false;
  }
  
  // 在 90 天内，自动登录
  return true;
}

// 页面加载时检查
window.addEventListener('load', () => {
  if (checkLoginStatus()) {
    loadUserData();
  }
});
```

### 3. 用户数据同步

**前端实现：**

```javascript
// 加载用户数据
async function loadUserData() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('/api/user/data', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // 应用用户数据
      state.sites = data.sites;
      state.tags = data.tags;
      state.tagOrder = data.tagOrder;
      state.siteOrder = data.siteOrder;
      state.wallpaper = data.wallpaper;
      
      renderHome();
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
}

// 同步用户数据到后端
async function syncUserData() {
  const token = localStorage.getItem('token');
  
  if (!token) return; // 未登录，不同步
  
  try {
    await fetch('/api/user/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        sites: state.sites,
        tags: state.tags,
        tagOrder: state.tagOrder,
        siteOrder: state.siteOrder,
        wallpaper: state.wallpaper
      })
    });
  } catch (error) {
    console.error('Failed to sync user data:', error);
  }
}

// 在数据变化时同步
function saveData() {
  localStorage.setItem('sites', JSON.stringify(state.sites));
  localStorage.setItem('tags', JSON.stringify(state.tags));
  localStorage.setItem('tagOrder', JSON.stringify(state.tagOrder));
  localStorage.setItem('siteOrder', JSON.stringify(state.siteOrder));
  
  // 如果已登录，同步到后端
  syncUserData();
}
```

**后端实现：**

```javascript
// 获取用户数据
app.get('/api/user/data', authenticateToken, async (req, res) => {
  try {
    const userData = await UserData.findOne({ userId: req.user.userId });
    
    if (!userData) {
      return res.json({ success: true, sites: [], tags: [], tagOrder: [], siteOrder: [] });
    }
    
    res.json({ success: true, ...userData.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 保存用户数据
app.post('/api/user/data', authenticateToken, async (req, res) => {
  try {
    const { sites, tags, tagOrder, siteOrder, wallpaper } = req.body;
    
    let userData = await UserData.findOne({ userId: req.user.userId });
    
    if (!userData) {
      userData = new UserData({ userId: req.user.userId });
    }
    
    userData.sites = sites;
    userData.tags = tags;
    userData.tagOrder = tagOrder;
    userData.siteOrder = siteOrder;
    userData.wallpaper = wallpaper;
    userData.updatedAt = new Date();
    
    await userData.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### 4. 壁纸系统

**前端实现：**

```javascript
// 壁纸数据
const WALLPAPERS = {
  landscape: [
    { id: 'landscape-1', name: '山脉', url: '/wallpapers/landscape-1.jpg' },
    { id: 'landscape-2', name: '海滩', url: '/wallpapers/landscape-2.jpg' },
    // ... 更多风景壁纸
  ],
  solid: [
    { id: 'solid-1', name: '深蓝', color: '#1e3a8a' },
    { id: 'solid-2', name: '深灰', color: '#374151' },
    // ... 更多纯色壁纸
  ]
};

// 应用壁纸
function applyWallpaper(wallpaperId) {
  let wallpaper = null;
  
  if (wallpaperId === 'daily') {
    // 获取每日推荐
    fetchDailyWallpaper();
    return;
  }
  
  // 查找壁纸
  for (const category of Object.values(WALLPAPERS)) {
    wallpaper = category.find(w => w.id === wallpaperId);
    if (wallpaper) break;
  }
  
  if (!wallpaper) return;
  
  // 应用壁纸
  if (wallpaper.color) {
    document.body.style.background = wallpaper.color;
  } else if (wallpaper.url) {
    document.body.style.backgroundImage = `url('${wallpaper.url}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }
  
  // 保存选择
  state.wallpaper = wallpaperId;
  saveData();
}

// 获取每日推荐壁纸
async function fetchDailyWallpaper() {
  try {
    const response = await fetch('/api/wallpaper/daily');
    const data = await response.json();
    
    if (data.success) {
      applyWallpaper(data.wallpaper.id);
    }
  } catch (error) {
    console.error('Failed to fetch daily wallpaper:', error);
  }
}
```

**后端实现：**

```javascript
// 获取每日推荐壁纸
app.get('/api/wallpaper/daily', async (req, res) => {
  try {
    const today = new Date().toDateString();
    
    let dailyWallpaper = await DailyWallpaper.findOne({ date: today });
    
    if (!dailyWallpaper) {
      // 如果没有今日推荐，返回最新的
      dailyWallpaper = await DailyWallpaper.findOne().sort({ date: -1 });
    }
    
    res.json({ success: true, wallpaper: dailyWallpaper });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 上传每日推荐壁纸（管理员）
app.post('/api/admin/wallpaper/daily', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const dailyWallpaper = new DailyWallpaper({
      date: new Date().toDateString(),
      title,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.admin.id,
      uploadedAt: new Date()
    });
    
    await dailyWallpaper.save();
    
    res.json({ success: true, wallpaper: dailyWallpaper });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### 5. 运营后台

**后端 API：**

```javascript
// 获取用户列表
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    
    const query = search ? { email: { $regex: search, $options: 'i' } } : {};
    
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ registeredAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      users,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取用户首页预览
app.get('/api/admin/users/:userId/preview', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userData = await UserData.findOne({ userId: req.params.userId });
    
    res.json({
      success: true,
      user,
      data: userData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取在线用户统计
app.get('/api/admin/stats/online', authenticateAdmin, async (req, res) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    
    const onlineUsers = await Session.countDocuments({
      expiresAt: { $gt: now }
    });
    
    const todayLogins = await User.countDocuments({
      lastLoginAt: { $gte: oneDayAgo }
    });
    
    res.json({
      success: true,
      onlineUsers,
      todayLogins,
      totalUsers: await User.countDocuments()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## 数据模型

### 用户表 (users)

```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  picture: String,
  registeredAt: Date,
  lastLoginAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 用户数据表 (user_data)

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  sites: Array,
  tags: Array,
  tagOrder: Array,
  siteOrder: Array,
  wallpaper: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 壁纸表 (wallpapers)

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  imageUrl: String,
  category: String (landscape, solid, daily),
  uploadedBy: ObjectId (ref: admins),
  uploadedAt: Date,
  createdAt: Date
}
```

### 每日推荐表 (daily_wallpapers)

```javascript
{
  _id: ObjectId,
  date: String,
  title: String,
  description: String,
  imageUrl: String,
  uploadedBy: ObjectId (ref: admins),
  uploadedAt: Date
}
```

### 管理员表 (admins)

```javascript
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  name: String,
  role: String (admin, superadmin),
  createdAt: Date,
  updatedAt: Date
}
```

### 操作日志表 (audit_logs)

```javascript
{
  _id: ObjectId,
  adminId: ObjectId (ref: admins),
  action: String,
  resource: String,
  resourceId: ObjectId,
  changes: Object,
  timestamp: Date
}
```

## 正确性属性

### 属性 1: 登录会话有效性

*对于任何* 登录用户，如果登录时间在 90 天内，系统应该自动登录；如果超过 90 天，系统应该清除登录信息。

**验证：需求 2.1, 2.2, 2.3, 2.4**

### 属性 2: 用户数据一致性

*对于任何* 已登录用户，修改首页设置后，数据应该同时保存到本地存储和后端数据库。

**验证：需求 5.1, 5.3**

### 属性 3: 退出后数据清空

*对于任何* 已登录用户，退出后应该清除用户数据，仅保留本地缓存。

**验证：需求 3.2, 3.3, 3.4**

### 属性 4: 壁纸持久化

*对于任何* 壁纸选择，应该保存到本地存储和后端（如果已登录），并在页面重新加载后恢复。

**验证：需求 6.7, 6.8**

### 属性 5: 每日推荐更新

*对于任何* 选择每日推荐的用户，系统应该每天自动更新壁纸。

**验证：需求 7.4, 7.5**

## 测试策略

### 单元测试

- Google OAuth 登录流程
- 90 天自动登录检查
- 用户数据同步
- 壁纸应用和保存
- 每日推荐壁纸获取

### 属性测试

- 登录会话有效性
- 用户数据一致性
- 退出后数据清空
- 壁纸持久化
- 每日推荐更新

### 集成测试

- 完整的登录流程
- 用户数据同步和加载
- 壁纸选择和应用
- 运营后台功能

### 手动测试

- Google OAuth 认证
- 跨设备数据同步
- 离线模式
- 运营后台界面
