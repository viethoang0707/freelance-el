"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var competency_component_1 = require("./competency.component");
var competency_list_component_1 = require("./competency-list/competency-list.component");
var competency_dialog_component_1 = require("./competency-dialog/competency-dialog.component");
var competency_matrix_component_1 = require("./competency-matrix/competency-matrix.component");
var competency_routing_1 = require("./competency-routing");
var CompetencyModule = (function () {
    function CompetencyModule() {
    }
    CompetencyModule = __decorate([
        core_1.NgModule({
            imports: [competency_routing_1.CompetencyRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [competency_component_1.CompetencyComponent, competency_list_component_1.CompetencyListComponent, competency_dialog_component_1.CompetencyDialog, competency_matrix_component_1.CompetencyMatrixComponent],
            providers: [],
            exports: [],
        })
    ], CompetencyModule);
    return CompetencyModule;
}());
exports.CompetencyModule = CompetencyModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wZXRlbmN5L2NvbXBldGVuY3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLG1EQUFpRDtBQUNqRCx5REFBMEQ7QUFDMUQsK0RBQTREO0FBQzVELHlGQUFzRjtBQUN0RiwrRkFBbUY7QUFDbkYsK0ZBQTRGO0FBQzVGLDJEQUErRDtBQVEvRDtJQUFBO0lBQ0EsQ0FBQztJQURZLGdCQUFnQjtRQU41QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyw0Q0FBdUIsRUFBRSwrQkFBZSxFQUFFLHdCQUFVLENBQUM7WUFDL0QsWUFBWSxFQUFFLENBQUMsMENBQW1CLEVBQUMsbURBQXVCLEVBQUMsOENBQWdCLEVBQUUsdURBQXlCLENBQUM7WUFDdkcsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7T0FDVyxnQkFBZ0IsQ0FDNUI7SUFBRCx1QkFBQztDQURELEFBQ0MsSUFBQTtBQURZLDRDQUFnQiIsImZpbGUiOiJhcHAvY29tcGV0ZW5jeS9jb21wZXRlbmN5Lm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZHVsZSc7XG5pbXBvcnQgeyBFcnBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21wZXRlbmN5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wZXRlbmN5LmNvbXBvbmVudCdcbmltcG9ydCB7IENvbXBldGVuY3lMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wZXRlbmN5LWxpc3QvY29tcGV0ZW5jeS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wZXRlbmN5RGlhbG9nIH0gZnJvbSAnLi9jb21wZXRlbmN5LWRpYWxvZy9jb21wZXRlbmN5LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeU1hdHJpeENvbXBvbmVudCB9IGZyb20gJy4vY29tcGV0ZW5jeS1tYXRyaXgvY29tcGV0ZW5jeS1tYXRyaXguY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBldGVuY3lSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9jb21wZXRlbmN5LXJvdXRpbmcnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21wZXRlbmN5Um91dGluZ01vZHVsZSwgRXJwU2hhcmVkTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDb21wZXRlbmN5Q29tcG9uZW50LENvbXBldGVuY3lMaXN0Q29tcG9uZW50LENvbXBldGVuY3lEaWFsb2csIENvbXBldGVuY3lNYXRyaXhDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW10sXG4gICAgZXhwb3J0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIENvbXBldGVuY3lNb2R1bGUge1xufVxuIl19
