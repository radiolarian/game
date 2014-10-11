game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 //level tileset
    {name: "fall-tiles",  type:"image", src: "data/map/fall-tiles.png"},
    // our metatiles
    {name: "collision-tiles",  type:"image", src: "data/map/collision-tiles.png"},
    //background
    {name: "bg-sm",  type:"image", src: "data/map/bg-sm.png"},
    {name: "winter-bg", type: "image", src: "data/map/winter-bg.png"},
    //you spritesheet
    {name: "self-walk-short",  type:"image", src: "data/img/self-walk-short.png"},
    {name: "npc-walk",  type:"image", src: "data/img/npc-walk.png"},
    {name: "stars",  type:"image", src: "data/img/stars.png"},
    {name: "star-gate",  type:"image", src: "data/img/star-gate.png"},
    {name: "transp", type:"image", src:"data/img/transp.png"},
    //font
    {name: "32x32_font", type:"image", src: "data/img/font/32x32_font.png"},



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

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	{name: "fall", type: "audio", src: "data/bgm/"},

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	{name: "cling", type: "audio", src: "data/sfx/"},
];
