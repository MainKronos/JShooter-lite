export class FPSCounter{
	// contatore fps
	constructor(){
		this.counter = 0;
		this.frames = 0;
		this.tmp = 0;

		this.interval = setInterval(()=>{
			this.frames = Math.round(this.tmp/this.counter); 
			this.tmp = 0;
			this.counter = 0;
		},200);
		
	}
	update(dt){
		this.counter++;
		this.tmp += (1/dt);
	}
	render(ctx){
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