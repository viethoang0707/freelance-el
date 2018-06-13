import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
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
	private courseClass: CourseClass;
	private survey: Survey;
	private members: CourseMember[];
	private selectedMember: CourseMember;

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

		BaseModel
			.bulk_search(this, CourseMember.__api__listByClass(this.courseClass.id), SurveyMember.__api__listBySurvey(this.survey.id))
			.subscribe(jsonArr => {
				this.members = CourseMember.toArray(jsonArr[0]);
				var surveyMembers = SurveyMember.toArray(jsonArr[1]);
				_.each(this.members, (member: CourseMember) => {
					var surveyMember = _.find(surveyMembers, (obj: SurveyMember) => {
						return obj.user_id == member.user_id;
					});
					if (surveyMember) 
						member["surveyMember"] = surveyMember;
				})
			});
	}

	hide() {
		this.display = false;
	}

	registerAll() {
		var surveyMembers = _.map(this.members, member=> {
			var surveyMember = this.createSurveyMember(member);
			return surveyMember;
		})
		SurveyMember.createArray(this, surveyMembers).subscribe(()=> {
			this.info('Register all successfully');
		});
	}


	unregisterAll() {
		var surveyMembers = [];
		_.each(this.members, (member)=> {
			if (member["surveyMember"]) 
				surveyMembers.push(member["surveyMember"])
		});
		SurveyMember.deleteArray(this, surveyMembers).subscribe(()=> {
			this.info('Unregister all successfully');
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
