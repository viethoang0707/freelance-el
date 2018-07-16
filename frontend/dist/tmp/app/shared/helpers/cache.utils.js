"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var CACHE_TIMEOUT = 1000 * 60 * 5;
var Cache = (function () {
    function Cache() {
    }
    Cache.objectCreate = function (record) {
        var model = record.Model;
        if (this.hit(model)) {
            var records = this.load(model);
            records.push(record);
        }
    };
    Cache.objectDelete = function (model, id) {
        if (this.hit(model)) {
            var records = this.load(model);
            records = _.reject(records, function (obj) {
                return obj["id"] == id;
            });
            this.save(model, records);
        }
    };
    Cache.objectUpdate = function (record) {
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
