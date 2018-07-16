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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5REFBMEQ7QUFDMUQscUVBQW1FO0FBQ25FLHlEQUF1RDtBQUN2RCxnREFBOEM7QUFDOUMsZ0RBQThDO0FBQzlDLHlGQUFzRjtBQUN0RixzRkFBbUY7QUFDbkYsNkRBQTBEO0FBQzFELDJEQUF5RDtBQUN6RCx5REFBNkQ7QUFXN0Q7SUFBQTtJQUNBLENBQUM7SUFEWSxlQUFlO1FBVDNCLGVBQVEsQ0FBQztZQUNULE9BQU8sRUFBRSxDQUFDLDBDQUFzQixFQUFFLCtCQUFlLEVBQUUsb0NBQWdCLEVBQUUsNEJBQVksRUFBQyxzQkFBUyxFQUFFLHNCQUFTLENBQUM7WUFDdkcsWUFBWSxFQUFFO2dCQUNiLHdDQUFrQjtnQkFDbEIsbURBQXVCO2dCQUN2QixpREFBc0I7YUFBQztZQUN4QixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0IsQ0FBQztZQUM3QixTQUFTLEVBQUMsQ0FBQyxzQkFBUyxDQUFDO1NBQ3JCLENBQUM7T0FDVyxlQUFlLENBQzNCO0lBQUQsc0JBQUM7Q0FERCxBQUNDLElBQUE7QUFEWSwwQ0FBZSIsImZpbGUiOiJhcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXJwU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQXNzZXNzbWVudE1vZHVsZSB9IGZyb20gJy4uL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC5tb2R1bGUnO1xuaW1wb3J0IHsgQ291cnNlTW9kdWxlIH0gZnJvbSAnLi4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ01TTW9kdWxlIH0gZnJvbSAnLi4vY21zL2Ntcy5tb2R1bGUnO1xuaW1wb3J0IHsgTE1TTW9kdWxlIH0gZnJvbSAnLi4vbG1zL2xtcy5tb2R1bGUnO1xuaW1wb3J0IHsgQWRtaW5EYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2FkbWluLWRhc2hib2FyZC9hZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3VzZXItZGFzaGJvYXJkL3VzZXItZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2Rhc2hib2FyZC5jb21wb25lbnQnXG5pbXBvcnQgeyBEYXRlVXRpbHMgfSBmcm9tICcuLi9zaGFyZWQvaGVscGVycy9kYXRlLnV0aWxzJztcbmltcG9ydCB7IERhc2hib2FyZFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2Rhc2hib2FyZC1yb3V0aW5nJztcblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW0Rhc2hib2FyZFJvdXRpbmdNb2R1bGUsIEVycFNoYXJlZE1vZHVsZSwgQXNzZXNzbWVudE1vZHVsZSwgQ291cnNlTW9kdWxlLENNU01vZHVsZSwgTE1TTW9kdWxlXSxcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0RGFzaGJvYXJkQ29tcG9uZW50LCBcblx0XHRBZG1pbkRhc2hib2FyZENvbXBvbmVudCwgXG5cdFx0VXNlckRhc2hib2FyZENvbXBvbmVudF0sXG5cdGV4cG9ydHM6IFtEYXNoYm9hcmRDb21wb25lbnRdLFxuXHRwcm92aWRlcnM6W0RhdGVVdGlsc11cbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkTW9kdWxlIHtcbn1cbiJdfQ==
