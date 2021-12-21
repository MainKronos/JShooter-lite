// import { Player, Enemy, Bullet } from "./entity.js";
import { MapProcessor } from "./map.js";
import {draw} from "./utility.js";

class GameBoard{

	constructor(){
		// setup
		this.canvas = document.querySelector('canvas#GameBoard');
		this.resizeBoard();
		this.ctx = this.canvas.getContext('2d');

		this.map = new MapProcessor(this.canvas);

		this.time = Date.now(); // serve per l'aggiornamento basato sul tempo
		// this.fps = 60;

		this.addListener();

		this.engine();
	}

	engine(){
		window.requestAnimationFrame(()=>this.engine());

		let dt = Date.now()-this.time;
		this.time = Date.now();

		this.update(dt/1000);
		this.render();
	}

	update(dt){
		// aggiorna tutti gli elementi

		this.map.update(dt);
		
	}
	render(){
		// renderizza tutti gli elementi
		draw(this.ctx).clear(this.canvas.width, this.canvas.height);

		// gestione camera
		this.ctx.save();
		this.ctx.translate(this.canvas.width/2,this.canvas.height/2);
		let scale = Math.min(this.canvas.width/1000, this.canvas.height/1000);
		scale = Math.max(scale, 0.5); // fattore scala massimo
		this.ctx.scale(scale,scale);
		this.ctx.translate(-this.map.player.x, -this.map.player.y); // mette il giocatore al centro della mappa

		let radius = Math.max(this.canvas.width/2,this.canvas.height/2) / scale;
		
		// gestione elementi mappa
		this.map.render(this.ctx, radius);
		this.ctx.restore();
	}

	addListener(){
		// aggiunge gli EventListener
		window.addEventListener('resize', ()=>this.resizeBoard());
		this.canvas.addEventListener('click', ()=>{
			let bullet = this.map.player.shoot();
			if(bullet) this.map.bullets.push(bullet);
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