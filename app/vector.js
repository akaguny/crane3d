"use strict";
function Vector(){

}
// Функция вычисления вектора (его координат)
Vector.vectorFromCoord = function(coord1, coord2){
    var coord1 = coord1, coord2 = coord2;
    var vector = coord1.map(function(item,i){return coord2[i]-item});
    return vector
};

// модуль вектора равен квадратному корню из суммы квадратов его координат
Vector.module = function (vector) {
    // Находим квадраты слагаемых
    var step1 = vector.map(function(currentValue) {
        return Math.pow(currentValue, 2)
    });
    // Складываем их
    var step2 = step1.reduce(function(sum, current) {
        return sum + current
    });
    // Вычисляем квадратный корень
    var length = Math.sqrt(step2, 2);
    return length;
};

// Функция для вычисления угла между 2 векторами
Vector.angleBetweenTwoVectors = function(vector1, vector2) {
    // скалярное произведение векторов
    var vector1 = vector1, vector2 = vector2;
    var scalMultVectors = vector1.reduce(function(sum, current, i) {
        return sum + (current * vector2[i])
    }, 0);
    // Вычисляем косинус угла между векторами
    var cosA = scalMultVectors / (Vector.module(vector1) * Vector.module(vector2));
    var rad = Math.acos(cosA);
    return rad

};

Vector.radToAngle = function(rad){
    return rad * (180/Math.PI)
};

Vector.normalize = function (vector) {
    return normalizeVector
};