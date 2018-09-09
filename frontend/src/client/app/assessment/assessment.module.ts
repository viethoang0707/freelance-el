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
import { QuestionDialog } from './question/question-dialog/question-dialog.component';
import { QuestionImportDialog } from './question/import-dialog/import-dialog.component';
import { QuestionSheetListComponent } from './exam/question-sheet-list/question-sheet-list.component';
import { SurveySheetListComponent } from './survey/survey-sheet-list/survey-sheet-list.component';
import { ExamResolve, SurveyResolve } from './route.resolver';
import { ExamFormComponent } from './exam/exam-form/exam-form.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { ExamFormContentComponent } from './exam/exam-form/exam-form-content.component';
import { ExamDialogComponent } from './exam/exam-form/exam-dialog.component';
import { SurveyFormContentComponent } from './survey/survey-form/survey-form-content.component';
import { SurveyDialogComponent } from './survey/survey-form/survey-dialog.component';


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
		QuestionDialog,
		QuestionImportDialog,
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
		ExamDialogComponent,
		SurveyFormContentComponent,
		SurveyDialogComponent
		],
	providers: [
		ExamResolve,
		SurveyResolve,
		ExamDialogComponent,
		SurveyDialogComponent
	],
	exports: [
		]
})
export class AssessmentModule {
}
