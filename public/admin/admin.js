// ===== Admin Dashboard Module (Supabase) =====

const adminState = {
  isLoggedIn: false,
  user: null,
  currentTab: 'dashboard',
  currentLanguage: localStorage.getItem('adminLanguage') || 'zh'
};

// Admin translations (Keep existing)
var adminTranslations = {
  zh: {
    dashboard: '仪表板',
    users: '用户管理',
    wallpapers: '壁纸管理',
    logs: '操作日志',
    logout: '退出登录',
    totalUsers: '总用户数',
    todayLogins: '今日登录',
    onlineUsers: '壁纸总数', // Reused slot for layout
    totalWallpapers: '壁纸总数',
    email: '邮箱',
    name: '名称',
    registerTime: '注册时间',
    lastLogin: '更新时间', // Changed from Last Login
    action: '操作',
    preview: '预览',
    delete: '删除',
    upload: '上传壁纸',
    title: '标题',
    description: '描述',
    category: '分类',
    imageUrl: '图片URL',
    color: '颜色',
    landscape: '风景',
    solid: '纯色',
    cancel: '取消',
    confirm: '确认',
    time: '时间',
    admin: '管理员',
    resource: '资源',
    status: '状态',
    search: '搜索用户邮箱...',
    refresh: '刷新',
    loading: '加载中...',
    success: '成功',
    error: '错误',
    loginTrend: '趋势',
    activeSessions: '活跃会话',
    sessionUser: '用户',
    sessionLoginTime: '登录时间',
    sessionIp: 'IP地址',
    sessionBrowser: '浏览器',
    noActiveSessions: '暂无活跃会话'
  },
  en: {
    dashboard: 'Dashboard',
    users: 'Users',
    wallpapers: 'Wallpapers',
    logs: 'Logs',
    logout: 'Logout',
    totalUsers: 'Total Users',
    todayLogins: 'Today Logins',
    onlineUsers: 'Total Wallpapers',
    totalWallpapers: 'Total Wallpapers',
    email: 'Email',
    name: 'Name',
    registerTime: 'Register Time',
    lastLogin: 'Updated At',
    action: 'Action',
    preview: 'Preview',
    delete: 'Delete',
    upload: 'Upload Wallpaper',
    title: 'Title',
    description: 'Description',
    category: 'Category',
    imageUrl: 'Image URL',
    color: 'Color',
    landscape: 'Landscape',
    solid: 'Solid Color',
    cancel: 'Cancel',
    confirm: 'Confirm',
    time: 'Time',
    admin: 'Admin',
    resource: 'Resource',
    status: 'Status',
    search: 'Search user email...',
    refresh: 'Refresh',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    loginTrend: 'Trend',
    activeSessions: 'Active Sessions',
    sessionUser: 'User',
    sessionLoginTime: 'Login Time',
    sessionIp: 'IP Address',
    sessionBrowser: 'Browser',
    noActiveSessions: 'No active sessions'
  }
};

// Get translation
function t(key) {
  return adminTranslations[adminState.currentLanguage][key] || key;
}

// Initialize admin dashboard
async function initializeAdmin() {
  if (!supabase) {
    console.error('Supabase not loaded');
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    adminState.user = session.user;
    adminState.isLoggedIn = true;
    showAdminDashboard();
    loadDashboardStats();
  } else {
    showAdminLoginPage();
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      adminState.user = session.user;
      adminState.isLoggedIn = true;
      // showAdminDashboard(); // Already handled or reliable on reload
    } else {
      adminState.isLoggedIn = false;
      adminState.user = null;
      showAdminLoginPage();
    }
  });
}

// Show admin login page
function showAdminLoginPage() {
  document.body.innerHTML = `
    <div class="admin-login-container">
      <div class="admin-login-box">
        <h1>Start Page 运营后台</h1>
        <form onsubmit="handleAdminLogin(event)">
          <div class="form-group">
            <label>邮箱</label>
            <input type="email" id="adminEmail" required class="form-input">
          </div>
          <div class="form-group">
            <label>密码</label>
            <input type="password" id="adminPassword" required class="form-input">
          </div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>
  `;
}

// Show admin dashboard
function showAdminDashboard() {
  // Restore dashboard HTML structure if it was replaced by login page
  if (!document.querySelector('.admin-container')) {
    location.reload();
    return;
  }

  document.body.style.display = 'block';
  document.querySelector('.admin-container').style.display = 'flex';
  updateAdminUI();
}

