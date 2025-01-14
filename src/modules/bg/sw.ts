console.log('BG script is running!');

chrome.commands.onCommand.addListener((shortcut) => {
  console.log(shortcut);
  if (shortcut === "reload-extension") {
    console.log("Reloading...");
	chrome.runtime.reload();
  }
});

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        chrome.tabs.create({ url: 'install.html' });
    } else if (details.reason === 'update') {
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
        chrome.storage.local.set({ popupOpened: false });
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'popupOpened') {
        chrome.action.setBadgeText({ text: '' });
        chrome.storage.local.set({ popupOpened: true });
    }
});

function sendMessageToContentScript(tabId: number, message: any) {
  chrome.tabs.sendMessage(tabId, message);
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.type === "vken_access_token") {
        chrome.storage.local.set({
            vkenAccessToken: message.value
        });
    }
    if (message.type === "vken_access_token_remove") {
        chrome.storage.local.set({
            vkenAccessToken: ''
        });
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0) {
            const activeTabId = tabs[0].id;
            if (activeTabId !== undefined) {
                sendMessageToContentScript(activeTabId, message);
                console.log(message);
            }
        }
    });
});