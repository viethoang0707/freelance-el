import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, SURVEY_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { SurveyFormContentComponent } from './survey-form-content.component';

@Component({
    moduleId: module.id,
    selector: 'survey-dialog',
    templateUrl: 'survey-dialog.component.html',
})
export class SurveyDialog extends BaseDialog<Survey> {

    private editor: SurveyMember;
    private survey: Survey;

    @ViewChild(SurveyFormContentComponent) formContent: SurveyFormContentComponent;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        this.editor = new SurveyMember();
    }

    ngOnInit() {
        this.onShow.subscribe(() => {
            if (this.object.IsNew) {
                this.editor = new SurveyMember();
                this.object.supervisor_id = this.ContextUser.id;
                this.object.review_state = this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
                this.formContent.render(this.object, this.editor);
            } else {
                this.object.surveyEditor(this).subscribe(member => {
                    if (!member) {
                        this.editor = new SurveyMember();
                        this.editor.role = 'editor';
                        this.editor.survey_id = this.object.id;
                    } else
                        this.editor = member;
                    this.formContent.render(this.object, this.editor);
                });
            }
        })
    }

    save() {
        this.object.save(this).subscribe(() => {
            this.editor.role = 'editor';
            this.editor.survey_id = this.survey.id;
            this.editor.save(this).subscribe(() => {
                this.onUpdateCompleteReceiver.next();
                this.hide();
            });
        });
    }
}

