import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../shared/models/constants'
import { Exam } from '../../shared/models/elearning/exam.model';
import { Group } from '../../shared/models/elearning/group.model';
;
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'ticket-list',
    templateUrl: 'ticket-list.component.html',
    styleUrls: ['ticket-list.component.css'],
})
export class TicketListComponent extends BaseComponent {

    selectedExam: Exam;
    exams: Exam[];
    events: any[];
    header: any;


    ngOnInit() {
    }



}