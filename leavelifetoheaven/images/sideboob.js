(function(window) {
side_instance_1 = function() {
	this.initialize();
}
side_instance_1._SpriteSheet = new SpriteSheet({images: ["sideboob.png"], frames: [[0,0,320,255,0,0,0],[320,0,320,255,0,0,0],[640,0,320,255,0,0,0],[0,255,320,255,0,0,0],[320,255,320,255,0,0,0]]});
var side_instance_1_p = side_instance_1.prototype = new BitmapAnimation();
side_instance_1_p.BitmapAnimation_initialize = side_instance_1_p.initialize;
side_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(side_instance_1._SpriteSheet);
	this.paused = false;
}
window.side_instance_1 = side_instance_1;
}(window));

