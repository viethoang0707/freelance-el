import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Exam } from '../../../shared/models/exam.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE } from '../../../shared/models/constants'

import * as _ from 'underscore';


@Component({
    moduleId: module.id,
    selector: 'etraining-exam-dialog',
    templateUrl: 'exam-dialog.component.html',
})
export class ExamDialog extends BaseDialog<Exam> {

    rangeDates: Date[];
    locale:any;

    constructor(private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
    }

    ngOnInit() {
        this.onShow.subscribe(object => {
            if (object.start && object.end) {
                this.rangeDates = [new Date(object.start), new Date(object.end)];
            }
            var lang = this.translateService.currentLang;
            this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
                this.locale = res.json();
            });
        });
    }

    onDateSelect($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    }

}


