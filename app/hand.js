// 2. Конструктор Hand
function Hand(name,modules,AXIS){
    // не добавляет никакой особенной логики при создании, которой не было в Particle
    // поэтому просто получим аргументы.
    Particle.apply(this,arguments);
    // Свойства, которые не должны наследоваться, собственные
    // Нет
}

// 2.1 Наследование
Hand.prototype = Object.create(Particle.prototype);
// 2.1.1 Сохраняем конструктор
Hand.prototype.constructor = Hand;

// 2.2 Методы

// Вызов родительского метода из дочернего
/*Hand.prototype.eventListener = function (eventName,func) {
    Particle.prototype.eventListener.apply(this,arguments);
};*/

/*Hand.prototype.rotate = function(deg, axis) {
    Particle.prototype.rotate.apply(this,arguments);
};*/
