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
    //you spritesheet
    {name: "self-walk-short",  type:"image", src: "data/img/self-walk-short.png"},
    {name: "star",  type:"image", src: "data/img/star.png"},



	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
    {name: "area01", type: "tmx", src: "data/area01.tmx"}

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
