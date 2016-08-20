exports.data = {
    entitys: {
        players: {},
        enemys: {},
        items: {}
    }
}

var maxEnemy = 10;
var enemyNow = 0;


var players = exports.data.entitys.players;
var enemys = exports.data.entitys.enemys;

var Entity = function() {
    var base = {
        pos: {
            x: 0,
            y: 0
        },
        rotate: 0,
        style: Math.floor(Math.random() * 10),
    }
    
    return {
        Player: function(){
            return base;
        },
        Enemy: function(x, y, target, tick){
            base.pos.x=x;
            base.pos.y=y;
            base.pos.dx=0;
            base.pos.dy=0;
            base.target = target;
            base.time = tick;
            return base;
        }
    }
}

exports.updPlayer = function(id, data) {
    players[id].pos = data.flighter.pos;
    players[id].rotate = data.flighter.rotate;
}

exports.getData = function() {
    return exports.data;
}
exports.newPlayer = function(id) {
    players[id] = Entity().Player();
}
exports.delPlayer = function(id) {
    delete exports.data.entitys.players[id];
}

var t = 0;

exports.update = function(){
    
    if(t>500){
        if(random(0,1)<1)
        for(var i in players){
            var player = players[i];
            var angle = Math.random(0, Math.PI*2);
            enemys[enemyNow] = Entity().Enemy(
                player.pos.x + Math.cos(angle)*1000,
                player.pos.y + Math.sin(angle)*1000,
                player,
                random(5000,6000)
            );
            enemyNow = (enemyNow+1)%maxEnemy;
        }
        t = 0;
    }
    
    
    for(var i in enemys){
        var enemy = enemys[i];
        var n = normal(enemy.target.pos.x - enemy.pos.x ,enemy.target.pos.y - enemy.pos.y);
        
        
        
        enemy.pos.dx += n[0];
        enemy.pos.dy += n[1];
        enemy.rotate = Math.atan2(enemy.pos.dy, enemy.pos.dx);
        var v = normal(enemy.pos.dx, enemy.pos.dy);
        enemy.pos.x+=v[0];
        enemy.pos.y+=v[1];
        
        enemy.pos.dx*=0.99;
        enemy.pos.dy*=0.99;
        
        if(enemy.time -- <0) delete exports.data.entitys.enemys[i];
    }
    
    t++;
}

function random(s, e){
    return Math.random()*(s-e)+s;
}

function normal(x, y){
    var d = Math.sqrt(x*x+y*y);
    if(d==0) return [0,0];
    return [x/d, y/d];
}
