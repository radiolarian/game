game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		//load level
		me.levelDirector.loadLevel("spring");
		//currently switch between area01, spring, summer

		// DEBUG IS HERE!!!!!!!!!!!!!!!!!!!!!
		game.data.score = 0;
		game.data.numCollected = 0;
		game.data.textBox = "";

		//music
		me.audio.playTrack("fall");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//reset a level and mute
		me.input.bindKey(me.input.KEY.R, "reset", true);
		me.input.bindKey(me.input.KEY.M, "mute", true);
		var is_muted = false;
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "reset") {
                me.levelDirector.reloadLevel();
            }
            if (action === "mute") {
                if (!is_muted) {
                	me.audio.pauseTrack();
                	is_muted = true;
                }
                else if (is_muted) {
                	me.audio.resumeTrack();
                	is_muted = false;
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
