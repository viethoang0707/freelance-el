import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, SURVEY_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { SelectCompetencyLevelDialog } from '../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component';
import { WindowRef } from '../../../shared/helpers/windonw.ref';

@Component({
    moduleId: module.id,
    selector: 'survey-form-content',
    templateUrl: 'survey-form-content.component.html',
})
export class SurveyFormContentComponent extends BaseComponent {

    private locale: any;
    private rangeDates: Date[];
    private editor: SurveyMember;
    private survey: Survey;

    @ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;
    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.editor = new SurveyMember();
        this.survey = new Survey();
    }

    render(survey:Survey, editor:SurveyMember) {
        this.survey = survey;
        this.editor = editor;
        if (this.survey.start && this.survey.end) {
            this.rangeDates = [this.survey.start, this.survey.end];
        }
        var lang = this.translateService.currentLang;
        this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
                this.locale = res.json();
            });;
    }

    onDateSelect($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.survey.start = this.rangeDates[0];
            this.survey.end = this.rangeDates[1];
        }
    }

    selectEditor() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(user => {
            this.editor.user_id = user.id;
            this.editor.name = user.name;
        });
    }

}

