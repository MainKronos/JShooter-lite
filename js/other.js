import {draw, pointInPolygonFlat} from "./utility.js";

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
	constructor(entity,width=0,height=0){

		this.entity = entity;
		this.width = width;
		this.height = height;
		this.enable = true; // hitbox attiva
		// this.type = type; // arc or box
		this.collision = [];
		
	}

	render(ctx){
		draw(ctx).hitBox(this.entity.x, this.entity.y, this.width, this.height, this.entity.angle, this.type);
	}
}

export class EntityManager{
	constructor(){
		this.player = [];
		this.enemies = [];
		this.walls = [];
		this.bullets = [];
	}

	get entities(){
		return [].concat(this.walls, this.enemies, this.player, this.bullets);
	}

	deleteEntity(entity){
		// cancella un entita
		if(entity===this.player){
			this.player = null;
			return;
		}
		if(this.enemies.includes(entity)){
			this.enemies.splice(this.enemies.indexOf(entity),1);
			return;
		}
		if(this.walls.includes(entity)){
			this.walls.splice(this.walls.indexOf(entity),1);
			return;
		}
		if(this.bullets.includes(entity)){
			this.bullets.splice(this.bullets.indexOf(entity),1);
			return;
		}
	}

	update(){
		this.hitboxCollision();
		for(let entity of this.entities){
			entity.update();
			if(entity.toBeDeleted) this.deleteEntity(entity);
		}
	}

	render(ctx){
		
		for(let entity of this.entities){
			entity.render(ctx);
		}
	}

	hitboxCollision(){
		// caso tipo box
		let entities = this.entities;
		
		// console.log(entities);

		for(let i=0; i<entities.length-1; i++){
			let entity1 = this.entities[i];

			if(!entity1.hitbox.enable) continue;

			let rect1 = [];
			rect1.push(entity1.x + (entity1.hitbox.width/2)*Math.cos(entity1.angle) - (entity1.hitbox.height/2)*Math.sin(entity1.angle));
			rect1.push(entity1.y + (entity1.hitbox.width/2)*Math.sin(entity1.angle) + (entity1.hitbox.height/2)*Math.cos(entity1.angle));

			rect1.push(entity1.x + (entity1.hitbox.width/2)*Math.cos(entity1.angle) - (-entity1.hitbox.height/2)*Math.sin(entity1.angle));
			rect1.push(entity1.y + (entity1.hitbox.width/2)*Math.sin(entity1.angle) + (-entity1.hitbox.height/2)*Math.cos(entity1.angle));

			rect1.push(entity1.x + (-entity1.hitbox.width/2)*Math.cos(entity1.angle) - (-entity1.hitbox.height/2)*Math.sin(entity1.angle));
			rect1.push(entity1.y + (-entity1.hitbox.width/2)*Math.sin(entity1.angle) + (-entity1.hitbox.height/2)*Math.cos(entity1.angle));

			rect1.push(entity1.x + (-entity1.hitbox.width/2)*Math.cos(entity1.angle) - (entity1.hitbox.height/2)*Math.sin(entity1.angle));
			rect1.push(entity1.y + (-entity1.hitbox.width/2)*Math.sin(entity1.angle) + (entity1.hitbox.height/2)*Math.cos(entity1.angle));

			checkCollision:
			for(let j=i+1; j<entities.length; j++){
				let entity2 = this.entities[j];

				if(!entity2.hitbox.enable) continue;

				let rects = [];

				let rect2 = [];
				rect2.push(entity2.x + (entity2.hitbox.width/2)*Math.cos(entity2.angle) - (entity2.hitbox.height/2)*Math.sin(entity2.angle));
				rect2.push(entity2.y + (entity2.hitbox.width/2)*Math.sin(entity2.angle) + (entity2.hitbox.height/2)*Math.cos(entity2.angle));

				rect2.push(entity2.x + (entity2.hitbox.width/2)*Math.cos(entity2.angle) - (-entity2.hitbox.height/2)*Math.sin(entity2.angle));
				rect2.push(entity2.y + (entity2.hitbox.width/2)*Math.sin(entity2.angle) + (-entity2.hitbox.height/2)*Math.cos(entity2.angle));

				rect2.push(entity2.x + (-entity2.hitbox.width/2)*Math.cos(entity2.angle) - (-entity2.hitbox.height/2)*Math.sin(entity2.angle));
				rect2.push(entity2.y + (-entity2.hitbox.width/2)*Math.sin(entity2.angle) + (-entity2.hitbox.height/2)*Math.cos(entity2.angle));

				rect2.push(entity2.x + (-entity2.hitbox.width/2)*Math.cos(entity2.angle) - (entity2.hitbox.height/2)*Math.sin(entity2.angle));
				rect2.push(entity2.y + (-entity2.hitbox.width/2)*Math.sin(entity2.angle) + (entity2.hitbox.height/2)*Math.cos(entity2.angle));

				rects.push(rect2);
				rects.push(rect1);

				for(let l=0; l<rects.length; l++){
					for(let k=0;k<rects[l].length;k+=2){
						if(pointInPolygonFlat([rects[l][k], rects[l][k+1]], rects[(l+1)%2])){
							// console.log(entity1.constructor.name, entity2.constructor.name);
							entity1.hitbox.collision.push(entity2);
							entity2.hitbox.collision.push(entity1);
							break checkCollision;
						}
					}
				}
			}
		}
	}
}
