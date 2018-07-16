"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var assessment_module_1 = require("../assessment/assessment.module");
var course_module_1 = require("../course/course.module");
var cms_module_1 = require("../cms/cms.module");
var lms_module_1 = require("../lms/lms.module");
var admin_dashboard_component_1 = require("./admin-dashboard/admin-dashboard.component");
var user_dashboard_component_1 = require("./user-dashboard/user-dashboard.component");
var dashboard_component_1 = require("./dashboard.component");
var date_utils_1 = require("../shared/helpers/date.utils");
var dashboard_routing_1 = require("./dashboard-routing");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [dashboard_routing_1.DashboardRoutingModule, shared_module_1.ErpSharedModule, assessment_module_1.AssessmentModule, course_module_1.CourseModule, cms_module_1.CMSModule, lms_module_1.LMSModule],
            declarations: [
                dashboard_component_1.DashboardComponent,
                admin_dashboard_component_1.AdminDashboardComponent,
                user_dashboard_component_1.UserDashboardComponent
            ],
            exports: [dashboard_component_1.DashboardComponent],
            providers: [date_utils_1.DateUtils]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
