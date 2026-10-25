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
  },
  fr: {
    search: 'Que voulez-vous rechercher ?',
    addNew: 'Ajouter',
    addNewTitle: 'Ajouter un élément',
    site: 'Site',
    tag: 'Étiquette',
    name: 'Nom',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: "Nom de l'étiquette",
    selectTags: 'Sélectionner les étiquettes',
    pinToHome: "Épingler à l'accueil",
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
    addNewTitle: 'Añadir elemento',
    site: 'Sitio',
    tag: 'Etiqueta',
    name: 'Nombre',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'Nombre de etiqueta',
    selectTags: 'Seleccionar etiquetas',
    pinToHome: 'Fijar en inicio',
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
    addNewTitle: '項目を追加',
    site: 'サイト',
    tag: 'タグ',
    name: '名前',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: 'タグ名',
    selectTags: 'タグを選択',
    pinToHome: 'ホームに固定',
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
    addNewTitle: '항목 추가',
    site: '사이트',
    tag: '태그',
    name: '이름',
    url: 'URL',
    urlPlaceholder: 'URL (https://...)',
    tagName: '태그 이름',
    selectTags: '태그 선택',
    pinToHome: '홈에 고정',
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

  const ctxAddSiteEl = document.getElementById('ctxAddSite');
  const ctxAddFolderEl = document.getElementById('ctxAddFolder');
  const ctxWallpaperEl = document.getElementById('ctxWallpaper');
  if (ctxAddSiteEl) ctxAddSiteEl.textContent = i18n.t('addSite') || 'Add Site';
  if (ctxAddFolderEl) ctxAddFolderEl.textContent = i18n.t('addFolder') || '添加文件夹';
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
  if (closeSettingsModalEl) closeSettingsModalEl.textContent = i18n.t('close') || 'Close';
  const toWorkspaceTextEl = document.getElementById('toWorkspaceText');
  if (toWorkspaceTextEl) toWorkspaceTextEl.textContent = i18n.t('workbench') || 'Workbench';
  document.getElementById('dotHome')?.setAttribute('aria-label', i18n.t('wbBackHome') || 'Home');
  document.getElementById('dotWorkspace')?.setAttribute('aria-label', i18n.t('workbench') || 'Workbench');
  const appearanceLabels = {
    appearanceLabel: i18n.t('appearance') || 'Appearance',
    apLight: i18n.t('lightMode') || 'Light',
    apDark: i18n.t('darkMode') || 'Dark',
    apAuto: i18n.t('followSystem') || 'Auto',
    zoomLabel: i18n.t('zoom') || 'Zoom'
  };
  Object.entries(appearanceLabels).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });

  updateSettingsMenu();
  syncSettingsModalUI?.();
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
  draggedId: null,
  draggedType: null,   // 'site' | 'folder' | 'tag'
  draggedSource: null, // 'home' | 'folder'
  draggedElement: null,
  dropTarget: null
};

// ===== Drag and Drop Event Handlers =====
function handleDragStart(event, id, type, source, index) {
  dragState.draggedId = id;
  dragState.draggedType = type;
  dragState.draggedSource = source || 'home';
  dragState.draggedElement = event.target.closest('.site-tile, .chip');

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(id));
  if (dragState.draggedElement) dragState.draggedElement.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const target = event.target.closest('.site-tile, .chip');
  if (!target || target === dragState.draggedElement) return false;
  dragState.dropTarget = target;

  // Tag chips: reorder tagOrder
  if (dragState.draggedType === 'tag' && target.classList.contains('chip')) {
    const chips = Array.from(contentEl.querySelectorAll('.chip.tag'));
    const fromIndex = chips.indexOf(dragState.draggedElement);
    const toIndex = chips.indexOf(target);
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const item = state.tagOrder[fromIndex];
      state.tagOrder.splice(fromIndex, 1);
      state.tagOrder.splice(toIndex, 0, item);
      renderHome();
    }
    return false;
  }

  if (dragState.draggedType !== 'site' && dragState.draggedType !== 'folder') return false;

  const targetTile = target.closest('.site-tile');
  if (!targetTile || targetTile.classList.contains('add-tile')) return false;
  const grid = targetTile.parentElement;
  if (!grid || !grid.classList.contains('sites-grid')) return false;

  const isFolderView = !!state.openFolderId;
  if (dragState.draggedSource === 'home' && !isFolderView) {
    // Reorder top-level siteOrder
    const fromIndex = state.siteOrder.indexOf(dragState.draggedId);
    const toIndex = state.siteOrder.indexOf(targetTile.dataset.id);
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const item = state.siteOrder[fromIndex];
      state.siteOrder.splice(fromIndex, 1);
      state.siteOrder.splice(toIndex, 0, item);
      renderHome();
    }
  } else if (dragState.draggedSource === 'folder' && isFolderView) {
    // Reorder folder children
    const folder = (state.sites || []).find((s) => s && s.id === state.openFolderId);
    if (folder && Array.isArray(folder.children)) {
      const fromIndex = folder.children.indexOf(dragState.draggedId);
      const toIndex = folder.children.indexOf(targetTile.dataset.id);
      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        const item = folder.children[fromIndex];
        folder.children.splice(fromIndex, 1);
        folder.children.splice(toIndex, 0, item);
        renderHome();
      }
    }
  }
  return false;
}

function handleDrop(event, targetId, targetType) {
  event.preventDefault();
  event.stopPropagation();

  const draggedId = dragState.draggedId;
  const draggedType = dragState.draggedType;

  if (draggedType === 'tag') {
    saveData();
    return false;
  }

  if (!draggedId || draggedId === targetId) return false;

  const isFolderView = !!state.openFolderId;

  // Same-view reorder was already applied in handleDragOver; just persist.
  if (
    (dragState.draggedSource === 'home' && !isFolderView && (targetType === 'site' || targetType === 'folder'))
    || (dragState.draggedSource === 'folder' && isFolderView && targetType === 'site')
  ) {
    saveData();
    return false;
  }

  // Home view: drop onto a folder tile -> merge into that folder
  if (!isFolderView && targetType === 'folder') {
    addSitesToFolder(targetId, [draggedId]);
    saveData();
    renderHome();
    return false;
  }

  // Home view: drop a site onto a link tile -> merge both into a new folder
  if (!isFolderView && targetType === 'site' && draggedType === 'site') {
    mergeSitesIntoNewFolder(draggedId, targetId);
    saveData();
    renderHome();
    return false;
  }

  return false;
}

