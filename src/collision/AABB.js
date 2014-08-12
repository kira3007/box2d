(function (box2d) { 
    box2d.AABB = function (  ) {
        this.lowerBound = new Vector2 (  ) ;   
        this.upperBound = new Vector2 (  ) ;   
    }; 

    box2d.AABB.prototype = {
        constuctor : box2d.AABB, 

        isValid : function (  ) {
            var dx = this.upperBound.subVectors ( this.lowerBound ); 

            var valid  =  dx.x >= 0 && dx.y >= 0; 
            return valid && this.lowerBound.isValid (  ) && this.upperBound.isValid (  ) ; 
        }, 
        
        set : function(center, radius){
            if(radius){
                this.lowerBound.set(center.x - radius, center.y - radius); 
                this.upperBound.set(center.x + radius, center.y + radius); 
            }else{
                this.lowerBound = center.lowerBound.clone(); 
                this.upperBound = center.upperBound.clone();  
            }
            return this; 
        }
        getCenter : function (  ) {
           return this.lowerBound.addVectors( this.upperBound ).scalar( 0.5 );   
        }, 

        getExtents : function (  ) {
            return this.upperBound.subVectors( this.lowerBound ).scalar( 0.5 ); 
        }, 
        extension : function(dx, dy){
            this.lowerBound.x -= dx; 
            this.lowerBound.y -= dy; 
            this.upperBound.x += dx; 
            this.upperBound.y += dy;  
            return this; 
        }, 

        contains : function ( aabb ) {
            return this.lowerBound.x <= aabb.lowerBound.x && 
                   this.lowerBound.y <= aabb.lowerBound.y && 
                   aabb.upperBound.x <= this.upperBound.x && 
                   aabb.upperBound.y <= this.upperBound.y 
        }, 

        rayCast : function (input,output) {
			var tmin = -Number.MAX_VALUE,
				tmax = Number.MAX_VALUE,
				start = input.p1,
				d = input.p2.subVectors(input.p1);
			
			//var output = new box2d.output();
			var prop = ['x','y'];
			for(var i = 0,len=prop.length;i<len;i++){
				var p = prop[i];
				if(Math.abs(d[p]) < Number.MIN_VALUE){
					if(start[p] < this.lowerBound[p] || this.uppperBound[p] < start[p]) return false;					
				}else{
					var inv_d = 1.0 / d[p];
					var t1 = (this.lowerBound[p] - start[p]) * inv_d;
					var t2 = (this.upperBound[p] - start[p]) * inv_d;
					var s = -1.0, t=0;
					
					if(t1 > t2) {
						t = t1,t1=t2,t2=t;
						s = 1.0;
					}
					
					if(t1 > tmin) {
						output.normal.setZero()[p] = s;
						tmin = t1;
					}
					
					tmax = Math.min(tmax,t2);
					if(tmin > tmax) return false;
				}
			}
			
			output.fraction = tmin;
			return true;
		}, 

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
