"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../helpers/reflect");
var ModelRegister = (function () {
    function ModelRegister() {
        this.registry = {};
    }
    Object.defineProperty(ModelRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new ModelRegister());
        },
        enumerable: true,
        configurable: true
    });
    ModelRegister.prototype.register = function (model, ctor) {
        this.registry[model] = ctor;
    };
    ModelRegister.prototype.lookup = function (model) {
        return this.registry[model];
    };
    ModelRegister.prototype.instantiateObject = function (model) {
        var ctor = this.registry[model];
        return ctor ? new ctor() : null;
    };
    return ModelRegister;
}());
exports.ModelRegister = ModelRegister;
exports.MODEL_METADATA_KEY = Symbol("model");
function Model(model) {
    return function (ctor) {
        ModelRegister.Instance.register(model, ctor);
        Reflect.defineMetadata(exports.MODEL_METADATA_KEY, model, ctor);
    };
}
exports.Model = Model;
exports.FIELD_METADATA_KEY = "fieldProperty";
function FieldProperty(metadata) {
    if (metadata instanceof String || typeof metadata === "string") {
        return Reflect.metadata(exports.FIELD_METADATA_KEY, {
            name: metadata,
            clazz: undefined
        });
    }
    else {
        var metadataObj = metadata;
        return Reflect.metadata(exports.FIELD_METADATA_KEY, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined
        });
    }
}
exports.FieldProperty = FieldProperty;
