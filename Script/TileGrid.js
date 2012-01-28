function TileGrid() {
	var self = this;
	this.x = 120;
	this.y = 0;
	this.visible = true;
	var sizeX = 10;
	var sizeY = 10;
	
	var tileWidth = 85;
	var tileHeight = 85;
	
    var tiles = new Array();  
	
    this.init = function () {
		for (i = 0; i < sizeX; i++) {
			tileRow = new Array();
			for (j = 0; j < sizeY; j++) {
				tileRow.push(new Tile());
			}
			tiles.push(1);
		}
		createBlanks(3)
    }
	
	function createBlanks(blankNumber) {
		//TODO: erase tiles at random
	}

    this.update = function (delta) {

    }

    this.draw = function (context) {
		for (i = 0; i < sizeX; i++) {
			for (j = 0; j < sizeY; j++) {
				if (tiles[i][j] != 0) {
					currentX = self.x + (i * tileHeight);
					currentY = self.y + (j * tileHeight);
					sourceX = tiles[i][j] % 8;
					sourceY = tiles[i][j] / 8;
					context.drawImage(g_game.resources.tileSheet, sourceX, sourceY, tileWidth, tileHeight, currentX, currentY);
				}
			}
		}     
    }
}