"use strict";
function CraneGUI(id) {
    this.htmlElement = document.getElementById(id);
    this.type = this.htmlElement.tagName;
    //if (this.type === "INPUT")
}

CraneGUI.prototype.set_value = function (value) {
    if (this.type === "INPUT")
        this.htmlElement.value = value;
};
CraneGUI.prototype.get_value = function () {
    if (this.type === "INPUT")
    return +this.htmlElement.value
};
CraneGUI.prototype.addEventListener = function (event,func) {
    this.htmlElement.addEventListener(event,func);
};