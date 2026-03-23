// ===== Theme Icons =====
const THEME_ICONS = {
  sun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  moon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`
};

// ===== Internationalization (i18n) =====
const translations = {
  zh: {
    search: '想要搜点什么吗？',
    addNew: '添加',
    addNewTitle: '添加新项目',
    site: '网站',
    tag: '标签',
    name: '名称',
    url: '网址',
    urlPlaceholder: '网址 (https://...)',
    tagName: '标签名称',
    selectTags: '选择标签',
    pinToHome: '固定在首页',
    cancel: '取消',
    save: '保存',
    close: '关闭',
    delete: '删除',
    deleteConfirm: '确定删除',
    edit: '编辑',
    noSites: '此标签下没有网站',
    nameRequired: '名称和网址必填',
    tagNameRequired: '标签名称必填',
    tagExists: '标签已存在',
    darkMode: '深色模式',
    lightMode: '浅色模式',
    login: '登录',
    logout: '退出',
    googleSignIn: '登录',
    googleLoginButton: 'Google 登录',
    loginSuccess: '登录成功！',
    logoutSuccess: '已退出登录',
    wallpaper: '壁纸',
    wallpaperTitle: '选择壁纸',
    landscape: '风景',
    solid: '纯色',
    daily: '每日推荐',
    wallpaperChanged: '壁纸已更换',
    restoreDefault: '恢复默认',
    restoredDefault: '已恢复默认壁纸',
    userProfile: '个人信息',
    minimalist: '极简模式',
    general: '一般模式',
    language: '语言',
    chinese: '中文',
    english: '英文',
    custom: '自定义',
    upload: '上传',
    uploadWallpaper: '上传壁纸',
    themeCustomization: '主题',
    about: '关于',
    aboutTitle: '关于 NewTab',
    aboutDesc: '简洁美观的新标签页，让每次打开浏览器都是一种享受。',
    officialWebsite: '官网',
    buyMeCoffee: '请我喝杯咖啡',
    coffeeDesc: '如果你喜欢这个项目，可以请我喝杯咖啡表示支持！',
    feedback: '提交反馈',
    feedbackType: '反馈类型',
    feedbackContent: '反馈内容',
    feedbackEmail: '联系邮箱（可选）',
    feedbackPlaceholder: '请描述你的问题或建议...',
    submit: '提交',
    submitting: '提交中...',
    pay: '支付',
    customAmount: '自定义金额',
    addSite: '添加网站',
    addTag: '添加标签',
    changeWallpaper: '更换壁纸',
    feedbackTypeBug: 'Bug 报告',
    feedbackTypeFeature: '功能建议',
    feedbackTypeOther: '其他',
    editSite: '编辑网站',
    editTag: '编辑标签',
    imageUrl: '图片地址',
    apply: '应用',
    pasteImageUrl: '粘贴图片链接 (http/https)',
    invalidImageUrl: '请输入正确的图片链接',
    addImage: '添加图片',
    chooseUpload: '上传图片',
    chooseLink: '填写链接',
    addByLink: '添加链接',
    confirmUpload: '确认上传',
    localUpload: '本地上传',
    addEngine: '新增',
    remove: '移除',
    searchEngines: '搜索引擎',
    subscriptionRecords: '订阅记录',
    back: '返回',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    search: 'What would you like to search?',
    addNew: 'Add',
    addNewTitle: 'Add New',
    site: 'Site',
    tag: 'Tag',
    name: 'Name',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'Tag Name',
    selectTags: 'Select Tags',
    pinToHome: 'Pin to Home',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    delete: 'Delete',
    deleteConfirm: 'Confirm delete',
    edit: 'Edit',
    noSites: 'No sites in this tag',
    nameRequired: 'Name and URL required',
    tagNameRequired: 'Tag name required',
    tagExists: 'Tag already exists',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    login: 'Login',
    logout: 'Logout',
    googleSignIn: 'Login',
    googleLoginButton: 'Continue with Google',
    loginSuccess: 'Login successful!',
    logoutSuccess: 'Logged out',
    wallpaper: 'Wallpaper',
    wallpaperTitle: 'Select Wallpaper',
    landscape: 'Landscape',
    solid: 'Solid Color',
    daily: 'Daily Recommendation',
    wallpaperChanged: 'Wallpaper changed',
    restoreDefault: 'Restore Default',
    restoredDefault: 'Restored default wallpaper',
    userProfile: 'User Profile',
    minimalist: 'Minimalist',
    general: 'General',
    language: 'Language',
    chinese: 'Chinese',
    english: 'English',
    custom: 'Custom',
    upload: 'Upload',
    uploadWallpaper: 'Upload Wallpaper',
    themeCustomization: 'Theme',
    about: 'About',
    aboutTitle: 'About NewTab',
    aboutDesc: 'A beautiful new tab page that makes every browser launch a pleasure.',
    officialWebsite: 'Official Website',
    buyMeCoffee: 'Buy Me a Coffee',
    coffeeDesc: 'If you enjoy this project, consider buying me a coffee to show your support!',
    feedback: 'Send Feedback',
    feedbackType: 'Feedback Type',
    feedbackContent: 'Feedback Content',
    feedbackEmail: 'Contact Email (optional)',
    feedbackPlaceholder: 'Please describe your issue or suggestion...',
    submit: 'Submit',
    submitting: 'Submitting...',
    pay: 'Pay',
    customAmount: 'Custom Amount',
    addSite: 'Add Site',
    addTag: 'Add Tag',
    changeWallpaper: 'Change Wallpaper',
    feedbackTypeBug: 'Bug Report',
    feedbackTypeFeature: 'Feature Request',
    feedbackTypeOther: 'Other',
    editSite: 'Edit Site',
    editTag: 'Edit Tag',
    imageUrl: 'Image URL',
    apply: 'Apply',
    pasteImageUrl: 'Paste image URL (http/https)',
    invalidImageUrl: 'Please enter a valid image URL',
    addImage: 'Add Image',
    chooseUpload: 'Upload Image',
    chooseLink: 'Use Link',
    addByLink: 'Add Link',
    confirmUpload: 'Confirm Upload',
    localUpload: 'Local Upload',
    subscriptionRecords: 'Subscription records',
    back: 'Back',
    addEngine: 'Add engine',
    remove: 'Remove',
    searchEngines: 'Search engines',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

function normalizeLocale(input) {
  if (!input) return 'zh';
  const v = String(input).trim();
  if (!v) return 'zh';
  const lower = v.toLowerCase();

  if (lower === 'zh' || lower.startsWith('zh-')) return 'zh';
  if (lower === 'en' || lower.startsWith('en-')) return 'en';

  if (Object.prototype.hasOwnProperty.call(translations, lower)) return lower;
  return 'zh';
}

// Global variable for search engine pagination
let enginePageState = {
  page: 1,
  pageSize: 12,
  selectedIds: []
};

function getLangFromUrl() {
  try {
    const url = new URL(window.location.href);
    const lang = url.searchParams.get('lang');
    return lang ? normalizeLocale(lang) : null;
  } catch {
    return null;
  }
}

function getBrowserLocale() {
  return normalizeLocale(navigator.language || navigator.userLanguage || 'zh');
}

function getInitialLocale() {
  const urlLang = getLangFromUrl();
  if (urlLang) return urlLang;
  const saved = localStorage.getItem('locale');
  if (saved) return normalizeLocale(saved);
  return getBrowserLocale();
}

function validateTranslations(baseLocale = 'zh') {
  const base = translations[baseLocale] || {};
  Object.keys(translations).forEach((locale) => {
    if (locale === baseLocale) return;
    const dict = translations[locale] || {};
    const missing = Object.keys(base).filter(k => !(k in dict));
    if (missing.length > 0) {
      console.warn(`[i18n] Missing keys in ${locale}:`, missing);
    }
  });
}

validateTranslations('zh');

const i18n = {
  currentLocale: getInitialLocale(),

  t(key) {
    return translations[this.currentLocale][key] || key;
  },

  setLocale(locale, syncToBackend = true) {
    const normalized = normalizeLocale(locale);
    this.currentLocale = normalized;
    localStorage.setItem('locale', normalized);
    updateAllText();
    updateTime(); // Update date format when language changes

    if (syncToBackend && window.authState && window.authState.isLoggedIn) {
      if (window.markHomeConfigUpdated) {
        window.markHomeConfigUpdated();
      } else if (window.saveUserDataToBackend) {
        window.saveUserDataToBackend();
      }
    }
  },

  toggleLocale() {
    const newLocale = this.currentLocale === 'zh' ? 'en' : 'zh';
    this.setLocale(newLocale);
  }
};

// Update all text elements with current locale
window.updateAllText = function () {
  // Update search input placeholder
  searchInput.placeholder = i18n.t('search');

  // Update modal title
  const modalTitle = document.getElementById('addModalTitle');
  if (modalTitle) modalTitle.textContent = i18n.t('addNewTitle');

  // Update modal type switch labels
  const typeLabel1 = document.getElementById('typeLabel1');
  const typeLabel2 = document.getElementById('typeLabel2');
  if (typeLabel1) typeLabel1.textContent = i18n.t('site');
  if (typeLabel2) typeLabel2.textContent = i18n.t('tag');

  // Update section labels
  const nameLabel = document.getElementById('nameLabel');
  const urlLabel = document.getElementById('urlLabel');
  const selectTagsLabel = document.getElementById('selectTagsLabel');
  const tagNameLabel = document.getElementById('tagNameLabel');
  if (nameLabel) nameLabel.textContent = i18n.t('name');
  if (urlLabel) urlLabel.textContent = i18n.t('url');
  if (selectTagsLabel) selectTagsLabel.textContent = i18n.t('selectTags');
  if (tagNameLabel) tagNameLabel.textContent = i18n.t('tagName');

  // Update input placeholders
  document.getElementById('siteName').placeholder = i18n.t('name');
  document.getElementById('siteUrl').placeholder = i18n.t('urlPlaceholder');
  document.getElementById('tagName').placeholder = i18n.t('tagName');

  // Update checkbox label
  const pinToHomeLabel = document.getElementById('pinToHomeLabel');
  if (pinToHomeLabel) pinToHomeLabel.textContent = i18n.t('pinToHome');

  // Update modal buttons
  document.getElementById('closeAddModal').textContent = i18n.t('cancel');
  document.getElementById('saveItem').textContent = i18n.t('save');
  document.getElementById('closeTagModal').textContent = i18n.t('cancel');

  // Update time and date display
  updateTime();

  // Update settings menu text
  const themeText = document.getElementById('themeText');
  const langText = document.getElementById('langText');
  const minimalistText = document.getElementById('minimalistText');
  const wallpaperText = document.getElementById('wallpaperText');

  if (themeText) {
    themeText.textContent = document.body.classList.contains('dark') ? i18n.t('lightMode') : i18n.t('darkMode');
  }

  if (langText) {
    langText.textContent = i18n.t('language');
  }

  if (minimalistText) {
    minimalistText.textContent = state.viewMode === 'general' ? i18n.t('minimalist') : i18n.t('general');
  }

  if (wallpaperText) {
    wallpaperText.textContent = i18n.t('wallpaper');
  }

  // Auth UI logic: update the auth container handled by auth.js but ensure we call it
  // Ensure auth UI is updated
  if (window.updateAuthUI) {
    window.updateAuthUI();
  }

  // Login Modal Title
  const googleSignInTitle = document.getElementById('googleSignInTitle');
  const closeGoogleSignIn = document.getElementById('closeGoogleSignIn');
  const googleLoginBtnText = document.getElementById('googleLoginBtnText');
  if (googleSignInTitle) {
    googleSignInTitle.textContent = i18n.t('googleSignIn');
  }
  if (closeGoogleSignIn) {
    closeGoogleSignIn.textContent = i18n.t('cancel');
  }
  if (googleLoginBtnText) {
    googleLoginBtnText.textContent = i18n.t('googleLoginButton');
  }

  // Update wallpaper modal translation
  const landscapeTabText = document.getElementById('landscapeTabText');
  const solidTabText = document.getElementById('solidTabText');
  const dailyTabText = document.getElementById('dailyTabText');
  const wallpaperModalTitle = document.getElementById('wallpaperModalTitle');
  const closeWallpaperModal = document.getElementById('closeWallpaperModal');
  const restoreWallpaperBtn = document.getElementById('restoreDefaultWallpaper');
  const saveWallpaperBtn = document.getElementById('saveWallpaperSelection');

  if (landscapeTabText) landscapeTabText.textContent = i18n.t('landscape');
  if (solidTabText) solidTabText.textContent = i18n.t('solid');
  if (dailyTabText) dailyTabText.textContent = i18n.t('daily');
  if (wallpaperModalTitle) wallpaperModalTitle.textContent = i18n.t('wallpaperTitle');
  if (closeWallpaperModal) closeWallpaperModal.textContent = i18n.t('cancel');
  if (restoreWallpaperBtn) restoreWallpaperBtn.textContent = i18n.t('restoreDefault');
  if (saveWallpaperBtn) saveWallpaperBtn.textContent = i18n.t('save');

  // Update Profile Modal
  const userProfileTitle = document.getElementById('userProfileTitle');
  const closeUserProfile = document.getElementById('closeUserProfile');

  if (userProfileTitle) userProfileTitle.textContent = i18n.t('userProfile');
  if (closeUserProfile) closeUserProfile.textContent = i18n.t('cancel');
  if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').textContent = i18n.t('logout');
  }

  // Update Theme Customization button
  const themeCustomizationText = document.getElementById('themeCustomizationText');
  if (themeCustomizationText) themeCustomizationText.textContent = i18n.t('themeCustomization');

  // Update About menu and modals
  const aboutText = document.getElementById('aboutText');
  if (aboutText) aboutText.textContent = i18n.t('about');

  const aboutModalTitle = document.getElementById('aboutModalTitle');
  if (aboutModalTitle) aboutModalTitle.textContent = i18n.t('aboutTitle');

  const aboutDesc = document.getElementById('aboutDesc');
  if (aboutDesc) aboutDesc.textContent = i18n.t('aboutDesc');

  const officialWebsiteLink = document.getElementById('officialWebsiteLink');
  if (officialWebsiteLink) officialWebsiteLink.textContent = i18n.t('officialWebsite');

  const aboutCloseBtn = document.getElementById('aboutCloseBtn');
  if (aboutCloseBtn) aboutCloseBtn.textContent = i18n.t('close');

  const coffeeBtn = document.getElementById('coffeeBtn');
  if (coffeeBtn) coffeeBtn.textContent = i18n.t('buyMeCoffee');

  const feedbackBtn = document.getElementById('feedbackBtn');
  if (feedbackBtn) feedbackBtn.textContent = i18n.t('feedback');

  const coffeeTitle = document.getElementById('coffeeTitle');
  if (coffeeTitle) coffeeTitle.textContent = i18n.t('buyMeCoffee');

  const coffeeDesc = document.getElementById('coffeeDesc');
  if (coffeeDesc) coffeeDesc.textContent = i18n.t('coffeeDesc');

  const feedbackTitle = document.getElementById('feedbackTitle');
  if (feedbackTitle) feedbackTitle.textContent = i18n.t('feedback');

  const feedbackTypeLabel = document.getElementById('feedbackTypeLabel');
  if (feedbackTypeLabel) feedbackTypeLabel.textContent = i18n.t('feedbackType');

  const feedbackContentLabel = document.getElementById('feedbackContentLabel');
  if (feedbackContentLabel) feedbackContentLabel.textContent = i18n.t('feedbackContent');

  const feedbackEmailLabel = document.getElementById('feedbackEmailLabel');
  if (feedbackEmailLabel) feedbackEmailLabel.textContent = i18n.t('feedbackEmail');

  const feedbackContent = document.getElementById('feedbackContent');
  if (feedbackContent) feedbackContent.placeholder = i18n.t('feedbackPlaceholder');

  const coffeeCustomAmount = document.getElementById('coffeeCustomAmount');
  if (coffeeCustomAmount) coffeeCustomAmount.placeholder = i18n.t('customAmount');

  // Update right-click context menu
  const ctxAddSite = document.getElementById('ctxAddSite');
  if (ctxAddSite) ctxAddSite.textContent = i18n.t('addSite');

  const ctxAddTag = document.getElementById('ctxAddTag');
  if (ctxAddTag) ctxAddTag.textContent = i18n.t('addTag');

  const ctxWallpaper = document.getElementById('ctxWallpaper');
  if (ctxWallpaper) ctxWallpaper.textContent = i18n.t('changeWallpaper');

  // Update coffee modal buttons
  const coffeeCancelBtn = document.getElementById('coffeeCancelBtn');
  if (coffeeCancelBtn) coffeeCancelBtn.textContent = i18n.t('cancel');

  const coffeePayBtn = document.getElementById('coffeePayBtn');
  if (coffeePayBtn) coffeePayBtn.textContent = i18n.t('pay');

  // Update feedback modal buttons
  const feedbackCancelBtn = document.getElementById('feedbackCancelBtn');
  if (feedbackCancelBtn) feedbackCancelBtn.textContent = i18n.t('cancel');

  const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
  if (submitFeedbackBtn) submitFeedbackBtn.textContent = i18n.t('submit');

  // Update feedback type options
  const feedbackTypeSelect = document.getElementById('feedbackType');
  if (feedbackTypeSelect) {
    const options = feedbackTypeSelect.options;
    if (options[0]) options[0].textContent = i18n.t('feedbackTypeBug');
    if (options[1]) options[1].textContent = i18n.t('feedbackTypeFeature');
    if (options[2]) options[2].textContent = i18n.t('feedbackTypeOther');
  }

  // Subscription records modal
  const recordsTitle = document.getElementById('subscriptionRecordsTitle');
  if (recordsTitle) recordsTitle.textContent = i18n.t('subscriptionRecords');
  const backBtn = document.getElementById('backToUserProfile');
  if (backBtn) backBtn.textContent = i18n.t('back');
  const closeRecordsBtn = document.getElementById('closeSubscriptionRecords');
  if (closeRecordsBtn) closeRecordsBtn.textContent = i18n.t('close');

  // Re-render content to update any dynamic text
  renderHome();
  renderHomeFooter();

  // Search engine menu contains localized names
  renderSearchEngine();

  // Engine modal
  const engineModalTitle = document.getElementById('engineModalTitle');
  if (engineModalTitle) engineModalTitle.textContent = i18n.t('searchEngines');
  const closeEngineModalBtn = document.getElementById('closeEngineModal');
  if (closeEngineModalBtn) closeEngineModalBtn.textContent = i18n.t('close');
  const saveEngineSelectionBtn = document.getElementById('saveEngineSelection');
  if (saveEngineSelectionBtn) saveEngineSelectionBtn.textContent = i18n.t('save');
}

// ===== Data & State =====
let ENGINE_CATALOG = [
  // Global / General
  { id: 'google', name: { zh: '谷歌', en: 'Google' }, url: 'https://www.google.com/search?q=', icon: 'https://www.google.com/favicon.ico' },
  { id: 'bing', name: { zh: '必应', en: 'Bing' }, url: 'https://www.bing.com/search?q=', icon: 'https://www.bing.com/favicon.ico' },
  { id: 'duckduckgo', name: { zh: 'DuckDuckGo', en: 'DuckDuckGo' }, url: 'https://duckduckgo.com/?q=', icon: 'https://duckduckgo.com/favicon.ico' },
  { id: 'yahoo', name: { zh: '雅虎', en: 'Yahoo' }, url: 'https://search.yahoo.com/search?p=', icon: 'https://search.yahoo.com/favicon.ico' },
  { id: 'yandex', name: { zh: 'Yandex', en: 'Yandex' }, url: 'https://yandex.com/search/?text=', icon: 'https://yandex.com/favicon.ico' },
  { id: 'ecosia', name: { zh: 'Ecosia', en: 'Ecosia' }, url: 'https://www.ecosia.org/search?q=', icon: 'https://www.ecosia.org/favicon.ico' },
  { id: 'brave', name: { zh: 'Brave', en: 'Brave' }, url: 'https://search.brave.com/search?q=', icon: 'https://brave.com/static-assets/images/brave-logo-sans-text.svg' },
  { id: 'startpage', name: { zh: 'Startpage', en: 'Startpage' }, url: 'https://www.startpage.com/sp/search?query=', icon: 'https://www.startpage.com/favicon.ico' },

  // Chinese Specific
  { id: 'baidu', name: { zh: '百度', en: 'Baidu' }, url: 'https://www.baidu.com/s?wd=', icon: 'https://www.baidu.com/favicon.ico' },
  { id: 'sogou', name: { zh: '搜狗', en: 'Sogou' }, url: 'https://www.sogou.com/web?query=', icon: 'https://www.sogou.com/favicon.ico' },
  { id: 'so360', name: { zh: '360 搜索', en: '360 Search' }, url: 'https://www.so.com/s?q=', icon: 'https://www.so.com/favicon.ico' },
  { id: 'zhihu', name: { zh: '知乎', en: 'Zhihu' }, url: 'https://www.zhihu.com/search?q=', icon: 'https://static.zhihu.com/heifetz/favicon.ico' },
  { id: 'bilibili', name: { zh: 'B站', en: 'Bilibili' }, url: 'https://search.bilibili.com/all?keyword=', icon: 'https://www.bilibili.com/favicon.ico' },
  { id: 'xiaohongshu', name: { zh: '小红书', en: 'Xiaohongshu' }, url: 'https://www.xiaohongshu.com/search_result?keyword=', icon: 'https://www.xiaohongshu.com/favicon.ico' },
  { id: 'weibo', name: { zh: '微博', en: 'Weibo' }, url: 'https://s.weibo.com/weibo?q=', icon: 'https://weibo.com/favicon.ico' },
  { id: 'douban', name: { zh: '豆瓣', en: 'Douban' }, url: 'https://www.douban.com/search?q=', icon: 'https://img3.doubanio.com/favicon.ico' },

  // Dev / Tech
  { id: 'github', name: { zh: 'GitHub', en: 'GitHub' }, url: 'https://github.com/search?q=', icon: 'https://github.com/favicon.ico' },
  { id: 'stackoverflow', name: { zh: 'StackOverflow', en: 'StackOverflow' }, url: 'https://stackoverflow.com/search?q=', icon: 'https://stackoverflow.com/favicon.ico' },
  { id: 'npm', name: { zh: 'NPM', en: 'NPM' }, url: 'https://www.npmjs.com/search?q=', icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png' },
  { id: 'mdn', name: { zh: 'MDN', en: 'MDN' }, url: 'https://developer.mozilla.org/search?q=', icon: 'https://developer.mozilla.org/favicon.ico' },

  // Social / Media
  { id: 'youtube', name: { zh: 'YouTube', en: 'YouTube' }, url: 'https://www.youtube.com/results?search_query=', icon: 'https://www.youtube.com/favicon.ico' },
  { id: 'twitter', name: { zh: 'Twitter', en: 'Twitter' }, url: 'https://twitter.com/search?q=', icon: 'https://abs.twimg.com/favicons/twitter.2.ico' },
  { id: 'reddit', name: { zh: 'Reddit', en: 'Reddit' }, url: 'https://www.reddit.com/search/?q=', icon: 'https://www.reddit.com/favicon.ico' },
  { id: 'pinterest', name: { zh: 'Pinterest', en: 'Pinterest' }, url: 'https://www.pinterest.com/search/pins/?q=', icon: 'https://www.pinterest.com/favicon.ico' },
  { id: 'instagram', name: { zh: 'Instagram', en: 'Instagram' }, url: 'https://www.instagram.com/explore/tags/', icon: 'https://www.instagram.com/favicon.ico' },

  // Knowledge
  { id: 'wikipedia', name: { zh: '维基百科', en: 'Wikipedia' }, url: 'https://en.wikipedia.org/wiki/Special:Search?search=', icon: 'https://en.wikipedia.org/favicon.ico' },
  { id: 'scholar', name: { zh: '学术搜索', en: 'Scholar' }, url: 'https://scholar.google.com/scholar?q=', icon: 'https://scholar.google.com/favicon.ico' },

  // Shopping
  { id: 'amazon', name: { zh: '亚马逊', en: 'Amazon' }, url: 'https://www.amazon.com/s?k=', icon: 'https://www.amazon.com/favicon.ico' },
  { id: 'taobao', name: { zh: '淘宝', en: 'Taobao' }, url: 'https://s.taobao.com/search?q=', icon: 'https://www.taobao.com/favicon.ico' },
  { id: 'jd', name: { zh: '京东', en: 'JD' }, url: 'https://search.jd.com/Search?keyword=', icon: 'https://www.jd.com/favicon.ico' },

];

const DEFAULT_ENGINE_IDS = ['google', 'bing', 'baidu', 'xiaohongshu'];

function getEngineName(engine) {
  const lang = (typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh') === 'en' ? 'en' : 'zh';
  return engine?.name?.[lang] || engine?.name?.en || engine?.id || '';
}

function reconcileEngineStateAfterCatalogLoad() {
  const exists = (id) => ENGINE_CATALOG.some((e) => e.id === id);
  const prevEnabled = Array.isArray(state.enabledEngineIds) ? state.enabledEngineIds : [];
  let nextEnabled = prevEnabled.filter((id) => exists(id));

  if (!nextEnabled.length) {
    nextEnabled = DEFAULT_ENGINE_IDS.filter((id) => exists(id)).slice(0, 5);
  }

  if (!nextEnabled.length && ENGINE_CATALOG.length) {
    nextEnabled = [ENGINE_CATALOG[0].id];
  }

  state.enabledEngineIds = nextEnabled.slice(0, 5);

  if (!state.enabledEngineIds.includes(state.engineId) && state.enabledEngineIds.length) {
    state.engineId = state.enabledEngineIds[0];
    state.engineIndex = 0;
  } else {
    const enabled = getEnabledEngines(state.enabledEngineIds);
    const idx = enabled.findIndex((e) => e.id === state.engineId);
    state.engineIndex = idx >= 0 ? idx : 0;
  }

  saveData(false);
}

async function loadGlobalEngineCatalog() {
  if (!window.supabase) return false;

  try {
    const { data, error } = await window.supabase
      .from('search_engines')
      .select('id,name_en,name_zh,url,icon,is_active,sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Failed to load global search engines:', error);
      return false;
    }

    const rows = Array.isArray(data) ? data : [];
    const list = rows
      .filter((r) => r && r.id && r.url)
      .filter((r) => r.is_active !== false)
      .map((r) => ({
        id: String(r.id),
        name: {
          zh: String(r.name_zh || r.name_en || r.id),
          en: String(r.name_en || r.name_zh || r.id)
        },
        url: String(r.url),
        icon: String(r.icon || 'https://www.google.com/favicon.ico')
      }));

    if (!list.length) return false;
    ENGINE_CATALOG = list;
    return true;
  } catch (err) {
    console.warn('Failed to load global search engines:', err);
    return false;
  }
}

async function logSearchQueryToSupabase(query, engine) {
  if (!window.supabase) return;
  if (!window.authState || !window.authState.isLoggedIn || !window.authState.user) return;

  const userId = window.authState.user.id;
  if (!userId) return;

  const locale = (typeof i18n !== 'undefined' ? i18n.currentLocale : (localStorage.getItem('locale') || 'zh'));
  const payload = {
    user_id: userId,
    query: String(query || ''),
    engine_id: String(engine?.id || ''),
    engine_url: String(engine?.url || ''),
    locale: String(locale || 'zh')
  };

  try {
    const insertPromise = window.supabase.from('search_logs').insert(payload);
    const res = await Promise.race([
      insertPromise,
      new Promise((resolve) => setTimeout(() => resolve(null), 350))
    ]);
    if (res && res.error) {
      console.warn('Failed to log search:', res.error);
    }
  } catch (err) {
    console.warn('Failed to log search:', err);
  }
}

function loadEnabledEngineIds() {
  try {
    const raw = localStorage.getItem('enabledEngineIds');
    const parsed = raw ? JSON.parse(raw) : null;
    const list = Array.isArray(parsed) ? parsed.filter((id) => ENGINE_CATALOG.some((e) => e.id === id)) : null;
    if (list && list.length) return list.slice(0, 5);
  } catch {
  }
  return [...DEFAULT_ENGINE_IDS].slice(0, 5);
}

function saveEnabledEngineIds(ids) {
  localStorage.setItem('enabledEngineIds', JSON.stringify(ids));
}

function getEnabledEngines(ids) {
  return ids.map((id) => ENGINE_CATALOG.find((e) => e.id === id)).filter(Boolean);
}

function getCatalogAddableEngines(enabledIds) {
  const set = new Set(enabledIds);
  return ENGINE_CATALOG.filter((e) => !set.has(e.id));
}

let state = {
  engineIndex: parseInt(localStorage.getItem('engineIndex')) || 0,
  engineId: localStorage.getItem('engineId') || '',
  enabledEngineIds: loadEnabledEngineIds(),
  dateFormatIndex: parseInt(localStorage.getItem('dateFormatIndex')) || 0, // 0: YMD, 1: MDY, 2: DMY
  timeFormat: localStorage.getItem('timeFormat') || '24h', // '24h' or '12h'
  sites: JSON.parse(localStorage.getItem('sites')) || [],
  tags: JSON.parse(localStorage.getItem('tags')) || [],
  tagOrder: JSON.parse(localStorage.getItem('tagOrder')) || [],
  siteOrder: JSON.parse(localStorage.getItem('siteOrder')) || [],
  viewMode: localStorage.getItem('viewMode') || 'general', // 'general' or 'minimalist'
  currentTheme: localStorage.getItem('currentTheme') || 'handdrawn'
};

// Backward compatibility: map old engineIndex to new engineId on first run
if (!state.engineId) {
  const enabled = getEnabledEngines(state.enabledEngineIds);
  const fallback = enabled[state.engineIndex] || enabled[0] || ENGINE_CATALOG[0];
  if (fallback) {
    state.engineId = fallback.id;
    localStorage.setItem('engineId', state.engineId);
  }
}

function getCurrentEngine() {
  const enabled = getEnabledEngines(state.enabledEngineIds);
  const found = enabled.find((e) => e.id === state.engineId);
  return found || enabled[0] || ENGINE_CATALOG[0];
}

function generateUuid() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  // Fallback RFC4122 v4-ish
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isUuidLike(v) {
  return typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

function migrateLocalSiteIdsToUuid() {
  const idMap = new Map();
  let changed = false;

  state.sites = (state.sites || []).map((s) => {
    const currentId = s?.id;
    if (isUuidLike(currentId)) return s;

    const nextId = generateUuid();
    idMap.set(String(currentId), nextId);
    changed = true;
    return { ...s, id: nextId };
  });

  if (changed) {
    state.siteOrder = (state.siteOrder || []).map((id) => idMap.get(String(id)) || id);
    saveData(false);
  }
}

// Drag and drop state
const dragState = {
  draggedElement: null,
  draggedIndex: null,
  draggedType: null, // 'tag' or 'site'
  dropTarget: null
};

// Context menu state
const contextMenuState = {
  visible: false,
  targetItem: null,
  targetType: null, // 'tag' or 'site'
  x: 0,
  y: 0
};

// Migrate old data if exists
const oldLinks = JSON.parse(localStorage.getItem('links'));
if (oldLinks && oldLinks.length > 0 && state.sites.length === 0) {
  state.sites = oldLinks.map(link => ({
    id: Date.now() + Math.random(),
    name: link.name,
    url: link.url,
    tags: [],
    showOnHome: true
  }));
  localStorage.removeItem('links');
  saveData(false);
}

// Initialize default sites if empty (first visit)
if (state.sites.length === 0) {
  const defaultSites = [
    { name: 'GitHub', url: 'https://github.com', icon: 'https://github.com/favicon.ico' },
    { name: 'Google', url: 'https://google.com', icon: 'https://www.google.com/favicon.ico' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'https://www.youtube.com/favicon.ico' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'https://abs.twimg.com/favicons/twitter.2.ico' },
    { name: 'Gmail', url: 'https://mail.google.com', icon: 'https://ssl.gstatic.com/mail/ static/images/icons/versions/mail_favicon_2.png' }
  ];
  state.sites = defaultSites.map((s, i) => ({
    id: `default-${i}`,
    name: s.name,
    url: s.url,
    icon: s.icon,
    tags: [],
    showOnHome: true
  }));
  state.siteOrder = state.sites.map(s => s.id);
  saveData(false);
}

// Initialize order arrays if empty (data migration)
if (state.tagOrder.length === 0 && state.tags.length > 0) {
  state.tagOrder = [...state.tags];
}
if (state.siteOrder.length === 0 && state.sites.length > 0) {
  state.siteOrder = state.sites.map(s => s.id);
}

migrateLocalSiteIdsToUuid();

function saveData(syncToBackend = true) {
  localStorage.setItem('sites', JSON.stringify(state.sites));
  localStorage.setItem('tags', JSON.stringify(state.tags));
  localStorage.setItem('tagOrder', JSON.stringify(state.tagOrder));
  localStorage.setItem('siteOrder', JSON.stringify(state.siteOrder));
  localStorage.setItem('engineIndex', state.engineIndex);
  localStorage.setItem('engineId', state.engineId || '');
  saveEnabledEngineIds(state.enabledEngineIds || []);
  localStorage.setItem('dateFormatIndex', state.dateFormatIndex);
  localStorage.setItem('timeFormat', state.timeFormat);
  localStorage.setItem('viewMode', state.viewMode);
  localStorage.setItem('currentTheme', state.currentTheme || 'handdrawn');

  if (syncToBackend && window.authState && window.authState.isLoggedIn) {
    if (window.markHomeConfigUpdated) {
      window.markHomeConfigUpdated();
    } else if (window.saveUserDataToBackend) {
      window.saveUserDataToBackend();
    }
  }
}

function toggleMinimalist() {
  state.viewMode = state.viewMode === 'general' ? 'minimalist' : 'general';
  saveData();
  renderHome();
  updateAllText();
}

// ===== DOM Elements =====
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchEngineEl = document.getElementById('searchEngine');
const engineIcon = document.getElementById('engineIcon');
const engineMenu = document.getElementById('engineMenu');
const contentEl = document.getElementById('content');
const settingsToggle = document.getElementById('settingsToggle');
const settingsMenu = document.getElementById('settingsMenu');

// Modals
const modalOverlay = document.getElementById('modalOverlay');
const addModal = document.getElementById('addModal');
const tagViewModal = document.getElementById('tagViewModal');
const closeAddModalBtn = document.getElementById('closeAddModal');
const closeTagModalBtn = document.getElementById('closeTagModal');
const saveItemBtn = document.getElementById('saveItem');
const addTypeRadios = document.getElementsByName('addType');
const siteForm = document.getElementById('siteForm');
const tagForm = document.getElementById('tagForm');

// Context Menu
const contextMenu = document.getElementById('contextMenu');

// ===== Time & Date =====
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Time format logic
  if (state.timeFormat === '12h') {
    const hour12 = now.getHours() % 12 || 12;
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    timeEl.textContent = `${hour12}:${minutes} ${ampm}`;
  } else {
    timeEl.textContent = `${hours}:${minutes}`;
  }

  // Date Logic - use i18n for days and months
  const DAYS = i18n.t('days');
  const MONTHS = i18n.t('months');

  const dayName = DAYS[now.getDay()];
  const y = now.getFullYear();
  const m = now.getMonth() + 1; // numeric
  const mStr = MONTHS[now.getMonth()];
  const d = now.getDate();

  let dateStr = '';

  // Chinese mode: fixed format "YYYY年MM月DD日 星期X"
  if (i18n.currentLocale === 'zh') {
    dateStr = `${y}年${String(m).padStart(2, '0')}月${String(d).padStart(2, '0')}日 ${dayName}`;
  }
  // English mode: support format switching
  else {
    // 0: YMD (2024-01-20 Saturday)
    if (state.dateFormatIndex === 0) {
      dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} ${dayName}`;
    }
    // 1: MDY (Jan 20, 2024 Saturday)
    else if (state.dateFormatIndex === 1) {
      dateStr = `${mStr} ${d}, ${y} ${dayName}`;
    }
    // 2: DMY (20 Jan 2024 Saturday)
    else {
      dateStr = `${d} ${mStr} ${y} ${dayName}`;
    }
  }

  dateEl.textContent = dateStr;
}

