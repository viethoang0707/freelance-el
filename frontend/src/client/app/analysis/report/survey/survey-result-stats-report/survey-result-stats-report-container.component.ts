import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';

import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Survey } from '../../../../shared/models/elearning/survey.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { ExamLog } from '../../../../shared/models/elearning/log.model';
import { ExamGrade } from '../../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../../shared/models/elearning/submission.model';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { SurveyMember } from '../../../../shared/models/elearning/survey-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { SurveyResultStatsReportComponent } from './survey-result-stats-report.component';

const SURVEY_FIELDS = ['name', 'sheet_id', 'supervisor_id', 'supervisor_group_id'];

@Component({
    moduleId: module.id,
    selector: 'survey-result-stats-report-container',
    templateUrl: 'survey-result-stats-report-container.component.html',
})
@Report({
    title:'Survey result statistics report',
    category:REPORT_CATEGORY.SURVEY
})
export class SurveyResultStatsReportContainerComponent extends BaseComponent implements OnInit{

    private surveys: Survey[];
    private selectedSurvey: Survey;
    @ViewChild(SurveyResultStatsReportComponent) statsReport: SurveyResultStatsReportComponent;

    constructor() {
        super();
    }

    ngOnInit() {
    	Survey.all(this, SURVEY_FIELDS).subscribe(surveys => {
    		this.surveys = surveys;
            if (this.ContextPermission.Exist)
                this.ContextPermission.listSubGroupIds(this).subscribe(groupIds=> {
                    this.surveys = _.filter(surveys, (survey:Survey)=> {
                        return survey.supervisor_id == this.ContextUser.id || groupIds.includes(survey.supervisor_group_id);
                    });
                });
    	});
    }

    export() {
    	if (this.selectedSurvey)
            this.statsReport.export();
    }

    selectSurvey() {
    	if (this.selectedSurvey) {
            this.statsReport.clear();
            this.statsReport.render(this.selectedSurvey);
    	}
    }

}
