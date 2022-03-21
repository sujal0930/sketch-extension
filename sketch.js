const history = []
var clicks = 0;

function setup() {
    document.body.style['userSelect'] = 'none';
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
    let c = createCanvas(windowWidth, windowHeight);
    c.style("pointer-events", "none");
    c.style("z-index", 1000000000000000);
    c.position(0, 0);

    chrome.runtime.onMessage.addListener(
        function (request) {
            if (request["action"] === "clear") {
                clicks += 1;
                console.log("clear", clicks);
                clear();
                return true;
                // history=[];
            }
            if (request["action"] === "color") {
                col = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
                return true;
            }
            if (request["action"] === "restore") {
                for (ele of history) {
                    stroke(ele.rgb.r, ele.rgb.g, ele.rgb.b);
                    line(ele.x, ele.y, ele.px, ele.py);
                }
                history.length = 0;
                return true;
            }
            if (request["action"] === "save") {
                chrome.runtime.sendMessage({
                    action: "save", data: history, function(response) {
                        console.log("response:", response);
                    }
                });
                return true;
            }
        }
    );
}

col = [110, 110, 110];
function draw() {
    // var ispressed;
    // if (typeof (ispressed) === 'undefined') {
    //     ispressed = true;
    //     try {
            
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    stroke(col[0], col[1], col[2]);
    strokeWeight(3);
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
        history.push({
            x: mouseX,
            y: mouseY,
            px: pmouseX,
            py: pmouseY,
            rgb: {
                r: col[0],
                g: col[1],
                b: col[2]
            }
        });
    }

}
