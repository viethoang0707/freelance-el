import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

const COURSE_MEMBER_FIELDS = ['group_name', 'name', 'email', 'phone', 'user_id'];
const SURVEY_MEMBER_FIELDS = ['course_member_id'];

@Component({
	moduleId: module.id,
	selector: 'class-survey-enroll',
	templateUrl: 'class-survey-enroll.component.html',
})
export class ClassSurveyEnrollComponent extends BaseComponent {

	SURVEY_MEMBER_ENROLL_STATUS = SURVEY_MEMBER_ENROLL_STATUS;

	private survey: Survey;
	private selectedMember: any;
	private surveyMembers: SurveyMember[];
	private courseMembers: CourseMember[];

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.surveyMembers = [];
		this.courseMembers = [];
		this.survey = new Survey();
	}

	ngOnInit() {
		this.survey = this.route.snapshot.data['survey'];
		this.loadMembers();
	}

	loadMembers() {
		this.selectedMember = [];
		BaseModel
			.bulk_search(this,
				CourseClass.__api__listMembers(this.survey.course_class_id, COURSE_MEMBER_FIELDS),
				Survey.__api__listMembers(this.survey.id,SURVEY_MEMBER_FIELDS))
			.subscribe(jsonArr => {
				this.courseMembers = _.filter(CourseMember.toArray(jsonArr[0]), (member: CourseMember) => {
					return member.role == 'student';
				});
				this.surveyMembers = _.filter(SurveyMember.toArray(jsonArr[1]), (member: SurveyMember) => {
					return member.role == 'candidate';
				});
				_.each(this.courseMembers, (courseMember:CourseMember)=> {
					courseMember["surveyMember"] = _.find(this.surveyMembers, (surveyMember:SurveyMember)=> {
						return courseMember.id == surveyMember.course_member_id;
					});
				});
			});
	}

	enrollAll() {
		var newMembers = _.each(this.courseMembers, (courseMember:CourseMember)=> {
			return courseMember["surveyMember"] ==  null;
		});
		var userIds = _.pluck(newMembers, 'user_id');
		this.survey.enroll(this, userIds).subscribe(() => {
				this.loadMembers();
				this.success(this.translateService.instant('Register all successfully'));
		});
	}


	close() {
		this.router.navigate(['/lms/class/manage', this.survey.course_class_id]);
	}

	closeSurvey() {
		this.confirm(this.translateService.instant('Are you sure to proceed ?  You will not be able to enroll new members after the survey is closed'), () => {
			this.survey.close(this).subscribe(() => {
				this.success(this.translateService.instant('Survey close'));
			});
		});
	}

	openSurvey() {
		this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
			this.survey.open(this).subscribe(() => {
				this.success(this.translateService.instant('Survey open'));
			});
		});
	}
}
