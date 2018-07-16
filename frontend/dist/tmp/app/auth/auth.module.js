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
