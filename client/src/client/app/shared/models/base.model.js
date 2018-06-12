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
        return this.__api__search([], "[]");
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
    BaseModel.bulk_create = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_create(apiList), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.__api__bulk_update = function (apiList) {
        var api = new bulk_update_api_1.BulkUpdateAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.bulk_update = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_update(apiList), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.__api__bulk_delete = function (apiList) {
        var api = new bulk_delete_api_1.BulkDeleteAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.bulk_delete = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_delete(apiList), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.__api__bulk_get = function (apiList) {
        var api = new bulk_list_api_1.BulkListAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.bulk_list = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_get(apiList), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.__api__bulk_count = function (apiList) {
        var api = new bulk_search_count_api_1.BulkSearchCountAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.bulk_count = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_count(apiList), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.__api__bulk_search = function (apiList) {
        var api = new bulk_search_read_api_1.BulkSearchReadAPI();
        _.each(apiList, function (subApi) {
            api.add(subApi);
        });
        return api;
    };
    BaseModel.bulk_search = function (context) {
        var apiList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            apiList[_i - 1] = arguments[_i];
        }
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_search(apiList), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.__api__countAll = function () {
        var model = this.Model;
        return new search_count_api_1.SearchCountAPI(model, "[]");
    };
    BaseModel.countAll = function (context) {
        var model = this.Model;
        if (cache_utils_1.Cache.hit(model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(model)).map(function (records) {
                return records.length;
            });
        return this.count(context, "[]");
    };
    BaseModel.prototype.save = function (context) {
        var _this = this;
        var cloud_acc = context.authService.CloudAcc;
        if (!this.id) {
            return context.apiService.execute(this.__api__create(), cloud_acc.id, cloud_acc.api_endpoint).map(function (data) {
                _this.id = data.id;
                cache_utils_1.Cache.objectChage(_this, 'CREATE');
                return _this;
            });
        }
        else {
            return context.apiService.execute(this.__api__update(), cloud_acc.id, cloud_acc.api_endpoint).do(function () {
                cache_utils_1.Cache.objectChage(_this, 'UPDATE');
            });
        }
    };
    BaseModel.prototype.delete = function (context) {
        var _this = this;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__delete(), cloud_acc.id, cloud_acc.api_endpoint).do(function () {
            cache_utils_1.Cache.objectChage(_this, 'DELETE');
        });
    };
    BaseModel.get = function (context, id) {
        var _this = this;
        if (!id)
            return Rx_1.Observable.of(null);
        var cloud_acc = context.authService.CloudAcc;
        var model = this.Model;
        return context.apiService.execute(this.__api__get([id]), cloud_acc.id, cloud_acc.api_endpoint).map(function (items) {
            items = _this.toArray(items);
            if (items && items.length) {
                return items[0];
            }
            else
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
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__count(domain), cloud_acc.id, cloud_acc.api_endpoint);
    };
    BaseModel.search = function (context, fields, domain) {
        var _this = this;
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__search(fields, domain), cloud_acc.id, cloud_acc.api_endpoint).map(function (objects) {
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
    BaseModel.array = function (context, ids) {
        var _this = this;
        if (ids.length == 0)
            return Rx_1.Observable.of([]);
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__get(ids), cloud_acc.id, cloud_acc.api_endpoint).map(function (objects) {
            return _this.toArray(objects);
        });
    };
    BaseModel.executeRemote = function (context, method, paramsList, paramsDict) {
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__excute(method, paramsList, paramsDict), cloud_acc.id, cloud_acc.api_endpoint);
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
//# sourceMappingURL=base.model.js.map