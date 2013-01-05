//Whats a mob to a King
//The thoughts are thinking me
//Insteand of me thinking the thoughts
//Whats a King to a GOD
//Instead of the thoughts thinking me
//I am me thinking the thoughts


     
var TestScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        cc.associateWithNative( this, cc.Scene );
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        },
    onMainMenuCallback:function () {
        var scene = cc.Scene.create();
        var layer = new TestController();
        scene.addChild(layer);
        //var transition = cc.TransitionProgressRadialCCW.create(0.5,scene);
        //director.replaceScene(transition);
    },

    runThisTest:function () {
        // override me
    }

});

var ChipmunkBaseLayer = function() {

    var parent = cc.base(this);
    cc.associateWithNative( this, parent );
    this.init( cc.c4b(0,0,0,255), cc.c4b(98*0.5,99*0.5,117*0.5,255) );
       
    this.space = new cp.Space();
    this.setupDebugNode();
    cc.log("init");
};

cc.inherits(ChipmunkBaseLayer, cc.LayerGradient );

ChipmunkBaseLayer.prototype.setupDebugNode = function()
{
    // debug only
	this._debugNode = cc.PhysicsDebugNode.create( this.space );
	this._debugNode.setVisible( false );
	this.addChild( this._debugNode );
};

ChipmunkBaseLayer.prototype.onToggleDebug = function(sender) {
    var state = this._debugNode.isVisible();
    this._debugNode.setVisible( !state );
};

//
// Instance 'base' methods
// XXX: Should be defined after "cc.inherits"
//
ChipmunkBaseLayer.prototype.onEnter = function() {
    cc.base(this, 'onEnter');
};

ChipmunkBaseLayer.prototype.onCleanup = function() {
	// Not compulsory, but recommended: cleanup the scene
	this.unscheduleUpdate();
};

ChipmunkBaseLayer.prototype.onRestartCallback = function (sender) {
	this.onCleanup();
    var s = new ChipmunkTestScene();
    s.addChild(restartChipmunkTest());
    director.replaceScene(s);
};

ChipmunkBaseLayer.prototype.onNextCallback = function (sender) {
	this.onCleanup();
    var s = new ChipmunkTestScene();
    s.addChild(nextChipmunkTest());
    director.replaceScene(s);
};

ChipmunkBaseLayer.prototype.onBackCallback = function (sender) {
	this.onCleanup();
    var s = new ChipmunkTestScene();
    s.addChild(previousChipmunkTest());
    director.replaceScene(s);
};




var ChipmunkTestScene = function() 
{
	var parent = cc.base(this);
};

cc.inherits(ChipmunkTestScene, TestScene );

ChipmunkTestScene.prototype.runThisTest = function () {
    var director = cc.Director.getInstance();
    sceneIdx = -1;
    var layer = nextChipmunkTest();
    this.addChild(layer);
    director.replaceScene(this);
};

//
// Flow control
//

// Chipmunk Demos
var arrayOfChipmunkTest =  [

// Chipmunk "C" Tests
		// Planet,
//		Buoyancy,
//		PyramidStack,
//		PyramidTopple,
//		Joints,
//		Balls,

// Custom Tests
		 
//		ChipmunkSpriteBatchTest ,
//		ChipmunkCollisionTest,
//		ChipmunkCollisionMemoryLeakTest,
//		ChipmunkSpriteAnchorPoint
		];

if( cc.config.platform !== 'browser' ) {
	arrayOfChipmunkTest.push( ChipmunkCollisionTestB );
	arrayOfChipmunkTest.push( ChipmunkReleaseTest );
}

var nextChipmunkTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfChipmunkTest.length;

    return new ChipmunkSprite();
};
var previousChipmunkTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfChipmunkTest.length;

    return new arrayOfChipmunkTest[sceneIdx]();
};
var restartChipmunkTest = function () {
    return new arrayOfChipmunkTest[sceneIdx]();
};




