import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { CourseCertificateDialog } from '../../course/course-certificate/course-certificate.dialog.component';
import { CertificatePrintDialog } from '../../course/certificate-print/certificate-print.dialog.component';
import { Project } from '../../../shared/models/elearning/project.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { ExcelService } from '../../../shared/services/excel.service';
import { BaseModel } from '../../../shared/models/base.model';
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

    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(CourseCertificateDialog) certDialog: CourseCertificateDialog;
    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

    constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
        super();
        this.exams = [];
        this.projects = [];
        this.stats = [];
        this.reportUtils = new ReportUtils();
        this.member = new CourseMember();
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
            this.member.completeCourse(this).subscribe(() => {
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
        this.lmsService.init(this).subscribe(() => {
            this.lmsService.initCourseContent(this).subscribe(() => {
                this.lmsService.initClassContent(this).subscribe(() => {
                    BaseModel
                        .bulk_search(this,
                            CourseLog.__api__memberStudyActivity(this.member.id, this.member.course_id),
                            Certificate.__api__byMember(this.member.id),
                            ExamMember.__api__listByUser(this.ContextUser.id),
                            Submission.__api__listByUser(this.ContextUser.id),
                            ProjectSubmission.__api__listByMember(this.member.id))
                        .subscribe(jsonArr => {
                            var logs = CourseLog.toArray(jsonArr[0]);
                            this.computeCourseStats(this.lmsService.getCourseSyllabusFromCourse(member.course_id), logs);
                            var certList = Certificate.toArray(jsonArr[1]);
                            if (certList.length)
                                this.certificate = certList[0];
                            var classExams = this.lmsService.getClassExams(member.class_id);
                            var examMembers = ExamMember.toArray(jsonArr[2]);
                            var submits = Submission.toArray(jsonArr[3]);
                            this.displayExam(classExams, examMembers, submits);
                            var projects = this.lmsService.getClassProjects(member.class_id);
                            var projectSubmits = ProjectSubmission.toArray(jsonArr[4]);
                            this.displayProject(projects, projectSubmits);
                        });
                });
            });
        });

    }

    computeCourseStats(syl: CourseSyllabus, logs: CourseLog[]) {
        var record = {};
        var units = this.lmsService.getSyllabusUnit(syl.id);
        record["total_unit"] = units.length;
        var result = this.reportUtils.analyzeCourseMemberActivity(logs);
        if (result[0] != Infinity)
            record["first_attempt"] = this.datePipe.transform(result[0], EXPORT_DATETIME_FORMAT);
        if (result[1] != Infinity)
            record["last_attempt"] = this.datePipe.transform(result[1], EXPORT_DATETIME_FORMAT);
        record["time_spent"] = this.timePipe.transform(+result[2], 'min');
        if (units.length)
            record["complete_percent"] = Math.floor(+result[3] * 100 / +units.length);
        else
            record["complete_percent"] = 0;
        record["complete_unit"] = +result[3];
        this.stats.push(record);
    }

    displayExam(classExams: Exam[], members: ExamMember[], submits: Submission[]) {
        var examIds = _.pluck(classExams, 'id');
        members = _.filter(members, member => {
            return member.enroll_status != 'completed' && _.contains(examIds, member.exam_id);
        });
        ExamGrade.listByExams(this, examIds).subscribe(grades => {
            var exams = _.map(members, (member: ExamMember) => {
                return member.exam;
            })
            ExamMember.populateExams(this, members).subscribe(exams => {
                _.each(exams, (exam: Exam) => {
                    var examGrades = _.filter(grades, (grade: ExamGrade) => {
                        return grade.exam_id == exam.id;
                    });
                    exam["member"] = _.find(members, (member: ExamMember) => {
                        return member.exam_id == exam.id;
                    });
                    exam["submit"] = _.find(submits, (submit: Submission) => {
                        return submit.member_id == exam["member"].id && submit.exam_id == exam.id;
                    });
                    if (!exam["submit"])
                        exam["score"] = ''
                    else {
                        var grade = ExamGrade.gradeScore(examGrades, exam["submit"].score);
                        if (grade)
                            exam["grade"] = grade.name;
                        exam["score"] = exam["submit"].score;
                    }
                });
                this.exams.sort((exam1, exam2): any => {
                    return (exam1.create_date < exam2.create_date);
                });
            });
        });
    }


    displayProject(projects: Project[], submits: ProjectSubmission[]) {
        this.projects = projects;
        _.each(projects, (project: Project) => {
            console.log('submit:', submits);
            project["submit"] = _.find(submits, (submit: ProjectSubmission) => {
                return submit.project_id == project.id;
            });
            if (project["submit"]) {
                if (project["submit"].score != null)
                    project["score"] = project["submit"].score;
                else
                    project["score"] = '';
            } else {
                project["submit"] = [];
                project["submit"]["date_submit"] = '';
                project["submit"]["score"] = '';
            }
        });
    }

}

