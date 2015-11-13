function Wall(x,y){
	this.spriteSheetRef = "img/paddle.png";

	this.type = WALL;

	this.x = x;
	this.y = y;
	this.width = GAMEWIDTH;
	this.height = 64;
	this.clipWidth = 16;
	this.clipHeight = 64;
	this.visible = false;
	
	this.collidable = true;
	this.collisionWidth = this.width;
	this.collisionHeight = this.height;
	this.collisionType = Collision.RECTANGLE;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
}

Wall.prototype = Object.create(Entity.prototype);
