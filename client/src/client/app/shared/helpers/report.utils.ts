import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/elearning/group.model';
import { Course } from '../models/elearning/course.model';
import { CourseMember } from '../models/elearning/course-member.model';
import { Exam } from '../models/elearning/exam.model';
import { ExamMember } from '../models/elearning/exam-member.model';
import { ExamLog, CourseLog } from '../models/elearning/log.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

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

	analyzeCourseActivity(logs: CourseLog[]):any {
		var onTime = 0;
		var startCourseUnitLogs = _.filter(logs, (log)=> {
			return log.start!=null && log.code =='START_COURSE_UNIT';
		});
		var endCourseUnitLogs = _.filter(logs, (log)=> {
			return log.start!=null && log.code =='COMPLETE_COURSE_UNIT';
		});
		var first_attempt = _.min(startCourseUnitLogs, (log)=> {
			return log.start.getTime();
		});
		var last_attempt = _.max(endCourseUnitLogs, (log)=> {
			return log.start.getTime();
		});

		var last_attempt_millis = new Date(last_attempt.start).getTime();
		var first_attempt_millis = new Date(first_attempt.start).getTime();
		var timeforunit = last_attempt_millis - first_attempt_millis;

		var unitCount  = 0;
		var unitLogs = {}
		_.each(logs, (log)=> {
			if (log.code == 'COMPLETE_COURSE_UNIT') {
				onTime += log.start.getTime();
				unitLogs[log.id] = unitLogs[log.id]?unitLogs[log.id]+1:1;
			}

			if (unitLogs[log.id] && unitLogs[log.id]>=2)
				unitCount++;
		});

		return [first_attempt.start, last_attempt.start, timeforunit, unitCount];
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
		return [first_attempt.start, last_attempt.start, onTime];
	}

	analyseCourseMember(course: Course, members: CourseMember[]):any {
		var record = {};
		
		var studentMembers = _.filter(members, (member: CourseMember)=> {
			return member.role == 'student';
		});

	    var registeredMembers = _.filter(studentMembers, (member:CourseMember)=> {
	    	return member.enroll_status == 'registered';
	    });
	    var inprogressMembers = _.filter(studentMembers, (member:CourseMember)=> {
	    	return member.enroll_status == 'in-study';
	    });
	    var completededMembers = _.filter(studentMembers, (member:CourseMember)=> {
	    	return member.enroll_status == 'completed';
		});
		record["total_member"] = members.length;
		record["total_member_student"] = studentMembers.length;
	    record["total_member_registered"] = registeredMembers.length;
	    record["percentage_member_registered"] = studentMembers.length ? Math.floor(registeredMembers.length/studentMembers.length*100):0;
	    record["total_member_inprogress"] = inprogressMembers.length;
	    record["percentage_member_inprogress"] = studentMembers.length ? Math.floor(inprogressMembers.length/studentMembers.length*100):0;
	    record["total_member_completed"] = completededMembers.length;
	    record["percentage_member_completed"] = studentMembers.length ? Math.floor(completededMembers.length/studentMembers.length*100):0;
	    return record;
    }

    analyseExamMember(exam: Exam, members: ExamMember[]):any {
		var record = {};
		record["total_member"] = members.length;

		var candidateMembers = _.filter(members, (member: ExamMember)=> {
			return member.role == 'candidate';
		});

	    var registeredMembers = _.filter(candidateMembers, (member:ExamMember)=> {
	    	return member.enroll_status == 'registered';
	    });
	    var inprogressMembers = _.filter(candidateMembers, (member:ExamMember)=> {
	    	return member.enroll_status == 'in-study';
	    });
	    var completededMembers = _.filter(candidateMembers, (member:ExamMember)=> {
	    	return member.enroll_status == 'completed';
		});
		
		record["total_member_candidate"] = candidateMembers.length;
	    record["total_member_registered"] = registeredMembers.length;
	    record["percentage_member_registered"] = candidateMembers.length ? Math.floor(registeredMembers.length/candidateMembers.length*100):0;
	    record["total_member_inprogress"] = inprogressMembers.length;
	    record["percentage_member_inprogress"] = candidateMembers.length ? Math.floor(inprogressMembers.length/candidateMembers.length*100):0;
	    record["total_member_completed"] = completededMembers.length;
	    record["percentage_member_completed"] = candidateMembers.length ? Math.floor(completededMembers.length/candidateMembers.length*100):0;
	    return record;
    }

}
