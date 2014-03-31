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
	
};
function func1(){
	//document.open("../pages/form.html");
	//alert(document.h3);
	alert(document.body.elements);
};