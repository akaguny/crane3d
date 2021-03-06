"use strict";
/**
 * Created by alexey on 14.10.15.
 */
// 1. Конструктор Particle


//limit = {x:10, y:20, z:30};
function Particle(name,modules, AXISES, limit ){
    this.name = name;
    this.modules = modules; // указывает на переменную modules в crane.js, а переменная объект, являющееся хэш таблицей
    // элементы которой указывают на модули движка
    this.element3D = this.modules.m_scenes.get_object_by_name(name);
    this.quatNew = new Float32Array(4);
    this.quatOld = new Float32Array(4);
    this.rotationSum = {x:0, y:0, z:0};
    this.rotationLimit = limit;
    // вызываем хэшированную таблицу с осями
    this.axis = AXISES;
    // позиция центральной точки объекта get_object_center(obj, calc_bs_center, destopt)
    this.defaultPosition = this.modules.m_trans.get_object_center(this.element3D,0);
    this.solvedPosition = this.defaultPosition;
    // предидущее состояние this.solvedPosition
    this.storedPosition = this.defaultPosition;
    //
    this.defaultRotation = 0;
    this.solvedRotation = {ZY:0,XY:0,XZ:0};

}
Particle.prototype.hide = function(){

    this.modules.m_scenes.hide_object(this.element3D);

};
// 1.1 Методы в прототип
// функция eventListener - находит html элемент, вешает на него событие
Particle.prototype.eventListener = function (name,button,event,func){
    var htmlElement = document.getElementById(name+button);
    console.log(htmlElement);
    htmlElement.addEventListener(event,func);
};

// getCurrentAxis преобразовать массив вида
// [1 0 0] => 'x'
// [0 1 0] => 'y'
// [0 0 1] => 'z'
// в символ, означающий ось
Particle.getCurrentAxis = function(axises){
    // (условие ? если true : если false)
    return axises[0] ? "x" :
        axises[1] ? "y" :
            axises[2] ? "z":
        undefined;
};


Particle.prototype.rotateToAngle = function(axises, angle)
{
    this.modules.m_quat.setAxisAngle(axises, Vector.degToRad(angle), this.quatNew);
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld);
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew);
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);
};
// функция перемещения объекта, перемещает со старой позиции на новую
Particle.prototype.move = function(){
    var _thisObject3D = this.element3D;
    // перемещение объекта set_translation(объект, x,y,z) x,y,z - координаты в глобальной системе
    this.modules.m_trans.set_translation(_thisObject3D,this.solvedPosition[0],this.solvedPosition[1],this.solvedPosition[2]);
    //console.log("\n",this.modules.m_trans.get_translation(_thisObject3D),"\n");
    // для нового перемещения нужно будет текущее положение объекта, поэтомуц получим и сохраним его в свойстве
    this.defaultPosition = this.modules.m_trans.get_object_center(_thisObject3D,0);
};

Particle.prototype.get_defaultPosition = function(){
  return this.defaultPosition
};
Particle.prototype.get_currentPosition = function(){
    return this.modules.m_trans.get_object_center(this.element3D,0)
};