dateEl.addEventListener('click', () => {
  // Only allow format switching in English mode
  if (i18n.currentLocale === 'en') {
    state.dateFormatIndex = (state.dateFormatIndex + 1) % 3;
    saveData();
    updateTime();
  }
});

// Time format toggle
timeEl.addEventListener('click', () => {
  state.timeFormat = state.timeFormat === '24h' ? '12h' : '24h';
  localStorage.setItem('timeFormat', state.timeFormat);
  saveData();
  updateTime();
});

setInterval(updateTime, 1000);
updateTime();

// ===== Search Engine =====
function renderSearchEngine() {
  const enabledIds = state.enabledEngineIds || [];
  const enabled = getEnabledEngines(enabledIds);
  const engine = getCurrentEngine();

  engineIcon.src = engine.icon;
  engineIcon.onerror = () => { engineIcon.src = 'https://www.google.com/favicon.ico'; };

  const addable = getCatalogAddableEngines(enabledIds);
  const addLabel = i18n.t('addEngine');
  const removeLabel = i18n.t('remove');

  engineMenu.innerHTML = `
    <div class="engine-menu-section">
      ${enabled.map((eng) => {
    const name = getEngineName(eng);
    const isCurrent = eng.id === engine.id;
    return `
          <div class="engine-option ${isCurrent ? 'active' : ''}" data-engine-id="${eng.id}">
            <div class="engine-option-main" onclick="selectEngineById('${eng.id}')">
              <img src="${eng.icon}" alt="${name}" onerror="this.src='https://www.google.com/favicon.ico'">
              <span>${name}</span>
            </div>
            ${enabled.length > 1 ? `
              <button class="engine-remove" type="button" title="${removeLabel}" onclick="removeEngineById('${eng.id}')">×</button>
            ` : ''}
          </div>
        `;
  }).join('')}
    </div>

    <div class="engine-menu-divider"></div>
    <div class="engine-add">
      <button class="engine-add-btn" type="button" onclick="openEngineModal()">+ ${addLabel}</button>
    </div>
  `;
}

