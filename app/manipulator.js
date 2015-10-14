/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    this.AXIS ={X:[1, 0, 0],Y:[0, 1, 0],Z:[0, 0, 1]};
    var armsNames = ["Arm_0"/*,"Arm_1","Arm_2"*/];
    var fingersNames = ["Finger_0","Finger_1","Finger_2","Finger_3"];
    var handNames = ["Hand_0"];
    var rotationAreaNames = ["rotationArea_0"];

    this.modules = modules;
    this.scene = this.modules.m_scenes.get_active_scene;

    this.arms = {};
    this.fingers = {};
    this.hand = {};
    this.rotationAreaNames = {};

    this.createObjectsByArray(armsNames, "arm");
    console.log(this.arms);
}

Manipulator.prototype.createObjectsByArray = function (names, type){
  for (var i = 0; i<names.length; i++){
    switch (type){
        case "arm":
            this.arms[names[i]] = new Arm(names[i],this.modules,this.AXIS);
            var arm = this.arms[names[i]];

            arm.button_left =  document.getElementById(names[i]+"_left");
            arm.button_left.addEventListener("click", function(){
                arm.rotate(arm.axis.Y, 18)
            });

            arm.button_right =  document.getElementById(names[i]+"_right");
            arm.button_right.addEventListener("click", function(){
                arm.rotate(arm.axis.Y, -18)
            });

            break;
        case "finger":
            this.fingers[names[i]] = new Finger(names[i],this.modules,this.AXIS);
            break;
        case "hand":
            //this.hand[names[i]] = new Arm(names[i],this.modules,this.AXIS);
            break;
        case "rotationArea":
            //this.rotationAreaNames[names[i]] = new Arm(names[i],this.modules,this.AXIS);
            break;
    }
  }

  };