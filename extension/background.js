// ===== NewTab Extension Background Service Worker =====
// Handles toolbar icon click: opens a new tab (which shows the extension's newtab page)

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({});
});
