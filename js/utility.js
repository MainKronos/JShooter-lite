export default function draw(ctx){
	
	function human(x,y,angle){
		const color = {
			skin: 'hsl(34, 70%, 82%)',
			hair: 'hsl(30, 100%, 15%)',
			primary_light: 'hsl(102, 41%, 30%)',
			secondary_light: 'hsl(33, 60%, 40%)'
		}

		ctx.save();

		ctx.translate(x, y);
		ctx.rotate(angle-Math.PI/2);

		// // left foot
		// ctx.beginPath();
		// ctx.rect(20, -20 + (footPosition * 35), 25, 40);
		// ctx.fillStyle = '#D95B43';
		// ctx.fill();

		// // right foot
		// ctx.beginPath();
		// ctx.rect(-40, -20 + (footPosition * -35), 25, 40);
		// ctx.fillStyle = '#D95B43';
		// ctx.fill();

		// barccio e mano sinistra
		ctx.save();
		ctx.rotate(30 * Math.PI / 180);
		/// mano ###
		ctx.save();
		ctx.beginPath();
		ctx.translate(50, 78);
		ctx.arc(0, 0, 14, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		/// braccio ###
		ctx.beginPath();
		ctx.rect(40, -10, 20, 80);
		ctx.fillStyle = color.primary_light;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// braccio e mano destra
		ctx.save();
		ctx.rotate(-50 * Math.PI / 180);
		/// mano ###
		ctx.save();
		ctx.beginPath();
		ctx.translate(-45, 33);
		ctx.arc(0, 0, 14, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		/// braccio ###
		ctx.beginPath();
		ctx.rect(-55, -20, 20, 45);
		ctx.fillStyle = color.primary_light;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// torso
		ctx.save();
		ctx.beginPath();
		ctx.roundRect(-60, - 30, 120, 60, 4);
		ctx.fillStyle = color.secondary_light;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// fucile
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(-13,0);
		ctx.lineTo(-13,90);
		ctx.lineTo(-10,95);
		ctx.lineTo(-13,100);
		ctx.lineTo(-13,110);
		ctx.lineTo(-8,110);
		ctx.lineTo(-10,120);
		ctx.lineTo(10,120);
		ctx.lineTo(8,110);
		ctx.lineTo(13,110);
		ctx.lineTo(13,100);
		ctx.lineTo(10,95);
		ctx.lineTo(13,90);
		ctx.lineTo(13,0);
		ctx.closePath();
		ctx.fillStyle = 'gray';
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// testa
		ctx.save();
		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// capelli
		ctx.save();
		ctx.rotate(-180 * Math.PI / 180);
		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 180 * Math.PI / 180);
		for(let i=0; i<=40*2; i+=(40*2)/8){
			ctx.lineTo(-40+i, 0);
			i+=(40*2)/8;
			ctx.lineTo(-40+i, -20);
		}
		ctx.closePath();
		ctx.fillStyle = color.hair;
		ctx.fill();
		ctx.restore();

		ctx.restore();
	}
	function deadHuman(){

		// left foot
		ctx.beginPath();
		ctx.rect(30, 20, 25, 40);
		ctx.fillStyle = '#D95B43';
		ctx.fill();

		// right foot
		ctx.beginPath();
		ctx.rect(-25, -30 -35, 25, 40);
		ctx.fillStyle = '#D95B43';
		ctx.fill();

		// left hand
		ctx.rotate(25 * Math.PI / 180);
		ctx.beginPath();
		ctx.rect(40, -5, 20, 80);
		ctx.fillStyle = '#C02942';
		ctx.fill();
		ctx.rotate(-25 * Math.PI / 180);

		// right hand
		ctx.rotate(-60 * Math.PI / 180);
		ctx.beginPath();
		ctx.rect(-40, 20, 20, 45);
		ctx.fillStyle = '#C02942';
		ctx.fill();
		ctx.rotate(60 * Math.PI / 180);

		// torso
		ctx.beginPath();
		ctx.rect(-60, - 30, 120, 60);
		ctx.fillStyle = '#53777A';
		ctx.fill();

		// gun
		// ctx.beginPath();
		// ctx.rect(-12.5, 40, 25, 70);
		// ctx.fillStyle = 'gray';
		// ctx.fill();

		// head
		ctx.beginPath();
		ctx.arc(20, 10, 35, 0, 2 * Math.PI);
		ctx.fillStyle = '#F1D4AF';
		ctx.fill();

		// hair
		ctx.rotate(-170 * Math.PI / 180);
		ctx.beginPath();
		ctx.arc(0, 0, 32, 0, 180 * Math.PI / 180);
		ctx.fillStyle = '#4d2600';
		ctx.fill();
		ctx.rotate(170 * Math.PI / 180);
	}
	function undead(x,y){

		ctx.save();
		ctx.translate(x, y);

		// left hand
		ctx.beginPath();
		ctx.rect(-50, -10, 20, 90);
		ctx.fillStyle = '#3B8686';
		ctx.fill();

		// right hand
		ctx.beginPath();
		ctx.rect(30, -10, 20, 85);
		ctx.fillStyle = '#3B8686';
		ctx.fill();

		// torso
		ctx.beginPath();
		ctx.rect(-60, - 30, 120, 60);
		ctx.fillStyle = '#0B486B';
		ctx.fill();

		// head
		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 2 * Math.PI);
		ctx.fillStyle = '#CFF09E';
		ctx.fill();

		// hair
		ctx.rotate(-180 * Math.PI / 180);
		ctx.beginPath();
		ctx.arc(0, 0, 37, 0, 180 * Math.PI / 180);
		ctx.fillStyle = '#4d2600';
		ctx.fill();
		ctx.rotate(180 * Math.PI / 180);

		ctx.restore();
	}
	function deadUndead(){

		// left foot
		ctx.beginPath();
		ctx.rect(52, -30, 25, 40);
		ctx.fillStyle = '#79BD9A';
		ctx.fill();

		// right foot
		ctx.beginPath();
		ctx.rect(26, -40, 25, 40);
		ctx.fillStyle = '#79BD9A';
		ctx.fill();

		// left hand
		ctx.beginPath();
		ctx.rect(-25, 35, 20, 90);
		ctx.fillStyle = '#3B8686';
		ctx.fill();

		// right hand
		ctx.beginPath();
		ctx.rect(35, -40, 20, 85);
		ctx.fillStyle = '#3B8686';
		ctx.fill();

		// torso
		ctx.beginPath();
		ctx.rect(-42, -20, 120, 60);
		ctx.fillStyle = '#0B486B';
		ctx.fill();

		// head
		ctx.beginPath();
		ctx.arc(10, 5, 35, 0, 2 * Math.PI);
		ctx.fillStyle = '#CFF09E';
		ctx.fill();

		// hair
		ctx.rotate(-170 * Math.PI / 180);
		ctx.beginPath();
		ctx.arc(0, 0, 25, 0, 180 * Math.PI / 180);
		ctx.fillStyle = '#4d2600';
		ctx.fill();
		ctx.rotate(170 * Math.PI / 180);
	}
	function bullet(x,y,angle){
		ctx.save();

		ctx.translate(x, y);
		ctx.rotate(angle-Math.PI/2);
		// ctx.translate(0, 140);

		// proiettile
		ctx.beginPath();
		ctx.moveTo(-8,-17);
		ctx.lineTo(-8,10);
		ctx.lineTo(0,17);
		ctx.lineTo(8,10);
		ctx.lineTo(8,-17);

		ctx.closePath();
		ctx.fillStyle = 'grey';
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	function healthBar(x, y, health) {
		let hColor = `hsl(${(health/100)*120}, 100%, 50%)`;
		// if (health <= 35) hColor = 'red';
		// else if (health <= 75) hColor = 'orange';
		// else hColor = 'lime';

		ctx.save();
		ctx.beginPath();
		ctx.roundRect(x - 50, y - 70, 100, 10, 5);
		ctx.strokeStyle = hColor;
		ctx.shadowBlur = 10;
		ctx.shadowColor = hColor;
		ctx.stroke();

		ctx.beginPath();
		ctx.roundRect(x - 50, y - 70, health, 10, 5);
		ctx.fillStyle = hColor;
		ctx.fill();
		ctx.restore();
	}
	function hitBox(x,y,width,height,angle,type){
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);

		ctx.beginPath();
		if(type=='arcH'){
			ctx.arc(0,-height/2+width/2,width/2,0,Math.PI*2);
			ctx.arc(0,height/2-width/2,width/2,0,Math.PI*2);
			ctx.moveTo(0,-height/2);
			ctx.lineTo(0,height/2);
			ctx.rect(-width/2,-height/2+width/2,width,height-width);
		}else if(type=='arcW'){
			ctx.arc(-width/2+height/2,0,height/2,0,Math.PI*2);
			ctx.arc(width/2-height/2,0,height/2,0,Math.PI*2);
			ctx.moveTo(-width/2,0);
			ctx.lineTo(width/2,0);
			ctx.rect(-width/2+height/2,-height/2,width-height,height);
		}else{
			ctx.rect(-width/2,-height/2,width,height);
		}
		ctx.closePath();
		ctx.strokeStyle = 'black';
		// ctx.fill();
		ctx.stroke();

		ctx.restore();
	}
	function clear(width,height,x=0,y=0){
		// ripulisce il canvas
		ctx.clearRect(x, y, width, height);
	}

	return {
		human: human,
		deadHuman: deadHuman,
		undead: undead,
		deadUndead: deadUndead,
		bullet: bullet,
		healthBar: healthBar,
		hitBox: hitBox,
		clear: clear
	};
}



CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
	// rettangolo arrotondato
	if (width < 2 * radius) radius = width / 2;
	if (height < 2 * radius) radius = height / 2;
	this.beginPath();
	this.moveTo(x + radius, y);
	this.arcTo(x + width, y, x + width, y + height, radius);
	this.arcTo(x + width, y + height, x, y + height, radius);
	this.arcTo(x, y + height, x, y, radius);
	this.arcTo(x, y, x + width, y, radius);
	this.closePath();
	return this;
}
