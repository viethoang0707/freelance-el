import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
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
        this.currentUser = this.authService.UserProfile;
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
        members = _.filter(members, (member: ExamMember) => {
            return (member.exam_id && member.status == 'active');
        });
        members.sort((member1, member2): any => {
            return (member1.exam.create_date < member1.exam.create_date)
        });
        ExamMember.populateExamForArray(this, members).subscribe(() => {
            members = _.filter(members, (member: ExamMember) => {
                return member.role == 'supervisor' || (member.role == 'candidate' && member.exam.IsAvailable);
            });
            _.each(members, (member: ExamMember) => {
                member["submit"] = _.find(submits, (submit: Submission) => {
                    return submit.member_id == member.id && submit.exam_id == member.exam_id;
                });
                if (member["submit"])
                    member["score"] = member["submit"].score;
                else
                    member["score"] = '';
                member["examMemberData"] = {};
            });
            this.examMembers =  members;
            var countApi = _.map(this.examMembers, (member: ExamMember) => {
                return ExamQuestion.__api__countByExam(member.exam_id);
            });
            BaseModel.bulk_count(this, ...countApi)
                .map((jsonArray) => {
                    return _.flatten(jsonArray);
                })
                .subscribe(counts => {
                    for (var i = 0; i < this.examMembers.length; i++) {
                        this.examMembers[i]["question_count"] = counts[i];
                    }
                });
            var listApi = _.map(this.examMembers, (member: ExamMember) => {
                return ExamMember.__api__listByExam(member.exam_id);
            });
            BaseModel.bulk_search(this, ...listApi)
                .subscribe(jsonArr => {
                    for (var i = 0; i < this.examMembers.length; i++) {
                        var members = ExamMember.toArray(jsonArr[i]);
                        this.examMembers[i]["examMemberData"] = this.reportUtils.analyseExamMember(this.examMembers[i].exam, members);
                    }
                });
        });
    }

    manageExam(exam: Exam, member: ExamMember) {
        var now = new Date();
        if (exam.start && exam.start.getTime() > now.getTime()) {
            this.warn(this.translateService.instant('Exam has not been started'));
            return;
        }
        if (exam.end && exam.end.getTime() < now.getTime()) {
            this.warn(this.translateService.instant('Exam has ended'));
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