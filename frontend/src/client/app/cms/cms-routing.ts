import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { RouterModule } from '@angular/router';
import { CMSComponent } from './cms.component';
import { CourseBackupComponent } from './course/course-backup/course-backup.component';
import { CourseResolve, CourseSyllabusResolve, ExamResolve, QuestionSheetResolve, SurveyResolve, SurveySheetResolve } from './route.resolver';
import { CoursePublishComponent } from './course/course-publish/course-publish.component';
import { CourseRestoreComponent } from './course/course-restore/course-restore.component';
import { CourseSyllabusComponent } from './course/course-syllabus/course-syllabus.component';
import { SurveyEditorFormComponent } from './survey/survey-editor/survey-editor-form.component';
import { ExamEditorFormCoponent } from './exam/exam-editor/exam-editor-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cms',
        component: CMSComponent,
        data: {
          breadcrumb: 'CMS'
        },
        children:
          [
            {
              path: "course/backup/:courseId/:sylId",
              component: CourseBackupComponent,
              data: {
                breadcrumb: 'Course backup'
              },
              resolve: {
                course: CourseResolve,
                syllabus: CourseSyllabusResolve
              },
            },
            {
              path: "course/publish/:courseId/:sylId",
              component: CoursePublishComponent,
              data: {
                breadcrumb: 'Course publish'
              },
              resolve: {
                course: CourseResolve,
                syllabus: CourseSyllabusResolve
              },
            },
            {
              path: "course/compose/:courseId/:sylId",
              component: CourseSyllabusComponent,
              data: {
                breadcrumb: 'Course compose'
              },
              resolve: {
                course: CourseResolve,
                syllabus: CourseSyllabusResolve
              },
            },
            {
              path: "course/restore/:courseId/:sylId",
              component: CourseRestoreComponent,
              data: {
                breadcrumb: 'Course restore'
              },
              resolve: {
                course: CourseResolve,
                syllabus: CourseSyllabusResolve
              },
            },
            {
              path: "exam/compose/:examId/:sheetId",
              component: ExamEditorFormCoponent,
              data: {
                breadcrumb: 'Exam editor'
              },
              resolve: {
                exam: ExamResolve,
                sheet: QuestionSheetResolve
              },
            },
            {
              path: "survey/compose/:surveyId/:sheetId",
              component: SurveyEditorFormComponent,
              data: {
                breadcrumb: 'Survey editor'
              },
              resolve: {
                survey: SurveyResolve,
                sheet: SurveySheetResolve
              },
            },
          ]
      }
    ])
  ],
})
export class CMSRoutingModule {
}
