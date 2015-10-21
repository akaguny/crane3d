function Arm(name,modules,AXIS){
    Particle.apply(this, arguments);
}

Arm.prototype = Object.create(Particle.prototype);

Arm.prototype.constructor = Arm;