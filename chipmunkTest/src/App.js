
var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {
       
        cc.log("vortex");
        var scene = new ChipmunkTestScene;
        scene.runThisTest();
        //this._super();
        // var size = cc.Director.getInstance().getWinSize();

        //var lazyLayer = new cc.LazyLayer();
        //this.addChild(lazyLayer);
        
        //var layer1 = cc.LayerColor.create(new cc.Color4B(255, 255, 255, 255),  size.width,   size.height);
        //layer1.setAnchorPoint(new cc.Point(0.5,0.5));

        //this.sprite = cc.Sprite.create(  test2 );
        //this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        //this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
               
        //this.helloLabel = cc.LabelTTF.create("Battle For Boobland 2", "Arial", 24);
        //this.helloLabel.setColor( 255,0,255,255  );
        // position the label on the center of the screen
        //this.helloLabel.setPosition(cc.p(size.width / 2, size.height / 2 -  75));
        // add the label as a child to this layer
     
        //lazyLayer.addChild(  layer1  );
        //lazyLayer.addChild(this.helloLabel, 5);
        //lazyLayer.addChild(this.sprite, 0);

        //return true;
    }

});

var App = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
