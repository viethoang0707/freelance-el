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
var conference_member_model_1 = require("./conference-member.model");
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var course_model_1 = require("./course.model");
var course_certificate_model_1 = require("./course-certificate.model");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
var execute_api_1 = require("../../services/api/execute.api");
var course_class_model_1 = require("./course-class.model");
var CourseMember = (function (_super) {
    __extends(CourseMember, _super);
    function CourseMember() {
        var _this = _super.call(this) || this;
        _this.course_id = undefined;
        _this.class_id = undefined;
        _this.date_register = undefined;
        _this.status = undefined;
        _this.role = undefined;
        _this.name = undefined;
        _this.course_name = undefined;
        _this.course_code = undefined;
        _this.course_mode = undefined;
        _this.enroll_status = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.user_id = undefined;
        _this.login = undefined;
        _this.image = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.course = new course_model_1.Course();
        _this.clazz = new course_class_model_1.CourseClass();
        _this.certificate = new course_certificate_model_1.Certificate();
        _this.certificate_id = undefined;
        _this.conference_member_id = undefined;
        _this.conference_member = new conference_member_model_1.ConferenceMember();
        _this.course_review_state = undefined;
        return _this;
    }
    CourseMember_1 = CourseMember;
    CourseMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    CourseMember.listByUser = function (context, userId) {
        return CourseMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    CourseMember.__api__listByClass = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('class_id','='," + courseId + ")]");
    };
    CourseMember.listByClass = function (context, classId) {
        return CourseMember_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    CourseMember.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseMember.listByCourse = function (context, courseId) {
        return CourseMember_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseMember.__api__countTeacher = function () {
        return new search_count_api_1.SearchCountAPI(CourseMember_1.Model, "[('role','=','teacher')]");
    };
    CourseMember.countTeacher = function (context) {
        return CourseMember_1.count(context, "[('role','=','teacher')]");
    };
    CourseMember.__api__countStudent = function () {
        return new search_count_api_1.SearchCountAPI(CourseMember_1.Model, "[('role','=','student')]");
    };
    CourseMember.countStudent = function (context) {
        return CourseMember_1.count(context, "[('role','=','student')]");
    };
    CourseMember.__api__byCourseAndUser = function (userId, courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]");
    };
    CourseMember.byCourseAndUser = function (context, userId, courseId) {
        return CourseMember_1.search(context, [], "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]");
    };
    CourseMember.__api__courseEditor = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('role','=','editor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.courseEditor = function (context, courseId) {
        return CourseMember_1.single(context, [], "[('role','=','editor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.__api__courseSupervisor = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('role','=','supervisor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.courseSupervisor = function (context, courseId) {
        return CourseMember_1.single(context, [], "[('role','=','supervisor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.prototype.__api__populateCourse = function () {
        return new list_api_1.ListAPI(course_model_1.Course.Model, [this.course_id], []);
    };
    CourseMember.prototype.populateCourse = function (context) {
        var _this = this;
        if (!this.course_id)
            return Rx_1.Observable.of(null);
        return course_model_1.Course.get(context, this.course_id).do(function (course) {
            _this.course = course;
        });
    };
    CourseMember.populateCourses = function (context, members) {
        var courseIds = _.pluck(members, 'course_id');
        courseIds = _.filter(courseIds, function (id) {
            return id;
        });
        return course_model_1.Course.array(context, courseIds).do(function (courses) {
            _.each(members, function (member) {
                member.course = _.find(courses, function (course) {
                    return member.course_id == course.id;
                });
            });
        });
    };
    CourseMember.prototype.__api__complete_course = function (memberId, certificateId) {
        return new execute_api_1.ExecuteAPI(CourseMember_1.Model, 'complete_course', { memberId: memberId, certificateId: certificateId }, null);
    };
    CourseMember.prototype.completeCourse = function (context, certificateId) {
        return context.apiService.execute(this.__api__complete_course(this.id, certificateId), context.authService.LoginToken);
    };
    CourseMember.prototype.__api__populateClass = function () {
        return new list_api_1.ListAPI(course_class_model_1.CourseClass.Model, [this.class_id], []);
    };
    CourseMember.prototype.populateClass = function (context) {
        var _this = this;
        if (!this.course_id)
            return Rx_1.Observable.of(null);
        return course_class_model_1.CourseClass.get(context, this.class_id).do(function (clazz) {
            _this.clazz = clazz;
        });
    };
    CourseMember.populateClasses = function (context, members) {
        var classIds = _.pluck(members, 'class_id');
        classIds = _.filter(classIds, function (id) {
            return id;
        });
        return course_class_model_1.CourseClass.array(context, classIds).do(function (classList) {
            _.each(members, function (member) {
                member.clazz = _.find(classList, function (clazz) {
                    return member.class_id == clazz.id;
                });
            });
        });
    };
    CourseMember.prototype.__api__populateConferenceMember = function () {
        return new list_api_1.ListAPI(conference_member_model_1.ConferenceMember.Model, [this.conference_member_id], []);
    };
    CourseMember.prototype.populateConferenceMember = function (context) {
        var _this = this;
        if (!this.conference_member_id)
            return Rx_1.Observable.of(null);
        return conference_member_model_1.ConferenceMember.get(context, this.conference_member_id).do(function (member) {
            _this.conference_member = member;
        });
    };
    CourseMember.populateConferenceMembers = function (context, members) {
        var memberIds = _.pluck(members, 'conference_member_id');
        memberIds = _.filter(memberIds, function (id) {
            return id;
        });
        return conference_member_model_1.ConferenceMember.array(context, memberIds).do(function (memberList) {
            _.each(members, function (member) {
                member.conference_member = _.find(memberList, function (confMember) {
                    return member.conference_member_id == confMember.id;
                });
            });
        });
    };
    var CourseMember_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], CourseMember.prototype, "date_register", void 0);
    CourseMember = CourseMember_1 = __decorate([
        decorator_1.Model('etraining.course_member'),
        __metadata("design:paramtypes", [])
    ], CourseMember);
    return CourseMember;
}(base_model_1.BaseModel));
exports.CourseMember = CourseMember;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUMxQyw4QkFBOEM7QUFDOUMsMENBQW9EO0FBRXBELHFFQUE2RDtBQUM3RCxzRUFBbUU7QUFFbkUsd0VBQXFFO0FBQ3JFLCtDQUF3QztBQUN4Qyx1RUFBeUQ7QUFFekQsd0RBQXNEO0FBRXRELDhCQUFnQztBQUNoQyw4REFBNEQ7QUFDNUQsMkRBQW1EO0FBR25EO0lBQWtDLGdDQUFTO0lBR3ZDO1FBQUEsWUFDSSxpQkFBTyxTQTBCVjtRQXhCRyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztR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Q0FBQyxVQUFVLEVBQUUsVUFBQyxVQUEyQjtvQkFDdkUsT0FBTyxNQUFNLENBQUMsb0JBQW9CLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7SUE3SkQ7UUFEQyx5QkFBYSxFQUFRO2tDQUNQLElBQUk7dURBQUM7SUFwRFgsWUFBWTtRQUR4QixpQkFBSyxDQUFDLHlCQUF5QixDQUFDOztPQUNwQixZQUFZLENBbU54QjtJQUFELG1CQUFDO0NBbk5ELEFBbU5DLENBbk5pQyxzQkFBUyxHQW1OMUM7QUFuTlksb0NBQVkiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLCBGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IENvbmZlcmVuY2VNZW1iZXIgfSBmcm9tICcuL2NvbmZlcmVuY2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBTZWFyY2hDb3VudEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtY291bnQuYXBpJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4vY291cnNlLm1vZGVsJztcbmltcG9ydCB7IENlcnRpZmljYXRlIH0gZnJvbSAnLi9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi9sb2cubW9kZWwnO1xuaW1wb3J0IHsgTGlzdEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9saXN0LmFwaSc7XG5pbXBvcnQgeyBCdWxrTGlzdEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9idWxrLWxpc3QuYXBpJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpJztcbmltcG9ydCB7IENvdXJzZUNsYXNzIH0gZnJvbSAnLi9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5jb3Vyc2VfbWVtYmVyJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNZW1iZXIgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmNvdXJzZV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jbGFzc19pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kYXRlX3JlZ2lzdGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yb2xlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX25hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX2NvZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX21vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZW5yb2xsX3N0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5waG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmxvZ2luID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmltYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlID0gbmV3IENvdXJzZSgpO1xuICAgICAgICB0aGlzLmNsYXp6ID0gIG5ldyBDb3Vyc2VDbGFzcygpO1xuICAgICAgICB0aGlzLmNlcnRpZmljYXRlID0gIG5ldyBDZXJ0aWZpY2F0ZSgpO1xuICAgICAgICB0aGlzLmNlcnRpZmljYXRlX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbmZlcmVuY2VfbWVtYmVyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbmZlcmVuY2VfbWVtYmVyID0gIG5ldyBDb25mZXJlbmNlTWVtYmVyKCk7XG4gICAgICAgIHRoaXMuY291cnNlX3Jldmlld19zdGF0ZSA9ICB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY291cnNlX2lkOiBudW1iZXI7XG4gICAgY291cnNlX3Jldmlld19zdGF0ZTogc3RyaW5nO1xuICAgIGNvbmZlcmVuY2VfbWVtYmVyX2lkOiBudW1iZXI7XG4gICAgY29uZmVyZW5jZV9tZW1iZXI6IENvbmZlcmVuY2VNZW1iZXI7XG4gICAgY291cnNlOyBDb3Vyc2U7XG4gICAgY2xheno6IENvdXJzZUNsYXNzO1xuICAgIGNlcnRpZmljYXRlX2lkOiBudW1iZXI7XG4gICAgY2VydGlmaWNhdGU6IENlcnRpZmljYXRlO1xuICAgIHVzZXJfaWQ6IG51bWJlcjtcbiAgICBjbGFzc19pZDogbnVtYmVyO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHJvbGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbG9naW46IHN0cmluZztcbiAgICBpbWFnZTogc3RyaW5nO1xuICAgIGNvdXJzZV9uYW1lOiBzdHJpbmc7XG4gICAgY291cnNlX21vZGU6IHN0cmluZztcbiAgICBjb3Vyc2VfY29kZTogc3RyaW5nO1xuICAgIGVucm9sbF9zdGF0dXM6IHN0cmluZztcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZGF0ZV9yZWdpc3RlcjogRGF0ZTtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBob25lOiBzdHJpbmc7XG4gICAgZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBncm91cF9pZF9fREVTQ19fOiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVVzZXIodXNlcklkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZU1lbWJlci5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVVzZXIoY29udGV4dDogQVBJQ29udGV4dCwgdXNlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VNZW1iZXIuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ3VzZXJfaWQnLCc9JyxcIiArIHVzZXJJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlDbGFzcyhjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VNZW1iZXIuTW9kZWwsIFtdLFwiWygnY2xhc3NfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlDbGFzcyhjb250ZXh0OiBBUElDb250ZXh0LCBjbGFzc0lkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VNZW1iZXIuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ2NsYXNzX2lkJywnPScsXCIgKyBjbGFzc0lkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VNZW1iZXIuTW9kZWwsIFtdLFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q291cnNlKGNvbnRleHQ6IEFQSUNvbnRleHQsIGNvdXJzZUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VNZW1iZXIuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ2NvdXJzZV9pZCcsJz0nLFwiICsgY291cnNlSWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fY291bnRUZWFjaGVyKCk6IFNlYXJjaENvdW50QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hDb3VudEFQSShDb3Vyc2VNZW1iZXIuTW9kZWwsIFwiWygncm9sZScsJz0nLCd0ZWFjaGVyJyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb3VudFRlYWNoZXIoY29udGV4dDogQVBJQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gQ291cnNlTWVtYmVyLmNvdW50KGNvbnRleHQsIFwiWygncm9sZScsJz0nLCd0ZWFjaGVyJyldXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jb3VudFN0dWRlbnQoKTogU2VhcmNoQ291bnRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaENvdW50QVBJKENvdXJzZU1lbWJlci5Nb2RlbCwgIFwiWygncm9sZScsJz0nLCdzdHVkZW50JyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb3VudFN0dWRlbnQoY29udGV4dDogQVBJQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gQ291cnNlTWVtYmVyLmNvdW50KGNvbnRleHQsIFwiWygncm9sZScsJz0nLCdzdHVkZW50JyldXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19ieUNvdXJzZUFuZFVzZXIodXNlcklkOiBudW1iZXIsIGNvdXJzZUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZU1lbWJlci5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIgKyB1c2VySWQgKyBcIiksKCdjb3Vyc2VfaWQnLCc9JyxcIiArIGNvdXJzZUlkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlDb3Vyc2VBbmRVc2VyKGNvbnRleHQ6IEFQSUNvbnRleHQsIHVzZXJJZDogbnVtYmVyLCBjb3Vyc2VJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZU1lbWJlci5zZWFyY2goY29udGV4dCwgW10sIFwiWygndXNlcl9pZCcsJz0nLFwiICsgdXNlcklkICsgXCIpLCgnY291cnNlX2lkJywnPScsXCIgKyBjb3Vyc2VJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jb3Vyc2VFZGl0b3IoY291cnNlSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ291cnNlTWVtYmVyLk1vZGVsLCBbXSxcIlsoJ3JvbGUnLCc9JywnZWRpdG9yJyksKCdjb3Vyc2VfaWQnLCc9JyxcIiArIGNvdXJzZUlkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY291cnNlRWRpdG9yKGNvbnRleHQ6IEFQSUNvbnRleHQsIGNvdXJzZUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gQ291cnNlTWVtYmVyLnNpbmdsZShjb250ZXh0LCBbXSwgXCJbKCdyb2xlJywnPScsJ2VkaXRvcicpLCgnY291cnNlX2lkJywnPScsXCIgKyBjb3Vyc2VJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jb3Vyc2VTdXBlcnZpc29yKGNvdXJzZUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZU1lbWJlci5Nb2RlbCwgW10sXCJbKCdyb2xlJywnPScsJ3N1cGVydmlzb3InKSwoJ2NvdXJzZV9pZCcsJz0nLFwiICsgY291cnNlSWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb3Vyc2VTdXBlcnZpc29yKGNvbnRleHQ6IEFQSUNvbnRleHQsIGNvdXJzZUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gQ291cnNlTWVtYmVyLnNpbmdsZShjb250ZXh0LCBbXSwgXCJbKCdyb2xlJywnPScsJ3N1cGVydmlzb3InKSwoJ2NvdXJzZV9pZCcsJz0nLFwiICsgY291cnNlSWQgKyBcIildXCIpO1xuICAgIH1cblxuXG4gICAgX19hcGlfX3BvcHVsYXRlQ291cnNlKCk6IExpc3RBUEkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3RBUEkoQ291cnNlLk1vZGVsLCBbdGhpcy5jb3Vyc2VfaWRdLCBbXSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVDb3Vyc2UoY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5jb3Vyc2VfaWQpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihudWxsKTtcbiAgICAgICAgcmV0dXJuIENvdXJzZS5nZXQoY29udGV4dCwgdGhpcy5jb3Vyc2VfaWQpLmRvKGNvdXJzZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvdXJzZSA9IGNvdXJzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBvcHVsYXRlQ291cnNlcyhjb250ZXh0OiBBUElDb250ZXh0LCBtZW1iZXJzOiBDb3Vyc2VNZW1iZXJbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBjb3Vyc2VJZHMgPSBfLnBsdWNrKG1lbWJlcnMsJ2NvdXJzZV9pZCcpO1xuICAgICAgICBjb3Vyc2VJZHMgPSBfLmZpbHRlcihjb3Vyc2VJZHMsIGlkPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIENvdXJzZS5hcnJheShjb250ZXh0LCBjb3Vyc2VJZHMpLmRvKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICBfLmVhY2gobWVtYmVycywgKG1lbWJlcjpDb3Vyc2VNZW1iZXIpPT4ge1xuICAgICAgICAgICAgICAgIG1lbWJlci5jb3Vyc2UgPSAgXy5maW5kKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5jb3Vyc2VfaWQgPT0gY291cnNlLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9fYXBpX19jb21wbGV0ZV9jb3Vyc2UobWVtYmVySWQ6IG51bWJlciwgY2VydGlmaWNhdGVJZDogbnVtYmVyKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShDb3Vyc2VNZW1iZXIuTW9kZWwsICdjb21wbGV0ZV9jb3Vyc2UnLHttZW1iZXJJZDptZW1iZXJJZCwgY2VydGlmaWNhdGVJZDpjZXJ0aWZpY2F0ZUlkfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgY29tcGxldGVDb3Vyc2UoY29udGV4dDpBUElDb250ZXh0LCBjZXJ0aWZpY2F0ZUlkOiBudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19jb21wbGV0ZV9jb3Vyc2UodGhpcy5pZCwgY2VydGlmaWNhdGVJZCksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgICB9XG5cblxuICAgIF9fYXBpX19wb3B1bGF0ZUNsYXNzKCk6IExpc3RBUEkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3RBUEkoQ291cnNlQ2xhc3MuTW9kZWwsIFt0aGlzLmNsYXNzX2lkXSwgW10pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlQ2xhc3MoY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5jb3Vyc2VfaWQpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihudWxsKTtcbiAgICAgICAgcmV0dXJuIENvdXJzZUNsYXNzLmdldChjb250ZXh0LCB0aGlzLmNsYXNzX2lkKS5kbyhjbGF6eiA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsYXp6ID0gY2xheno7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBwb3B1bGF0ZUNsYXNzZXMoY29udGV4dDogQVBJQ29udGV4dCwgbWVtYmVyczogQ291cnNlTWVtYmVyW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgY2xhc3NJZHMgPSBfLnBsdWNrKG1lbWJlcnMsJ2NsYXNzX2lkJyk7XG4gICAgICAgIGNsYXNzSWRzID0gXy5maWx0ZXIoY2xhc3NJZHMsIGlkPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIENvdXJzZUNsYXNzLmFycmF5KGNvbnRleHQsIGNsYXNzSWRzKS5kbyhjbGFzc0xpc3Q9PiB7XG4gICAgICAgICAgICBfLmVhY2gobWVtYmVycywgKG1lbWJlcjpDb3Vyc2VNZW1iZXIpPT4ge1xuICAgICAgICAgICAgICAgIG1lbWJlci5jbGF6eiA9ICBfLmZpbmQoY2xhc3NMaXN0LCAoY2xheno6Q291cnNlQ2xhc3MpPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVtYmVyLmNsYXNzX2lkID09IGNsYXp6LmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9fYXBpX19wb3B1bGF0ZUNvbmZlcmVuY2VNZW1iZXIoKTogTGlzdEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEFQSShDb25mZXJlbmNlTWVtYmVyLk1vZGVsLCBbdGhpcy5jb25mZXJlbmNlX21lbWJlcl9pZF0sIFtdKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUNvbmZlcmVuY2VNZW1iZXIoY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5jb25mZXJlbmNlX21lbWJlcl9pZClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKG51bGwpO1xuICAgICAgICByZXR1cm4gQ29uZmVyZW5jZU1lbWJlci5nZXQoY29udGV4dCwgdGhpcy5jb25mZXJlbmNlX21lbWJlcl9pZCkuZG8obWVtYmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29uZmVyZW5jZV9tZW1iZXIgPSBtZW1iZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBwb3B1bGF0ZUNvbmZlcmVuY2VNZW1iZXJzKGNvbnRleHQ6IEFQSUNvbnRleHQsIG1lbWJlcnM6IENvdXJzZU1lbWJlcltdKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIG1lbWJlcklkcyA9IF8ucGx1Y2sobWVtYmVycywnY29uZmVyZW5jZV9tZW1iZXJfaWQnKTtcbiAgICAgICAgbWVtYmVySWRzID0gXy5maWx0ZXIobWVtYmVySWRzLCBpZD0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBDb25mZXJlbmNlTWVtYmVyLmFycmF5KGNvbnRleHQsIG1lbWJlcklkcykuZG8obWVtYmVyTGlzdD0+IHtcbiAgICAgICAgICAgIF8uZWFjaChtZW1iZXJzLCAobWVtYmVyOkNvdXJzZU1lbWJlcik9PiB7XG4gICAgICAgICAgICAgICAgbWVtYmVyLmNvbmZlcmVuY2VfbWVtYmVyID0gIF8uZmluZChtZW1iZXJMaXN0LCAoY29uZk1lbWJlcjpDb25mZXJlbmNlTWVtYmVyKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5jb25mZXJlbmNlX21lbWJlcl9pZCA9PSBjb25mTWVtYmVyLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
