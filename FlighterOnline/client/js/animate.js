var server_data;
function smoothUpdate() {
    if(server_data == null) return;
    if (data == null) data = server_data;
    
    //PLAYER
    smmothEntityGet(server_data.entitys.players, data.entitys.players,function(p){
        local.entity.text.push({
            pos: p.pos,
            text: "玩家離線",
            time: 100
        });
    });
    
    smmothEntityGet(server_data.entitys.enemys, data.entitys.enemys,function(p){});
}


function smooth(obj1, tag, value, k, subFunction) {
    obj1[tag] += subFunction(value , obj1[tag]) * k;
}

function smmothEntityGet(from, to, deadCall) {
    for (var i in to) 
        if(from[i]==null) {
            deadCall(to[i]);
            delete to[i];
        }
    for (var i in from) {
        if (to[i] == null) to[i] = from[i];
        smooth(to[i].pos, "x", from[i].pos.x, 0.3, sub);
        smooth(to[i].pos, "y", from[i].pos.y, 0.3, sub);
        smooth(to[i], "rotate", from[i].rotate, 0.2, subAngle);
    }
}

function sub(a1, a2){
    return a1- a2;
}
var TWO_PI = Math.PI*2;

function subAngle(a1, a2){
    var d = (a1-a2)%TWO_PI;
    
    if(d > Math.PI) d = d - TWO_PI;
    if(d < -Math.PI) d = d + TWO_PI;
    
    return d;
}