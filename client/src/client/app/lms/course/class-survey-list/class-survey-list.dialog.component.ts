import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { ClassSurvey } from '../../../shared/models/elearning/class-survey.model';
import { SelectItem } from 'primeng/api';
import { SurveyDialog } from '../../../assessment/survey/survey-dialog/survey-dialog.component';
import { SurveyContentDialog } from '../../../cms/survey/content-dialog/survey-content.dialog.component';
import { Router } from '@angular/router';
import { ClassSurveyEnrollDialog } from '../class-survey-enroll/class-survey-enroll.dialog.component';
import { SurveyStatsDialog } from '../../survey/survey-stats/survey-stats.dialog.component';

@Component({
	moduleId: module.id,
	selector: 'class-survey-list-dialog',
	templateUrl: 'class-survey-list.dialog.component.html',
})
export class ClassSurveyListDialog extends BaseComponent {

	private display: boolean;
	private courseClass: CourseClass;
	private classSurveys: ClassSurvey[];
	private selectedClassSurvey: ClassSurvey;
	SURVEY_STATUS =  SURVEY_STATUS;
	@ViewChild(SurveyDialog) surveyDialog: SurveyDialog;
	@ViewChild(ClassSurveyEnrollDialog) enrollDialog: ClassSurveyEnrollDialog;
	@ViewChild(SurveyContentDialog) surveyContentDialog:SurveyContentDialog;
	@ViewChild(SurveyStatsDialog) statsDialog: SurveyStatsDialog;

	constructor(private router: Router) {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.classSurveys = [];
	}

	show(courseClass: CourseClass) {
		this.display = true;
		this.courseClass = courseClass;
		this.loadSurveys();
	}

	loadSurveys() {
		this.startTransaction();
		ClassSurvey.listByClass(this, this.courseClass.id).subscribe(classSurveys => {
			this.classSurveys = classSurveys;
			this.closeTransaction();
		});
	}

	hide() {
		this.display = false;
	}

	enrollSurvey() {
		if (this.selectedClassSurvey) {
			this.startTransaction();
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.enrollDialog.show(survey, this.courseClass);
				this.closeTransaction();
			});
		}
	}

	addSurvey() {
		var survey = new Survey();
		survey.supervisor_id =  this.authService.UserProfile.id;
		this.surveyDialog.show(survey);
		this.startTransaction();
		this.surveyDialog.onCreateComplete.subscribe(() => {
			var classSurvey = new ClassSurvey();
			classSurvey.survey_id = survey.id;
			classSurvey.course_id = this.courseClass.course_id;
			classSurvey.class_id = this.courseClass.id;
			classSurvey.save(this).subscribe(() => {
				this.loadSurveys();
				this.closeTransaction();
			});
		});
	}

	editSurvey() {
		if (this.selectedClassSurvey) {
			this.startTransaction();
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.surveyDialog.show(survey);
				this.closeTransaction();
			});
		}
	}

	viewReportSurvey() {
		if (this.selectedClassSurvey) {
			this.startTransaction();
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.statsDialog.show(survey);
				this.closeTransaction();
			});
		}
	}

	editContent() {
		if (this.selectedClassSurvey) {
			this.startTransaction();
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.surveyContentDialog.show(survey);
			});
		}
	}

}
