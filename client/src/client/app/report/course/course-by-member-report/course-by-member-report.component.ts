import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import { UserLog } from '../../../shared/models/log.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe} from '../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../shared/services/excel.service';

@Component({
    moduleId: module.id,
    selector: 'etraining-course-by-member-report',
    templateUrl: 'course-by-member-report.component.html',
})
@Report({
    title:'Course by member report',
    category:REPORT_CATEGORY.COURSE
})
export class CourseByMemberReportComponent extends BaseComponent{

	@ViewChild(SelectGroupDialog) groupDialog : SelectGroupDialog;
	@ViewChild(SelectUsersDialog) userDialog : SelectUsersDialog;
	records: any;
	rowGroupMetadata: any;
	GROUP_CATEGORY = GROUP_CATEGORY;

    constructor(private reportUtils: ReportUtils, private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
        super();
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

    selectUserGroup() {
    	this.groupDialog.show();
    	this.groupDialog.onSelectGroup.subscribe((group:Group) => {
    		User.listByGroup(this, group.id).subscribe(users => {
    			this.generateReport(users).subscribe(records => {
					this.records = records;
					this.rowGroupMetadata = this.reportUtils.createRowGroupMetaData(this.records,"user_login");
				});
    		});
    	});
    }

    selectIndividualUsers() {
    	this.userDialog.show();
    	this.userDialog.onSelectUsers.subscribe((users:User[]) => {
			this.generateReport(users).subscribe(records => {
				this.records = records;
				this.rowGroupMetadata = this.reportUtils.createRowGroupMetaData(this.records,"user_login");
			});
		});
    }

    generateReport(users:User[]):Observable<any> {
    	var records = [];
    	var subscriptions =[];
    	_.each(users, (user:User)=> {
    		var subscription = CourseMember.listByUser(this, user.id).flatMap(members => {
    			return UserLog.userStudyActivity(this, user.id,null).do(logs => {
    				var memberRecords = _.map(members, (member:CourseMember)=> {
    					return this.generateReportRow(member, logs);
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

    generateReportRow(member: CourseMember, logs: UserLog[]):any {
    	var record = {};
	    record["user_login"] =  member.login;
	    record["user_name"] = member.name;
	    record["course_name"] = member.course_name;
	    record["course_mode"] = this.translateService.instant(COURSE_MODE[member.course_mode]);
	    record["course_code"] = this.translateService.instant(COURSE_MODE[member.course_code]);
	    record["enroll_status"] = this.translateService.instant(COURSE_MEMBER_ENROLL_STATUS[member.enroll_status]);
	    record["first_attempt"] =  this.datePipe.transform(member.date_register,EXPORT_DATETIME_FORMAT);
	    var result = this.reportUtils.analyzeCourseActivity(logs);
	    if (result[0] != Infinity)
	    	record["first_attempt"] =  this.datePipe.transform(result[0],EXPORT_DATETIME_FORMAT);
    	if (result[1] != Infinity)
	    	record["last_attempt"] =  this.datePipe.transform(result[1],EXPORT_DATETIME_FORMAT);
	    record["time_spent"] =  this.timePipe.transform(+result[2],'min');
	    return record;
    }

}
