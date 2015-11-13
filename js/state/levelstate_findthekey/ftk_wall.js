function FTK_Wall(){
	this.imgRef = "img/ftk_wall.png";

	this.type = FTK_WALL;


	this.width = 160;
	this.height = 256;
	this.x = (GAMEWIDTH)/2;
	this.y = (GAMEHEIGHT - this.height)/2;
	this.clipWidth = this.width;
	this.clipHeight = this.clipHeight;
	this.visible = true;
	
	this.collidable = true;
	this.collisionWidth = this.width;
	this.collisionHeight = this.height;
	this.collisionType = Collision.RECTANGLE;
	
	this.localTicks = 0;
	
	this.zHeight = 2; // zHeight ranks rendering priority
	
}

FTK_Wall.prototype = Object.create(Entity.prototype);
