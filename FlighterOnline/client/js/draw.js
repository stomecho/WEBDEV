var data;
var local = {
    entity: {
        text: [],
    }
}
var scale = 1.2;

var Shapes = {
    Player: [[0.0,-0.95],[0.17,-0.8],[0.17,-0.17],[0.8,0.2],[0.85,0.43],[0.17,0.3],[0.17,0.8],[0.4,0.95],[0.4,1.0],[0.0,0.94],[-0.4,1.0],[-0.4,0.95],[-0.17,0.8],[-0.17,0.3],[-0.85,0.43],[-0.8,0.2],[-0.17,-0.17],[-0.17,-0.8]]
}

function draw() {
    smoothUpdate();
    update();
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.translate(canvas.width*0.5,canvas.height*0.5);
    ctx.scale(scale,scale);
    ctx.translate(-data.entitys.players[id].pos.x,-data.entitys.players[id].pos.y);
        
    draw_entity( data.entitys.players, draw_Player);
    draw_entity( data.entitys.enemys, draw_enemy);
    draw_entity( local.entity.text, draw_floatText);
    
    ctx.restore();
}



function draw_enemy(enemy){
    ctx.rotate(Math.PI*0.5);
    ctx.beginPath();
    var s = 10;
    for(var i in Shapes.Player){
        ctx.lineTo(Shapes.Player[i][0]*s, 
                   Shapes.Player[i][1]*s);
    }
    ctx.stroke();
    return {};
}

function draw_Player(player){
    ctx.rotate(Math.PI*0.5);
    ctx.beginPath();
    var s = 10;
    for(var i in Shapes.Player){
        ctx.lineTo(Shapes.Player[i][0]*s, 
                   Shapes.Player[i][1]*s);
    }
    ctx.fill();
    return {};
}

function draw_floatText(text){
    ctx.fillText(text.text, 0, 0);
    if(text.time--<=0) return {remove: true};
    return {};
}



function draw_entity(entity, method, remove){
    for(var i in entity) {
        ctx.save();
        
        if(entity[i].pos != null) ctx.translate(entity[i].pos.x, entity[i].pos.y);
        if(entity[i].rotate != null) ctx.rotate(entity[i].rotate);
        
        var r = method(entity[i]);
        ctx.restore();
        if(r.remove == true) delete entity[i];
    }
}