function handleDragEnd(event) {
  if (dragState.draggedElement) dragState.draggedElement.classList.remove('dragging');
  dragState.draggedId = null;
  dragState.draggedType = null;
  dragState.draggedSource = null;
  dragState.draggedElement = null;
  dragState.dropTarget = null;
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

// ===== Rename Modal =====
const renameModal = document.getElementById('renameModal');
const renameInput = document.getElementById('renameInput');
let pendingRenameId = null;
let pendingRenameType = 'folder'; // 'folder' | 'agent-chat' | 'agent-project'

function openRenameModal(id, type) {
  pendingRenameType = type || 'folder';
  let value = '';
  if (pendingRenameType === 'folder') {
    const folder = (state.sites || []).find((s) => s && s.id === id);
    if (!folder) return;
    value = folder.name || '';
  } else if (pendingRenameType === 'agent-chat') {
    const project = getActiveProject();
    const chat = project.chats.find((c) => c.id === id);
    if (!chat) return;
    value = chat.title || '';
  } else if (pendingRenameType === 'agent-project') {
    const project = workbench.agent.projects.find((pr) => pr.id === id);
    if (!project) return;
    value = project.name || '';
  } else if (pendingRenameType === 'calendar-event') {
    const ev = (workbench.calendar || []).find((e) => e.id === id);
    if (!ev) return;
    value = ev.title || '';
  }
  pendingRenameId = id;
  if (renameInput) renameInput.value = value;
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
  if (pendingRenameType === 'folder') {
    const folder = (state.sites || []).find((s) => s && s.id === pendingRenameId);
    if (folder) {
      folder.name = name;
      saveData();
      renderHome();
    }
  } else if (pendingRenameType === 'agent-chat') {
    const project = getActiveProject();
    const chat = project.chats.find((c) => c.id === pendingRenameId);
    if (chat) {
      chat.title = name;
      chat.updatedAt = Date.now();
      saveWorkbench();
      renderAgentPanel();
    }
  } else if (pendingRenameType === 'agent-project') {
    const project = workbench.agent.projects.find((pr) => pr.id === pendingRenameId);
    if (project) {
      project.name = name;
      saveWorkbench();
      renderAgentPanel();
    }
  } else if (pendingRenameType === 'calendar-event') {
    const ev = (workbench.calendar || []).find((e) => e.id === pendingRenameId);
    if (ev) {
      ev.title = name;
      ev.updatedAt = Date.now();
      persistWorkbenchSync();
      openCalendarEditor();
    }
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

window.deleteFolderFromContext = function () {
  const item = contextMenuState.targetItem;
  if (!item) return;
  const itemName = item.name || (i18n.t('folder') || 'Folder');
  pendingDelete = { item, type: 'folder' };
  document.getElementById('deleteTitle').textContent = i18n.t('delete');
  document.getElementById('deleteMessage').textContent = i18n.t('deleteFolderConfirm') || 'Delete this folder?';
  document.getElementById('deleteModal').classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  hideContextMenu();
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
document.getElementById('saveEngineSelection').onclick = async () => {
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

  // Ensure current engine is still valid
  if (!state.enabledEngineIds.includes(state.engineId)) {
    state.engineId = state.enabledEngineIds[0];
  }

  const saved = await saveData();
  if (saved === false) return;

  renderSearchEngine();
  renderEngineQuickList();
  closeEngineModal();
};

window.selectEngineById = async (id) => {
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

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
  const saved = await saveData();
  if (saved === false) return;
  renderSearchEngine();
};

window.removeEngineById = async (id) => {
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
  const saved = await saveData();
  if (saved === false) return;
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
    const targetUrl = engine.url + encodeURIComponent(query);
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
  contextMenu.style.left = contextMenuState.x + 'px';
  contextMenu.style.top = contextMenuState.y + 'px';
  contextMenu.classList.remove('hidden');
}window.editItem = function () {
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

    // Render tag checkboxes (with current site selection)
    renderTagSelector(item.tags);
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

  const itemName = (type === 'site' || type === 'folder') ? item.name : item;

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
  } else {
    state.tags = state.tags.filter(t => t !== item);
    state.tagOrder = state.tagOrder.filter(t => t !== item);
    // Remove tag from all sites
    state.sites.forEach(site => {
      site.tags = site.tags.filter(t => t !== item);
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
function getSiteFaviconUrl(url) {
  try {
    const u = new URL(String(url || ''), window.location.href);
    if (!u.hostname) return '';
    return 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(u.hostname) + '&sz=64';
  } catch (_err) {
    return '';
  }
}

function getSiteInitial(site) {
  const name = String(site?.name || '').trim();
  return name ? name.charAt(0).toUpperCase() : '?';
}

function createFaviconIcon(site) {
  const icon = document.createElement('div');
  icon.className = 'site-tile-icon';

  const letter = document.createElement('span');
  letter.className = 'site-tile-letter';
  letter.textContent = getSiteInitial(site);
  icon.appendChild(letter);

  const faviconUrl = getSiteFaviconUrl(site.url);
  if (faviconUrl) {
    const img = document.createElement('img');
    img.className = 'site-tile-favicon';
    img.loading = 'lazy';
    img.alt = '';
    img.src = faviconUrl;
    img.onerror = () => {
      img.remove();
      letter.style.display = 'flex';
    };
    icon.appendChild(img);
  }
  return icon;
}

function createFolderIcon(count) {
  const icon = document.createElement('div');
  icon.className = 'site-tile-icon folder-tile-icon';
  icon.innerHTML =
    '<svg class="folder-svg" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M3 6.5C3 5.67 3.67 5 4.5 5h4.6c.42 0 .82.17 1.1.46l1.2 1.24c.28.29.68.46 1.1.46H19.5c.83 0 1.5.67 1.5 1.5v8c0 .83-.67 1.5-1.5 1.5h-15C3.67 18 3 17.33 3 16.5v-10z"/>' +
    '</svg>';
  if (count > 0) {
    const badge = document.createElement('span');
    badge.className = 'folder-count';
    badge.textContent = count > 99 ? '99+' : String(count);
    icon.appendChild(badge);
  }
  return icon;
}

function openLink(url) {
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

  const children = isFolder ? (Array.isArray(site.children) ? site.children : []) : [];
  tile.appendChild(isFolder ? createFolderIcon(children.length) : createFaviconIcon(site));

  const name = document.createElement('span');
  name.className = 'site-tile-name';
  name.textContent = site.name || (isFolder ? (i18n.t('folder') || 'Folder') : '');
  tile.appendChild(name);

  tile.draggable = true;
  tile.addEventListener('dragstart', (e) => handleDragStart(e, site.id, isFolder ? 'folder' : 'site', source, index));
  tile.addEventListener('dragover', handleDragOver);
  tile.addEventListener('drop', (e) => handleDrop(e, site.id, isFolder ? 'folder' : 'site'));
  tile.addEventListener('dragend', handleDragEnd);

  if (isFolder) {
    tile.onclick = () => openFolder(site.id);
  } else {
    tile.onclick = () => openLink(site.url);
    tile.onmousedown = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        window.open(site.url, '_blank');
      }
    };
  }
  tile.oncontextmenu = (e) => showContextMenu(e, site, isFolder ? 'folder' : 'site', source);
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

function renderHome() {
  contentEl.innerHTML = '';

  if (state.viewMode === 'minimalist') return;

  const openFolder = state.openFolderId
    ? (state.sites || []).find((s) => s && s.id === state.openFolderId && s.type === 'folder')
    : null;

  if (openFolder) {
    renderFolderView(openFolder);
    return;
  }

  // 1. Tags (sorted by tagOrder)
  const orderedTags = state.tagOrder.length > 0
    ? state.tagOrder.filter((tag) => state.tags.includes(tag))
    : state.tags;

  orderedTags.forEach((tag, index) => {
    const chip = document.createElement('div');
    chip.className = 'chip tag';
    chip.textContent = '# ' + tag;
    chip.onclick = () => openTagView(tag);
    chip.oncontextmenu = (e) => showContextMenu(e, tag, 'tag');
    chip.draggable = true;
    chip.addEventListener('dragstart', (e) => handleDragStart(e, tag, 'tag', 'home', index));
    chip.addEventListener('dragover', handleDragOver);
    chip.addEventListener('drop', (e) => handleDrop(e, tag, 'tag'));
    chip.addEventListener('dragend', handleDragEnd);
    contentEl.appendChild(chip);
  });

  // 2. Sites grid (favicon tiles + folder tiles)
  const grid = document.createElement('div');
  grid.className = 'sites-grid';
  getVisibleSites().forEach((site, index) => {
    grid.appendChild(createSiteTile(site, index, 'home'));
  });

  // 3. Add tile
  const addTile = document.createElement('div');
  addTile.className = 'site-tile add-tile';
  addTile.innerHTML =
    '<div class="site-tile-icon add-tile-icon"><span class="add-glyph">＋</span></div>' +
    '<span class="site-tile-name"></span>';
  addTile.onclick = openAddSiteModal;
  grid.appendChild(addTile);

  contentEl.appendChild(grid);
}

function renderFolderView(folder) {
  const header = document.createElement('div');
  header.className = 'folder-header';
  const backBtn = document.createElement('button');
  backBtn.className = 'folder-back-btn';
  backBtn.textContent = '← ' + (i18n.t('back') || 'Back');
  backBtn.onclick = closeFolder;
  const title = document.createElement('span');
  title.className = 'folder-title';
  title.textContent = folder.name || (i18n.t('folder') || 'Folder');
  header.appendChild(backBtn);
  header.appendChild(title);
  contentEl.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'sites-grid';
  getFolderChildren(folder).forEach((site, index) => {
    grid.appendChild(createSiteTile(site, index, 'folder'));
  });

  if (grid.children.length === 0) {
    const hint = document.createElement('div');
    hint.className = 'folder-empty-hint';
    hint.textContent = i18n.t('emptyFolder') || 'This folder is empty. Drag a site onto the folder icon to add it.';
    grid.appendChild(hint);
  }

  contentEl.appendChild(grid);
}

function openFolder(folderId) {
  state.openFolderId = folderId;
  renderHome();
}

function closeFolder() {
  state.openFolderId = null;
  renderHome();
}

function renderTagSelector(selectedTags) {
  const tagSelector = document.getElementById('tagSelector');
  if (!tagSelector) return;
  const selected = Array.isArray(selectedTags) ? selectedTags : [];
  tagSelector.innerHTML = '';
  state.tags.forEach((tag) => {
    const label = document.createElement('label');
    label.className = 'chip tag';
    label.style.border = '1px solid transparent';
    label.style.opacity = '0.6';
    label.style.cursor = 'pointer';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = tag;
    checkbox.checked = selected.includes(tag);
    checkbox.style.display = 'none';
    checkbox.addEventListener('change', () => {
      label.style.opacity = checkbox.checked ? '1' : '0.6';
      label.style.borderColor = checkbox.checked ? 'var(--text-color)' : 'transparent';
    });
    if (checkbox.checked) {
      label.style.opacity = '1';
      label.style.borderColor = 'var(--text-color)';
    }
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + tag));
    tagSelector.appendChild(label);
  });
}

function openAddSiteModal() {
  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
  document.getElementById('tagName').value = '';
  renderTagSelector();
  addModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  addTypeRadios.forEach((r) => r.disabled = false);
}// ===== Add/Edit Modal =====
// Note: Add button is now rendered as a chip in renderHome()

function closeModals() {
  modalOverlay.classList.add('hidden');
  addModal.classList.add('hidden');
  tagViewModal.classList.add('hidden');
  document.getElementById('deleteModal').classList.add('hidden'); // Close delete modal
  renameModal?.classList.add('hidden');
  settingsModal?.classList.add('hidden');
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
saveItemBtn.addEventListener('click', async () => {
  const type = document.querySelector('input[name="addType"]:checked').value;
  const isEditing = window.editingItem !== undefined;

  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }

  if (type === 'site') {
    const name = document.getElementById('siteName').value.trim();
    let url = document.getElementById('siteUrl').value.trim();
    if (!name || !url) {
      window.showNotification?.(i18n.t('nameRequired'), 'warning');
      return;
    }

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
    if (!tagName) {
      window.showNotification?.(i18n.t('tagNameRequired'), 'warning');
      return;
    }

    if (isEditing) {
      // Update existing tag
      const oldTagName = window.editingItem.item;
      const tagIndex = state.tags.indexOf(oldTagName);
      if (tagIndex !== -1) {
        // Check if new name already exists
        if (state.tags.includes(tagName) && tagName !== oldTagName) {
          window.showNotification?.(i18n.t('tagExists'), 'warning');
          return;
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
      if (state.tags.includes(tagName)) {
        window.showNotification?.(i18n.t('tagExists'), 'warning');
        return;
      }
      state.tags.push(tagName);

      // Add to tagOrder
      state.tagOrder.push(tagName);
    }
  }

  // Clear editing state
  window.editingItem = undefined;

  const saved = await saveData();
  if (saved === false) return;

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
  syncSettingsModalUI?.();
  syncModeSubmenuUI?.();
}

function closeSettingsLayers(options = {}) {
  const { keepMenuOpen = false } = options;
  modeSubmenu?.classList.add('hidden');
  if (!keepMenuOpen) {
    settingsMenu?.classList.add('hidden');
  }
}

function openSettingsMenu() {
  settingsMenu?.classList.remove('hidden');
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
    el.style.fontWeight = el.dataset.modeOption === current ? '800' : '400';
    el.style.opacity = el.dataset.modeOption === current ? '1' : '0.7';
  });
}

window.closeSettingsLayers = closeSettingsLayers;

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
function syncSettingsModalUI() {
  const tfs = document.querySelectorAll('#timeFormatGroup .seg-btn');
  tfs.forEach((b) => b.classList.toggle('active', b.dataset.timeFormat === state.timeFormat));
  const langSel = document.getElementById('settingsLangSelect');
  if (langSel) langSel.value = (typeof i18n !== 'undefined' ? i18n.currentLocale : 'zh');
  const obs = document.querySelectorAll('#openBehaviorGroup .seg-btn');
  obs.forEach((b) => b.classList.toggle('active', b.dataset.openBehavior === state.openBehavior));
  const appearance = window.getAppearance?.() || 'auto';
  document.querySelectorAll('#appearanceGroup .seg-btn').forEach((b) => b.classList.toggle('active', b.dataset.appearance === appearance));
  document.querySelectorAll('#zoomGroup .seg-btn').forEach((b) => b.classList.toggle('active', b.dataset.zoom === state.zoomLevel));
}
window.syncSettingsModalUI = syncSettingsModalUI;

function openSettingsModal() {
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
document.getElementById('settingsLangSelect')?.addEventListener('change', (e) => {
  setSettingsLocale(e.target.value);
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

// ===== Vertical pager: home <-> workspace =====
let pager = null;

function setupPager() {
  const container = document.getElementById('pager');
  if (!container || typeof window.createPager !== 'function') return;
  pager = window.createPager({
    container,
    dots: document.querySelectorAll('#pagerDots button'),
    // Modals and menus own the wheel/keyboard while they are open.
    isBlocked: () => hasOpenTransientUi(),
    onChange: (_index, name) => {
      if (name === 'home') searchInput?.focus({ preventScroll: true });
    }
  });
  document.getElementById('toWorkspaceBtn')?.addEventListener('click', () => pager.go(1));
}

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
    document.getElementById('pluginModal')
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
    editLabel.textContent = type === 'site' ? i18n.t('editSite') : i18n.t('editTag');
  }
  if (deleteLabel) {
    deleteLabel.textContent = i18n.t('delete');
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
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('addModal').classList.remove('hidden');
  document.querySelector('input[name="addType"][value="site"]').checked = true;
  document.getElementById('siteForm').classList.remove('hidden');
  document.getElementById('tagForm').classList.add('hidden');
  renderTagSelector();
}

function openAddFolderFromContext() {
  hidePageContextMenu();
  if (!window.authState || !window.authState.isLoggedIn) {
    window.requireLoginForPersistentChange?.();
    return;
  }
  const folderId = generateUuid();
  state.sites.push({
    id: folderId,
    type: 'folder',
    name: i18n.t('newFolder') || 'New Folder',
    url: '',
    showOnHome: true,
    tags: [],
    children: []
  });
  state.siteOrder.push(folderId);
  saveData();
  renderHome();
  openRenameModal(folderId, 'folder');
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
window.openAddSiteFromContext = openAddSiteFromContext;
window.openAddFolderFromContext = openAddFolderFromContext;
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


// ===== Workbench (screen 2): plugins + personal agent =====
const WORKBENCH_KEY = 'workbench';
const AGENT_PROVIDERS = {
  deepseek: { name: 'DeepSeek', models: [{ id: 'deepseek-chat', name: 'DeepSeek Chat' }] },
  doubao: { name: '豆包', models: [
    { id: 'doubao-pro-32k', name: 'Doubao Pro 32k' },
    { id: 'doubao-1.5-vision-pro-32k', name: 'Doubao Vision Pro', vision: true }
  ] },
  qwen: { name: '通义千问', models: [
    { id: 'qwen-plus', name: 'Qwen Plus' },
    { id: 'qwen-vl-plus', name: 'Qwen VL Plus', vision: true }
  ] },
  minimax: { name: 'MiniMax', models: [{ id: 'MiniMax-Text-01', name: 'MiniMax Text' }] },
  openai: { name: 'OpenAI', models: [{ id: 'gpt-4o-mini', name: 'GPT-4o mini', vision: true }] }
};
const NOTE_COLORS = ['#fff3bf', '#ffe0b2', '#ffd8e4', '#d3f2ff', '#e0f7e9', '#f3e6ff'];
const AGENT_IMAGE_MAX = 3;

function defaultWorkbench() {
  const firstChatId = generateUuid();
  return {
    plugins: ['notes', 'todo', 'calendar'],
    notes: [],
    todos: [],
    calendar: [],
    calView: null,
    calSel: null,
    agent: {
      provider: 'deepseek',
      model: 'deepseek-chat',
      projects: [{
        id: generateUuid(),
        name: '默认项目',
        chats: [{ id: firstChatId, title: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() }]
      }],
      activeProjectId: null,
      activeChatId: null
    }
  };
}

function loadWorkbench() {
  try {
    const raw = localStorage.getItem(WORKBENCH_KEY);
    if (!raw) return defaultWorkbench();
    const parsed = JSON.parse(raw);
    const base = defaultWorkbench();
    return {
      ...base,
      ...parsed,
      agent: { ...base.agent, ...(parsed.agent || {}), projects: parsed.agent?.projects || base.agent.projects }
    };
  } catch (_err) {
    return defaultWorkbench();
  }
}

function saveWorkbench() {
  try {
    localStorage.setItem(WORKBENCH_KEY, JSON.stringify(workbench));
  } catch (_err) { /* quota */ }
}

function persistWorkbenchSync() {
  saveWorkbench();
  renderWorkbench();
  if (window.markHomeConfigUpdated) window.markHomeConfigUpdated();
}

let workbench = loadWorkbench();

function ensureAgentActive() {
  const agent = workbench.agent;
  if (!agent.projects.length) {
    const chatId = generateUuid();
    agent.projects.push({ id: generateUuid(), name: '默认项目', chats: [{ id: chatId, title: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() }] });
  }
  if (!agent.activeProjectId || !agent.projects.find((pr) => pr.id === agent.activeProjectId)) {
    agent.activeProjectId = agent.projects[0].id;
  }
  const project = agent.projects.find((pr) => pr.id === agent.activeProjectId);
  if (!project.chats.length) {
    project.chats.push({ id: generateUuid(), title: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() });
  }
  if (!agent.activeChatId || !project.chats.find((c) => c.id === agent.activeChatId)) {
    agent.activeChatId = project.chats[0].id;
  }
  return project;
}

function getActiveProject() {
  ensureAgentActive();
  return workbench.agent.projects.find((pr) => pr.id === workbench.agent.activeProjectId);
}

function getActiveChat() {
  const project = getActiveProject();
  return project.chats.find((c) => c.id === workbench.agent.activeChatId);
}

function ensurePluginModal() {
  let modal = document.getElementById('pluginModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'pluginModal';
  modal.className = 'modal-overlay hidden';
  modal.innerHTML = `
    <div class="modal" style="max-width: 560px; max-height: 84vh; overflow-y: auto;">
      <h3 id="pluginModalTitle"></h3>
      <div id="pluginModalBody" style="margin-top: 12px;"></div>
      <div class="modal-actions">
        <button id="pluginModalClose" class="cancel-btn">关闭</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.getElementById('pluginModalClose').addEventListener('click', () => {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
  });
  return modal;
}

function openPluginModal(title, bodyHtml, afterBind) {
  const modal = ensurePluginModal();
  document.getElementById('pluginModalTitle').textContent = title;
  document.getElementById('pluginModalBody').innerHTML = bodyHtml;
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  if (typeof afterBind === 'function') afterBind();
}

function closePluginModal() {
  const modal = document.getElementById('pluginModal');
  if (modal) modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

const PLUGIN_META = {
  notes: { icon: '📝', nameKey: 'pluginNotes' },
  todo: { icon: '☑️', nameKey: 'pluginTodo' },
  calendar: { icon: '📅', nameKey: 'pluginCalendar' }
};

function pluginName(type) {
  const meta = PLUGIN_META[type];
  if (!meta) return type;
  return i18n.t(meta.nameKey) || type;
}

function initWorkbench() {
  if (!document.getElementById('pageWorkspace')) return;
  renderWorkbench();
}

function scrollToHomeScreen() {
  pager?.go(0);
}

function scrollToWorkbenchScreen() {
  pager?.go(1);
}

function renderWorkbench() {
  const header = document.getElementById('workbenchHeader');
  if (header) {
    header.innerHTML = '';
    const back = document.createElement('button');
    back.className = 'workbench-back-btn';
    back.innerHTML = '<svg class="sym" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
    back.setAttribute('aria-label', i18n.t('wbBackHome') || 'Home');
    back.title = i18n.t('wbBackHome') || 'Home';
    back.addEventListener('click', scrollToHomeScreen);
    header.appendChild(back);
    const title = document.createElement('div');
    title.className = 'workbench-title';
    title.textContent = (i18n.t('workbench') || '工作台');
    header.appendChild(title);
    const hint = document.createElement('div');
    hint.className = 'workbench-hint';
    hint.textContent = (i18n.t('workbenchHint') || '');
    header.appendChild(hint);
  }
  renderPluginCards();
  renderAgentPanel();
}

function renderPluginCards() {
  const container = document.getElementById('pluginCards');
  if (!container) return;
  container.innerHTML = '';

  (workbench.plugins || []).forEach((type) => {
    const meta = PLUGIN_META[type];
    if (!meta) return;
    const card = document.createElement('div');
    card.className = 'plugin-card';
    card.dataset.plugin = type;
    card.innerHTML = '<div class="plugin-card-head"><span class="plugin-card-icon">' + meta.icon + '</span><span class="plugin-card-name"></span></div><div class="plugin-card-preview"></div>';
    card.querySelector('.plugin-card-name').textContent = pluginName(type);
    card.querySelector('.plugin-card-preview').textContent = pluginPreviewText(type);
    card.addEventListener('click', () => openPluginEditor(type));
    container.appendChild(card);
  });

  const addCard = document.createElement('div');
  addCard.className = 'plugin-card add-plugin';
  addCard.innerHTML = '<div class="plugin-card-icon">＋</div><div class="plugin-card-name"></div>';
  addCard.querySelector('.plugin-card-name').textContent = i18n.t('pluginAdd') || '添加';
  addCard.addEventListener('click', openPluginPicker);
  container.appendChild(addCard);
}

function pluginPreviewText(type) {
  if (type === 'notes') {
    const notes = workbench.notes || [];
    if (!notes.length) return i18n.t('pluginNoData') || '—';
    const first = notes[0].text || '';
    return (first.length > 24 ? first.slice(0, 24) + '…' : first) || (notes.length + ' ' + (i18n.t('pluginNotes') || ''));
  }
  if (type === 'todo') {
    const todos = workbench.todos || [];
    const done = todos.filter((t) => t.done).length;
    return todos.length ? done + '/' + todos.length + ' ✓' : (i18n.t('pluginNoData') || '—');
  }
  if (type === 'calendar') {
    const events = (workbench.calendar || []).filter((ev) => ev.date === todayKey());
    return events.length ? (i18n.t('pluginTodayEvents') || '今日日程') + ' ' + events.length : (i18n.t('pluginNoData') || '—');
  }
  return '';
}

function openPluginPicker() {
  const all = ['notes', 'todo', 'calendar'];
  const rows = all.map((type) => {
    const checked = (workbench.plugins || []).includes(type) ? 'checked' : '';
    return '<label class="plugin-list-item" style="cursor:pointer;">' +
      '<input type="checkbox" data-plugin="' + type + '" ' + checked + ' style="accent-color: var(--text-color);">' +
      '<span class="item-text">' + PLUGIN_META[type].icon + ' ' + pluginName(type) + '</span></label>';
  }).join('');

  openPluginModal(i18n.t('pluginPickerTitle') || '选择工作台插件', rows, () => {
    document.querySelectorAll('#pluginModalBody input[data-plugin]').forEach((input) => {
      input.addEventListener('change', () => {
        const type = input.dataset.plugin;
        workbench.plugins = workbench.plugins || [];
        if (input.checked) {
          if (!workbench.plugins.includes(type)) workbench.plugins.push(type);
        } else {
          workbench.plugins = workbench.plugins.filter((t) => t !== type);
        }
        persistWorkbenchSync();
        renderPluginCards();
      });
    });
  });
}

function openPluginEditor(type) {
  if (type === 'notes') openNotesEditor();
  else if (type === 'todo') openTodoEditor();
  else if (type === 'calendar') openCalendarEditor();
}

// ---------- Notes (sticky notes with colors + pin) ----------
function openNotesEditor() {
  const items = (workbench.notes || []).map((n) => {
    const color = NOTE_COLORS.includes(n.color) ? n.color : NOTE_COLORS[0];
    return '<div class="plugin-note-card" style="background:' + color + ';">' +
      '<div class="plugin-note-head">' +
      '<span class="plugin-note-pin' + (n.pinned ? ' pinned' : '') + '" data-pin-note="' + n.id + '">' + (n.pinned ? '📌' : '📍') + '</span>' +
      '<span class="plugin-note-color"><select data-color-note="' + n.id + '">' + NOTE_COLORS.map((c) => '<option value="' + c + '"' + (color === c ? ' selected' : '') + ' style="background:' + c + ';">' + c + '</option>').join('') + '</select></span>' +
      '<button class="item-del" data-del-note="' + n.id + '">✕</button>' +
      '</div>' +
      '<textarea data-note-id="' + n.id + '" class="plugin-note-text" placeholder="' + (i18n.t('addNote') || '便签内容') + '">' + escapeHtml(n.text || '') + '</textarea>' +
      '</div>';
  }).join('');

  openPluginModal(pluginName('notes'),
    '<div class="plugin-editor plugin-note-grid">' + (items || '<div class="folder-empty-hint">' + (i18n.t('notesEmpty') || '暂无便签') + '</div>') + '</div>' +
    '<div class="plugin-add-row"><button id="noteAddBtn" class="primary-btn" style="width:100%;">＋ ' + (i18n.t('addNote') || '添加便签') + '</button></div>',
    () => {
      document.querySelectorAll('#pluginModalBody textarea[data-note-id]').forEach((ta) => {
        ta.addEventListener('input', () => {
          const note = workbench.notes.find((n) => n.id === ta.dataset.noteId);
          if (note) { note.text = ta.value; note.updatedAt = Date.now(); saveWorkbench(); }
        });
      });
      document.querySelectorAll('#pluginModalBody [data-del-note]').forEach((btn) => {
        btn.addEventListener('click', () => {
          workbench.notes = workbench.notes.filter((n) => n.id !== btn.dataset.delNote);
          persistWorkbenchSync();
          openNotesEditor();
        });
      });
      document.querySelectorAll('#pluginModalBody [data-pin-note]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const note = workbench.notes.find((n) => n.id === btn.dataset.pinNote);
          if (note) { note.pinned = !note.pinned; persistWorkbenchSync(); openNotesEditor(); }
        });
      });
      document.querySelectorAll('#pluginModalBody [data-color-note]').forEach((sel) => {
        sel.addEventListener('change', () => {
          const note = workbench.notes.find((n) => n.id === sel.dataset.colorNote);
          if (note) { note.color = sel.value; persistWorkbenchSync(); openNotesEditor(); }
        });
      });
      document.getElementById('noteAddBtn').addEventListener('click', () => {
        workbench.notes.unshift({ id: generateUuid(), text: '', color: NOTE_COLORS[0], pinned: false, updatedAt: Date.now() });
        saveWorkbench();
        openNotesEditor();
      });
    });
}

// ---------- Todo (priority, due date, filters) ----------
function openTodoEditor(filter) {
  const currentFilter = filter || workbench.todoFilter || 'all';
  workbench.todoFilter = currentFilter;
  let todos = workbench.todos || [];
  if (currentFilter === 'active') todos = todos.filter((t) => !t.done);
  else if (currentFilter === 'done') todos = todos.filter((t) => t.done);
  const doneCount = (workbench.todos || []).filter((t) => t.done).length;
  const totalCount = (workbench.todos || []).length;

  const items = todos.map((t) => (
    '<div class="plugin-list-item' + (t.done ? ' done' : '') + '">' +
    '<input type="checkbox" data-todo-id="' + t.id + '" ' + (t.done ? 'checked' : '') + ' style="accent-color: var(--text-color);">' +
    '<div class="todo-main">' +
    '<span class="item-text">' + escapeHtml(t.text || '') + '</span>' +
    '<span class="todo-meta">' + (t.priority === 'high' ? '🔴' : t.priority === 'medium' ? '🟡' : '') + (t.due ? ' · ' + t.due : '') + '</span>' +
    '</div>' +
    '<button class="item-del" data-del-todo="' + t.id + '">✕</button></div>'
  )).join('');

  const filterTabs = [
    ['all', i18n.t('todoAll') || '全部'],
    ['active', i18n.t('todoActive') || '进行中'],
    ['done', i18n.t('todoDone') || '已完成']
  ].map(([key, label]) =>
    '<button class="seg-btn' + (currentFilter === key ? ' active' : '') + '" data-todo-filter="' + key + '">' + label + '</button>'
  ).join('');

  const progress = totalCount ? '<div class="todo-progress"><div class="todo-progress-bar" style="width:' + Math.round(doneCount / totalCount * 100) + '%"></div></div>' : '';

  openPluginModal(pluginName('todo'),
    '<div class="todo-progress-row"><span>' + doneCount + '/' + totalCount + ' ✓</span>' + progress + '</div>' +
    '<div class="segmented-control" style="margin-bottom:10px;">' + filterTabs + '</div>' +
    '<div class="plugin-editor">' + (items || '<div class="folder-empty-hint">' + (i18n.t('todoEmpty') || '暂无待办') + '</div>') + '</div>' +
    '<div class="plugin-add-row">' +
    '<input id="todoInput" class="modal-input" placeholder="' + (i18n.t('todoPlaceholder') || '添加待办事项') + '">' +
    '<select id="todoPriority" class="modal-input" style="max-width:86px;">' +
    '<option value="low">' + (i18n.t('todoLow') || '低') + '</option>' +
    '<option value="medium">' + (i18n.t('todoMedium') || '中') + '</option>' +
    '<option value="high">' + (i18n.t('todoHigh') || '高') + '</option>' +
    '</select>' +
    '<input id="todoDue" type="date" class="modal-input" style="max-width:140px;">' +
    '<button id="todoAddBtn" class="primary-btn">＋</button></div>',
    () => {
      document.querySelectorAll('#pluginModalBody [data-todo-filter]').forEach((btn) => {
        btn.addEventListener('click', () => openTodoEditor(btn.dataset.todoFilter));
      });
      document.querySelectorAll('#pluginModalBody [data-todo-id]').forEach((box) => {
        box.addEventListener('change', () => {
          const todo = workbench.todos.find((t) => t.id === box.dataset.todoId);
          if (todo) { todo.done = box.checked; todo.updatedAt = Date.now(); persistWorkbenchSync(); openTodoEditor(currentFilter); }
        });
      });
      document.querySelectorAll('#pluginModalBody [data-del-todo]').forEach((btn) => {
        btn.addEventListener('click', () => {
          workbench.todos = workbench.todos.filter((t) => t.id !== btn.dataset.delTodo);
          persistWorkbenchSync();
          openTodoEditor(currentFilter);
        });
      });
      const addTodo = () => {
        const input = document.getElementById('todoInput');
        const text = (input && input.value.trim()) || '';
        if (!text) return;
        workbench.todos.push({
          id: generateUuid(),
          text,
          done: false,
          priority: document.getElementById('todoPriority')?.value || 'low',
          due: document.getElementById('todoDue')?.value || '',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        persistWorkbenchSync();
        openTodoEditor(currentFilter);
      };
      document.getElementById('todoAddBtn').addEventListener('click', addTodo);
      document.getElementById('todoInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTodo();
      });
    });
}

// ---------- Calendar (month view + time + edit) ----------
function formatDateKey(y, m, d) {
  return y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}

function todayKey() {
  const now = new Date();
  return formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function openCalendarEditor() {
  const now = new Date();
  const view = workbench.calView || { y: now.getFullYear(), m: now.getMonth() };
  const viewY = view.y;
  const viewM = view.m;
  const todayK = todayKey();
  const selKey = workbench.calSel || todayK;

  const firstDay = new Date(viewY, viewM, 1).getDay();
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const monthLabel = viewY + '年' + (viewM + 1) + '月';

  let cells = '<div class="cal-weekday">日</div><div class="cal-weekday">一</div><div class="cal-weekday">二</div><div class="cal-weekday">三</div><div class="cal-weekday">四</div><div class="cal-weekday">五</div><div class="cal-weekday">六</div>';
  for (let i = 0; i < firstDay; i++) cells += '<div class="cal-day blank"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDateKey(viewY, viewM, d);
    const dayEvents = (workbench.calendar || []).filter((ev) => ev.date === key);
    const cls = 'cal-day' + (key === todayK ? ' today' : '') + (key === selKey ? ' selected' : '') + (dayEvents.length ? ' has-events' : '');
    cells += '<div class="' + cls + '" data-cal-date="' + key + '">' + d + (dayEvents.length ? '<span class="cal-dot"></span>' : '') + '</div>';
  }

  const events = (workbench.calendar || []).filter((ev) => ev.date === selKey).sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')));
  const eventsHtml = events.length
    ? events.map((ev) => (
      '<div class="plugin-list-item"><span class="item-text">' + (ev.time ? '<b>' + escapeHtml(ev.time) + '</b> ' : '') + escapeHtml(ev.title) + '</span>' +
      '<button class="item-del" data-edit-event="' + ev.id + '">✎</button>' +
      '<button class="item-del" data-del-event="' + ev.id + '">✕</button></div>'
    )).join('')
    : '<div class="folder-empty-hint">' + (i18n.t('calendarEmpty') || '当日暂无日程') + '</div>';

  const bodyHtml =
    '<div class="plugin-editor">' +
    '<div class="calendar-nav"><button id="calPrev">‹</button><span class="cal-month-label">' + monthLabel + '</span><button id="calNext">›</button></div>' +
    '<div class="calendar-grid">' + cells + '</div>' +
    '<div class="calendar-events">' + eventsHtml + '</div>' +
    '</div>' +
    '<div class="plugin-add-row"><input id="eventInput" class="modal-input" placeholder="' + (i18n.t('eventPlaceholder') || '添加日程') + '">' +
    '<input id="eventTime" type="time" class="modal-input" style="max-width:110px;">' +
    '<button id="eventAddBtn" class="primary-btn">＋</button></div>';

  openPluginModal(pluginName('calendar'), bodyHtml, () => {
    document.getElementById('calPrev').addEventListener('click', () => {
      const m = viewM - 1;
      workbench.calView = { y: m < 0 ? viewY - 1 : viewY, m: m < 0 ? 11 : m };
      saveWorkbench();
      openCalendarEditor();
    });
    document.getElementById('calNext').addEventListener('click', () => {
      const m = viewM + 1;
      workbench.calView = { y: m > 11 ? viewY + 1 : viewY, m: m > 11 ? 0 : m };
      saveWorkbench();
      openCalendarEditor();
    });
    document.querySelectorAll('#pluginModalBody [data-cal-date]').forEach((cell) => {
      cell.addEventListener('click', () => {
        workbench.calSel = cell.dataset.calDate;
        saveWorkbench();
        openCalendarEditor();
      });
    });
    document.querySelectorAll('#pluginModalBody [data-del-event]').forEach((btn) => {
      btn.addEventListener('click', () => {
        workbench.calendar = workbench.calendar.filter((ev) => ev.id !== btn.dataset.delEvent);
        persistWorkbenchSync();
        openCalendarEditor();
      });
    });
    document.querySelectorAll('#pluginModalBody [data-edit-event]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openRenameModal(btn.dataset.editEvent, 'calendar-event');
      });
    });
    const addEvent = () => {
      const input = document.getElementById('eventInput');
      const title = (input && input.value.trim()) || '';
      if (!title) return;
      workbench.calendar.push({ id: generateUuid(), date: selKey, title, time: document.getElementById('eventTime')?.value || '', updatedAt: Date.now() });
      persistWorkbenchSync();
      openCalendarEditor();
    };
    document.getElementById('eventAddBtn').addEventListener('click', addEvent);
    document.getElementById('eventInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addEvent();
    });
  });
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ---------- Personal Agent ----------
let agentPendingImages = [];
let agentIsStreaming = false;

function currentAgentModel() {
  const provider = AGENT_PROVIDERS[workbench.agent.provider] || AGENT_PROVIDERS.deepseek;
  return provider.models.find((m) => m.id === workbench.agent.model) || provider.models[0];
}

function renderAgentPanel() {
  const panel = document.getElementById('agentPanel');
  if (!panel) return;
  ensureAgentActive();
  const agent = workbench.agent;
  const isLoggedIn = !!window.authState?.isLoggedIn;
  const model = currentAgentModel();

  const projectHtml = agent.projects.map((pr) => {
    const isActive = pr.id === agent.activeProjectId;
    const chats = isActive ? pr.chats.map((c) =>
      '<div class="agent-chat-item' + (c.id === agent.activeChatId ? ' active' : '') + '" data-chat-id="' + c.id + '">' +
      '<span class="agent-chat-label">' + escapeHtml(c.title) + '</span>' +
      '<span class="agent-chat-actions">' +
      '<button class="agent-mini-btn" data-chat-rename="' + c.id + '" title="' + (i18n.t('agentRename') || 'Rename') + '">✎</button>' +
      '<button class="agent-mini-btn" data-chat-del="' + c.id + '" title="' + (i18n.t('agentDelete') || 'Delete') + '">✕</button>' +
      '</span></div>'
    ).join('') : '';

    return '<div class="agent-project-item' + (isActive ? ' active' : '') + '" data-project-id="' + pr.id + '">' +
      '<div class="agent-project-head">' +
      '<span class="agent-project-name">' + escapeHtml(pr.name) + '</span>' +
      '<span class="agent-project-actions">' +
      '<button class="agent-mini-btn" data-proj-rename="' + pr.id + '" title="' + (i18n.t('agentRename') || 'Rename') + '">✎</button>' +
      '<button class="agent-mini-btn" data-proj-del="' + pr.id + '" title="' + (i18n.t('agentDelete') || 'Delete') + '">✕</button>' +
      '</span></div>' +
      (isActive ? chats + '<button class="agent-new-chat" data-new-chat="' + pr.id + '">＋ ' + (i18n.t('agentNewChat') || '新对话') + '</button>' : '') +
      '</div>';
  }).join('');

  const providerOptions = Object.keys(AGENT_PROVIDERS).map((k) =>
    '<option value="' + k + '"' + (agent.provider === k ? ' selected' : '') + '>' + AGENT_PROVIDERS[k].name + '</option>'
  ).join('');

  const modelOptions = (AGENT_PROVIDERS[agent.provider] || AGENT_PROVIDERS.deepseek).models.map((m) =>
    '<option value="' + m.id + '"' + (agent.model === m.id ? ' selected' : '') + '>' + escapeHtml(m.name) + (m.vision ? ' 🖼' : '') + '</option>'
  ).join('');

  const loginLabel = isLoggedIn
    ? ((window.authState.user?.user_metadata?.name) || (i18n.t('account') || 'Account'))
    : (i18n.t('agentLoginRequired') || '需要登录');

  const imagePreview = agentPendingImages.length
    ? '<div class="agent-attach-preview">' + agentPendingImages.map((img, idx) =>
      '<span class="agent-attach-thumb"><img src="' + img + '" alt=""><button class="agent-mini-btn" data-remove-image="' + idx + '">✕</button></span>'
    ).join('') + '</div>'
    : '';

  panel.innerHTML = `
    <div class="agent-sidebar">
      <button id="agentNewProject" class="agent-new-chat">＋ ${i18n.t('agentNewProject') || '新建项目'}</button>
      <div class="agent-project-list">${projectHtml}</div>
    </div>
    <div class="agent-chat">
      <div class="agent-chat-header">
        <select id="agentProviderSelect" class="modal-input">${providerOptions}</select>
        <select id="agentModelSelect" class="modal-input">${modelOptions}</select>
        <span class="agent-login-badge${isLoggedIn ? '' : ' required'}" id="agentLoginBadge">${loginLabel}</span>
      </div>
      <div class="agent-messages" id="agentMessages"></div>
      <div class="agent-input-area">
        ${imagePreview}
        <div class="agent-input">
          <button id="agentAttach" class="cancel-btn" title="${i18n.t('agentAttachImage') || '附加图片'}">🖼</button>
          <textarea id="agentInput" placeholder="${i18n.t('agentPlaceholder') || '输入消息，与你的 Agent 对话…'}"></textarea>
          <button id="agentSend" class="primary-btn">${i18n.t('agentSend') || '发送'}</button>
        </div>
      </div>
      <input type="file" id="agentFileInput" accept="image/*" multiple class="hidden">
    </div>`;

  bindAgentEvents(isLoggedIn, model);
  renderAgentMessages();
}

function bindAgentEvents(isLoggedIn, model) {
  document.getElementById('agentProviderSelect').addEventListener('change', (e) => {
    const next = e.target.value;
    if (!AGENT_PROVIDERS[next]) return;
    if (!isLoggedIn) {
      showLoginRequiredForAgent();
      e.target.value = workbench.agent.provider;
      return;
    }
    workbench.agent.provider = next;
    workbench.agent.model = AGENT_PROVIDERS[next].models[0].id;
    saveWorkbench();
    renderAgentPanel();
  });

  document.getElementById('agentModelSelect').addEventListener('change', (e) => {
    const next = e.target.value;
    if (!isLoggedIn) {
      showLoginRequiredForAgent();
      e.target.value = workbench.agent.model;
      return;
    }
    workbench.agent.model = next;
    saveWorkbench();
    renderAgentPanel();
  });

  document.getElementById('agentNewProject').addEventListener('click', () => {
    const chatId = generateUuid();
    const project = {
      id: generateUuid(),
      name: (i18n.t('agentProject') || '项目') + ' ' + (workbench.agent.projects.length + 1),
      chats: [{ id: chatId, title: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() }]
    };
    workbench.agent.projects.push(project);
    workbench.agent.activeProjectId = project.id;
    workbench.agent.activeChatId = chatId;
    saveWorkbench();
    renderAgentPanel();
  });

  document.querySelectorAll('#agentPanel [data-project-id]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.agent-mini-btn')) return;
      const project = workbench.agent.projects.find((pr) => pr.id === el.dataset.projectId);
      if (!project || workbench.agent.activeProjectId === project.id) return;
      workbench.agent.activeProjectId = project.id;
      workbench.agent.activeChatId = project.chats.length ? project.chats[0].id : null;
      saveWorkbench();
      renderAgentPanel();
    });
  });

  document.querySelectorAll('#agentPanel [data-chat-id]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.agent-mini-btn')) return;
      workbench.agent.activeChatId = el.dataset.chatId;
      saveWorkbench();
      renderAgentPanel();
    });
  });

  document.querySelectorAll('#agentPanel [data-new-chat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const project = workbench.agent.projects.find((pr) => pr.id === btn.dataset.newChat);
      if (!project) return;
      const chat = { id: generateUuid(), title: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() };
      project.chats.push(chat);
      workbench.agent.activeProjectId = project.id;
      workbench.agent.activeChatId = chat.id;
      saveWorkbench();
      renderAgentPanel();
    });
  });

  document.querySelectorAll('#agentPanel [data-proj-rename]').forEach((btn) => {
    btn.addEventListener('click', () => openRenameModal(btn.dataset.projRename, 'agent-project'));
  });
  document.querySelectorAll('#agentPanel [data-chat-rename]').forEach((btn) => {
    btn.addEventListener('click', () => openRenameModal(btn.dataset.chatRename, 'agent-chat'));
  });
  document.querySelectorAll('#agentPanel [data-proj-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const project = workbench.agent.projects.find((pr) => pr.id === btn.dataset.projDel);
      if (!project) return;
      if (!window.confirm(i18n.t('agentProjectDeleteConfirm') || 'Delete this project and all its chats?')) return;
      workbench.agent.projects = workbench.agent.projects.filter((pr) => pr.id !== project.id);
      workbench.agent.activeProjectId = null;
      workbench.agent.activeChatId = null;
      saveWorkbench();
      renderAgentPanel();
    });
  });
  document.querySelectorAll('#agentPanel [data-chat-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const project = getActiveProject();
      if (!window.confirm(i18n.t('agentChatDeleteConfirm') || 'Delete this chat?')) return;
      project.chats = project.chats.filter((c) => c.id !== btn.dataset.chatDel);
      workbench.agent.activeChatId = project.chats.length ? project.chats[0].id : null;
      saveWorkbench();
      renderAgentPanel();
    });
  });

  document.getElementById('agentLoginBadge').addEventListener('click', () => {
    if (window.authState?.isLoggedIn) window.openUserProfile?.();
    else window.openGoogleSignInModal?.();
  });

  const sendBtn = document.getElementById('agentSend');
  const input = document.getElementById('agentInput');
  const attachBtn = document.getElementById('agentAttach');
  const fileInput = document.getElementById('agentFileInput');

  attachBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files || []).slice(0, AGENT_IMAGE_MAX - agentPendingImages.length);
    files.forEach((f) => compressImage(f).then((url) => {
      agentPendingImages.push(url);
      saveWorkbench();
      renderAgentPanel();
    }).catch(() => window.showNotification?.(i18n.t('agentImageFailed') || '图片处理失败', 'error')));
    fileInput.value = '';
  });

  input.addEventListener('paste', (e) => {
    const items = Array.from(e.clipboardData?.items || []).filter((it) => it.type && it.type.startsWith('image/'));
    if (!items.length) return;
    e.preventDefault();
    items.slice(0, AGENT_IMAGE_MAX - agentPendingImages.length).forEach((it) => {
      const file = it.getAsFile();
      if (file) compressImage(file).then((url) => {
        agentPendingImages.push(url);
        saveWorkbench();
        renderAgentPanel();
      }).catch(() => {});
    });
  });

  document.querySelectorAll('#agentPanel [data-remove-image]').forEach((btn) => {
    btn.addEventListener('click', () => {
      agentPendingImages.splice(Number(btn.dataset.removeImage), 1);
      renderAgentPanel();
    });
  });

  const doSend = () => sendAgentMessage();
  sendBtn.addEventListener('click', doSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  });

  document.querySelectorAll('#agentPanel [data-copy-msg]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.dataset.copyMsg || '';
      navigator.clipboard?.writeText(content).then(() => {
        window.showNotification?.(i18n.t('agentCopied') || '已复制', 'success');
      }).catch(() => {});
    });
  });
  document.querySelectorAll('#agentPanel [data-regen]').forEach((btn) => {
    btn.addEventListener('click', regenerateAgentReply);
  });

  if (!model.vision && agentPendingImages.length) {
    window.showNotification?.(i18n.t('agentVisionNotSupported') || '当前模型不支持图片', 'warning');
  }
}

function showLoginRequiredForAgent() {
  if (window.showNotification) {
    window.showNotification(
      (i18n.currentLocale === 'zh' ? '请先登录后再使用 Agent' : 'Please log in before using Agent'),
      'warning'
    );
  }
  window.openGoogleSignInModal?.();
}

function formatAgentTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function messageTextContent(m) {
  if (typeof m.content === 'string') return m.content;
  if (Array.isArray(m.content)) {
    return m.content.map((p) => (p && p.type === 'text' ? p.text : '')).join(' ');
  }
  return String(m.content || '');
}

function renderAgentMessages(autoScroll) {
  const container = document.getElementById('agentMessages');
  if (!container) return;
  const chat = getActiveChat();

  if (!chat.messages.length) {
    container.innerHTML = '<div class="agent-placeholder">' +
      (i18n.t('agentWelcome') || '选择一个模型提供商，登录后即可开始对话。\n消息将按「项目 → 对话」归档。') +
      '</div>';
    return;
  }

  container.innerHTML = chat.messages.map((m, idx) => {
    const isLast = idx === chat.messages.length - 1;
    const text = messageTextContent(m);
    const images = Array.isArray(m.content)
      ? m.content.filter((p) => p && p.type === 'image_url' && p.image_url?.url).map((p) => p.image_url.url)
      : [];
    const imgHtml = images.length
      ? '<div class="agent-msg-images">' + images.map((u) => '<img src="' + u + '" alt="">').join('') + '</div>'
      : '';
    const actions = (m.role === 'assistant' && isLast && !agentIsStreaming)
      ? '<span class="agent-msg-actions">' +
        '<button class="agent-mini-btn" data-regen title="' + (i18n.t('agentRegenerate') || '重新生成') + '">⟳</button>' +
        '<button class="agent-mini-btn" data-copy-msg="' + escapeHtml(text) + '" title="' + (i18n.t('agentCopy') || '复制') + '">⧉</button>' +
        '</span>'
      : '';
    const time = '<span class="agent-msg-time">' + formatAgentTime(m.ts) + '</span>';
    return '<div class="agent-msg ' + m.role + '">' + imgHtml + escapeHtml(text) +
      '<span class="agent-msg-foot">' + time + actions + '</span></div>';
  }).join('');

  if (autoScroll !== false) container.scrollTop = container.scrollHeight;
}

function apiMessages(chat) {
  return chat.messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => {
      if (typeof m.content === 'string') return { role: m.role, content: m.content };
      if (Array.isArray(m.content)) return { role: m.role, content: m.content };
      return { role: m.role, content: String(m.content || '') };
    })
    .slice(-40);
}

async function consumeAgentStream(res, onDelta) {
  let buffer = '';
  let failed = null;

  const processChunk = async (chunkText) => {
    buffer += chunkText;
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith('data:')) continue;
      const payload = t.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const obj = JSON.parse(payload);
        if (obj.error) { failed = obj.error; return; }
        if (typeof obj.delta === 'string' && obj.delta) onDelta(obj.delta);
      } catch (_err) { /* partial line */ }
    }
  };

  if (res.body && typeof res.body.getReader === 'function') {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (value) await processChunk(decoder.decode(value, { stream: true }));
      if (done) break;
    }
    if (buffer) await processChunk(decoder.decode());
  } else {
    await processChunk(await res.text());
  }
  return { ok: !failed, error: failed };
}

function buildUserContent(text, images) {
  if (!images.length) return text;
  const parts = [{ type: 'text', text }];
  images.forEach((url) => parts.push({ type: 'image_url', image_url: { url } }));
  return parts;
}

async function sendAgentMessage() {
  if (agentIsStreaming) return;
  if (!window.authState?.isLoggedIn) {
    showLoginRequiredForAgent();
    return;
  }
  const input = document.getElementById('agentInput');
  const text = (input && input.value.trim()) || '';
  const images = agentPendingImages.slice();
  if (!text && !images.length) return;

  const model = currentAgentModel();
  const useImages = images.length && model.vision;
  if (images.length && !model.vision) {
    window.showNotification?.(i18n.t('agentVisionNotSupported') || '当前模型不支持图片', 'warning');
  }

  const chat = getActiveChat();
  chat.messages.push({ role: 'user', content: buildUserContent(text, useImages ? images : []), ts: Date.now() });
  if (input) input.value = '';
  agentPendingImages = [];
  if (chat.title === '新对话') {
    const firstText = text || (i18n.t('agentImageMessage') || '图片消息');
    chat.title = firstText.length > 16 ? firstText.slice(0, 16) + '…' : firstText;
  }
  chat.updatedAt = Date.now();
  if (chat.messages.length > 100) chat.messages = chat.messages.slice(-100);
  saveWorkbench();
  renderAgentPanel();

  const assistantMsg = { role: 'assistant', content: '', ts: Date.now() };
  chat.messages.push(assistantMsg);
  agentIsStreaming = true;
  renderAgentMessages();

  try {
    const res = await fetch(window.AGENT_API_URL || '/api/agent-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: workbench.agent.provider,
        model: workbench.agent.model,
        messages: apiMessages(chat),
        stream: true
      })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || ('HTTP ' + res.status));
    }
    const result = await consumeAgentStream(res, (delta) => {
      assistantMsg.content += delta;
      chat.updatedAt = Date.now();
      renderAgentMessages(true);
    });
    if (!result.ok) throw new Error(result.error);
    if (!assistantMsg.content.trim()) assistantMsg.content = '…';
  } catch (err) {
    assistantMsg.role = 'error';
    assistantMsg.content = String(err?.message || err);
  }
  agentIsStreaming = false;
  chat.updatedAt = Date.now();
  saveWorkbench();
  renderAgentPanel();
}

async function regenerateAgentReply() {
  if (agentIsStreaming) return;
  const chat = getActiveChat();
  const lastUserIdx = chat.messages.map((m) => m.role).lastIndexOf('user');
  if (lastUserIdx === -1) return;
  const lastUserMsg = chat.messages[lastUserIdx];
  chat.messages = chat.messages.slice(0, lastUserIdx + 1);
  saveWorkbench();
  renderAgentPanel();

  const text = messageTextContent(lastUserMsg);
  const images = Array.isArray(lastUserMsg.content)
    ? lastUserMsg.content.filter((p) => p && p.type === 'image_url' && p.image_url?.url).map((p) => p.image_url.url)
    : [];
  if (text && document.getElementById('agentInput')) document.getElementById('agentInput').value = text;
  agentPendingImages = images;
  renderAgentPanel();
  await sendAgentMessage();
}

function compressImage(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const dim = maxDim || 768;
    const q = quality == null ? 0.7 : quality;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const scale = Math.min(1, dim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', q));
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image load failed')); };
    img.src = url;
  });
}

window.applyRemoteWorkbench = function (remote) {
  if (!remote || typeof remote !== 'object') return;
  try {
    const base = defaultWorkbench();
    workbench = {
      ...base,
      ...remote,
      agent: { ...base.agent, ...(remote.agent || {}) }
    };
    window.workbench = workbench;
    agentPendingImages = [];
    saveWorkbench();
    renderWorkbench();
  } catch (_err) { /* best effort */ }
};

window.getWorkbench = function () {
  return workbench;
};

window.initWorkbench = initWorkbench;
window.renderWorkbench = renderWorkbench;
window.openPluginEditor = openPluginEditor;
window.openPluginPicker = openPluginPicker;
window.closePluginModal = closePluginModal;
window.sendAgentMessage = sendAgentMessage;
window.regenerateAgentReply = regenerateAgentReply;
window.scrollToWorkbenchScreen = scrollToWorkbenchScreen;
window.scrollToHomeScreen = scrollToHomeScreen;
window.AGENT_PROVIDERS = AGENT_PROVIDERS;
window.workbench = workbench;

// ===== Initialize =====
setupManagedOverlayActionBindings();
window.hydrateCachedConfigFromLastUser?.();
// Try to remove Chrome's built-in 'Customize this page' button (best effort)
try {
  const cb = document.getElementById('customize-button') || document.querySelector('customize-button');
  if (cb) cb.remove();
} catch (_err) { /* ignore */ }
applyZoomLevel(state.zoomLevel, false);
setupPager();
window.initWorkbench?.();
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
