(function(window) {
charactersdefault_378_171_13 = function() {
	this.initialize();
}
charactersdefault_378_171_13._SpriteSheet = new SpriteSheet({images: ["hero.png"], frames: [[0,0,378,171,0,0,0],[378,0,378,171,0,0,0],[0,171,378,171,0,0,0],[378,171,378,171,0,0,0],[0,342,378,171,0,0,0],[378,342,378,171,0,0,0],[0,513,378,171,0,0,0],[378,513,378,171,0,0,0],[0,684,378,171,0,0,0],[378,684,378,171,0,0,0],[0,855,378,171,0,0,0],[378,855,378,171,0,0,0],[0,1026,378,171,0,0,0]]});
var charactersdefault_378_171_13_p = charactersdefault_378_171_13.prototype = new BitmapAnimation();
charactersdefault_378_171_13_p.BitmapAnimation_initialize = charactersdefault_378_171_13_p.initialize;
charactersdefault_378_171_13_p.initialize = function() {
	this.BitmapAnimation_initialize(charactersdefault_378_171_13._SpriteSheet);
	this.paused = false;
}
window.charactersdefault_378_171_13 = charactersdefault_378_171_13;
}(window));

