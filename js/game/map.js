import { Player, Enemy, Bullet, Wall } from "./entity.js";
import { input } from "./input.js";
import { hitboxOverlap } from "./utility.js";
import { draw } from "./drawing.js";

export class MapProcessor{
	constructor(canvas, TextMap){

		// entity manager
		this.player = {};
		this.enemies = [];
		this.walls = [];
		this.bullets = [];
		this.corpses = [];

		this.canvas = canvas;

		this.blockSize = 150;
		this.endGame = false; // 'bad' || 'good'

		this.scale =  Math.max(Math.min(this.canvas.width/1000, this.canvas.height/1000),0.5);


		this.TextMap = TextMap
		// this.TextMap = [
		// 	'WWWWWWWWWWWWWWWWWWWWWWW',
		// 	'W           W         W',
		// 	'W   P    E  W     E   W',
		// 	'WWWWWWWWWWWWWWWWWWWWWWW',
		// ]

		// this.TextMap = [
		// 	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
		// 	"W       W                E   W",
		// 	"W   E   W                E   W",
		// 	"W  W  E W  WWWWWWWWWWWWWWWW  W",
		// 	"W  W    WEEW          E   W  W",
		// 	"W  W    W  W          E   W  W",
		// 	"W  W    W  W  WWWWWWWWWW  W  W",
		// 	"W  W    W  WEEW        W  W  W",
		// 	"W  W E  W  W  W        W  W  W",
		// 	"W  W    W  W  W  WWWW  W  W  W",
		// 	"W  W    W  W  WEE   W  W  W  W",
		// 	"W  W E  W  W  W     WEEW  W  W",
		// 	"W  W    W  W  WWWWWWW  W  W  W",
		// 	"W  W  E W  W   E       W  W  W",
		// 	"W  W    W  W   E       WEEW  W",
		// 	"W  W    W  WWWWWWWWWWWWW  W  W",
		// 	"W  W    W   E             W  W",
		// 	"W  W E  W   E             W  W",
		// 	"W  W    WWWWWWWWWWWWWWWWWWW  W",
		// 	"W  W    W  W              W  W",
		// 	"W  W    W  W              W  W",
		// 	"W  WW  WW  W E   E  E  W  W  W",
		// 	"W  W    W  W  E     E  W  W  W",
		// 	"W  W    W  W      E    W  W  W",
		// 	"W  W    W  W    E      W  W  W",
		// 	"W  W P  W  W       E   W  W  W",
		// 	"W  WWWWWW  W  E        W  W  W",
		// 	"W               E E  E W     W",
		// 	"W                      W     W",
		// 	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
		// ]

		this.size = {width:(this.TextMap[0].length-1)*this.blockSize, height:this.TextMap.length*this.blockSize};
		this.generate();
	}
	get entities(){
		return [].concat(this.corpses, this.walls, this.enemies, this.player, this.bullets);
	}
	generate(){
		this.player = new Player(0,0,input);
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
			if(
				!((this.player.x-this.blockSize)*this.scale-this.canvas.width/2<=elem.x*this.scale) || 
				!(elem.x*this.scale <=(this.player.x+this.blockSize)*this.scale+this.canvas.width/2) ||
				!((this.player.y-this.blockSize)*this.scale-this.canvas.height/2<=elem.y*this.scale) || 
				!(elem.y*this.scale <=(this.player.y+this.blockSize)*this.scale+this.canvas.height/2)
			) return false;
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
		for(let elem of this.enemies){
			if(elem.health<=0){
				this.corpses.push(this.enemies.splice(this.enemies.indexOf(elem),1)[0]);
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

		if(input.mouse.click){
			let bullets = this.player.shoot();
			if(bullets) this.bullets.push(...bullets);
		}
		
		this.hitboxCollision();

		let fEntities = this.entities.filter(elem => {
			if(!elem.hitbox.enable) return false;
			if(Math.pow(elem.x - this.player.x,2) + Math.pow(elem.y - this.player.y,2) > Math.pow(this.player.alert*1.5,2)) return false;
			if(
				!((this.player.x-this.blockSize)*this.scale-this.canvas.width/2<=elem.x*this.scale) || 
				!(elem.x*this.scale <=(this.player.x+this.blockSize)*this.scale+this.canvas.width/2) ||
				!((this.player.y-this.blockSize)*this.scale-this.canvas.height/2<=elem.y*this.scale) || 
				!(elem.y*this.scale <=(this.player.y+this.blockSize)*this.scale+this.canvas.height/2)
			) return false;
			return true;
		})
		for(let entity of fEntities){
			entity.update(dt);
		}
		for(let bullet of this.bullets) if(bullet.toBeDeleted) this.deleteEntity(bullet);
		this.rearrangeEnemies();

		this.endGame = this.checkEndGame();
	}

	render(ctx){

		this.scale = Math.max(Math.min(this.canvas.width/1000, this.canvas.height/1000),0.5);

		ctx.save();		

		// gestione camera //////////////////////////////////////
		ctx.translate(Math.round(this.canvas.width/2),Math.round(this.canvas.height/2));
		ctx.scale(this.scale,this.scale);
		ctx.translate(Math.round(-this.player.x), Math.round(-this.player.y)); // mette il giocatore al centro della mappa

		/////////////////////////////////////////////////

		// render background
		draw(ctx).background(Math.round(-this.blockSize/2),Math.round(-this.blockSize/2),this.size.width,this.size.height);

		// render entità
		for(let entity of this.entities){
			if(
				(this.player.x-this.blockSize)*this.scale-this.canvas.width/2<=entity.x*this.scale && 
				entity.x*this.scale <=(this.player.x+this.blockSize)*this.scale+this.canvas.width/2 &&
				(this.player.y-this.blockSize)*this.scale-this.canvas.height/2<=entity.y*this.scale && 
				entity.y*this.scale <=(this.player.y+this.blockSize)*this.scale+this.canvas.height/2
			) entity.render(ctx);
		}

		
		ctx.restore();
		draw(ctx).poiter(Math.round(input.mouse.x), Math.round(input.mouse.y));
		// effetti visivi ///////////////////
		
		// draw(ctx).lightEffect(this.canvas.width/2, this.canvas.height/2, 900);

		draw(ctx).oldEffect(0,0,this.canvas.width,this.canvas.height);
		

		/////////////////////////////////////
	}
}