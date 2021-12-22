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

		this.speed = 500; // px/s
		this.health = 100;

		this.inputs = inputs;
		this.alert = 500; // raggio di allerta dei nemici

		this.timeReload = 1; // tempo di ricarica in secondi
		this.reload = 0;  // tempo passato dallo sparo
		this.knockback = 0.01; // valore di spinta

	}

	update(dt){
		// aggiorna il giocatore
		if (this.health<=0) return;

		// this.health -= (this.health!=0);

		let distance = this.speed * dt; // distanza percorsa
		distance /= (this.inputs.key.up != this.inputs.key.down) && (this.inputs.key.right != this.inputs.key.left) ? Math.SQRT2 : 1;

		let move = { // vettore spostamento
			x: distance*(this.inputs.key.right - this.inputs.key.left),
			y: distance*(this.inputs.key.down - this.inputs.key.up)
		};

		let rotate = this.inputs.mouse.angle; // angolo rotazione

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision){
				if(entity instanceof Bullet || entity instanceof Enemy){
					this.health -= entity.damage;
				}
				if(entity instanceof Player || entity instanceof Enemy || entity instanceof Bullet){
					move.x -= (entity.x - this.x)*entity.speed*entity.knockback;
					move.y -= (entity.y - this.y)*entity.speed*entity.knockback;
				}
				if(entity instanceof Wall){
					// TODO: da sistemare perchè vibra
					// if(Math.sign(entity.x - this.x) == Math.sign(move.x) || move.x==0) move.x = -Math.sign(entity.x - this.x);
					// if(Math.sign(entity.y - this.y) == Math.sign(move.y) || move.y==0) move.y = -Math.sign(entity.y - this.y);
					let ax = entity.x - this.x;
					let ay = entity.y - this.y;
					if(Math.abs(ax) > Math.abs(ay)){
						if(Math.sign(ax) == Math.sign(move.x)) move.x = 0;
					}else if(Math.abs(ax) < Math.abs(ay)){
						if(Math.sign(ay) == Math.sign(move.y)) move.y = 0;
					}

					// rotate = this.angle;
					// this.x -= (entity.x - this.x >= 0)? distance : -distance;
					// this.y -= (entity.y - this.y >= 0)? distance : -distance;ww
				}
			}
			this.hitbox.collision = [];
		}

		// aggiornamento posizione
		
		// this.x += distance*((this.inputs.key.right - this.inputs.key.left)*Math.cos(this.inputs.mouse.angle)-(this.inputs.key.down - this.inputs.key.up)*Math.sin(this.inputs.mouse.angle));
		// this.y += distance*((this.inputs.key.right - this.inputs.key.left)*Math.sin(this.inputs.mouse.angle)+(this.inputs.key.down - this.inputs.key.up)*Math.cos(this.inputs.mouse.angle));
		this.x += move.x;
		this.y += move.y;
		

		//aggiornamento rotazione
		this.angle = rotate;

		// aggiornamento ricarica
		this.reload -= (this.reload>0)*dt;

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
		if(this.reload<=0 && this.health>0){
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

		this.speed = 100; // px/s
		this.health = 100;
		this.damage = 10;
		this.knockback = 0.01; // valore di spinta
		
		this.target = target; // bersaglio da attaccare
	}

	update(dt){
		if (this.health <= 0) return this;
		
		let distance = this.speed * dt; // distanza percorsa

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision){
				if(entity instanceof Bullet){
					this.health -= entity.damage;
				}
				if(entity instanceof Player || entity instanceof Enemy || entity instanceof Bullet){
					this.x -= (entity.x - this.x)*entity.speed*dt*entity.knockback;
					this.y -= (entity.y - this.y)*entity.speed*dt*entity.knockback;
				}
				if(entity instanceof Wall|| entity instanceof Enemy){
					// TODO: da sistemare perchè vibra
					// console.log(entity.x, this, this.speed);a
					this.x -= (entity.x - this.x >= 0)? distance : -distance;
					this.y -= (entity.y - this.y >= 0)? distance : -distance;
				}
			}
			this.hitbox.collision = [];
		}

		// aggiornamento posizione
		let distX = this.target.x - this.x;
		let distY = this.target.y - this.y;
		if(Math.pow(distX,2)+Math.pow(distY,2)<=Math.pow(this.target.alert,2)){ // se si trova nel raggio di azione
			this.x += Math.sign(distX)*distance;
			this.y += Math.sign(distY)*distance;

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
	constructor(x,y,angle=0,radius=300,speed=1000){
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
	update(dt){
		if(this.toBeDeleted) return;

		if(this.hitbox.collision.length>0) this.toBeDeleted = true;

		let distance = this.speed * dt; // distanza percorsa 

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
		// if(this.hitbox.collision.length>0){
		// 	this.hitbox.collision = [];
		// }
	}
	render(ctx){
		draw(ctx).wall(this.x,this.y,this.size);
		// this.hitbox.render(ctx);
	}
}