// Handle admin login
async function handleAdminLogin(event) {
  event.preventDefault();

  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('登录失败：' + error.message);
    } else {
      location.reload();
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('登录出错：' + error.message);
  }
}

// Admin logout
async function adminLogout() {
  await supabase.auth.signOut();
  location.reload();
}

// Update admin UI
function updateAdminUI() {
  if (adminState.user) {
    document.getElementById('adminName').textContent = adminState.user.email;
  }
}

// Switch tab
function switchTab(tab, event) {
  adminState.currentTab = tab;

  // Hide all tabs
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show selected tab
  const tabElement = document.getElementById(tab + 'Tab');
  if (tabElement) {
    tabElement.classList.remove('hidden');
  }

  // Mark nav item as active
  if (event && event.target) {
    const navItem = event.target.closest('.nav-item');
    if (navItem) navItem.classList.add('active');
  }

  // Load data for tab
  if (tab === 'users') {
    loadUsers();
  } else if (tab === 'wallpapers') {
    loadWallpapers();
  } else if (tab === 'categories') {
    loadCategories();
  } else if (tab === 'logs') {
    loadLogs();
  }
}

// Category Management
async function loadCategories() {
  try {
    const { data, error } = await supabase
      .from('wallpaper_categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      const tbody = document.getElementById('categoriesTableBody');
      tbody.innerHTML = data.map(cat => `
        <tr>
          <td>${cat.name}</td>
          <td>${cat.name_en || '-'}</td>
          <td>${new Date(cat.created_at).toLocaleDateString()}</td>
          <td>
            <button onclick="deleteCategory('${cat.id}')" class="btn btn-small btn-danger">删除</button>
          </td>
        </tr>
      `).join('');
    } else if (error) {
      console.error('Load categories error:', error);
    }
  } catch (error) {
    console.error('Load categories exc:', error);
  }
}

function openAddCategoryModal() {
  document.getElementById('categoryName').value = '';
  document.getElementById('categoryNameEn').value = '';
  document.getElementById('categoryModal').classList.remove('hidden');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.add('hidden');
}

async function saveCategory() {
  const name = document.getElementById('categoryName').value.trim();
  const name_en = document.getElementById('categoryNameEn').value.trim();
  if (!name) return alert('请填写名称');

  try {
    const { error } = await supabase
      .from('wallpaper_categories')
      .insert({ name, name_en });

    if (!error) {
      closeCategoryModal();
      loadCategories();
    } else {
      alert('保存失败：' + error.message);
    }
  } catch (error) {
    console.error('Save category error:', error);
  }
}

async function deleteCategory(id) {
  if (!confirm('确定删除此分类？')) return;
  try {
    const { error } = await supabase
      .from('wallpaper_categories')
      .delete()
      .eq('id', id);

    if (!error) {
      loadCategories();
    } else {
      alert('无法删除：' + error.message);
    }
  } catch (error) {
    console.error('Delete category error:', error);
  }
}

// Load dashboard statistics
async function loadDashboardStats() {
  try {
    // 1. Total Users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // 2. Total Wallpapers
    const { count: totalWallpapers } = await supabase
      .from('wallpapers')
      .select('*', { count: 'exact', head: true });

    document.getElementById('totalUsers').textContent = totalUsers || 0;
    document.getElementById('onlineUsers').textContent = totalWallpapers || 0; // Using this slot for Wallpapers count 2
    document.getElementById('todayLogins').textContent = '-'; // Not easily tracked without events table

    // Placeholder for charts
    const container = document.getElementById('sessionInfoContent');
    container.innerHTML = `<p style="text-align: center; color: #999;">Supabase Migration: Advanced analytics coming soon</p>`;

  } catch (error) {
    console.error('Load stats error:', error);
  }
}

