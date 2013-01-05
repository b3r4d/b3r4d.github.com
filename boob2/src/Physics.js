
var TestScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        cc.associateWithNative( this, cc.Scene );
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var label = cc.LabelTTF.create("MainMenu", "Arial", 20);
        var menuItem = cc.MenuItemLabel.create(label, this.onMainMenuCallback, this);

        var menu = cc.Menu.create(menuItem);
        menu.setPosition(0,0);
        menuItem.setPosition( 666 - 50, 25);

        this.addChild(menu, 1);
    },
    onMainMenuCallback:function () {
        var scene = cc.Scene.create();
        var layer = new TestController();
        scene.addChild(layer);
        var transition = cc.TransitionProgressRadialCCW.create(0.5,scene);
        director.replaceScene(transition);
    },

    runThisTest:function () {
        // override me
    }

});



var ChipmunkBaseLayer = function() {

	//
	// VERY IMPORTANT
	//
	// Only subclasses of a native classes MUST call cc.associateWithNative
	// Failure to do so, it will crash.
	//
        
        //The thoughts are thinking me
        //Instead of me thinking the thoughts
        
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


////////TESTS
//------------------------------------------------------------------
//
// Chipmunk + Sprite
//
//------------------------------------------------------------------
var ChipmunkSprite = function() {

	cc.base(this);

	this.addSprite = function( pos ) {
		var sprite =  this.createPhysicsSprite( pos );
		this.addChild( sprite );
	};

	this.initPhysics();
};
cc.inherits( ChipmunkSprite, ChipmunkBaseLayer );

//
// Instance 'base' methods
// XXX: Should be defined after "cc.inherits"
//

// init physics
ChipmunkSprite.prototype.initPhysics = function() {
	cc.log("init physics");
        var space = this.space ;
	var staticBody = space.staticBody;

	// Walls
	var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v( 666,0), 0 ),				// bottom
			new cp.SegmentShape( staticBody, cp.v(0, 666), cp.v( 666, 666), 0),	// top
			new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0, 666 ), 0),				// left
			new cp.SegmentShape( staticBody, cp.v( 666,0), cp.v( 666, 666), 0)	// right
			];
	for( var i=0; i < walls.length; i++ ) {
		var shape = walls[i];
		shape.setElasticity(1);
		shape.setFriction(1);
		space.addStaticShape( shape );
	}

	// Gravity
	space.gravity = cp.v( 0, -100 );
        
        
};

ChipmunkSprite.prototype.createPhysicsSprite = function( pos ) {
	var body = new cp.Body(1, cp.momentForBox(1, 48, 108) );
	body.setPos( pos );
	this.space.addBody( body );
	var shape = new cp.BoxShape( body, 124, 56);
	shape.setElasticity( 0.5 );
	shape.setFriction( 0.5 );
	this.space.addShape( shape );

	var sprite = cc.PhysicsSprite.create(s_pathGrossini);
	sprite.setBody( body );
	return sprite;
};

ChipmunkSprite.prototype.onEnter = function () {

	cc.base(this, 'onEnter');

	this.scheduleUpdate();
	for(var i=0; i<1; i++) {
		this.addSprite( cp.v( 666/2, 666/2) );
	}

    // 'browser' can use touches or mouse.
    // The benefit of using 'touches' in a browser, is that it works both with mouse events or touches events
    var t = cc.config.platform;
    if( t == 'browser' || t == 'mobile')  {
        this.setTouchEnabled(true);
    } else if( t == 'desktop' ) {
        this.setMouseEnabled(true);
    }
};

ChipmunkSprite.prototype.update = function( delta ) {
	this.space.step( delta );     
};

ChipmunkSprite.prototype.onMouseDown = function( event ) {
	this.addSprite( event.getLocation() );
};

ChipmunkSprite.prototype.onTouchesEnded = function( touches, event ) {
	var l = touches.length;
	for( var i=0; i < l; i++) {
		this.addSprite( touches[i].getLocation() );
	}
};





//
//
//
//
//
//

//
// Entry point
//

var ChipmunkTestScene = function() {
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
		ChipmunkSprite 
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

    return new arrayOfChipmunkTest[sceneIdx]();
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




