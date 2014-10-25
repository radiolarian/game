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
        this.z = 50;
        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);
        if (game.data.level=="WINTER" || game.data.level=="WINTER2") {
            this.body.setVelocity(1, 3);
        }

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        this.font = new me.BitmapFont("32x32_font", 32);
        this.type = 'self';
        this.ghostFlicker = 0;
        game.data.player = this;
        this.counter = 0;
        this.is_walking = true;

    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function(dt) {
        //END CREDITS
        if (game.data.level=="WINTER" || game.data.level=="WINTER2") {
            if (this.is_walking) {
                this.body.vel.x += this.body.accel.x * me.timer.tick;
                if (this.counter % 10 == 0) {
                    game.data.score++;
                 }   
            }
            this.counter++;
            if (this.counter == 205) {
                game.data.textBox = "\"I WANNA BE THE ULTIMATE";
                }
            if (this.counter == 280) {
                    game.data.textBox = "STAR COLLECTOR!\"";
                }                
            if (this.counter == 420)
                game.data.textBox = "ULTIMATE STAR COLLECTOR:";
            if (this.counter == 480)
                game.data.textBox = "WINNER OF THE UNIVERSE";  
            if (this.counter == 540)
                game.data.textBox = "MADE FOR QGCON2014"; 

            if (this.counter == 630 && game.data.level == "WINTER")
                game.data.textBox = "\"YOU DON'T LOOK LIKE";
            if (this.counter == 705 && game.data.level == "WINTER")
                game.data.textBox = "THE REST OF US.\"";

            if (this.counter == 630 && game.data.level == "WINTER2")
                game.data.textBox = "\"WHAT'S UP BRO.\"";

            if (this.counter == 840) {
                game.data.textBox = "BY NOON, CEREY & VULVASAUR";
            }

            if (this.counter == 1050 && game.data.level == "WINTER") {
                game.data.textBox = "WHAT HAVE YOU GAINED?";
            }

            if (this.counter == 1050 && game.data.level == "WINTER2") {
                game.data.textBox = "NICE LOOK.";
            }

            if (this.counter == 1260) {
                game.data.textBox = "THANKS FOR PLAYING.";
                this.is_walking = false;
                this.body.vel.x = 0;
            }
        }
        else {
            if (this.ghostFlicker > 0) {
                this.ghostFlicker --;
            }
            if (!this.renderable.isFlickering() && this.ghostFlicker <= 0 && !game.data.cutScene) {
                game.data.textBox = "";
            }
            if (me.input.isKeyPressed('left')) {
                this.hit = false;
                // flip the sprite on horizontal axis
                this.flipX(true);
                // update the entity velocity
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            } else if (me.input.isKeyPressed('right')) {
                // unflip the sprite
                this.hit = false;
                this.flipX(false);
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
                if (game.data.level == "SUMMER") { //SUMMER
                var texts = ["\"WHY DO YOU LOOK LIKE THAT?\"", "\"WHAT'S WITH YOUR HAIR?\"", 
                            "\"ARE YOU A BOY OR A GIRL?\"", "\"TAKE OFF THE COSTUME!\"", "\"I JUST TOUCHED IT!\""];
                } else { //FALL
                    var texts = ["\"YOU'RE JUST CONFUSED.\"","\"WATCH IT FREAK\"", "\"NOONE WANTS TO BE AROUND YOU.\"", 
                                "\"WHY DO YOU EVEN SHOW UP?\"", "\"WHAT ARE YOU?\"", "\"YOU DON'T BELONG HERE.\"", "\"STOP WITH THE ACT.\"", "\"YOU NEED HELP.\""];
                } 
                var i = Math.floor(Math.random()*texts.length);
                game.data.textBox = texts[i];
                //game.data.textBox = "OH NO";
                game.data.score -= 1;
                this.renderable.flicker(750);
            }
        }
    } else if (response.b.body.collisionType === me.collision.types.NPC_OBJECT) {
        if (this.ghostFlicker <= 0) {
            if (game.data.level == "SPRING") { //SPRING
                var texts = ["\"OOPSIES SORRY!\"","\"WEEEEE LETS PLAY TOGETHER!\"", 
                    "\"HAHA YOU HAVE COOL HAIR!\"", "\"I NEED TO PEE\"", "\"TAG YOU'RE IT!\"", "\"STARS ARE SO COOL!\""];
                } else { //SUMMER
                    var texts = ["\"SORRY\"","\"HEY HOW ARE YA?\"", "\"MY BAD!\""];
                }
            var i = Math.floor(Math.random()*texts.length);
            game.data.textBox = texts[i];
            this.ghostFlicker = 50;  
            if (this.body.falling) {   
            // bounce (force jump)
                this.body.falling = false;
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        }
        }
    }
    else if (response.b.body.collisionType === me.collision.types.END) {

    }
    },

            /*draw : function (context) {
            //this.parent(context);
            
            //context = me.CanvasRenderer.getContext2d();
           
            touching = me.game.world.collide(this);
            if (touching) {
                if (touching.obj.type == 'enemy') {
                    this.font.draw(context, "WHY", this.pos.x-50, this.pos.y-50);
                }
            }
        },*/

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
        game.data.score += 99; //LOOK HERE
        game.data.numCollected += 1;
        me.audio.play("cling");
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        // remove it
        me.game.world.removeChild(this);
    }
});

