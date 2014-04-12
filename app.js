var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
nicknames = []; // użytkownicy obecnie zalogowani


server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
	app.use(express.static(__dirname + '/bower_components')); // deklaracja css/bootstrap
	app.use(express.static(__dirname + '/pages'));
});