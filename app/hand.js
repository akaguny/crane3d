// 2. Конструктор Hand
function Hand(name,modules,AXIS){
    // не добавляет никакой особенной логики при создании, которой не было в Part
    // поэтому просто получим аргументы.
    Part.apply(this,arguments);
    // Свойства, которые не должны наследоваться, собственные
    // Нет
}
// 2.1 Наследование

Hand.prototype = Object.create(Part.prototype);
Hand.prototype.constructor = Hand;

// 2.2 Методы

// Вызов родительского метода из дочернего
Hand.prototype.eventListener = function (eventName,func) {
    Part.prototype.eventListener.apply(this,arguments);
};


Hand.prototype.rotate = function(deg, axis) {
// попробую воспользоваться методом класса Rotate, но скорее всего ничего не выйдет
// т.к.пространство this будет относиться не к классу Hand, a к Rotate
    Part.prototype.rotate(this,arguments);
};
