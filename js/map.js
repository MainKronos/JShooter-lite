import { Player, Enemy, Bullet, Wall } from "./entity.js";
import { InputManager } from "./other.js";
import {hitboxOverlap} from "./utility.js";
import { draw } from "./utility.js";

export class MapProcessor{
	constructor(canvas){

		// entity manager
		this.player = {};
		this.enemies = [];
		this.walls = [];
		this.bullets = [];

		this.canvas = canvas;

		this.blockSize = 100;

		this.TextMap = [
			'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
			'W       W                             W',
			'W   P   W           E           E     W',
			'W       W                             W',
			'W       W           E     WWWWWWWWWWWWW',
			'W     WWW                             W',
			'W                   E                 W',
			'W         E E                   E     W',
			'W                                     W',
			'WWWWWWWWWWWWWWWWWWWWWWWWWWW           W',
			'W                         W           W',
			'W     E     E             W           W',
			'W                   E     W           W',
			'WWWWWWWWWWWWW             W           W',
			'W                         W           W',
			'W               WWWWWWWWWWW           W',
			'W                         W           W',
			'W                                     W',
			'W         WWWWW                       W',
			'W           W                         W',
			'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'
		];

		this.size = {width:this.TextMap[0].length*this.blockSize, height:this.TextMap.length*this.blockSize};

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
		let entities = this.entities.filter(elem => {
			if(!elem.hitbox.enable) return false;
			if(Math.pow(elem.x - this.player.x,2) + Math.pow(elem.y - this.player.y,2) > Math.pow(this.player.alert,2)) return false;
			return true;
		});

		
		// console.log(entities);
		// let counter = 0;
		// let d = Date.now();

		for(let i=0; i<entities.length-1; i++){
			let entity1 = entities[i];

			for(let j=i+1; j<entities.length; j++){
				// counter++;
				let entity2 = entities[j];
				
				if(entity1 instanceof Wall && entity2 instanceof Wall) continue; // è irrilevante se 2 muri collidono

				let r1 = Math.sqrt(Math.pow(entity1.x-entity2.x,2) + Math.pow(entity1.y-entity2.y,2));
				let r2 = entity1.hitbox.radius+entity2.hitbox.radius;
				if(r1>r2) continue; // se la distanza tra le 2 entità è maggiore della somma dei loro raggi

				// console.log("test");

				entity1.hitbox.update();
				entity2.hitbox.update();
				


				if(hitboxOverlap(entity1.hitbox, entity2.hitbox)){
					// console.log(entity1.constructor.name, entity2.constructor.name);
					if(!(entity1 instanceof Wall)) entity1.hitbox.collision.push(entity2);
					if(!(entity2 instanceof Wall)) entity2.hitbox.collision.push(entity1);
					break;
				}
			}
		}
		// console.log(Date.now()-d, counter);
	}
	update(dt){
			
		// console.log(Math.round(mdt*10000)/10000, Mdt);
		
		

		this.hitboxCollision();
		for(let entity of this.entities){
			// if()
			entity.update(dt);
			if(entity.toBeDeleted) this.deleteEntity(entity);
		}
	}
	render(ctx){
		draw(ctx).background(-this.canvas.width,-this.canvas.height,this.size.width+2*this.canvas.width,this.size.height+2*this.canvas.height);

		for(let entity of this.entities){

			// if(Math.abs(this.player.x - entity.x)<radius && Math.abs(this.player.y - entity.y)<radius) 
				entity.render(ctx);
		}
	}
}