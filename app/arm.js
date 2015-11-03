function Arm(name,modules,AXISES,limits){
    Particle.apply(this, arguments);
}

Arm.prototype = Object.create(Particle.prototype);

Arm.prototype.constructor = Arm;