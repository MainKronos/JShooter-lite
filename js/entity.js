import {draw} from "./utility.js";
import { HitBox } from "./other.js";


class Entity{
	constructor(x,y){
		// this.boundingType = 'arc';
		this.x = x;
		this.y = y;
		this.angle = 0;	
		this.speed = 0;
		// this.knockback = 0;
		this.toBeDeleted = false;
	}
	update(){console.log('Funzione update() non inizializzata.')}
	render(ctx){console.log('Funzione render() non inizializzata.')}
}

export class Player extends Entity{
	// classe giocatore
	constructor(x,y,inputs){
		super(x,y);
		this.angle = 0;

		this.hitbox = new HitBox(this,83,120);

		this.speed = 5;
		this.health = 100;

		this.inputs = inputs;

		this.timeReload = 20; // tempo di ricarica
		this.reload = 0;  // tempo passato dallo sparo
		this.knockback = 0.01; // valore di spinta

	}

	update(){
		// aggiorna il giocatore
		if (this.health<=0) return;

		// this.health -= (this.health!=0);

		let currentSpeed = this.speed;
		currentSpeed /= (this.inputs.key.up != this.inputs.key.down) && (this.inputs.key.right != this.inputs.key.left) ? Math.SQRT2 : 1;

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision){
				if(entity instanceof Bullet || entity instanceof Enemy){
					this.health -= entity.damage;
				}
				if(entity instanceof Player || entity instanceof Enemy || entity instanceof Bullet){
					this.x -= (entity.x - this.x)*entity.speed*entity.knockback;
					this.y -= (entity.y - this.y)*entity.speed*entity.knockback;
				}
				if(entity instanceof Wall){
					// TODO: da sistemare perchè vibra
					this.x -= (entity.x - this.x >= 0)? currentSpeed : -currentSpeed;
					this.y -= (entity.y - this.y >= 0)? currentSpeed : -currentSpeed;
				}
			}
			this.hitbox.collision = [];
		}

		// aggiornamento posizione
		
		// this.x += currentSpeed*((this.inputs.key.right - this.inputs.key.left)*Math.cos(this.inputs.mouse.angle)-(this.inputs.key.down - this.inputs.key.up)*Math.sin(this.inputs.mouse.angle));
		// this.y += currentSpeed*((this.inputs.key.right - this.inputs.key.left)*Math.sin(this.inputs.mouse.angle)+(this.inputs.key.down - this.inputs.key.up)*Math.cos(this.inputs.mouse.angle));
		this.x += currentSpeed*(this.inputs.key.right - this.inputs.key.left);
		this.y += currentSpeed*(this.inputs.key.down - this.inputs.key.up);
		

		//aggiornamento rotazione
		this.angle = this.inputs.mouse.angle;

		// aggiornamento ricarica
		this.reload -= (this.reload!=0);

		if(this.health <= 0) this.hitbox = null;

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
		if(this.reload==0 && this.health>0){
			// spara un colpo
			this.reload = this.timeReload;
			let bulletX = this.x + 140 * Math.cos(this.angle);
			let bulletY = this.y + 140 * Math.sin(this.angle);

			return new Bullet(bulletX, bulletY, this.angle);
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

		this.speed = 1;
		this.health = 100;
		this.damage = 10;
		this.knockback = 0.1; // valore di spinta
		this.alert = 500; // raggio di allerta
		this.target = target; // bersaglio da attaccare
	}

	update(){
		if (this.health <= 0) return this;
		

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision){
				if(entity instanceof Bullet){
					this.health -= entity.damage;
				}
				if(entity instanceof Player || entity instanceof Enemy || entity instanceof Bullet){
					this.x -= (entity.x - this.x)*entity.speed*entity.knockback;
					this.y -= (entity.y - this.y)*entity.speed*entity.knockback;
				}
				if(entity instanceof Wall|| entity instanceof Enemy){
					// TODO: da sistemare perchè vibra
					// console.log(entity.x, this, this.speed);a
					this.x -= (entity.x - this.x >= 0)? this.speed : -this.speed;
					this.y -= (entity.y - this.y >= 0)? this.speed : -this.speed;
				}
			}
			this.hitbox.collision = [];
		}

		// aggiornamento posizione
		let distX = this.target.x - this.x;
		let distY = this.target.y - this.y;
		if(Math.pow(distX,2)+Math.pow(distY,2)<=Math.pow(this.alert,2)){ // se si trova nel raggio di azione
			this.x += Math.sign(distX)*this.speed;
			this.y += Math.sign(distY)*this.speed;

			//aggiornamento rotazione
			this.angle = Math.atan2(distY,distX);
		}

		


		if(this.health <= 0) this.hitbox.enable = false;

		return this;
	}
	render(ctx){

		if (this.health>0) {
			draw(ctx).undead(this.x,this.y,this.angle);
			draw(ctx).healthBar(this.x, this.y, this.health);
		} else {
			draw(ctx).undead(this.x,this.y,this.angle);
		}

		
		// this.hitbox.render(ctx);
		return this;
	}
}


export class Bullet extends Entity{
	// classe proiettile
	constructor(x,y,angle=0,radius=300,speed=10){
		super(x,y);
		this.startX = x;
		this.startY = y;

		this.hitbox = new HitBox(this,35,17);

		this.angle = angle;
		this.speed = speed;
		this.radius = radius;
		this.damage = 10;
		this.knockback = 0.05;
		this.toBeDeleted = false; // se è da eliminare

	}
	update(){
		if(this.toBeDeleted) return;

		if(this.hitbox.collision.length>0) this.toBeDeleted = true;

		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);

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
	update(){
		// aggiornamento contraccolpo
		// if(this.hitbox.collision.length>0){
		// 	this.hitbox.collision = [];
		// }
	}
	render(ctx){
		draw(ctx).wall(this.x,this.y,this.size);
		// this.hitbox.render(ctx);
	}
}