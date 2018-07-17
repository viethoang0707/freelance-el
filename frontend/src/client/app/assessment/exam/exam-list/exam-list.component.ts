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
    selector: 'exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent {

    EXAM_STATUS = EXAM_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private selectedExam: Exam;
    private exams: Exam[];
    private events: any[];

    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(ExamEnrollDialog) examEnrollDialog: ExamEnrollDialog;

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadExams();
    }


    addExam() {
        var exam = new Exam();
        exam.is_public = true;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    editExam(exam:Exam) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error('You do not have enroll permission for this exam');
            return;
        }
        this.examDialog.show(exam);
    }

    deleteExam(exam:Exam) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error('You do not have enroll permission for this exam');
            return;
        }
        this.confirm('Are you sure to delete ?', () => {
            exam.delete(this).subscribe(() => {
                this.loadExams();
                this.selectedExam = null;
            })
        });
    }

    loadExams() {
        Exam.listPublicExam(this).subscribe(exams => {
            this.exams = exams;
            this.exams.sort((exam1, exam2): any => {
                return exam1.id - exam2.id;
            });
        });
    }

    requestReview(exam:Exam) {
        if (this.ContextUser.id != exam.supervisor_id) {
            this.error('You do not have submit-review permission for this exam');
            return;
        }
        this.workflowService.createExamReviewTicket(this, exam).subscribe(() => {
            this.success('Request submitted');
            exam.refresh(this).subscribe();
        });
    }
}