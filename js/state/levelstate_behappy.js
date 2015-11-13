function LevelState_BeHappy(){
	this.type = LEVELSTATE_BEHAPPY;
	this.ticks = 0;
}

LevelState_BeHappy.prototype = Object.create(LevelState.prototype);