import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CMSComponent } from './cms.component';
import { ExamEditorDialog } from './exam/exam-editor/exam-editor.dialog.component';
import { ExamEditor } from './exam/exam-editor/exam-editor.component';
import { ExamEditorFormCoponent } from './exam/exam-editor/exam-editor-form.component';
import { CourseSyllabusComponent } from './course/course-syllabus/course-syllabus.component';
import { SumPipe } from './exam/sum.pipe';
import { CourseUnitContainerDirective } from './course/course-unit-template/unit-container.directive';
import { FolderCourseUnitComponent } from './course/course-unit-template/folder/folder-unit.component';
import { ExerciseCourseUnitComponent } from './course/course-unit-template/exercise/exercise-unit.component';
import { SCORMLectureCourseUnitComponent } from './course/course-unit-template/scorm/scorm-lecture-unit.component';
import { SlideLectureCourseUnitComponent } from './course/course-unit-template/slide/slide-lecture-unit.component';
import { SelfAssessmentCourseUnitComponent } from './course/course-unit-template/assessment/self-assessment-unit.component';
import { VideoLectureCourseUnitComponent } from './course/course-unit-template/video/video-lecture-unit.component';
import { HtmlLectureCourseUnitComponent } from './course/course-unit-template/lecture/html-lecture-unit.component';
import { CourseUnitDialog } from './course/course-unit-dialog/course-unit-dialog.component';
import { CourseUnitPreviewDialog } from './course/course-unit-preview-dialog/course-unit-preview-dialog.component';
import { CourseSettingDialog } from './course/course-setting/course-setting.dialog.component';
import { QuestionSheetEditorDialog } from './exam/question-sheet-editor/question-sheet-editor.dialog.component';
import { QuestionSheetSaveDialog } from './exam/question-sheet-save/question-sheet-save.dialog.component';
import { SurveyEditorDialog } from './survey/survey-editor/survey-editor.dialog.component';
import { SurveyEditor } from './survey/survey-editor/survey-editor.component';
import { SurveyEditorFormComponent } from './survey/survey-editor/survey-editor-form.component';
import { SurveySheetSaveDialog } from './survey/survey-sheet-save/survey-sheet-save.dialog.component';
import { ValidateGradePipe } from './exam/exam-setting/grade.pipe';
import { ExamSettingDialog } from './exam/exam-setting/exam-setting.dialog.component';
import { CoursePublishComponent } from './course/course-publish/course-publish.component';
import { CourseBackupComponent } from './course/course-backup/course-backup.component';
import { CourseRestoreComponent } from './course/course-restore/course-restore.component';
import { QuestionSheetPreviewDialog } from './exam/question-sheet-preview/question-sheet-preview.dialog.component';
import { SurveySheetPreviewDialog } from './survey/survey-sheet-preview/survey-sheet-preview.dialog.component';
import { QuestionContainerDirective } from './question/question-container.directive';
import { SingleChoiceQuestionComponent } from './question/single-choice-question/single-choice-question.component';
import { OpenEndQuestionComponent } from './question/open-end-question/open-end-question.component';
import { MultiChoiceQuestionComponent } from './question/multi-choice-question/multi-choice-question.component';
import { CourseResolve, CourseSyllabusResolve, ExamResolve, QuestionSheetResolve, SurveyResolve, SurveySheetResolve } from './route.resolver';


@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule,
	],
	declarations: [
		CMSComponent,
		SumPipe,
		ExamEditorDialog,
		ExamEditor, 
		ExamEditorFormCoponent,
		CourseUnitPreviewDialog,
		CourseSyllabusComponent,
		CourseUnitContainerDirective,
		FolderCourseUnitComponent,
		CourseSettingDialog,
		SlideLectureCourseUnitComponent,
		QuestionSheetEditorDialog,
		QuestionSheetSaveDialog,
		SurveySheetSaveDialog,
		ExerciseCourseUnitComponent,
		SCORMLectureCourseUnitComponent,
		VideoLectureCourseUnitComponent,
		HtmlLectureCourseUnitComponent,
		SelfAssessmentCourseUnitComponent,
		CourseUnitDialog,
		SurveyEditorDialog,
		SurveyEditor,
		SurveyEditorFormComponent,
		ValidateGradePipe,
		ExamSettingDialog,
		CoursePublishComponent,
		CourseBackupComponent,
		CourseRestoreComponent,
		QuestionSheetPreviewDialog,
		SurveySheetPreviewDialog,
		QuestionContainerDirective,
		MultiChoiceQuestionComponent,
		SingleChoiceQuestionComponent,
		OpenEndQuestionComponent,
	],
	exports: [
		ExamEditorDialog,
		CourseUnitPreviewDialog,
		CourseUnitContainerDirective,
		SurveyEditorDialog,
		QuestionSheetPreviewDialog,
		SurveySheetPreviewDialog,
		QuestionContainerDirective
	],
	providers: [
		CourseResolve,
		CourseSyllabusResolve,
		ExamResolve,
		QuestionSheetResolve,
		SurveyResolve,
		SurveySheetResolve
	],
	entryComponents: [
		FolderCourseUnitComponent,
		ExerciseCourseUnitComponent,
		SCORMLectureCourseUnitComponent,
		SlideLectureCourseUnitComponent,
		VideoLectureCourseUnitComponent,
		HtmlLectureCourseUnitComponent,
		MultiChoiceQuestionComponent,
		SingleChoiceQuestionComponent,
		SelfAssessmentCourseUnitComponent,
		OpenEndQuestionComponent,
	]
})
export class CMSModule {
}
