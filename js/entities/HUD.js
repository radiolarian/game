

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

	init: function() {
		// call the constructor
		this._super(me.Container, 'init');
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(10, 435));
		this.addChild(new game.HUD.TextItem(120, 435));
	}
});

game.HUD.TextItem = me.Renderable.extend({
	init: function(x, y) {
		this._super(me.Renderable, 'init', [x, y, 10, 10]);
		this.font = new me.BitmapFont("32x32_font", 19.4);
		//this.font.set("left");
		this.textBox = 0;
		this.floating = true;
	},
	update : function (dt) {
		if (this.textBox !== game.data.textBox) {	
			this.textBox = game.data.textBox;
			return true;
		}
		return false;
	},
	draw : function (context) {
		this.font.draw(context, game.data.textBox, this.pos.x, this.pos.y);
	}
});

game.HUD.ScoreItem = me.Renderable.extend({	
	init: function(x, y) {
		this._super(me.Renderable, 'init', [x, y, 10, 10]); 
        this.font = new me.BitmapFont("32x32_font", 19.4);
        this.font.set("left");
		this.score = -1;
		this.floating = true;
	},
	update : function (dt) {
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},
	draw : function (context) {
		this.font.draw (context, game.data.score, this.pos.x, this.pos.y);
	}

});
