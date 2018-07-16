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
var token_model_1 = require("../models/cloud/token.model");
var map_utils_1 = require("../helpers/map.utils");
var account_api_service_1 = require("./api/account-api.service");
var cache_utils_1 = require("../helpers/cache.utils");
var AuthService = (function () {
    function AuthService(accountService) {
        this.accountService = accountService;
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
    Object.defineProperty(AuthService.prototype, "LoginToken", {
        get: function () {
            if (localStorage.getItem('token'))
                return map_utils_1.MapUtils.deserialize(token_model_1.Token, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('token'))))));
            return null;
        },
        set: function (token) {
            localStorage.setItem('token', btoa(unescape(encodeURIComponent(JSON.stringify(token)))));
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.clearToken = function () {
        localStorage.removeItem('token');
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
    AuthService.prototype.login = function (info, cloudid) {
        var _this = this;
        return this.accountService.login(info.username, info.password, cloudid).map(function (resp) {
            _this.UserProfile = map_utils_1.MapUtils.deserialize(user_model_1.User, resp["user"]);
            _this.LoginToken = map_utils_1.MapUtils.deserialize(token_model_1.Token, resp["token"]);
            return { user: _this.UserProfile, token: _this.LoginToken };
        });
    };
    AuthService.prototype.logout = function () {
        cache_utils_1.Cache.invalidateAll();
        this.clearUserProfile();
        this.clearToken();
        this.clearUserPermission();
        if (!this.Remember)
            this.clearStoredCredential();
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [account_api_service_1.AccountAPIService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
