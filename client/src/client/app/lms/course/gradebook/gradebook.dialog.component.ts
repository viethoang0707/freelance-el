import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { DatePipe} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS, EXAM_STATUS, PROJECT_STATUS } from '../../../shared/models/constants'
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
import { Project } from '../../../shared/models/elearning/project.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { ExcelService } from '../../../shared/services/excel.service';


@Component({
    moduleId: module.id,
    selector: 'gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
    styleUrls: ['gradebook.dialog.component.css'],
})
export class GradebookDialog extends BaseComponent {

    private display: boolean;
    private member: CourseMember;
    private exams: Exam[];
    private projects: Project[];
    private certificate: Certificate;
    private stats: any;
    private reportUtils: ReportUtils;

    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(CourseCertificateDialog) certDialog: CourseCertificateDialog;
    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

    constructor(private excelService:ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
        super();
        this.exams = [];
        this.projects = [];
        this.stats = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
    }

    downloadScoreReport() {
        var header = [
            this.translateService.instant('Unit'),
            this.translateService.instant('Score'),
        ]
        var records = [];
        records = records.concat(_.map(this.exams, exam=> {
            return [exam["name"], exam["score"]];
        }));
        records = records.concat(_.map(this.projects, project=> {
            return [project["name"], project["score"]];
        }));
        this.excelService.exportAsExcelFile(header.concat(records), 'gradebook_report');
    }

    hide() {
        this.display = false;
    }

    printCertificate() {
        this.certPrintDialog.show(this.certificate);
    }

    issueCertificate() {
        if (this.member.enroll_status != 'completed') {
            this.error('This member has not completed the course');
            return;
        }
        var certificate = new Certificate();
        certificate.date_issue = new Date();
        certificate.course_id = this.member.course_id;
        certificate.member_id = this.member.id;
        this.certDialog.show(certificate);
        this.certDialog.onCreateComplete.subscribe((obj: Certificate) => {
            this.certificate = obj;
        });
    }

    show(member: CourseMember) {
        this.display = true;
        this.member = member;
        this.computeCourseStats();
        this.loadCertificate();
        this.loadExamScore();
        this.loadProjectScore();
    }

    computeCourseStats() {
        var record = {};
        CourseSyllabus.byCourse(this, this.member.course_id).subscribe(syllabus => {
            CourseUnit.countBySyllabus(this, syllabus.id).subscribe(totalUnit => {
                CourseLog.userStudyActivity(this, record["user_id"], this.member.class_id).subscribe(logs => {
                    record["total_unit"] = totalUnit;
                    var result = this.reportUtils.analyzeCourseMemberActivity(logs);
                    if (result[0] != Infinity)
                        record["first_attempt"] = this.datePipe.transform(result[0], EXPORT_DATETIME_FORMAT);
                    if (result[1] != Infinity)
                        record["last_attempt"] = this.datePipe.transform(result[1], EXPORT_DATETIME_FORMAT);
                    record["time_spent"] = this.timePipe.transform(+result[2], 'min');
                    if (totalUnit)
                        record["complete_percent"] = Math.floor(+result[3] * 100 / +totalUnit);
                    else
                        record["complete_percent"] = 0;
                    record["complete_unit"] = +result[3];
                });
                this.closeTransaction();
            });
        });
    }

    loadCertificate() {
        this.startTransaction();
        Certificate.byMember(this, this.member.id).subscribe((certificate: any) => {
            this.certificate = certificate;
            this.closeTransaction();
        });
    }

    loadExamScore() {
        this.startTransaction();
        ExamGrade.all(this).subscribe(grades => {
            ExamMember.listByUser(this, this.member.user_id).subscribe(members => {
                var examIds = _.pluck(members, 'exam_id');
                Exam.array(this, examIds)
                    .subscribe(exams => {
                        this.exams = _.filter(exams, exam => {
                            return exam.status == 'published';
                        });
                        _.each(this.exams, (exam => {
                            let member: ExamMember = _.find(members, (examMember: ExamMember) => {
                                return examMember.exam_id == exam.id;
                            });
                            exam["member"] = member;
                            Submission.byMemberAndExam(this, member.id, exam.id).subscribe(submit => {
                                if (submit) {
                                    exam["score"] = submit.score;
                                    exam["submit"] = submit;
                                    var grade = member.examGrade(grades, submit.score);
                                    if (grade)
                                        exam["grade"] = grade.name;
                                }
                            });
                            ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                                exam["question_count"] = count;
                            });
                        }));
                    });
                this.closeTransaction();
            });
        });
    }

    loadProjectScore() {
        this.startTransaction();
        Project.listByClass(this, this.member.class_id).subscribe(projects => {
            ProjectSubmission.listByMember(this, this.member.id).subscribe(submits => {
                this.projects = projects;
                this.projects = _.filter(projects, project => {
                    return project.status == 'published';
                });
                _.each(this.projects, project => {
                    var submit =  _.find(submits, (submit: ProjectSubmission) => {
                        return submit.project_id == project.id;
                    });
                    if (submit) {
                        project["score"] = submit.score;
                        project["submit"] = submit;
                    }
                });
            });
        });
    }
}

