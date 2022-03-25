// onclick function for sending message for clearing screen.
userinput = document.getElementById("clear").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "clear"});
    });
}
// onclick function sending message for changing color.
colorchange = document.getElementById("color").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "color"});
    });
}

// onclick function to send message for restoring the canvas.
restore = document.getElementById("restore").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "restore"});
    });
}

// onclick function for sending message for saving the canvas.
save = document.getElementById("save").onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "save"});
    });
}


// checkng if the user is active by getting value from local storage.
// and reverting if the values are dofferent.
var checkbox = document.querySelector("input[name=checkbox]");
chrome.storage.sync.get(['activeState'], function(result) {
    if (result.activeState == true) {
        checkbox.checked = true;
    }
    else {
        checkbox.checked = false;
    }
}); 
// eventlistener for switch toggling  and for sending message for checking if the user is active.
checkbox.addEventListener('change', function() {
    if (this.checked) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "isWorking"});
    });
} else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "notWorking"});
      });
  }
});

