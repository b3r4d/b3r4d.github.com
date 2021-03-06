

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/boob/boob1.png";

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

var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

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
		//reset();
	}
};

document.onmousemove=getMouseCoordinates;

function getMouseCoordinates(event)
{
ev = event || window.event;
TweenLite.to( hero, 	3, { x:ev.pageX, y:ev.pageY});
}
// Draw everything
var render = function () {
	
	bgSpeed -=1;
	arousal -=1;
	
	if (bgReady) {
		ctx.drawImage(bgImage, bgSpeed, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monster, bgSpeed, 0);
	}

	// Score
	ctx.fillStyle = "rgb(25, 25, 25)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText( "Arousal " + arousal, 32, 32);
};

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
