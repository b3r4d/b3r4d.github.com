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

        // add close menu
      //  var closeItem = cc.MenuItemImage.create(s_pathClose, s_pathClose, this.onCloseCallback, this);
        //var menu = cc.Menu.create(closeItem);//pmenu is just a holder for the close button
       // menu.setPosition(0,0);
       // closeItem.setPosition(winSize.width - 30, winSize.height - 30);

        // add menu items for tests
        this._itemMenu = cc.Menu.create();//item menu is where all the label goes, and the one gets scrolled

//        for (var i = 0, len = testNames.length; i < len; i++) {
//            var label = cc.LabelTTF.create(testNames[i].title, "Arial", 24);
  //          var menuItem = cc.MenuItemLabel.create(label, this.onMenuCallback, this);
    //        this._itemMenu.addChild(menuItem, i + 10000);
      //      menuItem.setPosition(winSize.width / 2, (winSize.height - (i + 1) * LINE_SPACE));

            // enable disable
         //   if (cc.config.platform == 'browser') {
          //      menuItem.setEnabled( testNames[i].platforms & PLATFORM_HTML5 );
          //  } else { /* jsb */
         //       menuItem.setEnabled( testNames[i].platforms & PLATFORM_JSB );
          //  }
       // }

        //this._itemMenu.setContentSize(cc.size(winSize.width, (testNames.length + 1) * LINE_SPACE));
        //this._itemMenu.setPosition(curPos);
       // this.addChild(this._itemMenu);
     //  this.addChild(menu, 1);

        // 'browser' can use touches or mouse.
        // The benefit of using 'touches' in a browser, is that it works both with mouse events or touches events
    //    var t = cc.config.platform;
     //   if( t == 'browser' || t == 'mobile')  {
     //       this.setTouchEnabled(true);
      //  } else if( t == 'desktop' ) {
       //     this.setMouseEnabled(true);
       // }
    },
    onEnter:function(){
        this._super();
        var pos = this._itemMenu.getPosition();
        this._itemMenu.setPosition(pos.x, Title.YOffset);
        var scene = new  ChipmunkTestScene();
        
        cc.log( scene );
        
        if (scene) {
            scene.runThisTest();
        }
    },
    onMenuCallback:function (sender) {
        Title.YOffset = this._itemMenu.getPosition().y;
        var idx = sender.getZOrder() - 10000;
        // get the userdata, it's the index of the menu item clicked
        // create the test scene and run it
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
        title:"Level ONE",
       // platforms: PLATFORM_ALL,
        testScene:function () {
            return new  ChipmunkTestScene();
        }
    }
    //"UserDefaultTest",
    //"ZwoptexTest",
];