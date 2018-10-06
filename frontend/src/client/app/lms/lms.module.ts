import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamStudyDialog } from './exam/exam-study/exam-study.dialog.component';
import { QuestionMarkingDialog } from './exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from './exam/answer-print/answer-print.dialog.component';
import { QuestionSheetPrintDialog } from './exam/question-sheet-print/question-sheet-print.dialog.component';
import { CourseMaterialDialog } from './course/course-material/course-material.dialog.component';
import { CourseFaqDialog } from './course/course-faq/course-faq.dialog.component';
import { ClassManageComponent } from './class/class-manage/class-manage.component';
import { GradebookDialog } from './class/gradebook/gradebook.dialog.component';
import { ClassExamEnrollComponent } from './class/class-exam-enroll/class-exam-enroll.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { CourseCertificateDialog } from './course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from './course/certificate-print/certificate-print.dialog.component';
import { CourseGroupManageComponent } from './course/course-manage/course-group-manage.component';
import { CourseSelfStudyManageComponent } from './course/course-manage/course-self-study-manage.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';
import { ExamSubmissionDialog } from './exam/exam-submit/exam-submission.dialog.component';
import { ExamReportDialog } from './exam/exam-report/exam-report.dialog.component';
import { ExamStatsDialog } from './exam/exam-stats/exam-stats.dialog.component';
import { ProjectManageComponent } from './class/project-manage/project-manage.component';
import { ProjectMarkingDialog } from './class/project-marking/project-marking.dialog.component';
import { ProjectSubmissionDialog } from './class/project-submit/project-submission.dialog.component';
import { SurveyStatsDialog } from './survey/survey-stats/survey-stats.dialog.component';
import { ClassSurveyEnrollComponent } from './class/class-survey-enroll/class-survey-enroll.component';
import { SurveyStudyDialog } from './survey/survey-study/survey-study.dialog.component';
import { LMSProfileDialog } from './course/lms-profile/lms-profile-dialog.component';
import { WebcamModule } from 'ngx-webcam';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { CourseMemberActivityDialog } from './class/course-member-activity/course-member-activity.dialog.component';
import { CourseUnitStudyDialog } from './course/course-unit-study-dialog/course-unit-study-dialog.component';
import { CourseUnitPlayerContainerDirective } from './course/course-unit-template/unit-player.directive';
import { FolderCourseUnitPlayerComponent } from './course/course-unit-template/folder/folder-unit.component';
import { ExerciseCourseUnitPlayerComponent } from './course/course-unit-template/exercise/exercise-unit.component';
import { SCORMLectureCourseUnitPlayerComponent } from './course/course-unit-template/scorm/scorm-lecture-unit.component';
import { SlideLectureCourseUnitPlayerComponent } from './course/course-unit-template/slide/slide-lecture-unit.component';
import { VideoLectureCourseUnitPlayerComponent } from './course/course-unit-template/video/video-lecture-unit.component';
import { HtmlLectureCourseUnitPlayerComponent } from './course/course-unit-template/lecture/html-lecture-unit.component';
import { SelfAssessmentCourseUnitPlayerComponent } from './course/course-unit-template/assessment/self-assessment-unit.component';
import { ConferenceeResolve, CourseResolve, ProjectResolve, CourseClassResolve, ExamResolve, SurveyResolve, CourseMemberResolve, CourseSyllabusResolve } from './router.resolve';
import { ProjectDialog } from './class/project-dialog/project-dialog.component';
import { SelfAssessmentGradebookDialog } from './course/self-assessment-gradebook/gradebook.dialog.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { ConferenceListComponent } from './class/conference-list/conference-list.component';
import { CourseSearchComponent } from './course/course-search/course-search.component';
import { CourseRecommendComponent } from './course/course-recommend/course-recommend.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { CourseUnitStudyComponent } from './course/course-study/course-unit-study.component';

@NgModule({
    imports: [
        ErpSharedModule,
        CMSModule,
        AssessmentModule,
        AuthModule,
        WebcamModule,
        AnalysisModule
    ],
    declarations: [
        LMSComponent,
        ExamListComponent,
        CourseListComponent,
        ConferenceListComponent,
        CourseSearchComponent,
        CourseRecommendComponent,
        SurveyListComponent,
        ExamStudyDialog,
        AnswerPrintDialog,
        CourseEditComponent,
        CourseMemberActivityDialog,
        CourseSelfStudyManageComponent,
        QuestionMarkingDialog,
        CertificatePrintDialog,
        LMSProfileDialog,
        ExamSubmissionDialog,
        ExamManageComponent,
        QuestionSheetPrintDialog,
        CourseGroupManageComponent,
        CourseViewComponent,
        CourseMaterialDialog,
        CourseFaqDialog,
        SelfAssessmentGradebookDialog,
        CourseStudyComponent,
        ProjectSubmissionDialog,
        ProjectDialog,
        GradebookDialog,
        ClassManageComponent,
        ClassExamEnrollComponent,
        CourseCertificateDialog,
        ExamReportDialog,
        ExamStatsDialog,
        ProjectManageComponent,
        ProjectMarkingDialog,
        ClassSurveyEnrollComponent,
        SurveyStatsDialog,
        SurveyStudyDialog,
        CourseUnitStudyDialog,
        CourseUnitPlayerContainerDirective,
        FolderCourseUnitPlayerComponent,
        ExerciseCourseUnitPlayerComponent,
        SCORMLectureCourseUnitPlayerComponent,
        SlideLectureCourseUnitPlayerComponent,
        VideoLectureCourseUnitPlayerComponent,
        HtmlLectureCourseUnitPlayerComponent,
        SelfAssessmentCourseUnitPlayerComponent,
        CourseUnitStudyComponent
    ],

    exports: [
        CertificatePrintDialog,
        ExamStudyDialog,
        SurveyStudyDialog,
        AnswerPrintDialog,
        ExamSubmissionDialog
    ],
    entryComponents: [
        FolderCourseUnitPlayerComponent,
        ExerciseCourseUnitPlayerComponent,
        SCORMLectureCourseUnitPlayerComponent,
        SlideLectureCourseUnitPlayerComponent,
        VideoLectureCourseUnitPlayerComponent,
        HtmlLectureCourseUnitPlayerComponent,
        SelfAssessmentCourseUnitPlayerComponent
    ],
    providers: [
        ConferenceeResolve,
        CourseResolve,
        CourseClassResolve,
        ExamResolve,
        SurveyResolve,
        ProjectResolve,
        CourseMemberResolve,
        CourseSyllabusResolve
    ]

})
export class LMSModule {
}


