import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Exam } from '../../../shared/models/exam.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import * as _ from 'underscore';
import { ExamMemberDialog } from '../member-dialog/member-dialog.component';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TabPanel } from 'primeng/tabview';

@Component({
    moduleId: module.id,
    selector: 'etraining-exam-dialog',
    templateUrl: 'exam-dialog.component.html',
})
export class ExamDialog extends BaseDialog<Exam> {

    rangeDates: Date[];
    locale:any;
    processing: any;
    items: MenuItem[];
    examStatus: SelectItem[];
    members: ExamMember[];
    selectedMember: ExamMember;
    EXAM_MEMBER_ROLE = EXAM_MEMBER_ROLE;
    EXAM_STATUS =  EXAM_STATUS;
    EXAM_MEMBER_STATUS = EXAM_MEMBER_STATUS;

    @ViewChild(ExamMemberDialog) memberDialog: ExamMemberDialog;
    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    constructor(private http: Http) {
        super();
        this.locale = DEFAULT_DATE_LOCALE;
        this.examStatus = _.map(EXAM_STATUS, function(val, key) {
            return {
                label: val,
                value: key
            }
        });
         this.processing = false;
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
            this.loadMembers();
        });
        this.items = [
            {label: this.translateService.instant('Candidate'), command: ()=> { this.add('candidate')}},
            {label: this.translateService.instant('Supervisor'), command: ()=> { this.add('supervisor')}}
        ];
    }

    onDateSelect($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    }

    add(role:string) {
        var self = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
            this.processing = true;
            var subscriptions = [];
            _.each(users, function(user) {
                var member = new ExamMember();
                member.role = role;
                member.exam_id = self.object.id;
                member.user_id = user.id;
                member.date_register =  new Date();
                member.status = 'active';
                subscriptions.push(member.save(self));
            });
            Observable.forkJoin(...subscriptions).subscribe(()=> {
                this.processing = false;
                this.loadMembers();
            });
        });
    }

    edit() {
        if (this.selectedMember)
            this.memberDialog.show(this.selectedMember);
    }

    delete() {
        if (this.selectedMember)
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to delete ?'),
            accept: () => {
                this.selectedMember.data.delete(this).subscribe(()=> {
                    this.loadMembers();
                })
            }
        });
    }

    loadMembers() {
        if (this.object.id)
            ExamMember.listByExam(this, this.object.id).subscribe(members => {
                    this.members = members;
            });
        else
            this.members = [];
    }


}


