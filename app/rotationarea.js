// 2. Конструктор Hand
function RotationArea(name,modules,AXIS){
    Particles.apply(this,arguments);
}
// 2.1 Наследование
RotationArea.prototype = Object.create(Particles.prototype);
RotationArea.prototype.constructor = RotationArea;

// 2.2 Методы

// Вызов родительского метода из дочернего
RotationArea.prototype.eventListener = function (eventName,func) {
    RotationArea.prototype.eventListener.apply(this,arguments);
};

RotationArea.prototype.rotate = function(deg, axis) {
    RotationArea.prototype.rotate.apply(this,arguments);
};