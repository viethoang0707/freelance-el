"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseUnitRegister = (function () {
    function CourseUnitRegister() {
        this.registry = {};
    }
    Object.defineProperty(CourseUnitRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new CourseUnitRegister());
        },
        enumerable: true,
        configurable: true
    });
    CourseUnitRegister.prototype.register = function (type, ctor) {
        this.registry[type] = ctor;
    };
    CourseUnitRegister.prototype.lookup = function (type) {
        return this.registry[type];
    };
    return CourseUnitRegister;
}());
exports.CourseUnitRegister = CourseUnitRegister;
function CourseUnitTemplate(args) {
    return function (ctor) {
        CourseUnitRegister.Instance.register(args.type, ctor);
    };
}
exports.CourseUnitTemplate = CourseUnitTemplate;
