import { GameBoard } from "./game.js";

window.onload = function(){

	fetch("./api/account")
	.then((response)=> response.json())
	.then((response)=>{
		if(!response['error']){
			// inizializzatore
			document.getElementById('username').textContent = response['data']['username'];
			let game = new GameBoard();
		}else{
			window.location.replace("./login");
		}
	});
}