import { MapProcessor } from "./map.js";
import { FPSCounter } from "./fps.js";
import { GameAudio } from "./audio.js";
import { settings } from "./settings.js";

export class GameBoard{

	constructor(username){
		this.username = username;

		// setup
		this.canvas = document.querySelector('canvas#GameBoard');

		this.ctx = this.canvas.getContext('2d');
		
		// this.ctx.filter = `sepia(0)`;

		fetch("./api/map/")
		.then((response)=> response.json())
		.then((response)=>{
			if(!response['error']){
				this.map = new MapProcessor(this.canvas, response['data']['map']);

				this.id = response['data']['id']; // identificatore partita

				this.time = 0; // serve per l'aggiornamento basato sul tempo
				this.startTime = Date.now(); // momento di inizio gioco
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
			
		});
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
		document.getElementById('GameLoader').style.display = 'none'; // disattiva il GameLoader
		this.canvas.style.filter = 'sepia(0.4) blur(0.8px)'; // ripristina i filtri
		this.gameMenu(false); // disattiva il menu
		settings.show(false);
		this.paused = false;
		if(!this.end){	
			this.audio.background(true).then(()=>{
				this.time = Date.now();
				this.engine();
			}).catch((err)=>{
				this.stop();
			});	
		}
	}
	stop(){
		// stoppa il gioco
		this.paused = true;
		cancelAnimationFrame(this.anim);
		GameAudio.pauseAll();
		this.gameMenu(true); // attiva il menu
		this.canvas.style.filter = 'sepia(0.5) blur(5px)'; // rende opaco lo sfondo
		
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

		if(val=='good') this.sendScore(); // invia il punteggio
		
		cancelAnimationFrame(this.anim);

		GameAudio.pauseAll();

		this.canvas.style.letterSpacing = '0.5rem';

		
		this.ctx.save();
		this.ctx.font = "bold 14vw Capture";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = (val=='good')? 'rgba(255, 204, 0, .99)' : 'rgba(255, 204, 0, 0.4)';
		this.ctx.shadowColor = '#ff7e00';
		this.ctx.shadowBlur = (val=='good')? 2 : 0;
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillText((val=='good')? 'Win' : 'Game Over', this.canvas.width/2, this.canvas.height/2);

		this.ctx.fillStyle = 'rgba(45,45,45,1)';
		this.ctx.font = "bold 50px Capture";
		this.ctx.shadowBlur = 0;

		this.ctx.fillText(`in ${Math.floor((Date.now()-this.startTime)/1000)} secondi`, this.canvas.width/2, this.canvas.height/2+300);
		
		this.ctx.restore();
		this.canvas.style.letterSpacing = '';
		
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
		document.getElementById('resume').addEventListener('click', ()=>this.start());
		document.getElementById('exit').addEventListener('click', ()=>window.location.replace("./"));
		document.getElementById('settings').addEventListener('click', ()=>{
			this.gameMenu(false);
			settings.show(true);
		});
		document.getElementById('back').addEventListener('click', ()=>{
			this.gameMenu(true);
			settings.show(false);
		})
	}

	resizeBoard(){
		// aggiorna la grandezza del canvas
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.render();
	}

	sendScore(){

		let score = (Date.now() - this.startTime).toString();

		let vettore = (Math.floor(Math.random() * (8999999998) ) + 1000000000).toString();
		let lunghezza = score.length;
		let pos = Math.floor(Math.random() * (vettore.length - score.length));

		vettore = (pos+1).toString() + vettore.slice(0,pos) + score + vettore.slice(pos+score.length) + lunghezza.toString();

		fetch('./api/account/score/',{
			method: 'POST',
			body: JSON.stringify({
				gameID: this.id,
				score: btoa(vettore)
			})
		})
		.then(res=>console.log(res), err=>console.log(err));
	}
	
}