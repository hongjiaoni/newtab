# NewTab 功能清单文档

## 项目概述
NewTab 是一个手绘风格的新标签页应用，提供网站收藏、壁纸定制、主题设置等功能，支持数据同步和会员订阅。

## 核心功能模块

### 1. 用户认证系统
**文件位置**: `public/auth.js`, `public/supabase-client.js`
**功能说明**:
- Google OAuth 登录/登出
- Supabase 用户会话管理
- 用户状态持久化
- 登录状态UI更新

**主要API**:
- `handleLoginClick()` - 处理登录
- `handleLogout()` - 处理登出
- `updateAuthUI()` - 更新认证相关UI

### 2. 网站收藏管理
**文件位置**: `public/script.js` (主要逻辑)
**功能说明**:
- 添加/编辑/删除网站
- 网站标签分类管理
- 拖拽排序功能
- 右键上下文菜单
- 显示/隐藏网站控制

**主要功能**:
- `addSite()` - 添加网站
- `editSite()` - 编辑网站
- `deleteSite()` - 删除网站
- `addTag()` - 添加标签
- `deleteTag()` - 删除标签
- 拖拽排序系统

### 3. 搜索引擎管理
**文件位置**: `public/script.js`
**功能说明**:
- 10个预设搜索引擎（Google、Bing、百度等）
- 动态添加/删除搜索引擎
- 搜索引擎图标和本地化名称
- 搜索引擎设置同步

**预设引擎**:
- Google, Bing, 百度, 小红书, DuckDuckGo, Yahoo, Yandex, 搜狗, 360搜索, 神马搜索

### 4. 壁纸系统
**文件位置**: `public/wallpaper.js`, `public/wallpaper-modal.css`
**功能说明**:
- 内置壁纸库（风景、抽象、纯色等分类）
- 自定义壁纸上传（会员功能）
- 壁纸预览和应用
- 壁纸管理界面

**壁纸分类**:
- 风景 (landscape)
- 抽象 (abstract) 
- 纯色 (solid)
- 自定义 (custom) - 会员专享

### 5. 主题定制系统
**文件位置**: `public/themes.js`
**功能说明**:
- 浅色/深色模式切换
- 自定义颜色配置（会员功能）
- 字体选择和定制
- 主题预览功能
- 主题设置持久化

**可定制元素**:
- 背景色、文字色、边框色
- 悬停效果色、阴影色
- 中英文字体选择

### 6. 数据同步系统
**文件位置**: `public/data-sync.js`
**功能说明**:
- 用户数据云端同步
- 本地缓存机制
- 离线数据队列
- 数据版本控制
- 增量同步优化

**同步数据**:
- 网站收藏和标签
- 搜索引擎设置
- 主题和壁纸配置
- 用户偏好设置

### 7. 会员订阅系统
**文件位置**: `public/membership.js`, `public/paddle.js`
**功能说明**:
- Paddle 支付集成
- 会员等级管理
- 订阅状态检查
- 会员功能权限控制

**会员等级**:
- 免费版: 基础功能
- 高级版 ($4.99/月): 主题定制、壁纸上传
- 超级版 ($9.99/月): 所有功能

### 8. 国际化支持
**文件位置**: `public/script.js` (i18n对象)
**功能说明**:
- 中英文双语支持
- 动态语言切换
- 本地化文本管理
- 日期时间格式化

### 9. 管理后台
**文件位置**: `public/admin/`
**功能说明**:
- 用户数据管理
- 系统统计信息
- 管理员权限控制

## 官网功能模块

### 1. Landing Page
**文件位置**: `landing/index.html`
**功能说明**:
- 4屏滑动展示
- 产品介绍和功能展示
- 定价信息展示
- Newsletter订阅
- 深浅主题切换
- 中英文语言切换

**页面结构**:
- 第1屏: 产品介绍 + 预览图
- 第2屏: 核心功能展示
- 第3屏: Newsletter订阅
- 第4屏: 定价信息

### 2. Newsletter订阅
**文件位置**: `api/newsletter-subscribe.js`
**功能说明**:
- 邮箱订阅收集
- 数据验证和存储
- CORS支持
- 错误处理

