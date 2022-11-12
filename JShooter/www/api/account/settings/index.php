<?php
session_start();
require '../../../php/settings.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

echo settings();
?>