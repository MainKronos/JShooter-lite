

class GameSettings{
	constructor(){

		let saveSettings = {
			showFPS: false,
			globalVolume: 1,
			backgroundVolume: 1,
			undeadVolume: 1,
			shotVolume: 1,
			punchVolume: 1,
			walkVolume: 1
		}

		this.showFPS = saveSettings['showFPS'];
		document.getElementById('showFPS').checked = saveSettings['showFPS'];

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
		});
		document.getElementById('globalVolume').addEventListener('change', ()=>{
			this.globalVolume = document.getElementById('globalVolume').value/100;
		})
		document.getElementById('backgroundVolume').addEventListener('change', ()=>{
			this.backgroundVolume = document.getElementById('backgroundVolume').value/100;
		})
		document.getElementById('undeadVolume').addEventListener('change', ()=>{
			this.undeadVolume = document.getElementById('undeadVolume').value/100;
		})
		document.getElementById('shotVolume').addEventListener('change', ()=>{
			this.shotVolume = document.getElementById('shotVolume').value/100;
		})
		document.getElementById('punchVolume').addEventListener('change', ()=>{
			this.punchVolume = document.getElementById('punchVolume').value/100;
		})
		document.getElementById('walkVolume').addEventListener('change', ()=>{
			this.walkVolume = document.getElementById('walkVolume').value/100;
		})
	}
}

export var settings = new GameSettings();