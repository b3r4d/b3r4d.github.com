(function(window) {
whiteboobs_550_400_5_instance_1 = function() {
	this.initialize();
}
whiteboobs_550_400_5_instance_1._SpriteSheet = new SpriteSheet({images: ["whiteboobs.png"], frames: [[0,0,348,210,0,0,0],[348,0,348,210,0,0,0],[0,210,348,210,0,0,0],[348,210,348,210,0,0,0],[0,420,348,210,0,0,0]]});
var whiteboobs_550_400_5_instance_1_p = whiteboobs_550_400_5_instance_1.prototype = new BitmapAnimation();
whiteboobs_550_400_5_instance_1_p.BitmapAnimation_initialize = whiteboobs_550_400_5_instance_1_p.initialize;
whiteboobs_550_400_5_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(whiteboobs_550_400_5_instance_1._SpriteSheet);
	this.paused = false;
}
window.whiteboobs_550_400_5_instance_1 = whiteboobs_550_400_5_instance_1;
}(window));

