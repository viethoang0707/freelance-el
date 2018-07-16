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
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var search_count_api_1 = require("../../services/api/search-count.api");
var list_api_1 = require("../../services/api/list.api");
var question_model_1 = require("./question.model");
var _ = require("underscore");
var SurveyQuestion = (function (_super) {
    __extends(SurveyQuestion, _super);
    function SurveyQuestion() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.question = new question_model_1.Question();
        _this.content = undefined;
        _this.type = undefined;
        _this.group_id = undefined;
        _this.question_id = undefined;
        _this.survey_id = undefined;
        _this.sheet_id = undefined;
        _this.order = undefined;
        _this.group_id__DESC__ = undefined;
        return _this;
    }
    SurveyQuestion_1 = SurveyQuestion;
    SurveyQuestion.prototype.clone = function () {
        var question = new SurveyQuestion_1();
        question.question_id = this.question_id;
        question.order = this.order;
        question.title = this.title;
        question.content = this.content;
        question.type = this.type;
        question.group_id = this.group_id;
        question.group_id__DESC__ = this.group_id__DESC__;
        return question;
    };
    SurveyQuestion.__api__listBySheet = function (sheetId) {
        return new search_read_api_1.SearchReadAPI(SurveyQuestion_1.Model, [], "[('sheet_id','='," + sheetId + ")]");
    };
    SurveyQuestion.__api__countBySheet = function (sheetId) {
        return new search_count_api_1.SearchCountAPI(SurveyQuestion_1.Model, "[('sheet_id','='," + sheetId + ")]");
    };
    SurveyQuestion.__api__countBySurvey = function (surveyId) {
        return new search_count_api_1.SearchCountAPI(SurveyQuestion_1.Model, "[('survey_id','='," + surveyId + ")]");
    };
    SurveyQuestion.countBySurvey = function (context, surveyId) {
        return SurveyQuestion_1.count(context, "[('survey_id','='," + surveyId + ")]");
    };
    SurveyQuestion.__api__byQuestion = function (questionId) {
        return new search_read_api_1.SearchReadAPI(SurveyQuestion_1.Model, [], "[('question_id','='," + questionId + ")]");
    };
    SurveyQuestion.listBySheet = function (context, sheetId) {
        return SurveyQuestion_1.search(context, [], "[('sheet_id','='," + sheetId + ")]");
    };
    SurveyQuestion.countBySheet = function (context, sheetId) {
        return SurveyQuestion_1.count(context, "[('sheet_id','='," + sheetId + ")]");
    };
    SurveyQuestion.prototype.__api__populateQuestion = function () {
        return new list_api_1.ListAPI(question_model_1.Question.Model, [this.question_id], []);
    };
    SurveyQuestion.prototype.populateQuestion = function (context) {
        var _this = this;
        if (!this.question_id)
            return Rx_1.Observable.of(null);
        return question_model_1.Question.get(context, this.question_id).do(function (question) {
            _this.question = question;
        });
    };
    SurveyQuestion.populateQuestions = function (context, surveyQuestions) {
        var questionIds = _.pluck(surveyQuestions, 'question_id');
        questionIds = _.filter(questionIds, function (id) {
            return id;
        });
        return question_model_1.Question.array(context, questionIds).do(function (questions) {
            _.each(surveyQuestions, function (surveyQuestion) {
                surveyQuestion.question = _.find(questions, function (question) {
                    return surveyQuestion.question_id == question.id;
                });
            });
        });
    };
    var SurveyQuestion_1;
    SurveyQuestion = SurveyQuestion_1 = __decorate([
        decorator_1.Model('etraining.survey_question'),
        __metadata("design:paramtypes", [])
    ], SurveyQuestion);
    return SurveyQuestion;
}(base_model_1.BaseModel));
exports.SurveyQuestion = SurveyQuestion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktcXVlc3Rpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQW1FO0FBQ25FLDRDQUEwQztBQUMxQyw4QkFBOEM7QUFDOUMsMENBQXFDO0FBRXJDLHdFQUFxRTtBQUNyRSx3REFBc0Q7QUFDdEQsbURBQTRDO0FBQzVDLDhCQUFnQztBQUdoQztJQUFvQyxrQ0FBUztJQUd6QztRQUFBLFlBQ0ksaUJBQU8sU0FZYjtRQVZBLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx5QkFBUSxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDaEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzs7SUFDekMsQ0FBQzt1QkFoQlcsY0FBYztJQTZCdkIsOEJBQUssR0FBTDtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksZ0JBQWMsRUFBRSxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFD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QUFDLGVBQWUsRUFBRSxVQUFDLGNBQThCO2dCQUNuRCxjQUFjLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUMsUUFBa0I7b0JBQzNELE9BQU8sY0FBYyxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztJQWpHUSxjQUFjO1FBRDFCLGlCQUFLLENBQUMsMkJBQTJCLENBQUM7O09BQ3RCLGNBQWMsQ0FtRzFCO0lBQUQscUJBQUM7Q0FuR0QsQUFtR0MsQ0FuR21DLHNCQUFTLEdBbUc1QztBQW5HWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LXF1ZXN0aW9uLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBTZWFyY2hDb3VudEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtY291bnQuYXBpJztcbmltcG9ydCB7IExpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbGlzdC5hcGknO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnN1cnZleV9xdWVzdGlvbicpXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb24gZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuXHRcdHRoaXMudGl0bGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXcgUXVlc3Rpb24oKTtcblx0XHR0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy50eXBlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cnZleV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcmRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZF9fREVTQ19fID0gdW5kZWZpbmVkO1xuXHR9XG5cbiAgICBxdWVzdGlvbl9pZDogbnVtYmVyO1xuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbjtcbiAgICBzdXJ2ZXlfaWQ6IG51bWJlcjtcbiAgICBzaGVldF9pZDogbnVtYmVyO1xuICAgIG9yZGVyOiBudW1iZXI7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGdyb3VwX2lkOiBudW1iZXI7XG4gICAgZ3JvdXBfaWRfX0RFU0NfXzogc3RyaW5nO1xuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHZhciBxdWVzdGlvbiA9IG5ldyBTdXJ2ZXlRdWVzdGlvbigpO1xuICAgICAgICBxdWVzdGlvbi5xdWVzdGlvbl9pZCA9IHRoaXMucXVlc3Rpb25faWQ7XG4gICAgICAgIHF1ZXN0aW9uLm9yZGVyID0gdGhpcy5vcmRlcjtcbiAgICAgICAgcXVlc3Rpb24udGl0bGUgPSB0aGlzLnRpdGxlO1xuICAgICAgICBxdWVzdGlvbi5jb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICBxdWVzdGlvbi50eXBlID0gdGhpcy50eXBlO1xuICAgICAgICBxdWVzdGlvbi5ncm91cF9pZCA9IHRoaXMuZ3JvdXBfaWQ7XG4gICAgICAgIHF1ZXN0aW9uLmdyb3VwX2lkX19ERVNDX18gPSB0aGlzLmdyb3VwX2lkX19ERVNDX187XG4gICAgICAgIHJldHVybiBxdWVzdGlvbjtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5U2hlZXQoc2hlZXRJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXlRdWVzdGlvbi5Nb2RlbCwgW10sIFwiWygnc2hlZXRfaWQnLCc9JyxcIiArIHNoZWV0SWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fY291bnRCeVNoZWV0KHNoZWV0SWQ6IG51bWJlcik6IFNlYXJjaENvdW50QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hDb3VudEFQSShTdXJ2ZXlRdWVzdGlvbi5Nb2RlbCwgXCJbKCdzaGVldF9pZCcsJz0nLFwiICsgc2hlZXRJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19jb3VudEJ5U3VydmV5KHN1cnZleUlkOiBudW1iZXIpOiBTZWFyY2hDb3VudEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoQ291bnRBUEkoU3VydmV5UXVlc3Rpb24uTW9kZWwsIFwiWygnc3VydmV5X2lkJywnPScsXCIgKyBzdXJ2ZXlJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QnlTdXJ2ZXkoY29udGV4dDogQVBJQ29udGV4dCwgc3VydmV5SWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBTdXJ2ZXlRdWVzdGlvbi5jb3VudChjb250ZXh0LCBcIlsoJ3N1cnZleV9pZCcsJz0nLFwiICsgc3VydmV5SWQgKyBcIildXCIpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIF9fYXBpX19ieVF1ZXN0aW9uKHF1ZXN0aW9uSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoU3VydmV5UXVlc3Rpb24uTW9kZWwsIFtdLCBcIlsoJ3F1ZXN0aW9uX2lkJywnPScsXCIgKyBxdWVzdGlvbklkICsgXCIpXVwiKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBsaXN0QnlTaGVldChjb250ZXh0OiBBUElDb250ZXh0LCBzaGVldElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBTdXJ2ZXlRdWVzdGlvbi5zZWFyY2goY29udGV4dCwgW10sIFwiWygnc2hlZXRfaWQnLCc9JyxcIiArIHNoZWV0SWQgKyBcIildXCIpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNvdW50QnlTaGVldChjb250ZXh0OiBBUElDb250ZXh0LCBzaGVldElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gU3VydmV5UXVlc3Rpb24uY291bnQoY29udGV4dCwgXCJbKCdzaGVldF9pZCcsJz0nLFwiICsgc2hlZXRJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgX19hcGlfX3BvcHVsYXRlUXVlc3Rpb24oKTogTGlzdEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEFQSShRdWVzdGlvbi5Nb2RlbCwgW3RoaXMucXVlc3Rpb25faWRdLCBbXSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVRdWVzdGlvbihjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uX2lkKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YobnVsbCk7XG4gICAgICAgIHJldHVybiBRdWVzdGlvbi5nZXQoY29udGV4dCwgdGhpcy5xdWVzdGlvbl9pZCkuZG8ocXVlc3Rpb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHF1ZXN0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9wdWxhdGVRdWVzdGlvbnMoY29udGV4dDogQVBJQ29udGV4dCwgc3VydmV5UXVlc3Rpb25zOiBTdXJ2ZXlRdWVzdGlvbltdKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIHF1ZXN0aW9uSWRzID0gXy5wbHVjayhzdXJ2ZXlRdWVzdGlvbnMsICdxdWVzdGlvbl9pZCcpO1xuICAgICAgICBxdWVzdGlvbklkcyA9IF8uZmlsdGVyKHF1ZXN0aW9uSWRzLCBpZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUXVlc3Rpb24uYXJyYXkoY29udGV4dCwgcXVlc3Rpb25JZHMpLmRvKHF1ZXN0aW9ucyA9PiB7XG4gICAgICAgICAgICBfLmVhY2goc3VydmV5UXVlc3Rpb25zLCAoc3VydmV5UXVlc3Rpb246IFN1cnZleVF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgc3VydmV5UXVlc3Rpb24ucXVlc3Rpb24gPSBfLmZpbmQocXVlc3Rpb25zLCAocXVlc3Rpb246IFF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlRdWVzdGlvbi5xdWVzdGlvbl9pZCA9PSBxdWVzdGlvbi5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==
