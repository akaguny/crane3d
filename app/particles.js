/**
 * Created by alexey on 14.10.15.
 */
// 1. Конструктор Particles
function Particles(name,modules,AXIS){
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

// 1.1 Методы в прототип
Particles.prototype.eventListener = function (eventName,func){
    this.htmlElement.addEventListener(eventName,func);
};
Particles.prototype.degToRad = function (deg){
    return deg * (Math.PI / 180);
};

Particles.prototype.rotate = function(deg,axis)
{
    console.log(this.quatNew);
    this.modules.m_quat.setAxisAngle(axis,this.degToRad(deg), this.quatNew);
    console.log(this.quatNew);
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld);
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew);
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);
};
