import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS, SCHEDULER_HEADER, REVIEW_STATE } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Group } from '../../../shared/models/elearning/group.model';
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

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.loadExams();
    }


    addExam() {
        this.router.navigate(['/assessment/exam/form']);
    }

    editExam(exam: Exam) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this exam'));
            return;
        }
        this.router.navigate(['/assessment/exam/form', exam.id]);
    }

    viewExam(exam: Exam) {
        this.router.navigate(['/assessment/exam/view', exam.id]);
    }

    deleteExam(exam: Exam) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this exam'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            exam.delete(this).subscribe(() => {
                this.exams = _.reject(this.exams, (obj: Exam) => {
                    return exam.id == obj.id;
                });
                this.selectedExam = null;
                this.success(this.translateService.instant('Delete exam successfully'));
            })
        });
    }

    loadExams() {
        Exam.listPublicExam(this, EXAM_FIELDS).subscribe(exams => {
            this.exams = _.sortBy(exams, (exam: Exam) => {
                return -exam.id;
            });
        });
    }

    requestReview(exam: Exam) {
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