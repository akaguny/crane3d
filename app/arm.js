/**
 * Created by alexey on 07.10.15.
 */
// Конструктор(класс-объект), другими словами объявление класса
function Arm(name,modules,AXIS){
    this.name = name;
    this.htmlElement = document.getElementById(name);
    this.modules = modules; // указывает на переменную modules в crane.js, а переменная объект, являющееся хэш таблицей
    // элементы которой указывают на модули движка
    this.element3D = this.modules.m_scenes.get_object_by_name(name);
    this.quatNew = Float32Array(4);
    this.quatOld = Float32Array(4);
    // вызываем хэшированную таблицу с осями
    this.axis = AXIS;


}
// Внутренняя функция(метод) класса eventListener, в неё передаётся тип события(eventName) и действие(func), которое должно быть
// выполнено по события
Arm.prototype.eventListener = function (eventName,func){
    // сдесь надо бы передать ось
    this.htmlElement.addEventListener(eventName,func);
};
Arm.prototype.degToRad = function (deg){
   return deg * (Math.PI / 180);
};
Arm.prototype.rotate = function (axis, deg){
    this.modules.m_quat.setAxisAngle(axis,this.degToRad(deg), this.quatNew);
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld);
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew);
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);
};