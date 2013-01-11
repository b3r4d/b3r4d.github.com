// globals ( i dont like this at all )
var director = null;
var winSize = null;

var Course = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        cc.associateWithNative( this, cc.Scene );
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
      
    },
    
    //how you switch betweens courses
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