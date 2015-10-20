// Конструктор(класс-объект), другими словами объявление класса
function Arm(name,modules,AXIS){
    this.name = name;
    this.htmlElement = document.getElementById(name);
    this.modules = modules; // указывает на переменную modules в crane.js, а переменная объект, являющееся хэш таблицей
    // элементы которой указывают на модули движка
    this.element3D = this.modules.m_scenes.get_object_by_name(name);

    this.quatNew = new Float32Array(4);
    this.quatOld = new Float32Array(4);
    // вызываем хэшированную таблицу с осями
    this.axis = AXIS;


}



// Внутренняя функция(метод) eventListener класса Arm, в неё передаётся тип события(eventName) и действие(func), которое должно быть
// выполнено по события
Arm.prototype.eventListener = function (eventName,func){
    this.htmlElement.addEventListener(eventName,func);
};
Arm.prototype.degToRad = function (deg){
    return deg * (Math.PI / 180);
};
Arm.prototype.rotate = function (axis, deg){
    this.modules.m_quat.setAxisAngle(axis,this.degToRad(deg), this.quatNew); // setAxisAngle(axis, rad, out) → {Quat}
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld); // получение с записью в виде кватериона старого положения
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew); // multiply(a, b, out) → {Quat}
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);
};