function Car(tileGrid) {
	var self = this;
	this.turnCounter = 0;
	this.moving = false;
	this.turning = false;
	this.speed = 1;
	this.tileGrid = tileGrid;
	this.tileXPos = 50;
	this.tileYPos = 100;
	this.tileX = 0;
	this.tileY = 0;
	turnCounter = 0;
	this.desiredAngle = 180;
	this.turningDirection = 1;
	this.currentAction = carStop; //carStop(this);
	
	this.update = function(delta) {
		this.angle = this.angle % 360;
		if (this.moving) {
			this.tileXPos += dirX * Math.cos(this.angle);
			this.tileYPos += dirY * Math.sin(this.angle);
			
			if (this.tileXPos < 0 || this.tileYPos > 100 || this.tileYPos < 0 || this.tileYPos > 100) {
				this.tileGrid.reportCarTileChange(self);
			}
			
			if (this.tileXPos == 50 && this.tileYPos == 50) {
				this.tileGrid.reportCarTileCenter(self);
			}
		}
		if (this.turning) {
			turnCounter += 1;
			turnCounter = turnCounter % 100
			if (turnCounter == 0) {
				if (this.angle != this.desiredAngle) {
					this.angle += 45 * turningDirection;
				} else {
					this.turning = false;
					this.moving = true;
				}
			} 
		}
	}
	
	this.draw = function(context) {
		
	}
}


