$(function(){
	schronisko = [
		{imie:"Rex",  gatunek: "Pies", wielkosc: "Duży", waga: "30 kg", szczepienia: "Tak", boks: 1},
		{imie:"Ren", gatunek: "Pies", wielkosc: "Średni", waga: "10 kg", szczepienia: "Tak", boks: 2},
		{imie:"Margo", gatunek: "Kot",wielkosc: "Średni", waga: "2 kg", szczepienia: "Tak", boks: 3},
		{imie:"Amit", gatunek: "Kot",wielkosc: "Średni", waga: "2 kg", szczepienia: "Tak", boks: 4},
		{imie:"Emi", gatunek:"Królik",wielkosc: "Miniaturka", waga: "0,5 kg", szczepienia: "Tak", boks: 5},
		{imie:"Tofik", gatunek:"Królik", wielkosc: "Mały", waga: "1 kg", szczepienia: "Tak", boks: 6},
		{imie:"Fama", gatunek: "Papuga", wielkosc: "Mały",waga: "1 kg", szczepienia: "Tak", boks: 7},
		{imie:"Ami", gatunek: "Myszoskoczek", wielkosc: "Mały",waga: "0,1 kg", szczepienia: "Tak", boks: 8}
	
	];
	var zwierz="";
	var pomoc="";
	var licz = 1;
	var tytul = "";
	function title(naglowek){
		tytul = $(naglowek).html();
	$("#top_header h2").html(tytul);
	}
	 	$('#dogs, #cats,#rabbits,#others,#all').click(function () {
    if (this.id === 'dogs') {
	pomoc ="";
	title(this);
	licz = 1;
	//tytul = $(this).html();
	//$("#top_header h2").html(tytul);
			for (i=0;i<schronisko.length;i++){
			if(schronisko[i].gatunek==="Pies"){
			
				zwierz = "<article> <header> <p>"+schronisko[i].imie+"</p> </header>" +
		"<div class=\"obr\"> <img src=\"../photos/"+schronisko[i].imie+".jpg\" alt=\""+schronisko[i].imie+"\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\">  <tr> <th>Wielkość</th> <td>"+schronisko[i].wielkosc+"</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>"+schronisko[i].waga+"</td> </tr> <tr> <th>Szczepienia</th> <td>"+schronisko[i].szczepienia+"</td> </tr> <tr> <th>Boks</th>" +
		"<td>"+schronisko[i].boks+"</td> </tr>  </table> <footer> <p><a href=\"form.html\" class=\"btn btn-success btn-lg\" id=\"kot1\">Przygarnij</a></p>" +
		"</footer> </article>";
       
		pomoc = pomoc + zwierz;
		$("#main_section").html(pomoc);
		
		
			}
			}
        
    }
    else if (this.id == 'cats') {
	pomoc ="";
	title(this);
	licz=1;
        	for (i=0;i<schronisko.length;i++){
			
			if(schronisko[i].gatunek==="Kot"){
			
				zwierz = "<article> <header> <p>"+schronisko[i].imie+"</p> </header>" +
		"<div class=\"obr\"> <img src=\"photos/"+schronisko[i].imie+".jpg\" alt=\""+schronisko[i].imie+"\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\">  <tr> <th>Wielkość</th> <td>"+schronisko[i].wielkosc+"</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>"+schronisko[i].waga+"</td> </tr> <tr> <th>Szczepienia</th> <td>"+schronisko[i].szczepienia+"</td> </tr> <tr> <th>Boks</th>" +
		"<td>"+schronisko[i].boks+"</td> </tr>  </table> <footer> <p><a href=\"form.html\" class=\"btn btn-success btn-lg\" id=\"kot1\">Przygarnij</a></p>" +
		"</footer> </article>";
          licz++;
		pomoc = pomoc + zwierz;
		$("#main_section").html(pomoc);
			}
			}
    } 
	else if (this.id == 'rabbits') {
	pomoc ="";
	title(this);
	licz=1;
        	for (i=0;i<schronisko.length;i++){
			
			if(schronisko[i].gatunek==="Królik"){
			
				zwierz = "<article> <header> <p>"+schronisko[i].imie+"</p> </header>" +
		"<div class=\"obr\"> <img src=\"photos/"+schronisko[i].imie+".jpg\" alt=\""+schronisko[i].imie+"\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\">  <tr> <th>Wielkość</th> <td>"+schronisko[i].wielkosc+"</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>"+schronisko[i].waga+"</td> </tr> <tr> <th>Szczepienia</th> <td>"+schronisko[i].szczepienia+"</td> </tr> <tr> <th>Boks</th>" +
		"<td>"+schronisko[i].boks+"</td> </tr>  </table> <footer> <p><a href=\"form.html\" class=\"btn btn-success btn-lg\" id=\"kot1\">Przygarnij</a></p>" +
		"</footer> </article>";
          licz++;
		pomoc = pomoc + zwierz;
		$("#main_section").html(pomoc);
			}
			}
    } 
	else if (this.id == 'others') {
	pomoc ="";
	title(this);
	licz=1;
        	for (i=0;i<schronisko.length;i++){
			
			if(schronisko[i].gatunek!="Kot" && schronisko[i].gatunek!="Pies" && schronisko[i].gatunek!="Królik"){
			
				zwierz = "<article> <header> <p>"+schronisko[i].imie+"</p> </header>" +
		"<div class=\"obr\"> <img src=\"photos/"+schronisko[i].imie+".jpg\" alt=\""+schronisko[i].imie+"\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\">  <tr> <th>Wielkość</th> <td>"+schronisko[i].wielkosc+"</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>"+schronisko[i].waga+"</td> </tr> <tr> <th>Szczepienia</th> <td>"+schronisko[i].szczepienia+"</td> </tr> <tr> <th>Boks</th>" +
		"<td>"+schronisko[i].boks+"</td> </tr>  </table> <footer> <p><a href=\"form.html\" class=\"btn btn-success btn-lg\" id=\"kot1\">Przygarnij</a></p>" +
		"</footer> </article>";
          licz++;
		pomoc = pomoc + zwierz;
		$("#main_section").html(pomoc);
			}
			}
    } 
	else if(this.id === 'all') {
	title(this);
		pomoc ="";
		for (i=0;i<schronisko.length;i++){
	 
		zwierz = "<article> <header> <p>"+schronisko[i].imie+"</p> </header>" +
		"<div class=\"obr\"> <img src=\"photos/"+schronisko[i].imie+".jpg\" alt=\""+schronisko[i].imie+"\" class=\"img-thumbnail\">" +
		"</div> <table class=\"table table-striped tab\"> <tr> <th>Gatunek</th> <td>"+schronisko[i].gatunek+"</td> </tr>  <tr> <th>Wielkość</th> <td>"+schronisko[i].wielkosc+"</td> </tr> <tr>" +
		"<th>Waga wejściowa</th> <td>"+schronisko[i].waga+"</td> </tr> <tr> <th>Szczepienia</th> <td>"+schronisko[i].szczepienia+"</td> </tr> <tr> <th>Boks</th>" +
		"<td>"+schronisko[i].boks+"</td> </tr>  </table> <footer> <p><a href=\"form.html\" class=\"btn btn-success btn-lg\" id=\"kot1\">Przygarnij</a></p>" +
		"</footer> </article>";
         
		pomoc = pomoc + zwierz;
		$("#main_section").html(pomoc);
	

	};
	
	}
});
	
});