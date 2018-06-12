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
var core_1 = require("@angular/core");
require("rxjs/add/operator/mergeMap");
var credential_model_1 = require("../models/credential.model");
var user_model_1 = require("../models/elearning/user.model");
var permission_model_1 = require("../models/elearning/permission.model");
var cloud_account_model_1 = require("../models/cloud/cloud-account.model");
var map_utils_1 = require("../helpers/map.utils");
var api_service_1 = require("./api.service");
var cache_utils_1 = require("../helpers/cache.utils");
var login_api_1 = require("./api/login.api");
var change_pass_api_1 = require("./api/change-pass.api");
var reset_pass_api_1 = require("./api/reset-pass.api");
var AuthService = (function () {
    function AuthService(apiService) {
        this.apiService = apiService;
    }
    Object.defineProperty(AuthService.prototype, "StoredCredential", {
        get: function () {
            if (localStorage.getItem('credential'))
                return map_utils_1.MapUtils.deserialize(credential_model_1.Credential, JSON.parse(atob(localStorage.getItem('credential'))));
            return null;
        },
        set: function (credential) {
            localStorage.setItem('credential', btoa(JSON.stringify(credential)));
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.clearStoredCredential = function () {
        localStorage.removeItem('credential');
    };
    Object.defineProperty(AuthService.prototype, "UserProfile", {
        get: function () {
            if (localStorage.getItem('currentUser'))
                return map_utils_1.MapUtils.deserialize(user_model_1.User, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('currentUser'))))));
            return null;
        },
        set: function (user) {
            localStorage.setItem('currentUser', btoa(unescape(encodeURIComponent(JSON.stringify(user)))));
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.clearUserProfile = function () {
        localStorage.removeItem('currentUser');
    };
    Object.defineProperty(AuthService.prototype, "UserPermission", {
        get: function () {
            if (localStorage.getItem('userPerm'))
                return map_utils_1.MapUtils.deserialize(permission_model_1.Permission, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('userPerm'))))));
            return null;
        },
        set: function (perm) {
            localStorage.setItem('userPerm', btoa(unescape(encodeURIComponent(JSON.stringify(perm)))));
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.clearUserPermission = function () {
        localStorage.removeItem('userPerm');
    };
    Object.defineProperty(AuthService.prototype, "CloudAcc", {
        get: function () {
            if (localStorage.getItem('cloudAccount'))
                return map_utils_1.MapUtils.deserialize(cloud_account_model_1.CloudAccount, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('cloudAccount'))))));
            return null;
        },
        set: function (acc) {
            localStorage.setItem('cloudAccount', btoa(unescape(encodeURIComponent(JSON.stringify(acc)))));
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.clearCloudAccount = function () {
        localStorage.removeItem('cloudAccount');
    };
    Object.defineProperty(AuthService.prototype, "Remember", {
        get: function () {
            if (localStorage.getItem('remember'))
                return localStorage.getItem('remember') == 'true';
            else
                return false;
        },
        set: function (val) {
            localStorage.setItem('remember', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.login = function (info) {
        var _this = this;
        var cloud_acc = this.CloudAcc;
        var api = new login_api_1.LoginAPI(info.username, info.password);
        return this.apiService.execute(api, cloud_acc.id, cloud_acc.api_endpoint).map(function (user) {
            _this.UserProfile = map_utils_1.MapUtils.deserialize(user_model_1.User, user);
            return _this.UserProfile;
        });
    };
    AuthService.prototype.resetPass = function (email) {
        var cloud_acc = this.CloudAcc;
        var api = new reset_pass_api_1.ResetPassAPI(email);
        return this.apiService.execute(api, cloud_acc.id, cloud_acc.api_endpoint);
    };
    AuthService.prototype.changePass = function (old_pass, new_pass) {
        var cloud_acc = this.CloudAcc;
        var api = new change_pass_api_1.ChangePassAPI(this.UserProfile.id, old_pass, new_pass);
        return this.apiService.execute(api, cloud_acc.id, cloud_acc.api_endpoint);
    };
    AuthService.prototype.logout = function () {
        cache_utils_1.Cache.invalidateAll();
        this.clearUserProfile();
        this.clearCloudAccount();
        this.clearUserPermission();
        if (!this.Remember)
            this.clearStoredCredential();
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.APIService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map