(function(box2d){
    box2d.Vector2 = function ( x, y ) {
        this.x = x || 0;
        this.y = y || 0; 
    };

    box2d.Vector2.prototype = {
        constuctor : box2d.Vector2,

        set : function ( x, y ) {
            this.x = x || 0;
            this.y = y || 0; 
            return this; 
        },
        
        copy : function ( v ){ 
            this.x = v.x; 
            this.y = v.y;             

            return this; 
        }, 
        clone : function (  ) {
            return new box2d.Vector2 ( this.x, this.y ) ;   
        }, 
        nagate : function (  ) {
            this.x =  - this.x; 
            this.y =  - this.y; 
            return this; 
        }, 
        getNagate : function (  ) {
            return this.clone (  ) .nagate (  ) ; 
        }, 
        dot : function ( v ) {
            return this.x * v.x + this.y * v.y;  
        }, 
        add : function ( v ) {
            this.x += v.x; 
            this.y += v.y; 
            return this;     
        }, 
        addVectors : function( a, b ){
            this.x = a.x + b.x; 
            this.y = a.y + b.y;  
            return this; 
        }, 
        sub : function ( v ) {
            this.x -= v.x; 
            this.y -= v.y; 
            return this;  
        }, 
        subVectors : function ( a, b ) {
            this.x = a.x - b.x; 
            this.y = a.y - b.y; 
            return this; 
        }, 
        scalar : function ( s ) {
            this.x *= s; 
            this.y *= s; 
            return this;  
        }, 
        applyMatrix2 : function ( m ) {
            var x = this.x, 
                y = this.y, 
                e = m.elements;  

            this.x = e[ 0 ] * x + e[ 2 ] * y; 
            this.y = e[ 1 ] * x + e[ 3 ] * y; 
            return this; 
        }, 

        applyTransform : function ( xf ) {
            this.applyMatrix2 ( xf.rotateZ ).add ( xf.position );    
            return this; 
        }
                
    };
})(box2d);
