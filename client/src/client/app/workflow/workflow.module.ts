import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { WorkflowComponent } from './workflow.component'
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDialog } from './ticket-dialog/ticket-dialog.component';
import { ApprovalTreeComponent } from './approval-tree/approval-tree.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [WorkflowComponent, TicketListComponent, TicketDialog, ApprovalTreeComponent],
    providers: [],
    exports: [TicketDialog],
})
export class WorkflowModule {
}
