(function(box2d){
	box2d.shape = function(){};
	
	box2d.shape.prototype = {
		constructor : box2d.shape,
		
		copy : function(){},
		
		set : function(other){
			this.radius = other.radius;
		},
		
		getType : function(){
			return this.type;
		},
		
		testPoint = function (xf, p) {
			return false;
		}
	};
})(box2d);