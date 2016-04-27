"use strict";
// https://jsfiddle.net/Quncore/ous2ptv1/
// Орграничения - угл 0 > 180
// Автор алгоритма и реализации на python Кузов Михаил
function AnglesByDots(){

}
var vectors2toRadiusVector = function(vectors2) {
    var radiusVectors2d = [];
    if (vectors2[0].length == 2) { // двумерный
        radiusVectors2d = vectors2.map(function(item, j, array) {
            var out = [0, 0];
            if (j < array.length - 1) {
                out = [array[j + 1][0] - array[j][0], array[j + 1][1] - array[j][1]];
            }
            return out
        });
        radiusVectors2d.pop(); //удаление последнего элемента
        return radiusVectors2d
    } else {
        console.log("r_vector > 2")
    }
};
var perpendicularTo2dRadiusVector = function(r_vector) {
    if (r_vector[0].length == 2) { // двумерный
        var x2 = 3;
        var y2 = [];
        r_vector[0][1] != 0 ?
            y2 = r_vector.map(function(item) {
                return -(item[0] * x2) / item[1]
            }) :
            y2 = r_vector.map(function(item, i) {
                return i != 0 ? -(item[0] * x2) / item[1] : 0
            });
        var perpendicularsR_Vectors = r_vector.map(function(item, i) {
            return [x2, y2[i]]
        });
        perpendicularsR_Vectors.unshift([3, 0]); // добавляем горизонтальынй перпендикуляр если первоначальный вектор(плечо)
        // может изменять свое положение относительно оси y
        return perpendicularsR_Vectors
    } else {
        console.log("r_vector > 2")
    }
};
// return degrees
var calculateAnglesRadiusVectors = function(radiusVectors, distanceBeween2dVectors) {
    // для вычислений нам понадобятся перпендикуляры к векторам
    var angle = [];
    for (var i = 0, len = radiusVectors.length; i < len - 1; i++) {
        var a = radiusVectors[i][0] * radiusVectors[i + 1][0] + radiusVectors[i][1] * radiusVectors[i + 1][1];
        var b = a / (distanceBeween2dVectors[i] * distanceBeween2dVectors[i + 1]);
        angle[i] = Math.acos(b) * 180 / Math.PI; // a(rad)*180/pi=a(deg)
    }
    return angle
};
var distanceBetween2DVectors = function(vector1, vector2) {
    var x = Math.pow((vector1[0] - vector2[0]), 2);
    var y = Math.pow((vector1[1] - vector2[1]), 2);
    return Math.sqrt((x + y))
};
var anglesBeetweenRadiusVectorAndPerpendicularToNextVector = function(radiusVectors, lengthRadiusVectors, perpendicularsToRadiusVectors, lengthPerpendicularsToRadiusVectors) {
    // для вычислений нам понадобятся перпендикуляры к векторам
    var angle = [];
    for (var i = 0, len = radiusVectors.length; i <= len - 1; i++) {
        var a = radiusVectors[i][0] * perpendicularsToRadiusVectors[i][0] + radiusVectors[i][1] * perpendicularsToRadiusVectors[i][1];
        var b = a / (lengthRadiusVectors[i] * lengthPerpendicularsToRadiusVectors[i]);
        angle[i] = Math.acos(b) * 180 / Math.PI;
    }
    return angle
};

// return angles degrees
AnglesByDots.calculateAngleByDots = function(dots) {
    console.log("dots\n" + dots);
    var radiusVectors = vectors2toRadiusVector(dots);
    console.log("radiusVectors\n" + radiusVectors);
    var lengthRadiusVectors = radiusVectors.map(function(item) {
        return distanceBetween2DVectors(item, [0, 0])
    });
    console.log("lengthRadiusVectors\n" + lengthRadiusVectors);
    var perpendicularsToRadiusVectors = perpendicularTo2dRadiusVector(radiusVectors);
    console.log("perpendicularsToRadiusVectors\n" + perpendicularsToRadiusVectors);
    // длина новообразованных перпендикуляро
    var lengthPerpendicularsToRadiusVectors = perpendicularsToRadiusVectors.map(function(item) {
        return distanceBetween2DVectors(item, [0, 0])
    });
    console.log("lengthPerpendicularsToRadiusVectors\n" + lengthPerpendicularsToRadiusVectors);
    var anglesRadiusVectors = calculateAnglesRadiusVectors(radiusVectors, lengthRadiusVectors);
    console.log("anglesRadiusVectors\n" + anglesRadiusVectors);
    var anglesRadiusVectorAndPerpendicularToNextVector = anglesBeetweenRadiusVectorAndPerpendicularToNextVector(radiusVectors, lengthRadiusVectors, perpendicularsToRadiusVectors, lengthPerpendicularsToRadiusVectors);
    console.log("anglesRadiusVectorAndPerpendicularToNextVector\n" + anglesRadiusVectorAndPerpendicularToNextVector);
    return anglesRadiusVectorAndPerpendicularToNextVector;
};

//// test data from python
//var arryaOfNewPositions = [
//    [-1, 1],
//    [-1.800, 9.837],
//    [7.69, 12.075],
//    [15.006, 4.993]
//];
//calculateAngleByDots(arryaOfNewPositions);
