var allAudio = []

class GameAudio{
	constructor(type){
		if(type == 'Player'){
			this.audioShot = new Audio('./res/audio/shot.wav');
			allAudio.push(this.audioShot);

			this.audioWalk = new Audio('./res/audio/walk.wav');
			allAudio.push(this.audioWalk);
		}else if(type == 'Enemy'){
			this.audioUndead = new Audio('./res/audio/undead.wav');
			allAudio.push(this.audioUndead);

			this.audioPunch = new Audio('./res/audio/punch.wav');
			allAudio.push(this.audioPunch);
		}else if(type == 'GameBoard'){
			this.audioBackground = new Audio('./res/audio/background.wav');
			allAudio.push(this.audioBackground);
		}
		return this;
	}
	static pauseAll(){
		for(let audio of allAudio){
			audio.pause();
		}
	}

	background(cond=true){
		// audio di background
		if(cond && this.audioBackground.paused){
			this.audioBackground.loop=true;
			this.audioBackground.volume = settings.globalVolume*settings.backgroundVolume;
			return this.audioBackground.play();
		}else if(!cond && !this.audioBackground.paused){
			this.audioBackground.pause();
		}
	}
	shot(){
		// audio dello sparo
		this.audioShot.pause();
		this.audioShot.currentTime = 0;
		this.audioShot.volume = settings.globalVolume*settings.shotVolume;
		this.audioShot.play().catch(()=>{});
	}
	punch(){
		// audio dell'attacco degli zombie
		this.audioPunch.pause();
		this.audioPunch.currentTime = 0;
		this.audioPunch.volume = settings.globalVolume*settings.punchVolume;
		this.audioPunch.play().catch(()=>{});
	}
	walk(cond=true){
		// audio di camminata
		if(cond && this.audioWalk.paused){
			this.audioWalk.volume = settings.globalVolume*settings.walkVolume;
			this.audioWalk.play().catch(()=>{});
			this.audioWalk.loop=true;
		}else if(!cond && !this.audioWalk.paused){
			this.audioWalk.pause();
		}
	}
	undead(cond=true){
		// audio verso dello zombie
		if(cond && this.audioUndead.paused){
			this.audioUndead.currentTime = Math.floor(Math.random()*this.audioUndead.duration);
			this.audioUndead.volume = settings.globalVolume*settings.undeadVolume;
			this.audioUndead.play().catch(()=>{});
		}else if(!cond && !this.audioUndead.paused){
			this.audioUndead.pause();
			// 
		}
	}
	
}