import draw from "./utility.js";

export class InputManager{
	constructor(){
		this.mouse = {
			x: 0,
			y: 0
		};
		this.key = {
			up: false,
			down: false,
			right: false,
			left: false
		}

		this.addListener();
	}

	addListener(){
		// crea gli EventListener per le varie interazione dell'utente

		let inputs = this;

		// mouse event
		document.addEventListener('mousemove', function (event) {
			inputs.mouse.x = event.clientX;
			inputs.mouse.y = event.clientY;
		});

		// key event
		document.addEventListener('keydown', function (event) {
			switch (event.key) {
				case "w": inputs.key.up = true; break;
				case "s": inputs.key.down = true; break;
				case "a": inputs.key.left = true; break;
				case "d": inputs.key.right = true; break;
			}
		});
			
		document.addEventListener('keyup', function (event) {
			switch (event.key) {
				case "w": inputs.key.up = false; break;
				case "s": inputs.key.down = false; break;
				case "a": inputs.key.left = false; break;
				case "d": inputs.key.right = false; break;
			}
		});
	}
}


export class HitBox{
	// classe cella hitbox
	constructor(entity,width=0,height=0,type='box'){

		this.entity = entity;
		this.width = width;
		this.height = height;
		this.type = type; // arc or box
		
	}

	render(ctx){
		draw(ctx).hitBox(this.entity.x, this.entity.y, this.width, this.height, this.entity.angle, this.type);
	}
}

export class EntityManager{
	constructor(){
		this.player = null;
		this.enemies = [];
		this.walls = [];
		this.bullets = [];
	}

	get entities(){
		return [].concat(this.player, this.enemies, this.walls, this.bullets);
	}

	update(){
		for(let entity of this.entities){
			entity.update();
		}
	}

	render(ctx){
		for(let entity of this.entities){
			entity.render(ctx);
		}
	}

	static hitboxCollision(hitbox1, hitbox2){
		// caso tipo box
		// TODO: da finire
	}

	bulletsCollision(){
		// controlla la collisione dei proiettili


	}
}