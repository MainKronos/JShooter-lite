class FPSCounter{
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
			document.querySelector('span#FPS').textContent = this.frames;
			document.querySelector('span#FPS').style.textShadow = (this.tmp/this.counter<50)? '0 0 5px red': '0 0 5px white';
		}
	}
}