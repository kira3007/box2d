var box2d = {}; 

(function(box2d){
    box2d.inherit = function(child, parent){
        function emptyFn(){}  
        
        emptyFn.prototype = parent.prototype; 
        child.prototype = new emptyFn(); 
        child.prototype.constructor = child; 
        child.prototype.__super = parent.prototype; 
    }
    box2d.is = function(a, b){
        if(!a || !b) return false; 

        return a instanceof b; 
    }
})(box2d); 