// Load users
async function loadUsers() {
  try {
    const search = document.getElementById('userSearch')?.value || '';
    let query = supabase.from('profiles').select('*').order('updated_at', { ascending: false });

    if (search) {
      query = query.ilike('email', `%${search}%`);
    }

    const { data: users, error } = await query;

    if (users) {
      const tbody = document.getElementById('usersTableBody');
      tbody.innerHTML = users.map(user => `
        <tr>
          <td>${user.email || 'N/A'}</td>
          <td>${user.full_name || '-'}</td>
          <td>-</td>
          <td>${user.updated_at ? new Date(user.updated_at).toLocaleDateString() : '-'}</td>
          <td>
            <button onclick="previewUser('${user.id}')" class="btn btn-small">预览</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Load users error:', error);
  }
}

// Preview user
async function previewUser(userId) {
  try {
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (user) {
      const sites = user.sites || [];
      const tags = user.tags || [];
      const wallpaper = user.settings?.wallpaper || '默认';

      const content = `
        <div class="user-preview">
          <h4>${user.email}</h4>
          <p>更新时间：${user.updated_at ? new Date(user.updated_at).toLocaleString() : '-'}</p>
          <hr>
          <h5>首页设置</h5>
          <p>壁纸：${wallpaper}</p>
          <div class="preview-section">
            <h6>标签 (${tags.length})</h6>
            <div class="preview-list">
              ${tags.length > 0 ? tags.map(t => `<span class="preview-chip">${t}</span>`).join('') : '无'}
            </div>
          </div>
          <div class="preview-section" style="margin-top: 15px;">
            <h6>网站 (${sites.length})</h6>
            <ul class="preview-sites">
              ${sites.length > 0 ? sites.map(s => `<li>${s.name} (${s.url.substring(0, 30)}...)</li>`).join('') : '无'}
            </ul>
          </div>
        </div>
      `;

      document.getElementById('userPreviewContent').innerHTML = content;
      document.getElementById('userPreviewModal').classList.remove('hidden');
    }
  } catch (error) {
    console.error('Preview user error:', error);
  }
}

function closeUserPreviewModal() {
  document.getElementById('userPreviewModal').classList.add('hidden');
}

// Load wallpapers
async function loadWallpapers() {
  try {
    // Populate category filter
    const filter = document.getElementById('wallpaperCategory');
    if (filter && filter.options.length <= 1) {
      const { data: cats } = await supabase.from('wallpaper_categories').select('*');
      if (cats) {
        const currentVal = filter.value;
        filter.innerHTML = '<option value="">全部分类</option>' +
          cats.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
        filter.value = currentVal;
      }
    }

    const category = document.getElementById('wallpaperCategory')?.value || '';

    let query = supabase.from('wallpapers').select('*').order('created_at', { ascending: false });
    if (category) {
      query = query.eq('category', category);
    }

    const { data: wallpapers, error } = await query;

    if (wallpapers) {
      const container = document.getElementById('wallpapersContainer');
      container.innerHTML = wallpapers.map(w => `
        <div class="wallpaper-card-admin">
          <img src="${w.url}" alt="Wallpaper">
          <div class="wallpaper-info">
            <h4>${w.category || ''}</h4>
            <p>分类: ${w.category}</p>
            <p>来源: ${w.source === 'user' ? '<span class="tag-user">用户上传</span>' : '系统'}</p>
            <div class="wallpaper-actions">
              <button onclick="deleteWallpaper('${w.id}')" class="btn btn-small btn-danger">删除</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Load wallpapers error:', error);
  }
}

// Open / Close Upload Modal (Keep roughly same)
async function openUploadWallpaperModal() {
  // Load categories first
  try {
    const { data } = await supabase.from('wallpaper_categories').select('*');
    if (data) {
      const select = document.getElementById('wallpaperCategorySelect');
      select.innerHTML = data.map(c => `<option value="${c.name}">${c.name} (${c.name_en || ''})</option>`).join('');
    }
  } catch (err) {
    console.error(err);
  }

  document.getElementById('uploadWallpaperModal').classList.remove('hidden');

  // Show/hide color input (existing logic)
  const categorySelect = document.getElementById('wallpaperCategorySelect');
  const colorGroup = document.getElementById('colorGroup');
  if (categorySelect && colorGroup) {
    const updateColorVisibility = () => {
      if (categorySelect.value === '纯色' || categorySelect.value === 'solid') {
        colorGroup.style.display = 'block';
      } else {
        colorGroup.style.display = 'none';
      }
    };
    categorySelect.addEventListener('change', updateColorVisibility);
    updateColorVisibility();
  }
}

function closeUploadWallpaperModal() {
  document.getElementById('uploadWallpaperModal').classList.add('hidden');
}

// Upload wallpaper
async function uploadWallpaper() {
  const title = document.getElementById('wallpaperTitle').value;
  const description = document.getElementById('wallpaperDescription').value;
  const category = document.getElementById('wallpaperCategorySelect').value;
  const imageUrl = document.getElementById('wallpaperImageUrl').value; // Keep URL input support
  const color = document.getElementById('wallpaperColor').value;

  // Note: For file upload in admin, we really should add a file input, 
  // but for now let's support the existing URL input or logic.
  // If user enters a URL, we save that.

  if (!imageUrl) {
    alert('请填写图片URL');
    return;
  }

  try {
    const { error } = await supabase
      .from('wallpapers')
      .insert({
        url: imageUrl,
        category,
        source: 'system' // Admin uploads are system
      });

    if (!error) {
      alert('上传成功');
      closeUploadWallpaperModal();
      loadWallpapers();
    } else {
      alert('上传失败：' + error.message);
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('上传出错：' + error.message);
  }
}

// Delete wallpaper
async function deleteWallpaper(id) {
  if (!confirm('确定删除此壁纸？')) return;

  try {
    const { error } = await supabase.from('wallpapers').delete().eq('id', id);

    if (!error) {
      loadWallpapers();
    } else {
      alert('删除失败：' + error.message);
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
}

// Load logs (Placeholder)
async function loadLogs() {
  const tbody = document.getElementById('logsTableBody');
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center">日志功能暂不可用 (Supabase Migration)</td></tr>`;
}

// Toggle admin menu
function toggleAdminMenu() {
  const menu = document.getElementById('adminMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function switchLanguage() {
  adminState.currentLanguage = adminState.currentLanguage === 'zh' ? 'en' : 'zh';
  localStorage.setItem('adminLanguage', adminState.currentLanguage);
  location.reload();
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
  toggleAdminMenu();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeAdmin();
});

// Admin translations
adminTranslations = {
  zh: {
    dashboard: '仪表板',
    users: '用户管理',
    wallpapers: '壁纸管理',
    logs: '操作日志',
    logout: '退出登录',
    totalUsers: '总用户数',
    todayLogins: '今日登录',
    onlineUsers: '在线用户',
    totalWallpapers: '壁纸总数',
    email: '邮箱',
    name: '名称',
    registerTime: '注册时间',
    lastLogin: '最后登录',
    action: '操作',
    preview: '预览',
    delete: '删除',
    upload: '上传壁纸',
    title: '标题',
    description: '描述',
    category: '分类',
    imageUrl: '图片URL',
    color: '颜色',
    landscape: '风景',
    solid: '纯色',
    cancel: '取消',
    confirm: '确认',
    time: '时间',
    admin: '管理员',
    resource: '资源',
    status: '状态',
    search: '搜索用户邮箱...',
    refresh: '刷新',
    loading: '加载中...',
    success: '成功',
    error: '错误',
    loginTrend: '用户登录趋势（最近7天）',
    activeSessions: '活跃会话信息',
    sessionUser: '用户',
    sessionLoginTime: '登录时间',
    sessionIp: 'IP地址',
    sessionBrowser: '浏览器',
    noActiveSessions: '暂无活跃会话'
  },
  en: {
    dashboard: 'Dashboard',
    users: 'Users',
    wallpapers: 'Wallpapers',
    logs: 'Logs',
    logout: 'Logout',
    totalUsers: 'Total Users',
    todayLogins: 'Today Logins',
    onlineUsers: 'Online Users',
    totalWallpapers: 'Total Wallpapers',
    email: 'Email',
    name: 'Name',
    registerTime: 'Register Time',
    lastLogin: 'Last Login',
    action: 'Action',
    preview: 'Preview',
    delete: 'Delete',
    upload: 'Upload Wallpaper',
    title: 'Title',
    description: 'Description',
    category: 'Category',
    imageUrl: 'Image URL',
    color: 'Color',
    landscape: 'Landscape',
    solid: 'Solid Color',
    cancel: 'Cancel',
    confirm: 'Confirm',
    time: 'Time',
    admin: 'Admin',
    resource: 'Resource',
    status: 'Status',
    search: 'Search user email...',
    refresh: 'Refresh',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    loginTrend: 'User Login Trend (Last 7 Days)',
    activeSessions: 'Active Sessions',
    sessionUser: 'User',
    sessionLoginTime: 'Login Time',
    sessionIp: 'IP Address',
    sessionBrowser: 'Browser',
    noActiveSessions: 'No active sessions'
  }
};

// Get translation
function t(key) {
  return adminTranslations[adminState.currentLanguage][key] || key;
}

// Initialize admin dashboard
async function initializeAdmin() {
  const token = localStorage.getItem('adminToken');
  const admin = localStorage.getItem('adminUser');

  if (!token || !admin) {
    showAdminLoginPage();
    return;
  }

  adminState.adminToken = token;
  adminState.adminUser = JSON.parse(admin);
  adminState.isLoggedIn = true;

  showAdminDashboard();
  loadDashboardStats();
}

// Show admin login page
function showAdminLoginPage() {
  document.body.innerHTML = `
    <div class="admin-login-container">
      <div class="admin-login-box">
        <h1>Start Page 运营后台</h1>
        <form onsubmit="handleAdminLogin(event)">
          <div class="form-group">
            <label>邮箱</label>
            <input type="email" id="adminEmail" required class="form-input">
          </div>
          <div class="form-group">
            <label>密码</label>
            <input type="password" id="adminPassword" required class="form-input">
          </div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>
  `;
}

// Show admin dashboard
function showAdminDashboard() {
  document.body.style.display = 'block';
  document.querySelector('.admin-container').style.display = 'flex';
  updateAdminUI();
}

// Handle admin login
async function handleAdminLogin(event) {
  event.preventDefault();

  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      adminState.adminToken = data.token;
      adminState.adminUser = data.admin;
      adminState.isLoggedIn = true;

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));

      location.reload();
    } else {
      alert('登录失败：' + data.error);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('登录出错：' + error.message);
  }
}

// Admin logout
function adminLogout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  location.reload();
}

// Update admin UI
function updateAdminUI() {
  if (adminState.adminUser) {
    document.getElementById('adminName').textContent = adminState.adminUser.name || adminState.adminUser.email;
  }
}

// Switch tab
function switchTab(tab, event) {
  adminState.currentTab = tab;

  // Hide all tabs
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show selected tab
  const tabElement = document.getElementById(tab + 'Tab');
  if (tabElement) {
    tabElement.classList.remove('hidden');
  }

  // Mark nav item as active
  if (event && event.target) {
    event.target.closest('.nav-item').classList.add('active');
  } else {
    // Find item by text if no event (initial load)
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => {
      if (item.getAttribute('onclick')?.includes(`'${tab}'`)) {
        item.classList.add('active');
      }
    });
  }

  // Load data for tab
  if (tab === 'users') {
    loadUsers();
  } else if (tab === 'wallpapers') {
    loadWallpapers();
  } else if (tab === 'categories') {
    loadCategories();
  } else if (tab === 'logs') {
    loadLogs();
  }
}

