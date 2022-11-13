<?php
require 'db.php';
function login(){
	// login
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
			$user = filter_var($_REQUEST['username'], FILTER_UNSAFE_RAW);
			$pass = filter_var($_REQUEST['password'], FILTER_UNSAFE_RAW);

			$result = db()->query("SELECT * FROM User WHERE User.username='$user'")->fetch();

			if($result){
				if(password_verify($pass, $result['pass'])){
					$_SESSION["username"] = $result['username'];
					return json_encode(array(
						'error' => false
					));
				}
			}
			return json_encode(array(
				'error' => 'Incorrect username or password.'
			));
		}
	}
	http_response_code(400);
	return;
}
?>