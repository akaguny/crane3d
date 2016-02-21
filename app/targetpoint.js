/**
 * Created by alexey on 01.12.15.
 */
function TargetPoint(name,modules,AXISES,limits){
    Particle.apply(this, arguments);
    this.inputTargetPointCoord = [
        document.getElementById("TargetPointCoord_X"),
        document.getElementById("TargetPointCoord_Y"),
        document.getElementById("TargetPointCoord_Z")
    ];
    console.dir(this.inputTargetPointCoord);
}

TargetPoint.prototype = Object.create(Particle.prototype);

TargetPoint.prototype.constructor = TargetPoint;

// функция получения значения из input
TargetPoint.get_coordFromInput = function(){
    var inputTargetPointCoord = this.inputTargetPointCoord;
    var matrix = [];
    for (var i = inputTargetPointCoord.length; i >= 0; i--) {
        matrix = +inputTargetPointCoord[i].value
    }
    return matrix;
};
// установить новые значения координат с ввода в объект
TargetPoint.set_newTargetPointCoord = function(){
    var newTargetPointCoord = [],
        currentTargetPointCoord = this.solvedPosition;
    //saveTargetPointCoord[count] = currentTargetPointCoord;
    for (var i = currentTargetPointCoord.length - 1; i >= 0; i--) {
        newTargetPointCoord[i] = +TargetPoint.get_coordFromInput()[i];
    }
    this.solvedPosition = newTargetPointCoord;

};
// Единожды при инициализации - запись координат из объекта в поля ввода(в качестве текущих) и вешание currentTargetPointCoord
TargetPoint.prototype.set_CurrentTargetPointCoord = function () {
    for (var i = this.defaultPosition.length - 1; i >= 0; i--) {
        var _this = this.inputTargetPointCoord[i];
        var currentTargetPointCoord = this.defaultPosition;
        _this.value = currentTargetPointCoord[i];
        _this.addEventListener("blur", TargetPoint.set_newTargetPointCoord,false);
    }
};