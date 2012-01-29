function Command() {
	var self = this;
	var over = false;
	
	this.visible = true;
	
    this.init = function () {
    }
	
	//var animateGameOver = false;
	//var xGO = 0;
	
    this.update = function (delta) {
		//if (g_showGameOver) { animateGameOver = true; }
		//if (animateGameOver) {
		//	xGO += 10.5;
		//	if (xGO >= 640) { animateGameOver = false; }
		//}
    }

    this.draw = function (context) {
		
		if (g_showGameOver) {
			//Shows game over screen
			context.save();
				context.globalAlpha = 0.5;
				context.fillStyle = '#000000';
				context.fillRect(0, 150, 640, 120);
			
				context.globalAlpha = 1;
				context.fillStyle = '#FFFFFF';
				context.strokeStyle = "#003300";
				context.font = 'bold 50px sans-serif';
				context.fillText('GAME OVER!', 180, 220);
				context.strokeText('GAME OVER!', 180, 220);
			context.restore();
		}
		
		//if (!over) {
		context.drawImage(g_game.resources.common, 
				300, 33, 81, 27,
				15, 430, 81, 27);
		//} else {
		//	context.drawImage(g_game.resources.common, 
		//			473, 33, 89, 27,
		//			15, 420, 89, 27);
		//}
    }

}