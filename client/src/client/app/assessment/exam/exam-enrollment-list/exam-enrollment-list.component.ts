import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS, SCHEDULER_HEADER, REVIEW_STATE } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ExamDialog } from '../exam-dialog/exam-dialog.component';
import { ExamEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { SelectItem } from 'primeng/api';
import { User } from '../../../shared/models/elearning/user.model';

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
    
    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(ExamEnrollDialog) examEnrollDialog: ExamEnrollDialog;

    constructor() {
        super();
        this.header = SCHEDULER_HEADER;
    }

    enrollExam() {
        if (this.selectedExam ) {
            if (this.selectedExam.review_state != 'approved') {
                this.warn('Exam not reviewed yet');
                return;
            }
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have enroll permission for this exam');
                return;
            }
            this.examEnrollDialog.enroll(this.selectedExam);
        }
    }

    ngOnInit() {
        Exam.allForEnroll(this).subscribe(exams=> {
            this.exams =  exams;
        });
    }

    closeExam() {
        if (this.selectedExam) {
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have close permission for this exam');
                return;
            }
            this.confirm('Are you sure to proceed ?', ()=> {
                this.selectedExam.close(this).subscribe(() => {
                    this.success('Exam close');
                });
            });
        }
    }

    openExam() {
        if (this.selectedExam) {
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have open permission for this exam');
                return;
            }
            this.confirm('Are you sure to proceed ? You will not be able to enroll students after the exam is opened', ()=> {
                this.selectedExam.open(this).subscribe(() => {
                    this.success('Exam open');
                });
            });
        }
    }
}