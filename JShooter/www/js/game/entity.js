class Entity{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.angle = 0;	
		this.maxSpeed = 0;
		this.toBeDeleted = false;

		this.audio = null; // audio
	}
	update(){console.log('Funzione update() non inizializzata.')}
	render(ctx){console.log('Funzione render() non inizializzata.')}
}

const attrito = 1000; // attrito terreno

class Player extends Entity{
	// classe giocatore
	constructor(x,y,inputs){
		super(x,y);
		this.angle = 0;

		this.hitbox = new HitBox(this,'circle',{radius:60});

		this.maxSpeed = 500; // px/s massima
		this.resSpeed = {x:0,y:0} //velocità residua
		this.health = 100;

		this.inputs = inputs;
		this.alert = 900; // raggio di allerta dei nemici

		this.timeReload = 0.4; // tempo di ricarica dell'arma in secondi
		this.reload = 0;  // tempo passato dallo sparo
		this.knockback = 200; // valore di spinta


		this.audio = new GameAudio(this.constructor.name); // audio
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
		this.resSpeed.x *= (Math.abs(speed.x) > Math.abs(this.resSpeed.x) || Math.abs(this.resSpeed.x) < 0.1)? 0 : Math.pow(1/attrito,dt);
		this.resSpeed.y *= (Math.abs(speed.y) > Math.abs(this.resSpeed.y) || Math.abs(this.resSpeed.y) < 0.1)? 0 : Math.pow(1/attrito,dt);

		speed.x += this.resSpeed.x;
		speed.y += this.resSpeed.y;


		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Bullet)){
				this.health -= entity.damage;

				let angle = Math.atan2(entity.startY - this.y, entity.startX - this.x);

				this.resSpeed.x -= Math.cos(angle)*entity.knockback;
				this.resSpeed.y -= Math.sin(angle)*entity.knockback;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Player || el instanceof Enemy)){
				if(entity instanceof Enemy) this.health -= entity.damage;

				this.resSpeed.x -= Math.sign(entity.x - this.x)*entity.knockback;
				this.resSpeed.y -= Math.sign(entity.y - this.y)*entity.knockback;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Wall)){
				let dx = entity.x - this.x;
				let dy = entity.y - this.y;

				let ex = (dx>0) ? entity.x - entity.size/2 : entity.x + entity.size/2;
				let ey = (dy>0) ? entity.y - entity.size/2 : entity.y + entity.size/2;

				let angle = Math.atan2(ey-this.y, ex-this.x);

				if(Math.abs(dx) >= Math.abs(dy)){
					if(dy * Math.sin(angle) > 0){
						speed.y -= Math.sign(dy)*Math.abs(speed.x*Math.cos(angle));
					} 
					else this.x = ex - Math.sign(dx)*this.hitbox.radius;
					if(Math.sign(speed.x) == Math.sign(dx)) speed.x = 0;

				}else if(Math.abs(dy) >= Math.abs(dx)){
					if(dx * Math.cos(angle) > 0){
						speed.x -= Math.sign(dx)*Math.abs(speed.y*Math.sin(angle));
					} 
					else this.y = ey - Math.sign(dy)*this.hitbox.radius;
					if(Math.sign(speed.y) == Math.sign(dy)) speed.y = 0;
				}
			}
			this.hitbox.collision = [];
		}

		let move = { // movimento
			x: speed.x*dt,
			y: speed.y*dt
		}

		this.x += move.x;
		this.y += move.y;

		this.audio.walk(move.x!=0 || move.y!=0); // audio
		

		//aggiornamento rotazione
		this.angle = rotate;

		// aggiornamento ricarica
		this.reload -= (this.reload>0)*dt;

		if(this.health <= 0){
			this.hitbox.enable = false;
			this.audio.walk(false);
		}

		return this;
	}

	render(ctx){
		// rederizza il giocatore

		if (this.health>0) {
			draw(ctx).human(this.x,this.y,this.angle);
			draw(ctx).healthBar(this.x, this.y, this.health);
		} else {
			draw(ctx).deadHuman(Math.round(this.x),Math.round(this.y),this.angle);
		}

		
		if(settings.showHitBox) this.hitbox.render(ctx);
		return this;
	}

	shoot(){
		if(this.reload<=0 && this.health>0){
			// spara un colpo
			this.audio.shot(); // audio
			this.reload = this.timeReload;
			let bulletX = this.x + 100 * Math.cos(this.angle);
			let bulletY = this.y + 100 * Math.sin(this.angle);

			return [new Bullet(bulletX, bulletY, this.angle)];
		}else{
			return null;
		}
	}

}

class Enemy extends Entity{
	constructor(x,y,target=null){
		super(x,y);
		this.angle = Math.random()*Math.PI*2;
		this.hitbox = new HitBox(this,'circle', {radius:60});

		this.maxSpeed = Math.floor(Math.random() * (510 - 490 + 1) ) + 490; // px/s
		this.resSpeed = {x:0,y:0} //velocità residua
		this.health = 100;
		this.damage = Math.floor(Math.random() * (13 - 10 + 1) ) + 10;
		this.knockback = 900; // valore di spinta
		
		this.target = target; // bersaglio da attaccare

		this.audio = new GameAudio(this.constructor.name); // audio
	}

