import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Group } from '../../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Competency } from '../../../../shared/models/elearning/competency.model';
import { CourseLog } from '../../../../shared/models/elearning/log.model';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectMultiGroupDialog } from '../../../../shared/components/select-multi-group-dialog/select-multi-group-dialog.component';
import { SelectCompetencyDialog } from '../../../../shared/components/select-competency-dialog/select-competency-dialog.component';
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { UserActivationReportComponent } from './user-activation-report.component';
import {DateUtils } from '../../../../shared/helpers/date.utils';

@Component({
    moduleId: module.id,
    selector: 'user-activation-report-container',
	templateUrl: 'user-activation-report-container.component.html',
})
@Report({
    title:'User activation report',
    category:REPORT_CATEGORY.USER
})

export class UserActivationReportContainerComponent extends BaseComponent{

    GROUP_CATEGORY =  GROUP_CATEGORY;

    private monthYear: any;
    private dateUtils: DateUtils;

    @ViewChild(UserActivationReportComponent) userReport:UserActivationReportComponent;
    
    
    constructor() {
        super();
    }

    export() {
    	this.userReport.export();
    }


    selectMonth() {
        var year = this.monthYear.split('-')[0];
        var month = this.monthYear.split('-')[1];
        var now = new Date();
        now.setMonth(+month-1);
        now.setFullYear(year);
        var dateUtils = new DateUtils();
        this.userReport.render(dateUtils.firstDateOfMonth(now),dateUtils.lastDateOfMonth(now));
    }

}
