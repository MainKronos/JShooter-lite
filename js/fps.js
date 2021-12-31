import { settings } from "./settings.js";

export class FPSCounter{
	// contatore fps
	constructor(){
		this.counter = 0;
		this.frames = 0;
		this.tmp = 0;

		this.interval = setInterval(()=>{
			this.frames = Math.round(this.tmp/this.counter); 
			if(isNaN(this.frames)) this.frames = 0;
			this.tmp = 0;
			this.counter = 0;
		},200);
		
	}
	update(dt){
		if(settings.showFPS){
			this.counter++;
			this.tmp += (dt==0)?0:(1/dt);
		}
	}
	render(ctx){
		if(settings.showFPS){
			ctx.save();

			ctx.font = "bold 30px consolas";
			ctx.textAlign = "center";
			ctx.fillStyle = 'black';
			ctx.shadowColor = 'white';
			ctx.shadowBlur=5;
			ctx.fillText(this.frames, 50, 50);
			ctx.restore();
		}
	}
}