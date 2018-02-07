import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/exam.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import { Group } from '../../../shared/models/group.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-lms-exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent implements OnInit {

    exams: Exam[];
    EXAM_STATUS = EXAM_STATUS;


    constructor() {
        super();

    }

    ngOnInit() {
        ExamMember.listByUser(this, this.authService.CurrentUser.id).subscribe(members => {
            var examIds = _.pluck(members,'exam_id');
            Exam.array(this, examIds).subscribe(exams => {
                this.exams =  exams;
                _.each(exams, function(exam) {
                    exam.member = _.find(members, function(member) {
                        return member.exam_id == exam.id;
                    });
                });
            })
        });
    }


}