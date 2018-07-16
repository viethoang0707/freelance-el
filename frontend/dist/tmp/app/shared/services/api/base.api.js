"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../helpers/reflect");
var decorator_1 = require("./decorator");
var BaseAPI = (function () {
    function BaseAPI() {
    }
    Object.defineProperty(BaseAPI, "Method", {
        get: function () {
            return Reflect.getMetadata(decorator_1.METHOD_METADATA_KEY, this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAPI.prototype, "Method", {
        get: function () {
            return Reflect.getMetadata(decorator_1.METHOD_METADATA_KEY, this.constructor);
        },
        enumerable: true,
        configurable: true
    });
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;
