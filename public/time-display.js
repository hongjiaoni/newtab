// ===== 时间显示更新 =====

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  
  // 统一时间显示
  const timeEl = document.getElementById("time");
  if (timeEl) {
    timeEl.textContent = `${hours}:${minutes}`;
  }
  
  // 分离显示 (垂直风格)
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  
  // 日期显示
  const dateEl = document.getElementById("date");
  if (dateEl) {
    const options = { weekday: 'long' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);
  }
  
  // 月年显示
  const monthYearEl = document.getElementById("monthYear");
  if (monthYearEl) {
    const options = { month: 'long', year: 'numeric' };
    monthYearEl.textContent = now.toLocaleDateString('en-US', options);
  }
}

// 每秒更新时间
setInterval(updateTime, 1000);
updateTime();
