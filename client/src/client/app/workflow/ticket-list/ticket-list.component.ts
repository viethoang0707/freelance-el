import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import { WorkflowService } from '../../shared/services/workflow.service';
import { WebSocketService } from '../../shared/services/socket.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, TICKET_STATUS } from '../../shared/models/constants'
import { Ticket } from '../../shared/models/ticket/ticket.model';
import { Notification } from '../../shared/models/ticket/notification.model';
import { TicketDialog } from '../ticket-dialog/ticket-dialog.component';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../shared/models/base.model';

@Component({
    moduleId: module.id,
    selector: 'ticket-list',
    templateUrl: 'ticket-list.component.html',
    styleUrls: ['ticket-list.component.css'],
})
export class TicketListComponent extends BaseComponent {

    private submitTickets: Ticket[];
    private approvalTickets: Ticket[];
    TICKET_STATUS = TICKET_STATUS;

    @ViewChild(TicketDialog) ticketDialog: TicketDialog;

    constructor(private workflowService:WorkflowService, private socketSerivce: WebSocketService) {
        super();
        this.submitTickets = [];
        this.approvalTickets = [];
    }

    ngOnInit() {
        BaseModel
        .bulk_search(this,
            Ticket.__api__listBySubmitUser(this.authService.UserProfile.id),
            Ticket.__api__listByApproveUser(this.authService.UserProfile.id))
        .subscribe(jsonArr=> {
            this.submitTickets =  Ticket.toArray(jsonArr[0]);
            this.approvalTickets =  Ticket.toArray(jsonArr[1]);
        })
    }

    ticketDetail(ticket: Ticket) {
        this.ticketDialog.show(ticket);
    }

    approveTicket(ticket: Ticket) {
        if (ticket.status == 'open') {
            this.workflowService.approveTicket(this, ticket).subscribe(()=> {
                this.info(this.translateService.instant('Ticket approved'));
                this.closeTransaction();
            });
        }
    }

    rejectTicket(ticket: Ticket) {
        if (ticket.status == 'open') {
            this.workflowService.rejectTicket(this, ticket).subscribe(()=> {
                this.info(this.translateService.instant('Ticket rejected'));
                this.closeTransaction();
            });
        }
    }


}