/* --------------------------
a friendly Entity
------------------------ */
game.FriendlyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
         
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
        this.body.setVelocity(1, 1);
        //this.body.setMaxVelocity(0, 0);
        this.body.collisionType = me.collision.types.NPC_OBJECT;
         
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

game.StillEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
         
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 32;
        settings.spritewidth = settings.height = 64;
         
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
 
        // walking & jumping speed
        this.body.setVelocity(1, 1);
        //this.body.setMaxVelocity(0, 0);
        this.body.collisionType = me.collision.types.NPC_OBJECT;
         
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
        },
});



game.EndStillEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
         
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 32;
        settings.spritewidth = settings.height = 64;
         
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
 
        // walking & jumping speed
        this.body.setVelocity(1, 1);
        //this.body.setMaxVelocity(0, 0);
        this.body.collisionType = me.collision.types.END;
         
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
        },
});


/* --------------------------
an enemy Entity
------------------------ */
game.EnemyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
         
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
        this.type = 'enemy';
         
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
game.BossEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
         
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
        x = 5;
        this.startX = 5;
        this.endX   = 15;
        //this.pos.x  = x + width - settings.spritewidth; 
 
        // manually update the entity bounds as we manually change the position
        this.updateBounds();
 
        // to remember which side we were walking
        this.walkLeft = false;
        this.counter = 0;
 
        // walking & jumping speed
        this.body.setVelocity(1, 6);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.type = 'enemy';
         game.data.cutScene = true;
    },
    update: function(dt) {
        this.counter++;
        //game.data.player.flicker(450);
        if (this.counter == 300) {
                game.data.textBox = "\"HELLO.\"";
            }
        if (this.counter == 500)
            game.data.textBox = "MORE TEXT HERE";
        if (this.counter == 700)
            game.data.textBox = "ETC";
        if (this.counter == 900) {
            game.data.textBox = "<- YES OR -> NO";
            if (me.input.isKeyPressed('left')) {
                this.goto("spring"); //TODO obviously don't go to spring
            } else if(me.input.isKeyPressed('right')) {
                this.counter = 0;
                game.data.player.flicker(450);

            }
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
});
game.StarGateEntity = me.LevelEntity.extend({
    init : function (x, y, settings) {
        // Call super constructor
        //this._parent(x, y, settings);
        this._super(me.LevelEntity, 'init', [x, y , settings]);
        // Save all settings
        this.settings = settings;
        this.fade = "#000000";
        this.duration = 250;
    },
    onCollision : function () {
        if (game.data.level == "FALL") {
            this.goTo("alpha");
        } else {
            if (game.data.score > 24) {
                game.data.score = 0;
                //LOOK HERE ^^
                console.log(game.data.level);
                if (game.data.level == "SUMMER") {
                    game.data.level = "FALL";
                    this.goTo("area01");
                    me.audio.pauseTrack();
                    me.audio.playTrack("fall");
                    return;
                } else if (game.data.level == "SPRING"){
                    game.data.level = "SUMMER";
                    this.goTo("SUMMER");
                    me.audio.pauseTrack();
                    me.audio.playTrack("summer");
                    return;
                }
            } else {
                var calc = 25 - game.data.score;
                game.data.textBox = "NEED " + calc + " MORE STARS";
            }
        }
    }   
}); 