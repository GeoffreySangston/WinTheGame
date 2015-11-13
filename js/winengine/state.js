function State(){
	this.ticks = 0;
	this.type;
	
}

State.prototype.init = function(game){

};

State.prototype.destroy = function(game){

};

State.prototype.update = function(game){
	this.ticks++;
};

State.prototype.render = function(game){

};

State.prototype.sortByZHeightNaive = function(entities){
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

State.prototype.updateEntityArray = function(game,entityArray){
	for(var i = 0; i < entityArray.length; i++){
		entityArray[i].update(game);
	}
};

State.prototype.renderEntityArray = function(game,entityArray){
	
	this.sortByZHeightNaive(entityArray);

	for(var i = 0; i < entityArray.length; i++){
		var entity = entityArray[i];

		if(entity.visible && entity.isOnScreen()){
	
			
			var frame = entity.frame;
			var x = entity.x;
			var y = entity.y;

			var w = entity.width;
			var h = entity.height;
			var theta = entity.theta;
			var imageTheta = entity.imageTheta;
			var px = entity.px;
			var py = entity.py;
			
			var clip = entity.calcFrameClip();
			var clipX = clip.x;
			if(!clipX){
				clipX = 0;
			}
			var clipY = clip.y;
			if(!clipY){
				clipY = 0;
			}
			var clipWidth = entity.clipWidth || entity.width;
			var clipHeight = entity.clipHeight || entity.height;

			var imgRef = entity.imgRef;
			if(imgRef){
				var sheet = game.imageHandler.cache[imgRef];
				//console.log(sheet,clipX,clipY,clipWidth,clipHeight,x,y,w,h,imageTheta,px,py);
				game.renderer.drawImage(sheet,clipX,clipY,clipWidth,clipHeight,x,y,w,h,imageTheta,px,py);
				
			} else {
				game.renderer.drawRect(x,y,w,h,theta,px,py);
			}
			
			
			/*var cxy = entity.calcCollisionXY();
			var rad = entity.collisionRadius;
			if(cxy){
				game.renderer.drawPoint(cxy.x,cxy.y,4);
				game.renderer.context.beginPath();
      			game.renderer.context.arc(cxy.x, cxy.y, rad, 0, 2 * Math.PI, false);

      			game.renderer.context.stroke();
			}*/
			
			//game.renderer.drawPoint(entity.x, entity.y,5);
		}
		
	}
};

