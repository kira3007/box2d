(function(box2d){
	box2d.CircleShape = function(radius){
		arguments[0] = arguments[0]||0;
		
		box2d.Shape.prototype.constructor.apply(this,arguments);
		this.locPosition = new Vector2();
		this.type = box2d.shape.e_circleShape;
		this.radius = radius;
	};
	
	box2d.inherit(box2d.CircleShape,box2d.Shape);
	
	box2d.CircleShape.prototype = {
		constructor : box2d.CircleShape,
		
		set : function(other){
            this.__super.set.call(this, other); 

            if(box2d.is(other, box2d.shape)){
                this.locPosition.set(other.locPosition); 
            }
            return this; 
        },

        testPoint : function(transform, p){
            var d = this.getWorldPosition(transform).sub(p); 

            return d.lengthSq <= this.radius * this.radius; 
        }, 

        rayCast : function(output,input,transform){
			var w = this.getWorldPosition(transform),
				p1_w = input.p1.subVectors(w),
				tangentLengthSq = p1_w.lengthSq() - this.radius * this.radius,
				raySegment = input.p2.subVectors(input.p1),
				c = raySegment.dot(p1_w),
				raySegmentLengthSq = raySegment.lengthSq(),
				sigma = c * c - raySegmentLengthSq * tangentLengthSq;
				
			if(sigma < 0.0 || raySegmentLengthSq < Number.MIN_VALUE) return false;
			
			var a = -(c + Math.sqrt(sigma));
			if(0.0 <= a && a <= input.maxFraction * raySegmentLengthSq){
				a /= raySegmentLengthSq;
				output.fraction = a;
				output.normal.set(p1_w.add(raySegment.scale(a))).normalize();
				return true;
			}
			return false;
		},
        
        computeAABB : function(transform){
            var w = this.getWorldPosition(transform);  
            return new box2d.AABB().set(w, this.radius); 
        }, 

        computeMass : function(massData, density){
             
        },
		
		computeSubmergedArea : function(){},
		
		
	};
})(box2d);
