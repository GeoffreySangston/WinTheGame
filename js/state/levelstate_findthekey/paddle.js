function Paddle(x,y){
	this.spriteSheetRef = "img/paddle.png";

	this.type = PADDLE;

	this.x = x;
	this.y = y;
	this.width = 16;
	this.height = 64;
	this.clipWidth = 16;
	this.clipHeight = 64;
	this.visible = true;
	
	this.collidable = true;
	this.collisionWidth = this.width;
	this.collisionHeight = this.height;
	this.collisionType = Collision.RECTANGLE;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
	this.speed = 3;
}

Paddle.prototype = Object.create(Entity.prototype);

Paddle.prototype.resetPosition = function(){
	this.y = GAMEWIDTH/2 - this.height/2;
};

Paddle.prototype.moveDown = function(){
	var nextY = this.y + this.speed;
	if(nextY + this.height <= GAMEHEIGHT){
		this.y = nextY;
	}
};

Paddle.prototype.moveUp = function(){
	var nextY = this.y - this.speed;
	if(nextY >= 0){
		this.y = nextY;
	}
};