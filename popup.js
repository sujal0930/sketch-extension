
    userinput = document.getElementById("clear").onclick = function(){
        console.log("clearCliked");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "clear"}, function(response) {
                console.log("response");
            });
        });
    }
    
    colorchange = document.getElementById("color").onclick = function(){
        console.log("colorChange");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "color"}, function(response) {
                console.log("response");
            });
        });
    }

    restore = document.getElementById("restore").onclick = function(){
        console.log("restore");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "restore"}, function(response) {
                console.log("response");
            });
        });
    }