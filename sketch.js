const history=[]
function setup(){
    document.body.style['userSelect'] = 'none';
    // console.log("setup");
    windowHeight= document.body.clientHeight;
    windowWidth = document.body.clientWidth;
    let c = createCanvas(windowWidth, windowHeight);
    c.style("pointer-events", "none");
    c.style("z-index", 1000000000000000);
    c.position(0,0);    
}
    
col=[110,110,110];
function draw(){    
    chrome.runtime.onMessage.addListener(
        function(request,sender,snedResponse){
            if(request["action"] === "clear"){
                clear();
                // history=[];
            }
            if(request["action"] === "color"){
                col=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
            }
            if(request["action"] === "restore"){ 
                for(ele of history){
                    stroke(ele.rgb.r,ele.rgb.g,ele.rgb.b);
                    line(ele.x,ele.y,ele.px,ele.py);
                }
            }
        }
    );
    // console.log("draw");
    stroke(col[0],col[1],col[2]);
    strokeWeight(3);
    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
        history.push({
            x:mouseX,
            y:mouseY,
            px:pmouseX,
            py:pmouseY,
            rgb:{
                r:col[0],
                g:col[1],
                b:col[2]
            }
        });
    }

}
