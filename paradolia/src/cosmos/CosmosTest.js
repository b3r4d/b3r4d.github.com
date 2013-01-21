var Cosmos = cc.Class.extend({
     source:null,
     control:null,
     content:null,

ctor: function( ) {
this._super();
Object.defineProperty( this, "creationList", { get:getCreationList(), set:setCreationList() });
this.source = new CosmosCore;
var parent = cc.base(this);
cc.associateWithNative(this, parent);
this.source.space = new cp.Space();

 },
    
//GETTERS AND SETTERS BEGIN
getCreationList:function(){
        
},
         
setCreationList:function(){
        
},

//PUBLIC FUNCTIONS
load:function(){
         
},

execute:function(){
         
} ,

awake:function(){
         
},

destroy:function(){
     
 },
 
appear:function(){
          
 } ,

addAvatar:function ( ){

},

removeAvatar:function(){
     
}

});