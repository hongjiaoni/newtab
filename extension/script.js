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
    addNewTitle: '添加网站',
    site: '网站',
    tag: '标签',
    name: '名称',
    url: '网址',
    urlPlaceholder: '网址 (https://...)',
    tagName: '标签名称',
    selectTags: '选择标签',
    pinToHome: '固定在首页',
    engineLimit: '最多只能选择 5 个搜索引擎', engineSelected: '已选 {n}/5',
    iconTextLabel: '文字', iconColorLabel: '背景色', iconCustom: '自定义',
    done: '完成', accentLabel: '主题色', accentCustom: '自定义', accentBlue: '蓝色', accentPurple: '紫色', accentPink: '粉色', accentRed: '红色', accentOrange: '橙色', accentYellow: '黄色', accentGreen: '绿色', accentGraphite: '石墨色', folderSitesLabel: '放入文件夹的网站', folderNoSites: '首页还没有可以放入的网站', folderDragOutHint: '把图标拖到窗口外即可移出文件夹',
    iconLabel: '图标', iconUpload: '上传图片', iconAuto: '自动获取', iconInvalid: '无法读取这张图片',
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
    zoom: '缩放',
    zoom100: '100%',
    zoom125: '125%',
    zoom150: '150%',
    newFolder: '新建文件夹',
    folder: '文件夹',
    rename: '重命名',
    renameTitle: '重命名',
    renameLabel: '文件夹名称',
    renamePlaceholder: '输入新名称',
    folderNameRequired: '文件夹名称不能为空',
    deleteFolderConfirm: '删除该文件夹？文件夹内的网站会移回首页。',
    moveOutFolder: '移出文件夹',
    emptyFolder: '文件夹是空的，把网站拖到文件夹图标上即可添加',
    folderMergeHint: '将网站拖到另一个图标上即可合并为文件夹',
    addSite: '添加网站',
    changeWallpaper: '更换壁纸',
    mode: '模式',
    addFolder: '添加文件夹',
    modeGeneral: '一般',
    modeMinimalist: '极简',
    appearance: '外观',
    settings: '设置',
    account: '账户',
    pluginNotes: '便签',
    pluginTodo: 'Todo List',
    pluginCalendar: '日历',
    pluginAdd: '添加插件',
    pluginPickerTitle: '选择工作台插件',
    notesEmpty: '暂无便签',
    addNote: '添加便签',
    todoEmpty: '暂无待办',
    todoPlaceholder: '添加待办事项',
    calendarEmpty: '当日暂无日程',
    eventPlaceholder: '添加日程',
    workbenchHint: '向上滚动或按 PageUp 返回首页',
    agentProject: '项目',
    agentChats: '对话',
    agentNewProject: '新建项目',
    agentNewChat: '新对话',
    agentNoChat: '暂无对话',
    agentLoginRequired: '需要登录',
    agentPlaceholder: '输入消息，与你的 Agent 对话…',
    agentSend: '发送',
    agentWelcome: '选择一个模型提供商，登录后即可开始对话。\n消息将按「项目 → 对话」归档。',
    settingsModalTitle: '设置',
    timeFormatLabel: '时间格式',
    settingsLangLabel: '语言',
    openBehaviorLabel: '页面打开方式',
    tf24: '24 小时',
    tf12: '12 小时',
    obNew: '新标签页打开',
    obCurrent: '当前页打开',
    settingsAbout: '关于',
    followSystem: '跟随系统',
    appearanceDone: '完成',
    appearanceStyle: '风格',
    appearanceFont: 'Font',
    appearanceZoom: '缩放比例',
    appearanceViewMode: '模式',
    appearanceColorMode: '颜色模式',
    appearanceWallpaper: '壁纸',
    workbench: '工作台',
    wbBackHome: '首页',
    pluginNoData: '暂无数据',
    pluginTodayEvents: '今日日程',
    todoAll: '全部',
    todoActive: '进行中',
    todoDone: '已完成',
    todoLow: '低',
    todoMedium: '中',
    todoHigh: '高',
    eventEdit: '编辑日程标题',
    agentRename: '重命名',
    agentDelete: '删除',
    agentCopy: '复制',
    agentCopied: '已复制',
    agentRegenerate: '重新生成',
    agentAttachImage: '附加图片（支持粘贴）',
    agentImageFailed: '图片处理失败',
    agentImageMessage: '图片消息',
    agentVisionNotSupported: '当前模型不支持图片，请选择带 🖼 的视觉模型',
    agentProjectDeleteConfirm: '删除该项目？其下所有对话将一并删除。',
    agentChatDeleteConfirm: '删除该对话？',


    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    search: 'What would you like to search?',
    addNew: 'Add',
    addNewTitle: 'Add Site',
    site: 'Site',
    tag: 'Tag',
    name: 'Name',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'Tag Name',
    selectTags: 'Select Tags',
    pinToHome: 'Pin to Home',
    engineLimit: 'You can select up to 5 search engines', engineSelected: 'Selected {n}/5',
    iconTextLabel: 'Text', iconColorLabel: 'Background', iconCustom: 'Custom',
    done: 'Done', accentLabel: 'Accent Color', accentCustom: 'Custom', accentBlue: 'Blue', accentPurple: 'Purple', accentPink: 'Pink', accentRed: 'Red', accentOrange: 'Orange', accentYellow: 'Yellow', accentGreen: 'Green', accentGraphite: 'Graphite', folderSitesLabel: 'Sites to put in the folder', folderNoSites: 'There are no sites on the home page to add yet', folderDragOutHint: 'Drag an icon outside this window to move it out',
    iconLabel: 'Icon', iconUpload: 'Upload Image', iconAuto: 'Automatic', iconInvalid: 'Could not read this image',
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
  },
  fr: {
    search: 'Que voulez-vous rechercher ?',
    addNew: 'Ajouter',
    addNewTitle: 'Ajouter un site',
    site: 'Site',
    tag: 'Étiquette',
    name: 'Nom',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: "Nom de l'étiquette",
    selectTags: 'Sélectionner les étiquettes',
    pinToHome: "Épingler à l'accueil",
    engineLimit: 'Vous pouvez choisir jusqu\'à 5 moteurs', engineSelected: '{n}/5 sélectionnés',
    iconTextLabel: 'Texte', iconColorLabel: 'Fond', iconCustom: 'Personnalisée',
    done: 'OK', accentLabel: 'Couleur d\'accent', accentCustom: 'Personnalisée', accentBlue: 'Bleu', accentPurple: 'Violet', accentPink: 'Rose', accentRed: 'Rouge', accentOrange: 'Orange', accentYellow: 'Jaune', accentGreen: 'Vert', accentGraphite: 'Graphite', folderSitesLabel: 'Sites à placer dans le dossier', folderNoSites: 'Aucun site de l\'accueil à ajouter pour l\'instant', folderDragOutHint: 'Faites glisser une icône hors de cette fenêtre pour la sortir du dossier',
    iconLabel: 'Icône', iconUpload: 'Importer une image', iconAuto: 'Automatique', iconInvalid: 'Impossible de lire cette image',
    cancel: 'Annuler',
    save: 'Enregistrer',
    close: 'Fermer',
    delete: 'Supprimer',
    deleteConfirm: 'Confirmer la suppression',
    edit: 'Modifier',
    noSites: 'Aucun site dans cette étiquette',
    nameRequired: "Le nom et l'URL sont requis",
    tagNameRequired: "Le nom de l'étiquette est requis",
    tagExists: 'Cette étiquette existe déjà',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    googleSignIn: 'Connexion',
    googleLoginButton: 'Se connecter avec Google',
    loginSuccess: 'Connexion réussie !',
    logoutSuccess: 'Déconnexion réussie',
    wallpaper: "Fond d'écran",
    wallpaperTitle: "Choisir un fond d'écran",
    landscape: 'Paysage',
    solid: 'Couleur unie',
    daily: 'Recommandé',
    wallpaperChanged: "Fond d'écran changé",
    restoreDefault: 'Rétablir par défaut',
    restoredDefault: "Fond d'écran par défaut rétabli",
    userProfile: 'Profil',
    minimalist: 'Mode minimaliste',
    general: 'Mode général',
    language: 'Langue',
    chinese: 'Chinois',
    english: 'Anglais',
    custom: 'Personnalisé',
    upload: 'Téléverser',
    uploadWallpaper: "Téléverser un fond d'écran",
    themeCustomization: 'Personnalisation du thème',
    about: 'À propos',
    aboutTitle: 'À propos de NewTab',
    aboutDesc: 'NewTab est une page de nouvel onglet personnalisable : recherche, fonds d\'écran, thèmes, raccourcis et synchronisation cloud.',
    officialWebsite: 'Site officiel',
    buyMeCoffee: "M'offrir un café",
    coffeeDesc: 'Soutenir le développement',
    feedback: 'Retour',
    feedbackType: 'Type de retour',
    feedbackContent: 'Contenu',
    feedbackEmail: 'Email',
    feedbackPlaceholder: 'Décrivez votre problème ou votre suggestion',
    submit: 'Envoyer',
    submitting: 'Envoi...',
    pay: 'Payer',
    customAmount: 'Montant personnalisé',
    addSite: 'Ajouter un site',
    addTag: 'Ajouter une étiquette',
    changeWallpaper: "Changer le fond d'écran",
    feedbackTypeBug: 'Bug',
    feedbackTypeFeature: 'Fonctionnalité',
    feedbackTypeOther: 'Autre',
    editSite: 'Modifier le site',
    editTag: "Modifier l'étiquette",
    imageUrl: "URL de l'image",
    apply: 'Appliquer',
    pasteImageUrl: "Coller le lien de l'image (http/https)",
    invalidImageUrl: "Veuillez saisir un lien d'image valide",
    addImage: 'Ajouter une image',
    chooseUpload: 'Téléverser',
    chooseLink: 'Remplir le lien',
    addByLink: 'Ajouter par lien',
    confirmUpload: 'Confirmer',
    localUpload: 'Téléversement local',
    subscriptionRecords: 'Abonnements',
    back: 'Retour',
    addEngine: 'Ajouter',
    remove: 'Retirer',
    searchEngines: 'Moteurs de recherche',
    days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    loginBeforeSave: 'Veuillez vous connecter avant d\'enregistrer et synchroniser cette modification',
    supabaseMissing: 'Supabase n\'est pas initialisé. Vérifiez les identifiants dans config.js.',
    themeLoadFailed: 'Échec du chargement des paramètres du thème. Actualisez la page.',
    gumroadLinkMissing: 'Le lien de paiement Gumroad n\'est pas configuré.',
    openingGumroadPage: 'Ouverture de la page Gumroad...',
    openingGumroadCheckout: 'Ouverture du paiement Gumroad...',
    feedbackContentRequired: 'Veuillez saisir le contenu du retour',
    feedbackSubmitFailed: 'Échec de l\'envoi, veuillez réessayer',
    feedbackSubmitSuccess: 'Merci pour votre retour !',
    amountRangeInvalid: 'Veuillez saisir un montant entre 1 et 100',
    paymentNotConfigured: 'Le paiement n\'est pas configuré. Contactez le développeur.',
    paymentModuleLoadFailed: 'Échec du chargement du module de paiement. Actualisez la page.',
    donationComingSoon: 'Merci pour votre soutien. Les dons arrivent bientôt.',
    saveThemeSuccess: 'Thème enregistré !',
    saveThemeFailed: 'Échec de l\'enregistrement, veuillez réessayer',
    resetThemeSuccess: 'Personnalisation du thème réinitialisée',
    upgradeFailed: 'Échec de la mise à niveau, veuillez réessayer',
    paymentSystemNotLoaded: 'Système de paiement non chargé. Actualisez la page.',
    syncLoadFailed: 'Échec de la synchronisation. Veuillez réessayer plus tard.',
    syncSaveFailed: 'Échec de l\'enregistrement. Vos modifications ne sont pas encore synchronisées.',
    syncRemoteWins: 'La configuration cloud a changé. La dernière version a été chargée.',
    deleteItemConfirm: 'Voulez-vous vraiment supprimer cet élément ?',
    loginRequiredTitle: 'Connexion requise',
    loginRequiredDesc: 'Veuillez vous connecter avant d\'utiliser cette fonctionnalité',
    loginNow: 'Se connecter',
    upgradeMembership: 'Passer à l\'offre premium',
    upgradeDesc: 'Débloquez plus de fonctionnalités et améliorez votre expérience',
    premium: 'Premium',
    superMembership: 'Super',
    upgradeMonthly: 'Mensuel',
    upgradeYearly: 'Annuel',
    currentPlan: 'Forfait actuel',
    maybeLater: 'Plus tard',
    customThemes: 'Thèmes personnalisés',
    customFonts: 'Polices personnalisées',
    uploadWallpapersLimited: 'Téléverser des fonds d\'écran (50 images)',
    allPremiumFeatures: 'Toutes les fonctionnalités premium',
    unlimitedWallpaperUploads: 'Téléversements illimités',
    unlockThemeCustomization: 'Débloquer la personnalisation du thème',
    unlockCustomWallpapers: 'Débloquer les fonds d\'écran personnalisés',
    unlockFontCustomization: 'Débloquer les polices personnalisées',
    upgradeThemeDesc: 'Passez à l\'offre premium pour personnaliser librement votre thème.',
    upgradeWallpaperDesc: 'Passez à l\'offre premium pour téléverser vos fonds d\'écran.',
    upgradeFontDesc: 'Passez à l\'offre premium pour choisir vos polices.',
    zoom: 'Zoom',
    zoom100: '100%',
    zoom125: '125%',
    zoom150: '150%',
    newFolder: 'Nouveau dossier',
    folder: 'Dossier',
    rename: 'Renommer',
    renameTitle: 'Renommer',
    renameLabel: 'Nom du dossier',
    renamePlaceholder: 'Saisir un nouveau nom',
    folderNameRequired: 'Le nom du dossier ne peut pas être vide',
    deleteFolderConfirm: 'Supprimer ce dossier ? Les sites à l\'intérieur reviendront à l\'accueil.',
    moveOutFolder: 'Sortir du dossier',
    emptyFolder: 'Ce dossier est vide. Faites glisser un site sur l\'icône du dossier pour l\'ajouter.',
    folderMergeHint: 'Faites glisser un site sur une autre icône pour les fusionner dans un dossier.',
    mode: 'Mode',
    addFolder: 'Ajouter un dossier',
    modeGeneral: 'Général',
    modeMinimalist: 'Minimal',
    appearance: 'Apparence',
    settings: 'Paramètres',
    account: 'Compte',
    pluginNotes: 'Notes',
    pluginTodo: 'Todo List',
    pluginCalendar: 'Calendrier',
    pluginAdd: 'Ajouter un plugin',
    pluginPickerTitle: 'Choisir les plugins du tableau de bord',
    notesEmpty: 'Aucune note',
    addNote: 'Ajouter une note',
    todoEmpty: 'Rien à faire',
    todoPlaceholder: 'Ajouter une tâche',
    calendarEmpty: 'Aucun événement ce jour',
    eventPlaceholder: 'Ajouter un événement',
    workbenchHint: 'Faites défiler vers le haut ou appuyez sur Page précédente pour revenir à l\'accueil',
    agentProject: 'Projet',
    agentChats: 'Conversations',
    agentNewProject: 'Nouveau projet',
    agentNewChat: 'Nouvelle conversation',
    agentNoChat: 'Aucune conversation',
    agentLoginRequired: 'Connexion requise',
    agentPlaceholder: 'Écrivez un message à votre Agent…',
    agentSend: 'Envoyer',
    agentWelcome: 'Choisissez un fournisseur et connectez-vous pour discuter.\nLes messages sont archivés par Projet → Conversation.',
    settingsModalTitle: 'Paramètres',
    timeFormatLabel: 'Format de l\'heure',
    settingsLangLabel: 'Langue',
    openBehaviorLabel: 'Ouvrir les liens',
    tf24: '24 heures',
    tf12: '12 heures',
    obNew: 'Nouvel onglet',
    obCurrent: 'Onglet actuel',
    settingsAbout: 'À propos',
    followSystem: 'Système',
    appearanceDone: 'Terminé',
    appearanceStyle: 'Style',
    appearanceFont: 'Police',
    appearanceZoom: 'Zoom',
    appearanceViewMode: 'Mode',
    appearanceColorMode: 'Mode couleur',
    appearanceWallpaper: 'Fond d\'écran',
    workbench: 'Tableau de bord',
    wbBackHome: 'Accueil',
    pluginNoData: 'Vide',
    pluginTodayEvents: 'Aujourd\'hui',
    todoAll: 'Toutes',
    todoActive: 'En cours',
    todoDone: 'Terminées',
    todoLow: 'Basse',
    todoMedium: 'Moyenne',
    todoHigh: 'Haute',
    eventEdit: 'Modifier le titre de l\'événement',
    agentRename: 'Renommer',
    agentDelete: 'Supprimer',
    agentCopy: 'Copier',
    agentCopied: 'Copié',
    agentRegenerate: 'Régénérer',
    agentAttachImage: 'Joindre une image (coller pris en charge)',
    agentImageFailed: 'Échec du traitement de l\'image',
    agentImageMessage: 'Message image',
    agentVisionNotSupported: 'Ce modèle ne prend pas en charge les images. Choisissez un modèle visuel marqué 🖼.',
    agentProjectDeleteConfirm: 'Supprimer ce projet et toutes ses conversations ?',
    agentChatDeleteConfirm: 'Supprimer cette conversation ?',
    confirmText: 'Confirmer'
  },
  es: {
    search: '¿Qué quieres buscar?',
    addNew: 'Añadir',
    addNewTitle: 'Añadir sitio',
    site: 'Sitio',
    tag: 'Etiqueta',
    name: 'Nombre',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'Nombre de etiqueta',
    selectTags: 'Seleccionar etiquetas',
    pinToHome: 'Fijar en inicio',
    engineLimit: 'Puedes elegir hasta 5 motores', engineSelected: '{n}/5 seleccionados',
    iconTextLabel: 'Texto', iconColorLabel: 'Fondo', iconCustom: 'Personalizado',
    done: 'Listo', accentLabel: 'Color de acento', accentCustom: 'Personalizado', accentBlue: 'Azul', accentPurple: 'Morado', accentPink: 'Rosa', accentRed: 'Rojo', accentOrange: 'Naranja', accentYellow: 'Amarillo', accentGreen: 'Verde', accentGraphite: 'Grafito', folderSitesLabel: 'Sitios para la carpeta', folderNoSites: 'Todavía no hay sitios en el inicio para añadir', folderDragOutHint: 'Arrastra un icono fuera de esta ventana para sacarlo de la carpeta',
    iconLabel: 'Icono', iconUpload: 'Subir imagen', iconAuto: 'Automático', iconInvalid: 'No se pudo leer esta imagen',
    cancel: 'Cancelar',
    save: 'Guardar',
    close: 'Cerrar',
    delete: 'Eliminar',
    deleteConfirm: 'Confirmar eliminación',
    edit: 'Editar',
    noSites: 'Sin sitios en esta etiqueta',
    nameRequired: 'Nombre y URL obligatorios',
    tagNameRequired: 'El nombre de etiqueta es obligatorio',
    tagExists: 'La etiqueta ya existe',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    googleSignIn: 'Iniciar sesión',
    googleLoginButton: 'Iniciar sesión con Google',
    loginSuccess: '¡Sesión iniciada!',
    logoutSuccess: 'Sesión cerrada',
    wallpaper: 'Fondo de pantalla',
    wallpaperTitle: 'Elegir fondo de pantalla',
    landscape: 'Paisaje',
    solid: 'Sólido',
    daily: 'Diario',
    wallpaperChanged: 'Fondo cambiado',
    restoreDefault: 'Restaurar predeterminado',
    restoredDefault: 'Predeterminado restaurado',
    userProfile: 'Perfil',
    minimalist: 'Modo minimalista',
    general: 'Modo general',
    language: 'Idioma',
    chinese: 'Chino',
    english: 'Inglés',
    custom: 'Personalizado',
    upload: 'Subir',
    uploadWallpaper: 'Subir fondo de pantalla',
    themeCustomization: 'Personalización del tema',
    about: 'Acerca de',
    aboutTitle: 'Acerca de NewTab',
    aboutDesc: 'NewTab es una página de nueva pestaña personalizable: búsqueda, fondos, temas, accesos directos y sincronización en la nube.',
    officialWebsite: 'Sitio oficial',
    buyMeCoffee: 'Invítame a un café',
    coffeeDesc: 'Apoyar el desarrollo',
    feedback: 'Comentarios',
    feedbackType: 'Tipo de comentario',
    feedbackContent: 'Contenido',
    feedbackEmail: 'Correo',
    feedbackPlaceholder: 'Describe tu problema o sugerencia',
    submit: 'Enviar',
    submitting: 'Enviando...',
    pay: 'Pagar',
    customAmount: 'Monto personalizado',
    addSite: 'Añadir sitio',
    addTag: 'Añadir etiqueta',
    changeWallpaper: 'Cambiar fondo',
    feedbackTypeBug: 'Error',
    feedbackTypeFeature: 'Función',
    feedbackTypeOther: 'Otro',
    editSite: 'Editar sitio',
    editTag: 'Editar etiqueta',
    imageUrl: 'URL de imagen',
    apply: 'Aplicar',
    pasteImageUrl: 'Pegar enlace de imagen (http/https)',
    invalidImageUrl: 'Ingresa un enlace de imagen válido',
    addImage: 'Añadir imagen',
    chooseUpload: 'Subir',
    chooseLink: 'Usar enlace',
    addByLink: 'Añadir por enlace',
    confirmUpload: 'Confirmar subida',
    localUpload: 'Subida local',
    subscriptionRecords: 'Suscripciones',
    back: 'Atrás',
    addEngine: 'Añadir',
    remove: 'Quitar',
    searchEngines: 'Motores de búsqueda',
    days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    loginBeforeSave: 'Inicia sesión antes de guardar y sincronizar este cambio',
    supabaseMissing: 'Supabase no está inicializado. Revisa las credenciales en config.js.',
    themeLoadFailed: 'No se pudieron cargar los ajustes del tema. Actualiza la página.',
    gumroadLinkMissing: 'El enlace de pago de Gumroad no está configurado.',
    openingGumroadPage: 'Abriendo la página de Gumroad...',
    openingGumroadCheckout: 'Abriendo el pago de Gumroad...',
    feedbackContentRequired: 'Introduce el contenido del comentario',
    feedbackSubmitFailed: 'Error al enviar, inténtalo de nuevo',
    feedbackSubmitSuccess: '¡Gracias por tu comentario!',
    amountRangeInvalid: 'Introduce un importe entre 1 y 100',
    paymentNotConfigured: 'El pago no está configurado. Contacta con el desarrollador.',
    paymentModuleLoadFailed: 'No se pudo cargar el módulo de pago. Actualiza la página.',
    donationComingSoon: 'Gracias por tu apoyo. Las donaciones llegarán pronto.',
    saveThemeSuccess: '¡Tema guardado!',
    saveThemeFailed: 'Error al guardar, inténtalo de nuevo',
    resetThemeSuccess: 'Personalización del tema restablecida',
    upgradeFailed: 'Error al actualizar, inténtalo de nuevo',
    paymentSystemNotLoaded: 'Sistema de pago no cargado. Actualiza la página.',
    syncLoadFailed: 'No se pudo sincronizar. Inténtalo más tarde.',
    syncSaveFailed: 'Error al guardar. Tus cambios aún no se han sincronizado.',
    syncRemoteWins: 'La configuración en la nube cambió. Se cargó la última versión.',
    deleteItemConfirm: '¿Seguro que quieres eliminar este elemento?',
    loginRequiredTitle: 'Inicio de sesión requerido',
    loginRequiredDesc: 'Inicia sesión antes de usar esta función',
    loginNow: 'Iniciar sesión',
    upgradeMembership: 'Mejorar membresía',
    upgradeDesc: 'Desbloquea funciones premium y mejora tu experiencia',
    premium: 'Premium',
    superMembership: 'Super',
    upgradeMonthly: 'Mensual',
    upgradeYearly: 'Anual',
    currentPlan: 'Plan actual',
    maybeLater: 'Quizás después',
    customThemes: 'Temas personalizados',
    customFonts: 'Fuentes personalizadas',
    uploadWallpapersLimited: 'Subir fondos de pantalla (50 imágenes)',
    allPremiumFeatures: 'Todas las funciones premium',
    unlimitedWallpaperUploads: 'Subidas ilimitadas',
    unlockThemeCustomization: 'Desbloquear personalización del tema',
    unlockCustomWallpapers: 'Desbloquear fondos personalizados',
    unlockFontCustomization: 'Desbloquear fuentes personalizadas',
    upgradeThemeDesc: 'Mejora para personalizar tu tema libremente.',
    upgradeWallpaperDesc: 'Mejora para subir tus propios fondos de pantalla.',
    upgradeFontDesc: 'Mejora para elegir tus fuentes preferidas.',
    zoom: 'Zoom',
    zoom100: '100%',
    zoom125: '125%',
    zoom150: '150%',
    newFolder: 'Nueva carpeta',
    folder: 'Carpeta',
    rename: 'Renombrar',
    renameTitle: 'Renombrar',
    renameLabel: 'Nombre de la carpeta',
    renamePlaceholder: 'Introduce un nuevo nombre',
    folderNameRequired: 'El nombre de la carpeta no puede estar vacío',
    deleteFolderConfirm: '¿Eliminar esta carpeta? Los sitios volverán a la página de inicio.',
    moveOutFolder: 'Sacar de la carpeta',
    emptyFolder: 'Esta carpeta está vacía. Arrastra un sitio al icono de la carpeta para añadirlo.',
    folderMergeHint: 'Arrastra un sitio sobre otro icono para fusionarlos en una carpeta.',
    mode: 'Modo',
    addFolder: 'Añadir carpeta',
    modeGeneral: 'General',
    modeMinimalist: 'Minimalista',
    appearance: 'Apariencia',
    settings: 'Ajustes',
    account: 'Cuenta',
    pluginNotes: 'Notas',
    pluginTodo: 'Todo List',
    pluginCalendar: 'Calendario',
    pluginAdd: 'Añadir plugin',
    pluginPickerTitle: 'Elegir plugins del panel',
    notesEmpty: 'Sin notas',
    addNote: 'Añadir nota',
    todoEmpty: 'Nada que hacer',
    todoPlaceholder: 'Añadir tarea',
    calendarEmpty: 'Sin eventos hoy',
    eventPlaceholder: 'Añadir evento',
    workbenchHint: 'Desplázate hacia arriba o pulsa RePág para volver al inicio',
    agentProject: 'Proyecto',
    agentChats: 'Conversaciones',
    agentNewProject: 'Nuevo proyecto',
    agentNewChat: 'Nueva conversación',
    agentNoChat: 'Sin conversaciones',
    agentLoginRequired: 'Inicia sesión',
    agentPlaceholder: 'Escribe un mensaje a tu Agente…',
    agentSend: 'Enviar',
    agentWelcome: 'Elige un proveedor e inicia sesión para chatear.\nLos mensajes se archivan por Proyecto → Conversación.',
    settingsModalTitle: 'Ajustes',
    timeFormatLabel: 'Formato de hora',
    settingsLangLabel: 'Idioma',
    openBehaviorLabel: 'Abrir enlaces en',
    tf24: '24 horas',
    tf12: '12 horas',
    obNew: 'Nueva pestaña',
    obCurrent: 'Pestaña actual',
    settingsAbout: 'Acerca de',
    followSystem: 'Sistema',
    appearanceDone: 'Listo',
    appearanceStyle: 'Estilo',
    appearanceFont: 'Fuente',
    appearanceZoom: 'Zoom',
    appearanceViewMode: 'Modo',
    appearanceColorMode: 'Modo de color',
    appearanceWallpaper: 'Fondo de pantalla',
    workbench: 'Panel',
    wbBackHome: 'Inicio',
    pluginNoData: 'Vacío',
    pluginTodayEvents: 'Hoy',
    todoAll: 'Todas',
    todoActive: 'En curso',
    todoDone: 'Completadas',
    todoLow: 'Baja',
    todoMedium: 'Media',
    todoHigh: 'Alta',
    eventEdit: 'Editar título del evento',
    agentRename: 'Renombrar',
    agentDelete: 'Eliminar',
    agentCopy: 'Copiar',
    agentCopied: 'Copiado',
    agentRegenerate: 'Regenerar',
    agentAttachImage: 'Adjuntar imagen (pegar admitido)',
    agentImageFailed: 'Error al procesar la imagen',
    agentImageMessage: 'Mensaje con imagen',
    agentVisionNotSupported: 'Este modelo no admite imágenes. Elige un modelo visual marcado con 🖼.',
    agentProjectDeleteConfirm: '¿Eliminar este proyecto y todas sus conversaciones?',
    agentChatDeleteConfirm: '¿Eliminar esta conversación?',
    confirmText: 'Confirmar'
  },
  ja: {
    search: '何を検索しますか？',
    addNew: '追加',
    addNewTitle: 'サイトを追加',
    site: 'サイト',
    tag: 'タグ',
    name: '名前',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'タグ名',
    selectTags: 'タグを選択',
    pinToHome: 'ホームに固定',
    engineLimit: '選択できる検索エンジンは 5 つまでです', engineSelected: '{n}/5 選択中',
    iconTextLabel: 'テキスト', iconColorLabel: '背景色', iconCustom: 'カスタム',
    done: '完了', accentLabel: 'アクセントカラー', accentCustom: 'カスタム', accentBlue: 'ブルー', accentPurple: 'パープル', accentPink: 'ピンク', accentRed: 'レッド', accentOrange: 'オレンジ', accentYellow: 'イエロー', accentGreen: 'グリーン', accentGraphite: 'グラファイト', folderSitesLabel: 'フォルダに入れるサイト', folderNoSites: 'ホームに追加できるサイトがまだありません', folderDragOutHint: 'アイコンをウインドウの外へドラッグするとフォルダから出せます',
    iconLabel: 'アイコン', iconUpload: '画像をアップロード', iconAuto: '自動取得', iconInvalid: 'この画像を読み込めませんでした',
    cancel: 'キャンセル',
    save: '保存',
    close: '閉じる',
    delete: '削除',
    deleteConfirm: '削除を確認',
    edit: '編集',
    noSites: 'このタグにサイトがありません',
    nameRequired: '名前とURLは必須です',
    tagNameRequired: 'タグ名は必須です',
    tagExists: 'タグは既に存在します',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    login: 'ログイン',
    logout: 'ログアウト',
    googleSignIn: 'ログイン',
    googleLoginButton: 'Google でログイン',
    loginSuccess: 'ログインしました',
    logoutSuccess: 'ログアウトしました',
    wallpaper: '壁紙',
    wallpaperTitle: '壁紙を選択',
    landscape: '風景',
    solid: '単色',
    daily: '毎日のおすすめ',
    wallpaperChanged: '壁紙を変更しました',
    restoreDefault: 'デフォルトに戻す',
    restoredDefault: 'デフォルトに戻しました',
    userProfile: 'プロフィール',
    minimalist: 'ミニマルモード',
    general: '一般モード',
    language: '言語',
    chinese: '中国語',
    english: '英語',
    custom: 'カスタム',
    upload: 'アップロード',
    uploadWallpaper: '壁紙をアップロード',
    themeCustomization: 'テーマのカスタマイズ',
    about: 'このアプリについて',
    aboutTitle: 'NewTab について',
    aboutDesc: 'NewTab はカスタマイズ可能な新規タブページです：検索、壁紙、テーマ、ショートカット、クラウド同期。',
    officialWebsite: '公式サイト',
    buyMeCoffee: 'コーヒーをおごる',
    coffeeDesc: '開発を支援する',
    feedback: 'フィードバック',
    feedbackType: '種類',
    feedbackContent: '内容',
    feedbackEmail: 'メール',
    feedbackPlaceholder: '問題や提案を記入してください',
    submit: '送信',
    submitting: '送信中...',
    pay: '支払う',
    customAmount: '任意の金額',
    addSite: 'サイトを追加',
    addTag: 'タグを追加',
    changeWallpaper: '壁紙を変更',
    feedbackTypeBug: 'バグ報告',
    feedbackTypeFeature: '機能提案',
    feedbackTypeOther: 'その他',
    editSite: 'サイトを編集',
    editTag: 'タグを編集',
    imageUrl: '画像URL',
    apply: '適用',
    pasteImageUrl: '画像リンクを貼り付け (http/https)',
    invalidImageUrl: '正しい画像リンクを入力してください',
    addImage: '画像を追加',
    chooseUpload: 'アップロード',
    chooseLink: 'リンクを入力',
    addByLink: 'リンクで追加',
    confirmUpload: 'アップロード確認',
    localUpload: 'ローカルアップロード',
    subscriptionRecords: '購読履歴',
    back: '戻る',
    addEngine: '追加',
    remove: '削除',
    searchEngines: '検索エンジン',
    days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    loginBeforeSave: '保存・同期するにはログインしてください',
    supabaseMissing: 'Supabase が初期化されていません。config.js の認証情報を確認してください。',
    themeLoadFailed: 'テーマ設定の読み込みに失敗しました。ページを更新してください。',
    gumroadLinkMissing: 'Gumroad の支払いリンクが設定されていません。',
    openingGumroadPage: 'Gumroad ページを開いています...',
    openingGumroadCheckout: 'Gumroad の決済を開いています...',
    feedbackContentRequired: 'フィードバック内容を入力してください',
    feedbackSubmitFailed: '送信に失敗しました。もう一度お試しください',
    feedbackSubmitSuccess: 'フィードバックありがとうございます！',
    amountRangeInvalid: '1〜100 の金額を入力してください',
    paymentNotConfigured: '支払いが設定されていません。開発者にお問い合わせください。',
    paymentModuleLoadFailed: '支払いモジュールの読み込みに失敗しました。ページを更新してください。',
    donationComingSoon: 'ご支援ありがとうございます。寄付機能は近日公開予定です。',
    saveThemeSuccess: 'テーマを保存しました',
    saveThemeFailed: '保存に失敗しました。もう一度お試しください',
    resetThemeSuccess: 'テーマをデフォルトに戻しました',
    upgradeFailed: 'アップグレードに失敗しました。もう一度お試しください',
    paymentSystemNotLoaded: '支払いシステムが読み込まれていません。ページを更新してください。',
    syncLoadFailed: '同期に失敗しました。後でもう一度お試しください。',
    syncSaveFailed: '保存に失敗しました。変更はまだクラウドに同期されていません。',
    syncRemoteWins: 'クラウドの設定が更新されました。最新の設定を読み込みました。',
    deleteItemConfirm: 'この項目を削除しますか？',
    loginRequiredTitle: 'ログインが必要です',
    loginRequiredDesc: 'この機能を利用するにはログインしてください',
    loginNow: 'ログイン',
    upgradeMembership: 'メンバーシップをアップグレード',
    upgradeDesc: 'プレミアム機能を解放して体験を向上',
    premium: 'プレミアム',
    superMembership: 'スーパー',
    upgradeMonthly: '月額',
    upgradeYearly: '年額',
    currentPlan: '現在のプラン',
    maybeLater: '後で',
    customThemes: 'カスタムテーマ',
    customFonts: 'カスタムフォント',
    uploadWallpapersLimited: '壁紙アップロード（50枚）',
    allPremiumFeatures: 'すべてのプレミアム機能',
    unlimitedWallpaperUploads: 'アップロード無制限',
    unlockThemeCustomization: 'テーマカスタマイズを解放',
    unlockCustomWallpapers: 'カスタム壁紙を解放',
    unlockFontCustomization: 'フォントカスタマイズを解放',
    upgradeThemeDesc: 'アップグレードしてテーマを自由にカスタマイズできます。',
    upgradeWallpaperDesc: 'アップグレードして好きな壁紙をアップロードできます。',
    upgradeFontDesc: 'アップグレードして好きなフォントを選べます。',
    zoom: 'ズーム',
    zoom100: '100%',
    zoom125: '125%',
    zoom150: '150%',
    newFolder: '新しいフォルダ',
    folder: 'フォルダ',
    rename: '名前を変更',
    renameTitle: '名前を変更',
    renameLabel: 'フォルダ名',
    renamePlaceholder: '新しい名前を入力',
    folderNameRequired: 'フォルダ名は空にできません',
    deleteFolderConfirm: 'このフォルダを削除しますか？中のサイトはホームに戻ります。',
    moveOutFolder: 'フォルダから出す',
    emptyFolder: 'このフォルダは空です。サイトをフォルダのアイコンにドラッグして追加できます。',
    folderMergeHint: 'サイトを別のアイコンにドラッグするとフォルダにまとめられます。',
    mode: 'モード',
    addFolder: 'フォルダを追加',
    modeGeneral: '一般',
    modeMinimalist: 'ミニマル',
    appearance: '外観',
    settings: '設定',
    account: 'アカウント',
    pluginNotes: 'メモ',
    pluginTodo: 'Todo List',
    pluginCalendar: 'カレンダー',
    pluginAdd: 'プラグインを追加',
    pluginPickerTitle: 'ワークスペースのプラグインを選択',
    notesEmpty: 'メモはありません',
    addNote: 'メモを追加',
    todoEmpty: 'タスクはありません',
    todoPlaceholder: 'タスクを追加',
    calendarEmpty: '当日の予定はありません',
    eventPlaceholder: '予定を追加',
    workbenchHint: '上にスクロールするか PageUp でホームに戻ります',
    agentProject: 'プロジェクト',
    agentChats: 'チャット',
    agentNewProject: '新規プロジェクト',
    agentNewChat: '新規チャット',
    agentNoChat: 'チャットはありません',
    agentLoginRequired: 'ログインが必要です',
    agentPlaceholder: 'エージェントにメッセージを入力…',
    agentSend: '送信',
    agentWelcome: 'モデルプロバイダーを選び、ログインして会話を始めましょう。\nメッセージは「プロジェクト → チャット」で管理されます。',
    settingsModalTitle: '設定',
    timeFormatLabel: '時刻形式',
    settingsLangLabel: '言語',
    openBehaviorLabel: 'リンクの開き方',
    tf24: '24時間',
    tf12: '12時間',
    obNew: '新しいタブ',
    obCurrent: '現在のタブ',
    settingsAbout: 'このアプリについて',
    followSystem: 'システムに従う',
    appearanceDone: '完了',
    appearanceStyle: 'スタイル',
    appearanceFont: 'フォント',
    appearanceZoom: 'ズーム',
    appearanceViewMode: 'モード',
    appearanceColorMode: 'カラーモード',
    appearanceWallpaper: '壁紙',
    workbench: 'ワークスペース',
    wbBackHome: 'ホーム',
    pluginNoData: 'データなし',
    pluginTodayEvents: '今日の予定',
    todoAll: 'すべて',
    todoActive: '進行中',
    todoDone: '完了',
    todoLow: '低',
    todoMedium: '中',
    todoHigh: '高',
    eventEdit: '予定タイトルを編集',
    agentRename: '名前を変更',
    agentDelete: '削除',
    agentCopy: 'コピー',
    agentCopied: 'コピーしました',
    agentRegenerate: '再生成',
    agentAttachImage: '画像を添付（貼り付け対応）',
    agentImageFailed: '画像の処理に失敗しました',
    agentImageMessage: '画像メッセージ',
    agentVisionNotSupported: 'このモデルは画像に対応していません。🖼 付きのビジョンモデルを選択してください。',
    agentProjectDeleteConfirm: 'このプロジェクトとすべてのチャットを削除しますか？',
    agentChatDeleteConfirm: 'このチャットを削除しますか？',
    confirmText: '確認'
  },
  ko: {
    search: '무엇을 검색하시겠어요?',
    addNew: '추가',
    addNewTitle: '사이트 추가',
    site: '사이트',
    tag: '태그',
    name: '이름',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: '태그 이름',
    selectTags: '태그 선택',
    pinToHome: '홈에 고정',
    engineLimit: '검색 엔진은 최대 5개까지 선택할 수 있습니다', engineSelected: '{n}/5 선택됨',
    iconTextLabel: '텍스트', iconColorLabel: '배경색', iconCustom: '사용자 지정',
    done: '완료', accentLabel: '강조 색상', accentCustom: '사용자 지정', accentBlue: '파란색', accentPurple: '보라색', accentPink: '분홍색', accentRed: '빨간색', accentOrange: '주황색', accentYellow: '노란색', accentGreen: '초록색', accentGraphite: '그래파이트', folderSitesLabel: '폴더에 넣을 사이트', folderNoSites: '아직 홈에 추가할 사이트가 없습니다', folderDragOutHint: '아이콘을 창 밖으로 드래그하면 폴더에서 꺼낼 수 있습니다',
    iconLabel: '아이콘', iconUpload: '이미지 업로드', iconAuto: '자동', iconInvalid: '이 이미지를 읽을 수 없습니다',
    cancel: '취소',
    save: '저장',
    close: '닫기',
    delete: '삭제',
    deleteConfirm: '삭제 확인',
    edit: '편집',
    noSites: '이 태그에 사이트가 없습니다',
    nameRequired: '이름과 URL은 필수입니다',
    tagNameRequired: '태그 이름은 필수입니다',
    tagExists: '태그가 이미 있습니다',
    darkMode: '다크 모드',
    lightMode: '라이트 모드',
    login: '로그인',
    logout: '로그아웃',
    googleSignIn: '로그인',
    googleLoginButton: 'Google로 로그인',
    loginSuccess: '로그인 성공!',
    logoutSuccess: '로그아웃 완료',
    wallpaper: '배경화면',
    wallpaperTitle: '배경화면 선택',
    landscape: '풍경',
    solid: '단색',
    daily: '매일 추천',
    wallpaperChanged: '배경화면이 변경되었습니다',
    restoreDefault: '기본값 복원',
    restoredDefault: '기본값으로 복원됨',
    userProfile: '프로필',
    minimalist: '미니멀 모드',
    general: '일반 모드',
    language: '언어',
    chinese: '중국어',
    english: '영어',
    custom: '사용자 지정',
    upload: '업로드',
    uploadWallpaper: '배경화면 업로드',
    themeCustomization: '테마 사용자 지정',
    about: '정보',
    aboutTitle: 'NewTab 정보',
    aboutDesc: 'NewTab은 검색, 배경화면, 테마, 바로가기, 클라우드 동기화를 지원하는 맞춤형 새 탭 페이지입니다.',
    officialWebsite: '공식 웹사이트',
    buyMeCoffee: '커피 한 잔 사주기',
    coffeeDesc: '개발 지원하기',
    feedback: '피드백',
    feedbackType: '유형',
    feedbackContent: '내용',
    feedbackEmail: '이메일',
    feedbackPlaceholder: '문제나 제안을 입력하세요',
    submit: '제출',
    submitting: '제출 중...',
    pay: '결제',
    customAmount: '사용자 지정 금액',
    addSite: '사이트 추가',
    addTag: '태그 추가',
    changeWallpaper: '배경화면 변경',
    feedbackTypeBug: '버그 신고',
    feedbackTypeFeature: '기능 제안',
    feedbackTypeOther: '기타',
    editSite: '사이트 편집',
    editTag: '태그 편집',
    imageUrl: '이미지 URL',
    apply: '적용',
    pasteImageUrl: '이미지 링크 붙여넣기 (http/https)',
    invalidImageUrl: '올바른 이미지 링크를 입력하세요',
    addImage: '이미지 추가',
    chooseUpload: '업로드',
    chooseLink: '링크 입력',
    addByLink: '링크로 추가',
    confirmUpload: '업로드 확인',
    localUpload: '로컬 업로드',
    subscriptionRecords: '구독 기록',
    back: '뒤로',
    addEngine: '추가',
    remove: '제거',
    searchEngines: '검색 엔진',
    days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    loginBeforeSave: '변경 사항을 저장하고 동기화하려면 로그인하세요',
    supabaseMissing: 'Supabase가 초기화되지 않았습니다. config.js의 자격 증명을 확인하세요.',
    themeLoadFailed: '테마 설정을 불러오지 못했습니다. 페이지를 새로고침하세요.',
    gumroadLinkMissing: 'Gumroad 결제 링크가 설정되지 않았습니다.',
    openingGumroadPage: 'Gumroad 페이지를 여는 중...',
    openingGumroadCheckout: 'Gumroad 결제를 여는 중...',
    feedbackContentRequired: '피드백 내용을 입력하세요',
    feedbackSubmitFailed: '제출에 실패했습니다. 다시 시도해 주세요',
    feedbackSubmitSuccess: '피드백 감사합니다!',
    amountRangeInvalid: '1~100 사이의 금액을 입력하세요',
    paymentNotConfigured: '결제가 설정되지 않았습니다. 개발자에게 문의하세요.',
    paymentModuleLoadFailed: '결제 모듈을 불러오지 못했습니다. 페이지를 새로고침하세요.',
    donationComingSoon: '지원해 주셔서 감사합니다. 기부 기능이 곧 제공됩니다.',
    saveThemeSuccess: '테마가 저장되었습니다!',
    saveThemeFailed: '저장에 실패했습니다. 다시 시도해 주세요',
    resetThemeSuccess: '테마 사용자 지정이 초기화되었습니다',
    upgradeFailed: '업그레이드에 실패했습니다. 다시 시도해 주세요',
    paymentSystemNotLoaded: '결제 시스템이 로드되지 않았습니다. 페이지를 새로고침하세요.',
    syncLoadFailed: '동기화에 실패했습니다. 나중에 다시 시도해 주세요.',
    syncSaveFailed: '저장에 실패했습니다. 변경 사항이 아직 클라우드에 동기화되지 않았습니다.',
    syncRemoteWins: '클라우드 설정이 변경되어 최신 설정을 불러왔습니다.',
    deleteItemConfirm: '이 항목을 삭제하시겠습니까?',
    loginRequiredTitle: '로그인 필요',
    loginRequiredDesc: '이 기능을 사용하려면 먼저 로그인하세요',
    loginNow: '로그인',
    upgradeMembership: '멤버십 업그레이드',
    upgradeDesc: '프리미엄 기능을 잠금 해제하고 경험을 향상하세요',
    premium: '프리미엄',
    superMembership: '슈퍼',
    upgradeMonthly: '월간',
    upgradeYearly: '연간',
    currentPlan: '현재 플랜',
    maybeLater: '나중에',
    customThemes: '사용자 지정 테마',
    customFonts: '사용자 지정 글꼴',
    uploadWallpapersLimited: '배경화면 업로드 (50개)',
    allPremiumFeatures: '모든 프리미엄 기능',
    unlimitedWallpaperUploads: '무제한 업로드',
    unlockThemeCustomization: '테마 사용자 지정 잠금 해제',
    unlockCustomWallpapers: '사용자 지정 배경화면 잠금 해제',
    unlockFontCustomization: '글꼴 사용자 지정 잠금 해제',
    upgradeThemeDesc: '업그레이드하면 테마를 자유롭게 꾸밀 수 있습니다.',
    upgradeWallpaperDesc: '업그레이드하면 원하는 배경화면을 업로드할 수 있습니다.',
    upgradeFontDesc: '업그레이드하면 원하는 글꼴을 선택할 수 있습니다.',
    zoom: '확대/축소',
    zoom100: '100%',
    zoom125: '125%',
    zoom150: '150%',
    newFolder: '새 폴더',
    folder: '폴더',
    rename: '이름 바꾸기',
    renameTitle: '이름 바꾸기',
    renameLabel: '폴더 이름',
    renamePlaceholder: '새 이름을 입력하세요',
    folderNameRequired: '폴더 이름은 비워둘 수 없습니다',
    deleteFolderConfirm: '이 폴더를 삭제하시겠습니까? 폴더 안의 사이트는 홈으로 이동합니다.',
    moveOutFolder: '폴더에서 꺼내기',
    emptyFolder: '이 폴더는 비어 있습니다. 사이트를 폴더 아이콘으로 끌어다 놓아 추가하세요.',
    folderMergeHint: '사이트를 다른 아이콘으로 끌어다 놓으면 폴더로 병합됩니다.',
    mode: '모드',
    addFolder: '폴더 추가',
    modeGeneral: '일반',
    modeMinimalist: '미니멀',
    appearance: '외관',
    settings: '설정',
    account: '계정',
    pluginNotes: '메모',
    pluginTodo: 'Todo List',
    pluginCalendar: '달력',
    pluginAdd: '플러그인 추가',
    pluginPickerTitle: '워크스페이스 플러그인 선택',
    notesEmpty: '메모가 없습니다',
    addNote: '메모 추가',
    todoEmpty: '할 일이 없습니다',
    todoPlaceholder: '할 일 추가',
    calendarEmpty: '일정이 없습니다',
    eventPlaceholder: '일정 추가',
    workbenchHint: '위로 스크롤하거나 PageUp을 눌러 홈으로 돌아갑니다',
    agentProject: '프로젝트',
    agentChats: '채팅',
    agentNewProject: '새 프로젝트',
    agentNewChat: '새 채팅',
    agentNoChat: '채팅이 없습니다',
    agentLoginRequired: '로그인 필요',
    agentPlaceholder: '에이전트에게 메시지를 입력하세요…',
    agentSend: '보내기',
    agentWelcome: '모델 제공업체를 선택하고 로그인하여 대화를 시작하세요.\n메시지는 「프로젝트 → 채팅」으로 관리됩니다.',
    settingsModalTitle: '설정',
    timeFormatLabel: '시간 형식',
    settingsLangLabel: '언어',
    openBehaviorLabel: '링크 열기',
    tf24: '24시간',
    tf12: '12시간',
    obNew: '새 탭',
    obCurrent: '현재 탭',
    settingsAbout: '정보',
    followSystem: '시스템 팔로우',
    appearanceDone: '완료',
    appearanceStyle: '스타일',
    appearanceFont: '글꼴',
    appearanceZoom: '확대/축소',
    appearanceViewMode: '모드',
    appearanceColorMode: '색상 모드',
    appearanceWallpaper: '배경화면',
    workbench: '워크스페이스',
    wbBackHome: '홈',
    pluginNoData: '데이터 없음',
    pluginTodayEvents: '오늘 일정',
    todoAll: '전체',
    todoActive: '진행 중',
    todoDone: '완료',
    todoLow: '낮음',
    todoMedium: '중간',
    todoHigh: '높음',
    eventEdit: '일정 제목 편집',
    agentRename: '이름 바꾸기',
    agentDelete: '삭제',
    agentCopy: '복사',
    agentCopied: '복사됨',
    agentRegenerate: '재생성',
    agentAttachImage: '이미지 첨부 (붙여넣기 지원)',
    agentImageFailed: '이미지 처리에 실패했습니다',
    agentImageMessage: '이미지 메시지',
    agentVisionNotSupported: '이 모델은 이미지를 지원하지 않습니다. 🖼 표시된 비전 모델을 선택하세요.',
    agentProjectDeleteConfirm: '이 프로젝트와 모든 채팅을 삭제하시겠습니까?',
    agentChatDeleteConfirm: '이 채팅을 삭제하시겠습니까?',
    confirmText: '확인'
  },
};

