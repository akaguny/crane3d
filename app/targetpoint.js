/**
 * Created by alexey on 01.12.15.
 */
function TargetPoint(name,modules,AXISES,limits){
    Particle.apply(this, arguments);
}

TargetPoint.prototype = Object.create(Particle.prototype);

TargetPoint.prototype.constructor = TargetPoint;