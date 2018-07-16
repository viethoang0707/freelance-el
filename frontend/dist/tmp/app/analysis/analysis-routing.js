"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var analysis_component_1 = require("./analysis.component");
var report_component_1 = require("./report/report.component");
var chart_component_1 = require("./chart/chart.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var router_1 = require("@angular/router");
exports.AnalysisRoutes = [
    {
        path: 'analysis',
        component: analysis_component_1.AnalysisComponent,
        data: {
            breadcrumb: 'Analysis'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "reports",
                component: report_component_1.ReportComponent,
                data: {
                    breadcrumb: 'Report'
                }
            },
            {
                path: "charts",
                component: chart_component_1.ChartComponent,
                data: {
                    breadcrumb: 'Charts'
                }
            },
        ]
    }
];
var AnalysisRoutingModule = (function () {
    function AnalysisRoutingModule() {
    }
    AnalysisRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.AnalysisRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AnalysisRoutingModule);
    return AnalysisRoutingModule;
}());
exports.AnalysisRoutingModule = AnalysisRoutingModule;
