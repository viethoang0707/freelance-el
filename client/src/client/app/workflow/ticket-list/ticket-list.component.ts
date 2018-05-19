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

@Component({
    moduleId: module.id,
    selector: 'ticket-list',
    templateUrl: 'ticket-list.component.html',
    styleUrls: ['ticket-list.component.css'],
})
export class TicketListComponent extends BaseComponent {

    submitTickets: Ticket[];
    approvalTickets: Ticket[];
    TICKET_STATUS = TICKET_STATUS;

    @ViewChild(TicketDialog) ticketDialog: TicketDialog;

    constructor(private workflowService:WorkflowService, private socketSerivce: WebSocketService) {
        super();
        this.submitTickets = [];
        this.approvalTickets = [];
    }

    ngOnInit() {
        this.loadSubmitTicket();
        this.loadApprovalTicket();
    }

    loadSubmitTicket() {
        this.startTransaction();
        Ticket.listBySubmitUser(this, this.authService.UserProfile.id).subscribe(tickets=> {
            this.submitTickets =  tickets;
            this.closeTransaction();
        })
    }

    loadApprovalTicket() {
        this.startTransaction();
        Ticket.listByApproveUser(this, this.authService.UserProfile.id).subscribe(tickets=> {
            this.approvalTickets =  tickets;
            this.closeTransaction();
        })
    }

    ticketDetail(ticket: Ticket) {
        this.ticketDialog.show(ticket);
    }

    approveTicket(ticket: Ticket) {
        if (ticket.status == 'open') {
            this.startTransaction();
            this.workflowService.approveTicket(this, ticket).subscribe(()=> {
                this.info('Ticket approved');
                this.closeTransaction();
            });
        }
    }

    rejectTicket(ticket: Ticket) {
        if (ticket.status == 'open') {
            this.startTransaction();
            this.workflowService.rejectTicket(this, ticket).subscribe(()=> {
                this.info('Ticket rejected');
                this.closeTransaction();
            });
        }
    }


}