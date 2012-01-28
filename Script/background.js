function Background() {
	var self = this;

	this.speed = 1;
	this.visible = true;
	
    this.init = function () {
        this.x = 0;
        this.y = 0;
    }
	
    this.update = function (delta) {
		this.y -= self.speed;

        if (this.y + 480 <= 0)
            this.y = 0;
    }

    this.draw = function (context) {
		context.drawImage(g_game.resources.background, 119, 0);
		
		context.drawImage(g_game.resources.fondomenu, this.x, this.y,
                    g_game.resources.fondomenu.width, g_game.resources.fondomenu.height);

        context.drawImage(g_game.resources.fondomenu, this.x, this.y + 480,
                    g_game.resources.fondomenu.width, g_game.resources.fondomenu.height);
					
		context.drawImage(g_game.resources.common, 
					661, 36, 84, 19,
					15, 10, 84, 19);
    }

}