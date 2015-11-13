function AIPaddle(x,y){
	this.imgRef = "img/paddle.png";

	this.type = PADDLE;

	this.x = x;
	this.y = y;
	this.width = 16;
	this.height = 64;
	this.visible = true;
	
	this.collidable = true;
	this.collisionWidth = this.width;
	this.collisionHeight = this.height;
	this.collisionType = Collision.RECTANGLE;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
	this.speed = 3;
	this.movingUp = true;
}

AIPaddle.prototype = Object.create(Paddle.prototype);

AIPaddle.prototype.update = function(game){
	var ball = game.getCurState().ball;

	if(ball.xVel > 0){
		this.moveToBall(ball);
	} else {
		this.moveAboutCenter();
	}
};

AIPaddle.prototype.moveToBall = function(ball){
	var thisCenter = this.calcCenterXY();
	var ballCenter = ball.calcCenterXY();
	
	if(ball.yVel >= 0 && (ballCenter.y > thisCenter.y)){
		this.moveDown();
	} else if(ball.yVel < 0 && (ballCenter.y < thisCenter.y)){
		this.moveUp();
	}
};

AIPaddle.prototype.moveAboutCenter = function(){
	var thisCenter = this.calcCenterXY();

	if(this.movingUp){
		this.moveUp();
	} else {
		this.moveDown();
	}
	
	if(thisCenter.y < GAMEHEIGHT/2 - 75){
		this.movingUp = false;
	} else if(thisCenter.y > GAMEHEIGHT/2 + 75){
		this.movingUp = true;
	}
};