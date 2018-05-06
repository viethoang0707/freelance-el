import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { ExamStudyDialog} from './exam/exam-study/exam-study.dialog.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { ClassConferenceDialog} from './course/class-conference/class-conference.dialog.component';
import { QuestionMarkingDialog} from './exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from './exam/answer-print/answer-print.dialog.component';
import { ConferenceListComponent } from './conference/conference-list/conference-list.component';
import { CourseMaterialDialog } from './course/course-material/course-material.dialog.component';
import { CourseFaqDialog } from './course/course-faq/course-faq.dialog.component';
import { GradebookListDialog } from './course/gradebook-list/gradebook-list.component';
import { GradebookDialog } from './course/gradebook/gradebook.dialog.component';
import { ClassExamEnrollDialog } from './course/class-exam-enroll/class-exam-enroll.dialog.component';
import { ClassExamListDialog } from './course/class-exam-list/class-exam-list.dialog.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { CourseCertificateDialog } from './course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from './course/certificate-print/certificate-print.dialog.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';
import { SubmissionDialog } from './exam/submission-dialog/submission.dialog.component';
import {WebcamModule} from 'ngx-webcam';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@NgModule({
    imports: [ErpSharedModule, CMSModule, AssessmentModule, AuthModule, WebcamModule,MessagesModule,MessageModule],
    declarations: [LMSComponent, ExamListComponent, ExamStudyDialog,AnswerPrintDialog,
    				CourseListComponent, QuestionMarkingDialog,CertificatePrintDialog,
    				 SubmissionDialog,ClassExamListDialog,ExamManageComponent,
    				ClassConferenceDialog, ConferenceListComponent,CourseManageComponent,
    				CourseMaterialDialog, CourseFaqDialog, CourseStudyComponent,
    				GradebookDialog, GradebookListDialog, ClassExamEnrollDialog, CourseCertificateDialog],
    exports: [CertificatePrintDialog, ExamStudyDialog, AnswerPrintDialog],
    providers: []
})
export class LMSModule {
}
