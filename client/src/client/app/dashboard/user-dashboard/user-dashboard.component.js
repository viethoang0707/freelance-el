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
var course_member_model_1 = require("../../shared/models/elearning/course-member.model");
var course_model_1 = require("../../shared/models/elearning/course.model");
var exam_member_model_1 = require("../../shared/models/elearning/exam-member.model");
var exam_question_model_1 = require("../../shared/models/elearning/exam-question.model");
var conference_member_model_1 = require("../../shared/models/elearning/conference-member.model");
var meeting_service_1 = require("../../shared/services/meeting.service");
var constants_1 = require("../../shared/models/constants");
var course_syllabus_model_1 = require("../../shared/models/elearning/course-syllabus.model");
var course_syllabus_dialog_component_1 = require("../../cms/course/course-syllabus/course-syllabus.dialog.component");
var exam_content_dialog_component_1 = require("../../cms/exam/content-dialog/exam-content.dialog.component");
var exam_study_dialog_component_1 = require("../../lms/exam/exam-study/exam-study.dialog.component");
var submission_model_1 = require("../../shared/models/elearning/submission.model");
var base_model_1 = require("../../shared/models/base.model");
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
        _this.courseMembers = [];
        _this.conferenceMembers = [];
        _this.examMembers = [];
        _this.currentUser = _this.authService.UserProfile;
        _this.courses = [];
        return _this;
    }
    UserDashboardComponent.prototype.displayCourses = function () {
        var _this = this;
        this.courseMembers = _.filter(this.courseMembers, function (member) {
            return member.course_id && (member.course_mode == 'self-study' || member.class_id) && member.status == 'active';
        });
        course_member_model_1.CourseMember.populateCourseForArray(this, this.courseMembers).subscribe(function (courses) {
            _this.courses = _this.courses.concat(courses);
            _this.courses = _.uniq(courses, function (course) {
                return course.id;
            });
            _this.courses.sort(function (course1, course2) {
                return (course1.create_date < course2.create_date);
            });
            _.each(_this.courses, function (course) {
                course["student"] = _.find(_this.courseMembers, function (member) {
                    return member.course_id == course.id && member.role == 'student';
                });
                course["teacher"] = _.find(_this.courseMembers, function (member) {
                    return member.course_id == course.id && member.role == 'teacher';
                });
                course["isAuthor"] = course.author_id == _this.currentUser.id;
            });
        });
    };
    UserDashboardComponent.prototype.displayExams = function () {
        var _this = this;
        this.examMembers = _.filter(this.examMembers, (function (member) {
            return member.exam_id && member.status == 'active';
        }));
        var searchApi = _.map(this.examMembers, function (member) {
            return submission_model_1.Submission.__api__byMember(member.id);
        });
        base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [this].concat(searchApi)).map(function (jsonArray) {
            return _.flatten(jsonArray);
        })
            .subscribe(function (submits) {
            _.each(_this.examMembers, function (member) {
                member["submit"] = _.find(submits, function (submit) {
                    return member.id == submit.member_id;
                });
            });
            exam_member_model_1.ExamMember.populateExamForArray(_this, _this.examMembers).subscribe(function () {
                _this.examMembers = _.filter(_this.examMembers, function (member) {
                    return (member.role == 'supervisor' || (member.role == 'candidate' && member.exam.IsAvailable));
                });
                _this.examMembers.sort(function (member1, member2) {
                    return (member1.exam.create_date < member1.exam.create_date);
                });
                var countApi = _.map(_this.examMembers, function (member) {
                    return exam_question_model_1.ExamQuestion.__api__countByExam(member.exam_id);
                });
                base_model_1.BaseModel.bulk_count.apply(base_model_1.BaseModel, [_this].concat(countApi)).map(function (jsonArray) {
                    return _.flatten(jsonArray);
                })
                    .subscribe(function (counts) {
                    for (var i = 0; i < _this.examMembers.length; i++) {
                        _this.examMembers[i]["question_count"] = counts[i];
                    }
                });
            });
        });
    };
    UserDashboardComponent.prototype.displayConferences = function () {
        this.conferenceMembers = _.filter(this.conferenceMembers, function (member) {
            return member.conference_id && member.conference_status == 'open';
        });
        this.courseMembers.sort(function (member1, member2) {
            return member1.create_date < member2.create_date;
        });
        conference_member_model_1.ConferenceMember.populateConferenceForArray(this, this.conferenceMembers).subscribe(function () {
        });
    };
    UserDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        base_model_1.BaseModel.bulk_search(this, course_member_model_1.CourseMember.__api__listByUser(this.currentUser.id), exam_member_model_1.ExamMember.__api__listByUser(this.currentUser.id), conference_member_model_1.ConferenceMember.__api__listByUser(this.currentUser.id), course_model_1.Course.__api__listByAuthor(this.currentUser.id))
            .subscribe(function (jsonArray) {
            _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArray[0]);
            _this.examMembers = exam_member_model_1.ExamMember.toArray(jsonArray[1]);
            _this.conferenceMembers = conference_member_model_1.ConferenceMember.toArray(jsonArray[2]);
            _this.courses = course_model_1.Course.toArray(jsonArray[3]);
            _this.displayCourses();
            _this.displayExams();
            _this.displayConferences();
        });
    };
    UserDashboardComponent.prototype.joinConference = function (member) {
        this.meetingSerivce.join(member.conference.room_ref, member.room_member_ref);
    };
    UserDashboardComponent.prototype.editSyllabus = function (course) {
        var _this = this;
        course_syllabus_model_1.CourseSyllabus.byCourse(this, course.id).subscribe(function (syllabus) {
            _this.syllabusDialog.show(syllabus);
        });
    };
    UserDashboardComponent.prototype.studyCourse = function (course, member) {
        var _this = this;
        if (course.status == 'published') {
            course_syllabus_model_1.CourseSyllabus.byCourse(this, course.id).subscribe(function (syllabus) {
                if (syllabus && syllabus.status == 'published')
                    _this.router.navigate(['/lms/courses/study', course.id, member.id]);
                else
                    _this.error('The course has not been published');
            });
        }
        else {
            this.error('The course has not been published');
        }
    };
    UserDashboardComponent.prototype.manageCourse = function (course, member) {
        var _this = this;
        if (course.status == 'published') {
            course_syllabus_model_1.CourseSyllabus.byCourse(this, course.id).subscribe(function (syllabus) {
                if (syllabus && syllabus.status == 'published')
                    _this.router.navigate(['/lms/courses/manage', course.id]);
                else
                    _this.error('The course has not been published');
            });
        }
        else {
            this.error('The course has not been published');
        }
    };
    UserDashboardComponent.prototype.manageExam = function (exam, member) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    };
    UserDashboardComponent.prototype.editContent = function (exam) {
        this.examContentDialog.show(exam);
    };
    UserDashboardComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        this.confirm('Are you sure to start ?', function () {
            _this.examStudyDialog.show(exam, member);
        });
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
//# sourceMappingURL=user-dashboard.component.js.map