function WinGame(){
	this.htmlActuator = new HTMLActuator();
	this.renderer = new Renderer(this.htmlActuator.canvas, GAMEWIDTH, GAMEHEIGHT);
	this.inputHandler = new InputHandler(this.htmlActuator.canvas);
	this.imageHandler = new ImageHandler();
	this.audioHandler = new AudioHandler();
	this.audioPlayer = new AudioPlayer(this.audioHandler);

	this.stateFactory = new WinStateFactory();
	this.stateMachine = new StateMachine();
	
	this.nextStateId;
}

WinGame.prototype = Object.create(Game.prototype);