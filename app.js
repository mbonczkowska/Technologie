var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	nicknames = [];



server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/pages/index.html');
	app.use(express.static(__dirname + '/bower_components')); // deklaracja css/bootstrap
	app.use(express.static(__dirname + '/pages'));
});

io.sockets.on('connection',function(socket){
	socket.on('new user',function(data,callback){
		if(nicknames.indexOf(data) != -1){
			callback(false);
		}else{
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			console.log(nicknames);
			io.sockets.emit('usernames',nicknames);
		}
	});
});