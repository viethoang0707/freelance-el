"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var ReportUtils = (function () {
    function ReportUtils() {
    }
    ReportUtils.prototype.createRowGroupMetaData = function (records, key) {
        var rowGroupMetadata = {};
        if (records) {
            for (var i = 0; i < records.length; i++) {
                var rowData = records[i];
                var value = rowData[key];
                if (i == 0) {
                    rowGroupMetadata[value] = { index: 0, size: 1 };
                }
                else {
                    var previousRowData = records[i - 1];
                    var previousRowGroup = previousRowData[key];
                    if (value === previousRowGroup)
                        rowGroupMetadata[value].size++;
                    else
                        rowGroupMetadata[value] = { index: i, size: 1 };
                }
            }
        }
        return rowGroupMetadata;
    };
    ReportUtils.prototype.analyzeCourseMemberActivity = function (logs) {
        var onTime = 0;
        var startCourseUnitLogs = _.filter(logs, function (log) {
            return log.start != null && log.code == 'START_COURSE_UNIT';
        });
        var endCourseUnitLogs = _.filter(logs, function (log) {
            return log.start != null && log.code == 'COMPLETE_COURSE_UNIT';
        });
        var first_attempt = _.min(startCourseUnitLogs, function (log) {
            return log.start.getTime();
        });
        var last_attempt = _.max(endCourseUnitLogs, function (log) {
            return log.start.getTime();
        });
        var timeforunit = 0;
        if (first_attempt && last_attempt && startCourseUnitLogs.length && endCourseUnitLogs.length)
            timeforunit = last_attempt.start.getTime() - first_attempt.start.getTime();
        var unitCount = 0;
        var unitLogs = {};
        _.each(logs, function (log) {
            if (log.code == 'COMPLETE_COURSE_UNIT') {
                onTime += log.start.getTime();
                unitLogs[log.id] = unitLogs[log.id] ? unitLogs[log.id] + 1 : 1;
            }
            if (unitLogs[log.id] == 1)
                unitCount++;
        });
        return [first_attempt.start, last_attempt.start, timeforunit, unitCount];
    };
    ReportUtils.prototype.analyzeExamMemberActivity = function (logs) {
        var onTime = 0;
        var startCourseUnitLogs = _.filter(logs, function (log) {
            return log.start && log.code == 'START_EXAM';
        });
        var endCourseUnitLogs = _.filter(logs, function (log) {
            return log.start && log.code == 'FINISH_EXAM';
        });
        var first_attempt = _.min(startCourseUnitLogs, function (log) {
            return log.start.getTime();
        });
        var last_attempt = _.max(startCourseUnitLogs, function (log) {
            return log.start.getTime();
        });
        _.each(logs, function (log) {
            if (log.code == 'FINISH_EXAM')
                onTime += log.start.getTime();
            if (log.code == 'START_EXAM')
                onTime -= log.start.getTime();
        });
        return [first_attempt.start, last_attempt.start, onTime];
    };
    ReportUtils.prototype.analyseCourseMember = function (course, members) {
        var record = {};
        var studentMembers = _.filter(members, function (member) {
            return member.role == 'student';
        });
        var registeredMembers = _.filter(studentMembers, function (member) {
            return member.enroll_status == 'registered';
        });
        var inprogressMembers = _.filter(studentMembers, function (member) {
            return member.enroll_status == 'in-study';
        });
        var completededMembers = _.filter(studentMembers, function (member) {
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
    };
    ReportUtils.prototype.analyseExamMember = function (exam, members) {
        var record = {};
        record["total_member"] = members.length;
        var candidateMembers = _.filter(members, function (member) {
            return member.role == 'candidate';
        });
        var registeredMembers = _.filter(candidateMembers, function (member) {
            return member.enroll_status == 'registered';
        });
        var inprogressMembers = _.filter(candidateMembers, function (member) {
            return member.enroll_status == 'in-study';
        });
        var completededMembers = _.filter(candidateMembers, function (member) {
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
    };
    ReportUtils.prototype.analyseSurveyMember = function (survey, members) {
        var record = {};
        record["total_member"] = members.length;
        var registeredMembers = _.filter(members, function (member) {
            return member.enroll_status == 'registered';
        });
        var inprogressMembers = _.filter(members, function (member) {
            return member.enroll_status == 'in-study';
        });
        var completededMembers = _.filter(members, function (member) {
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
    };
    return ReportUtils;
}());
exports.ReportUtils = ReportUtils;
