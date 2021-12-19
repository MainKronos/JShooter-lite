import { Player, Enemy, Bullet } from "./entity.js";
import { InputManager, EntityManager } from "./other.js";

export class MapProcessor{
	constructor(){
		// input manager
		this.inputs = new InputManager();

		// entity manager
		this.entityManager = new EntityManager();

		this.blockSize = 200;

		this.TextMap = [
			'W W W W W W W W W W W W W W W W W W W W',
			'W       W                             W',
			'W   P   W           E           E     W',
			'W       W                             W',
			'W       W           E     W W W W W W W',
			'W     W W                             W',
			'W                   E                 W',
			'W         E E                   E     W',
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
		return this.entityManager.entities;
	}
	get player() {
		return this.entityManager.player;
	};
	get enemies() {
		return this.entityManager.enemies;
	};
	get wall() {
		return this.entityManager.walls;
	};
	get bullets(){
		return this.entityManager.bullets;
	}
	generate(){
		for (let y = 0; y < this.TextMap.length; y++) {
			let row = this.TextMap[y];
		
			for (let x = 0; x < row.length; x += 2) {
				let char = row[x];
		
				switch (char) {
				// case 'W': this.entityManager.wall.push({ x: realX, y: y }); break;
				case 'E': this.entityManager.enemies.push(new Enemy((x/2)*this.blockSize, (y/2)*this.blockSize)); break;
				case 'P': this.entityManager.player = new Player((x/2)*this.blockSize, (y/2)*this.blockSize,this.inputs); break;
				}
			}
		}
	}
	update(){
		this.entityManager.update();
	}
	render(ctx){
		this.entityManager.render(ctx);
	}
}