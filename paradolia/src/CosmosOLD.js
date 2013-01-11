var Cosmos = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.log("Awaking Paradolia");
        
        var course = new ChipmunkBaseLayer();
        this.addChild( course );
        course.init();
    }
});



