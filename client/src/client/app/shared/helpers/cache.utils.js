"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var CACHE_TIMEOUT = 1000 * 60 * 5;
var Cache = (function () {
    function Cache() {
    }
    Cache.objectChage = function (record, method) {
        var model = record.Model;
        if (this.hit(model))
            this.updateCache(model, record, method);
    };
    Cache.updateCache = function (model, record, method) {
        var records = this.load(model);
        if (method == 'CREATE')
            records.push(record);
        if (method == 'DELETE') {
            records = _.reject(records, function (obj) {
                return obj["id"] == record["id"];
            });
            this.save('USER_GROUP', records);
        }
    };
    Cache.save = function (key, val) {
        this.inlineStorage[key] = { val: val, timestamp: new Date() };
    };
    Cache.load = function (key) {
        if (key in this.inlineStorage)
            return this.inlineStorage[key]["val"];
        return null;
    };
    Cache.hit = function (key) {
        if (key in this.inlineStorage) {
            var now = new Date();
            var timestamp = this.inlineStorage[key]["timestamp"];
            var success = (now.getTime() - timestamp.getTime()) <= CACHE_TIMEOUT;
            if (!success)
                this.invalidate(key);
            return success;
        }
        return false;
    };
    Cache.invalidate = function (key) {
        delete this.inlineStorage[key];
    };
    Cache.invalidateAll = function () {
        this.inlineStorage = [];
    };
    Cache.inlineStorage = {};
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=cache.utils.js.map