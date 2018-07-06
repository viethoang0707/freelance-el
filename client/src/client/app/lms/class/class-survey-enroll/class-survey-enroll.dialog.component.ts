import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'class-survey-enroll-dialog',
	templateUrl: 'class-survey-enroll.dialog.component.html',
})
export class ClassSurveyEnrollDialog extends BaseComponent {

	SURVEY_MEMBER_ENROLL_STATUS = SURVEY_MEMBER_ENROLL_STATUS;

	private display: boolean;
	private survey: Survey;
	private selectedMember: SurveyMember;
	private surveyMembers: SurveyMember[];
	private courseMembers: CourseMember[];

	constructor() {
		super();
		this.display = false;
		this.surveyMembers = [];
		this.courseMembers = [];
		this.survey = new Survey();
	}

	show(survey: Survey) {
		this.display = true;
		this.surveyMembers = [];
		this.courseMembers = [];
		this.survey = survey;
		BaseModel
			.bulk_search(this, CourseMember.__api__listByClass(survey.course_class_id), SurveyMember.__api__listBySurvey(survey.id))
			.subscribe(jsonArr => {
				var courseMembers = CourseMember.toArray(jsonArr[0]);
				this.courseMembers = _.filter(courseMembers, (member: CourseMember) => {
					return member.role == 'student';
				});
				var surveyMembers = SurveyMember.toArray(jsonArr[1]);
				this.surveyMembers = _.filter(surveyMembers, (member: SurveyMember) => {
					return member.role == 'candidate';
				});
			});
	}

	hide() {
		this.display = false;
	}

	enrollAll() {
		var userIds = _.pluck(this.courseMembers, 'user_id');
		this.survey.enroll(this, userIds).subscribe(() => {
			this.info('Register all successfully');
		});
	}

	closeSurvey() {
		this.confirm('Are you sure to proceed ?  You will not be able to enroll new members after the survey is closed', () => {
			this.survey.close(this).subscribe(() => {
				this.survey.status = 'closed';
				this.success('Survey close');
			});
		});
	}

	openSurvey() {
		this.confirm('Are you sure to proceed ?.', () => {
			this.survey.open(this).subscribe(() => {
				this.survey.status = 'open';
				this.success('Survey open');
				SurveyMember.listBySurvey(this, this.survey.id).subscribe(members=> {
					this.surveyMembers = members;
				})
			});
		});
	}
}
