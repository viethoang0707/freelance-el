import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamStudyDialog } from './exam/exam-study/exam-study.dialog.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { ClassConferenceDialog } from './class/class-conference/class-conference.dialog.component';
import { QuestionMarkingDialog } from './exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from './exam/answer-print/answer-print.dialog.component';
import { QuestionSheetPrintDialog } from './exam/question-sheet-print/question-sheet-print.dialog.component';
import { ConferenceListComponent } from './conference/conference-list/conference-list.component';
import { CourseMaterialDialog } from './course/course-material/course-material.dialog.component';
import { CourseFaqDialog } from './course/course-faq/course-faq.dialog.component';
import { ClassStudentListComponent } from './class/class-student/class-student-list.component';
import { GradebookDialog } from './class/gradebook/gradebook.dialog.component';
import { ClassExamEnrollDialog } from './class/class-exam-enroll/class-exam-enroll.dialog.component';
import { ClassExamListDialog } from './class/class-exam-list/class-exam-list.dialog.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { CourseCertificateDialog } from './course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from './course/certificate-print/certificate-print.dialog.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';
import { ExamSubmissionDialog } from './exam/exam-submit/exam-submission.dialog.component';
import { ExamReportDialog } from './exam/exam-report/exam-report.dialog.component';
import { ExamStatsDialog } from './exam/exam-stats/exam-stats.dialog.component';
import { ProjectManageDialog } from './class/project-manage/project-manage.dialog.component';
import { ProjectListDialog } from './class/project-list/project-list.dialog.component';
import { ProjectMarkingDialog } from './class/project-marking/project-marking.dialog.component';
import { ProjectSubmissionDialog } from './class/project-submit/project-submission.dialog.component';
import { SurveyStatsDialog } from './survey/survey-stats/survey-stats.dialog.component';
import { ClassSurveyEnrollDialog } from './class/class-survey-enroll/class-survey-enroll.dialog.component';
import { ClassSurveyListDialog } from './class/class-survey-list/class-survey-list.dialog.component';
import { SurveyStudyDialog} from './survey/survey-study/survey-study.dialog.component';
import { CourseSearchComponent } from './course/course-search/course-search.component';
import { CourseRecommendComponent } from './course/course-recommend/course-recommend.component';
import { SurveyListComponent} from './survey/survey-list/survey-list.component';
import { LMSProfileDialog } from './course/lms-profile/lms-profile-dialog.component';
import { WebcamModule } from 'ngx-webcam';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';

@NgModule({
    imports: [ErpSharedModule, CMSModule, AssessmentModule, AuthModule, WebcamModule,AnalysisModule],
    declarations: [LMSComponent, ExamListComponent, ExamStudyDialog,AnswerPrintDialog,
    				CourseListComponent, QuestionMarkingDialog,CertificatePrintDialog,LMSProfileDialog,
    				 ExamSubmissionDialog,ClassExamListDialog,ExamManageComponent,QuestionSheetPrintDialog,
    				ClassConferenceDialog, ConferenceListComponent,CourseManageComponent,
    				CourseMaterialDialog, CourseFaqDialog, CourseStudyComponent,ProjectSubmissionDialog,
    				GradebookDialog, ClassStudentListComponent, ClassExamEnrollDialog, CourseCertificateDialog,
    				ExamReportDialog, ExamStatsDialog, ProjectManageDialog, ProjectListDialog, ProjectMarkingDialog,
                    ClassSurveyEnrollDialog, SurveyStatsDialog, ClassSurveyListDialog, SurveyStudyDialog,
                    CourseSearchComponent, CourseRecommendComponent,SurveyListComponent,CourseViewComponent,
                    CourseEditComponent],

    exports: [CertificatePrintDialog, ExamStudyDialog, SurveyStudyDialog, AnswerPrintDialog, ExamSubmissionDialog],
    providers: []

})
export class LMSModule {
}
