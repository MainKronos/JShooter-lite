import { Player, Enemy, Bullet, Wall } from "./entity.js";
import { InputManager } from "./other.js";
import { hitboxOverlap } from "./utility.js";
import { draw } from "./drawing.js";

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
			'W   P   W  E        E           E     W',
			'W       W                             W',
			'W       W           E     WWWWWWWWWWWWW',
			'W     WWW                             W',
			'W                   E                 W',
			'W                               E     W',
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

		this.endGame = false; // 'bad' || 'good'

		this.generate();
	}
	get entities(){
		return [].concat(this.enemies, this.player, this.bullets, this.walls);
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
			if(Math.pow(elem.x - this.player.x,2) + Math.pow(elem.y - this.player.y,2) > Math.pow(this.player.alert*1.5,2)) return false;
			return true;
		});

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
					entity1.hitbox.collision.push(entity2);
					entity2.hitbox.collision.push(entity1);
				}
			}
		}
	}
	rearrangeEnemies(){
		// riordina i cadaveri dei nemici per non rendere le tombe in primo piano

		let tmp = null;
		let index = 0;
		for(let i=0; i<this.enemies.length;i++){
			if(this.enemies[i].health<=0){
				tmp = this.enemies[index];
				this.enemies[index] = this.enemies[i];
				this.enemies[i] = tmp;
				index++;
			}
		}
	}
	checkEndGame(){
		if(this.player.health<=0) return 'bad';


		let kill = 0;
		for(let enemy of this.enemies){
			if(enemy.health>0) return false;
			else kill++;
		}
		if(kill == this.enemies.length) return 'good';

		return false;
	}

	update(dt){
		if(this.player.health<=0) return;
		

		this.hitboxCollision();
		for(let entity of this.entities){
			// if()
			entity.update(dt);
			if(entity.toBeDeleted) this.deleteEntity(entity);
		}
		this.rearrangeEnemies();

		this.endGame = this.checkEndGame();
	}

	render(ctx){

		ctx.save();
		

		// gestione camera //////////////////////////////////////
		ctx.translate(this.canvas.width/2,this.canvas.height/2);
		let scale = Math.min(this.canvas.width/1000, this.canvas.height/1000);
		scale = Math.max(scale, 0.5); // fattore scala massimo
		ctx.scale(scale,scale);
		ctx.translate(-this.player.x, -this.player.y); // mette il giocatore al centro della mappa

		/////////////////////////////////////////////////

		// render background
		draw(ctx).background(-this.canvas.width,-this.canvas.height,this.size.width+2*this.canvas.width,this.size.height+2*this.canvas.height);

		// render entità
		for(let entity of this.entities){
			entity.render(ctx);
		}

		
		ctx.restore();
		// effetti visivi ///////////////////
		
		// draw(ctx).lightEffect(this.canvas.width/2, this.canvas.height/2, 900);

		draw(ctx).oldEffect(0,0,this.canvas.width,this.canvas.height);
		

		/////////////////////////////////////
	}
}