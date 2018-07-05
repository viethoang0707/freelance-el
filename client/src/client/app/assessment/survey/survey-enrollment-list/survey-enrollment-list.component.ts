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

    enrollSurvey() {
        if (this.selectedSurvey) {
            if (this.selectedSurvey.review_state != 'approved') {
                this.warn(this.translateService.instant('Survey not reviewed yet'));
                return;
            }
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have enroll permission for this survey');
                return;
            }
            this.surveyEnrollDialog.enroll(this.selectedSurvey);
        }
    }

    ngOnInit() {
        Survey.allForEnroll(this).subscribe(surveys => {
            this.surveys = surveys;
        })
    }


    closeSurvey() {
        if (this.selectedSurvey) {
<<<<<<< HEAD
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error(this.translateService.instant('You do not have close permission for this survey'));
                return;
            }
            this.selectedSurvey.status = 'closed';
            this.selectedSurvey.save(this).subscribe(() => {
                this.success(this.translateService.instant('Survey close'));
=======
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have close permission for this survey');
                return;
            }
            this.confirm('Are you sure to proceed ?', () => {
                this.selectedSurvey.close(this).subscribe(() => {
                    this.success('Survey close');
                });
>>>>>>> Refactor LMS
            });
        }
    }

    openSurvey() {
        if (this.selectedSurvey) {
<<<<<<< HEAD
            if  (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error(this.translateService.instant('You do not have open permission for this survey'));
                return;
            }
            this.selectedSurvey.status = 'open';
            this.selectedSurvey.save(this).subscribe(() => {
                this.success(this.translateService.instant('Survey open'));
=======
            if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have open permission for this survey');
                return;
            }
            this.confirm('Are you sure to proceed ?. You will not be able to enroll new members after the survey is opened', () => {
                this.selectedSurvey.open(this).subscribe(() => {
                    this.success('Survey open');
                });
>>>>>>> Refactor LMS
            });

        }
    }
}