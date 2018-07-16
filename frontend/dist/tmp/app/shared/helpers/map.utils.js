"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./reflect");
var decorator_1 = require("../models/decorator");
var moment = require("moment");
var constants_1 = require("../models/constants");
var decorator_2 = require("../models/decorator");
var MapUtils = (function () {
    function MapUtils() {
    }
    MapUtils.isPrimitive = function (obj) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }
        return !!(obj instanceof String || obj === String ||
            obj instanceof Number || obj === Number ||
            obj instanceof Boolean || obj === Boolean);
    };
    MapUtils.isDate = function (clazz) {
        return (clazz instanceof Date);
    };
    MapUtils.isArray = function (object) {
        if (object === Array) {
            return true;
        }
        else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    };
    MapUtils.getClazz = function (target, propertyKey) {
        return Reflect.getMetadata("design:type", target, propertyKey);
    };
    MapUtils.getFieldProperty = function (target, propertyKey) {
        return Reflect.getMetadata(decorator_1.FIELD_METADATA_KEY, target, propertyKey);
    };
    MapUtils.getLocalProperty = function (target, propertyKey) {
        return Reflect.getMetadata(decorator_1.FIELD_METADATA_KEY, target, propertyKey);
    };
    MapUtils.deserialize = function (clazz, jsonObject) {
        if ((clazz === undefined) || (jsonObject === undefined))
            return undefined;
        var obj = new clazz();
        Object.keys(obj).forEach(function (key) {
            var propertyMetadataFn = function (propertyMetadata) {
                var propertyName = propertyMetadata.name || key;
                var innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                var clazz = MapUtils.getClazz(obj, key);
                if (!jsonObject[propertyName])
                    return null;
                if (MapUtils.isArray(clazz)) {
                    var metadata_1 = MapUtils.getLocalProperty(obj, key);
                    if (metadata_1.clazz || MapUtils.isPrimitive(clazz)) {
                        if (innerJson && MapUtils.isArray(innerJson)) {
                            return innerJson.map(function (item) { return MapUtils.deserialize(metadata_1.clazz, item); });
                        }
                        else {
                            return undefined;
                        }
                    }
                    else {
                        return innerJson;
                    }
                }
                else if (MapUtils.isPrimitive(clazz)) {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
                else if (MapUtils.isDate(new clazz())) {
                    return jsonObject ? moment(jsonObject[propertyName], constants_1.SERVER_DATETIME_FORMAT).toDate() : undefined;
                }
                else {
                    return MapUtils.deserialize(clazz, innerJson);
                }
            };
            var propertyMetadata = MapUtils.getFieldProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            }
            else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    };
    MapUtils.deserializeModel = function (model, jsonObject) {
        if (!jsonObject)
            return undefined;
        var obj = decorator_2.ModelRegister.Instance.instantiateObject(model);
        Object.keys(obj).forEach(function (key) {
            var propertyMetadataFn = function (propertyMetadata) {
                var propertyName = propertyMetadata.name || key;
                var innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                var clazz = MapUtils.getClazz(obj, key);
                if (!jsonObject[propertyName])
                    return null;
                if (MapUtils.isPrimitive(clazz)) {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
                else if (MapUtils.isDate(new clazz())) {
                    return jsonObject ? moment(jsonObject[propertyName], constants_1.SERVER_DATETIME_FORMAT).toDate() : undefined;
                }
            };
            var propertyMetadata = MapUtils.getFieldProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            }
            else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    };
    MapUtils.serialize = function (object) {
        if (object === undefined)
            return {};
        var jsonObject = {};
        Object.keys(object).forEach(function (key) {
            if (MapUtils.isDate(object[key]))
                jsonObject[key] = moment(object[key]).format(constants_1.SERVER_DATETIME_FORMAT);
            else {
                jsonObject[key] = object[key];
                if (jsonObject[key] && jsonObject[key] instanceof Object)
                    jsonObject[key] = null;
            }
        });
        return jsonObject;
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;
