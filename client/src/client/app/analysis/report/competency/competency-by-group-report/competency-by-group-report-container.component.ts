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
import { CompetencyByGroupReportComponent } from './competency-by-group-report.component';

@Component({
    moduleId: module.id,
    selector: 'competency-by-group-report-container',
	templateUrl: 'competency-by-group-report-container.component.html',
})
@Report({
    title:'Competency by group report',
    category:REPORT_CATEGORY.COMPETENCY
})
export class CompetencyByGroupReportContainerComponent extends BaseComponent{

    GROUP_CATEGORY =  GROUP_CATEGORY;

    private groups: Group[];
    private competency: Competency;

	@ViewChild(SelectMultiGroupDialog) groupDialog: SelectMultiGroupDialog;
    @ViewChild(SelectCompetencyDialog) competencyDialog: SelectCompetencyDialog;
    @ViewChild(CompetencyByGroupReportComponent) competencyReport:CompetencyByGroupReportComponent;
    
    
    constructor() {
        super();
    }

    export() {
    	this.competencyReport.export();
    }

    selectGroups() {
    	this.groupDialog.show();
    	this.groupDialog.onSelectGroups.subscribe((groups:Group[]) => {
            this.groups = groups;
    		if (this.competency && this,groups.length) {
                this.competencyReport.clear();
                this.competencyReport.render(this.competency, this.groups);
            }
    	});
    }

    selectCompetency() {
    	this.competencyDialog.show();
    	this.competencyDialog.onSelectCompetency.subscribe((competency: Competency) => {
			this.competency = competency;
            if (this.competency && this.groups.length) {
                this.competencyReport.clear();
                this.competencyReport.render(this.competency, this.groups);
            }
		});
    }

}
