"use strict";

b4w.register("crane", function(exports, require) {

    var m_app = require("app");
    var m_data = require("data");
    var m_main = require("main");
    var m_scenes = require("scenes");
    var m_trans = require("transform");
    var m_quat = require("quat");
    var m_arm = require("armature");

var modules =
    {
        m_app : m_app,
        m_data : m_data,
        m_main : m_main,
        m_scenes : m_scenes,
        m_trans : m_trans,
        m_quat : m_quat,
        m_arm : m_arm
    };
var AXIS =
    {
      X:[1, 0, 0],
      Y:[0, 1, 0],
      Z:[0, 0, 1]
    };
    exports.init = function() {
        m_app.init({
            canvas_container_id: "canvas3d",
            callback: init_cb,
            show_fps: true,
            console_verbose: true,
            autoresize: true
        });
    };

    /**
     * callback executed when the app is initizalized
     */
    function init_cb(canvas_elem, success) {

        if (!success) {
            console.log("b4w init failure");
            return;
        }

        load();
    }

    /**
     * load the scene data
     */
    function load() {
        m_data.load("src/data/crane.json", load_cb);
    }

    /**
     * callback executed when the scene is loaded
     */
    function load_cb(data_id) {
        m_app.enable_controls();
        m_app.enable_camera_controls();
    }
    // Ищем кнопки, ожидлаем действие
    function waiting() {
        document.getElementById('obj1UnitR18').addEventListener("click",function(){rotateUnit("obj1Unit",18)});
        document.getElementById('obj1UnitL18').addEventListener("click",function(){rotateUnit("obj1Unit",-18)});

        document.getElementById('obj2UnitR18').addEventListener("click",function(){rotateUnit("obj2Unit",18)});
        document.getElementById('obj2UnitL18').addEventListener("click",function(){rotateUnit("obj2Unit",-18)});

        document.getElementById('obj4UnitR18').addEventListener("click",function(){rotateUnit("obj4Unit",18)});
        document.getElementById('obj4UnitL18').addEventListener("click",function(){rotateUnit("obj4Unit",-18)});
        //but2.addEventListener("click",rotateUserObj());
    }
    function rotateUnit(o,d){
        // Далее по образу и подобию примера на странице 70 руководства
        // находим объект
        var rotateUnit = m_scenes.get_object_by_name(o);
        // переводим из градусов в радианы
        function degToRad(d){return d*(Math.PI/180)}
        // объявим оси
        var Y = new Float32Array([0, 1, 0]);
        var X = new Float32Array([1, 0, 0]);
        var Z = new Float32Array([0, 0, 1]);
        var AXIS;
        // мы знаем, какие у каждого объекта степени свободы, поэтому на основании имени решим по какой оси их вращать
        switch (o){
            case "obj1Unit":
                AXIS = Z;
                break;
            case "obj2Unit":
                AXIS = Z;
                break;
            case  "obj4Unit":
                AXIS = Y;
                break;
            default :
                console.log('Проверьте названия объектов, что передаются в функцию rotateUnit(~62 строка crane.js)');
        }

        var quat_tmp = new Float32Array(4);
        var quat_tmp2 = new Float32Array(4);

        m_quat.setAxisAngle(AXIS,-degToRad(d),quat_tmp);
        m_trans.get_rotation(rotateUnit, quat_tmp2);
        m_quat.multiply(quat_tmp, quat_tmp2, quat_tmp);
        m_trans.set_rotation_v(rotateUnit, quat_tmp);
    }


});

// import the app module and start the app by calling the init method
b4w.require("crane").init();