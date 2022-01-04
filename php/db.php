<?php

function db(){
	$host = "localhost";
	$db_name = "JShooter";
	$username = "root";
	$password = "root";

	// connessione al database
	$conn = null;
	try{
		$conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
		$conn->exec("set names utf8");
	}
	catch(PDOException $exception){
		echo "Errore di connessione: " . $exception->getMessage();
	}
	return $conn;
}
?>