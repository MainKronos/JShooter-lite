<?php
require $_SERVER['DOCUMENT_ROOT'].'/php/db.php';
function map(){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		if(isset($_SESSION["username"])){
			$result = db()->query('SELECT * FROM Map;');
			$lenght = $result->rowCount();
			if($lenght > 0){
				$rnd = rand(0,$lenght-1);
				$res = $result->fetchAll()[$rnd];

				$gameID = uniqid();

				$_SESSION[$gameID] = array('map'=> $res['mapID'],'start'=>round(microtime(true) * 1000));
				
				// sleep(5);
				return json_encode(array(
					'error' => false,
					'data' => array(
						'map' => json_decode($res['map']),
						'id' => $gameID
					)
				));
			}
			http_response_code(500);
			return;
		}
		http_response_code(403);
		return;
	}
	http_response_code(400);
	return;
}
?>