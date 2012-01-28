function BearGameObject() {
    var counter = 0;

	this.visible = true;
	
    this.init = function () {
		this.img = g_game.resources.car;
		this.x = 200;
		this.y = 130;
		this.frame = 0;
		//this.visible = true;
		this.speed = 10;
		this.frameSwitcher = 23;
    }

    this.update = function (delta) {

    }

    this.draw = function (context) {
		context.drawImage(this.img,
					this.frame * 24, 0, 24, 31,
					this.x, this.y, 24, 31);        
    }
}