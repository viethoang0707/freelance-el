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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9hbmFseXNpcy1yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBRXpDLDJEQUF5RDtBQUN6RCw4REFBNEQ7QUFDNUQsMkRBQXlEO0FBQ3pELDREQUEwRDtBQUMxRCwwQ0FBK0M7QUFFbEMsUUFBQSxjQUFjLEdBQVc7SUFDcEM7UUFDRSxJQUFJLEVBQUUsVUFBVTtRQUNoQixTQUFTLEVBQUUsc0NBQWlCO1FBQzVCLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCO1FBQ0QsV0FBVyxFQUFFLENBQUMsd0JBQVUsQ0FBQztRQUN6QixRQUFRLEVBQ1I7WUFDRTtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUsa0NBQWU7Z0JBQzFCLElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUUsUUFBUTtpQkFDckI7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFNBQVMsRUFBRSxnQ0FBYztnQkFDekIsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxRQUFRO2lCQUNyQjthQUNGO1NBQ0Y7S0FDRjtDQUVGLENBQUE7QUFNRDtJQUFBO0lBQW9DLENBQUM7SUFBeEIscUJBQXFCO1FBSmpDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLHNCQUFjLENBQUMsQ0FBQztZQUNoRCxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1NBQ3hCLENBQUM7T0FDVyxxQkFBcUIsQ0FBRztJQUFELDRCQUFDO0NBQXJDLEFBQXFDLElBQUE7QUFBeEIsc0RBQXFCIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9hbmFseXNpcy1yb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXNpc0NvbXBvbmVudCB9IGZyb20gJy4vYW5hbHlzaXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vcmVwb3J0L3JlcG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9hZG1pbi5ndWFyZCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgY29uc3QgQW5hbHlzaXNSb3V0ZXM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICdhbmFseXNpcycsXG4gICAgY29tcG9uZW50OiBBbmFseXNpc0NvbXBvbmVudCxcbiAgICBkYXRhOiB7XG4gICAgICBicmVhZGNydW1iOiAnQW5hbHlzaXMnXG4gICAgfSxcbiAgICBjYW5BY3RpdmF0ZTogW0FkbWluR3VhcmRdLFxuICAgIGNoaWxkcmVuOlxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJyZXBvcnRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogUmVwb3J0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYnJlYWRjcnVtYjogJ1JlcG9ydCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJjaGFydHNcIixcbiAgICAgICAgY29tcG9uZW50OiBDaGFydENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdDaGFydHMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXVxuICB9XG5cbl1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1JvdXRlck1vZHVsZS5mb3JDaGlsZChBbmFseXNpc1JvdXRlcyldLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBbmFseXNpc1JvdXRpbmdNb2R1bGUge30iXX0=
