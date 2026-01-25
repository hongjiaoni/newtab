# 部署和运行指南 (Deployment Guide)

这个项目已经被优化为简单的 Node.js 应用，不再需要复杂的配置。

## 1. 准备工作

确保你的电脑上安装了 [Node.js](https://nodejs.org/) (建议版本 18 或以上)。

## 2. 安装依赖

打开终端（Terminal 或 PowerShell），进入项目文件夹，运行以下命令：

```bash
npm install
```

这会自动安装所有必要的运行库。

## 3. 启动服务器

运行以下命令启动网站：

```bash
npm start
```

> [!NOTE]
> **Windows 用户提示**：如果遇到 "running scripts is disabled" 红色错误，请改用以下命令：
> ```bash
> npm.cmd start
> ```
> 或者直接运行：
> ```bash



>cd "e:\Docs\Cursor\git\newtab"
>node server.js



如果看到 "Server running at http://localhost:3000" 和 "Connected to SQLite database"，说明启动成功。

## 4. 访问网站

- **用户首页**: 打开浏览器访问 [http://localhost:3000](http://localhost:3000)
- **运营后台**: 打开浏览器访问 [http://localhost:3000/admin/admin.html](http://localhost:3000/admin/admin.html)

## 运营后台登录信息
- **网址**: [http://localhost:3000/admin/admin.html](http://localhost:3000/admin/admin.html)
- **账号**: `admin@example.com`
- **密码**: `admin`

## Google 登录配置

为了让 Google 登录生效，你需要修改 `server.js` 和 `public/index.html` 中的 Client ID：
1. 去 [Google Cloud Console](https://console.cloud.google.com/) 创建一个 OAuth Client ID。
2. 将 ID 填入 `server.js` 的 `CLIENT_ID` 变量。
3. 将 ID 填入 `public/index.html` 的 `data-client_id` 属性。

## 数据备份

所有用户数据都存储在 `database.sqlite` 文件中。要备份数据，只需复制这个文件即可。
