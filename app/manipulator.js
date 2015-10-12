/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    this.modules = modules;
    // Возможно пригодится указание на текущую сцену, но пока она всего 1 - m_scenes.get_active_scene();
    // в перспективе можно добавлять элементы на активную сцену с неактивной.
    this.scene = this.modules.m_scenes.get_active_scene();
    this.arms = manipulatorObjects('Arm');
    this.fingers = manipulatorObjects('Finger');
    this.hand = manipulatorObjects('Hand');
}


var manipulatorObjects = function(unitType){get_ManipulatorObjects(unitType)};

Manipulator.prototype.get_ManipulatorObjects = function(unitType)
{
    var i = 0;
  do {
      name + "_" + i: this.modules.get_object_by_name(name + "_" + i);
      i++
  }
  while(this.modules.get_object_by_name());
};