exports.user = {};

exports.test = function(){
    console.log("test just fine");
}

var io;
var world;

exports.setup = function(data){
    io = data.io;
    world = data.world;
    
    io.on('connection', function(socket) {
        
        console.log('a user connected');
        world.newPlayer(socket.id);
        
        socket.emit("join",{
            id: socket.id
        });
        
        exports.user[socket.id] = {
            id: socket.id
        }
        
        
        socket.on('disconnect',function(){
            console.log("user disconnected");
            world.delPlayer(socket.id);
        });
        
        socket.on('update', function(data){
            world.updPlayer(socket.id, data);
        });
        
        socket.on('message', function(data){
            console.log(data.text);
        });
        
    });
    
    setInterval(world.update, 14);
}

exports.continueDataStream = function(tag, data, millisec){
    setInterval(function(){
        io.emit(tag, data);
    }, millisec)
}