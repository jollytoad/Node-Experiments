$(function() {
    var socket = io.connect('http://localhost:8081');

    socket.on('msg', function (data) {
        console.log(data);
        $("<li/>").text(data).appendTo("#in");
    });

    $("#form").bind("submit", function(event) {
        var msg = $("#msg").val() + "\r\n";
        socket.emit('msg', msg);
        $("<li/>").text(msg).appendTo("#out");
        $("#msg").focus().val("");
        return false;
    });
});

