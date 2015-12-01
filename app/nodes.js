/**
 * Created by alexey on 01.12.15.
 */
function Nodes(name,modules,AXISES,limits){
    Particle.apply(this, arguments);
}

Nodes.prototype = Object.create(Particle.prototype);

Nodes.prototype.constructor = Nodes;