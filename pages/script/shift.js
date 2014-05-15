
// JavaScript source code
$(function () {
    schronisko = [
		{ imie: "Rex", gatunek: "Pies", wielkosc: "Duży", waga: "30 kg", szczepienia: "Tak", boks: 1 ,jedzenie:10,zabawa:10},
		{ imie: "Ren", gatunek: "Pies", wielkosc: "Średni", waga: "10 kg", szczepienia: "Tak", boks: 2 ,jedzenie:10,zabawa:10 },
		{ imie: "Margo", gatunek: "Kot", wielkosc: "Średni", waga: "2 kg", szczepienia: "Tak", boks: 3 ,jedzenie:10,zabawa:10 },
		{ imie: "Amit", gatunek: "Kot", wielkosc: "Średni", waga: "2 kg", szczepienia: "Tak", boks: 4 ,jedzenie:10,zabawa:10 },
		{ imie: "Emi", gatunek: "Królik", wielkosc: "Miniaturka", waga: "0,5 kg", szczepienia: "Tak", boks: 5 ,jedzenie:10,zabawa:10 },
		{ imie: "Tofik", gatunek: "Królik", wielkosc: "Mały", waga: "1 kg", szczepienia: "Tak", boks: 6 ,jedzenie:10,zabawa:10 },
		{ imie: "Fama", gatunek: "Papuga", wielkosc: "Mały", waga: "1 kg", szczepienia: "Tak", boks: 7  ,jedzenie:10,zabawa:10},
		{ imie: "Ami", gatunek: "Myszoskoczek", wielkosc: "Mały", waga: "0,1 kg", szczepienia: "Tak", boks: 8 ,jedzenie:10,zabawa:10 }
    ];
	
	
	
    var zwierz = "";
    var pomoc = "";
    var tytul = "";
	var socket = io.connect();
	
	
    function title(naglowek) {
        tytul = $(naglowek).html();
        $("#top_header h2").html(tytul);
    }

    function ustaw(schronisko) {
        zwierz = "<article class=\""+i+"\"> <header> <p>" + schronisko[i].imie + "</p> </header>" +
		"<div class=\"obr\"> <img src=\"../photos/" + schronisko[i].imie + ".jpg\" alt=\"" + schronisko[i].imie + "\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\">  <tr> <th>Wielkość</th> <td>" + schronisko[i].wielkosc + "</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>" + schronisko[i].waga + "</td> </tr> <tr> <th>Szczepienia</th> <td>" + schronisko[i].szczepienia + "</td> </tr> <tr> <th>Boks</th>" +
		"<td>" + schronisko[i].boks + "</td> </tr>  </table> <footer><div class=\"paski\"></div> <p><a href=\"#\" class=\"btn btn-success btn-lg przygarnij\" id=\"" + schronisko[i].boks + "\">Przygarnij</a></p>" +
		"</footer> </article>";

        pomoc += zwierz;
        $("#articles").html(pomoc);
    }
	
	function dodajPaski(licznik){
		
		$('.paski').html("<div class=\"defaultBar\"> <div class=\"progressBar jedzenie\"></div> </div><div class=\"defaultBar\"> <div class=\"progressBar zabawa\"></div></div>"
		+"<div class=przyciski></div>");

		for(m=0;m<=licznik;m++){
			
			$('.'+m+' footer .paski .jedzenie').width((10*schronisko[m].jedzenie) + "px");
			$('.'+m+' footer .paski .zabawa').width((10*schronisko[m].zabawa) + "px");			
		}	
		

		
		for(var k=0;k<=licznik;k++){
			if(schronisko[k].gatunek === "Pies"){
			$('.'+k+' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Kość</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Sucha karma</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Patyk</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Piłka</a>");
			}	
			if(schronisko[k].gatunek === "Kot"){
			$('.'+k+' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Karma</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Mleko</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Laser</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Mysz</a>");
			
			}
			
			if(schronisko[k].gatunek === "Królik"){
			$('.'+k+' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Trawa</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Marchew</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Tuba</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Marchewka</a>");
			}
			if(schronisko[k].gatunek != "Pies" && schronisko[k].gatunek != "Kot" && schronisko[k].gatunek != "Królik"){
			$('.'+k+' footer .paski .przyciski').html("<a href=\"#\" class=\"btn btn-primary btn-sm\">Przysmak</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Smakołyk</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Zabawka</a>"+
			"<a href=\"#\" class=\"btn btn-primary btn-sm\">Inne</a>");
			}
		}
	}
	function changeFood1(){	
	var dana = 10*schronisko[zwierz].jedzenie + "px";			
				socket.emit('event j', {szer:dana,idZwierzaka:zwierz});
				
				socket.on('change width j', function (data) {							
						var zmien = (parseInt(data.szer))/10; 					  	
						var $nakarmij = $('.'+data.idZwierzaka +' footer .paski .przyciski a:nth-child(1)').parent().parent().children().children(".jedzenie");
						console.log(data.idZwierzaka + ' '+zwierz +' '+ zmien);
						$nakarmij.width(data.szer);
						schronisko[data.idZwierzaka].jedzenie = zmien;								
					});	
	}
	function changeFood2(){	
	var dana = 10*schronisko[zwierz].jedzenie + "px";		
				socket.emit('event j', {szer:dana,idZwierzaka:zwierz});
				
				socket.on('change width j', function (data) {							
						var zmien = (parseInt(data.szer))/10; 					  	
						var $nakarmij = $('.'+data.idZwierzaka +' footer .paski .przyciski a:nth-child(2)').parent().parent().children().children(".jedzenie");
						console.log(data.idZwierzaka + ' '+zwierz +' '+ zmien);
						$nakarmij.width(data.szer);
						schronisko[data.idZwierzaka].jedzenie = zmien;								
					});	
	}
	function changeFun3(){	
	var dana = 10*schronisko[zwierz].zabawa + "px";		
				socket.emit('event z', {szer:dana,idZwierzaka:zwierz});
				
				socket.on('change width z', function (data) {							
						var zmien = (parseInt(data.szer))/10; 					  	
						zabaw = $('.'+data.idZwierzaka +' footer .paski .przyciski a:nth-child(3)').parent().parent().children().children(".zabawa");
						console.log(data.idZwierzaka + ' '+zwierz +' '+ zmien);
						zabaw.width(data.szer);
						schronisko[data.idZwierzaka].zabawa = zmien;								
					});	
	}
	function changeFun4(){	
	var dana = 10*schronisko[zwierz].zabawa + "px";		
				socket.emit('event z', {szer:dana,idZwierzaka:zwierz});
				
				socket.on('change width z', function (data) {							
						var zmien = (parseInt(data.szer))/10; 					  	
						zabaw = $('.'+data.idZwierzaka +' footer .paski .przyciski a:nth-child(4)').parent().parent().children().children(".zabawa");
						console.log(data.idZwierzaka + ' '+zwierz +' '+ zmien);
						zabaw.width(data.szer);
						schronisko[data.idZwierzaka].zabawa = zmien;								
					});	
	}

	function ustawPaski(licznik){
	
		var szer = 20; 
		
		var counter=0;


		for(var k=0;k<=licznik;k+=1){
			
		
		
		$('.'+k+' footer .paski .przyciski a:nth-child(1)').click(function(){			
		var jedz = $(this).parent().parent().children().children(".jedzenie");
		zwierz = $(this).parent().parent().parent().parent().attr('class');
		if(schronisko[zwierz].jedzenie < szer){
			if(schronisko[zwierz].jedzenie === szer-1){
				schronisko[zwierz].jedzenie +=1;
				changeFood1();
				
			} else{		
				
				schronisko[zwierz].jedzenie +=2;
				changeFood1();
												
			}
		}
			return false;
		});
		
		$('.'+k+' footer .paski .przyciski a:nth-child(2)').click(function(){
		var jedz = $(this).parent().parent().children().children(".jedzenie");
		zwierz = $(this).parent().parent().parent().parent().attr('class');
		if(schronisko[zwierz].jedzenie < szer){
			schronisko[zwierz].jedzenie +=1;
			changeFood2();
		}
		return false;
		});
		$('.'+k+' footer .paski .przyciski a:nth-child(3)').click(function(){
		var zabaw = $(this).parent().parent().children().children(".zabawa");
		zwierz = $(this).parent().parent().parent().parent().attr('class');
		if(schronisko[zwierz].zabawa < szer){
			if(schronisko[zwierz].zabawa === szer-1){
				schronisko[zwierz].zabawa +=1;
				changeFun3();
				
			} else{		
				
				schronisko[zwierz].zabawa +=2;
				changeFun3();
												
			}
		}
			return false;
		});
		$('.'+k+' footer .paski .przyciski a:nth-child(4)').click(function(){
		var zabaw = $(this).parent().parent().children().children(".zabawa");
		zwierz = $(this).parent().parent().parent().parent().attr('class');
		if(schronisko[zwierz].zabawa < szer){
			schronisko[zwierz].zabawa +=1;
			changeFun4();			
		}
		return false;
		});
	}}
	
    $('#dogs, #cats,#rabbits,#others,#all').click(function () {
	var licznik =1;
	var j =0;
        if (this.id === 'dogs') {
            pomoc = "";
            title(this);
			
            //tytul = $(this).html();
            //$("#top_header h2").html(tytul);
            for (i = 0; i < schronisko.length; i++) {
                if (schronisko[i].gatunek === "Pies") {
					j=i;
                    ustaw(schronisko);
					dodajPaski(i);
					ustawPaski(i);
					//console.log($('article').attr('class'));
					
					j++;
					licznik++;
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

                zwierz = "<article class=\""+i+"\"> <header> <p>" + schronisko[i].imie + "</p> </header>" +
                "<div class=\"obr\"> <img src=\"photos/" + schronisko[i].imie + ".jpg\" alt=\"" + schronisko[i].imie + "\" class=\"img-thumbnail\">" +
                "</div> <table class=\"table table-striped tab\"> <tr> <th>Gatunek</th> <td>" + schronisko[i].gatunek + "</td> </tr>  <tr> <th>Wielkość</th> <td>" + schronisko[i].wielkosc + "</td> </tr> <tr>" +
                "<th>Waga wejściowa</th> <td>" + schronisko[i].waga + "</td> </tr> <tr> <th>Szczepienia</th> <td>" + schronisko[i].szczepienia + "</td> </tr> <tr> <th>Boks</th>" +
                "<td>" + schronisko[i].boks + "</td> </tr>  </table> <footer> <div class=\"paski\"></div>"+
				"<p><a href=\"#\" class=\"btn btn-success btn-lg przygarnij\" id=\"" + schronisko[i].boks + "\">Przygarnij</a></p>" +
                "</footer> </article>";
				
                pomoc = pomoc + zwierz;
                $("#articles").html(pomoc);
			
				dodajPaski(i);
				ustawPaski(i);
            };

        }
		zgloszono();
    });
	
	function zgloszono(){
		$('.przygarnij').click(function(){
			$('#main_section').hide();
			$('#side_news').hide();
			$("#formularz").show();
			$('#dogs, #cats,#rabbits,#others,#all').click(function(){
				$('#main_section').show();
				$('#side_news').show();
				$("#formularz").hide();
			});
			for(i=0;i<schronisko.length;i++){
			
				if(this.id === schronisko[i].boks.toString()){
					$("#wybrany").val(schronisko[i].imie);
				}
			}
			
		});
	}
	 
});