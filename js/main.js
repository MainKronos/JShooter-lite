// import { Player, Enemy, Bullet } from "./entity.js";
import { MapProcessor } from "./map.js";
import {draw} from "./utility.js";

class GameBoard{

	constructor(){
		// setup
		this.canvas = document.querySelector('canvas#GameBoard');
		this.resizeBoard();
		this.ctx = this.canvas.getContext('2d');

		this.map = new MapProcessor();

		this.addListener();

		this.update();
	}

	update(){
		// aggiorna tutti gli elementi

		this.map.update();
		window.requestAnimationFrame(()=>this.render());
	}
	render(){
		// renderizza tutti gli elementi
		draw(this.ctx).clear(this.canvas.width, this.canvas.height);

		this.map.render(this.ctx);
		
		this.update();
	}

	addListener(){
		// aggiunge gli EventListener
		window.addEventListener('resize', ()=>this.resizeBoard);
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