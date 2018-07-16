"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var setting_component_1 = require("./setting.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var router_1 = require("@angular/router");
exports.SettingRoutes = [
    {
        path: 'setting',
        component: setting_component_1.SettingComponent,
        canActivate: [admin_guard_1.AdminGuard],
        data: {
            breadcrumb: 'Setting'
        },
        children: []
    }
];
var SettingRoutingModule = (function () {
    function SettingRoutingModule() {
    }
    SettingRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.SettingRoutes)],
            exports: [router_1.RouterModule]
        })
    ], SettingRoutingModule);
    return SettingRoutingModule;
}());
exports.SettingRoutingModule = SettingRoutingModule;
