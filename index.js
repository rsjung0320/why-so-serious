// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));

// // app.get('/', function(request, response) {
// //   response.send('MJ_____Hello World!   123123123');
// // });

// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'));
// });


// 모듈을 추출합니다.
var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

// 변수를 선언합니다.
var seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

// 웹 서버를 생성합니다.
var app = express();

// 미들웨어를 설정합니다.
// app.use(app.router);

// app.set('port', (process.env.PORT || 5000));
// // // app.use(express.static(__dirname + '/public'));

// var server = app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'));
// });

// // 라우트를 수행합니다.
app.get('/', function (request, response, next) {
    fs.readFile('index.html', function (error, data) {
        response.send(data.toString());
    });
});

app.get('/seats', function (request, response, next) {
    response.send(seats);
});

// // 웹 서버를 실행합니다.
var server = http.createServer(app)
server.listen(5000, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});

// 소켓 서버를 생성 및 실행합니다.
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('reserve', function (data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('reserve', data);
    });
});