### 3. 法律页面
**文件位置**: `landing/terms/`, `landing/privacy/`
**功能说明**:
- 服务条款页面
- 隐私政策页面
- 响应式设计

## API接口

### 1. Newsletter订阅
- **路径**: `/api/newsletter-subscribe`
- **方法**: POST
- **参数**: `{ email: string }`
- **功能**: 处理邮箱订阅请求

### 2. Paddle支付
- **路径**: `/api/create-checkout-session`
- **方法**: POST
- **功能**: 创建支付会话

### 3. Paddle Webhook
- **路径**: `/api/paddle-webhook`
- **方法**: POST
- **功能**: 处理支付状态回调

## 数据库结构 (Supabase)

### 核心表结构:
- `user_home_settings` - 用户主页设置
- `user_sites` - 用户网站收藏
- `user_tags` - 用户标签
- `user_site_tags` - 网站标签关联
- `user_site_order` - 网站排序
- `user_tag_order` - 标签排序

### 关键字段:
- 搜索引擎设置: `engine_id`, `enabled_engine_ids`
- 主题设置: `theme`, `color_mode`
- 壁纸设置: `wallpaper`
- 本地化: `locale`, `date_format_index`, `time_format`

## 部署配置

### Vercel配置
**文件位置**: `vercel.json`
**功能**:
- 静态资源路由
- API函数部署
- 域名路由配置
- 资源映射 (favicon, badge, screenshot等)

### 环境变量需求:
- `SUPABASE_URL` - Supabase项目URL
- `SUPABASE_ANON_KEY` - Supabase匿名密钥
- `PADDLE_VENDOR_ID` - Paddle商户ID
- `PADDLE_CLIENT_TOKEN` - Paddle客户端令牌

## 文件结构说明

```
newtab/
├── api/                          # Vercel API函数
│   ├── newsletter-subscribe.js   # Newsletter订阅API
│   ├── create-checkout-session.js # 支付会话创建
│   └── paddle-webhook.js         # 支付回调处理
├── landing/                      # 官网静态文件
│   ├── index.html               # 主Landing页面
│   ├── terms/index.html         # 服务条款
│   ├── privacy/index.html       # 隐私政策
│   ├── favicon.svg/png          # 网站图标
│   ├── badge.svg                # 品牌徽标
│   └── screenshot-*.png         # 产品截图
├── public/                       # 应用主体文件
│   ├── index.html               # 应用主页面
│   ├── script.js                # 主要业务逻辑
│   ├── style.css                # 主样式文件
│   ├── auth.js                  # 认证逻辑
│   ├── data-sync.js             # 数据同步
│   ├── themes.js                # 主题系统
│   ├── wallpaper.js             # 壁纸系统
│   ├── membership.js            # 会员系统
│   ├── paddle.js                # 支付集成
│   └── admin/                   # 管理后台
├── supabase_migration.sql       # 数据库迁移脚本
├── supabase_refactor_one_time.sql # 一次性重构脚本
└── vercel.json                  # 部署配置
```

## 开发和维护指南

### 本地开发:
1. 克隆项目到本地
2. 配置环境变量
3. 启动本地服务器
4. 访问 `http://localhost:3000`

### 数据库更新:
1. 修改 `supabase_migration.sql`
2. 在Supabase控制台执行SQL
3. 更新 `data-sync.js` 中的schema版本

### 新功能开发:
1. 在对应模块文件中添加功能
2. 更新数据同步逻辑（如需要）
3. 添加国际化文本
4. 测试功能完整性

### 部署流程:
1. 推送代码到Git仓库
2. Vercel自动部署
3. 验证功能正常
4. 更新数据库（如需要）

## 技术栈

**前端**:
- 原生 HTML/CSS/JavaScript
- 手绘风格UI设计
- 响应式布局

**后端**:
- Vercel Serverless Functions
- Supabase (数据库 + 认证)
- Paddle (支付处理)

**部署**:
- Vercel (静态托管 + API)
- 自定义域名支持

## 版本信息
- 当前版本: v1.0.0
- 最后更新: 2026年1月31日
- 维护状态: 活跃开发中

---

此文档涵盖了NewTab项目的完整功能架构，便于后续开发和维护使用。如需更新功能或修复问题，请参考对应的文件位置和功能说明。
