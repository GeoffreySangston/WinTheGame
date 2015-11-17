function FALL_Bomb(x,y){
	this.imgRef = "img/fall_bigbomb.png";

	this.type = FTK_RUNNINGGUY;
	this.STARTX = 50;


	this.x = this.STARTX;
	this.y = 250;
	this.width = 80;
	this.height = 96;
	this.clipWidth = this.width;
	this.clipHeight = this.clipHeight;
	this.visible = true;
	
	this.collidable = true;
	this.collisionWidth = this.width;
	this.collisionHeight = this.height;
	this.collisionType = Collision.RECTANGLE;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
	
	this.RUNNING = 0;
	this.WIN = 1;
	
	this.state = this.RUNNING;
}

FALL_Bomb.prototype = Object.create(Entity.prototype);


FALL_Bomb.prototype.update = function(game){
	if(this.state == this.RUNNING){
		if(this.x < GAMEWIDTH/2){
			this.x += 5;
		} else {
			this.x = this.STARTX;
		}
	} else { // WIN
		
	}
};

FALL_Bomb.prototype.triggerWin = function(game){
	this.state = this.WIN;
};