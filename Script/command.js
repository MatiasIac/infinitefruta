function Command() {
	var self = this;
	var over = false;
	
	this.visible = true;
	
    this.init = function () {
		var c = document.getElementById("canvas");
		c.addEventListener("click", getClick);
    }
	
	function getClick(ev) {
		var x = 0;
		var y = 0;

		if (ev.offsetY) {
			x = ev.offsetX;
			y = ev.offsetY;
		} else {
			x = ev.clientX - ev.currentTarget.offsetLeft;
			y = ev.clientY;
		}
	
		if (g_showingGameOver) {
			//Retry
			if (x >= 180 && x <= 310 && y >= 230 && y <= 270) {
				g_game.levelUpWrapper(g_gameLevel);
				g_car.tileXPos = 50;
				g_car.tileYPos = 50;
				g_car.tileX = g_goalAreaX;
				g_car.tileY = g_goalAreaY;
				g_car.angle = 0;
				g_car.visible = true;
				g_car.moving = false;
				g_showingGameOver = false;			
				g_score = 0;
			}
			//New game
			if (x >= 390 && x <= 480 && y >= 230 && y <= 260){
				g_game.levelUpWrapper(0);
				
				g_car.tileXPos = 50;
				g_car.tileYPos = 50;
				g_car.tileX = g_goalAreaX;
				g_car.tileY = g_goalAreaY;
				g_car.angle = 0;
				g_car.visible = true;
				g_car.moving = false;
				g_showingGameOver = false;			
				g_score = 0;
			}

			
		}
	}
	
	//var animateGameOver = false;
	//var xGO = 0;
	var timeToShowGameOver = null;
    this.update = function (delta) {
		
		if (g_showGameOver && !g_showingGameOver) {
			if (!g_showingGameOver && timeToShowGameOver == null) {
				timeToShowGameOver = getAlarmTime(500);
			} else if (timeToShowGameOver != null && isAlarmTime(timeToShowGameOver) < 0) {
				g_showGameOver = false;
				g_showingGameOver = true;
			}
		}

    }

    this.draw = function (context) {
		
		if (g_showingGameOver) {
			//Shows game over screen
			context.save();
				context.globalAlpha = 0.5;
				context.fillStyle = '#000000';
				context.fillRect(0, 150, 640, 120);
			
				context.globalAlpha = 0.5;
				
				context.fillRect(170, 230, 140, 30);
				context.fillRect(390, 230, 90, 30);
				
				context.globalAlpha = 1;
				context.fillStyle = '#FFFFFF';
				context.strokeStyle = "#FF3300";
				context.lineWidth = 3;
				
				
				
				context.font = 'bold 12px sans-serif';
				context.fillText("Play this level again!", 180, 250);
				context.fillText("Start again!", 400, 250);
				
				context.font = 'bold 50px sans-serif';
				context.fillText('TRY AGAIN!', 180, 220);
				context.strokeText('TRY AGAIN!', 180, 220);
			context.restore();
		}
		
		if (g_showingLevelUp) {
			context.save();
				context.globalAlpha = 0.5;
				context.fillStyle = '#000000';
				context.fillRect(0, 150, 640, 120);
			
				context.globalAlpha = 1;
				context.fillStyle = '#FFFFFF';
				context.strokeStyle = "#FF3300";
				context.lineWidth = 3;
				context.font = 'bold 50px sans-serif';
				context.fillText('LEVELING UP!', 180, 220);
				context.strokeText('LEVELING UP!', 180, 220);
			context.restore();
		}
		
		//if (!over) {
		/*context.drawImage(g_game.resources.common, 
				300, 33, 81, 27,
				15, 430, 81, 27);*/
		//} else {
		//	context.drawImage(g_game.resources.common, 
		//			473, 33, 89, 27,
		//			15, 420, 89, 27);
		//}
    }

}