"use strict";
/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{

    this.AXIS ={X:[1, 0, 0],Y:[0, 1, 0],Z:[0, 0, 1]};
    // Массивы имён 3D объектов
    this.armsNames = ["Arm_0","Arm_1","Arm_2","Arm_3"];
    var fingersNames = ["Finger_0","Finger_1","Finger_2","Finger_3"];
    var nodesNames = ["Node_0","Node_1","Node_2","Node_3","Node_4"];
    var targetPointName = ["TargetPoint"];

    // Массивы ID html форм
    var guiHtmlId = ["TargetPointCoord_X","TargetPointCoord_Y","TargetPointCoord_Z"];
    var guiAnglesHtmlId = ["Arm_1_AngleZY","Arm_1_AngleXY","Arm_1_AngleXZ",
            "Arm_2_AngleZY","Arm_2_AngleXY","Arm_2_AngleXZ",
            "Arm_3_AngleZY","Arm_3_AngleXY","Arm_3_AngleXZ"];
    var guiDemoHtmlId = "demoRun";
    this.modules = modules;
    // Хеш-таблицы(хеш/словарь/ассоцаативный массив),из
    // объектов соответствующих классов)
    this.arms = {};
    this.fingers = {};

    this.nodes = {};


    this.targetPoint = {};
    // массив с объектами
    this.gui = [];
    this.guiAdditional = {};
    this.guiDemo = {};

    // Вызываем функцию для заполнения объекта arm
    // Первый аргумент - массив имён, второй - тип/имя объекта
    this.createObjectsByArray(this.armsNames, "arm");
    this.createObjectsByArray(fingersNames, "finger");
    // После формирования раскроем клешню
    //this.fingers.Finger_0.rotateFinger(this.AXIS.Y,45);
    //this.fingers.Finger_1.rotateFinger(this.AXIS.Y,45);
    //this.fingers.Finger_2.rotateFinger(this.AXIS.Y,45);
    //this.fingers.Finger_3.rotateFinger(this.AXIS.Y,45);

    this.createObjectsByArray(nodesNames, "node");
    this.createObjectsByArray(targetPointName, "targetPoint");
    this.createObjectsByArray(guiHtmlId, "gui");
    this.createObjectsByArray(guiAnglesHtmlId, "guiAdditional");
    this.createObjectsByArray(guiDemoHtmlId, "guiDemo");
    // установить текущие значения координат TargetPoint
    var TargetPoint = this.targetPoint[0];
    // сохраняем контект
    var self = this;
    this.gui.forEach(function (item,i) {
        item.set_value(TargetPoint.defaultPosition[i]);
        item.addEventListener("blur",function() {
            if (TargetPoint.solvedPosition[i] !== item.get_value()) {
                TargetPoint.solvedPosition[i] = item.get_value();
                TargetPoint.move();
                self.recalculatePosition(nodesNames, self.nodes, TargetPoint);
                //setTimeout(demonstrate,1000);
                item.set_value(TargetPoint.solvedPosition[i]);
            }
            })
    });
    //function demonstrate() {
    //    self.demonstrate(nodesNames, self.nodes, TargetPoint)
    //}
    this.guiDemo.addEventListener("click",function(){
        var delay = 1500;
        self.demonstrate(self,nodesNames,self.nodes, TargetPoint,delay);
    });
}
Manipulator.prototype.demonstrate = function(self,nodesNames, nodes,TargetPoint,delay){
    window.alert("HI");
    var demoTargetPointCoordinates = [[0,2,-2],[1,2.5,-2],[1.5,2.3,-1.8],[1,3,-1],[1.7,2.1,-1.5],[0.8,2,-2]];
    function runWithTimouts(delay,i,demoTargetPointCoordinates){
        setTimeout(function () {
            TargetPoint.solvedPosition = demoTargetPointCoordinates;
            TargetPoint.move();
        }, delay*i*1.2);
        console.log(TargetPoint);

        setTimeout(function () {
            self.recalculatePosition(nodesNames, nodes, TargetPoint);
        }, delay*i*1.4);
        console.log("delay*i",delay*i,"\n","delay*i*i",delay*i*i)
    }
    for (var i = 0,len = demoTargetPointCoordinates.length;i<len;i++) {
        runWithTimouts(delay,i,demoTargetPointCoordinates[i])
    }
};

