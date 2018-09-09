import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { SelectCompetencyLevelDialog } from '../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'exam-form-content',
    templateUrl: 'exam-form-content.component.html',
})
export class ExamFormContentComponent extends BaseComponent {

    private locale: any;
    private rangeDates: Date[];
    private editor: ExamMember;
    private exam: Exam;

    @ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;
    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.editor = new ExamMember();
        this.exam = new Exam();
    }

    render(exam:Exam, editor:ExamMember) {
        this.exam = exam;
        this.editor = editor;
        if (this.exam.start && this.exam.end) {
            this.rangeDates = [this.exam.start, this.exam.end];
        }
        var lang = this.translateService.currentLang;
        this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
                this.locale = res.json();
            });;
    }

    onDateSelect($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.exam.start = this.rangeDates[0];
            this.exam.end = this.rangeDates[1];
        }
    }

    selectCompetencyLevel() {
        this.competencyLevelDialog.show();
        this.competencyLevelDialog.onSelectCompetencyLevel.first().subscribe(level => {
            this.exam.competency_level_id = level.id;
            this.exam.competency_level_name = level.name;
            this.exam.competency_id = level.competency_id;
            this.exam.competency_name = level.competency_name;
        });
    }

    selectEditor() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(user => {
            this.editor.user_id = user.id;
            this.editor.name = user.name;
        });
    }

}

