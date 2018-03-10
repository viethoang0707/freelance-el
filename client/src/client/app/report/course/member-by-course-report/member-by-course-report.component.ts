import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import { Course } from '../../../shared/models/course.model';
import { UserLog } from '../../../shared/models/log.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectCoursesDialog } from '../../../shared/components/select-course-dialog/select-course-dialog.component';
import { TimeConvertPipe} from '../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../shared/services/excel.service';

@Component({
    moduleId: module.id,
    selector: 'etraining-member-by-course-report',
    templateUrl: 'member-by-course-report.component.html',
})
@Report({
    title:'Member by course report',
    category:REPORT_CATEGORY.COURSE
})
export class MemberByCourseReportComponent extends BaseComponent{

    @ViewChild(SelectGroupDialog) groupDialog : SelectGroupDialog;
    @ViewChild(SelectCoursesDialog) courseDialog : SelectCoursesDialog;
	records: any;
	summary: any;
	GROUP_CATEGORY =  GROUP_CATEGORY;

    constructor(private reportUtils: ReportUtils, private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
        super();
        this.records = [];
        this.summary =  this.generateReportFooter(this.records);
    }

    export() {
    	var header = [
    		this.translateService.instant('Course code'),
    		this.translateService.instant('Course name'),
    		this.translateService.instant('Total'),
    		this.translateService.instant('Total registered'),
    		this.translateService.instant('Percentage registered'),
    		this.translateService.instant('Total in-progress'),
    		this.translateService.instant('Percentage in-progress'),
    		this.translateService.instant('Total completed'),
    		this.translateService.instant('Percentage completed'),
    		this.translateService.instant('Time'),
    	]
    	this.excelService.exportAsExcelFile(header.concat(this.records),'course_by_member_report');
    }

    selectCourseGroup() {
    	this.groupDialog.show();
    	this.groupDialog.onSelectGroup.subscribe((group:Group) => {
    		this.summary = {};
    		Course.listByGroup(this, group.id).subscribe((courses:Course[]) => {
    			this.generateReport(courses).subscribe(records => {
					this.records = records;
					this.summary =  this.generateReportFooter(records);
				});
    		});
    	});
    }

    selectIndividualCourses() {
    	this.courseDialog.show();
    	this.courseDialog.onSelectCourses.subscribe((courses:Course[]) => {
			this.generateReport(courses).subscribe(records => {
				this.records = records;
				this.summary =  this.generateReportFooter(records);
			});
		});
    }

    generateReport(courses:Course[]):Observable<any> {
    	var self = this;
    	var subscriptions =[];
    	_.each(courses, (course:Course)=> {
    		var subscription = CourseMember.listByCourse(self, course.id).flatMap(members => {
    			return UserLog.courseActivity(self, course.id).map(logs => {
    				return self.generateReportRow(course, members, logs);
	    		});
    		});	
    		subscriptions.push(subscription);	
    	});		
    	return Observable.zip(...subscriptions);
    }

    generateReportRow(course: Course, members: CourseMember[], logs: UserLog[]):any {
    	var record = {};
	    record["course_name"] = course.name;
	    record["course_code"] = course.code;
	    record["total_member"] = members.length;
	    var registeredMembers = _.filter(members, (member:CourseMember)=> {
	    	return member.enroll_status == 'registered';
	    });
	    var inprogressMembers = _.filter(members, (member:CourseMember)=> {
	    	return member.enroll_status == 'in-study';
	    });
	    var completededMembers = _.filter(members, (member:CourseMember)=> {
	    	return member.enroll_status == 'completed';
	    });
	    record["total_member_registered"] = registeredMembers.length;
	    record["percentage_member_registered"] = members.length ? Math.floor(registeredMembers.length/members.length*100):0;
	    record["total_member_inprogress"] = inprogressMembers.length;
	    record["percentage_member_inprogress"] = members.length ? Math.floor(inprogressMembers.length/members.length*100):0;
	    record["total_member_completed"] = completededMembers.length;
	    record["percentage_member_completed"] = members.length ? Math.floor(completededMembers.length/members.length*100):0;
	    var result = this.reportUtils.analyzeCourseActivity(logs);
	    record["time_spent"] =  this.timePipe.transform(+result[2],'min');
	    return record;
    }

    generateReportFooter(records:any) {
    	var summary = {
    		total_member:records.length,
    		total_member_registered:0,
    		percentage_member_registered:0,
    		total_member_inprogress:0,
    		percentage_member_inprogress:0,
    		total_member_completed:0,
    		percentage_member_completed:0,
    		time_spent:0
    	};
    	_.each(records, (record)=> {
    		_.each(summary, (key)=> {
    			summary[key] += record[key]
    		});
    	});
    	return summary;
    }

}
