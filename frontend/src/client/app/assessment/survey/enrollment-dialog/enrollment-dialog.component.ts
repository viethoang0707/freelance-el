import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

const SURVEY_MEMBER_FIELDS = ['role', 'name', 'email', 'phone', 'group_name', 'status'];


@Component({
	moduleId: module.id,
	selector: 'survey-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class SurveyEnrollDialog extends BaseComponent {

    SURVEY_STATUS = SURVEY_STATUS;
    SURVEY_MEMBER_ENROLL_STATUS = SURVEY_MEMBER_ENROLL_STATUS;

    private display: boolean;
	private survey: Survey;
    private members: SurveyMember[];
    private selectedMembers: any;


    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	constructor() {
		super();
	}

	enroll(survey: Survey) {
		this.display = true;
		this.survey = survey;
        this.selectedMembers = [];
		this.loadMembers();
	}

	hide() {
		this.display = false;
	}



    addMember() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(users => {
            var userIds = _.pluck(users, 'id');
            this.survey.enroll(this, userIds).subscribe(() => {
                this.loadMembers();
            });
        });
    }

    deleteMember(members:SurveyMember[]) {
        if (members && members.length)
            this.confirm(this.translateService.instant(this.translateService.instant('Are you sure to delete?')), () => {
                SurveyMember.deleteArray(this, members).subscribe(() => {
                    this.selectedMembers = [];
                    this.loadMembers();
                });
            });
    }

    loadMembers() {
        this.survey.listMembers(this,SURVEY_MEMBER_FIELDS).subscribe(members => {
            this.members = members;
        });
    }
}

