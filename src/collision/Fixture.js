(function(box2d){
    box2d.FilterData = function(){
        this.categoryBits = 0x0001;  
        this.maskBits = 0xFFFF; 
        this.groupIndex = 0; 
    }; 

    box2d.FilterData.prototype.clone = function(){
        var copy = new box2d.FilterData(); 
        copy.categoryBits = this.categoryBits; 
        copy.maskBits = this.maskBits; 
        copy.groupIndex = this.groupIndex;  
        return copy; 
    }; 

    var FilterData = box2d.FilterData, 
        AABB = box2d.AABB; 

    box2d.Fixture = function(){
        this.filter = new FilterData(); 
        this.aabb = new AABB();
        this.userData = null;
        this.body = null;
        this.next = null;
        this.shape = null;
        this.density = 0.0;
        this.friction = 0.0;
        this.restitution = 0.0;
    }; 

    box2d.Fixture.prototype = {
        constructor : box2d.Fixture, 

        getType : function(){
            return this.shape.type;  
        }, 
        
        setSensor : function(sensor){
            if(this.isSensor == sensor) return;  

            this.isSensor = sensor; 

            if(!this.body) return; 

            var edge = this.body.getContactList(), 
                contact, fixtureA, fixtureB; 

            while(edge){
                contact = edge.contact; 
                fixtureA = contact.getFixtureA();  
                fixtureB = contact.getFixtureB();  
                if (fixtureA == this || fixtureB == this) contact.setSensor(fixtureA.isSensor() || fixtureB.isSensor());
                edge = edge.next; 
            }

            return this; 
        }, 
        isSensor : function () {
            return this.isSensor;
        }, 
        setFilterData : function (filter) {
            this.filter = filter.clone();
            if (this.body) return;

            var edge = this.body.getContactList(), 
                contact, fixtureA, fixtureB; 

            while (edge) {
                contact = edge.contact;
                fixtureA = contact.GetFixtureA();
                fixtureB = contact.GetFixtureB();
                if (fixtureA == this || fixtureB == this) contact.flagForFiltering();
                edge = edge.next;
            }
            return this; 
        }, 
        getFilterData : function () {
            return this.filter.clone();
        }, 

        testPoint : function (p) {
            return this.shape.testPoint(this.body.getTransform(), p);
        }, 
        rayCast : function (output, input) {
            return this.shape.rayCast(output, input, this.body.getTransform());
        }, 
        getMassData : function (massData) {
            return this.shape.computeMass(this.density);
        }, 
        setDensity : function (density) {
            this.density = density || 0;
            return this; 
        }, 
        setFriction : function (friction) {
            this.friction = friction || 0;
            return this; 
        }, 

        SetRestitution : function (restitution) {
            this.restitution = restitution || 0;
            return this; 
        }, 

        create = function (body, xf, def) {
            this.userData = def.userData;
            this.friction = def.friction;
            this.restitution = def.restitution;
            this.body = body;
            this.next = null;
            this.filter = def.filter.clone();
            this.isSensor = def.isSensor;
            this.shape = def.shape.clone();
            this.density = def.density;
            return this; 
        }, 
        createProxy : function (broadPhase, xf) {
            this.aabb.set(this.shape.computeAABB(xf));
            this.proxy = broadPhase.createProxy(this.aabb, this);
            return this; 
        }, 
        synchronize : function (broadPhase, transform1, transform2) {
            if (!this.proxy) return;
            var aabb1 = this.shape.computeAABB(transform1);
            var aabb2 = this.shape.computeAABB(transform2);
            this.aabb.combine(aabb1, aabb2);
            var displacement = transform2.position.subVectors( transform1.position );
            broadPhase.MoveProxy(this.proxy, this.aabb, displacement);
            return this; 
        } 
    }; 

    box2d.FixtureDef = function(){
        this.filter = new FilterData();
        this.shape = null;
        this.userData = null;
        this.friction = 0.2;
        this.restitution = 0.0;
        this.density = 0.0;
        this.filter.categoryBits = 0x0001;
        this.filter.maskBits = 0xFFFF;
        this.filter.groupIndex = 0;
        this.isSensor = false;
    }; 

})(box2d); 
