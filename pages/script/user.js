$(function(){
	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $user = $('#user');
    var $logout = $('#logout');
    var $pass = $('#pass');
	
	$nickForm.submit(function(e){
		e.preventDefault();
        if($nickBox.val()==="admin"){
            $pass.show( function() {
                if($pass.val()==="123") {
                    $("#panelAdmina").css("visibility", "visible");
                }
            });
        }
        else
        {socket.emit('new user', $nickBox.val(), function(data){
			if(data){
				$nickForm.hide();
				$nickError.hide();
				$user.show();
                $logout.show();
			} else{
				$nickError.html('Ten login już został użyty. Spróbuj ponownie');
			}
		});
            $nickBox.val('');
        }


			
	});
	
	socket.on('usernames',function(data){
		
		$user.html(data);
		//$user.html(data.count+ "sss"  + i + data.nick.length-1 );
		// + data.nick[data.count + data.nick.length-1]
		

	});

});