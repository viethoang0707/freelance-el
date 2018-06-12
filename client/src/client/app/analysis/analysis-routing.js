"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analysis_component_1 = require("./analysis.component");
var report_component_1 = require("./report/report.component");
var chart_component_1 = require("./chart/chart.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
exports.AnalysisRoutes = [
    {
        path: "analysis",
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
//# sourceMappingURL=analysis-routing.js.map