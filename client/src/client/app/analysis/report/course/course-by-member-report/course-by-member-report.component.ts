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

@Component({
	moduleId: module.id,
	selector: 'course-by-member-report',
	templateUrl: 'course-by-member-report.component.html',
	styleUrls: ['course-by-member-report.component.css'],
})
export class CourseByMemberReportComponent extends BaseComponent{

	private records: any;
	private rowGroupMetadata: any;
	GROUP_CATEGORY = GROUP_CATEGORY;
    private reportUtils: ReportUtils;
    COURSE_MODE = COURSE_MODE;
    COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;


	constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
		this.reportUtils = new ReportUtils();
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
    	var header = [
    		this.translateService.instant('Login'),
    		this.translateService.instant('Name'),
    		this.translateService.instant('Course code'),
    		this.translateService.instant('Course name'),
    		this.translateService.instant('Course mode'),
    		this.translateService.instant('Register date'),
    		this.translateService.instant('First attempt'),
    		this.translateService.instant('Last attempt'),
    		this.translateService.instant('Enroll status'),
    		this.translateService.instant('Time spent')
    	]
    	this.excelService.exportAsExcelFile(header.concat(this.records),'course_by_member_report');
    }

    render(users:User[]) {
    	this.startTransaction();
		this.generateReport(users).subscribe(records => {
			this.records = records;
			this.rowGroupMetadata = this.reportUtils.createRowGroupMetaData(this.records,"user_login");
            this.closeTransaction();
		});
	}

	generateReport(users: User[]): Observable<any> {
		var records = [];
		var subscriptions = [];
		_.each(users, (user: User) => {
			var subscription = CourseMember.listByUser(this, user.id).flatMap(members => {
				return CourseLog.userStudyActivity(this, user.id, null).do(logs => {
					var memberRecords = _.map(members, (member: CourseMember) => {
						var courseLogs = _.filter(logs, (log: CourseLog) => {
							return log.course_id == member.course_id;
						});
    					return this.generateReportRow(member, courseLogs);
    				})
    				records = records.concat(memberRecords);
	    		});
    		});	
    		subscriptions.push(subscription);	
    	});		
    	return Observable.forkJoin(...subscriptions).map(()=> {
            return records;
        });
    }

    generateReportRow(member: CourseMember, logs: CourseLog[]):any {

    	var record = {};
		record["user_login"] =  member.login;
	    record["user_name"] = member.name;
	    record["course_name"] = member.course_name;
		record["course_mode"] = member.course_mode;
		record["course_code"] = member.course_code
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
