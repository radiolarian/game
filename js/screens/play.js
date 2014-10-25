game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		//reset score
		//load level
		me.levelDirector.loadLevel("summer");
		//currently switch between area01, spring, summer, winter

		// DEBUG IS HERE!!!!!!!!!!!!!!!!!!!!!
		game.data.score = 0;
		game.data.textBox = "HI";

		//music
		me.audio.playTrack("summer");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//reset a level
		me.input.bindKey(me.input.KEY.R, "reset", true);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "reset") {
                me.levelDirector.reloadLevel();
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
	}
});
