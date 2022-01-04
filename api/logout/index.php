<?php
session_start();
require $_SERVER['DOCUMENT_ROOT'].'/php/logout.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

echo logout();
?>