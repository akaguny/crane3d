"use strict";

b4w.register("crane", function(exports, require) {
    var m_app = require("app");
    var m_data = require("data");
    var m_main = require("main");
    var m_scenes = require("scenes");
    var m_trans = require("transform");
    var m_quat = require("quat");
    var m_arm = require("armature");
    var m_vec3 = require("vec3");

    var modules =
    {
        m_app : m_app,
        m_data : m_data,
        m_main : m_main,
        m_scenes : m_scenes,
        m_trans : m_trans,
        m_quat : m_quat,
        m_arm : m_arm,
        m_vec3:m_vec3
    };




    exports.init = function() {
        m_app.init({
            autoresize: true,
            canvas_container_id: "canvas3d",
            callback: init_cb,
            show_fps: true,
            console_verbose: true
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
        var manipulator = new Manipulator(modules);
        m_app.enable_controls();
        m_app.enable_camera_controls();
    }


});

// import the app module and start the app by calling the init method
b4w.require("crane").init();