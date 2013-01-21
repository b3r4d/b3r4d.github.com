
var CreationPhysics = cc.PhysicsSprite.extend({
        content:null,
        collision:null,
        collisionType: 1,
        density: 0.00014,
        mass:null,
        width:null,
        height:null,
        x: 0,
        y: 0,

    ctor: function(fileName) {
        this._super();

    },

    collide: function(source) {

        trace("show me the $$$ " + source);

    },
        
        initBody:function ( space) {

            this.height     = 40;
            this.width      = 80;

            this.mass       = 0.3 * this.density * this.width * this.height;
            var shape;

            //this.content    = new cp.Body( this.mass, cp.momentForBox( this.mass, 30, 96));
            //shape = new cp.BoxShape(this.content, 30, 96);

        var radius = 20;
        this.width = radius;
        this.content    = new cp.Body(10, cp.momentForCircle(10, 0, radius, cp.v(0, 0)));

        this.content.avatar = this;

        shape           = new cp.CircleShape( this.content, radius, cp.v(0, 0));

        space.addBody(this.content);

            shape.setFriction(1);

            shape.setElasticity(0.5);

            //shape.setCollisionType(COLGROOM);

            shape._node = this;

            this._shape = shape;

            space.addShape(shape);

            this.setBody(this.content);

            this.initWithFile( ghost );
            shape.setCollisionType(this.collisionType);

            //this.initBody(position);
}
});
        //CreationPhysics.create = function (position) {
        //var ret = new CreationPhysics();
       
        //return ret;
        //};