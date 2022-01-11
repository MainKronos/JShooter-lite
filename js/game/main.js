import { GameBoard } from "./game.js";

window.onload = function(){

	fetch("./api/account/")
	.then((response)=> response.json())
	.then((response)=>{
		if(!response['error']){
			let username = response['data']['username'];
			document.querySelector('span#username > span').textContent = username;
			let game = new GameBoard(username);
		}else{
			window.location.replace("./login/");
		}
	});
}