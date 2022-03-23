// Array for local storage.
const history = []

// url for storing in key value pair.
var url_key = window.location.href;

function setup() {
    document.body.style['userSelect'] = 'none';
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;

    let c = createCanvas(windowWidth, windowHeight);
    
    init_color = [110, 110, 110];
    c.style("z-index", 100);
    c.style("pointer-events", "none");
    c.position(0, 0);


    chrome.runtime.onMessage.addListener(
        function (request) {
            if (request["action"] === "clear") {
                clear();
            }
            if (request["action"] === "color") {
                init_color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            }
            if (request["action"] === "restore") {
                
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
            if (request["action"] === "save") {
                chrome.storage.sync.set({ [url_key]: history });
            }
        });
}

function draw() {

    stroke(init_color[0], init_color[1], init_color[2]);
    strokeWeight(3);
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
        history.push({
            x : mouseX,
            y : mouseY,
            px : pmouseX,
            py : pmouseY,
            rgb : {
                r: init_color[0],
                g: init_color[1],
                b: init_color[2]
            }
        });
    }

}
