// 2. Конструктор Hand
function Hand(name,modules,AXISES, limits){
    // не добавляет никакой особенной логики при создании, которой не было в Particle
    // поэтому просто получим аргументы.
    Particle.apply(this,arguments);
    // Свойства, которые не должны наследоваться, собственные
    // Нет
}

// 2.1 Наследование
Hand.prototype = Object.create(Particle.prototype);
Hand.prototype.constructor = Hand;