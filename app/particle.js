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
    this.rotationGlobal = {x:0, y:0, z:0};
    // вызываем хэшированную таблицу с осями
    this.axis = AXISES;
}

// 1.1 Методы в прототип
Particle.prototype.eventListener = function (objectName,action,eventName,func){
    var htmlElement = document.getElementById(objectName+action);
    htmlElement.addEventListener(eventName,func);
};

Particle.degToRad = function (deg){
    return (deg * (Math.PI / 180));
};

Particle.getCurrentAxis = function(axises){
    // (условие ? если true : если false)
    return axises[0] ? "x" :
        axises[1] ? "y" :
            axises[2] ? "z":
        console.log("Ошибка");
};

Particle.prototype.rotate = function(axises, deg)
{

    this.modules.m_quat.setAxisAngle(axises, Particle.degToRad(deg), this.quatNew);
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld);
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew);
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);

    // получим текущую ось и прибавим к ней текущий угол поворота
    this.rotationGlobal[Particle.getCurrentAxis(axises)] += deg;
};