// Category Management
async function loadCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      headers: { 'Authorization': `Bearer ${adminState.adminToken}` }
    });
    const data = await response.json();
    if (data.success) {
      const tbody = document.getElementById('categoriesTableBody');
      tbody.innerHTML = data.categories.map(cat => `
        <tr>
          <td>${cat.name}</td>
          <td>${cat.name_en}</td>
          <td>${new Date(cat.created_at).toLocaleDateString()}</td>
          <td>
            <button onclick="deleteCategory('${cat.id}')" class="btn btn-small btn-danger">删除</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Load categories error:', error);
  }
}

function openAddCategoryModal() {
  document.getElementById('categoryName').value = '';
  document.getElementById('categoryNameEn').value = '';
  document.getElementById('categoryModal').classList.remove('hidden');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.add('hidden');
}

async function saveCategory() {
  const name = document.getElementById('categoryName').value.trim();
  const name_en = document.getElementById('categoryNameEn').value.trim();
  if (!name || !name_en) return alert('请填写完整名称');

  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, name_en })
    });
    const data = await response.json();
    if (data.success) {
      closeCategoryModal();
      loadCategories();
    } else {
      alert('保存失败：' + data.error);
    }
  } catch (error) {
    console.error('Save category error:', error);
  }
}

async function deleteCategory(id) {
  if (!confirm('确定删除此分类？')) return;
  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminState.adminToken}` }
    });
    const data = await response.json();
    if (data.success) {
      loadCategories();
    } else {
      alert('无法删除：' + (data.error || '可能是该分类下已有壁纸'));
    }
  } catch (error) {
    console.error('Delete category error:', error);
  }
}

