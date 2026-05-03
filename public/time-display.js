// ===== 时间显示更新 =====
// The main updateTime() is defined in script.js (with i18n support).
// This file only sets up the interval for alternate page layouts.

setInterval(() => {
  if (typeof window.updateTime === 'function') {
    window.updateTime();
  }
}, 1000);

// Initial call
if (typeof window.updateTime === 'function') {
  window.updateTime();
}
