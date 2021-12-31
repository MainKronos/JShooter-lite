import { settings } from "./settings.js";


var allAudio = []

export class GameAudio{
	constructor(type){
		if(type == 'Player'){
			this.audioShot = new Audio('./res/audio/shot.mp3');
			allAudio.push(this.audioShot);

			this.audioWalk = new Audio('./res/audio/walk.wav');
			allAudio.push(this.audioWalk);
		}else if(type == 'Enemy'){
			this.audioUndead = new Audio('./res/audio/undead.mp3');
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
			this.audioBackground.play().catch((err)=>console.error(`L'utente ha ricaricato manualmente la pagina e l'audio non può essere avviato automaticamente.\n(${err})`));
		}else if(!cond && !this.audioBackground.paused){
			this.audioBackground.pause();
			// this.audioBackground.currentTime = 0;
		}
	}
	shot(){
		// audio dello sparo
		this.audioShot.pause();
		this.audioShot.currentTime = 0;
		this.audioShot.volume = settings.globalVolume*settings.shotVolume;
		this.audioShot.play();
	}
	punch(){
		// audio dell'attacco degli zombie
		this.audioPunch.pause();
		this.audioPunch.currentTime = 0;
		this.audioPunch.volume = settings.globalVolume*settings.punchVolume;
		this.audioPunch.play();
	}
	walk(cond=true){
		// audio di camminata
		if(cond && this.audioWalk.paused){
			this.audioWalk.volume = settings.globalVolume*settings.walkVolume;
			this.audioWalk.play();
			this.audioWalk.loop=true;
		}else if(!cond && !this.audioWalk.paused){
			this.audioWalk.pause();
			// this.audioWalk.currentTime = 0;
		}
	}
	undead(cond=true){
		// audio verso dello zombie
		if(cond && this.audioUndead.paused){
			this.audioUndead.currentTime = Math.floor(Math.random()*this.audioUndead.duration);
			this.audioUndead.volume = settings.globalVolume*settings.undeadVolume;
			this.audioUndead.play();
		}else if(!cond && !this.audioUndead.paused){
			this.audioUndead.pause();
			// 
		}
	}
	
}