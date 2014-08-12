(function(box2d){
    box2d.ManifoldPoint = function(){
        this.localPoint = new box2d.Vector2();  
        this.id = new box2d.ContactID(); 
        this.reset(); 
    }; 

    box2d.ManifoldPoint.prototype = {
        constructor : box2d.ManifoldPoint, 

        reset : function(){
            this.localPoint.setZero(); 
            this.normalImpulse = 0.0; 
            this.tangentImpulse = 0.0; 
            this.id.setKey();  
            return this; 
        }, 

        set : function(m){
            this.localPoint.set(m.localPoint); 
            this.normalImpulse = m.normalImpulse; 
            this.tangentImpulse = m.tangentImpulse; 
            this.id.set(m.id); 
            return this; 
        }
    }; 
})(box2d);
