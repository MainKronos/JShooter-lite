<?php
session_start();
require $_SERVER['DOCUMENT_ROOT'].'/php/leaderboard.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

echo leaderboard();
?>