// Load dashboard statistics
async function loadDashboardStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.stats) {
      document.getElementById('totalUsers').textContent = data.stats.totalUsers || 0;
      document.getElementById('todayLogins').textContent = data.stats.todayLogins || 0;
      document.getElementById('onlineUsers').textContent = data.stats.onlineUsers || 0;

      // Load trending chart and session info
      loadTrendingChart();
      loadSessionInfo();
    }
  } catch (error) {
    console.error('Load stats error:', error);
  }
}

// Load trending chart
async function loadTrendingChart() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/trending`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.trending) {
      const ctx = document.getElementById('trendingChart');
      if (!ctx) return;

      // Destroy existing chart if any
      if (window.trendingChartInstance) {
        window.trendingChartInstance.destroy();
      }

      const labels = data.trending.map(item => item.date);
      const values = data.trending.map(item => item.count);

      window.trendingChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: adminState.currentLanguage === 'zh' ? '登录用户数' : 'Login Count',
            data: values,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#4CAF50',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Load trending chart error:', error);
  }
}

// Load session info
async function loadSessionInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/sessions`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.sessions) {
      const container = document.getElementById('sessionInfoContent');

      if (data.sessions.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #999;">${t('noActiveSessions')}</p>`;
        return;
      }

      container.innerHTML = data.sessions.map(session => `
        <div class="session-card">
          <div class="session-item">
            <span class="session-label">${t('sessionUser')}:</span>
            <span class="session-value">${session.userEmail}</span>
          </div>
          <div class="session-item">
            <span class="session-label">${t('sessionLoginTime')}:</span>
            <span class="session-value">${new Date(session.loginTime).toLocaleString()}</span>
          </div>
          <div class="session-item">
            <span class="session-label">${t('sessionIp')}:</span>
            <span class="session-value">${session.ipAddress || 'N/A'}</span>
          </div>
          <div class="session-item">
            <span class="session-label">${t('sessionBrowser')}:</span>
            <span class="session-value">${session.userAgent || 'N/A'}</span>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Load session info error:', error);
  }
}

// Load users
async function loadUsers() {
  try {
    const search = document.getElementById('userSearch')?.value || '';
    const response = await fetch(`${API_BASE_URL}/admin/users?search=${search}`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.users) {
      const tbody = document.getElementById('usersTableBody');
      tbody.innerHTML = data.users.map(user => `
        <tr>
          <td>${user.email}</td>
          <td>${user.name}</td>
          <td>${new Date(user.registeredAt).toLocaleDateString()}</td>
          <td>${user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : '-'}</td>
          <td>
            <button onclick="previewUser('${user._id}')" class="btn btn-small">预览</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Load users error:', error);
  }
}

