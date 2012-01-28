function Car(tileGrid) {
	var self = this;
	this.turnCounter = 0;
	this.moving = false;
	this.turning = false;
	var speed = 1;
	this.tileGrid = tileGrid;
	this.tileXPos = 50;
	this.tileYPos = 100;
	this.tileX = 0;
	this.tileY = 0;
	turnCounter = 0;
	this.desiredAngle = 180;
	this.turningDirection = 1;
	this.angle = 0;
	
	this.update = function(delta) {
		self.angle = self.angle % 360;
		if (self.moving) {
			self.tileXPos += speed * Math.cos(self.angle);
			self.tileYPos += speed * Math.sin(self.angle);
			
			if (self.tileXPos < 0 || self.tileXPos > 100 || self.tileYPos < 0 || self.tileYPos > 100) {
				self.tileGrid.reportCarTileChange(self);
			}
			
			if (self.tileXPos == 50 && self.tileYPos == 50) {
				self.tileGrid.reportCarTileCenter(self);
			}
		}
		if (self.turning) {
			turnCounter += 1;
			turnCounter = turnCounter % 100
			if (turnCounter == 0) {
				if (self.angle != self.desiredAngle) {
					self.angle += 45 * turningDirection;
				} else {
					self.turning = false;
					self.moving = true;
				}
			} 
		}
	}
	
	this.draw = function(context) {
		var sourceX = 0;
		var sourceY = 0;
		var tileWidth = 90;
		var tileHeight = 70;
		
		context.drawImage(
			g_game.resources.car, 
			sourceX + 1, sourceY + 1, 
			tileWidth - 1, tileHeight - 1, 
			//This magic numbers should come from TileGrid. 85 = tileGrid tile width & height
			self.tileGrid.x + self.tileX * 85 + self.tileXPos * 85 / 100 - tileWidth / 2, 
			self.tileGrid.y + self.tileY * 85 + self.tileYPos * 85 / 100 - tileHeight / 2,
			tileWidth, tileHeight);	
	}
}


