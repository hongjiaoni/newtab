// ===== 工具函数 =====

// 验证 URL 格式
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// 安全的 localStorage 操作
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Storage get error for key: ${key}`, error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Storage set error for key: ${key}`, error);
      return false;
    }
  },
  
  // 安全存储（简单的 base64 编码，非加密）
  secureSet(key, value) {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(value)));
      localStorage.setItem(key, encoded);
      return true;
    } catch (error) {
      console.warn(`Storage secureSet error for key: ${key}`, error);
      return false;
    }
  },
  
  secureGet(key, defaultValue = null) {
    try {
      const encoded = localStorage.getItem(key);
      if (!encoded) return defaultValue;
      return JSON.parse(decodeURIComponent(atob(encoded)));
    } catch (error) {
      console.warn(`Storage secureGet error for key: ${key}`, error);
      return defaultValue;
    }
  }
};

// 全局错误处理
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

// ===== 时间功能 =====
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  
  const timeEl = document.getElementById("time");
  if (timeEl) {
    timeEl.textContent = `${hours}:${minutes}`;
  }
}

setInterval(updateTime, 1000);
updateTime();

// ===== 搜索功能 =====
(function initSearch() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  
  if (!form || !input) return;
  
  form.addEventListener("submit", function handleSubmit(e) {
    e.preventDefault();
    
    const query = input.value.trim();
    if (!query) return;
    
    try {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.location.href = url;
    } catch (error) {
      console.error("Search error:", error);
      // 静默失败降级处理
      const encoded = encodeURIComponent(query);
      window.location.href = `https://duckduckgo.com/?q=${encoded}`;
    }
  });
})();

// ===== 链接管理 =====
(function initLinks() {
  const linksContainer = document.getElementById("links");
  const addBtn = document.getElementById("addLinkBtn");
  
  if (!linksContainer || !addBtn) return;
  
  // 使用安全的 localStorage
  let links = Storage.get("links", []);
  
  // 验证链接数据
  if (!Array.isArray(links)) {
    links = [];
    Storage.set("links", links);
  }

  function saveLinks() {
    // 验证数据
    const validLinks = links.filter(link => 
      link && typeof link === 'object' && link.name && link.url
    );
    Storage.set("links", validLinks);
  }

  function renderLinks() {
    linksContainer.innerHTML = "";

    if (links.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.innerHTML = `
        <p>Your space is empty.</p>
        <p>Add your favorite sites to get started.</p>
      `;
      linksContainer.appendChild(empty);
      return;
    }

    // 使用文档片段减少重绘
    const fragment = document.createDocumentFragment();
    
    links.forEach((link, index) => {
      if (!link || !link.name || !link.url) return;
      
      const div = document.createElement("div");
      div.className = "link-item";
      div.textContent = link.name;
      div.draggable = true;
      div.dataset.index = index;

      // 点击打开链接
      div.onclick = () => {
        if (isValidUrl(link.url)) {
          window.location.href = link.url;
        } else {
          // URL 无效时尝试添加 https://
          const fixedUrl = `https://${link.url}`;
          if (isValidUrl(fixedUrl)) {
            window.location.href = fixedUrl;
          } else {
            alert("Invalid URL");
          }
        }
      };

      // 右键删除
      div.oncontextmenu = (e) => {
        e.preventDefault();
        if (confirm("Delete this site?")) {
          links.splice(index, 1);
          saveLinks();
          renderLinks();
        }
      };

      // 拖拽事件
      div.ondragstart = (e) => {
        e.dataTransfer.effectAllowed = "move";
        div.classList.add("dragging");
      };

      div.ondragend = () => {
        div.classList.remove("dragging");
      };

      div.ondragover = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      };

      div.ondrop = (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (!dragging) return;
        
        const fromIndex = Number(dragging.dataset.index);
        const toIndex = index;
        
        if (fromIndex === toIndex || isNaN(fromIndex)) return;

        // 使用 splice 进行高效排序
        const [moved] = links.splice(fromIndex, 1);
        links.splice(toIndex, 0, moved);
        
        saveLinks();
        renderLinks();
      };

      fragment.appendChild(div);
    });

    linksContainer.appendChild(fragment);
  }

  // 添加新链接
  addBtn.onclick = () => {
    const name = prompt("Site name");
    const url = prompt("Site URL (https://...)");

    if (!name || !url) return;
    
    // 输入验证
    if (name.trim().length === 0) {
      alert("Please enter a valid site name");
      return;
    }
    
    let validUrl = url.trim();
    if (!isValidUrl(validUrl)) {
      // 尝试添加 https://
      validUrl = `https://${validUrl}`;
      if (!isValidUrl(validUrl)) {
        alert("Please enter a valid URL");
        return;
      }
    }

    links.push({ name: name.trim(), url: validUrl });
    saveLinks();
    renderLinks();
  };

  renderLinks();
})();

// ===== 主题切换 =====
(function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;
  
  const savedTheme = Storage.get("theme", "dark");
  
  document.body.classList.remove("dark", "light");
  document.body.classList.add(savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀︎" : "☾";

  themeToggle.onclick = () => {
    const isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);

    const newTheme = isDark ? "light" : "dark";
    Storage.set("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀︎" : "☾";
  };
})();

// ===== 首次使用提示 =====
(function initWelcome() {
  if (!localStorage.getItem("hasVisited")) {
    setTimeout(() => {
      alert(
        "Welcome 👋\n\n• Press Enter to search\n• Add your favorite sites\n• Right-click to delete\n\nEnjoy your calm start."
      );
      localStorage.setItem("hasVisited", "true");
    }, 500);
  }
})();

// 聚焦搜索框
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.focus();
}
