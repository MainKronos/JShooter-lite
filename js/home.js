// file di home page




function login(){
	window.location.href='./login';
}
function logout(){
	fetch('./api/logout')
	.then(()=>{
		document.getElementById('login').removeEventListener('click', logout);
		document.getElementById('play').removeEventListener('click', play);
		start();
	});
}
function play(){
	window.location.href='./JShooter.html';
}

function start(){

	document.getElementById('leaderboard').addEventListener('click', ()=>window.location.href='./leaderboard')

	fetch("./api/account")
	.then((res)=> res.json())
	.then((res)=>{
		let usernameEl = document.getElementById('username');
		let loginEl = document.getElementById('login');
		let playEl = document.getElementById('play');


		if(!res['error']){
			// inizializzatore
			usernameEl.textContent = res['data']['username'];
			playEl.disabled = false;
			playEl.addEventListener('click', play);
			loginEl.addEventListener('click', logout);
			loginEl.textContent = 'LOGOUT';

		}else{
			usernameEl.textContent = '';
			playEl.disabled = true;
			loginEl.addEventListener('click', login);
			loginEl.textContent = 'LOGIN';
		}
	});
}

window.onload = start;