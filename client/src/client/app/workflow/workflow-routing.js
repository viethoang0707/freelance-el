"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var workflow_component_1 = require("./workflow.component");
var ticket_list_component_1 = require("./ticket-list/ticket-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var approval_tree_component_1 = require("./approval-tree/approval-tree.component");
exports.WorkflowRoutes = [
    {
        path: "workflow",
        component: workflow_component_1.WorkflowComponent,
        data: {
            breadcrumb: 'Workflow'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "tickets",
                component: ticket_list_component_1.TicketListComponent,
                data: {
                    breadcrumb: 'Tickets'
                }
            },
            {
                path: "hierachy",
                component: approval_tree_component_1.ApprovalTreeComponent,
                data: {
                    breadcrumb: 'Workflow'
                },
            }
        ]
    }
];
//# sourceMappingURL=workflow-routing.js.map