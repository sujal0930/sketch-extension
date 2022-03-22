dataFile = require('./JSON/data.json');
curr = {
    "wef":{
        "name":"yash thakre",
        "age":18
    }
}
// append curr in dataFile
console.log(dataFile);
dataFile.push(curr);
console.log(dataFile);