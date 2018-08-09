import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/elearning/group.model';
import { Course } from '../models/elearning/course.model';
import { CourseMember } from '../models/elearning/course-member.model';
import { Exam } from '../models/elearning/exam.model';
import { ExamMember } from '../models/elearning/exam-member.model';
import { Survey } from '../models/elearning/survey.model';
import { SurveyMember } from '../models/elearning/survey-member.model';
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

	analyzeCourseMemberActivity(logs: CourseLog[]): any {
		logs = _.sortBy(logs, (log:CourseLog)=> {
			return log.start.getTime();
		});
		var onTime = 0;
		var startCourseUnitLogs = _.filter(logs, (log) => {
			return log.start != null && log.code == 'START_COURSE_UNIT';
		});
		var endCourseUnitLogs = _.filter(logs, (log) => {
			return log.start != null && log.code == 'COMPLETE_COURSE_UNIT';
		});
		var first_attempt = _.min(startCourseUnitLogs, (log) => {
			return log.start.getTime();
		});
		var last_attempt = _.max(endCourseUnitLogs, (log) => {
			return log.start.getTime();
		});
		for (var i=0;i<logs.length;i++) {
			var current = logs[i];
			if (current.code == "START_COURSE_UNIT") {
				if (i +1 < logs.length && logs[i+1].res_id == current.res_id) {
					var next = logs[i+1];
					if (next.code == "STOP_COURSE_UNIT" || next.code =="COMPLETE_COURSE_UNIT") {
						onTime = next.start.getTime() - current.start.getTime();
					}
				}
			}
		}		
		var unitIds = [];
		_.each(logs, (log:CourseLog) => {
			if (log.code == 'COMPLETE_COURSE_UNIT') {
				unitIds.push(log.res_id);
			}
		});
		unitIds = _.uniq(unitIds, (id)=> {
			return id;
		});

		return [first_attempt.start, last_attempt.start, onTime, unitIds.length];
	}

	

	analyzeExamMemberActivity(logs: ExamLog[]) {
		var onTime = 0;
		var startExamLogs = _.filter(logs, (log) => {
			return log.start && log.code == 'START_EXAM';
		});
		var endExamLogs = _.filter(logs, (log) => {
			return log.start && log.code == 'FINISH_EXAM';
		});
		var first_attempt = _.min(startExamLogs, (log) => {
			return log.start.getTime();
		});
		var last_attempt = _.max(endExamLogs, (log) => {
			return log.start.getTime();
		});
		_.each(logs, (log) => {
			if (log.code == 'FINISH_EXAM')
				onTime += log.start.getTime();
			if (log.code == 'START_EXAM')
				onTime -= log.start.getTime();
		});
		if (endExamLogs.length == 0)
			onTime = 0;
		return [first_attempt.start, last_attempt.start, onTime];
	}

	analyseCourseMember(course: Course, members: CourseMember[]): any {
		var record = {};

		var studentMembers = _.filter(members, (member: CourseMember) => {
			return member.role == 'student';
		});

		var registeredMembers = _.filter(studentMembers, (member: CourseMember) => {
			return member.enroll_status == 'registered';
		});
		var inprogressMembers = _.filter(studentMembers, (member: CourseMember) => {
			return member.enroll_status == 'in-study';
		});
		var completededMembers = _.filter(studentMembers, (member: CourseMember) => {
			return member.enroll_status == 'completed';
		});
		record["total_member"] = members.length;
		record["total_member_student"] = studentMembers.length;
		record["total_member_registered"] = registeredMembers.length;
		record["percentage_member_registered"] = studentMembers.length ? Math.floor(registeredMembers.length / studentMembers.length * 100) : 0;
		record["total_member_inprogress"] = inprogressMembers.length;
		record["percentage_member_inprogress"] = studentMembers.length ? Math.floor(inprogressMembers.length / studentMembers.length * 100) : 0;
		record["total_member_completed"] = completededMembers.length;
		record["percentage_member_completed"] = studentMembers.length ? Math.floor(completededMembers.length / studentMembers.length * 100) : 0;
		return record;
	}

	analyseExamMember(exam: Exam, members: ExamMember[]): any {
		var record = {};
		record["total_member"] = members.length;

		var candidateMembers = _.filter(members, (member: ExamMember) => {
			return member.role == 'candidate';
		});

		var registeredMembers = _.filter(candidateMembers, (member: ExamMember) => {
			return member.enroll_status == 'registered';
		});
		var inprogressMembers = _.filter(candidateMembers, (member: ExamMember) => {
			return member.enroll_status == 'in-study';
		});
		var completededMembers = _.filter(candidateMembers, (member: ExamMember) => {
			return member.enroll_status == 'completed';
		});

		record["total_member_candidate"] = candidateMembers.length;
		record["total_member_registered"] = registeredMembers.length;
		record["percentage_member_registered"] = candidateMembers.length ? Math.floor(registeredMembers.length / candidateMembers.length * 100) : 0;
		record["total_member_inprogress"] = inprogressMembers.length;
		record["percentage_member_inprogress"] = candidateMembers.length ? Math.floor(inprogressMembers.length / candidateMembers.length * 100) : 0;
		record["total_member_completed"] = completededMembers.length;
		record["percentage_member_completed"] = candidateMembers.length ? Math.floor(completededMembers.length / candidateMembers.length * 100) : 0;
		return record;
	}

	analyseSurveyMember(survey: Survey, members: SurveyMember[]): any {
		var record = {};
		record["total_member"] = members.length;

		var registeredMembers = _.filter(members, (member: SurveyMember) => {
			return member.enroll_status == 'registered';
		});
		var inprogressMembers = _.filter(members, (member: SurveyMember) => {
			return member.enroll_status == 'in-study';
		});
		var completededMembers = _.filter(members, (member: SurveyMember) => {
			return member.enroll_status == 'completed';
		});

		record["total_member_candidate"] = members.length;
		record["total_member_registered"] = registeredMembers.length;
		record["percentage_member_registered"] = members.length ? Math.floor(registeredMembers.length / members.length * 100) : 0;
		record["total_member_inprogress"] = inprogressMembers.length;
		record["percentage_member_inprogress"] = members.length ? Math.floor(inprogressMembers.length / members.length * 100) : 0;
		record["total_member_completed"] = completededMembers.length;
		record["percentage_member_completed"] = members.length ? Math.floor(completededMembers.length / members.length * 100) : 0;
		return record;
	}

}
