window.onload = button;
function button(){
	var pies1= document.getElementById("pies1");
	var pies2= document.getElementById("pies2");
	var kot1= document.getElementById("kot1");
	var kot2= document.getElementById("kot2");
	var krolik1= document.getElementById("krolik1");
	var krolik2= document.getElementById("krolik2");
	var inny1= document.getElementById("inny1");
	var inny2= document.getElementById("inny2");
	
	pies1.onclick = func1;
	
	var schronisko = {
		Rex: { gatunek: "Pies", wielkosc: "Duży", waga: "30 kg", szczepienia: "Tak", boks: 1},
		Ren: { gatunek: "Pies", wielkosc: "Średni", waga: "10 kg", szczepienia: "Tak", boks: 2},
		Margo: { gatunek: "Kot",wielkosc: "Średni", waga: "2 kg", szczepienia: "Tak", boks: 3},
		Amit: { gatunek: "Kot",wielkosc: "Średni", waga: "2 kg", szczepienia: "Tak", boks: 4},
		Emi: { gatunek:"Królik",wielkosc: "Miniaturka", waga: "0,5 kg", szczepienia: "Tak", boks: 5},
		Tofik: { gatunek:"Królik", wielkosc: "Mały", waga: "1 kg", szczepienia: "Tak", boks: 6},
		Fama: { gatunek: "Papuga", wielkosc: "Mały",waga: "1 kg", szczepienia: "Tak", boks: 7},
		Ami: { gatunek: "Myszoskoczek", wielkosc: "Mały",waga: "0,1 kg", szczepienia: "Tak", boks: 8},
		dodajZwierze: function(imie,gatunek, wielkosc, waga, szczepienia, boks){
			this[imie] = {gatunek, wielkosc, waga, szczepienia, boks};
		}
	};
	//schronisko.dodajZwierze("Myk","Pies","Mały","2 kg","Tak",9);
};
function func1(){
	//document.open("../pages/form.html");
	//alert(document.h3);
	alert(document.body.elements);
};