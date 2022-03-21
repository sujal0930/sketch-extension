// dataFile = require('./JSON/data.json');
// curr = {
//     "twww":{
//         "name":"yash thakre",
//         "age":18
//     }
// }
// append curr in dataFile
// console.log(dataFile);
// dataFile.push(curr);
// console.log(dataFile);
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        console.log(request.object);
        fetch('./JSON/data.json')
            .then((response) => response.json()) // file contains json
            .then((json) => console.log(json));
        sendResponse({farewell: "updated" });
    });