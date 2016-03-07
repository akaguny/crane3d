"use strict";
function Vector(){

}
// Функция вычисления вектора (его координат)
Vector.vectorFromCoord = function(coord1, coord2){
    return coord1.map(function(item,i){return coord2[i]-item});
};

// модуль(length) вектора равен квадратному корню из суммы квадратов его координат
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
    var length = Math.sqrt(step2);
    return length;
};

// Векторное произведение векторов
//Vector.vecMultVectors = function(a, b) {
//    var c =[];
//    c[0] = a[1] * b[2] - a[2] * b[1]; //x
//    c[1] = a[2] * b[0] - a[0] * b[2]; //y
//    c[2] = a[0] * b[1] - a[1] * b[0]; //z
//    console.log(c);
//    return c;
//};
// Скалярное произведение векторов
Vector.scalMultVectors = function (vector1,vector2) {
    return vector1.reduce(function(sum, current, i) {
        return sum + (current * vector2[i])
    }, 0);
};
Vector.normalize = function (vector) {
    return Math.sqrt(((vector[0]*vector[0]/Vector.module(vector))+(vector[1]*vector[1]/Vector.module(vector))))
};
// Функция для вычисления угла между 2 векторами
Vector.angleBetweenTwoVectors = function(vector1, vector2) {
    // скалярное произведение векторов
    //var vector1 = Vector.normalize(vector1), vector2 = Vector.normalize(vector2);
    var vector1 = vector1, vector2 = vector2;
    // Вычисляем косинус угла между векторами
    //var cosA = Vector.scalMultVectors / (Vector.module(vector1) * Vector.module(vector2));
    //var rad = Math.acos(cosA);
    //return Math.atan2(Math.pow(Vector.module(Vector.vecMultVectors(vector1,vector2)),2),Vector.scalMultVectors(vector1,vector2))
    return Math.atan2(vector1[0]*vector2[1]-vector2[0]*vector1[1],vector1[0]*vector2[0]+vector1[1]*vector2[1])
};

Vector.radToAngle = function(rad){
    return rad * (180/Math.PI)
};

