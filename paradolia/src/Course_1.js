

var ChipmunkSprite = function() {
        
        var gravityVert = -100;
        var gravityHorz = 0;
	
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
       
	var staticBody = space.staticBody;

	// Walls
	var walls = [   new cp.SegmentShape( staticBody, cp.v(0,0),     cp.v( 666,0),       0),	// bottom
                        new cp.SegmentShape( staticBody, cp.v(0, 666),  cp.v( 666, 666),    0),	// top
			new cp.SegmentShape( staticBody, cp.v(0,0),     cp.v(0, 666 ),      0),	// left
			new cp.SegmentShape( staticBody, cp.v( 666,0),  cp.v( 666, 666),    0)	// right
			];
                    
	for( var i=0; i < walls.length; i++ ) {
		var shape = walls[i];
		shape.setElasticity(1);
		shape.setFriction(1);
		space.addStaticShape( shape );
	}

	// Gravity
        cc.log( this.gravityVert );
	space.gravity = cp.v( 0, this.gravityVert );    
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






