<?php
require $_SERVER['DOCUMENT_ROOT'].'/php/db.php';
function map(){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		if(isset($_SESSION["username"])){
			$result = db()->query('SELECT * FROM Map;');
			$lenght = $result->rowCount();
			if($lenght > 0){
				$res = $result->fetchAll();
				
				$tl = mt_rand(0,$lenght-1);
				$tr = mt_rand(0,$lenght-1);
				$bl = mt_rand(0,$lenght-1);
				$br = mt_rand(0,$lenght-1);


				$tl_map = json_decode($res[$tl][1]);
				$tr_map = json_decode($res[$tr][1]);
				$bl_map = json_decode($res[$bl][1]);
				$br_map = json_decode($res[$br][1]);

				// error_log($tl);
				// error_log($tr);
				// error_log($bl);
				// error_log($br);


				$map = [];

				$map_size = 16*2-1;

				for($i=0; $i<$map_size; $i++){
					$tmp = "";
					for($j=0; $j<$map_size; $j++){
						if($i==0 || $i==$map_size-1 || $j==0 || $j==$map_size-1){
							$tmp .= "W";
						}else{
							if($i<16 && $j<16){
								// top left
								$tmp .= $tl_map[$i][$j];
	
							}elseif($i>=16 && $j<16){
								// bottom left
								$tmp .= $bl_map[$i-15][$j];
	
							}elseif($i<16 && $j>=16){
								// top right
								$tmp .= $tr_map[$i][$j-15];
	
							}elseif($i>=16 && $j>=16){
								// bottom right
								$tmp .= $br_map[$i-15][$j-15];
							}
						}
					}
					$map[] = $tmp;
				}


				$gameID = uniqid();

				$_SESSION[$gameID] = array('start'=>round(microtime(true) * 1000));
				
				// sleep(5);
				return json_encode(array(
					'error' => false,
					'data' => array(
						'map' => $map,
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