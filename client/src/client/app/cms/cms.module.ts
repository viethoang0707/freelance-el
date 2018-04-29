import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CMSComponent } from './cms.component';
import { ExamContentDialog } from './exam/content-dialog/exam-content.dialog.component';
import { CourseSyllabusDialog } from './course/course-syllabus/course-syllabus.dialog.component';
import { ValidateGradePipe } from './exam/grade.pipe';
import { SumPipe } from './exam/sum.pipe';
import { CourseUnitContainerDirective } from './course/course-unit-template/unit-container.directive';
import { FolderCourseUnitComponent } from './course/course-unit-template/folder/folder-unit.component';
import { ExerciseCourseUnitComponent } from './course/course-unit-template/exercise/exercise-unit.component';
import { SCORMLectureCourseUnitComponent} from './course/course-unit-template/scorm/scorm-lecture-unit.component';
import { VideoLectureCourseUnitComponent} from './course/course-unit-template/video/video-lecture-unit.component';
import { HtmlLectureCourseUnitComponent } from './course/course-unit-template/lecture/html-lecture-unit.component';
import { CourseUnitDialog } from './course/course-unit-dialog/course-unit-dialog.component';
import { CourseUnitPreviewDialog } from './course/course-unit-preview-dialog/course-unit-preview-dialog.component';
import { CourseSettingDialog } from './course/course-setting/course-setting.dialog.component';

@NgModule({
	imports: [ErpSharedModule, AuthModule, AssessmentModule],
	declarations: [CMSComponent, ValidateGradePipe, SumPipe, ExamContentDialog, CourseUnitPreviewDialog,
	CourseSyllabusDialog,CourseUnitContainerDirective, FolderCourseUnitComponent,CourseSettingDialog,
	ExerciseCourseUnitComponent,SCORMLectureCourseUnitComponent, VideoLectureCourseUnitComponent,HtmlLectureCourseUnitComponent, CourseUnitDialog],
	exports: [ExamContentDialog, CourseSyllabusDialog],
	providers: [],
	entryComponents:[FolderCourseUnitComponent,ExerciseCourseUnitComponent, SCORMLectureCourseUnitComponent, VideoLectureCourseUnitComponent, HtmlLectureCourseUnitComponent]
})
export class CMSModule {
}