// Preview user
async function previewUser(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/preview`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success) {
      const user = data.user;
      const userData = data.data;

      const content = `
        <div class="user-preview">
          <h4>${user.name} (${user.email})</h4>
          <p>注册时间：${new Date(user.registeredAt).toLocaleString()}</p>
          <p>最后登录：${user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : '-'}</p>
          <hr>
          <h5>首页设置</h5>
          <p>壁纸：${userData.wallpaper || '默认'}</p>
          <div class="preview-section">
            <h6>标签 (${userData.tags ? userData.tags.length : 0})</h6>
            <div class="preview-list">
              ${userData.tags && userData.tags.length > 0 ? userData.tags.map(t => `<span class="preview-chip">${t}</span>`).join('') : '无'}
            </div>
          </div>
          <div class="preview-section" style="margin-top: 15px;">
            <h6>网站 (${userData.sites ? userData.sites.length : 0})</h6>
            <ul class="preview-sites">
              ${userData.sites && userData.sites.length > 0 ? userData.sites.map(s => `<li>${s.name} (${s.url.substring(0, 30)}...)</li>`).join('') : '无'}
            </ul>
          </div>
        </div>
      `;

      document.getElementById('userPreviewContent').innerHTML = content;
      document.getElementById('userPreviewModal').classList.remove('hidden');
    }
  } catch (error) {
    console.error('Preview user error:', error);
  }
}

// Close user preview modal
function closeUserPreviewModal() {
  document.getElementById('userPreviewModal').classList.add('hidden');
}

// Load wallpapers
async function loadWallpapers() {
  try {
    // Populate category filter if not already populated or on refresh
    const filter = document.getElementById('wallpaperCategory');
    if (filter && filter.options.length <= 1) { // Only has "All" or similar
      const catsRes = await fetch(`${API_BASE_URL}/admin/categories`, {
        headers: { 'Authorization': `Bearer ${adminState.adminToken}` }
      });
      const catsData = await catsRes.json();
      if (catsData.success) {
        const currentVal = filter.value;
        filter.innerHTML = '<option value="">全部分类</option>' +
          catsData.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
        filter.value = currentVal;
      }
    }

    const category = document.getElementById('wallpaperCategory')?.value || '';
    const response = await fetch(`${API_BASE_URL}/admin/wallpapers${category ? '?category=' + category : ''}`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.wallpapers) {
      const container = document.getElementById('wallpapersContainer');
      container.innerHTML = data.wallpapers.map(w => `
        <div class="wallpaper-card-admin">
          <img src="${w.imageUrl}" alt="Wallpaper">
          <div class="wallpaper-info">
            <h4>${w.title || w.category || ''}</h4>
            <p>分类: ${w.category}</p>
            <p>来源: ${w.source === 'user' ? '<span class="tag-user">用户上传</span>' : '系统'}</p>
            <div class="wallpaper-actions">
              <button onclick="deleteWallpaper('${w._id}', '${w.source}')" class="btn btn-small btn-danger">删除</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Load wallpapers error:', error);
  }
}

