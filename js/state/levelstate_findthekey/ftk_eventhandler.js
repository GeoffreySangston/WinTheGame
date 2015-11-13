function FTK_EventHandler(){
	this.eventCallbacks = [];
}

FTK_EventHandler.prototype = Object.create(EventHandler.prototype);

FTK_EventHandler.prototype.init = function(game){
}

FTK_EventHandler.prototype.finished = function(game){
	var ftk_state = game.getCurState();
	var finished = (ftk_state.ticks - ftk_state.ePressedTick) > 200; // will get rid of this magic number when the animation is implemented

	if(finished){
		game.nextStateId = SELECTSTATE;
	}
	
};

FTK_EventHandler.prototype.startCheckingFinished = function(){
	this.eventCallbacks.push(this.finished.bind(this));
};