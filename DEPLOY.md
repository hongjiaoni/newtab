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
