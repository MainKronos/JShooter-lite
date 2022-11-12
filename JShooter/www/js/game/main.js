window.addEventListener("load", ()=>{

	console.log("test")

	fetch("./api/account/",{credentials: "same-origin"})
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
});