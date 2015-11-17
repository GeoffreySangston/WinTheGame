var FTK_KEY  		= 02000;
var FTK_WALL 		= 02001;
var FTK_RUNNINGGUY 	= 02002;


function LevelState_Falling(){
	this.type = LEVELSTATE_FINDTHEKEY;
	this.ticks = 0;
	
	this.entities;
	
	this.eventHandler;
}

LevelState_Falling.prototype = Object.create(State.prototype);

LevelState_Falling.prototype.init = function(game){
	this.eventHandler = new FTK_EventHandler();
	this.eventHandler.init(game);

	game.imageHandler.queueDownload("img/ftk_key.png");
	game.imageHandler.queueDownload("img/ftk_wall.png");
	game.imageHandler.queueDownload("img/ftk_runningguy.png");
	game.imageHandler.downloadAll();


	this.key = new FTK_Key(300,50);
	this.runningGuy = new FTK_RunningGuy(50,50);
	this.wall = new FTK_Wall(0,0);
	
	this.ePressedTick;
	
	this.entities = [this.key, this.runningGuy, this.wall];
};

LevelState_Falling.prototype.destroy = function(game){

};

LevelState_Falling.prototype.update = function(game){
	this.updateInput(game);
	this.eventHandler.handleEvents(game);
	this.updateEntityArray(game, this.entities);
	
	this.ticks++;
};

LevelState_Falling.prototype.updateInput = function(game){
	var keyStates = game.inputHandler.keyStates;
	
	if(keyStates[E] == KEYUP){
		this.triggerWin(game);
		keyStates[E] = KEYSTATIC;
	}
};

LevelState_Falling.prototype.triggerWin = function(game){
	this.runningGuy.triggerWin(game);
	this.ePressedTick = this.ticks;
	this.eventHandler.startCheckingFinished();
	
};

LevelState_Falling.prototype.render = function(game){
	game.renderer.cls();
	
	this.renderEntityArray(game, this.entities);
};