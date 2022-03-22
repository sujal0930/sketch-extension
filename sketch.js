const history = []

var url_key = window.location.href;
// console.log();
// console.log(url_key)

function setup() {
    document.body.style['userSelect'] = 'none';
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
    let c = createCanvas(windowWidth, windowHeight);
    init_color = [110, 110, 110];
    c.style("z-index", 1000000000000000);
    c.style("pointer-events", "none");
    c.position(0, 0);


    chrome.runtime.onMessage.addListener(
        function (request, sender, snedResponse) {
            if (request["action"] === "clear") {
                // console.log("clear");
                clear();
                // chrome.storage.sync.clear();
                }
            if (request["action"] === "color") {
                init_color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            }
            if (request["action"] === "restore") {
                chrome.storage.sync.get(`${url_key}`, function (result) {
                    // console.log(result);
                    if (result[url_key] != undefined) {
                        // console.log(result);
                        temp = result[url_key];
                        for (ele of temp) {
                            
                            stroke(ele.rgb.r, ele.rgb.g, ele.rgb.b);
                            line(ele.x, ele.y, ele.px, ele.py);
                        }
                    }
                    else{
                        console.log("No history");
                    }

                });
            }
            if (request["action"] === "save") {
                // console.log("Ye set hora",url_key)
                    // chrome.storage.sync.clear();
                    chrome.storage.sync.set({[url_key]: history}, function () {
                    //    console.log("saved");
                    });
                }
            });
}

function draw() {
  
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
