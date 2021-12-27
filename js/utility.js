export default ()=>{};

export function hitboxOverlap(hitbox1, hitbox2){
	let overlap = false;
	for(let point of hitbox1.points){
		if(pointInPolygon(hitbox2.points, point)) return true;
	}
	for(let point of hitbox2.points){
		if(pointInPolygon(hitbox1.points, point)) return true;
	}
	return false;
}

function rectangleIntersection (r1, r2) {
    return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);
};

function pointInPolygon(polygon, point) {
    // Un punto è in un poligono se una linea dal punto all'infinito attraversa il poligono un numero dispari di volte
    let odd = false;
    // Per ogni spigolo (In questo caso per ogni punto i del poligono e quello precedente j)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        //Se una linea passante dai punti i e j attraversa questo bordo
        if (((polygon[i].y > point.y) !== (polygon[j].y > point.y)) // Un punto deve essere sopra e uno sotto la nostra coordinata y
            // ...e il bordo non attraversa la tua coordinata Y prima della tua coordinata x (ma tra la coordinata x e l'infinito)
            && (point.x < ((polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x))) {
            // Invert odd
            odd = !odd;
        }
        j = i;

    }
    // Se il numero di incroci era dispari, il punto è nel poligono
    return odd;
};





