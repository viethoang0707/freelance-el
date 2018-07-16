"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var base_component_1 = require("../../shared/components/base/base.component");
var meeting_service_1 = require("../../shared/services/meeting.service");
var constants_1 = require("../../shared/models/constants");
var course_syllabus_dialog_component_1 = require("../../cms/course/course-syllabus/course-syllabus.dialog.component");
var exam_content_dialog_component_1 = require("../../cms/exam/content-dialog/exam-content.dialog.component");
var exam_study_dialog_component_1 = require("../../lms/exam/exam-study/exam-study.dialog.component");
var survey_study_dialog_component_1 = require("../../lms/survey/survey-study/survey-study.dialog.component");
var course_publish_dialog_component_1 = require("../../cms/course/course-publish/course-publish.dialog.component");
var _ = require("underscore");
var UserDashboardComponent = (function (_super) {
    __extends(UserDashboardComponent, _super);
    function UserDashboardComponent(meetingSerivce, router) {
        var _this = _super.call(this) || this;
        _this.meetingSerivce = meetingSerivce;
        _this.router = router;
        _this.CONFERENCE_STATUS = constants_1.CONFERENCE_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.conferenceMembers = [];
        _this.exams = [];
        _this.courses = [];
        _this.events = [];
        _this.header = constants_1.SCHEDULER_HEADER;
        return _this;
    }
    UserDashboardComponent.prototype.displayCourses = function (courses) {
        var _this = this;
        _.each(courses, function (course) {
            course['student'] = _this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] = _this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] = _this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] = _this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
            if (course['supervisor'])
                course['teacher'] = course['editor'] = course['supervisor'];
        });
        this.courses = _.sortBy(courses, function (course) {
            return -_this.lmsProfileService.getLastCourseTimestamp(course);
        });
        var classList = this.lmsProfileService.MyClasses;
        _.each(classList, function (clazz) {
            if (clazz.IsAvailable)
                _this.events.push({
                    title: clazz.name,
                    start: clazz.start,
                    end: clazz.end,
                    id: clazz.id,
                    allDay: true
                });
        });
    };
    UserDashboardComponent.prototype.displayExams = function (exams) {
        var _this = this;
        _.each(exams, function (exam) {
            exam['candidate'] = _this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = _this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = _this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam['supervisor'])
                exam['editor'] = exam['supervisor'];
            if (exam.IsAvailable)
                _this.events.push({
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                });
        });
        exams.sort(function (exam1, exam2) {
            return _this.lmsProfileService.getLastExamTimestamp(exam2) - _this.lmsProfileService.getLastExamTimestamp(exam1);
        });
        this.exams = exams;
    };
    UserDashboardComponent.prototype.displayConferences = function (conferenceMembers) {
        var _this = this;
        conferenceMembers = _.sortBy(conferenceMembers, function (member) {
            return -_this.lmsProfileService.getLastConferenceTimestamp(member);
        });
        this.conferenceMembers = conferenceMembers;
    };
    UserDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var courses = _this.lmsProfileService.MyCourses;
            var exams = _this.lmsProfileService.MyExams;
            var conferenceMembers = _this.lmsProfileService.MyConferenceMembers;
            _this.displayCourses(courses);
            _this.displayExams(exams);
            _this.displayConferences(conferenceMembers);
        });
    };
    UserDashboardComponent.prototype.joinConference = function (conference, member) {
        if (member.is_active)
            this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    };
    UserDashboardComponent.prototype.studyCourse = function (course, member) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    };
    UserDashboardComponent.prototype.viewCourse = function (course) {
        this.router.navigate(['/lms/courses/view', course.id]);
    };
    UserDashboardComponent.prototype.editSyllabus = function (course, member) {
        this.router.navigate(['/lms/courses/edit', course.id, member.id]);
    };
    UserDashboardComponent.prototype.publishCourse = function (course) {
        this.publisiDialog.show(course);
    };
    UserDashboardComponent.prototype.manageCourse = function (course, member) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
    };
    UserDashboardComponent.prototype.manageExam = function (exam, member) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    };
    UserDashboardComponent.prototype.editExamContent = function (exam) {
        this.examContentDialog.show(exam);
    };
    UserDashboardComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        this.confirm('Are you sure to start ?', function () {
            _this.examStudyDialog.show(exam, member);
        });
    };
    UserDashboardComponent.prototype.publishExam = function (exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    };
    UserDashboardComponent.prototype.unpublishExam = function (exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    };
    __decorate([
        core_1.ViewChild(course_syllabus_dialog_component_1.CourseSyllabusDialog),
        __metadata("design:type", course_syllabus_dialog_component_1.CourseSyllabusDialog)
    ], UserDashboardComponent.prototype, "syllabusDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], UserDashboardComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_study_dialog_component_1.ExamStudyDialog),
        __metadata("design:type", exam_study_dialog_component_1.ExamStudyDialog)
    ], UserDashboardComponent.prototype, "examStudyDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_study_dialog_component_1.SurveyStudyDialog),
        __metadata("design:type", survey_study_dialog_component_1.SurveyStudyDialog)
    ], UserDashboardComponent.prototype, "surveyStudyDialog", void 0);
    __decorate([
        core_1.ViewChild(course_publish_dialog_component_1.CoursePublishDialog),
        __metadata("design:type", course_publish_dialog_component_1.CoursePublishDialog)
    ], UserDashboardComponent.prototype, "publisiDialog", void 0);
    UserDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-dashboard',
            templateUrl: 'user-dashboard.component.html',
            styleUrls: ['user-dashboard.component.css'],
        }),
        __metadata("design:paramtypes", [meeting_service_1.MeetingService, router_1.Router])
    ], UserDashboardComponent);
    return UserDashboardComponent;
}(base_component_1.BaseComponent));
exports.UserDashboardComponent = UserDashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvdXNlci1kYXNoYm9hcmQvdXNlci1kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF1RjtBQUd2RiwwQ0FBeUM7QUFDekMsOEVBQTRFO0FBUzVFLHlFQUF1RTtBQUV2RSwyREFBNkg7QUFHN0gsc0hBQXlHO0FBR3pHLDZHQUFnRztBQUNoRyxxR0FBd0Y7QUFLeEYsNkdBQWdHO0FBRWhHLG1IQUFzRztBQUV0Ryw4QkFBZ0M7QUFTaEM7SUFBNEMsMENBQWE7SUFrQnJELGdDQUFvQixjQUE4QixFQUFVLE1BQWM7UUFBMUUsWUFDSSxpQkFBTyxTQU1WO1FBUG1CLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFlBQU0sR0FBTixNQUFNLENBQVE7UUFoQjFFLHVCQUFpQixHQUFHLDZCQUFpQixDQUFDO1FBQ3RDLGlCQUFXLEdBQUcsdUJBQVcsQ0FBQztRQUMxQixpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFnQnRCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyw0QkFBZ0IsQ0FBQzs7SUFDbkMsQ0FBQztJQUVELCtDQUFjLEdBQWQsVUFBZSxPQUFnQjtRQUEvQixpQkF1QkM7UUF0QkcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxNQUFhO1lBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUksS0FBSSxD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SUFBRCw2QkFBQztDQS9JRCxBQStJQyxDQS9JMkMsOEJBQWEsR0ErSXhEO0FBL0lZLHdEQUFzQiIsImZpbGUiOiJhcHAvZGFzaGJvYXJkL3VzZXItZGFzaGJvYXJkL3VzZXItZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZU1lbWJlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IENvbmZlcmVuY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb25mZXJlbmNlLm1vZGVsJztcbmltcG9ydCB7IE1lZXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL21lZXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgQ09ORkVSRU5DRV9TVEFUVVMsIENPVVJTRV9NT0RFLCBFWEFNX1NUQVRVUywgU0NIRURVTEVSX0hFQURFUiB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzRGlhbG9nIH0gZnJvbSAnLi4vLi4vY21zL2NvdXJzZS9jb3Vyc2Utc3lsbGFidXMvY291cnNlLXN5bGxhYnVzLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlc3Rpb25NYXJraW5nRGlhbG9nIH0gZnJvbSAnLi4vLi4vbG1zL2V4YW0vcXVlc3Rpb24tbWFya2luZy9xdWVzdGlvbi1tYXJraW5nLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQW5zd2VyUHJpbnREaWFsb2cgfSBmcm9tICcuLi8uLi9sbXMvZXhhbS9hbnN3ZXItcHJpbnQvYW5zd2VyLXByaW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbUNvbnRlbnREaWFsb2cgfSBmcm9tICcuLi8uLi9jbXMvZXhhbS9jb250ZW50LWRpYWxvZy9leGFtLWNvbnRlbnQuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtU3R1ZHlEaWFsb2cgfSBmcm9tICcuLi8uLi9sbXMvZXhhbS9leGFtLXN0dWR5L2V4YW0tc3R1ZHkuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlTdHVkeURpYWxvZyB9IGZyb20gJy4uLy4uL2xtcy9zdXJ2ZXkvc3VydmV5LXN0dWR5L3N1cnZleS1zdHVkeS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleU1lbWJlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlUHVibGlzaERpYWxvZyB9IGZyb20gJy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLXB1Ymxpc2gvY291cnNlLXB1Ymxpc2guZGlhbG9nLmNvbXBvbmVudCc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICd1c2VyLWRhc2hib2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICd1c2VyLWRhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3VzZXItZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MnXSxcblxufSlcbmV4cG9ydCBjbGFzcyBVc2VyRGFzaGJvYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBDT05GRVJFTkNFX1NUQVRVUyA9IENPTkZFUkVOQ0VfU1RBVFVTO1xuICAgIENPVVJTRV9NT0RFID0gQ09VUlNFX01PREU7XG4gICAgRVhBTV9TVEFUVVMgPSBFWEFNX1NUQVRVUztcblxuICAgIHByaXZhdGUgY29uZmVyZW5jZU1lbWJlcnM6IENvbmZlcmVuY2VNZW1iZXJbXTtcbiAgICBwcml2YXRlIGNvdXJzZXM6IENvdXJzZVtdO1xuICAgIHByaXZhdGUgZXhhbXM6IEV4YW1bXTtcbiAgICBwcml2YXRlIGhlYWRlcjogYW55O1xuICAgIHByaXZhdGUgZXZlbnRzOiBhbnlbXTtcblxuICAgIEBWaWV3Q2hpbGQoQ291cnNlU3lsbGFidXNEaWFsb2cpIHN5bGxhYnVzRGlhbG9nOiBDb3Vyc2VTeWxsYWJ1c0RpYWxvZztcbiAgICBAVmlld0NoaWxkKEV4YW1Db250ZW50RGlhbG9nKSBleGFtQ29udGVudERpYWxvZzogRXhhbUNvbnRlbnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChFeGFtU3R1ZHlEaWFsb2cpIGV4YW1TdHVkeURpYWxvZzogRXhhbVN0dWR5RGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoU3VydmV5U3R1ZHlEaWFsb2cpIHN1cnZleVN0dWR5RGlhbG9nOiBTdXJ2ZXlTdHVkeURpYWxvZztcbiAgICBAVmlld0NoaWxkKENvdXJzZVB1Ymxpc2hEaWFsb2cpIHB1Ymxpc2lEaWFsb2c6IENvdXJzZVB1Ymxpc2hEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lZXRpbmdTZXJpdmNlOiBNZWV0aW5nU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbmZlcmVuY2VNZW1iZXJzID0gW107XG4gICAgICAgIHRoaXMuZXhhbXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb3Vyc2VzID0gW107XG4gICAgICAgIHRoaXMuZXZlbnRzID0gW107XG4gICAgICAgIHRoaXMuaGVhZGVyID0gU0NIRURVTEVSX0hFQURFUjtcbiAgICB9XG5cbiAgICBkaXNwbGF5Q291cnNlcyhjb3Vyc2VzOkNvdXJzZVtdKSB7XG4gICAgICAgIF8uZWFjaChjb3Vyc2VzLCAoY291cnNlOkNvdXJzZSk9PiB7XG4gICAgICAgICAgICBjb3Vyc2VbJ3N0dWRlbnQnXSA9ICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENvdXJzZU1lbWJlckJ5Um9sZSgnc3R1ZGVudCcsIGNvdXJzZS5pZCk7XG4gICAgICAgICAgICBjb3Vyc2VbJ3RlYWNoZXInXSA9ICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENvdXJzZU1lbWJlckJ5Um9sZSgndGVhY2hlcicsIGNvdXJzZS5pZCk7XG4gICAgICAgICAgICBjb3Vyc2VbJ2VkaXRvciddID0gIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0Q291cnNlTWVtYmVyQnlSb2xlKCdlZGl0b3InLCBjb3Vyc2UuaWQpO1xuICAgICAgICAgICAgY291cnNlWydzdXBlcnZpc29yJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VNZW1iZXJCeVJvbGUoJ3N1cGVydmlzb3InLCBjb3Vyc2UuaWQpO1xuICAgICAgICAgICAgaWYgKGNvdXJzZVsnc3VwZXJ2aXNvciddKVxuICAgICAgICAgICAgICAgIGNvdXJzZVsndGVhY2hlciddID0gIGNvdXJzZVsnZWRpdG9yJ10gPSAgY291cnNlWydzdXBlcnZpc29yJ107XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvdXJzZXMgPSAgXy5zb3J0QnkoY291cnNlcywgKGNvdXJzZTogQ291cnNlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0TGFzdENvdXJzZVRpbWVzdGFtcChjb3Vyc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuTXlDbGFzc2VzO1xuICAgICAgICBfLmVhY2goY2xhc3NMaXN0LCAoY2xheno6Q291cnNlQ2xhc3MpPT4ge1xuICAgICAgICAgICAgaWYgKGNsYXp6LklzQXZhaWxhYmxlKVxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogY2xhenoubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGNsYXp6LnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGNsYXp6LmVuZCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGNsYXp6LmlkLFxuICAgICAgICAgICAgICAgICAgICBhbGxEYXk6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkaXNwbGF5RXhhbXMoZXhhbXM6IEV4YW1bXSkge1xuICAgICAgICBfLmVhY2goZXhhbXMsIChleGFtOkV4YW0pPT4ge1xuICAgICAgICAgICAgZXhhbVsnY2FuZGlkYXRlJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRFeGFtTWVtYmVyQnlSb2xlKCdjYW5kaWRhdGUnLCBleGFtLmlkKTtcbiAgICAgICAgICAgIGV4YW1bJ2VkaXRvciddID0gIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0RXhhbU1lbWJlckJ5Um9sZSgnZWRpdG9yJywgZXhhbS5pZCk7XG4gICAgICAgICAgICBleGFtWydzdXBlcnZpc29yJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRFeGFtTWVtYmVyQnlSb2xlKCdzdXBlcnZpc29yJywgZXhhbS5pZCk7XG4gICAgICAgICAgICBpZiAoZXhhbVsnc3VwZXJ2aXNvciddKVxuICAgICAgICAgICAgICAgIGV4YW1bJ2VkaXRvciddID0gIGV4YW1bJ3N1cGVydmlzb3InXTtcbiAgICAgICAgICAgIGlmIChleGFtLklzQXZhaWxhYmxlKVxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGV4YW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGV4YW0uc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZXhhbS5lbmQsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBleGFtLmlkLFxuICAgICAgICAgICAgICAgICAgICBhbGxEYXk6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4YW1zLnNvcnQoKGV4YW0xOiBFeGFtLCBleGFtMjogRXhhbSk6IGFueSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRMYXN0RXhhbVRpbWVzdGFtcChleGFtMikgLSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldExhc3RFeGFtVGltZXN0YW1wKGV4YW0xKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXhhbXMgPSBleGFtcztcbiAgICB9XG5cbiAgICBkaXNwbGF5Q29uZmVyZW5jZXMoY29uZmVyZW5jZU1lbWJlcnM6IENvbmZlcmVuY2VNZW1iZXJbXSkge1xuICAgICAgICBjb25mZXJlbmNlTWVtYmVycyA9IF8uc29ydEJ5KGNvbmZlcmVuY2VNZW1iZXJzLCAobWVtYmVyOiBDb25mZXJlbmNlTWVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0TGFzdENvbmZlcmVuY2VUaW1lc3RhbXAobWVtYmVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29uZmVyZW5jZU1lbWJlcnMgPSBjb25mZXJlbmNlTWVtYmVycztcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmluaXQodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHZhciBjb3Vyc2VzID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5NeUNvdXJzZXM7XG4gICAgICAgICAgICB2YXIgZXhhbXMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLk15RXhhbXM7XG4gICAgICAgICAgICB2YXIgY29uZmVyZW5jZU1lbWJlcnMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLk15Q29uZmVyZW5jZU1lbWJlcnM7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb3Vyc2VzKGNvdXJzZXMpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXhhbXMoZXhhbXMpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmVyZW5jZXMoY29uZmVyZW5jZU1lbWJlcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBqb2luQ29uZmVyZW5jZShjb25mZXJlbmNlLCBtZW1iZXIpIHtcbiAgICAgICAgaWYgKG1lbWJlci5pc19hY3RpdmUpXG4gICAgICAgICAgICB0aGlzLm1lZXRpbmdTZXJpdmNlLmpvaW4oY29uZmVyZW5jZS5yb29tX3JlZiwgbWVtYmVyLnJvb21fbWVtYmVyX3JlZik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBhcmUgIG5vdCBhbGxvd2VkIHRvIGpvaW4gdGhlIGNvbmZlcmVuY2UnKTtcbiAgICB9XG5cbiAgICBzdHVkeUNvdXJzZShjb3Vyc2U6IENvdXJzZSwgbWVtYmVyOiBDb3Vyc2VNZW1iZXIpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG1zL2NvdXJzZXMvc3R1ZHknLCBjb3Vyc2UuaWQsIG1lbWJlci5pZF0pO1xuICAgIH1cblxuICAgIHZpZXdDb3Vyc2UoY291cnNlOiBDb3Vyc2UpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG1zL2NvdXJzZXMvdmlldycsIGNvdXJzZS5pZF0pO1xuICAgIH1cblxuICAgIGVkaXRTeWxsYWJ1cyhjb3Vyc2U6IENvdXJzZSwgbWVtYmVyOiBDb3Vyc2VNZW1iZXIpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG1zL2NvdXJzZXMvZWRpdCcsIGNvdXJzZS5pZCwgbWVtYmVyLmlkXSk7XG4gICAgfVxuXG4gICAgcHVibGlzaENvdXJzZShjb3Vyc2U6IENvdXJzZSkge1xuICAgICAgICB0aGlzLnB1Ymxpc2lEaWFsb2cuc2hvdyhjb3Vyc2UpO1xuICAgIH1cblxuICAgIG1hbmFnZUNvdXJzZShjb3Vyc2U6IENvdXJzZSwgbWVtYmVyOiBDb3Vyc2VNZW1iZXIpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG1zL2NvdXJzZXMvbWFuYWdlJywgY291cnNlLmlkLCBtZW1iZXIuaWRdKTtcbiAgICB9XG5cbiAgICBtYW5hZ2VFeGFtKGV4YW06IEV4YW0sIG1lbWJlcjogRXhhbU1lbWJlcikge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sbXMvZXhhbXMvbWFuYWdlJywgZXhhbS5pZCwgbWVtYmVyLmlkXSk7XG4gICAgfVxuXG4gICAgZWRpdEV4YW1Db250ZW50KGV4YW06IEV4YW0pIHtcbiAgICAgICAgdGhpcy5leGFtQ29udGVudERpYWxvZy5zaG93KGV4YW0pO1xuICAgIH1cblxuICAgIHN0YXJ0RXhhbShleGFtOiBFeGFtLCBtZW1iZXI6IEV4YW1NZW1iZXIpIHtcbiAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gc3RhcnQgPycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhhbVN0dWR5RGlhbG9nLnNob3coZXhhbSwgbWVtYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGlzaEV4YW0oZXhhbTpFeGFtKSB7XG4gICAgICAgIGV4YW0uc2hlZXRfc3RhdHVzID0gJ3B1Ymxpc2hlZCc7XG4gICAgICAgIGV4YW0uc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB1bnB1Ymxpc2hFeGFtKGV4YW06RXhhbSkge1xuICAgICAgICBleGFtLnNoZWV0X3N0YXR1cyA9ICd1bnB1Ymxpc2hlZCc7XG4gICAgICAgIGV4YW0uc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICB9XG59Il19