	update(dt){
		if (this.health <= 0) return this;
		
		let distX = this.target.x - this.x;
		let distY = this.target.y - this.y;
		let tAngle = Math.atan2(distY, distX);
		let inAllerta = Math.pow(distX,2)+Math.pow(distY,2)<=Math.pow(this.target.alert,2); // se si trova nel raggio di azione
		let speed = {
			x: inAllerta ? Math.cos(tAngle)*this.maxSpeed * ((this.health <= 15 && this.target.health >= 15) ? -0.5 : 1) : 0,
			y: inAllerta ? Math.sin(tAngle)*this.maxSpeed * ((this.health <= 15 && this.target.health >= 15) ? -0.5 : 1) : 0
		}
		this.angle = inAllerta ? tAngle : this.angle;

		this.resSpeed.x *= Math.abs(speed.x) > Math.abs(this.resSpeed.x)? 0 : Math.pow(1/attrito,dt);
		this.resSpeed.y *= Math.abs(speed.y) > Math.abs(this.resSpeed.y)? 0 : Math.pow(1/attrito,dt);

		speed.x += this.resSpeed.x;
		speed.y += this.resSpeed.y;

		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Bullet)){
				this.health -= entity.damage;

				let angle = Math.atan2(entity.startY - this.y, entity.startX - this.x);

				this.resSpeed.x -= Math.cos(angle)*entity.knockback;
				this.resSpeed.y -= Math.sin(angle)*entity.knockback;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Player || el instanceof Enemy)){
				if(entity instanceof Player) this.audio.punch();
				
				this.resSpeed.x -= Math.sign(entity.x - this.x)*entity.knockback;
				this.resSpeed.y -= Math.sign(entity.y - this.y)*entity.knockback;
			}
			for(let entity of this.hitbox.collision.filter(el=>el instanceof Wall)){
				let dx = entity.x - this.x;
				let dy = entity.y - this.y;

				let ex = (dx>0) ? entity.x - entity.size/2 : entity.x + entity.size/2;
				let ey = (dy>0) ? entity.y - entity.size/2 : entity.y + entity.size/2;

				let angle = Math.atan2(ey-this.y, ex-this.x);

				if(Math.abs(dx) >= Math.abs(dy)){
					if(dy * Math.sin(angle) > 0){
						speed.y -= Math.sign(dy)*Math.abs(speed.x*Math.cos(angle));
					} 
					else this.x = ex - Math.sign(dx)*this.hitbox.radius;
					if(Math.sign(speed.x) == Math.sign(dx)) speed.x = 0;

				}else if(Math.abs(dy) >= Math.abs(dx)){
					if(dx * Math.cos(angle) > 0){
						speed.x -= Math.sign(dx)*Math.abs(speed.y*Math.sin(angle));
					} 
					else this.y = ey - Math.sign(dy)*this.hitbox.radius;
					if(Math.sign(speed.y) == Math.sign(dy)) speed.y = 0;
				}
			}
			this.hitbox.collision = [];
		}

		if(Math.abs(speed.x) > this.maxSpeed) speed.x = Math.sign(speed.x)*this.maxSpeed;
		if(Math.abs(speed.y) > this.maxSpeed) speed.x = Math.sign(speed.y)*this.maxSpeed;

		// aggiornamento posizione
		
		let move = { // movimento
			x: speed.x*dt,
			y: speed.y*dt
		}

		this.x += move.x;
		this.y += move.y;
		
		this.audio.undead(inAllerta);


		if(this.health <= 0){
			this.audio.undead(false);
			this.hitbox.enable = false;
		}

		return this;
	}
	render(ctx){

		if (this.health>0) {
			draw(ctx).undead(Math.round(this.x),Math.round(this.y),this.angle);
			draw(ctx).healthBar(Math.round(this.x), Math.round(this.y), this.health);
		} else {
			draw(ctx).deadUndead(Math.round(this.x),Math.round(this.y));
		}

		
		if(settings.showHitBox) this.hitbox.render(ctx);
		return this;
	}
}


class Bullet extends Entity{
	// classe proiettile
	constructor(x,y,angle=0,radius=400,speed=2000){
		super(x,y);
		this.startX = x;
		this.startY = y;

		this.hitbox = new HitBox(this,'circle', {radius:13});

		this.angle = angle;
		this.maxSpeed = speed;
		this.radius = radius;
		this.damage = Math.floor(Math.random() * (20 - 10 + 1) ) + 10;
		this.knockback = 2000;
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
		draw(ctx).bullet(Math.round(this.x),Math.round(this.y),this.angle);
		if(settings.showHitBox) this.hitbox.render(ctx);
		return this;
	}

}


class Wall extends Entity{
	constructor(x,y,size){
		super(x,y);
		this.size = size;
		this.hitbox = new HitBox(this,'rect', {width:size,height:size});
	}
	update(dt){
		// aggiornamento contraccolpo
		if(this.hitbox.collision.length>0){
			this.hitbox.collision = [];
		}
	}
	render(ctx){
		draw(ctx).wall(Math.round(this.x),Math.round(this.y),this.size);
		if(settings.showHitBox) this.hitbox.render(ctx);
	}
}


class HitBox{
	// classe cella hitbox
	constructor(entity,type='rect',args={}){

		this.entity = entity;
		this.type = type; // rect o circle
		this.width = (type=='rect') ? args['width'] : null;
		this.height = (type=='rect') ? args['height'] : null;
		this.radius = (type=='rect') ? Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2)) : args['radius'];
		this.enable = true; // hitbox attiva
		this.collision = []; // entità in collisione
		
	}

	render(ctx){
		let args = {};

		if(this.type=='rect'){
			args = {width:this.width, height:this.height};
		}else{
			args = {radius:this.radius};
		}
		draw(ctx).hitBox(this.entity.x, this.entity.y, this.type, args);
	}
}