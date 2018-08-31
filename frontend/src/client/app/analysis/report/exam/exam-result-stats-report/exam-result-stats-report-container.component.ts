import { Component, Input, OnInit, ViewChild} from '@angular/core';
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
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { ExamResultStatsReportComponent } from './exam-result-stats-report.component';

const EXAM_FIELDS = ['name'];

@Component({
    moduleId: module.id,
    selector: 'exam-result-stats-report-container',
    templateUrl: 'exam-result-stats-report-container.component.html',
})
@Report({
    title:'Exam result statistics report',
    category:REPORT_CATEGORY.EXAM
})
export class ExamResultStatsReportContainerComponent extends BaseComponent implements OnInit{

    private exams: Exam[];
    private selectedExam: Exam;
    @ViewChild(ExamResultStatsReportComponent) statsReport: ExamResultStatsReportComponent;

    constructor() {
        super();
    }

    ngOnInit() {
    	Exam.all(this,EXAM_FIELDS).subscribe(exams => {
    		this.exams = exams;
    	});
    }

    export() {
    	if (this.selectedExam)
            this.statsReport.export();
    }

    selectExam() {
    	if (this.selectedExam) {
            this.statsReport.clear();
            this.selectedExam.populate(this).subscribe(()=> {
                this.statsReport.render(this.selectedExam);
            });
            
    	}
    }

}