// ===== Search Engine Quick List (Bottom) =====
function renderEngineQuickList() {
  const quickListEl = document.getElementById('engineQuickList');
  if (!quickListEl) return;
  
  // Default quick engines: Google, Bing, DuckDuckGo
  const quickEngineIds = ['google', 'bing', 'duckduckgo'];
  const currentEngine = getCurrentEngine();
  const lang = (typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh') === 'en' ? 'en' : 'zh';
  
  quickListEl.innerHTML = quickEngineIds.map(id => {
    const engine = ENGINE_CATALOG.find(e => e.id === id);
    if (!engine) return '';
    const name = engine.name?.[lang] || engine.name?.en || engine.id;
    const isActive = engine.id === currentEngine.id;
    return `
      <div class="engine-quick-item ${isActive ? 'active' : ''}" onclick="selectEngineById('${engine.id}')" title="${name}">
        <img src="${engine.icon}" alt="${name}" onerror="this.src='https://www.google.com/favicon.ico'">
        <span>${name}</span>
      </div>
    `;
  }).join('');
}

// ===== Search Engine Modal Logic =====

function openEngineModal() {
  const engineModal = document.getElementById('engineModal');
  if (!engineModal) return;
  engineModal.classList.remove('hidden');

  // Ensure the shared overlay is not blocking clicks
  document.getElementById('modalOverlay')?.classList.add('hidden');

  // Localize modal title/buttons on open
  const engineModalTitle = document.getElementById('engineModalTitle');
  if (engineModalTitle && typeof i18n !== 'undefined') engineModalTitle.textContent = i18n.t('searchEngines');
  const closeEngineModalBtn = document.getElementById('closeEngineModal');
  if (closeEngineModalBtn && typeof i18n !== 'undefined') closeEngineModalBtn.textContent = i18n.t('close');
  const saveEngineSelectionBtn = document.getElementById('saveEngineSelection');
  if (saveEngineSelectionBtn && typeof i18n !== 'undefined') saveEngineSelectionBtn.textContent = i18n.t('save');

  // Clone current enabled IDs to working state
  enginePageState.selectedIds = [...(state.enabledEngineIds || [])];
  enginePageState.page = 1;

  renderEngineModal();
}

function closeEngineModal() {
  document.getElementById('engineModal').classList.add('hidden');

  // Defensive: old versions also opened the shared modal overlay
  document.getElementById('modalOverlay')?.classList.add('hidden');
}

function toggleEngineSelection(id) {
  const index = enginePageState.selectedIds.indexOf(id);
  if (index > -1) {
    // Deselect
    enginePageState.selectedIds.splice(index, 1);
  } else {
    // Select
    if (enginePageState.selectedIds.length >= 5) {
      const msg = i18n.currentLocale === 'zh' ? '最多只能选择 5 个搜索引擎' : 'You can select up to 5 search engines';
      if (window.showNotification) window.showNotification(msg, 'info');
      return;
    }
    enginePageState.selectedIds.push(id);
  }
  renderEngineModal();
}

function setEnginePage(p) {
  enginePageState.page = p;
  renderEngineModal();
}

function renderEngineModal() {
  const grid = document.getElementById('engineList');
  const pag = document.getElementById('enginePagination');
  const hint = document.getElementById('engineCountHint');

  const total = ENGINE_CATALOG.length;
  const totalPages = Math.ceil(total / enginePageState.pageSize);

  // Ensure page validity
  if (enginePageState.page < 1) enginePageState.page = 1;
  if (enginePageState.page > totalPages) enginePageState.page = totalPages;

  const start = (enginePageState.page - 1) * enginePageState.pageSize;
  const end = start + enginePageState.pageSize;
  const items = ENGINE_CATALOG.slice(start, end);

  grid.innerHTML = items.map(eng => {
    const isSelected = enginePageState.selectedIds.includes(eng.id);
    const name = getEngineName(eng);
    return `
      <div class="engine-item ${isSelected ? 'selected' : ''}" onclick="toggleEngineSelection('${eng.id}')">
        <div class="engine-check">✓</div>
        <img src="${eng.icon}" onerror="this.src='https://www.google.com/favicon.ico'">
        <span>${name}</span>
      </div>
    `;
  }).join('');

  // Pagination
  let pageHtml = `
    <button class="page-btn" ${enginePageState.page === 1 ? 'disabled' : ''} onclick="setEnginePage(${enginePageState.page - 1})">‹</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, current, and surrounding
    if (i === 1 || i === totalPages || (i >= enginePageState.page - 1 && i <= enginePageState.page + 1)) {
      pageHtml += `<button class="page-btn ${i === enginePageState.page ? 'active' : ''}" onclick="setEnginePage(${i})">${i}</button>`;
    } else if (i === enginePageState.page - 2 || i === enginePageState.page + 2) {
      pageHtml += `<span style="opacity:0.5">...</span>`;
    }
  }

  pageHtml += `
    <button class="page-btn" ${enginePageState.page === totalPages ? 'disabled' : ''} onclick="setEnginePage(${enginePageState.page + 1})">›</button>
  `;

  pag.innerHTML = pageHtml;

  // Hint text
  const count = enginePageState.selectedIds.length;
  const text = i18n.currentLocale === 'zh'
    ? `已选 ${count}/5`
    : `Selected ${count}/5`;
  hint.textContent = text;
}

// Bind events
document.getElementById('closeEngineModal').onclick = closeEngineModal;
document.getElementById('saveEngineSelection').onclick = () => {
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  if (enginePageState.selectedIds.length === 0) {
    // Prevent empty selection? logic says at least one
    // Fallback to default if empty
    enginePageState.selectedIds = [...DEFAULT_ENGINE_IDS];
  }

  state.enabledEngineIds = [...enginePageState.selectedIds].slice(0, 5);
  saveData();

  // Ensure current engine is still valid
  if (!state.enabledEngineIds.includes(state.engineId)) {
    state.engineId = state.enabledEngineIds[0];
    saveData();
  }

  renderSearchEngine();
  renderEngineQuickList();
  closeEngineModal();
};

window.selectEngineById = (id) => {
  const enabled = getEnabledEngines(state.enabledEngineIds || []);
  const idx = enabled.findIndex((e) => e.id === id);
  if (idx < 0) return;
  state.engineId = id;
  state.engineIndex = idx;
  if (window.authState && window.authState.isLoggedIn) {
    saveData();
  }
  renderSearchEngine();
  renderEngineQuickList();
  engineMenu.classList.add('hidden');
};

window.toggleEngineAddMenu = () => {
  const el = document.getElementById('engineAddMenu');
  if (!el) return;
  el.classList.toggle('hidden');
};

window.addEngineById = (id) => {
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  if (!ENGINE_CATALOG.some((e) => e.id === id)) return;
  const set = new Set(state.enabledEngineIds || []);
  if (set.has(id)) return;
  if ((state.enabledEngineIds || []).length >= 5) {
    const msg = i18n.currentLocale === 'zh' ? '最多只能选择 5 个搜索引擎' : 'You can select up to 5 search engines';
    if (window.showNotification) window.showNotification(msg, 'info');
    return;
  }
  state.enabledEngineIds = [...(state.enabledEngineIds || []), id].slice(0, 5);
  saveData();
  renderSearchEngine();
};

window.removeEngineById = (id) => {
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  const current = String(state.engineId || '');
  const list = (state.enabledEngineIds || []).filter((x) => x !== id);
  if (list.length < 1) return;
  state.enabledEngineIds = list;
  if (current === id) {
    const nextEngine = getEnabledEngines(list)[0];
    if (nextEngine) {
      state.engineId = nextEngine.id;
      state.engineIndex = 0;
    }
  } else {
    const enabled = getEnabledEngines(list);
    const idx = enabled.findIndex((e) => e.id === state.engineId);
    state.engineIndex = idx >= 0 ? idx : 0;
  }
  saveData();
  renderSearchEngine();
  renderEngineQuickList();
};

searchEngineEl.addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target && e.target.closest && e.target.closest('#engineMenu')) {
    return;
  }
  engineMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  engineMenu.classList.add('hidden');
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  const engine = getCurrentEngine();
  (async () => {
    await logSearchQueryToSupabase(query, engine);
    window.location.href = engine.url + encodeURIComponent(query);
  })();
});

renderSearchEngine();

(async () => {
  const ok = await loadGlobalEngineCatalog();
  if (ok) {
    reconcileEngineStateAfterCatalogLoad();
    renderSearchEngine();
  }
})();

let homeFooterConfig = null;

async function loadHomeFooterConfig() {
  if (!window.supabase) {
    homeFooterConfig = null;
    return false;
  }

  try {
    const { data, error } = await window.supabase
      .from('app_settings')
      .select('key,value')
      .eq('key', 'home_footer')
      .maybeSingle();

    if (error) {
      console.warn('Failed to load home footer config:', error);
      homeFooterConfig = null;
      return false;
    }

    const v = data?.value;
    if (!v || typeof v !== 'object') {
      homeFooterConfig = null;
      return false;
    }

    homeFooterConfig = v;
    return true;
  } catch (err) {
    console.warn('Failed to load home footer config:', err);
    homeFooterConfig = null;
    return false;
  }
}

function renderHomeFooter() {
  const el = document.getElementById('homeFooter');
  if (!el) return;

  const cfg = homeFooterConfig;
  if (!cfg) {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }

  const locale = (typeof i18n !== 'undefined' ? i18n.currentLocale : (localStorage.getItem('locale') || 'zh'));
  const text = String((locale === 'en' ? cfg.text_en : cfg.text_zh) || cfg.text_en || cfg.text_zh || '').trim();
  const url = String(cfg.url || '').trim();

  if (!text) {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }

  if (url) {
    el.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  } else {
    el.textContent = text;
  }
  el.style.display = 'block';
}

(async () => {
  await loadHomeFooterConfig();
  renderHomeFooter();
})();

// ===== Context Menu Functions =====
function showContextMenu(event, item, type) {
  event.preventDefault();
  event.stopPropagation();
  contextMenuState.visible = true;
  contextMenuState.targetItem = item;
  contextMenuState.targetType = type;
  contextMenuState.x = event.clientX;
  contextMenuState.y = event.clientY;
  renderContextMenu();
}

function hideContextMenu() {
  contextMenuState.visible = false;
  contextMenu.classList.add('hidden');
}

function renderContextMenu() {
  contextMenu.innerHTML = `
    <div class="context-menu-item" onclick="editItem()">
      ${i18n.t('edit') || 'Edit'}
    </div>
    <div class="context-menu-item" onclick="deleteItem()">
      ${i18n.t('delete')}
    </div>
  `;

  contextMenu.style.left = contextMenuState.x + 'px';
  contextMenu.style.top = contextMenuState.y + 'px';
  contextMenu.classList.remove('hidden');
}

window.editItem = function () {
  const item = contextMenuState.targetItem;
  const type = contextMenuState.targetType;

  // Reset form
  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
  document.getElementById('tagName').value = '';

  if (type === 'site') {
    // Set form to site type
    document.querySelector('input[name="addType"][value="site"]').checked = true;
    document.getElementById('siteForm').classList.remove('hidden');
    document.getElementById('tagForm').classList.add('hidden');

    // Pre-fill site data
    document.getElementById('siteName').value = item.name;
    document.getElementById('siteUrl').value = item.url;
    document.getElementById('showOnHome').checked = item.showOnHome;

    // Render tag checkboxes
    const tagSelector = document.getElementById('tagSelector');
    tagSelector.innerHTML = '';
    state.tags.forEach(tag => {
      const label = document.createElement('label');
      label.className = 'chip tag';
      label.style.border = '1px solid transparent';
      label.style.opacity = '0.6';
      label.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = tag;
      checkbox.checked = item.tags.includes(tag);
      checkbox.style.display = 'none';

      // Handle visual state on change
      checkbox.addEventListener('change', () => {
        label.style.opacity = checkbox.checked ? '1' : '0.6';
        label.style.borderColor = checkbox.checked ? 'var(--text-color)' : 'transparent';
      });

      // Set initial visual state
      if (checkbox.checked) {
        label.style.opacity = '1';
        label.style.borderColor = 'var(--text-color)';
      }

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(' ' + tag));

      tagSelector.appendChild(label);
    });
  } else {
    // Set form to tag type
    document.querySelector('input[name="addType"][value="tag"]').checked = true;
    document.getElementById('siteForm').classList.add('hidden');
    document.getElementById('tagForm').classList.remove('hidden');

    // Pre-fill tag data
    document.getElementById('tagName').value = item;
  }

  // Store the item being edited for save logic
  window.editingItem = { item, type };

  addModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  hideContextMenu();

  // Disable type switching during edit
  addTypeRadios.forEach(r => r.disabled = true);
};

// Delete Modal State
let pendingDelete = null;

window.deleteItem = function () {
  const item = contextMenuState.targetItem;
  const type = contextMenuState.targetType;

  const itemName = type === 'site' ? item.name : item;

  // Setup Modal
  pendingDelete = { item, type };
  document.getElementById('deleteTitle').textContent = i18n.t('delete');
  document.getElementById('deleteMessage').textContent = `${i18n.t('deleteConfirm')} "${itemName}"?`;

  // Show Modal
  document.getElementById('deleteModal').classList.remove('hidden');
  modalOverlay.classList.remove('hidden');

  hideContextMenu();
};

// Confirm Delete Handler
document.getElementById('confirmDelete').addEventListener('click', () => {
  if (!pendingDelete) return;

  const { item, type } = pendingDelete;

  if (type === 'site') {
    state.sites = state.sites.filter(s => s.id !== item.id);
    state.siteOrder = state.siteOrder.filter(id => id !== item.id);
  } else {
    state.tags = state.tags.filter(t => t !== item);
    state.tagOrder = state.tagOrder.filter(t => t !== item);
    // Remove tag from all sites
    state.sites.forEach(site => {
      site.tags = site.tags.filter(t => t !== item);
    });
  }
  saveData();
  renderHome();

  // Close Modal
  document.getElementById('deleteModal').classList.add('hidden');
  modalOverlay.classList.add('hidden');
  pendingDelete = null;
});

// Cancel Delete Handler
document.getElementById('cancelDelete').addEventListener('click', () => {
  document.getElementById('deleteModal').classList.add('hidden');
  modalOverlay.classList.add('hidden');
  pendingDelete = null;
});

// Close context menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.context-menu') && !e.target.closest('.chip')) {
    hideContextMenu();
  }
});

// ===== Content Rendering =====
function renderHome() {
  contentEl.innerHTML = '';

  // Minimalist mode check
  if (state.viewMode === 'minimalist') {
    return;
  }

  // 1. Render Tags (sorted by tagOrder)
  const orderedTags = state.tagOrder.length > 0
    ? state.tagOrder.filter(tag => state.tags.includes(tag))
    : state.tags;

  orderedTags.forEach((tag, index) => {
    const chip = document.createElement('div');
    chip.className = 'chip tag';
    chip.textContent = '# ' + tag;
    chip.onclick = () => openTagView(tag);
    chip.oncontextmenu = (e) => showContextMenu(e, tag, 'tag');

    // Add drag and drop attributes
    chip.draggable = true;
    chip.addEventListener('dragstart', (e) => handleDragStart(e, index, 'tag'));
    chip.addEventListener('dragover', handleDragOver);
    chip.addEventListener('drop', (e) => handleDrop(e, index, 'tag'));
    chip.addEventListener('dragend', handleDragEnd);

    contentEl.appendChild(chip);
  });

  // 2. Render Pinned Sites (sorted by siteOrder)
  const pinnedSites = state.sites.filter(s => s.showOnHome);
  const orderedSites = state.siteOrder.length > 0
    ? state.siteOrder
      .map(id => pinnedSites.find(s => s.id === id))
      .filter(s => s !== undefined)
    : pinnedSites;

  orderedSites.forEach((site, index) => {
    const chip = document.createElement('div');
    chip.className = 'chip site';
    chip.textContent = site.name;
    chip.onclick = () => window.location.href = site.url;
    chip.oncontextmenu = (e) => showContextMenu(e, site, 'site');
    // Middle-click opens in new tab
    chip.onmousedown = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        window.open(site.url, '_blank');
      }
    };

    // Add drag and drop attributes
    chip.draggable = true;
    chip.addEventListener('dragstart', (e) => handleDragStart(e, index, 'site'));
    chip.addEventListener('dragover', handleDragOver);
    chip.addEventListener('drop', (e) => handleDrop(e, index, 'site'));
    chip.addEventListener('dragend', handleDragEnd);

    contentEl.appendChild(chip);
  });

  // 3. Render Add Button as chip (after all sites)
  const addChip = document.createElement('div');
  addChip.className = 'chip add-chip';
  addChip.textContent = '＋';
  addChip.onclick = () => {
    // Reset form
    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
    document.getElementById('tagName').value = '';

    // Render tag checkboxes
    const tagSelector = document.getElementById('tagSelector');
    tagSelector.innerHTML = '';
    state.tags.forEach(tag => {
      const label = document.createElement('label');
      label.className = 'chip tag';
      label.style.border = '1px solid transparent';
      label.style.opacity = '0.6';
      label.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = tag;
      checkbox.style.display = 'none';

      // Handle visual state on change
      checkbox.addEventListener('change', () => {
        label.style.opacity = checkbox.checked ? '1' : '0.6';
        label.style.borderColor = checkbox.checked ? 'var(--text-color)' : 'transparent';
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(' ' + tag));

      tagSelector.appendChild(label);
    });

    addModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');

    // Enable radios for new item
    addTypeRadios.forEach(r => r.disabled = false);
  };

  contentEl.appendChild(addChip);
}

// ===== Drag and Drop Event Handlers =====
function handleDragStart(event, index, type) {
  dragState.draggedElement = event.target;
  dragState.draggedIndex = index;
  dragState.draggedType = type;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', event.target.innerHTML);

  // Add visual feedback
  event.target.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const target = event.target.closest('.chip');
  if (target && target !== dragState.draggedElement) {
    dragState.dropTarget = target;

    // Get the target index from the DOM
    const chips = Array.from(contentEl.querySelectorAll('.chip'));
    const targetIndex = chips.indexOf(target);

    // Only reorder if target is valid and different from current position
    if (targetIndex !== -1 && targetIndex !== dragState.draggedIndex) {
      const fromIndex = dragState.draggedIndex;
      const toIndex = targetIndex;

      // Only allow reordering same type
      if (dragState.draggedType === 'tag') {
        const item = state.tagOrder[fromIndex];
        state.tagOrder.splice(fromIndex, 1);
        state.tagOrder.splice(toIndex, 0, item);
        dragState.draggedIndex = toIndex;
      } else if (dragState.draggedType === 'site') {
        const item = state.siteOrder[fromIndex];
        state.siteOrder.splice(fromIndex, 1);
        state.siteOrder.splice(toIndex, 0, item);
        dragState.draggedIndex = toIndex;
      }

      // Re-render in real-time
      renderHome();
    }
  }

  return false;
}

function handleDrop(event, targetIndex, targetType) {
  event.preventDefault();
  event.stopPropagation();

  // Only allow dropping on same type
  if (dragState.draggedType !== targetType) {
    return false;
  }

  // Reordering is already done in handleDragOver
  // Just save the data
  saveData();

  return false;
}

function handleDragEnd(event) {
  // Remove visual feedback
  event.target.classList.remove('dragging');

  // Clear drag state
  dragState.draggedElement = null;
  dragState.draggedIndex = null;
  dragState.draggedType = null;
  dragState.dropTarget = null;
}

// ===== Add/Edit Modal =====
// Note: Add button is now rendered as a chip in renderHome()

function closeModals() {
  modalOverlay.classList.add('hidden');
  addModal.classList.add('hidden');
  tagViewModal.classList.add('hidden');
  document.getElementById('deleteModal').classList.add('hidden'); // Close delete modal
}

closeAddModalBtn.onclick = closeModals;
closeTagModalBtn.onclick = closeModals;
modalOverlay.onclick = (e) => {
  if (e.target === modalOverlay) closeModals();
};

// Switch Add Type
addTypeRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === 'site') {
      siteForm.classList.remove('hidden');
      tagForm.classList.add('hidden');
    } else {
      siteForm.classList.add('hidden');
      tagForm.classList.remove('hidden');
    }
  });
});

// Save Logic
saveItemBtn.addEventListener('click', () => {
  const type = document.querySelector('input[name="addType"]:checked').value;
  const isEditing = window.editingItem !== undefined;

  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  if (type === 'site') {
    const name = document.getElementById('siteName').value.trim();
    let url = document.getElementById('siteUrl').value.trim();
    if (!name || !url) return alert(i18n.t('nameRequired'));

    if (!url.startsWith('http')) url = 'https://' + url;

    const selectedTags = Array.from(document.querySelectorAll('#tagSelector input:checked')).map(cb => cb.value);
    const showOnHome = document.getElementById('showOnHome').checked;

    if (isEditing) {
      // Update existing site
      const siteIndex = state.sites.findIndex(s => s.id === window.editingItem.item.id);
      if (siteIndex !== -1) {
        state.sites[siteIndex].name = name;
        state.sites[siteIndex].url = url;
        state.sites[siteIndex].tags = selectedTags;
        state.sites[siteIndex].showOnHome = showOnHome;

        // Update siteOrder if showOnHome changed
        const inOrder = state.siteOrder.includes(state.sites[siteIndex].id);
        if (showOnHome && !inOrder) {
          state.siteOrder.push(state.sites[siteIndex].id);
        } else if (!showOnHome && inOrder) {
          state.siteOrder = state.siteOrder.filter(id => id !== state.sites[siteIndex].id);
        }
      }
    } else {
      // Create new site
      const newSite = {
        id: generateUuid(),
        name,
        url,
        tags: selectedTags,
        showOnHome
      };

      state.sites.push(newSite);

      // Add to siteOrder
      if (showOnHome) {
        state.siteOrder.push(newSite.id);
      }
    }
  } else {
    const tagName = document.getElementById('tagName').value.trim();
    if (!tagName) return alert(i18n.t('tagNameRequired'));

    if (isEditing) {
      // Update existing tag
      const oldTagName = window.editingItem.item;
      const tagIndex = state.tags.indexOf(oldTagName);
      if (tagIndex !== -1) {
        // Check if new name already exists
        if (state.tags.includes(tagName) && tagName !== oldTagName) {
          return alert(i18n.t('tagExists'));
        }

        state.tags[tagIndex] = tagName;

        // Update tagOrder
        const orderIndex = state.tagOrder.indexOf(oldTagName);
        if (orderIndex !== -1) {
          state.tagOrder[orderIndex] = tagName;
        }

        // Update all sites that have this tag
        state.sites.forEach(site => {
          const siteTagIndex = site.tags.indexOf(oldTagName);
          if (siteTagIndex !== -1) {
            site.tags[siteTagIndex] = tagName;
          }
        });
      }
    } else {
      // Create new tag
      if (state.tags.includes(tagName)) return alert(i18n.t('tagExists'));
      state.tags.push(tagName);

      // Add to tagOrder
      state.tagOrder.push(tagName);
    }
  }

  // Clear editing state
  window.editingItem = undefined;

  saveData();
  renderHome();
  closeModals();
});

// ===== Tag View Logic =====
function openTagView(tagName) {
  document.getElementById('tagViewTitle').textContent = '# ' + tagName;
  const grid = document.getElementById('tagViewLinks');
  grid.innerHTML = '';

  const tagSites = state.sites.filter(s => s.tags.includes(tagName));

  if (tagSites.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; opacity: 0.5;">${i18n.t('noSites')}</div>`;
  } else {
    // Collect all links first
    tagSites.forEach((site, index) => {
      const el = document.createElement('a');
      el.className = 'tag-link-item';
      el.href = site.url;
      el.textContent = site.name;
      el.oncontextmenu = (e) => showContextMenu(e, site, 'site');
      // Middle-click opens in new tab
      el.onmousedown = (e) => {
        if (e.button === 1) {
          e.preventDefault();
          window.open(site.url, '_blank');
        }
      };
      grid.appendChild(el);

      // Add separator if not last
      if (index < tagSites.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'tag-view-separator';
        sep.textContent = '、';
        grid.appendChild(sep);
      }
    });
  }

  tagViewModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}


