(function(window) {
BOOB1_instance_1 = function() {
	this.initialize();
}
BOOB1_instance_1._SpriteSheet = new SpriteSheet({images: ["bgBoob1.png"], frames: [[0,0,464,443,0,1.55,0],[464,0,464,443,0,1.55,0],[0,443,464,443,0,1.55,0],[464,443,464,443,0,1.55,0],[0,886,464,443,0,1.55,0]]});
var BOOB1_instance_1_p = BOOB1_instance_1.prototype = new BitmapAnimation();
BOOB1_instance_1_p.BitmapAnimation_initialize = BOOB1_instance_1_p.initialize;
BOOB1_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(BOOB1_instance_1._SpriteSheet);
	this.paused = false;
}
window.BOOB1_instance_1 = BOOB1_instance_1;
}(window));

