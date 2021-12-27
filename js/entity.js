import { draw } from "./drawing.js";


class Entity{
	constructor(x,y){
		// this.boundingType = 'arc';
		this.x = x;
		this.y = y;
		this.angle = 0;	
		this.maxSpeed = 0;
		// this.knockback = 0;
		this.toBeDeleted = false;
	}
	update(){console.log('Funzione update() non inizializzata.')}
	render(ctx){console.log('Funzione render() non inizializzata.')}
}

var attrito = 1000; // attrito terreno

export class Player extends Entity{
	// classe giocatore
	constructor(x,y,inputs){
		super(x,y);
		this.angle = 0;

		this.hitbox = new HitBox(this,83,120);
		// this.hitbox.enable = false;

		this.maxSpeed = 500; // px/s massima
		this.resSpeed = {x:0,y:0} //velocità residua
		this.health = 100;

		this.inputs = inputs;
		this.alert = 500; // raggio di allerta dei nemici

		this.timeReload = 0.05; // tempo di ricarica dell'arma in secondi
		this.reload = 0;  // tempo passato dallo sparo
		this.knockback = 200; // valore di spinta

	}

	update(dt){
		// aggiorna il giocatore
		if (this.health<=0) return;


		let rotate = this.inputs.mouse.angle; // angolo rotazione

		let speed = { // velocità normalizzata
			x: this.maxSpeed*(this.inputs.key.right - this.inputs.key.left)/(this.inputs.key.up != this.inputs.key.down ? Math.SQRT2 : 1),
			y: this.maxSpeed*(this.inputs.key.down - this.inputs.key.up)/(this.inputs.key.right != this.inputs.key.left ? Math.SQRT2 : 1)
		}

		// velocità residua
		this.resSpeed.x *= Math.abs(speed.x) > Math.abs(this.resSpeed.x)? 0 : Math.pow(1/attrito,dt);
		this.resSpeed.y *= Math.abs(speed.y) > Math.abs(this.resSpeed.y)? 0 : Math.pow(1/attrito,dt);

		console.log(this.hitbox.collision.filter(el=>el instanceof Wall).length);

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){

			for(let entity of this.hitbox.collision.filter(el=>el instanceof Bullet || el instanceof Enemy)){
				this.health -= entity.damage;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Player || el instanceof Enemy || el instanceof Bullet)){
				this.resSpeed.x -= Math.sign(entity.x - this.x)*entity.knockback;
				this.resSpeed.y -= Math.sign(entity.y - this.y)*entity.knockback;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Wall)){
				// TODO: da sistemare perchè vibra
				let dx = entity.x - this.x;
				let dy = entity.y - this.y;

				this.resSpeed.x = Math.abs(dx) >= Math.abs(dy) ? -Math.sign(dx)*this.maxSpeed:this.resSpeed.x;
				this.resSpeed.y = Math.abs(dy) >= Math.abs(dx) ? -Math.sign(dy)*this.maxSpeed:this.resSpeed.y;
				// break;
			}
			this.hitbox.collision = [];
		}


		// aggiornamento posizione

		// this.resSpeed.x += Math.abs(this.resSpeed.x) < Math.abs(speed.x) ? speed.x : 0;
		// this.resSpeed.y += Math.abs(this.resSpeed.y) < Math.abs(speed.y) ? speed.y : 0;
		
		speed.x += this.resSpeed.x;
		speed.y += this.resSpeed.y;
		

		let move = { // movimento
			x: speed.x*dt,
			y: speed.y*dt
		}
		
		// this.x += distance*((this.inputs.key.right - this.inputs.key.left)*Math.cos(this.inputs.mouse.angle)-(this.inputs.key.down - this.inputs.key.up)*Math.sin(this.inputs.mouse.angle));
		// this.y += distance*((this.inputs.key.right - this.inputs.key.left)*Math.sin(this.inputs.mouse.angle)+(this.inputs.key.down - this.inputs.key.up)*Math.cos(this.inputs.mouse.angle));
		this.x += move.x;
		this.y += move.y;
		

		//aggiornamento rotazione
		this.angle = rotate;

		// aggiornamento ricarica
		this.reload -= (this.reload>0)*dt;

		if(this.health <= 0) this.hitbox.enable = false;

		return this;
	}

	render(ctx){
		// rederizza il giocatore

		if (this.health>0) {
			draw(ctx).human(this.x,this.y,this.angle);
			draw(ctx).healthBar(this.x, this.y, this.health);
		} else {
			draw(ctx).deadHuman(this.x,this.y,this.angle);
		}

		
		// this.hitbox.render(ctx);
		return this;
	}

	shoot(){
		if(this.reload<=0 && this.health>0){
			// spara un colpo
			this.reload = this.timeReload;
			let bulletX = this.x + 140 * Math.cos(this.angle);
			let bulletY = this.y + 140 * Math.sin(this.angle);

			return [new Bullet(bulletX, bulletY, this.angle)];
		}else{
			return null;
		}
	}

}

