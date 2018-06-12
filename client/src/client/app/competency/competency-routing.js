"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var competency_component_1 = require("./competency.component");
var competency_list_component_1 = require("./competency-list/competency-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var competency_matrix_component_1 = require("./competency-matrix/competency-matrix.component");
exports.CompetencyRoutes = [
    {
        path: "competency",
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
//# sourceMappingURL=competency-routing.js.map