import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
import { SelectMultiUsersDialog } from '../../../shared/components/select-multi-user-dialog/select-multi-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

const EXAM_MEMBER_FIELDS = ['role', 'name', 'email', 'phone', 'group_name', 'status'];

@Component({
    moduleId: module.id,
    selector: 'exam-enroll',
    templateUrl: 'exam-enroll.component.html',
})
export class ExamEnrollComponent extends BaseComponent implements OnInit {

    EXAM_MEMBER_ROLE = EXAM_MEMBER_ROLE;
    EXAM_STATUS = EXAM_STATUS;
    EXAM_MEMBER_STATUS = EXAM_MEMBER_STATUS;


    private exam: Exam;
    private candidates: ExamMember[];
    private selectedCandidates: any;
    private supervisors: ExamMember[];
    private selectedSupervisors: any;


    @ViewChild(SelectMultiUsersDialog) usersDialog: SelectMultiUsersDialog;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.exam = new Exam();
    }

    ngOnInit() {
        this.exam = this.route.snapshot.data['exam'];
        this.selectedCandidates = [];
        this.selectedSupervisors = [];
        this.loadMembers();
    }

    close() {
        this.router.navigate(['/assessment/exams/enrollment']);
    }

    addCandidate() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(users => {
            var userIds = _.pluck(users, 'id');
            this.exam.enroll(this, userIds).subscribe(() => {
                this.loadMembers();
                this.success(this.translateService.instant('Add candidate successfully'));
            });
        });
    }

    addSupervisor() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(users => {
            var userIds = _.pluck(users, 'id');
            this.exam.enrollSupervisor(this, userIds).subscribe(() => {
                this.loadMembers();
                this.success(this.translateService.instant('Add supervisor successfully'));
            });
        });
    }

    deleteMember(members: ExamMember[]) {
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            ExamMember.deleteArray(this, members).subscribe(() => {
                this.selectedCandidates = [];
                this.selectedSupervisors = [];
                this.loadMembers();
                this.success(this.translateService.instant('Delete member successfully'));
            });
        });
    }

    loadMembers() {
        this.exam.listMembers(this, EXAM_MEMBER_FIELDS).subscribe(members => {
            this.candidates = _.filter(members, (member) => {
                return member.role == 'candidate';
            });
            this.supervisors = _.filter(members, (member) => {
                return member.role == 'supervisor';
            });
        });
    }
}