const TRANSLATION_OVERRIDES = {
  zh: {
    search: '想要搜点什么呢？',
    addNew: '添加',
    addNewTitle: '添加网站',
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
    deleteConfirm: '确认删除',
    edit: '编辑',
    noSites: '这个标签下还没有网站',
    nameRequired: '名称和网址不能为空',
    tagNameRequired: '标签名称不能为空',
    tagExists: '标签已存在',
    darkMode: '深色模式',
    lightMode: '浅色模式',
    login: '登录',
    logout: '退出登录',
    googleSignIn: '登录',
    googleLoginButton: '使用 Google 登录',
    loginSuccess: '登录成功',
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
    general: '通用模式',
    language: '语言',
    chinese: '中文',
    english: '英文',
    custom: '自定义',
    upload: '上传',
    uploadWallpaper: '上传壁纸',
    themeCustomization: '主题',
    about: '关于',
    aboutTitle: '关于 NewTab',
    aboutDesc: '一个简洁又好看的新标签页，让每次打开浏览器都更舒服一点。',
    officialWebsite: '官网',
    buyMeCoffee: 'Buy Me a Coffee',
    coffeeDesc: '如果你喜欢这个项目，欢迎请我喝杯咖啡支持一下。',
    feedback: '提交反馈',
    feedbackType: '反馈类型',
    feedbackContent: '反馈内容',
    feedbackEmail: '联系邮箱（可选）',
    feedbackPlaceholder: '请描述你遇到的问题或你的建议...',
    submit: '提交',
    submitting: '提交中...',
    pay: '支付',
    customAmount: '自定义金额',
    addSite: '添加网站',
    addTag: '添加标签',
    changeWallpaper: '更换壁纸',
    feedbackTypeBug: 'Bug 反馈',
    feedbackTypeFeature: '功能建议',
    feedbackTypeOther: '其他',
    editSite: '编辑网站',
    editTag: '编辑标签',
    imageUrl: '图片地址',
    apply: '应用',
    pasteImageUrl: '粘贴图片链接 (http/https)',
    invalidImageUrl: '请输入有效的图片链接',
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
    loginBeforeSave: '请先登录，再保存并同步当前设置',
    supabaseMissing: 'Supabase 尚未初始化，请检查 config.js 中的配置',
    themeLoadFailed: '主题设置加载失败，请刷新后重试',
    gumroadLinkMissing: 'Gumroad 链接尚未配置，请先完成配置',
    openingGumroadPage: '正在打开 Gumroad 页面...',
    openingGumroadCheckout: '正在打开 Gumroad 支付页...',
    feedbackContentRequired: '请先填写反馈内容',
    feedbackSubmitFailed: '提交失败，请稍后重试',
    feedbackSubmitSuccess: '感谢你的反馈！',
    amountRangeInvalid: '请输入 1 到 100 之间的金额',
    paymentNotConfigured: '支付功能尚未配置，请联系开发者',
    paymentModuleLoadFailed: '支付模块加载失败，请刷新页面后重试',
    donationComingSoon: '感谢支持，赞助功能即将上线',
    saveThemeSuccess: '主题已保存',
    saveThemeFailed: '保存失败，请稍后重试',
    resetThemeSuccess: '主题已恢复默认设置',
    upgradeFailed: '升级失败，请稍后重试',
    paymentSystemNotLoaded: '支付系统尚未加载，请刷新页面后重试',
    syncLoadFailed: '同步最新配置失败，请稍后重试',
    syncSaveFailed: '保存失败，暂未同步到云端',
    syncRemoteWins: '云端配置已更新，已加载最新配置',
    deleteItemConfirm: '确定要删除吗？',
    loginRequiredTitle: '需要登录',
    loginRequiredDesc: '请先登录后再使用这个功能',
    loginNow: '立即登录',
    upgradeMembership: '升级会员',
    upgradeDesc: '解锁更多高级功能，提升你的使用体验',
    premium: '高级会员',
    superMembership: '超级会员',
    upgradeMonthly: '按月升级',
    upgradeYearly: '按年升级',
    currentPlan: '当前方案',
    maybeLater: '稍后再说',
    customThemes: '自定义主题',
    customFonts: '自定义字体',
    uploadWallpapersLimited: '上传壁纸（50 张）',
    allPremiumFeatures: '包含全部高级功能',
    unlimitedWallpaperUploads: '无限上传壁纸',
    unlockThemeCustomization: '解锁主题定制',
    unlockCustomWallpapers: '解锁自定义壁纸',
    unlockFontCustomization: '解锁字体定制',
    upgradeThemeDesc: '升级会员后即可自由定制你的主题风格',
    upgradeWallpaperDesc: '升级会员后即可上传自己喜欢的壁纸',
    upgradeFontDesc: '升级会员后即可选择喜欢的中英文字体组合',
    confirmText: '确认',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  en: {
    loginBeforeSave: 'Please log in before saving and syncing this change',
    supabaseMissing: 'Supabase is not initialized. Please check your config.js credentials.',
    themeLoadFailed: 'Theme settings failed to load. Please refresh and try again.',
    gumroadLinkMissing: 'Gumroad payment link is not configured yet.',
    openingGumroadPage: 'Opening Gumroad page...',
    openingGumroadCheckout: 'Opening Gumroad checkout...',
    feedbackContentRequired: 'Please enter feedback content',
    feedbackSubmitFailed: 'Submit failed, please try again',
    feedbackSubmitSuccess: 'Thank you for your feedback!',
    amountRangeInvalid: 'Please enter an amount between 1 and 100',
    paymentNotConfigured: 'Payment is not configured. Please contact the developer.',
    paymentModuleLoadFailed: 'Payment module failed to load. Please refresh and try again.',
    donationComingSoon: 'Thank you for your support. Donations are coming soon.',
    saveThemeSuccess: 'Theme saved!',
    saveThemeFailed: 'Save failed, please try again',
    resetThemeSuccess: 'Theme customization reset',
    upgradeFailed: 'Upgrade failed, please try again',
    paymentSystemNotLoaded: 'Payment system not loaded. Please refresh and try again.',
    syncLoadFailed: 'Failed to sync the latest settings. Please try again later.',
    syncSaveFailed: 'Save failed. Your changes were not synced to the cloud yet.',
    syncRemoteWins: 'The cloud configuration changed. The latest cloud version has been loaded.',
    deleteItemConfirm: 'Are you sure you want to delete this item?',
    loginRequiredTitle: 'Login Required',
    loginRequiredDesc: 'Please log in before using this feature',
    loginNow: 'Login Now',
    upgradeMembership: 'Upgrade Membership',
    upgradeDesc: 'Unlock premium features and improve your experience',
    premium: 'Premium',
    superMembership: 'Super',
    upgradeMonthly: 'Upgrade Monthly',
    upgradeYearly: 'Upgrade Yearly',
    currentPlan: 'Current Plan',
    maybeLater: 'Maybe Later',
    customThemes: 'Custom themes',
    customFonts: 'Custom fonts',
    uploadWallpapersLimited: 'Upload wallpapers (50 images)',
    allPremiumFeatures: 'All premium features',
    unlimitedWallpaperUploads: 'Unlimited wallpaper uploads',
    unlockThemeCustomization: 'Unlock Theme Customization',
    unlockCustomWallpapers: 'Unlock Custom Wallpapers',
    unlockFontCustomization: 'Unlock Font Customization',
    upgradeThemeDesc: 'Upgrade to customize your theme freely.',
    upgradeWallpaperDesc: 'Upgrade to upload your own wallpapers.',
    upgradeFontDesc: 'Upgrade to choose your preferred Chinese and English fonts.',
    zoom: 'Zoom',
    zoom100: '100%',
    zoom125: '125%',
    zoom150: '150%',
    newFolder: 'New Folder',
    folder: 'Folder',
    rename: 'Rename',
    renameTitle: 'Rename',
    renameLabel: 'Folder name',
    renamePlaceholder: 'Enter a new name',
    folderNameRequired: 'Folder name cannot be empty',
    deleteFolderConfirm: 'Delete this folder? The sites inside will move back to the home page.',
    moveOutFolder: 'Move out of folder',
    emptyFolder: 'This folder is empty. Drag a site onto the folder icon to add it.',
    folderMergeHint: 'Drag a site onto another icon to merge them into a folder.',
    addSite: 'Add Site',
    changeWallpaper: 'Change Wallpaper',
    mode: 'Mode',
    addFolder: 'Add Folder',
    modeGeneral: 'General',
    modeMinimalist: 'Minimal',
    appearance: 'Appearance',
    settings: 'Settings',
    account: 'Account',
    pluginNotes: 'Notes',
    pluginTodo: 'Todo List',
    pluginCalendar: 'Calendar',
    pluginAdd: 'Add Plugin',
    pluginPickerTitle: 'Choose Workbench Plugins',
    notesEmpty: 'No notes yet',
    addNote: 'Add Note',
    todoEmpty: 'Nothing to do',
    todoPlaceholder: 'Add a todo item',
    calendarEmpty: 'No events for this day',
    eventPlaceholder: 'Add an event',
    workbenchHint: 'Scroll up or press PageUp to return home',
    agentProject: 'Project',
    agentChats: 'Chats',
    agentNewProject: 'New Project',
    agentNewChat: 'New Chat',
    agentNoChat: 'No chats yet',
    agentLoginRequired: 'Login required',
    agentPlaceholder: 'Type a message to talk to your Agent…',
    agentSend: 'Send',
    agentWelcome: 'Pick a model provider and log in to start chatting.\nMessages are archived by Project → Chat.',
    settingsModalTitle: 'Settings',
    timeFormatLabel: 'Time format',
    settingsLangLabel: 'Language',
    openBehaviorLabel: 'Open links in',
    tf24: '24-hour',
    tf12: '12-hour',
    obNew: 'New tab',
    obCurrent: 'Current tab',
    settingsAbout: 'About',
    followSystem: 'Follow System',
    appearanceDone: 'Done',
    appearanceStyle: 'Style',
    appearanceFont: 'Font',
    appearanceZoom: 'Zoom',
    appearanceViewMode: 'Mode',
    appearanceColorMode: 'Color Mode',
    appearanceWallpaper: 'Wallpaper',
    workbench: 'Workbench',
    wbBackHome: 'Home',
    pluginNoData: 'Empty',
    pluginTodayEvents: "Today's events",
    todoAll: 'All',
    todoActive: 'Active',
    todoDone: 'Done',
    todoLow: 'Low',
    todoMedium: 'Medium',
    todoHigh: 'High',
    eventEdit: 'Edit event title',
    agentRename: 'Rename',
    agentDelete: 'Delete',
    agentCopy: 'Copy',
    agentCopied: 'Copied',
    agentRegenerate: 'Regenerate',
    agentAttachImage: 'Attach image (paste supported)',
    agentImageFailed: 'Image processing failed',
    agentImageMessage: 'Image message',
    agentVisionNotSupported: 'This model does not support images. Pick a vision model marked with 🖼.',
    agentProjectDeleteConfirm: 'Delete this project and all its chats?',
    agentChatDeleteConfirm: 'Delete this chat?',


    confirmText: 'Confirm'
  }
};

Object.assign(translations.zh, TRANSLATION_OVERRIDES.zh);
Object.assign(translations.en, TRANSLATION_OVERRIDES.en);
Object.assign(translations.zh, {
  presetPopular: '常用', presetSocial: '社交', presetVideo: '影音',
  presetShopping: '购物', presetTools: '工具', presetAI: 'AI', presetNews: '新闻',
  presetLearning: '学习', presetTravel: '旅行', presetLife: '生活', presetCustom: '自定义',
  presetAdded: '已添加到首页', presetDuplicate: '该网站已在首页',
  customSearch: '自定义搜索', customSearchHint: '在网址中使用 {query} 表示搜索词；不填写时会自动追加到网址末尾',
  customSearchName: '名称', customSearchUrl: '搜索网址', customSearchNamePlaceholder: '例如：我的搜索',
  customSearchPlaceholder: 'https://example.com/search?q={query}',
  customSearchSave: '保存', customSearchClear: '清除', customSearchInvalid: '请输入有效的搜索网址',
  customSearchSaved: '自定义搜索已保存', customSearchCleared: '已清除自定义搜索',
  customEngineAdd: '添加', deleteEngine: '删除搜索引擎',
  deleteEngineConfirm: '确定删除“{name}”吗？删除后可通过重置恢复。',
  engineDeleted: '已删除搜索引擎', resetEngines: '重置',
  resetEnginesConfirm: '将搜索引擎恢复为最初的 15 个，并清除自定义搜索。继续吗？',
  enginesReset: '搜索引擎已重置', engineEmpty: '请先添加一个搜索引擎'
});
Object.assign(translations.en, {
  presetPopular: 'Popular', presetSocial: 'Social', presetVideo: 'Video',
  presetShopping: 'Shopping', presetTools: 'Tools', presetAI: 'AI', presetNews: 'News',
  presetLearning: 'Learning', presetTravel: 'Travel', presetLife: 'Life', presetCustom: 'Custom',
  presetAdded: 'Added to home', presetDuplicate: 'This site is already on your home page',
  customSearch: 'Custom search', customSearchHint: 'Use {query} in the URL for the search term; otherwise it is appended to the end',
  customSearchName: 'Name', customSearchUrl: 'Search URL', customSearchNamePlaceholder: 'e.g. My search',
  customSearchPlaceholder: 'https://example.com/search?q={query}',
  customSearchSave: 'Save', customSearchClear: 'Clear', customSearchInvalid: 'Enter a valid search URL',
  customSearchSaved: 'Custom search saved', customSearchCleared: 'Custom search removed',
  customEngineAdd: 'Add', deleteEngine: 'Delete engine',
  deleteEngineConfirm: 'Delete "{name}"? You can restore all engines with Reset.',
  engineDeleted: 'Search engine deleted', resetEngines: 'Reset',
  resetEnginesConfirm: 'Restore the original 15 search engines and remove your custom one?',
  enginesReset: 'Search engines reset', engineEmpty: 'Add a search engine first'
});
Object.assign(translations.fr, {
  presetPopular: 'Populaires', presetSocial: 'Réseaux', presetVideo: 'Vidéo',
  presetShopping: 'Achats', presetTools: 'Outils', presetAI: 'IA', presetNews: 'Actualités',
  presetLearning: 'Apprentissage', presetTravel: 'Voyage', presetLife: 'Vie', presetCustom: 'Personnalisé',
  presetAdded: 'Ajouté à l\'accueil', presetDuplicate: 'Ce site est déjà sur votre page d\'accueil',
  customSearch: 'Recherche personnalisée', customSearchHint: 'Utilisez {query} dans l\'URL pour le terme recherché ; sinon il est ajouté à la fin',
  customSearchName: 'Nom', customSearchUrl: 'URL de recherche', customSearchNamePlaceholder: 'ex. Ma recherche',
  customSearchPlaceholder: 'https://exemple.com/recherche?q={query}',
  customSearchSave: 'Enregistrer', customSearchClear: 'Effacer', customSearchInvalid: 'Saisissez une URL de recherche valide',
  customSearchSaved: 'Recherche personnalisée enregistrée', customSearchCleared: 'Recherche personnalisée supprimée',
  customEngineAdd: 'Ajouter', deleteEngine: 'Supprimer le moteur',
  deleteEngineConfirm: 'Supprimer « {name} » ? Vous pourrez tout restaurer avec Réinitialiser.',
  engineDeleted: 'Moteur de recherche supprimé', resetEngines: 'Réinitialiser',
  resetEnginesConfirm: 'Restaurer les 15 moteurs d\'origine et supprimer votre moteur personnalisé ?',
  enginesReset: 'Moteurs de recherche réinitialisés', engineEmpty: 'Ajoutez d\'abord un moteur de recherche'
});
Object.assign(translations.es, {
  presetPopular: 'Populares', presetSocial: 'Redes', presetVideo: 'Vídeo',
  presetShopping: 'Compras', presetTools: 'Herramientas', presetAI: 'IA', presetNews: 'Noticias',
  presetLearning: 'Aprendizaje', presetTravel: 'Viajes', presetLife: 'Vida', presetCustom: 'Personalizado',
  presetAdded: 'Añadido al inicio', presetDuplicate: 'Este sitio ya está en tu página de inicio',
  customSearch: 'Búsqueda personalizada', customSearchHint: 'Usa {query} en la URL para el término de búsqueda; si no, se añade al final',
  customSearchName: 'Nombre', customSearchUrl: 'URL de búsqueda', customSearchNamePlaceholder: 'p. ej. Mi búsqueda',
  customSearchPlaceholder: 'https://ejemplo.com/buscar?q={query}',
  customSearchSave: 'Guardar', customSearchClear: 'Borrar', customSearchInvalid: 'Introduce una URL de búsqueda válida',
  customSearchSaved: 'Búsqueda personalizada guardada', customSearchCleared: 'Búsqueda personalizada eliminada',
  customEngineAdd: 'Añadir', deleteEngine: 'Eliminar motor',
  deleteEngineConfirm: '¿Eliminar "{name}"? Puedes restaurar todo con Restablecer.',
  engineDeleted: 'Motor de búsqueda eliminado', resetEngines: 'Restablecer',
  resetEnginesConfirm: '¿Restaurar los 15 motores originales y quitar el personalizado?',
  enginesReset: 'Motores de búsqueda restablecidos', engineEmpty: 'Añade primero un motor de búsqueda'
});
Object.assign(translations.ja, {
  presetPopular: 'よく使う', presetSocial: 'SNS', presetVideo: '動画',
  presetShopping: '買い物', presetTools: 'ツール', presetAI: 'AI', presetNews: 'ニュース',
  presetLearning: '学習', presetTravel: '旅行', presetLife: '生活', presetCustom: 'カスタム',
  presetAdded: 'ホームに追加しました', presetDuplicate: 'このサイトはすでにホームにあります',
  customSearch: 'カスタム検索', customSearchHint: 'URL 内の {query} が検索語に置き換わります。ない場合は末尾に追加されます',
  customSearchName: '名前', customSearchUrl: '検索 URL', customSearchNamePlaceholder: '例：マイ検索',
  customSearchPlaceholder: 'https://example.com/search?q={query}',
  customSearchSave: '保存', customSearchClear: 'クリア', customSearchInvalid: '有効な検索 URL を入力してください',
  customSearchSaved: 'カスタム検索を保存しました', customSearchCleared: 'カスタム検索を削除しました',
  customEngineAdd: '追加', deleteEngine: '検索エンジンを削除',
  deleteEngineConfirm: '「{name}」を削除しますか？リセットで復元できます。',
  engineDeleted: '検索エンジンを削除しました', resetEngines: 'リセット',
  resetEnginesConfirm: '最初の 15 個の検索エンジンに戻し、カスタム検索を削除しますか？',
  enginesReset: '検索エンジンをリセットしました', engineEmpty: '先に検索エンジンを追加してください'
});
Object.assign(translations.ko, {
  presetPopular: '자주 사용', presetSocial: '소셜', presetVideo: '동영상',
  presetShopping: '쇼핑', presetTools: '도구', presetAI: 'AI', presetNews: '뉴스',
  presetLearning: '학습', presetTravel: '여행', presetLife: '생활', presetCustom: '사용자 지정',
  presetAdded: '홈에 추가했습니다', presetDuplicate: '이 사이트는 이미 홈에 있습니다',
  customSearch: '사용자 지정 검색', customSearchHint: 'URL의 {query}가 검색어로 바뀝니다. 없으면 끝에 추가됩니다',
  customSearchName: '이름', customSearchUrl: '검색 URL', customSearchNamePlaceholder: '예: 내 검색',
  customSearchPlaceholder: 'https://example.com/search?q={query}',
  customSearchSave: '저장', customSearchClear: '지우기', customSearchInvalid: '유효한 검색 URL을 입력하세요',
  customSearchSaved: '사용자 지정 검색을 저장했습니다', customSearchCleared: '사용자 지정 검색을 삭제했습니다',
  customEngineAdd: '추가', deleteEngine: '검색 엔진 삭제',
  deleteEngineConfirm: '"{name}"을(를) 삭제할까요? 초기화로 복원할 수 있습니다.',
  engineDeleted: '검색 엔진을 삭제했습니다', resetEngines: '초기화',
  resetEnginesConfirm: '처음 15개 검색 엔진으로 복원하고 사용자 지정 검색을 삭제할까요?',
  enginesReset: '검색 엔진을 초기화했습니다', engineEmpty: '먼저 검색 엔진을 추가하세요'
});


function normalizeLocale(input) {
  if (!input) return 'zh';
  const v = String(input).trim();
  if (!v) return 'zh';
  const lower = v.toLowerCase();

  if (lower === 'zh' || lower.startsWith('zh-')) return 'zh';
  if (lower === 'en' || lower.startsWith('en-')) return 'en';
  if (lower === 'fr' || lower.startsWith('fr-')) return 'fr';
  if (lower === 'es' || lower.startsWith('es-')) return 'es';
  if (lower === 'ja' || lower.startsWith('ja-')) return 'ja';
  if (lower === 'ko' || lower.startsWith('ko-')) return 'ko';

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

// Ensure i18n is accessible on window for CSP-safe click handler polyfill
// (const declarations don't create window properties, but the click-handler
// polyfill resolves names through window.*)
window.i18n = i18n;

// Update all text elements with current locale
window.updateAllText = function () {
  // Update search input placeholder
  searchInput.placeholder = i18n.t('search');

  // Update modal title
  const modalTitle = document.getElementById('addModalTitle');
  if (modalTitle) modalTitle.textContent = i18n.t('addNewTitle');

  // Update section labels
  const nameLabel = document.getElementById('nameLabel');
  const urlLabel = document.getElementById('urlLabel');
  if (nameLabel) nameLabel.textContent = i18n.t('name');
  if (urlLabel) urlLabel.textContent = i18n.t('url');
  // Update input placeholders
  document.getElementById('siteName').placeholder = i18n.t('name');
  document.getElementById('siteUrl').placeholder = i18n.t('urlPlaceholder');

  // Update checkbox label
  const iconLabels = {
    siteIconLabel: 'iconLabel', siteIconUpload: 'iconUpload', iconModeAuto: 'iconAuto',
    iconModeCustom: 'iconCustom', iconTextLabel: 'iconTextLabel', iconColorLabel: 'iconColorLabel'
  };
  Object.entries(iconLabels).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = i18n.t(key);
  });

  // Update modal buttons
  document.getElementById('closeAddModal').textContent = i18n.t('cancel');
  document.getElementById('saveItem').textContent = i18n.t('save');

  // Update time and date display
  updateTime();

  const ctxAddSiteEl = document.getElementById('ctxAddSite');
  const ctxWallpaperEl = document.getElementById('ctxWallpaper');
  if (ctxAddSiteEl) ctxAddSiteEl.textContent = i18n.t('addSite') || 'Add Site';
  if (ctxWallpaperEl) ctxWallpaperEl.textContent = i18n.t('changeWallpaper') || 'Change Wallpaper';
  const modeGeneralEl = document.getElementById('modeGeneral');
  const modeMinimalistEl = document.getElementById('modeMinimalist');
  if (modeGeneralEl) modeGeneralEl.textContent = i18n.t('modeGeneral') || '一般';
  if (modeMinimalistEl) modeMinimalistEl.textContent = i18n.t('modeMinimalist') || '极简';

  // Update settings menu text
  const langText = document.getElementById('langText');
  const minimalistText = document.getElementById('minimalistText');
  const wallpaperText = document.getElementById('wallpaperText');

  if (langText) {
    langText.textContent = i18n.t('language');
  }

  if (minimalistText) {
    minimalistText.textContent = state.viewMode === 'general' ? i18n.t('minimalist') : i18n.t('general');
  }

  if (wallpaperText) {
    wallpaperText.textContent = i18n.t('wallpaper');
  }

  const zoomText = document.getElementById('zoomText');
  if (zoomText) {
    zoomText.textContent = (i18n.t('zoom') || 'Zoom') + ' \u00b7 ' + (state.zoomLevel || '100') + '%';
  }

  const renameTitleEl = document.getElementById('renameTitle');
  const renameLabelEl = document.getElementById('renameLabel');
  const renameInputEl = document.getElementById('renameInput');
  if (renameTitleEl) renameTitleEl.textContent = i18n.t('renameTitle') || 'Rename';
  if (renameLabelEl) renameLabelEl.textContent = i18n.t('renameLabel') || 'Folder name';
  if (renameInputEl) renameInputEl.placeholder = i18n.t('renamePlaceholder') || 'Enter a new name';

  // Settings modal labels
  const settingsModalTitleEl = document.getElementById('settingsModalTitle');
  const timeFormatLabelEl = document.getElementById('timeFormatLabel');
  const settingsLangLabelEl = document.getElementById('settingsLangLabel');
  const openBehaviorLabelEl = document.getElementById('openBehaviorLabel');
  const tf24El = document.getElementById('tf24');
  const tf12El = document.getElementById('tf12');
  const obNewEl = document.getElementById('obNew');
  const obCurrentEl = document.getElementById('obCurrent');
  const settingsAboutBtnEl = document.getElementById('settingsAboutBtn');
  const closeSettingsModalEl = document.getElementById('closeSettingsModal');
  if (settingsModalTitleEl) settingsModalTitleEl.textContent = i18n.t('settingsModalTitle') || 'Settings';
  if (timeFormatLabelEl) timeFormatLabelEl.textContent = i18n.t('timeFormatLabel') || 'Time format';
  if (settingsLangLabelEl) settingsLangLabelEl.textContent = i18n.t('settingsLangLabel') || 'Language';
  if (openBehaviorLabelEl) openBehaviorLabelEl.textContent = i18n.t('openBehaviorLabel') || 'Open links in';
  if (tf24El) tf24El.textContent = i18n.t('tf24') || '24-hour';
  if (tf12El) tf12El.textContent = i18n.t('tf12') || '12-hour';
  if (obNewEl) obNewEl.textContent = i18n.t('obNew') || 'New tab';
  if (obCurrentEl) obCurrentEl.textContent = i18n.t('obCurrent') || 'Current tab';
  if (settingsAboutBtnEl) settingsAboutBtnEl.textContent = i18n.t('settingsAbout') || 'About';
  if (closeSettingsModalEl) closeSettingsModalEl.textContent = i18n.t('done') || 'Done';
  const appearanceLabels = {
    appearanceLabel: i18n.t('appearance') || 'Appearance',
    apLight: i18n.t('lightMode') || 'Light',
    apDark: i18n.t('darkMode') || 'Dark',
    apAuto: i18n.t('followSystem') || 'Auto',
    accentLabel: i18n.t('accentLabel') || 'Accent Color',
    zoomLabel: i18n.t('zoom') || 'Zoom'
  };
  Object.entries(appearanceLabels).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });

  updateSettingsMenu();
  syncSettingsModalUI?.();
  renderAddSiteCatalog();
  window.renderWorkbench?.();

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
function faviconBustQuery(bust, first = false) {
  return bust ? (first ? '?' : '&') + 'v=' + encodeURIComponent(String(bust)) : '';
}

