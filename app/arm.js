// 2. Конструктор Hand
function Arm(name,modules,AXIS){
    Particles.apply(this,arguments);
}
// 2.1 Наследование
Arm.prototype = Object.create(Particles.prototype);
Arm.prototype.constructor = Arm;

// 2.2 Методы

// Вызов родительского метода из дочернего
Arm.prototype.eventListener = function (eventName,func) {
    Particles.prototype.eventListener.apply(this,arguments);
};

Arm.prototype.rotate = function(deg, axis) {
    Particles.prototype.rotate.apply(this,arguments);
};