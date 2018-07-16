"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../helpers/reflect");
var map_utils_1 = require("../helpers/map.utils");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("./decorator");
var _ = require("underscore");
var create_api_1 = require("../services/api/create.api");
var update_api_1 = require("../services/api/update.api");
var delete_api_1 = require("../services/api/delete.api");
var bulk_create_api_1 = require("../services/api/bulk-create.api");
var bulk_delete_api_1 = require("../services/api/bulk-delete.api");
var bulk_update_api_1 = require("../services/api/bulk-update.api");
var list_api_1 = require("../services/api/list.api");
var bulk_list_api_1 = require("../services/api/bulk-list.api");
var search_count_api_1 = require("../services/api/search-count.api");
var bulk_search_count_api_1 = require("../services/api/bulk-search-count.api");
var search_read_api_1 = require("../services/api/search-read.api");
var bulk_search_read_api_1 = require("../services/api/bulk-search-read.api");
var execute_api_1 = require("../services/api/execute.api");
var cache_utils_1 = require("../helpers/cache.utils");
var BaseModel = (function () {
    function BaseModel() {
        this.id = undefined;
        this.active = undefined;
        this.create_date = undefined;
        this.create_uid = undefined;
        this.create_uid__DESC__ = undefined;
        this.write_date = undefined;
        this.write_uid = undefined;
        this.write_uid__DESC__ = undefined;
    }
    Object.defineProperty(BaseModel.prototype, "IsNew", {
        get: function () {
            return this.id == null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseModel, "Model", {
        get: function () {
            return Reflect.getMetadata(decorator_1.MODEL_METADATA_KEY, this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseModel.prototype, "Model", {
        get: function () {
            return Reflect.getMetadata(decorator_1.MODEL_METADATA_KEY, this.constructor);
        },
        enumerable: true,
        configurable: true
    });
    BaseModel.prototype.__api__create = function () {
        var model = this.Model;
        return new create_api_1.CreateAPI(model, map_utils_1.MapUtils.serialize(this));
    };
    BaseModel.prototype.__api__update = function () {
        var model = this.Model;
        return new update_api_1.UpdateAPI(model, this.id, map_utils_1.MapUtils.serialize(this));
    };
    BaseModel.prototype.__api__delete = function () {
        var model = this.Model;
        return new delete_api_1.DeleteAPI(model, this.id);
    };
    BaseModel.__api__get = function (ids) {
        var model = this.Model;
        return new list_api_1.ListAPI(model, ids, []);
    };
    BaseModel.__api__count = function (domain) {
        var model = this.Model;
        return new search_count_api_1.SearchCountAPI(model, domain);
    };
    BaseModel.__api__search = function (fields, domain) {
        var model = this.Model;
        return new search_read_api_1.SearchReadAPI(model, fields, domain);
    };
    BaseModel.__api__all = function () {
        var model = this.Model;
        return new search_read_api_1.SearchAllAPI(model);
    };
    BaseModel.__api__excute = function (method, paramsList, paramsDict) {
        var model = this.Model;
        return new execute_api_1.ExecuteAPI(model, method, paramsList, paramsDict);
    };
    BaseModel.__api__bulk_create = function (apiList) {
        var api = new bulk_create_api_1.BulkCreateAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.__api__bulk_update = function (apiList) {
        var api = new bulk_update_api_1.BulkUpdateAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.__api__bulk_delete = function (apiList) {
        var api = new bulk_delete_api_1.BulkDeleteAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.__api__bulk_list = function (apiList) {
        var api = new bulk_list_api_1.BulkListAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.__api__bulk_count = function (apiList) {
        var api = new bulk_search_count_api_1.BulkSearchCountAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.__api__bulk_search = function (apiList) {
        var api = new bulk_search_read_api_1.BulkSearchReadAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.__api__countAll = function () {
        var model = this.Model;
        return new search_count_api_1.SearchCountAPI(model, "[]");
    };
    BaseModel.bulk_create = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        if (apiList.length == 0)
            return Rx_1.Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_create(apiList), token).map(function (jsonArr) {
            var objects = [];
            var resp = _.flatten(jsonArr);
            for (var i = 0; i < resp.length; i++) {
                var api = apiList[i];
                var object = map_utils_1.MapUtils.deserializeModel(api.params["model"], resp[i]["record"]);
                objects.push(object);
                cache_utils_1.Cache.objectCreate(object);
            }
            return objects;
        });
    };
    BaseModel.bulk_update = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        if (apiList.length == 0)
            return Rx_1.Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_update(apiList), token).do(function () {
            for (var i = 0; i < apiList.length; i++) {
                var api = apiList[i];
                var object = map_utils_1.MapUtils.deserializeModel(api.params["model"], api.params["values"]);
                cache_utils_1.Cache.objectUpdate(object);
            }
        });
    };
    BaseModel.bulk_delete = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        if (apiList.length == 0)
            return Rx_1.Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_delete(apiList), token).do(function () {
            for (var i = 0; i < apiList.length; i++) {
                var api = apiList[i];
                cache_utils_1.Cache.objectDelete(api.params["model"], api.params["id"]);
            }
        });
    };
    BaseModel.bulk_list = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        if (apiList.length == 0)
            return Rx_1.Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_list(apiList), token).do(function (jsonArr) {
            for (var i = 0; i < apiList.length; i++) {
                var objArr = jsonArr[i];
                var api = apiList[i];
                var model = api.params["model"];
                _.each(objArr, function (jsonObj) {
                    var object = map_utils_1.MapUtils.deserializeModel(model, jsonObj);
                    cache_utils_1.Cache.objectUpdate(object);
                });
            }
        });
    };
    BaseModel.bulk_count = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        if (apiList.length == 0)
            return Rx_1.Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_count(apiList), token);
    };
    BaseModel.bulk_search = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        if (apiList.length == 0)
            return Rx_1.Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_search(apiList), token).do(function (jsonArr) {
            for (var i = 0; i < apiList.length; i++) {
                var api = apiList[i];
                if (api instanceof search_read_api_1.SearchAllAPI) {
                    var objArr = jsonArr[i];
                    var model = api.params["model"];
                    var objects = _.map(objArr, function (jsonObj) {
                        return map_utils_1.MapUtils.deserializeModel(model, jsonObj);
                    });
                    cache_utils_1.Cache.save(model, objects);
                }
            }
        });
    };
    BaseModel.countAll = function (context) {
        var model = this.Model;
        if (cache_utils_1.Cache.hit(model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(model)).map(function (records) {
                return records.length;
            });
        return this.count(context, "[]");
    };
    BaseModel.prototype.refresh = function (context) {
        var _this = this;
        if (this.id) {
            var getApi = new list_api_1.ListAPI(this.Model, [this.id], []);
            return context.apiService.execute(getApi, context.authService.LoginToken).do(function (items) {
                var object = map_utils_1.MapUtils.deserializeModel(_this.Model, items[0]);
                Object.assign(_this, object);
                cache_utils_1.Cache.objectUpdate(_this);
            });
        }
        else
            return Rx_1.Observable.of(this);
    };
    BaseModel.prototype.save = function (context) {
        var _this = this;
        var token = context.authService.LoginToken;
        if (!this.id) {
            return context.apiService.execute(this.__api__create(), token).map(function (data) {
                var object = map_utils_1.MapUtils.deserializeModel(_this.Model, data.record);
                Object.assign(_this, object);
                cache_utils_1.Cache.objectCreate(_this);
                return _this;
            });
        }
        else {
            return context.apiService.execute(this.__api__update(), token).do(function () {
                cache_utils_1.Cache.objectUpdate(_this);
            });
        }
    };
    BaseModel.prototype.delete = function (context) {
        var _this = this;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__delete(), token).do(function () {
            cache_utils_1.Cache.objectDelete(_this.Model, _this.id);
        });
    };
    BaseModel.single = function (context, fields, domain) {
        var _this = this;
        var model = this.Model;
        return this.search(context, fields, domain).map(function (objects) {
            var records = _this.toArray(objects);
            if (records.length)
                return records[0];
            return null;
        });
    };
    BaseModel.createArray = function (context, objects) {
        var apiList = _.map(objects, function (object) {
            return object.__api__create();
        });
        return BaseModel.bulk_create.apply(BaseModel, [context].concat(apiList));
    };
    BaseModel.updateArray = function (context, objects) {
        var apiList = _.map(objects, function (object) {
            return object.__api__update();
        });
        return BaseModel.bulk_update.apply(BaseModel, [context].concat(apiList));
    };
    BaseModel.deleteArray = function (context, objects) {
        var apiList = _.map(objects, function (object) {
            return object.__api__delete();
        });
        return BaseModel.bulk_delete.apply(BaseModel, [context].concat(apiList));
    };
    BaseModel.toArray = function (jsonArr) {
        var model = this.Model;
        return _.map(jsonArr, function (object) {
            return map_utils_1.MapUtils.deserializeModel(model, object);
        });
    };
    BaseModel.count = function (context, domain) {
        if (!domain)
            domain = "[]";
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__count(domain), token);
    };
    BaseModel.search = function (context, fields, domain) {
        var _this = this;
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__search(fields, domain), token).map(function (objects) {
            return _this.toArray(objects);
        });
    };
    BaseModel.all = function (context) {
        var model = this.Model;
        if (cache_utils_1.Cache.hit(model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(model));
        return this.search(context, [], '[]').do(function (records) {
            cache_utils_1.Cache.save(model, records);
        });
    };
    BaseModel.get = function (context, id) {
        var _this = this;
        if (!id)
            return Rx_1.Observable.of(null);
        var model = this.Model;
        if (cache_utils_1.Cache.hit(model)) {
            var records = cache_utils_1.Cache.load(model);
            var record = _.find(records, function (obj) {
                return obj["id"] == id;
            });
            if (record)
                return Rx_1.Observable.of(record);
        }
        return this.array(context, [id]).map(function (items) {
            items = _this.toArray(items);
            if (items && items.length) {
                var record = items[0];
                cache_utils_1.Cache.objectUpdate(items);
                return record;
            }
            else
                return null;
        });
    };
    BaseModel.array = function (context, ids) {
        var _this = this;
        if (ids.length == 0)
            return Rx_1.Observable.of([]);
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__get(ids), token).map(function (objects) {
            return _this.toArray(objects);
        });
    };
    BaseModel.executeRemote = function (context, method, paramsList, paramsDict) {
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__excute(method, paramsList, paramsDict), token);
    };
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], BaseModel.prototype, "create_date", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], BaseModel.prototype, "write_date", void 0);
    return BaseModel;
}());
exports.BaseModel = BaseModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4QkFBNkI7QUFFN0Isa0RBQWdEO0FBQ2hELDhCQUE4QztBQUM5Qyx5Q0FBK0U7QUFDL0UsOEJBQWdDO0FBQ2hDLHlEQUF1RDtBQUN2RCx5REFBdUQ7QUFDdkQseURBQXVEO0FBQ3ZELG1FQUFnRTtBQUNoRSxtRUFBZ0U7QUFDaEUsbUVBQWdFO0FBQ2hFLHFEQUFtRDtBQUNuRCwrREFBNEQ7QUFDNUQscUVBQWtFO0FBQ2xFLCtFQUEyRTtBQUMzRSxtRUFBOEU7QUFDOUUsNkVBQXlFO0FBQ3pFLDJEQUF5RDtBQUN6RCxzREFBK0M7QUFHL0M7SUFZSTtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBR0Qsc0JBQUksNEJBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQkFBSzthQUFoQjtZQUNJLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyw4QkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRCQUFLO2FBQVQ7WUFDSSxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsOEJBQWtCLEVBQUUsSUFBSSxD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T0FBTztZQUN0RSxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sdUJBQWEsR0FBcEIsVUFBcUIsT0FBbUIsRUFBRSxNQUFjLEVBQUUsVUFBaUIsRUFBRSxVQUFlO1FBQ3hGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDM0MsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQXRXRDtRQURDLHlCQUFhLEVBQVE7a0NBQ1QsSUFBSTtrREFBQztJQUVsQjtRQURDLHlCQUFhLEVBQVE7a0NBQ1YsSUFBSTtpREFBQztJQXNXckIsZ0JBQUM7Q0EzV0QsQUEyV0MsSUFBQTtBQTNXcUIsOEJBQVMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAgJy4uL2hlbHBlcnMvcmVmbGVjdCc7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IE1hcFV0aWxzIH0gZnJvbSAnLi4vaGVscGVycy9tYXAudXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTU9ERUxfTUVUQURBVEFfS0VZLCBNb2RlbFJlZ2lzdGVyLCBGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi9kZWNvcmF0b3InO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IENyZWF0ZUFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9jcmVhdGUuYXBpJztcbmltcG9ydCB7IFVwZGF0ZUFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS91cGRhdGUuYXBpJztcbmltcG9ydCB7IERlbGV0ZUFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9kZWxldGUuYXBpJztcbmltcG9ydCB7IEJ1bGtDcmVhdGVBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvYnVsay1jcmVhdGUuYXBpJztcbmltcG9ydCB7IEJ1bGtEZWxldGVBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvYnVsay1kZWxldGUuYXBpJztcbmltcG9ydCB7IEJ1bGtVcGRhdGVBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvYnVsay11cGRhdGUuYXBpJztcbmltcG9ydCB7IExpc3RBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvbGlzdC5hcGknO1xuaW1wb3J0IHsgQnVsa0xpc3RBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvYnVsay1saXN0LmFwaSc7XG5pbXBvcnQgeyBTZWFyY2hDb3VudEFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtY291bnQuYXBpJztcbmltcG9ydCB7IEJ1bGtTZWFyY2hDb3VudEFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9idWxrLXNlYXJjaC1jb3VudC5hcGknO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSwgU2VhcmNoQWxsQVBJIH0gZnJvbSAnLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBCdWxrU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9idWxrLXNlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VNb2RlbCB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgY3JlYXRlX2RhdGU6IERhdGU7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIHdyaXRlX2RhdGU6IERhdGU7XG4gICAgY3JlYXRlX3VpZDogbnVtYmVyO1xuICAgIGNyZWF0ZV91aWRfX0RFU0NfXzogc3RyaW5nO1xuICAgIHdyaXRlX3VpZDogbnVtYmVyO1xuICAgIHdyaXRlX3VpZF9fREVTQ19fOiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNyZWF0ZV9kYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNyZWF0ZV91aWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY3JlYXRlX3VpZF9fREVTQ19fID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLndyaXRlX2RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMud3JpdGVfdWlkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLndyaXRlX3VpZF9fREVTQ19fID0gdW5kZWZpbmVkO1xuICAgIH1cblxuXG4gICAgZ2V0IElzTmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCA9PSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgTW9kZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoTU9ERUxfTUVUQURBVEFfS0VZLCB0aGlzKTtcbiAgICB9XG5cbiAgICBnZXQgTW9kZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoTU9ERUxfTUVUQURBVEFfS0VZLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9XG5cbiAgICBfX2FwaV9fY3JlYXRlKCk6Q3JlYXRlQVBJIHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5Nb2RlbDtcbiAgICAgICAgcmV0dXJuIG5ldyBDcmVhdGVBUEkobW9kZWwsIE1hcFV0aWxzLnNlcmlhbGl6ZSh0aGlzKSk7XG4gICAgfVxuXG4gICAgX19hcGlfX3VwZGF0ZSgpOlVwZGF0ZUFQSSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuTW9kZWw7XG4gICAgICAgIHJldHVybiBuZXcgVXBkYXRlQVBJKG1vZGVsLCB0aGlzLmlkLCBNYXBVdGlscy5zZXJpYWxpemUodGhpcykpO1xuICAgIH1cblxuICAgIF9fYXBpX19kZWxldGUoKTpEZWxldGVBUEkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICByZXR1cm4gbmV3IERlbGV0ZUFQSShtb2RlbCwgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19nZXQoaWRzOiBhbnlbXSk6TGlzdEFQSSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuTW9kZWw7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEFQSShtb2RlbCxpZHMsIFtdKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBfX2FwaV9fY291bnQoZG9tYWluPzogc3RyaW5nKTpTZWFyY2hDb3VudEFQSSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuTW9kZWw7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoQ291bnRBUEkobW9kZWwsIGRvbWFpbik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19zZWFyY2goZmllbGRzOiBzdHJpbmdbXSwgZG9tYWluOiBzdHJpbmcpOlNlYXJjaFJlYWRBUEkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkobW9kZWwsIGZpZWxkcywgZG9tYWluKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2FsbCgpOlNlYXJjaFJlYWRBUEkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaEFsbEFQSShtb2RlbCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19leGN1dGUobWV0aG9kOiBzdHJpbmcsIHBhcmFtc0xpc3Q6IHN0cmluZ1tdLCBwYXJhbXNEaWN0OiBhbnkpOkV4ZWN1dGVBUEkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkobW9kZWwsIG1ldGhvZCwgcGFyYW1zTGlzdCxwYXJhbXNEaWN0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2J1bGtfY3JlYXRlKGFwaUxpc3Q6Q3JlYXRlQVBJW10pOkJ1bGtDcmVhdGVBUEkge1xuICAgICAgICB2YXIgYXBpID0gbmV3IEJ1bGtDcmVhdGVBUEkoKTtcbiAgICAgICAgXy5lYWNoKGFwaUxpc3QsIHN1YkFwaT0+IHtcbiAgICAgICAgICAgIGFwaS5hZGQoc3ViQXBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcGk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19idWxrX3VwZGF0ZShhcGlMaXN0OlVwZGF0ZUFQSVtdKTpCdWxrVXBkYXRlQVBJIHtcbiAgICAgICAgdmFyIGFwaSA9IG5ldyBCdWxrVXBkYXRlQVBJKCk7XG4gICAgICAgIF8uZWFjaChhcGlMaXN0LCBzdWJBcGk9PiB7XG4gICAgICAgICAgICBhcGkuYWRkKHN1YkFwaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXBpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fYnVsa19kZWxldGUoYXBpTGlzdDpEZWxldGVBUElbXSk6QnVsa0RlbGV0ZUFQSSB7XG4gICAgICAgIHZhciBhcGkgPSBuZXcgQnVsa0RlbGV0ZUFQSSgpO1xuICAgICAgICBfLmVhY2goYXBpTGlzdCwgc3ViQXBpPT4ge1xuICAgICAgICAgICAgYXBpLmFkZChzdWJBcGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFwaTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2J1bGtfbGlzdChhcGlMaXN0Okxpc3RBUElbXSk6QnVsa0xpc3RBUEkge1xuICAgICAgICB2YXIgYXBpID0gbmV3IEJ1bGtMaXN0QVBJKCk7XG4gICAgICAgIF8uZWFjaChhcGlMaXN0LCBzdWJBcGk9PiB7XG4gICAgICAgICAgICBhcGkuYWRkKHN1YkFwaSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFwaTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2J1bGtfY291bnQoYXBpTGlzdDpTZWFyY2hDb3VudEFQSVtdKTpCdWxrU2VhcmNoQ291bnRBUEkge1xuICAgICAgICB2YXIgYXBpID0gbmV3IEJ1bGtTZWFyY2hDb3VudEFQSSgpO1xuICAgICAgICBfLmVhY2goYXBpTGlzdCwgc3ViQXBpID0+IHtcbiAgICAgICAgICAgIGFwaS5hZGQoc3ViQXBpKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYXBpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fYnVsa19zZWFyY2goYXBpTGlzdDpTZWFyY2hSZWFkQVBJW10pOkJ1bGtTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgdmFyIGFwaSA9IG5ldyBCdWxrU2VhcmNoUmVhZEFQSSgpO1xuICAgICAgICBfLmVhY2goYXBpTGlzdCwgc3ViQXBpPT4ge1xuICAgICAgICAgICAgYXBpLmFkZChzdWJBcGkpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYXBpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fY291bnRBbGwoKTogU2VhcmNoQ291bnRBUEkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaENvdW50QVBJKG1vZGVsLCBcIltdXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBidWxrX2NyZWF0ZShjb250ZXh0OkFQSUNvbnRleHQsIC4uLmFwaUxpc3Q6Q3JlYXRlQVBJW10pOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChhcGlMaXN0Lmxlbmd0aD09MClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKFtdKTtcbiAgICAgICAgdmFyIHRva2VuID0gY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuO1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fYnVsa19jcmVhdGUoYXBpTGlzdCksIHRva2VuKS5tYXAoanNvbkFycj0+IHtcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gW107XG4gICAgICAgICAgICB2YXIgcmVzcCA9IF8uZmxhdHRlbihqc29uQXJyKTtcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8cmVzcC5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFwaSA9IGFwaUxpc3RbaV07XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9ICBNYXBVdGlscy5kZXNlcmlhbGl6ZU1vZGVsKGFwaS5wYXJhbXNbXCJtb2RlbFwiXSwgcmVzcFtpXVtcInJlY29yZFwiXSk7XG4gICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICAgICAgQ2FjaGUub2JqZWN0Q3JlYXRlKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJ1bGtfdXBkYXRlKGNvbnRleHQ6QVBJQ29udGV4dCwgLi4uYXBpTGlzdDpVcGRhdGVBUElbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKGFwaUxpc3QubGVuZ3RoPT0wKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoW10pO1xuICAgICAgICB2YXIgdG9rZW4gPSBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW47XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19idWxrX3VwZGF0ZShhcGlMaXN0KSwgdG9rZW4pLmRvKCgpPT4ge1xuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxhcGlMaXN0Lmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXBpID0gYXBpTGlzdFtpXTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gIE1hcFV0aWxzLmRlc2VyaWFsaXplTW9kZWwoYXBpLnBhcmFtc1tcIm1vZGVsXCJdLCBhcGkucGFyYW1zW1widmFsdWVzXCJdKTtcbiAgICAgICAgICAgICAgICBDYWNoZS5vYmplY3RVcGRhdGUob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJ1bGtfZGVsZXRlKGNvbnRleHQ6QVBJQ29udGV4dCwgLi4uYXBpTGlzdDpEZWxldGVBUElbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKGFwaUxpc3QubGVuZ3RoPT0wKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoW10pO1xuICAgICAgICB2YXIgdG9rZW4gPSBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW47XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19idWxrX2RlbGV0ZShhcGlMaXN0KSwgdG9rZW4pLmRvKCgpPT4ge1xuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxhcGlMaXN0Lmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXBpID0gYXBpTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBDYWNoZS5vYmplY3REZWxldGUoYXBpLnBhcmFtc1tcIm1vZGVsXCJdLCBhcGkucGFyYW1zW1wiaWRcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnVsa19saXN0KGNvbnRleHQ6QVBJQ29udGV4dCwgLi4uYXBpTGlzdDpMaXN0QVBJW10pOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChhcGlMaXN0Lmxlbmd0aD09MClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKFtdKTtcbiAgICAgICAgdmFyIHRva2VuID0gY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuO1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fYnVsa19saXN0KGFwaUxpc3QpLCB0b2tlbikuZG8oanNvbkFycj0+IHtcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8YXBpTGlzdC5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iakFyciA9IGpzb25BcnJbaV07XG4gICAgICAgICAgICAgICAgdmFyIGFwaSA9IGFwaUxpc3RbaV07XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gYXBpLnBhcmFtc1tcIm1vZGVsXCJdO1xuICAgICAgICAgICAgICAgIF8uZWFjaChvYmpBcnIsIGpzb25PYmo9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSAgTWFwVXRpbHMuZGVzZXJpYWxpemVNb2RlbChtb2RlbCwganNvbk9iaik7XG4gICAgICAgICAgICAgICAgICAgIENhY2hlLm9iamVjdFVwZGF0ZShvYmplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnVsa19jb3VudChjb250ZXh0OkFQSUNvbnRleHQsIC4uLmFwaUxpc3Q6U2VhcmNoQ291bnRBUElbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKGFwaUxpc3QubGVuZ3RoPT0wKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoW10pO1xuICAgICAgICB2YXIgdG9rZW4gPSBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW47XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19idWxrX2NvdW50KGFwaUxpc3QpLCB0b2tlbilcbiAgICB9XG5cbiAgICBzdGF0aWMgYnVsa19zZWFyY2goY29udGV4dDpBUElDb250ZXh0LCAuLi5hcGlMaXN0OlNlYXJjaFJlYWRBUElbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKGFwaUxpc3QubGVuZ3RoPT0wKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoW10pO1xuICAgICAgICB2YXIgdG9rZW4gPSBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW47XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19idWxrX3NlYXJjaChhcGlMaXN0KSwgdG9rZW4pLmRvKGpzb25BcnI9PiB7XG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPGFwaUxpc3QubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIHZhciBhcGkgPSBhcGlMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlmIChhcGkgaW5zdGFuY2VvZiBTZWFyY2hBbGxBUEkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iakFyciA9IGpzb25BcnJbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IGFwaS5wYXJhbXNbXCJtb2RlbFwiXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBfLm1hcChvYmpBcnIsIGpzb25PYmo9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWFwVXRpbHMuZGVzZXJpYWxpemVNb2RlbChtb2RlbCwganNvbk9iaik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBDYWNoZS5zYXZlKG1vZGVsLG9iamVjdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QWxsKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5Nb2RlbDtcbiAgICAgICAgaWYgKENhY2hlLmhpdChtb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKG1vZGVsKSkubWFwKHJlY29yZHM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZHMubGVuZ3RoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50KGNvbnRleHQsIFwiW11cIik7XG4gICAgfVxuXG4gICAgcmVmcmVzaChjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgICAgIHZhciBnZXRBcGkgPSBuZXcgTGlzdEFQSSh0aGlzLk1vZGVsLCBbdGhpcy5pZF0sIFtdKTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZShnZXRBcGksIFxuICAgICAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbikuZG8oaXRlbXM9PiB7XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IE1hcFV0aWxzLmRlc2VyaWFsaXplTW9kZWwodGhpcy5Nb2RlbCwgaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgICBDYWNoZS5vYmplY3RVcGRhdGUodGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzKVxuXG4gICAgfVxuXG4gICAgc2F2ZShjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIHRva2VuID0gY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuO1xuICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19jcmVhdGUoKSwgdG9rZW4pLm1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gTWFwVXRpbHMuZGVzZXJpYWxpemVNb2RlbCh0aGlzLk1vZGVsLCBkYXRhLnJlY29yZCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmplY3QpO1xuICAgICAgICAgICAgICAgIENhY2hlLm9iamVjdENyZWF0ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX3VwZGF0ZSgpLHRva2VuKS5kbygoKSA9PiB7XG4gICAgICAgICAgICAgICAgQ2FjaGUub2JqZWN0VXBkYXRlKHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9ICBcblxuICAgIGRlbGV0ZShjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIHRva2VuID0gY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuO1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fZGVsZXRlKCksIHRva2VuKS5kbygoKSA9PiB7XG4gICAgICAgICAgICBDYWNoZS5vYmplY3REZWxldGUodGhpcy5Nb2RlbCwgdGhpcy5pZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaW5nbGUoY29udGV4dDogQVBJQ29udGV4dCwgZmllbGRzOiBzdHJpbmdbXSwgZG9tYWluOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuTW9kZWw7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaChjb250ZXh0LCBmaWVsZHMsIGRvbWFpbikubWFwKG9iamVjdHMgPT4ge1xuICAgICAgICAgICAgdmFyIHJlY29yZHMgPSB0aGlzLnRvQXJyYXkob2JqZWN0cyk7XG4gICAgICAgICAgICBpZiAocmVjb3Jkcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZHNbMF07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUFycmF5KGNvbnRleHQ6IEFQSUNvbnRleHQsb2JqZWN0czphbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgYXBpTGlzdCA9IF8ubWFwKG9iamVjdHMsIChvYmplY3Q6QmFzZU1vZGVsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0Ll9fYXBpX19jcmVhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCYXNlTW9kZWwuYnVsa19jcmVhdGUoY29udGV4dCwgLi4uYXBpTGlzdCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZUFycmF5KGNvbnRleHQ6IEFQSUNvbnRleHQsb2JqZWN0czphbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgYXBpTGlzdCA9IF8ubWFwKG9iamVjdHMsIChvYmplY3Q6QmFzZU1vZGVsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0Ll9fYXBpX191cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCYXNlTW9kZWwuYnVsa191cGRhdGUoY29udGV4dCwgLi4uYXBpTGlzdCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZUFycmF5KGNvbnRleHQ6IEFQSUNvbnRleHQsb2JqZWN0czphbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgYXBpTGlzdCA9IF8ubWFwKG9iamVjdHMsIChvYmplY3Q6QmFzZU1vZGVsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0Ll9fYXBpX19kZWxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCYXNlTW9kZWwuYnVsa19kZWxldGUoY29udGV4dCwgLi4uYXBpTGlzdCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvQXJyYXkoanNvbkFycjphbnkpOmFueSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuTW9kZWw7XG4gICAgICAgICByZXR1cm4gXy5tYXAoanNvbkFyciwgb2JqZWN0PT4ge1xuICAgICAgICAgICAgcmV0dXJuIE1hcFV0aWxzLmRlc2VyaWFsaXplTW9kZWwobW9kZWwsIG9iamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb3VudChjb250ZXh0OiBBUElDb250ZXh0LCBkb21haW4/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIGlmICghZG9tYWluKVxuICAgICAgICAgICAgZG9tYWluID0gXCJbXVwiOyAgICAgICAgXG4gICAgICAgIHZhciB0b2tlbiA9IGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbjtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2NvdW50KGRvbWFpbiksIHRva2VuKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VhcmNoKGNvbnRleHQ6IEFQSUNvbnRleHQsIGZpZWxkczogc3RyaW5nW10sIGRvbWFpbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICB2YXIgdG9rZW4gPSBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW47XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19zZWFyY2goIGZpZWxkcywgZG9tYWluKSwgdG9rZW4pLm1hcChvYmplY3RzID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQXJyYXkob2JqZWN0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBhbGwoY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5Nb2RlbDtcbiAgICAgICAgaWYgKENhY2hlLmhpdChtb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKG1vZGVsKSlcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoKGNvbnRleHQsIFtdLCAnW10nKS5kbyhyZWNvcmRzPT4ge1xuICAgICAgICAgICAgQ2FjaGUuc2F2ZShtb2RlbCxyZWNvcmRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldChjb250ZXh0OiBBUElDb250ZXh0LCBpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKG51bGwpO1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLk1vZGVsO1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KG1vZGVsKSkge1xuICAgICAgICAgICAgdmFyIHJlY29yZHMgPSBDYWNoZS5sb2FkKG1vZGVsKTtcbiAgICAgICAgICAgIHZhciByZWNvcmQgPSBfLmZpbmQocmVjb3Jkcywgb2JqPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbXCJpZFwiXT09aWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZWNvcmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YocmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hcnJheShjb250ZXh0LFtpZF0pLm1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBpdGVtcyA9IHRoaXMudG9BcnJheShpdGVtcyk7XG4gICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgIENhY2hlLm9iamVjdFVwZGF0ZShpdGVtcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXJyYXkoY29udGV4dDogQVBJQ29udGV4dCwgaWRzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKFtdKTtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5Nb2RlbDtcbiAgICAgICAgdmFyIHRva2VuID0gY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuO1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fZ2V0KGlkcyksIHRva2VuKS5tYXAob2JqZWN0cyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0FycmF5KG9iamVjdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXhlY3V0ZVJlbW90ZShjb250ZXh0OiBBUElDb250ZXh0LCBtZXRob2Q6IHN0cmluZywgcGFyYW1zTGlzdDogYW55W10sIHBhcmFtc0RpY3Q6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuTW9kZWw7XG4gICAgICAgIHZhciB0b2tlbiA9IGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbjtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2V4Y3V0ZShtZXRob2QsIHBhcmFtc0xpc3QsIHBhcmFtc0RpY3QpLCB0b2tlbik7XG4gICAgfVxuXG59XG4iXX0=
