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

    onEnter:function () {
        this._super();
    },
    
    runThisTest:function () {
        // override me
    }

});

var ChipmunkBaseLayer = function() {

	var parent = cc.base(this);
	cc.associateWithNative( this, parent );
	this.space = new cp.Space();

	this.setupDebugNode();
};

cc.inherits(ChipmunkBaseLayer, cc.Layer );

ChipmunkBaseLayer.prototype.setupDebugNode = function()
{
    this._debugNode = cc.PhysicsDebugNode.create( this.space );
    this._debugNode.setVisible( false );
    this.addChild( this._debugNode );
};

ChipmunkBaseLayer.prototype.onToggleDebug = function(sender) {
    var state = this._debugNode.isVisible();
    this._debugNode.setVisible( !state );
};


ChipmunkBaseLayer.prototype.onEnter = function() {
    cc.base(this, 'onEnter');
};

ChipmunkBaseLayer.prototype.onCleanup = function() {	
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

var Course = function() {
	cc.base(this);
	
        this.box;

	var space = this.space;
	space.iterations = 30;
	space.gravity = cp.v(0,-500);
//	cpSpaceSetDamping(space, 0.5);
	space.sleepTimeThreshold = 0.5;
	space.collisionSlop = 0.5;

	var staticBody = space.staticBody;

                //this is the water
		//var bb = new cp.BB( 0, 0, 620, 100);
		//var radius = 5.0;

		//shape = space.addShape( new cp.BoxShape2(staticBody, bb) );
		//shape.setSensor(true);
		//shape.setCollisionType(1);
                
                var radius = 5.0;

                var creation                         = new Creation(  );
                creation.mass                        = 0.3*FLUID_DENSITY* creation.width* creation.height;
                creation.moment                      = cp.momentForCircle(10, 0, radius, cp.v(0,0));
                creation.position                    = cp.v(120, 700); 
                creation.velocity                    = cp.v(0, -100);
                creation.angleVelocity               = 1;
                creation.friction                    = 0.8;
                                            
                space.addBody( creation.addPhysics( cp )  );
                                            
                cc.log("does the content exist " + creation.content);

		shape = space.addShape(new cp.CircleShape( creation.content,  creation.width, cp.v(0,0) ) );
                
		shape.setFriction( creation.friction );                       
                
                space.addCollisionHandler( 1, 0, null, this.waterPreSolve, null, null);
        
                creation.content.setPos( cp.v(120, 700)  );
        
};

cc.inherits( Course, ChipmunkDemo );

Course.prototype.onEnter = function () {

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

Course.prototype.update = function(dt)
{
	var steps = 3;
	dt /= steps;
	for (var i = 0; i < 3; i++){
		this.space.step(dt);
	}
};


Course.prototype.onTouchesEnded = function( touches, event ) {
	//cc.log( "Touches End" +);
    var space = this.space;   
    var dt = space.getCurrentTimeStep();
    var g = space.gravity;
    var displacedMass = 1;
    var centroid = cp.centroidForPoly(  this.box );
    var r = cp.v.sub(  0, this.box.getPos() );
    this.box.applyImpulse( cp.v( 10,  10),  this.box.getPos() );
};


Course.prototype.waterPreSolve = function(arb, space, ptr) {

	var shapes = arb.getShapes();
	var water = shapes[0];
	var poly = shapes[1];

	var body = poly.getBody();

	// Get the top of the water sensor bounding box to use as the water level.
	var level = water.getBB().t;

	// Clip the polygon against the water level
        
        return;
        
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
                    //this.addChild(layer);//HOUSTON HERE IS WHERE WE HAVE THE PROBLEM
};
cc.inherits(ChipmunkTestScene,  Cosmos );

ChipmunkTestScene.prototype.runThisTest = function () {
   // sceneIdx = -1;
  var layer = new Course();
  this.addChild(layer);
  director.replaceScene(this);
};