// Open upload wallpaper modal
async function openUploadWallpaperModal() {
  // Load categories first
  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      headers: { 'Authorization': `Bearer ${adminState.adminToken}` }
    });
    const data = await response.json();
    if (data.success) {
      const select = document.getElementById('wallpaperCategorySelect');
      select.innerHTML = data.categories.map(c => `<option value="${c.name}">${c.name} (${c.name_en})</option>`).join('');
    }
  } catch (err) {
    console.error(err);
  }

  document.getElementById('uploadWallpaperModal').classList.remove('hidden');

  // Show/hide color input based on category...
}

// Close upload wallpaper modal
function closeUploadWallpaperModal() {
  document.getElementById('uploadWallpaperModal').classList.add('hidden');
}

// Upload wallpaper
async function uploadWallpaper() {
  const title = document.getElementById('wallpaperTitle').value;
  const description = document.getElementById('wallpaperDescription').value;
  const category = document.getElementById('wallpaperCategorySelect').value;
  const imageUrl = document.getElementById('wallpaperImageUrl').value;
  const color = document.getElementById('wallpaperColor').value;

  if (!title || !imageUrl) {
    alert('请填写标题和图片URL');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/wallpapers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        category: category, // Ensure this matches 'landscape', 'solid', or 'daily'
        imageUrl,
        color: category === 'solid' ? color : undefined
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('上传成功');
      closeUploadWallpaperModal();
      loadWallpapers();
    } else {
      alert('上传失败：' + data.error);
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('上传出错：' + error.message);
  }
}

// Delete wallpaper
async function deleteWallpaper(id, source = 'system') {
  if (!confirm('确定删除此壁纸？')) return;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/wallpapers/${id}?source=${source}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success) {
      loadWallpapers();
    } else {
      alert('删除失败：' + data.error);
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
}

// Load logs
async function loadLogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/logs`, {
      headers: {
        'Authorization': `Bearer ${adminState.adminToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.logs) {
      const tbody = document.getElementById('logsTableBody');
      tbody.innerHTML = data.logs.map(log => `
        <tr>
          <td>${new Date(log.createdAt).toLocaleString()}</td>
          <td>${log.adminId?.name || '-'}</td>
          <td>${log.action}</td>
          <td>${log.resourceType}</td>
          <td>${log.status}</td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Load logs error:', error);
  }
}

// Toggle admin menu
function toggleAdminMenu() {
  const menu = document.getElementById('adminMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Switch language
function switchLanguage() {
  adminState.currentLanguage = adminState.currentLanguage === 'zh' ? 'en' : 'zh';
  localStorage.setItem('adminLanguage', adminState.currentLanguage);
  location.reload();
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');

  // Close menu
  toggleAdminMenu();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeAdmin();
});
