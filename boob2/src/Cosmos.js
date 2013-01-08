var Cosmos = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.log("Awaking Paradolia");
        
        var course = new Course();
        this.addChild( course );
        course.init();
    }
});