// Request the largest source the provider has. 128px was visibly soft at 40px
// on HiDPI screens; Google/DDG both honour 256 and return their best asset.
const FAVICON_REQUEST_SIZE = 256;
const FAVICON_SHARP_EDGE = 48;

function googleFavicon(domain, bust) {
  return 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(domain) + '&sz=' + FAVICON_REQUEST_SIZE + faviconBustQuery(bust);
}

function engineFavicon(domain, bust) {
  return googleFavicon(domain, bust);
}

function engineDomain(engine) {
  try {
    // www.google.com often gets a generic globe from the favicon providers;
    // the apex domain returns the real brand mark.
    return new URL(String(engine?.url || '')).hostname.replace(/^www\./i, '');
  } catch (_err) {
    return '';
  }
}

function getEngineFallbackIcon(engine, bust) {
  const domain = engineDomain(engine);
  return domain
    ? 'https://icons.duckduckgo.com/ip3/' + encodeURIComponent(domain) + '.ico' + faviconBustQuery(bust, true)
    : 'https://www.google.com/favicon.ico' + faviconBustQuery(bust, true);
}

// Brands with a vector mark on the Simple Icons CDN. It is the last resort:
// real favicons win whenever the provider has a sharp one, but this guarantees
// engines such as Sogou / Xiaohongshu never end up with a blank tile.
const ENGINE_SIMPLEICON_SLUGS = {
  google: 'google',
  bing: 'bing',
  duckduckgo: 'duckduckgo',
  baidu: 'baidu',
  sogou: 'sogou',
  bilibili: 'bilibili',
  xiaohongshu: 'xiaohongshu',
  github: 'github',
  stackoverflow: 'stackoverflow',
  twitter: 'x',
  reddit: 'reddit',
  wikipedia: 'wikipedia',
  amazon: 'amazon',
  taobao: 'taobao',
  jd: 'jd'
};

