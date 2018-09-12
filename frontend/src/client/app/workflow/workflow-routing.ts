import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { WorkflowComponent } from './workflow.component'
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ApprovalTreeComponent } from './approval-tree/approval-tree.component';
import { TicketResolve } from './router.resolver';

export const WorkflowRoutes: Routes = [
  {
    path: 'workflow',
    component: WorkflowComponent,
    data: {
      breadcrumb: 'Workflow'
    },
    canActivate: [AdminGuard],
    children:
      [
        {
          path: "tickets",
          component: TicketListComponent,
          data: {
            breadcrumb: 'Tickets'
          }
        },
        {
          path: "ticket/form/:ticketId",
          component: TicketFormComponent,
          data: {
            breadcrumb: 'Ticket form'
          },
          resolve: {
            ticket: TicketResolve,
          },
        },
        {
          path: "hierachy",
          component: ApprovalTreeComponent,
          data: {
            breadcrumb: 'Workflow'
          },
        }
      ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(WorkflowRoutes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }