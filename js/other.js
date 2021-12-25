import {draw} from "./utility.js";

export class InputManager{
	constructor(){
		this.mouse = {
			x: 0,
			y: 0,
			angle: 0
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
			if(event.target === document.querySelector('canvas#GameBoard')){
				inputs.mouse.angle = Math.atan2(event.y-event.target.height/2, event.x-event.target.width/2);
			}
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
	constructor(entity,width=0,height=0){

		this.entity = entity;
		this.width = width;
		this.height = height;
		this.radius = Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2)); // distanza massima quadratica
		this.points = [];
		this.enable = true; // hitbox attiva
		// this.type = type; // arc or box
		this.collision = [];
		
	}
	update(){ // aggiorna i punti dell'hitbox (aggiornare solo se strettamente necessario)
		this.points = this.getPoints();
	}

	render(ctx){
		draw(ctx).hitBox(this.entity.x, this.entity.y, this.width, this.height, this.entity.angle);
	}
	
	getPoints(){ 
		// ritorna tutti i punti dell'hitbox
		return [
			{
				x: this.entity.x + (this.entity.hitbox.width/2)*Math.cos(this.entity.angle) - (this.entity.hitbox.height/2)*Math.sin(this.entity.angle),
				y: this.entity.y + (this.entity.hitbox.width/2)*Math.sin(this.entity.angle) + (this.entity.hitbox.height/2)*Math.cos(this.entity.angle),
			},
			{
				x: this.entity.x + (this.entity.hitbox.width/2)*Math.cos(this.entity.angle) - (-this.entity.hitbox.height/2)*Math.sin(this.entity.angle),
				y: this.entity.y + (this.entity.hitbox.width/2)*Math.sin(this.entity.angle) + (-this.entity.hitbox.height/2)*Math.cos(this.entity.angle)
			},
			{
				x: this.entity.x + (-this.entity.hitbox.width/2)*Math.cos(this.entity.angle) - (-this.entity.hitbox.height/2)*Math.sin(this.entity.angle),
				y: this.entity.y + (-this.entity.hitbox.width/2)*Math.sin(this.entity.angle) + (-this.entity.hitbox.height/2)*Math.cos(this.entity.angle)
			},
			{
				x: this.entity.x + (-this.entity.hitbox.width/2)*Math.cos(this.entity.angle) - (this.entity.hitbox.height/2)*Math.sin(this.entity.angle),
				y: this.entity.y + (-this.entity.hitbox.width/2)*Math.sin(this.entity.angle) + (this.entity.hitbox.height/2)*Math.cos(this.entity.angle)
			}
		];
	}
	projectInAxis(x,y){
		let min = +Infinity;
		let max = -Infinity;
		let points = this.points;
		for (let i = 0; i < points.length; i++) {
			let px = points[i].x;
			let py = points[i].y;
			let projection = (px * x + py * y) / (Math.sqrt(x * x + y * y));
			if (projection > max) {
				max = projection;
			}
			if (projection < min) {
				min = projection;
			}
		}
		return { min, max };
	}

}

