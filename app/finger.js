function Finger(name,modules,AXISES,limits,numberOfParticle){
    Particle.apply(this, arguments);
    this.number = numberOfParticle;
}

Finger.prototype = Object.create(Particle.prototype);

Finger.prototype.constructor = Finger;

Finger.prototype.rotateFinger= function (axis,deg) {
    if (this.number % 2){
        this.rotate(axis, deg)
    }
    else{
        this.rotate(axis, -deg)
    }
};