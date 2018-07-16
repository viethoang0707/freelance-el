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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxzQ0FBeUM7QUFDekMsMENBQStDO0FBQy9DLG1EQUFpRDtBQUNqRCwwREFBd0Q7QUFDeEQsOERBQTJEO0FBQzNELDhEQUEyRDtBQUMzRCwyREFBd0Q7QUFDeEQsdUVBQW9FO0FBQ3BFLGtEQUErQztBQUMvQyxpRUFBOEQ7QUFDOUQsb0VBQWlFO0FBQ2pFLGlFQUE4RDtBQUM5RCx1RUFBb0U7QUEwQnBFO0lBQUE7SUFDQSxDQUFDO0lBRFksaUJBQWlCO1FBeEI3QixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AscUJBQVksQ0FBQyxRQUFRLENBQUM7b0JBQ3BCO3dCQUNFLElBQUksRUFBRSxFQUFFO3dCQUNSLFNBQVMsRUFBRSw4QkFBYTt3QkFDeEIsV0FBVyxFQUFFLENBQUMsc0JBQVMsQ0FBQzt3QkFDeEIsUUFBUSxFQUNILG1DQUFlLFFBQ2YsK0JBQWEsRUFDYiwrQkFBYSxFQUNiLDZCQUFZLEVBQ1oscUNBQWdCLEVBQ2hCLGlDQUFjLEVBQ2QsdUJBQVMsRUFDVCxpQ0FBYyxFQUNkLHFDQUFnQixDQUNwQjtxQkFDRjtvQkFDRCxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBQztpQkFDN0IsQ0FBQzthQUNIO1lBQ0QsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztTQUN4QixDQUFDO09BQ1csaUJBQWlCLENBQzdCO0lBQUQsd0JBQUM7Q0FERCxBQUNDLElBQUE7QUFEWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL2hvbWUvaG9tZS1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuLi9zaGFyZWQvZ3VhcmRzL2F1dGguZ3VhcmQnO1xuaW1wb3J0IHsgU2V0dGluZ1JvdXRlcyB9IGZyb20gJy4uL3NldHRpbmcvc2V0dGluZy1yb3V0aW5nJztcbmltcG9ydCB7IEFjY291bnRSb3V0ZXMgfSBmcm9tICcuLi9hY2NvdW50L2FjY291bnQtcm91dGluZyc7XG5pbXBvcnQgeyBDb3Vyc2VSb3V0ZXMgfSBmcm9tICcuLi9jb3Vyc2UvY291cnNlLXJvdXRpbmcnO1xuaW1wb3J0IHsgQXNzZXNzbWVudFJvdXRlcyB9IGZyb20gJy4uL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC1yb3V0aW5nJztcbmltcG9ydCB7IExNU1JvdXRlcyB9IGZyb20gJy4uL2xtcy9sbXMtcm91dGluZyc7XG5pbXBvcnQgeyBBbmFseXNpc1JvdXRlcyB9IGZyb20gJy4uL2FuYWx5c2lzL2FuYWx5c2lzLXJvdXRpbmcnO1xuaW1wb3J0IHsgRGFzaGJvYXJkUm91dGVzIH0gZnJvbSAnLi4vZGFzaGJvYXJkL2Rhc2hib2FyZC1yb3V0aW5nJztcbmltcG9ydCB7IFdvcmtmbG93Um91dGVzIH0gZnJvbSAnLi4vd29ya2Zsb3cvd29ya2Zsb3ctcm91dGluZyc7XG5pbXBvcnQgeyBDb21wZXRlbmN5Um91dGVzIH0gZnJvbSAnLi4vY29tcGV0ZW5jeS9jb21wZXRlbmN5LXJvdXRpbmcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIGNvbXBvbmVudDogSG9tZUNvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIC4uLkRhc2hib2FyZFJvdXRlcyxcbiAgICAgICAgICAuLi5TZXR0aW5nUm91dGVzLFxuICAgICAgICAgIC4uLkFjY291bnRSb3V0ZXMsXG4gICAgICAgICAgLi4uQ291cnNlUm91dGVzLFxuICAgICAgICAgIC4uLkFzc2Vzc21lbnRSb3V0ZXMsXG4gICAgICAgICAgLi4uQW5hbHlzaXNSb3V0ZXMsXG4gICAgICAgICAgLi4uTE1TUm91dGVzLFxuICAgICAgICAgIC4uLldvcmtmbG93Um91dGVzLFxuICAgICAgICAgIC4uLkNvbXBldGVuY3lSb3V0ZXNcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtwYXRoOiAnKionLCByZWRpcmVjdFRvOiAnJ31cbiAgICBdKVxuICBdLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUm91dGluZ01vZHVsZSB7XG59Il19
