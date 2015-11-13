function SelectState_EventHandler(){
	this.eventCallbacks = [];
}

SelectState_EventHandler.prototype = Object.create(EventHandler.prototype);

SelectState_EventHandler.prototype.init = function(game){

}

SelectState_EventHandler.prototype.dojoDoorsClosed = function(game){
	var selectState = game.getCurState();
	var selectStateBgHandler = selectState.backgroundHandler;
	var finished = selectStateBgHandler.dojoDoorsFinished;
	
	if(finished){
		game.nextStateId = selectState.selectedStateId;
		console.log("FINISHED");
	}
	
};

SelectState_EventHandler.prototype.startCheckingDoors = function(game){
	this.eventCallbacks.push(this.dojoDoorsClosed.bind(this));
};