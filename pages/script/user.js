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
				$nickForm.hide();
				$nickError.hide();
				$user.show();
			} else{
				$nickError.html('Ten login już został użyty. Spróbuj ponownie');
			}
		});
		$nickBox.val('');
			
	});
	
	socket.on('usernames',function(data){
		
		$user.html(data);
		//$user.html(data.count+ "sss"  + i + data.nick.length-1 );
		// + data.nick[data.count + data.nick.length-1]
		

	});

});