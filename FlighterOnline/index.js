var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4321;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/client'));

var main = require('./server/main.js');
var world = require('./server/world.js');

main.test();

main.setup({
    io: io,
    world: world
});

main.continueDataStream("update", world.getData(), 30);


