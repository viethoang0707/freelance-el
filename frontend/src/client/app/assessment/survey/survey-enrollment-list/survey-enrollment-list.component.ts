import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS, REVIEW_STATE } from '../../../shared/models/constants'
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SelectItem } from 'primeng/api';
import { User } from '../../../shared/models/elearning/user.model';
import { DataTable } from 'primeng/primeng';

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


    constructor(private router: Router, private route: ActivatedRoute) {
        super();
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
        this.router.navigate(['/assessment/survey/enroll', survey.id]);
    }

    ngOnInit() {
        Survey.allForEnrollPublic(this, SURVEY_FIELDS).subscribe(surveys => {
            this.surveys = surveys;
        })
    }


    closeSurvey(survey: Survey) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != survey.supervisor_id) {
            this.error(this.translateService.instant('You do not have close permission for this survey'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed ?. You will not be able to enroll new members after the survey is closed'), () => {
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
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            survey.open(this).subscribe(() => {
                survey.status = 'open';
                this.success(this.translateService.instant('Survey open'));
            });
        });

    }
}