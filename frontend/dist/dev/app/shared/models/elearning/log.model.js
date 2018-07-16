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
var decorator_1 = require("../decorator");
var answer_model_1 = require("./answer.model");
var user_model_1 = require("./user.model");
var submission_model_1 = require("./submission.model");
var course_unit_model_1 = require("./course-unit.model");
var search_read_api_1 = require("../../services/api/search-read.api");
var CourseLog = (function (_super) {
    __extends(CourseLog, _super);
    function CourseLog() {
        var _this = _super.call(this) || this;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.course_id = undefined;
        _this.class_id = undefined;
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
    CourseLog.__api__classActivity = function (classId) {
        return new search_read_api_1.SearchReadAPI(CourseLog_1.Model, [], "[('class_id','='," + classId + ")]");
    };
    CourseLog.classActivity = function (context, classId) {
        return CourseLog_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    CourseLog.startCourseUnit = function (context, memberId, unitId) {
        var log = new CourseLog_1();
        log.member_id = memberId;
        log.res_id = unitId;
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
        log.res_id = submitId;
        log.res_model = submission_model_1.Submission.Model;
        log.note = 'Finish exam';
        log.code = 'FINISH_EXAM';
        log.start = new Date();
        return log.save(context);
    };
    ExamLog.startAnswer = function (context, memberId, answerId) {
        var log = new ExamLog_1();
        log.member_id = memberId;
        log.res_id = answerId;
        log.res_model = answer_model_1.Answer.Model;
        log.note = 'Start answer';
        log.code = "START_ANSWER";
        log.start = new Date();
        return log.save(context);
    };
    ExamLog.finishAnswer = function (context, memberId, answerId) {
        var log = new ExamLog_1();
        log.member_id = memberId;
        log.res_id = answerId;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFvRDtBQUdwRCwrQ0FBd0M7QUFDeEMsMkNBQW9DO0FBQ3BDLHVEQUFnRDtBQUNoRCx5REFBaUQ7QUFFakQsc0VBQW1FO0FBSW5FO0lBQStCLDZCQUFTO0lBRXBDO1FBQUEsWUFDSSxpQkFBTyxTQWFWO1FBWEcsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFDaEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7O0lBQ25DLENBQUM7a0JBaEJRLFNBQVM7SUErQlgsa0NBQXdCLEdBQS9CLFVBQWdDLE1BQU0sRUFBRSxRQUFRO1FBQzVDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFFBQVE7WUFDUixNQUFNLEdBQUcsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLHFCQUFxQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7O1lBRXZFLE1BQU0sR0FBRyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO1FBQzNDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFdB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QUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sY0FBTSxHQUFiLFVBQWMsT0FBa0IsRUFBRSxNQUFhO1FBQzNDLElBQUksR0FBRyxHQUFHLElBQUksU0FBTyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsR0FBRyxDQUFDLFNBQVMsR0FBSSxpQkFBSSxDQUFDLEtBQUssQ0FBQztRQUM1QixHQUFHLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUN6QixHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNwQixHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7O0lBdkJEO1FBREMseUJBQWEsRUFBUTtrQ0FDZixJQUFJOzBDQUFDO0lBakJILE9BQU87UUFEbkIsaUJBQUssQ0FBQyxvQkFBb0IsQ0FBQzs7T0FDZixPQUFPLENBMENuQjtJQUFELGNBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQzRCLHNCQUFTLEdBMENyQztBQTFDWSwwQkFBTyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCwgRmllbGRQcm9wZXJ0eSB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4vY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLmNvdXJzZV9sb2cnKVxuZXhwb3J0IGNsYXNzIENvdXJzZUxvZyBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVzZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVtYmVyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvdXJzZV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jbGFzc19pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZXNfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVzX21vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5vdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY29kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGFydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5hdHRhY2htZW50X3VybCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5hdHRhY2htZW50X2lkID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlc19pZDogbnVtYmVyO1xuICAgIHVzZXJfaWQ6IG51bWJlcjtcbiAgICBtZW1iZXJfaWQ6IG51bWJlcjtcbiAgICBjb3Vyc2VfaWQ6IG51bWJlcjtcbiAgICBjbGFzc19pZDogbnVtYmVyO1xuICAgIHJlc19tb2RlbDogc3RyaW5nO1xuICAgIG5vdGU6IHN0cmluZztcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGF0dGFjaG1lbnRfdXJsOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudF9pZDogbnVtYmVyO1xuXG4gICAgc3RhdGljIF9fYXBpX191c2VyU3R1ZHlBY3Rpdml0eSh1c2VySWQsIGNvdXJzZUlkKTpTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgdmFyIGRvbWFpbiA9IFwiXCI7XG4gICAgICAgIGlmIChjb3Vyc2VJZClcbiAgICAgICAgICAgIGRvbWFpbiA9IFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIiksKCdjb3Vyc2VfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIildXCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRvbWFpbiA9IFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCJcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZUxvZy5Nb2RlbCwgW10sIGRvbWFpbiApO1xuICAgIH1cblxuICAgIHN0YXRpYyB1c2VyU3R1ZHlBY3Rpdml0eShjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZCwgY291cnNlSWQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBkb21haW4gPSBcIlwiO1xuICAgICAgICBpZiAoY291cnNlSWQpXG4gICAgICAgICAgICBkb21haW4gPSBcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpLCgnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkb21haW4gPSBcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiXG4gICAgICAgIHJldHVybiBDb3Vyc2VMb2cuc2VhcmNoKGNvbnRleHQsW10sIGRvbWFpbiApO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbWVtYmVyU3R1ZHlBY3Rpdml0eShtZW1iZXJJZCwgY291cnNlSWQpOlNlYXJjaFJlYWRBUEkge1xuICAgICAgICB2YXIgZG9tYWluID0gXCJcIjtcbiAgICAgICAgaWYgKGNvdXJzZUlkKVxuICAgICAgICAgICAgZG9tYWluID0gXCJbKCdtZW1iZXJfaWQnLCc9JyxcIittZW1iZXJJZCtcIiksKCdjb3Vyc2VfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIildXCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRvbWFpbiA9IFwiWygnbWVtYmVyX2lkJywnPScsXCIrbWVtYmVySWQrXCIpXVwiXG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VMb2cuTW9kZWwsIFtdLCBkb21haW4gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWVtYmVyU3R1ZHlBY3Rpdml0eShjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkLCBjb3Vyc2VJZCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGRvbWFpbiA9IFwiXCI7XG4gICAgICAgIGlmIChjb3Vyc2VJZClcbiAgICAgICAgICAgIGRvbWFpbiA9IFwiWygnbWVtYmVyX2lkJywnPScsXCIrbWVtYmVySWQrXCIpLCgnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkb21haW4gPSBcIlsoJ21lbWJlcl9pZCcsJz0nLFwiK21lbWJlcklkK1wiKV1cIlxuICAgICAgICByZXR1cm4gQ291cnNlTG9nLnNlYXJjaChjb250ZXh0LFtdLCBkb21haW4gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2NvdXJzZUFjdGl2aXR5KGNvdXJzZUlkKTpTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZUxvZy5Nb2RlbCwgW10sIFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdXJzZUFjdGl2aXR5KGNvbnRleHQ6QVBJQ29udGV4dCwgY291cnNlSWQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VMb2cuc2VhcmNoKGNvbnRleHQsW10sIFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiICk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jbGFzc0FjdGl2aXR5KGNsYXNzSWQpOlNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ291cnNlTG9nLk1vZGVsLCBbXSwgXCJbKCdjbGFzc19pZCcsJz0nLFwiK2NsYXNzSWQrXCIpXVwiICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsYXNzQWN0aXZpdHkoY29udGV4dDpBUElDb250ZXh0LCBjbGFzc0lkKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gQ291cnNlTG9nLnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2NsYXNzX2lkJywnPScsXCIrY2xhc3NJZCtcIildXCIgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RhcnRDb3Vyc2VVbml0KGNvbnRleHQ6QVBJQ29udGV4dCwgbWVtYmVySWQ6bnVtYmVyLCAgdW5pdElkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGxvZyA9IG5ldyBDb3Vyc2VMb2coKTtcbiAgICAgICAgbG9nLm1lbWJlcl9pZCA9IG1lbWJlcklkO1xuICAgICAgICBsb2cucmVzX2lkID0gdW5pdElkO1xuICAgICAgICBsb2cucmVzX21vZGVsID0gQ291cnNlVW5pdC5Nb2RlbDtcbiAgICAgICAgbG9nLm5vdGUgPSAnU3RhcnQgY291cnNlIHVuaXQnO1xuICAgICAgICBsb2cuY29kZSA9IFwiU1RBUlRfQ09VUlNFX1VOSVRcIjtcbiAgICAgICAgbG9nLnN0YXJ0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIGxvZy5zYXZlKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdG9wQ291cnNlVW5pdChjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkOm51bWJlciwgIHVuaXRJZDpudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBsb2cgPSBuZXcgQ291cnNlTG9nKCk7XG4gICAgICAgIGxvZy5tZW1iZXJfaWQgPSBtZW1iZXJJZDtcbiAgICAgICAgbG9nLnJlc19pZCA9IHVuaXRJZDtcbiAgICAgICAgbG9nLnJlc19tb2RlbCA9IENvdXJzZVVuaXQuTW9kZWw7XG4gICAgICAgIGxvZy5ub3RlID0gJ2ZpbmlzaCBjb3Vyc2UgdW5pdCc7XG4gICAgICAgIGxvZy5jb2RlID0gXCJGSU5JU0hfQ09VUlNFX1VOSVRcIjtcbiAgICAgICAgbG9nLnN0YXJ0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIGxvZy5zYXZlKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wbGV0ZUNvdXJzZVVuaXQoY29udGV4dDpBUElDb250ZXh0LCAgbWVtYmVySWQ6bnVtYmVyLCAgdW5pdElkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGxvZyA9IG5ldyBDb3Vyc2VMb2coKTtcbiAgICAgICAgbG9nLm1lbWJlcl9pZCA9IG1lbWJlcklkO1xuICAgICAgICBsb2cucmVzX2lkID0gdW5pdElkO1xuICAgICAgICBsb2cucmVzX21vZGVsID0gQ291cnNlVW5pdC5Nb2RlbDtcbiAgICAgICAgbG9nLm5vdGUgPSAnZmluaXNoIGNvdXJzZSB1bml0JztcbiAgICAgICAgbG9nLmNvZGUgPSBcIkNPTVBMRVRFX0NPVVJTRV9VTklUXCI7XG4gICAgICAgIGxvZy5zdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiBsb2cuc2F2ZShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VMb2cuTW9kZWwsIFtdLFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q291cnNlKCBjb250ZXh0OkFQSUNvbnRleHQsIGNvdXJzZUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VMb2cuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdjb3Vyc2VfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdENvbXBsZXRlVW5pdEJ5Q291cnNlKGNvdXJzZUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZUxvZy5Nb2RlbCwgW10sXCJbKCdjb3Vyc2VfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIiksKCdjb2RlJywnPScsJ0NPTVBMRVRFX0NPVVJTRV9VTklUJyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0Q29tcGxldGVVbml0QnlDb3Vyc2UoIGNvbnRleHQ6QVBJQ29udGV4dCwgY291cnNlSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZUxvZy5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2NvdXJzZV9pZCcsJz0nLFwiK2NvdXJzZUlkK1wiKSwoJ2NvZGUnLCc9JywnQ09NUExFVEVfQ09VUlNFX1VOSVQnKV1cIik7XG4gICAgfVxuXG59XG5cblxuQE1vZGVsKCdldHJhaW5pbmcuZXhhbV9sb2cnKVxuZXhwb3J0IGNsYXNzIEV4YW1Mb2cgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmV4YW1faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVzX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnJlc19tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ub3RlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lbWJlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmF0dGFjaG1lbnRfdXJsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmF0dGFjaG1lbnRfaWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmVzX2lkOiBudW1iZXI7XG4gICAgdXNlcl9pZDogbnVtYmVyO1xuICAgIGV4YW1faWQ6IG51bWJlcjtcbiAgICBtZW1iZXJfaWQ6IG51bWJlcjtcbiAgICByZXNfbW9kZWw6IHN0cmluZztcbiAgICBub3RlOiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBzdGFydDogRGF0ZTtcbiAgICBhdHRhY2htZW50X3VybDogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnRfaWQ6IG51bWJlcjtcblxuXG4gICAgc3RhdGljIHN0YXJ0RXhhbShjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkOiBudW1iZXIsIHN1Ym1pdElkOiBudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBsb2cgPSBuZXcgRXhhbUxvZygpO1xuICAgICAgICBsb2cubWVtYmVyX2lkID0gIG1lbWJlcklkO1xuICAgICAgICBsb2cucmVzX2lkID0gc3VibWl0SWQ7XG4gICAgICAgIGxvZy5yZXNfbW9kZWwgPSBTdWJtaXNzaW9uLk1vZGVsO1xuICAgICAgICBsb2cubm90ZSA9ICdTdGFydCBleGFtJztcbiAgICAgICAgbG9nLmNvZGUgPSAnU1RBUlRfRVhBTSc7XG4gICAgICAgIGxvZy5zdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiBsb2cuc2F2ZShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluaXNoRXhhbShjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkOiBudW1iZXIsIHN1Ym1pdElkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGxvZyA9IG5ldyBFeGFtTG9nKCk7XG4gICAgICAgIGxvZy5tZW1iZXJfaWQgPSAgbWVtYmVySWQ7XG4gICAgICAgIGxvZy5yZXNfaWQgPSBzdWJtaXRJZDtcbiAgICAgICAgbG9nLnJlc19tb2RlbCA9IFN1Ym1pc3Npb24uTW9kZWw7XG4gICAgICAgIGxvZy5ub3RlID0gJ0ZpbmlzaCBleGFtJztcbiAgICAgICAgbG9nLmNvZGUgPSAnRklOSVNIX0VYQU0nO1xuICAgICAgICBsb2cuc3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gbG9nLnNhdmUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0YXJ0QW5zd2VyKGNvbnRleHQ6QVBJQ29udGV4dCwgbWVtYmVySWQ6IG51bWJlciwgIGFuc3dlcklkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGxvZyA9IG5ldyBFeGFtTG9nKCk7XG4gICAgICAgIGxvZy5tZW1iZXJfaWQgPSAgbWVtYmVySWQ7XG4gICAgICAgIGxvZy5yZXNfaWQgPSBhbnN3ZXJJZDtcbiAgICAgICAgbG9nLnJlc19tb2RlbCA9IEFuc3dlci5Nb2RlbDtcbiAgICAgICAgbG9nLm5vdGUgPSAnU3RhcnQgYW5zd2VyJztcbiAgICAgICAgbG9nLmNvZGUgPSBcIlNUQVJUX0FOU1dFUlwiO1xuICAgICAgICBsb2cuc3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gbG9nLnNhdmUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmlzaEFuc3dlcihjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkOiBudW1iZXIsIGFuc3dlcklkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGxvZyA9IG5ldyBFeGFtTG9nKCk7XG4gICAgICAgIGxvZy5tZW1iZXJfaWQgPSAgbWVtYmVySWQ7XG4gICAgICAgIGxvZy5yZXNfaWQgPSBhbnN3ZXJJZDtcbiAgICAgICAgbG9nLnJlc19tb2RlbCA9IEFuc3dlci5Nb2RlbDtcbiAgICAgICAgbG9nLm5vdGUgPSAnQ2xvc2UgYW5zd2VyJztcbiAgICAgICAgbG9nLmNvZGUgPSBcIkNMT1NFX0FOU1dFUlwiO1xuICAgICAgICBsb2cuc3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gbG9nLnNhdmUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlFeGFtKGV4YW1JZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtTG9nLk1vZGVsLCBbXSxcIlsoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5RXhhbSggY29udGV4dDpBUElDb250ZXh0LCBleGFtSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1Mb2cuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdleGFtX2lkJywnPScsXCIrZXhhbUlkK1wiKV1cIik7XG4gICAgfVxufVxuXG5cbkBNb2RlbCgnZXRyYWluaW5nLnVzZXJfbG9nJylcbmV4cG9ydCBjbGFzcyBVc2VyTG9nIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXNfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVzX21vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVzZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubm90ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXNfaWQ6IG51bWJlcjtcbiAgICByZXNfbW9kZWw6IHN0cmluZztcbiAgICB1c2VyX2lkOiBudW1iZXI7XG4gICAgbm90ZTogc3RyaW5nO1xuICAgIGNvZGU6IHN0cmluZztcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgc3RhcnQ6IERhdGU7XG5cblxuICAgIHN0YXRpYyBsb2dpbihjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZDpudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBsb2cgPSBuZXcgVXNlckxvZygpO1xuICAgICAgICBsb2cudXNlcl9pZCA9IHVzZXJJZDtcbiAgICAgICAgbG9nLnJlc19pZCA9IHVzZXJJZDtcbiAgICAgICAgbG9nLnJlc19tb2RlbCA9ICBVc2VyLk1vZGVsO1xuICAgICAgICBsb2cubm90ZSA9ICdVc2VyIGxvZ2luJztcbiAgICAgICAgbG9nLmNvZGUgPSAnTE9HSU4nO1xuICAgICAgICBsb2cuc3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gbG9nLnNhdmUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZ291dChjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZDpudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBsb2cgPSBuZXcgVXNlckxvZygpO1xuICAgICAgICBsb2cudXNlcl9pZCA9IHVzZXJJZDtcbiAgICAgICAgbG9nLnJlc19pZCA9IHVzZXJJZDtcbiAgICAgICAgbG9nLnJlc19tb2RlbCA9ICBVc2VyLk1vZGVsO1xuICAgICAgICBsb2cubm90ZSA9ICdVc2VyIGxvZ291dCc7XG4gICAgICAgIGxvZy5jb2RlID0gJ0xPR09VVCc7XG4gICAgICAgIGxvZy5zdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiBsb2cuc2F2ZShjb250ZXh0KTtcbiAgICB9XG5cbn0iXX0=
