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
	
    var tiles = new Array();  
	
	var pointerX = 0;
	var pointerY = 0;
	var draggingObject = null;
	
	var ar = {"tiles": [ 
			 { selectedType: "0", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [0, 0]},
			 { selectedType: "1", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [1, 8]},
			 { selectedType: "2", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [2, 9]},
			 { selectedType: "3", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [3, 10]},
			 { selectedType: "4", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [4, 11]},
			 { selectedType: "5", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [5, 12]},
			 { selectedType: "6", canNorth: false, canSouth: false, canWest: false, canEast: false, onCenter: null, availableTypes: [6, 13]}]};
	
    this.init = function () {
		for (i = 0; i < sizeX; i++) {
			tileRow = new Array();
			for (j = 0; j < sizeY; j++) {
				var typeNumber = (Math.round(Math.random() * 5) + 1);
				var ttype = ar.tiles[typeNumber];
				var selectedType = ttype.availableTypes[Math.round(Math.random() * ttype.availableTypes.length)];
				tileRow.push({ tileType: ttype, state: 0, selectedType: selectedType });
			}
			tiles.push(tileRow);
		}
		car = new Car(self);
		car.tileXPos = 50;
		car.tileYPos = 50;
		car.tileX = 0;
		car.tileY = 3;
		car.moving = true;
		
		createBlanks(3)
		
		var c = document.getElementById("canvas");
		c.addEventListener("mousedown", getMouseDown);
		c.addEventListener("mouseup", getMouseUp);
		c.addEventListener("mousemove", getMouseMove);
    }
	
	function createBlanks(blankNumber) {
		erasedTiles = 0;
		while(erasedTiles < blankNumber) {
			i = Math.round(Math.random() * (sizeX - 1));
			j = Math.round(Math.random() * (sizeY - 1));
			selectedType = tiles[i][j].selectedType;
			if (selectedType !== 0) {
				tiles[i][j].selectedType = 0;
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
			if (selected.state == 0 && selected.selectedType !== 0) {
				selected.state = 1;
				draggingObject = {
					tileX: tileX,
					tileY: tileY,
					selectedType: selected.selectedType,
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
			
			if (selected.selectedType === 0) {
				selected.selectedType = draggingObject.selectedType;
				selected.state = 0;
				
				tiles[draggingObject.tileX][draggingObject.tileY].selectedType = 0;
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
				if (tiles[i][j].selectedType != 0 && tiles[i][j].state === 0) {
					currentX = self.x + (i * tileWidth);
					currentY = self.y + (j * tileHeight);
					sourceX = parseInt(tiles[i][j].selectedType % 8) * tileWidth + 1;
					sourceY = parseInt(tiles[i][j].selectedType / 8) * tileHeight + 1;
					context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth - 1, tileHeight - 1, currentX, currentY, tileWidth, tileHeight);
				}
			}
		}
		
		car.draw(context);
		if (draggingObject != null) {
			context.save();
				context.globalAlpha = 0.5;
				sourceX = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].selectedType % 8) * tileWidth + 1;
				sourceY = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].selectedType / 8) * tileHeight + 1;
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
		}
	}

	this.reportCarTileCenter = function(car) {
		
	}
}