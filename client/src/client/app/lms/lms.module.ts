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
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { ClassConferenceDialog} from './course/class-conference/class-conference.dialog.component';
import { ClassListDialog } from './course/class-list/class-list.dialog.component';
import { QuestionMarkingDialog} from './exam/question-marking/question-marking.dialog.component';
import { ExamScoreDialog } from './exam/exam-score/exam-score.dialog.component';
import { AnswerSheetDialog } from './exam/answer-sheet/answer-sheet.dialog.component';
import { ConferenceListComponent } from './conference/conference-list/conference-list.component';
import { CourseMaterialListDialog } from './course/course-material-list/course-material-list.component';
import { CourseMaterialDialog } from './course/course-material/course-material.dialog.component';
import { CourseFaqListDialog } from './course/course-faq-list/course-faq-list.component';
import { CourseFaqDialog } from './course/course-faq/course-faq.dialog.component';
import { GradebookListDialog } from './course/gradebook-list/gradebook-list.component';
import { GradebookDialog } from './course/gradebook/gradebook.dialog.component';

@NgModule({
    imports: [ErpSharedModule, CMSModule, AssessmentModule, AuthModule],
    declarations: [LMSComponent, ExamListComponent, ExamStudyDialog,ExamMarkingDialog,
    				CourseListComponent, CourseStudyComponent, QuestionMarkingDialog,
    				ExamScoreDialog, AnswerSheetDialog, ClassListDialog,
    				ClassConferenceDialog, ConferenceListComponent,CourseMaterialListDialog,
    				CourseMaterialDialog, CourseFaqListDialog, CourseFaqDialog, 
    				GradebookDialog, GradebookListDialog],
    exports: [],
    providers: []
})
export class LMSModule {
}
