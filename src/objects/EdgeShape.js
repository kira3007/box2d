(function(box2d){
	box2d.EdgeShape = function(v1, v2){
		box2d.Shape.prototype.constructor.apply(this,arguments);
		
		this.type = box2d.Shape.e_edgeShape;
		//this.s_supportVec = new b2Vec2();
		
		this.prevEdge = null;
		this.nextEdge = null;
		this.vertex1 = v1;
		this.vertex2 = v2;
		var sub = this.vertex2.subVectors(this.vertex1);
		this.length = sub.length();
		this.direction = sub.normalize();
		
		this.normal = new box2d.Vector2(this.direction.y,-this.direction.x);
		
		this.core1 = this.vertex1.addVectors(this.normal.subVectors(this.direction).scalar(-box2d.Settings.toiSlop));
		this.core2 = this.vertex2.addVectors(this.normal.addVectors(this.direction).scalar(-box2d.Settings.toiSlop));
		this.cornerDir1 = this.normal;
		this.cornerDir2 = this.normal.clone().scalar(-1);
	};
	
	box2d.inherit(box2d.EdgeShape,box2d.Shape);
	
	box2d.EdgeShape.prototype = {
		constructor : box2d.EdgeShape,
		
		setPrevEdge : function(edge, core, corner, convex){
			this.prevEdge = edge;
			this.core1 = core;
			this.cornerDir1 = cornerDir;
			this.cornerConvex1 = convex;
		},
		SetNextEdge : function (edge, core, cornerDir, convex) {
			this.nextEdge = edge;
			this.core2 = core;
			this.cornerDir2 = cornerDir;
			this.cornerConvex2 = convex;
		},
		corner1IsConvex : function () {
			return this.cornerConvex1;
		},
		corner2IsConvex : function () {
			return this.cornerConvex2;
		},
		GetFirstVertex : function(transform){
			return this.core1.clone().applyTransform(transform);
		},
		testPoint : function (transform, p) {
			return false;
		},
		rayCast : function(output,input,transform){},
		
		computeAABB : function(aabb, transfrom){},
		
		computeMass: function(massData, density){},
		
		computeSubmergedArea : function(){},
		
		connectEdges : function(s1, s2, angle1){
		
		}
	};
})(box2d);