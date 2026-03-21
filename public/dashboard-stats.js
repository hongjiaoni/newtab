// ===== 仪表盘统计功能 =====

// 更新日期
function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const dateEl = document.getElementById('date');
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('en-US', options);
  }
}

// 更新天气 (模拟)
function updateWeather() {
  const weatherEl = document.getElementById('weather');
  if (!weatherEl) return;
  
  // 实际项目中可以调用天气 API
  const conditions = ['☀️', '⛅', '🌧️', '🌤️', '☁️'];
  const temp = Math.floor(Math.random() * 10) + 18; // 18-28°C
  
  // 尝试获取真实天气
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 可以在这里调用天气 API
        weatherEl.textContent = `${conditions[0]} ${temp}°C`;
      },
      () => {
        weatherEl.textContent = `${conditions[0]} ${temp}°C`;
      }
    );
  } else {
    weatherEl.textContent = `${conditions[0]} ${temp}°C`;
  }
}

// 专注时间追踪
const FocusTracker = {
  key: 'focusStats',
  
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || {
        totalMinutes: 0,
        tasksDone: 0,
        linesCode: 0,
        lastDate: new Date().toDateString()
      };
    } catch {
      return { totalMinutes: 0, tasksDone: 0, linesCode: 0, lastDate: '' };
    }
  },
  
  save(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save focus stats');
    }
  },
  
  incrementTime(minutes = 1) {
    const stats = this.get();
    
    // 新的一天，重置
    const today = new Date().toDateString();
    if (stats.lastDate !== today) {
      stats.lastDate = today;
      // 可以选择保留或重置
    }
    
    stats.totalMinutes += minutes;
    this.save(stats);
    this.updateDisplay();
  },
  
  addTask() {
    const stats = this.get();
    stats.tasksDone += 1;
    this.save(stats);
    this.updateDisplay();
  },
  
  addLines(lines) {
    const stats = this.get();
    stats.linesCode += lines;
    this.save(stats);
    this.updateDisplay();
  },
  
  updateDisplay() {
    const stats = this.get();
    
    // 更新专注时间
    const focusEl = document.getElementById('focusTime');
    if (focusEl) {
      const hours = Math.floor(stats.totalMinutes / 60);
      const mins = stats.totalMinutes % 60;
      focusEl.textContent = `${hours}:${String(mins).padStart(2, '0')}`;
    }
    
    // 更新任务数
    const tasksEl = document.getElementById('tasksDone');
    if (tasksEl) {
      tasksEl.textContent = stats.tasksDone;
    }
    
    // 更新代码行数
    const linesEl = document.getElementById('linesCode');
    if (linesEl) {
      linesEl.textContent = stats.linesCode.toLocaleString();
    }
  },
  
  // 模拟：每分钟增加一些专注时间
  startTracking() {
    this.updateDisplay();
    
    // 每分钟自动增加
    setInterval(() => {
      this.incrementTime(1);
    }, 60000);
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  updateWeather();
  FocusTracker.startTracking();
  
  // 每秒更新时间
  setInterval(updateDate, 1000);
});
