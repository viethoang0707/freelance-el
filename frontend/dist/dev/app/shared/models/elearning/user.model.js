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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhCQUE4QztBQUM5QywwQ0FBbUQ7QUFFbkQsNENBQTBDO0FBRTFDLHVEQUFnRDtBQUNoRCx5REFBa0Q7QUFDbEQsc0VBQW1FO0FBQ25FLHdFQUFxRTtBQUNyRSw4QkFBZ0M7QUFHaEM7SUFBMEIsd0JBQVM7SUFHL0I7UUFBQSxZQUNJLGlCQUFPLFNBcUJWO1FBbkJHLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1FBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQztRQUN2QyxLQUFJLENBQUMsYUFBYSxH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bW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwsRmllbGRQcm9wZXJ0eSB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IENvbXBhbnkgfSBmcm9tICcuL2NvbXBhbnkubW9kZWwnO1xuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJy4vcGVybWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgU2VhcmNoQ291bnRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLWNvdW50LmFwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5ATW9kZWwoJ3Jlcy51c2VycycpXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaW1hZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZGlzcGxheV9uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ2VuZGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRvYiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9jb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubG9naW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGhvbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaXNfYWRtaW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuYmFubmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBhbnlfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGVybWlzc2lvbl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3VwZXJ2aXNvcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdXBlcnZpc29yX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaW1hZ2U6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZ3JvdXBfY29kZTogc3RyaW5nO1xuICAgIGdlbmRlcjogYm9vbGVhbjtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZG9iOiBEYXRlO1xuICAgIHBvc2l0aW9uOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBncm91cF9pZDogbnVtYmVyO1xuICAgIGdyb3VwX2lkX19ERVNDX186IHN0cmluZztcbiAgICBsb2dpbjogc3RyaW5nO1xuICAgIHBob25lOiBzdHJpbmc7XG4gICAgaXNfYWRtaW46IGJvb2xlYW47XG4gICAgYmFubmVkOiBib29sZWFuO1xuICAgIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICAgIGNvbXBhbnlfaWQ6IG51bWJlcjtcbiAgICBwZXJtaXNzaW9uX2lkOiBudW1iZXI7XG4gICAgcGVybWlzc2lvbl9pZF9fREVTQ19fOiBzdHJpbmc7XG4gICAgc3VwZXJ2aXNvcl9pZDogbnVtYmVyO1xuICAgIHN1cGVydmlzb3JfaWRfX0RFU0NfXzogc3RyaW5nO1xuXG4gICAgZ2V0IElzQWRtaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX2FkbWluIHx8IHRoaXMubG9naW4gPT0gJ2FkbWluJztcbiAgICB9XG5cbiAgICBnZXQgSXNTdXBlckFkbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbiA9PSAnYWRtaW4nIHx8ICh0aGlzLmlzX2FkbWluICYmICF0aGlzLnN1cGVydmlzb3JfaWQpO1xuICAgIH1cblxuXG4gICAgZ2V0UGVybWlzc2lvbihjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKHRoaXMucGVybWlzc2lvbl9pZClcbiAgICAgICAgICAgIHJldHVybiBQZXJtaXNzaW9uLmdldChjb250ZXh0LCB0aGlzLnBlcm1pc3Npb25faWQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihuZXcgUGVybWlzc2lvbigpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RBbGxBZG1pbih1c2VySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoVXNlci5Nb2RlbCwgW10sIFwiWygnbG9naW4nLCchPScsJ2FkbWluJyksKCdpc19hZG1pbicsJz0nLFRydWUpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2FsbCgpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFVzZXIuTW9kZWwsIFtdLCBcIlsoJ2xvZ2luJywnIT0nLCdhZG1pbicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWxsKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICByZXR1cm4gVXNlci5zZWFyY2goY29udGV4dCwgW10sIFwiWygnbG9naW4nLCchPScsJ2FkbWluJyldXCIpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGxpc3RBbGxBZG1pbihjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KFVzZXIuTW9kZWwpKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoQ2FjaGUubG9hZChVc2VyLk1vZGVsKSkubWFwKHVzZXJzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIodXNlcnMsICh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLklzQWRtaW47XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXIuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ2xvZ2luJywnIT0nLCdhZG1pbicpLCgnaXNfYWRtaW4nLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jb3VudEFsbEFkbWluKCk6IFNlYXJjaENvdW50QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hDb3VudEFQSShVc2VyLk1vZGVsLCBcIlsoJ2xvZ2luJywnIT0nLCdhZG1pbicpLCgnaXNfYWRtaW4nLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QWxsQWRtaW4oY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoVXNlci5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKFVzZXIuTW9kZWwpKS5tYXAodXNlcnMgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBhZG1pbnMgPSBfLmZpbHRlcih1c2VycywgKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIuSXNBZG1pbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRtaW5zLmxlbmd0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVXNlci5jb3VudChjb250ZXh0LCBcIlsoJ2xvZ2luJywnIT0nLCdhZG1pbicpLCgnaXNfYWRtaW4nLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlHcm91cChncm91cElkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFVzZXIuTW9kZWwsIFtdLCBcIlsoJ2dyb3VwX2lkJywnPScsXCIgKyBncm91cElkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5R3JvdXAoY29udGV4dDogQVBJQ29udGV4dCwgZ3JvdXBJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KFVzZXIuTW9kZWwpKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoQ2FjaGUubG9hZChVc2VyLk1vZGVsKSkubWFwKHVzZXJzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIodXNlcnMsICh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLmdyb3VwX2lkID09IGdyb3VwSWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXIuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ2dyb3VwX2lkJywnPScsXCIgKyBncm91cElkICsgXCIpXVwiKTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5UGVybWlzc2lvbihwZXJtaXNzaW9uSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoVXNlci5Nb2RlbCwgW10sIFwiWygncGVybWlzc2lvbl9pZCcsJz0nLFwiICsgcGVybWlzc2lvbklkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5UGVybWlzc2lvbihjb250ZXh0OiBBUElDb250ZXh0LCBwZXJtaXNzaW9uSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoVXNlci5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKFVzZXIuTW9kZWwpKS5tYXAodXNlcnMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcih1c2VycywgKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIucGVybWlzc2lvbl9pZCA9PSBwZXJtaXNzaW9uSWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXIuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ3Blcm1pc3Npb25faWQnLCc9JyxcIiArIHBlcm1pc3Npb25JZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jb3VudEJ5UGVybWlzc2lvbihwZXJtaXNzaW9uSWQ6IG51bWJlcik6IFNlYXJjaENvdW50QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hDb3VudEFQSShVc2VyLk1vZGVsLCBcIlsoJ3Blcm1pc3Npb25faWQnLCc9JyxcIiArIHBlcm1pc3Npb25JZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QnlQZXJtaXNzaW9uKGNvbnRleHQ6IEFQSUNvbnRleHQsIHBlcm1pc3Npb25JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKENhY2hlLmhpdChVc2VyLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoVXNlci5Nb2RlbCkpLm1hcCh1c2VycyA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZHMgPSBfLmZpbHRlcih1c2VycywgKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIucGVybWlzc2lvbl9pZCA9PSBwZXJtaXNzaW9uSWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZHMubGVuZ3RoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBVc2VyLmNvdW50KGNvbnRleHQsIFwiWygncGVybWlzc2lvbl9pZCcsJz0nLFwiICsgcGVybWlzc2lvbklkICsgXCIpXVwiKTtcbiAgICB9XG5cbn1cbiJdfQ==
