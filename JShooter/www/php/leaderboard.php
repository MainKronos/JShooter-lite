<?php
require 'db.php';



function leaderboard(){
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		// prende lo score

		$page_size = 30;
		$page = filter_var($_GET["page"], FILTER_SANITIZE_NUMBER_INT); // inizia da 0

		$rank = $page_size*$page + 1;

		$result = db()->query("
			SELECT p.*
			FROM (
				SELECT 
					k.username, 
					IIF(not IFNULL(k.score,false), '-', ROUND(k.score,0)) as score, 
					k.matches
				FROM (
					SELECT 
						u.username, 
						u.registration, 
						s.score/1000 as score, 
						IFNULL(s.matches,0) as matches
					FROM 
						User u LEFT OUTER JOIN (
							SELECT s.username, MIN(s.score) as score, COUNT(*) as matches
							FROM Score s
							GROUP BY s.username
						) as s on u.username = s.username
				)as k
				ORDER BY 
					not IFNULL(k.score,false) ASC,
					k.score ASC, 
					k.registration ASC
			) as p
			LIMIT $page*$page_size, $page_size;
		");

		$res = array();

		while ($row = $result->fetch()) {
			$user = $row['username'];
			$score = $row['score'];
			$matches = $row['matches'];
			array_push($res, array('user'=>$user , 'score'=>$score, 'matches'=>$matches, 'rank'=>$rank++));
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