// ===== Theme =====
const storedTheme = localStorage.getItem('theme');
const savedTheme = storedTheme
  ? storedTheme
  : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.classList.add(savedTheme);
if (!storedTheme) {
  localStorage.setItem('theme', savedTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (themeText) {
    themeText.textContent = theme === 'dark' ? i18n.t('darkMode') || '深色模式' : i18n.t('lightMode') || '浅色模式';
  }
}

window.toggleTheme = function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  if (window.applyCustomThemeForCurrentMode) {
    window.applyCustomThemeForCurrentMode();
  }

  if (window.markHomeConfigUpdated) {
    window.markHomeConfigUpdated();
  } else if (window.authState && window.authState.isLoggedIn && window.saveUserDataToBackend) {
    window.saveUserDataToBackend();
  }

  // Update icon
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.innerHTML = isDark ? THEME_ICONS.sun : THEME_ICONS.moon;
  }

  // Update text
  const themeText = document.getElementById('themeText');
  if (themeText) {
    themeText.textContent = isDark ? i18n.t('lightMode') : i18n.t('darkMode');
  }
};

// ===== Language Toggle =====
window.toggleLanguage = function () {
  i18n.toggleLocale();
  updateSettingsMenu();
};

// ===== Settings Menu =====
function updateSettingsMenu() {
  const isDark = document.body.classList.contains('dark');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const langText = document.getElementById('langText');

  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  }
  if (themeText) {
    themeText.textContent = isDark ? i18n.t('darkMode') || '深色模式' : i18n.t('lightMode') || '浅色模式';
  }
  if (langText) {
    langText.textContent = i18n.currentLocale === 'zh' ? '中文' : 'English';
  }
}

settingsToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsMenu.classList.toggle('hidden');
});

document.getElementById('languageMenuItem').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('languageSubmenu').classList.toggle('hidden');
});

let themeScriptLoadPromise = null;
const THEME_SCRIPT_VERSION = '20260322-themefix-3';

function getThemeScriptUrl() {
  return new URL(`/themes.js?v=${THEME_SCRIPT_VERSION}`, window.location.origin).toString();
}

function readAppearanceSnapshotFallback() {
  try {
    const raw = localStorage.getItem('last_applied_appearance');
    return raw ? JSON.parse(raw) : null;
  } catch (_err) {
    return null;
  }
}

function applyAppearanceSnapshotFallback() {
  const snapshot = readAppearanceSnapshotFallback();
  if (!snapshot) return;

  const mode = snapshot.colorMode === 'dark' ? 'dark' : 'light';
  document.body.classList.toggle('dark', mode === 'dark');
  document.body.classList.toggle('light', mode !== 'dark');

  if (snapshot.currentTheme && typeof window.applyStyleTheme !== 'function') {
    document.documentElement.dataset.style = snapshot.currentTheme;
    document.body.dataset.style = snapshot.currentTheme;
  }

  const settings = snapshot.customSettings || {};
  const modeSettings = mode === 'dark' ? (settings.darkMode || settings) : settings;
  const rootEl = document.documentElement;
  const bodyEl = document.body;
  const styleMap = {
    '--bg-color': modeSettings.bgColor,
    '--button-bg': modeSettings.buttonBg,
    '--modal-bg': modeSettings.modalBg,
    '--input-bg': modeSettings.inputBg,
    '--border-color': modeSettings.borderColor,
    '--text-color': modeSettings.textColor,
    '--text-active-color': modeSettings.textActiveColor,
    '--hover-bg': modeSettings.hoverBg,
    '--shadow-color': modeSettings.shadowColor,
    '--accent-color': modeSettings.textColor
  };

  Object.entries(styleMap).forEach(([key, value]) => {
    if (!value) return;
    rootEl.style.setProperty(key, value);
    bodyEl.style.setProperty(key, value);
  });

  if (settings.fontEnglish || settings.fontChinese) {
    bodyEl.style.fontFamily = `"${settings.fontEnglish || 'Patrick Hand'}", "${settings.fontChinese || '优设好身体'}", sans-serif`;
  }
}

