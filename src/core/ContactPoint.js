(function(box2d){
    var Vector2 = box2d.Vector2; 
    box2d.ContactPoint = function(){
        this.position = new Vector2();  
        this.velocity = new Vector2();  
        this.normal = new Vector2();  
        this.id = new box2d.ContactID(); 
    };
})(box2d); 
