(function(box2d){
    box2d.Matrix2 = function ( n11, n12, n21, n22 ){
        this.elements =  [  ] ; 
        this.set( n11, n12, n21, n22 );     
    }; 

    box2d.Matrix2.prototype = {
        constuctor : box2d.Matrix3, 

        set : function ( n11, n12, n21, n22 ) {
            var te = this.elements; 
            te[ 0 ] = n11 !== undefined ? n11 : 1, te[ 2 ] = n12||0;  
            te[ 1 ] = n21||0, te[ 3 ] = n22 !== undefined ? n22 : 1;  
            return this; 
        }, 
        setFromeAngle : function ( angle ) {
            angle  =  angle || 0;  
            var cos  =  Math.cos ( angle ), 
                sin  =  Math.sin ( angle ), 
                te  =  this.elements;   

            te[ 0 ] = cos; 
            te[ 1 ] = sin; 
            te[ 2 ] = - sin; 
            te[ 3 ] = cos; 

            return this; 
        }, 

        copy : function ( m ){
            var te = this.elements; 
            te[ 0 ] = m[ 0 ];  
            te[ 1 ] = m[ 1 ];  
            te[ 2 ] = m[ 2 ];  
            te[ 3 ] = m[ 3 ];  
            
            return this; 
        },  

        clone : function (  ) {
            var te = this.elements; 
            return new box2d.Matrix2 ( 
                        te[ 0 ], te[ 2 ], 
                        te[ 1 ], te[ 3 ]            
                    ) ;  
        }, 
        scalar : function ( s ) {
            var te = this.elements; 
            te[ 0 ] *= s; 
            te[ 1 ] *= s; 
            te[ 2 ] *= s; 
            te[ 3 ] *= s; 
            return this;  
        }, 
        getInverse : function (  ) {
            var m = this.clone (  ) , 
                te = m.elements;
                det = te[ 0 ] * te[ 3 ] - te[ 1 ] * te[ 2 ], tmp; 

            tmp = te[ 0 ]; 
            te[ 0 ] = te[ 3 ]; 
            te[ 3 ] = tmp; 
            tmp = te[ 1 ]; 
            te[ 1 ] =  - te[ 2 ]; 
            te[ 2 ] =  - te[ 1 ]; 

            return m.scalar ( 1.0 / det ) ; 
        }
    }; 
})(box2d); 
