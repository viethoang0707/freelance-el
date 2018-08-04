import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS, REVIEW_STATE } from '../../../shared/models/constants'
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SurveyDialog } from '../survey-dialog/survey-dialog.component';
import { SurveyEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { SelectItem } from 'primeng/api';
import { User } from '../../../shared/models/elearning/user.model';

const SURVEY_FIELDS = ['status', 'name', 'summary', 'start', 'end', 'create_date', 'write_date', 'review_state', 'supervisor_id'];

@Component({
    moduleId: module.id,
    selector: 'survey-enrollment-list',
    templateUrl: 'survey-enrollment-list.component.html',
    styleUrls: ['survey-enrollment-list.component.css'],
})
export class SurveyEnrollmentListComponent extends BaseComponent {

    SURVEY_STATUS = SURVEY_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private selectedSurvey: Survey;
    private surveys: Survey[];
    private events: any[];
    private header: any;

    @ViewChild(SurveyDialog) surveyDialog: SurveyDialog;
    @ViewChild(SurveyEnrollDialog) surveyEnrollDialog: SurveyEnrollDialog;

    constructor() {
        super();
        this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

    enrollSurvey(survey: Survey) {
        if (survey.review_state != 'approved') {
            this.warn(this.translateService.instant('Survey not reviewed yet'));
            return;
        }
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != survey.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this survey'));
            return;
        }
        this.surveyEnrollDialog.enroll(survey);
    }

    ngOnInit() {
        Survey.allForEnrollPublic(this,SURVEY_FIELDS).subscribe(surveys => {
            this.surveys = surveys;
        })
    }


    closeSurvey(survey: Survey) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != survey.supervisor_id) {
            this.error(this.translateService.instant('You do not have close permission for this survey'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            survey.close(this).subscribe(() => {
                survey.status = 'closed';
                this.success(this.translateService.instant('Survey close'));
            });
        });
    }

    openSurvey(survey: Survey) {
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != survey.supervisor_id) {
            this.error(this.translateService.instant('You do not have open permission for this survey'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed ?. You will not be able to enroll new members after the survey is opened'), () => {
            survey.open(this).subscribe(() => {
                survey.status = 'open';
                this.success(this.translateService.instant('Survey open'));
            });
        });

    }
}