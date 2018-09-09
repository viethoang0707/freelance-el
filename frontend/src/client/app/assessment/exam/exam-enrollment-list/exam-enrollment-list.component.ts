import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS, SCHEDULER_HEADER, REVIEW_STATE } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SelectItem } from 'primeng/api';
import { User } from '../../../shared/models/elearning/user.model';

const EXAM_FIELDS = ['status', 'name', 'supervisor_name', 'start', 'end', 'create_date', 'write_date', 'review_state', 'supervisor_id'];

@Component({
    moduleId: module.id,
    selector: 'exam-enrollment-list',
    templateUrl: 'exam-enrollment-list.component.html',
    styleUrls: ['exam-enrollment-list.component.css'],
})
export class ExamEnrollmentListComponent extends BaseComponent {

    EXAM_STATUS = EXAM_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private selectedExam: Exam;
    private exams: Exam[];
    private events: any[];
    private header: any;
    
    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.header = SCHEDULER_HEADER;
    }

    enrollExam(exam:Exam) {
        if (exam.review_state != 'approved') {
            this.warn(this.translateService.instant('Exam not reviewed yet'));
            return;
        }
        if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this exam'));
            return;
        }
        this.router.navigate(['/assessment/exam/enroll', exam.id]);
    }

    ngOnInit() {
        Exam.allForEnrollPublic(this, EXAM_FIELDS).subscribe(exams=> {
            this.exams =  _.sortBy(exams, (exam:Exam)=> {
                return exam.id;
            });
        });
    }

    closeExam(exam:Exam) {
        if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have close permission for this exam'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed ?  You will not be able to enroll students after the exam is closed'), ()=> {
            exam.close(this).subscribe(() => {
                this.success(this.translateService.instant('Exam close'));
            });
        });
    }

    openExam(exam:Exam) {
        if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have open permission for this exam'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), ()=> {
            exam.open(this).subscribe(() => {
                this.success(this.translateService.instant('Exam open'));
            });
        });
    }
}
