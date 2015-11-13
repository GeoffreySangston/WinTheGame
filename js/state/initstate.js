function InitState(){
	this.type = INITSTATE;
	this.ticks = 0;
	
}
InitState.prototype = Object.create(State.prototype);

InitState.prototype.init = function(game){
	// can initialize the game here

	
		//backgrounds:
		game.imageHandler.queueDownload("img/dojo.jpg");
		game.imageHandler.queueDownload("img/dojodoors.png");
		
		game.imageHandler.queueDownload("img/selectitemtemp.png");
		game.imageHandler.queueDownload("img/selectItemBorder.png");
		game.imageHandler.queueDownload("img/selectItemBorderHighlight.png");
		game.imageHandler.queueDownload("img/selectitemtemp.png");

		
		game.audioHandler.queueDownload("audio/levelselect.mp3");
		this.downloadAndLaunch(game);
		
		
};

InitState.prototype.downloadAndLaunch = function(game){
	game.imageHandler.downloadAll(this.__imageDownloadCallback,game);
}

InitState.prototype.__imageDownloadCallback = function(game){
	game.audioHandler.downloadAll(
		game.__setState.bind(game), 
		SELECTSTATE
		//LEVELSTATE_FINDTHEKEY
	);
}

InitState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};

InitState.prototype.update = function(game){
	this.localTicks++;
};

InitState.prototype.render = function(game){
	// just a logic state, no rendering
	// could add rendering if this takes some visible amount of time
};