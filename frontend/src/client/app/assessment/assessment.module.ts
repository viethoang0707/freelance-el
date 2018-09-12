import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CMSModule } from '../cms/cms.module';
import { AssessmentComponent } from './assessment.component'
import { ExamEnrollComponent } from './exam/exam-enroll/exam-enroll.component';
import { ExamEnrollmentListComponent } from './exam/exam-enrollment-list/exam-enrollment-list.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { SurveyFormComponent } from './survey/survey-form/survey-form.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import { SurveyEnrollComponent } from './survey/survey-enroll/survey-enroll.component';
import { SurveyEnrollmentListComponent } from './survey/survey-enrollment-list/survey-enrollment-list.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionImportComponent } from './question/question-import/question-import.component';
import { QuestionSheetListComponent } from './exam/question-sheet-list/question-sheet-list.component';
import { SurveySheetListComponent } from './survey/survey-sheet-list/survey-sheet-list.component';
import { ExamResolve, SurveyResolve, QuestionResolve, GroupsResolve } from './route.resolver';
import { ExamFormComponent } from './exam/exam-form/exam-form.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { ExamFormContentComponent } from './exam/exam-form/exam-form-content.component';
import { ExamDialog} from './exam/exam-form/exam-dialog.component';
import { SurveyFormContentComponent } from './survey/survey-form/survey-form-content.component';
import { SurveyDialog } from './survey/survey-form/survey-dialog.component';
import { QuestionFormComponent } from './question/question-form/question-form.component';
import { QuestionViewComponent } from './question/question-view/question-view.component';


@NgModule({
	imports: [
		CMSModule,
		ErpSharedModule,
		AuthModule],
	declarations: [
		AssessmentComponent,
		ExamFormComponent,
		ExamViewComponent,
		QuestionSheetListComponent,
		QuestionListComponent,
		QuestionFormComponent,
		QuestionImportComponent,
		QuestionViewComponent,
		SurveySheetListComponent,
		SurveyFormComponent, 
		ExamEnrollComponent,
		ExamEnrollmentListComponent,
		ExamListComponent,
		SurveyViewComponent,
		SurveyEnrollComponent,
		SurveyEnrollmentListComponent,
		SurveyListComponent,
		ExamFormContentComponent,
		ExamDialog,
		SurveyFormContentComponent,
		SurveyDialog
		],
	providers: [
		ExamResolve,
		SurveyResolve,
		QuestionResolve,
		GroupsResolve,
	],
	exports: [
		ExamDialog,
		SurveyDialog
		]
})
export class AssessmentModule {
}
