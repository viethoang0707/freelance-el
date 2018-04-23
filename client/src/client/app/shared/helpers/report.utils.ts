import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/elearning/group.model';
import { ExamLog, CourseLog } from '../models/elearning/log.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportUtils {

	constructor() {
	}

	createRowGroupMetaData(records: any, key: string) {
		var rowGroupMetadata = {};
		if (records) {
			for (let i = 0; i < records.length; i++) {
				let rowData = records[i];
				let value = rowData[key];
				if (i == 0) {
					rowGroupMetadata[value] = { index: 0, size: 1 };
				}
				else {
					let previousRowData = records[i - 1];
					let previousRowGroup = previousRowData[key];
					if (value === previousRowGroup)
						rowGroupMetadata[value].size++;
					else
						rowGroupMetadata[value] = { index: i, size: 1 };
				}
			}
		}
		return rowGroupMetadata;
	}

	analyzeCourseActivity(logs: CourseLog[]) {
		var onTime = 0;
		var startCourseUnitLogs = _.filter(logs, (log)=> {
			return log.start!=null && log.code =='START_UNIT';
		});
		var endCourseUnitLogs = _.filter(logs, (log)=> {
			return log.start!=null && log.code =='FINISH_UNIT';
		});
		var first_attempt = _.min(startCourseUnitLogs, (log)=> {
			return log.start.getTime();
		});
		var last_attempt = _.max(endCourseUnitLogs, (log)=> {
			return log.start.getTime();
		});
		var unitCount  = 0;
		var unitLogs = {}
		_.each(logs, (log)=> {
			if (log.code == 'FINISH_COURSE_UNIT') {
				onTime += log.start.getTime();
				unitLogs[log.id] = unitLogs[log.id]?unitLogs[log.id]+1:1;
			}
			if (log.code == 'START_COURSE_UNIT') {
				onTime -= log.start.getTime();
				unitLogs[log.id] = unitLogs[log.id]?unitLogs[log.id]+1:1;
			}
			if (unitLogs[log.id] && unitLogs[log.id]>=2)
				unitCount++;
		});

		return [first_attempt, last_attempt, onTime, unitCount];
	}

	analyzeExamActivity(logs: ExamLog[]) {
		var onTime = 0;
		var startCourseUnitLogs = _.filter(logs, (log)=> {
			return log.start && log.code =='START_EXAM';
		});
		var endCourseUnitLogs = _.filter(logs, (log)=> {
			return log.start && log.code =='FINISH_EXAM';
		});
		var first_attempt = _.min(startCourseUnitLogs, (log)=> {
			return log.start.getTime();
		});
		var last_attempt = _.max(startCourseUnitLogs, (log)=> {
			return log.start.getTime();
		});
		_.each(logs, (log)=> {
			if (log.code == 'FINISH_EXAM')
				onTime += log.start.getTime();
			if (log.code == 'START_EXAM')
				onTime -= log.start.getTime();
		});
		return [first_attempt, last_attempt, onTime];
	}

	analyseCourseMember(course: Course, members: CourseMember[]):any {
		var record = {};
		record["total_member"] = members.length;

		var studentMembers = _.filter(members, (member: CourseMember)=> {
			return member.role == 'student';
		});

	    var registeredMembers = _.filter(members, (member:CourseMember)=> {
	    	return member.enroll_status == 'registered';
	    });
	    var inprogressMembers = _.filter(members, (member:CourseMember)=> {
	    	return member.enroll_status == 'in-study';
	    });
	    var completededMembers = _.filter(members, (member:CourseMember)=> {
	    	return member.enroll_status == 'completed';
		});
		
		record["total_member_student"] = studentMembers.length;
	    record["total_member_registered"] = registeredMembers.length;
	    record["percentage_member_registered"] = members.length ? Math.floor(registeredMembers.length/members.length*100):0;
	    record["total_member_inprogress"] = inprogressMembers.length;
	    record["percentage_member_inprogress"] = members.length ? Math.floor(inprogressMembers.length/members.length*100):0;
	    record["total_member_completed"] = completededMembers.length;
	    record["percentage_member_completed"] = members.length ? Math.floor(completededMembers.length/members.length*100):0;
	    return record;
    }

}