function dedupeUrls(urls) {
  const seen = new Set();
  return (Array.isArray(urls) ? urls : []).filter((url) => {
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

// Ordered from the real, colour-correct favicon to guaranteed-sharp vectors.
// The delegated image handlers walk this list when a source 404s or is only
// 16px, which is what makes the engines without a Google icon work.
function getEngineIconSources(engine, bust) {
  const domain = engineDomain(engine);
  const bustQuery = faviconBustQuery(bust);
  const sources = [];
  if (domain) {
    sources.push(googleFavicon(domain, bust));
    sources.push('https://icons.duckduckgo.com/ip3/' + encodeURIComponent(domain) + '.ico' + faviconBustQuery(bust, true));
    sources.push('https://' + domain + '/favicon.ico' + faviconBustQuery(bust, true));
    sources.push('https://icon.horse/icon/' + encodeURIComponent(domain) + bustQuery);
  }
  sources.push('https://www.google.com/favicon.ico' + faviconBustQuery(bust, true));
  const slug = ENGINE_SIMPLEICON_SLUGS[String(engine?.id || '')];
  if (slug) sources.push('https://cdn.simpleicons.org/' + slug + bustQuery);
  return dedupeUrls(sources);
}

function getEngineIcon(engine, bust) {
  const sources = getEngineIconSources(engine, bust);
  return sources[0] || getEngineFallbackIcon(engine, bust);
}

const BASE_ENGINE_CATALOG = [
  // Global / General
  { id: 'google', name: { zh: '谷歌', en: 'Google' }, url: 'https://www.google.com/search?q=', icon: engineFavicon('google.com') },
  { id: 'bing', name: { zh: '必应', en: 'Bing' }, url: 'https://www.bing.com/search?q=', icon: engineFavicon('bing.com') },
  { id: 'duckduckgo', name: { zh: 'DuckDuckGo', en: 'DuckDuckGo' }, url: 'https://duckduckgo.com/?q=', icon: engineFavicon('duckduckgo.com') },

  // Chinese Specific
  { id: 'baidu', name: { zh: '百度', en: 'Baidu' }, url: 'https://www.baidu.com/s?wd=', icon: engineFavicon('baidu.com') },
  { id: 'sogou', name: { zh: '搜狗', en: 'Sogou' }, url: 'https://www.sogou.com/web?query=', icon: engineFavicon('sogou.com') },
  { id: 'bilibili', name: { zh: '哔哩哔哩', en: 'Bilibili' }, url: 'https://search.bilibili.com/all?keyword=', icon: engineFavicon('bilibili.com') },
  { id: 'xiaohongshu', name: { zh: '小红书', en: 'Xiaohongshu' }, url: 'https://www.xiaohongshu.com/search_result?keyword=', icon: engineFavicon('xiaohongshu.com') },

  // Dev / Tech
  { id: 'github', name: { zh: 'GitHub', en: 'GitHub' }, url: 'https://github.com/search?q=', icon: engineFavicon('github.com') },
  { id: 'stackoverflow', name: { zh: 'StackOverflow', en: 'StackOverflow' }, url: 'https://stackoverflow.com/search?q=', icon: engineFavicon('stackoverflow.com') },

  // Social / Media
  { id: 'twitter', name: { zh: 'X / Twitter', en: 'X / Twitter' }, url: 'https://x.com/search?q=', icon: engineFavicon('x.com') },
  { id: 'reddit', name: { zh: 'Reddit', en: 'Reddit' }, url: 'https://www.reddit.com/search/?q=', icon: engineFavicon('reddit.com') },

  // Knowledge
  { id: 'wikipedia', name: { zh: '维基百科', en: 'Wikipedia' }, url: 'https://en.wikipedia.org/wiki/Special:Search?search=', icon: engineFavicon('wikipedia.org') },

  // Shopping
  { id: 'amazon', name: { zh: '亚马逊', en: 'Amazon' }, url: 'https://www.amazon.com/s?k=', icon: engineFavicon('amazon.com') },
  { id: 'taobao', name: { zh: '淘宝', en: 'Taobao' }, url: 'https://s.taobao.com/search?q=', icon: engineFavicon('taobao.com') },
  { id: 'jd', name: { zh: '京东', en: 'JD' }, url: 'https://search.jd.com/Search?keyword=', icon: engineFavicon('jd.com') },

];

const DEFAULT_ENGINE_IDS = ['google', 'bing', 'baidu', 'xiaohongshu'];
// Offered nowhere, even when the server list still has them
const HIDDEN_ENGINE_IDS = new Set([
  'youtube', 'pinterest', 'npm', 'mdn', 'brave',
  'yahoo', 'yandex', 'ecosia', 'startpage', 'so360',
  'zhihu', 'douban', 'weibo', 'instagram', 'scholar'
]);

const DELETED_ENGINE_STORAGE_KEY = 'deletedEngineIds';

function readDeletedEngineIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DELETED_ENGINE_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.map((id) => String(id)).filter(Boolean) : [];
  } catch (_err) {
    return [];
  }
}

const deletedEngineIds = new Set(readDeletedEngineIds());

function cloneBaseEngineCatalog() {
  return BASE_ENGINE_CATALOG.map((engine) => ({
    ...engine,
    name: { ...engine.name }
  }));
}

function isEngineDeleted(id) {
  return deletedEngineIds.has(String(id));
}

let ENGINE_CATALOG = cloneBaseEngineCatalog().filter((engine) => !isEngineDeleted(engine.id));

const CUSTOM_ENGINE_ID = 'custom';
const CUSTOM_ENGINE_STORAGE_KEY = 'customEngine';

function normalizeCustomSearchUrl(input) {
  let raw = String(input || '').trim();
  if (!raw) return '';
  if (raw.includes('%s') && !raw.includes('{query}')) raw = raw.replace(/%s/g, '{query}');
  if (!/^https?:\/\//i.test(raw)) return '';
  try {
    const probe = raw.includes('{query}') ? raw.replace(/\{query\}/g, 'newtab') : raw + 'newtab';
    const parsed = new URL(probe);
    return /^https?:$/.test(parsed.protocol) ? raw : '';
  } catch (_err) {
    return '';
  }
}

function readCustomEngine() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_ENGINE_STORAGE_KEY) || 'null');
    const url = normalizeCustomSearchUrl(parsed?.url);
    if (!url) return null;
    return {
      name: String(parsed?.name || 'Custom').trim().slice(0, 40) || 'Custom',
      url
    };
  } catch (_err) {
    return null;
  }
}

function buildCustomEngineOption(custom) {
  const url = normalizeCustomSearchUrl(custom?.url);
  if (!url) return null;
  const domain = engineDomain({ url });
  return {
    id: CUSTOM_ENGINE_ID,
    name: { zh: custom.name, en: custom.name },
    url,
    icon: domain ? engineFavicon(domain) : getEngineFallbackIcon({ url })
  };
}

function ensureCustomEngineInCatalog(custom = readCustomEngine()) {
  ENGINE_CATALOG = ENGINE_CATALOG.filter((engine) => engine.id !== CUSTOM_ENGINE_ID);
  const option = buildCustomEngineOption(custom);
  if (option) ENGINE_CATALOG.push(option);
  return option;
}

function buildSearchUrl(engine, query) {
  const q = encodeURIComponent(String(query || ''));
  const template = String(engine?.url || '');
  if (!template) return '';
  return template.includes('{query}') ? template.replace(/\{query\}/g, q) : template + q;
}

// Restore the custom engine before state reads enabledEngineIds.
ensureCustomEngineInCatalog();

// Engine names exist in zh and en (a few carry more); other UI languages use
// the English (brand) name.
function getEngineName(engine) {
  const locale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const names = engine?.name || {};
  return names[locale] || (locale === 'zh' ? names.zh : names.en) || names.en || engine?.id || '';
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

  if (!state.enabledEngineIds.includes(state.engineId)) {
    state.engineId = state.enabledEngineIds[0] || '';
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
      .filter((r) => !HIDDEN_ENGINE_IDS.has(String(r.id)))
      .filter((r) => !isEngineDeleted(String(r.id)))
      .map((r) => {
        const builtin = ENGINE_CATALOG.find((e) => e.id === String(r.id));
        let domain = '';
        try { domain = new URL(String(r.url || '')).hostname; } catch (_err) {}
        return {
          id: String(r.id),
          name: {
            zh: String(r.name_zh || r.name_en || r.id),
            en: String(r.name_en || r.name_zh || r.id)
          },
          url: String(r.url),
          // Server-provided icon URLs have drifted in the past (old Twitter
          // bird, wrong 360/Sogou marks). Derive non-built-in engines from
          // their actual search host so the mark always matches the engine.
          icon: builtin
            ? builtin.icon
            : (domain ? engineFavicon(domain) : String(r.icon || 'https://www.google.com/favicon.ico'))
        };
      });

    if (!list.length) return false;
    // The server list leads; built-in engines it lacks are kept after it.
    const serverIds = new Set(list.map((e) => e.id));
    ENGINE_CATALOG = list
      .concat(ENGINE_CATALOG.filter((e) => !serverIds.has(e.id)))
      .filter((engine) => !isEngineDeleted(engine.id));
    // Server refreshes must not drop the user's private search engine.
    ensureCustomEngineInCatalog();
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
  return DEFAULT_ENGINE_IDS.filter((id) => ENGINE_CATALOG.some((e) => e.id === id)).slice(0, 5);
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
  customEngine: readCustomEngine(),
  dateFormatIndex: parseInt(localStorage.getItem('dateFormatIndex')) || 0, // 0: YMD, 1: MDY, 2: DMY
  timeFormat: localStorage.getItem('timeFormat') || '24h', // '24h' or '12h'
  sites: JSON.parse(localStorage.getItem('sites')) || [],
  tags: JSON.parse(localStorage.getItem('tags')) || [],
  tagOrder: JSON.parse(localStorage.getItem('tagOrder')) || [],
  siteOrder: JSON.parse(localStorage.getItem('siteOrder')) || [],
  viewMode: localStorage.getItem('viewMode') || 'general', // 'general' or 'minimalist'
  openBehavior: localStorage.getItem('openBehavior') || 'newtab', // 'newtab' | 'current'
  zoomLevel: localStorage.getItem('zoomLevel') || '100',
  openFolderId: null // currently open folder id (null = home view)
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

// A locally deleted engine may still be referenced by saved state.
{
  const enabled = getEnabledEngines(state.enabledEngineIds);
  if (!enabled.some((e) => e.id === state.engineId)) {
    state.engineId = enabled[0]?.id || ENGINE_CATALOG[0]?.id || '';
    state.engineIndex = 0;
  }
}

function getCurrentEngine() {
  const enabled = getEnabledEngines(state.enabledEngineIds);
  const found = enabled.find((e) => e.id === state.engineId);
  return found || enabled[0] || ENGINE_CATALOG[0] || null;
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
  draggedId: null,
  draggedType: null,   // 'site' | 'folder' | 'tag'
  draggedSource: null, // 'home' | 'folder'
  draggedElement: null,
  dropTarget: null
};

// ===== Drag and Drop Event Handlers =====
// Home grid drag & drop, iOS style:
// - the icon itself follows the pointer (custom drag image);
// - moving between icons slides the others aside (FLIP animation);
// - holding over another icon for a moment makes (or adds to) a folder,
//   then opens that folder so it can be named.
const FOLDER_HOVER_MS = 650;

function handleDragStart(event, id, type, source, index) {
  dragState.draggedId = id;
  dragState.draggedType = type;
  dragState.draggedSource = source || 'home';
  dragState.draggedElement = event.target.closest('.site-tile');
  dragState.reordered = false;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(id));
  const iconEl = dragState.draggedElement?.querySelector('.site-tile-icon');
  if (iconEl && event.dataTransfer.setDragImage) {
    const r = iconEl.getBoundingClientRect();
    event.dataTransfer.setDragImage(iconEl, r.width / 2, r.height / 2);
  }
  const el = dragState.draggedElement;
  // After the browser has snapshotted the drag image, leave a ghost behind.
  requestAnimationFrame(() => el?.classList.add('dragging'));
}

function clearFolderHover() {
  clearTimeout(dragState.hoverTimer);
  dragState.hoverTimer = null;
  dragState.hoverTargetId = null;
  document.querySelectorAll('.site-tile.merge-target').forEach((t) => t.classList.remove('merge-target'));
}

// Reorders tiles in place and animates every tile from its old position.
function animateTileReorder(grid, mutate) {
  const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
  const tiles = Array.from(grid.children);
  const before = new Map(tiles.map((t) => [t, t.getBoundingClientRect()]));
  mutate();
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  tiles.forEach((t) => {
    const a = before.get(t);
    const b = t.getBoundingClientRect();
    const dx = (a.left - b.left) / zoom;
    const dy = (a.top - b.top) / zoom;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    t.animate([{ transform: 'translate(' + dx + 'px, ' + dy + 'px)' }, { transform: 'none' }],
      { duration: 300, easing: 'cubic-bezier(0.2, 0.9, 0.25, 1.15)' });
  });
}

function mergeIntoFolder(draggedId, targetId) {
  const target = (state.sites || []).find((s) => s && s.id === targetId);
  if (!target) return null;
  if (target.type === 'folder') {
    addSitesToFolder(targetId, [draggedId]);
    return targetId;
  }
  mergeSitesIntoNewFolder(draggedId, targetId);
  return state.sites.find((s) => s.type === 'folder' && Array.isArray(s.children)
    && s.children.includes(draggedId) && s.children.includes(targetId))?.id || null;
}

function finishFolderHover(targetId) {
  const draggedId = dragState.draggedId;
  clearFolderHover();
  if (!draggedId || draggedId === targetId) return;
  const wasFolder = (state.sites || []).some((x) => x && x.id === targetId && x.type === 'folder');
  const folderId = mergeIntoFolder(draggedId, targetId);
  dragState.draggedId = null; // the drag is consumed
  saveData();
  renderHome();
  // Only a newly made folder opens for naming
  if (folderId && !wasFolder) {
    openFolder(folderId);
    // Name it right away, like iOS
    setTimeout(() => { folderNameInput?.focus(); folderNameInput?.select(); }, 60);
  }
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  if (!dragState.draggedId) return false;

  const targetTile = event.target.closest('.site-tile');
  if (!targetTile || targetTile === dragState.draggedElement || targetTile.classList.contains('add-tile')) {
    if (!targetTile?.classList.contains('merge-target')) clearFolderHover();
    return false;
  }
  const grid = targetTile.parentElement;
  if (!grid || !grid.classList.contains('sites-grid')) return false;
  const targetId = targetTile.dataset.id;

  // Inside a folder window: plain reorder of its children.
  if (dragState.draggedSource === 'folder') {
    const folder = getOpenFolder();
    if (!folder || !Array.isArray(folder.children)) return false;
    const from = folder.children.indexOf(dragState.draggedId);
    const to = folder.children.indexOf(targetId);
    if (from !== -1 && to !== -1 && from !== to) {
      animateTileReorder(grid, () => {
        folder.children.splice(from, 1);
        folder.children.splice(to, 0, dragState.draggedId);
        const draggedEl = dragState.draggedElement;
        grid.insertBefore(draggedEl, from < to ? targetTile.nextSibling : targetTile);
      });
      dragState.reordered = true;
    }
    return false;
  }

  // Home grid: over the icon itself -> folder intent; between icons -> reorder.
  const iconRect = targetTile.querySelector('.site-tile-icon').getBoundingClientRect();
  const inset = iconRect.width * 0.18;
  const overIcon = event.clientX > iconRect.left + inset && event.clientX < iconRect.right - inset
    && event.clientY > iconRect.top + inset && event.clientY < iconRect.bottom - inset;

  if (overIcon && dragState.draggedType === 'site') {
    if (dragState.hoverTargetId !== targetId) {
      clearFolderHover();
      dragState.hoverTargetId = targetId;
      targetTile.classList.add('merge-target');
      dragState.hoverTimer = setTimeout(() => finishFolderHover(targetId), FOLDER_HOVER_MS);
    }
    return false;
  }
  clearFolderHover();

  // Let the last slide finish before the next one; swapping on every
  // dragover made tiles bounce back and forth under the pointer.
  if (performance.now() - (dragState.lastSwapAt || 0) < 180) return false;
  const from = state.siteOrder.indexOf(dragState.draggedId);
  const to = state.siteOrder.indexOf(targetId);
  if (from === -1 || to === -1 || from === to) return false;
  const r = targetTile.getBoundingClientRect();
  const after = event.clientX > r.left + r.width / 2;
  const next = state.siteOrder.filter((id) => id !== dragState.draggedId);
  next.splice(next.indexOf(targetId) + (after ? 1 : 0), 0, dragState.draggedId);
  if (next.join() === state.siteOrder.join()) return false;
  animateTileReorder(grid, () => {
    state.siteOrder = next;
    const draggedEl = dragState.draggedElement;
    grid.insertBefore(draggedEl, after ? targetTile.nextSibling : targetTile);
  });
  dragState.reordered = true;
  dragState.lastSwapAt = performance.now();
  return false;
}

function handleDrop(event, targetId, targetType) {
  event.preventDefault();
  event.stopPropagation();
  if (!dragState.draggedId || dragState.draggedId === targetId) return false;

  const tile = event.currentTarget?.closest?.('.site-tile') || event.currentTarget;
  let overIcon = targetType === 'folder';
  if (!overIcon && tile?.querySelector) {
    const iconEl = tile.querySelector('.site-tile-icon');
    if (iconEl) {
      const r = iconEl.getBoundingClientRect();
      const inset = r.width * 0.18;
      overIcon = event.clientX > r.left + inset && event.clientX < r.right - inset
        && event.clientY > r.top + inset && event.clientY < r.bottom - inset;
    }
  }

  // Dropping on a folder always adds; dropping on another site's icon also
  // merges immediately instead of depending on the 650ms hover timer.
  if (overIcon && (targetType === 'folder' || dragState.draggedType === 'site')) {
    finishFolderHover(targetId);
  }
  return false;
}

function handleDragEnd(event) {
  clearFolderHover();
  if (dragState.draggedElement) dragState.draggedElement.classList.remove('dragging');
  if (dragState.reordered) saveData();
  dragState.draggedId = null;
  dragState.draggedType = null;
  dragState.draggedSource = null;
  dragState.draggedElement = null;
  dragState.dropTarget = null;
  dragState.reordered = false;
  dragState.lastSwapAt = 0;
  if (homeRenderDeferred) renderHome();
}

// ===== Folder Operations =====
function addSitesToFolder(folderId, siteIds) {
  const folder = (state.sites || []).find((s) => s && s.id === folderId && s.type === 'folder');
  if (!folder) return;
  if (!Array.isArray(folder.children)) folder.children = [];

  const idsToAdd = (siteIds || []).filter((id) => id && id !== folderId);
  const draggedFolders = new Set();

  for (const id of idsToAdd) {
    const item = (state.sites || []).find((s) => s && s.id === id);
    if (!item) continue;
    if (item.type === 'folder') {
      // Merge another folder's children into this one, then remove it
      draggedFolders.add(id);
      const childIds = Array.isArray(item.children) ? item.children : [];
      for (const cid of childIds) {
        if (cid !== folderId && !folder.children.includes(cid)) folder.children.push(cid);
      }
    } else if (!folder.children.includes(id)) {
      folder.children.push(id);
    }
  }

  // Remove dragged folders from state and order
  if (draggedFolders.size) {
    state.sites = state.sites.filter((s) => !draggedFolders.has(s.id));
    state.siteOrder = state.siteOrder.filter((id) => !draggedFolders.has(id));
    if (state.openFolderId && draggedFolders.has(state.openFolderId)) state.openFolderId = null;
  }

  // Remove merged sites from top-level order (keep the target folder in place)
  state.siteOrder = state.siteOrder.filter((id) => !idsToAdd.includes(id));
  if (!state.siteOrder.includes(folderId)) state.siteOrder.unshift(folderId);
}

function mergeSitesIntoNewFolder(firstId, secondId) {
  const first = (state.sites || []).find((s) => s && s.id === firstId);
  const second = (state.sites || []).find((s) => s && s.id === secondId);
  if (!first || !second) return;

  const folderId = generateUuid();
  const folder = {
    id: folderId,
    type: 'folder',
    name: i18n.t('newFolder') || 'New Folder',
    url: '',
    showOnHome: true,
    tags: [],
    children: [firstId, secondId]
  };
  state.sites.push(folder);

  const anchorIndex = Math.max(
    state.siteOrder.indexOf(firstId),
    state.siteOrder.indexOf(secondId)
  );
  state.siteOrder = state.siteOrder.filter((id) => id !== firstId && id !== secondId);
  const insertAt = anchorIndex === -1 ? state.siteOrder.length : Math.min(anchorIndex, state.siteOrder.length);
  state.siteOrder.splice(insertAt, 0, folderId);
}

function moveSiteOutOfFolder(siteId) {
  const folder = (state.sites || []).find((s) => s && s.id === state.openFolderId && s.type === 'folder');
  if (!folder || !Array.isArray(folder.children)) return;
  folder.children = folder.children.filter((id) => id !== siteId);
  // A site taken out of a folder lands on the home grid, so it must be visible there.
  const site = (state.sites || []).find((s) => s && s.id === siteId);
  if (site) site.showOnHome = true;
  const folderIndex = state.siteOrder.indexOf(folder.id);
  const insertAt = folderIndex === -1 ? state.siteOrder.length : Math.min(folderIndex, state.siteOrder.length);
  if (!state.siteOrder.includes(siteId)) state.siteOrder.splice(insertAt, 0, siteId);
}

function deleteFolder(folderId) {
  const folder = (state.sites || []).find((s) => s && s.id === folderId && s.type === 'folder');
  if (!folder) return;
  const children = Array.isArray(folder.children) ? folder.children : [];
  const folderIndex = state.siteOrder.indexOf(folderId);
  state.sites = state.sites.filter((s) => s.id !== folderId);
  state.siteOrder = state.siteOrder.filter((id) => id !== folderId);
  const insertAt = folderIndex === -1 ? state.siteOrder.length : Math.min(folderIndex, state.siteOrder.length);
  const missing = children.filter((cid) => !state.siteOrder.includes(cid));
  state.siteOrder.splice(insertAt, 0, ...missing);
  if (state.openFolderId === folderId) state.openFolderId = null;
}

// Tags were retired in favor of folders. Each tag becomes a folder holding the
// sites that carried it (the first tag in display order wins; sites already in
// a folder stay where they are). Returns true when anything changed.
function migrateTagsToFolders() {
  const tags = Array.isArray(state.tags) ? state.tags : [];
  const order = Array.isArray(state.tagOrder) ? state.tagOrder.filter((t) => tags.includes(t)) : [];
  const orderedTags = order.concat(tags.filter((t) => !order.includes(t)));
  const hasSiteTags = (state.sites || []).some((s) => s && Array.isArray(s.tags) && s.tags.length);
  if (!orderedTags.length && !hasSiteTags) return false;

  const inFolder = new Set((state.sites || [])
    .filter((s) => s && s.type === 'folder')
    .flatMap((f) => (Array.isArray(f.children) ? f.children : [])));
  const claimed = new Set();
  orderedTags.forEach((tag) => {
    const members = (state.sites || []).filter((s) => s && s.type !== 'folder'
      && Array.isArray(s.tags) && s.tags.includes(tag) && !claimed.has(s.id) && !inFolder.has(s.id));
    if (!members.length) return;
    const ids = members.map((m) => m.id);
    ids.forEach((id) => claimed.add(id));
    const positions = ids.map((id) => state.siteOrder.indexOf(id)).filter((i) => i >= 0);
    const folder = {
      id: generateUuid(), type: 'folder', name: tag, url: '', showOnHome: true, tags: [], children: ids
    };
    state.sites.push(folder);
    state.siteOrder = state.siteOrder.filter((id) => !ids.includes(id));
    const at = positions.length ? Math.min(Math.min(...positions), state.siteOrder.length) : state.siteOrder.length;
    state.siteOrder.splice(at, 0, folder.id);
  });
  (state.sites || []).forEach((s) => { if (s && Array.isArray(s.tags)) s.tags = []; });
  state.tags = [];
  state.tagOrder = [];
  return true;
}

window.migrateTagsToFolders = migrateTagsToFolders;

// ===== Rename Modal =====
const renameModal = document.getElementById('renameModal');
const renameInput = document.getElementById('renameInput');
let pendingRenameId = null;
function openRenameModal(id, type) {
  // Only folders are renameable in the home-only build. The workspace and
  // agent sheets were removed with the second screen, so never touch their
  // dead globals here.
  if (type && type !== 'folder') return;
  const folder = (state.sites || []).find((s) => s && s.id === id && s.type === 'folder');
  if (!folder) return;
  const value = folder.name || '';
  pendingRenameId = id;
  if (renameInput) renameInput.value = value;
  window.closeAllWindowsExcept?.(renameModal);
  if (renameModal) renameModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  if (renameInput) { renameInput.focus(); renameInput.select(); }
  hideContextMenu();
}

function saveRename() {
  if (!renameInput) return;
  const name = renameInput.value.trim();
  if (!name) {
    window.showNotification?.(i18n.t('folderNameRequired') || 'Folder name cannot be empty', 'warning');
    return;
  }
  const folder = (state.sites || []).find((s) => s && s.id === pendingRenameId && s.type === 'folder');
  if (folder) {
    folder.name = name;
    saveData();
    renderHome();
  }
  closeRenameModal();
}

function closeRenameModal() {
  pendingRenameId = null;
  if (renameModal) renameModal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

// Context-menu helpers (must be on window for CSP-safe click handler)
window.renameFolderFromContext = function () {
  const item = contextMenuState.targetItem;
  if (item) openRenameModal(item.id, 'folder');
};

window.deleteFolderFromContext = async function () {
  const item = contextMenuState.targetItem;
  hideContextMenu();
  if (!item) return;
  const ok = await window.showConfirmDialog({
    title: i18n.t('delete'),
    message: i18n.t('deleteFolderConfirm'),
    confirmText: i18n.t('delete'),
    cancelText: i18n.t('cancel'),
    tone: 'danger'
  });
  if (!ok) return;
  deleteFolder(item.id);
  saveData();
  renderHome();
};

window.moveOutSiteFromContext = function () {
  const item = contextMenuState.targetItem;
  if (!item) return;
  moveSiteOutOfFolder(item.id);
  saveData();
  renderHome();
  hideContextMenu();
};

window.openRenameModal = openRenameModal;
window.saveRename = saveRename;
window.closeRenameModal = closeRenameModal;
window.openFolder = openFolder;
window.closeFolder = closeFolder;

// ===== Zoom Level =====
const ZOOM_FACTORS = { '100': 0.9, '125': 1.125, '150': 1.35 };
function applyZoomLevel(level, persist) {
  const zoom = ['100', '125', '150'].includes(String(level)) ? String(level) : '100';
  state.zoomLevel = zoom;
  if (persist !== false) localStorage.setItem('zoomLevel', zoom);
  document.documentElement.style.zoom = String(ZOOM_FACTORS[zoom]);
  document.documentElement.style.setProperty('--app-zoom', String(ZOOM_FACTORS[zoom]));
  updateSettingsMenu();
}

function setZoomLevel(level) {
  applyZoomLevel(level, true);
  saveData();
  closeSettingsLayers();
  renderHome();
}

window.applyZoomLevel = applyZoomLevel;
window.setZoomLevel = setZoomLevel;

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
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Google', url: 'https://google.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Gmail', url: 'https://mail.google.com' }
  ];
  state.sites = defaultSites.map((s, i) => ({
    id: `default-${i}`,
    name: s.name,
    url: s.url,
    tags: [],
    showOnHome: true
  }));
  state.siteOrder = state.sites.map(s => s.id);
  saveData(false);
}

