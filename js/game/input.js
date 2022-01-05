class InputManager{
	constructor(){
		this.mouse = {
			x: 0,
			y: 0,
			angle: 0,
			click: false
		};
		this.key = {
			up: false,
			down: false,
			right: false,
			left: false
		}

		this.addListener();
	}

	addListener(){
		// crea gli EventListener per le varie interazione dell'utente

		let inputs = this;

		// mouse event
		document.addEventListener('mousemove', function (event) {
			if(event.target === document.querySelector('canvas#GameBoard')){
				inputs.mouse.angle = Math.atan2(event.y-event.target.height/2, event.x-event.target.width/2);
				inputs.mouse.x = event.x;
				inputs.mouse.y = event.y;
			}
		});
		document.querySelector('canvas#GameBoard').addEventListener('mousedown', ()=>{
			inputs.mouse.click = true;
		});
		document.querySelector('canvas#GameBoard').addEventListener('mouseup', ()=>{
			inputs.mouse.click = false;
		});

		// key event
		document.addEventListener('keydown', function (event) {
			switch (event.key) {
				case "w": inputs.key.up = true; break;
				case "s": inputs.key.down = true; break;
				case "a": inputs.key.left = true; break;
				case "d": inputs.key.right = true; break;
			}
		});
			
		document.addEventListener('keyup', function (event) {
			switch (event.key) {
				case "w": inputs.key.up = false; break;
				case "s": inputs.key.down = false; break;
				case "a": inputs.key.left = false; break;
				case "d": inputs.key.right = false; break;
			}
		});


		document.addEventListener("visibilitychange", ()=>{
			if(document.hidden){
				inputs.mouse.click = false;
				inputs.key.up = false;
				inputs.key.down = false;
				inputs.key.right = false;
				inputs.key.left = false;
			}
		});
	}
}

export var input = new InputManager();