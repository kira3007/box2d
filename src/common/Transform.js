(function(box2d){
	box2d.transform = function(position, angle){
		this.position = position || new box2d.Vector2();
		this.rotateZ = new box2d.Matrix2().setFromAngle(angle);
	};
})(box2d);