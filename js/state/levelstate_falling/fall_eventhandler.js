function FALL_EventHandler(){
	this.eventCallbacks = [];
}

FALL_EventHandler.prototype = Object.create(EventHandler.prototype);

FALL_EventHandler.prototype.init = function(game){
}

FALL_EventHandler.prototype.finished = function(game){
	var ftk_state = game.getCurState();
	var finished = (ftk_state.ticks - ftk_state.ePressedTick) > 200; // will get rid of this magic number when the animation is implemented

	if(finished){
		game.nextStateId = SELECTSTATE;
	}
	
};

FALL_EventHandler.prototype.startCheckingFinished = function(){
	this.eventCallbacks.push(this.finished.bind(this));
};