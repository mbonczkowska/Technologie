$(function () {
    var socket = io.connect();

    schronisko=[];
	starej = [];
	starez = [];
    historiaAdopcji = [];
    var $main_section =  $('#main_section');
    $.getJSON("data/data_zwierzaki.json", function(results) {
        $.each(results, function (index, r) {
            var index2 = index.substring(7);
            schronisko[index2] = {imie: r.imie, wielkosc: r.wielkosc,  boks: r.boks};
        });
    });
    function title(naglowek) {
        tytul = $(naglowek).html();
        $('h2').html(tytul);
    }
	
	socket.on('zaladuj stare paski', function (data) {

                for (var i = 0; i < data.length; i++) {	
				if(data[i].komunikat){
				starej.push({idZwierzaka:data[i].idZwierzaka,komunikat:data[i].komunikat,id:data[i]._id});
				}
            }     
   });
   socket.on('zaladuj stare paski zabawy', function (data) {
                for (var i = 0; i < data.length; i++) {	
				if(data[i].komunikat){
				starez.push({idZwierzaka:data[i].idZwierzaka,komunikat:data[i].komunikat,id:data[i]._id});
				}
            }     
   });

    $('#feed').click(function () {
        title(this);
        $('#main_section').html('');
        socket.emit('wyslij jedzenie');
        socket.on('zaladuj stare paski', function (data) {
            $('#main_section').html('<a class="btn btn-xs btn-success" id="eatrefresh">Odśwież</a><br><br>');
            starej =[];
            for (i = 0; i < data.length; i++) {
                if(data[i].komunikat){
                    starej.push({idZwierzaka:data[i].idZwierzaka,komunikat:data[i].komunikat,id:data[i]._id});
                }
            }
            for (i = 0; i < starej.length; i++) {
                $main_section.append('<div idzbazy=\"' + starej[i].id + '\" boks=\"' + schronisko[starej[i].idZwierzaka].boks + '\"><button class=\'btn btn-warning btn-circle btn-xs delete\'><i class=\'glyphicon glyphicon-remove\' ></i></button>  ' + schronisko[starej[i].idZwierzaka].imie + " z boksu: " + schronisko[starej[i].idZwierzaka].boks + ". Wielkość: " + schronisko[starej[i].idZwierzaka].wielkosc +
                    ". Wysłane: " + starej[i].komunikat + "</div>");


                $('.delete').click(function () {
                    console.log($(this).parent().attr("idzbazy"));
                    socket.emit('usun jedzenie', $(this).parent().attr("idzbazy"));
                    $(this).parent().remove();
                });

            }
            $('#eatrefresh').click(function () {
                socket.emit('wyslij jedzenie');
            });
        });
    });
    $('#play').click(function () {
        title(this);
        $('#main_section').html('');
        socket.emit('wyslij zabawy');
        socket.on('zaladuj stare paski zabawy', function (data) {
            $('#main_section').html('<a class="btn btn-xs btn-success" id="playrefresh">Odśwież</a><br><br>');
            starez =[];
            for (i = 0; i < data.length; i++) {
                if(data[i].komunikat){
                    starez.push({idZwierzaka:data[i].idZwierzaka,komunikat:data[i].komunikat,id:data[i]._id});
                }
            }
            for (i = 0; i < starez.length; i++) {
                $main_section.append('<div idzbazy=\"' + starez[i].id + '\" boks=\"' + schronisko[starez[i].idZwierzaka].boks + '\"><button class=\'btn btn-warning btn-circle btn-xs delete\'><i class=\'glyphicon glyphicon-remove\' ></i></button>  ' + schronisko[starez[i].idZwierzaka].imie + " z boksu: " + schronisko[starez[i].idZwierzaka].boks + ". Wielkość: " + schronisko[starez[i].idZwierzaka].wielkosc +
                    ". Wysłane: " + starez[i].komunikat + "</div>");


                $('.delete').click(function () {
                    console.log($(this).parent().attr("idzbazy"));
                    socket.emit('usun zabawe', $(this).parent().attr("idzbazy"));
                    $(this).parent().remove();
                });

            }

            $('#playrefresh').click(function () {
                socket.emit('wyslij zabawy');
            });
    });

});

    $('#application').click(function () {
        title(this);
		$('#main_section').html('');
        socket.emit('adopcje');
        socket.on('zaladuj stare adopcje', function (data) {
            $('#main_section').html('<a class="btn btn-xs btn-success" id="adoptionrefresh">Odśwież</a><br><br>');
             historiaAdopcji =[];
            for (i = 0; i < data.length; i++) {
                historiaAdopcji.push({wybrany:data[i].wybrany,imie:data[i].imie,nazwisko:data[i].nazwisko,telefon:data[i].telefon,email:data[i].email,id:data[i]._id});
            }
            for(i = 0;i<historiaAdopcji.length;i++){
                $main_section.append('<div idzbazy=\"' + historiaAdopcji[i].id + '\" imiezbazy=\"' + historiaAdopcji[i].wybrany + '\"> Wybrano: ' + historiaAdopcji[i].wybrany + " Przyszły właściciel: " + historiaAdopcji[i].imie+  " " + historiaAdopcji[i].nazwisko +
                   "Email:"+ historiaAdopcji[i].email +". Telefon: " + historiaAdopcji[i].telefon + "</div>");
            }
            $('#adoptionrefresh').click(function () {
                socket.emit('adopcje');
            });


        });
    });


});