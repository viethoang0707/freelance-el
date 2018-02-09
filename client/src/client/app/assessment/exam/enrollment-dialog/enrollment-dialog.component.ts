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

@Component({
	moduleId: module.id,
	selector: 'etraining-exam-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class ExamEnrollDialog extends BaseDialog<Course> {

	display: boolean;
	processing: boolean;
	exam: Exam;
    items: MenuItem[];
    members: ExamMember[];
    selectedMember: ExamMember;
    EXAM_MEMBER_ROLE = EXAM_MEMBER_ROLE;
    EXAM_STATUS =  EXAM_STATUS;
    EXAM_MEMBER_STATUS = EXAM_MEMBER_STATUS;

    @ViewChild(ExamMemberDialog) memberDialog: ExamMemberDialog;
    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	
	constructor() {
		super();
		this.items = [
            {label: this.translateService.instant('Candidate'), command: ()=> { this.add('candidate')}},
            {label: this.translateService.instant('Supervisor'), command: ()=> { this.add('supervisor')}}
        ];
	}

	enroll(exam:Exam) {
		this.display = true;
		this.processing = false;
		this.exam = exam;
		this.loadMembers();
	}

	hide() {
		this.display = false;
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
                member.exam_id = self.exam.id;
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
                this.selectedMember.delete(this).subscribe(()=> {
                    this.loadMembers();
                })
            }
        });
    }

    loadMembers() {
        ExamMember.listByExam(this, this.exam.id).subscribe(members => {
                this.members = members;
        });
    }
}

