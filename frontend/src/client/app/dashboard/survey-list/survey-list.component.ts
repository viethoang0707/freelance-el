import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS } from '../../shared/models/constants'
import { Survey } from '../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../shared/models/elearning/survey-member.model';
import { SurveyQuestion } from '../../shared/models/elearning/survey-question.model';
import { Group } from '../../shared/models/elearning/group.model';
import { SurveySubmission } from '../../shared/models/elearning/survey-submission.model';
import { SelectItem } from 'primeng/api';
import { SurveyStudyDialog } from '../../lms/survey/survey-study/survey-study.dialog.component';
import { ReportUtils } from '../../shared/helpers/report.utils';
import { Route, Router } from '@angular/router';
import { BaseModel } from '../../shared/models/base.model';
import { User } from '../../shared/models/elearning/user.model';

const SURVEY_FIELDS = ['status', 'review_state', 'name', 'create_date', 'write_date', 'supervisor_id', 'summary', 'instruction', 'start', 'end', 'sheet_id', 'question_count', 'sheet_status'];


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
    private surveyMembers: SurveyMember[];

    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;

    constructor(private router: Router) {
        super();
        this.surveys = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.surveyMembers = this.lmsProfileService.MySurveyMembers;
            Survey.array(this, this.lmsProfileService.MySurveyIds, SURVEY_FIELDS).subscribe(surveys => {
                this.displaySurveys(surveys);
            });
        });
    }

    displaySurveys(surveys: Survey[]) {
        _.each(surveys, (survey: Survey) => {
            survey['candidate'] = this.lmsProfileService.getSurveyMemberByRole('candidate', survey.id);
            survey['editor'] = this.lmsProfileService.getSurveyMemberByRole('editor', survey.id);
            survey['supervisor'] = this.lmsProfileService.getSurveyMemberByRole('supervisor', survey.id);
        });
        this.surveys = _.sortBy(surveys, (survey: Survey) => {
            return -survey.id;
        });
    }

    editContent(survey: Survey) {
        this.router.navigate(['/cms/survey/compose', survey.id, survey.sheet_id]);
    }

    startSurvey(survey: Survey, member: SurveyMember) {
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: () => {
                this.surveyStudyDialog.show(survey, member);
            }
        });
    }

    publishSurvey(survey: Survey) {
        survey.sheet_status = 'published';
        survey.save(this).subscribe();
    }

    unpublishSurvey(survey: Survey) {
        survey.sheet_status = 'unpublished';
        survey.save(this).subscribe();
    }

}