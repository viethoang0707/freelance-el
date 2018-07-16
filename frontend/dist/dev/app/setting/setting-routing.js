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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXR0aW5nL3NldHRpbmctcm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUV6Qyx5REFBdUQ7QUFDdkQsNERBQTBEO0FBQzFELDBDQUErQztBQUVsQyxRQUFBLGFBQWEsR0FBVztJQUNuQztRQUNFLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLG9DQUFnQjtRQUMzQixXQUFXLEVBQUUsQ0FBQyx3QkFBVSxDQUFDO1FBQ3pCLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxTQUFTO1NBQ3RCO1FBQ0QsUUFBUSxFQUNSLEVBQ0M7S0FDRjtDQUVGLENBQUE7QUFNRDtJQUFBO0lBQW1DLENBQUM7SUFBdkIsb0JBQW9CO1FBSmhDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLHFCQUFhLENBQUMsQ0FBQztZQUMvQyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1NBQ3hCLENBQUM7T0FDVyxvQkFBb0IsQ0FBRztJQUFELDJCQUFDO0NBQXBDLEFBQW9DLElBQUE7QUFBdkIsb0RBQW9CIiwiZmlsZSI6ImFwcC9zZXR0aW5nL3NldHRpbmctcm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2V0dGluZ0NvbXBvbmVudCB9IGZyb20gJy4vc2V0dGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuZXhwb3J0IGNvbnN0IFNldHRpbmdSb3V0ZXM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICdzZXR0aW5nJyxcbiAgICBjb21wb25lbnQ6IFNldHRpbmdDb21wb25lbnQsXG4gICAgY2FuQWN0aXZhdGU6IFtBZG1pbkd1YXJkXSxcbiAgICBkYXRhOiB7XG4gICAgICBicmVhZGNydW1iOiAnU2V0dGluZydcbiAgICB9LFxuICAgIGNoaWxkcmVuOlxuICAgIFtcbiAgICBdXG4gIH1cblxuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKFNldHRpbmdSb3V0ZXMpXSxcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ1JvdXRpbmdNb2R1bGUge30iXX0=
