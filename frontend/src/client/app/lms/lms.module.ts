import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamStudyDialog } from './exam/exam-study/exam-study.dialog.component';
import { ClassConferenceDialog } from './class/class-conference/class-conference.dialog.component';
import { QuestionMarkingDialog } from './exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from './exam/answer-print/answer-print.dialog.component';
import { QuestionSheetPrintDialog } from './exam/question-sheet-print/question-sheet-print.dialog.component';
import { CourseMaterialDialog } from './course/course-material/course-material.dialog.component';
import { CourseFaqDialog } from './course/course-faq/course-faq.dialog.component';
import { ClassManageComponent } from './class/class-manage/class-manage.component';
import { GradebookDialog } from './class/gradebook/gradebook.dialog.component';
import { ClassExamEnrollDialog } from './class/class-exam-enroll/class-exam-enroll.dialog.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { CourseCertificateDialog } from './course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from './course/certificate-print/certificate-print.dialog.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';
import { ExamSubmissionDialog } from './exam/exam-submit/exam-submission.dialog.component';
import { ExamReportDialog } from './exam/exam-report/exam-report.dialog.component';
import { ExamStatsDialog } from './exam/exam-stats/exam-stats.dialog.component';
import { ProjectManageDialog } from './class/project-manage/project-manage.dialog.component';
import { ProjectMarkingDialog } from './class/project-marking/project-marking.dialog.component';
import { ProjectSubmissionDialog } from './class/project-submit/project-submission.dialog.component';
import { SurveyStatsDialog } from './survey/survey-stats/survey-stats.dialog.component';
import { ClassSurveyEnrollDialog } from './class/class-survey-enroll/class-survey-enroll.dialog.component';
import { SurveyStudyDialog } from './survey/survey-study/survey-study.dialog.component';
import { LMSProfileDialog } from './course/lms-profile/lms-profile-dialog.component';
import { WebcamModule } from 'ngx-webcam';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { ClassMemberActivityDialog } from './class/class-member-activity/class-member-activity.dialog.component';
import { LMSRoutingModule } from './lms-routing';
import { CourseUnitStudyDialog } from './course/course-unit-study-dialog/course-unit-study-dialog.component';


@NgModule({
    imports: [
        LMSRoutingModule,
        ErpSharedModule,
        CMSModule,
        AssessmentModule,
        AuthModule,
        WebcamModule,
        AnalysisModule
    ],
    declarations: [
        LMSComponent,
        ExamStudyDialog,
        AnswerPrintDialog,
        CourseEditComponent,
        ClassMemberActivityDialog,
        QuestionMarkingDialog,
        CertificatePrintDialog,
        LMSProfileDialog,
        ExamSubmissionDialog,
        ExamManageComponent,
        QuestionSheetPrintDialog,
        ClassConferenceDialog,
        CourseManageComponent,
        CourseViewComponent,
        CourseMaterialDialog,
        CourseFaqDialog,
        CourseStudyComponent,
        ProjectSubmissionDialog,
        GradebookDialog,
        ClassManageComponent,
        ClassExamEnrollDialog,
        CourseCertificateDialog,
        ExamReportDialog,
        ExamStatsDialog,
        ProjectManageDialog,
        ProjectMarkingDialog,
        ClassSurveyEnrollDialog,
        SurveyStatsDialog,
        SurveyStudyDialog,
        CourseUnitStudyDialog,
    ],

    exports: [
        CertificatePrintDialog,
        ExamStudyDialog,
        SurveyStudyDialog,
        AnswerPrintDialog,
        ExamSubmissionDialog
    ],
    providers: []

})
export class LMSModule {
}
