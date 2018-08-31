import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';

import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, SURVEY_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'survey-dialog',
    templateUrl: 'survey-dialog.component.html',
    styleUrls: ['survey-dialog.component.css'],
})
export class SurveyDialog extends BaseDialog<Survey> {

    private locale:any;
    private rangeDates: Date[]; 
    private allowToChangeState: boolean;
    private editor: SurveyMember;

    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    constructor(private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.editor =  new SurveyMember();
    }

    ngOnInit() {
        this.onShow.subscribe((object:Survey) => {
            if (object.IsNew)  {
                this.editor =  new SurveyMember();
                object.supervisor_id = this.ContextUser.id;
                object.review_state = this.ContextUser.IsSuperAdmin ?'approved':'initial';
            } else {
                object.surveyEditor(this).subscribe(member=> {
                    if (!member) {
                        this.editor =  new SurveyMember();
                        this.editor.role = 'editor';
                        this.editor.survey_id = object.id;
                    } else
                        this.editor =  member;
                });
            }

            if (object.start && object.end) {
                this.rangeDates = [object.start,object.end];
            }
            var lang = this.translateService.currentLang;
            this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
                this.locale = res.json();
            });

        });  

        this.onCreateComplete.first().subscribe(object=> {
            this.editor.role ='editor';
            this.editor.survey_id =  object.id;
            this.editor.save(this).subscribe();
        });
        this.onUpdateComplete.subscribe(object => {
            this.editor.save(this).subscribe();
        });
    }

    onDateSelect($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    }

    selectEditor() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(users => {
            if (users.length > 1) {
                this.error(this.translateService.instant('You can select only one editor.'));
                return;
            } else if (users.length == 1) {
                var user = users[0];
                this.editor.user_id = user.id;
                this.editor.name = user.name;
            }
        });
    }

}


