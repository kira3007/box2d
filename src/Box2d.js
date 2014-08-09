var box2d = {}; 

(function(box2d){
    box2d.inherit = function(child, parent){
        function emptyFn(){}  
        
        emptyFn.prototype = parent.prototype; 
        child.prototype = new emptyFn(); 
        child.prototype.constructor = child; 
        child.prototype.__super = parent.prototype; 
    };
    box2d.is = function(a, b){
        if(!a || !b) return false; 

        return a instanceof b; 
    };
	box2d.each = function(obj,callback){
		var i = 0;
		for(var p in arr){
			callback.apply(p,[i,p]);
			++i;
		}
	};
})(box2d); 
