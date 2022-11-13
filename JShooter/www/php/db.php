<?php

$conn = null;

function db(){

	if(is_null($GLOBALS['conn'])){
		
		$db_file = dirname(__DIR__) . "/db.sqlite";

		// connessione al database
		
		try{
			// $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
			$GLOBALS['conn'] = new PDO("sqlite:$db_file");
			
		}
		catch(PDOException $exception){
			error_log("Connection Error: " . $exception->getMessage());
		}
		return $GLOBALS['conn'];
	}else{
		return $GLOBALS['conn'];
	}
}
?>