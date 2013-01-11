var Creation = function( ) 
{
  
   this.width = 40.0;
   this.height = this.width*2;
   this.position = null;
  
   this.physics = null;
   this.mass = null;
   this.moment = null;
   this.content = null;
   this.friction = null;
   this.velocity = null;
   this.angleVelocity = null;
                     
};

cc.inherits( Creation, cc.Class );

Creation.prototype.addPhysics = function ( physics )
{
   this.physics = physics;
   
   if ( this.mass === null ) return null;
   if (this.moment === null)return null;
   
    this.content =  new  this.physics.Body( this.mass,  this.moment ) ;
    return this.content;
};

