function update(){
    if(mouse.pressed){
        flighter.pos.x+=mouse.dx;
        flighter.pos.y+=mouse.dy;
        flighter.rotate = mouse.rotate;
    }
}