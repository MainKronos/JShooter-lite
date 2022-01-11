

class GameSettings{
	constructor(){


		fetch('./api/account/settings/')
		.then((res)=> res.json())
		.then((res)=>{
			let saveSettings = (!res['error'])? res['data'] : {
				showFPS: false,
				showHitBox: false,
				globalVolume: 1,
				backgroundVolume: 1,
				undeadVolume: 1,
				shotVolume: 1,
				punchVolume: 1,
				walkVolume: 1
			}

			this.showFPS = saveSettings['showFPS'];
			document.getElementById('showFPS').checked = saveSettings['showFPS'];
			document.querySelector('span#FPS').style.display = (this.showFPS) ? 'block' : 'none';

			this.showHitBox = saveSettings['showHitBox'];
			document.getElementById('showHitBox').checked = saveSettings['showHitBox'];

			this.globalVolume = saveSettings['globalVolume'];
			document.getElementById('globalVolume').value = saveSettings['globalVolume']*100;

			this.backgroundVolume = saveSettings['backgroundVolume'];
			document.getElementById('backgroundVolume').value = saveSettings['backgroundVolume']*100;

			this.undeadVolume = saveSettings['undeadVolume'];
			document.getElementById('undeadVolume').value = saveSettings['undeadVolume']*100;

			this.shotVolume = saveSettings['shotVolume'];
			document.getElementById('shotVolume').value = saveSettings['shotVolume']*100;

			this.punchVolume = saveSettings['punchVolume'];
			document.getElementById('punchVolume').value = saveSettings['punchVolume']*100;

			this.walkVolume = saveSettings['walkVolume'];
			document.getElementById('walkVolume').value = saveSettings['walkVolume']*100;

			this.addListener();
		});
		
	}
	syncData(){
		let saveSettings = {
			showFPS: this.showFPS,
			showHitBox: this.showHitBox,
			globalVolume: this.globalVolume,
			backgroundVolume: this.backgroundVolume,
			undeadVolume: this.undeadVolume,
			shotVolume: this.shotVolume,
			punchVolume: this.punchVolume,
			walkVolume: this.walkVolume
		}

		fetch('./api/account/settings/',{
			method: 'POST',
			body: JSON.stringify(saveSettings)
		});
	}
	show(cond){
		// mostra o nasconde il game settings a seconda del cond

		let sett = document.getElementById('GameSettings');
		sett.style.display = cond ? 'flex' : 'none';
		for(let elem of sett.children){
			elem.disabled = !cond;
		}
	}
	addListener(){
		document.getElementById('showFPS').addEventListener('change', ()=>{
			this.showFPS = document.getElementById('showFPS').checked;
			document.querySelector('span#FPS').style.display = (this.showFPS) ? 'block' : 'none';
			this.syncData();
		});
		document.getElementById('showHitBox').addEventListener('change', ()=>{
			this.showHitBox = document.getElementById('showHitBox').checked;
			this.syncData();
		});
		document.getElementById('globalVolume').addEventListener('change', ()=>{
			this.globalVolume = document.getElementById('globalVolume').value/100;
			this.syncData();
		});
		document.getElementById('backgroundVolume').addEventListener('change', ()=>{
			this.backgroundVolume = document.getElementById('backgroundVolume').value/100;
			this.syncData();
		});
		document.getElementById('undeadVolume').addEventListener('change', ()=>{
			this.undeadVolume = document.getElementById('undeadVolume').value/100;
			this.syncData();
		});
		document.getElementById('shotVolume').addEventListener('change', ()=>{
			this.shotVolume = document.getElementById('shotVolume').value/100;
			this.syncData();
		});
		document.getElementById('punchVolume').addEventListener('change', ()=>{
			this.punchVolume = document.getElementById('punchVolume').value/100;
			this.syncData();
		});
		document.getElementById('walkVolume').addEventListener('change', ()=>{
			this.walkVolume = document.getElementById('walkVolume').value/100;
			this.syncData();
		});
	}
}

export var settings = new GameSettings();