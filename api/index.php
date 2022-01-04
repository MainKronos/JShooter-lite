<?php

session_start();
require $_SERVER['DOCUMENT_ROOT'].'/php/help.php';

header("Access-Control-Allow-Origin: *");
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

echo help();


?>