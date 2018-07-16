"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dashboard_component_1 = require("./dashboard.component");
var router_1 = require("@angular/router");
exports.DashboardRoutes = [
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        data: {
            breadcrumb: 'Dashboard'
        }
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.DashboardRoutes)],
            exports: [router_1.RouterModule]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
exports.DashboardRoutingModule = DashboardRoutingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLXJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFFekMsNkRBQTJEO0FBQzNELDBDQUErQztBQUVsQyxRQUFBLGVBQWUsR0FBVztJQUNuQztRQUNHLElBQUksRUFBRSxXQUFXO1FBQ2pCLFNBQVMsRUFBRSx3Q0FBa0I7UUFDN0IsSUFBSSxFQUFFO1lBQ0wsVUFBVSxFQUFDLFdBQVc7U0FDdEI7S0FDSDtDQUVKLENBQUE7QUFLRDtJQUFBO0lBQXFDLENBQUM7SUFBekIsc0JBQXNCO1FBSmxDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLHVCQUFlLENBQUMsQ0FBQztZQUNqRCxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1NBQ3hCLENBQUM7T0FDVyxzQkFBc0IsQ0FBRztJQUFELDZCQUFDO0NBQXRDLEFBQXNDLElBQUE7QUFBekIsd0RBQXNCIiwiZmlsZSI6ImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLXJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gJy4vZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkUm91dGVzOiBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgIHBhdGg6ICdkYXNoYm9hcmQnLFxuICAgICAgIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgICAgIGRhdGE6IHtcbiAgICAgICBcdGJyZWFkY3J1bWI6J0Rhc2hib2FyZCdcbiAgICAgICB9XG4gICAgfVxuXG5dXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKERhc2hib2FyZFJvdXRlcyldLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRSb3V0aW5nTW9kdWxlIHt9Il19
