function TileGrid(x, y) {
	this.x = x;
	this.y = y;
	this.visible = true;
	var sizeX = 10;
	var sizeY = 10;
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
		//erase tiles at random
	}

    this.update = function (delta) {

    }

    this.draw = function (context) {
		for (i = 0; i < sizeX; i++) {
			for (j = 0; j < sizeY; j++) {
				
			}
		}     
    }
}