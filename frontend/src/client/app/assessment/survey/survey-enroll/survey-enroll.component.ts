import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, SURVEY_STATUS, EXAM_MEMBER_ROLE, SURVEY_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectMultiUsersDialog } from '../../../shared/components/select-multi-user-dialog/select-multi-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

const SURVEY_MEMBER_FIELDS = ['role', 'name', 'email', 'phone', 'group_name', 'status'];

@Component({
    moduleId: module.id,
    selector: 'survey-enroll',
    templateUrl: 'survey-enroll.component.html',
})
export class SurveyEnrollComponent extends BaseComponent implements OnInit{

    SURVEY_STATUS = SURVEY_STATUS;
    SURVEY_MEMBER_ENROLL_STATUS = SURVEY_MEMBER_ENROLL_STATUS;

    private display: boolean;
    private survey: Survey;
    private members: SurveyMember[];
    private selectedMembers: any;


    @ViewChild(SelectMultiUsersDialog) usersDialog: SelectMultiUsersDialog;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.survey = new Survey();
    }

    ngOnInit() {
        this.survey = this.route.snapshot.data['survey'];
        this.selectedMembers = [];
        this.loadMembers();
    }

    close() {
        this.router.navigate(['/assessment/surveys/enrollment']);
    }

    addMember() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(users => {
            var userIds = _.pluck(users, 'id');
            this.survey.enroll(this, userIds).subscribe(() => {
                this.loadMembers();
            });
            this.success(this.translateService.instant('Add survey member successfully'));
        });
    }

    deleteMember(members: SurveyMember[]) {
        if (members && members.length)
            this.confirm(this.translateService.instant(this.translateService.instant('Are you sure to delete?')), () => {
                SurveyMember.deleteArray(this, members).subscribe(() => {
                    this.selectedMembers = [];
                    this.loadMembers();
                    this.success(this.translateService.instant('Delete survey member successfully'));
                });
            });
    }

    loadMembers() {
        this.survey.populate(this).subscribe(() => {
            this.survey.listCandidates(this, SURVEY_MEMBER_FIELDS).subscribe(members => {
                this.members = members;
            });
        });

    }
}

