(function(box2d){
	box2d.Features = function(){};
	
	box2d.Features.prototype = {
		getRefEdge : function(){
			return this._referenceEdge;
		},
		setRefEdge : function(value){
			this._referenceEdge = value || 0;
			this._id._key = (this._id._key & 0xffffff00) | (this._referenceEdge & 0x000000ff);
			return this;
		},
		getIncEdge : function(){
			return this._incidentEdge;
		},
		setIncEdge : function(value){
			this._incidentEdge = value || 0;
			this._id._key = (this._id._key & 0xffff00ff) | ((this._incidentEdge << 8) & 0x0000ff00);
			return this;
		},
		getIncVertex : function(){
			return this._incidentVertex;
		},
		setIncVertex : function(value){
			this._incidentVertex = value || 0;
			this._id._key = (this._id._key & 0xff00ffff) | ((this._incidentVertex << 16) & 0x00ff0000);
			return this;
		},
		getFlip : function(){
			return this._flip;
		},
		setFlip : function(value){
			this._flip = value || 0;
			this._id._key = (this._id._key & 0x00ffffff) | ((this._flip << 24) & 0xff000000);
			return this;
		}
	};
})(box2d);
