function ImageHandler(){
	this.successCount = 0;
	this.errorCount = 0;
	this.cache = {};
	this.downloadQueue = [];
}

ImageHandler.prototype.queueDownload = function(path){
	this.downloadQueue.push(path);
};

ImageHandler.prototype.downloadAll = function(downloadCallback,callbackParam) {
  	if (this.downloadQueue.length === 0) {
  		if(downloadCallback){
    		downloadCallback(callbackParam);
    	}
  	}
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var self = this;
        img.addEventListener("load", function() {
            self.successCount += 1;
            if (self.isDone()) {
            	if(downloadCallback){
        			downloadCallback(callbackParam);
        		}
    		}
        }, false);
        img.addEventListener("error", function() {
        	console.log("ERROR DOWNLOADING");
        	self.errorCount += 1;
        	if (self.isDone()) {
        		if(downloadCallback){
        			downloadCallback(callbackParam);
        		}
    		}
    	}, false);
        img.src = path;
        this.cache[path] = img;
    }
}

ImageHandler.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}