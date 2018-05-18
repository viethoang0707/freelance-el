import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
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
import { CourseCertificateDialog } from '../course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from '../certificate-print/certificate-print.dialog.component';


@Component({
    moduleId: module.id,
    selector: 'gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
    styleUrls: ['gradebook.dialog.component.css'],
})
export class GradebookDialog extends BaseComponent {

    display: boolean;
    member: CourseMember;
    exams: Exam[];
    certificate: Certificate;

    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(CourseCertificateDialog) certDialog: CourseCertificateDialog;
    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

    constructor() {
        super();
        this.exams = [];
    }

    ngOnInit() {
    }

    hide() {
        this.display = false;
    }

    printCertificate() {
        this.certPrintDialog.show(this.certificate);
    }

    issueCertificate() {
        if (this.member.enroll_status !='completed') {
            this.error('This member has not completed the course');
            return;
        }
        var certificate = new Certificate();
        certificate.date_issue = new Date();
        certificate.course_id = this.member.course_id;
        certificate.member_id = this.member.id;
        this.certDialog.show(certificate);
        this.certDialog.onCreateComplete.subscribe(obj => {
            this.certificate = obj;
        });
    }

    show(member: CourseMember) {
        this.display = true;
        this.member = member;
        this.loadCertificate();
        this.loadExamScore();
    }

    loadCertificate() {
        this.startTransaction();
        Certificate.byMember(this, this.member.id).subscribe((certificate:any) => {
            this.certificate = certificate;
            this.closeTransaction();
        });
    }

    loadExamScore() {
        this.startTransaction();
        ExamMember.listByUser(this, this.member.user_id).subscribe(members => {
            var examIds = _.pluck(members, 'exam_id');
            Exam.array(this, examIds)
                .subscribe(exams => {
                    this.exams = _.filter(exams, (exam => {
                        return exam.status == 'published';
                    }));
                    _.each(this.exams, (exam => {
                        exam["member"] = _.find(members, (examMember: ExamMember) => {
                            return examMember.exam_id == exam.id;
                        });
                        exam["member"].examScore(this, exam.id).subscribe(score => {
                            exam["member"]["score"] = score;
                            ExamGrade.listByExam(this, exam.id).subscribe(grades => {
                                var grade = exam["member"].examGrade(grades, score);
                                if (grade)
                                    exam["member"]["grade"] = grade.name;
                            });
                        });
                        ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                            exam["question_count"] = count;
                        });
                    }));
                });
              this.closeTransaction();
        });
    }
}

