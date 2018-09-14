import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { WorkflowService } from '../../shared/services/workflow.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, TICKET_STATUS } from '../../shared/models/constants'
import { Ticket } from '../../shared/models/elearning/ticket.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../shared/models/base.model';
import { User } from '../../shared/models/elearning/user.model';

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

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.submitTickets = [];
        this.approvalTickets = [];
    }

    ngOnInit() {
        BaseModel
        .bulk_search(this,
            User.__api__listSubmitTickets(this.ContextUser.id),
            User.__api__listReviewTickets(this.ContextUser.id))
        .subscribe(jsonArr=> {
            this.submitTickets =  Ticket.toArray(jsonArr[0]);
            this.approvalTickets =  Ticket.toArray(jsonArr[1]);
        })
    }

    ticketDetail(ticket: Ticket) {
        this.router.navigate(['/workflow/ticket/form', ticket.id]);
    }

    approveTicket(ticket: Ticket) {
        if (ticket.status == 'open') {
            this.workflowService.approveTicket(this, ticket.id).subscribe(()=> {
                this.info(this.translateService.instant('Ticket approved'));
            });
        }
    }

    rejectTicket(ticket: Ticket) {
        if (ticket.status == 'open') {
            this.workflowService.rejectTicket(this, ticket.id).subscribe(()=> {
                this.info(this.translateService.instant('Ticket rejected'));
            });
        }
    }


}