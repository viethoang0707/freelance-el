import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
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

@Component({
    moduleId: module.id,
    selector: 'exam-dialog',
    templateUrl: 'exam-dialog.component.html',
})
export class ExamDialog extends BaseDialog<Exam> {

    private locale: any;
    private examStatus: SelectItem[];
    private rangeDates: Date[];
    private allowToChangeState: boolean;
    private user: User;
    @ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;

    constructor(private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.examStatus = _.map(EXAM_STATUS, (val, key) => {
            return {
                label: this.translateService.instant(val),
                value: key
            }
        });
    }

    ngOnInit() {
        this.user = this.authService.UserProfile;
        this.onShow.subscribe(object => {
            if (object.start && object.end) {
                this.rangeDates = [object.start, object.end];
            }
            var lang = this.translateService.currentLang;
            this.http.get(`/assets/i18n/calendar.${lang}.json`)
                .subscribe((res: Response) => {
                    this.locale = res.json();
                });

            this.allowToChangeState = !object.supervisor_id ||
                this.user.IsSuperAdmin || this.user.id == object.supervisor_id;
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
        this.competencyLevelDialog.onSelectCompetencyLevel.subscribe(level => {
                this.object.competency_level_id = level.id;
                this.object.competency_level_name = level.name;
                this.object.competency_id = level.competency_id;
                this.object.competency_name = level.competency_name;
        });
    }


}


