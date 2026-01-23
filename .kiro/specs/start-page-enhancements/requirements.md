# 需求文档

## 介绍

本文档定义了起始页（Start Page）Web 项目的增强功能需求。该项目是一个简洁的浏览器起始页，提供搜索、网站快捷方式、标签管理和主题切换功能。本次增强将改进用户界面、交互体验和国际化支持。

## 术语表

- **System**: 起始页 Web 应用程序
- **Theme_Toggle**: 主题切换按钮，用于在浅色和深色模式之间切换
- **Search_Box**: 搜索输入框组件
- **Chip**: 网站或标签的可点击卡片元素
- **Add_Modal**: 添加新网站或标签的弹窗对话框
- **Engine_Menu**: 搜索引擎选择下拉菜单
- **Language_Toggle**: 语言切换按钮，用于在中文和英文之间切换
- **Drag_Handle**: 拖动手柄，用于重新排序元素
- **Context_Menu**: 右键菜单，提供编辑和删除选项
- **Settings_Menu**: 设置菜单，包含主题和语言切换选项
- **Time_Format**: 时间显示格式，支持 12 小时制和 24 小时制

## 需求

### 需求 1: 改进主题切换图标

**用户故事:** 作为用户，我希望主题切换按钮使用更美观简约的图标，以便获得更好的视觉体验。

#### 验收标准

1. THE Theme_Toggle SHALL 使用简约的 SVG 图标替代当前的文本符号
2. WHEN 处于深色模式时，THE Theme_Toggle SHALL 显示太阳图标
3. WHEN 处于浅色模式时，THE Theme_Toggle SHALL 显示月亮图标
4. THE Theme_Toggle SHALL 保持平滑的过渡动画效果

### 需求 2: 增加搜索框圆角

**用户故事:** 作为用户，我希望搜索框有更大的圆角，以便界面看起来更加柔和现代。

#### 验收标准

1. THE Search_Box SHALL 使用更大的 border-radius 值
2. THE Search_Box SHALL 在所有主题模式下保持一致的圆角样式

### 需求 3: 支持拖动排序

**用户故事:** 作为用户，我希望能够拖动网站和标签来重新排序，以便按照我的偏好组织内容。

#### 验收标准

1. WHEN 用户拖动一个 Chip 时，THE System SHALL 允许改变其在列表中的位置
2. WHEN 拖动操作完成时，THE System SHALL 保存新的排序到本地存储
3. WHEN 页面重新加载时，THE System SHALL 按照保存的顺序显示 Chip
4. THE System SHALL 为标签和网站分别维护独立的排序
5. WHEN 拖动过程中，THE System SHALL 提供视觉反馈显示拖动状态

### 需求 4: 调整添加按钮位置

**用户故事:** 作为用户，我希望添加按钮显示为最后一个网站卡片，以便更直观地添加新内容。

#### 验收标准

1. THE System SHALL 将添加按钮渲染为与网站 Chip 相同样式的卡片
2. THE System SHALL 将添加按钮放置在所有网站 Chip 之后
3. THE System SHALL 保持添加按钮的可点击功能
4. THE System SHALL 为添加按钮使用与其他 Chip 一致的悬停效果

### 需求 5: 加粗时间字体

**用户故事:** 作为用户，我希望时间显示使用加粗字体，以便更加醒目易读。

#### 验收标准

1. THE System SHALL 将时间元素的 font-weight 设置为加粗
2. THE System SHALL 在所有主题模式下保持时间字体加粗

### 需求 6: 支持中英文切换

**用户故事:** 作为用户，我希望能够在中文和英文界面之间切换，以便使用我偏好的语言。

#### 验收标准

1. THE System SHALL 在右上角提供 Language_Toggle 按钮
2. WHEN 用户点击 Language_Toggle 时，THE System SHALL 切换界面语言
3. THE System SHALL 支持中文和英文两种语言
4. THE System SHALL 将语言偏好保存到本地存储
5. WHEN 页面加载时，THE System SHALL 使用保存的语言偏好
6. THE System SHALL 翻译所有界面文本，包括按钮、标签、占位符和提示信息
7. THE System SHALL 保持日期格式与选择的语言相匹配

### 需求 7: 优化添加弹窗布局

**用户故事:** 作为用户，我希望添加弹窗中的元素布局更加清晰，以便更容易理解和操作。

#### 验收标准

1. THE Add_Modal SHALL 将标签选择显示为多选框组
2. THE Add_Modal SHALL 将"固定在首页"选项显示为单独的勾选框
3. THE Add_Modal SHALL 将所有表单元素左对齐
4. THE Add_Modal SHALL 使用清晰的标签文本标识每个输入字段
5. THE Add_Modal SHALL 在标签多选框和固定首页勾选框之间提供适当的间距

### 需求 8: 自动关闭搜索引擎菜单

