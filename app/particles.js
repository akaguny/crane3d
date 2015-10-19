/**
 * Created by alexey on 14.10.15.
 */
// 1. Конструктор Part
function Part(name,modules,AXIS){
    this.name = name;
    this.htmlElement = document.getElementById(name);
    this.modules = modules;
    this.element3D = this.modules.m_scenes.get_object_by_name(name);

    this.quatNew = new Float32Array(4);
    this.quatOld = new Float32Array(4);
    this.axis = AXIS;
}

// 1.1 Методы в прототип
Part.prototype.eventListener = function (eventName,func){
    this.htmlElement.addEventListener(eventName,func);
};
Part.prototype.degToRad = function (deg){
    return deg * (Math.PI / 180);
};

Part.prototype.rotate = function(deg,axis)
{
    this.modules.m_quat.setAxisAngle(axis,this.degToRad(deg), this.quatNew);
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld);
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew);
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);
};
