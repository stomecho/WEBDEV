var socket = io();
var id;

var flighter = {
    pos: {x: 0, y:0},
    rotate: 0
}

socket.on("join", function(data){
    id = data.id;
});

socket.on("update", function(wdata) {
    server_data = wdata;
});

function updateToServer() {
    socket.emit("update", {
        flighter: flighter
    });
}