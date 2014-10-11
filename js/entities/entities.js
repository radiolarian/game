/*-------------------
a player entity
-------------------------------- */
game.PlayerEntity = me.Entity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);
 
        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        this.font = new me.BitmapFont("32x32_font", 32);
        this.type = 'self';

    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function(dt) {
        if (!this.renderable.isFlickering()) {
            game.data.textBox = ""
        }
        if (me.input.isKeyPressed('left')) {
            this.hit = false;
            // flip the sprite on horizontal axis
            this.flipX(false);
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.hit = false;
            this.flipX(true);
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
         this.body.vel.x = 0;
        }
     
        if (me.input.isKeyPressed('jump')) {

            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }
 
        }


        // check & update player movement
        this.body.update(dt);

        // check for collision with sthg
        me.collision.check(this, true, this.collideHandler.bind(this), true);
       //this.body.onCollision = this.onCollision.bind(this);

        // update animation if necessary
        if (this.body.vel.x!=0 || this.body.vel.y!=0) {
            // update object animation
            this._super(me.Entity, 'update', [dt]);
            return true;
        }
     
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

    collideHandler : function (response) {
    if (response.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
        if ((response.overlapV.y>0) && !this.body.jumping) {
            // bounce (force jump)
            this.body.falling = false;
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.body.jumping = true;
        }
        else {
            // let's flicker in case we touched an enemy
            if (!this.renderable.isFlickering()) {
                var texts = ["\"BAD1\"","\"BAD2\"", "\"BAD3\""];
                var i = Math.floor(Math.random()*texts.length);
                game.data.textBox = texts[i];
                game.data.score -= 1;
                this.renderable.flicker(750);
                game.textEntity.draw();
            }
        }
    }
    },

});

/*----------------
  a Coin entity
 ----------------- */
game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
         //define this here instead of tiled
        settings.image = "stars";
        var width = settings.width;
        var height = settings.height;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 32;
        settings.spritewidth = settings.height = 32;
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y , settings]);
 
        // set our collision callback function
        this.body.onCollision = this.onCollision.bind(this);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
        game.data.score += 1;
        me.audio.play("cling");
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        // remove it
        me.game.world.removeChild(this);
    }
});
/* --------------------------
an enemy Entity
------------------------ */
game.EnemyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "npc-walk";
         
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 32;
        settings.spritewidth = settings.height = 64;
         
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
         
        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.spritewidth;
        this.pos.x  = x + width - settings.spritewidth; 
 
        // manually update the entity bounds as we manually change the position
        this.updateBounds();
 
        // to remember which side we were walking
        this.walkLeft = false;
 
        // walking & jumping speed
        this.body.setVelocity(4, 6);
        this.font = new me.BitmapFont("32x32_font", 32); 
        this.type = 'enemy'        
    },
    /**
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.renderable.flicker(750);
        }
    }, **/
    update: function(dt) {
 
        if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
        // make it walk
        this.flipX(this.walkLeft);
        this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;             
        // update the body movement
        this.body.update(dt);   
        // update animation if necessary
        if (this.body.vel.x!=0 || this.body.vel.y!=0) {
            // update object animation
            this._super(me.Entity, 'update', [dt]);
            return true;
            }
        },   
      //  return false; 
});


//BAD STYLE!!!
game.textEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "textEntity";
         
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 32;
        settings.spritewidth = settings.height = 32;
         
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
         
        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.spritewidth;
        this.pos.x  = x + width - settings.spritewidth; 
 
        // manually update the entity bounds as we manually change the position
        this.updateBounds();
 
        // to remember which side we were walking
        this.walkLeft = false;
 
        // walking & jumping speed
        this.body.setVelocity(4, 6);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.type = 'text';
         
    },
    update: function(dt) {
 
        if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
        // make it walk
        this.flipX(this.walkLeft);
        this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;             
        // update the body movement
        this.body.update(dt);   
        // update animation if necessary
        if (this.body.vel.x!=0 || this.body.vel.y!=0) {
            // update object animation
            this._super(me.Entity, 'update', [dt]);
            return true;
            }
        },


        draw : function (context) {
            //this.parent(context);
            //context = me.CanvasRenderer.getContext2d();
           
            touching = me.game.world.collide(this);
            if (touching) {
                if (touching.obj.type == 'self') {
                    this.font.draw(context, "WHY", this.pos.x, this.pos.y);
                }
            }
        },   
      //  return false; 
});