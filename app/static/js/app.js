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

    // socket.on('my_epoch', function(msg, cb) {
    //     $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count +'/'+ msg.epoch + ': ' + msg.data).html());
    //     if (cb)
    //         cb();
    // });

    $('form#start').submit(function(event) {
        socket.emit('start', {epoch: $('#epoch').val(), func: $('#function').val()});
        return false;
    });
    $('form#Reset').submit(function(event) {
        resetData()
        return false;
    });
    $('form#disconnect').submit(function(event) {
        socket.emit('disconnect_request');
        return false;
    });

    const ctx = document.getElementById("myChart").getContext("2d");

    const myChart = new Chart(ctx, {
        type: "line",
        data: {
        datasets: [{ label: "func",  }],
        },
        options: {
        borderWidth: 3,
        borderColor: ['rgba(255, 99, 132, 1)',],
        },
    });

    function addData(label, data) {
        myChart.data.labels.push(label);
        myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        });
        myChart.update();
    }

    function resetData() {
        myChart.data.labels = []
        myChart.data.datasets[0]['data'] = []
        myChart.update();
    }

    // function removeFirstData() {
    //     myChart.data.labels.splice(0, 1);
    //     myChart.data.datasets.forEach((dataset) => {
    //     dataset.data.shift();
    //     });
    // }

    socket.on("my_epoch", function (msg) {
        console.log("Received sensorData :: " + msg.count + " :: " + msg.data);
        $('#log').append('<br>' + $('<div/>').text("Received sensorData :: " + msg.count + " :: " + msg.data).html());
        // Show only MAX_DATA_COUNT data
        // if (myChart.data.labels.length > MAX_DATA_COUNT) {
        //   removeFirstData();
        // }
        addData(msg.count, msg.data);
    });

});