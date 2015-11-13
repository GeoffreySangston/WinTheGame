function WinStateFactory(){

}

WinStateFactory.prototype = Object.create(StateFactory.prototype);

WinStateFactory.prototype.getState = function(stateId){
	console.log("GETTING STATE: " + stateId);
	switch(stateId){
		case INITSTATE: return new InitState();
		case SELECTSTATE: return new SelectState();
		case LEVELSTATE: return new LevelState();
		case LEVELSTATE_BEHAPPY: return new LevelState_BeHappy();
		case LEVELSTATE_FINDTHEKEY: return new LevelState_FindTheKey();
		case LEVELSTATE_PONG: return new LevelState_Pong();
		default:
	
	}
};