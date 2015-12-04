/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    this.AXIS ={X:[1, 0, 0],Y:[0, 1, 0],Z:[0, 0, 1]};
    var armsNames = ["Arm_0","Arm_1","Arm_2"];
    var fingersNames = ["Finger_0","Finger_1","Finger_2","Finger_3"];
    var nodesNames = ["Node_0","Node_1","Node_2","Node_3","Node_4"];
    var targetPointName = ["TargetPoint"];

    this.nodesNames = nodesNames;
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
        return thisNodes[item].positionOld;
    });
    var _thisTargetPoint = this.targetPoint[0].positionOld;

    var newArrayOfInitialPosition = FABRIK.algorithm(arrayOfInitialPosition,_thisTargetPoint);

    //newArrayOfInitialPosition[2] = [3.514451503753662, 0.23370684683322906, -0.002778708701953292];
    //    [[0.014770000241696835, 0.18672999739646012, -0.007819999940693378],
    //    [ 1.014678955078125, 0.2001519501209459, -0.006379630882292966 ],
    //        [ 2.014587879180908, 0.2135739028453027, -0.004939262289553881 ],
    //        [ 3.0144968032836914, 0.22699587047100067, -0.003498893231153488 ],
    //        [ 3.514451503753662, 0.23370684683322006, -0.002778708701953292 ]
    //    ]
    //;
    nodesNames.forEach(function (item,i) {
        thisNodes[item].positionNew = newArrayOfInitialPosition[i];
        //console.log(item,thisNodes[item].positionNew);
        thisNodes[item].move();
        //console.log(item,thisNodes[item].positionOld);
    });


}
// Функция, реализующая алгоритм принимает массив координат точек узлов и массив координаты целевой точки
//console.log("\n\n\n",[this.nodes["Node_0"]["positionOld"], this.nodes["Node_1"]["positionOld"], this.nodes["Node_2"]["positionOld"], this.nodes["Node_3"]["positionOld"], this.nodes["Node_4"]["positionOld"]],this.targetPoint["targetPoint"]["positionOld"],"\n\n\n")
//Manipulator.prototype.clenchFingers = function (){
//
//};

Manipulator.prototype.createObjectsByArray = function (names, type){
    for (var i = 0; i < names.length; i++){
        switch (type){
            case "arm":
                this.arms[names[i]] = new Arm(names[i],this.modules,this.AXIS,{x:90, y:90, z:180});
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