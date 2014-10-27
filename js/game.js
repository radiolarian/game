
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// global variables
		level: "SPRING",
		score : 0,
		textBox : " ",
		numCollected : 0,
		cutScene: false,
		player: null,
		starGate: null,
		triggerBreakGate: 0,
		hacky: null,
		mute: false,
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 704, 480, true)) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.TitleScreen());
		//set play/ingame screen object
		me.state.set(me.state.PLAY, new game.PlayScreen());
		//fade
		me.state.transition("fade", "#FFFFFF", 250);
		// register entities in the object pool
	    me.pool.register("mainPlayer", game.PlayerEntity);
   	    me.pool.register("CoinEntity", game.CoinEntity);
   	    me.pool.register("EnemyEntity", game.EnemyEntity);
   	    me.pool.register("FriendlyEntity", game.FriendlyEntity);
   	    me.pool.register("StillEntity", game.StillEntity);
   	    me.pool.register("BossEntity", game.BossEntity);
   	    me.pool.register("StarGateEntity", game.StarGateEntity);
   	    me.pool.register("EndStillEntity", game.EndStillEntity);

	    // enable the keyboard
	    me.input.bindKey(me.input.KEY.LEFT,  "left");
	    me.input.bindKey(me.input.KEY.RIGHT, "right");
	    me.input.bindKey(me.input.KEY.UP, "jump", true);
	    me.input.bindKey(me.input.KEY.A,  "left");
	    me.input.bindKey(me.input.KEY.D, "right");
	    me.input.bindKey(me.input.KEY.W, "jump", true);

		// display title
		me.state.change(me.state.MENU);
	}
};
