/**
 * Created by alexey on 18.11.15.
 */
function FABRIK(){
}
// Функция вычисления вектора (его координат)

FABRIK.vectorFromCoord = function(coord1, coord2) {
    return coord1.map(function(item,i){return coord2[i]-item})
};

// Функция для вычисления угла между 2 векторами
FABRIK.angleBetweenTwoVectors = function(vector1, vector2) {
    // скалярное произведение векторов
    var scalMultVectors = vector1.reduce(function(sum, current, i) {
        return sum + (current * vector2[i])
    }, 0);
    // модуль вектора равен квадратному корню из суммы квадратов его координат
    var moduleVector = function(v) {
        // Находим квадраты слагаемых
        var step1 = v.map(function(currentValue) {
            return Math.pow(currentValue, 2)
        });
        // Складываем их
        var step2 = step1.reduce(function(sum, current) {
            return sum + current
        });
        // Вычисляем квадратный корень
        return Math.sqrt(step2, 2)
    };
    // Вычисляем косинус угла между векторами
    var cosA = scalMultVectors / (moduleVector(vector1) * moduleVector(vector2));
    console.log("cos(" + cosA + ")");
    return Math.acos(cosA);

};

FABRIK.prototype.algorithm = function(arrayOfInitialPositions, TargetPoint, tol){
    // узел pn = [[x,y,z]]
    var arrayOfInitialPositions,
        distBeetweenJoints = [], // дистанция между сопряжёнными узлами (длины звеньев от узла до ближайшего узла)
        distBeetweenJointsAndTarget = [], // отношение дистанций от узла до узла и от узла до цели
        TargetPoint, // цель, целевая точка t = [x,y,z]
        distBeetweenStartPointAndTarget, // дистанция между стартовым узлом и целью, целевой точкой
        lambdaDistance = [], // отношение
        tol, // максимально допустимое растояние между конечным узлом и целью
        sumOfInitialDistances = 0; // переменная для общей дистанции между узлами

    // Функция, вычисляющая расстояние между 2 точками
    // Расстояние между 2 точками выч. по формуле
    // (x1-x2)^2+(y1-y2)^2+(z1-z2)^2
    function distBetweenPoints(point_1, point_2){

        var x = Math.pow((point_1[0]) - point_2[0], 2);
        var y = Math.pow((point_1[1] - point_2[1]), 2);
        var z = Math.pow((point_1[2] - point_2[2]), 2);

        return Math.sqrt((x+y+z))

    }

    // Вычисляем длину между соседними узлами
    // метод массива .length возвращает количество его элементов
    for(var i = 0, len = arrayOfInitialPositions.length; i < len-1; i++){
        distBeetweenJoints[i] = distBetweenPoints(arrayOfInitialPositions[i], arrayOfInitialPositions[i+1]);
        console.log("Расстояние между точками "+i+" и "+(i+1)+" = "+distBeetweenJoints[i]);
    }
    // расстояние между стартовым узлом и целевой точкой
    distBeetweenStartPointAndTarget = distBetweenPoints(arrayOfInitialPositions[0], TargetPoint);
    console.log("Расстояние между стартовым узлом и целевой точкой "+distBeetweenStartPointAndTarget);

    // Сложение дистанций между узлами
    sumOfInitialDistances = distBeetweenJoints.reduce(function(sum, current){return sum + current});
    console.log("Общее расстояние между узлами: "+sumOfInitialDistances);
    // Сравниваем общее расстояние между узлами(общую длину) и расстояние до цели
    // Если цель не достежима, то максимально приближаемся к ней
    // Если нет, то приближаемся к ней, пока не достигнем максимального отдаления
    // заданное переменной tolerance
    if (distBeetweenStartPointAndTarget > sumOfInitialDistances)
    {
        window.alert("Цель не достижима!");
            for(var i = 0, len = arrayOfInitialPositions.length; i < (len - 1); i++){
                // Найдем дистанцию r[i] между целью t и узлом p[i]
                distBeetweenJointsAndTarget[i] = distBetweenPoints(arrayOfInitialPositions[i], TargetPoint);
                // Отношение дистации между сопряжёнными узлами и дистанацией между узлом и целью
                lambdaDistance[i] = distBeetweenJoints[i] / distBeetweenJointsAndTarget[i];

                // начало вычисления первого и второго слагаемых
                // для удобства формула была разделдена на 2 этапа - функции:
                // вычисление первого слагаемого и второго
                var firstStep = arrayOfInitialPositions[i].map(function(item){ return item * (1 -lambdaDistance[i]) });
                console.log("firstStep "+firstStep);


                var secondStep = TargetPoint.map(function(item){ return item * lambdaDistance[i] });
                console.log("secondStep "+secondStep);
                // конец вычисления первого и второго слагаемых
                for(var j = 0; j < firstStep.length; j++){
                    // новая позиция узлов для максимальной близости конечного к цели
                    arrayOfInitialPositions[i+1][j] = firstStep[j] + secondStep[j];
                }

                }
            arrayOfInitialPositions.forEach(function(item, i){console.log("Новая позиция "+i+" = "+item);});
        }
        //else
        //{
        //    window.alert("Цель достижима!");
        //    // если цель достежима, то сохраним позицию нулевого узла
        //    var nullPoint = arrayOfInitialPositions[0];
        //    var DIFa = distBetweenPoints(arrayOfInitialPositions[arrayOfInitialPositions.length-1],TargetPoint);
        //    console.log("DIFa = "+DIFa);
        //    while (DIFa > tol){
        //        // Этап 1: прямое следование
        //        // ставим конечный узел arrayOfInitialPositions[arrayOfInitialPositions.length] на позицию цели
        //        arrayOfInitialPositions[arrayOfInitialPositions.length-1] = TargetPoint;
        //        for(var len = arrayOfInitialPositions.length; i = (len-1),  i <= 0; i--){
        //            // Найдем дистанцию r[i] между целью t и узлом p[i]
        //            distBeetweenJointsAndTarget[i] = distBetweenPoints(arrayOfInitialPositions[i], TargetPoint);
        //            // Отношение дистации между сопряжёнными узлами и дистанацией между узлом и целью
        //            lambdaDistance[i] = distBeetweenJoints[i] / distBeetweenJointsAndTarget[i];
        //
        //            // начало вычисления первого и второго слагаемых
        //            // для удобства формула была разделдена на 2 этапа - функции:
        //            // вычисление первого слагаемого и второго
        //            var firstStep = arrayOfInitialPositions[i].map(function(item, a){ return item * (1 -lambdaDistance[a]) });
        //
        //            console.log(firstStep);
        //
        //
        //            var secondStep = [];
        //            TargetPoint.forEach(function(item, argument, array){ secondStep[argument] = array[i] * lambdaDistance[i] });
        //
        //            console.log(secondStep);
        //            // конец вычисления первого и второго слагаемых
        //            for(var j = 0; j < firstStep.length; j++){
        //                // новая позиция узлов для максимальной близости конечного к цели
        //                arrayOfInitialPositions[i][j] = firstStep[j] + secondStep[j];
        //            }
        //
        //            console.log(arrayOfInitialPositions);
        //        }
        //        // Этап 2: обратное следование
        //        // Восстанавливаем корневому элементу его позицию
        //        arrayOfInitialPositions[0] = nullPoint;
        //        for(var i = 0, len = arrayOfInitialPositions.length; i < (len - 1); i++){
        //            // Найдем дистанцию r[i] между целью t и узлом p[i]
        //            distBeetweenJointsAndTarget[i] = distBetweenPoints(arrayOfInitialPositions[i], TargetPoint);
        //            // Отношение дистации между сопряжёнными узлами и дистанацией между узлом и целью
        //            lambdaDistance[i] = distBeetweenJoints[i] / distBeetweenJointsAndTarget[i];
        //
        //            // начало вычисления первого и второго слагаемых
        //            // для удобства формула была разделдена на 2 этапа - функции:
        //            // вычисление первого слагаемого и второго
        //            var firstStep = [];
        //
        //            arrayOfInitialPositions[i].forEach(function(item, argument, array){ firstStep[argument] = array[i] * (1 -lambdaDistance[i]) });
        //
        //            console.log(firstStep);
        //
        //
        //            var secondStep = [];
        //            TargetPoint.forEach(function(item, argument, array){ secondStep[argument] = array[i] * lambdaDistance[i] });
        //
        //            console.log(secondStep);
        //            // конец вычисления первого и второго слагаемых
        //            for(var j = 0; j < firstStep.length; j++){
        //                // новая позиция узлов для максимальной близости конечного к цели
        //                arrayOfInitialPositions[i+1][j] = firstStep[j] + secondStep[j];
        //            }
        //
        //            console.log(arrayOfInitialPositions);
        //        }
        //        DIFa = distBetweenPoints(arrayOfInitialPositions[arrayOfInitialPositions.length-1],TargetPoint);
        //
        //    }
    };
//newArrayOfInitialPositions
console.log(FABRIK.vectorFromCoord([0,2,3],[0,4,6]));
