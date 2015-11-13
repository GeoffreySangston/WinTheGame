function InputHandler(gameContainer){
	this.gameContainer = gameContainer;
	
	this.events = {};
	
	this.listen();
	
	this.keyStates = {};
	this.keyStates[Z] = KEYSTATIC;
	this.keyStates[X] = KEYSTATIC;
	this.keyStates[A] = KEYSTATIC;
	this.keyStates[M] = KEYSTATIC;
	this.keyStates[W] = KEYSTATIC;
	this.keyStates[D] = KEYSTATIC;
	this.keyStates[S] = KEYSTATIC;
	this.keyStates[LEFT] = KEYSTATIC;
	this.keyStates[UP] = KEYSTATIC;
	this.keyStates[RIGHT] = KEYSTATIC;
	this.keyStates[DOWN] = KEYSTATIC;
	this.keyStates[SHIFT] = KEYSTATIC;
	this.keyStates[SPACE] = KEYSTATIC;
	
	this.mouseState = KEYSTATIC;
	this.mouseX = 0;
	this.mouseY = 0;
	
}

InputHandler.prototype.listen = function(){
	var self = this;
	
	window.addEventListener('keydown', function(e){
		//console.log(e.keyCode);
		if(!isNaN(self.keyStates[e.keyCode])){ // if it's a key we're paying attention to
			if(e.keyCode == UP || e.keyCode == DOWN || e.keyCode == SPACE){
				e.preventDefault(); // prevents it from scrolling up/down when using those arrow keys
			}
			
			
			if(self.keyStates[e.keyCode] != KEYDOWN){ // line makes it not emit nonstop
				self.keyStates[e.keyCode] = KEYDOWN;
			}

		}
	});
	
	window.addEventListener('keyup', function(e){
		self.keyStates[e.keyCode] = KEYUP;
	});
	
	this.gameContainer.addEventListener('mousedown', function(e){
		/*
		Technically could record this but it seems like it would be complicated synchronizing it with the frames of the game,
		just use this to record the actual mouse state and mouse move to record the position
		*/
    	if(self.mouseState != KEYDOWN){ // line makes it not emit nonstop
    		self.mouseState = KEYDOWN;
    	}
	});
	
	this.gameContainer.addEventListener('mouseup', function(e){
		self.mouseState = KEYUP;
	});
	
	this.gameContainer.addEventListener('mousemove', function(e){
		var canvasX = self.gameContainer.offsetLeft;
    	var canvasY = self.gameContainer.offsetTop;
    	var pageX = e.pageX;
    	var pageY = e.pageY;
    	
    	self.mouseX = pageX - canvasX;
    	self.mouseY = pageY - canvasY;
    	
	});

};

InputHandler.prototype.on = function(event, callback) {
	if(!this.events[event]){ 
		this.events[event] = [];
	}
	this.events[event].push(callback);
};

InputHandler.prototype.emit = function (event, data) {
	var callbacks = this.events[event];
	if (callbacks) {
		callbacks.forEach(function (callback) {
			callback(data);
		});
	}
};

InputHandler.prototype.clearEvents = function(){
	this.events = {};
};