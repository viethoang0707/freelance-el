import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { SelectCompetencyLevelDialog } from '../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component';
import { WindowRef } from '../../../shared/helpers/windonw.ref';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'exam-dialog',
    templateUrl: 'exam-dialog.component.html',
    styleUrls: ['exam-dialog.component.css'],
})
export class ExamDialog extends BaseDialog<Exam> {

    WINDOW_HEIGHT: any;
    private locale: any;
    private rangeDates: Date[];
    private editor: ExamMember;
    
    @ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;
    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    constructor(private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.editor =  new ExamMember();
        this.WINDOW_HEIGHT = $(window).height();
    }

    ngOnInit() {
        this.onShow.subscribe((object:Exam) => {
            if (object.IsNew)  {
                this.editor =  new ExamMember();
                object.supervisor_id = this.ContextUser.id;
                object.review_state = this.ContextUser.IsSuperAdmin ?'approved':'initial';
            } else {
                object.examEditor(this).subscribe(member=> {
                    if (!member) {
                        this.editor =  new ExamMember();
                        this.editor.role = 'editor';
                        this.editor.exam_id = object.id;
                    } else
                        this.editor =  member;
                });
            }
            if (object.start && object.end) {
                this.rangeDates = [object.start, object.end];
            }
            var lang = this.translateService.currentLang;
            this.http.get(`/assets/i18n/calendar.${lang}.json`)
                .subscribe((res: Response) => {
                    this.locale = res.json();
                });;
        });
        this.onCreateComplete.subscribe(object=> {
            this.editor.role ='editor';
            this.editor.exam_id =  object.id;
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

    selectCompetencyLevel() {
        this.competencyLevelDialog.show();
        this.competencyLevelDialog.onSelectCompetencyLevel.first().subscribe(level => {
                this.object.competency_level_id = level.id;
                this.object.competency_level_name = level.name;
                this.object.competency_id = level.competency_id;
                this.object.competency_name = level.competency_name;
        });
    }

    selectEditor() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
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
