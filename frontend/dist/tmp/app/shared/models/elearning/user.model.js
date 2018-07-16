"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var base_model_1 = require("../base.model");
var permission_model_1 = require("./permission.model");
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var _ = require("underscore");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super.call(this) || this;
        _this.image = undefined;
        _this.display_name = undefined;
        _this.name = undefined;
        _this.gender = undefined;
        _this.dob = undefined;
        _this.position = undefined;
        _this.email = undefined;
        _this.group_id = undefined;
        _this.group_code = undefined;
        _this.group_id__DESC__ = undefined;
        _this.login = undefined;
        _this.phone = undefined;
        _this.is_admin = undefined;
        _this.banned = undefined;
        _this.company_id = undefined;
        _this.permission_id = undefined;
        _this.permission_id__DESC__ = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_id__DESC__ = undefined;
        return _this;
    }
    User_1 = User;
    Object.defineProperty(User.prototype, "IsAdmin", {
        get: function () {
            return this.is_admin || this.login == 'admin';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "IsSuperAdmin", {
        get: function () {
            return this.login == 'admin' || (this.is_admin && !this.supervisor_id);
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.getPermission = function (context) {
        if (this.permission_id)
            return permission_model_1.Permission.get(context, this.permission_id);
        else
            return Rx_1.Observable.of(new permission_model_1.Permission());
    };
    User.__api__listAllAdmin = function (userId) {
        return new search_read_api_1.SearchReadAPI(User_1.Model, [], "[('login','!=','admin'),('is_admin','=',True)]");
    };
    User.__api__all = function () {
        return new search_read_api_1.SearchReadAPI(User_1.Model, [], "[('login','!=','admin')]");
    };
    User.all = function (context) {
        return User_1.search(context, [], "[('login','!=','admin')]");
    };
    User.listAllAdmin = function (context) {
        if (cache_utils_1.Cache.hit(User_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(User_1.Model)).map(function (users) {
                return _.filter(users, function (user) {
                    return user.IsAdmin;
                });
            });
        return User_1.search(context, [], "[('login','!=','admin'),('is_admin','=',True)]");
    };
    User.__api__countAllAdmin = function () {
        return new search_count_api_1.SearchCountAPI(User_1.Model, "[('login','!=','admin'),('is_admin','=',True)]");
    };
    User.countAllAdmin = function (context) {
        if (cache_utils_1.Cache.hit(User_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(User_1.Model)).map(function (users) {
                var admins = _.filter(users, function (user) {
                    return user.IsAdmin;
                });
                return admins.length;
            });
        return User_1.count(context, "[('login','!=','admin'),('is_admin','=',True)]");
    };
    User.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(User_1.Model, [], "[('group_id','='," + groupId + ")]");
    };
    User.listByGroup = function (context, groupId) {
        if (cache_utils_1.Cache.hit(User_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(User_1.Model)).map(function (users) {
                return _.filter(users, function (user) {
                    return user.group_id == groupId;
                });
            });
        return User_1.search(context, [], "[('group_id','='," + groupId + ")]");
    };
    User.__api__listByPermission = function (permissionId) {
        return new search_read_api_1.SearchReadAPI(User_1.Model, [], "[('permission_id','='," + permissionId + ")]");
    };
    User.listByPermission = function (context, permissionId) {
        if (cache_utils_1.Cache.hit(User_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(User_1.Model)).map(function (users) {
                return _.filter(users, function (user) {
                    return user.permission_id == permissionId;
                });
            });
        return User_1.search(context, [], "[('permission_id','='," + permissionId + ")]");
    };
    User.__api__countByPermission = function (permissionId) {
        return new search_count_api_1.SearchCountAPI(User_1.Model, "[('permission_id','='," + permissionId + ")]");
    };
    User.countByPermission = function (context, permissionId) {
        if (cache_utils_1.Cache.hit(User_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(User_1.Model)).map(function (users) {
                var records = _.filter(users, function (user) {
                    return user.permission_id == permissionId;
                });
                return records.length;
            });
        return User_1.count(context, "[('permission_id','='," + permissionId + ")]");
    };
    var User_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], User.prototype, "dob", void 0);
    User = User_1 = __decorate([
        decorator_1.Model('res.users'),
        __metadata("design:paramtypes", [])
    ], User);
    return User;
}(base_model_1.BaseModel));
exports.User = User;
