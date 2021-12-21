import { Player, Enemy, Bullet, Wall } from "./entity.js";
import { InputManager } from "./other.js";
import {pointInPolygonFlat} from "./utility.js";

export class MapProcessor{
	constructor(){

		// entity manager
		this.player = {};
		this.enemies = [];
		this.walls = [];
		this.bullets = [];

		this.blockSize = 100;
		this.TextMap = [
			'      ',
			'E   P ',
			'      '
		];

		this.TextMap = [
			'W W W W W W W W W W W W W W W W W W W W',
			'W       W                             W',
			'W   P E W           E           E     W',
			'W       W                             W',
			'W       W           E     W W W W W W W',
			'W   WWWWW                             W',
			'W                   E                 W',
			'W        E  E                   E     W',
			'W                                     W',
			'W W W W W W W W W W W W W W           W',
			'W                         W           W',
			'W     E     E             W           W',
			'W                   E     W           W',
			'W W W W W W W             W           W',
			'W                         W           W',
			'W               W W W W W W           W',
			'W   E                     W           W',
			'W                                     W',
			'W         W W W                       W',
			'W           W                         W',
			'W W W W W W W W W W W W W W W W W W W W'
		];
		this.generate();
	}
	get entities(){
		return [].concat(this.walls, this.enemies, this.player, this.bullets);
	}
	generate(){
		this.player = new Player(0,0,new InputManager());
		for (let y = 0; y < this.TextMap.length; y++) {
			let row = this.TextMap[y];
		
			for (let x = 0; x < row.length; x++) {
				let char = row[x];
		
				switch (char) {
					case 'W': this.walls.push(new Wall(x*this.blockSize, y*this.blockSize, this.blockSize)); break;
					case 'E': this.enemies.push(new Enemy(x*this.blockSize, y*this.blockSize,this.player)); break;
					case 'P': this.player.x = x*this.blockSize; this.player.y = y*this.blockSize; break;
				}
			}
		}
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
}