async function evaluateThemeScriptFromSource(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Theme script fetch failed with ${response.status}`);
  }
  const source = await response.text();
  const runner = new Function(`${source}\n//# sourceURL=themes.dynamic.js`);
  runner();
  return (
    typeof window.handleThemeCustomizationMenuClick === 'function'
    || typeof window.openThemeCustomization === 'function'
  );
}

function ensureThemeCustomizationLoaded() {
  if (typeof window.handleThemeCustomizationMenuClick === 'function' || typeof window.openThemeCustomization === 'function') {
    return Promise.resolve(true);
  }

  if (themeScriptLoadPromise) {
    return themeScriptLoadPromise;
  }

  themeScriptLoadPromise = new Promise((resolve) => {
    const themeScriptUrl = getThemeScriptUrl();
    const script = document.createElement('script');
    script.src = `${themeScriptUrl}&reload=${Date.now()}`;
    script.onload = async () => {
      let loaded = (
        typeof window.handleThemeCustomizationMenuClick === 'function'
        || typeof window.openThemeCustomization === 'function'
      );

      if (!loaded) {
        try {
          loaded = await evaluateThemeScriptFromSource(themeScriptUrl);
        } catch (error) {
          console.error('Theme script post-load evaluation failed:', error);
        }
      }

      themeScriptLoadPromise = null;
      resolve(loaded);
    };
    script.onerror = async () => {
      let loaded = false;
      try {
        loaded = await evaluateThemeScriptFromSource(themeScriptUrl);
      } catch (error) {
        console.error('Theme script reload failed:', error);
      }
      themeScriptLoadPromise = null;
      resolve(loaded);
    };
    document.body.appendChild(script);
  });

  return themeScriptLoadPromise;
}

