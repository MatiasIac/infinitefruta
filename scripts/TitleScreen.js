var TitleScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		this.nodrugs = null;
		this.font =  null;
		this.counter = 0;
	},
	
	onResetEvent : function() {
		if (this.nodrugs == null)	{
			this.nodrugs = me.loader.getImage("drugs");
			this.font = new me.BitmapFont("kromasky_16x16", 16, 1);
			this.font.set("left");
		}
  		
		// add the parallax background
		/*pb = new me.ParallaxBackgroundEntity(1);
		pb.addLayer("sea-back1", 1,1);
		pb.addLayer("sea-back2", 2,2);
		pb.addLayer("sea-back3", 3,3);
		me.game.add(pb);
		me.game.sort();*/

		/*me.input.enableMouseEvent(true, function(x, y) {
			alert("X: " + x + ", Y: " + y);
		});*/
		
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	},
		
	update : function() {
	
		this.counter++;
	
		if (me.input.isKeyPressed('enter'))
		{
			//UNCOMMENT TO MOVE TO THE NEXT STATE
			//me.state.change(me.state.READY);
			return true;
		}
		return true;
	},
	
	draw : function(context) {
		context.clearRect(0,0,me.video.getWidth(), me.video.getHeight());
		
		context.drawImage(this.nodrugs, 0, 0, me.video.getWidth(), me.video.getHeight());
		var measure = this.font.measureText("PRESS ENTER TO PLAY");
		
		if (this.counter >= 0 && this.counter <= 60) {
			this.font.draw(context, "PRESS ENTER TO PLAY", 
			  (me.video.getWidth() / 2) - (measure.width / 2),  250);
		 } else if (this.counter >= 120) {
			this.counter = 0;
		 }
	},
	
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
    },

});