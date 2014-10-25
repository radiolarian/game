game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		//load level
		me.levelDirector.loadLevel("winter");
		//currently switch between area01, spring, summer, winter

		// DEBUG IS HERE!!!!!!!!!!!!!!!!!!!!!
		game.data.score = 0;
		game.data.textBox = "HI";

		//music
		me.audio.playTrack("winter");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//stop music
		me.audio.stopTrack();
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
