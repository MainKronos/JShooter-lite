import { C2D } from "./Collide2D.js";

export default ()=>{};

export function hitboxOverlap(hitbox1, hitbox2){

	if(hitbox1.type == hitbox2.type){
		return C2D.collideCircleCircle(hitbox1.entity.x, hitbox1.entity.y, hitbox1.radius*2, hitbox2.entity.x, hitbox2.entity.y, hitbox2.radius*2);
	}else{
		
		if(hitbox1.type == 'rect'){
			return C2D.collideRectCircle(hitbox1.entity.x-hitbox1.width/2, hitbox1.entity.y-hitbox1.height/2, hitbox1.width, hitbox1.height, hitbox2.entity.x, hitbox2.entity.y, hitbox2.radius*2);
		}else{
			return C2D.collideRectCircle(hitbox2.entity.x-hitbox2.width/2, hitbox2.entity.y-hitbox2.height/2, hitbox2.width, hitbox2.height, hitbox1.entity.x, hitbox1.entity.y, hitbox1.radius*2);
		}
	}	
}