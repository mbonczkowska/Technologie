var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	less = require('less-middleware'),
	mongoose = require('mongoose'),
	nicknames = [],
    wejsc = 0;



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
	komunikat: String,
    created: { type: Date, default: Date.now }
});

var paskiZabawySchema = mongoose.Schema({
    szer: String,
    idZwierzaka: String,
	komunikat: String,
    created: { type: Date, default: Date.now }
});
var adopcjeSchema = mongoose.Schema({
    wybrany: String,
    telefon: String,
    imie: String,
    nazwisko: String,
    email: String
});

var Paski = mongoose.model('Width', paskiSchema);
var PaskiZabawy = mongoose.model('WidthPlay', paskiZabawySchema);
var Adopcje = mongoose.model('Adoption', adopcjeSchema);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/pages/index.html');
    app.use(express.static(__dirname + '/bower_components')); // deklaracja css/bootstrap
    app.use(express.static(__dirname + '/pages'));
});

app.use(less({
    src: __dirname + "/pages/less",
    dest: __dirname + "/pages/css",
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
    socket.on('wyslij jedzenie',function(){
        Paski.find({}, function (err, docs) {
            if (err) throw err;
            console.log('Wysyłanie starych pasków');
            socket.emit('zaladuj stare paski', docs);
        });
    });
    socket.on('wyslij zabawy',function(){
    PaskiZabawy.find({}, function (err, docs) {
        if (err) throw err;
        console.log('Wysyłanie starych pasków zabawy');
        socket.emit('zaladuj stare paski zabawy', docs);
    });
    });
    socket.on('adopcje',function(){
    Adopcje.find({}, function (err, docs) {
        if (err) throw err;

        socket.emit('zaladuj stare adopcje', docs);
    });
    });

    socket.on('zgloszenie do adopcji', function (data) {
        var newWidth = new Adopcje(data);
        newWidth.save(function (err) {
            if (err) throw err;
            io.sockets.emit("zgloszenia", data);
        });
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

  /*  socket.on('event j start', function (data) {

        if(wejsc === 1) {
            var newWidth = new Paski(data);
            newWidth.save(function (err) {
                if (err) throw err;
                socket.emit("change width j", data);
            });

        }
    });
    socket.on('event z start', function (data) {
        if(wejsc === 1) {
            var newWidth = new PaskiZabawy(data);
            newWidth.save(function (err) {
                if (err) throw err;
                socket.emit("change width z", data);
            });
        }

    });*/
    socket.on('event j', function (data) {
        var newWidth = new Paski(data);
        newWidth.save(function (err) {
            if (err) throw err;

            io.sockets.emit("change width j", data);
        });

    });
    socket.on('event z', function (data) {
		var newWidth = new PaskiZabawy(data);
        newWidth.save(function (err) {
            if (err) throw err;

			io.sockets.emit("change width z", data);
		});
    });
	socket.on('usun jedzenie', function (data) {
		var query = Paski.update({ _id: data},{$unset:{komunikat:""}});
		query.exec();		
    });
	socket.on('usun zabawe', function (data){ 
		var query = PaskiZabawy.update({ _id: data},{$unset:{komunikat:""}});
		query.exec();		
    });
	 socket.on('send message j', function (data) {
        io.sockets.emit("change message j", data);
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
    wejsc+=1;
    console.log(wejsc);
});

