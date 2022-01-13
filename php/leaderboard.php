<?php
require 'db.php';
function leaderboard(){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		// prende lo score

		$page_size = 30;
		$page = filter_var($_GET["page"], FILTER_SANITIZE_NUMBER_INT); // inizia da 0

		$result = db()->query("CALL GetScore($page, $page_size);");

		$res = array();

		while ($row = $result->fetch()) {
			$user = $row['username'];
			$score = $row['score'];
			$matches = $row['matches'];
			$rank = $row['rank'];
			array_push($res, array('user'=>$user , 'score'=>$score, 'matches'=>$matches, 'rank'=>$rank));
		}
		return json_encode(array(
			'error' => false,
			'data' => $res
		));

	}
	http_response_code(400);
	return;
}
?>