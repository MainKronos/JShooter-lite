<?php
function settings(){

	if(isset($_SESSION["username"])){
		if($_SERVER["REQUEST_METHOD"] == "POST"){
			if(isset($_SESSION["username"])){
				$data = json_decode(file_get_contents('php://input'), true);
				$_SESSION["settings"] = $data;
				return json_encode(array(
					'error' => false,
				));
			}
			
		}elseif($_SERVER["REQUEST_METHOD"] == "GET"){
			if(isset($_SESSION["settings"])){
				return json_encode(array(
					'error' => false,
					'data' => $_SESSION["settings"]
				));
			}
			return json_encode(array(
				'error' => 'Nessune impostazioni salvate.',
			));
		}
		http_response_code(400);
		return;
	}
	return json_encode(array(
		'error' => 'Utente non loggato.'
	));
}
?>