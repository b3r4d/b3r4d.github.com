//Controller stuff
var LINE_SPACE = 40;
var curPos = cc.p(0,0);

var Title = cc.LayerGradient.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerGradient );
        // this.init( cc.c4b(0,0,0,255), cc.c4b(98,99,117,255), cc.p(-1,-1));
        this.init( cc.c4b(0,0,0,255), cc.c4b(0x46,0x82,0xB4,255));

        // globals
        director = cc.Director.getInstance();
        winSize = director.getWinSize();

        this._itemMenu = cc.Menu.create();
    },
    onEnter:function(){
        this._super();
        var pos = this._itemMenu.getPosition();
        this._itemMenu.setPosition(pos.x, Title.YOffset);

        //real place
        var scene = new SpriteTestScene();
        //var scene = new  Paradolia(); //POPPED an ERROR HERE
        
        cc.log( scene );
        
        if (scene) {
            scene.awake();
        }
    },
    onMenuCallback:function (sender) {
        Title.YOffset = this._itemMenu.getPosition().y;
        var idx = sender.getZOrder() - 10000;
        var scene = testNames[idx].testScene();
        if (scene) {
            scene.runThisTest();
        }
    },
    onCloseCallback:function () {
        history.go(-1);
    },

    onTouchesMoved:function (touches, event) {
        var delta = touches[0].getDelta();
        this.moveMenu(delta);
        return true;
    },

    onMouseDragged : function( event ) {
        var delta = event.getDelta();
        this.moveMenu(delta);
        return true;
    },
    onScrollWheel:function(event){
        var delta = event.getWheelDelta();
        this.moveMenu({y:-delta});
        console.log(1);
        return true;
    },
    moveMenu:function(delta) {
        var current = this._itemMenu.getPosition();

        var newY = current.y + delta.y;

        if (newY < 0 )
            newY = 0;

        if( newY > ((testNames.length + 1) * LINE_SPACE - winSize.height))
            newY = ((testNames.length + 1) * LINE_SPACE - winSize.height);

        this._itemMenu.setPosition(current.x, newY);
    }
});

Title.YOffset = 0;
var testNames = [
    {
        //RIGHT HERE HERE HERE
        title:"Level ONE",
        testScene:function () {
            //return new Paradolia();
            return new SpriteTestScene();
        }
    }
];