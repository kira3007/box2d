(function(box2d){
	box2d.circleShape = function(){
		box2d.shape.prototype.constructor.apply(this,arguments);
		this.locPosition = new Vector2();
	};
	
	box2d.inherit(box2d.circleShape,box2d.shape);
	
	box2d.circleShape.prototype = {
		constructor : box2d.circleShape,
		
		set : function(){},
	};
})(box2d);