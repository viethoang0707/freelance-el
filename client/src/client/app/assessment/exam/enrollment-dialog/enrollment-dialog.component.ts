import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
	moduleId: module.id,
	selector: 'exam-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class ExamEnrollDialog extends BaseComponent {

    EXAM_MEMBER_ROLE = EXAM_MEMBER_ROLE;
    EXAM_STATUS = EXAM_STATUS;
    EXAM_MEMBER_STATUS = EXAM_MEMBER_STATUS;


    private display: boolean;
	private exam: Exam;
    private candidates: ExamMember[];
    private selectedCandidates: any;
    private supervisors: ExamMember[];
    private selectedSupervisors: any;


    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	constructor() {
		super();
	}

	enroll(exam: Exam) {
		this.display = true;
		this.exam = exam;
        this.selectedCandidates = [];
        this.selectedSupervisors = [];
		this.loadMembers();
	}

	hide() {
		this.display = false;
	}

    addCandidate() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
            var userIds = _.pluck(users, 'id');
            this.exam.enroll(this, userIds).subscribe(() => {
                this.loadMembers();
            })
        });
    }

    addSupervisor() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
            var members = _.map(users, (user: User) => {
                var member = new ExamMember();
                member.role = 'supervisor';
                member.exam_id = this.exam.id;
                member.user_id = user.id;
                member.date_register = new Date();
                member.status = 'active';
                return member;
            });
            ExamMember.createArray(this, members).subscribe(() => {
                this.loadMembers();
            });
        });
    }

    deleteMember(members) {
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                ExamMember.deleteArray(this, members).subscribe(() => {
                    this.selectedCandidates = [];
                    this.selectedSupervisors = [];
                    this.loadMembers();
                });
            });
    }

    loadMembers() {
        ExamMember.listByExam(this, this.exam.id).subscribe(members => {
            this.candidates = _.filter(members, (member) => {
                return member.role == 'candidate';
            });
            this.supervisors = _.filter(members, (member) => {
                return member.role == 'supervisor';
            });
        });
    }
}

