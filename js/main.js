// import { Player, Enemy, Bullet } from "./entity.js";
import { MapProcessor } from "./map.js";
import { FPSCounter } from "./fps.js";

class GameBoard{

	constructor(){
		// setup
		this.canvas = document.querySelector('canvas#GameBoard');
		this.resizeBoard();
		this.ctx = this.canvas.getContext('2d');

		this.map = new MapProcessor(this.canvas);

		this.time = 0; // serve per l'aggiornamento basato sul tempo
		this.fps = new FPSCounter();

		this.addListener();

		this.engine();
	}

	engine(){
		window.requestAnimationFrame(()=>this.engine());
		

		let dt = Date.now()-this.time;

		if(Math.round(1000/dt)<=+Infinity){ // limitatore fps
			this.time = Date.now();

			this.update(dt/1000);
			this.render();
		}
		
	}

	update(dt){
		// aggiorna tutti gli elementi
		this.fps.update(dt);
		this.map.update(dt);

		
		
	}
	render(){
		// renderizza tutti gli elementi
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// gestione elementi mappa
		this.map.render(this.ctx);

		this.fps.render(this.ctx);

		
	}

	addListener(){
		// aggiunge gli EventListener
		window.addEventListener('resize', ()=>this.resizeBoard());
		this.canvas.addEventListener('click', ()=>{
			let bullets = this.map.player.shoot();
			if(bullets) this.map.bullets.push(...bullets);
		});
	}

	resizeBoard(){
		// aggiorna la grandezza del canvas
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	
}

window.onload = function(){
	// inizializzatore
	let game = new GameBoard();
}