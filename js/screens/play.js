game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		//load level
		me.levelDirector.loadLevel("spring");

		// DEBUG IS HERE!!!!!!!!!!!!!!!!!!!!!
		game.data.score = 0;
		game.data.numCollected = 0;
		game.data.textBox = "";

		//music
		me.audio.playTrack("spring");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//reset a level and mute
		me.input.bindKey(me.input.KEY.R, "reset", true);
		me.input.bindKey(me.input.KEY.M, "mute", true);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "reset") {
            	game.data.numCollected = 0;
            	game.data.score = 0;
                me.levelDirector.reloadLevel();
                me.audio.pauseTrack();
                if (game.data.level == "SPRING")
                	me.audio.playTrack("spring");
                if (game.data.level == "SUMMER")
                	me.audio.playTrack("summer");
                if (game.data.level == "FALL" || game.data.level == "FALL2")
                	me.audio.playTrack("fall");                
                if (game.data.level == "WINTER" || game.data.level == "WINTER2")
                	me.audio.playTrack("winter");
            }
            if (action === "mute") {
                if (!game.data.mute) {
                	me.audio.pauseTrack();
                	game.data.mute = true;
                }
                else if (game.data.mute) {
                	me.audio.resumeTrack();
                	game.data.mute = false;
                }
            }            
        });		
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//stop music
		me.audio.stopTrack();
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.input.unbindKey(me.input.KEY.R);
		me.input.unbindKey(me.input.KEY.M);
	}
});