export class Enemy extends Entity{
	constructor(x,y,target=null){
		super(x,y);
		this.angle = Math.random()*Math.PI*2;
		this.hitbox = new HitBox(this,83,120);

		this.maxSpeed = 100; // px/s
		this.resSpeed = {x:0,y:0} //velocità residua
		this.health = 100;
		this.damage = 10;
		this.knockback = 300; // valore di spinta
		
		this.target = target; // bersaglio da attaccare
	}

	update(dt){
		if (this.health <= 0) return this;
		
		let distance = this.maxSpeed * dt; // distanza percorsa
		// Todo: da fare uguale al player

		let distX = this.target.x - this.x;
		let distY = this.target.y - this.y;
		let inAllerta = Math.pow(distX,2)+Math.pow(distY,2)<=Math.pow(this.target.alert,2); // se si trova nel raggio di azione
		let speed = {
			x: inAllerta ? Math.sign(distX)*this.maxSpeed:0,
			y: inAllerta ? Math.sign(distY)*this.maxSpeed:0
		}
		this.angle = inAllerta ? Math.atan2(distY,distX) : this.angle;

		this.resSpeed.x *= Math.abs(speed.x) > Math.abs(this.resSpeed.x)? 0 : Math.pow(1/attrito,dt);
		this.resSpeed.y *= Math.abs(speed.y) > Math.abs(this.resSpeed.y)? 0 : Math.pow(1/attrito,dt);

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Bullet)){
				this.health -= entity.damage;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Player || el instanceof Bullet || el instanceof Enemy)){
				this.resSpeed.x -= Math.sign(entity.x - this.x)*entity.knockback;
				this.resSpeed.y -= Math.sign(entity.y - this.y)*entity.knockback;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Wall)){
				let dx = entity.x - this.x;
				let dy = entity.y - this.y;

				this.resSpeed.x = Math.abs(dx) >= Math.abs(dy) ? -Math.sign(dx)*this.maxSpeed:this.resSpeed.x;
				this.resSpeed.y = Math.abs(dy) >= Math.abs(dx) ? -Math.sign(dy)*this.maxSpeed:this.resSpeed.y;
				// break;
			}
			this.hitbox.collision = [];
		}

		speed.x += this.resSpeed.x;
		speed.y += this.resSpeed.y;

		// aggiornamento posizione
		
		let move = { // movimento
			x: speed.x*dt,
			y: speed.y*dt
		}

		this.x += move.x;
		this.y += move.y;
		


		if(this.health <= 0) this.hitbox.enable = false;

		return this;
	}
	render(ctx){

		if (this.health>0) {
			draw(ctx).undead(this.x,this.y,this.angle);
			draw(ctx).healthBar(this.x, this.y, this.health);
		} else {
			draw(ctx).deadUndead(this.x,this.y);
		}

		
		// this.hitbox.render(ctx);
		return this;
	}
}


export class Bullet extends Entity{
	// classe proiettile
	constructor(x,y,angle=0,radius=300,speed=1000){
		super(x,y);
		this.startX = x;
		this.startY = y;

		this.hitbox = new HitBox(this,35,17);

		this.angle = angle;
		this.maxSpeed = speed;
		this.radius = radius;
		this.damage = 10;
		this.knockback = 600;
		this.toBeDeleted = false; // se è da eliminare

	}
	update(dt){
		if(this.toBeDeleted) return;

		if(this.hitbox.collision.length>0) this.toBeDeleted = true;

		let distance = this.maxSpeed * dt; // distanza percorsa 

		this.x += distance * Math.cos(this.angle);
		this.y += distance * Math.sin(this.angle);

		if(Math.pow(this.x-this.startX,2)+Math.pow(this.y-this.startY,2)>Math.pow(this.radius,2)) this.toBeDeleted = true;
		return this;
	}
	render(ctx){
		if(this.toBeDeleted) return;
		draw(ctx).bullet(this.x,this.y,this.angle);
		// this.hitbox.render(ctx);
		return this;
	}

}


export class Wall extends Entity{
	constructor(x,y,size){
		super(x,y);
		this.size = size;
		this.hitbox = new HitBox(this,size,size);
	}
	update(dt){
		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			this.hitbox.collision = [];
		}
	}
	render(ctx){
		draw(ctx).wall(this.x,this.y,this.size,this.color);
		// this.hitbox.render(ctx);
	}
}


export class HitBox{
	// classe cella hitbox
	constructor(entity,width=0,height=0){

		this.entity = entity;
		this.width = width;
		this.height = height;
		this.radius = Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2)); // distanza massima
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