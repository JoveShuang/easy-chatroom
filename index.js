const { isObject } = require('util');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var userNum = 0;

app.get('/', (req, res) => {
    res.sendFile('/usr/local/nginx/html/chatroom/easy-chatroom/index.html');
});

io.on('connection', socket => {
    userNum += 1;
    let userName = "user " + userNum;

    io.emit('login', userName + 'login');
    io.emit('logout', userName + 'logout');

    socket.broadcast.emit('hi');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        io.emit('chat message', userName + '：' + msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
