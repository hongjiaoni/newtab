# NewTab 设计系统：Liquid Glass

NewTab 的视觉和交互规范，参照 Apple Human Interface Guidelines 与 2025 年推出的 Liquid Glass 设计语言。
设计变量和组件样式放在 `public/`（遵循单源码策略，构建时同步到插件端）；本目录保存规范文档和视觉样张。页面只引用这些变量和组件，不再有多套主题。

| 文件 | 作用 |
|---|---|
| `public/tokens.css` | 设计变量：字体、字号、间距、圆角、颜色、玻璃材质、动效，含浅色/深色与无障碍覆盖 |
| `public/glass.css` | 玻璃材质和基础组件：按钮、图标按钮、分段控件、开关、输入框、菜单、图标块、组件卡片、页面指示点 |
| `public/glass.js` | 折射效果（渐进增强）：仅 Chromium 内核启用，其他浏览器保持普通毛玻璃 |
| `public/appearance.js` | 外观切换（浅色/深色/自动），在 `<head>` 中加载以避免闪烁 |
| `design-system/preview.html` | 视觉样张：首页 + 工作站 + 设置菜单 + 添加网站弹窗 |

本地预览：在 Claude 的浏览器面板启动 `design-preview`，或运行
`node -e "const e=require('express');e().use(e.static('.')).listen(4100)"`，再打开 `http://localhost:4100/design-system/preview.html`。

---

## 1. 原则

1. **内容在下，控件在上。** 壁纸、网站图标、组件内容是内容层；工具栏、搜索框、菜单、弹窗是浮在内容之上的玻璃层。玻璃用来承载控件，不用来装饰。
2. **不叠玻璃。** 玻璃上面不再放玻璃。组件内部的分组用 `--fill-*` 填充色，不用第二层 `.glass`。
3. **少用颜色。** 界面本身保持中性，颜色只给强调色（`--accent`）、状态色和用户内容（日历分类、便签）。
4. **层级靠字号、字重、透明度表达**，不靠边框和分割线。文字层级用 `--label-1..4`，它们是同一种颜色的不同透明度。
5. **同心圆角。** 嵌套元素的圆角 = 外层圆角 − 内边距。组件 28px、内边距 16px，那么内部列表行就是 12px。
6. **动效有物理感。** 按下缩小、松开回弹，用 `--ease-spring`。动画只表达状态变化，不做装饰性循环（滚动提示箭头除外）。

## 2. 玻璃材质

| 类名 | 用途 | 底色变量 |
|---|---|---|
| `.glass` | 默认（Regular）：工具栏、搜索框、组件卡片、图标块 | `--glass-tint` |
| `.glass--clear` | 透明（Clear）：叠在复杂壁纸上的小控件，如页面指示点、滚动提示 | `--glass-tint-clear` |
| `.glass--thick` | 厚玻璃：菜单、弹窗、需要长时间阅读的区域 | `--glass-tint-thick` |
| `.glass--capsule` | 胶囊形 | — |
| `.glass--lifted` | 抬起投影：弹出层 | — |
| `.glass--interactive` | 可点：悬停提亮、按下缩小 | — |

一块玻璃由四部分组成：半透明底色、背景模糊加饱和、顶部高光边（`::before` 渐变描边）、0.5px 外轮廓加柔和投影。

**折射**：给元素加 `data-refract` 属性，`glass.js` 会按它的尺寸和圆角生成位移贴图，让边缘一圈的背景弯曲。
- 只用在少数几个大面积、常驻的控件上：搜索框、右上角工具栏、页面指示点。图标块和组件卡片不加，因为每个滤镜都要单独占用 GPU。
- 开启折射时，模糊和饱和也在 SVG 滤镜里完成：Chrome 会忽略与 `blur()` 写在同一个 `backdrop-filter` 里的 `url()`。
- 用户可以在设置里关闭；系统开启"降低透明度"时，玻璃变为接近不透明。

## 3. 字体

- 只用系统字体，不加载任何 Web 字体：
  - macOS / iOS：SF Pro + 苹方
  - Windows：Segoe UI Variable + 微软雅黑
- 时钟用圆体（`ui-rounded`，即 SF Pro Rounded），数字等宽（`tabular-nums`），分钟变化时不会跳动。

| 变量 | 规格 | 用途 |
|---|---|---|
| `--text-clock` | 600 112px | 首页时钟 |
| `--text-large-title` | 700 30px | 页面标题（"工作站"） |
| `--text-title2/3` | 600 20 / 17px | 弹窗标题、组件内大标题 |
| `--text-headline` | 600 14px | 组件标题、按钮 |
| `--text-body` | 400 14px | 正文、输入框 |
| `--text-callout` | 400 13px | 列表主文字、聊天气泡 |
| `--text-subhead` | 500 12px | 图标名称、分段控件 |
| `--text-footnote` | 400 12px | 次要信息、时间 |
| `--text-caption` | 500 11px | 角标、分组标题 |

