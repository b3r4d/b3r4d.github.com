function init() 
{

var stage = new createjs.Stage(document.getElementById("testCanvas"));

			// Define a spritesheet. Note that this data was exported by Zoë.
var ss = new createjs.SpriteSheet(
{
	//"animations":
	//{
	//"run": [0, 25, "jump"],
	//"jump": [26, 63, "run"]},
	//"images": ["assets/runningGrant.png"],
	//"frames":
	//					{
	//"height": 292.5,
	//"width":165.75,
	//"regX": 0,
	//"regY": 0,
	//						"count": 64
	//					}
			});

	//		var grant = new createjs.BitmapAnimation(ss);
	//		grant.x = 360;
	//		grant.y = 22;

	//		grant.gotoAndPlay("run");

	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	//		stage.addChild(grant);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
	}