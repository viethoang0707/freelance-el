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
import { ExamRecord } from '../../../shared/models/elearning/exam-record.model';
import { Course } from '../../../shared/models/elearning/course.model';


@Component({
    moduleId: module.id,
    selector: 'gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
    styleUrls: ['gradebook.dialog.component.css'],
})
export class GradebookDialog extends BaseComponent {

    private display: boolean;
    private member: CourseMember;
    private course: Course;
    private exams: Exam[];
    private examRecords: ExamRecord[];
    private projects: Project[];
    private projectSubmits: ProjectSubmission[];
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
        records = records.concat(_.map(this.exams, (exam: Exam) => {
            let examRecord: ExamRecord = this.getExamRecord(exam);
            return [exam.name, examRecord.score];
        }));
        records = records.concat(_.map(this.projects, (project: Project) => {
            let submit: ProjectSubmission = this.getProjectSubmit(project);
            return [project.name, submit.score];
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
            this.member.completeCourse(this, certificate.id).subscribe(() => {
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
        this.lmsProfileService.init(this).subscribe(() => {
            this.course = this.lmsProfileService.courseById(member.course_id);
            this.exams = this.lmsProfileService.examsByClass(this.member.class_id);
            this.lmsProfileService.getClassContent(this, this.member.class_id).subscribe(content=> {
                this.projects = content["projects"];
                BaseModel.bulk_search(this,
                Certificate.__api__listByMember(this.member.id),
                ProjectSubmission.__api__listByMember(this.member.id),
                ExamRecord.__api__listByMember(this.member.id))
                .subscribe(jsonArr => {
                    var certificates = Certificate.toArray(jsonArr[0]);
                    if (certificates.length)
                        this.certificate = certificates[0];
                    this.projectSubmits = ProjectSubmission.toArray(jsonArr[1]);
                    this.examRecords = ExamRecord.toArray(jsonArr[2]);
                    CourseLog.memberStudyActivity(this, this.member.id, this.member.course_id)
                        .subscribe(logs => {
                            this.computeCourseStats(logs);
                        });
                });
            });
        });
    }

    computeCourseStats(logs: CourseLog[]) {
        var record = {};
        record["total_unit"] = this.course.unit_count;
        var result = this.reportUtils.analyzeCourseMemberActivity(logs);
        if (result[0] != Infinity)
            record["first_attempt"] = this.datePipe.transform(result[0], EXPORT_DATETIME_FORMAT);
        if (result[1] != Infinity)
            record["last_attempt"] = this.datePipe.transform(result[1], EXPORT_DATETIME_FORMAT);
        record["time_spent"] = this.timePipe.transform(+result[2], 'min');
        if (this.course.unit_count)
            record["complete_percent"] = Math.floor(+result[3] * 100 / +this.course.unit_count);
        else
            record["complete_percent"] = 0;
        record["complete_unit"] = +result[3];
        this.stats.push(record);
    }


    getExamRecord(exam: Exam) {
        return _.find(this.examRecords, (record: ExamRecord) => {
            return record.exam_id == exam.id;
        }) || new ExamRecord();
    }

    getProjectSubmit(project: Project) {
        return _.find(this.projectSubmits, (submit: ProjectSubmission) => {
            return submit.project_id == project.id;
        }) || new ProjectSubmission();
    }

}

