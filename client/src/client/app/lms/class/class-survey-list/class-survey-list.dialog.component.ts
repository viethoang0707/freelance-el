import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, SURVEY_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SelectItem } from 'primeng/api';
import { SurveyDialog } from '../../../assessment/survey/survey-dialog/survey-dialog.component';
import { SurveyContentDialog } from '../../../cms/survey/content-dialog/survey-content.dialog.component';
import { ClassSurveyEnrollDialog } from '../class-survey-enroll/class-survey-enroll.dialog.component';
import { SurveyStatsDialog } from '../../survey/survey-stats/survey-stats.dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'class-survey-list-dialog',
	templateUrl: 'class-survey-list.dialog.component.html',
})
export class ClassSurveyListDialog extends BaseComponent {

	SURVEY_STATUS =  SURVEY_STATUS;

	private display: boolean;
	private courseClass: CourseClass;
	private classSurveys: Survey[];
	private selectedClassSurvey: any;
	
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
		Survey.listByClass(this, this.courseClass.id).subscribe(classSurveys => {
			this.classSurveys = classSurveys;
		});
	}

	hide() {
		this.display = false;
	}

	enrollSurvey() {
		if (this.selectedClassSurvey) {
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.enrollDialog.show(survey, this.courseClass);
			});
		}
	}

	addSurvey() {
		var survey = new Survey();
		survey.is_public =  false;
		survey.supervisor_id =  this.ContextUser.id;
		survey.course_class_id = this.courseClass.id;
		this.surveyDialog.show(survey);
		this.surveyDialog.onCreateComplete.subscribe(() => {
				this.loadSurveys();
		});
	}

	editSurvey() {
		if (this.selectedClassSurvey) {
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.surveyDialog.show(survey);
			});
		}
	}

	viewReportSurvey() {
		if (this.selectedClassSurvey) {
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.statsDialog.show(survey);
			});
		}
	}

	editContent() {
		if (this.selectedClassSurvey) {
			Survey.get(this, this.selectedClassSurvey.survey_id).subscribe(survey => {
				this.surveyContentDialog.show(survey);
			});
		}
	}

}
