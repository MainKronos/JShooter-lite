
var nPage = 0; // pagina corrente
var get_data = false; // se sono stati scaricati tutti i dati

function getData(page=0){
	const tbl = document.querySelector('table > tbody');
	fetch(`../api/leaderboard/?page=${page}`)
	.then(res=>res.json())
	.then(res=>{
		if(res['data'].length==0) return;

		get_data = true;

		for(let row of res['data']){
			let tr = document.createElement('tr');

			

			for(let pro of ['user', 'score']){
				let td = document.createElement('td');
				td.appendChild(document.createTextNode(row[pro]+((pro=='score') ? ` (${row['matches']})`: '')))
				tr.appendChild(td);
			}			
			tbl.appendChild(tr);
		}
	});
}

window.onload = function(){

	// creazione tabella
	getData(nPage);
	
}

window.addEventListener('scroll', function(){
	if(window.scrollY + window.innerHeight >= document.body.offsetHeight-100){
		if(get_data){
			get_data = false;
			nPage++;
			getData(nPage);
		}
	}
});