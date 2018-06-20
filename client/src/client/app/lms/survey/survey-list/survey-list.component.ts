import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS } from '../../../shared/models/constants'
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SurveySubmission } from '../../../shared/models/elearning/survey-submission.model';
import { SelectItem } from 'primeng/api';
import { SurveyContentDialog } from '../../../cms/survey/content-dialog/survey-content.dialog.component';
import { SurveyStudyDialog } from '../survey-study/survey-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route, Router } from '@angular/router';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';


@Component({
    moduleId: module.id,
    selector: 'lms-survey-list',
    templateUrl: 'survey-list.component.html',
    styleUrls: ['survey-list.component.css'],
})
export class SurveyListComponent extends BaseComponent implements OnInit {

    SURVEY_STATUS = SURVEY_STATUS;

    private surveys: Survey[];
    private surveyMembers: SurveyMember[];
    private submits: SurveySubmission[];
    private reportUtils: ReportUtils;
    private currentUser: User;

    @ViewChild(SurveyContentDialog) surveyContentDialog: SurveyContentDialog;
    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;

    constructor(private router: Router) {
        super();
        this.surveys = [];
        this.reportUtils = new ReportUtils();
        this.currentUser = this.authService.UserProfile;
    }

    ngOnInit() {
        BaseModel.bulk_search(this,
            SurveyMember.__api__listByUser(this.currentUser.id),
            SurveySubmission.__api__listByUser(this.currentUser.id))
            .subscribe(jsonArray => {
                var members = SurveyMember.toArray(jsonArray[0]);
                var submits = SurveySubmission.toArray(jsonArray[1]);
                this.displaySurveys(members, submits);
            });
    }

    displaySurveys(members: SurveyMember[], submits: SurveySubmission[]) {
        this.surveyMembers = _.filter(members, (member: SurveyMember) => {
            return (member.survey_id!=null)
        });
        this.surveyMembers.sort((member1, member2): any => {
            return (member1.survey.create_date < member1.survey.create_date)
        });
        SurveyMember.populateSurveys(this, this.surveyMembers).subscribe(() => {
            _.each(this.surveyMembers, (member: SurveyMember) => {
                member["submit"] = _.find(submits, (submit: SurveySubmission) => {
                    return submit.member_id == member.id && submit.survey_id == member.survey_id;
                });
                member["surveyMemberData"] = {};
            });

            var countApi = _.map(this.surveyMembers, (member: SurveyMember) => {
                return SurveyQuestion.__api__countBySurvey(member.survey_id);
            });
            BaseModel.bulk_count(this, ...countApi)
                .map((jsonArray) => {
                    return _.flatten(jsonArray);
                })
                .subscribe(counts => {
                    for (var i = 0; i < this.surveyMembers.length; i++) {
                        this.surveyMembers[i]["question_count"] = counts[i];
                    }
                });
            var listApi = _.map(this.surveyMembers, (member: SurveyMember) => {
                return SurveyMember.__api__listBySurvey(member.survey_id);
            });
            BaseModel.bulk_search(this, ...listApi)
                .subscribe(jsonArr => {
                    for (var i = 0; i < this.surveyMembers.length; i++) {
                        var members = SurveyMember.toArray(jsonArr[i]);
                        this.surveyMembers[i]["examMemberData"] = this.reportUtils.analyseSurveyMember(this.surveyMembers[i].survey, members);
                    }
                });

        });   
    }

    editContent(survey: Survey) {
        this.surveyContentDialog.show(survey);
    }

    startSurvey(survey: Survey, member: SurveyMember) {
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: () => {
                this.surveyStudyDialog.show(survey, member);
            }
        });
    }

}