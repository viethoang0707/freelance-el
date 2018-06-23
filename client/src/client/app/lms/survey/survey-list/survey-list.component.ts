import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
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
    private submits: SurveySubmission[];
    private reportUtils: ReportUtils;

    @ViewChild(SurveyContentDialog) surveyContentDialog: SurveyContentDialog;
    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;

    constructor(private router: Router) {
        super();
        this.surveys = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        BaseModel.bulk_search(this,
            SurveyMember.__api__listByUser(this.ContextUser.id),
            SurveySubmission.__api__listByUser(this.ContextUser.id))
            .subscribe(jsonArray => {
                var members = SurveyMember.toArray(jsonArray[0]);
                var submits = SurveySubmission.toArray(jsonArray[1]);
                this.displaySurveys(members, submits);
            });
    }

    displaySurveys(surveyMembers: SurveyMember[], submits: SurveySubmission[]) {
        surveyMembers = _.filter(surveyMembers, (member: SurveyMember) => {
            return member.survey_id!=null;
        });
        SurveyMember.populateSurveys(this, surveyMembers).subscribe(surveys => {
            surveys = _.filter(surveys, (survey: Survey) => {
                return survey.review_state == 'approved';
            });
            surveys = _.uniq(surveys, (survey: Survey) => {
                return survey.id;
            });
            surveys.sort((survey1: Survey, survey2: Survey): any => {
                return (survey2.create_date.getTime() - survey1.create_date.getTime());
            });
            _.each(surveys, (survey: SurveyMember) => {
                surveys["candidate"] = _.find(surveyMembers, (member: SurveyMember) => {
                    return member.survey_id == survey.id && member.role == 'candidate';
                });
                surveys["supervisor"] = _.find(surveyMembers, (member: SurveyMember) => {
                    return member.survey_id == survey.id && member.role == 'supervisor';
                });
                surveys["editor"] = _.find(surveyMembers, (member: SurveyMember) => {
                    return member.survey_id == survey.id && (member.role == 'editor' || member.role == 'supervisor');
                });
                if (survey["candidate"]) {
                    survey["submit"] = _.find(submits, (submit: SurveySubmission) => {
                        return submit.member_id == survey["candidate"].id && submit.survey_id == survey.id;
                    });
            });
             var countApi = _.map(surveys, (survey: Survey) => {
                return SurveyQuestion.__api__countBySurvey(survey.id);
            });
            BaseModel.bulk_count(this, ...countApi)
                .map((jsonArray) => {
                    return _.flatten(jsonArray);
                })
                .subscribe(counts => {
                    for (var i = 0; i < surveys.length; i++) {
                        surveys[i]["question_count"] = counts[i];
                    }
                });
            this.surveys =  surveys;
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