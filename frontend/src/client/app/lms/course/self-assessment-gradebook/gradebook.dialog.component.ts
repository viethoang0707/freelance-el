import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS, EXAM_STATUS, PROJECT_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { CourseLog } from '../../../shared/models/elearning/log.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { SelectItem } from 'primeng/api';
import { TimeConvertPipe } from '../../../shared/pipes/time.pipe';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { AnswerPrintDialog } from '../../exam/answer-print/answer-print.dialog.component';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CourseCertificateDialog } from '../../course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from '../../course/certificate-print/certificate-print.dialog.component';
import { SelfAssessment } from '../../../shared/models/elearning/self_assessment.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { ExcelService } from '../../../shared/services/excel.service';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';
import { ExamRecord } from '../../../shared/models/elearning/exam-record.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';

@Component({
    moduleId: module.id,
    selector: 'self-assessment-gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
    styleUrls: ['gradebook.dialog.component.css'],
})
export class SelfAssessmentGradebookDialog extends BaseComponent {

    @ViewChild(AnswerPrintDialog) answerPrintDialog: AnswerPrintDialog;
    
    private display: boolean;
    private student: CourseMember;
    private assessments: SelfAssessment[];
    private submissions: any;
    private supervisor: CourseMember;
    private course: Course;

    constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
        super();
        this.student = new CourseMember();
        this.supervisor = new CourseMember();
        this.submissions = {};
        this.assessments = [];
    }

    ngOnInit() {
    }

    hide() {
        this.display = false;
    }

    viewAnswer(submit: Submission) {
        Exam.get(this, submit.exam_id).subscribe(exam => {
            ExamMember.get(this, submit.member_id).subscribe(member => {
                this.answerPrintDialog.show(exam, member, submit);
            });
        });
    }

    show(supervisor: CourseMember, course: Course, student: CourseMember) {
        this.display = true;
        this.supervisor = supervisor;
        this.student = student;
        this.course = course;
        this.submissions = {};
        this.assessments = [];
        course.listAssessments(this).subscribe(assessments => {
            this.assessments = assessments;
            _.each(this.assessments, (assessment: SelfAssessment) => {
                student.listExamSubmissions(this, assessment.exam_id).subscribe(submits=> {
                    this.submissions[assessment.id] = _.filter(submits,(submit:Submission)=> {
                        return submit.start && submit.end;
                    });
                });
            });
        });
    }
}
