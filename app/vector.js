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
Vector.cross = function(vec1, vec2) {
    var c =[];
    c[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1]; //x
    c[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2]; //y
    c[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0]; //z
    return c;
};
// Скалярное произведение векторов
Vector.dot = function (vector1,vector2) {
    //return vector1.reduce(function(sum, current, i) {
    //    return sum + (current * vector2[i])
    var sum = 0;
    sum += vector1[0] * vector2[0];
    sum += vector1[1] * vector2[1];
    sum += vector1[2] * vector2[2];
    return sum
};
Vector.norm = function (vector) {
    //return Math.sqrt(((vector[0]*vector[0]/Vector.module(vector))+(vector[1]*vector[1]/Vector.module(vector))))
    return vector.reduce(function(sum,current){
        return sum += current*current;
    });
    //var sum = vector.reduce(function(sum,current){
    //    return sum += current*current;
    //});
    /// Vector.module(vector)
    //return Math.sqrt(sum)

};
// Функция для вычисления угла между 2 векторами
Vector.angleBetweenTwoVectors = function(vector1, vector2) {
    // скалярное произведение векторов
    //var vector1 = Vector.normalize(vector1), vector2 = Vector.normalize(vector2);
    //var vector1 = vector1, vector2 = vector2;
    // Вычисляем косинус угла между векторами
    //var cosA = Vector.scalMultVectors / (Vector.module(vector1) * Vector.module(vector2));
    //var rad = Math.acos(cosA);
    //return Math.atan2(Math.pow(Vector.module(Vector.vecMultVectors(vector1,vector2)),2),Vector.scalMultVectors(vector1,vector2))
    //return Math.atan2(vector1[0]*vector2[1]-vector2[0]*vector1[1],vector1[0]*vector2[0]+vector1[1]*vector2[1])
    return Math.atan2(Vector.norm(Vector.cross(vector1,vector2)),Vector.dot(vector1,vector2))
};

// формулы и алгоритм http://www.cleverstudents.ru/vectors/condition_of_vectors_perpendicularity.html#finding_perpendicular_vector
Vector.perpendicularTo2dRadiusVector = function(r_vectors) {
    if (r_vectors[0].length == 2) { // двумерный
        var x2 = 3;
        var y2 = [];
        r_vectors[0][1] != 0 ?
            y2 = r_vectors.map(function(item) {
                return -(item[0] * x2) / item[1]
            }) :
            y2 = r_vectors.map(function(item, i) {
                return i != 0 ? -(item[0] * x2) / item[1] : 0
            });
        var perpendicularsR_Vectors = r_vectors.map(function(item, i) {
            return [x2, y2[i]]
        });
        perpendicularsR_Vectors.unshift([3, 0]); // добавляем горизонтальынй перпендикуляр если первоначальный вектор(плечо)
        // может изменять свое положение относительно оси y
        return perpendicularsR_Vectors
    } else {
        console.warn("r_vector > 2")
    }
};
Vector.radToAngle = function(rad){
    return rad * (180/Math.PI)
};
// degToRad градусы в радианы
Vector.degToRad = function (deg){
    return (deg * (Math.PI / 180));
};

