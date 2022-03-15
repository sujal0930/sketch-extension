
function setup(){
    document.body.style['userSelect'] = 'none';
    // console.log("setup");
    windowHeight= document.body.clientHeight;
    windowWidth = document.body.clientWidth;
    let c = createCanvas(windowWidth, windowHeight);
    c.style("pointer-events", "none");
    c.position(0,0);    
}

col=[110,110,110];
function draw(){    
    chrome.runtime.onMessage.addListener(
        function(request,sender,snedResponse){
            if(request["action"] === "clear"){
                clear();
            }
            if(request["action"] === "color"){
                col=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
            }
        }
    );
    // console.log("draw");
    stroke(col[0],col[1],col[2]);
    strokeWeight(3);
    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

}
