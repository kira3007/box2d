(function (box2d) { 
    box2d.AABB = function (  ) {
        this.lowerBound = new Vector2 (  ) ;   
        this.upperBound = new Vector2 (  ) ;   
    }; 

    box2d.AABB.prototype = {
        constuctor : box2d.AABB, 

        isValid : function (  ) {
            var dx = new Vector2().subVectors (this.upperBound, this.lowerBound ); 

            var valid  =  dx.x >= 0 && dx.y >= 0; 
            return valid && this.lowerBound.isValid (  ) && this.upperBound.isValid (  ) ; 
        }, 
        
        getCenter : function (  ) {
           return new Vector2(  ).addVectors( this.lowerBound, this.upperBound ).scalar( 0.5 );   
        }, 

        getExtents : function (  ) {
            return new Vector2().subVectors (this.upperBound, this.lowerBound ).scalar( 0.5 ); 
        }, 

        contains : function ( aabb ) {
            return this.lowerBound.x <= aabb.lowerBound.x && 
                   this.lowerBound.y <= aabb.lowerBound.y && 
                   aabb.upperBound.x <= this.upperBound.x && 
                   aabb.upperBound.y <= this.upperBound.y 
        }, 

        rayCast : function (  ) {}, 

        testOverlap : function ( aabb ) {

        }, 

        combine : function (  ) {}
    }; 
})(box2d) ;  
