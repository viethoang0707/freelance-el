"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var auth_guard_1 = require("../shared/guards/auth.guard");
var setting_routing_1 = require("../setting/setting-routing");
var account_routing_1 = require("../account/account-routing");
var course_routing_1 = require("../course/course-routing");
var assessment_routing_1 = require("../assessment/assessment-routing");
var lms_routing_1 = require("../lms/lms-routing");
var analysis_routing_1 = require("../analysis/analysis-routing");
var dashboard_routing_1 = require("../dashboard/dashboard-routing");
var workflow_routing_1 = require("../workflow/workflow-routing");
var competency_routing_1 = require("../competency/competency-routing");
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: home_component_1.HomeComponent,
                        canActivate: [auth_guard_1.AuthGuard],
                        children: dashboard_routing_1.DashboardRoutes.concat(setting_routing_1.SettingRoutes, account_routing_1.AccountRoutes, course_routing_1.CourseRoutes, assessment_routing_1.AssessmentRoutes, analysis_routing_1.AnalysisRoutes, lms_routing_1.LMSRoutes, workflow_routing_1.WorkflowRoutes, competency_routing_1.CompetencyRoutes)
                    },
                    { path: '**', redirectTo: '' }
                ])
            ],
            exports: [router_1.RouterModule]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;
//# sourceMappingURL=home-routing.module.js.map