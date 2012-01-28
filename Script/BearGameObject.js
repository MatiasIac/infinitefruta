function BearGameObject() {
    var counter = 0;
	var isPressed = false;
	var x = 0;
	var y = 0;
	var img = null;
	var frame = 0;
	
	this.visible = true;
	
    this.init = function () {
		img = g_game.resources.car;
		x = 200;
		y = 130;
		frame = 0;
		
		var c = document.getElementById("canvas");
		c.addEventListener("mousedown", getMouseDown);
		c.addEventListener("mouseup", getMouseUp);
		c.addEventListener("mousemove", getMouseMove);
    }
	
	function getMouseMove(ev) {
		if (isPressed) {
			x = ev.clientX;
			y = ev.clientY;
		}
	}
	
	function getMouseDown(ev) {
		isPressed = true;
	}
	
	function getMouseUp(ev) {
		isPressed = false;
	}

    this.update = function (delta) {

    }

    this.draw = function (context) {
		context.drawImage(img,
					frame * 24, 0, 24, 31,
					x, y, 24, 31);
    }
}