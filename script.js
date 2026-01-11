// 更新时间
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("time").textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

// 搜索功能
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.location.href = url;
});
