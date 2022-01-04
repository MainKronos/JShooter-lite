<?php
function logout(){
	if(isset($_SESSION["username"])){
		session_destroy();
		return json_encode(array(
			'error' => false
		));
	}
	http_response_code(403);
	return;
}
?>