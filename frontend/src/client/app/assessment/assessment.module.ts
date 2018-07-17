import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
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
import { QuestionContainerDirective } from './question/question-template/question-container.directive';
import { SingleChoiceQuestionComponent } from './question/question-template/single-choice-question/single-choice-question.component';
import { OpenEndQuestionComponent } from './question/question-template/open-end-question/open-end-question.component';
import { QuestionImportDialog } from './question/import-dialog/import-dialog.component';
import { MultiChoiceQuestionComponent } from './question/question-template/multi-choice-question/multi-choice-question.component';
import { QuestionSheetListComponent } from './question/question-sheet-list/question-sheet-list.component';
import { QuestionSheetPreviewDialog } from './question/question-sheet-preview/question-sheet-preview.dialog.component';
import { SurveySheetListComponent } from './question/survey-sheet-list/survey-sheet-list.component';
import { SurveySheetPreviewDialog } from './question/survey-sheet-preview/survey-sheet-preview.dialog.component';
import { AssessmentRoutingModule } from './assessment-routing';

@NgModule({
	imports: [
		AssessmentRoutingModule,
		ErpSharedModule,
		AuthModule],
	declarations: [
		AssessmentComponent,
		ExamDialog,
		QuestionSheetListComponent,
		QuestionSheetPreviewDialog,
		QuestionListComponent,
		QuestionDialog,
		QuestionContainerDirective,
		MultiChoiceQuestionComponent,
		SingleChoiceQuestionComponent,
		OpenEndQuestionComponent,
		QuestionImportDialog,
		SurveySheetListComponent,
		SurveySheetPreviewDialog,
		SurveyDialog, ExamEnrollDialog,
		ExamEnrollmentListComponent,
		ExamListComponent,
		SurveyEnrollDialog,
		SurveyEnrollmentListComponent,
		SurveyListComponent
		],
	providers: [],
	exports: [
		QuestionContainerDirective,
		ExamDialog,
		QuestionSheetPreviewDialog,
		SurveySheetPreviewDialog,
		SurveyDialog],
	entryComponents: [
		SingleChoiceQuestionComponent,
		OpenEndQuestionComponent,
		MultiChoiceQuestionComponent
		]
})
export class AssessmentModule {
}
