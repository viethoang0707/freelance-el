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

    @ViewChild(SurveyDialog) surveyDialog: SurveyDialog;
    @ViewChild(SurveyEnrollDialog) surveyEnrollDialog: SurveyEnrollDialog;

    private selectedSurvey: Survey;
    private surveys: Survey[];
    private events: any[];
    private header: any;
    SURVEY_STATUS = SURVEY_STATUS;

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
        survey.supervisor_id =  this.authService.UserProfile.id;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(() => {
            this.loadSurveys();
        });
    }

    editSurvey() {
        if (this.selectedSurvey)
            this.surveyDialog.show(this.selectedSurvey);
    }

    deleteExam() {
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
        this.startTransaction();
        Survey.all(this).subscribe(surveys => {
            this.surveys = surveys;
            this.events = _.map(surveys, (survey) => {
                return {
                    title: survey.name,
                    start: survey.start,
                    end: survey.end,
                    id: survey.id,
                    allDay: true
                }
            });
            this.surveys.sort((s1, s2): any => {
                if (s1.id > s2.id)
                    return -1;
                else if (s1.id < s2.id)
                    return 1;
                else
                    return 0;
            });
            this.closeTransaction();
        });
    }
}