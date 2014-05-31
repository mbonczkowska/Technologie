$(function () {
    var schronisko=[];
    $.getJSON("data/data_zwierzaki.json", function(results) {
        $.each(results, function (index, r) {
            var index2 = index.substring(7);
            schronisko[index2] ={imie: r.imie, gatunek: r.gatunek, wielkosc: r.wielkosc, waga: r.waga, szczepienia: r.szczepienia, boks: r.boks, jedzenie: r.jedzenie, zabawa: r.zabawa};

            socket.emit('event j start', { szer: 10* schronisko[index2].jedzenie + "px", idZwierzaka: index2 });
            socket.emit('event z start', { szer: 10* schronisko[index2].zabawa+"px", idZwierzaka: index2 });
        });

    });
    function dodajZdjecia() {
        $.getJSON("data/data_zdjecia.json", function (results) {
            $.each(results, function (index, r) {
                var index2 = index.substring(7);
                $("." + index2 + " div img").attr("src", r.src);
            });
        });
    }

    var zwierz = "";
    var pomoc = "";
    var tytul = "";
    var socket = io.connect();
	var prevState = "";
    setInterval(ustawCzas, 1000);
    function ustawCzas() {
        var data = new Date();
        var sec = data.getSeconds();
        var godz = data.getHours();
        var min = data.getMinutes();
        if (min === 0 && sec === 0) {
            for (var p = 0; p < schronisko.length; p += 1) {
                if (schronisko[p].jedzenie > 0) {
                    schronisko[p].jedzenie -= 1;
                    var dana = 10 * schronisko[p].jedzenie + "px";
                    socket.emit('event j', { szer: dana, idZwierzaka: p });
                    socket.on('change width j', function (data) {
                        var zmien = (parseInt(data.szer)) / 10;
                        var $nakarmij = $('.' + data.idZwierzaka + ' footer .paski .defaultBar .jedzenie');
                        $nakarmij.width(data.szer);
						 //$('.' + data.idZwierzaka + ' footer .komunikaty').html(data.komunikat);
                        schronisko[data.idZwierzaka].jedzenie = zmien;
                    });

                }
                if (schronisko[p].zabawa > 0) {
                    schronisko[p].zabawa -= 1;
                    var dana = 10 * schronisko[p].zabawa + "px";
                    socket.emit('event z', { szer: dana, idZwierzaka: p });
                    socket.on('change width z', function (data) {
                        var zmien = (parseInt(data.szer)) / 10;
                        var $zabaw = $('.' + data.idZwierzaka + ' footer .paski .defaultBar .zabawa');
                        $zabaw.width(data.szer);
                        schronisko[data.idZwierzaka].zabawa = zmien;
                    });

                }
            }
        }
    }
	 socket.on('zaladuj stare paski', function (data) {
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i]);
                  
                var zmien = (parseInt(data[i].szer)) / 10;
                var $nakarmij = $('.' + data[i].idZwierzaka + ' footer .paski .defaultBar .jedzenie');
                $nakarmij.width(data[i].szer);
				//$('.' + data.idZwierzaka + ' footer .komunikaty').html(data.komunikat);
               schronisko[data[i].idZwierzaka].jedzenie = zmien;

            }
   });
   
   socket.on('zaladuj stare paski zabawy', function (data) {
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i]);
                  
                var zmien = (parseInt(data[i].szer)) / 10;
                var $zabaw = $('.' + data[i].idZwierzaka + ' footer .paski .defaultBar .zabawa');
                $zabaw.width(data[i].szer);
               schronisko[data[i].idZwierzaka].zabawa = zmien;

            }
   });

    function title(naglowek) {
        tytul = $(naglowek).html();
        $("#top_header h2").html(tytul);
    }

    function ustaw(schronisko) {
        zwierz = "<article class=\"" + i + "\"> <header> <p>" + schronisko[i].imie + "</p> </header>" +
		"<div class=\"obr\"> <img alt=\"" + schronisko[i].imie + "\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\">  <tr> <th>Wielkość</th> <td>" + schronisko[i].wielkosc + "</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>" + schronisko[i].waga + "</td> </tr> <tr> <th>Szczepienia</th> <td>" + schronisko[i].szczepienia + "</td> </tr> <tr> <th>Boks</th>" +
		"<td>" + schronisko[i].boks + "</td> </tr>  </table> <footer><div class=\"paski\"></div> <p><a href=\"#\" class=\"btn btn-success btn-lg przygarnij\" id=\"" + schronisko[i].boks + "\">Przygarnij</a></p>" +
		"<div class=\"komunikaty\"><div class=\"msgJedzenie\"></div><br/><div class=\"msgZabawa\"></div><a href=\"#\" class=\"btn btn-danger btn-xs ukryj\">x</a></div></footer> </article>";
        //<div id=\"komunikaty\"><a href=\"#\" class=\"btn btn-danger btn-xs ukryj\">X</a></div>
        pomoc += zwierz;
        $("#articles").html(pomoc);
        dodajZdjecia();

    }

    function dodajPaski(licznik) {

        $('.paski').html("<div class=\"defaultBar\"> <div class=\"progressBar jedzenie\"></div> </div><div class=\"defaultBar\"> <div class=\"progressBar zabawa\"></div></div>"
		+ "<div class=przyciski></div>");

        for (m = 0; m <= licznik; m++) {
            $('.'+m+' footer .paski .jedzenie').width((10*schronisko[m].jedzenie) + "px");
            $('.'+m+' footer .paski .zabawa').width((10*schronisko[m].zabawa) +  "px");
            var danaj = 10 * schronisko[m].jedzenie + "px";
           // socket.emit('event j', { szer: danaj, idZwierzaka: m });
            socket.on('change width j', function (data) {
                var zmien = (parseInt(data.szer)) / 10;
                var $nakarmij = $('.' + data.idZwierzaka + ' footer .paski .defaultBar .jedzenie');
                $nakarmij.width(data.szer);				
                schronisko[data.idZwierzaka].jedzenie = zmien;           
			});
			
            var danaz = 10 * schronisko[m].zabawa + "px";
          //  socket.emit('event z', { szer: danaz, idZwierzaka: m });
            socket.on('change width z', function (data) {
                var zmien = (parseInt(data.szer)) / 10;
                var $zabaw = $('.' + data.idZwierzaka + ' footer .paski .defaultBar .zabawa');
                $zabaw.width(data.szer);
                schronisko[data.idZwierzaka].zabawa = zmien;
            });



        }

        for (var k = 0; k <= licznik; k++) {
            if (schronisko[k].gatunek === "Pies") {
                $('.' + k + ' footer .paski .przyciski').html("<a class=\"btn btn-primary btn-sm\">Kość</a>" +
                "<a  class=\"btn btn-primary btn-sm\">Sucha karma</a>" +
                "<a class=\"btn btn-primary btn-sm\">Patyk</a>" +
                "<a  class=\"btn btn-primary btn-sm\">Piłka</a>");
            }
            if (schronisko[k].gatunek === "Kot") {
                $('.' + k + ' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Karma</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Mleko</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Laser</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Mysz</a>");

            }

            if (schronisko[k].gatunek === "Królik") {
                $('.' + k + ' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Trawa</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Marchew</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Tuba</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Marchewka</a>");
            }
            if (schronisko[k].gatunek != "Pies" && schronisko[k].gatunek != "Kot" && schronisko[k].gatunek != "Królik") {
                $('.' + k + ' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Przysmak</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Smakołyk</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Zabawka</a>" +
                "<a href=\"#\" class=\"btn btn-primary btn-sm\">Inne</a>");
            }
        }
    }
    function changeFood1(komunikat) {
        var dana = 10 * schronisko[zwierz].jedzenie + "px";
        $('.' + zwierz + ' footer .komunikaty .msgJedzenie').html('');		
        socket.emit('event j', { szer: dana, idZwierzaka: zwierz, komunikat: komunikat });
        socket.on('change width j', function (data) {
            var zmien = (parseInt(data.szer)) / 10;
            var $nakarmij = $('.' + data.idZwierzaka + ' footer .paski .przyciski a:nth-child(1)').parent().parent().children().children(".jedzenie");
			 $('.' + data.idZwierzaka + ' footer .komunikaty .msgJedzenie').html(data.komunikat);
            $nakarmij.width(data.szer);
            schronisko[data.idZwierzaka].jedzenie = zmien;
        });


    }

    function changeFood2(komunikat) {
        var dana = 10 * schronisko[zwierz].jedzenie + "px";
        socket.emit('event j', { szer: dana, idZwierzaka: zwierz, komunikat: komunikat });

        socket.on('change width j', function (data) {
            var zmien = (parseInt(data.szer)) / 10;
            var $nakarmij = $('.' + data.idZwierzaka + ' footer .paski .przyciski a:nth-child(2)').parent().parent().children().children(".jedzenie");
			 $('.' + data.idZwierzaka + ' footer .komunikaty .msgJedzenie').html(data.komunikat);
            $nakarmij.width(data.szer);			
            schronisko[data.idZwierzaka].jedzenie = zmien;
        });
    }
    function changeFun3(komunikat) {
        var dana = 10 * schronisko[zwierz].zabawa + "px";
        socket.emit('event z', { szer: dana, idZwierzaka: zwierz, komunikat: komunikat  });

        socket.on('change width z', function (data) {
            var zmien = (parseInt(data.szer)) / 10;
            zabaw = $('.' + data.idZwierzaka + ' footer .paski .przyciski a:nth-child(3)').parent().parent().children().children(".zabawa");
            $('.' + data.idZwierzaka + ' footer .komunikaty .msgZabawa').html(data.komunikat);
            zabaw.width(data.szer);
            schronisko[data.idZwierzaka].zabawa = zmien;
        });
    }
    function changeFun4(komunikat) {
        var dana = 10 * schronisko[zwierz].zabawa + "px";
        socket.emit('event z', { szer: dana, idZwierzaka: zwierz, komunikat: komunikat  });

        socket.on('change width z', function (data) {
            var zmien = (parseInt(data.szer)) / 10;
            zabaw = $('.' + data.idZwierzaka + ' footer .paski .przyciski a:nth-child(4)').parent().parent().children().children(".zabawa");
			$('.' + data.idZwierzaka + ' footer .komunikaty .msgZabawa').html(data.komunikat);
            zabaw.width(data.szer);
            schronisko[data.idZwierzaka].zabawa = zmien;
        });
    }

    function ustawPaski(licznik) {

        var szer = 20;

        var counter = 0;

        for (var k = 0; k <= licznik; k += 1) {

            $('.' + k + ' footer .komunikaty a').click(function () {
                var id = $(this).parent().parent().parent().attr('class');
                $('.' + id + ' footer .komunikaty').hide();
                return false;
            });



            $('.' + k + ' footer .paski .przyciski a:nth-child(1)').click(function () {
	
                var jedz = $(this).parent().parent().children().children(".jedzenie");
                zwierz = $(this).parent().parent().parent().parent().attr('class');
				nazwaJedzenia =$(this).html();
              
				$('.' + zwierz + ' footer .komunikaty').show();
				var komunikat = "[" + nazwaJedzenia+ "] Został nakarmiony przez: " + $('#user').html() + "</br>";
                if (schronisko[zwierz].jedzenie < szer) {

                    if (schronisko[zwierz].jedzenie === szer - 1) {
                        schronisko[zwierz].jedzenie += 1;
                        changeFood1(komunikat);

                    } else {
                        schronisko[zwierz].jedzenie += 2;
                        changeFood1(komunikat);

                    }
                }
                return false;
            });

            $('.' + k + ' footer .paski .przyciski a:nth-child(2)').click(function () {
                var jedz = $(this).parent().parent().children().children(".jedzenie");
                zwierz = $(this).parent().parent().parent().parent().attr('class');
				nazwaJedzenia =$(this).html();
				$('.' + zwierz + ' footer .komunikaty').show();
				var komunikat = "[" + nazwaJedzenia+ "] Został nakarmiony przez: " + $('#user').html() + "</br>";
                $('.' + zwierz + ' footer .komunikaty').show();
                if (schronisko[zwierz].jedzenie < szer) {
                    schronisko[zwierz].jedzenie += 1;
                    changeFood2(komunikat);
                }
                return false;
            });
            $('.' + k + ' footer .paski .przyciski a:nth-child(3)').click(function () {
                var zabaw = $(this).parent().parent().children().children(".zabawa");
                zwierz = $(this).parent().parent().parent().parent().attr('class');
                $('.' + zwierz + ' footer .komunikaty').show();
			   nazwaZabawy =$(this).html();
				var komunikat = "[" + nazwaZabawy+ "] Pobawił się z: " + $('#user').html() + "</br>";
                if (schronisko[zwierz].zabawa < szer) {
                    if (schronisko[zwierz].zabawa === szer - 1) {
                        schronisko[zwierz].zabawa += 1;
                        changeFun3(komunikat);

                    } else {

                        schronisko[zwierz].zabawa += 2;
                        changeFun3(komunikat);

                    }
                }
                return false;
            });
            $('.' + k + ' footer .paski .przyciski a:nth-child(4)').click(function () {
                var zabaw = $(this).parent().parent().children().children(".zabawa");
                zwierz = $(this).parent().parent().parent().parent().attr('class');
               $('.' + zwierz + ' footer .komunikaty').show();
			   nazwaZabawy =$(this).html();
				var komunikat = "[" + nazwaZabawy+ "] Pobawił się z: " + $('#user').html() + "</br>";
                if (schronisko[zwierz].zabawa < szer) {
                    schronisko[zwierz].zabawa += 1;
                    changeFun4(komunikat);
                }
                return false;
            });
        }
    }
    main = $('#big_wrapper').html();
    $('#dogs, #cats,#rabbits,#others,#all,#main_page').click(function () {
        if(this.id === 'main_page') {
            $('#big_wrapper').html(main);
        }
        if (this.id === 'dogs') {
            pomoc = "";
            title(this);
            for (i = 0; i < schronisko.length; i++) {
                if (schronisko[i].gatunek === "Pies") {
                    ustaw(schronisko);
                    dodajPaski(i);
                    ustawPaski(i);
                }
            }
        }
        else if (this.id == 'cats') {
            pomoc = "";
            title(this);
            for (i = 0; i < schronisko.length; i++) {
                if (schronisko[i].gatunek === "Kot") {
                    ustaw(schronisko);
                    dodajPaski(i);
                    ustawPaski(i);

                }

            }
        }
        else if (this.id == 'rabbits') {
            pomoc = "";
            title(this);
            for (i = 0; i < schronisko.length; i++) {
                if (schronisko[i].gatunek === "Królik") {
                    ustaw(schronisko);
                    dodajPaski(i);
                    ustawPaski(i);
                }
            }
        }
        else if (this.id == 'others') {
            pomoc = "";
            title(this);
            for (i = 0; i < schronisko.length; i++) {

                if (schronisko[i].gatunek != "Kot" && schronisko[i].gatunek != "Pies" && schronisko[i].gatunek != "Królik") {
                    ustaw(schronisko);
                    dodajPaski(i);
                    ustawPaski(i);
                }

            }
        }
        else if (this.id === 'all') {
            title(this);
            pomoc = "";
            for (i = 0; i < schronisko.length; i++) {

                zwierz = "<article class=\"" + i + "\"> <header> <p>" + schronisko[i].imie + "</p> </header>" +
                "<div class=\"obr\"> <img alt=\"" + schronisko[i].imie + "\" class=\"img-thumbnail\">" +
                "</div> <table class=\"table table-striped tab\"> <tr> <th>Gatunek</th> <td>" + schronisko[i].gatunek + "</td> </tr>  <tr> <th>Wielkość</th> <td>" + schronisko[i].wielkosc + "</td> </tr> <tr>" +
                "<th>Waga wejściowa</th> <td>" + schronisko[i].waga + "</td> </tr> <tr> <th>Szczepienia</th> <td>" + schronisko[i].szczepienia + "</td> </tr> <tr> <th>Boks</th>" +
                "<td>" + schronisko[i].boks + "</td> </tr>  </table> <footer> <div class=\"paski\"></div>" +
				"<p><a href=\"#\" class=\"btn btn-success btn-lg przygarnij\" id=\"" + schronisko[i].boks + "\">Przygarnij</a></p>" +
                "<div class=\"komunikaty\"><div class=\"msgJedzenie\"></div><br/><div class=\"msgZabawa\"></div><a href=\"#\" class=\"btn btn-danger btn-xs ukryj\">x</a></div></footer> </article>";

                pomoc = pomoc + zwierz;
                $("#articles").html(pomoc);

                dodajPaski(i);
                ustawPaski(i);
                dodajZdjecia();
            };

        }
        zgloszono();
    });

    function zgloszono() {
        $('.przygarnij').click(function () {
            $('#main_section').hide();
            $('#side_news').hide();
            $("#formularz").show();
            $('#dogs, #cats,#rabbits,#others,#all').click(function () {
                $('#main_section').show();
                $('#side_news').show();
                $("#formularz").hide();
            });
            for (i = 0; i < schronisko.length; i++) {

                if (this.id === schronisko[i].boks.toString()) {
                    $("#wybrany").val(schronisko[i].imie);
                }
            }

        });
    }


});