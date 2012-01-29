function Background() {
	var self = this;

	this.speed = 1.5;
	this.visible = true;
	
    this.init = function () {
        this.x = 0;
        this.y = 0;
    }
	
    this.update = function (delta) {
		this.y -= self.speed;

        if (this.y + 479 <= 0)
            this.y = 0;
    }

    this.draw = function (context) {
	
		context.drawImage(g_game.resources.fondomenu, this.x, this.y,
                    g_game.resources.fondomenu.width, g_game.resources.fondomenu.height);

        context.drawImage(g_game.resources.fondomenu, this.x, this.y + 479,
                    g_game.resources.fondomenu.width, g_game.resources.fondomenu.height);

		context.drawImage(g_game.resources.background, 119, 0);
					
		context.drawImage(g_game.resources.common, 
					661, 36, 84, 19,
					15, 10, 84, 19);
		
		context.font = "16pt Calibri";
		context.fillText("Fuel", 5, 50);
		context.fillText(g_fuel, 5, 70);
		
		context.fillText("Speed",5, 100);
		context.fillText(g_gameSpeed, 5, 120);
		
		context.fillText("Score", 5, 150);
		context.fillText(g_gameSpeed,5, 170);
		
		context.fillText("Canisters left", 5, 200);
		context.fillText(g_fuelsToGoal - g_canistersCollected, 5, 220);
		
    }

}