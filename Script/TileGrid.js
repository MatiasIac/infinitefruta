function TileGrid() {
	var self = this;
	this.x = 120;
	this.y = 0;
	this.visible = true;
	var sizeX = 4;
	var sizeY = 4;
	var car = null;
	var tileWidth = 85;
	var tileHeight = 85;
	var enviroment = 1;
	
    var tiles = new Array();  
	
	var pointerX = 0;
	var pointerY = 0;
	var draggingObject = null;
	
	var ar = {"tiles": [ 
			 { selectedType: 0, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: stopCar, availableTypes: [20, 20]},
			 { selectedType: 1, canNorth: false, canSouth: true, canWest: false, canEast: true, onCenter: southEastTurn, availableTypes: [0, 7]},
			 { selectedType: 2, canNorth: false, canSouth: false, canWest: true, canEast:true, onCenter: eastWestStraight, availableTypes: [1, 9]},
			 { selectedType: 3, canNorth: true, canSouth: true, canWest: false, canEast: false, onCenter: northSouthStraight, availableTypes: [2, 10]},
			 { selectedType: 4, canNorth: false, canSouth: true, canWest: true, canEast: false, onCenter: southWestTurn, availableTypes: [3, 8]},
			 { selectedType: 5, canNorth: true, canSouth: false, canWest: false, canEast: true, onCenter: northEastTurn, availableTypes: [4, 12]},
			 { selectedType: 6, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [5, 11]},
			 { selectedType: 7, canNorth: true, canSouth: false, canWest: true, canEast: false, onCenter: northWestTurn, availableTypes: [6, 13]},
			 //{ selectedType: 8, canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [7, 15]}
			 ]};
	
    this.init = function () {
		for (i = 0; i < sizeX; i++) {
			tileRow = new Array();
			for (j = 0; j < sizeY; j++) {
				var typeNumber = (Math.round(Math.random() * 6) + 1);
				var ttype = ar.tiles[typeNumber];
				//var selectedType = ttype.availableTypes[Math.round(Math.random() * ttype.availableTypes.length - 1)];
				tileRow.push({tileType: ttype, state: 0 });
			}
			tiles.push(tileRow);
		}
		car = new Car(self);
		car.tileXPos = 50;
		car.tileYPos = 50;
		car.tileX = 0;
		car.tileY = 3;
		car.moving = true;
		//car.turning = true;
		
		createBlanks(3)
		var c = document.getElementById("canvas");
		c.addEventListener("mousedown", getMouseDown);
		c.addEventListener("mouseup", getMouseUp);
		c.addEventListener("mousemove", getMouseMove);
    }
	
	function CambiarABosque() {
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
	
	function getMouseDown(ev) {
		correctPointer(ev);
		if (pointerX > self.x && pointerX < self.x + tileWidth * sizeX && self.y < pointerY && self.y + tileHeight * sizeY > pointerY) {
			//we're inside the grid
			tileX = parseInt((pointerX - self.x) / tileWidth);
			tileY = parseInt((pointerY - self.y) / tileHeight);
			selected = tiles[tileX][tileY];
			if (selected.state == 0 && selected.tileType.selectedType !== 0) {
				selected.state = 1;
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
					sourceX = parseInt(tiles[i][j].tileType.availableTypes[enviroment]) * tileWidth + 1;
					sourceY = 0;
					
					context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth - 1, tileHeight - 1, currentX, currentY, tileWidth, tileHeight);
				}
			}
		}
		
		car.draw(context);
		if (draggingObject != null) {
			context.save();
				context.globalAlpha = 0.5;
/* 				sourceX = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].selectedType % 8) * tileWidth + 1;
				sourceY = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].selectedType / 8) * tileHeight + 1; */
				sourceX = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].tileType.availableTypes[enviroment]) * tileWidth + 1;
				sourceY = 0;
				context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth - 1, tileHeight - 1, 
					pointerX - draggingObject.offsetX, pointerY - draggingObject.offsetY, tileWidth, tileHeight);		
			context.restore();
		}
    }
	
	this.reportCarTileChange = function(car) {
		if (car.tileXPos > 100) {
			car.tileX++;
			car.tileXPos -= 100;
			if (car.tileX > sizeX - 1) {
				//should explode
				car.moving = false;
			}
		}
		if (car.tileXPos < 0) {
			car.tileX--;
			car.tileXPos += 100;
			//eval left
			if (car.tileX < 0) {
				//should explode
				car.moving = false;
			}
		}
		if (car.tileYPos > 100) {
			car.tileY++;
			car.tileYPos -= 100;
			if (car.tileY > sizeY - 1) {
				car.moving = false;
			}
			//eval up
		}
		if (car.tileYPos < 0) {
			car.tileY--;
			car.tileYPos += 100;
			//eval down
			if (car.tileY < 0) {
				//should explode
				car.moving = false;
			}
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
			car.desiredAngle = Math.PI / 2;
		} else if (car.angle == Math.PI * 2/3) {
			car.desiredAngle = 0;
		}
	}
	
	function southWestTurn(car) {
		car.turning = true;
		if (car.angle == 0) {
			car.desiredAngle = Math.PI / 2;
		} else if (car.angle == Math.PI * 2/3) {
			car.desiredAngle = 0;
		}
	}
	
	function northEastTurn(car) {
	}
	
	function northWestTurn(car) {
		car.turning = true;
		if (car.angle == 0) {
			car.desiredAngle = Math.PI / 2;
		} else if (car.angle == Math.PI * 2/3) {
			car.desiredAngle = 0;
		}
	}
	
	function eastWestStraight(car) {
	}
	
	function northSouthStraight(car) {
	}
}