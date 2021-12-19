import { Player, Enemy, Bullet } from "./entity.js";
import { InputManager, EntityManager } from "./other.js";
import draw from "./utility.js";

class GameBoard{

	constructor(){
		// setup
		this.canvas = document.querySelector('canvas#GameBoard');
		this.resizeBoard();
		this.ctx = this.canvas.getContext('2d');

		// input manager
		this.inputs = new InputManager();

		// entity manager
		this.entities = new EntityManager();
		this.entities.walls = [];
		this.entities.enemies = [];
		this.entities.player = new Player(this.canvas.width/2,this.canvas.height/2,this.inputs);
		this.entities.bullets = []

		this.entities.enemies.push(new Enemy(500, 500));

		this.addListener();

		this.update();
	}

	update(){
		// aggiorna tutti gli elementi

		this.entities.update();
		window.requestAnimationFrame(()=>this.render());
	}
	render(){
		// renderizza tutti gli elementi
		draw(this.ctx).clear(this.canvas.width, this.canvas.height);

		this.entities.render(this.ctx);
		
		this.update();
	}

	addListener(){
		// aggiunge gli EventListener
		window.addEventListener('resize', ()=>this.resizeBoard);
		this.canvas.addEventListener('click', ()=>{
			let bullet = this.entities.player.shoot();
			if(bullet) this.entities.bullets.push(bullet);
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