if (migrateTagsToFolders()) saveData(false);
if (state.siteOrder.length === 0 && state.sites.length > 0) {
  state.siteOrder = state.sites.map(s => s.id);
}

migrateLocalSiteIdsToUuid();

async function saveData(syncToBackend = true) {
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

  if (syncToBackend && window.authState && window.authState.isLoggedIn) {
    if (window.markHomeConfigUpdated) {
      return await window.markHomeConfigUpdated();
    } else if (window.saveUserDataToBackend) {
      return await window.saveUserDataToBackend();
    }
  }

  return true;
}

// appearance.js (view mode) and data-sync.js (tag migration) save through this.
window.saveData = saveData;

async function toggleMinimalist() {
  state.viewMode = state.viewMode === 'general' ? 'minimalist' : 'general';
  await saveData();
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
const languageMenuItem = document.getElementById('languageMenuItem');
const languageSubmenu = document.getElementById('languageSubmenu');

// Modals
const modalOverlay = document.getElementById('modalOverlay');
const addModal = document.getElementById('addModal');
const closeAddModalBtn = document.getElementById('closeAddModal');
const saveItemBtn = document.getElementById('saveItem');
const siteForm = document.getElementById('siteForm');

// Context Menu
const contextMenu = document.getElementById('contextMenu');
const engineContextMenu = document.getElementById('engineContextMenu');

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

  // CJK modes: fixed format
  if (i18n.currentLocale === 'zh') {
    dateStr = `${y}年${String(m).padStart(2, '0')}月${String(d).padStart(2, '0')}日 ${dayName}`;
  } else if (i18n.currentLocale === 'ja') {
    dateStr = `${y}年${m}月${d}日（${dayName}）`;
  } else if (i18n.currentLocale === 'ko') {
    dateStr = `${y}년 ${m}월 ${d}일 (${dayName})`;
  }
  // Western modes (en/fr/es): support format switching
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

dateEl.addEventListener('click', async () => {
  // Allow format switching in western locales (en/fr/es)
  if (i18n.currentLocale === 'en' || i18n.currentLocale === 'fr' || i18n.currentLocale === 'es') {
    state.dateFormatIndex = (state.dateFormatIndex + 1) % 3;
    await saveData();
    updateTime();
  }
});

// Time format toggle
timeEl.addEventListener('click', async () => {
  state.timeFormat = state.timeFormat === '24h' ? '12h' : '24h';
  localStorage.setItem('timeFormat', state.timeFormat);
  await saveData();
  updateTime();
});

setInterval(updateTime, 1000);
updateTime();

// ===== Search Engine =====
// Engine icons use a source chain in data-favicon-sources. The delegated
// error/load listeners advance it when a source 404s or only yields a 16px
// globe. They replace inline handlers, which the extension's CSP blocks.
document.addEventListener('error', (e) => {
  const img = e.target;
  if (!img || img.tagName !== 'IMG') return;
  if (advanceFaviconChain(img)) return;
  if (img.dataset.fallbackSrc && img.src !== img.dataset.fallbackSrc) {
    img.src = img.dataset.fallbackSrc;
  }
}, true);

document.addEventListener('load', (e) => {
  const img = e.target;
  if (!img || img.tagName !== 'IMG' || !img.dataset.faviconSources) return;
  if (img.naturalWidth > 0 && img.naturalWidth < FAVICON_SHARP_EDGE && advanceFaviconChain(img)) return;
  const list = decodeFaviconSources(img.dataset.faviconSources);
  const source = list[Number(img.dataset.faviconIndex || 0)];
  if (source && window.MediaCache?.warm) window.MediaCache.warm(source);
}, true);

function renderSearchEngine() {
  const enabledIds = state.enabledEngineIds || [];
  const enabled = getEnabledEngines(enabledIds);
  const engine = getCurrentEngine();

  if (engine) {
    setFaviconChain(engineIcon, getEngineIconSources(engine), getEngineFallbackIcon(engine));
  } else {
    setFaviconChain(engineIcon, ['https://www.google.com/favicon.ico'], 'https://www.google.com/favicon.ico');
  }

  const addable = getCatalogAddableEngines(enabledIds);
  const addLabel = i18n.t('addEngine');
  const removeLabel = i18n.t('remove');

  engineMenu.innerHTML = `
    <div class="engine-menu-section">
      ${enabled.map((eng) => {
    const name = getEngineName(eng);
    const isCurrent = !!engine && eng.id === engine.id;
    const iconAttrs = faviconChainAttributes(getEngineIconSources(eng), getEngineFallbackIcon(eng));
    return `
          <div class="engine-option ${isCurrent ? 'active' : ''}" data-engine-id="${eng.id}">
            <div class="engine-option-main" onclick="selectEngineById('${eng.id}')">
              <img ${iconAttrs} alt="${escapeFaviconAttr(name)}">
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
    const isActive = !!currentEngine && engine.id === currentEngine.id;
    const iconAttrs = faviconChainAttributes(getEngineIconSources(engine), getEngineFallbackIcon(engine));
    return `
      <div class="engine-quick-item ${isActive ? 'active' : ''}" data-engine-id="${engine.id}" onclick="selectEngineById('${engine.id}')" title="${name}">
        <img ${iconAttrs} alt="${escapeFaviconAttr(name)}">
        <span>${name}</span>
      </div>
    `;
  }).join('');
}

// ===== Search Engine Modal Logic =====

function updateEngineCustomLabels() {
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  setText('customEngineTitle', i18n.t('customSearch'));
  setText('customEngineHint', i18n.t('customSearchHint'));
  setText('customEngineNameLabel', i18n.t('customSearchName'));
  setText('customEngineUrlLabel', i18n.t('customSearchUrl'));
  const saveBtn = document.getElementById('saveCustomEngine');
  if (saveBtn) saveBtn.textContent = i18n.t('customEngineAdd');
  const resetBtn = document.getElementById('resetEngines');
  if (resetBtn) resetBtn.textContent = i18n.t('resetEngines');
  const nameInput = document.getElementById('customEngineName');
  const urlInput = document.getElementById('customEngineUrl');
  if (nameInput) nameInput.placeholder = i18n.t('customSearchNamePlaceholder');
  if (urlInput) urlInput.placeholder = i18n.t('customSearchPlaceholder');
}

function populateEngineCustomPanel() {
  const nameInput = document.getElementById('customEngineName');
  const urlInput = document.getElementById('customEngineUrl');
  if (nameInput) nameInput.value = state.customEngine?.name || '';
  if (urlInput) urlInput.value = state.customEngine?.url || '';
  updateEngineCustomLabels();
}

function refreshEngineCatalogUI() {
  const grid = document.getElementById('engineList');
  if (grid) grid.dataset.key = '';
  renderSearchEngine();
  renderEngineQuickList();
  renderEngineModal();
}

function openEngineModal() {
  const engineModal = document.getElementById('engineModal');
  if (!engineModal) return;
  engineMenu?.classList.add('hidden'); // one glass layer at a time
  window.closeAllWindowsExcept?.(engineModal);
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

  populateEngineCustomPanel();
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
      const msg = i18n.t('engineLimit');
      if (window.showNotification) window.showNotification(msg, 'info');
      return;
    }
    enginePageState.selectedIds.push(id);
  }
  syncEngineModalSelection();
}

// Updates checks and the count without rebuilding the grid, so the icons are
// not reloaded on every click.
function syncEngineModalSelection() {
  document.querySelectorAll('#engineList .engine-item').forEach((el) => {
    el.classList.toggle('selected', enginePageState.selectedIds.includes(el.dataset.engineId));
  });
  const hint = document.getElementById('engineCountHint');
  if (hint) hint.textContent = i18n.t('engineSelected').replace('{n}', enginePageState.selectedIds.length);
}

function setEnginePage(p) {
  enginePageState.page = p;
  renderEngineModal();
}

function renderEngineModal() {
  const grid = document.getElementById('engineList');
  const pag = document.getElementById('enginePagination');
  const hint = document.getElementById('engineCountHint');

  // The whole catalog in one scrolling grid (no pages). Built once per
  // catalog and language; later opens only resync the selection.
  const items = ENGINE_CATALOG;
  const key = items.map((e) => e.id).join(',') + '|' + i18n.currentLocale;
  if (grid.dataset.key === key) {
    syncEngineModalSelection();
    return;
  }
  grid.dataset.key = key;

  grid.innerHTML = items.map(eng => {
    const isSelected = enginePageState.selectedIds.includes(eng.id);
    const name = getEngineName(eng);
    const iconAttrs = faviconChainAttributes(getEngineIconSources(eng), getEngineFallbackIcon(eng));
    return `
      <div class="engine-item ${isSelected ? 'selected' : ''}" data-engine-id="${eng.id}" onclick="toggleEngineSelection('${eng.id}')">
        <div class="engine-check">✓</div>
        <img ${iconAttrs} alt="" width="32" height="32" loading="lazy" decoding="async">
        <span>${name}</span>
      </div>
    `;
  }).join('');


  // Hint text
  const count = enginePageState.selectedIds.length;
  hint.textContent = i18n.t('engineSelected').replace('{n}', count);
}

// Bind events
document.getElementById('closeEngineModal').onclick = closeEngineModal;
document.getElementById('saveEngineSelection').onclick = async () => {
  if (enginePageState.selectedIds.length === 0) {
    const fallback = DEFAULT_ENGINE_IDS.find((id) => ENGINE_CATALOG.some((engine) => engine.id === id))
      || ENGINE_CATALOG[0]?.id;
    enginePageState.selectedIds = fallback ? [fallback] : [];
  }

  state.enabledEngineIds = [...enginePageState.selectedIds].slice(0, 5);

  // Ensure current engine is still valid
  if (!state.enabledEngineIds.includes(state.engineId)) {
    state.engineId = state.enabledEngineIds[0] || '';
  }

  const saved = await saveData();
  if (saved === false) return;

  renderSearchEngine();
  renderEngineQuickList();
  closeEngineModal();
};

window.selectEngineById = async (id) => {
  const enabled = getEnabledEngines(state.enabledEngineIds || []);
  const idx = enabled.findIndex((e) => e.id === id);
  if (idx < 0) return;
  state.engineId = id;
  state.engineIndex = idx;
  const saved = await saveData();
  if (saved === false) return;
  renderSearchEngine();
  renderEngineQuickList();
  engineMenu.classList.add('hidden');
};

window.toggleEngineAddMenu = () => {
  const el = document.getElementById('engineAddMenu');
  if (!el) return;
  el.classList.toggle('hidden');
};

window.addEngineById = async (id) => {
  if (!ENGINE_CATALOG.some((e) => e.id === id)) return;
  const set = new Set(state.enabledEngineIds || []);
  if (set.has(id)) return;
  if ((state.enabledEngineIds || []).length >= 5) {
    const msg = i18n.t('engineLimit');
    if (window.showNotification) window.showNotification(msg, 'info');
    return;
  }
  state.enabledEngineIds = [...(state.enabledEngineIds || []), id].slice(0, 5);
  const saved = await saveData();
  if (saved === false) return;
  renderSearchEngine();
};

window.removeEngineById = async (id) => {
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
  const saved = await saveData();
  if (saved === false) return;
  renderSearchEngine();
  renderEngineQuickList();
};

document.getElementById('saveCustomEngine')?.addEventListener('click', async () => {
  const nameInput = document.getElementById('customEngineName');
  const urlInput = document.getElementById('customEngineUrl');
  const name = String(nameInput?.value || '').trim().slice(0, 40) || i18n.t('customSearch');
  const url = normalizeCustomSearchUrl(urlInput?.value);
  if (!url) {
    window.showNotification?.(i18n.t('customSearchInvalid'), 'error');
    urlInput?.focus();
    return;
  }

  const custom = { name, url };
  localStorage.setItem(CUSTOM_ENGINE_STORAGE_KEY, JSON.stringify(custom));
  state.customEngine = custom;
  ensureCustomEngineInCatalog(custom);

  if (!state.enabledEngineIds.includes(CUSTOM_ENGINE_ID) && state.enabledEngineIds.length < 5) {
    state.enabledEngineIds = [...state.enabledEngineIds, CUSTOM_ENGINE_ID];
  }
  if (state.enabledEngineIds.includes(CUSTOM_ENGINE_ID)) {
    state.engineId = CUSTOM_ENGINE_ID;
    state.engineIndex = Math.max(0, getEnabledEngines(state.enabledEngineIds).findIndex((e) => e.id === CUSTOM_ENGINE_ID));
  }

  enginePageState.selectedIds = [...state.enabledEngineIds];
  const saved = await saveData();
  if (saved === false) return;
  populateEngineCustomPanel();
  refreshEngineCatalogUI();
  window.showNotification?.(i18n.t('customSearchSaved'), 'success');
});

function showEngineContextMenu(event, engineId) {
  const engine = ENGINE_CATALOG.find((item) => item.id === engineId);
  if (!engineContextMenu || !engine) return;
  event.preventDefault();
  event.stopPropagation();
  hideContextMenu?.();
  window.hideAllContextMenus?.();
  engineContextMenu.dataset.engineId = engineId;
  engineContextMenu.innerHTML = `<div class="context-menu-item">${i18n.t('deleteEngine')}</div>`;
  engineContextMenu.classList.remove('hidden');
  placeMenuAt(engineContextMenu, event.clientX, event.clientY);
}

async function deleteEngineById(id) {
  const engine = ENGINE_CATALOG.find((item) => item.id === id);
  if (!engine) return;
  engineContextMenu?.classList.add('hidden');
  const wasOpen = !document.getElementById('engineModal')?.classList.contains('hidden');
  const message = i18n.t('deleteEngineConfirm').replace('{name}', getEngineName(engine));
  const shouldDelete = window.showConfirmDialog
    ? await window.showConfirmDialog({
      title: i18n.t('deleteConfirm'),
      message,
      confirmText: i18n.t('delete'),
      cancelText: i18n.t('cancel'),
      tone: 'danger'
    })
    : window.confirm(message);
  if (!shouldDelete) return;

  if (id === CUSTOM_ENGINE_ID) {
    localStorage.removeItem(CUSTOM_ENGINE_STORAGE_KEY);
    state.customEngine = null;
  } else {
    deletedEngineIds.add(id);
    localStorage.setItem(DELETED_ENGINE_STORAGE_KEY, JSON.stringify([...deletedEngineIds]));
  }

  ENGINE_CATALOG = ENGINE_CATALOG.filter((item) => item.id !== id);
  state.enabledEngineIds = (state.enabledEngineIds || []).filter((engineId) => engineId !== id);
  enginePageState.selectedIds = (enginePageState.selectedIds || []).filter((engineId) => engineId !== id);
  if (state.engineId === id) {
    const next = getEnabledEngines(state.enabledEngineIds)[0] || ENGINE_CATALOG[0] || null;
    state.engineId = next ? next.id : '';
    state.engineIndex = 0;
  }

  const saved = await saveData();
  if (saved === false) return;
  populateEngineCustomPanel();
  refreshEngineCatalogUI();
  if (wasOpen) openEngineModal();
  window.showNotification?.(i18n.t('engineDeleted'), 'success');
}

async function resetEngineCatalog() {
  const shouldReset = window.showConfirmDialog
    ? await window.showConfirmDialog({
      title: i18n.t('resetEngines'),
      message: i18n.t('resetEnginesConfirm'),
      confirmText: i18n.t('resetEngines'),
      cancelText: i18n.t('cancel'),
      tone: 'warning'
    })
    : window.confirm(i18n.t('resetEnginesConfirm'));
  if (!shouldReset) return;

  deletedEngineIds.clear();
  localStorage.removeItem(DELETED_ENGINE_STORAGE_KEY);
  localStorage.removeItem(CUSTOM_ENGINE_STORAGE_KEY);
  state.customEngine = null;
  ENGINE_CATALOG = cloneBaseEngineCatalog();
  state.enabledEngineIds = DEFAULT_ENGINE_IDS.filter((id) => ENGINE_CATALOG.some((engine) => engine.id === id));
  state.engineId = state.enabledEngineIds[0] || '';
  state.engineIndex = 0;
  enginePageState.selectedIds = [...state.enabledEngineIds];

  const saved = await saveData();
  if (saved === false) return;
  populateEngineCustomPanel();
  refreshEngineCatalogUI();
  openEngineModal();
  window.showNotification?.(i18n.t('enginesReset'), 'success');
}

document.getElementById('resetEngines')?.addEventListener('click', resetEngineCatalog);

engineContextMenu?.addEventListener('click', (event) => {
  if (!event.target.closest('.context-menu-item')) return;
  const id = engineContextMenu.dataset.engineId;
  if (id) deleteEngineById(id);
});

document.addEventListener('contextmenu', (event) => {
  const target = event.target.closest?.('.engine-item[data-engine-id], .engine-quick-item[data-engine-id], .engine-option[data-engine-id]');
  if (!target) return;
  showEngineContextMenu(event, target.dataset.engineId);
}, true);

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
  if (!engine) {
    window.showNotification?.(i18n.t('engineEmpty'), 'info');
    openEngineModal();
    return;
  }
  (async () => {
    await logSearchQueryToSupabase(query, engine);
    const targetUrl = buildSearchUrl(engine, query);
    if (!targetUrl) return;
    if (state.openBehavior === 'newtab') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = targetUrl;
    }
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



// ===== Context Menu Functions =====
function showContextMenu(event, item, type) {
  event.preventDefault();
  event.stopPropagation();
  // Only one context menu at a time
  hideAllContextMenus();
  window.hideWidgetMenu?.();
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
  const type = contextMenuState.targetType;
  const isFolderView = !!state.openFolderId;
  let itemsHtml = '';

  if (type === 'folder') {
    itemsHtml = `
      <div class="context-menu-item" onclick="renameFolderFromContext()">${i18n.t('rename') || 'Rename'}</div>
      <div class="context-menu-item" onclick="deleteFolderFromContext()">${i18n.t('delete')}</div>
    `;
  } else if (type === 'site' && isFolderView) {
    itemsHtml = `
      <div class="context-menu-item" onclick="moveOutSiteFromContext()">${i18n.t('moveOutFolder') || 'Move out of folder'}</div>
      <div class="context-menu-item" onclick="editItem()">${i18n.t('edit') || 'Edit'}</div>
      <div class="context-menu-item" onclick="deleteItem()">${i18n.t('delete')}</div>
    `;
  } else {
    itemsHtml = `
      <div class="context-menu-item" onclick="editItem()">${i18n.t('edit') || 'Edit'}</div>
      <div class="context-menu-item" onclick="deleteItem()">${i18n.t('delete')}</div>
    `;
  }

  contextMenu.innerHTML = itemsHtml;
  contextMenu.classList.remove('hidden');
  placeMenuAt(contextMenu, contextMenuState.x, contextMenuState.y);
}window.editItem = function () {
  const item = contextMenuState.targetItem;
  const type = contextMenuState.targetType;

  if (type !== 'site') return;
  document.getElementById('siteName').value = item.name;
  document.getElementById('siteUrl').value = item.url;
  resetIconDraft(item);
  addSiteCategory = 'custom';
  renderAddSiteCatalog();

  // Store the item being edited for save logic
  window.editingItem = { item, type };
  if (type === 'site') renderSiteIconPreview();

  window.closeAllWindowsExcept?.(addModal);
  addModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  hideContextMenu();
};

// Delete Modal State
let pendingDelete = null;

window.deleteItem = function () {
  const item = contextMenuState.targetItem;
  const type = contextMenuState.targetType;

  const itemName = (type === 'site' || type === 'folder') ? item.name : item;

  // Setup Modal
  pendingDelete = { item, type };
  document.getElementById('deleteTitle').textContent = i18n.t('delete');
  document.getElementById('deleteMessage').textContent = `${i18n.t('deleteConfirm')} "${itemName}"?`;

  // Show Modal
  window.closeAllWindowsExcept?.(document.getElementById('deleteModal'));
  document.getElementById('deleteModal').classList.remove('hidden');
  modalOverlay.classList.remove('hidden');

  hideContextMenu();
};

// Confirm Delete Handler
document.getElementById('confirmDelete').addEventListener('click', async () => {
  if (!pendingDelete) return;

  const { item, type } = pendingDelete;

  if (type === 'folder') {
    deleteFolder(item.id);
  } else if (type === 'site') {
    state.sites = state.sites.filter(s => s.id !== item.id);
    state.siteOrder = state.siteOrder.filter(id => id !== item.id);
    // Remove this site from any folder children
    state.sites.forEach(ss => {
      if (ss.type === 'folder' && Array.isArray(ss.children)) {
        ss.children = ss.children.filter(cid => cid !== item.id);
      }
    });
  }
  const saved = await saveData();
  if (saved === false) return;

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

// Rename Modal wiring
const closeRenameBtn = document.getElementById('closeRenameModal');
const saveRenameBtn = document.getElementById('saveRename');
closeRenameBtn?.addEventListener('click', closeRenameModal);
saveRenameBtn?.addEventListener('click', saveRename);
renameInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveRename();
});

// Close context menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.context-menu') && !e.target.closest('.chip') && !e.target.closest('.site-tile')) {
    hideContextMenu();
  }
});

