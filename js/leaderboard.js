window.onload = function(){

	const tbl = document.querySelector('table > tbody');
	// const tbdy = document.createElement('tbody');
	fetch('../api/leaderboard')
	.then(res=>res.json())
	.then(res=>{
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