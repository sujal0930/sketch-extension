isActive = false;
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request["action"] === "clear") {
            // clear();
            clearScreen();
        }
        if (request["action"] === "color") {
            changeColor();
        }
        if (request["action"] === "restore") {

            restoreState();
        }
        if (request["action"] === "save") {

            saveState();
        }
        if (request["action"] === "isWorking") {
            isActive = true;
            console.log(isActive);
        }
        if (request["action"] === "notWorking") {
            isActive = false;
            console.log(isActive);
        }
    });

let c;
// Array for local storage.
const history = []
// url for storing in key value pair.
var url_key = window.location.href;


function clearScreen() {
    clear();
}

function changeColor() {
    init_color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}

function restoreState() {
    chrome.storage.sync.get(`${url_key}`, function (result) {

        if (result[url_key] != undefined) {

            temp = result[url_key];

            for (ele of temp) {
                stroke(ele.rgb.r, ele.rgb.g, ele.rgb.b);
                line(ele.x, ele.y, ele.px, ele.py);
            }
        }
        else {
            alert("No history");
        }

    });
}

function saveState() {
    chrome.storage.sync.set({ [url_key]: history });
}


function setup() {

    document.body.style['userSelect'] = 'none';
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
    c = createCanvas(windowWidth, windowHeight);


    init_color = [110, 110, 110];
    c.style("z-index", 100);
    c.style("pointer-events", "none");
    c.position(0, 0);
}
function draw() {
    if (isActive) {
        stroke(init_color[0], init_color[1], init_color[2]);
        strokeWeight(3);
        if (mouseIsPressed) {
            line(mouseX, mouseY, pmouseX, pmouseY);
            history.push({
                x: mouseX,
                y: mouseY,
                px: pmouseX,
                py: pmouseY,
                rgb: {
                    r: init_color[0],
                    g: init_color[1],
                    b: init_color[2]
                }
            });
        }

    }
}