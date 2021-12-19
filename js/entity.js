import {draw} from "./utility.js";
import { HitBox } from "./other.js";


class Entity{
	constructor(x,y){
		// this.boundingType = 'arc';
		this.x = x;
		this.y = y;
		this.angle = 0;	
		this.speed = 0;
		this.knockback = 0;
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
		this.knockback = 0.05; // valore di spinta

	}

	update(){
		// aggiorna il giocatore
		if (this.health<=0) return;

		// this.health -= (this.health!=0);

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
			}
			this.hitbox.collision = [];
		}

		// aggiornamento posizione
		let currentSpeed = this.speed;
		currentSpeed /= (this.inputs.key.up != this.inputs.key.down) && (this.inputs.key.right != this.inputs.key.left) ? Math.SQRT2 : 1;
		if (this.inputs.key.up) this.y -= currentSpeed;
		if (this.inputs.key.down) this.y += currentSpeed;
		if (this.inputs.key.left) this.x -= currentSpeed;
		if (this.inputs.key.right) this.x += currentSpeed;

		//aggiornamento rotazione
		this.angle = Math.atan2(this.inputs.mouse.y-this.y, this.inputs.mouse.x-this.x);

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
	constructor(x,y){
		super(x,y);
		this.angle = Math.random()*Math.PI*2;
		this.hitbox = new HitBox(this,120,83);

		this.speed = 5;
		this.health = 100;
		this.damage = 10;
		this.knockback = 0.01; // valore di spinta
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
			}
			this.hitbox.collision = [];
		}
		if(this.health <= 0) this.hitbox.enable = false;

		return this;
	}
	render(ctx){

		if (this.health>0) {
			draw(ctx).undead(this.x,this.y,this.angle);
			draw(ctx).healthBar(this.x, this.y, this.health);
		} else {
			draw(ctx).deadHuman(this.x,this.y,this.angle);
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
		this.knockback = 0.01;
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
