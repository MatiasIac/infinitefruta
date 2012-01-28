function TileGrid() {
	var self = this;
	this.x = 120;
	this.y = 0;
	this.visible = true;
	var sizeX = 4;
	var sizeY = 4;
	
	var tileWidth = 85;
	var tileHeight = 85;
	
    var tiles = new Array();  
	
	var pointerX = 0;
	var pointerY = 0;
	var draggingObject = null;
	
    this.init = function () {
		for (i = 0; i < sizeX; i++) {
			tileRow = new Array();
			for (j = 0; j < sizeY; j++) {
				var _rect = new Rectangle();
				_rect.init(self.x + (i * tileWidth), self.y + (j * tileHeight), tileWidth, tileHeight);
				tileRow.push({ tileType:  (Math.round(Math.random() * 5) + 1), state: 0});
			}
			tiles.push(tileRow);
		}
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
			tileType = tiles[i][j].tileType;
			if (tileType !== 0) {
				tiles[i][j].tileType = 0;
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
			if (selected.state == 0 && selected.tileType !== 0) {
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
			
			if (selected.tileType === 0) {
				selected.tileType = draggingObject.tileType;
				selected.state = 0;
				
				tiles[draggingObject.tileX][draggingObject.tileY].tileType = 0;
				tiles[draggingObject.tileX][draggingObject.tileY].state = 0;
			} else {
				tiles[draggingObject.tileX][draggingObject.tileY].state = 0;
			}
		} else {
			tiles[draggingObject.tileX][draggingObject.tileY].state = 0;
		}
		
		draggingObject = null;
	}
	
    this.update = function (delta) {

    }

    this.draw = function (context) {
		for (i = 0; i < sizeX; i++) {
			for (j = 0; j < sizeY; j++) {
				if (tiles[i][j].tileType != 0 && tiles[i][j].state === 0) {
					currentX = self.x + (i * tileWidth);
					currentY = self.y + (j * tileHeight);
					sourceX = parseInt(tiles[i][j].tileType % 8) * tileWidth + 1;
					sourceY = parseInt(tiles[i][j].tileType / 8) * tileHeight + 1;
					context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth - 1, tileHeight - 1, currentX, currentY, tileWidth, tileHeight);
				}
			}
		}
		
		if (draggingObject != null) {
			context.save();
				context.globalAlpha = 0.5;
				sourceX = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].tileType % 8) * tileWidth + 1;
				sourceY = parseInt(tiles[draggingObject.tileX][draggingObject.tileY].tileType / 8) * tileHeight + 1;
				context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth - 1, tileHeight - 1, 
					pointerX - draggingObject.offsetX, pointerY - draggingObject.offsetY, tileWidth, tileHeight);		
			context.restore();
		}
    }
}