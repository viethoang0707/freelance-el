"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var workflow_component_1 = require("./workflow.component");
var ticket_list_component_1 = require("./ticket-list/ticket-list.component");
var ticket_dialog_component_1 = require("./ticket-dialog/ticket-dialog.component");
var approval_tree_component_1 = require("./approval-tree/approval-tree.component");
var workflow_routing_1 = require("./workflow-routing");
var WorkflowModule = (function () {
    function WorkflowModule() {
    }
    WorkflowModule = __decorate([
        core_1.NgModule({
            imports: [workflow_routing_1.WorkflowRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [workflow_component_1.WorkflowComponent, ticket_list_component_1.TicketListComponent, ticket_dialog_component_1.TicketDialog, approval_tree_component_1.ApprovalTreeComponent],
            providers: [],
            exports: [ticket_dialog_component_1.TicketDialog],
        })
    ], WorkflowModule);
    return WorkflowModule;
}());
exports.WorkflowModule = WorkflowModule;
