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
import { SurveyFormContentComponent} from './survey-form-content.component';

@Component({
    moduleId: module.id,
    selector: 'survey-form',
    templateUrl: 'survey-form.component.html',
    styleUrls: ['survey-form.component.css'],
})
export class SurveyFormComponent extends BaseComponent {

    private locale: any;
    private rangeDates: Date[];
    private editor: SurveyMember;
    private survey: Survey;

    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.editor = new SurveyMember();
        this.survey = new Survey();
    }

    ngOnInit() {
        this.survey = this.route.snapshot.data['survey'];
        if (this.survey.IsNew) {
            this.editor = new SurveyMember();
            this.survey.supervisor_id = this.ContextUser.id;
            this.survey.review_state = this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
        } else {
            this.survey.surveyEditor(this).subscribe(member => {
                if (!member) {
                    this.editor = new SurveyMember();
                    this.editor.role = 'editor';
                    this.editor.survey_id = this.survey.id;
                } else
                    this.editor = member;
            });
        }
    }

    save() {
        this.survey.save(this).subscribe(() => {
            this.editor.role = 'editor';
            this.editor.survey_id = this.survey.id;
            this.editor.save(this).subscribe(() => {
                this.router.navigate(['/assessment/survey/view', this.survey.id]);
            });
        });
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

    cancel() {
        if (this.survey.IsNew)
            this.router.navigate(['/assessment/surveys']);
        else
            this.router.navigate(['/assessment/survey/view', this.survey.id]);
    }
}

