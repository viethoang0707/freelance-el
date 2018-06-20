import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
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
import { BaseModel } from '../../../shared/models/base.model';
import { ClassExam } from '../../../shared/models/elearning/class-exam.model';
import { User } from '../../../shared/models/elearning/user.model';


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
    private currentUser: User;

    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(CourseCertificateDialog) certDialog: CourseCertificateDialog;
    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

    constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
        super();
        this.exams = [];
        this.projects = [];
        this.stats = [];
        this.reportUtils = new ReportUtils();
        this.currentUser = this.authService.UserProfile;
        this.member =  new CourseMember();
    }

    ngOnInit() {
    }

    downloadScoreReport() {
        var header = [
            this.translateService.instant('Unit'),
            this.translateService.instant('Score'),
        ]
        var records = [];
        records = records.concat(_.map(this.exams, exam => {
            return [exam["name"], exam["score"]];
        }));
        records = records.concat(_.map(this.projects, project => {
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
            this.member.completeCourse(this).subscribe(()=> {
                this.success('Congratulations! You have completed the course.');
            })
        });
    }

    show(member: CourseMember) {
        this.display = true;
        this.exams = [];
        this.projects = [];
        this.stats = [];
        this.member = member;
        BaseModel
            .bulk_search(this,
                CourseSyllabus.__api__byCourse(this.member.course_id),
                CourseLog.__api__memberStudyActivity(this.member.id, this.member.course_id),
                Certificate.__api__byMember(this.member.id),
                ClassExam.__api__listByClass(this.member.class_id),
                ExamMember.__api__listByUser(this.currentUser.id),
                Submission.__api__listByUser(this.currentUser.id),
                ExamGrade.__api__all(),
                Project.__api__listByClass(this.member.class_id),
                ProjectSubmission.__api__listByMember(this.member.id))
            .subscribe(jsonArr => {
                var sylList = CourseSyllabus.toArray(jsonArr[0]);
                var logs = CourseLog.toArray(jsonArr[1]);
                if (sylList.length) {
                    this.computeCourseStats(sylList[0], logs);
                }
                var certList = Certificate.toArray(jsonArr[2]);
                if (certList.length)
                    this.certificate = certList[0];
                var classExams = ClassExam.toArray(jsonArr[3]);
                var examMembers = ExamMember.toArray(jsonArr[4]);
                var submits = Submission.toArray(jsonArr[5]);
                var grades = ExamGrade.toArray(jsonArr[6]);
                this.displayExam(classExams, examMembers, submits, grades);
                var projects = Project.toArray(jsonArr[7]);
                var projectSubmits = ProjectSubmission.toArray(jsonArr[8]);
                this.displayProject(projects, projectSubmits);
            });
    }

    computeCourseStats(syl: CourseSyllabus, logs: CourseLog[]) {
        var record = {};
        CourseUnit.countBySyllabus(this, syl.id).subscribe(totalUnit => {
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
        this.stats.push(record);
    }

    displayExam(classExams: ClassExam[], members: ExamMember[], submits: Submission[], grades: ExamGrade[]) {
        var examIds = _.pluck(classExams, 'exam_id');
        members = _.filter(members, member => {
            return member.enroll_status != 'completed' && _.contains(examIds, member.exam_id);
        });
        ExamMember.populateExamForArray(this, members).subscribe(exams => {
            _.each(exams, (exam: ExamMember) => {
                exam["member"] = _.find(members, (member: ExamMember) => {
                    return member.exam_id == exam.id;
                });
                exam["submit"] = _.find(submits, (submit: Submission) => {
                    return submit.member_id == exam["member"].id && submit.exam_id == exam.id;
                });
                if (!exam["submit"])
                    exam["score"] = ''
                else {
                    var grade = ExamGrade.gradeScore(grades, exam["submit"].score);
                    if (grade)
                        exam["grade"] = grade.name;
                    exam["score"] = exam["submit"].score;
                }
                ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                    exam["question_count"] = count;
                });
            });
            this.exams.sort((exam1, exam2): any => {
                return (exam1.create_date < exam2.create_date);
            });
        });
    }


    displayProject(projects: Project[], submits: ProjectSubmission[]) {
        this.projects = projects;
        _.each(projects, (project: Project) => {
            project["submit"] = _.find(submits, (submit: ProjectSubmission) => {
                return submit.project_id == project.id;
            });
            if (project["submit"]) {
                if (project["submit"].score != null)
                    project["score"] = project["submit"].score;
                else
                    project["score"] = '';
            }
        });
    }

}

