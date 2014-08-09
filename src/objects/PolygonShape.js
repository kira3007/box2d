(function(box2d){
	box2d.PolygonShape = function(){
		box2d.Shape.prototype.constructor.apply(this,arguments);
		this.vertices = [];
	};
	
	box2d.inherit(box2d.PolygonShape,box2d.Shape);
	
	box2d.PolygonShape.prototype = {
		constructor : box2d.PolygonShape,
		
		clone : function(){
			return new box2d.PolygonShape().set(this);
		},
		
		set : function(other){
			this.__super.set.call(this,other);
			
			if(box2d.is(other,box2d.PolygonShape)){
				this.centroid.set(other.centroid);
				
				for (var i = 0; i < other.vertices.length; i++) {
					this.vertices[i]set(other.vertices[i]);
					this.normals[i].set(other.normals[i]);
				}
			}
			return this;
		},
		
		setAsArray : function(vertices){
			var _this = this;
			box2d.Settings.assert(2 <= vertices.length);
			
			box2d.each(vertices,function(index,item){
				_this.vertices[index].set(item);
			});
			
			box2d.each(vertices,function(index,item){
				var next = (index + 1) % vertices.length,
					edge = vertices[next].subVectors(vertices[index]);
				
				this.normals[index].set(edge.getNormal()).normalize();
			});
			this.centeroid = this.computeCentroid();
			return this;
		},
		setAsBox : function(width, height){
			width = width || 0;
			height = height || 0;
			
			var halfWidth = width / 2.0,
				halfHeight = height /2.0;
			
			var x = [-halfWidth, halfWidth],
				y = [-halfHeight, halfHeight];
			
			var vertices=[];
			box2d.each(y, function(_,_y){
				box2d.each(x, function(_,_x){
					vertices.push(new box2d.Vector2(_x, _y));
				});
			});
			
			this.setAsArray(vertices);
			return this;
		},
		setAsOrientedBox : function(width, height, center, angle){
			this.setAsBox(width, height);
			this.centroid = center;
			var xf = new box2d.Transform(center,angle||0.0);
			
			for(var i = 0,len = this.vertices.length;i<len;i++){
				this.vertices[i].applyMatrix2(xf.rotateZ);
				this.normals[i].applyMatrix2(xf.rotateZ);
			}
			return this;
		},
		setAsEdge : function(v1, v2){
			this.vertices[0].set(v1);
			this.vertices[1].set(v2);
			this.centroid = v1.addVectors(v2).scalar(0.5);
			this.normals[0] = v2.subVectors(v1).getNormal().normalize();
			this.normals[1] = this.normals[0].clone().scalar(-1);
			return this;
		},
		computeCentroid : function(){
			var _this = this,
				area = 0.0,
				center = new box2d.Vector2();
			
			box2d.each(this.vertices,function(i,item){
				var next = (index + 1) % this.vertices.length,
					origin = new box2d.Vector2(),//(0,0)
					edge1 = item.subVectors(origin),
					edge2 = _this.vertices.subVectors(origin),
					triangleArea = 0.5 * edge1.cross(edge2),
					triangleCenter = origin
									.add(item)
									.add(_this.vertices)
									.scalar(triangleArea * 1.0 / 3.0);
					
				area += triangleArea;
				center.add(triangleCenter)
			});
			return center.scalar(1.0 / area);
		},
	};
})(box2d);