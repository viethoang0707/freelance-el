import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CMSModule } from '../cms/cms.module';
import { AssessmentComponent } from './assessment.component'
import { ExamDialog } from './exam/exam-dialog/exam-dialog.component';
import { ExamEnrollDialog } from './exam/enrollment-dialog/enrollment-dialog.component';
import { ExamEnrollmentListComponent } from './exam/exam-enrollment-list/exam-enrollment-list.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { SurveyDialog } from './survey/survey-dialog/survey-dialog.component';
import { SurveyEnrollDialog } from './survey/enrollment-dialog/enrollment-dialog.component';
import { SurveyEnrollmentListComponent } from './survey/survey-enrollment-list/survey-enrollment-list.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionDialog } from './question/question-dialog/question-dialog.component';
import { QuestionImportDialog } from './question/import-dialog/import-dialog.component';
import { QuestionSheetListComponent } from './question/question-sheet-list/question-sheet-list.component';
import { SurveySheetListComponent } from './question/survey-sheet-list/survey-sheet-list.component';
import { AssessmentRoutingModule } from './assessment-routing';

@NgModule({
	imports: [
		AssessmentRoutingModule,
		CMSModule,
		ErpSharedModule,
		AuthModule],
	declarations: [
		AssessmentComponent,
		ExamDialog,
		QuestionSheetListComponent,
		QuestionListComponent,
		QuestionDialog,
		QuestionImportDialog,
		SurveySheetListComponent,
		SurveyDialog, ExamEnrollDialog,
		ExamEnrollmentListComponent,
		ExamListComponent,
		SurveyEnrollDialog,
		SurveyEnrollmentListComponent,
		SurveyListComponent
		],
	providers: [],
	exports: [
		ExamDialog,
		SurveyDialog]
})
export class AssessmentModule {
}
