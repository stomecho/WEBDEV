var startX, startY;

function touchStart(event) {
    fullScreen();
    
    event.preventDefault();
    if (!event.touches.length) return;
    
    var touch = event.touches[0];
    getMouseCursor(touch);
    mouse.pressed = true;
}

function touchMove(event) {
    event.preventDefault();
    if (!event.touches.length) return;
    
    var touch = event.touches[0];
    getMouseCursor(touch);
}

function touchEnd(event) {
    mouse.pressed = false;
}