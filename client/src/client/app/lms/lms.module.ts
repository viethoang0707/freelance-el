import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { ExamStudyDialog} from './exam/exam-study/exam-study.dialog.component';
import { ExamMarkingDialog} from './exam/exam-marking/exam-marking.dialog.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { ClassConferenceDialog} from './course/class-conference/class-conference.dialog.component';
import { ClassListDialog } from './course/class-list/class-list.dialog.component';
import { QuestionMarkingDialog} from './exam/question-marking/question-marking.dialog.component';
import { ExamScoreDialog } from './exam/exam-score/exam-score.dialog.component';
import { AnswerPrintDialog } from './exam/answer-print/answer-print.dialog.component';
import { ConferenceListComponent } from './conference/conference-list/conference-list.component';
import { CourseMaterialListDialog } from './course/course-material-list/course-material-list.component';
import { CourseMaterialDialog } from './course/course-material/course-material.dialog.component';
import { CourseFaqListDialog } from './course/course-faq-list/course-faq-list.component';
import { CourseFaqDialog } from './course/course-faq/course-faq.dialog.component';
import { GradebookListDialog } from './course/gradebook-list/gradebook-list.component';
import { GradebookDialog } from './course/gradebook/gradebook.dialog.component';
import { ClassExamEnrollDialog } from './course/class-exam-enroll/class-exam-enroll.dialog.component';
import { ClassExamListDialog } from './course/class-exam-list/class-exam-list.dialog.component';
import { CourseStudyDialog } from './course/course-study/course-study.dialog.component';
import { CourseCertificateDialog } from './course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from './course/certificate-print/certificate-print.dialog.component';


@NgModule({
    imports: [ErpSharedModule, CMSModule, AssessmentModule, AuthModule],
    declarations: [LMSComponent, ExamListComponent, ExamStudyDialog,ExamMarkingDialog,
    				CourseListComponent, CourseStudyDialog, QuestionMarkingDialog,CertificatePrintDialog,
    				ExamScoreDialog, AnswerPrintDialog, ClassListDialog,ClassExamListDialog,
    				ClassConferenceDialog, ConferenceListComponent,CourseMaterialListDialog,
    				CourseMaterialDialog, CourseFaqListDialog, CourseFaqDialog, CourseStudyDialog,
    				GradebookDialog, GradebookListDialog, ClassExamEnrollDialog, CourseCertificateDialog],
    exports: [CertificatePrintDialog],
    providers: []
})
export class LMSModule {
}
