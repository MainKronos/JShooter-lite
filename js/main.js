// import { Player, Enemy, Bullet } from "./entity.js";
import { MapProcessor } from "./map.js";
import { FPSCounter } from "./fps.js";
import { GameAudio } from "./audio.js";

class GameBoard{

	constructor(){
		// setup
		this.canvas = document.querySelector('canvas#GameBoard');
		this.ctx = this.canvas.getContext('2d');
		
		// this.ctx.filter = `sepia(0)`;

		this.map = new MapProcessor(this.canvas);

		this.time = 0; // serve per l'aggiornamento basato sul tempo
		this.fps = new FPSCounter();

		this.audio = new GameAudio(this.constructor.name);
		

		this.paused = document.hidden;
		this.end = false; // fine del gioco

		this.anim = null; // AnimationFrame

		this.addListener();
		this.resizeBoard();

		if(!this.paused) this.start();
		else this.stop();
		// else this.render(); // per il render iniziale altrimenti lo schermo è grigio
	}

	engine(){
		this.anim = window.requestAnimationFrame(()=>this.engine());

		let dt = Date.now()-this.time;

		if(Math.round(1000/dt)<=+Infinity){ // limitatore fps
			this.time = Date.now();

			this.update(dt/1000);
			this.render();
		}
	}

	start(){
		// avvia il gioco
		this.gameMenu(false); // disattiva il menu
		this.paused = false;
		if(!this.end){
			this.audio.background(true); // audio
			this.time = Date.now();
			this.engine();
		}
	}
	stop(){
		// stoppa il gioco
		this.paused = true;
		cancelAnimationFrame(this.anim);
		GameAudio.pauseAll();
		this.gameMenu(true); // attiva il menu
		
	}
	gameMenu(show){
		// attiva o disattiva il menu del gioco
		let menu = document.getElementById('GameMenu');
		menu.style.display = show ? 'flex' : 'none';
		for(let btn of menu.getElementsByTagName('button')){
			btn.disabled = !show;
		}
	}
	update(dt){
		// aggiorna tutti gli elementi
		this.fps.update(dt);
		this.map.update(dt);
		
	}
	render(){
		// renderizza tutti gli elementi
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		
		// gestione elementi mappa
		this.map.render(this.ctx);
		
		this.fps.render(this.ctx);
		
		if(this.map.endGame) this.endGame(this.map.endGame);
		
	}

	endGame(val){
		// finisce il gioco
		this.end = true;
		
		cancelAnimationFrame(this.anim);

		GameAudio.pauseAll();

		
		this.ctx.save();
		this.ctx.font = "bold 100px consolas";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'black';
		this.ctx.shadowColor = 'white';
		this.ctx.shadowBlur=5;
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillText((val=='good')? 'Win' : 'Game Over', this.canvas.width/2, this.canvas.height/2);

		
		this.ctx.restore();
		
		setTimeout(()=>window.location.replace("./"),3000);
		

	}

	addListener(){
		// aggiunge gli EventListener
		window.addEventListener('resize', ()=>this.resizeBoard());
		document.addEventListener("visibilitychange", ()=>{

			if(document.hidden) this.stop();

		});
		document.addEventListener('keydown', (event)=> {
			if(event.key == 'Escape'){

				if(!this.paused) this.stop();
				else this.start();
			}
		});
		this.canvas.addEventListener('click', ()=>{
			if(!this.paused){
				let bullets = this.map.player.shoot();
				if(bullets) this.map.bullets.push(...bullets);
			}
		});
		document.getElementById('resume').addEventListener('click', ()=>this.start());
		document.getElementById('exit').addEventListener('click', ()=>window.location.replace("./"));
	}

	resizeBoard(){
		// aggiorna la grandezza del canvas
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.render();
	}
	
}

window.onload = function(){
	// inizializzatore
	let game = new GameBoard();
}