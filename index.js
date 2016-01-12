var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	socket.broadcast.emit('new connection' , 'a new user has joined the room');

	socket.on('chat message', function(msg) {
		socket.broadcast.emit('chat message' , {from: msg.from, msg: msg.msg});
	});

	socket.on('is typing', function(user_name) {
		socket.broadcast.emit('is typing' , user_name);
	});

	socket.on('finished typing', function(user_name) {
		socket.broadcast.emit('finished typing' , user_name);
	});	

	socket.on('disconnect', function() {
		socket.broadcast.emit('disconnection' , "a user has left the room");

	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
