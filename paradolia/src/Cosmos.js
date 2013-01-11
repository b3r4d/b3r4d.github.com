// globals
var director = null;
var winSize = null;

var PLATFORM_JSB = 1 << 0;
var PLATFORM_HTML5 = 1 << 1;
var PLATFORM_ALL = PLATFORM_JSB | PLATFORM_HTML5;


var Cosmos = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        cc.associateWithNative( this, cc.Scene );
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
       // var label = cc.LabelTTF.create("MainMenu", "Arial", 20);
        //var menuItem = cc.MenuItemLabel.create(label, this.onMainMenuCallback, this);

        //var menu = cc.Menu.create(menuItem);
        //menu.setPosition(0,0);
        //menuItem.setPosition(winSize.width - 50, 25);

        //this.addChild(menu, 1);
    },
    onMainMenuCallback:function () {
       
       cc.log( "main menu call back");
       
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

//
////
// Base class for Chipmunk Demo
//
// Chipmunk Demos from Chipmunk-JS project
// https://github.com/josephg/chipmunk-js
//
var ChipmunkBaseLayer = function() {

	//
	// VERY IMPORTANT
	//
	// Only subclasses of a native classes MUST call cc.associateWithNative
	// Failure to do so, it will crash.
	//
	var parent = cc.base(this);
	cc.associateWithNative( this, parent );
	this.init( cc.c4b(0,0,0,255), cc.c4b(98*0.5,99*0.5,117*0.5,255) );

	this.title =  "No title";
	this.subtitle = "No Subtitle";

	
                    // Create the initial space
	this.space = new cp.Space();

	this.setupDebugNode();
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
	var label = cc.LabelTTF.create(this.title, "Arial", 28);
	this.addChild(label, 1);
	label.setPosition( cc.p(winSize.width / 2, winSize.height - 50));

	if (this.subtitle !== "") {
		var l = cc.LabelTTF.create(this.subtitle, "Thonburi", 16);
		this.addChild(l, 1);
		l.setPosition( cc.p(winSize.width / 2, winSize.height - 80));
	}

    
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

	this.title = 'Chipmunk Sprite Test';
	this.subtitle = 'Chipmunk + cocos2d sprites tests. Tap screen.';

	this.initPhysics();
};
cc.inherits( ChipmunkSprite, ChipmunkBaseLayer );

//
// Instance 'base' methods
// XXX: Should be defined after "cc.inherits"
//

// init physics
ChipmunkSprite.prototype.initPhysics = function() {
	var space = this.space ;
	var staticBody = space.staticBody;

	// Walls
	var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 0 ),				// bottom
			new cp.SegmentShape( staticBody, cp.v(0,winSize.height), cp.v(winSize.width,winSize.height), 0),	// top
			new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),				// left
			new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)	// right
			];
	for( var i=0; i < walls.length; i++ ) {
		var shape = walls[i];
		shape.setElasticity(1);
		shape.setFriction(1);
		space.addStaticShape( shape );
	}

	// Gravity
	space.gravity = cp.v(0, -100);
};

