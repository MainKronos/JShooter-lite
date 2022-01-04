<?php
require $_SERVER['DOCUMENT_ROOT'].'/php/db.php';
function score(){
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_SESSION["username"])){

			$data = json_decode(file_get_contents('php://input'), true);
			$gameID = $data['gameID'];
			if(isset($_SESSION[$gameID])){

				$ricezione = round(microtime(true) * 1000);

				$session = $_SESSION[$gameID];
				$_SESSION[$gameID] = null;

				$score = base64_decode($data['score']);
				$score = substr($score, $score[0], substr($score, -1));

				// se la durata della partita inviata dal client è inferiore di 1 secondi alla differenza della durata calcolata dal server
				if(($ricezione - $session['start'] - $score <= 1000) && ($ricezione - $session['start'] - $score > 0)){
					$username = $_SESSION['username'];
					$map = $session['map'];
					db()->exec("CALL UpdateScore('$username', '$map', $score);");
					return json_encode(array(
						'error' => false
					));
				}
				error_log('Errore trasmissione dati.');
				return json_encode(array(
					'error' => 'Errore trasmissione dati.'
				));
			}
			return json_encode(array(
				'error' => 'Partita non precedentemente inizializzata.'
			));
		}
		return json_encode(array(
			'error' => 'Utente non loggato.'
		));
	}
	http_response_code(400);
}
?>