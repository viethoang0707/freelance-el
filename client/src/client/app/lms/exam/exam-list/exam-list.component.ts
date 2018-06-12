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
import { ExamStudyDialog } from '../exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route, Router } from '@angular/router';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';


@Component({
    moduleId: module.id,
    selector: 'lms-exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent implements OnInit {

    EXAM_STATUS = EXAM_STATUS;
    
    private exams: Exam[];
    private examMembers: ExamMember[];
    private submits: Submission[];
    private reportUtils: ReportUtils;
    private currentUser: User;

    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;

    constructor(private router: Router) {
        super();
        this.exams = [];
        this.reportUtils = new ReportUtils();
        this.currentUser =  this.authService.UserProfile;
    }

    ngOnInit() {
        BaseModel.bulk_search(this,
            ExamMember.__api__listByUser(this.currentUser.id),
            Submission.__api__listByUser(this.currentUser.id))
            .subscribe(jsonArray => {
                var members = ExamMember.toArray(jsonArray[0]);
                var submits = Submission.toArray(jsonArray[1]);
                this.displayExams(members, submits);
            });
    }

    displayExams(members: ExamMember[], submits: Submission[]) {
        this.examMembers = _.filter(members, (member: ExamMember) => {
            return (member.exam_id && member.status == 'active');
        });
        ExamMember.populateExamForArray(this, this.examMembers).subscribe(exams => {
            _.each(exams, (exam:Exam) => {
                exam["member"] = _.find(members, (member: ExamMember) => {
                    return member.exam_id == exam.id;
                });
                exam["submit"] = _.find(submits, (submit: Submission) => {
                    return submit.member_id == exam["member"].id && submit.exam_id == exam.id;
                });
                if (exam["submit"]) 
                        exam["score"] = exam["submit."].core;
                    else
                        exam["score"] = '';
                ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                    exam["question_count"] = count;
                });
                exam["examMemberData"] = {};
                ExamMember.listByExam(this, exam.id).subscribe(members => {
                    exam["examMemberData"] = this.reportUtils.analyseExamMember(exam, members);
                });
            });
            this.exams = _.filter(exams, (exam) => {
                return exam["member"].role == 'supervisor' || (exam[".member"].role == 'candidate' && exam.IsAvailable);
            });
            this.exams.sort((exam1, exam2): any => {
                return (exam1.id < exam2.id)
            });
        });
    }

    manageExam(exam: Exam, member: ExamMember) {
        var now = new Date();
        if (exam.start && exam.start.getTime() > now.getTime()) {
            this.warn('Exam has not been started');
            return;
        }
        if (exam.end && exam.end.getTime() < now.getTime()) {
            this.warn('Exam has ended');
            return;
        }
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    }

    editContent(exam: Exam) {
        this.examContentDialog.show(exam);
    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: () => {
                this.examStudyDialog.show(exam, member);
            }
        });
    }

}