// client.js

(function() {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    var red = document.getElementById('red');
    var green = document.getElementById('green');
    var blue = document.getElementById('blue');

    var button = document.getElementById('operateButton');

    // function emitValue(color, e) {
    //     socket.emit('rgb', {
    //         color: color,
    //         value: e.target.value
    //     });
    // }

    function emitValue(device, e) {
        socket.emit('update', {
            device: device,
            value: e.target.value
        });
    }

    function start(){
        var operate = button.value;
        socket.emit('operate',{
            value: operate
        });
        button.innerHTML = 'Stop';
        button.value = 'false';
    }

    // red.addEventListener('change', emitValue.bind(null, 'red'));
    // blue.addEventListener('change', emitValue.bind(null, 'blue'));
    // green.addEventListener('change', emitValue.bind(null, 'green'));

    light.addEventListener('change', emitValue.bind(null, 'light'));
    sound.addEventListener('change', emitValue.bind(null, 'sound'));
    startHour.addEventListener('change', emitValue.bind(null, 'startHour'));
    finishHour.addEventListener('change', emitValue.bind(null, 'finishHour'));

    button.addEventListener('click', start());

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    // socket.on('rgb', function(data) {
    //     var color = data.color;
    //     document.getElementById(color).value = data.value;
    // });

    socket.on('rgb', function(data) {
        var device = data.device;
        document.getElementById(device).value = data.value;
    });

}());
