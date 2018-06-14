import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { WorkflowService } from '../../shared/services/workflow.service';
import { AuthService } from '../../shared/services/auth.service';
import { WebSocketService } from '../../shared/services/socket.service';
import { BaseDialog } from '../../shared/components/base/base.dialog';
import { Ticket } from '../../shared/models/ticket/ticket.model';
import { Comment } from '../../shared/models/ticket/comment.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_MEMBER_ROLE, TICKET_STATUS } from '../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import { Group } from '../../shared/models/elearning/group.model';
import { User } from '../../shared/models/elearning/user.model';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'ticket-dialog',
    templateUrl: 'ticket-dialog.component.html',
})
export class TicketDialog extends BaseDialog<Ticket> {

    TICKET_STATUS = TICKET_STATUS;

    private user: User;
    private comments: Comment[];

    @Input() replyText;

    constructor(private workflowService: WorkflowService, private socketService: WebSocketService) {
        super();
        this.user = this.authService.UserProfile;
    }

    ngOnInit() {
        this.onShow.subscribe(object=> {
            Comment.listByTicket(this, object.id).subscribe(comments => {
                this.comments = comments;
            })
        });

        this.onUpdateComplete.subscribe((object)=> {
            this.workflowService.updateTicket(this, object).subscribe(()=> {
            });
        });
    }

    approveTicket() {
        if (this.object.status == 'open') {
            this.workflowService.approveTicket(this, this.object).subscribe(()=> {
                this.info(this.translateService.instant('Ticket approved'));
                this.closeTransaction();
            });
        }
    }

    rejectTicket() {
        if (this.object.status == 'open') {
            this.workflowService.rejectTicket(this, this.object).subscribe(()=> {
                this.info(this.translateService.instant('Ticket rejected'));
                this.closeTransaction();
            });
        }
    }

    commentTicket() {
        var comment = new Comment();
        comment.submit_user_id =  this.authService.UserProfile.id;
        comment.content = this.replyText;
        comment.date_submit =  new Date();
        comment.ticket_id =  this.object.id;
        comment.save(this).subscribe(()=> {
            this.workflowService.updateTicket(this, this.object).subscribe(()=> {
                this.comments.push(comment);
            });
        });
    }

}


