import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'class-survey-enroll-dialog',
    templateUrl: 'class-survey-enroll.dialog.component.html',
})
export class ClassSurveyEnrollDialog extends BaseComponent {

	private display: boolean;
	private courseClass: CourseClass;
	private survey: Survey;
	private members: SurveyMember[];
	private selectedMember: SurveyMember;

	constructor() {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.members  = [];
	}

	show(survey: Survey, clazz: CourseClass) {
		this.display = true;
		this.courseClass =  clazz;
		this.survey = survey;
		this.startTransaction();
		CourseMember.listByClass(this, clazz.id).subscribe(members => {
			this.members = members;
			SurveyMember.listBySurvey(this, this.survey.id).subscribe(surveyMembers=> {
				_.each(surveyMembers, (member)=> {
					var surveyMember = _.find(surveyMembers, surveyMember=> {
						return member.user_id == surveyMember.user_id;
					});
					if (surveyMember) 
						member["surveyMember"] = surveyMember;
				});
			});
			this.closeTransaction();
		});
	}

	hide() {
		this.display = false;
	}

	registerAll() {
		var subscriptions = _.map(this.members, member=> {
			var member = this.createSurveyMember(member);
			return member.save(this);
		})
		this.startTransaction();
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.info('Register all successfully');
			this.closeTransaction();
		});
	}


	unregisterAll() {
		var subscriptions = _.map(this.members, (member)=> {
			if (member["surveyMember"]) {
				var examMember = member["surveyMember"];
				return examMember.delete(this);
			} else {
				return Observable.of(true);
			}
		});
		this.startTransaction();
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.info( 'Unregister all successfully');
			this.closeTransaction();
		});
	}


	createSurveyMember(member) {
		var surveyMember = new SurveyMember();
        surveyMember.survey_id = this.survey.id;
        surveyMember.user_id = member.user_id;
        surveyMember.date_register =  new Date();
        return surveyMember;
	}
}
