import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../../shared/services/api.service';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Group } from '../../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { CourseLog } from '../../../../shared/models/elearning/log.model';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseModel } from '../../../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'course-by-member-report',
	templateUrl: 'course-by-member-report.component.html',
	styleUrls: ['course-by-member-report.component.css'],
})

export class CourseByMemberReportComponent extends BaseComponent implements OnInit {

	GROUP_CATEGORY = GROUP_CATEGORY;
    COURSE_MODE = COURSE_MODE;
    COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

	private records: any;
	private rowGroupMetadata: any;
    private reportUtils: ReportUtils;

    @ViewChild(SelectGroupDialog) groupDialog: SelectGroupDialog;
	@ViewChild(SelectUsersDialog) userDialog: SelectUsersDialog;

	constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
		this.reportUtils = new ReportUtils();
	}

	ngOnInit() {
		this.updateRowGroupMetaData();
	}

	clear() {
		this.records = [];
	}

	onSort() {
		this.updateRowGroupMetaData();
	}

	updateRowGroupMetaData() {
		this.rowGroupMetadata = {};
		if (this.records) {
			for (let i = 0; i < this.records.length; i++) {
				let rowData = this.records[i];
				let brand = rowData.user_login;
				if (i == 0) {
					this.rowGroupMetadata[brand] = { index: 0, size: 1 };
				}
				else {
					let previousRowData = this.records[i - 1];
					let previousRowGroup = previousRowData.brand;
					if (brand === previousRowGroup)
						this.rowGroupMetadata[brand].size++;
					else
						this.rowGroupMetadata[brand] = { index: i, size: 1 };
				}
			}
		}
	}

	export() {
		var output = [];
		this.records.forEach(record => {
			var course = { 'User login': record['user_login'], 'User name': record['user_name'], 'Course name': record['course_name'], 'Course mode': record['course_mode'], 'Course code': record['course_code'], 'Enroll status': record['enroll_status'], 'Date register': record['date_register'], 'First attempt': record['first_attempt'], 'Last attempt': record['last_attempt'], 'Time spent': '' };
			output.push(course);
		});
		this.excelService.exportAsExcelFile(output, 'course_by_member_report');
	}


	render(users: User[]) {
		this.generateReport(users);
	}

	generateReport(users: User[]) {
		this.records = [];
		var apiList = [];
		for (var i=0;i<users.length; i++) {
			apiList.push(CourseMember.__api__listByUser(users[i].id));
			apiList.push(CourseLog.__api__userStudyActivity(users[i].id,null));
		};
		BaseModel.bulk_search(this, ...apiList).subscribe(jsonArr => {
			for (var i=0;i<users.length; i++) {
				var members = CourseMember.toArray(jsonArr[2*i])
				var logs = CourseLog.toArray(jsonArr[2*i+1])
				var memberRecords = _.map(members, (member: CourseMember) => {
					var courseLogs = _.filter(logs, (log: CourseLog) => {
						return log.course_id == member.course_id;
					});
					return this.generateReportRow(member, courseLogs);
				});
				memberRecords = memberRecords.filter((memberRecord: any) => {
					return memberRecord.course_code !== '' && memberRecord.course_mode !== '' && memberRecord.course_name !== '';
				});
				this.records = this.records.concat(memberRecords);
			}
			this.rowGroupMetadata = this.reportUtils.createRowGroupMetaData(this.records, "user_login");
			this.records.forEach(record => {
				record.index = this.rowGroupMetadata[record.user_login].index;
				record.size = this.rowGroupMetadata[record.user_login].size;
			});
		});
	}

	generateReportRow(member: CourseMember, logs: CourseLog[]): any {
		var record = {};
		record["user_login"] = member.login;
		record["user_name"] = member.name;
		record["course_name"] = member.course_name;
		record["course_mode"] = member.course_mode;
		record["course_code"] = member.course_code;
		record["enroll_status"] = member.enroll_status;
		record["date_register"] = this.datePipe.transform(member.date_register, EXPORT_DATE_FORMAT);
		var result = this.reportUtils.analyzeCourseMemberActivity(logs);
		if (result[0] != Infinity)
			record["first_attempt"] = this.datePipe.transform(result[0], EXPORT_DATE_FORMAT);
		if (result[1] != Infinity)
			record["last_attempt"] = this.datePipe.transform(result[1], EXPORT_DATE_FORMAT);
		if (!Number.isNaN(result[2]))
			record["time_spent"] = this.timePipe.transform(+(result[2]), 'min');

		return record;
	}

}
