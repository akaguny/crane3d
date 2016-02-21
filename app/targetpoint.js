/**
 * Created by alexey on 01.12.15.
 */
function TargetPoint(name,modules,AXISES,limits){
    Particle.apply(this, arguments);
    this.inputTargetPointCoord = new Float32Array(3);
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
    // Массив id полей ввода
    //set_newTargetPointCoord = function(){
    //    saveTargetPointCoord[count] = currentTargetPointCoord;
    //    for (var i = currentTargetPointCoord.length - 1; i >= 0; i--) {
    //        newTargetPointCoord[i] = +get_TargetPointCoordFromInput(inputTargetPointCoord[i]);
    //    }
    //    this.solvedPosition = newTargetPointCoord;
    //    count++;
    //    console.log(newTargetPointCoord);
    //};
    var matrix = [];
    for (var i = this.inputTargetPointCoord.length; i >= 0; i--) {
        matrix = +this.inputTargetPointCoord[i].value
    }
    return matrix;
};
//// Регистрируем события
//TargetPoint.addEventListen = function(){
//    for (var i = 0; i < 3; i++)
//         var _this = this.inputTargetPointCoord[i];
//        _this.addEventListener("blur", TargetPoint.set_newTargetPointCoord,false);
//};
// запись новых координат с input в объект TargetPoint
TargetPoint.set_newTargetPointCoord = function(){
    var newTargetPointCoord = [],
        currentTargetPointCoord = [1, 2, 3];
    //saveTargetPointCoord[count] = currentTargetPointCoord;
    for (var i = currentTargetPointCoord.length - 1; i >= 0; i--) {
        newTargetPointCoord[i] = +TargetPoint.get_coordFromInput()[i];
    }
    this.solvedPosition = newTargetPointCoord;

};
// Единожды при инициализации - запись координат из объекта в поля ввода(в качестве текущих) и вещание currentTargetPointCoord
TargetPoint.prototype.set_CurrentTargetPointCoord = function () {
    for (var i = this.defaultPosition.length - 1; i >= 0; i--) {
        var _this = this.inputTargetPointCoord[i];
        var currentTargetPointCoord = this.defaultPosition;
        _this.value = currentTargetPointCoord[i];
        _this.addEventListener("blur", TargetPoint.set_newTargetPointCoord,false);
    //    _this.addEventListener("blur", TargetPoint.set_newTargetPointCoord,false);
    }
    // Регистрируем событие
    //TargetPoint.addEventListen();
};