applyAppearanceSnapshotFallback();
ensureThemeCustomizationLoaded().then((loaded) => {
  if (!loaded) return;
  window.applyStyleTheme?.(state.currentTheme || localStorage.getItem('currentTheme') || 'handdrawn');
  window.applyCustomThemeForCurrentMode?.();
});

function isElementVisible(element) {
  return !!element && !element.classList.contains('hidden');
}

function hasOpenTransientUi() {
  return [
    settingsMenu,
    document.getElementById('languageSubmenu'),
    document.getElementById('wallpaperModal'),
    document.getElementById('themeCustomizationModal'),
    document.getElementById('aboutModal'),
    document.getElementById('coffeeModal'),
    document.getElementById('feedbackModal'),
    modalOverlay,
    engineModal,
    pageContextMenu,
    itemContextMenu
  ].some(isElementVisible);
}

function closeTransientUi() {
  settingsMenu?.classList.add('hidden');
  document.getElementById('languageSubmenu')?.classList.add('hidden');
  window.closeWallpaperModal?.();
  window.closeThemeModal?.(false);
  closeModals?.();
  closeEngineModal?.();
  window.closeAboutModal?.();
  window.closeCoffeeModal?.();
  window.closeFeedbackModal?.();
  pageContextMenu?.classList.add('hidden');
  itemContextMenu?.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  if (!hasOpenTransientUi()) return;

  const insideInteractiveLayer = e.target.closest(
    '.modal, .settings-menu, .settings-btn, .page-context-menu, .item-context-menu, .context-menu'
  );

  if (insideInteractiveLayer) return;

  closeTransientUi();
  e.preventDefault();
  e.stopPropagation();
}, true);

document.getElementById('themeCustomizationBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  settingsMenu.classList.add('hidden');

  if (typeof window.openThemeCustomization === 'function') {
    window.openThemeCustomization();
    return;
  }

  if (typeof window.handleThemeCustomizationMenuClick === 'function') {
    window.handleThemeCustomizationMenuClick(e);
    return;
  }

  ensureThemeCustomizationLoaded().then((loaded) => {
    if (loaded && typeof window.openThemeCustomization === 'function') {
      window.openThemeCustomization();
      return;
    }

    if (loaded && typeof window.handleThemeCustomizationMenuClick === 'function') {
      window.handleThemeCustomizationMenuClick(e);
      return;
    }

    if (typeof window.showNotification === 'function') {
      window.showNotification(
        i18n.currentLocale === 'zh' ? '主题设置加载失败，请刷新后重试' : 'Theme settings failed to load. Please refresh and try again.',
        'error'
      );
    }
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.settings-menu') && !e.target.closest('.settings-btn')) {
    settingsMenu.classList.add('hidden');
    document.getElementById('languageSubmenu').classList.add('hidden');
  } else if (!e.target.closest('#languageMenuItem')) {
    document.getElementById('languageSubmenu').classList.add('hidden');
  }
});

// ===== About, Coffee, Feedback Modals =====
let selectedCoffeeAmount = 5;

function openAboutModal() {
  document.getElementById('settingsMenu').classList.add('hidden');
  document.getElementById('aboutModal').classList.remove('hidden');
}

function closeAboutModal() {
  document.getElementById('aboutModal').classList.add('hidden');
}

function openCoffeeModal() {
  document.getElementById('aboutModal').classList.add('hidden');
  document.getElementById('coffeeModal').classList.remove('hidden');
  selectedCoffeeAmount = 5;
  document.querySelectorAll('.coffee-amount-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.amount === '5');
  });
  document.getElementById('coffeeCustomAmount').value = '';
}

function closeCoffeeModal() {
  document.getElementById('coffeeModal').classList.add('hidden');
}

function selectCoffeeAmount(amount) {
  selectedCoffeeAmount = amount;
  document.querySelectorAll('.coffee-amount-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.amount) === amount);
  });
  document.getElementById('coffeeCustomAmount').value = '';
}

