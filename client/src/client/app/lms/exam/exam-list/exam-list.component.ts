import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/exam.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import { ExamQuestion } from '../../../shared/models/exam-question.model';
import { Group } from '../../../shared/models/group.model';
import { Submission } from '../../../shared/models/submission.model';
import { SelectItem } from 'primeng/api';
import { ExamContentDialog } from '../../../cms/exam/content/exam-content.dialog.component';
import { ExamStudyDialog} from '../exam-study/exam-study.dialog.component';
import { ExamMarkingDialog} from '../exam-marking/exam-marking.dialog.component';
import { ExamScoreDialog } from '../exam-score/exam-score.dialog.component';


@Component({
    moduleId: module.id,
    selector: 'etraining-lms-exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent implements OnInit {

    exams: Exam[];
    EXAM_STATUS = EXAM_STATUS;
    @ViewChild(ExamContentDialog) examContentDialog ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog ExamStudyDialog;
    @ViewChild(ExamMarkingDialog) markingDialog ExamMarkingDialog;
    @ViewChild(ExamScoreDialog) scoreDialog ExamScoreDialog;

    constructor() {
        super();
        this.exams = [];
    }

    ngOnInit() {
        var self = this;
        ExamMember.listByUser(this, this.authService.CurrentUser.id).subscribe(members => {
            var examIds = _.pluck(members,'exam_id');
            if (examIds.length)
                Exam.array(this, examIds)
                .subscribe(exams => {
                    _.each(exams, function(exam) {
                        exam.msgs = [];
                        exam.member = _.find(members, function(member:ExamMember) {
                            return member.exam_id == exam.id;
                        });
                        exam.member.examScore(self, exam.id).subscribe(score=> {
                            exam.member.score = score;
                        });
                        ExamQuestion.countByExam(self, exam.id).subscribe(count => {
                            exam.question_count = count;
                        });
                    });
                    this.exams = _.filter(exams, function(exam) {
                         return exam.member.role=='supervisor' || (exam.member.role=='candidate' && exam.status == 'published');
                    });
                });
        });
    }

    markExam(exam:Exam) {
       exam.containsOpenEndQuestion(this).subscribe(result => {
           if (result) {
               this.markingDialog.show(exam);
           } else {
                this.messageService.add({severity:'info', summary:'Exam Info', detail: 'Exam is not available for marking'});
           }
       })
    }

    editContent(exam:Exam) {
        this.examContentDialog.show(exam);
    }

    viewScore(exam:Exam) {
        this.scoreDialog.show(exam);
    }

    startExam(exam:Exam, member: ExamMember) {
        this.confirmationService.confirm({
                message: this.translateService.instant('Are you sure to start ?'),
                accept: () => {
                    this.examStudyDialog.show(exam, member);
                }
            });
        
    }
}