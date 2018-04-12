import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
	moduleId: module.id,
	selector: 'exam-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class ExamEnrollDialog extends BaseDialog<Course> {

	display: boolean;
	processing: boolean;
	exam: Exam;
    candidates: ExamMember[];
    selectedCandidate: ExamMember;
    supervisors: ExamMember[];
    selectedSupervisor: ExamMember;
    EXAM_MEMBER_ROLE = EXAM_MEMBER_ROLE;
    EXAM_STATUS =  EXAM_STATUS;
    EXAM_MEMBER_STATUS = EXAM_MEMBER_STATUS;
    public subscription : Subscription;

    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	
	constructor() {
		super();
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
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
            this.processing = true;
            var subscriptions = [];
            _.each(users, (user:User)=> {
                var member = new ExamMember();
                member.role = role;
                member.exam_id = this.exam.id;
                member.user_id = user.id;
                member.date_register =  new Date();
                member.status = 'active';
                subscriptions.push(member.save(this));
            });
            Observable.forkJoin(...subscriptions).subscribe(()=> {
                this.processing = false;
                this.loadMembers();
            });
        });
    }

    delete(member:ExamMember) {
        if (member)
            this.confirmationService.confirm({
                message: this.translateService.instant('Are you sure to delete ?'),
                accept: () => {
                    this.subscription = member.delete(this).subscribe(()=> {
                        this.selectedCandidate = null;
                        this.selectedSupervisor = null;
                        this.subscription.unsubscribe();
                        this.loadMembers();
                    })
                }
            });
    }

    loadMembers() {
        ExamMember.listByExam(this, this.exam.id).subscribe(members => {
             this.candidates = _.filter(members, (member)=> {
                 return member.role =='candidate';
             });
             this.supervisors = _.filter(members, (member)=> {
                 return member.role =='supervisor';
             });
        });
    }
}

