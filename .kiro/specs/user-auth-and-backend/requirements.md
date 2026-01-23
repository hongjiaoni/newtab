# 需求文档：用户认证与后端系统

## 介绍

本文档定义了起始页项目的用户认证、后端数据库、壁纸系统和运营后台的需求。该功能扩展将使应用程序支持用户账户管理、云端数据同步、个性化壁纸选择和运营管理。

## 术语表

- **System**: 起始页 Web 应用程序
- **Backend**: 后端服务器和数据库系统
- **User**: 已认证的用户
- **Google_OAuth**: Google 第三方认证服务
- **Session**: 用户会话，有效期 90 天
- **Wallpaper**: 背景壁纸
- **Admin_Dashboard**: 运营管理后台
- **User_Data**: 用户的首页设置（网站、标签、排序等）

## 需求

### 需求 1: Google OAuth 登录集成

**用户故事:** 作为用户，我希望能够使用 Google 邮箱登录，以便安全地管理我的账户和数据。

#### 验收标准

1. THE System SHALL 在设置菜单中显示"登录"按钮
2. WHEN 用户点击"登录"按钮时，THE System SHALL 打开 Google OAuth 认证流程
3. WHEN 用户成功认证时，THE System SHALL 获取用户的 Google 邮箱地址
4. THE System SHALL 将用户信息发送到 Backend 进行注册或登录
5. WHEN 登录成功时，THE System SHALL 显示"退出"按钮替代"登录"按钮
6. THE System SHALL 在本地存储中记录登录时间戳

### 需求 2: 90 天自动登录

**用户故事:** 作为用户，我希望在 90 天内自动保持登录状态，以便无需频繁重新认证。

#### 验收标准

1. WHEN 用户登录时，THE System SHALL 记录登录时间戳到本地存储
2. WHEN 页面加载时，THE System SHALL 检查登录时间戳是否在 90 天内
3. IF 登录时间戳在 90 天内，THEN THE System SHALL 自动登录用户
4. IF 登录时间戳超过 90 天，THEN THE System SHALL 清除登录信息并要求重新登录
5. THE System SHALL 在自动登录时验证用户信息仍然有效

### 需求 3: 用户退出功能

**用户故事:** 作为用户，我希望能够退出登录，以便在共享设备上保护我的隐私。

#### 验收标准

1. WHEN 用户点击"退出"按钮时，THE System SHALL 清除本地登录信息
2. THE System SHALL 清除用户的首页设置（网站、标签等）
3. THE System SHALL 恢复为本地缓存数据显示
4. THE System SHALL 将"退出"按钮替换为"登录"按钮
5. THE System SHALL 通知 Backend 用户已退出

### 需求 4: 后端用户数据库

**用户故事:** 作为系统，我需要存储用户信息和首页设置，以便支持多设备同步和数据持久化。

#### 验收标准

1. THE Backend SHALL 创建用户表，记录用户邮箱、注册时间、最后登录时间
2. THE Backend SHALL 创建用户数据表，记录每个用户的首页设置
3. THE Backend SHALL 支持用户数据的创建、读取、更新、删除操作
4. THE Backend SHALL 为每个用户的数据提供版本控制或时间戳
5. THE Backend SHALL 实现数据加密存储用户敏感信息

### 需求 5: 用户数据同步

**用户故事:** 作为用户，我希望我的首页设置能够在登录后自动加载，以便在不同设备上保持一致。

#### 验收标准

1. WHEN 用户登录时，THE System SHALL 从 Backend 获取用户的最新首页设置
2. THE System SHALL 将获取的数据加载到页面中
3. WHEN 用户修改首页设置时，THE System SHALL 自动同步到 Backend
4. WHEN 用户退出时，THE System SHALL 清除已加载的用户数据
5. THE System SHALL 仅显示本地缓存数据给未登录用户

### 需求 6: 壁纸系统

**用户故事:** 作为用户，我希望能够选择不同的壁纸，包括风景、纯色和每日推荐，以便个性化我的起始页。

#### 验收标准

1. THE System SHALL 在设置菜单中显示"选择壁纸"按钮
2. WHEN 用户点击"选择壁纸"按钮时，THE System SHALL 打开壁纸选择对话框
3. THE System SHALL 提供三种壁纸类别：风景、纯色、每日推荐
4. WHEN 用户选择风景壁纸时，THE System SHALL 显示预定义的风景图片列表
5. WHEN 用户选择纯色壁纸时，THE System SHALL 显示预定义的纯色列表
6. WHEN 用户选择每日推荐时，THE System SHALL 从 Backend 获取当天推荐的壁纸
7. WHEN 用户选择壁纸时，THE System SHALL 立即应用到页面背景
8. THE System SHALL 将壁纸选择保存到本地存储和 Backend（如果已登录）

