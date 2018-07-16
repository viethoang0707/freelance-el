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
var search_read_api_1 = require("../../services/api/search-read.api");
var base_model_1 = require("../base.model");
var exam_model_1 = require("./exam.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var _ = require("underscore");
var list_api_1 = require("../../services/api/list.api");
var execute_api_1 = require("../../services/api/execute.api");
var ExamMember = (function (_super) {
    __extends(ExamMember, _super);
    function ExamMember() {
        var _this = _super.call(this) || this;
        _this.exam_id = undefined;
        _this.exam_name = undefined;
        _this.date_register = undefined;
        _this.status = undefined;
        _this.enroll_status = undefined;
        _this.role = undefined;
        _this.name = undefined;
        _this.login = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.user_id = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.course_member_id = undefined;
        _this.exam = new exam_model_1.Exam();
        _this.submission_id = undefined;
        _this.class_id = undefined;
        _this.exam_review_state = undefined;
        return _this;
    }
    ExamMember_1 = ExamMember;
    ExamMember.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamMember.listByExam = function (context, examId) {
        return ExamMember_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    ExamMember.__api__listCandidateByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('exam_id','='," + examId + "),('role','=','candidate')]");
    };
    ExamMember.listCandidateByExam = function (context, examId) {
        return ExamMember_1.search(context, [], "[('exam_id','='," + examId + "),('role','=','candidate')]");
    };
    ExamMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ExamMember.listByUser = function (context, userId) {
        return ExamMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ExamMember.__api__byExamAndUser = function (userId, examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]");
    };
    ExamMember.byExamAndUser = function (context, userId, examId) {
        return ExamMember_1.single(context, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]");
    };
    ExamMember.prototype.__api__populateExam = function () {
        return new list_api_1.ListAPI(exam_model_1.Exam.Model, [this.exam_id], []);
    };
    ExamMember.prototype.populateExam = function (context) {
        var _this = this;
        if (!this.exam_id)
            return Rx_1.Observable.of(null);
        return exam_model_1.Exam.get(context, this.exam_id).do(function (exam) {
            _this.exam = exam;
        });
    };
    ExamMember.populateExams = function (context, members) {
        var examIds = _.pluck(members, 'exam_id');
        examIds = _.filter(examIds, function (id) {
            return id;
        });
        return exam_model_1.Exam.array(context, examIds).do(function (exams) {
            _.each(members, function (member) {
                member.exam = _.find(exams, function (exam) {
                    return member.exam_id == exam.id;
                });
            });
        });
    };
    ExamMember.__api__examEditor = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('role','=','editor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.examEditor = function (context, examId) {
        return ExamMember_1.single(context, [], "[('role','=','editor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.__api__examSupervisor = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('role','=','supervisor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.examSupervisor = function (context, examId) {
        return ExamMember_1.single(context, [], "[('role','=','supervisor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.prototype.__api__submit_score = function (memberId) {
        return new execute_api_1.ExecuteAPI(ExamMember_1.Model, 'submit_exam', { memberId: memberId }, null);
    };
    ExamMember.prototype.submitScore = function (context) {
        return context.apiService.execute(this.__api__submit_score(this.id), context.authService.LoginToken);
    };
    var ExamMember_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ExamMember.prototype, "date_register", void 0);
    ExamMember = ExamMember_1 = __decorate([
        decorator_1.Model('etraining.exam_member'),
        __metadata("design:paramtypes", [])
    ], ExamMember);
    return ExamMember;
}(base_model_1.BaseModel));
exports.ExamMember = ExamMember;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBbUU7QUFDbkUsNENBQTBDO0FBRzFDLDJDQUFvQztBQUNwQyw4QkFBOEM7QUFDOUMsMENBQW1EO0FBRW5ELDhCQUFnQztBQUVoQyx3REFBc0Q7QUFFdEQsOERBQTREO0FBRzVEO0lBQWdDLDhCQUFTO0lBRXJDO1FBQUEsWUFDSSxpQkFBTyxTQW9CVjtRQWxCRyxLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBSSxTQUFTLENBQUM7UUFDbkMsS0FBSSxDQUFDLElBQUksR0FBSSxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsUUFBUSxHQUFJLFNBQVMsQ0FBQztRQUMz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QyxPQUFPLElBQUksd0JBQVUsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsZ0NBQVcsR0FBWCxVQUFZLE9BQWtCO1FBQzFCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDL0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDOztJQXZGRDtRQURDLHlCQUFhLEVBQVE7a0NBQ1AsSUFBSTtxREFBQztJQXZDWCxVQUFVO1FBRHRCLGlCQUFLLENBQUMsdUJBQXVCLENBQUM7O09BQ2xCLFVBQVUsQ0FpSXRCO0lBQUQsaUJBQUM7Q0FqSUQsQUFpSUMsQ0FqSStCLHNCQUFTLEdBaUl4QztBQWpJWSxnQ0FBVSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwsRmllbGRQcm9wZXJ0eSB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCB7IExpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbGlzdC5hcGknO1xuaW1wb3J0IHsgQnVsa0xpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvYnVsay1saXN0LmFwaSc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcuZXhhbV9tZW1iZXInKVxuZXhwb3J0IGNsYXNzIEV4YW1NZW1iZXIgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5leGFtX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmV4YW1fbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kYXRlX3JlZ2lzdGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbnJvbGxfc3RhdHVzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnJvbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5sb2dpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5waG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51c2VyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX21lbWJlcl9pZCA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZXhhbSA9ICBuZXcgRXhhbSgpO1xuICAgICAgICB0aGlzLnN1Ym1pc3Npb25faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2xhc3NfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmV4YW1fcmV2aWV3X3N0YXRlID0gIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzdWJtaXNzaW9uX2lkOiBudW1iZXI7XG4gICAgZXhhbV9pZDogbnVtYmVyO1xuICAgIGNvdXJzZV9tZW1iZXJfaWQ6IG51bWJlcjtcbiAgICBleGFtX25hbWU6IHN0cmluZztcbiAgICBleGFtOiBFeGFtO1xuICAgIHVzZXJfaWQ6IG51bWJlcjtcbiAgICBjbGFzc19pZDogbnVtYmVyO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGV4YW1fcmV2aWV3X3N0YXRlOiBzdHJpbmc7XG4gICAgZW5yb2xsX3N0YXR1czogc3RyaW5nO1xuICAgIHJvbGU6IHN0cmluZztcbiAgICBsb2dpbjogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZGF0ZV9yZWdpc3RlcjogRGF0ZTtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBob25lOiBzdHJpbmc7XG4gICAgZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBncm91cF9pZF9fREVTQ19fOiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUV4YW0oZXhhbUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW1NZW1iZXIuTW9kZWwsIFtdLFwiWygnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlFeGFtKCBjb250ZXh0OkFQSUNvbnRleHQsIGV4YW1JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICByZXR1cm4gRXhhbU1lbWJlci5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RDYW5kaWRhdGVCeUV4YW0oZXhhbUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW1NZW1iZXIuTW9kZWwsIFtdLFwiWygnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIiksKCdyb2xlJywnPScsJ2NhbmRpZGF0ZScpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdENhbmRpZGF0ZUJ5RXhhbSggY29udGV4dDpBUElDb250ZXh0LCBleGFtSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1NZW1iZXIuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdleGFtX2lkJywnPScsXCIrZXhhbUlkK1wiKSwoJ3JvbGUnLCc9JywnY2FuZGlkYXRlJyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5VXNlcih1c2VySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoRXhhbU1lbWJlci5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVVzZXIoIGNvbnRleHQ6QVBJQ29udGV4dCwgdXNlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBFeGFtTWVtYmVyLnNlYXJjaChjb250ZXh0LFtdLFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fYnlFeGFtQW5kVXNlcih1c2VySWQ6IG51bWJlciwgZXhhbUlkOm51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoRXhhbU1lbWJlci5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKSwoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlFeGFtQW5kVXNlciggY29udGV4dDpBUElDb250ZXh0LCB1c2VySWQ6IG51bWJlciwgZXhhbUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gRXhhbU1lbWJlci5zaW5nbGUoY29udGV4dCxbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpLCgnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpXG4gICAgfVxuXG4gICAgX19hcGlfX3BvcHVsYXRlRXhhbSgpOiBMaXN0QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0QVBJKEV4YW0uTW9kZWwsIFt0aGlzLmV4YW1faWRdLCBbXSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVFeGFtKGNvbnRleHQ6IEFQSUNvbnRleHQpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAoIXRoaXMuZXhhbV9pZClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKG51bGwpO1xuICAgICAgICByZXR1cm4gRXhhbS5nZXQoY29udGV4dCwgdGhpcy5leGFtX2lkKS5kbyhleGFtID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhhbSA9IGV4YW07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBwb3B1bGF0ZUV4YW1zKGNvbnRleHQ6IEFQSUNvbnRleHQsIG1lbWJlcnM6IEV4YW1NZW1iZXJbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBleGFtSWRzID0gXy5wbHVjayhtZW1iZXJzLCdleGFtX2lkJyk7XG4gICAgICAgIGV4YW1JZHMgPSBfLmZpbHRlcihleGFtSWRzLCBpZD0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFeGFtLmFycmF5KGNvbnRleHQsIGV4YW1JZHMpLmRvKGV4YW1zPT4ge1xuICAgICAgICAgICAgXy5lYWNoKG1lbWJlcnMsIChtZW1iZXI6RXhhbU1lbWJlcik9PiB7XG4gICAgICAgICAgICAgICAgbWVtYmVyLmV4YW0gPSAgXy5maW5kKGV4YW1zLCAoZXhhbTpFeGFtKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5leGFtX2lkID09IGV4YW0uaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19leGFtRWRpdG9yKGV4YW1JZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtTWVtYmVyLk1vZGVsLCBbXSxcIlsoJ3JvbGUnLCc9JywnZWRpdG9yJyksKCdleGFtX2lkJywnPScsXCIgKyBleGFtSWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBleGFtRWRpdG9yKGNvbnRleHQ6IEFQSUNvbnRleHQsIGV4YW1JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1NZW1iZXIuc2luZ2xlKGNvbnRleHQsIFtdLCBcIlsoJ3JvbGUnLCc9JywnZWRpdG9yJyksKCdleGFtX2lkJywnPScsXCIgKyBleGFtSWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fZXhhbVN1cGVydmlzb3IoZXhhbUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW1NZW1iZXIuTW9kZWwsIFtdLFwiWygncm9sZScsJz0nLCdzdXBlcnZpc29yJyksKCdleGFtX2lkJywnPScsXCIgKyBleGFtSWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBleGFtU3VwZXJ2aXNvcihjb250ZXh0OiBBUElDb250ZXh0LCBleGFtSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBFeGFtTWVtYmVyLnNpbmdsZShjb250ZXh0LCBbXSwgXCJbKCdyb2xlJywnPScsJ3N1cGVydmlzb3InKSwoJ2V4YW1faWQnLCc9JyxcIiArIGV4YW1JZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgX19hcGlfX3N1Ym1pdF9zY29yZShtZW1iZXJJZDogbnVtYmVyKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShFeGFtTWVtYmVyLk1vZGVsLCAnc3VibWl0X2V4YW0nLHttZW1iZXJJZDptZW1iZXJJZH0sIG51bGwpO1xuICAgIH1cblxuICAgIHN1Ym1pdFNjb3JlKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX3N1Ym1pdF9zY29yZSh0aGlzLmlkKSwgXG4gICAgICAgICAgICBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuICAgIH1cblxuXG59XG4iXX0=