Manipulator.prototype.recalculatePosition = function (nodesNames, thisNodes, _thisTargetPoint) {
    console.log("Начальные позиции");
    var arrayOfInitialPosition = nodesNames.map(function (item) {
        console.log(item,thisNodes[item].defaultPosition);
        return thisNodes[item].defaultPosition;
    });

    var newArrayOfInitialPosition = FABRIK.algorithm(arrayOfInitialPosition, _thisTargetPoint.defaultPosition, 0);
    this.movePoints(nodesNames, thisNodes, newArrayOfInitialPosition);
    this.anglesByVectors(this.arms, this.armsNames, newArrayOfInitialPosition);
};

Manipulator.prototype.movePoints = function(nodesNames, thisNodes, newArrayOfInitialPosition){
console.log("Новые позиции");
    nodesNames.forEach(function (item,i) {
        thisNodes[item].solvedPosition = newArrayOfInitialPosition[i];
        console.log(item,thisNodes[item].solvedPosition);
        thisNodes[item].move();
    });

};


Manipulator.prototype.anglesByVectors = function(thisArms, armsNames, newArrayOfInitialPosition){
    var planeNames = ["XY","XZ","ZY"],
        planeAngle = {},
        planeAxis = {
            ZY:this.AXIS.X,
            XY:this.AXIS.Y,
            XZ:this.AXIS.Z
        };
    var copyNewArrayOfInitialPosition = newArrayOfInitialPosition.map(function(item){return item.slice()});// сохраняем исходный массив

    copyNewArrayOfInitialPosition = copyNewArrayOfInitialPosition.map(function(item,i,arr) {
        var array = Array.apply([],item);
        array.splice(0,1);
        return array
    });// обрезка i=1 эл-та копии Также это
        var anglesZY = AnglesByDots.calculateAngleByDots(copyNewArrayOfInitialPosition);
        var _this = this;
        anglesZY.forEach(function(item,i){_this.rotateOnAnglesInPlane("ZY",thisArms[armsNames[i]],item,planeAxis,armsNames[i]);});

};
// Поворот на угол в плоскости
Manipulator.prototype.rotateOnAnglesInPlane = function(plane,arm,angle,planeAxis,armname) {
    //arm.solvedRotation[plane] = 0;
    //if (angle === arm.solvedRotation[plane]){
    //    var angleDeg = 0;
    //}
    //else {
    //    if ((angle > 0) && (arm.solvedRotation[plane] > 0)) {
    //        if(angle > arm.solvedRotation[plane]) {
    //            arm.solvedRotation[plane] = angle - arm.solvedRotation[plane];
    //        }
    //        else{
    //            arm.solvedRotation[plane] -= angle;
    //        }
    //    }
    //    else {
    //        arm.solvedRotation[plane] += angle;
    //    }
        arm.solvedRotation[plane] = angle;
        //var angleDeg = Vector.radToAngle(arm.solvedRotation[plane]);
        var angleDeg = arm.solvedRotation[plane];
    //console.log(angleDeg);
        arm.rotateToAngle(planeAxis[plane],angleDeg);
    //}
    console.log(armname+'_Angle'+plane,arm.solvedRotation[plane]);
    //this.guiAdditional[armname+'_Angle'+plane].set_value(angleDeg); // Todo: это для заполнения углов в gui(демонстрации)
    // Uncaught TypeError: Cannot read property 'set_value' of undefined
};


Manipulator.prototype.createObjectsByArray = function (names, type){
    for (var i = 0; i < names.length; i++){
        switch (type){
            case "arm":
                this.arms[names[i]] = new Arm(names[i],this.modules,this.AXIS,{x:180, y:180, z:180});
                //this.arms[names[i]].hide(); // скрытие
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
            case "gui":
                this.gui[i] = new CraneGUI(names[i]);
                break;
            case "guiAdditional":
                this.guiAdditional[names[i]] = new CraneGUI(names[i]);
                break;
            case "guiDemo":
                this.guiDemo = new CraneGUI(names);
                break;
                    }

    }
};