function processCoffeePayment() {
  const customAmount = parseInt(document.getElementById('coffeeCustomAmount').value);
  const amount = customAmount > 0 ? customAmount : selectedCoffeeAmount;

  if (amount < 1 || amount > 100) {
    showNotification(i18n.currentLocale === 'zh' ? '请输入 1-100 之间的金额' : 'Please enter amount between 1-100', 'error');
    return;
  }

  // Check if Paddle is configured
  if (!window.PADDLE_CLIENT_TOKEN) {
    showNotification(
      i18n.currentLocale === 'zh'
        ? '支付功能尚未配置，请联系开发者'
        : 'Payment not configured. Please contact the developer.',
      'warning'
    );
    console.error('Paddle not configured: PADDLE_CLIENT_TOKEN is empty in config.js');
    return;
  }

  // Check if Paddle SDK is loaded
  if (typeof Paddle === 'undefined') {
    showNotification(
      i18n.currentLocale === 'zh'
        ? '支付模块加载失败，请刷新页面重试'
        : 'Payment module failed to load. Please refresh and try again.',
      'error'
    );
    return;
  }

  // For donations, open external payment link or use Paddle custom amount
  // Since Paddle doesn't support arbitrary amounts without custom prices,
  // we'll redirect to a donation page or show a message
  showNotification(
    i18n.currentLocale === 'zh'
      ? '感谢你的支持意向！捐赠功能即将上线'
      : 'Thank you for your interest! Donation feature coming soon.',
    'info'
  );
  closeCoffeeModal();

  // TODO: When ready, create donation prices in Paddle and use:
  // window.openPaddleCheckout?.('donation', amount);
}

function openFeedbackModal() {
  document.getElementById('aboutModal').classList.add('hidden');
  document.getElementById('feedbackModal').classList.remove('hidden');
  document.getElementById('feedbackType').value = 'bug';
  document.getElementById('feedbackContent').value = '';
  document.getElementById('feedbackEmail').value = window.authState?.user?.email || '';
}

function closeFeedbackModal() {
  document.getElementById('feedbackModal').classList.add('hidden');
}

async function submitFeedback() {
  const type = document.getElementById('feedbackType').value;
  const content = document.getElementById('feedbackContent').value.trim();
  const email = document.getElementById('feedbackEmail').value.trim();

  if (!content) {
    showNotification(i18n.currentLocale === 'zh' ? '请填写反馈内容' : 'Please enter feedback content', 'error');
    return;
  }

  const submitBtn = document.getElementById('submitFeedbackBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = i18n.currentLocale === 'zh' ? '提交中...' : 'Submitting...';

  try {
    const { error } = await supabase
      .from('feedback')
      .insert({
        type: type,
        content: content,
        email: email || null,
        user_id: window.authState?.user?.id || null,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Feedback submit error:', error);
      showNotification(i18n.currentLocale === 'zh' ? '提交失败，请重试' : 'Submit failed, please retry', 'error');
    } else {
      showNotification(i18n.currentLocale === 'zh' ? '感谢你的反馈！' : 'Thank you for your feedback!', 'success');
      closeFeedbackModal();
    }
  } catch (err) {
    console.error('Feedback exception:', err);
    showNotification(i18n.currentLocale === 'zh' ? '提交失败' : 'Submit failed', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = i18n.currentLocale === 'zh' ? '提交' : 'Submit';
  }
}

// Export modal functions
window.openAboutModal = openAboutModal;
window.closeAboutModal = closeAboutModal;
window.openCoffeeModal = openCoffeeModal;
window.closeCoffeeModal = closeCoffeeModal;
window.selectCoffeeAmount = selectCoffeeAmount;
window.processCoffeePayment = processCoffeePayment;
window.openFeedbackModal = openFeedbackModal;
window.closeFeedbackModal = closeFeedbackModal;
window.submitFeedback = submitFeedback;

// ===== Right-click Context Menu =====
const pageContextMenu = document.getElementById('pageContextMenu');
const itemContextMenu = document.getElementById('itemContextMenu');
let currentContextItem = null; // Store reference to the item being right-clicked

function showPageContextMenu(e) {
  // Always prevent default browser context menu
  e.preventDefault();

  // Hide any existing context menus first
  hideAllContextMenus();

  // Do not show any context menu on search/time/date
  const noMenuSelectors = [
    '#searchInput', '#searchForm', '.search-box', '#searchEngine', '.search-engine',
    '#time', '#date'
  ];
  if (noMenuSelectors.some(sel => e.target.closest(sel))) {
    return;
  }

  // If this is a chip/tag link that uses the legacy edit/delete menu, do nothing here
  if (e.target.closest('.chip') || e.target.closest('.tag-link-item') || e.target.closest('#contextMenu')) {
    return;
  }

  // Check if right-clicking on a site or tag card
  const siteCard = e.target.closest('.site-card');
  const tagCard = e.target.closest('.tag-card');

  if (siteCard || tagCard) {
    // Show item edit menu for sites/tags
    currentContextItem = siteCard || tagCard;
    showItemContextMenu(e, siteCard ? 'site' : 'tag');
    return;
  }

  // Check if on modal or other non-applicable areas
  const skipSelectors = [
    '.modal', '.modal-overlay:not(.hidden)', '.settings-menu', '.settings-btn',
    '.context-menu', '.page-context-menu', '.item-context-menu',
    '.add-card'
  ];

  const shouldSkip = skipSelectors.some(sel => e.target.closest(sel));
  if (shouldSkip) {
    return;
  }

  // Show page context menu (with wallpaper option)
  pageContextMenu.style.left = e.clientX + 'px';
  pageContextMenu.style.top = e.clientY + 'px';
  pageContextMenu.classList.remove('hidden');

  // Adjust position if menu goes off screen
  const rect = pageContextMenu.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    pageContextMenu.style.left = (e.clientX - rect.width) + 'px';
  }
  if (rect.bottom > window.innerHeight) {
    pageContextMenu.style.top = (e.clientY - rect.height) + 'px';
  }
}

function showItemContextMenu(e, type) {
  if (!itemContextMenu) return;

  // Update menu content based on type
  const editLabel = document.getElementById('ctxEditItem');
  const deleteLabel = document.getElementById('ctxDeleteItem');

  if (editLabel) {
    editLabel.textContent = i18n.currentLocale === 'zh'
      ? (type === 'site' ? '编辑网站' : '编辑标签')
      : (type === 'site' ? 'Edit Site' : 'Edit Tag');
  }
  if (deleteLabel) {
    deleteLabel.textContent = i18n.currentLocale === 'zh' ? '删除' : 'Delete';
  }

  itemContextMenu.dataset.type = type;
  itemContextMenu.style.left = e.clientX + 'px';
  itemContextMenu.style.top = e.clientY + 'px';
  itemContextMenu.classList.remove('hidden');

  // Adjust position if menu goes off screen
  const rect = itemContextMenu.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    itemContextMenu.style.left = (e.clientX - rect.width) + 'px';
  }
  if (rect.bottom > window.innerHeight) {
    itemContextMenu.style.top = (e.clientY - rect.height) + 'px';
  }
}

function hideAllContextMenus() {
  pageContextMenu?.classList.add('hidden');
  itemContextMenu?.classList.add('hidden');
  currentContextItem = null;
}

function hidePageContextMenu() {
  hideAllContextMenus();
}

function openAddSiteFromContext() {
  hidePageContextMenu();
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('addModal').classList.remove('hidden');
  document.querySelector('input[name="addType"][value="site"]').checked = true;
  document.getElementById('siteForm').classList.remove('hidden');
  document.getElementById('tagForm').classList.add('hidden');
  renderTagSelector();
}

function openAddTagFromContext() {
  hidePageContextMenu();
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('addModal').classList.remove('hidden');
  document.querySelector('input[name="addType"][value="tag"]').checked = true;
  document.getElementById('siteForm').classList.add('hidden');
  document.getElementById('tagForm').classList.remove('hidden');
}

function openWallpaperFromContext() {
  hidePageContextMenu();
  if (window.openWallpaperModal) {
    window.openWallpaperModal();
  } else {
    document.getElementById('wallpaperModal').classList.remove('hidden');
    if (window.renderWallpaperUI) window.renderWallpaperUI();
  }
}

// Edit item from context menu
function editItemFromContext() {
  hideAllContextMenus();
  if (!currentContextItem) return;

  const type = document.getElementById('itemContextMenu')?.dataset.type;

  if (type === 'site') {
    const siteId = currentContextItem.dataset.id;
    if (siteId) {
      editSite(siteId);
    }
  } else if (type === 'tag') {
    const tagId = currentContextItem.dataset.id;
    if (tagId) {
      editTag(tagId);
    }
  }
}

// Delete item from context menu
function deleteItemFromContext() {
  hideAllContextMenus();
  if (!currentContextItem) return;

  const type = document.getElementById('itemContextMenu')?.dataset.type;
  const confirmMsg = i18n.currentLocale === 'zh' ? '确定要删除吗？' : 'Are you sure you want to delete?';

  if (!confirm(confirmMsg)) return;

  if (type === 'site') {
    const siteId = currentContextItem.dataset.id;
    if (siteId) {
      deleteSite(siteId);
    }
  } else if (type === 'tag') {
    const tagId = currentContextItem.dataset.id;
    if (tagId) {
      deleteTag(tagId);
    }
  }
}

// Context menu event listeners
document.addEventListener('contextmenu', showPageContextMenu);
document.addEventListener('click', hideAllContextMenus);
document.addEventListener('scroll', hideAllContextMenus);

// Export context menu functions
window.openAddSiteFromContext = openAddSiteFromContext;
window.openAddTagFromContext = openAddTagFromContext;
window.openWallpaperFromContext = openWallpaperFromContext;
window.editItemFromContext = editItemFromContext;
window.deleteItemFromContext = deleteItemFromContext;

// Close modals on overlay click
document.getElementById('aboutModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'aboutModal') closeAboutModal();
});
document.getElementById('coffeeModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'coffeeModal') closeCoffeeModal();
});
document.getElementById('feedbackModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'feedbackModal') closeFeedbackModal();
});


if (window.applyStyleTheme) {
  try {
    window.applyStyleTheme(state.currentTheme || 'handdrawn');
  } catch (_err) {
  }
}
// ===== Initialize =====
searchInput.focus();
updateAllText();
renderHome();
renderEngineQuickList();
