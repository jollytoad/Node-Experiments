var net = require("net");
var app = require("express").createServer();
var io = require("socket.io").listen(app);

app.listen(8081);

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendfile(__dirname + '/index.html');
});

var incoming = net.createServer();
var backendSocket;

incoming.on('connection', function(socket) {
    console.log('backend connection');

    socket.setEncoding('ascii');

    socket.on('data', function(data) {
        console.log('data on backend socket:', data);
        io.sockets.in('everyone').emit('msg', data);
    });

    socket.on('end', function() {
        console.log('backend closed');
        backendSocket = null;
    });

    backendSocket = socket;
});

io.sockets.on('connection', function (socket) {
    console.log('frontend connection');

    socket.join('everyone');

    socket.on('msg', function(data) {
        console.log('msg on frontend socket:', data);
        backendSocket && backendSocket.write(data);
    });

});

incoming.listen(3000);

