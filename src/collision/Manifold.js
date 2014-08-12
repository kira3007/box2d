(function(box2d){
    var Settings = box2d.Settings, 
        ManifoldPoint = box2d.ManifoldPoint, 
        Vector2 = box2d.Vector2; 

    box2d.Manifold = function(){
        this.pointCount = 0;  
        this.points = []; 
        for(var i = 0, len = Settings.maxManifoldPoints; i<len; i++ ){
            this.points[i] = new ManifoldPoint(); 
        }

        this.localPlaneNormal = new Vector2(); 
        this.localPoint = new Vector2(); 
    }; 

    box2d.Manifold.e_circle = 0x0001; 
    box2d.Manifold.e_faceA = 0x0002; 
    box2d.Manifold.e_faceB = 0x0004; 

    box2d.Manifold.prototype = {
        constructor : box2d.Manifold, 

        reset : function(){
            box2d.each(this.points, function(_, point){
                if(box2d.is(point, ManifoldPoint)){
                    point.reset();  
                } 
            }); 

            this.localPlaneNormal.setZero(); 
            this.localPoint.setZero(); 
            this.type = 0; 
            this.pointCount = 0; 
            return this; 
        }, 

        set : function(m){
            this.pointCount = m.pointCount; 
             
            box2d.each(this.points, function(i, point){
                if(box2d.is(point, ManifoldPoint)){
                    point.set(m.points[i]); 
                } 
            }); 

            this.localPlaneNormal.set(m.localPlaneNormal); 
            this.localPoint.set(m.localPoint); 
            this.type = m.type; 
            return this; 
        }, 

        clone : function(){
            return new box2d.Manifold().set(this);  
        }
    }; 
})(box2d);
