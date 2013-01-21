var CosmosCore = cc.Class.extend({
    self:       null,
    height:     null,
    width:      null,
    director:   null,
    space:      null,
    gravityH:   0,
    gravityW:   0,
    cameraX:    0,
    cameraY:    0,
    avatars:    {},
    avatarList: [],


    ctor: function( ) {
        this._super();
    }

});