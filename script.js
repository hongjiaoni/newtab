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
const linksContainer = document.getElementById("links");
const addBtn = document.getElementById("addLinkBtn");

let links = JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
  linksContainer.innerHTML = "";

  links.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "link-item";
    div.textContent = link.name;

    div.onclick = () => {
      window.location.href = link.url;
    };

    div.oncontextmenu = (e) => {
      e.preventDefault();
      if (confirm("Delete this site?")) {
        links.splice(index, 1);
        saveLinks();
        renderLinks();
      }
    };

    linksContainer.appendChild(div);
  });
}

addBtn.onclick = () => {
  const name = prompt("Site name");
  const url = prompt("Site URL (https://...)");

  if (!name || !url) return;

  links.push({ name, url });
  saveLinks();
  renderLinks();
};

renderLinks();

// ===== 主题切换 =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";

document.body.classList.add(savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀︎" : "☾";

themeToggle.onclick = () => {
  const isDark = document.body.classList.contains("dark");
  document.body.classList.toggle("dark", !isDark);
  document.body.classList.toggle("light", isDark);

  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀︎" : "☾";
};

input.focus();
