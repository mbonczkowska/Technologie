﻿var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	less = require('less-middleware'),
	mongoose = require('mongoose'),
	nicknames = [],
	count = 1;

server.listen(3000);

mongoose.connect("mongodb://localhost/schronisko", function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Połączenie z MongoDB");
    }
});

var paskiSchema = mongoose.Schema({
    szer: String,
    idZwierzaka: String,
    created: { type: Date, default: Date.now }
});

var paskiZabawySchema = mongoose.Schema({
    szer: String,
    idZwierzaka: String,
    created: { type: Date, default: Date.now }
});

var Paski = mongoose.model('Width', paskiSchema);
var PaskiZabawy = mongoose.model('WidthPlay', paskiZabawySchema);
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
io.sockets.on('connection', function (socket) {
    Paski.find({}, function (err, docs) {
        if (err) throw err;
        console.log('Wysyłanie starych pasków');
        socket.emit('zaladuj stare paski', docs);
    });
	PaskiZabawy.find({}, function (err, docs) {
        if (err) throw err;
        console.log('Wysyłanie starych pasków zabawy');
        socket.emit('zaladuj stare paski zabawy', docs);
    });
    socket.on('new user', function (data, callback) {
        if (nicknames.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
            console.log(nicknames);
            socket.emit('usernames', socket.nickname);

        }
    });
    socket.on('event j', function (data) {
        var newWidth = new Paski(data);
        newWidth.save(function (err) {
            if (err) throw err;
            console.log(data);
            io.sockets.emit("change width j", data);
        });

    });
    socket.on('event z', function (data) {
		var newWidth = new PaskiZabawy(data);
        newWidth.save(function (err) {
            if (err) throw err;
			//console.log(data);
			io.sockets.emit("change width z", data);
		});
    });
    socket.on('message', function (data) {
        io.sockets.emit("change message", data);
    });

    socket.on('updateWidth', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function (data) {
        if (!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);

    });
});
