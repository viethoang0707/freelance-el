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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC93b3JrZmxvdy93b3JrZmxvdy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsbURBQWlEO0FBQ2pELHlEQUEwRDtBQUMxRCwyREFBd0Q7QUFDeEQsNkVBQTBFO0FBQzFFLG1GQUF1RTtBQUN2RSxtRkFBZ0Y7QUFDaEYsdURBQTJEO0FBUTNEO0lBQUE7SUFDQSxDQUFDO0lBRFksY0FBYztRQU4xQixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyx3Q0FBcUIsRUFBRSwrQkFBZSxFQUFFLHdCQUFVLENBQUM7WUFDN0QsWUFBWSxFQUFFLENBQUMsc0NBQWlCLEVBQUUsMkNBQW1CLEVBQUUsc0NBQVksRUFBRSwrQ0FBcUIsQ0FBQztZQUMzRixTQUFTLEVBQUUsRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDLHNDQUFZLENBQUM7U0FDMUIsQ0FBQztPQUNXLGNBQWMsQ0FDMUI7SUFBRCxxQkFBQztDQURELEFBQ0MsSUFBQTtBQURZLHdDQUFjIiwiZmlsZSI6ImFwcC93b3JrZmxvdy93b3JrZmxvdy5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aE1vZHVsZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5tb2R1bGUnO1xuaW1wb3J0IHsgRXJwU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgV29ya2Zsb3dDb21wb25lbnQgfSBmcm9tICcuL3dvcmtmbG93LmNvbXBvbmVudCdcbmltcG9ydCB7IFRpY2tldExpc3RDb21wb25lbnQgfSBmcm9tICcuL3RpY2tldC1saXN0L3RpY2tldC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaWNrZXREaWFsb2cgfSBmcm9tICcuL3RpY2tldC1kaWFsb2cvdGlja2V0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwcm92YWxUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi9hcHByb3ZhbC10cmVlL2FwcHJvdmFsLXRyZWUuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtmbG93Um91dGluZ01vZHVsZSB9IGZyb20gJy4vd29ya2Zsb3ctcm91dGluZyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1dvcmtmbG93Um91dGluZ01vZHVsZSwgRXJwU2hhcmVkTW9kdWxlLCBBdXRoTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtXb3JrZmxvd0NvbXBvbmVudCwgVGlja2V0TGlzdENvbXBvbmVudCwgVGlja2V0RGlhbG9nLCBBcHByb3ZhbFRyZWVDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW10sXG4gICAgZXhwb3J0czogW1RpY2tldERpYWxvZ10sXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtmbG93TW9kdWxlIHtcbn1cbiJdfQ==
