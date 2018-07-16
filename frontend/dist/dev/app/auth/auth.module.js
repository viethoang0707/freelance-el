"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var login_component_1 = require("./login/login.component");
var recover_password_component_1 = require("./recover/recover-password.component");
var shared_module_1 = require("../shared/shared.module");
var auth_routing_1 = require("./auth-routing");
var core_1 = require("@angular/core");
var auth_component_1 = require("./auth.component");
var reset_password_component_1 = require("./reset/reset-password.component");
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, auth_routing_1.AuthRoutingModule, shared_module_1.ErpSharedModule],
            declarations: [login_component_1.LoginComponent, recover_password_component_1.RecoverPasswordComponent, reset_password_component_1.ResetPasswordComponent, auth_component_1.AuthComponent],
            exports: []
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2F1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMENBQStDO0FBQy9DLDJEQUF5RDtBQUN6RCxtRkFBZ0Y7QUFDaEYseURBQTBEO0FBQzFELCtDQUFtRDtBQUNuRCxzQ0FBOEQ7QUFDOUQsbURBQWlEO0FBQ2pELDZFQUEwRTtBQU8xRTtJQUFBO0lBRUEsQ0FBQztJQUZZLFVBQVU7UUFMdEIsZUFBUSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUMscUJBQVksRUFBRSxnQ0FBaUIsRUFBRSwrQkFBZSxDQUFDO1lBQzNELFlBQVksRUFBRSxDQUFDLGdDQUFjLEVBQUUscURBQXdCLEVBQUUsaURBQXNCLEVBQUUsOEJBQWEsQ0FBQztZQUMvRixPQUFPLEVBQUUsRUFBRTtTQUNYLENBQUM7T0FDVyxVQUFVLENBRXRCO0lBQUQsaUJBQUM7Q0FGRCxBQUVDLElBQUE7QUFGWSxnQ0FBVSIsImZpbGUiOiJhcHAvYXV0aC9hdXRoLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vbG9naW4uY29tcG9uZW50JztcbmltcG9ydCB7IFJlY292ZXJQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vcmVjb3Zlci9yZWNvdmVyLXBhc3N3b3JkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFcnBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBdXRoUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXV0aC1yb3V0aW5nJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNldC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBdXRoUm91dGluZ01vZHVsZSwgRXJwU2hhcmVkTW9kdWxlXSxcblx0ZGVjbGFyYXRpb25zOiBbTG9naW5Db21wb25lbnQsIFJlY292ZXJQYXNzd29yZENvbXBvbmVudCwgUmVzZXRQYXNzd29yZENvbXBvbmVudCwgQXV0aENvbXBvbmVudF0sXG5cdGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNb2R1bGUge1xuXG59XG4iXX0=
