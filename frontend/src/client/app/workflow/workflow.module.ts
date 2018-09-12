import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { WorkflowComponent } from './workflow.component'
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ApprovalTreeComponent } from './approval-tree/approval-tree.component';
import { TicketResolve } from './router.resolver';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule
	],
	declarations: [
		WorkflowComponent,
		TicketListComponent,
		TicketFormComponent,
		ApprovalTreeComponent
	],
	providers: [
		TicketResolve
	],
	exports: [
	],
})
export class WorkflowModule {
}
