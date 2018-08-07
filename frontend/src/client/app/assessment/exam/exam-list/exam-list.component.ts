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

const EXAM_FIELDS = ['is_public', 'name', 'supervisor_name', 'start', 'end', 'supervisor_id', 'create_date', 'write_date', 'status', 'review_state'];


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
            this.exams = [exam, ...this.exams];
            this.success('Add exam successfully');
        });
    }

    editExam(exam:Exam) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this exam'));
            return;
        }
        exam.populate(this).subscribe(()=> {
            this.examDialog.show(exam);
        });
    }

    deleteExam(exam:Exam) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this exam'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            exam.delete(this).subscribe(() => {
                this.exams = _.reject(this.exams, (obj:Exam)=> {
                    return exam.id == obj.id;
                });
                this.selectedExam = null;
                this.success('Delete exam successfully');
            })
        });
    }

    loadExams() {
        Exam.listPublicExam(this, EXAM_FIELDS).subscribe(exams => {
            this.exams = _.sortBy(exams, (exam:Exam) => {
                return exam.id
            });
        });
    }

    requestReview(exam:Exam) {
        if (this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have submit-review permission for this exam'));
            return;
        }
        this.workflowService.createExamReviewTicket(this, exam).subscribe(() => {
            this.success(this.translateService.instant('Request submitted'));
            exam.populate(this).subscribe();
        });
    }
}