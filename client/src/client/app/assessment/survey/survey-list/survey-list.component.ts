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
                this.warn('Survey not reviewed yet');
                return;
            }
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id == this.selectedSurvey.supervisor_id) {
                this.error('You do not have enroll permission for this survey');
                return;
            }
            this.surveyEnrollDialog.enroll(this.selectedSurvey);
        }
    }

    ngOnInit() {
        this.loadSurveys();
    }


    addSurvey() {
        var survey = new Survey();
        survey.is_public =  true;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(() => {
            this.loadSurveys();
        });
    }

    editSurvey() {
        if (this.selectedSurvey) {
            if  (!this.ContextUser.IsSuperAdmin || this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have edit permission for this survey');
                return;
            }
            this.surveyDialog.show(this.selectedSurvey);
        }
    }

    deleteSurvey() {
        if (this.selectedSurvey) {
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have delete permission for this survey');
                return;
            }
            this.confirm('Are you sure to delete ?', () => {
                this.selectedSurvey.delete(this).subscribe(() => {
                    this.loadSurveys();
                    this.selectedSurvey = null;
                })
            });
        }
    }

    onDayClick() {
        this.addSurvey();
    }

    onEventClick(event) {
        var suerveyId = event.calEvent.id;
        this.selectedSurvey = _.find(this.surveys, (survey) => {
            return survey.id == suerveyId;
        });
        this.editSurvey();
    }

    loadSurveys() {
        Survey.listPublicSurvey(this).subscribe(surveys => {
            this.surveys = surveys;
            this.events = _.map(surveys, (survey:Survey) => {
                return {
                    title: survey.name,
                    start: survey.start,
                    end: survey.end,
                    id: survey.id,
                    allDay: true
                }
            });
            this.surveys.sort((s1, s2): any => {
                return (s1.id < s2.id);
            });
        });
    }

    closeSurvey() {
        if (this.selectedSurvey) {
            if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have close permission for this survey');
                return;
            }
            this.selectedSurvey.status = 'closed';
            this.selectedSurvey.save(this).subscribe(() => {
                this.success('Survey close');
            });
        }
    }

    openSurvey() {
        if (this.selectedSurvey) {
            if  (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have open permission for this survey');
                return;
            }
            this.selectedSurvey.status = 'open';
            this.selectedSurvey.save(this).subscribe(() => {
                this.success('Survey open');
            });
        }
    }
}