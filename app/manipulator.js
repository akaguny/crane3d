/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    this.AXIS ={X:[1, 0, 0],Y:[0, 1, 0],Z:[0, 0, 1]};
    var armsNames = ["Arm_0","Arm_1","Arm_2"];
    this.fingersNames = ["finger_0","finger_1","finger_2","finger_3"];
    var handNames = ["Hand_0"];
    //var rotationAreaNames = ["rotationArea_0"];

    this.modules = modules;
    //this.scene = this.modules.m_scenes.get_active_scene;
    // Создадим хеш-таблицу(хеш/словарь/ассоцаативный массив, состоящий из
    // объектов соответствующих классов)
    this.arms = {};
    this.fingers = {};
    this.hand = {};
    //this.rotationAreaNames = {};

    // Вызываем функцию для заполнения объекта arm
    // Первый аргумент - массив имён, второй - тип/имя объекта
    this.createObjectsByArray(armsNames, "arm");
    console.log(this.arms);

    this.createObjectsByArray(handNames, "hand");
    console.log(this.hand);

    this.createObjectsByArray(this.fingersNames, "finger");
    console.log(this.fingers);
}

Manipulator.prototype.clenchFingers = function (){

};

Manipulator.prototype.createObjectsByArray = function (names, type){
    for (var i = 0; i<names.length; i++){
        switch (type){
            case "arm":
                this.arms[names[i]] = new Arm(names[i],this.modules,this.AXIS,{x:90, y:90, z:5});
                var arm = this.arms[names[i]];
                console.log(arm);
                arm.button_left =  document.getElementById(names[i]+"_left");
                var _this = arm;
                arm.button_left.addEventListener("click", function(){
                    _this.rotate(_this.axis.Y, 18);
                    console.log(_this);
                });

                arm.button_right =  document.getElementById(names[i]+"_right");
                arm.button_right.addEventListener("click", function(){
                    _this.rotate(_this.axis.Y, -18)
                });

                arm.button_up =  document.getElementById(names[i]+"_up");
                arm.button_up.addEventListener("click", function(){
                    _this.rotate(_this.axis.Z, 18);
                    console.log(_this);
                });

                arm.button_down =  document.getElementById(names[i]+"_down");
                arm.button_down.addEventListener("click", function(){
                    _this.rotate(_this.axis.Z, -18)
                });

                // Если _
                if (_this == "Arm_1"){_this.rotate(_this.axis.Z, 90)};
                break;

            case "hand":
                this.hand[names[i]] = new Hand(names[i],this.modules,this.AXIS,{x:90, y:90, z:5});
                var hand = this.hand[names[i]];
                var _this = hand;
                console.log(_this);

                _this.button_left =  document.getElementById(names[i]+"_left");
                _this.button_left.addEventListener("click", function(){
                    _this.rotate(_this.axis.X, 18)
                });

                _this.button_right =  document.getElementById(names[i]+"_right");
                _this.button_right.addEventListener("click", function(){
                    _this.rotate(_this.axis.Y, -18)
                });
                break;
            //case "rotationArea":
            //    //this.rotationAreaNames[names[i]] = new Arm(names[i],this.modules,this.AXIS);
            //    break;
            case "finger":

                this.fingers[names[i]] = new Finger(names[i],this.modules,this.AXIS,{x:0, y:0, z:90},i);
                    //// если чётный
                    //if (!(i % 2)){
                    //    _this.button_clench = document.getElementById("finger"+"_clench");
                    //    _this.button_clench.addEventListener("click", function () {
                    //        _this.rotate(_this.axis.Z, 18);
                    //    });
                    //}
                    //else{
                    //    _this.button_clench = document.getElementById("finger"+"_unclench");
                    //    _this.button_clench.addEventListener("click", function () {
                    //        _this.rotate(_this.axis.Z, -18);
                    //    });
                    //}
                break;
        }
    }
};