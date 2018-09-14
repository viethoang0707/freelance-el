import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS, REVIEW_STATE } from '../../../shared/models/constants'
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SelectItem } from 'primeng/api';
import { User } from '../../../shared/models/elearning/user.model';

const SURVEY_FIELDS = ['status', 'name', 'summary', 'start', 'end', 'create_date', 'write_date','supervisor_name', 'review_state', 'status', 'supervisor_id'];


@Component({
    moduleId: module.id,
    selector: 'survey-list',
    templateUrl: 'survey-list.component.html',
    styleUrls: ['survey-list.component.css'],
})
export class SurveyListComponent extends BaseComponent {

    SURVEY_STATUS = SURVEY_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private selectedSurvey: Survey;
    private surveys: Survey[];
    private events: any[];
    private header: any;


    constructor(private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.loadSurveys();
    }


    addSurvey() {
        this.router.navigate(['/assessment/survey/form']);
    }

    editSurvey(survey:Survey) {
        if (!this.ContextUser.IsSuperAdmin || this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have edit permission for this survey'));
            return;
        }
        this.router.navigate(['/assessment/survey/form', survey.id]);        
    }

    viewSurvey(survey:Survey) {
        this.router.navigate(['/assessment/survey/view', survey.id]);
    }

    deleteSurvey(survey:Survey) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != survey.supervisor_id) {
            this.error(this.translateService.instant('You do not have delete permission for this survey'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            survey.delete(this).subscribe(() => {
                this.loadSurveys();
                this.selectedSurvey = null;
                this.surveys = _.reject(this.surveys, (obj:Survey)=> {
                    return survey.id == obj.id;
                });
                this.success(this.translateService.instant('Delete survey successfully'));
            })
        });
    }

    loadSurveys() {
        Survey.listPublicSurvey(this,SURVEY_FIELDS).subscribe(surveys => {
            this.surveys = _.sortBy(surveys, (survey:Survey)=> {
                return -survey.id;
            });
        });
    }

    requestReview(survey:Survey) {
        if (this.ContextUser.id != survey.supervisor_id) {
            this.error(this.translateService.instant('You do not have submit-review permission for this survey'));
            return;
        }
        this.workflowService.createSurveyReviewTicket(this, survey).subscribe(() => {
            this.success(this.translateService.instant('Request submitted'));
            survey.populate(this).subscribe();
        });
    }
}