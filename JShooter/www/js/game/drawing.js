var bgImage = new Image();
bgImage.src = `./res/img/grass1.png`;

var oldImage = new Image();
oldImage.src = './res/img/old.png';

var wallImg = new Image();
wallImg.src = './res/img/wall.png';

function draw(ctx){
	
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

		// barccio e mano sinistra
		ctx.rotate(30 * Math.PI / 180);
		/// mano ###
		ctx.beginPath();
		ctx.translate(50, 78);
		ctx.arc(0, 0, 14, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();
		ctx.translate(-50, -78);
		/// braccio ###
		ctx.beginPath();
		ctx.rect(40, -10, 20, 80);
		ctx.fillStyle = color.primary_light;
		ctx.strokeStyle = 'black';
		ctx.fill();
		ctx.stroke();
		ctx.rotate(-30 * Math.PI / 180);

		// braccio e mano destra
		ctx.rotate(-50 * Math.PI / 180);
		/// mano ###
		ctx.translate(-45, 33);
		ctx.beginPath();
		ctx.arc(0, 0, 14, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();
		ctx.translate(45, -33);
		/// braccio ###
		ctx.beginPath();
		ctx.rect(-55, -20, 20, 45);
		ctx.fillStyle = color.primary_light;
		ctx.fill();
		ctx.stroke();
		ctx.rotate(50 * Math.PI / 180);

		// torso
		ctx.beginPath();
		ctx.roundRect(-60, - 30, 120, 60, 4);
		ctx.fillStyle = color.secondary_light;
		ctx.fill();
		ctx.stroke();

		// fucile
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

		// testa
		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 2 * Math.PI);
		ctx.fillStyle = color.skin;
		ctx.fill();
		ctx.stroke();

		// capelli
		ctx.rotate(-180 * Math.PI / 180);
		ctx.beginPath();
		ctx.arc(0, 0, 40, 0, 180 * Math.PI / 180);
		for(let i=0; i<40*2; i+=(40*2)/8){
			ctx.lineTo(-40+i, 0);
			i+=(40*2)/8;
			ctx.lineTo(-40+i, -20);
		}
		ctx.fillStyle = color.hair;
		ctx.fill();
		ctx.rotate(180 * Math.PI / 180);

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
		ctx.beginPath();
		ctx.rect(-50, -10, 20, 90);
		ctx.fillStyle = '#339933';
		ctx.fill();

		// right hand
		ctx.beginPath();
		ctx.rect(30, -10, 20, 85);
		ctx.fillStyle = '#99ff33';
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
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.rotate(180 * Math.PI / 180);

		ctx.restore();
	}
	function deadUndead(x,y){

		ctx.save();
		
		ctx.translate(x, y);

		ctx.roundRect(-50,-95,100,155,10);
		ctx.globalAlpha = 0.6;
		ctx.fillStyle = '#542a00';
		ctx.strokeStyle = '#331a00';
		ctx.lineWidth = 5;
		ctx.fill();
		ctx.stroke();
		ctx.globalAlpha = 1;

		// lapide
		ctx.beginPath();
		ctx.moveTo(40, -45);
		ctx.arcTo(40, 45, -40, 45, 5);
		ctx.arcTo(-40, 45, -40, -45, 5);
		ctx.lineTo(-40, -45);
		ctx.arc(0,-45,40,Math.PI,Math.PI*2);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.fillStyle = 'grey';
		ctx.fill();
		ctx.stroke();

		// R.I.P.
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.font = '25px serif';
		ctx.fillText('R.I.P.', 0, -20);
		ctx.strokeStyle = '#4d4d4d';
		ctx.lineWidth = 1;
		ctx.strokeText('R.I.P.', 0, -20);

		// scritte (liniette)
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
	}
	function bullet(x,y,angle){
		ctx.save();

		ctx.translate(x, y);
		ctx.rotate(angle-Math.PI/2);

		// proiettile
		ctx.beginPath();
		ctx.moveTo(-8,-17);
		ctx.lineTo(-8,10);
		ctx.lineTo(0,17);
		ctx.lineTo(8,10);
		ctx.lineTo(8,-17);

		// ctx.closePath();
		ctx.fillStyle = 'grey';
		ctx.strokeStyle = 'black';
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	function wall(x,y,size,color='grey'){

		let pattern = ctx.createPattern(wallImg, 'repeat');
		// ctx.save();

		ctx.translate(x, y);

		// muro
		ctx.save();
		ctx.scale(1, 0.6);
		ctx.beginPath();
		ctx.rect(-size/2,size/2,size,size);
		ctx.fillStyle = pattern;
		ctx.fill();
		ctx.stroke();
		ctx.restore();


		ctx.beginPath();
		ctx.rect(-size/2,-size/2,size,size);

		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(-size/2,-size/2);
		ctx.lineTo(size/2,size/2);
		ctx.moveTo(-size/2,size/2);
		ctx.lineTo(size/2,-size/2);
		ctx.strokeStyle = '#4d4d4d';
		ctx.lineWidth = 1;
		ctx.stroke();

		

		ctx.translate(-x, -y);
	}
	function healthBar(x, y, health) {



		let hColor = `hsl(${(health/100)*120}, 100%, 50%)`;
		let grd = ctx.createLinearGradient(-60, -70, 60, -70);
		grd.addColorStop(0, 'black');
		grd.addColorStop(0.5, hColor);
		grd.addColorStop(1, 'black');

		ctx.translate(x,y);

		ctx.beginPath();
		ctx.roundRect(- 50, - 70, health, 10, 5);
		ctx.fillStyle = grd;
		ctx.fill();

		ctx.beginPath();
		ctx.roundRect(- 50, - 70, 100, 10, 5);
		ctx.strokeStyle = 'black';
		ctx.shadowBlur = 5;
		ctx.shadowColor = hColor;
		ctx.lineWidth = 2;
		ctx.stroke();

		ctx.shadowBlur = 0;
		ctx.translate(-x,-y);
	}
	function hitBox(x, y, type='rect', args={}){
		ctx.translate(x, y);

		ctx.beginPath();
		if(type=='rect'){
			ctx.rect(-args['width']/2,-args['height']/2,args['width'],args['height']);
		}else{
			ctx.arc(0,0,args['radius'], 0, Math.PI*2);
		}

		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.translate(-x, -y);
	}
	function background(x,y,width,height){
		let pattern = ctx.createPattern(bgImage, 'repeat');

		ctx.beginPath();
		ctx.rect(x,y,width,height);
		ctx.fillStyle = pattern;
		ctx.fill();
	}
	function oldEffect(x,y,width,height){
		ctx.globalAlpha = 0.3;
		ctx.globalCompositeOperation = 'multiply';
		ctx.drawImage(oldImage,x,y,width,height);

		// restore
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = 'source-over';
	}
	function lightEffect(x,y, radius){

		let dist = 0.7; //distanza tra i due raggi

		let gradient = ctx.createRadialGradient(x,y,radius*(1-dist), x,y,radius);

		// Add three color stops
		gradient.addColorStop(0, 'black');
		gradient.addColorStop(1, 'rgba(0,0,0,0)');

		ctx.save();
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI*2);
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 500;
		ctx.fillStyle = gradient;
		ctx.globalCompositeOperation = 'destination-in';
		ctx.fill();

		ctx.restore();
	}
	function poiter(x,y){

		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x-12,y);
		ctx.lineTo(x+12,y);
		ctx.moveTo(x,y-12);
		ctx.lineTo(x,y+12);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(x,y,10,0,Math.PI*2);
		
		ctx.stroke();

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
		oldEffect: oldEffect,
		lightEffect: lightEffect,
		poiter: poiter,
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