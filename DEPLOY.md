# 部署和运行指南 (Deployment Guide)

本项目按 **Vercel 静态站点 + Supabase(认证/数据库/存储)** 的形态部署，不需要部署 Node 后端。

## 1. 准备 Supabase

### 1.1 创建项目与表结构

1. 在 Supabase 创建一个新项目
2. 在 SQL Editor 依次执行：

- `supabase_migration.sql`
- `supabase_premium_migration.sql`

### 1.2 创建 Storage Bucket

在 Supabase Storage 创建 bucket：

- 名称：`wallpapers`
- 访问：Public（因为前端使用 `getPublicUrl`）

## 2. 配置 Google 登录 (Supabase Auth)

在 Supabase 控制台：

- Authentication -> Providers -> Google -> 启用
- 配置 OAuth Client ID/Secret
- 配置 Redirect URL：包含
  - `http://localhost:3000`
  - `https://<your-vercel-domain>`

## 3. 配置前端 Supabase Key

修改 `public/config.js`：

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

> 这是前端公开的 anon key，符合 Supabase 使用方式；敏感权限通过 RLS 控制。

## 4. 本地开发

本地可直接用任意静态服务器运行 `public` 目录（示例用 `npx serve`）：

```bash
npx serve public -l 3000
```

如果你在 Windows PowerShell 中遇到执行策略限制导致 `npx.ps1` 无法运行，可以在**当前 PowerShell 会话**临时放开限制（关闭窗口后自动恢复）：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npx serve public -l 3000
```

访问：

- `http://localhost:3000`

## 5. Vercel 部署

1. 把仓库导入 Vercel
2. Framework 选择：Other
3. Build Command：留空
4. Output Directory：`public`
5. 部署完成后，回到 Supabase Auth 的 Redirect URL 中添加你的 Vercel 域名

## 6. 数据备份

数据都在 Supabase（Postgres + Storage）。建议定期：

- 导出 `profiles` 表
- 对 Storage 做周期性备份（按 bucket 维度）

## 7. Chrome 插件（开发与上架）

### 7.1 本地开发

1. 代码统一在 `public/` 修改，运行 `npm run build:extension` 重新生成 `extension/`
2. 打开 `chrome://extensions` → 开启「开发者模式」→「加载已解压的扩展程序」→ 选择 `extension/` 目录
3. 扩展 ID 由 `manifest.json` 的 `key` 字段固定，重装/换机器不变

### 7.2 必需的外部配置

- **Supabase Auth Redirect URL**：登录用 `chrome.identity.launchWebAuthFlow`，redirect 地址为 `https://<extension-id>.chromiumapp.org/`，必须加入 Supabase → Authentication → URL Configuration → Redirect URLs
- 扩展固定使用生产环境 Supabase 项目（`config.js` 中 `IS_EXTENSION` 分支），与 Web 版共享同一份数据
- 扩展内 Paddle 支付保持 sandbox 模式（`config.js`），上架前如需收款请切换为 production 并配置对应价格 ID

### 7.3 打包与上架 Chrome Web Store

1. `npm run pack:extension` → 生成 `dist/newtab-extension-<version>.zip`
2. 上传到 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. 填写商店素材：图标（128x128）、截图（1280x800 或 640x400）、简介、隐私政策（指向 `landing/privacy/`）
4. 权限说明：`storage`（本地设置缓存）、`identity`（Google 登录）；`host_permissions` 用于访问 Supabase API 与字体 CDN
5. 上架后 Chrome 商店会分配正式扩展 ID；若与本地 `key` 派生的 ID 不同，需把正式 ID 追加到 Supabase Redirect URLs
6. 之后每次更新：改 `public/` → `npm run build:extension` → 重新打包上传，版本号统一以 `package.json` 为准
### 1.3 文件夹 / 缩放字段迁移（2026-08）

新功能（文件夹、缩放比例）需要额外的数据库字段,在 SQL Editor 执行:

- `supabase_folders_migration.sql`

包含:

- `user_sites.type`(link/folder)、`user_sites.children`(子项 id 数组)
- `user_home_settings.zoom_level`(100/125/150)
- 更新后的 `sync_home_config` RPC(持久化以上字段)

> 未执行该迁移时,文件夹与缩放仍可本地使用;云端同步会退化为旧 schema(文件夹降级为普通条目),建议部署前先执行。
### 1.4 工作台 / 打开方式字段迁移（2026-08）

- 同上执行 `supabase_folders_migration.sql`(已包含 `user_home_settings.open_behavior`、`workbench` 字段与更新后的 RPC)

### 1.5 Liquid Glass 改版迁移（2026-10）

在 `supabase_folders_migration.sql` 之后,于 SQL Editor 执行:

- `supabase_glass_migration.sql`

包含:

- `user_sites.icon`(自定义网站图标:https 地址或 ≤60KB 的 `data:image`,带长度约束)
- 更新后的 `sync_home_config` RPC:写入 `icon`;`color_mode` 存外观 `light` / `dark` / `auto`;`theme` 固定为 `glass`;不再写字体字段

> 未执行时:自定义图标只保存在本机(刷新同步不会把它冲掉),外观仍可同步(客户端同时发送旧字段 `colorMode`)。
> 工作站同步内容为组件布局、便签、待办、日程、订阅源和 Agent 配置;**聊天记录只保存在本机**,不上传。
> 旧的 `user_theme_settings` / `user_font_settings` 表不再读写,确认没有旧版客户端后可自行清理。

### 1.6 主题色迁移（2026-10）

在 `supabase_glass_migration.sql` 之后执行 `supabase_accent_migration.sql`:

- `user_home_settings.accent_color`(系统色名或 `#rrggbb`)
- 更新后的 `sync_home_config` RPC 写入主题色

> 未执行时主题色只保存在本机,刷新同步不会覆盖它。

### 1.7 RSS 代理

- `api/rss-proxy.js` 随 Vercel 自动部署,无需环境变量;插件端请求 `https://newtab.online/api/rss-proxy`(已在 `host_permissions` 内)

### 8. 个人 Agent 配置

- 聊天请求通过 Vercel Serverless 函数 `api/agent-chat.js` 转发到模型提供商
- 在 Vercel 项目 Settings → Environment Variables 配置对应 API Key:
  - `DEEPSEEK_API_KEY`(DeepSeek)
  - `ARK_API_KEY`(豆包 / 火山方舟)
  - `DASHSCOPE_API_KEY`(通义千问 / DashScope)
  - `MINIMAX_API_KEY`(MiniMax)
- 未配置对应 Key 时,聊天窗口会返回友好提示,不影响其他功能
- Chrome 插件版请求 `https://newtab.online/api/agent-chat`,需部署后才可用