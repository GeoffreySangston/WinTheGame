function SelectState(){
	this.ticks = 0;
	this.type = SELECTSTATE;
	
	this.backgroundHandler;
	this.eventHandler;
	
	this.chapters = [
		{title: "Be Happy :)", 				titleMarginLeft: 20, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE_BEHAPPY},
		{title: "Find The Key", 			titleMarginLeft: 15, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE_FINDTHEKEY}, 
		{title: "Just Kidding", 			titleMarginLeft: 18, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE}, 
		{title: "Never", 					titleMarginLeft: 35, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE},
		{title: "Lalala", 					titleMarginLeft: 35, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE}, 	 
		{title: "The Way",					titleMarginLeft: 28, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE}, 	
		{title: "Black Sheep Wall", 		titleMarginLeft: 5, titleMarginTop: 90, thumb: 	"img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE}, 
		{title: "Win!", 					titleMarginLeft: 37, titleMarginTop: 90, thumb: "img/selectitemtemp.png", hovered: false, levelId: LEVELSTATE_PONG}
	];
	
	
	
	this.marginTop = 150;
	this.marginLeft = 160;
	this.itemWidth = 96; 
	this.itemHeight = 96;
	this.itemsPerRow = 4;
	this.spacingRight = 32;
	this.spacingBot = 48;
	this.fontSize = 10;
	this.fontColor = "#FFF";
	
	this.borderDefaultColor = "#FFF";
	this.borderHoverColor = "#FF0000";
	
	this.chapterDimensions =[];
	
	this.selectedStateId;
}
SelectState.prototype = Object.create(State.prototype);

SelectState.prototype.init = function(game){
	this.backgroundHandler = new SelectState_BackgroundHandler();
	this.backgroundHandler.init(game);

	this.eventHandler = new SelectState_EventHandler();
	this.eventHandler.init(game);
	
	for(var i = 0; i < this.chapters.length; i++){
		var row = Math.floor(i/this.itemsPerRow);
		var col = (i % this.itemsPerRow);
		
		var x = this.itemWidth * col;
		var y = this.itemHeight * row;
		
		if(col > 0){
			x += this.spacingRight * col;
		}
		if(row > 0){
			y += this.spacingBot * row;
		}
		
		x += this.marginLeft;
		y += this.marginTop;
		
		this.chapterDimensions.push({
			x : x,
			y : y,
			row : row,
			col : col
		});
	}
	
	//game.audioPlayer.loopAudio("audio/CreepyGameRough1.mp3",0,1);
};

SelectState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
	game.renderer.cls();
};

SelectState.prototype.update = function(game){
	this.updateInput(game);
	this.backgroundHandler.update(game);
	this.eventHandler.handleEvents(game);
	
	this.ticks++;
};
SelectState.prototype.updateInput = function(game){
	var mouseX = game.inputHandler.mouseX;
	var mouseY = game.inputHandler.mouseY;

	for(var i = 0; i < this.chapters.length; i++){
		var row = this.chapterDimensions[i].row;
		var col = this.chapterDimensions[i].col;
		var x = this.chapterDimensions[i].x;
		var y = this.chapterDimensions[i].y;
		
	
		var isHoveringBox = ((mouseX >= x) && (mouseX <= x + this.itemWidth) &&
		   					(mouseY >= y) && (mouseY <= y + this.itemHeight));
		//console.log(isHoveringBox);
		this.chapters[i].hovered = isHoveringBox;
		
		if(isHoveringBox){
			if(game.inputHandler.mouseState == KEYUP){
				this.selectedStateId = this.chapters[i].levelId;
				this._closeDoors(game);
				
				game.inputHandler.mouseState = KEYSTATIC;
			}
		}
	}
	
	if(game.inputHandler.mouseState == KEYUP){
		game.inputHandler.mouseState = KEYSTATIC;
	}
	
	
};

SelectState.prototype._closeDoors = function(game){
	game.audioPlayer.playAudio("audio/levelselect.mp3",0,1)
	this.backgroundHandler.closeDoors(game);
	this.eventHandler.startCheckingDoors();
};

SelectState.prototype.render = function(game){
	game.renderer.cls();
	var bgs = this.backgroundHandler.getCurBackgrounds();
	var fgs = this.backgroundHandler.getCurForegrounds()
	
	//this.renderGrounds(game,bgs);
	this.renderEntityArray(game, bgs);
	this.renderMenuItems(game);
	this.renderEntityArray(game, fgs);
	//this.renderGrounds(game,fgs);
};



SelectState.prototype.renderMenuItems = function(game){
	var isItemHovered = false;

	for(var i = 0; i < this.chapters.length; i++){
		var x = this.chapterDimensions[i].x;
		var y = this.chapterDimensions[i].y;
		var row = this.chapterDimensions[i].row;
		var col = this.chapterDimensions[i].col;
		var chap = this.chapters[i];


		var boxWidth = this.itemWidth;
		var boxHeight = this.itemHeight;
		var textX = x + chap.titleMarginLeft;
		var textY = y + chap.titleMarginTop;
		var title = chap.title;
		var fontSize = this.fontSize;
		var fontColor = this.fontColor;
		
		var image = game.imageHandler.cache[chap.thumb];
		
		var rectColor = this.borderDefaultColor;
		
		if(chap.hovered){
			border = game.imageHandler.cache["img/selectItemBorderHighlight.png"];
			isItemHovered = true;
		} else {
			border = game.imageHandler.cache["img/selectItemBorder.png"];
		}
		
	
		
		game.renderer.drawImage(image, 0, 0, boxWidth, boxHeight, x, y, boxWidth, boxHeight);
		game.renderer.drawImage(border,0, 0, boxWidth, boxHeight, x, y, boxWidth, boxHeight,0, rectColor);
		game.renderer.drawText(textX, textY, title, fontSize, fontColor);
	}
	
	if(isItemHovered){
		document.getElementById("canvas").style.cursor = "pointer";
	} else {
		document.getElementById("canvas").style.cursor = "auto";
	}
};