(function(window) {
pennies_550_400_3 = function() {
	this.initialize();
}
pennies_550_400_3._SpriteSheet = new SpriteSheet({images: ["pennies.png"], frames: [[0,0,378,171,0,0,0],[0,171,378,171,0,0,0],[0,342,378,171,0,0,0]]});
var pennies_550_400_3_p = pennies_550_400_3.prototype = new BitmapAnimation();
pennies_550_400_3_p.BitmapAnimation_initialize = pennies_550_400_3_p.initialize;
pennies_550_400_3_p.initialize = function() {
	this.BitmapAnimation_initialize(pennies_550_400_3._SpriteSheet);
	this.paused = false;
}
window.pennies_550_400_3 = pennies_550_400_3;
}(window));

