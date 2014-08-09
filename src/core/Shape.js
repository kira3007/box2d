(function(box2d){
	box2d.Shape = function(){};
	
	box2d.Shape.prototype = {
		constructor : box2d.Shape,
		
		copy : function(){},
		
		set : function(other){
			this.radius = other.radius;
		},
		
		getType : function(){
			return this.type;
		},
		
		testPoint : function (xf, p) {
			return false;
		}, 

        getWorldPosition : function(transform, point){ 
			point = point || this.locPosition;
            return this.locPosition.clone().applyTransform(transform);  
        },
		getLocalPosition : function(transform, point){
			if(!point) return this.locPosition;
			
			return this.point
					   .clone
					   .sub(transform.position)
					   .applyMatrix(transform.rotateZ.getInverse());
		}
	};
})(box2d);
