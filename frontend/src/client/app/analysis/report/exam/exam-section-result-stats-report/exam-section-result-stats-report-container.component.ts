import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Exam } from '../../../../shared/models/elearning/exam.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { ExamLog } from '../../../../shared/models/elearning/log.model';
import { ExamGrade } from '../../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../../shared/models/elearning/submission.model';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { ExamMember } from '../../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { ExamSectionResultStatsReportComponent } from './exam-section-result-stats-report.component';
import { QuestionSheetSection } from '../../../../shared/models/elearning/question_sheet-section.model';

const EXAM_FIELDS = ['name', 'sheet_id', 'supervisor_id', 'supervisor_group_id'];

@Component({
    moduleId: module.id,
    selector: 'exam-section-result-stats-report-container',
    templateUrl: 'exam-section-result-stats-report-container.component.html',
})
@Report({
    title: 'Exam section result statistics report',
    category: REPORT_CATEGORY.EXAM
})
export class ExamSectionResultStatsReportContainerComponent extends BaseComponent implements OnInit {

    private exams: Exam[];
    private selectedExam: Exam;
    private sections: QuestionSheetSection[];
    private selectedSection: QuestionSheetSection;
    @ViewChild(ExamSectionResultStatsReportComponent) statsReport: ExamSectionResultStatsReportComponent;

    constructor() {
        super();
    }

    ngOnInit() {
        Exam.all(this, EXAM_FIELDS).subscribe(exams => {
            this.exams = exams;
            if (this.ContextPermission.Exist)
                this.ContextPermission.listSubGroupIds(this).subscribe(groupIds => {
                    this.exams = _.filter(exams, (exam: Exam) => {
                        return exam.supervisor_id == this.ContextUser.id || groupIds.includes(exam.supervisor_group_id);
                    });
                });
        });
    }

    export() {
        if (this.selectedExam)
            this.statsReport.export();
    }

    selectExam() {
        if (this.selectedExam) {
            this.selectedExam.listSections(this).subscribe(sections => {
                this.sections = sections;
            });
        }
    }

    selectSection() {
        if (this.selectSection) {
            this.statsReport.clear();
            this.statsReport.render(this.selectedExam, this.selectedSection);
        }
    }

}
