# 壁纸上传故障排查指南

## 常见问题和解决方案

### 问题 1: Supabase Storage 未配置

**错误信息**: "Upload error" 或 "Bucket not found"

**解决方案**:
1. 登录 Supabase Dashboard
2. 进入 **Storage** 菜单
3. 点击 **New Bucket**
4. 创建名为 `wallpapers` 的 bucket
5. 设置为 **Public** (公开访问)

**RLS 策略**:
```sql
-- 允许所有人查看
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'wallpapers' );

-- 允许认证用户上传
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( 
  bucket_id = 'wallpapers' 
  AND auth.role() = 'authenticated'
);

-- 允许用户删除自己的文件
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'wallpapers'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

### 问题 2: 文件大小限制

**错误信息**: "Image too large"

**限制**: 
- 上传前最大 5MB
- 压缩后根据分辨率调整

**解决方案**:
- 使用图片压缩工具先压缩图片
- 或者修改代码中的限制

---

### 问题 3: 权限问题

**错误信息**: "Permission denied" 或 "Unauthorized"

**检查项**:
1. 确保已登录
2. 确保是高级会员 (Tier 2+)
3. 检查浏览器控制台的 `window.authState` 和 `window.membershipState`

**调试命令**:
```javascript
// 检查登录状态
console.log('Logged in:', window.authState?.isLoggedIn);
console.log('User:', window.authState?.user);

// 检查会员等级
console.log('Membership tier:', window.membershipState?.tier);

// 检查 Supabase 连接
console.log('Supabase:', window.supabase);
```

---

### 问题 4: 网络错误

**错误信息**: "Network error" 或 "Failed to fetch"

**可能原因**:
- Supabase 项目 URL 配置错误
- API Key 配置错误
- 网络连接问题

**检查 config.js**:
```javascript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

---

## 调试步骤

### 1. 打开浏览器控制台
按 F12 → Console 标签

### 2. 尝试上传并查看错误
```javascript
// 上传时会显示详细错误信息
// 查找以下关键词:
// - "Upload error"
// - "Database error"
// - "Storage error"
```

### 3. 手动测试 Supabase Storage
```javascript
// 测试 Storage 连接
const testUpload = async () => {
  const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
  const { data, error } = await supabase.storage
    .from('wallpapers')
    .upload('test/test.txt', testFile);
  
  if (error) {
    console.error('Storage test failed:', error);
  } else {
    console.log('Storage test success:', data);
  }
};

testUpload();
```

---

## 完整的上传流程检查清单

- [ ] 已登录
- [ ] 会员等级 >= 2
- [ ] Supabase Storage bucket `wallpapers` 已创建
- [ ] Bucket 设置为 Public
- [ ] RLS 策略已配置
- [ ] 图片文件 < 5MB
- [ ] 图片格式正确 (jpg, png, webp 等)
- [ ] 浏览器控制台无错误

---

## 如果问题仍未解决

请提供以下信息:
1. 浏览器控制台的完整错误信息
2. `window.authState` 的值
3. `window.membershipState` 的值
4. Supabase Dashboard 中 Storage 的配置截图
