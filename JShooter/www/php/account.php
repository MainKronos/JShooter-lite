<?php
function account(){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		if(isset($_SESSION["username"])){
			return json_encode(array(
				'error' => false,
				'data' => array('username' => $_SESSION["username"])
			));
		}else{
			return json_encode(array(
				'error' => 'User not logged in.'
			));
		}
	}
}
?>