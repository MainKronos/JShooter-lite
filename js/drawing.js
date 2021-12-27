export default ()=>{};

var bg = new Image();
bg.src = './res/pattern.png';
// bg = ctx.createPattern(bg, 'repeat');

export function draw(ctx){

	// let bg = new Image();
	// bg.src = './res/pattern.png';
	// let bag = ctx.createPattern(bg, 'repeat');
	
	function human(x,y,angle){
		const color = {
			skin: 'hsl(34, 70%, 82%)',
			hair: 'hsl(30, 100%, 15%)',
			primary_light: 'hsl(102, 41%, 30%)',
			secondary_light: 'hsl(33, 60%, 40%)'
		}

		ctx.save();
		ctx.lineWidth = 1.4;

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
		for(let i=0; i<40*2; i+=(40*2)/8){
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
	function deadHuman(x,y,angle){

		const color = {
			skin: 'hsl(34, 50%, 82%)',
			hair: 'hsl(30, 100%, 15%)',
			primary_light: 'hsl(102, 21%, 30%)',
			secondary_light: 'hsl(33, 40%, 40%)'
		}
		let distPart = 9;

		ctx.save();
		

		ctx.translate(x, y);
		ctx.rotate(angle-Math.PI/2);

		// barccio e mano sinistra
		ctx.save();

		ctx.translate(-0.3*distPart,-0.3*distPart);
		ctx.rotate(-0.1*distPart);

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
		ctx.translate(0.9*distPart,-0.9*distPart);
		ctx.rotate(0.8*distPart);

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
		ctx.translate(-0.7*distPart,0.7*distPart);
		ctx.rotate(0.5*distPart);

		ctx.beginPath();
		ctx.roundRect(-60, - 30, 120, 60, 4);
		ctx.fillStyle = color.secondary_light;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// fucile
		ctx.save();
		ctx.translate(0.4*distPart,0.9*distPart);
		ctx.rotate(-0.2*distPart);

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
		ctx.translate(0.7*distPart,0.7*distPart);
		ctx.rotate(0.9*distPart);

		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// capelli
		ctx.save();
		ctx.translate(-0.8*distPart,0.1*distPart);
		ctx.rotate(-0.4*distPart);

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
	function undead(x,y,angle){

		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle-Math.PI/2);

		// left hand
		ctx.save();
		ctx.beginPath();
		ctx.rect(-50, -10, 20, 90);
		ctx.fillStyle = '#339933';
		ctx.fill();
		ctx.restore();

		// right hand
		ctx.save();
		ctx.beginPath();
		ctx.rect(30, -10, 20, 85);
		ctx.fillStyle = '#99ff33';
		ctx.fill();
		ctx.restore();

		// torso
		ctx.save();
		ctx.beginPath();
		ctx.rect(-60, - 30, 120, 60);
		ctx.fillStyle = '#0B486B';
		ctx.fill();
		ctx.restore();

		// head
		ctx.save();
		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 2 * Math.PI);
		ctx.fillStyle = '#CFF09E';
		ctx.fill();
		ctx.restore();

		// hair
		ctx.save();
		ctx.rotate(-180 * Math.PI / 180);
		ctx.beginPath();
		ctx.arc(0, 0, 37, 0, 180 * Math.PI / 180);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.restore();

		ctx.restore();
	}
	function deadUndead(x,y){

		// undead(x,y,angle);

		ctx.save();
		
		ctx.translate(x, y);
		// ctx.rotate(angle-Math.PI/2);
		ctx.transform(1,0,-0.2,1,0,0);

		// lapide
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(40, -45);
		ctx.arcTo(40, 45, -40, 45, 5);
		ctx.arcTo(-40, 45, -40, -45, 5);
		ctx.lineTo(-40, -45);
		ctx.arc(0,-45,40,Math.PI,Math.PI*2);
		ctx.closePath();
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.fillStyle = 'grey';
		ctx.shadowBlur = 2;
		ctx.shadowColor = 'black';
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		// R.I.P.
		ctx.save();
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.font = '25px serif';
		ctx.fillText('R.I.P.', 0, -20);
		ctx.strokeStyle = '#4d4d4d';
		ctx.lineWidth = 1;
		ctx.strokeText('R.I.P.', 0, -20);
		ctx.restore();

		// scritte (liniette)
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(-30,-5);
		ctx.lineTo(30,-5);
		ctx.moveTo(-30,5);
		ctx.lineTo(-5,5);
		ctx.moveTo(0,5);
		ctx.lineTo(30,5);
		ctx.moveTo(-30,15);
		ctx.lineTo(5,15);
		ctx.moveTo(10,15);
		ctx.lineTo(30,15);
		ctx.strokeStyle = '#4d4d4d';
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.restore();
		
		// terra
		ctx.save();
		let offset = Math.PI*0.3
		ctx.beginPath();
		ctx.arc(0,130,100,Math.PI+offset,-offset);
		ctx.closePath();
		ctx.shadowBlur = 5;
		ctx.shadowColor = '#542a00';
		ctx.fillStyle = '#542a00';
		ctx.strokeStyle = '#331a00';
		ctx.lineWidth = 2;
		ctx.fill();
		ctx.stroke();
		ctx.restore();


		ctx.restore();
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
	function wall(x,y,size){
		ctx.save();

		ctx.translate(x, y);

		// muro
		ctx.beginPath();
		ctx.rect(-size/2,-size/2,size,size);

		ctx.fillStyle = 'grey';
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	function healthBar(x, y, health) {



		let hColor = `hsl(${(health/100)*120}, 100%, 50%)`;
		let grd = ctx.createLinearGradient(-60, -70, 60, -70);
		// let grd = ctx.createLinearGradient(0, -70, 0, -60);
		// let grd = ctx.createRadialGradient(0,-70,10, 0,-70,100);
		grd.addColorStop(0, 'black');
		grd.addColorStop(0.5, hColor);
		grd.addColorStop(1, 'black');

		ctx.save();
		ctx.translate(x,y);

		ctx.beginPath();
		ctx.roundRect(- 50, - 70, health, 10, 5);
		// ctx.roundRect(- 50, - 70, health, 400, 500);
		ctx.fillStyle = grd;
		ctx.fill();

		ctx.beginPath();
		ctx.roundRect(- 50, - 70, 100, 10, 5);
		ctx.strokeStyle = 'black';
		ctx.shadowBlur = 5;
		ctx.shadowColor = hColor;
		ctx.lineWidth = 2;
		ctx.stroke();


		ctx.restore();
	}
	function hitBox(x,y,width,height,angle=0){
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);

		ctx.beginPath();
		// if(type=='arcH'){
		// 	ctx.arc(0,-height/2+width/2,width/2,0,Math.PI*2);
		// 	ctx.arc(0,height/2-width/2,width/2,0,Math.PI*2);
		// 	ctx.moveTo(0,-height/2);
		// 	ctx.lineTo(0,height/2);
		// 	ctx.rect(-width/2,-height/2+width/2,width,height-width);
		// }else if(type=='arcW'){
		// 	ctx.arc(-width/2+height/2,0,height/2,0,Math.PI*2);
		// 	ctx.arc(width/2-height/2,0,height/2,0,Math.PI*2);
		// 	ctx.moveTo(-width/2,0);
		// 	ctx.lineTo(width/2,0);
		// 	ctx.rect(-width/2+height/2,-height/2,width-height,height);
		// }else{
		// }
		ctx.rect(-width/2,-height/2,width,height);
		ctx.closePath();
		ctx.strokeStyle = 'black';
		// ctx.fill();
		ctx.stroke();

		ctx.restore();
	}
	function background(x,y,width,height){		
		ctx.save();
		ctx.beginPath();
		ctx.rect(x,y,width,height);
		ctx.fillStyle = ctx.createPattern(bg, 'repeat');
		ctx.fill();
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
		wall: wall,
		healthBar: healthBar,
		hitBox: hitBox,
		background: background,
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