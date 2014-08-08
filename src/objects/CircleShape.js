(function(box2d){
	box2d.circleShape = function(){
		box2d.shape.prototype.constructor.apply(this,arguments);
		this.locPosition = new Vector2();
	};
	
	box2d.inherit(box2d.circleShape,box2d.shape);
	
	box2d.circleShape.prototype = {
		constructor : box2d.circleShape,
		
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

        rayCast : function(){}
        
        computeAABB : function(aabb, transform){
            var w = this.getWorldPosition(transform);  
            aabb.set(w, this.radius); 
            return this; 
        }, 

        computeMass : function(massData, density){
             
        }
	};
})(box2d);
