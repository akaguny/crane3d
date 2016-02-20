/**
 * Created by alexey on 20.02.16.
 */
craneGUI = function() {
    var currentTargetPointCoord = TargetPoint.solvedPosition,
        newTargetPointCoord = [],
        saveTargetPointCoord = [],
        inputTargetPointCoord = [
            document.getElementById("TargetPointCoord_X"),
            document.getElementById("TargetPointCoord_Y"),
            document.getElementById("TargetPointCoord_Z")
        ],
        count = 0;

    set_newTargetPointCoord = function(){
        saveTargetPointCoord[count] = currentTargetPointCoord;
        for (var i = currentTargetPointCoord.length - 1; i >= 0; i--) {
            newTargetPointCoord[i] = +get_TargetPointCoordFromInput(inputTargetPointCoord[i]);
        }
        TargetPoint.solvedPosition = newTargetPointCoord;
        TargetPoint.move();
        count++;
        console.log(newTargetPointCoord);
    };

// Забиваем поля ввода текущими значениями и вешаем событие на фукнцию получения значения и установки в качестве newTargetPointCoord
    for (var i = currentTargetPointCoord.length - 1; i >= 0; i--) {
        var _this = inputTargetPointCoord[i];
        _this.value = currentTargetPointCoord[i];
// Регистрируем событие
        _this.	addEventListener("blur", set_newTargetPointCoord,false);
    }

// функция получения значения из input
    get_TargetPointCoordFromInput = function(object) {
        return object.value
    };
};