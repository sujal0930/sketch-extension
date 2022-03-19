const history = []

var url_key = window.location.href;

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
}

function draw() {
   
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

                chrome.storage.sync.get('url_key', function (result) {
                    if (result.url_key) {
                        
                        temp = result.url_key;
                        
                        // console.log(temp);
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
                    chrome.storage.sync.clear();
                    chrome.storage.sync.set({'url_key': history}, function () {
                       
                    });
                }
            });
  
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
