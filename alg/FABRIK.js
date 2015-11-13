// Code goes here
"use strict";
/**
 * Created by alexey on 10.11.15.
 */
(function(){
    // узел pn = [[x,y,z]]
    var arrayOfInitialPositions = [
            [0,0,0],  //p[0]
            [0,10,0], //p[1]
            [0,20,0], //p[2]
            [0,30,0]  //p[3]
        ],
        distBeetweenJoints = [], // дистанция между сопряжёнными узлами (длины звеньев от узла до ближайшего узла)
        distBeetweenJointsAndTarget = [], // отношение дистанций от узла до узла и от узла до цели
        TargetPoint = [0,10,20], // цель, целевая точка t = [x,y,z]
        distBeetweenStartPointAndTarget, // дистанция между стартовым узлом и целью, целевой точкой

        lambdaDistance = [], // отношение

    //tol = 1, // максимально допустимое растояние между конечным узлом и целью
    //b = 0, // переменная для хранения позиции узла 1, если цель достижима
    //DIFa = 0, //дистанция между конечным узлом и целевой позицией

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

// Функция для вычисления угла между 2 векторами
    var angleBetweenTwoVectors = function(vector1, vector2) {
        // скалярное произведение векторов
        var scalMultVectors = vector1.reduce(function(sum, current, i) {
            return sum + (current * vector2[i])
        });
        console.log(scalMultVectors);
        // модуль вектора равен квадратному корню из суммы квадратов его координат
        var moduleVector = function(v) {
            // Находим квадраты слагаемых
            var step1 = v.map(function(currentValue) {
                return Math.pow(currentValue, 2)
            });
            console.log(step1);
            // Складываем их
            var step2 = step1.reduce(function(sum, current) {
                return sum + current
            });
            console.log(step2);
            // Вычисляем квадратный корень
            return Math.sqrt(step2, 2)
        };
        // Вычисляем косинус угла между векторами
        var cosA = scalMultVectors / moduleVector(vector1) * moduleVector(vector2);
        console.log(cosA);
        return Math.acos(cosA);

    }
    var v1 = [4,3];
    var v2 = [3,4];
    console.log(angleBetweenTwoVectors(v1, v2));


    // Вычисляем длину между соседними узлами
    // метод массива .length возвращает количество его элементов
    for(var i = 0; i < (arrayOfInitialPositions.length-1); i++){
        distBeetweenJoints[i] = distBetweenPoints(arrayOfInitialPositions[i], arrayOfInitialPositions[i+1]);
    }
    // расстояние между стартовым узлом и целевой точкой
    distBeetweenStartPointAndTarget = distBetweenPoints(arrayOfInitialPositions[0], TargetPoint);

    // Сложение дистанций между узлами
    distBeetweenJoints.forEach(function(item, i, array){sumOfInitialDistances += array[i]});

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
            var thirstStep = [];

            arrayOfInitialPositions[i].forEach(function(item, argument, array){ thirstStep[argument] = array[i] * (1 -lambdaDistance[i]) });

            console.log(thirstStep);


            var secondStep = [];
            TargetPoint.forEach(function(item, argument, array){ secondStep[argument] = array[i] * lambdaDistance[i] });

            console.log(secondStep);
            // конец вычисления первого и второго слагаемых
            for(var j = 0; j < thirstStep.length; j++){
                // новая позиция узлов для максимальной близости конечного к цели
                arrayOfInitialPositions[i+1][j] = thirstStep[j] + secondStep[j];
            }

            console.log(arrayOfInitialPositions);
        }
    }
    else
    {
        window.alert("Цель достижима!");
    }

})();