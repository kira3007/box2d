(function(box2d){
    box2d.Vector2 = function ( x, y ) {
        this.x = x || 0;
        this.y = y || 0; 
    };

    box2d.Vector2.prototype = {
        constuctor : box2d.Vector2,

        set : function ( x, y ) {
            this.x = x || 0;
            this.y = y || 0; 
            return this; 
        },
        
		setZero : function(){
			this.x = this.y = 0;
			return this;
		},
        copy : function ( v ){ 
            this.x = v.x; 
            this.y = v.y;             

            return this; 
        }, 
        clone : function (  ) {
            return new box2d.Vector2 ( this.x, this.y ) ;   
        }, 
        nagate : function (  ) {
            this.x =  - this.x; 
            this.y =  - this.y; 
            return this; 
        }, 
        getNagate : function (  ) {
            return this.clone (  ) .nagate (  ) ; 
        }, 
        dot : function ( v ) {
            return this.x * v.x + this.y * v.y;  
        },
		cross : function( v ){
			return this.x * v.y - this.y * v.x;
		},
        add : function ( v ) {
            this.x += v.x; 
            this.y += v.y; 
            return this;     
        }, 
        addVectors : function( a ){
            //this.x = a.x + b.x; 
            //this.y = a.y + b.y;  
            return new box2d.Vector2(this.x + a.x, this.y + a.y); 
        }, 
        sub : function ( v ) {
            this.x -= v.x; 
            this.y -= v.y; 
            return this;  
        }, 
        subVectors : function ( a ) {
            //this.x = a.x - b.x; 
            //this.y = a.y - b.y; 
            return new box2d.Vector2(this.x - a.x, this.y - a.y); 
        }, 
        scalar : function ( s ) {
            this.x *= s; 
            this.y *= s; 
            return this;  
        }, 
		getNormal : function(){
			return new box2d.Vector2(this.y, -1 * this.x);
		},
		min: function ( v ) {

            if ( this.x > v.x ) {

                this.x = v.x;

            }

            if ( this.y > v.y ) {

                this.y = v.y;

            }

            return this;

        },

        max: function ( v ) {

            if ( this.x < v.x ) {

                this.x = v.x;

            }

            if ( this.y < v.y ) {

                this.y = v.y;

            }

            return this;

        },
        clamp: function ( min, max ) {

            // This function assumes min < max, if this assumption isn't true it will not operate correctly

            if ( this.x < min.x ) {

                this.x = min.x;

            } else if ( this.x > max.x ) {

                this.x = max.x;

            }

            if ( this.y < min.y ) {

                this.y = min.y;

            } else if ( this.y > max.y ) {

                this.y = max.y;

            }

            return this;
        },
        lengthSq: function () {

            return this.x * this.x + this.y * this.y;

        },

        length: function () {

            return Math.sqrt( this.lengthSq() );

        },

        normalize: function () {

            return this.scalar( 1 / this.length() );

        },

        distanceTo: function ( v ) {

            return Math.sqrt( this.distanceToSquared( v ) );

        },

        distanceToSquared: function ( v ) {

            var dx = this.x - v.x, dy = this.y - v.y;
            return dx * dx + dy * dy;

        },
        applyMatrix2 : function ( m ) {
            var x = this.x, 
                y = this.y, 
                e = m.elements;  

            this.x = e[ 0 ] * x + e[ 2 ] * y; 
            this.y = e[ 1 ] * x + e[ 3 ] * y; 
            return this; 
        }, 

        applyTransform : function ( xf ) {
            this.applyMatrix2 ( xf.rotateZ ).add ( xf.position );    
            return this; 
        }
                
    };
})(box2d);
