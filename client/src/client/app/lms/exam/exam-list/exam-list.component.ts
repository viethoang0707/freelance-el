import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
    private reportUtils: ReportUtils;
    

    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;

    constructor(private router: Router) {
        super();
        this.exams = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        BaseModel.bulk_search(this,
            ExamMember.__api__listByUser(this.ContextUser.id),
            Submission.__api__listByUser(this.ContextUser.id))
            .subscribe(jsonArray => {
                var members = ExamMember.toArray(jsonArray[0]);
                var submits = Submission.toArray(jsonArray[1]);
                this.displayExams(members, submits);
            });
    }

    displayExams(examMembers: ExamMember[], submits: Submission[]) {
        examMembers = _.filter(examMembers, (member: ExamMember) => {
            return member.exam_id && member.status == 'active';
        });
        ExamMember.populateExams(this, examMembers).subscribe(exams => {
            exams = _.filter(exams, (exam: Exam) => {
                return exam.review_state == 'approved';
            });
            exams = _.uniq(exams, (exam: Exam) => {
                return exam.id;
            });
            exams.sort((exam1: Exam, exam2: Exam): any => {
                return (exam2.create_date.getTime() - exam1.create_date.getTime());
            });
            _.each(exams, (exam: Exam) => {
                exam["candidate"] = _.find(examMembers, (member: ExamMember) => {
                    return member.exam_id == exam.id && member.role == 'candidate';
                });
                exam["supervisor"] = _.find(examMembers, (member: ExamMember) => {
                    return member.exam_id == exam.id && member.role == 'supervisor';
                });
                exam["editor"] = _.find(examMembers, (member: ExamMember) => {
                    return member.exam_id == exam.id && (member.role == 'editor' || member.role == 'supervisor');
                });
                if (exam["candidate"]) {
                    exam["submit"] = _.find(submits, (submit: Submission) => {
                        return submit.member_id == exam["candidate"].id && submit.exam_id == exam.id;
                    });
                    if (exam["submit"])
                        exam["score"] = exam["submit"].score;
                    else
                        exam["score"] = '';
                }
                 exam["examMemberData"] = {};
            });
            var countApi = _.map(exams, (exam: Exam) => {
                return ExamQuestion.__api__countByExam(exam.id);
            });
            BaseModel.bulk_count(this, ...countApi)
                .map((jsonArray) => {
                    return _.flatten(jsonArray);
                })
                .subscribe(counts => {
                    for (var i = 0; i < exams.length; i++) {
                        exams[i]["question_count"] = counts[i];
                    }
                });
            var listApi = _.map(exams, (exam: Exam) => {
                return ExamMember.__api__listByExam(exam.id);
            });
            BaseModel.bulk_search(this, ...listApi)
                .subscribe(jsonArr => {
                    for (var i = 0; i < exams.length; i++) {
                        var members = ExamMember.toArray(jsonArr[i]);
                        exams[i]["examMemberData"] = this.reportUtils.analyseExamMember(this.exams[i], members);
                    }
                });
            this.exams = exams;
        });
    }

    manageExam(exam: Exam, member: ExamMember) {
        if (!exam.IsAvailable) {
            this.warn(this.translateService.instant('Exam is not available.'));
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