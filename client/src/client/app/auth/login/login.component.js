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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var base_component_1 = require("../../shared/components/base/base.component");
var credential_model_1 = require("../../shared/models/credential.model");
var cloud_account_model_1 = require("../../shared/models/cloud/cloud-account.model");
var log_model_1 = require("../../shared/models/elearning/log.model");
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(route, router) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.buildMode = "<%= BUILD_TYPE %>";
        _this.account = new cloud_account_model_1.CloudAccount();
        _this.credential = new credential_model_1.Credential();
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.credential = this.authService.StoredCredential || new credential_model_1.Credential();
        this.remember = this.authService.Remember;
    };
    LoginComponent.prototype.getCloudInfo = function () {
        if (this.buildMode == 'prod')
            return this.cloudApiService.cloudInfo();
        else
            return this.cloudApiService.cloudInfo(this.cloudid);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.getCloudInfo().subscribe(function (acc) {
            _this.authService.CloudAcc = acc;
            _this.authService.login(_this.credential).subscribe(function (user) {
                log_model_1.UserLog.login(_this, user.id).subscribe();
                _this.authService.Remember = _this.remember;
                _this.authService.UserProfile = user;
                if (_this.remember)
                    _this.authService.StoredCredential = _this.credential;
                user.getPermission(_this).subscribe(function (permission) {
                    _this.authService.UserPermission = permission;
                    _this.router.navigate([_this.returnUrl]);
                });
            }, function (error) {
                _this.error('Login failed.');
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LoginComponent.prototype, "remember", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoginComponent.prototype, "cloudid", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}(base_component_1.BaseComponent));
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map