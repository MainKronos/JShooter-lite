<?php
require $_SERVER['DOCUMENT_ROOT'].'/php/db.php';
function login(){
	// login
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
			$user = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING);
			$pass = filter_var($_REQUEST['password'], FILTER_SANITIZE_STRING);

			$result = db()->query("SELECT * FROM User WHERE username='$user';");
			if($result->rowCount() > 0){
				$result = $result->fetch();
				if(password_verify($pass, $result['pass'])){
					$_SESSION["username"] = $result['username'];
					return json_encode(array(
						'error' => false
					));
				}
			}
			return json_encode(array(
				'error' => 'Credenziali non valide.'
			));
		}
	}
	http_response_code(400);
	return;
}
?>