function TileGrid() {
	var self = this;
	this.x = 150;
	this.y = 50;
	this.visible = true;
	var sizeX = 5;
	var sizeY = 5;
	var car = null;
	var tileWidth = 85;
	var tileHeight = 85;
	var enviroment = 3;
	
    var tiles = new Array();  
	
	var pointerX = 0;
	var pointerY = 0;
	var draggingObject = null;
	var changeEnviroment = null;
	
	var ar = {"tiles": [ 
			 { selectedType: 0, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: stopCar, availableTypes: [-1, -1, -1, -1]},
			 { selectedType: 1, canNorth: false, canSouth: true, canWest: false, canEast: true, onCenter: southEastTurn, availableTypes: [0, 7, 17, 24]},
			 { selectedType: 2, canNorth: false, canSouth: false, canWest: true, canEast: true, onCenter: eastWestStraight, availableTypes: [1, 9, 18, 26]},
			 { selectedType: 3, canNorth: true, canSouth: true, canWest: false, canEast: false, onCenter: northSouthStraight, availableTypes: [2, 10, 19, 27]},
			 { selectedType: 4, canNorth: false, canSouth: true, canWest: true, canEast: false, onCenter: southWestTurn, availableTypes: [3, 8, 20, 25]},
			 { selectedType: 5, canNorth: true, canSouth: false, canWest: false, canEast: true, onCenter: northEastTurn, availableTypes: [4, 12, 21, 29]},
			 { selectedType: 6, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [5, 11, 22, 28]},
			 { selectedType: 7, canNorth: true, canSouth: false, canWest: true, canEast: false, onCenter: northWestTurn, availableTypes: [6, 13, 23, 30]},
			 { selectedType: 8, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [5, 14, 22, 31]},
			 //{ selectedType: 8, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [7, 15]}
			 ]};
	
    this.init = function () {
		for (i = 0; i < sizeX; i++) {
			tileRow = new Array();
			for (j = 0; j < sizeY; j++) {
				var typeNumber = (Math.round(Math.random() * 7) + 1);
				//var typeNumber = 2; //Line to test tiles
				
				var ttype = ar.tiles[typeNumber];
				var selectedType = ttype.availableTypes[Math.round(Math.random() * ttype.availableTypes.length - 1)];
				tileRow.push({tileType: ttype, state: 0 });
			}
			tiles.push(tileRow);
		}
		car = new Car(self);
		car.speed = 50 / 25;
		car.tileXPos = 50;
		car.tileYPos = 50;
		car.tileX = 2;
		car.tileY = 2;
		car.angle = 0;
		car.moving = true;
		//car.turning = true;
		
		createBlanks(3)
		var c = document.getElementById("canvas");
		c.addEventListener("mousedown", getMouseDown);
		c.addEventListener("mouseup", getMouseUp);
		c.addEventListener("mousemove", getMouseMove);
    }
	
	function ChangeEnviromentTo(toEnviroment) {
		
		enviroment = 1;
	}
	
	function createBlanks(blankNumber) {
		erasedTiles = 0;
		while(erasedTiles < blankNumber) {
			i = Math.round(Math.random() * (sizeX - 1));
			j = Math.round(Math.random() * (sizeY - 1));
			selectedType = tiles[i][j].tileType.selectedType;
			if (selectedType !== 0) {
				tiles[i][j].tileType = ar.tiles[0];
				erasedTiles++;
			}
		}
	}

	function correctPointer(ev) {
			var offsetX = 0;
			var offsetY = 0;

			if (ev.offsetY) {
				offsetX = ev.offsetX;
				offsetY = ev.offsetY;
			} else {
				offsetX = ev.clientX - ev.currentTarget.offsetLeft;
				offsetY = ev.clientY;
			}
		
			pointerX = offsetX;
			pointerY = offsetY;
	}
	
	function getMouseMove(ev) {
		if (draggingObject != null) {
			correctPointer(ev);
		}
	}
	
	var drawBag = null;
	
	function getMouseDown(ev) {
		correctPointer(ev);
		if (pointerX > self.x && pointerX < self.x + tileWidth * sizeX && self.y < pointerY && self.y + tileHeight * sizeY > pointerY) {
			//we're inside the grid
			tileX = parseInt((pointerX - self.x) / tileWidth);
			tileY = parseInt((pointerY - self.y) / tileHeight);
			selected = tiles[tileX][tileY];
			if (selected.state == 0 && selected.tileType.selectedType !== 0) {
				selected.state = 1;
				
				drawBag = new Array();
				
				for (i = 0; i < sizeX; i++) {
					for (j = 0; j < sizeY; j++) {
						if (tiles[i][j].tileType.selectedType === 0 && tiles[i][j].state === 0) {
							drawBag.push({x: i, y: j});
						}
					}
				}
				
				draggingObject = {
					tileX: tileX,
					tileY: tileY,
					tileType: selected.tileType,
					offsetY: (pointerY - self.y) % tileHeight,
					offsetX: (pointerX - self.x) % tileWidth
				};			
			}
		}
	}
	
	function getMouseUp(ev) {
		correctPointer(ev);
		
		if (pointerX > self.x && pointerX < self.x + tileWidth * sizeX && self.y < pointerY && self.y + tileHeight * sizeY > pointerY) {
			tileX = parseInt((pointerX - self.x) / tileWidth);
			tileY = parseInt((pointerY - self.y) / tileHeight);
			selected = tiles[tileX][tileY];
			
			if (selected.tileType.selectedType === 0 && draggingObject != null) {
				selected.tileType = draggingObject.tileType;
				selected.state = 0;
				
				tiles[draggingObject.tileX][draggingObject.tileY].tileType = ar.tiles[0];
				tiles[draggingObject.tileX][draggingObject.tileY].state = 0;
			} else {
				if (draggingObject != null) {
					tiles[draggingObject.tileX][draggingObject.tileY].state = 0;
				}
			}
		} else {
			if (draggingObject != null) {
				tiles[draggingObject.tileX][draggingObject.tileY].state = 0;
			}
		}
		
		draggingObject = null;
		drawBag = null;
	}
	
    this.update = function (delta) {
		car.update(delta);
    }

    this.draw = function (context) {
		for (i = 0; i < sizeX; i++) {
			for (j = 0; j < sizeY; j++) {
				if (tiles[i][j].tileType.selectedType != 0 && tiles[i][j].state === 0) {
					currentX = self.x + (i * tileWidth);
					currentY = self.y + (j * tileHeight);
/* 					sourceX = parseInt(tiles[i][j].selectedType % 8) * tileWidth + 1;
					sourceY = parseInt(tiles[i][j].selectedType / 8) * tileHeight + 1; */
					sourceX = parseInt(tiles[i][j].tileType.availableTypes[enviroment]) * tileWidth;
					sourceY = 0;
					
					context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth, tileHeight,
								currentX, currentY, tileWidth, tileHeight);
				}
			}
		}
		
		car.draw(context);
		
		if (draggingObject != null) {
			context.save();
				tileX = parseInt((pointerX - self.x) / tileWidth);
				tileY = parseInt((pointerY - self.y) / tileHeight);
				greenTile = tiles[tileX][tileY];
			
				context.globalAlpha = 0.5;
			
				for (i = 0; i < drawBag.length; i++) {
					//if (drawBag[i].x != tileX && drawBag[i].y != tileY) {
						context.strokeStyle = '#FF0000';
						context.fillStyle = '#FF0000';
						context.lineWidth = 5;
						context.strokeRect(self.x + (drawBag[i].x * tileWidth), self.y + (drawBag[i].y * tileWidth), tileWidth, tileHeight);
						context.fillRect(self.x + (drawBag[i].x * tileWidth), self.y + (drawBag[i].y * tileWidth), tileWidth, tileHeight);
					//}
				}
			
				if (greenTile.tileType.selectedType === 0) {
					var cX = self.x + (tileX * tileWidth);
					var cY = self.y + (tileY * tileHeight);
					context.strokeStyle = '#00FF00';
					context.fillStyle = '#00FF00';
					context.lineWidth = 5;
					context.strokeRect(cX, cY, tileWidth, tileHeight);
					context.fillRect(cX, cY, tileWidth, tileHeight);
				}
			
/* 				sourceX = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].selectedType % 8) * tileWidth + 1;
				sourceY = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].selectedType / 8) * tileHeight + 1; */
				sourceX = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].tileType.availableTypes[enviroment]) * tileWidth;
				sourceY = 0;
				context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth, tileHeight, 
					pointerX - draggingObject.offsetX, pointerY - draggingObject.offsetY, tileWidth, tileHeight);		
			context.restore();
		}
    }
	
	/**
		Acts when the car crosses boundaries between tiles
	*/
	this.reportCarTileChange = function(car) {
		lifeLoss = false;
		//Move right
		if (car.tileXPos > 100) {
			car.tileX++;
			car.tileXPos -= 100;
			if (car.tileX > sizeX - 1 || !tiles[car.tileX][car.tileY].tileType.canWest) {
				lifeLoss = true;
			}
		} else if (car.tileXPos < 0) {
			car.tileX--;
			car.tileXPos += 100;
			//eval left
			if (car.tileX < 0 || !tiles[car.tileX][car.tileY].tileType.canEast) {
				lifeLoss = true;
			}
		} else if (car.tileYPos > 100) {
			car.tileY++;
			car.tileYPos -= 100;
			if (car.tileY > sizeY - 1 || !tiles[car.tileX][car.tileY].tileType.canNorth) {
				lifeLoss = true;
			}
			//eval up
		} else if (car.tileYPos < 0) {
			car.tileY--;
			car.tileYPos += 100;
			//eval down
			if (car.tileY < 0 || !tiles[car.tileX][car.tileY].tileType.canSouth) {
				//should explode
				lifeLoss = true;
			}
		}
		if (lifeLoss) {
			lifeLost(car);
		}
	}
	
	this.reportCarTileCenter = function(car) {
		var onCenterFunction = tiles[car.tileX][car.tileY].tileType.onCenter;
		if (onCenterFunction && onCenterFunction != null) {
			tiles[car.tileX][car.tileY].tileType.onCenter(car);
		}
	}
	
	function stopCar(car) {
		car.moving = false;
	}
	
	function southEastTurn(car) {
		car.turning = true;
		if (car.angle == Math.PI) {
			car.turningDirection = -1; 
			car.desiredAngle = Math.PI / 2;
		} else if (car.angle == Math.PI * 3/2) {
			car.turningDirection = 1;
			car.desiredAngle = 0;
		}
	}
	
	function southWestTurn(car) {
		car.turning = true;
		if (car.angle == 0) { 
			car.turningDirection = 1; 
			car.desiredAngle = Math.PI / 2;
		} else if (car.angle == Math.PI * 3/2) { 
			car.turningDirection = -1;
			car.desiredAngle = Math.PI;
		}
	}
	
	function northEastTurn(car) {
		car.turning = true;
		if (car.angle == Math.PI) {
			car.turningDirection = 1; 
			car.desiredAngle = Math.PI * 3/2;
		} else if (car.angle == Math.PI / 2) {
			car.turningDirection = -1;
			car.desiredAngle = 0;
		}
	}
	
	function northWestTurn(car) {
		car.turning = true;
		if (car.angle == 0) {
			car.turningDirection = -1;
			car.desiredAngle = Math.PI * 3/2;
		} else if (car.angle == Math.PI / 2) {
			car.turningDirection = 1;
			car.desiredAngle = Math.PI;
		}
	}
	
	function lifeLost(car) {
		car.moving = false;
		car.visible = false;
	}
	
	function eastWestStraight(car) {
	}
	
	function northSouthStraight(car) {
	}
}