// ===== Content Rendering =====
// Favicon sources, best first. The extension reads Chrome's own favicon cache
// (offline, no third-party request); the web build tries Google, then DuckDuckGo.
let faviconRefreshEpoch = 0;

function getFaviconSources(url, options) {
  const opts = options || {};
  const bust = opts.bust ? String(opts.bust) : '';
  const bustQuery = (asFirst) => bust ? (asFirst ? '?' : '&') + 'v=' + encodeURIComponent(bust) : '';
  let host = '';
  let absoluteUrl = '';
  try {
    const parsed = new URL(String(url || ''), window.location.href);
    host = parsed.hostname.replace(/^www\./i, '');
    absoluteUrl = parsed.href;
  } catch (_err) {
    return [];
  }
  if (!host) return [];
  // NewTab's own new liquid-glass mark beats any cached letter favicon.
  if (/^(www\.|staging\.)?newtab\.online$/i.test(host)) {
    const localIcon = (typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION && typeof chrome !== 'undefined' && chrome.runtime?.getURL)
      ? chrome.runtime.getURL('favicon.svg')
      : new URL('/favicon.svg', window.location.origin).href;
    return [
      localIcon + bustQuery(true),
      'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(host) + '&sz=256' + bustQuery()
    ];
  }
  // In the extension, Chrome's own favicon store is local and returns before
  // any network request. The web build keeps Google's 128px icon first because
  // it has no access to the browser's favicon database.
  const sources = [];
  if (typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION && typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    sources.push(chrome.runtime.getURL('/_favicon/?pageUrl=' + encodeURIComponent(absoluteUrl) + '&size=128' + (bust ? '&t=' + encodeURIComponent(bust) : '')));
  }
  sources.push('https://www.google.com/s2/favicons?domain=' + encodeURIComponent(host) + '&sz=256' + bustQuery());
  sources.push('https://icons.duckduckgo.com/ip3/' + encodeURIComponent(host) + '.ico' + bustQuery(true));
  return sources;
}

// Extra sources tried only after both primary providers fail. They are kept
// out of getFaviconSources so the tile renderer can show its letter fallback
// immediately, then swap in a late, sharper icon if one of these loads.
function getSiteFaviconFallbackSources(url, bust) {
  const bustFirst = bust ? '?' : '&';
  const bustQuery = bust ? bustFirst + 'v=' + encodeURIComponent(String(bust)) : '';
  let host = '';
  try {
    host = new URL(String(url || ''), window.location.href).hostname.replace(/^www\./i, '');
  } catch (_err) {
    return [];
  }
  if (!host) return [];
  return dedupeUrls([
    'https://' + host + '/favicon.ico' + bustQuery,
    'https://icon.horse/icon/' + encodeURIComponent(host) + bustQuery
  ]);
}

function getDisplayFaviconSources(url, bust) {
  return dedupeUrls([
    ...getFaviconSources(url, { bust }),
    ...getSiteFaviconFallbackSources(url, bust)
  ]);
}

function escapeFaviconAttr(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function encodeFaviconSources(sources) {
  return dedupeUrls(sources)
    .map((url) => encodeURIComponent(url).replace(/'/g, '%27'))
    .join('|');
}

function decodeFaviconSources(raw) {
  if (!raw) return [];
  return String(raw).split('|').map((part) => {
    try { return decodeURIComponent(part); } catch (_err) { return ''; }
  }).filter(Boolean);
}

// Markup for a templated <img>. The image starts on the best source and the
// delegated load/error handlers advance through the rest without inline JS,
// which keeps the extension CSP happy.
function faviconChainAttributes(sources, fallback) {
  const list = dedupeUrls(sources);
  const first = list[0] || fallback || '';
  return 'src="' + escapeFaviconAttr(first) + '"'
    + ' data-favicon-sources="' + escapeFaviconAttr(encodeFaviconSources(list)) + '"'
    + ' data-favicon-index="0"'
    + (fallback ? ' data-fallback-src="' + escapeFaviconAttr(fallback) + '"' : '');
}

function setFaviconChain(img, sources, fallback) {
  if (!img) return;
  const list = dedupeUrls(sources);
  img.dataset.faviconSources = encodeFaviconSources(list);
  img.dataset.faviconIndex = '0';
  if (fallback) img.dataset.fallbackSrc = fallback;
  else delete img.dataset.fallbackSrc;
  img.src = list[0] || fallback || '';
}

function advanceFaviconChain(img) {
  if (!img || img.tagName !== 'IMG') return false;
  const list = decodeFaviconSources(img.dataset.faviconSources);
  if (list.length < 2) return false;
  const index = Number(img.dataset.faviconIndex || 0);
  const next = index + 1;
  if (next >= list.length) return false;
  img.dataset.faviconIndex = String(next);
  img.src = list[next];
  return true;
}

// site.customIcon is either an https URL or a small data:image (see
// supabase_glass_migration.sql, which enforces the same rule server side).
const SITE_ICON_MAX_CHARS = 60000;

function isValidSiteIcon(icon) {
  return typeof icon === 'string'
    && icon.length <= SITE_ICON_MAX_CHARS
    && /^(https:\/\/|data:image\/(png|jpeg|webp|gif);base64,)/.test(icon);
}

// Resizes an uploaded image to a 128px square (contain) and returns a data URL
// small enough to sync; tries PNG first, then WebP/JPEG at decreasing quality.
function imageFileToIcon(file) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\//.test(file.type) || file.size > 5 * 1024 * 1024) {
      reject(new Error('invalid image'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const scale = Math.min(size / img.width, size / img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      const candidates = [
        canvas.toDataURL('image/png'),
        canvas.toDataURL('image/webp', 0.9),
        canvas.toDataURL('image/webp', 0.75),
        canvas.toDataURL('image/jpeg', 0.8)
      ];
      const fit = candidates.find(isValidSiteIcon);
      if (fit) resolve(fit);
      else reject(new Error('image too large'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('invalid image'));
    };
    img.src = url;
  });
}

function getSiteFaviconUrl(url) {
  return getFaviconSources(url)[0] || '';
}

// Walks the source list on error. A tiny first hit (Google's 16px globe for
// unknown sites) is kept as a fallback while a sharper source is tried.
function loadFavicon(img, sources, onFail, options) {
  const opts = options || {};
  if (!sources.length) {
    onFail();
    return;
  }
  let i = 0;
  let lowRes = '';
  let warmed = false;
  const isExtensionRuntime = typeof IS_EXTENSION !== 'undefined' && IS_EXTENSION;
  const force = !!opts.force;
  const minEdge = Number.isFinite(opts.minEdge) ? opts.minEdge : 48;
  const warmLoadedSource = () => {
    if (warmed || isExtensionRuntime) return;
    warmed = true;
    const source = sources[i] || sources[0];
    if (window.MediaCache?.warm) window.MediaCache.warm(source);
  };
  img.onload = () => {
    // Do not persist a tiny 16px globe: try the sharper providers first.
    if (img.naturalWidth > 0 && img.naturalWidth < minEdge && i < sources.length - 1) {
      lowRes = lowRes || img.src;
      img.src = sources[++i];
      return;
    }
    warmLoadedSource();
  };
  img.onerror = () => {
    if (i < sources.length - 1) {
      img.src = sources[++i];
    } else if (lowRes) {
      i = sources.length;
      img.src = lowRes;
      lowRes = '';
    } else {
      onFail();
    }
  };

  // Web: reuse a previously stored response when available, otherwise show
  // the regular remote URL and persist it after it loads.
  if (!force && !isExtensionRuntime && window.MediaCache?.resolveFirst) {
    window.MediaCache.resolveFirst(sources).then((cached) => {
      img.src = cached || sources[0];
    }).catch(() => {
      img.src = sources[0];
    });
  } else {
    img.src = sources[0];
  }
}

function getSiteInitial(site) {
  const name = String(site?.name || '').trim();
  return name ? name.charAt(0).toUpperCase() : '?';
}

// Text icon chosen in the editor: a short label on a solid color.
const ICON_TEXT_MAX = 4;

function isValidIconColor(color) {
  return typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color);
}

function createTextIcon(text, color) {
  const icon = document.createElement('div');
  icon.className = 'site-tile-icon glass is-text-icon';
  icon.style.setProperty('--icon-bg', color);
  const hex = color.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  // perceived brightness decides white or dark text
  icon.classList.toggle('is-light-bg', (r * 299 + g * 587 + b * 114) / 1000 > 170);
  const badge = document.createElement('span');
  badge.className = 'site-tile-badge';
  badge.style.background = color;
  const label = document.createElement('span');
  label.className = 'site-tile-text';
  const chars = Array.from(String(text).trim()).slice(0, ICON_TEXT_MAX);
  label.textContent = chars.join('');
  label.dataset.len = String(chars.length);
  badge.appendChild(label);
  icon.appendChild(badge);
  return icon;
}

// Places a fixed menu next to the pointer. Pointer coordinates are viewport
// pixels but `left`/`top` are in the html's zoomed CSS pixels, so divide by
// the zoom; flip to the other side of the pointer near the viewport edges.
function placeMenuAt(menu, clientX, clientY) {
  const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
  const w = menu.offsetWidth * zoom;
  const h = menu.offsetHeight * zoom;
  const gap = 2;
  let x = clientX + gap;
  let y = clientY + gap;
  if (x + w > window.innerWidth - 8) x = Math.max(8, clientX - w - gap);
  if (y + h > window.innerHeight - 8) y = Math.max(8, clientY - h - gap);
  menu.style.left = (x / zoom) + 'px';
  menu.style.top = (y / zoom) + 'px';
}
window.placeMenuAt = placeMenuAt;

function createFaviconIcon(site) {
  if (site.iconText && isValidIconColor(site.iconColor)) return createTextIcon(site.iconText, site.iconColor);
  const icon = document.createElement('div');
  icon.className = 'site-tile-icon glass';
  const refreshEpoch = typeof faviconRefreshEpoch === 'number' ? faviconRefreshEpoch : 0;

  const letter = document.createElement('span');
  letter.className = 'site-tile-letter';
  letter.textContent = getSiteInitial(site);
  icon.appendChild(letter);

  const sources = getFaviconSources(site.url, { bust: refreshEpoch || undefined });
  // The test harness only extracts the core functions, so guard the richer
  // fallback list instead of assuming it exists there.
  if (typeof getSiteFaviconFallbackSources === 'function') {
    sources.push(...getSiteFaviconFallbackSources(site.url, refreshEpoch || undefined));
  }
  if (isValidSiteIcon(site.customIcon)) {
    sources.unshift(site.customIcon);
    icon.classList.add('has-custom-icon');
  }
  if (!sources.length) {
    icon.classList.add('is-letter');
    return icon;
  }
  const img = document.createElement('img');
  img.className = 'site-tile-favicon';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = '';
  img.draggable = false;
  icon.appendChild(img);
  loadFavicon(img, sources, () => {
    img.remove();
    icon.classList.add('is-letter');
  });
  return icon;
}

function createFolderIcon(children) {
  const icon = document.createElement('div');
  icon.className = 'site-tile-icon folder-tile-icon glass';
  const refreshEpoch = typeof faviconRefreshEpoch === 'number' ? faviconRefreshEpoch : 0;
  // Up to four members, 2 x 2, filling the plate left to right, top to bottom
  children.slice(0, 4).forEach((child) => {
    const mini = document.createElement('span');
    mini.className = 'folder-mini';
    if (child.iconText && isValidIconColor(child.iconColor)) {
      mini.classList.add('is-text-mini');
      mini.style.background = child.iconColor;
      mini.textContent = Array.from(child.iconText)[0] || '';
      icon.appendChild(mini);
      return;
    }
    const sources = getFaviconSources(child.url, { bust: refreshEpoch || undefined });
    if (isValidSiteIcon(child.customIcon)) sources.unshift(child.customIcon);
    const showLetter = () => {
      mini.textContent = getSiteInitial(child);
      mini.classList.add('is-letter');
    };
    if (sources.length) {
      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      mini.appendChild(img);
      loadFavicon(img, sources, () => {
        img.remove();
        showLetter();
      });
    } else {
      showLetter();
    }
    icon.appendChild(mini);
  });
  return icon;
}

function refreshEngineCatalogIcons(bust) {
  ENGINE_CATALOG.forEach((engine) => {
    const domain = engineDomain(engine);
    if (domain) engine.icon = engineFavicon(domain, bust);
  });
}

// Re-fetch site and engine artwork without rebuilding the whole page. The
// cache-busting token also keeps MediaCache from returning the previous blob.
function refreshFaviconImages() {
  if (document.visibilityState === 'hidden') return;
  if (dragState.draggedId) return;

  faviconRefreshEpoch = Date.now();
  refreshEngineCatalogIcons(faviconRefreshEpoch);

  document.querySelectorAll('.site-tile.link-tile[data-id]').forEach((tile) => {
    const site = (state.sites || []).find((item) => item && item.id === tile.dataset.id);
    if (!site || site.iconText || isValidSiteIcon(site.customIcon)) return;
    const icon = tile.querySelector('.site-tile-icon');
    const img = tile.querySelector('img.site-tile-favicon');
    const sources = getFaviconSources(site.url, { bust: faviconRefreshEpoch });
    if (typeof getSiteFaviconFallbackSources === 'function') {
      sources.push(...getSiteFaviconFallbackSources(site.url, faviconRefreshEpoch));
    }
    if (!sources.length) return;
    if (img) {
      loadFavicon(img, sources, () => {
        img.remove();
        icon?.classList.add('is-letter');
      }, { force: true });
    } else if (icon?.classList.contains('is-letter')) {
      icon.replaceWith(createFaviconIcon(site));
    }
  });

  document.querySelectorAll('.site-tile.folder-tile[data-id]').forEach((tile) => {
    const folder = (state.sites || []).find((item) => item && item.id === tile.dataset.id);
    if (!folder) return;
    const children = getFolderChildren(folder).slice(0, 4);
    tile.querySelectorAll('.folder-mini').forEach((mini, index) => {
      const child = children[index];
      if (!child || child.iconText || isValidSiteIcon(child.customIcon)) return;
      const img = mini.querySelector('img');
      const sources = getFaviconSources(child.url, { bust: faviconRefreshEpoch });
      if (!img || !sources.length) return;
      loadFavicon(img, sources, () => {
        img.remove();
        mini.textContent = getSiteInitial(child);
        mini.classList.add('is-letter');
      }, { force: true, minEdge: 24 });
    });
  });

  renderSearchEngine();
  renderEngineQuickList();

  const engineModalEl = document.getElementById('engineModal');
  if (engineModalEl && !engineModalEl.classList.contains('hidden')) {
    const grid = document.getElementById('engineList');
    if (grid) grid.dataset.key = '';
    renderEngineModal();
  }

  const addModalEl = document.getElementById('addModal');
  const catalogPanel = document.getElementById('siteCatalogPanel');
  if (addModalEl && !addModalEl.classList.contains('hidden') && catalogPanel
    && !catalogPanel.classList.contains('hidden') && addSiteCategory !== 'custom') {
    renderAddSiteCatalog();
  }
}

const FAVICON_REFRESH_INTERVAL_MS = 5 * 60 * 1000;
let lastFaviconRefreshAt = Date.now();

function maybeRefreshFavicons() {
  if (Date.now() - lastFaviconRefreshAt < FAVICON_REFRESH_INTERVAL_MS) return;
  if (document.visibilityState === 'hidden') return;
  refreshFaviconImages();
  lastFaviconRefreshAt = Date.now();
}

setInterval(maybeRefreshFavicons, FAVICON_REFRESH_INTERVAL_MS);
document.addEventListener('visibilitychange', maybeRefreshFavicons);

// title is optional; it labels the visit in the workspace "Recently visited" widget.
function openLink(url, title) {
  window.recordVisit?.(url, title);
  if (state.openBehavior === 'newtab') {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
}

function createSiteTile(site, index, source) {
  const tile = document.createElement('div');
  const isFolder = site.type === 'folder';
  tile.className = 'site-tile' + (isFolder ? ' folder-tile' : ' link-tile');
  tile.dataset.id = site.id;
  tile.title = site.name || '';

  tile.appendChild(isFolder ? createFolderIcon(getFolderChildren(site)) : createFaviconIcon(site));

  const name = document.createElement('span');
  name.className = 'site-tile-name';
  name.textContent = site.name || (isFolder ? (i18n.t('folder') || 'Folder') : '');
  tile.appendChild(name);

  tile.draggable = true;
  tile.addEventListener('dragstart', (e) => handleDragStart(e, site.id, isFolder ? 'folder' : 'site', source, index));
  tile.addEventListener('dragover', handleDragOver);
  tile.addEventListener('drop', (e) => handleDrop(e, site.id, isFolder ? 'folder' : 'site'));
  tile.addEventListener('dragend', handleDragEnd);

  // Tiles can outlive a sync (see renderHome), so always act on the current site
  const current = () => (state.sites || []).find((s) => s && s.id === site.id) || site;
  if (isFolder) {
    tile.onclick = () => openFolder(site.id);
  } else {
    tile.onclick = () => openLink(current().url, current().name);
    tile.onmousedown = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        window.recordVisit?.(current().url, current().name);
        window.open(current().url, '_blank');
      }
    };
  }
  tile.oncontextmenu = (e) => showContextMenu(e, current(), isFolder ? 'folder' : 'site', source);
  return tile;
}

function getVisibleSites() {
  const pinnedSites = (state.sites || []).filter((s) => s && s.showOnHome);
  if (state.siteOrder.length > 0) {
    return state.siteOrder
      .map((id) => pinnedSites.find((s) => s.id === id))
      .filter((s) => s !== undefined);
  }
  return pinnedSites;
}

function getFolderChildren(folder) {
  const children = Array.isArray(folder?.children) ? folder.children : [];
  const byId = new Map((state.sites || []).filter((s) => s && s.id).map((s) => [s.id, s]));
  return children.map((id) => byId.get(id)).filter((s) => s !== undefined);
}

// Everything a tile shows. Equal keys mean the existing tile can stay as is.
function tileRenderKey(site, source) {
  const children = site.type === 'folder'
    ? getFolderChildren(site).slice(0, 4).map((c) => [c.id, c.url, c.customIcon, c.iconText, c.iconColor])
    : null;
  return JSON.stringify([source, i18n.currentLocale, site.id, site.name, site.url, site.type,
    site.customIcon, site.iconText, site.iconColor, children]);
}

// Updates a grid in place: unchanged tiles are kept (their icons are not
// reloaded, so a background sync is invisible), changed ones are rebuilt,
// and the order is fixed by moving nodes.
function reconcileTiles(grid, sites, source) {
  const existing = new Map();
  Array.from(grid.children).forEach((tile) => existing.set(tile.dataset.renderKey, tile));
  const next = sites.map((site, index) => {
    const key = tileRenderKey(site, source);
    const kept = existing.get(key);
    if (kept) {
      existing.delete(key);
      return kept;
    }
    const tile = createSiteTile(site, index, source);
    tile.dataset.renderKey = key;
    return tile;
  });
  existing.forEach((tile) => tile.remove());
  next.forEach((tile, i) => {
    if (grid.children[i] !== tile) grid.insertBefore(tile, grid.children[i] || null);
  });
}

let homeRenderDeferred = false;

function renderHome(options) {
  // A rebuild during a drag would orphan the dragged tile (and show it twice);
  // run it when the drag ends instead.
  if (dragState.draggedId && !(options && options.duringDrag)) {
    homeRenderDeferred = true;
    return;
  }
  homeRenderDeferred = false;

  if (state.viewMode === 'minimalist') {
    contentEl.innerHTML = '';
    renderFolderPopup();
    return;
  }

  // Sites grid (favicon tiles + folder tiles)
  let grid = contentEl.querySelector(':scope > .sites-grid');
  if (!grid) {
    contentEl.innerHTML = '';
    grid = document.createElement('div');
    grid.className = 'sites-grid';
    contentEl.appendChild(grid);
  }
  reconcileTiles(grid, getVisibleSites(), 'home');
  renderFolderPopup();
}

// True while the user is naming/editing something that a background sync
// must not rebuild underneath. The search box is deliberately excluded so
// cloud refreshes still work while someone is searching.
function isConfigEditingSurfaceActive() {
  if (typeof window.editingItem !== 'undefined') return true;
  const visible = (id) => {
    const el = document.getElementById(id);
    return !!el && !el.classList.contains('hidden');
  };
  if (visible('renameModal')) return true;
  if (visible('contextMenu')) return true;
  const active = document.activeElement;
  if (active && typeof active.closest === 'function'
    && active.closest('#addModal, #renameModal, #folderOverlay, #settingsModal')) {
    return true;
  }
  return false;
}

window.isConfigEditingSurfaceActive = isConfigEditingSurfaceActive;

// ===== Folder window =====
// A folder opens as a centered glass window over a blurred home page. Its
// icons can be edited/deleted from the context menu, reordered by dragging,
// and dragged outside the window to take them out (like iOS).
const folderOverlay = document.getElementById('folderOverlay');
const folderGrid = document.getElementById('folderGrid');
const folderNameInput = document.getElementById('folderNameInput');
const folderHint = document.getElementById('folderHint');

function getOpenFolder() {
  if (!state.openFolderId) return null;
  return (state.sites || []).find((s) => s && s.id === state.openFolderId && s.type === 'folder') || null;
}

function renderFolderPopup() {
  if (!folderOverlay) return;
  const folder = getOpenFolder();
  if (!folder) {
    folderOverlay.classList.add('hidden');
    return;
  }
  if (document.activeElement !== folderNameInput) folderNameInput.value = folder.name || '';
  folderNameInput.placeholder = i18n.t('newFolder') || 'New Folder';
  folderNameInput.setAttribute('aria-label', i18n.t('renameLabel') || 'Folder name');
  const children = getFolderChildren(folder);
  if (!dragState.draggedId) reconcileTiles(folderGrid, children, 'folder');
  folderHint.textContent = children.length ? '' : i18n.t('emptyFolder');
  folderHint.classList.toggle('hidden', children.length > 0);
  folderOverlay.classList.remove('hidden');
}

function openFolder(folderId) {
  // A folder is a window too: opening it dismisses menus/dialogs and keeps
  // the page behind it inert until the folder is closed.
  window.closeAllWindowsExcept?.(folderOverlay);
  state.openFolderId = folderId;
  renderFolderPopup();
}

function closeFolder() {
  if (!state.openFolderId) return;
  commitFolderName();
  state.openFolderId = null;
  renderFolderPopup();
  renderHome();
}

function commitFolderName() {
  const folder = getOpenFolder();
  if (!folder || !folderNameInput) return;
  const name = folderNameInput.value.trim() || i18n.t('newFolder') || 'New Folder';
  if (name === folder.name) return;
  folder.name = name;
  saveData();
}

folderNameInput?.addEventListener('change', () => {
  commitFolderName();
  renderHome();
});
folderNameInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.isComposing) folderNameInput.blur();
});
folderOverlay?.addEventListener('click', (e) => {
  if (e.target === folderOverlay) closeFolder();
});
// Dragging an icon out of the window takes it out of the folder; the drag
// then continues on the home grid (reorder there, or drop on another folder).
folderOverlay?.addEventListener('dragover', (e) => {
  if (dragState.draggedSource !== 'folder' || e.target.closest('.folder-sheet')) return;
  e.preventDefault();
  moveSiteOutOfFolder(dragState.draggedId);
  dragState.draggedSource = 'home';
  state.openFolderId = null;
  // The dragged tile lives in the folder grid, so the home grid can be
  // rebuilt now; the drag continues with the tile's new home copy.
  renderHome({ duringDrag: true });
  const homeTile = contentEl.querySelector('.sites-grid > .site-tile[data-id="' + dragState.draggedId + '"]');
  if (homeTile) {
    dragState.draggedElement = homeTile;
    homeTile.classList.add('dragging');
  }
  saveData();
});


