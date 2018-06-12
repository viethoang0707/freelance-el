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
var base_model_1 = require("../base.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var answer_model_1 = require("./answer.model");
var user_model_1 = require("./user.model");
var submission_model_1 = require("./submission.model");
var course_unit_model_1 = require("./course-unit.model");
var _ = require("underscore");
var search_read_api_1 = require("../../services/api/search-read.api");
var CourseLog = (function (_super) {
    __extends(CourseLog, _super);
    function CourseLog() {
        var _this = _super.call(this) || this;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.course_id = undefined;
        _this.res_id = undefined;
        _this.res_model = undefined;
        _this.note = undefined;
        _this.code = undefined;
        _this.start = undefined;
        _this.attachment_url = undefined;
        _this.attachment_id = undefined;
        return _this;
    }
    CourseLog_1 = CourseLog;
    CourseLog.lastUserAttempt = function (context, userId, courseId) {
        var domain = "[('user_id','='," + userId + "),('course_id','='," + courseId + "),('res_model','=','" + course_unit_model_1.CourseUnit.Model + "')]";
        return CourseLog_1.search(context, [], domain).flatMap(function (logs) {
            if (logs.length == 0)
                return Rx_1.Observable.of(null);
            else {
                var last_attempt = _.max(logs, function (log) {
                    return log.start.getTime();
                });
                return Rx_1.Observable.of(last_attempt);
            }
        });
    };
    CourseLog.__api__userStudyActivity = function (userId, courseId) {
        var domain = "";
        if (courseId)
            domain = "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]";
        else
            domain = "[('user_id','='," + userId + ")]";
        return new search_read_api_1.SearchReadAPI(CourseLog_1.Model, [], domain);
    };
    CourseLog.userStudyActivity = function (context, userId, courseId) {
        var domain = "";
        if (courseId)
            domain = "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]";
        else
            domain = "[('user_id','='," + userId + ")]";
        return CourseLog_1.search(context, [], domain);
    };
    CourseLog.__api__memberStudyActivity = function (memberId, courseId) {
        var domain = "";
        if (courseId)
            domain = "[('member_id','='," + memberId + "),('course_id','='," + courseId + ")]";
        else
            domain = "[('member_id','='," + memberId + ")]";
        return new search_read_api_1.SearchReadAPI(CourseLog_1.Model, [], domain);
    };
    CourseLog.memberStudyActivity = function (context, memberId, courseId) {
        var domain = "";
        if (courseId)
            domain = "[('member_id','='," + memberId + "),('course_id','='," + courseId + ")]";
        else
            domain = "[('member_id','='," + memberId + ")]";
        return CourseLog_1.search(context, [], domain);
    };
    CourseLog.__api__courseActivity = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseLog_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseLog.courseActivity = function (context, courseId) {
        return CourseLog_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseLog.startCourseUnit = function (context, memberId, unitId) {
        var log = new CourseLog_1();
        log.member_id = memberId;
        log.res_id = unit.id;
        log.res_model = course_unit_model_1.CourseUnit.Model;
        log.note = 'Start course unit';
        log.code = "START_COURSE_UNIT";
        log.start = new Date();
        return log.save(context);
    };
    CourseLog.stopCourseUnit = function (context, memberId, unitId) {
        var log = new CourseLog_1();
        log.member_id = memberId;
        log.res_id = unitId;
        log.res_model = course_unit_model_1.CourseUnit.Model;
        log.note = 'finish course unit';
        log.code = "FINISH_COURSE_UNIT";
        log.start = new Date();
        return log.save(context);
    };
    CourseLog.completeCourseUnit = function (context, memberId, unitId) {
        var log = new CourseLog_1();
        log.member_id = memberId;
        log.res_id = unitId;
        log.res_model = course_unit_model_1.CourseUnit.Model;
        log.note = 'finish course unit';
        log.code = "COMPLETE_COURSE_UNIT";
        log.start = new Date();
        return log.save(context);
    };
    CourseLog.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseLog_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseLog.listByCourse = function (context, courseId) {
        return CourseLog_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseLog.__api__listCompleteUnitByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseLog_1.Model, [], "[('course_id','='," + courseId + "),('code','=','COMPLETE_COURSE_UNIT')]");
    };
    CourseLog.listCompleteUnitByCourse = function (context, courseId) {
        return CourseLog_1.search(context, [], "[('course_id','='," + courseId + "),('code','=','COMPLETE_COURSE_UNIT')]");
    };
    var CourseLog_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], CourseLog.prototype, "start", void 0);
    CourseLog = CourseLog_1 = __decorate([
        decorator_1.Model('etraining.course_log'),
        __metadata("design:paramtypes", [])
    ], CourseLog);
    return CourseLog;
}(base_model_1.BaseModel));
exports.CourseLog = CourseLog;
var ExamLog = (function (_super) {
    __extends(ExamLog, _super);
    function ExamLog() {
        var _this = _super.call(this) || this;
        _this.user_id = undefined;
        _this.exam_id = undefined;
        _this.res_id = undefined;
        _this.res_model = undefined;
        _this.note = undefined;
        _this.member_id = undefined;
        _this.code = undefined;
        _this.start = undefined;
        _this.attachment_url = undefined;
        _this.attachment_id = undefined;
        return _this;
    }
    ExamLog_1 = ExamLog;
    ExamLog.startExam = function (context, memberId, submitId) {
        var log = new ExamLog_1();
        log.member_id = memberId;
        log.res_id = submitId;
        log.res_model = submission_model_1.Submission.Model;
        log.note = 'Start exam';
        log.code = 'START_EXAM';
        log.start = new Date();
        return log.save(context);
    };
    ExamLog.finishExam = function (context, memberId, submitId) {
        var log = new ExamLog_1();
        log.member_id = memberId;
        log.res_id = submit.id;
        log.res_model = submission_model_1.Submission.Model;
        log.note = 'Finish exam';
        log.code = 'FINISH_EXAM';
        log.start = new Date();
        return log.save(context);
    };
    ExamLog.startAnswer = function (context, memberId, answerId) {
        var log = new ExamLog_1();
        log.member_id = memberId;
        log.res_id = answer.id;
        log.res_model = answer_model_1.Answer.Model;
        log.note = 'Start answer';
        log.code = "START_ANSWER";
        log.start = new Date();
        return log.save(context);
    };
    ExamLog.finishAnswer = function (context, memberId, answerId) {
        var log = new ExamLog_1();
        log.member_id = memberId;
        log.res_id = answer.id;
        log.res_model = answer_model_1.Answer.Model;
        log.note = 'Close answer';
        log.code = "CLOSE_ANSWER";
        log.start = new Date();
        return log.save(context);
    };
    ExamLog.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamLog_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamLog.listByExam = function (context, examId) {
        return ExamLog_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    var ExamLog_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ExamLog.prototype, "start", void 0);
    ExamLog = ExamLog_1 = __decorate([
        decorator_1.Model('etraining.exam_log'),
        __metadata("design:paramtypes", [])
    ], ExamLog);
    return ExamLog;
}(base_model_1.BaseModel));
exports.ExamLog = ExamLog;
var UserLog = (function (_super) {
    __extends(UserLog, _super);
    function UserLog() {
        var _this = _super.call(this) || this;
        _this.res_id = undefined;
        _this.res_model = undefined;
        _this.user_id = undefined;
        _this.note = undefined;
        _this.code = undefined;
        _this.start = undefined;
        return _this;
    }
    UserLog_1 = UserLog;
    UserLog.login = function (context, userId) {
        var log = new UserLog_1();
        log.user_id = userId;
        log.res_id = userId;
        log.res_model = user_model_1.User.Model;
        log.note = 'User login';
        log.code = 'LOGIN';
        log.start = new Date();
        return log.save(context);
    };
    UserLog.logout = function (context, userId) {
        var log = new UserLog_1();
        log.user_id = userId;
        log.res_id = userId;
        log.res_model = user_model_1.User.Model;
        log.note = 'User logout';
        log.code = 'LOGOUT';
        log.start = new Date();
        return log.save(context);
    };
    var UserLog_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], UserLog.prototype, "start", void 0);
    UserLog = UserLog_1 = __decorate([
        decorator_1.Model('etraining.user_log'),
        __metadata("design:paramtypes", [])
    ], UserLog);
    return UserLog;
}(base_model_1.BaseModel));
exports.UserLog = UserLog;
//# sourceMappingURL=log.model.js.map