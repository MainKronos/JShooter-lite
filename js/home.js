// file di home page


document.getElementById('play').addEventListener('click', function(){
	window.location.href='./JShooter.html';
})
document.getElementById('login').addEventListener('click', function(){
	window.location.href='./login';
})

window.onload = function(){
	fetch("./api/account")
	.then((response)=> response.json())
	.then((response)=>{
		if(!response['error']){
			// inizializzatore
			document.getElementById('username').textContent = response['data']['username'];
		}
	});
}