// Icon draft in the add/edit dialog.
//   mode 'auto': favicon (or an uploaded image in `image`)
//   mode 'text': `text` on the `color` background
let iconDraft = { mode: 'auto', image: '', text: '', color: '' };

const ICON_COLORS = ['#007aff', '#af52de', '#ff2d55', '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#8e8e93', '#1c1c1e', '#ffffff'];

function resetIconDraft(site) {
  iconDraft = {
    mode: site && site.iconText ? 'text' : 'auto',
    image: (site && site.customIcon) || '',
    text: (site && site.iconText) || '',
    color: (site && isValidIconColor(site.iconColor) && site.iconColor) || ICON_COLORS[0]
  };
  const textInput = document.getElementById('iconTextInput');
  if (textInput) textInput.value = iconDraft.text;
}

function iconDraftText() {
  const name = (document.getElementById('siteName')?.value || '').trim();
  return iconDraft.text.trim() || Array.from(name)[0] || '';
}

function renderIconColorSwatches() {
  const group = document.getElementById('iconColorGroup');
  if (!group) return;
  if (group.children.length !== ICON_COLORS.length + 1) {
    group.innerHTML = ICON_COLORS.map((c) =>
      '<button type="button" class="accent-swatch" role="radio" data-icon-color="' + c + '" style="--swatch:' + c + '"></button>'
    ).join('') + '<label class="accent-swatch accent-swatch--custom" role="radio" data-icon-color="custom">' +
      '<input type="color" id="iconColorCustom" aria-label="custom"></label>';
    group.querySelectorAll('button[data-icon-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        iconDraft.color = btn.dataset.iconColor;
        renderSiteIconPreview();
      });
    });
    document.getElementById('iconColorCustom').addEventListener('input', (e) => {
      iconDraft.color = e.target.value;
      renderSiteIconPreview();
    });
  }
  group.querySelectorAll('[data-icon-color]').forEach((el) => {
    const isCustom = el.dataset.iconColor === 'custom';
    const checked = isCustom ? !ICON_COLORS.includes(iconDraft.color) : el.dataset.iconColor === iconDraft.color;
    el.setAttribute('aria-checked', String(checked));
    if (isCustom) el.style.setProperty('--swatch', checked ? iconDraft.color : 'transparent');
  });
}

function renderSiteIconPreview() {
  const preview = document.getElementById('siteIconPreview');
  if (!preview) return;
  const url = (document.getElementById('siteUrl')?.value || '').trim();
  const isText = iconDraft.mode === 'text';
  document.querySelectorAll('#iconModeGroup .seg-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.iconMode === iconDraft.mode);
  });
  document.getElementById('iconCustomPanel')?.classList.toggle('hidden', !isText && !iconDraft.image);
  document.querySelectorAll('#iconCustomPanel .icon-custom-row').forEach((row) => row.classList.toggle('hidden', !isText));
  const textInput = document.getElementById('iconTextInput');
  if (textInput) textInput.placeholder = Array.from((document.getElementById('siteName')?.value || '').trim())[0] || 'A';
  renderIconColorSwatches();

  let icon;
  if (isText) {
    icon = iconDraftText() ? createTextIcon(iconDraftText(), iconDraft.color) : createTextIcon('', iconDraft.color);
  } else if (iconDraft.image) {
    icon = createFaviconIcon({ url, customIcon: iconDraft.image });
  } else if (!url) {
    // Nothing to fetch yet: an empty plate, no placeholder glyph.
    icon = document.createElement('div');
    icon.className = 'site-tile-icon is-empty';
  } else {
    icon = createFaviconIcon({
      name: (document.getElementById('siteName')?.value || '').trim() || url,
      url: /^https?:\/\//i.test(url) ? url : 'https://' + url
    });
  }
  preview.replaceChildren(icon);
}

document.querySelectorAll('#iconModeGroup .seg-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    iconDraft.mode = btn.dataset.iconMode;
    if (iconDraft.mode === 'auto') iconDraft.image = '';
    renderSiteIconPreview();
    if (iconDraft.mode === 'text') document.getElementById('iconTextInput')?.focus();
  });
});
document.getElementById('iconTextInput')?.addEventListener('input', (e) => {
  iconDraft.text = e.target.value;
  renderSiteIconPreview();
});

// Writes the dialog's icon choice onto a site object.
function applyIconDraft(site) {
  delete site.customIcon;
  delete site.iconText;
  delete site.iconColor;
  if (iconDraft.mode === 'text' && iconDraftText()) {
    site.iconText = iconDraftText();
    site.iconColor = iconDraft.color;
  } else if (iconDraft.image) {
    site.customIcon = iconDraft.image;
  }
}

// ---- Add-site catalog: common sites grouped by category ----
function presetSite(id, zh, en, domain, url) {
  return { id, name: { zh, en }, domain, url: url || ('https://' + domain + '/') };
}

const SITE_PRESET_CATEGORIES = [
  {
    id: 'popular', labelKey: 'presetPopular', sites: [
      presetSite('google', '\u8c37\u6b4c', 'Google', 'google.com'),
      presetSite('youtube', 'YouTube', 'YouTube', 'youtube.com'),
      presetSite('github', 'GitHub', 'GitHub', 'github.com'),
      presetSite('bilibili', '\u54d4\u54e9\u54d4\u54e9', 'Bilibili', 'bilibili.com'),
      presetSite('zhihu', '\u77e5\u4e4e', 'Zhihu', 'zhihu.com'),
      presetSite('weibo', '\u5fae\u535a', 'Weibo', 'weibo.com'),
      presetSite('xiaohongshu', '\u5c0f\u7ea2\u4e66', 'Xiaohongshu', 'xiaohongshu.com'),
      presetSite('baidu', '\u767e\u5ea6', 'Baidu', 'baidu.com'),
      presetSite('chatgpt', 'ChatGPT', 'ChatGPT', 'chatgpt.com'),
      presetSite('notion', 'Notion', 'Notion', 'notion.so'),
      presetSite('google-maps', '\u8c37\u6b4c\u5730\u56fe', 'Google Maps', 'maps.google.com'),
      presetSite('tiktok', '\u6296\u97f3\u56fd\u9645\u7248', 'TikTok', 'tiktok.com'),
      presetSite('reddit-popular', 'Reddit', 'Reddit', 'reddit.com'),
      presetSite('wikipedia-popular', '\u7ef4\u57fa\u767e\u79d1', 'Wikipedia', 'wikipedia.org'),
      presetSite('perplexity', 'Perplexity', 'Perplexity', 'perplexity.ai')
    ]
  },
  {
    id: 'ai', labelKey: 'presetAI', sites: [
      presetSite('chatgpt-ai', 'ChatGPT', 'ChatGPT', 'chatgpt.com'),
      presetSite('claude', 'Claude', 'Claude', 'claude.ai'),
      presetSite('gemini', 'Gemini', 'Gemini', 'gemini.google.com'),
      presetSite('perplexity-ai', 'Perplexity', 'Perplexity', 'perplexity.ai'),
      presetSite('deepseek', 'DeepSeek', 'DeepSeek', 'deepseek.com'),
      presetSite('qwen', '\u901a\u4e49\u5343\u95ee', 'Qwen', 'chat.qwen.ai'),
      presetSite('doubao', '\u8c46\u5305', 'Doubao', 'doubao.com'),
      presetSite('minimax', 'MiniMax', 'MiniMax', 'minimax.io'),
      presetSite('midjourney', 'Midjourney', 'Midjourney', 'midjourney.com'),
      presetSite('huggingface', 'Hugging Face', 'Hugging Face', 'huggingface.co')
    ]
  },
  {
    id: 'social', labelKey: 'presetSocial', sites: [
      presetSite('weibo-s', '\u5fae\u535a', 'Weibo', 'weibo.com'),
      presetSite('xiaohongshu-s', '\u5c0f\u7ea2\u4e66', 'Xiaohongshu', 'xiaohongshu.com'),
      presetSite('zhihu-s', '\u77e5\u4e4e', 'Zhihu', 'zhihu.com'),
      presetSite('douban-s', '\u8c46\u74e3', 'Douban', 'douban.com'),
      presetSite('x', 'X', 'X', 'x.com'),
      presetSite('reddit', 'Reddit', 'Reddit', 'reddit.com'),
      presetSite('instagram', 'Instagram', 'Instagram', 'instagram.com'),
      presetSite('facebook', 'Facebook', 'Facebook', 'facebook.com'),
      presetSite('telegram', 'Telegram', 'Telegram', 'telegram.org'),
      presetSite('discord', 'Discord', 'Discord', 'discord.com'),
      presetSite('linkedin', 'LinkedIn', 'LinkedIn', 'linkedin.com'),
      presetSite('threads', 'Threads', 'Threads', 'threads.net'),
      presetSite('pinterest', 'Pinterest', 'Pinterest', 'pinterest.com'),
      presetSite('line', 'LINE', 'LINE', 'line.me'),
      presetSite('whatsapp', 'WhatsApp', 'WhatsApp', 'whatsapp.com')
    ]
  },
  {
    id: 'video', labelKey: 'presetVideo', sites: [
      presetSite('youtube-v', 'YouTube', 'YouTube', 'youtube.com'),
      presetSite('bilibili-v', '\u54d4\u54e9\u54d4\u54e9', 'Bilibili', 'bilibili.com'),
      presetSite('douyin', '\u6296\u97f3', 'Douyin', 'douyin.com'),
      presetSite('netflix', 'Netflix', 'Netflix', 'netflix.com'),
      presetSite('spotify', 'Spotify', 'Spotify', 'spotify.com'),
      presetSite('netease-music', '\u7f51\u6613\u4e91\u97f3\u4e50', 'NetEase Music', 'music.163.com'),
      presetSite('twitch', 'Twitch', 'Twitch', 'twitch.tv'),
      presetSite('iqiyi', '\u7231\u5947\u827a', 'iQIYI', 'iqiyi.com'),
      presetSite('youku', '\u4f18\u9177', 'Youku', 'youku.com'),
      presetSite('vimeo', 'Vimeo', 'Vimeo', 'vimeo.com'),
      presetSite('prime-video', 'Prime Video', 'Prime Video', 'primevideo.com'),
      presetSite('disney-plus', 'Disney+', 'Disney+', 'disneyplus.com'),
      presetSite('soundcloud', 'SoundCloud', 'SoundCloud', 'soundcloud.com'),
      presetSite('apple-music', 'Apple Music', 'Apple Music', 'music.apple.com')
    ]
  },
  {
    id: 'shopping', labelKey: 'presetShopping', sites: [
      presetSite('taobao', '\u6dd8\u5b9d', 'Taobao', 'taobao.com'),
      presetSite('jd', '\u4eac\u4e1c', 'JD', 'jd.com'),
      presetSite('pinduoduo', '\u62fc\u591a\u591a', 'Pinduoduo', 'pinduoduo.com'),
      presetSite('tmall', '\u5929\u732b', 'Tmall', 'tmall.com'),
      presetSite('1688', '1688', '1688', '1688.com'),
      presetSite('amazon', '\u4e9a\u9a6c\u900a', 'Amazon', 'amazon.com'),
      presetSite('ebay', 'eBay', 'eBay', 'ebay.com'),
      presetSite('aliexpress', '\u901f\u5356\u901a', 'AliExpress', 'aliexpress.com'),
      presetSite('etsy', 'Etsy', 'Etsy', 'etsy.com'),
      presetSite('walmart', '\u6c83\u5c14\u739b', 'Walmart', 'walmart.com'),
      presetSite('best-buy', 'Best Buy', 'Best Buy', 'bestbuy.com'),
      presetSite('ikea', '\u5b9c\u5bb6', 'IKEA', 'ikea.com')
    ]
  },
  {
    id: 'tools', labelKey: 'presetTools', sites: [
      presetSite('github-t', 'GitHub', 'GitHub', 'github.com'),
      presetSite('chatgpt-t', 'ChatGPT', 'ChatGPT', 'chatgpt.com'),
      presetSite('notion-t', 'Notion', 'Notion', 'notion.so'),
      presetSite('figma', 'Figma', 'Figma', 'figma.com'),
      presetSite('canva', 'Canva', 'Canva', 'canva.com'),
      presetSite('gmail', 'Gmail', 'Gmail', 'mail.google.com', 'https://mail.google.com/'),
      presetSite('drive', 'Google Drive', 'Google Drive', 'drive.google.com', 'https://drive.google.com/'),
      presetSite('stackoverflow', 'Stack Overflow', 'Stack Overflow', 'stackoverflow.com'),
      presetSite('mdn', 'MDN', 'MDN', 'developer.mozilla.org'),
      presetSite('vercel', 'Vercel', 'Vercel', 'vercel.com'),
      presetSite('supabase', 'Supabase', 'Supabase', 'supabase.com'),
      presetSite('slack', 'Slack', 'Slack', 'slack.com'),
      presetSite('trello', 'Trello', 'Trello', 'trello.com'),
      presetSite('dropbox', 'Dropbox', 'Dropbox', 'dropbox.com'),
      presetSite('google-calendar', '\u8c37\u6b4c\u65e5\u5386', 'Google Calendar', 'calendar.google.com'),
      presetSite('deepl', 'DeepL', 'DeepL', 'deepl.com')
    ]
  },
  {
    id: 'news', labelKey: 'presetNews', sites: [
      presetSite('bbc', 'BBC', 'BBC', 'bbc.com'),
      presetSite('nytimes', '\u7ebd\u7ea6\u65f6\u62a5', 'The New York Times', 'nytimes.com'),
      presetSite('reuters', '\u8def\u900f\u793e', 'Reuters', 'reuters.com'),
      presetSite('guardian', '\u536b\u62a5', 'The Guardian', 'theguardian.com'),
      presetSite('cnn', 'CNN', 'CNN', 'cnn.com'),
      presetSite('ap-news', '\u7f8e\u8054\u793e', 'Associated Press', 'apnews.com'),
      presetSite('thepaper', '\u6f8e\u6e43\u65b0\u95fb', 'The Paper', 'thepaper.cn'),
      presetSite('zaobao', '\u8054\u5408\u65e9\u62a5', 'Lianhe Zaobao', 'zaobao.com.sg'),
      presetSite('techcrunch', 'TechCrunch', 'TechCrunch', 'techcrunch.com'),
      presetSite('hacker-news', 'Hacker News', 'Hacker News', 'news.ycombinator.com', 'https://news.ycombinator.com/')
    ]
  },
  {
    id: 'learning', labelKey: 'presetLearning', sites: [
      presetSite('coursera', 'Coursera', 'Coursera', 'coursera.org'),
      presetSite('khan-academy', '\u53ef\u6c57\u5b66\u9662', 'Khan Academy', 'khanacademy.org'),
      presetSite('duolingo', '\u591a\u90bb\u56fd', 'Duolingo', 'duolingo.com'),
      presetSite('edx', 'edX', 'edX', 'edx.org'),
      presetSite('mit-ocw', 'MIT OpenCourseWare', 'MIT OpenCourseWare', 'ocw.mit.edu'),
      presetSite('arxiv', 'arXiv', 'arXiv', 'arxiv.org'),
      presetSite('google-scholar', '\u8c37\u6b4c\u5b66\u672f', 'Google Scholar', 'scholar.google.com'),
      presetSite('quizlet', 'Quizlet', 'Quizlet', 'quizlet.com'),
      presetSite('brilliant', 'Brilliant', 'Brilliant', 'brilliant.org'),
      presetSite('codecademy', 'Codecademy', 'Codecademy', 'codecademy.com')
    ]
  },
  {
    id: 'travel', labelKey: 'presetTravel', sites: [
      presetSite('maps-travel', '\u8c37\u6b4c\u5730\u56fe', 'Google Maps', 'maps.google.com'),
      presetSite('booking', 'Booking.com', 'Booking.com', 'booking.com'),
      presetSite('airbnb', 'Airbnb', 'Airbnb', 'airbnb.com'),
      presetSite('trip-com', '\u643a\u7a0b', 'Trip.com', 'trip.com'),
      presetSite('expedia', 'Expedia', 'Expedia', 'expedia.com'),
      presetSite('agoda', 'Agoda', 'Agoda', 'agoda.com'),
      presetSite('tripadvisor', 'Tripadvisor', 'Tripadvisor', 'tripadvisor.com'),
      presetSite('skyscanner', '\u5929\u5de1', 'Skyscanner', 'skyscanner.net'),
      presetSite('rail-12306', '12306', '12306', '12306.cn'),
      presetSite('google-flights', '\u8c37\u6b4c\u822a\u73ed', 'Google Flights', 'google.com', 'https://www.google.com/travel/flights')
    ]
  },
  {
    id: 'life', labelKey: 'presetLife', sites: [
      presetSite('meituan', '\u7f8e\u56e2', 'Meituan', 'meituan.com'),
      presetSite('dianping', '\u5927\u4f17\u70b9\u8bc4', 'Dianping', 'dianping.com'),
      presetSite('eleme', '\u997f\u4e86\u4e48', 'Eleme', 'ele.me'),
      presetSite('xiachufang', '\u4e0b\u53a8\u623f', 'Xiachufang', 'xiachufang.com'),
      presetSite('douban-life', '\u8c46\u74e3', 'Douban', 'douban.com'),
      presetSite('xiaohongshu-life', '\u5c0f\u7ea2\u4e66', 'Xiaohongshu', 'xiaohongshu.com'),
      presetSite('imdb', 'IMDb', 'IMDb', 'imdb.com'),
      presetSite('yelp', 'Yelp', 'Yelp', 'yelp.com'),
      presetSite('alltrails', 'AllTrails', 'AllTrails', 'alltrails.com'),
      presetSite('weather', '\u5929\u6c14', 'Weather', 'weather.com')
    ]
  }
];

let addSiteCategory = 'popular';

function getPresetSiteName(site) {
  const locale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  return site.name[locale] || site.name.en || site.name.zh || site.domain;
}

function getPresetSiteUrlKey(url) {
  try {
    return new URL(String(url || '')).hostname.replace(/^www\./, '').toLowerCase();
  } catch (_err) {
    return String(url || '').trim().toLowerCase();
  }
}

function escapeCatalogHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function applyAddSitePanelVisibility() {
  const panel = document.getElementById('siteCatalogPanel');
  if (!panel) return;
  const isCustom = addSiteCategory === 'custom';
  panel.classList.toggle('hidden', false);
  panel.classList.toggle('is-catalog', !isCustom);
  siteForm.classList.toggle('hidden', !isCustom);
  document.querySelectorAll('#siteForm > .modal-section').forEach((section) => {
    section.classList.toggle('hidden', !isCustom);
  });
  document.getElementById('addModalActions')?.classList.toggle('hidden', !isCustom);
}

function renderAddSiteCatalog() {
  const panel = document.getElementById('siteCatalogPanel');
  if (!panel) return;
  const categories = SITE_PRESET_CATEGORIES.concat([{ id: 'custom', labelKey: 'presetCustom', sites: [] }]);
  const active = categories.find((cat) => cat.id === addSiteCategory) || categories[0];
  const added = new Set((state.sites || [])
    .filter((item) => item && item.type !== 'folder')
    .map((item) => getPresetSiteUrlKey(item.url)));
  panel.innerHTML = `
    <div class="site-catalog-tabs" role="tablist">
      ${categories.map((cat) => `
        <button type="button" class="site-catalog-tab ${cat.id === active.id ? 'active' : ''}"
          role="tab" aria-selected="${cat.id === active.id}" onclick="setAddSiteCategory('${cat.id}')">
          ${escapeCatalogHtml(i18n.t(cat.labelKey))}
        </button>`).join('')}
    </div>
    ${active.id === 'custom' ? '' : `
      <div class="site-catalog-list" role="tabpanel">
        ${active.sites.map((site) => {
          const isAdded = added.has(getPresetSiteUrlKey(site.url));
          const bust = faviconRefreshEpoch || undefined;
          const iconAttrs = faviconChainAttributes(
            getDisplayFaviconSources(site.url, bust),
            getEngineFallbackIcon({ url: site.url }, bust)
          );
          return `
            <div class="site-catalog-row ${isAdded ? 'is-added' : ''}">
              <span class="site-catalog-icon"><img ${iconAttrs} alt="" loading="lazy" decoding="async"></span>
              <span class="site-catalog-meta">
                <span class="site-catalog-name">${escapeCatalogHtml(getPresetSiteName(site))}</span>
                <span class="site-catalog-url">${escapeCatalogHtml(site.url)}</span>
              </span>
              <button type="button" class="site-catalog-add" data-site-id="${site.id}" ${isAdded ? 'disabled' : ''}
                aria-label="${escapeCatalogHtml(getPresetSiteName(site))}"
                onclick="addPresetSiteById('${active.id}','${site.id}')">${isAdded ? '✓' : '+'}</button>
            </div>`;
        }).join('')}
      </div>`}
  `;
  applyAddSitePanelVisibility();
}

function setAddSiteCategory(category) {
  addSiteCategory = category === 'custom' ? 'custom' : String(category || 'popular');
  renderAddSiteCatalog();
}

window.setAddSiteCategory = setAddSiteCategory;