## 4. 颜色

- 系统色与 Apple 一致：浅色、深色两套，见 `tokens.css`。
- 强调色固定为系统蓝（`--accent`），不提供自定义。
- 壁纸上的文字（时钟、图标名称、"工作站"标题）在两种外观下都是白字加柔和阴影，与 iOS 主屏一致；壁纸上下边缘轻微压暗，保证白字可读。
- 外观：`html[data-appearance="light|dark"]`，不设置时跟随系统。

## 5. 布局

- 间距只用 4 的倍数（`--space-1..16`）。
- **首页**：时钟、搜索框、图标网格垂直居中。
  - 网格每行 8 个，窄屏 5 个或 4 个。
  - 图标块 64px，网站 favicon 显示为 36px。
  - 名称单行，过长时以省略号截断。
- **工作站**：12 列卡片网格（bento），宽屏下 4 行等高，铺满一屏。
  - 宽度不足 1100px 或高度不足 760px 时，改为固定行高，页面可以继续向下滚动。
- 右上角工具栏固定，两页共用。页面指示点固定在右侧垂直居中。

## 6. 组件

| 组件 | 类名 | 说明 |
|---|---|---|
| 按钮 | `.btn` `.btn--primary` `.btn--plain` `.btn--sm` | 胶囊形；主按钮用强调色，每个视图最多一个 |
| 图标按钮 | `.icon-btn` | 36px 圆形，图标是 1.75 描边的线性图标（SF Symbols 风格） |
| 分段控件 | `.seg` + `button[aria-pressed]` | 2 到 4 个选项 |
| 开关 | `.switch > input + span` | 打开时为绿色，与 iOS 一致 |
| 输入框 | `.field` | 填充色底，聚焦时显示强调色光圈 |
| 菜单 | `.menu` `.menu-section` `.menu-row` | 厚玻璃；可点的行悬停时整行变为强调色 |
| 弹窗 | `.scrim > .sheet` | 36px 圆角，打开时从 94% 缩放回弹 |
| 图标块 | `.tile > .tile-icon + .tile-name` | 文件夹用 `.tile-icon--folder`，3×3 迷你图标 |
| 组件卡片 | `.widget > .widget-head + .widget-body` | 内容区单独滚动，不会带动整页翻页 |
| 列表行 | `.list-row` | 浏览历史、搜索建议 |
| 页面指示点 | `.pager-dots` | 当前页的点拉长为胶囊 |

## 7. 交互

- **翻页**：
  - 滚轮一次手势翻一页，累计滚动超过 40 后翻页，之后锁定 650ms，避免触控板惯性连翻。
  - 组件内部可以滚动时，先滚动组件内部。
  - 键盘：PageUp / PageDown，或 Alt + ↑ / ↓。
  - 点击指示点直接跳转。
- **反馈**：所有可点元素悬停时变化底色，按下缩小到 0.94–0.96，松开回弹。
- **弹出层**：点击外部或按 Esc 关闭。打开时从触发点方向缩放展开（`--pop-origin`）。
- **焦点**：键盘焦点显示 3px 强调色光圈（`:focus-visible`），鼠标点击时不显示。

## 8. 无障碍

| 系统设置 | 处理 |
|---|---|
| 降低透明度（`prefers-reduced-transparency`） | 玻璃变为不透明面板，关闭模糊 |
| 增强对比度（`prefers-contrast: more`） | 加深外轮廓，提高次要文字的不透明度 |
| 减弱动态效果（`prefers-reduced-motion`） | 取消回弹和位移动画 |

- 指针设备上，可点区域不小于 28px。
- 只有图标的按钮必须写 `aria-label`。

## 9. 迁移映射（阶段 2–4）

| 现有 | 新 |
|---|---|
| `themes.js`、`data-style` 分支、`sketchy` 样式 | 已删除（阶段 2），改用 `tokens.css` + `glass.css` |
| 手绘字体、Google Fonts、中文字体 CDN | 已删除（阶段 2），改用系统字体 |
| `body.dark` | `html[data-appearance]` + `appearance.js`，支持跟随系统；`body.dark` 仍同步，供旧样式过渡 |
| `.site-tile` / `.site-tile-icon` | `.tile` / `.tile-icon.glass` |
| `.settings-menu` 汉堡菜单 | 右上角工具栏 `.toolbar` + 设置菜单 `.settings.menu` |
| `.modal` | `.scrim > .sheet.glass--thick` |
| 横向两屏 `#screens` | 纵向翻页 `.pager > .page` |
