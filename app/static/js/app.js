$(document).ready(function() {

    var socket = io();

    socket.on('connect', function() {
        socket.emit('my_event', {data: 'I\'m connected!'});
    });
    socket.on('my_response', function(msg, cb) {
        $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count + ': ' + msg.data).html());
        if (cb)
            cb();
    });

    socket.on('my_epoch', function(msg, cb) {
        $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count +'/'+ msg.epoch + ': ' + msg.data).html());
        if (cb)
            cb();
    });

    $('form#start').submit(function(event) {
        socket.emit('start', {epoch: $('#epoch').val()});
        return false;
    });
    $('form#disconnect').submit(function(event) {
        socket.emit('disconnect_request');
        return false;
    });
});