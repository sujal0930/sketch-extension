chrome.browserAction.onClicked.addListener((tab) => {
    console.log(tab);
    clickMsg = {
        txt : "Hello msg from background script."
    }
    chrome.tabs.sendMessage(tab.id,clickMsg);
})
