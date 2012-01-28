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
	
    this.init = function () {
		for (i = 0; i < sizeX; i++) {
			tileRow = new Array();
			for (j = 0; j < sizeY; j++) {
				tileRow.push(Math.round(Math.random() * 5) + 1);
			}
			tiles.push(tileRow);
		}
		createBlanks(3)
    }
	
	function createBlanks(blankNumber) {
		erasedTiles = 0;
		while(erasedTiles < blankNumber) {
			i = Math.round(Math.random() * (sizeX - 1));
			j = Math.round(Math.random() * (sizeY - 1));
			tileType = tiles[i][j];
			if (tileType === 0) {
			
			} else {
				tiles[i][j] = 0;
				erasedTiles++;
			}
		}
	}

    this.update = function (delta) {

    }

    this.draw = function (context) {
		for (i = 0; i < sizeX; i++) {
			for (j = 0; j < sizeY; j++) {
				if (tiles[i][j] != 0) {
					currentX = self.x + (i * tileWidth);
					currentY = self.y + (j * tileHeight);
					sourceX = parseInt(tiles[i][j] % 8) * tileWidth + 1;
					sourceY = parseInt(tiles[i][j] / 8) * tileHeight + 1;
					context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth - 1, tileHeight - 1, currentX, currentY, tileWidth, tileHeight);
					context.drawRect
				}
			}
		}     
    }
}