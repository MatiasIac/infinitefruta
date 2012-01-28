function Command() {
	var self = this;
	var over = false;
	
	this.visible = true;
	
    this.init = function () {
    }
	
    this.update = function (delta) {
    }

    this.draw = function (context) {
		
		if (!over) {
			context.drawImage(g_game.resources.common, 
					383, 33, 89, 27,
					15, 420, 89, 27);
		} else {
			context.drawImage(g_game.resources.common, 
					473, 33, 89, 27,
					15, 420, 89, 27);
		}
    }

}