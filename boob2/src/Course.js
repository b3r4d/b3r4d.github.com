var Course = cc.Layer.extend({
    isMouseDown:false,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {
       
    //var parent = cc.base(this);
    //cc.associateWithNative( this, parent );
    //this.init( cc.c4b(0,0,0,255), cc.c4b(98*0.5,99*0.5,117*0.5,255) );
       
    this.space = new cp.Space();
    this.setupDebugNode();
    cc.log("init");
      
     return true;
    },

    setupDebugNode:function()
    {
    // debug only
	this._debugNode = cc.PhysicsDebugNode.create( this.space );
	this._debugNode.setVisible( false );
	this.addChild( this._debugNode );
    },

    onToggleDebug = function(sender) {
    var state = this._debugNode.isVisible();
    this._debugNode.setVisible( !state );
    },

//
// Instance 'base' methods
// XXX: Should be defined after "cc.inherits"
//
onEnter = function() {
    cc.base(this, 'onEnter');
},

onCleanup = function() {
	// Not compulsory, but recommended: cleanup the scene
	this.unscheduleUpdate();
},

onRestartCallback = function (sender) {
	this.onCleanup();
    var s = new ChipmunkTestScene();
    s.addChild(restartChipmunkTest());
    director.replaceScene(s);
},

onNextCallback = function (sender) {
	this.onCleanup();
    var s = new ChipmunkTestScene();
    s.addChild(nextChipmunkTest());
    director.replaceScene(s);
},

onBackCallback = function (sender) {
    this.onCleanup();
    var s = new ChipmunkTestScene();
    s.addChild(previousChipmunkTest());
    director.replaceScene(s);
}



});
