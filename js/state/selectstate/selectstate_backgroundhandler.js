function SelectState_BackgroundHandler(){
	this.bgs = [];
	this.bgUpdates = [];
	this.fgs = [];
	this.fgUpdates = [];
	
	this.curBackgroundsInd;
	this.curForegroundsInd;
	
	this.dojoDoorsFinished = false;
}

SelectState_BackgroundHandler.prototype = Object.create(BackgroundHandler.prototype);

SelectState_BackgroundHandler.prototype.init = function(game){
	this.initBackgrounds(game);
	this.initForegrounds(game);
};

SelectState_BackgroundHandler.prototype.initBackgrounds = function(game){
	var bg_base = new Background("img/dojo.jpg");
	this.bgs[0] = bg_base;
	this.bgUpdates[0] = this.updateBase.bind(this);
	this.curBackgroundsInd = [0];
};

SelectState_BackgroundHandler.prototype.initForegrounds = function(game){
	var fg_dojoDoors = new Background("img/dojodoors.png", 9, 3*TICKSPERSECOND);
	
	this.fgs[0] = fg_dojoDoors; 
	this.fgUpdates[0] = this.updateDojoDoors.bind(this);
	this.curForegroundsInd = [];
};


SelectState_BackgroundHandler.prototype.update = function(game){
	for(var i = this.curBackgroundsInd.length - 1; i >= 0 ; i--){
		var ind = this.curBackgroundsInd[i];
		var bg = this.bgs[ind];
		var update = this.bgUpdates[ind];
		
		update(game,bg);
	
		
		if(bg.finished){
			this.curBackgroundsInd.splice(i);
		}
	}

	for(var i = this.curForegroundsInd.length - 1; i >= 0 ; i--){
		
		var ind = this.curForegroundsInd[i];
		var bg = this.fgs[ind];
		var update = this.fgUpdates[ind];

		update(game,bg);

		if(bg.finished){
			this.curForegroundsInd.splice(i);
		}
	}
};

//// Background Updates
SelectState_BackgroundHandler.prototype.updateBase = function(game, bg){
	// do nothing
};

SelectState_BackgroundHandler.prototype.updateDojoDoors = function(game, bg){
	var ticksElapsed = game.getCurState().ticks - bg.startTick;
	if(ticksElapsed < bg.tickLength){
		bg.frame = bg.numFrames - Math.floor(bg.numFrames*ticksElapsed/bg.tickLength) - 1;
	} else {
		this.dojoDoorsFinished = true; // may want other bgs to have different "finished" conditions than ticks elapsed
		bg.finished = true;
	}
};

SelectState_BackgroundHandler.prototype.closeDoors = function(game){
	this.curForegroundsInd.push(0);
	fg_dojoDoors = this.fgs[0];
	fg_dojoDoors.startTick = game.getCurState().ticks;

};