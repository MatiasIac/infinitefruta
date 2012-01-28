var TitleScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		this.title = null;
		this.font =  null;
	},
	
	onResetEvent : function()
	{

		if (this.title == null)
		{
			// init stuff if not yet done
			//this.title = me.loader.getImage("title");
			// font to display the menu items
			this.font = new me.BitmapFont("kromasky_16x16", 16, 2);
			this.font.set("left");
		}
  		
		// add the parallax background
		/*pb = new me.ParallaxBackgroundEntity(1);
		pb.addLayer("sea-back1", 1,1);
		pb.addLayer("sea-back2", 2,2);
		pb.addLayer("sea-back3", 3,3);
		me.game.add(pb);
		me.game.sort();*/
	
		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	},
		
	update : function()
	{
		// enter pressed ?
		if (me.input.isKeyPressed('enter'))
		{
			me.state.change(me.state.READY);
			return true;
		}
		return false;
	},
	
	draw : function(context)
	{	
		//context.drawImage(this.title, 0,40);
		this.font.draw(context, "APRIETE EL ENTER", 140, 395);
	},
	
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
    },

});