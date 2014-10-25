game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 //level tileset
    {name: "fall-tiles",  type:"image", src: "data/map/fall-tiles.png"},
    {name: "summer-tiles",  type:"image", src: "data/map/summer-tiles.png"},
    {name: "spring-tiles",  type:"image", src: "data/map/spring-tiles.png"},

    // our metatiles
    {name: "collision-tiles",  type:"image", src: "data/map/collision-tiles.png"},

    //background
    {name: "bg-sm",  type:"image", src: "data/map/bg-sm.png"},
    {name: "winter-bg", type: "image", src: "data/map/winter-bg.png"},
    {name: "spring",  type:"image", src: "data/map/spring.png"},
    {name: "summer",  type:"image", src: "data/map/summer.png"},

    //you spritesheet
    {name: "self-walk-short",  type:"image", src: "data/img/self-walk-short.png"},
    {name: "summer-self-walk",  type:"image", src: "data/img/summer-self-walk.png"},
    {name: "spring-self-walk",  type:"image", src: "data/img/spring-self-walk.png"},

    {name: "npc-walk",  type:"image", src: "data/img/npc-walk.png"},
    {name: "summer-npc-walk",  type:"image", src: "data/img/summer-npc-walk.png"},
    {name: "spring-npc-walk",  type:"image", src: "data/img/spring-npc-walk.png"},

    {name: "stars",  type:"image", src: "data/img/stars.png"},
    {name: "star-gate",  type:"image", src: "data/img/star-gate.png"},
    //font
    {name: "32x32_font", type:"image", src: "data/img/font/idek.png"},

    //still NPCs
    {name: "npc-still",  type:"image", src: "roughimages/b2.png"},


	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
    {name: "area01", type: "tmx", src: "data/area01.tmx"},
    {name: "alpha", type: "tmx", src: "data/alpha.tmx"},
    {name: "spring", type: "tmx", src: "data/spring.tmx"},
    {name: "summer", type: "tmx", src: "data/summer.tmx"},


	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	{name: "fall", type: "audio", src: "data/bgm/"},
    {name: "summer", type: "audio", src: "data/bgm/"},
    {name: "spring", type: "audio", src: "data/bgm/"},
    {name: "winter", type: "audio", src: "data/bgm/"},
    {name: "title", type: "audio", src: "data/bgm/"},

    //title!
    {name: "title_screen", type: "image", src: "data/img/gui/title_screen.png"},

	
    /* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	{name: "cling", type: "audio", src: "data/sfx/"},
];
