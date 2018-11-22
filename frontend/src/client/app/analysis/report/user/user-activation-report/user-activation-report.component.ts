import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Group } from '../../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { CourseLog } from '../../../../shared/models/elearning/log.model';
import { Competency } from '../../../../shared/models/elearning/competency.model';
import { CompetencyLevel } from '../../../../shared/models/elearning/competency-level.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseModel } from '../../../../shared/models/base.model';
import { Achivement } from '../../../../shared/models/elearning/achievement.model';

const USER_FIELDS = ['name', 'login','email', 'position', 'phone', 'group_name','banned', 'create_date']

@Component({
	moduleId: module.id,
	selector: 'user-activation-report',
	templateUrl: 'user-activation-report.component.html',
	styleUrls: ['user-activation-report.component.css'],
})

export class UserActivationReportComponent extends BaseComponent implements OnInit {

	private records: any;
	private reportTitle: string;

	constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
	}

	ngOnInit() {
	}

	clear() {
		this.records = [];
	}

	export() {

		var output = _.map(this.records, record => {
			return {
				'Name': record['name'],
				'Login': record['login'],
				'Email': record['email'],
				'Position': record['position'],
				'Phone': record['phone'],
				'Group': record['group_name'],
				'Banned': record['banned'],
				'Create date': record['create_date']
			};
		});
		this.excelService.exportAsExcelFile(output, 'user_activation_report');
	}

	render(start: Date, end:Date) {
		this.clear();
		User.searchActivationByDate(this, start, end).subscribe(users=> {
			this.records =  users;
		});
		this.reportTitle = `${this.translateService.instant('User activation report')} from ${start} to ${end}`;
	}

}
