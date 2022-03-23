
userinput = document.getElementById("clear").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "clear"});
    });
}

colorchange = document.getElementById("color").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "color"});
    });
}

restore = document.getElementById("restore").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "restore"});
    });
}

save = document.getElementById("save").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "save"});
    });
}

let isWorking = document.getElementById("isWorking").checked;
if(isWorking){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "isWorking"});
    });
}


