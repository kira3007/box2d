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
			var d1X = other.lowerBound.x - this.upperBound.x;
      var d1Y = other.lowerBound.y - this.upperBound.y;
      var d2X = this.lowerBound.x - other.upperBound.x;
      var d2Y = this.lowerBound.y - other.upperBound.y;
      if (d1X > 0.0 || d1Y > 0.0) return false;
      if (d2X > 0.0 || d2Y > 0.0) return false;
      return true;
        }, 

        combine : function ( a, b ) {
			this.lowerBound.set(a.lowerBound.min(b.lowerBound));
			this.upperBound.set(a.upperBound.max(b.upperBound));
			return this;
		}
    }; 
})(box2d) ;  
