import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { WorkflowComponent } from './workflow.component'
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDialog } from './ticket-dialog/ticket-dialog.component';
import { ApprovalTreeComponent } from './approval-tree/approval-tree.component';
import { WorkflowRoutingModule } from './workflow-routing';

@NgModule({
    imports: [WorkflowRoutingModule, ErpSharedModule, AuthModule],
    declarations: [WorkflowComponent, TicketListComponent, TicketDialog, ApprovalTreeComponent],
    providers: [],
    exports: [TicketDialog],
})
export class WorkflowModule {
}
