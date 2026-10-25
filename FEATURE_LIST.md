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

## Chrome 插件模块

### 双端架构（Web 版 + Chrome 插件）

- `public/` 为唯一源码；`extension/` 共享文件由 `scripts/sync-extension.mjs` 生成（`npm run build:extension`）
- 插件差异通过 `IS_EXTENSION` 运行时分支实现（`config.js` 定义），不复制代码
- `tests/sync-extension.test.js` 校验两端文件一致，`npm test` / `npm run check:extension` 会拦截漏同步

### 插件专属文件

- `manifest.json`：MV3、新标签页覆盖、稳定 `key`、storage/identity 权限、CSP
- `background.js`：工具栏图标点击打开新标签页
- `adapter/click-handler.js`：MV3 CSP 下恢复内联事件（`data-onclick` + MutationObserver）
- `adapter/fetch-polyfill.js`：XHR 版 fetch（扩展页兼容）
- `adapter/storage-bridge.js`：localStorage ↔ chrome.storage 镜像
- `adapter/supabase-storage.js`：Supabase 会话持久化到 chrome.storage.local
- `vendor/`：本地化 supabase.js / paddle.js（离线可用、不违反 CSP）
- `icons/`：16/48/128 图标

### 插件登录流程

`auth.js` → `handleLoginClick()` → `IS_EXTENSION` 时走 `handleExtensionLogin()`：
Supabase OAuth 授权页 → `chrome.identity.launchWebAuthFlow` → 解析 token → `supabase.auth.setSession`。

### 跨标签页同步

`script.js` 内置 `storage` 事件监听：同一来源（网站或扩展）下任一标签页修改共享 localStorage 后，其他标签页自动刷新站点/主题/壁纸/搜索设置。

### 开发规范

修改功能时按 `AGENTS.md` 流程：改 `public/` → `npm run build:extension` → `npm test` → `npm run pack:extension`。
## 2026-08 功能更新

### 1. 收藏夹 Favicon 磁贴
- 首页收藏从"文字 chip"改为 favicon 磁贴:圆角矩形图标 + 图标下方网址名称
- favicon 来自 Google s2 服务,加载失败自动回退为首字母彩色头像
- 数据模型不变(`state.sites`),仅渲染层改动

### 2. 文件夹
- 拖动网站图标到另一个网站图标 → 自动合并为文件夹(名称"新建文件夹",可右键重命名)
- 拖动图标到文件夹图标 → 加入该文件夹;文件夹图标显示子项数量角标
- 点击文件夹进入文件夹视图(带返回按钮),文件夹内可拖动排序
- 右键菜单:文件夹支持重命名/删除(删除时子项移回首页);文件夹内网站支持"移出文件夹"
- 持久化:新增 `user_sites.type` / `user_sites.children` 列,需执行 `supabase_folders_migration.sql`

### 3. 主题重绘
- 手绘(默认):暖纸色 + 琥珀强调,精致化搜索框/磁贴/弹窗阴影
- 漫画:奶油底 + 三色点缀,粗描边 + 硬阴影,气泡按钮
- 赛博(黑白):终端风格,等宽字体 + 青色辉光 + 网格背景
- 三套主题均包含 favicon 磁贴与文件夹的专属样式

### 4. 缩放比例
- 设置菜单新增"缩放"子菜单:100% / 125% / 150%
- 通过 CSS `zoom` 生效并持久化(`localStorage.zoomLevel` + 云端 `user_home_settings.zoom_level`)
- 需执行 `supabase_folders_migration.sql` 后云端同步才生效
## 2026-08 工作台与菜单重构

### 5. 双屏横向布局 + 个人工作台
- 首页鼠标滚轮 → 页面横向滚动进入第二屏(个人工作台)
- 工作台上方大卡片区域:可自定义插件卡片(便签 / Todo List / 日历),点击打开对应编辑弹窗;卡片可增删
- 工作台下方更大卡片:个人 Agent 聊天窗口
- 便签/Todo/日历/Agent 数据保存在 `localStorage.workbench`,并随账号云端同步(`user_home_settings.workbench`)

### 6. 右上角菜单重构
- 菜单按钮改为三条横线(汉堡),下拉菜单:外观 / 设置 / 账户
- 账户:未登录显示登录入口,已登录显示个人资料/退出

### 7. 设置弹窗
- 点击「设置」弹出居中设置菜单:时间格式(24/12 小时)、语言(中/英)、页面打开方式(新标签页/当前页)、关于

### 8. 外观面板重构
- 点击「外观」进入外观面板:风格(手绘/漫画/赛博)、Font、缩放比例(100/125/150)、模式(一般/极简)、颜色模式(浅色/深色/跟随系统)、壁纸
- 删除原右侧预览窗口、删除深浅色下的文字/按钮颜色定制、删除中文字体选择(默认固定优设好身体)
- 页面打开方式新增 `open_behavior` 字段(新标签页/当前页),同步到云端

