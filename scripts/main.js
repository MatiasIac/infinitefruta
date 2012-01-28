var jsApp	=
{
	onload: function()
	{
		// init the video
		if (!me.video.init('jsapp', 640, 480))
		{
			alert("Go get yourself another browser!");
			return;
		}
				
		// initialize the "sound engine"
		me.audio.init("mp3,ogg");
		
		// engancha para cuando termine de cargar los resources
		me.loader.onload = this.loaded.bind(this);
		// set all ressources to be loaded		
		me.loader.preload(g_ressources);
		
		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	loaded: function ()
	{	
		// set the "Menu" Screen Object
		me.state.set(me.state.MENU, new TitleScreen());
		
		// set the "Instructions" Screen Object
		//me.state.set(me.state.READY, new InstructionScreen());
	
		// set the "Play/Ingame" Screen Object
		//me.state.set(me.state.PLAY, new PlayScreen());
			
		// set the "Game Over" Screen Object
		//me.state.set(me.state.GAMEOVER, new GameOverScreen());
      
		// set a fade transition effect
		me.state.transition("fade", "#ffffff", 200);
		
		// disable transition for the GAME OVER STATE
		//me.state.setTransition(me.state.GAMEOVER, false);
		
		// add our player entity in the entity pool
		//me.entityPool.add("MainFish", MainFish);
		//me.entityPool.add("SmallFish", SmallFish);
		//me.entityPool.add("JellyFish", JellyFish);
		
		// create a gamestat (to have persistent hiscore during the game )
		//me.gamestat.add("hiscore",	this.readHiScore());
		
		// define a function that display pause
		me.state.onPause = function ()
		{
			// get the current context
			//var context = me.video.getScreenFrameBuffer();
			
			// create a black & white copy of the background
			//var background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
			
			// draw the background
			//context.drawImage(background.canvas, 0, 0);

			//draw a black transparent square
			//context.fillStyle = "rgba(0, 0, 0, 0.8)";
			//context.fillRect(0, (me.video.getHeight()/2) - 30, me.video.getWidth(), 60);
         
			// create a font (scale 3x)
			//var font = new me.BitmapFont("kromasky_16x16", 16, 3);
			//font.set("left");
			// get the text size
			//var measure = font.measureText("P A U S E");
			// a draw "pause" ! 
			/*font.draw (context, "P A U S E", 
					   (me.video.getWidth()/2) - (measure.width/2) , 
					   (me.video.getHeight()/2) - (measure.height/2));*/

		};
		
		// go to the main menu
		me.state.change(me.state.MENU);
		
		// fizzle
		//me.audio.play("fizzle");
		
	}
};

window.onReady(function() 
{
	jsApp.onload();
});