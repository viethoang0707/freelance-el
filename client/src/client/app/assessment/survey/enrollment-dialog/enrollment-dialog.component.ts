import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, SURVEY_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
	moduleId: module.id,
	selector: 'survey-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class SurveyEnrollDialog extends BaseComponent {

    private display: boolean;
	private survey: Survey;
    private members: SurveyMember[];
    private selectedMembers: any;
    SURVEY_STATUS =  SURVEY_STATUS;

    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	
	constructor() {
		super();
	}

	enroll(survey:Survey) {
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
        this.usersDialog.onSelectUsers.subscribe(users => {
            this.startTransaction();
            var subscriptions = [];
            _.each(users, (user:User)=> {
                var member = new SurveyMember();
                member.survey_id = this.survey.id;
                member.user_id = user.id;
                member.date_register =  new Date();
                subscriptions.push(member.save(this));
            });
            Observable.forkJoin(...subscriptions).subscribe(()=> {
                this.loadMembers();
                this.closeTransaction();
            });
        });
    }

    deleteMember(members) {
        if (members && members.length)
            this.confirm('Are you sure to delete ?', () => {
                var subscriptions = _.map(members,(member:SurveyMember) => {
                    return member.delete(this);
                });
                this.startTransaction();
                Observable.forkJoin(...subscriptions).subscribe(()=> {
                    this.selectedMembers = [];
                    this.loadMembers();
                    this.closeTransaction();
                });
            });
    }

    loadMembers() {
        this.startTransaction();
        SurveyMember.listBySurvey(this, this.survey.id).subscribe(members => {
             this.members = members;
             this.closeTransaction();
        });
    }
}

