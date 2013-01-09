var ChipmunkBaseLayer = function() {



var parent = cc.base(this);
cc.associateWithNative( this, parent );
this.init( );

this.space = new cp.Space();

this.setupDebugNode();

this.initPhysics();
};

//subclass layer
cc.inherits(ChipmunkBaseLayer, cc.Layer );


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
	this.unscheduleUpdate();
};

ChipmunkBaseLayer.prototype.onRestartCallback = function (sender) {
    this.onCleanup();
};

ChipmunkBaseLayer.prototype.onNextCallback = function (sender) {
    this.onCleanup(); 
};

ChipmunkBaseLayer.prototype.onBackCallback = function (sender) {
    this.onCleanup();
};

// init physics
ChipmunkBaseLayer.prototype.initPhysics = function() {
	var staticBody =  this.space.staticBody;
                     var size = cc.Director.getInstance().getWinSize();
	// Walls
	var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v( size.width,0), 0 ),				// bottom
			new cp.SegmentShape( staticBody, cp.v(0, size.height), cp.v( size.width, size.height), 0),	// top
			new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0, size.height), 0),				// left
			new cp.SegmentShape( staticBody, cp.v( size.width,0), cp.v( size.width, size.height), 0)	// right
			];
	for( var i=0; i < walls.length; i++ ) {
		var shape = walls[i];
		shape.setElasticity(1);
		shape.setFriction(1);
		this.space.addStaticShape( shape );
	}

	// Gravity
	this.space.gravity = cp.v(0, -100);
};

ChipmunkBaseLayer.prototype.createPhysicsSprite = function( pos ) {
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

ChipmunkBaseLayer.prototype.addSprite = function( pos ) {
	var sprite =  this.createPhysicsSprite( pos );
	this.addChild( sprite );
};

ChipmunkBaseLayer.prototype.onEnter = function () {

	cc.base(this, 'onEnter');
                      var size = cc.Director.getInstance().getWinSize();
	this.scheduleUpdate();
	for(var i=0; i<10; i++) {
		this.addSprite( cp.v( size.width/2,  size.height/2) );
	}

   // if( 'touches' in sys.capabilities )
        this.setTouchEnabled(true);
    //else if( 'mouse' in sys.capabilities )
       // this.setMouseEnabled(true);
};

ChipmunkBaseLayer.prototype.update = function( delta ) {
	this.space.step( delta );
};

ChipmunkBaseLayer.prototype.onMouseDown = function( event ) {
	this.addSprite( event.getLocation() );
};

ChipmunkBaseLayer.prototype.onTouchesEnded = function( touches, event ) {
	var l = touches.length;
	for( var i=0; i < l; i++) {
		this.addSprite( touches[i].getLocation() );
	}
};

