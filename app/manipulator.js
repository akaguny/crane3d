/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    this.modules = modules;
    // Возможно пригодится указание на текущую сцену, но пока она всего 1 - m_scenes.get_active_scene();
    // в перспективе можно добавлять элементы на активную сцену с неактивной.
    this.scene = this.modules.m_scenes.get_active_scene();
    this.arms = {};
    this.fingers = {};
    this.hand = {};
}

var i;
// не потеряется ли this из-за того что он находится в цикле?
// как в примере https://learn.javascript.ru/object-methods#ссылочный-тип
  do {
      this.arms['arm_'+i]=this.modules.get_object_by_name('arm_'+i);
      if (((this.arms['arm_'+i])==null) && (i==0))
      {console.log("ничего не найдено")}
      i++
  }
  while(this.modules.get_object_by_name()!==null);