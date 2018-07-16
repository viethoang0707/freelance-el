"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../helpers/reflect");
var MethodRegister = (function () {
    function MethodRegister() {
        this.registry = {};
    }
    Object.defineProperty(MethodRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new MethodRegister());
        },
        enumerable: true,
        configurable: true
    });
    MethodRegister.prototype.register = function (method, ctor) {
        this.registry[method] = ctor;
    };
    MethodRegister.prototype.lookup = function (method) {
        return this.registry[method];
    };
    MethodRegister.prototype.instantiateObject = function (method) {
        var ctor = this.registry[method];
        return ctor ? new ctor() : null;
    };
    return MethodRegister;
}());
exports.MethodRegister = MethodRegister;
exports.METHOD_METADATA_KEY = Symbol("method");
function Method(model) {
    return function (ctor) {
        MethodRegister.Instance.register(model, ctor);
        Reflect.defineMetadata(exports.METHOD_METADATA_KEY, model, ctor);
    };
}
exports.Method = Method;
