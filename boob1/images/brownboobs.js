(function(window) {
brownboobs_550_400_5 = function() {
	this.initialize();
}
brownboobs_550_400_5._SpriteSheet = new SpriteSheet({images: ["brownboobs.png"], frames: [[0,0,319,255,0,0,0],[319,0,319,255,0,0,0],[638,0,319,255,0,0,0],[0,255,319,255,0,0,0],[319,255,319,255,0,0,0]]});
var brownboobs_550_400_5_p = brownboobs_550_400_5.prototype = new BitmapAnimation();
brownboobs_550_400_5_p.BitmapAnimation_initialize = brownboobs_550_400_5_p.initialize;
brownboobs_550_400_5_p.initialize = function() {
	this.BitmapAnimation_initialize(brownboobs_550_400_5._SpriteSheet);
	this.paused = false;
}
window.brownboobs_550_400_5 = brownboobs_550_400_5;
}(window));

