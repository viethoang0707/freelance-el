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
        this.lmsProfileService.init(this).subscribe(() => {
            var surveys = this.lmsProfileService.MySurveys;
            this.displaySurveys(surveys);
        });
    }

    displaySurveys(surveys: Survey[]) {
        _.each(surveys, (survey:Survey)=> {
            survey['candidate'] =  this.lmsProfileService.getSurveyMemberByRole('candidate', survey.id);
            survey['editor'] =  this.lmsProfileService.getSurveyMemberByRole('editor', survey.id);
            survey['supervisor'] =  this.lmsProfileService.getSurveyMemberByRole('supervisor', survey.id);
            if (survey['supervisor'])
                 survey['editor'] =  survey['supervisor'];
        });
        surveys.sort((survey1: Survey, survey2: Survey): any => {
            return this.lmsProfileService.getLastSurveyTimestamp(survey2) - this.lmsProfileService.getLastSurveyTimestamp(survey1);
        });
        this.surveys = surveys;
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