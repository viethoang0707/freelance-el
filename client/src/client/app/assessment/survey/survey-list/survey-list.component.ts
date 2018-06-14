import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS } from '../../../shared/models/constants'
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SurveyDialog } from '../survey-dialog/survey-dialog.component';
import { SurveyEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'survey-list',
    templateUrl: 'survey-list.component.html',
    styleUrls: ['survey-list.component.css'],
})
export class SurveyListComponent extends BaseComponent {

    SURVEY_STATUS = SURVEY_STATUS;

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
        if (this.selectedSurvey)
            this.surveyEnrollDialog.enroll(this.selectedSurvey);
    }

    ngOnInit() {
        this.loadSurveys();
    }


    addSurvey() {
        var survey = new Survey();
        survey.is_public =  true;
        survey.supervisor_id = this.authService.UserProfile.id;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(() => {
            this.loadSurveys();
        });
    }

    editSurvey() {
        if (this.selectedSurvey)
            this.surveyDialog.show(this.selectedSurvey);
    }

    deleteSurvey() {
        if (this.selectedSurvey)
            this.confirm('Are you sure to delete ?', () => {
                this.selectedSurvey.delete(this).subscribe(() => {
                    this.loadSurveys();
                    this.selectedSurvey = null;
                })
            });
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
            this.selectedSurvey.status = 'closed';
            this.selectedSurvey.save(this).subscribe(() => {
                this.success('Survey close');
            });
        }
    }

    openSurvey() {
        if (this.selectedSurvey) {
            this.selectedSurvey.status = 'open';
            this.selectedSurvey.save(this).subscribe(() => {
                this.success('Survey open');
            });
        }
    }
}