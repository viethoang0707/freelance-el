import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../shared/models/elearning/user.model';
import { Course } from '../../shared/models/elearning/course.model';
import { CourseClassDialog } from '../../course/enrollment/class-dialog/class-dialog.component';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { SelectItem } from 'primeng/api';
import { Exam } from '../../shared/models/elearning/exam.model';
import { DateUtils } from '../../shared/helpers/date.utils';
import { Group } from '../../shared/models/elearning/group.model';
import { ExamDialog } from '../../assessment/exam/exam-dialog/exam-dialog.component';
import * as _ from 'underscore';
import * as moment from 'moment';
import { USER_STATUS, SERVER_DATETIME_FORMAT,TICKET_STATUS, CONTENT_STATUS, SCHEDULER_HEADER } from '../../shared/models/constants';
import { TranslateService } from '@ngx-translate/core';
import { BaseModel } from '../../shared/models/base.model';
import { CourseClass } from '../../shared/models/elearning/course-class.model';
import { Ticket } from '../../shared/models/elearning/ticket.model';
import { WorkflowService } from '../../shared/services/workflow.service';

@Component({
    moduleId: module.id,
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html',
    styleUrls: ['admin-dashboard.component.css'],

})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

    TICKET_STATUS = TICKET_STATUS;

    private events: any[];
    private header: any;
    private exams: Exam[];
    private classes: CourseClass[];
    private approvalTickets : Ticket[];
    private dateUtils: DateUtils;

    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(CourseClassDialog) classDialog: CourseClassDialog;

    constructor() {
        super();
        this.header = SCHEDULER_HEADER;
        this.dateUtils =  new DateUtils();
    }

    ngOnInit() {  
        var now =  new Date();
        this.events = [];
        this.approvalTickets = [];
        BaseModel
        .bulk_search(this,
            Exam.__api__listBySupervisorAndDate(this.ContextUser.id,this.dateUtils.firstDateOfMonth(now),this.dateUtils.lastDateOfMonth(now)),
            CourseClass.__api__listBySupervisorAndDate(this.ContextUser.id,this.dateUtils.firstDateOfMonth(now),this.dateUtils.lastDateOfMonth(now)),
            Ticket.__api__listPendingByApproveUser(this.ContextUser.id))
        .subscribe(jsonArr=> {
            this.exams = _.filter(Exam.toArray(jsonArr[0]), (exam:Exam)=> {
                return exam.IsAvailable;
              }) ;
            var examEvents =  _.map(this.exams, (exam:Exam)=> {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: Exam.Model+':'+exam.id,
                    allDay: true
                    }
                });
            this.classes = _.filter(CourseClass.toArray(jsonArr[1]), (clz:CourseClass)=> {
                return clz.IsAvailable;
              }) ;
            var classEvents =  _.map(this.classes, (clazz:CourseClass)=> {
                return {
                    title: clazz.name,
                    start: clazz.start,
                    end: clazz.end,
                    id: CourseClass.Model+':'+clazz.id,
                    allDay: true
                    }
                });
            this.events = this.events.concat(examEvents).concat(classEvents);
            this.approvalTickets =  Ticket.toArray(jsonArr[2]);
        });
    }

    onEventClick(event) {
        var eventId = event.calEvent.id;
        var model = eventId.split(':')[0];
        var id = eventId.split(':')[1];
        if (model == Exam.Model) {
            var exam = _.find(this.exams, (exam)=> {
                return exam.id == id;
            });
            this.examDialog.show(exam);
        }
        if (model == CourseClass.Model) {
            var clazz = _.find(this.classes, (clazz:CourseClass)=> {
                return clazz.id == id;
            });
            this.classDialog.show(clazz);
        }
    }

    approveTicket(ticket: Ticket) {
        if (ticket.status == 'pending') {
            this.workflowService.approveTicket(this, ticket.id).subscribe(()=> {
                this.info(this.translateService.instant('Ticket approved'));
                this.approvalTickets = _.reject(this.approvalTickets, (obj:Ticket)=> {
                    return obj.id == ticket.id;
                });
            });
        }
    }

    rejectTicket(ticket: Ticket) {
        if (ticket.status == 'pending') {
            this.workflowService.rejectTicket(this, ticket.id).subscribe(()=> {
                this.info(this.translateService.instant('Ticket rejected'));
                this.approvalTickets = _.reject(this.approvalTickets, (obj:Ticket)=> {
                    return obj.id == ticket.id;
                });
            });
        }
    }
}



