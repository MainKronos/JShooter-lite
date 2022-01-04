// file per la pagina di login

var type = 'login';

document.querySelector('p.logsign > a').addEventListener('click', function(){
	let title = document.querySelector('h2.title');
	let logsign = document.querySelector('p.logsign');
	let button = document.getElementById('submit');

	if(type=='login'){
		type = 'signup';
		title.innerHTML = 'S<span>I</span>GNUP';
		button.textContent = 'SIGNUP';
		logsign.childNodes[0].nodeValue = 'Hai un account? ';
		this.textContent = 'LogIn';
	}else{
		type = 'login';
		title.innerHTML = 'L<span>O</span>GIN';
		button.textContent = 'LOGIN';
		logsign.childNodes[0].nodeValue = 'Non hai un account? ';
		this.textContent = 'SignUp';
	}
})

function submit(){

	let user = document.querySelector(`form > input[type='text']`);
	let pass = document.querySelector(`form > input[type='password']`);

	if(user.checkValidity() && pass.checkValidity()){
		fetch(`../api/${type}`, {
			method: 'POST',
			body: new FormData(document.querySelector('form'))
		})
		.then(res=>res.json())
		.then(res=>{
			if(!res['error']){
				window.location.href='../';
			}else{
				throw new Error(res['error']);
			}
		})
		.catch(err=>{
			// login NON avvenuto
			showError(err.message);
		});
	}
}

document.getElementById('submit').addEventListener('click', submit); 
document.addEventListener('keydown', function (event) {
	if(event.key == 'Enter') submit();
});

function showError(err){
	let user = document.querySelector(`form > input[type='text']`);
	let pass = document.querySelector(`form > input[type='password']`);
	let pErr = document.querySelector('p.error');

	user.setCustomValidity(err);
	pass.setCustomValidity(err);
	pErr.textContent = err;

	setTimeout(()=>{
		pErr.textContent = ''
	},3000);
	setTimeout(()=>{
		user.setCustomValidity('');
		pass.setCustomValidity('');
	},1000);
}


window.onload = function(){
	fetch("../api/account")
	.then((response)=> response.json(), ()=>{})
	.then((response)=>{
		if(!response['error']){
			// inizializzatore
			document.getElementById('username').textContent = response['data']['username'];
		}
	});
}