# 本地测试高级会员功能指南

## 方法 1: 浏览器控制台临时升级（推荐用于快速测试）

1. **打开开发者工具**
   - 按 `F12` 键
   - 或右键点击页面 → "检查"

2. **切换到 Console 标签**

3. **执行以下代码**:
```javascript
// 模拟高级会员状态（仅本地测试）
if (window.membershipState) {
  window.membershipState.tier = 2;
  window.membershipState.status = 'active';
  console.log('✅ 已升级为高级会员 (Tier 2)');
  console.log('当前会员状态:', window.membershipState);
  
  // 刷新会员UI
  if (window.updateMembershipUI) {
    window.updateMembershipUI();
  }
  
  alert('已升级为高级会员！请刷新页面以完全生效。');
} else {
  console.error('membershipState 未初始化，请确保已登录');
}
```

4. **刷新页面**
   - 按 `Ctrl + R` 或 `F5`

5. **验证升级成功**:
```javascript
// 检查会员状态
console.log(window.membershipState);
// 应该显示: { tier: 2, status: 'active', ... }
```

---

## 方法 2: Supabase 数据库永久升级

如果需要永久升级（跨设备、跨会话），请在 Supabase SQL Editor 中执行：

```sql
UPDATE public.profiles
SET 
  membership_tier = 2,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '1 year',
  updated_at = NOW()
WHERE email = 'hongjiaoni@gmail.com';
```

---

## 可测试的高级会员功能

### 1. 主题定制 ✨
- 设置菜单 → "主题定制"
- 选择中文字体（优设好身体、字魂扁桃体、站酷快乐体）
- 选择英文字体（Patrick Hand、Quicksand、Roboto）
- 自定义颜色（边框、文字，支持浅色/深色模式）
- 实时预览

### 2. 上传壁纸 🖼️
- 壁纸菜单 → Custom 分类
- 点击"上传图片"
- 支持最大 8K 分辨率
- 自动压缩（如果超过 8K）
- 最多 50 张

### 3. 数据同步 ☁️
- 所有设置自动保存到云端
- 跨设备同步
- 主题、字体、壁纸都会同步

---

## 注意事项

⚠️ **方法 1 的限制**:
- 只在当前浏览器会话有效
- 刷新页面后需要重新执行代码
- 不会同步到数据库

✅ **方法 2 的优势**:
- 永久有效
- 跨设备同步
- 真实的数据库记录

---

## 故障排查

### 问题: 执行代码后没有反应
**解决**: 确保已经登录，`window.membershipState` 才会初始化

### 问题: 刷新后又变回基础会员
**解决**: 使用方法 2 在数据库中永久升级

### 问题: 看不到高级会员徽章
**解决**: 刷新页面，或手动调用 `window.updateMembershipUI()`
