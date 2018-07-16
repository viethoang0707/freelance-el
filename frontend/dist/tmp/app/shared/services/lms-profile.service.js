"use strict";
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
var Rx_1 = require("rxjs/Rx");
var app_event_manager_service_1 = require("./app-event-manager.service");
var setting_service_1 = require("./setting.service");
require("rxjs/add/operator/map");
var course_model_1 = require("../models/elearning/course.model");
var course_member_model_1 = require("../models/elearning/course-member.model");
var _ = require("underscore");
var conference_member_model_1 = require("../models/elearning/conference-member.model");
var conference_model_1 = require("../models/elearning/conference.model");
var course_faq_model_1 = require("../models/elearning/course-faq.model");
var course_material_model_1 = require("../models/elearning/course-material.model");
var course_syllabus_model_1 = require("../models/elearning/course-syllabus.model");
var course_unit_model_1 = require("../models/elearning/course-unit.model");
var submission_model_1 = require("../models/elearning/submission.model");
var exam_model_1 = require("../models/elearning/exam.model");
var exam_member_model_1 = require("../models/elearning/exam-member.model");
var course_certificate_model_1 = require("../models/elearning/course-certificate.model");
var project_model_1 = require("../models/elearning/project.model");
var project_submission_model_1 = require("../models/elearning/project-submission.model");
var course_class_model_1 = require("../models/elearning/course-class.model");
var base_model_1 = require("../models/base.model");
var survey_model_1 = require("../models/elearning/survey.model");
var survey_member_model_1 = require("../models/elearning/survey-member.model");
var exam_record_model_1 = require("../models/elearning/exam-record.model");
var LMSProfileService = (function () {
    function LMSProfileService(settingService, appEvent) {
        var _this = this;
        this.settingService = settingService;
        this.appEvent = appEvent;
        this.settingService.viewModeEvents.subscribe(function () {
            _this.invalidateAll();
        });
        this.appEvent.onLogin.subscribe(function () {
            _this.invalidateAll();
        });
        this.appEvent.onLogout.subscribe(function () {
            _this.invalidateAll();
        });
        this.appEvent.onTokenExpired.subscribe(function () {
            _this.invalidateAll();
        });
        this.invalidateAll();
    }
    LMSProfileService.prototype.invalidateAll = function () {
        this.initialized = false;
        this.courseContent = {};
        this.classContent = {};
    };
    LMSProfileService.prototype.init = function (context) {
        var _this = this;
        this.context = context;
        if (this.initialized)
            return Rx_1.Observable.of([]);
        var userId = context.authService.UserProfile.id;
        return base_model_1.BaseModel.bulk_search(context, course_member_model_1.CourseMember.__api__listByUser(userId), exam_member_model_1.ExamMember.__api__listByUser(userId), conference_member_model_1.ConferenceMember.__api__listByUser(userId), survey_member_model_1.SurveyMember.__api__listByUser(userId), course_certificate_model_1.Certificate.__api__listByUser(userId))
            .flatMap(function (jsonArray) {
            _this.myCourseMembers = _.filter(course_member_model_1.CourseMember.toArray(jsonArray[0]), function (member) {
                return isFinite(parseInt(member.course_id + "")) && member.status == 'active' && member.course_review_state == 'approved';
            });
            _this.myClassMembers = _.filter(_this.myCourseMembers, function (member) {
                return isFinite(parseInt(member.class_id + ""));
            });
            _this.myExamMembers = _.filter(exam_member_model_1.ExamMember.toArray(jsonArray[1]), function (member) {
                return isFinite(parseInt(member.exam_id + "")) && member.status == 'active' && member.exam_review_state == 'approved';
            });
            _this.myConferenceMembers = _.filter(conference_member_model_1.ConferenceMember.toArray(jsonArray[2]), function (member) {
                return isFinite(parseInt(member.conference_id + "")) && member.conference_status == 'open' && member.is_active;
            });
            _this.mySurveyMembers = _.filter(survey_member_model_1.SurveyMember.toArray(jsonArray[3]), function (member) {
                return isFinite(parseInt(member.survey_id + "")) && member.survey_review_state == 'approved';
            });
            _this.myCertificates = course_certificate_model_1.Certificate.toArray(jsonArray[4]);
            if (_this.myCourseMembers.length == 0 && _this.myExamMembers.length == 0
                && _this.myConferenceMembers.length == 0 && _this.mySurveyMembers.length == 0
                && _this.myCertificates.length == 0) {
                _this.initialized = true;
                return Rx_1.Observable.of([]);
            }
            var classIds = _.pluck(_this.myClassMembers, 'class_id');
            var courseIds = _.pluck(_this.myCourseMembers, 'course_id');
            var examIds = _.pluck(_this.myExamMembers, 'exam_id');
            var surveyIds = _.pluck(_this.mySurveyMembers, 'survey_id');
            var conferenceIds = _.pluck(_this.myConferenceMembers, 'conference_id');
            return base_model_1.BaseModel.bulk_list(context, course_model_1.Course.__api__get(courseIds), course_class_model_1.CourseClass.__api__get(classIds), exam_model_1.Exam.__api__get(examIds), conference_model_1.Conference.__api__get(conferenceIds), survey_model_1.Survey.__api__get(surveyIds), exam_record_model_1.ExamRecord.__api__listByUser(userId), submission_model_1.Submission.__api__listByUser(userId), project_submission_model_1.ProjectSubmission.__api__listByUser(userId)).flatMap(function (jsonArr1) {
                _this.myCourses = course_model_1.Course.toArray(jsonArr1[0]);
                _.each(_this.myCourseMembers, function (member) {
                    member.course = _.find(_this.myCourses, function (course) {
                        return member.course_id == course.id;
                    });
                });
                _this.myCourseClasses = course_class_model_1.CourseClass.toArray(jsonArr1[1]);
                _.each(_this.myClassMembers, function (member) {
                    member.clazz = _.find(_this.myCourseClasses, function (clazz) {
                        return member.class_id == clazz.id;
                    });
                });
                _this.myExams = exam_model_1.Exam.toArray(jsonArr1[2]);
                _.each(_this.myExamMembers, function (member) {
                    member.exam = _.find(_this.myExams, function (exam) {
                        return member.exam_id == exam.id;
                    });
                });
                _this.myConferences = conference_model_1.Conference.toArray(jsonArr1[3]);
                _.each(_this.myConferenceMembers, function (member) {
                    member.conference = _.find(_this.myConferences, function (conf) {
                        return member.conference_id == conf.id;
                    });
                });
                _this.mySurveys = survey_model_1.Survey.toArray(jsonArr1[4]);
                _.each(_this.mySurveyMembers, function (member) {
                    member.survey = _.find(_this.mySurveys, function (survey) {
                        return member.survey_id == survey.id;
                    });
                });
                _this.myExamRecords = exam_record_model_1.ExamRecord.toArray(jsonArr1[5]);
                _this.myExamSubmits = submission_model_1.Submission.toArray(jsonArr1[6]);
                _this.myProjectSubmits = project_submission_model_1.ProjectSubmission.toArray(jsonArr1[7]);
                _this.initialized = true;
                return Rx_1.Observable.of(null);
            });
        });
    };
    Object.defineProperty(LMSProfileService.prototype, "MyCourseMembers", {
        get: function () {
            return this.myCourseMembers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyExamMembers", {
        get: function () {
            return this.myExamMembers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MySurveyMembers", {
        get: function () {
            return this.mySurveyMembers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyConferenceMembers", {
        get: function () {
            return this.myConferenceMembers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyCourses", {
        get: function () {
            return this.myCourses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyClasses", {
        get: function () {
            return this.myCourseClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyExams", {
        get: function () {
            return this.myExams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MySurveys", {
        get: function () {
            return this.mySurveys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyExamRecords", {
        get: function () {
            return this.myExamRecords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LMSProfileService.prototype, "MyConferences", {
        get: function () {
            return this.myConferences;
        },
        enumerable: true,
        configurable: true
    });
    LMSProfileService.prototype.courseById = function (id) {
        return _.find(this.myCourses, function (course) {
            return course.id == id;
        });
    };
    LMSProfileService.prototype.classById = function (id) {
        return _.find(this.myCourseClasses, function (courseClass) {
            return courseClass.id == id;
        });
    };
    LMSProfileService.prototype.examById = function (id) {
        return _.find(this.myExams, function (exam) {
            return exam.id == id;
        });
    };
    LMSProfileService.prototype.classByCourseId = function (courseId) {
        return _.filter(this.myCourseClasses, function (courseClass) {
            return courseClass.course_id == courseId;
        });
    };
    LMSProfileService.prototype.courseMemberById = function (id) {
        return _.find(this.myCourseMembers, function (member) {
            return member.id == id;
        });
    };
    LMSProfileService.prototype.examMemberById = function (id) {
        return _.find(this.myExamMembers, function (member) {
            return member.id == id;
        });
    };
    LMSProfileService.prototype.surveyMemberById = function (id) {
        return _.find(this.mySurveyMembers, function (member) {
            return member.id == id;
        });
    };
    LMSProfileService.prototype.examMembersByClassId = function (classId) {
        return _.filter(this.myExamMembers, function (member) {
            return member.class_id == classId;
        });
    };
    LMSProfileService.prototype.conferenceMemberByClass = function (classId) {
        return _.find(this.myConferenceMembers, function (member) {
            return member.class_id == classId;
        });
    };
    LMSProfileService.prototype.examsByClass = function (classId) {
        return _.filter(this.myExams, function (exam) {
            return exam.course_class_id == classId;
        });
    };
    LMSProfileService.prototype.surveysByClass = function (classId) {
        return _.filter(this.mySurveys, function (survey) {
            return survey.course_class_id == classId;
        });
    };
    LMSProfileService.prototype.examRecordsByMember = function (memberId) {
        return _.filter(this.myExamRecords, function (record) {
            return record.member_id == memberId;
        });
    };
    LMSProfileService.prototype.projectSubmitsByMember = function (memberId) {
        return _.filter(this.myProjectSubmits, function (submit) {
            return submit.member_id == memberId;
        });
    };
    LMSProfileService.prototype.examSubmitsByMember = function (memberId) {
        return _.filter(this.myExamSubmits, function (submit) {
            return submit.member_id == memberId;
        });
    };
    LMSProfileService.prototype.certificateByMember = function (memberId) {
        return _.find(this.myCertificates, function (cert) {
            return cert.member_id == memberId;
        });
    };
    LMSProfileService.prototype.getCourseContent = function (courseId) {
        var _this = this;
        if (this.courseContent[courseId])
            return Rx_1.Observable.of(this.courseContent[courseId]);
        return base_model_1.BaseModel.bulk_search(this.context, course_syllabus_model_1.CourseSyllabus.__api__listByCourse(courseId), course_unit_model_1.CourseUnit.__api__listByCourse(courseId), course_faq_model_1.CourseFaq.__api__listByCourse(courseId), course_material_model_1.CourseMaterial.__api__listByCourse(courseId))
            .map(function (jsonArray) {
            var content = {};
            content["syllabus"] = course_syllabus_model_1.CourseSyllabus.toArray(jsonArray[0])[0];
            content["units"] = course_unit_model_1.CourseUnit.toArray(jsonArray[1]);
            content["faqs"] = course_faq_model_1.CourseFaq.toArray(jsonArray[2]);
            content["materials"] = course_material_model_1.CourseMaterial.toArray(jsonArray[3]);
            _this.courseContent[courseId] = content;
            return content;
        });
    };
    LMSProfileService.prototype.getClassContent = function (classId) {
        var _this = this;
        if (this.classContent[classId])
            return Rx_1.Observable.of(this.classContent[classId]);
        return base_model_1.BaseModel.bulk_search(this.context, project_model_1.Project.__api__listByClass(classId))
            .map(function (jsonArray) {
            var content = {};
            content["projects"] = project_model_1.Project.toArray(jsonArray[0]);
            _this.classContent[classId] = content;
            return content;
        });
    };
    LMSProfileService.prototype.clearClassContent = function (classId) {
        delete this.classContent[classId];
    };
    LMSProfileService.prototype.clearCourseContent = function (courseId) {
        delete this.courseContent[courseId];
    };
    LMSProfileService.prototype.addProject = function (project) {
        var content = this.classContent[project.class_id];
        if (content)
            content["projects"].push(project);
    };
    LMSProfileService.prototype.removeProject = function (project) {
        var content = this.classContent[project.class_id];
        if (content)
            content["projects"] = _.reject(content["projects"], function (obj) {
                return obj.id == project.id;
            });
    };
    LMSProfileService.prototype.addExam = function (exam) {
        var _this = this;
        this.myExams.push(exam);
        return exam_member_model_1.ExamMember.listByUser(this.context, this.context.authService.UserProfile.id).do(function (members) {
            _this.myExamMembers = _.filter(members, function (member) {
                return isFinite(parseInt(member.exam_id + "")) && member.status == 'active' && member.exam_review_state == 'approved';
            });
        });
    };
    LMSProfileService.prototype.addSurvey = function (survey) {
        var _this = this;
        this.mySurveys.push(survey);
        return survey_member_model_1.SurveyMember.listByUser(this.context, this.context.authService.UserProfile.id).do(function (members) {
            _this.mySurveyMembers = _.filter(members, function (member) {
                return isFinite(parseInt(member.survey_id + "")) && member.survey_review_state == 'approved';
            });
        });
    };
    LMSProfileService.prototype.addCourseFaq = function (faq) {
        var content = this.courseContent[faq.course_id];
        if (content)
            content["faqs"].push(faq);
    };
    LMSProfileService.prototype.addCourseMaterial = function (material) {
        var content = this.courseContent[material.course_id];
        if (content)
            content["materials"].push(material);
    };
    LMSProfileService.prototype.addUnit = function (unit) {
        var content = this.courseContent[unit.course_id];
        if (content)
            content["units"].push(unit);
    };
    LMSProfileService.prototype.removeExam = function (exam) {
        this.myExams = _.reject(this.myExams, function (obj) {
            return obj.id == exam.id;
        });
    };
    LMSProfileService.prototype.removeSurvey = function (survey) {
        this.mySurveys = _.reject(this.mySurveys, function (obj) {
            return obj.id == survey.id;
        });
    };
    LMSProfileService.prototype.removeCourseFaq = function (faq) {
        var content = this.courseContent[faq.course_id];
        if (content)
            content["faqs"] = _.reject(content["faqs"], function (obj) {
                return obj.id == faq.id;
            });
    };
    LMSProfileService.prototype.removeCourseMaterial = function (material) {
        var content = this.courseContent[material.course_id];
        if (content)
            content["materials"] = _.reject(content["materials"], function (obj) {
                return obj.id == material.id;
            });
    };
    LMSProfileService.prototype.removeUnit = function (unit) {
        var content = this.courseContent[unit.course_id];
        if (content)
            content["units"] = _.reject(content["units"], function (obj) {
                return obj.id == unit.id;
            });
    };
    LMSProfileService.prototype.getLastCourseTimestamp = function (course) {
        var timestamp = course.create_date.getTime();
        var editorRole = this.getCourseMemberByRole('editor', course.id);
        var studentRole = this.getCourseMemberByRole('student', course.id);
        var teacherRole = this.getCourseMemberByRole('teacher', course.id);
        var supervisorRole = this.getCourseMemberByRole('supervisor', course.id);
        if (studentRole && studentRole.create_date.getTime() < timestamp)
            timestamp = studentRole.create_date.getTime();
        if (teacherRole && teacherRole.create_date.getTime() < timestamp)
            timestamp = teacherRole.create_date.getTime();
        if (editorRole && editorRole.create_date.getTime() < timestamp)
            timestamp = editorRole.create_date.getTime();
        if (supervisorRole && supervisorRole.create_date.getTime() < timestamp)
            timestamp = supervisorRole.create_date.getTime();
        return timestamp;
    };
    LMSProfileService.prototype.getCourseMemberByRole = function (role, courseId) {
        return _.find(this.myCourseMembers, function (member) {
            return member.role == role && member.course_id == courseId;
        });
    };
    LMSProfileService.prototype.getLastExamTimestamp = function (exam) {
        var timestamp = exam.create_date.getTime();
        var editorRole = this.getExamMemberByRole('editor', exam.id);
        var candidateRole = this.getExamMemberByRole('candidate', exam.id);
        var supervisorRole = this.getExamMemberByRole('supervisor', exam.id);
        if (candidateRole && candidateRole.create_date.getTime() < timestamp)
            timestamp = candidateRole.create_date.getTime();
        if (editorRole && editorRole.create_date.getTime() < timestamp)
            timestamp = editorRole.create_date.getTime();
        if (supervisorRole && supervisorRole.create_date.getTime() < timestamp)
            timestamp = supervisorRole.create_date.getTime();
        return timestamp;
    };
    LMSProfileService.prototype.getExamMemberByRole = function (role, examId) {
        return _.find(this.myExamMembers, function (member) {
            return member.role == role && member.exam_id == examId;
        });
    };
    LMSProfileService.prototype.getLastSurveyTimestamp = function (survey) {
        var timestamp = survey.create_date.getTime();
        var editorRole = this.getSurveyMemberByRole('editor', survey.id);
        var candidateRole = this.getSurveyMemberByRole('candidate', survey.id);
        var supervisorRole = this.getSurveyMemberByRole('supervisor', survey.id);
        if (candidateRole && candidateRole.create_date.getTime() < timestamp)
            timestamp = candidateRole.create_date.getTime();
        if (editorRole && editorRole.create_date.getTime() < timestamp)
            timestamp = editorRole.create_date.getTime();
        if (supervisorRole && supervisorRole.create_date.getTime() < timestamp)
            timestamp = supervisorRole.create_date.getTime();
        return timestamp;
    };
    LMSProfileService.prototype.getSurveyMemberByRole = function (role, surveyId) {
        return _.find(this.mySurveyMembers, function (member) {
            return member.role == role && member.survey_id == surveyId;
        });
    };
    LMSProfileService.prototype.getLastConferenceTimestamp = function (member) {
        var timestamp = member.conference.create_date.getTime();
        if (member.create_date.getTime() < timestamp)
            timestamp = member.create_date.getTime();
        return timestamp;
    };
    LMSProfileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [setting_service_1.SettingService, app_event_manager_service_1.AppEventManager])
    ], LMSProfileService);
    return LMSProfileService;
}());
exports.LMSProfileService = LMSProfileService;