### 9. 个人 Agent
- 支持模型提供商:DeepSeek / 豆包 / 通义千问 / MiniMax,选择模型后需登录才能对话
- 对话按「项目 → 对话」归档,支持新建项目/新建对话
- 后端走 Vercel Serverless `api/agent-chat.js`,需在 Vercel 配置对应 API Key 环境变量:
  `DEEPSEEK_API_KEY`、`ARK_API_KEY`(豆包)、`DASHSCOPE_API_KEY`(通义)、`MINIMAX_API_KEY`
- 插件版请求 `https://newtab.online/api/agent-chat`(manifest 已加入 host 权限)
## 2026-08 工作台与 Agent 增强（第二轮）

### 10. 插件逻辑完善
- 便签:彩色便签(6 色)、置顶 📌、内容实时保存
- Todo List:优先级(高/中/低)、截止日期、全部/进行中/已完成筛选、完成进度条
- 日历:月视图带事件圆点标记、事件时间、事件编辑/删除
- 插件卡片显示迷你预览(便签首条内容 / Todo 完成进度 / 今日日程数)

### 11. 工作台布局
- 工作台头部:返回首页按钮 + 标题 + 提示
- Agent 卡片:左侧项目/对话树(项目可展开收起),右侧聊天区
- 底部输入区支持附加图片(文件选择 + 剪贴板粘贴),预览缩略图可移除

### 12. Agent 真实对话
- 采用 OpenAI 兼容协议(与 LobeChat / NextChat / Open WebUI 相同标准),SSE 流式输出(打字机效果)
- 提供商:DeepSeek / 豆包 / 通义千问 / MiniMax / OpenAI(新增,兼容任何 OpenAI 兼容端点)
- 多模态:视觉模型(豆包 Vision、Qwen VL、GPT-4o mini)支持图片消息,非视觉模型提示不支持
- 项目/对话:重命名、删除(带确认)、新建;消息复制、重新生成
- 登录门槛:选择模型或发送消息时未登录 → 引导登录
- 消息历史本地保留最近 100 条,每次请求发送最近 40 条
- 后端 `api/agent-chat.js`:SSE 流式转发 + 错误友好提示;环境变量新增 `OPENAI_API_KEY`
## 2026-08 菜单与交互优化（第三轮）

### 13. 右上角菜单重构
- 菜单顺序:模式(一般/极简子菜单)→ 外观 → 壁纸 → 设置 → 登录状态区
- 未登录显示「登录」按钮,已登录直接显示用户名 + 头像(点击进个人资料),移除了原「账户」子菜单
- 所有下拉菜单 hover 显示当前主题强调色(手绘=琥珀 / 漫画=玫红 / 赛博=青色)

### 14. 交互细节
- 首页右键菜单「添加标签」改为「添加文件夹」:直接创建空文件夹并弹出重命名
- 缩放比例重映射:100%→0.9、125%→1.125、150%→1.35(默认整体更小,保持页面与右键菜单居中不偏移)
- 首页鼠标滚动支持横/纵向滚轮与触控板横滑进入工作台
- 设置弹窗改为外观式排版(label 在上、控件在下、行距加大)
- 尝试移除 Chrome 新标签页自带的「自定义」按钮(页面 CSS + JS 双重兜底;若为浏览器 Shadow DOM 注入则无法从页面侧移除)
## 2026-08 同步/多语言/工作台优化（第四轮）

### 15. 同步可靠性
- 定位“保存同步总报失败”：多为数据库未执行迁移导致 `user_home_settings` 新列缺失，回退写入抛错
- 修复：`saveLegacyHomeConfigFallback` 改为列级容错（新列写入失败自动降级为旧列集，不再整单失败）；站点表同样容错
- 错误提示附带真实错误信息，便于排查
- 修复 `window.workbench` 引用陈旧问题（远程工作台覆盖后同步旧数据）

### 16. 多语言（新增法语/西班牙语/日语/韩语）
- 6 语言完整支持：中文 / English / Français / Español / 日本語 / 한국어（含全部 UI 文案、星期/月份）
- 浏览器语言自动识别（含 fr-FR / es-ES / ja-JP / ko-KR 等区域变体）
- 日期格式：中/日/韩固定本地化格式，英/法/西支持格式切换
- 设置弹窗语言改为下拉选择框

### 17. 本地缓存加速
- 登录时记录 `lastAuthUid`，再次打开页面时先同步应用上次用户的本地缓存配置（主题/缩放/站点/工作台），无需等待网络请求，随后后台刷新

### 18. 细节修复
- 深色模式下（手绘主题）搜索框文字与右上角菜单图标改为深色，保证可读
- 右键菜单（添加网站/添加文件夹/更换壁纸）补齐英文等多语言文案
- 工作台返回按钮改为纯箭头圆圈
- 工作台排版重做为 Notion 风格：左对齐页面、分区标题带分隔线、插件卡片网格画廊式、卡片 hover 浮起、Agent 卡片化