// globals


var PLATFORM_JSB = 1 << 0;
var PLATFORM_HTML5 = 1 << 1;
var PLATFORM_ALL = PLATFORM_JSB | PLATFORM_HTML5;


var Cosmos = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        
        var director = null;
        var winSize = null;
        
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