### 需求 7: 每日推荐壁纸

**用户故事:** 作为系统，我需要支持每日推荐壁纸功能，以便为用户提供新鲜的视觉体验。

#### 验收标准

1. THE Backend SHALL 存储每日推荐壁纸的 URL 和元数据
2. THE System SHALL 每天检查是否有新的推荐壁纸
3. WHEN 用户选择每日推荐时，THE System SHALL 获取当天的推荐壁纸
4. IF 用户已选择每日推荐，THEN THE System SHALL 在每天自动更新壁纸
5. THE System SHALL 缓存推荐壁纸以减少网络请求

### 需求 8: 运营后台 - 壁纸管理

**用户故事:** 作为运营人员，我希望能够上传和管理每日推荐壁纸，以便为用户提供新鲜内容。

#### 验收标准

1. THE Admin_Dashboard SHALL 提供壁纸上传功能
2. THE Admin_Dashboard SHALL 支持设置壁纸为"当日推荐"
3. THE Admin_Dashboard SHALL 显示已上传的壁纸列表
4. THE Admin_Dashboard SHALL 支持删除或编辑壁纸信息
5. THE Admin_Dashboard SHALL 验证上传的图片格式和大小

### 需求 9: 运营后台 - 用户管理

**用户故事:** 作为运营人员，我希望能够查看已注册用户列表，以便了解用户基数和活跃度。

#### 验收标准

1. THE Admin_Dashboard SHALL 显示所有已注册用户的列表
2. THE Admin_Dashboard SHALL 显示用户邮箱、注册时间、最后登录时间
3. THE Admin_Dashboard SHALL 支持按邮箱或注册时间排序
4. THE Admin_Dashboard SHALL 支持搜索用户
5. THE Admin_Dashboard SHALL 显示用户总数和活跃用户数

### 需求 10: 运营后台 - 用户首页预览

**用户故事:** 作为运营人员，我希望能够预览用户的首页设置，以便了解用户的使用情况。

#### 验收标准

1. THE Admin_Dashboard SHALL 在用户列表中提供"预览"按钮
2. WHEN 点击"预览"按钮时，THE Admin_Dashboard SHALL 显示该用户的首页设置
3. THE Admin_Dashboard SHALL 显示用户的网站、标签、壁纸选择等信息
4. THE Admin_Dashboard SHALL 以只读模式显示用户数据
5. THE Admin_Dashboard SHALL 支持关闭预览返回用户列表

### 需求 11: 运营后台 - 在线用户统计

**用户故事:** 作为运营人员，我希望能够查看当前登录用户数，以便监控系统使用情况。

#### 验收标准

1. THE Admin_Dashboard SHALL 显示当前在线用户数
2. THE Admin_Dashboard SHALL 显示今日登录用户数
3. THE Admin_Dashboard SHALL 显示用户登录趋势图表
4. THE Admin_Dashboard SHALL 实时更新在线用户数（每 30 秒）
5. THE Admin_Dashboard SHALL 显示用户会话信息（登录时间、IP 地址等）

### 需求 12: 运营后台访问控制

**用户故事:** 作为系统，我需要保护运营后台，确保只有授权的运营人员可以访问。

#### 验收标准

1. THE Admin_Dashboard SHALL 要求管理员登录
2. THE Admin_Dashboard SHALL 使用独立的管理员认证机制
3. THE Admin_Dashboard SHALL 记录所有管理员操作日志
4. THE Admin_Dashboard SHALL 支持管理员权限管理
5. THE Admin_Dashboard SHALL 实现会话超时保护

### 需求 13: 数据安全和隐私

**用户故事:** 作为用户，我希望我的数据得到安全保护，以便放心使用该服务。

#### 验收标准

1. THE Backend SHALL 使用 HTTPS 加密所有数据传输
2. THE Backend SHALL 对用户密码和敏感信息进行加密存储
3. THE Backend SHALL 实现速率限制防止暴力攻击
4. THE Backend SHALL 定期备份用户数据
5. THE System SHALL 不在本地存储敏感信息（如密码）

### 需求 14: 离线模式

**用户故事:** 作为用户，我希望在离线状态下仍然能够使用本地缓存的首页设置。

#### 验收标准

1. THE System SHALL 在本地存储中缓存用户的首页设置
2. WHEN 网络不可用时，THE System SHALL 使用本地缓存数据
3. WHEN 网络恢复时，THE System SHALL 自动同步本地更改到 Backend
4. THE System SHALL 显示离线状态指示器
5. THE System SHALL 在离线状态下禁用需要网络的功能
