"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var home_component_1 = require("./home.component");
var home_routing_module_1 = require("./home-routing.module");
var shared_module_1 = require("../shared/shared.module");
var side_menu_component_1 = require("./side-menu/side-menu.component");
var sub_menu_component_1 = require("./side-menu/sub-menu.component");
var footer_component_1 = require("./footer/footer.component");
var navbar_component_1 = require("./navbar/navbar.component");
var breadcrumb_component_1 = require("./breadcumb/breadcrumb.component");
var home_manager_service_1 = require("./home-manager.service");
var account_module_1 = require("../account/account.module");
var workflow_module_1 = require("../workflow/workflow.module");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule_1 = HomeModule;
    HomeModule.forRoot = function () {
        return {
            ngModule: HomeModule_1,
            providers: [home_manager_service_1.HomeEventManager]
        };
    };
    var HomeModule_1;
    HomeModule = HomeModule_1 = __decorate([
        core_1.NgModule({
            imports: [home_routing_module_1.HomeRoutingModule, shared_module_1.ErpSharedModule, account_module_1.AccountModule, workflow_module_1.WorkflowModule],
            declarations: [home_component_1.HomeComponent, navbar_component_1.NavbarComponent, side_menu_component_1.SideMenuComponent,
                footer_component_1.FooterComponent, sub_menu_component_1.SubMenuComponent, breadcrumb_component_1.BreadcrumbComponent],
            exports: [],
            providers: []
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
