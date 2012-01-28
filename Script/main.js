function Game() {
	var backBuffer = null;
	var context = null;
	
	this.startGame = function() {
		canvas = document.getElementById('canvas');
	
		backBufferCanvas = document.createElement('canvas');
		backBufferCanvas.width = canvas.width;
		backBufferCanvas.height = canvas.height;
		backBuffer = backBufferCanvas.getContext('2d');

		context = canvas.getContext('2d');
		gameObjects = new Array();
		gameObjects[0].init();
		
		
		setInterval(runGame, 1000 / 30);
	};
	
	function runGame() {
		//background colour
		backBuffer.fillStyle = "rgb(255,255,255)";
		backBuffer.fillRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < gameObjects.length; i++) {
			try {
				//Update game object
				gameObjects[i].update();
				//if object is drawable, draw
				if (gameObjects[i].draw && gameObject[i].visible) {
					gameObjects[i].draw(backBuffer);
				}
			} catch (e) {
				//just swalow the exception
				//don't in real life
			}
		}
		//Loop finished, draw everything
        context.drawImage(backBuffer, 0, 0);
	};
}