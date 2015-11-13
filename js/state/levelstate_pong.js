var PADDLE = 11000;
var BALL = 11001;
var WALL = 11002;

function LevelState_Pong(){
	this.localTicks = 0;
	this.type = LEVELSTATE_PONG;
	
	this.entities;	
	this.collisions;
	
	this.player1Score = 0;
	this.player2Score = 0;
	
	var paddleOffset = 8;
	this.player1Paddle = new Paddle(0,0);
	this.player2Paddle = new AIPaddle(0,0);
	this.player1Paddle.x = paddleOffset;
	this.player2Paddle.x = GAMEWIDTH - this.player2Paddle.width - paddleOffset;

	this.ball = new Ball(0,0);
	
	this.topWall = new Wall(0, 0);
	this.bottomWall = new Wall(0, 0);
	this.topWall.y = -this.topWall.height;
	this.bottomWall.y = GAMEHEIGHT;
}

LevelState_Pong.prototype = Object.create(State.prototype);

LevelState_Pong.prototype.init = function(game){
	game.imageHandler.queueDownload("img/paddle.png");
	game.imageHandler.downloadAll();

	this.localTicks = 0;
	this.player1Paddle.resetPosition();
	this.player2Paddle.resetPosition();
	this.ball.resetPosition();
	this.entities = [this.player1Paddle, this.player2Paddle, this.ball, this.topWall, this.bottomWall];
	this.collisions = [];
};

LevelState_Pong.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};

LevelState_Pong.prototype.update = function(game){
	this.handleInputs(game);
	this.checkCollisions(game);
	this.actCollisions();
	this.updateEntities(game);
	this.cleanup();
	this.checkWinCondition(game);
	this.localTicks++;
};

LevelState_Pong.prototype.checkWinCondition = function(game){
	var ball = this.ball;
	var player1Paddle = this.player1Paddle;
	var player2Paddle = this.player2Paddle;
	
	var reset = false;
	if(ball.x + ball.width < 0){
		// point to player 2
		this.player2Score++;
		reset = true;
	} else if(ball.x > GAMEWIDTH){
		// point to player 1
		this.player1Score++;
		reset = true;
	}
	
	if(reset){
		player1Paddle.resetPosition();
		player2Paddle.resetPosition();
		ball.resetPosition();
	}
};

LevelState_Pong.prototype.handleInputs = function(game){
	var keyStates = game.inputHandler.keyStates;
	var playerPaddle = this.player1Paddle;
	
	if(keyStates[S] == KEYDOWN || keyStates[DOWN] == KEYDOWN){
		playerPaddle.moveDown();
	} else if(keyStates[W] == KEYDOWN || keyStates[UP] == KEYDOWN){
		playerPaddle.moveUp();
	}
};
LevelState_Pong.prototype.checkCollisions = function(game){
	this.collisions.length = 0;
	for(var i = 0; i < this.entities.length-1; i++){
		for(var j = i+1; j < this.entities.length; j++){
			if(this.entities[i].collides(this.entities[j])){
				this.collisions.push(new Collision(this.entities[i], this.entities[j]));
			}
		}
	}
};

LevelState_Pong.prototype.actCollisions = function(){
	for(var i = 0; i < this.collisions.length; i++){
		var a = this.collisions[i].colliderA;
		var b = this.collisions[i].colliderB;
		
		a.updateCollision(b);
		b.updateCollision(a);
	}
};

LevelState_Pong.prototype.updateEntities = function(game){
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].update(game);
	}
};

LevelState_Pong.prototype.cleanup = function(game){
	for(var i = this.entities.length-1; i >= 0; i--){	
		if(this.entities[i].shouldDestroy()){
			this.entities.splice(i,1);
		}
	}
};

LevelState_Pong.prototype.render = function(game){
	game.renderer.cls();
	
	this.renderEntities(game);
	this.renderHUD(game);
};

LevelState_Pong.prototype.renderEntities = function(game){

	this.renderEntityArray(game,this.entities);
};

LevelState_Pong.prototype.sortByZHeightNaive = function(entities){
	for(var i = 1; i < entities.length; i++){
		var curEnt = entities[i];
		var j = i - 1;
		
		while(j >= 0 && entities[j].zHeight > curEnt.zHeight){
			entities[j+1] = entities[j];
			j--;
		}
		entities[j+1] = curEnt;
	}	
};

LevelState_Pong.prototype.renderHUD = function(game){
	game.renderer.drawText(50,50,this.player1Score,16);
	game.renderer.drawText(GAMEWIDTH-50,50,this.player2Score,16);
};