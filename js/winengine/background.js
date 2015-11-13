function Background(imgRef, numFrames, tickLength){
	this.imgRef = imgRef;
	this.numFrames = numFrames || 1;
	this.frame = 0;
	
	this.startTick;
	this.tickLength = tickLength;
	
	this.finished = false;
	
	
	// entity variables
	this.x = 0;
	this.y = 0;
	this.width = GAMEWIDTH;
	this.height = GAMEHEIGHT;
	this.clipWidth = GAMEWIDTH;
	this.clipHeight = GAMEHEIGHT;

	this.visible = true;
};


Background.prototype = Object.create(Entity.prototype); // viewing this as an entity is extremely helpful