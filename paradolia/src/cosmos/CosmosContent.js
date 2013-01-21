var CosmosContent = cc.Scene.extend({
    core: null,
    control: null,

    debugNode: null,
    layer: null,

    ctor: function( ) {
        this._super();
        this.layer = cc.Layer.create();
    },
    setup:function(){
        this.setupDebugNode();
        this.layer.remainder = 0;
        this.layer.scheduleUpdate();

        var space = this.core.space;
        space.iterations = 30;
        space.gravity = cp.v(this.core.gravityH, this.core.gravityV);
        space.sleepTimeThreshold = 0.5;
        space.collisionSlop = 0.5;

        this.core.cameraY = this.layer.getPositionY();
        this.core.cameraX = this.layer.setPositionX();
    },
    awake: function(core, control) {
        this.core = core;
        this.control = control;
    },
    appear: function() {},
    update: function(dt) {
        var steps = 3;
        dt /= steps;
        for (var i = 0; i < 3; i++)
        {
            this.core.space.step(dt);
        }
    },
    execute: function() {},
    setupDebugNode: function() {
        this.debugNode = cc.PhysicsDebugNode.create(this.core.space);
        this.debugNode.setVisible(false);
        this.layer.addChild(this.debugNode);
    },
    onToggleDebug: function() {
        var state = this._debugNode.isVisible();
        this._debugNode.setVisible(!state);
    }

});
