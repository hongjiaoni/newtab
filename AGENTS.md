# AGENTS.md — 双端同步开发规范 (NewTab)

NewTab 同时维护 **Web 版 (`public/`)** 与 **Chrome 插件 (`extension/`)**。两端必须同步修改,禁止只改一端。

## 单源码策略

- `public/` 是 JS/CSS/HTML 的唯一源码。所有插件差异通过 `IS_EXTENSION` 运行时分支实现(见 `config.js`)。
- `extension/` 中以下文件由构建脚本从 `public/` 生成,**不要手工编辑**:
  `script.js`、`style.css`、`wallpaper-modal.css`、`auth.js`、`config.js`、`data-sync.js`、`membership.js`、`paddle.js`、`supabase-client.js`、`themes.js`、`time-display.js`、`wallpaper.js`、`badge.svg`、`favicon.png`、`favicon.svg`、`index.html`。
- `extension/` 中以下文件是插件专属,手工维护:`manifest.json`、`background.js`、`adapter/`、`vendor/`、`icons/`。

## 修改功能时的标准流程

1. 只改 `public/` 下的源码。
2. 需要区分插件/网页行为时,用 `IS_EXTENSION`(在 `config.js` 中定义)做运行时分支,不要复制文件。
3. 动态生成的 HTML 内联事件(模板字符串里的 `onclick="..."`)必须写成**单函数调用**(如 `onclick="foo()"`),不要写多语句内联代码——插件 CSP 下 `adapter/click-handler.js` 只支持简单调用形式。
4. 运行 `npm run build:extension` 重新生成插件文件。
5. 运行 `npm test`(含 `tests/sync-extension.test.js`,会校验两端一致,不一致即失败)。
6. Web 端部署走 Vercel,插件端用 `npm run pack:extension` 打包发布。

## 新增本地资源

- 新 JS/CSS/图片文件:加入 `public/`,并在 `scripts/sync-extension.mjs` 的 `COPY_FILES` 中登记。
- 新 CDN 依赖:Web 端可继续用 CDN;插件端必须提供本地副本(vendor 下)并由构建脚本替换,否则违反 MV3 CSP。

## 常用命令

- `npm run build:extension` — 从 `public/` 重新生成 `extension/`
- `npm run check:extension` — 校验两端一致(CI 用)
- `npm run pack:extension` — 构建并打包 `dist/newtab-extension-<version>.zip`
- `npm test` — 全部测试(含双端一致性)

## 版本号

- `package.json` 的 `version` 是唯一版本来源;构建脚本会自动写入 `extension/manifest.json`。