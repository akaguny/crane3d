"use strict";
/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    this.AXIS ={X:[1, 0, 0],Y:[0, 1, 0],Z:[0, 0, 1]};
    var armsNames = ["Arm_0","Arm_1","Arm_2","Arm_3"];
    var fingersNames = ["Finger_0","Finger_1","Finger_2","Finger_3"];
    var nodesNames = ["Node_0","Node_1","Node_2","Node_3","Node_4"];
    var targetPointName = ["TargetPoint"];

    this.modules = modules;
    // Создадим хеш-таблицу(хеш/словарь/ассоцаативный массив, состоящий из
    // объектов соответствующих классов)
    this.arms = {};
    this.fingers = {};
    this.nodes = {};
    this.targetPoint = {};

    //console.log(this.targetPoint);
    //console.log(this.arms);
    //console.log("nodes");
    //console.log(this.nodes);

    // Вызываем функцию для заполнения объекта arm
    // Первый аргумент - массив имён, второй - тип/имя объекта
    this.createObjectsByArray(armsNames, "arm");

    // После формирования объекта arms выставим начальную позицию манипулятора, повернув Arm_2 и ARM_3 на 90 градусов
    //this.arms.Arm_1.rotate(this.AXIS.Z, 60);
    //this.arms.Arm_2.rotate(this.AXIS.Z, 60);

    this.createObjectsByArray(fingersNames, "finger");
    // После формирования раскроем клешню
    //this.fingers.Finger_0.rotateFinger(this.AXIS.Y,45);
    //this.fingers.Finger_1.rotateFinger(this.AXIS.Y,45);
    //this.fingers.Finger_2.rotateFinger(this.AXIS.Y,45);
    //this.fingers.Finger_3.rotateFinger(this.AXIS.Y,45);

    this.createObjectsByArray(nodesNames, "node");
    this.createObjectsByArray(targetPointName, "targetPoint");

    // Подготовим входные данные, для алгоритма
    // (массивы координат узлов и массив координаты целевой точки)
    var thisNodes = this.nodes;
    var arrayOfInitialPosition = nodesNames.map(function (item,i) {
        return thisNodes[item].defaultPosition;
    });
    console.dir(arrayOfInitialPosition);
    var _thisTargetPoint = this.targetPoint[0].defaultPosition;

    var newArrayOfInitialPosition = FABRIK.algorithm(arrayOfInitialPosition,_thisTargetPoint, 0.1);
    nodesNames.forEach(function (item,i) {
        thisNodes[item].solvedPosition = newArrayOfInitialPosition[i];
        thisNodes[item].move();
    });
    var thisArms = this.arms;
       for(var len = armsNames.length, i = len-1; i > 0; i--) {
           var vector1, vector2 = new Float32Array();
           var array1 = newArrayOfInitialPosition[i], // массив координат текущего узла
           array2 = newArrayOfInitialPosition[i-1], // массив координат предидущего узла
           array3 = newArrayOfInitialPosition[i+1]; // массив координат следующего узла
           vector1 = Vector.vectorFromCoord(array2,array1);
           vector2 = Vector.vectorFromCoord(array1,array3);
           console.dir(vector1,vector2);
           //thisArms[armsNames[i]].solvedRotation = Vector.radToAngle(Vector.angleBetweenTwoVectors(vector1,vector2));
           thisArms[armsNames[i]].solvedRotation = Vector.radToAngle(Vector.angleBetweenTwoVectors([vector1[1],vector1[2]],[vector2[1],vector2[2]]));
           thisArms[armsNames[i]].rotateToAngle(this.AXIS.X,thisArms[armsNames[i]].solvedRotation);
           console.log(thisArms[armsNames[i]].name,thisArms[armsNames[i]].solvedRotation);
           console.log("Угол поворота в плоскости XY\n",
               thisArms[armsNames[i]].name,Vector.radToAngle(Vector.angleBetweenTwoVectors([vector1[0],vector1[1]],[vector2[0],vector2[1]])));
           console.log("Угол поворота в плоскости YZ\n",
               thisArms[armsNames[i]].name,Vector.radToAngle(Vector.angleBetweenTwoVectors([vector1[1],vector1[2]],[vector2[1],vector2[2]])));
           console.log("Угол поворота в плоскости XZ\n",
               thisArms[armsNames[i]].name,Vector.radToAngle(Vector.angleBetweenTwoVectors([vector1[0],vector1[2]],[vector2[0],vector2[2]])));
        }
    //for(var i = 1, len = nodesNames.length; i < len - 1; i++) {
    //    // в зависимости от плоскости убираем лишнюю часть вектора
    //    var arrayXY = newArrayOfInitialPosition[i].map(function(item,j){
    //        if (j == 2){
    //            return 0
    //        }
    //        else {
    //            return item
    //        }
    //    });
    //    var arrayYZ = newArrayOfInitialPosition[i].map(function(item,j){
    //        if (j == 2){
    //            return 0
    //        }
    //        else {
    //            return item
    //        }
    //    });
    //    var arrayXZ = newArrayOfInitialPosition[i].map(function(item,j){
    //        if (j == 2){
    //            return 0
    //        }
    //        else {
    //            return item
    //        }
    //    });
    //    var set_solvedRotation = function (array){
    //        var vector = new Vector3(array[1],array[2],array[3]);
    //       return
    //
    //    };
    //    thisNodes[nodesNames[i]].solvedRotation.horizontal = set_solvedRotation(arrayXY);
    //    thisNodes[nodesNames[i]].solvedRotation.vertical = set_solvedRotation(arrayYZ);
    //    thisNodes[nodesNames[i]].solvedRotation.circular = set_solvedRotation(arrayXZ);
    //}
    // тестовые данные вычисления углов
    //for (var i = 0; i<newArrayOfInitialPosition.length - 2; i++)
    //{
    //    var thisArm = this.arms[armsNames[i]];
    //    console.log(thisArm);
    //console.log("Угол между",i,"и",i+1," = ",Vector.angleBetweenTwoVectors(newArrayOfInitialPosition[i],arrayOfInitialPosition[i],"vertical"),"angle");
    //console.log("Угол между",i,"и",i+1," = ",Vector.angleBetweenTwoVectors(newArrayOfInitialPosition[i],arrayOfInitialPosition[i],"horizontal"),"angle");
    //    thisArm.rotate(this.AXIS.X,(Vector.angleBetweenTwoVectors(newArrayOfInitialPosition[i],arrayOfInitialPosition[i],"horizontal"))*Math.PI);
    //}

}
// Функция, реализующая алгоритм принимает массив координат точек узлов и массив координаты целевой точки
//console.log("\n\n\n",[this.nodes["Node_0"]["defaultPosition"], this.nodes["Node_1"]["defaultPosition"], this.nodes["Node_2"]["defaultPosition"], this.nodes["Node_3"]["defaultPosition"], this.nodes["Node_4"]["defaultPosition"]],this.targetPoint["targetPoint"]["defaultPosition"],"\n\n\n")
//Manipulator.prototype.clenchFingers = function (){
//
//};