window.addPresetSiteById = async function (categoryId, siteId) {
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }
  const category = SITE_PRESET_CATEGORIES.find((cat) => cat.id === categoryId);
  const site = category && category.sites.find((item) => item.id === siteId);
  if (!site) return;
  const key = getPresetSiteUrlKey(site.url);
  const exists = (state.sites || []).some((item) => item && item.type !== 'folder' && getPresetSiteUrlKey(item.url) === key);
  if (exists) {
    window.showNotification?.(i18n.t('presetDuplicate'), 'info');
    return;
  }
  const newSite = {
    id: generateUuid(),
    name: getPresetSiteName(site),
    url: site.url,
    tags: [],
    showOnHome: true
  };
  state.sites.push(newSite);
  state.siteOrder.push(newSite.id);
  const saved = await saveData();
  if (saved === false) return;
  renderHome();
  window.showNotification?.(i18n.t('presetAdded'), 'success');
  const button = document.querySelector(`.site-catalog-add[data-site-id="${siteId}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = '✓';
    button.closest('.site-catalog-row')?.classList.add('is-added');
  }
};
function openAddSiteModal() {
  resetIconDraft(null);
  window.editingItem = undefined;
  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
  addSiteCategory = 'popular';
  renderAddSiteCatalog();
  renderSiteIconPreview();
  window.closeAllWindowsExcept?.(addModal);
  addModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}

let siteIconPreviewTimer = null;
['siteUrl', 'siteName'].forEach((id) => {
  document.getElementById(id)?.addEventListener('input', () => {
    clearTimeout(siteIconPreviewTimer);
    siteIconPreviewTimer = setTimeout(renderSiteIconPreview, 350);
  });
});
document.getElementById('siteIconUpload')?.addEventListener('click', () => {
  document.getElementById('siteIconFile')?.click();
});
document.getElementById('siteIconFile')?.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  e.target.value = '';
  imageFileToIcon(file).then((icon) => {
    iconDraft.mode = 'auto';
    iconDraft.image = icon;
    renderSiteIconPreview();
  }).catch(() => window.showNotification?.(i18n.t('iconInvalid'), 'warning'));
});
// ===== Add/Edit Modal =====
// Note: Add button is now rendered as a chip in renderHome()

function closeModals() {
  modalOverlay.classList.add('hidden');
  addModal.classList.add('hidden');
  document.getElementById('deleteModal').classList.add('hidden'); // Close delete modal
  renameModal?.classList.add('hidden');
  settingsModal?.classList.add('hidden');
}

closeAddModalBtn.onclick = closeModals;
modalOverlay.onclick = (e) => {
  if (e.target === modalOverlay) closeModals();
};

// Save Logic
saveItemBtn.addEventListener('click', async () => {
  const isEditing = window.editingItem !== undefined;

  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  const name = document.getElementById('siteName').value.trim();
  let url = document.getElementById('siteUrl').value.trim();
  if (!name || !url) {
    window.showNotification?.(i18n.t('nameRequired'), 'warning');
    return;
  }

  if (!url.startsWith('http')) url = 'https://' + url;

  // Every site is pinned to the home page (the option was removed).
  const showOnHome = true;

  if (isEditing) {
    // Update existing site
    const siteIndex = state.sites.findIndex(s => s.id === window.editingItem.item.id);
    if (siteIndex !== -1) {
      state.sites[siteIndex].name = name;
      state.sites[siteIndex].url = url;
      state.sites[siteIndex].showOnHome = showOnHome;
      applyIconDraft(state.sites[siteIndex]);

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
      tags: [],
      showOnHome
    };
    applyIconDraft(newSite);

    state.sites.push(newSite);

    // Add to siteOrder
    if (showOnHome) {
      state.siteOrder.push(newSite.id);
    }
  }

  // Clear editing state
  window.editingItem = undefined;

  const saved = await saveData();
  if (saved === false) return;

  renderHome();
  closeModals();
});



// ===== Language Toggle =====
window.toggleLanguage = function () {
  i18n.toggleLocale();
  updateSettingsMenu();
};

// ===== Settings Menu =====
function updateSettingsMenu() {
  const modeText = document.getElementById('modeMenuText');
  const wallpaperText = document.getElementById('wallpaperMenuText');
  const settingsText = document.getElementById('settingsMenuText');
  if (modeText) modeText.textContent = i18n.t('mode') || '模式';
  if (wallpaperText) wallpaperText.textContent = i18n.t('wallpaper') || 'Wallpaper';
  if (settingsText) settingsText.textContent = i18n.t('settings') || 'Settings';
  settingsToggle?.setAttribute('aria-label', i18n.t('settings') || 'Settings');
  document.getElementById('toolbarAddBtn')?.setAttribute('aria-label', i18n.t('addSite') || 'Add Site');
  syncSettingsModalUI?.();
  syncModeSubmenuUI?.();
}

function closeSettingsLayers(options = {}) {
  const { keepMenuOpen = false } = options;
  modeSubmenu?.classList.add('hidden');
  if (!keepMenuOpen) {
    settingsMenu?.classList.add('hidden');
    settingsToggle?.setAttribute('aria-expanded', 'false');
  }
}

function openSettingsMenu() {
  settingsMenu?.classList.remove('hidden');
  settingsToggle?.setAttribute('aria-expanded', 'true');
}

function toggleSettingsMenu() {
  if (!settingsMenu) return;
  const willOpen = settingsMenu.classList.contains('hidden');
  closeSettingsLayers();
  if (willOpen) {
    openSettingsMenu();
  }
}

function toggleModeSubmenu() {
  if (!settingsMenu || !modeSubmenu) return;
  if (settingsMenu.classList.contains('hidden')) {
    openSettingsMenu();
  }
  const willOpen = modeSubmenu.classList.contains('hidden');
  closeSettingsLayers({ keepMenuOpen: true });
  if (willOpen) {
    modeSubmenu.classList.remove('hidden');
  }
}

function syncModeSubmenuUI() {
  if (!modeSubmenu) return;
  const current = (typeof state !== 'undefined' && state.viewMode) || 'general';
  modeSubmenu.querySelectorAll('[data-mode-option]').forEach((el) => {
    el.classList.toggle('is-selected', el.dataset.modeOption === current);
  });
}

window.closeSettingsLayers = closeSettingsLayers;

document.getElementById('toolbarAddBtn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  closeSettingsLayers();
  openAddSiteModal();
});

settingsToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSettingsMenu();
});

const modeMenuItem = document.getElementById('modeMenuItem');
const modeSubmenu = document.getElementById('modeSubmenu');
const wallpaperMenuItem = document.getElementById('wallpaperMenuItem');
const settingsMenuItem = document.getElementById('settingsMenuItem');
const settingsModal = document.getElementById('settingsModal');

settingsMenuItem?.addEventListener('click', (e) => {
  e.stopPropagation();
  openSettingsModal();
});

modeMenuItem?.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleModeSubmenu();
});

wallpaperMenuItem?.addEventListener('click', (e) => {
  e.stopPropagation();
  closeSettingsLayers();
  if (window.openWallpaperModal) window.openWallpaperModal();
});

window.toggleModeSubmenu = toggleModeSubmenu;
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;

// ===== Settings Modal =====
const SETTINGS_LANGUAGE_LABELS = {
  zh: '中文',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ja: '日本語',
  ko: '한국어'
};

function setSettingsLanguageMenuOpen(open) {
  document.getElementById('settingsLangMenu')?.classList.toggle('hidden', !open);
  document.getElementById('settingsLangButton')?.setAttribute('aria-expanded', String(!!open));
}

function closeSettingsLanguageMenu() {
  setSettingsLanguageMenuOpen(false);
}

function syncSettingsModalUI() {
  const tfs = document.querySelectorAll('#timeFormatGroup .seg-btn');
  tfs.forEach((b) => b.classList.toggle('active', b.dataset.timeFormat === state.timeFormat));
  const locale = typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh';
  const langValue = document.getElementById('settingsLangValue');
  if (langValue) langValue.textContent = SETTINGS_LANGUAGE_LABELS[locale] || SETTINGS_LANGUAGE_LABELS.zh;
  document.querySelectorAll('#settingsLangMenu .settings-language-option').forEach((option) => {
    const selected = option.dataset.lang === locale;
    option.classList.toggle('is-selected', selected);
    option.setAttribute('aria-selected', String(selected));
  });
  setSettingsLanguageMenuOpen(false);
  const obs = document.querySelectorAll('#openBehaviorGroup .seg-btn');
  obs.forEach((b) => b.classList.toggle('active', b.dataset.openBehavior === state.openBehavior));
  const appearance = window.getAppearance?.() || 'auto';
  document.querySelectorAll('#appearanceGroup .seg-btn').forEach((b) => b.classList.toggle('active', b.dataset.appearance === appearance));
  document.querySelectorAll('#zoomGroup .seg-btn').forEach((b) => b.classList.toggle('active', b.dataset.zoom === state.zoomLevel));
  renderAccentSwatches();
}

// Accent swatches: the eight system colors plus a custom color wheel.
function renderAccentSwatches() {
  const group = document.getElementById('accentGroup');
  if (!group || !window.ACCENT_PRESETS) return;
  const current = window.getAccent?.() || 'blue';
  const dark = !!window.isDarkAppearance?.();
  const names = Object.keys(window.ACCENT_PRESETS);
  if (group.children.length !== names.length + 1) {
    group.innerHTML = names.map((name) =>
      '<button type="button" class="accent-swatch" role="radio" data-accent="' + name + '"></button>'
    ).join('') +
      '<label class="accent-swatch accent-swatch--custom" role="radio" data-accent="custom">' +
      '<input type="color" id="accentCustomInput" aria-label="custom"></label>';
    group.querySelectorAll('button[data-accent]').forEach((btn) => {
      btn.addEventListener('click', () => window.setAccent?.(btn.dataset.accent));
    });
    const picker = document.getElementById('accentCustomInput');
    // 'input' previews live; 'change' (picker closed) saves and syncs once.
    picker.addEventListener('input', () => window.setAccent?.(picker.value, { sync: false }));
    picker.addEventListener('change', () => window.setAccent?.(picker.value));
  }
  const nameKey = (name) => 'accent' + name.charAt(0).toUpperCase() + name.slice(1);
  group.querySelectorAll('[data-accent]').forEach((el) => {
    const name = el.dataset.accent;
    const isCustom = name === 'custom';
    const checked = isCustom ? !window.ACCENT_PRESETS[current] : name === current;
    el.setAttribute('aria-checked', String(checked));
    const label = i18n.t(isCustom ? 'accentCustom' : nameKey(name));
    el.setAttribute('aria-label', label);
    el.title = label;
    if (!isCustom) el.style.setProperty('--swatch', window.ACCENT_PRESETS[name][dark ? 1 : 0]);
    else el.style.setProperty('--swatch', checked ? current : 'transparent');
  });
  const picker = document.getElementById('accentCustomInput');
  if (picker && !window.ACCENT_PRESETS[current]) picker.value = current;
}
window.syncSettingsModalUI = syncSettingsModalUI;

function openSettingsModal() {
  window.closeAllWindowsExcept?.(settingsModal);
  closeSettingsLayers();
  syncSettingsModalUI();
  if (settingsModal) settingsModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}

function closeSettingsModal() {
  if (settingsModal) settingsModal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

function setTimeFormatFromSettings(fmt) {
  state.timeFormat = fmt === '12h' ? '12h' : '24h';
  localStorage.setItem('timeFormat', state.timeFormat);
  syncSettingsModalUI();
  updateTime();
  saveData();
}

function setOpenBehaviorFromSettings(mode) {
  state.openBehavior = mode === 'current' ? 'current' : 'newtab';
  localStorage.setItem('openBehavior', state.openBehavior);
  syncSettingsModalUI();
  saveData();
}

function setSettingsLocale(lang) {
  if (typeof i18n !== 'undefined' && i18n.setLocale) i18n.setLocale(lang);
}

window.setTimeFormatFromSettings = setTimeFormatFromSettings;
window.setOpenBehaviorFromSettings = setOpenBehaviorFromSettings;
window.setSettingsLocale = setSettingsLocale;

document.querySelectorAll('#timeFormatGroup .seg-btn').forEach((btn) => {
  btn.addEventListener('click', () => setTimeFormatFromSettings(btn.dataset.timeFormat));
});
document.getElementById('settingsLangButton')?.addEventListener('click', (event) => {
  event.stopPropagation();
  const menu = document.getElementById('settingsLangMenu');
  setSettingsLanguageMenuOpen(!!menu?.classList.contains('hidden'));
});
document.querySelectorAll('#settingsLangMenu .settings-language-option').forEach((option) => {
  option.addEventListener('click', () => {
    setSettingsLocale(option.dataset.lang);
    closeSettingsLanguageMenu();
    syncSettingsModalUI();
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest?.('.settings-language-picker')) closeSettingsLanguageMenu();
});
document.querySelectorAll('#openBehaviorGroup .seg-btn').forEach((btn) => {
  btn.addEventListener('click', () => setOpenBehaviorFromSettings(btn.dataset.openBehavior));
});
document.querySelectorAll('#appearanceGroup .seg-btn').forEach((btn) => {
  btn.addEventListener('click', () => window.setAppearance?.(btn.dataset.appearance));
});
document.querySelectorAll('#zoomGroup .seg-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    setZoomLevel(btn.dataset.zoom);
    syncSettingsModalUI();
  });
});
document.getElementById('settingsAboutBtn')?.addEventListener('click', () => {
  closeSettingsModal();
  openAboutModal();
});
document.getElementById('closeSettingsModal')?.addEventListener('click', closeSettingsModal);

// Modal manager: only one dialog window may be open at a time. The page
// underneath stays covered by the active .modal-overlay, so background clicks
// cannot reach it until the dialog is closed.
function closeAllWindowsExcept(except) {
  const keep = typeof except === 'string' ? document.getElementById(except) : except;
  const keepOverlay = keep?.closest?.('.modal-overlay') || null;
  const sharedOverlay = document.getElementById('modalOverlay');

  // Close whole overlays first. #modalOverlay is special: its sheets are
  // siblings inside one scrim, so only its own visible sheet may survive.
  document.querySelectorAll('.modal-overlay:not(.hidden)').forEach((overlay) => {
    if (overlay !== keepOverlay) overlay.classList.add('hidden');
  });

  if (sharedOverlay) {
    Array.from(sharedOverlay.children).forEach((child) => {
      if (!child.classList.contains('modal')) return;
      if (child === keep || child.contains(keep)) return;
      child.classList.add('hidden');
    });
    // An empty scrim must never remain: it would keep the home page inert
    // after the external window (wallpaper, engine, sign-in) is dismissed.
    if (keepOverlay !== sharedOverlay) sharedOverlay.classList.add('hidden');
  }
  const confirmDialog = document.getElementById('systemConfirmDialog');
  if (confirmDialog && confirmDialog !== keep && confirmDialog !== keepOverlay) confirmDialog.remove();
  window.closeFolder?.();
  document.getElementById('engineMenu')?.classList.add('hidden');
  window.hideAllContextMenus?.();
  window.hideContextMenu?.();
  window.hideWidgetMenu?.();
  closeSettingsLayers();
}
window.closeAllWindowsExcept = closeAllWindowsExcept;

function isElementVisible(element) {
  return !!element && !element.classList.contains('hidden');
}

function hasOpenTransientUi() {
  return [
    settingsMenu,
    languageSubmenu,
    document.getElementById('wallpaperModal'),
    document.getElementById('aboutModal'),
    document.getElementById('coffeeModal'),
    document.getElementById('feedbackModal'),
    modalOverlay,
    engineModal,
    pageContextMenu,
    itemContextMenu,
    settingsModal,
    document.getElementById('pluginModal'),
    document.getElementById('folderOverlay'),
    document.getElementById('widgetMenu')
  ].some(isElementVisible);
}

function closeTransientUi() {
  closeSettingsLayers();
  window.closeWallpaperModal?.();
  closeModals?.();
  closeEngineModal?.();
  window.closeAboutModal?.();
  window.closeCoffeeModal?.();
  window.closeFeedbackModal?.();
  window.closePluginModal?.();
  pageContextMenu?.classList.add('hidden');
  itemContextMenu?.classList.add('hidden');
}

// Escape closes the topmost layer: menus and dialogs first, then the folder window.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || e.isComposing) return;
  const modalOpen = [modalOverlay, engineModal, document.getElementById('wallpaperModal'),
    document.getElementById('aboutModal'), document.getElementById('coffeeModal'),
    document.getElementById('feedbackModal')].some(isElementVisible);
  const menuOpen = [settingsMenu, pageContextMenu, contextMenu, document.getElementById('widgetMenu')].some(isElementVisible);
  if (modalOpen || menuOpen) {
    closeTransientUi();
    hideContextMenu();
    window.hideWidgetMenu?.();
  } else if (state.openFolderId) {
    closeFolder();
  } else {
    return;
  }
  e.preventDefault();
});

document.addEventListener('click', (e) => {
  if (!hasOpenTransientUi()) return;

  const insideInteractiveLayer = e.target.closest(
    '.modal, .settings-menu, .settings-btn, .page-context-menu, .item-context-menu, .context-menu, .folder-overlay, .widget-menu'
  );

  if (insideInteractiveLayer) return;

  closeTransientUi();
  e.preventDefault();
  e.stopPropagation();
}, true);

document.addEventListener('click', (e) => {
  if (!e.target.closest('.settings-menu') && !e.target.closest('.settings-btn')) {
    closeSettingsLayers();
  } else if (!e.target.closest('#languageMenuItem')) {
    closeSettingsLayers({ keepMenuOpen: true });
  }
});

// ===== About, Coffee, Feedback Modals =====
let selectedCoffeeAmount = 5;

function openAboutModal() {
  window.openManagedOverlay?.('aboutModal');
}

function closeAboutModal() {
  window.closeManagedOverlay?.('aboutModal');
}

function openCoffeeSupportLink() {
  const gumroadUrl = String(window.GUMROAD_COFFEE_LINK_TEMPLATE || '').trim();
  if (!gumroadUrl) {
    showNotification(i18n.t('gumroadLinkMissing'), 'warning');
    return;
  }

  closeAboutModal();
  showNotification(i18n.t('openingGumroadPage'), 'success');
  window.open(gumroadUrl, '_blank', 'noopener,noreferrer');
}

function openCoffeeModal() {
  window.openManagedOverlay?.('coffeeModal');
  selectedCoffeeAmount = 5;
  document.querySelectorAll('.coffee-amount-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.amount === '5');
  });
  document.getElementById('coffeeCustomAmount').value = '';
}

function closeCoffeeModal() {
  window.closeManagedOverlay?.('coffeeModal');
}

function selectCoffeeAmount(amount) {
  selectedCoffeeAmount = amount;
  document.querySelectorAll('.coffee-amount-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.amount) === amount);
  });
  document.getElementById('coffeeCustomAmount').value = '';
}

function processCoffeePaymentLegacy() {
  const customAmount = parseInt(document.getElementById('coffeeCustomAmount').value);
  const amount = customAmount > 0 ? customAmount : selectedCoffeeAmount;

  if (amount < 1 || amount > 100) {
    showNotification(i18n.t('amountRangeInvalid'), 'error');
    return;
  }

  // Check if Paddle is configured
  if (!window.PADDLE_CLIENT_TOKEN) {
    showNotification(i18n.t('paymentNotConfigured'), 'warning');
    console.error('Paddle not configured: PADDLE_CLIENT_TOKEN is empty in config.js');
    return;
  }

  // Check if Paddle SDK is loaded
  if (typeof Paddle === 'undefined') {
    showNotification(i18n.t('paymentModuleLoadFailed'), 'error');
    return;
  }

  // For donations, open external payment link or use Paddle custom amount
  // Since Paddle doesn't support arbitrary amounts without custom prices,
  // we'll redirect to a donation page or show a message
  showNotification(i18n.t('donationComingSoon'), 'info');
  closeCoffeeModal();

  // TODO: When ready, create donation prices in Paddle and use:
  // window.openPaddleCheckout?.('donation', amount);
}

function openFeedbackModal() {
  window.openManagedOverlay?.('feedbackModal');
  document.getElementById('feedbackType').value = 'bug';
  document.getElementById('feedbackContent').value = '';
  document.getElementById('feedbackEmail').value = window.authState?.user?.email || '';
}

function closeFeedbackModal() {
  window.closeManagedOverlay?.('feedbackModal');
}

async function submitFeedback() {
  const type = document.getElementById('feedbackType').value;
  const content = document.getElementById('feedbackContent').value.trim();
  const email = document.getElementById('feedbackEmail').value.trim();

  if (!content) {
    showNotification(i18n.t('feedbackContentRequired'), 'error');
    return;
  }

  const submitBtn = document.getElementById('submitFeedbackBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = i18n.t('submitting');

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
      showNotification(i18n.t('feedbackSubmitFailed'), 'error');
    } else {
      showNotification(i18n.t('feedbackSubmitSuccess'), 'success');
      closeFeedbackModal();
    }
  } catch (err) {
    console.error('Feedback exception:', err);
    showNotification(i18n.t('feedbackSubmitFailed'), 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = i18n.t('submit');
  }
}

function buildGumroadCoffeeUrl(amount) {
  const template = String(window.GUMROAD_COFFEE_LINK_TEMPLATE || '').trim();
  if (!template) {
    return '';
  }

  if (template.includes('{amount}')) {
    return template.replaceAll('{amount}', encodeURIComponent(String(amount)));
  }

  try {
    const url = new URL(template, window.location.origin);
    url.searchParams.set('amount', String(amount));
    return url.toString();
  } catch (error) {
    console.error('Invalid Gumroad coffee URL template:', error);
    return '';
  }
}

function processCoffeePayment() {
  const customAmount = parseInt(document.getElementById('coffeeCustomAmount').value, 10);
  const amount = Number.isFinite(customAmount) && customAmount > 0 ? customAmount : selectedCoffeeAmount;

  if (!Number.isFinite(amount) || amount < 1 || amount > 100) {
    showNotification(i18n.t('amountRangeInvalid'), 'error');
    return;
  }

  const gumroadUrl = buildGumroadCoffeeUrl(amount);
  if (!gumroadUrl) {
    showNotification(i18n.t('gumroadLinkMissing'), 'warning');
    return;
  }

  showNotification(i18n.t('openingGumroadCheckout'), 'success');
  window.open(gumroadUrl, '_blank', 'noopener,noreferrer');
  closeCoffeeModal();
}

function setupManagedOverlayActionBindings() {
  document.getElementById('aboutMenuItem')?.addEventListener('click', openAboutModal);
  document.getElementById('aboutCoffeeAction')?.addEventListener('click', openCoffeeSupportLink);
  document.getElementById('aboutFeedbackAction')?.addEventListener('click', openFeedbackModal);
  document.getElementById('aboutCloseBtn')?.addEventListener('click', closeAboutModal);
  document.getElementById('coffeeCancelBtn')?.addEventListener('click', closeCoffeeModal);
  document.getElementById('coffeePayBtn')?.addEventListener('click', processCoffeePayment);
  document.getElementById('feedbackCancelBtn')?.addEventListener('click', closeFeedbackModal);
  document.getElementById('submitFeedbackBtn')?.addEventListener('click', submitFeedback);

  document.querySelectorAll('.coffee-amount-btn').forEach((button) => {
    button.onclick = () => selectCoffeeAmount(parseInt(button.dataset.amount, 10));
  });
}

// Export modal functions
window.openAboutModal = openAboutModal;
window.closeAboutModal = closeAboutModal;
window.openCoffeeSupportLink = openCoffeeSupportLink;
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

  // Hide any existing context menus first (including an icon's or widget's menu)
  hideAllContextMenus();
  hideContextMenu();
  window.hideWidgetMenu?.();

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
    '.context-menu', '.page-context-menu', '.item-context-menu', '.folder-overlay',
    '.add-card'
  ];

  const shouldSkip = skipSelectors.some(sel => e.target.closest(sel));
  if (shouldSkip) {
    return;
  }

  // Show page context menu (with wallpaper option)
  pageContextMenu.classList.remove('hidden');
  placeMenuAt(pageContextMenu, e.clientX, e.clientY);
}

function showItemContextMenu(e, type) {
  if (!itemContextMenu) return;

  // Update menu content based on type
  const editLabel = document.getElementById('ctxEditItem');
  const deleteLabel = document.getElementById('ctxDeleteItem');

  if (editLabel) {
    editLabel.textContent = type === 'site' ? i18n.t('editSite') : i18n.t('editTag');
  }
  if (deleteLabel) {
    deleteLabel.textContent = i18n.t('delete');
  }

  itemContextMenu.dataset.type = type;
  itemContextMenu.classList.remove('hidden');
  placeMenuAt(itemContextMenu, e.clientX, e.clientY);
}

function hideAllContextMenus() {
  pageContextMenu?.classList.add('hidden');
  itemContextMenu?.classList.add('hidden');
  engineContextMenu?.classList.add('hidden');
  currentContextItem = null;
}

function hidePageContextMenu() {
  hideAllContextMenus();
}

function openAddSiteFromContext() {
  hidePageContextMenu();
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }
  openAddSiteModal();
}

function openWallpaperFromContext() {
  hidePageContextMenu();
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }
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
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

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
async function deleteItemFromContext() {
  hideAllContextMenus();
  if (!currentContextItem) return;
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  const type = document.getElementById('itemContextMenu')?.dataset.type;
  const shouldDelete = window.showConfirmDialog
    ? await window.showConfirmDialog({
      title: i18n.t('deleteConfirm'),
      message: i18n.t('deleteItemConfirm'),
      confirmText: i18n.t('delete'),
      cancelText: i18n.t('cancel'),
      tone: 'danger'
    })
    : confirm(i18n.t('deleteItemConfirm'));

  if (!shouldDelete) return;

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
window.hideAllContextMenus = hideAllContextMenus;
window.hideContextMenu = hideContextMenu;
window.openAddSiteFromContext = openAddSiteFromContext;
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


// ===== Initialize =====
setupManagedOverlayActionBindings();
window.hydrateCachedConfigFromLastUser?.();
// Try to remove Chrome's built-in 'Customize this page' button (best effort)
try {
  const cb = document.getElementById('customize-button') || document.querySelector('customize-button');
  if (cb) cb.remove();
} catch (_err) { /* ignore */ }
applyZoomLevel(state.zoomLevel, false);
// Edge refraction on the toolbar, search and page dots (Chromium only; skipped
// when the user asked the system for less transparency).
if (!window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches) window.LiquidGlass?.enable();
searchInput.focus();
updateAllText();
renderHome();
renderEngineQuickList();


// ===== Cross-tab live sync =====
// When another tab (same origin: web site or chrome-extension://<id>) writes
// shared localStorage keys, refresh this tab's UI. The browser fires the
// storage event only in *other* tabs, so this never echoes back to the
// tab that made the change ? no background messaging needed.
(function setupCrossTabSync() {
  var CROSS_TAB_KEYS = [
    'sites', 'tags', 'tagOrder', 'siteOrder',
    'engineId', 'engineIndex', 'enabledEngineIds',
    'appearance', 'locale',
    'selectedWallpaper', 'timeFormat', 'dateFormatIndex', 'viewMode'
  ];
  var timer = null;

  function reloadFromLocalStorage() {
    if (typeof state !== 'undefined') {
      function parse(key, fallback) {
        try {
          var raw = localStorage.getItem(key);
          return raw ? JSON.parse(raw) : fallback;
        } catch (_err) {
          return fallback;
        }
      }
      state.sites = parse('sites', state.sites || []);
      state.tags = parse('tags', state.tags || []);
      state.tagOrder = parse('tagOrder', state.tagOrder || []);
      state.siteOrder = parse('siteOrder', state.siteOrder || []);
      state.engineId = localStorage.getItem('engineId') || state.engineId;
      state.engineIndex = parseInt(localStorage.getItem('engineIndex') || '0', 10) || 0;
      state.enabledEngineIds = parse('enabledEngineIds', state.enabledEngineIds || []);
      state.viewMode = localStorage.getItem('viewMode') || state.viewMode || 'general';
      state.timeFormat = localStorage.getItem('timeFormat') || state.timeFormat || '24h';
      state.dateFormatIndex = parseInt(localStorage.getItem('dateFormatIndex') || '0', 10) || 0;
    }
    if (typeof window.renderHome === 'function') window.renderHome();
    if (typeof window.renderSearchEngine === 'function') window.renderSearchEngine();
    if (typeof window.renderEngineQuickList === 'function') window.renderEngineQuickList();
    if (typeof window.updateAllText === 'function') window.updateAllText();
    if (typeof window.updateTime === 'function') window.updateTime();
    if (typeof window.setAppearance === 'function') {
      window.setAppearance(localStorage.getItem('appearance'), { sync: false });
    }
    if (typeof window.applyWallpaper === 'function') {
      try { window.applyWallpaper(localStorage.getItem('selectedWallpaper')); } catch (_err) {}
    }
  }

  window.addEventListener('storage', function (e) {
    if (!e.key || CROSS_TAB_KEYS.indexOf(e.key) === -1) return;
    clearTimeout(timer);
    timer = setTimeout(reloadFromLocalStorage, 150);
  });
})();
