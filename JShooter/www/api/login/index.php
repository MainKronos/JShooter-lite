<?php
session_start();
require '../../php/login.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

echo login();
?>