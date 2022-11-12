<?php
session_start();
?>

<!DOCTYPE html>
<html lang="it">
	<head>
		<title>JShooter</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="./css/css.css">
		<link rel="shortcut icon" href="./favicon.ico" />
	</head>
	<body>
		<span id='username'>User: <span></span></span>
		<section>
			<h1 class='title'>J<span>S</span>hooter</h1>
			<button id='play' disabled>PLAY</button>
			<button id='login'>LOGIN</button>
			<button id='leaderboard'>LEADERBOARD</button>
			<p class="logsign">Prima volta? <a href="docs.html">Documentazione</a></p>
		</section>
		<footer>Made by Lorenzo Chesi</footer>
		<script src="./js/home.js"></script>
	</body>
</html>