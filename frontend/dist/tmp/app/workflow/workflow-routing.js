"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var workflow_component_1 = require("./workflow.component");
var ticket_list_component_1 = require("./ticket-list/ticket-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var approval_tree_component_1 = require("./approval-tree/approval-tree.component");
var router_1 = require("@angular/router");
exports.WorkflowRoutes = [
    {
        path: 'workflow',
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
var WorkflowRoutingModule = (function () {
    function WorkflowRoutingModule() {
    }
    WorkflowRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.WorkflowRoutes)],
            exports: [router_1.RouterModule]
        })
    ], WorkflowRoutingModule);
    return WorkflowRoutingModule;
}());
exports.WorkflowRoutingModule = WorkflowRoutingModule;
