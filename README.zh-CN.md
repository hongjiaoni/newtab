# NewTab

[中文](README.zh-CN.md) | [English](README.md)

NewTab 是一个“可定制 + 可同步”的新标签页：搜索、壁纸、主题、字体、网站快捷入口与标签管理，以及跨设备一致的云端配置体验。

## 功能亮点

- 网站 + 标签：增删改、拖拽排序、标签视图、右键快捷操作
- 搜索引擎：快速切换、启用列表管理、偏好云同步
- 壁纸：内置分类、每日推荐、纯色背景、自定义上传（会员）
- 主题 + 字体：深浅色、风格预设、全量配色、中文/英文字体组合、实时预览
- 云同步：Supabase Auth + Postgres + Storage，本地缓存 + 远端刷新
- 会员：分层权限 + Paddle 支付流程
- 反馈与支持：内置反馈 + Gumroad 支持链接

## 快速开始

推荐静态方式启动（做 UI/前端调试最方便）：

```bash
npx serve public -l 3000
```

或启动本地 Node 服务：

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 云端配置

- 配置 Supabase + Google OAuth + Storage bucket：`wallpapers`
- 填写 `public/config.js`

部署细节请看：`DEPLOY.md`

## 参与贡献

欢迎 PR。建议尽量小步提交、聚焦单一主题，避免一次性大重构。

特别需要帮助的方向：

- 同步一致性与同步状态提示 UX
- 主题/预览与实际渲染一致性打磨
- 弹窗/菜单交互与可访问性（键盘、读屏）
- i18n 与文案统一

更多功能清单：`FEATURE_LIST.md`

## License

目前仓库还没有 License。公开前建议补充 MIT 或 Apache-2.0。


## Chrome 插件

项目同时维护 Web 版与 Chrome 插件，`public/` 是唯一源码，`extension/` 由构建脚本生成（见 `AGENTS.md`）。

- 加载未打包插件：打开 `chrome://extensions` → 开启“开发者模式” → “加载已解压的扩展程序” → 选择 `extension/` 目录
- 重新生成插件：`npm run build:extension`
- 校验两端一致：`npm run check:extension`
- 打包发布：`npm run pack:extension` → `dist/newtab-extension-<version>.zip`

> 插件登录使用 `chrome.identity.launchWebAuthFlow` + Supabase OAuth，需要在 Supabase Auth 的 Redirect URLs 中加入 `https://<extension-id>.chromiumapp.org/`（扩展 ID 由 `manifest.json` 中的 `key` 固定）。上架与部署细节见 `DEPLOY.md`。