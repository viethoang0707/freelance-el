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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC93b3JrZmxvdy93b3JrZmxvdy1yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBRXpDLDJEQUF3RDtBQUN4RCw2RUFBMEU7QUFFMUUsNERBQTBEO0FBRTFELG1GQUFnRjtBQUNoRiwwQ0FBK0M7QUFFbEMsUUFBQSxjQUFjLEdBQVc7SUFDcEM7UUFDRSxJQUFJLEVBQUUsVUFBVTtRQUNoQixTQUFTLEVBQUUsc0NBQWlCO1FBQzVCLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCO1FBQ0QsV0FBVyxFQUFFLENBQUMsd0JBQVUsQ0FBQztRQUN6QixRQUFRLEVBQ1I7WUFDRTtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUsMkNBQW1CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLFNBQVM7aUJBQ3RCO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsU0FBUyxFQUFFLCtDQUFxQjtnQkFDaEMsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxVQUFVO2lCQUN2QjthQUNGO1NBQ0Y7S0FDRjtDQUVGLENBQUE7QUFNRDtJQUFBO0lBQW9DLENBQUM7SUFBeEIscUJBQXFCO1FBSmpDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLHNCQUFjLENBQUMsQ0FBQztZQUNoRCxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1NBQ3hCLENBQUM7T0FDVyxxQkFBcUIsQ0FBRztJQUFELDRCQUFDO0NBQXJDLEFBQXFDLElBQUE7QUFBeEIsc0RBQXFCIiwiZmlsZSI6ImFwcC93b3JrZmxvdy93b3JrZmxvdy1yb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBXb3JrZmxvd0NvbXBvbmVudCB9IGZyb20gJy4vd29ya2Zsb3cuY29tcG9uZW50J1xuaW1wb3J0IHsgVGlja2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vdGlja2V0LWxpc3QvdGlja2V0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRpY2tldERpYWxvZyB9IGZyb20gJy4vdGlja2V0LWRpYWxvZy90aWNrZXQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9hZG1pbi5ndWFyZCc7XG5pbXBvcnQgeyBHcm91cExpc3RDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1saXN0L2dyb3VwLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcHJvdmFsVHJlZUNvbXBvbmVudCB9IGZyb20gJy4vYXBwcm92YWwtdHJlZS9hcHByb3ZhbC10cmVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgY29uc3QgV29ya2Zsb3dSb3V0ZXM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICd3b3JrZmxvdycsXG4gICAgY29tcG9uZW50OiBXb3JrZmxvd0NvbXBvbmVudCxcbiAgICBkYXRhOiB7XG4gICAgICBicmVhZGNydW1iOiAnV29ya2Zsb3cnXG4gICAgfSxcbiAgICBjYW5BY3RpdmF0ZTogW0FkbWluR3VhcmRdLFxuICAgIGNoaWxkcmVuOlxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJ0aWNrZXRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogVGlja2V0TGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdUaWNrZXRzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcImhpZXJhY2h5XCIsXG4gICAgICAgIGNvbXBvbmVudDogQXBwcm92YWxUcmVlQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYnJlYWRjcnVtYjogJ1dvcmtmbG93J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIF1cbiAgfVxuXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoV29ya2Zsb3dSb3V0ZXMpXSxcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgV29ya2Zsb3dSb3V0aW5nTW9kdWxlIHt9Il19
