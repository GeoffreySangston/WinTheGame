function BackgroundHandler(){
	this.bgs = [];
	this.bgUpdates = [];
	this.fgs =[];
	this.fgUpdate = [];
	
	this.curBackgroundsInd;
	this.curForegroundsInd;
}

BackgroundHandler.prototype.init = function(game){
	this.initBackgrounds(game);
	this.initForegrounds(game);
};

BackgroundHandler.prototype.initBackgrounds = function(game){
	this.curBackgroundsInd = [];
	for(var i = 0; i < this.bgs.length; i++){
		this.curBackgroundsInd.push(i);
	}
};

BackgroundHandler.prototype.initForegrounds = function(game){
	this.curForegroundsInd = [];
	for(var i = 0; i < this.fgs.length; i++){
		this.curForegroundsInd.push(i);
	}
};

BackgroundHandler.prototype.update = function(game){
	this.updateBackgrounds(game);
	this.updateForegrounds(game);
};

BackgroundHandler.prototype.updateBackgrounds = function(game){

};

BackgroundHandler.prototype.updateForegrounds = function(game){

};

BackgroundHandler.prototype.getCurBackgrounds = function(){
	var bgs = [];
	
	for(var i = 0; i < this.curBackgroundsInd.length; i++){
		var bg = this.bgs[this.curBackgroundsInd[i]];
		bgs.push(bg);
	}

	return bgs;
};

BackgroundHandler.prototype.getCurForegrounds = function(){
	var fgs = [];
	
	for(var i = 0; i < this.curForegroundsInd.length; i++){
		var fg = this.fgs[this.curForegroundsInd[i]];
		
		fgs.push(fg);
	}

	return fgs;
};