**用户故事:** 作为用户，我希望选择搜索引擎后菜单自动关闭，以便快速完成操作。

#### 验收标准

1. WHEN 用户点击 Engine_Menu 中的任一搜索引擎选项时，THE System SHALL 立即关闭 Engine_Menu
2. THE System SHALL 在关闭菜单前完成搜索引擎的切换

### 需求 9: 最大化所有按钮圆角

**用户故事:** 作为用户，我希望所有按钮使用最大圆角，以便获得更加柔和统一的视觉效果。

#### 验收标准

1. THE System SHALL 将所有按钮元素的 border-radius 设置为最大值（50% 或足够大的像素值）
2. THE System SHALL 确保主题切换按钮、添加按钮、模态框按钮和所有其他按钮使用一致的圆角样式
3. THE System SHALL 在所有主题模式下保持按钮圆角样式一致

### 需求 10: 右键菜单支持编辑和删除

**用户故事:** 作为用户，我希望右键点击标签或网站时能够编辑或删除它们，以便更方便地管理内容。

#### 验收标准

1. WHEN 用户右键点击一个 Chip 时，THE System SHALL 显示 Context_Menu
2. THE Context_Menu SHALL 包含"编辑"和"删除"选项
3. WHEN 用户点击"编辑"选项时，THE System SHALL 打开 Add_Modal 并预填充当前数据
4. WHEN 用户点击"删除"选项时，THE System SHALL 显示确认对话框
5. WHEN 用户确认删除时，THE System SHALL 从存储中移除该项并更新显示
6. THE Context_Menu SHALL 在点击其他区域时自动关闭
7. THE Context_Menu SHALL 与整体页面视觉风格保持一致

### 需求 11: 改进拖放排序体验

**用户故事:** 作为用户，我希望拖动元素时能够自动进行排序，以便更直观地重新组织内容。

#### 验收标准

1. WHEN 用户拖动一个 Chip 经过另一个 Chip 时，THE System SHALL 自动调整其他元素的位置
2. THE System SHALL 提供平滑的动画过渡效果
3. WHEN 拖动过程中，THE System SHALL 实时显示新的排序位置
4. THE System SHALL 在拖动释放时立即应用新的排序

### 需求 12: 中文日期格式优化

**用户故事:** 作为中文用户，我希望日期显示为中文格式且不可切换，以便符合中文阅读习惯。

#### 验收标准

1. WHEN 界面语言为中文时，THE System SHALL 显示日期格式为"YYYY年MM月DD日 星期X"
2. WHEN 界面语言为中文时，THE System SHALL 禁用日期格式切换功能
3. WHEN 界面语言为英文时，THE System SHALL 保持原有的日期格式切换功能
4. THE System SHALL 在语言切换时自动更新日期格式

### 需求 13: 时间格式切换

**用户故事:** 作为用户，我希望点击时间能够在 12 小时制和 24 小时制之间切换，以便使用我偏好的时间格式。

#### 验收标准

1. WHEN 用户点击时间显示时，THE System SHALL 在 12 小时制和 24 小时制之间切换
2. WHEN 使用 12 小时制时，THE System SHALL 显示 AM/PM 标识
3. THE System SHALL 将时间格式偏好保存到本地存储
4. WHEN 页面加载时，THE System SHALL 使用保存的时间格式偏好

### 需求 14: 统一设置菜单

**用户故事:** 作为用户，我希望主题和语言切换集中在一个菜单中，以便界面更加简洁统一。

#### 验收标准

1. THE System SHALL 在右上角显示"..."菜单按钮
2. WHEN 用户点击"..."按钮时，THE System SHALL 显示 Settings_Menu
3. THE Settings_Menu SHALL 包含"主题切换"和"语言切换"选项
4. THE Settings_Menu SHALL 与整体页面视觉风格保持一致
5. THE Settings_Menu SHALL 在点击其他区域时自动关闭
6. WHEN 用户选择主题或语言选项时，THE System SHALL 立即应用更改

### 需求 15: 移除独立添加按钮

**用户故事:** 作为用户，我希望移除底部的独立添加按钮，以便避免功能重复。

#### 验收标准

1. THE System SHALL 移除底部的独立"+ Add"按钮
2. THE System SHALL 保留内联的添加按钮（作为最后一个 Chip）
3. THE System SHALL 确保添加功能仍然可用且易于访问

### 需求 16: 优化弹窗字体和布局

**用户故事:** 作为用户，我希望添加弹窗的字体更小且布局更清晰，以便更好地利用空间。

#### 验收标准

1. THE Add_Modal SHALL 使用更小的字体大小（相比当前）
2. THE Add_Modal SHALL 将标签选择和"固定在首页"选项左对齐
3. THE Add_Modal SHALL 保持良好的可读性
4. THE Add_Modal SHALL 在所有屏幕尺寸下保持良好的布局
