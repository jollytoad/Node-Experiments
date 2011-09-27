var net = require("net");
var app = require("express").createServer();
var io = require("socket.io").listen(app);

app.listen(8081);

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendfile(__dirname + '/index.html');
});

var incoming = net.createServer();

incoming.on('connection', function(socketA) {
    console.log('connection socketA');
    socketA.setEncoding('ascii');
    
    io.sockets.on('connection', function (socketB) {
        console.log('connection socketB');
    
        socketA.on('data', function(data) {
            console.log('data on socketA:', data);
            socketB.emit('msg', data);
        });

        socketB.on('msg', function(data) {
            console.log('msg on socketB:', data);
            socketA.write(data);
        });
    });

});

incoming.listen(3000);

