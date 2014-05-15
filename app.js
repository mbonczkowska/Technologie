var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	less = require('less-middleware'),
	nicknames = [],
	count =1;
	
server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/pages/index.html');
	app.use(express.static(__dirname + '/bower_components')); // deklaracja css/bootstrap
	app.use(express.static(__dirname + '/pages'));
});

app.use(less({
    src: '/pages/less',
    dest: '/pages/css',
    prefix: '/css',
    compress: true
}));
io.sockets.on('connection',function(socket){
	socket.on('new user',function(data,callback){
		if(nicknames.indexOf(data) != -1){
			callback(false);
		}else{
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			console.log(nicknames);
			socket.emit('usernames',socket.nickname);

		}
	});
	socket.on('event j', function (data) {
	console.log(data);
	io.sockets.emit("change width j", data);
	});
	socket.on('event z', function (data) {
	console.log(data);
	io.sockets.emit("change width z", data);
	});
	socket.on('updateWidth', function (data) {
		console.log(data);
	});
	
	socket.on('jedzeniee', function (data) {
	io.sockets.emit("update", { currentWidth: data });
	});
	var dataPusher = setInterval(function () {
	socket.on('data', function (data) {
		console.log(data);
	});
	 }, 1000);
	/*socket.on('more food', function (data) {
		data+=2;
		io.sockets.emit('evol',data);
	});*/
	socket.on('event',function(data){
		//data+=2;
		io.sockets.emit('evol',data);
	});
	socket.on('powieksz',function(data){
		count=0;
		data+=2;
		//count++;
		console.log(count);
		io.sockets.emit('noo',{count:count,id:data});
	});
	 socket.on('my other event', function (data) {
			console.log(data);
			io.sockets.emit('ev',data);
	});/*
	socket.on('change',function(data){
		data+=20;
		io.sockets.emit('onchanges',data);
	});*/
	socket.on('disconnect',function(data){
		 if (!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
	
	});
});
