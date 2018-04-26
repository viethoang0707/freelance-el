import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { SelectItem } from 'primeng/api';
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog} from '../exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';


@Component({
    moduleId: module.id,
    selector: 'lms-exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent implements OnInit {

    exams: Exam[];
    EXAM_STATUS = EXAM_STATUS;
    @ViewChild(ExamContentDialog) examContentDialog:ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog:ExamStudyDialog;

    constructor(private reportUtils: ReportUtils) {
        super();
        this.exams = [];
    }

    ngOnInit() {
        ExamMember.listByUser(this, this.authService.UserProfile.id).subscribe(members => {
            var examIds = _.pluck(members,'exam_id');
            Exam.array(this, examIds)
            .subscribe(exams => {
                this.exams = _.filter(exams, (exam)=> {
                     return exam.member.role=='supervisor' || (exam.member.role=='candidate' && exam.status == 'published');
                });
                _.each(exams, (exam)=> {
                    exam.member = _.find(members, (member:ExamMember)=> {
                        return member.exam_id == exam.id;
                    });
                    exam.member.examScore(this, exam.id).subscribe(score=> {
                        exam.member.score = score;
                    });
                    ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                        exam.question_count = count;
                    });
                    exam.examMemberData = {};
                    ExamMember.listByExam(this, exam.id).subscribe(members => {
                         exam.examMemberData = this.reportUtils.analyseExamMember(exam,members);
                     });
                });
                
            });
        });
    }

    manageExam(exam:Exam,member: ExamMember) {
       this.router.navigate(['/lms/exams/manage',exam.id, member.id]);
    }

    editContent(exam:Exam) {
        this.examContentDialog.show(exam);
    }

    startExam(exam:Exam, member: ExamMember) {
        this.confirm('Are you sure to start ?',() => {
                    this.examStudyDialog.show(exam, member);
                }
           );
    }
}