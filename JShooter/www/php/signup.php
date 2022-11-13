<?php
require 'db.php';
function signup(){
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
			$user = filter_var($_REQUEST['username'], FILTER_UNSAFE_RAW);
			$pass = password_hash($_REQUEST['password'], PASSWORD_DEFAULT);
			$registrazione = date("Y-m-d H:i:s");
			try {
				db()->query("INSERT INTO User VALUES ('$user', '$pass', '$registrazione');");
			} catch (PDOException $e) {
				if($e->getCode() == '23000'){
					return json_encode(array(
						'error' => 'Username not available.'
					));
				}
				return json_encode(array(
					'error' => $e->getMessage()
				));
			}
			$_SESSION["username"] = $user;
			return json_encode(array(
				'error' => false
			));
		}
	}
	http_response_code(400);
	return;
}
?>