Manipulator.prototype.createObjectsByArray = function (names, type){
    for (var i = 0; i < names.length; i++){
        switch (type){
            case "arm":
                this.arms[names[i]] = new Arm(names[i],this.modules,this.AXIS,{x:180, y:180, z:180});
                //var arm = this.arms[names[i]];
                //arm.button_left =  document.getElementById(names[i]+"_left");
                //var _this = arm;
                //arm.button_left.addEventListener("click", function(){
                //    _this.rotate(_this.axis.Y, 18);
                //});
                //
                //arm.button_right =  document.getElementById(names[i]+"_right");
                //arm.button_right.addEventListener("click", function(){
                //    _this.rotate(_this.axis.Y, -18)
                //});
                //
                //arm.button_up =  document.getElementById(names[i]+"_up");
                //arm.button_up.addEventListener("click", function(){
                //    _this.rotate(_this.axis.Z, 18);
                //});
                //
                //arm.button_down =  document.getElementById(names[i]+"_down");
                //arm.button_down.addEventListener("click", function(){
                //    _this.rotate(_this.axis.Z, -18)
                //});

                break;
            case "finger":

                this.fingers[names[i]] = new Finger(names[i],this.modules,this.AXIS,{x:0, y:45, z:90},i);
                break;
            case "node":
                this.nodes[names[i]] = new Nodes(names[i],this.modules);
                break;
            case "targetPoint":
                this.targetPoint[[i]] = new TargetPoint(names[i],this.modules,this.AXIS,{x:999, y:999, z:999});
                break;
        }
    }
};