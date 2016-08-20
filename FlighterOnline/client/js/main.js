
var data;
var mouse = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    rotate: 0,
    pressed: false
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

function getMouseCursor(e) {
    mouse.dx = e.pageX - mouse.x;
    mouse.dy = e.pageY - mouse.y;
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    var k = Math.sqrt(mouse.dx*mouse.dx + mouse.dy*mouse.dy) / 20;
    if(k>1) k=1;
    var r = Math.atan2(mouse.dy, mouse.dx);
    
    mouse.rotate += subAngle(r, mouse.rotate) * k;
}

function setup() {
    resize();
    var body = document.getElementsByTagName("body")[0];
    body.onresize = resize;

    canvas.onmousemove = function(e) {
        getMouseCursor(e);
        //mouseMove(e);
    }
    canvas.onmousedown = function(e) {
        getMouseCursor(e);
        mouse.pressed = true;
        //mouseDown(e);
    }
    canvas.onmouseup = function(e) {
        getMouseCursor(e);
        mouse.pressed = false;
        //mouseUp(e);
    }

    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
    canvas.addEventListener("touchend", touchEnd, false);
    


    draw_id = setInterval(draw, 14);
    updateServer_id = setInterval(updateToServer, 30);
}


