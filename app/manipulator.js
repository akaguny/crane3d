/**
 * Created by alexey on 12.10.15.
 */
function Manipulator(modules)
{
    // ОСИ. [X,Y,Z]
    this.AXIS ={X:[1, 0, 0],Y:[0, 1, 0],Z:[0, 0, 1]};
    // Массивы имён 3D объектов
    var armsNames = ["Arm_0","Arm_1","Arm_2"];
    //var fingersNames = ["Finger_0","Finger_1","Finger_2","Finger_3"];
    var handNames = ["Hand_0"];
    //var rotationAreaNames = ["rotationArea_0"];

    // Массивы имён html элементов
    var buttonsNames = ["button_up","button_down","button_left","button_right"];

    this.modules = modules;
    //this.scene = this.modules.m_scenes.get_active_scene;
    // Создадим хеш-таблицу(хеш/словарь/ассоцаативный массив, состоящий из
    // объектов соответствующих классов)
    this.arms = {};
    this.fingers = {};
    this.hand = {};
    this.rotationAreaNames = {};

    // Вызываем функцию для заполнения объекта arm
    // Первый аргумент - массив имён, второй - тип/имя объекта
    this.createObjectsByArray(armsNames,buttonsNames, "arm");
    console.log(this.arms);

    this.createObjectsByArray(handNames,buttonsNames, "hand");
    console.log(this.hand);
}

// функция, которая в зависимости от кнопки нажатой кнопки поворачивает объект
Manipulator.prototype.rotateFunc = function(_this,button){
    switch (button) {
        case "button_left" :
            _this.rotate(_this.axis.Y, 18);
            break;
        case "button_right" :
            _this.rotate(_this.axis.Y, -18);
            break;
        case "button_up" :
            _this.rotate(_this.axis.Z, 18);
            break;
        case "button_down" :
            _this.rotate(_this.axis.Z, -18);
    }
};

// Функция createObjectsByArray создаёт объекты по имени. Получает на входе имя и условный тип
// в теле функции также происходят манипуляции с вновь созданными объяектами, их вращение
Manipulator.prototype.createObjectsByArray = function (names,buttons, type){
    for (var i = 0; i<names.length; i++){
        switch (type){
            case "arm":
                this.arms[names[i]] = new Arm(names[i],this.modules,this.AXIS);
                var arm = this.arms[names[i]];
                console.log(arm);
                _this = arm;
                for (var j = 0; j<buttons; j++){
                    // передаём текущую кнопку
                    Manipulator.prototype.rotateFunc(_this,buttons[j])
                }
                _this.buttons[j] = _this.eventListener(buttons[j],"click",eventName,func);


        // Если _this Arm_1
        if (_this == "Arm_1"){_this.rotate(_this.axis.Z, 90);}
        break;
    case "hand":
        this.hand[names[i]] = new Hand(names[i],this.modules,this.AXIS);
        var hand = this.hand[names[i]];
        console.log(hand);
        _this = hand;
        _this = arm;
        for (var j = 0; j<buttons; j++){
            // передаём текущую кнопку
            Manipulator.prototype.rotateFunc(_this,buttons[j])
        }
        _this.buttons[j] = _this.eventListener(buttons[j],"click",eventName,func);
                break;
                //case "rotationArea":
                //    //this.rotationAreaNames[names[i]] = new Arm(names[i],this.modules,this.AXIS);
                //    break;
                //case "finger":
                //    this.fingers[names[i]] = new Finger(names[i],this.modules,this.AXIS);
                //    break;
            }
        }}}};
