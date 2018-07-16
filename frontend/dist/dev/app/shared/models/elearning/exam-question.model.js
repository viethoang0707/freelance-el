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
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var question_model_1 = require("./question.model");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
var ExamQuestion = (function (_super) {
    __extends(ExamQuestion, _super);
    function ExamQuestion() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.explanation = undefined;
        _this.type = undefined;
        _this.level = undefined;
        _this.group_id = undefined;
        _this.question_id = undefined;
        _this.exam_id = undefined;
        _this.sheet_id = undefined;
        _this.score = undefined;
        _this.order = undefined;
        _this.question = new question_model_1.Question();
        _this.group_id__DESC__ = undefined;
        return _this;
    }
    ExamQuestion_1 = ExamQuestion;
    ExamQuestion.__api__listBySheet = function (sheetId) {
        return new search_read_api_1.SearchReadAPI(ExamQuestion_1.Model, [], "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.prototype.clone = function () {
        var q = new ExamQuestion_1();
        q.question_id = this.question_id;
        q.exam_id = this.exam_id;
        q.sheet_id = this.sheet_id;
        q.score = this.score;
        q.order = this.order;
        q.level = this.level;
        q.title = this.title;
        q.content = this.content;
        q.explanation = this.explanation;
        q.type = this.type;
        q.group_id = this.group_id;
        q.group_id__DESC__ = this.group_id__DESC__;
        return q;
    };
    ExamQuestion.listBySheet = function (context, sheetId) {
        return ExamQuestion_1.search(context, [], "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.__api__countBySheet = function (sheetId) {
        return new search_count_api_1.SearchCountAPI(ExamQuestion_1.Model, "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.countBySheet = function (context, sheetId) {
        return ExamQuestion_1.count(context, "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.__api__countByExam = function (examId) {
        return new search_count_api_1.SearchCountAPI(ExamQuestion_1.Model, "[('exam_id','='," + examId + ")]");
    };
    ExamQuestion.countByExam = function (context, examId) {
        return ExamQuestion_1.count(context, "[('exam_id','='," + examId + ")]");
    };
    ExamQuestion.prototype.__api__populateQuestion = function () {
        return new list_api_1.ListAPI(question_model_1.Question.Model, [this.question_id], []);
    };
    ExamQuestion.prototype.populateQuestion = function (context) {
        var _this = this;
        if (!this.question_id)
            return Rx_1.Observable.of(null);
        return question_model_1.Question.get(context, this.question_id).do(function (question) {
            _this.question = question;
        });
    };
    ExamQuestion.populateQuestions = function (context, examQuestions) {
        var questionIds = _.pluck(examQuestions, 'question_id');
        questionIds = _.filter(questionIds, function (id) {
            return id;
        });
        return question_model_1.Question.array(context, questionIds).do(function (questions) {
            _.each(examQuestions, function (examQuestion) {
                examQuestion.question = _.find(questions, function (question) {
                    return examQuestion.question_id == question.id;
                });
            });
        });
    };
    var ExamQuestion_1;
    ExamQuestion = ExamQuestion_1 = __decorate([
        decorator_1.Model('etraining.exam_question'),
        __metadata("design:paramtypes", [])
    ], ExamQuestion);
    return ExamQuestion;
}(base_model_1.BaseModel));
exports.ExamQuestion = ExamQuestion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXF1ZXN0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEwQztBQUMxQyw4QkFBOEM7QUFDOUMsMENBQXFDO0FBRXJDLHNFQUFtRTtBQUNuRSx3RUFBcUU7QUFDckUsbURBQTRDO0FBQzVDLHdEQUFzRDtBQUV0RCw4QkFBZ0M7QUFHaEM7SUFBa0MsZ0NBQVM7SUFHdkM7UUFBQSxZQUNJLGlCQUFPLFNBZWI7UUFiQSxLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFJLElBQUkseUJBQVEsRUFBRSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7O0lBQ3pDLENBQUM7cUJBbkJXLFlBQVk7SUFtQ2QsK0JBQWtCLEdBQXpCLFVBQTBCLE9BQWU7UUFDckMsT0FBTyxJQUFJLCtCQUFhLENBQUMsY0FBWSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsbUJBQW1CLEdBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBSSxjQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDM0MsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBR00sd0JBQVcsR0FBbEIsVUFBb0IsT0FBa0IsRUFBRSxPQUFlO1FBQ25ELE9BQU8sY0FBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixHQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU0sZ0NBQW1CLEdBQTFCLFVBQTJCLE9BQWU7UUFDdEMsT0FBTyxJQUFJLGlDQUFjLENBQUMsY0FBWSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsR0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVNLHlCQUFZLEdBQW5CLFVBQXFCLE9BQWtCLEVBQUUsT0FBZTtRQUNwRCxPQUFPLGNBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLG1CQUFtQixHQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sK0JBQWtCLEdBQXpCLFVBQTBCLE1BQWM7UUFDcEMsT0FBTyxJQUFJLGlDQUFjLENBQUMsY0FBWSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLHdCQUFXLEdBQWxCLFVBQW9CLE9BQWtCLEVBQUUsTUFBYztRQUNsRCxPQUFPLGNBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsOENBQXVCLEdBQXZCO1FBQ0ksT0FBTyxJQUFJLGtCQUFPLENBQUMseUJBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixPQUFtQjtRQUFwQyxpQkFNQztRQUxHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUNqQixPQUFPLGVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsT0FBTyx5QkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFBLFFBQVE7WUFDdEQsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sOEJBQWlCLEdBQXhCLFVBQXlCLE9BQW1CLEVBQUUsYUFBNkI7UUFDdkUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQUEsRUFBRTtZQUNsQyxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyx5QkFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUEsU0FBUztZQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFDLFlBQXlCO2dCQUM1QyxZQUFZLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUMsUUFBaUI7b0JBQ3pELE9BQU8sWUFBWSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztJQXJHUSxZQUFZO1FBRHhCLGlCQUFLLENBQUMseUJBQXlCLENBQUM7O09BQ3BCLFlBQVksQ0F1R3hCO0lBQUQsbUJBQUM7Q0F2R0QsQUF1R0MsQ0F2R2lDLHNCQUFTLEdBdUcxQztBQXZHWSxvQ0FBWSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IFNlYXJjaENvdW50QVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1jb3VudC5hcGknO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IExpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbGlzdC5hcGknO1xuaW1wb3J0IHsgQnVsa0xpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvYnVsay1saXN0LmFwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5leGFtX3F1ZXN0aW9uJylcbmV4cG9ydCBjbGFzcyBFeGFtUXVlc3Rpb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy50aXRsZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5leHBsYW5hdGlvbiA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubGV2ZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JvdXBfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb25faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZXhhbV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zY29yZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcmRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9ICBuZXcgUXVlc3Rpb24oKTtcbiAgICAgICAgdGhpcy5ncm91cF9pZF9fREVTQ19fID0gdW5kZWZpbmVkO1xuXHR9XG5cbiAgICBxdWVzdGlvbl9pZDogbnVtYmVyO1xuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbjtcbiAgICBleGFtX2lkOiBudW1iZXI7XG4gICAgc2hlZXRfaWQ6IG51bWJlcjtcbiAgICBzY29yZTogbnVtYmVyO1xuICAgIG9yZGVyOiBudW1iZXI7XG4gICAgbGV2ZWw6IHN0cmluZztcbiAgICB0aXRsZTpzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIGV4cGxhbmF0aW9uOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGdyb3VwX2lkOiBudW1iZXI7XG4gICAgZ3JvdXBfaWRfX0RFU0NfXzogc3RyaW5nO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTaGVldChzaGVldElkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW1RdWVzdGlvbi5Nb2RlbCwgW10sXCJbKCdzaGVldF9pZCcsJz0nLFwiK3NoZWV0SWQrXCIpXVwiKTtcbiAgICB9XG4gICAgXG4gICAgY2xvbmUoKTpFeGFtUXVlc3Rpb24ge1xuICAgICAgICB2YXIgcSA9IG5ldyBFeGFtUXVlc3Rpb24oKTtcbiAgICAgICAgcS5xdWVzdGlvbl9pZCA9IHRoaXMucXVlc3Rpb25faWQ7XG4gICAgICAgIHEuZXhhbV9pZCA9IHRoaXMuZXhhbV9pZDtcbiAgICAgICAgcS5zaGVldF9pZCA9IHRoaXMuc2hlZXRfaWQ7XG4gICAgICAgIHEuc2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgICBxLm9yZGVyID0gdGhpcy5vcmRlcjtcbiAgICAgICAgcS5sZXZlbCA9IHRoaXMubGV2ZWw7XG4gICAgICAgIHEudGl0bGUgPSB0aGlzLnRpdGxlO1xuICAgICAgICBxLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgIHEuZXhwbGFuYXRpb24gPSB0aGlzLmV4cGxhbmF0aW9uO1xuICAgICAgICBxLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIHEuZ3JvdXBfaWQgPSB0aGlzLmdyb3VwX2lkO1xuICAgICAgICBxLmdyb3VwX2lkX19ERVNDX18gPSB0aGlzLmdyb3VwX2lkX19ERVNDX187XG4gICAgICAgIHJldHVybiBxO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGxpc3RCeVNoZWV0KCBjb250ZXh0OkFQSUNvbnRleHQsIHNoZWV0SWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1RdWVzdGlvbi5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3NoZWV0X2lkJywnPScsXCIrc2hlZXRJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fY291bnRCeVNoZWV0KHNoZWV0SWQ6IG51bWJlcik6IFNlYXJjaENvdW50QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hDb3VudEFQSShFeGFtUXVlc3Rpb24uTW9kZWwsIFwiWygnc2hlZXRfaWQnLCc9JyxcIitzaGVldElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QnlTaGVldCggY29udGV4dDpBUElDb250ZXh0LCBzaGVldElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gRXhhbVF1ZXN0aW9uLmNvdW50KGNvbnRleHQsXCJbKCdzaGVldF9pZCcsJz0nLFwiK3NoZWV0SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2NvdW50QnlFeGFtKGV4YW1JZDogbnVtYmVyKTogU2VhcmNoQ291bnRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaENvdW50QVBJKEV4YW1RdWVzdGlvbi5Nb2RlbCwgXCJbKCdleGFtX2lkJywnPScsXCIrZXhhbUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QnlFeGFtKCBjb250ZXh0OkFQSUNvbnRleHQsIGV4YW1JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1RdWVzdGlvbi5jb3VudChjb250ZXh0LFwiWygnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpO1xuICAgIH1cblxuICAgIF9fYXBpX19wb3B1bGF0ZVF1ZXN0aW9uKCk6IExpc3RBUEkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3RBUEkoUXVlc3Rpb24uTW9kZWwsIFt0aGlzLnF1ZXN0aW9uX2lkXSwgW10pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlUXVlc3Rpb24oY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbl9pZClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKG51bGwpO1xuICAgICAgICByZXR1cm4gUXVlc3Rpb24uZ2V0KGNvbnRleHQsIHRoaXMucXVlc3Rpb25faWQpLmRvKHF1ZXN0aW9uID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb24gPSBxdWVzdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBvcHVsYXRlUXVlc3Rpb25zKGNvbnRleHQ6IEFQSUNvbnRleHQsIGV4YW1RdWVzdGlvbnM6IEV4YW1RdWVzdGlvbltdKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIHF1ZXN0aW9uSWRzID0gXy5wbHVjayhleGFtUXVlc3Rpb25zLCdxdWVzdGlvbl9pZCcpO1xuICAgICAgICBxdWVzdGlvbklkcyA9IF8uZmlsdGVyKHF1ZXN0aW9uSWRzLCBpZD0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBRdWVzdGlvbi5hcnJheShjb250ZXh0LCBxdWVzdGlvbklkcykuZG8ocXVlc3Rpb25zPT4ge1xuICAgICAgICAgICAgXy5lYWNoKGV4YW1RdWVzdGlvbnMsIChleGFtUXVlc3Rpb246RXhhbVF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgICAgICBleGFtUXVlc3Rpb24ucXVlc3Rpb24gPSAgXy5maW5kKHF1ZXN0aW9ucywgKHF1ZXN0aW9uOlF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4YW1RdWVzdGlvbi5xdWVzdGlvbl9pZCA9PSBxdWVzdGlvbi5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==
