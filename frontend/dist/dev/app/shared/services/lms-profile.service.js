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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvbG1zLXByb2ZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQyw4QkFBOEM7QUFFOUMseUVBQThEO0FBQzlELHFEQUFtRDtBQUVuRCxpQ0FBK0I7QUFFL0IsaUVBQTBEO0FBRTFELCtFQUF1RTtBQUN2RSw4QkFBZ0M7QUFHaEMsdUZBQStFO0FBQy9FLHlFQUFrRTtBQU1sRSx5RUFBaUU7QUFDakUsbUZBQTJFO0FBQzNFLG1GQUEyRTtBQUUzRSwyRUFBbUU7QUFDbkUseUVBQWtFO0FBR2xFLDZEQUFzRDtBQUN0RCwyRUFBbUU7QUFLbkUseUZBQTJFO0FBRTNFLG1FQUE0RDtBQUM1RCx5RkFBaUY7QUFDakYsNkVBQXFFO0FBQ3JFLG1EQUFpRDtBQUNqRCxpRUFBMEQ7QUFDMUQsK0VBQXVFO0FBSXZFLDJFQUFtRTtBQUduRTtJQXFCRSwyQkFBb0IsY0FBOEIsRUFBVSxRQUF5QjtRQUFyRixpQkFjQztRQWRtQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUNuRixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDM0MsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUMvQixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDckMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FB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cUIsR0FBckIsVUFBc0IsSUFBVyxFQUFFLFFBQWdCO1FBQ2pELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQUMsTUFBbUI7WUFDdEQsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHRCxzREFBMEIsR0FBMUIsVUFBMkIsTUFBd0I7UUFDakQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEQsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVM7WUFDMUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0MsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQS9jVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FzQnlCLGdDQUFjLEVBQW9CLDJDQUFlO09BckIxRSxpQkFBaUIsQ0FpZDdCO0lBQUQsd0JBQUM7Q0FqZEQsQUFpZEMsSUFBQTtBQWpkWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9sbXMtcHJvZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9lbnYuY29uZmlnJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi9hcHAtZXZlbnQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zZXR0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ29uZmVyZW5jZU1lbWJlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY29uZmVyZW5jZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZSB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY29uZmVyZW5jZS5tb2RlbCc7IGltcG9ydCB7XG4gIFNVUlZFWV9TVEFUVVMsIENPTlRFTlRfU1RBVFVTLCBDT1VSU0VfTU9ERSwgQ09VUlNFX01FTUJFUl9ST0xFLCBQUk9KRUNUX1NUQVRVUyxcbiAgQ09VUlNFX01FTUJFUl9TVEFUVVMsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgQ09VUlNFX1VOSVRfVFlQRSwgRVhBTV9TVEFUVVNcbn0gZnJvbSAnLi4vbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdFVzZXJzRGlhbG9nIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBDb3Vyc2VGYXEgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWwgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tYXRlcmlhbC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VTeWxsYWJ1cyB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IFN5bGxhYnVzVXRpbHMgfSBmcm9tICcuLi9oZWxwZXJzL3N5bGxhYnVzLnV0aWxzJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IFJvdXRlLCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZSB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNlcnRpZmljYXRlLm1vZGVsJztcbmltcG9ydCB7IE1lZXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWVldGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3QubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdFN1Ym1pc3Npb24gfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3Qtc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VDbGFzcyB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNsYXNzLm1vZGVsJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvc3VydmV5Lm1vZGVsJztcbmltcG9ydCB7IFN1cnZleU1lbWJlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL21vZGVscy9jb250ZXh0JztcbmltcG9ydCB7IEV4YW1SZWNvcmQgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcmVjb3JkLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExNU1Byb2ZpbGVTZXJ2aWNlIHtcblxuICBwcml2YXRlIG15Q291cnNlTWVtYmVyczogQ291cnNlTWVtYmVyW107XG4gIHByaXZhdGUgbXlDbGFzc01lbWJlcnM6IENvdXJzZU1lbWJlcltdO1xuICBwcml2YXRlIG15RXhhbU1lbWJlcnM6IEV4YW1NZW1iZXJbXTtcbiAgcHJpdmF0ZSBteVN1cnZleU1lbWJlcnM6IFN1cnZleU1lbWJlcltdO1xuICBwcml2YXRlIG15Q29uZmVyZW5jZU1lbWJlcnM6IENvbmZlcmVuY2VNZW1iZXJbXTtcbiAgcHJpdmF0ZSBteUV4YW1SZWNvcmRzOiBFeGFtUmVjb3JkW107XG4gIHByaXZhdGUgbXlQcm9qZWN0U3VibWl0czogUHJvamVjdFN1Ym1pc3Npb25bXTtcbiAgcHJpdmF0ZSBteUV4YW1TdWJtaXRzOiBTdWJtaXNzaW9uW107XG4gIHByaXZhdGUgbXlDb3Vyc2VzOiBDb3Vyc2VbXTtcbiAgcHJpdmF0ZSBteUV4YW1zOiBFeGFtW107XG4gIHByaXZhdGUgbXlDb3Vyc2VDbGFzc2VzOiBDb3Vyc2VDbGFzc1tdO1xuICBwcml2YXRlIG15U3VydmV5czogU3VydmV5W107XG4gIHByaXZhdGUgbXlDb25mZXJlbmNlczogQ29uZmVyZW5jZVtdO1xuICBwcml2YXRlIG15Q2VydGlmaWNhdGVzOiBDZXJ0aWZpY2F0ZVtdO1xuICBwcml2YXRlIGNvdXJzZUNvbnRlbnQ6IGFueTtcbiAgcHJpdmF0ZSBjbGFzc0NvbnRlbnQ6IGFueTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBjb250ZXh0OiBBUElDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ1NlcnZpY2U6IFNldHRpbmdTZXJ2aWNlLCBwcml2YXRlIGFwcEV2ZW50OiBBcHBFdmVudE1hbmFnZXIpIHtcbiAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLnZpZXdNb2RlRXZlbnRzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmludmFsaWRhdGVBbGwoKTtcbiAgICB9KTtcbiAgICB0aGlzLmFwcEV2ZW50Lm9uTG9naW4uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUFsbCgpO1xuICAgIH0pO1xuICAgIHRoaXMuYXBwRXZlbnQub25Mb2dvdXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUFsbCgpO1xuICAgIH0pO1xuICAgIHRoaXMuYXBwRXZlbnQub25Ub2tlbkV4cGlyZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUFsbCgpO1xuICAgIH0pO1xuICAgIHRoaXMuaW52YWxpZGF0ZUFsbCgpO1xuICB9XG5cbiAgaW52YWxpZGF0ZUFsbCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5jb3Vyc2VDb250ZW50ID0ge307XG4gICAgdGhpcy5jbGFzc0NvbnRlbnQgPSB7fTtcbiAgfVxuXG5cbiAgaW5pdChjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmNvbnRleHQgPSAgY29udGV4dDtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZClcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKFtdKTtcbiAgICB2YXIgdXNlcklkID0gY29udGV4dC5hdXRoU2VydmljZS5Vc2VyUHJvZmlsZS5pZDtcbiAgICByZXR1cm4gQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKGNvbnRleHQsXG4gICAgICBDb3Vyc2VNZW1iZXIuX19hcGlfX2xpc3RCeVVzZXIodXNlcklkKSxcbiAgICAgIEV4YW1NZW1iZXIuX19hcGlfX2xpc3RCeVVzZXIodXNlcklkKSxcbiAgICAgIENvbmZlcmVuY2VNZW1iZXIuX19hcGlfX2xpc3RCeVVzZXIodXNlcklkKSxcbiAgICAgIFN1cnZleU1lbWJlci5fX2FwaV9fbGlzdEJ5VXNlcih1c2VySWQpLFxuICAgICAgQ2VydGlmaWNhdGUuX19hcGlfX2xpc3RCeVVzZXIodXNlcklkKVxuICAgIClcbiAgICAgIC5mbGF0TWFwKGpzb25BcnJheSA9PiB7XG4gICAgICAgIHRoaXMubXlDb3Vyc2VNZW1iZXJzID0gXy5maWx0ZXIoQ291cnNlTWVtYmVyLnRvQXJyYXkoanNvbkFycmF5WzBdKSwgKG1lbWJlcjogQ291cnNlTWVtYmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHBhcnNlSW50KG1lbWJlci5jb3Vyc2VfaWQgKyBcIlwiKSkgJiYgbWVtYmVyLnN0YXR1cyA9PSAnYWN0aXZlJyAmJiBtZW1iZXIuY291cnNlX3Jldmlld19zdGF0ZSA9PSdhcHByb3ZlZCc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm15Q2xhc3NNZW1iZXJzID0gXy5maWx0ZXIodGhpcy5teUNvdXJzZU1lbWJlcnMsIChtZW1iZXI6IENvdXJzZU1lbWJlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBpc0Zpbml0ZShwYXJzZUludChtZW1iZXIuY2xhc3NfaWQgKyBcIlwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm15RXhhbU1lbWJlcnMgPSBfLmZpbHRlcihFeGFtTWVtYmVyLnRvQXJyYXkoanNvbkFycmF5WzFdKSwgKG1lbWJlcjogRXhhbU1lbWJlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBpc0Zpbml0ZShwYXJzZUludChtZW1iZXIuZXhhbV9pZCArIFwiXCIpKSAmJiBtZW1iZXIuc3RhdHVzID09ICdhY3RpdmUnICYmIG1lbWJlci5leGFtX3Jldmlld19zdGF0ZSA9PSdhcHByb3ZlZCc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm15Q29uZmVyZW5jZU1lbWJlcnMgPSBfLmZpbHRlcihDb25mZXJlbmNlTWVtYmVyLnRvQXJyYXkoanNvbkFycmF5WzJdKSwgKG1lbWJlcjogQ29uZmVyZW5jZU1lbWJlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBpc0Zpbml0ZShwYXJzZUludChtZW1iZXIuY29uZmVyZW5jZV9pZCArIFwiXCIpKSAmJiBtZW1iZXIuY29uZmVyZW5jZV9zdGF0dXMgPT0gJ29wZW4nICYmIG1lbWJlci5pc19hY3RpdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm15U3VydmV5TWVtYmVycyA9IF8uZmlsdGVyKFN1cnZleU1lbWJlci50b0FycmF5KGpzb25BcnJheVszXSksIChtZW1iZXI6IFN1cnZleU1lbWJlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBpc0Zpbml0ZShwYXJzZUludChtZW1iZXIuc3VydmV5X2lkICsgXCJcIikpICAmJiBtZW1iZXIuc3VydmV5X3Jldmlld19zdGF0ZSA9PSdhcHByb3ZlZCc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm15Q2VydGlmaWNhdGVzID0gQ2VydGlmaWNhdGUudG9BcnJheShqc29uQXJyYXlbNF0pO1xuICAgICAgICBpZiAodGhpcy5teUNvdXJzZU1lbWJlcnMubGVuZ3RoID09IDAgJiYgdGhpcy5teUV4YW1NZW1iZXJzLmxlbmd0aCA9PSAwXG4gICAgICAgICAgJiYgdGhpcy5teUNvbmZlcmVuY2VNZW1iZXJzLmxlbmd0aCA9PSAwICYmIHRoaXMubXlTdXJ2ZXlNZW1iZXJzLmxlbmd0aCA9PSAwIFxuICAgICAgICAgICYmIHRoaXMubXlDZXJ0aWZpY2F0ZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihbXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzSWRzID0gXy5wbHVjayh0aGlzLm15Q2xhc3NNZW1iZXJzLCAnY2xhc3NfaWQnKTtcbiAgICAgICAgdmFyIGNvdXJzZUlkcyA9IF8ucGx1Y2sodGhpcy5teUNvdXJzZU1lbWJlcnMsICdjb3Vyc2VfaWQnKTtcbiAgICAgICAgdmFyIGV4YW1JZHMgPSBfLnBsdWNrKHRoaXMubXlFeGFtTWVtYmVycywgJ2V4YW1faWQnKTtcbiAgICAgICAgdmFyIHN1cnZleUlkcyA9IF8ucGx1Y2sodGhpcy5teVN1cnZleU1lbWJlcnMsICdzdXJ2ZXlfaWQnKTtcbiAgICAgICAgdmFyIGNvbmZlcmVuY2VJZHMgPSBfLnBsdWNrKHRoaXMubXlDb25mZXJlbmNlTWVtYmVycywgJ2NvbmZlcmVuY2VfaWQnKTtcbiAgICAgICAgcmV0dXJuIEJhc2VNb2RlbC5idWxrX2xpc3QoY29udGV4dCxcbiAgICAgICAgICBDb3Vyc2UuX19hcGlfX2dldChjb3Vyc2VJZHMpLFxuICAgICAgICAgIENvdXJzZUNsYXNzLl9fYXBpX19nZXQoY2xhc3NJZHMpLFxuICAgICAgICAgIEV4YW0uX19hcGlfX2dldChleGFtSWRzKSxcbiAgICAgICAgICBDb25mZXJlbmNlLl9fYXBpX19nZXQoY29uZmVyZW5jZUlkcyksXG4gICAgICAgICAgU3VydmV5Ll9fYXBpX19nZXQoc3VydmV5SWRzKSxcbiAgICAgICAgICBFeGFtUmVjb3JkLl9fYXBpX19saXN0QnlVc2VyKHVzZXJJZCksXG4gICAgICAgICAgU3VibWlzc2lvbi5fX2FwaV9fbGlzdEJ5VXNlcih1c2VySWQpLFxuICAgICAgICAgIFByb2plY3RTdWJtaXNzaW9uLl9fYXBpX19saXN0QnlVc2VyKHVzZXJJZClcbiAgICAgICAgKS5mbGF0TWFwKGpzb25BcnIxID0+IHtcbiAgICAgICAgICB0aGlzLm15Q291cnNlcyA9IENvdXJzZS50b0FycmF5KGpzb25BcnIxWzBdKTtcbiAgICAgICAgICBfLmVhY2godGhpcy5teUNvdXJzZU1lbWJlcnMsIChtZW1iZXI6IENvdXJzZU1lbWJlcikgPT4ge1xuICAgICAgICAgICAgbWVtYmVyLmNvdXJzZSA9IF8uZmluZCh0aGlzLm15Q291cnNlcywgKGNvdXJzZTogQ291cnNlKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtZW1iZXIuY291cnNlX2lkID09IGNvdXJzZS5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMubXlDb3Vyc2VDbGFzc2VzID0gQ291cnNlQ2xhc3MudG9BcnJheShqc29uQXJyMVsxXSk7XG4gICAgICAgICAgXy5lYWNoKHRoaXMubXlDbGFzc01lbWJlcnMsIChtZW1iZXI6IENvdXJzZU1lbWJlcikgPT4ge1xuICAgICAgICAgICAgbWVtYmVyLmNsYXp6ID0gXy5maW5kKHRoaXMubXlDb3Vyc2VDbGFzc2VzLCAoY2xheno6IENvdXJzZUNsYXNzKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtZW1iZXIuY2xhc3NfaWQgPT0gY2xhenouaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLm15RXhhbXMgPSBFeGFtLnRvQXJyYXkoanNvbkFycjFbMl0pO1xuICAgICAgICAgIF8uZWFjaCh0aGlzLm15RXhhbU1lbWJlcnMsIChtZW1iZXI6IEV4YW1NZW1iZXIpID0+IHtcbiAgICAgICAgICAgIG1lbWJlci5leGFtID0gXy5maW5kKHRoaXMubXlFeGFtcywgKGV4YW06IEV4YW0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5leGFtX2lkID09IGV4YW0uaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLm15Q29uZmVyZW5jZXMgPSBDb25mZXJlbmNlLnRvQXJyYXkoanNvbkFycjFbM10pO1xuICAgICAgICAgIF8uZWFjaCh0aGlzLm15Q29uZmVyZW5jZU1lbWJlcnMsIChtZW1iZXI6IENvbmZlcmVuY2VNZW1iZXIpID0+IHtcbiAgICAgICAgICAgIG1lbWJlci5jb25mZXJlbmNlID0gXy5maW5kKHRoaXMubXlDb25mZXJlbmNlcywgKGNvbmY6IENvbmZlcmVuY2UpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5jb25mZXJlbmNlX2lkID09IGNvbmYuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLm15U3VydmV5cyA9IFN1cnZleS50b0FycmF5KGpzb25BcnIxWzRdKTtcbiAgICAgICAgICBfLmVhY2godGhpcy5teVN1cnZleU1lbWJlcnMsIChtZW1iZXI6IFN1cnZleU1lbWJlcikgPT4ge1xuICAgICAgICAgICAgbWVtYmVyLnN1cnZleSA9IF8uZmluZCh0aGlzLm15U3VydmV5cywgKHN1cnZleTogU3VydmV5KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtZW1iZXIuc3VydmV5X2lkID09IHN1cnZleS5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMubXlFeGFtUmVjb3JkcyA9IEV4YW1SZWNvcmQudG9BcnJheShqc29uQXJyMVs1XSk7XG4gICAgICAgICAgdGhpcy5teUV4YW1TdWJtaXRzID0gU3VibWlzc2lvbi50b0FycmF5KGpzb25BcnIxWzZdKTtcbiAgICAgICAgICB0aGlzLm15UHJvamVjdFN1Ym1pdHMgPSBQcm9qZWN0U3VibWlzc2lvbi50b0FycmF5KGpzb25BcnIxWzddKTtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldCBNeUNvdXJzZU1lbWJlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubXlDb3Vyc2VNZW1iZXJzO1xuICB9XG5cbiAgZ2V0IE15RXhhbU1lbWJlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubXlFeGFtTWVtYmVycztcbiAgfVxuXG4gIGdldCBNeVN1cnZleU1lbWJlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubXlTdXJ2ZXlNZW1iZXJzO1xuICB9XG5cbiAgZ2V0IE15Q29uZmVyZW5jZU1lbWJlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubXlDb25mZXJlbmNlTWVtYmVycztcbiAgfVxuXG4gIGdldCBNeUNvdXJzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubXlDb3Vyc2VzO1xuICB9XG5cbiAgZ2V0IE15Q2xhc3NlcygpIHtcbiAgICByZXR1cm4gdGhpcy5teUNvdXJzZUNsYXNzZXM7XG4gIH1cblxuICBnZXQgTXlFeGFtcygpIHtcbiAgICByZXR1cm4gdGhpcy5teUV4YW1zO1xuICB9XG5cbiAgZ2V0IE15U3VydmV5cygpIHtcbiAgICByZXR1cm4gdGhpcy5teVN1cnZleXM7XG4gIH1cblxuICBnZXQgTXlFeGFtUmVjb3JkcygpIHtcbiAgICByZXR1cm4gdGhpcy5teUV4YW1SZWNvcmRzO1xuICB9XG5cbiAgZ2V0IE15Q29uZmVyZW5jZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubXlDb25mZXJlbmNlcztcbiAgfVxuXG4gIGNvdXJzZUJ5SWQoaWQ6bnVtYmVyKSB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLm15Q291cnNlcywgKGNvdXJzZTpDb3Vyc2UpPT4ge1xuICAgICAgcmV0dXJuIGNvdXJzZS5pZCA9PSAgaWQ7XG4gICAgfSk7XG4gIH1cblxuICBjbGFzc0J5SWQoaWQ6bnVtYmVyKSB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLm15Q291cnNlQ2xhc3NlcywgKGNvdXJzZUNsYXNzOkNvdXJzZUNsYXNzKT0+IHtcbiAgICAgIHJldHVybiBjb3Vyc2VDbGFzcy5pZCA9PSBpZDtcbiAgICB9KTtcbiAgfVxuXG4gIGV4YW1CeUlkKGlkOm51bWJlcikge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5teUV4YW1zLCAoZXhhbTpFeGFtKT0+IHtcbiAgICAgIHJldHVybiBleGFtLmlkID09ICBpZDtcbiAgICB9KTtcbiAgfVxuXG4gIGNsYXNzQnlDb3Vyc2VJZChjb3Vyc2VJZDpudW1iZXIpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIodGhpcy5teUNvdXJzZUNsYXNzZXMsIChjb3Vyc2VDbGFzczpDb3Vyc2VDbGFzcyk9PiB7XG4gICAgICByZXR1cm4gY291cnNlQ2xhc3MuY291cnNlX2lkID09IGNvdXJzZUlkO1xuICAgIH0pO1xuICB9XG5cbiAgY291cnNlTWVtYmVyQnlJZChpZDpudW1iZXIpIHtcbiAgICByZXR1cm4gXy5maW5kKHRoaXMubXlDb3Vyc2VNZW1iZXJzLCAobWVtYmVyOkNvdXJzZU1lbWJlcik9PiB7XG4gICAgICByZXR1cm4gbWVtYmVyLmlkID09ICBpZDtcbiAgICB9KTtcbiAgfVxuXG4gIGV4YW1NZW1iZXJCeUlkKGlkOm51bWJlcikge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5teUV4YW1NZW1iZXJzLCAobWVtYmVyOkV4YW1NZW1iZXIpPT4ge1xuICAgICAgcmV0dXJuIG1lbWJlci5pZCA9PSAgaWQ7XG4gICAgfSk7XG4gIH1cblxuICBzdXJ2ZXlNZW1iZXJCeUlkKGlkOm51bWJlcikge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5teVN1cnZleU1lbWJlcnMsIChtZW1iZXI6U3VydmV5TWVtYmVyKT0+IHtcbiAgICAgIHJldHVybiBtZW1iZXIuaWQgPT0gIGlkO1xuICAgIH0pO1xuICB9XG5cbiAgZXhhbU1lbWJlcnNCeUNsYXNzSWQoY2xhc3NJZDpudW1iZXIpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIodGhpcy5teUV4YW1NZW1iZXJzLCAobWVtYmVyOkV4YW1NZW1iZXIpPT4ge1xuICAgICAgcmV0dXJuIG1lbWJlci5jbGFzc19pZCA9PSAgY2xhc3NJZDtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZlcmVuY2VNZW1iZXJCeUNsYXNzKGNsYXNzSWQ6bnVtYmVyKSB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLm15Q29uZmVyZW5jZU1lbWJlcnMsIChtZW1iZXI6Q29uZmVyZW5jZU1lbWJlcik9PiB7XG4gICAgICByZXR1cm4gbWVtYmVyLmNsYXNzX2lkID09ICBjbGFzc0lkO1xuICAgIH0pO1xuICB9XG5cbiAgZXhhbXNCeUNsYXNzKGNsYXNzSWQ6IG51bWJlcikge1xuICAgIHJldHVybiBfLmZpbHRlcih0aGlzLm15RXhhbXMsIChleGFtOiBFeGFtKT0+IHtcbiAgICAgIHJldHVybiBleGFtLmNvdXJzZV9jbGFzc19pZCA9PSBjbGFzc0lkO1xuICAgIH0pO1xuICB9XG5cbiAgc3VydmV5c0J5Q2xhc3MoY2xhc3NJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKHRoaXMubXlTdXJ2ZXlzLCAoc3VydmV5OiBTdXJ2ZXkpPT4ge1xuICAgICAgcmV0dXJuIHN1cnZleS5jb3Vyc2VfY2xhc3NfaWQgPT0gY2xhc3NJZDtcbiAgICB9KTtcbiAgfVxuXG4gIGV4YW1SZWNvcmRzQnlNZW1iZXIobWVtYmVySWQ6IG51bWJlcikge1xuICAgIHJldHVybiBfLmZpbHRlcih0aGlzLm15RXhhbVJlY29yZHMsIChyZWNvcmQ6IEV4YW1SZWNvcmQpPT4ge1xuICAgICAgcmV0dXJuIHJlY29yZC5tZW1iZXJfaWQgPT0gbWVtYmVySWQ7XG4gICAgfSk7XG4gIH1cblxuICBwcm9qZWN0U3VibWl0c0J5TWVtYmVyKG1lbWJlcklkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIodGhpcy5teVByb2plY3RTdWJtaXRzLCAoc3VibWl0OiBQcm9qZWN0U3VibWlzc2lvbik9PiB7XG4gICAgICByZXR1cm4gc3VibWl0Lm1lbWJlcl9pZCA9PSBtZW1iZXJJZDtcbiAgICB9KTtcbiAgfVxuXG4gIGV4YW1TdWJtaXRzQnlNZW1iZXIobWVtYmVySWQ6IG51bWJlcikge1xuICAgIHJldHVybiBfLmZpbHRlcih0aGlzLm15RXhhbVN1Ym1pdHMsIChzdWJtaXQ6IFN1Ym1pc3Npb24pPT4ge1xuICAgICAgcmV0dXJuIHN1Ym1pdC5tZW1iZXJfaWQgPT0gbWVtYmVySWQ7XG4gICAgfSk7XG4gIH1cblxuICBjZXJ0aWZpY2F0ZUJ5TWVtYmVyKG1lbWJlcklkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gXy5maW5kKHRoaXMubXlDZXJ0aWZpY2F0ZXMsIChjZXJ0OiBDZXJ0aWZpY2F0ZSk9PiB7XG4gICAgICByZXR1cm4gY2VydC5tZW1iZXJfaWQgPT0gbWVtYmVySWQ7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb3Vyc2VDb250ZW50KGNvdXJzZUlkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAodGhpcy5jb3Vyc2VDb250ZW50W2NvdXJzZUlkXSlcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRoaXMuY291cnNlQ29udGVudFtjb3Vyc2VJZF0pO1xuICAgIHJldHVybiBCYXNlTW9kZWwuYnVsa19zZWFyY2godGhpcy5jb250ZXh0LFxuICAgICAgQ291cnNlU3lsbGFidXMuX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZCksXG4gICAgICBDb3Vyc2VVbml0Ll9fYXBpX19saXN0QnlDb3Vyc2UoY291cnNlSWQpLFxuICAgICAgQ291cnNlRmFxLl9fYXBpX19saXN0QnlDb3Vyc2UoY291cnNlSWQpLFxuICAgICAgQ291cnNlTWF0ZXJpYWwuX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZClcbiAgICApXG4gICAgICAubWFwKGpzb25BcnJheSA9PiB7XG4gICAgICAgIHZhciBjb250ZW50ID0ge307XG4gICAgICAgIGNvbnRlbnRbXCJzeWxsYWJ1c1wiXSA9ICBDb3Vyc2VTeWxsYWJ1cy50b0FycmF5KGpzb25BcnJheVswXSlbMF07XG4gICAgICAgIGNvbnRlbnRbXCJ1bml0c1wiXSA9ICBDb3Vyc2VVbml0LnRvQXJyYXkoanNvbkFycmF5WzFdKTtcbiAgICAgICAgY29udGVudFtcImZhcXNcIl0gPSAgQ291cnNlRmFxLnRvQXJyYXkoanNvbkFycmF5WzJdKTtcbiAgICAgICAgY29udGVudFtcIm1hdGVyaWFsc1wiXSA9ICBDb3Vyc2VNYXRlcmlhbC50b0FycmF5KGpzb25BcnJheVszXSk7XG4gICAgICAgIHRoaXMuY291cnNlQ29udGVudFtjb3Vyc2VJZF0gPSAgY29udGVudDtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzQ29udGVudChjbGFzc0lkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAodGhpcy5jbGFzc0NvbnRlbnRbY2xhc3NJZF0pXG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLmNsYXNzQ29udGVudFtjbGFzc0lkXSk7XG4gICAgcmV0dXJuIEJhc2VNb2RlbC5idWxrX3NlYXJjaCh0aGlzLmNvbnRleHQsXG4gICAgICBQcm9qZWN0Ll9fYXBpX19saXN0QnlDbGFzcyhjbGFzc0lkKSxcbiAgICApXG4gICAgICAubWFwKGpzb25BcnJheSA9PiB7XG4gICAgICAgIHZhciBjb250ZW50ID0ge307XG4gICAgICAgIGNvbnRlbnRbXCJwcm9qZWN0c1wiXSA9ICBQcm9qZWN0LnRvQXJyYXkoanNvbkFycmF5WzBdKTtcbiAgICAgICAgdGhpcy5jbGFzc0NvbnRlbnRbY2xhc3NJZF0gPSAgY29udGVudDtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQ2xhc3NDb250ZW50KGNsYXNzSWQ6IG51bWJlcikge1xuICAgIGRlbGV0ZSB0aGlzLmNsYXNzQ29udGVudFtjbGFzc0lkXTtcbiAgfVxuXG4gIGNsZWFyQ291cnNlQ29udGVudChjb3Vyc2VJZDogbnVtYmVyKSB7XG4gICAgZGVsZXRlIHRoaXMuY291cnNlQ29udGVudFtjb3Vyc2VJZF07XG4gIH1cblxuICBhZGRQcm9qZWN0KHByb2plY3Q6UHJvamVjdCkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5jbGFzc0NvbnRlbnRbcHJvamVjdC5jbGFzc19pZF07XG4gICAgaWYgKGNvbnRlbnQpXG4gICAgICBjb250ZW50W1wicHJvamVjdHNcIl0ucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIHJlbW92ZVByb2plY3QocHJvamVjdDpQcm9qZWN0KSB7XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmNsYXNzQ29udGVudFtwcm9qZWN0LmNsYXNzX2lkXTtcbiAgICBpZiAoY29udGVudClcbiAgICAgIGNvbnRlbnRbXCJwcm9qZWN0c1wiXSA9IF8ucmVqZWN0KGNvbnRlbnRbXCJwcm9qZWN0c1wiXSwgKG9iajpQcm9qZWN0KT0+IHtcbiAgICAgIHJldHVybiBvYmouaWQgPT0gcHJvamVjdC5pZDtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEV4YW0oZXhhbTpFeGFtKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMubXlFeGFtcy5wdXNoKGV4YW0pO1xuICAgIHJldHVybiBFeGFtTWVtYmVyLmxpc3RCeVVzZXIodGhpcy5jb250ZXh0LCB0aGlzLmNvbnRleHQuYXV0aFNlcnZpY2UuVXNlclByb2ZpbGUuaWQpLmRvKG1lbWJlcnM9PiB7XG4gICAgICB0aGlzLm15RXhhbU1lbWJlcnMgPSBfLmZpbHRlcihtZW1iZXJzLCAobWVtYmVyOiBFeGFtTWVtYmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHBhcnNlSW50KG1lbWJlci5leGFtX2lkICsgXCJcIikpICYmIG1lbWJlci5zdGF0dXMgPT0gJ2FjdGl2ZScgJiYgbWVtYmVyLmV4YW1fcmV2aWV3X3N0YXRlID09J2FwcHJvdmVkJztcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gIH1cblxuICBhZGRTdXJ2ZXkoc3VydmV5OlN1cnZleSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLm15U3VydmV5cy5wdXNoKHN1cnZleSk7XG4gICAgcmV0dXJuIFN1cnZleU1lbWJlci5saXN0QnlVc2VyKHRoaXMuY29udGV4dCwgdGhpcy5jb250ZXh0LmF1dGhTZXJ2aWNlLlVzZXJQcm9maWxlLmlkKS5kbyhtZW1iZXJzPT4ge1xuICAgICAgdGhpcy5teVN1cnZleU1lbWJlcnMgPSBfLmZpbHRlcihtZW1iZXJzLCAobWVtYmVyOiBTdXJ2ZXlNZW1iZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gaXNGaW5pdGUocGFyc2VJbnQobWVtYmVyLnN1cnZleV9pZCArIFwiXCIpKSAgJiYgbWVtYmVyLnN1cnZleV9yZXZpZXdfc3RhdGUgPT0nYXBwcm92ZWQnO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvdXJzZUZhcShmYXE6Q291cnNlRmFxKSB7XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmNvdXJzZUNvbnRlbnRbZmFxLmNvdXJzZV9pZF07XG4gICAgaWYgKGNvbnRlbnQpXG4gICAgICBjb250ZW50W1wiZmFxc1wiXS5wdXNoKGZhcSk7XG4gIH1cblxuICBhZGRDb3Vyc2VNYXRlcmlhbChtYXRlcmlhbDpDb3Vyc2VNYXRlcmlhbCkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5jb3Vyc2VDb250ZW50W21hdGVyaWFsLmNvdXJzZV9pZF07XG4gICAgaWYgKGNvbnRlbnQpXG4gICAgICBjb250ZW50W1wibWF0ZXJpYWxzXCJdLnB1c2gobWF0ZXJpYWwpO1xuICB9XG5cbiAgYWRkVW5pdCh1bml0OkNvdXJzZVVuaXQpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuY291cnNlQ29udGVudFt1bml0LmNvdXJzZV9pZF07XG4gICAgaWYgKGNvbnRlbnQpXG4gICAgICBjb250ZW50W1widW5pdHNcIl0ucHVzaCh1bml0KTtcbiAgfVxuICBcblxuICByZW1vdmVFeGFtKGV4YW06RXhhbSkge1xuICAgIHRoaXMubXlFeGFtcyA9IF8ucmVqZWN0KHRoaXMubXlFeGFtcywgKG9iajpFeGFtKT0+IHtcbiAgICAgIHJldHVybiBvYmouaWQgPT0gZXhhbS5pZDtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVN1cnZleShzdXJ2ZXk6U3VydmV5KSB7XG4gICAgdGhpcy5teVN1cnZleXMgPSBfLnJlamVjdCh0aGlzLm15U3VydmV5cywgKG9iajpTdXJ2ZXkpPT4ge1xuICAgICAgcmV0dXJuIG9iai5pZCA9PSBzdXJ2ZXkuaWQ7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb3Vyc2VGYXEoZmFxOkNvdXJzZUZhcSkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5jb3Vyc2VDb250ZW50W2ZhcS5jb3Vyc2VfaWRdO1xuICAgIGlmIChjb250ZW50KVxuICAgICAgY29udGVudFtcImZhcXNcIl0gPSBfLnJlamVjdChjb250ZW50W1wiZmFxc1wiXSwgKG9iajpDb3Vyc2VGYXEpPT4ge1xuICAgICAgcmV0dXJuIG9iai5pZCA9PSBmYXEuaWQ7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb3Vyc2VNYXRlcmlhbChtYXRlcmlhbDpDb3Vyc2VNYXRlcmlhbCkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5jb3Vyc2VDb250ZW50W21hdGVyaWFsLmNvdXJzZV9pZF07XG4gICAgaWYgKGNvbnRlbnQpXG4gICAgICBjb250ZW50W1wibWF0ZXJpYWxzXCJdID0gXy5yZWplY3QoY29udGVudFtcIm1hdGVyaWFsc1wiXSwgKG9iajpDb3Vyc2VNYXRlcmlhbCk9PiB7XG4gICAgICByZXR1cm4gb2JqLmlkID09IG1hdGVyaWFsLmlkO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVW5pdCh1bml0OkNvdXJzZVVuaXQpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuY291cnNlQ29udGVudFt1bml0LmNvdXJzZV9pZF07XG4gICAgaWYgKGNvbnRlbnQpXG4gICAgICBjb250ZW50W1widW5pdHNcIl0gPSBfLnJlamVjdChjb250ZW50W1widW5pdHNcIl0sIChvYmo6Q291cnNlVW5pdCk9PiB7XG4gICAgICAgIHJldHVybiBvYmouaWQgPT0gdW5pdC5pZDtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFzdENvdXJzZVRpbWVzdGFtcChjb3Vyc2U6IENvdXJzZSkge1xuICAgIHZhciB0aW1lc3RhbXAgPSBjb3Vyc2UuY3JlYXRlX2RhdGUuZ2V0VGltZSgpO1xuICAgIHZhciBlZGl0b3JSb2xlID0gdGhpcy5nZXRDb3Vyc2VNZW1iZXJCeVJvbGUoJ2VkaXRvcicsIGNvdXJzZS5pZCk7XG4gICAgdmFyIHN0dWRlbnRSb2xlID0gdGhpcy5nZXRDb3Vyc2VNZW1iZXJCeVJvbGUoJ3N0dWRlbnQnLCBjb3Vyc2UuaWQpO1xuICAgIHZhciB0ZWFjaGVyUm9sZSA9IHRoaXMuZ2V0Q291cnNlTWVtYmVyQnlSb2xlKCd0ZWFjaGVyJywgY291cnNlLmlkKTtcbiAgICB2YXIgc3VwZXJ2aXNvclJvbGUgPSB0aGlzLmdldENvdXJzZU1lbWJlckJ5Um9sZSgnc3VwZXJ2aXNvcicsIGNvdXJzZS5pZCk7XG4gICAgaWYgKHN0dWRlbnRSb2xlICYmIHN0dWRlbnRSb2xlLmNyZWF0ZV9kYXRlLmdldFRpbWUoKSA8IHRpbWVzdGFtcClcbiAgICAgIHRpbWVzdGFtcCA9IHN0dWRlbnRSb2xlLmNyZWF0ZV9kYXRlLmdldFRpbWUoKTtcbiAgICBpZiAodGVhY2hlclJvbGUgJiYgdGVhY2hlclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gdGVhY2hlclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpO1xuICAgIGlmIChlZGl0b3JSb2xlICYmIGVkaXRvclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gZWRpdG9yUm9sZS5jcmVhdGVfZGF0ZS5nZXRUaW1lKCk7XG4gICAgaWYgKHN1cGVydmlzb3JSb2xlICYmIHN1cGVydmlzb3JSb2xlLmNyZWF0ZV9kYXRlLmdldFRpbWUoKSA8IHRpbWVzdGFtcClcbiAgICAgIHRpbWVzdGFtcCA9IHN1cGVydmlzb3JSb2xlLmNyZWF0ZV9kYXRlLmdldFRpbWUoKTtcbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgZ2V0Q291cnNlTWVtYmVyQnlSb2xlKHJvbGU6c3RyaW5nLCBjb3Vyc2VJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLm15Q291cnNlTWVtYmVycywgKG1lbWJlcjpDb3Vyc2VNZW1iZXIpPT4ge1xuICAgICAgcmV0dXJuIG1lbWJlci5yb2xlID09IHJvbGUgJiYgbWVtYmVyLmNvdXJzZV9pZCA9PSBjb3Vyc2VJZDtcbiAgICB9KTtcbiAgfVxuXG5cbiAgZ2V0TGFzdEV4YW1UaW1lc3RhbXAoZXhhbTogRXhhbSkge1xuICAgIHZhciB0aW1lc3RhbXAgPSBleGFtLmNyZWF0ZV9kYXRlLmdldFRpbWUoKTtcbiAgICB2YXIgZWRpdG9yUm9sZSA9IHRoaXMuZ2V0RXhhbU1lbWJlckJ5Um9sZSgnZWRpdG9yJywgZXhhbS5pZCk7XG4gICAgdmFyIGNhbmRpZGF0ZVJvbGUgPSB0aGlzLmdldEV4YW1NZW1iZXJCeVJvbGUoJ2NhbmRpZGF0ZScsIGV4YW0uaWQpO1xuICAgIHZhciBzdXBlcnZpc29yUm9sZSA9IHRoaXMuZ2V0RXhhbU1lbWJlckJ5Um9sZSgnc3VwZXJ2aXNvcicsIGV4YW0uaWQpO1xuICAgIGlmIChjYW5kaWRhdGVSb2xlICYmIGNhbmRpZGF0ZVJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gY2FuZGlkYXRlUm9sZS5jcmVhdGVfZGF0ZS5nZXRUaW1lKCk7XG4gICAgaWYgKGVkaXRvclJvbGUgJiYgZWRpdG9yUm9sZS5jcmVhdGVfZGF0ZS5nZXRUaW1lKCkgPCB0aW1lc3RhbXApXG4gICAgICB0aW1lc3RhbXAgPSBlZGl0b3JSb2xlLmNyZWF0ZV9kYXRlLmdldFRpbWUoKTtcbiAgICBpZiAoc3VwZXJ2aXNvclJvbGUgJiYgc3VwZXJ2aXNvclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gc3VwZXJ2aXNvclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpO1xuICAgIHJldHVybiB0aW1lc3RhbXA7XG4gIH1cblxuICBnZXRFeGFtTWVtYmVyQnlSb2xlKHJvbGU6c3RyaW5nLCBleGFtSWQ6IG51bWJlcikge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5teUV4YW1NZW1iZXJzLCAobWVtYmVyOkV4YW1NZW1iZXIpPT4ge1xuICAgICAgcmV0dXJuIG1lbWJlci5yb2xlID09IHJvbGUgJiYgbWVtYmVyLmV4YW1faWQgPT0gZXhhbUlkO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFzdFN1cnZleVRpbWVzdGFtcChzdXJ2ZXk6IFN1cnZleSkge1xuICAgIHZhciB0aW1lc3RhbXAgPSBzdXJ2ZXkuY3JlYXRlX2RhdGUuZ2V0VGltZSgpO1xuICAgIHZhciBlZGl0b3JSb2xlID0gdGhpcy5nZXRTdXJ2ZXlNZW1iZXJCeVJvbGUoJ2VkaXRvcicsIHN1cnZleS5pZCk7XG4gICAgdmFyIGNhbmRpZGF0ZVJvbGUgPSB0aGlzLmdldFN1cnZleU1lbWJlckJ5Um9sZSgnY2FuZGlkYXRlJywgc3VydmV5LmlkKTtcbiAgICB2YXIgc3VwZXJ2aXNvclJvbGUgPSB0aGlzLmdldFN1cnZleU1lbWJlckJ5Um9sZSgnc3VwZXJ2aXNvcicsIHN1cnZleS5pZCk7IFxuICAgIGlmIChjYW5kaWRhdGVSb2xlICYmIGNhbmRpZGF0ZVJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gY2FuZGlkYXRlUm9sZS5jcmVhdGVfZGF0ZS5nZXRUaW1lKCk7XG4gICAgaWYgKGVkaXRvclJvbGUgJiYgZWRpdG9yUm9sZS5jcmVhdGVfZGF0ZS5nZXRUaW1lKCkgPCB0aW1lc3RhbXApXG4gICAgICB0aW1lc3RhbXAgPSBlZGl0b3JSb2xlLmNyZWF0ZV9kYXRlLmdldFRpbWUoKTtcbiAgICBpZiAoc3VwZXJ2aXNvclJvbGUgJiYgc3VwZXJ2aXNvclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gc3VwZXJ2aXNvclJvbGUuY3JlYXRlX2RhdGUuZ2V0VGltZSgpO1xuICAgIHJldHVybiB0aW1lc3RhbXA7XG4gIH1cblxuICBnZXRTdXJ2ZXlNZW1iZXJCeVJvbGUocm9sZTpzdHJpbmcsIHN1cnZleUlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gXy5maW5kKHRoaXMubXlTdXJ2ZXlNZW1iZXJzLCAobWVtYmVyOlN1cnZleU1lbWJlcik9PiB7XG4gICAgICByZXR1cm4gbWVtYmVyLnJvbGUgPT0gcm9sZSAmJiBtZW1iZXIuc3VydmV5X2lkID09IHN1cnZleUlkO1xuICAgIH0pO1xuICB9XG5cblxuICBnZXRMYXN0Q29uZmVyZW5jZVRpbWVzdGFtcChtZW1iZXI6IENvbmZlcmVuY2VNZW1iZXIpIHtcbiAgICB2YXIgdGltZXN0YW1wID0gbWVtYmVyLmNvbmZlcmVuY2UuY3JlYXRlX2RhdGUuZ2V0VGltZSgpO1xuICAgIGlmIChtZW1iZXIuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDwgdGltZXN0YW1wKVxuICAgICAgdGltZXN0YW1wID0gbWVtYmVyLmNyZWF0ZV9kYXRlLmdldFRpbWUoKTtcbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbn0iXX0=
