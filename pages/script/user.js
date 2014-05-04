$(function(){
	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $user = $('#user');
	
	$nickForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user', $nickBox.val(), function(data){
			if(data){			
		
			} else{
				$nickError.html('Ten login już został użyty. Spróbuj ponownie');
			}
		});
		$nickBox.val('');
			
	});
	
	socket.on('usernames',function(data){
		$nickForm.hide();
		$nickError.hide();
		var last = data[data.length-1];
		console.log(last);
		$user.html(last);
		/*var html = '';
		for(i=0; i<data.length;i++){
			html += data[i];
		}
		console.log(html);
		$user.html(html);*/
	});
});