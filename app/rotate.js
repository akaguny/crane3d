function Rotate(modules){
    this.modules = modules;
    this.quatNew = new Float32Array(4);
    this.quatOld = new Float32Array(4);
}

Rotate.prototype.rotate = function(deg,axis)
{
    this.modules.m_quat.setAxisAngle(axis,this.degToRad(deg), this.quatNew);
    this.modules.m_trans.get_rotation(this.element3D, this.quatOld);
    this.modules.m_quat.multiply(this.quatNew, this.quatOld, this.quatNew);
    this.modules.m_trans.set_rotation_v(this.element3D, this.quatNew);
};