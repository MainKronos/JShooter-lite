class MapProcessor{
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


		this.TextMap = TextMap;

		this.size = {width:(this.TextMap[0].length-1)*this.blockSize, height:this.TextMap.length*this.blockSize};
		this.generate();
	}
	get entities(){
		return [].concat(this.corpses, this.walls, this.enemies, this.player, this.bullets);
	}
	generate(){
		this.player = new Player(0,0,input);
		let spownpoints = [];
		for (let y = 0; y < this.TextMap.length; y++) {
			let row = this.TextMap[y];
		
			for (let x = 0; x < row.length; x++) {
				let char = row[x];
		
				switch (char) {
					case 'W': this.walls.push(new Wall(x*this.blockSize, y*this.blockSize, this.blockSize)); break;
					case 'E': this.enemies.push(new Enemy(x*this.blockSize, y*this.blockSize,this.player)); break;
					case 'P': spownpoints.push({x:x*this.blockSize, y:y*this.blockSize}); break;
				}
			}
		}
		let sp = spownpoints[Math.floor(Math.random()*spownpoints.length)];
		this.player.x = sp.x;
		this.player.y = sp.y;
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
			if(!elem.hitbox.enable) return false; // se l'hitbox NON è abilitata
			if(Math.pow(elem.x - this.player.x,2) + Math.pow(elem.y - this.player.y,2) > Math.pow(this.player.alert*1.5,2)) return false; // se le entità si trovano FUORI dal raggio di allerta del giocatore
			return true;
		});

		for(let i=0; i<entities.length-1; i++){
			let entity1 = entities[i];

			for(let j=i+1; j<entities.length; j++){
				let entity2 = entities[j];
				
				if(entity1 instanceof Wall && entity2 instanceof Wall) continue; // è irrilevante se 2 muri collidono			

				if(hitboxOverlap(entity1.hitbox, entity2.hitbox)){
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
			return true;
		});


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
		ctx.translate(-this.player.x, -this.player.y); // mette il giocatore al centro della mappa

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