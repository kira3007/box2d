(function(box2d){
    box2d.ContactID = function(){
        this.features = new box2d.Features(); 
        this.features._id = this; 
    }

    box2d.ContactID.prototype = {
        constructor : box2d.ContactID, 

        set : function(id){ 
            this.setKey(id._key); 
            return this;  
        }, 

        clone : function(){
            var id = new box2d.ContactID(); 
            return id.set(this); 
        }, 

        getKey : function(){
            return this._key; 
        }, 

        setKey : function(value){
            this._key = value || 0; 
            this.features.setRefEdge( this._key & 0x000000ff );
            this.features.setIncEdge( ((this._key & 0x0000ff00) >> 8) & 0x000000ff );
            this.features.setIncVertex( ((this._key & 0x00ff0000) >> 16) & 0x000000ff );
            this.features.setFlip( ((this._key & 0xff000000) >> 24) & 0x000000ff );
            return this; 
        }
    }; 
})(box2d);
