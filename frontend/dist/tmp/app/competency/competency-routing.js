"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var competency_component_1 = require("./competency.component");
var competency_list_component_1 = require("./competency-list/competency-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var competency_matrix_component_1 = require("./competency-matrix/competency-matrix.component");
var router_1 = require("@angular/router");
exports.CompetencyRoutes = [
    {
        path: 'competency',
        component: competency_component_1.CompetencyComponent,
        data: {
            breadcrumb: 'Competency'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "list",
                component: competency_list_component_1.CompetencyListComponent,
                data: {
                    breadcrumb: 'List'
                }
            },
            {
                path: "matrix",
                component: competency_matrix_component_1.CompetencyMatrixComponent,
                data: {
                    breadcrumb: 'Matrix'
                }
            },
            {
                path: "groups",
                component: group_list_component_1.GroupListComponent,
                data: {
                    breadcrumb: 'Competency groups',
                    category: 'competency'
                },
            }
        ]
    }
];
var CompetencyRoutingModule = (function () {
    function CompetencyRoutingModule() {
    }
    CompetencyRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.CompetencyRoutes)],
            exports: [router_1.RouterModule]
        })
    ], CompetencyRoutingModule);
    return CompetencyRoutingModule;
}());
exports.CompetencyRoutingModule = CompetencyRoutingModule;
