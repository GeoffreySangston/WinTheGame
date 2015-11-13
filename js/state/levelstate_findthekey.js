function LevelState_FindTheKey(){
	this.type = LEVELSTATE_FINDTHEKEY;
	this.ticks = 0;
	
	this.entities;
}

LevelState_FindTheKey.prototype = Object.create(State.prototype);

LevelState_FindTheKey.prototype.init = function(game){
	var key = new Key();
	var runningGuy = new RunningGuy();
	var wall = new Wall();
}

LevelState_FindTheKey.prototype.destroy = function(game){

}

LevelState_FindTheKey.prototype.update = function(game){

}

LevelState_FindTheKey.prototype.render = function(game){
	this.renderEntityArray(game,this.entities);
};