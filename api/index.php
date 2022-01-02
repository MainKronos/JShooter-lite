<?php

session_start();



header('Content-Type: application/json; charset=utf-8');

// STATUS CODE

// 100 => 'Continua',
// 101 => 'Protocolli di commutazione',
// 200 => 'OK',
// 201 => 'Creato',
// 202 => 'accettato',
// 203 => 'non autorevole Informazione ',
// 204 => 'No Content',
// 205 => 'Reset Content',
// 206 => 'Contenuto parziale',
// 300 => 'Scelte multiple',
// 301 => 'Spostato in modo permanente',
// 302 => 'trovato',
// 303 => 'vedere altri',
// 304 => 'Non modificato',
// 305 => 'Usa Proxy',
// 306 => '(non utilizzato)' ,
// 307 => 'Temporary Redirect',
// 400 => 'Bad Request',
// 401 => 'non autorizzata',
// 402 => 'pagamento richiesto',
// 403 => 'Forbidden',
// 404 => 'non trovato',
// 405 => 'Metodo non consentito' ,
// 406 => 'Non accettabile',
// 407 => 'Autenticazione proxy richiesta' ,
// 408 => 'Richiesta Timeout',
// 409 => 'conflitto',
// 410 => 'finiti',
// 411 => 'lunghezza desiderata',
// 412 => 'Condizione preliminare non riuscita',
// 413 => 'Entità richiesta troppo grande ',
// 414 => 'Request-URI Too Long',
// 415 => 'Tipo di supporto non supportato' ,
// 416 => 'richiesto intervallo Non satisfiable ',
// 417 => 'L'attesa non riuscita',
// 500 => 'Internal Server Error' ,
// 501 => 'Non Implementato',
// 502 => 'Bad Gateway',
// 503 => 'Servizio non disponibile',
// 504 => 'Gateway Timeout',
// 505 => 'HTTP Version Not Supported '



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


// rest API

function res_help(){
	return json_encode(
		array(
			array('/, /help'=>'Informazioni generali.'),
			// array()
		)
	);
}
function signup(){
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
			$user = $_REQUEST['username'];
			$pass = password_hash($_REQUEST['password'], PASSWORD_DEFAULT);
			try {
				db()->query("INSERT INTO User value ('$user', '$pass');");
			} catch (PDOException $e) {
				if($e->getCode() == '23000'){
					return json_encode(array(
						'error' => 'Username non disponibile.'
					));
				}
				return json_encode(array(
					'error' => $e->errorInfo()[2]
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

function account($args){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		if(isset($_SESSION["username"])){
			return json_encode(array(
				'error' => false,
				'data' => array('username' => $_SESSION["username"])
			));
		}else{
			return json_encode(array(
				'error' => 'Utente non loggato.'
			));
		}
	}
	http_response_code(400);
	return;
}

function login(){

	// login
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
			$user = $_REQUEST['username'];
			$pass = $_REQUEST['password'];
			// $pass = password_hash($_REQUEST['password'], PASSWORD_DEFAULT);

			// echo password_hash($_REQUEST['password'], PASSWORD_DEFAULT);

			$result = db()->query("SELECT * FROM User WHERE username='$user';");
			if($result->rowCount() > 0){
				$result = $result->fetch();
				if(password_verify($pass, $result['pass'])){
					$_SESSION["username"] = $result['username'];
					// http_response_code(202); // 'Accettato'
					return json_encode(array(
						'error' => false
					));
				}
			}
		}
		http_response_code(401); // non autorizzato
		return;
	}
	http_response_code(400);
	return;
}
function map(){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		$result = db()->query('SELECT * FROM Map;');
		$lenght = $result->rowCount();
		if($lenght > 0){
			$res = array();
			while ($row = $result->fetch()) {
				array_push($res, $row['map']);
			}
			// sleep(5);
			return json_encode(array(
				'error' => false,
				'data' => array(
					'map' => json_decode($res[rand(0,$lenght-1)])
				)
			));
		}
	}
	http_response_code(400);
	return;
}



function API($ulr){
	$endpints = explode( '/', parse_url(str_replace('/api/','',$ulr), PHP_URL_PATH));
	// foreach($endpints as $x=>$elm){
	// 	echo "$x: $elm<br>";
	// }
	// $response = NULL;


	switch ($endpints[0]) {
		case '':
		case 'help':
			return res_help();
			break;
		case 'login':
			return login();
			break;
		case 'account':
			return account(array_slice($endpints,0));
			break;
		case 'signup':
			return signup();
			break;
		case 'map':
			return map();
			return;
		default:
			http_response_code(404);
	}
}




echo API($_SERVER['REQUEST_URI']);


?>