ChipmunkSprite.prototype.createPhysicsSprite = function( pos ) {
	var body = new cp.Body(1, cp.momentForBox(1, 48, 108) );
	body.setPos( pos );
	this.space.addBody( body );
	var shape = new cp.BoxShape( body, 48, 108);
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
	for(var i=0; i<10; i++) {
		this.addSprite( cp.v(winSize.width/2, winSize.height/2) );
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


var v = cp.v;
var ctx;
var GRABABLE_MASK_BIT = 1<<31;
var NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;

var ChipmunkDemo = function() {

	cc.base(this);

	this.remainder = 0;

	// debug only
                    this._debugNode.setVisible( true );

	this.scheduleUpdate();
};

cc.inherits( ChipmunkDemo, ChipmunkBaseLayer );

ChipmunkDemo.prototype.update = function(dt) {
	this.space.step(dt);
};

ChipmunkDemo.prototype.addFloor = function() {
	var space = this.space;
	var floor = space.addShape(new cp.SegmentShape(space.staticBody, v(0, 0), v(640, 0), 0));
	floor.setElasticity(1);
	floor.setFriction(1);
	floor.setLayers(NOT_GRABABLE_MASK);
};

ChipmunkDemo.prototype.addWalls = function() {
	var space = this.space;
	var wall1 = space.addShape(new cp.SegmentShape(space.staticBody, v(0, 0), v(0, 480), 0));
	wall1.setElasticity(1);
	wall1.setFriction(1);
	wall1.setLayers(NOT_GRABABLE_MASK);

	var wall2 = space.addShape(new cp.SegmentShape(space.staticBody, v(640, 0), v(640, 480), 0));
	wall2.setElasticity(1);
	wall2.setFriction(1);
	wall2.setLayers(NOT_GRABABLE_MASK);
};

ChipmunkDemo.prototype.onMouseDown = function( event ) {
	cc.log( "Mouse Down");
};



//
////------------------------------------------------------------------
//
// Buoyancy
//
//------------------------------------------------------------------

var FLUID_DENSITY = 0.00014;
var FLUID_DRAG = 2.0;

var Buoyancy = function() {
	cc.base(this);
	this.title = 'Chipmunk Demo';
	this.subtitle = 'Buoyancy';
        
                    this.box;

	var space = this.space;
	space.iterations = 30;
	space.gravity = cp.v(0,-500);
//	cpSpaceSetDamping(space, 0.5);
	space.sleepTimeThreshold = 0.5;
	space.collisionSlop = 0.5;

	var staticBody = space.staticBody;

	// Create segments around the edge of the screen.
	//var shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(0,0), cp.v(0,480), 0.0));
	//shape.setElasticity(1.0);
	//shape.setFriction(1.0);
	//shape.setLayers(NOT_GRABABLE_MASK);

	//shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(640,0), cp.v(640,480), 0.0));
	//shape.setElasticity(1.0);
	//shape.setFriction(1.0);
	//shape.setLayers(NOT_GRABABLE_MASK);

	//shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(0,0), cp.v(640,0), 0.0));
	//shape.setElasticity(1.0);
	//shape.setFriction(1.0);
	//shape.setLayers(NOT_GRABABLE_MASK);

	//shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(0,480), cp.v(640,480), 0.0));
	//shape.setElasticity(1.0);
	//shape.setFriction(1.0);
	//shape.setLayers(NOT_GRABABLE_MASK);

	// {
		// Add the edges of the bucket
                                            //this is the water
		var bb = new cp.BB( 0, 0, 620, 100);
		var radius = 5.0;

		//shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(bb.l, bb.b), cp.v(bb.l, bb.t), radius));
		//shape.setElasticity(1.0);
		//shape.setFriction(1.0);
		//shape.setLayers(NOT_GRABABLE_MASK);

		//shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(bb.r, bb.b), cp.v(bb.r, bb.t), radius));
		//shape.setElasticity(1.0);
		//shape.setFriction(1.0);
		//shape.setLayers(NOT_GRABABLE_MASK);

		//shape = space.addShape( new cp.SegmentShape(staticBody, cp.v(bb.l, bb.b), cp.v(bb.r, bb.b), radius));
		//shape.setElasticity(1.0);
		//shape.setFriction(1.0);
		//shape.setLayers(NOT_GRABABLE_MASK);

		// Add the sensor for the water.
		shape = space.addShape( new cp.BoxShape2(staticBody, bb) );
		shape.setSensor(true);
		shape.setCollisionType(1);
	// }


	// {
		//var width = 200.0;
		//var height = 50.0;
		//var mass = 0.3*FLUID_DENSITY*width*height;
		//var moment = cp.momentForBox(mass, width, height);

		//body = space.addBody( new cp.Body(mass, moment));
		//body.setPos( cp.v(270, 140));
		//body.setVel( cp.v(0, -100));
		//body.setAngVel( 1 );

		//shape = space.addShape( new cp.BoxShape(body, width, height));
		//shape.setFriction(0.8);
	// }

	// {
		//width = 40.0;
		//height = width*2;
		
		//moment =
                                           
                                           //this.box = new cp.Body(mass, moment) ;
		//space.addBody( this.box );
		//this.box.setPos();
		//this.box.setVel();
		//this.box.setAngVel(1);
                
                                           for ( var i = 0; i < 5; i++)
                                               {
                            
                                            var creation      = new Creation(  );
                                            creation.mass                          = 0.3*FLUID_DENSITY* creation.width* creation.height;
                                            creation.moment                   =  cp.momentForBox(  creation.mass, creation.width, creation.height);
                                            creation.position                    = cp.v(120, 500); 
                                            creation.velocity                    = cp.v(0, -100);
                                            creation.angleVelocity         = 1;
                                            creation.friction                       = 0.8;
                                            
                                            space.addBody( creation.addPhysics( cp )  );
                                            
                                            cc.log("does the content exist " + creation.content);

		shape = space.addShape(new cp.BoxShape( creation.content,  creation.width, creation.height));
		shape.setFriction( creation.friction );                       
                                               
    }
                
	// }

	space.addCollisionHandler( 1, 0, null, this.waterPreSolve, null, null);
        
        
};

cc.inherits( Buoyancy, ChipmunkDemo );

Buoyancy.prototype.onEnter = function () {

      cc.base(this, 'onEnter');
      
    // 'browser' can use touches or mouse.
    // The benefit of using 'touches' in a browser, is that it works both with mouse events or touches events
    var t = cc.config.platform;
    if( t === 'browser' || t === 'mobile')  {
        cc.log("setting for touch enabled ");
        this.setTouchEnabled(true);
    } else if( t === 'desktop' ) {
         cc.log("setting the mouse to enabled ");
        this.setMouseEnabled(true);
    }
    
    
};

Buoyancy.prototype.update = function(dt)
{
	var steps = 3;
	dt /= steps;
	for (var i = 0; i < 3; i++){
		this.space.step(dt);
	}
};


Buoyancy.prototype.onTouchesEnded = function( touches, event ) {
	//cc.log( "Touches End" +);
    var space = this.space;   
    var dt = space.getCurrentTimeStep();
    var g = space.gravity;
    var displacedMass = 1;
    var centroid = cp.centroidForPoly(  this.box );
    var r = cp.v.sub(  0, this.box.getPos() );
    this.box.applyImpulse( cp.v( 10,  10),  this.box.getPos() );
};


Buoyancy.prototype.waterPreSolve = function(arb, space, ptr) {

	var shapes = arb.getShapes();
	var water = shapes[0];
	var poly = shapes[1];

	var body = poly.getBody();

	// Get the top of the water sensor bounding box to use as the water level.
	var level = water.getBB().t;

	// Clip the polygon against the water level
	var count = poly.getNumVerts();

	var clipped = [];

	var j=count-1;
	for(var i=0; i<count; i++) {
		var a = body.local2World( poly.getVert(j));
		var b = body.local2World( poly.getVert(i));

		if(a.y < level){
			clipped.push( a.x );
			clipped.push( a.y );
		}

		var a_level = a.y - level;
		var b_level = b.y - level;

		if(a_level*b_level < 0.0){
			var t = Math.abs(a_level)/(Math.abs(a_level) + Math.abs(b_level));

			var v = cp.v.lerp(a, b, t);
			clipped.push(v.x);
			clipped.push(v.y);
		}
		j=i;
	}

	// Calculate buoyancy from the clipped polygon area
	var clippedArea = cp.areaForPoly(clipped);

	var displacedMass = clippedArea*FLUID_DENSITY;
	var centroid = cp.centroidForPoly(clipped);
	var r = cp.v.sub(centroid, body.getPos());

	var dt = space.getCurrentTimeStep();
	var g = space.gravity;

	// Apply the buoyancy force as an impulse.
	body.applyImpulse( cp.v.mult(g, -displacedMass*dt), r);

	// Apply linear damping for the fluid drag.
	var v_centroid = cp.v.add(body.getVel(), cp.v.mult(cp.v.perp(r), body.w));
	var k = 1; //k_scalar_body(body, r, cp.v.normalize_safe(v_centroid));
	var damping = clippedArea*FLUID_DRAG*FLUID_DENSITY;
	var v_coef = Math.exp(-damping*dt*k); // linear drag
//	var v_coef = 1.0/(1.0 + damping*dt*cp.v.len(v_centroid)*k); // quadratic drag
	body.applyImpulse( cp.v.mult(cp.v.sub(cp.v.mult(v_centroid, v_coef), v_centroid), 1.0/k), r);

	// Apply angular damping for the fluid drag.
	var w_damping = cp.momentForPoly(FLUID_DRAG*FLUID_DENSITY*clippedArea, clipped, cp.v.neg(body.p));
	body.w *= Math.exp(-w_damping*dt* (1/body.i));

	return true;
};


var ChipmunkTestScene = function() {
                    var parent = cc.base(this);
                    cc.log("do you have a parent " + parent );
                   sceneIdx = -1;
                 // var layer = Buoyancy;
                   //this.addChild(layer);//HOUSTON HERE IS WHERE WE HAVE THE PROBLEM
};
cc.inherits(ChipmunkTestScene,  Cosmos );

ChipmunkTestScene.prototype.runThisTest = function () {
   // sceneIdx = -1;
  var layer = new  Buoyancy();
  this.addChild(layer);
  director.replaceScene(this);
};
