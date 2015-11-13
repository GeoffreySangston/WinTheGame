function FTK_Key(x,y){
	this.imgRef = "img/ftk_key.png";

	this.type = FTK_KEY;

	this.x = GAMEWIDTH - 200;
	this.y = 300;
	this.width = 64;
	this.height = 32;
	this.clipWidth = this.width;
	this.clipHeight = this.clipHeight;
	this.visible = true;
	
	this.collidable = true;
	this.collisionWidth = this.width;
	this.collisionHeight = this.height;
	this.collisionType = Collision.RECTANGLE;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
}

FTK_Key.prototype = Object.create(Entity.prototype);
