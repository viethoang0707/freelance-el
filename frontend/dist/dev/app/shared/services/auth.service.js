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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLHNDQUFvQztBQUNwQywrREFBd0Q7QUFDeEQsNkRBQXNEO0FBQ3RELHlFQUFrRTtBQUNsRSwyREFBb0Q7QUFDcEQsa0RBQWdEO0FBRWhELGlFQUE4RDtBQUM5RCxzREFBK0M7QUFPL0M7SUFFSSxxQkFBb0IsY0FBaUM7UUFBakMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO0lBQ3JELENBQUM7SUFFRixzQkFBSSx5Q0FBZ0I7YUFBcEI7WUFDSyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2dCQUNsQyxPQUFPLG9CQUFRLENBQUMsV0FBVyxDQUFDLDZCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO2FBRUQsVUFBcUIsVUFBc0I7WUFDdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7OztPQUpBO0lBTUQsMkNBQXFCLEdBQXJCO1FBQ0ksWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsc0JBQUksb0NBQVc7YUFBZjtZQUNJLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQ25DLE9BQU8sb0JBQVEsQ0FBQyxXQUFXLENBQUMsaUJBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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LENBQUMsQ0FBQztZQUM3RCxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksbUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQXpGUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBRzJCLHVDQUFpQjtPQUY1QyxXQUFXLENBNkZ2QjtJQUFELGtCQUFDO0NBN0ZELEFBNkZDLElBQUE7QUE3Rlksa0NBQVciLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwJztcbmltcG9ydCB7IENyZWRlbnRpYWwgfSBmcm9tICcuLi9tb2RlbHMvY3JlZGVudGlhbC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL3Blcm1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgTWFwVXRpbHMgfSBmcm9tICcuLi9oZWxwZXJzL21hcC51dGlscyc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBY2NvdW50QVBJU2VydmljZSB9IGZyb20gJy4vYXBpL2FjY291bnQtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcblxuXG5kZWNsYXJlIGZ1bmN0aW9uIGVzY2FwZShzOnN0cmluZyk6IHN0cmluZztcbmRlY2xhcmUgZnVuY3Rpb24gdW5lc2NhcGUoczpzdHJpbmcpOiBzdHJpbmc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50QVBJU2VydmljZSkge1xuICAgIH1cblxuICAgZ2V0IFN0b3JlZENyZWRlbnRpYWwoKTogQ3JlZGVudGlhbCB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3JlZGVudGlhbCcpKVxuICAgICAgICAgICAgcmV0dXJuIE1hcFV0aWxzLmRlc2VyaWFsaXplKENyZWRlbnRpYWwsIEpTT04ucGFyc2UoYXRvYihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3JlZGVudGlhbCcpKSkpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXQgU3RvcmVkQ3JlZGVudGlhbChjcmVkZW50aWFsOiBDcmVkZW50aWFsKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjcmVkZW50aWFsJywgYnRvYShKU09OLnN0cmluZ2lmeShjcmVkZW50aWFsKSkpO1xuICAgIH1cblxuICAgIGNsZWFyU3RvcmVkQ3JlZGVudGlhbCgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NyZWRlbnRpYWwnKTtcbiAgICB9XG5cbiAgICBnZXQgVXNlclByb2ZpbGUoKTogVXNlciB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSlcbiAgICAgICAgICAgIHJldHVybiBNYXBVdGlscy5kZXNlcmlhbGl6ZShVc2VyLCBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYXRvYihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpKSkpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXQgVXNlclByb2ZpbGUodXNlcjogVXNlcikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLCBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh1c2VyKSkpKSk7XG4gICAgfVxuXG4gICAgY2xlYXJVc2VyUHJvZmlsZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyk7XG4gICAgfVxuXG4gICAgZ2V0IFVzZXJQZXJtaXNzaW9uKCk6IFBlcm1pc3Npb24ge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJQZXJtJykpXG4gICAgICAgICAgICByZXR1cm4gTWFwVXRpbHMuZGVzZXJpYWxpemUoUGVybWlzc2lvbiwgSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGF0b2IobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJQZXJtJykpKSkpKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0IFVzZXJQZXJtaXNzaW9uKHBlcm06IFBlcm1pc3Npb24pIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJQZXJtJywgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocGVybSkpKSkpO1xuICAgIH1cblxuICAgIGNsZWFyVXNlclBlcm1pc3Npb24oKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyUGVybScpO1xuICAgIH1cblxuICAgIHNldCBMb2dpblRva2VuKHRva2VuOiBUb2tlbikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0b2tlbikpKSkpO1xuICAgIH1cblxuICAgIGdldCBMb2dpblRva2VuKCk6VG9rZW4ge1xuICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKVxuICAgICAgICAgICAgcmV0dXJuIE1hcFV0aWxzLmRlc2VyaWFsaXplKFRva2VuLCBcbiAgICAgICAgICAgICAgICBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYXRvYihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkpKSkpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjbGVhclRva2VuKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcbiAgICB9XG5cblxuICAgIGdldCBSZW1lbWJlcigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZW1lbWJlcicpKVxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZW1lbWJlcicpPT0ndHJ1ZSc7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXQgUmVtZW1iZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZW1lbWJlcicsIHZhbC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBsb2dpbihpbmZvOiBDcmVkZW50aWFsLCBjbG91ZGlkPzpzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2NvdW50U2VydmljZS5sb2dpbihpbmZvLnVzZXJuYW1lLCBpbmZvLnBhc3N3b3JkLGNsb3VkaWQpLm1hcChyZXNwID0+IHtcbiAgICAgICAgICAgIHRoaXMuVXNlclByb2ZpbGUgPSBNYXBVdGlscy5kZXNlcmlhbGl6ZShVc2VyLCByZXNwW1widXNlclwiXSk7XG4gICAgICAgICAgICB0aGlzLkxvZ2luVG9rZW4gPSBNYXBVdGlscy5kZXNlcmlhbGl6ZShUb2tlbiwgcmVzcFtcInRva2VuXCJdKTtcbiAgICAgICAgICAgIHJldHVybiB7dXNlcjogdGhpcy5Vc2VyUHJvZmlsZSwgdG9rZW46IHRoaXMuTG9naW5Ub2tlbn07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgQ2FjaGUuaW52YWxpZGF0ZUFsbCgpO1xuICAgICAgICB0aGlzLmNsZWFyVXNlclByb2ZpbGUoKTtcbiAgICAgICAgdGhpcy5jbGVhclRva2VuKCk7XG4gICAgICAgIHRoaXMuY2xlYXJVc2VyUGVybWlzc2lvbigpO1xuICAgICAgICBpZiAoIXRoaXMuUmVtZW1iZXIpXG4gICAgICAgICAgICB0aGlzLmNsZWFyU3RvcmVkQ3JlZGVudGlhbCgpO1xuICAgIH1cblxuXG5cbn1cbiJdfQ==
