import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CMSComponent } from './cms.component';
import { ExamContentDialog } from './exam/content-dialog/exam-content.dialog.component';
import { ProjectContentDialog } from './project/content-dialog/project-content.dialog.component';
import { CourseSyllabusDialog } from './course/course-syllabus/course-syllabus.dialog.component';
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
import { SurveyContentDialog } from './survey/content-dialog/survey-content.dialog.component';
import { SurveySheetSaveDialog } from './survey/survey-sheet-save/survey-sheet-save.dialog.component';
import { ValidateGradePipe } from './exam/exam-setting/grade.pipe';
import { ExamSettingDialog } from './exam/exam-setting/exam-setting.dialog.component';
import { CoursePublishDialog } from './course/course-publish/course-publish.dialog.component';
import { CourseBackupDialog } from './course/course-backup/course-backup.dialog.component';
import { CourseRestoreDialog } from './course/course-restore/course-restore.dialog.component';
import { QuestionSheetPreviewDialog } from './exam/question-sheet-preview/question-sheet-preview.dialog.component';
import { SurveySheetPreviewDialog } from './survey/survey-sheet-preview/survey-sheet-preview.dialog.component';
import { QuestionContainerDirective } from './question/question-container.directive';
import { SingleChoiceQuestionComponent } from './question/single-choice-question/single-choice-question.component';
import { OpenEndQuestionComponent } from './question/open-end-question/open-end-question.component';
import { MultiChoiceQuestionComponent } from './question/multi-choice-question/multi-choice-question.component';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule,
	],
	declarations: [
		CMSComponent,
		SumPipe,
		ExamContentDialog,
		CourseUnitPreviewDialog,
		ProjectContentDialog,
		CourseSyllabusDialog,
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
		SurveyContentDialog,
		ValidateGradePipe,
		ExamSettingDialog,
		CoursePublishDialog,
		CourseBackupDialog,
		CourseRestoreDialog,
		QuestionSheetPreviewDialog,
		SurveySheetPreviewDialog,
		QuestionContainerDirective,
		MultiChoiceQuestionComponent,
		SingleChoiceQuestionComponent,
		OpenEndQuestionComponent,
	],
	exports: [
		ExamContentDialog,
		CourseSyllabusDialog,
		CourseUnitPreviewDialog,
		CourseUnitContainerDirective,
		ProjectContentDialog,
		SurveyContentDialog,
		CoursePublishDialog,
		CourseBackupDialog,
		CourseRestoreDialog,
		QuestionSheetPreviewDialog,
		SurveySheetPreviewDialog,
		QuestionContainerDirective
	],
	providers: [],
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
