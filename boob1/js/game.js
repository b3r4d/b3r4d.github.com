//var init = function {
			
		//	Alert("init");
			// create a new stage and point it at our canvas:
		

			// Define a spritesheet. Note that this data was exported by Zoë.
			
			//
			

			//var grant = new createjs.BitmapAnimation(ss);
			//grant.x = 360;
			//grant.y = 22;

			//grant.gotoAndPlay("run");

			// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
			//stage.addChild(grant);
			//createjs.Ticker.setFPS(60);
			//createjs.Ticker.addListener(stage);

//}


var init = function ()
{
	var stage = new createjs.Stage(document.getElementById("testCanvas"));
 	
	var ss  =  createjs.SpriteSheet	({
				"animations":
				{
					"run": [0, 25, "jump"],
					"jump": [26, 63, "run"]},
					"images": ["images/bgBoob1.png"],
					"frames":
						{
							"height": 292.5,
							"width":165.75,
							"regX": 0,
							"regY": 0,
							"count": 64
						}
				});
		
	



			//var grant = new createjs.BitmapAnimation(ss);
			//grant.x = 360;
			//grant.y = 22;

			//grant.gotoAndPlay("run");

			// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
			//stage.addChild(grant);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);

}

// Reset the game when the player catches a monster
var reset = function () {
	
 
	
	
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 500;
	monster.y = 200;
	
	//init();
};







var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 480;
document.body.appendChild(canvas)

var bgSrc 		= "images/background.png";
var heroSrc		= "images/hero.png"
var monsterSrc  = "images/monster.png";


//ASSETS
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = bgSrc;

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = this.heroSrc;

var monsterReady = false;

var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
	 boobDown();
};
monsterImage.src = this.monsterSrc;

//MAIN CLASSES
function Hero() 
{
src =  heroSrc;
arousal = 10000;
x = 100;
y = 100;
}

Hero.prototype.move = function() 
{

}




//CREATIONS
var hero = new Hero;




//
document.onmousemove=getMouseCoordinates;

function getMouseCoordinates(event)
{
//ev = event || window.event;
//TweenLite.to( hero, 	3, { x:ev.pageX, y:ev.pageY});
}



var render = function () {

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};







///////OLD
//
// Create the canvas
// Background image

// Hero image

// Monster image


// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};

var bg = {
	speed:0,
	maxSpeed:10
}

var bgSpeed = 10;

var arousal = 10000;

var monsterList = 
[  
	{ x:10, 	y:-100},
	{ x:150, 	y:-100},
	{ x:300, 	y:-100}
];

var monster = { x:10, y:-100};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);



function boobDown ()
{
	TweenLite.to( monster, 	3, { y:0, onComplete:boobUp  });
}
	

function boobUp ()
{
	TweenLite.to( monster, 	3, { y:200,  onComplete:boobDown   } );
}
	

// Update game objects
var update = function (modifier) {
	
	
	//if (38 in keysDown) { // Player holding up
	//	hero.y -= hero.speed * modifier;
	//}
	//if (40 in keysDown) { // Player holding down
	//	hero.y += hero.speed * modifier;
	//}
	//if (37 in keysDown) { // Player holding left
	//	hero.x -= hero.speed * modifier;
	//}
	//if (39 in keysDown) { // Player holding right
	//	hero.x += hero.speed * modifier;
	//}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		arousal = 0;
	//	reset();
	}
};

document.onmousemove=getMouseCoordinates;

function getMouseCoordinates(event)
{
ev = event || window.event;
TweenLite.to( hero, 	3, { x:ev.pageX, y:ev.pageY});
}
// Draw everything
//var render = function () {
	
//	bgSpeed -=1;
//	arousal -=1;
//	monster.x -=1;
	
//	if (bgReady) {
//		ctx.drawImage(bgImage, bgSpeed, 0);
//	}

//	if (heroReady) {
//		ctx.drawImage(heroImage, hero.x, hero.y);
//	}

//	if ( monsterImage ) {
//		ctx.drawImage( monsterImage,  monster.x, monster.y);
//	}

	// Score
//	ctx.fillStyle = "rgb(25, 25, 25)";
//	ctx.font = "24px Helvetica";
//	ctx.textAlign = "left";
//	ctx.textBaseline = "top";
//	ctx.fillText( "Arousal " + arousal, 32, 32);
	
//	if (
//		hero.x <= (monster.x + 32)
//		&& monster.x <= (hero.x + 32)
//		&& hero.y <= (monster.y + 32)
//		&& monster.y <= (hero.y + 32)
//	) {
//		arousal = 0;
	//	reset();
//	}
//};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
