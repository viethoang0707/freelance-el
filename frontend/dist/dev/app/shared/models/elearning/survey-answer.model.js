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
var search_read_api_1 = require("../../services/api/search-read.api");
var SurveyAnswer = (function (_super) {
    __extends(SurveyAnswer, _super);
    function SurveyAnswer() {
        var _this = _super.call(this) || this;
        _this.question_id = undefined;
        _this.option_id = undefined;
        _this.submission_id = undefined;
        _this.question_type = undefined;
        _this.text = undefined;
        _this.json = undefined;
        _this.survey_id = undefined;
        return _this;
    }
    SurveyAnswer_1 = SurveyAnswer;
    SurveyAnswer.__api__listBySubmit = function (submitId) {
        return new search_read_api_1.SearchReadAPI(SurveyAnswer_1.Model, [], "[('submission_id','='," + submitId + ")]");
    };
    SurveyAnswer.__api__listBySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyAnswer_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveyAnswer.listBySubmit = function (context, submitId) {
        return SurveyAnswer_1.search(context, [], "[('submission_id','='," + submitId + ")]");
    };
    SurveyAnswer.listBySurvey = function (context, surveyId) {
        return SurveyAnswer_1.search(context, [], "[('survey_id','='," + surveyId + ")]");
    };
    var SurveyAnswer_1;
    SurveyAnswer = SurveyAnswer_1 = __decorate([
        decorator_1.Model('etraining.survey_answer'),
        __metadata("design:paramtypes", [])
    ], SurveyAnswer);
    return SurveyAnswer;
}(base_model_1.BaseModel));
exports.SurveyAnswer = SurveyAnswer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktYW5zd2VyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUUxQywwQ0FBbUQ7QUFFbkQsc0VBQW1FO0FBR25FO0lBQWtDLGdDQUFTO0lBR3ZDO1FBQUEsWUFDSSxpQkFBTyxTQVNiO1FBUE0sS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLFNBQVMsR0FBSSxTQUFTLENBQUM7O0lBQ25DLENBQUM7cUJBYlcsWUFBWTtJQXNCZCxnQ0FBbUIsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDdkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsY0FBWSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsd0JBQXdCLEdBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFTSxnQ0FBbUIsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDdkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsY0FBWSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsb0JBQW9CLEdBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFTSx5QkFBWSxHQUFuQixVQUFxQixPQUFrQixFQUFFLFFBQWdCO1FBQ3JELE9BQU8sY0FBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLHdCQUF3QixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0seUJBQVksR0FBbkIsVUFBcUIsT0FBa0IsRUFBRSxRQUFnQjtRQUNyRCxPQUFPLGNBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7SUFwQ1EsWUFBWTtRQUR4QixpQkFBSyxDQUFDLHlCQUF5QixDQUFDOztPQUNwQixZQUFZLENBc0N4QjtJQUFELG1CQUFDO0NBdENELEFBc0NDLENBdENpQyxzQkFBUyxHQXNDMUM7QUF0Q1ksb0NBQVkiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1hbnN3ZXIubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5zdXJ2ZXlfYW5zd2VyJylcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlBbnN3ZXIgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG4gICAgICAgIHRoaXMucXVlc3Rpb25faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1Ym1pc3Npb25faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb25fdHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy50ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmpzb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3VydmV5X2lkID0gIHVuZGVmaW5lZDtcblx0fVxuICAgIHN1cnZleV9pZDogbnVtYmVyO1xuICAgIHF1ZXN0aW9uX2lkOiBudW1iZXI7XG4gICAgb3B0aW9uX2lkOiBudW1iZXI7XG4gICAgc3VibWlzc2lvbl9pZDogbnVtYmVyO1xuICAgIHRleHQ6c3RyaW5nO1xuICAgIGpzb246c3RyaW5nO1xuICAgIHF1ZXN0aW9uX3R5cGU6IHN0cmluZztcblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5U3VibWl0KHN1Ym1pdElkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFN1cnZleUFuc3dlci5Nb2RlbCwgW10sXCJbKCdzdWJtaXNzaW9uX2lkJywnPScsXCIrc3VibWl0SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVN1cnZleShzdXJ2ZXlJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXlBbnN3ZXIuTW9kZWwsIFtdLFwiWygnc3VydmV5X2lkJywnPScsXCIrc3VydmV5SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VibWl0KCBjb250ZXh0OkFQSUNvbnRleHQsIHN1Ym1pdElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBTdXJ2ZXlBbnN3ZXIuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdWJtaXNzaW9uX2lkJywnPScsXCIrc3VibWl0SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VydmV5KCBjb250ZXh0OkFQSUNvbnRleHQsIHN1cnZleUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBTdXJ2ZXlBbnN3ZXIuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdXJ2ZXlfaWQnLCc9JyxcIitzdXJ2ZXlJZCtcIildXCIpO1xuICAgIH1cblxufVxuIl19
