var FLUID_DENSITY = 0.00014;
var FLUID_DRAG = 2.0;


var Course = function() {
    
    this.director = cc.Director.getInstance();
    this.winSize = director.getWinSize();
    
    this.gravityV = 0;
    this.gravityH = 0;

    this.cameraX = 0;
    this.cameraY = 0;

    this.MW = {};
    this.MW.KEYS = {};

    this.soul;
    this.bounce;
    
    var parent = cc.base(this);
    cc.associateWithNative( this, parent );
    this.setUp();
};

cc.inherits( Course, cc.Layer );

Course.prototype.setUp = function()
{
        this.space = new cp.Space();

	this.setupDebugNode();
        this.setKeyboardEnabled(true);
        
	this.remainder = 0;
        this._debugNode.setVisible( true );
        this.scheduleUpdate();
        
	var space = this.space;
	space.iterations = 30;
	space.gravity = cp.v(  this.gravityH,  this.gravityV );
        //cpSpaceSetDamping(space, 0.5);
	space.sleepTimeThreshold = 0.5;
	space.collisionSlop = 0.5;

        this.soul = new CreationPhysics( space );
        var soul = this.soul;
        soul.initBody( space ); // Dont like ths line
        soul.setPosition(cp.v( this.winSize.width * .5,  this.winSize.height * .5));
        this.addChild(soul);

       // for (var i = 0; i < 0; i++)
       // {
       // var bounce = new CreationPhysics2(space);
       // bounce.initBody(space); // Dont like ths line
       // bounce.setPosition(cp.v(this.winSize.width * Math.random(), this.winSize.height * Math.random()));
       // this.addChild(bounce);
       // }
        

};

Course.prototype.onKeyDown = function(e) {
    this.MW.KEYS[e] = true;
};

Course.prototype.onKeyUp = function(e) {
    this.MW.KEYS[e] = false;
};

Course.prototype.update = function(dt)
{
    var steps = 3;
    dt /= steps;
    for (var i = 0; i < 3; i++)
    {
        this.space.step(dt);
    }

    var moveToPointer = this.soul.getPosition();

    //var x = moveToPointer.x;
    //var y = moveToPointer.y;
    
    var camX = this.soul.getPositionX() + this.winSize.width   * .5;
    var camY = this.soul.getPositionY() + this.winSize.height  * .5;

    //this.runAction(cc.MoveTo.create( .05, cc.p( x, y )));
    //TweenLite.to(this, .1, {cameraX: camX, cameraY: camY, ease: Elastic.easeOut});

    //cc.log( "looking at these positions " + this.cameraY + " : " + this.cameraX );
    //this.setPositionY( this.cameraY );
    //this.setPositionX( this.cameraX );

    if ( this.MW.KEYS[cc.KEY.w] || this.MW.KEYS[cc.KEY.up]) {
        this.force(0, .1);
    }
    if ( this.MW.KEYS[cc.KEY.s] || this.MW.KEYS[cc.KEY.down]) {
        this.force(0, -.1);
    }
    if (this.MW.KEYS[cc.KEY.a] || this.MW.KEYS[cc.KEY.left] ) {
        this.force(-.1, 0);
    }

    if ( this.MW.KEYS[cc.KEY.d] || this.MW.KEYS[cc.KEY.right]) {
        this.force( .1, 0);
    }

    //TweenLite.to( this, 1, {height:200, ease:Elastic.easeOut});
};

Course.prototype.force = function(h, v)
{
    var r = this.soul.content.getPos();
    //var impulseX = r.x - this.soul.width;
    //var impulseY = r.y - this.soul.width;

    var impulseX = r.x - 0;
    var impulseY = r.y - 0;

    this.soul.content.applyImpulse(cp.v( h, v), cp.v(impulseX, impulseY));
};


Course.prototype.setupDebugNode = function()
{
    this._debugNode = cc.PhysicsDebugNode.create( this.space );
    this._debugNode.setVisible( false );
    this.addChild( this._debugNode );
};

Course.prototype.onToggleDebug = function(sender) {
    var state = this._debugNode.isVisible();
    this._debugNode.setVisible( !state );
};


Course.prototype.onCleanup = function() {	
    this.unscheduleUpdate();
};


Course.prototype.onMouseDown = function( event ) {
	cc.log( "Mouse Down");
};

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



Course.prototype.onTouchesEnded = function( touches, event ) {
   // Calculate buoyancy from the clipped polygon area
    //var clippedArea = cp.areaForPoly(clipped);

    //var displacedMass = clippedArea*FLUID_DENSITY;
    //var r = this.soul.content.getPos();

    //var dt = space.getCurrentTimeStep();
    //var g = space.gravity;

    // Apply the buoyancy force as an impulse.
    //this.soul.content.applyImpulse(cp.v(10, 10), r);
};


var Paradolia = function() {
                    var parent = cc.base(this);
                    cc.log("do you have a parent " + parent );
                   sceneIdx = -1;
                    //this.addChild(layer);//HOUSTON HERE IS WHERE WE HAVE THE PROBLEM
};
cc.inherits( Paradolia,  Cosmos );

Paradolia.prototype.awake = function () {
   // sceneIdx = -1;
  var layer = new Course();
  this.addChild(layer);
  director.replaceScene(this);
};
