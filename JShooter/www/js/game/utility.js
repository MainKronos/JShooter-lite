function hitboxOverlap(hitbox1, hitbox2){

	if(hitbox1.type == hitbox2.type){
		return collideCircleCircle(hitbox1.entity.x, hitbox1.entity.y, hitbox1.radius*2, hitbox2.entity.x, hitbox2.entity.y, hitbox2.radius*2);
	}else{
		
		if(hitbox1.type == 'rect'){
			return collideRectCircle(hitbox1.entity.x-hitbox1.width/2, hitbox1.entity.y-hitbox1.height/2, hitbox1.width, hitbox1.height, hitbox2.entity.x, hitbox2.entity.y, hitbox2.radius*2);
		}else{
			return collideRectCircle(hitbox2.entity.x-hitbox2.width/2, hitbox2.entity.y-hitbox2.height/2, hitbox2.width, hitbox2.height, hitbox1.entity.x, hitbox1.entity.y, hitbox1.radius*2);
		}
	}	
}



function dist(x1,y1,x2,y2){
	// distanza quadratica
	return Math.pow(x2 - x1,2)+Math.pow(y2 - y1,2);
}

function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {

	let tmpX = cx;
	let tmpY = cy;


	if (cx < rx) tmpX = rx;						// vertice sinistro
	else if (cx > rx+rw) tmpX = rx+rw;			// vertice destro

	if (cy < ry) tmpY = ry;						// vertice alto
	else if (cy > ry+rh) tmpY = ry+rh;			// vertice basso


	return dist(cx,cy,tmpX,tmpY) <= Math.pow(diameter/2, 2);
}

function collideCircleCircle(x, y,d, x2, y2, d2) {

	return dist(x,y,x2,y2) <= Math.pow((d/2)+(d2/2), 2);
		
}