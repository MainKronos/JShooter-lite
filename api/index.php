<?php
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
function login(){
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
			$username = $_REQUEST['username'];
			$password = password_hash($_REQUEST['password'], PASSWORD_DEFAULT);

			$result = $JShooter->query('SELECT * FROM user WHERE username=$username and password=$password;');
			if($result->num_rows > 0){
				$row = $result->fetch_assoc();
				
			}
			http_response_code(400);
		}
	}
	http_response_code(400);
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
			return $res[rand(0,$lenght-1)];
		}
		http_response_code(400);
	}
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
		case 'map':
			return map();
			return;
		default:
			http_response_code(404);
	}
}




echo API($_SERVER['REQUEST_URI']);


?>