// 2. Конструктор Arm
function Arm(name,modules,AXIS){
    // не добавляет никакой особенной логики при создании, которой не было в Particles
    // поэтому просто получим аргументы.
    Particles.apply(this,arguments);
    // Свойства, которые не должны наследоваться, собственные
    // Нет
}
// 2.1 Наследование
Arm.prototype = Object.create(Particles.prototype);
// 2.1.1 Сохраняем конструктор
Arm.prototype.constructor = Arm;

// 2.2 Методы

// Вызов родительского метода из дочернего
Arm.prototype.eventListener = function (eventName,func) {
    Particles.prototype.eventListener.apply(this,arguments);
};

Arm.prototype.rotate = function(deg, axis) {
    Particles.prototype.rotate(this,arguments);
};