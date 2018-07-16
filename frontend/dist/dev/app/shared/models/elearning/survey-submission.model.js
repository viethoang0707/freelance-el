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
var decorator_1 = require("../decorator");
var SurveySubmission = (function (_super) {
    __extends(SurveySubmission, _super);
    function SurveySubmission() {
        var _this = _super.call(this) || this;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.end = undefined;
        _this.start = undefined;
        _this.survey_id = undefined;
        return _this;
    }
    SurveySubmission_1 = SurveySubmission;
    SurveySubmission.__api__byMemberAndSurvey = function (member_id, surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('member_id','='," + member_id + "),('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.byMemberAndSurvey = function (context, member_id, surveyId) {
        return SurveySubmission_1.single(context, [], "[('member_id','='," + member_id + "),('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    SurveySubmission.listByUser = function (context, userId) {
        return SurveySubmission_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    SurveySubmission.__api__listBySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.listBySurvey = function (context, surveyId) {
        return SurveySubmission_1.search(context, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.__api__listByMemer = function (memberId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    SurveySubmission.listByMember = function (context, memberId) {
        return SurveySubmission_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var SurveySubmission_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], SurveySubmission.prototype, "end", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], SurveySubmission.prototype, "start", void 0);
    SurveySubmission = SurveySubmission_1 = __decorate([
        decorator_1.Model('etraining.survey_submission'),
        __metadata("design:paramtypes", [])
    ], SurveySubmission);
    return SurveySubmission;
}(base_model_1.BaseModel));
exports.SurveySubmission = SurveySubmission;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktc3VibWlzc2lvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBbUU7QUFDbkUsNENBQTBDO0FBRTFDLDBDQUFvRDtBQUlwRDtJQUFzQyxvQ0FBUztJQUczQztRQUFBLFlBQ0ksaUJBQU8sU0FNVjtRQUxHLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUksU0FBUyxDQUFDOztJQUM3QixDQUFDO3lCQVZRLGdCQUFnQjtJQXFCbEIseUNBQXdCLEdBQS9CLFVBQWdDLFNBQWlCLEVBQUUsUUFBZ0I7UUFDL0QsT0FBTyxJQUFJLCtCQUFhLENBQUMsa0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsR0FBRyxTQUFTLEdBQUcscUJBQXFCLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFFTSxrQ0FBaUIsR0FBeEIsVUFBMEIsT0FBa0IsRUFBRSxTQUFpQixFQUFFLFFBQWdCO1FBQzdFLE9BQU8sa0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsb0JBQW9CLEdBQUMsU0FBUyxHQUFDLHFCQUFxQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRU0sa0NBQWlCLEdBQXhCLFVBQXlCLE1BQWM7UUFDbkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsa0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVNLDJCQUFVLEdBQWpCLFVBQW1CLE9BQWtCLEVBQUUsTUFBYztRQUNqRCxPQUFPLGtCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sb0NBQW1CLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3ZDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLGtCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFHTSw2QkFBWSxHQUFuQixVQUFxQixPQUFrQixFQUFFLFFBQWdCO1FBQ3JELE9BQU8sa0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsb0JBQW9CLEdBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxtQ0FBa0IsR0FBekIsVUFBMEIsUUFBZ0I7UUFDdEMsT0FBTyxJQUFJLCtCQUFhLENBQUMsa0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVNLDZCQUFZLEdBQW5CLFVBQXFCLE9BQWtCLEVBQUUsUUFBZ0I7UUFDckQsT0FBTyxrQkFBZ0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7SUFwQ0Q7UUFEQyx5QkFBYSxFQUFRO2tDQUNqQixJQUFJO2lEQUFDO0lBRVY7UUFEQyx5QkFBYSxFQUFRO2tDQUNmLElBQUk7bURBQUM7SUFsQkgsZ0JBQWdCO1FBRDVCLGlCQUFLLENBQUMsNkJBQTZCLENBQUM7O09BQ3hCLGdCQUFnQixDQXFENUI7SUFBRCx1QkFBQztDQXJERCxBQXFEQyxDQXJEcUMsc0JBQVMsR0FxRDlDO0FBckRZLDRDQUFnQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LXN1Ym1pc3Npb24ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLCBGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcblxuQE1vZGVsKCdldHJhaW5pbmcuc3VydmV5X3N1Ym1pc3Npb24nKVxuZXhwb3J0IGNsYXNzIFN1cnZleVN1Ym1pc3Npb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudXNlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZW1iZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZW5kID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdW5kZWZpbmVkO1xuXHQgICAgdGhpcy5zdXJ2ZXlfaWQgPSAgdW5kZWZpbmVkO1xuICAgIH1cbiAgICBcbiAgICBzdXJ2ZXlfaWQ6IG51bWJlcjtcbiAgICB1c2VyX2lkOiBudW1iZXI7XG4gICAgbWVtYmVyX2lkOiBudW1iZXI7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIGVuZDogRGF0ZTtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgc3RhcnQ6IERhdGU7XG5cblxuICAgIHN0YXRpYyBfX2FwaV9fYnlNZW1iZXJBbmRTdXJ2ZXkobWVtYmVyX2lkOiBudW1iZXIsIHN1cnZleUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFN1cnZleVN1Ym1pc3Npb24uTW9kZWwsIFtdLCBcIlsoJ21lbWJlcl9pZCcsJz0nLFwiICsgbWVtYmVyX2lkICsgXCIpLCgnc3VydmV5X2lkJywnPScsXCIgKyBzdXJ2ZXlJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGJ5TWVtYmVyQW5kU3VydmV5KCBjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcl9pZDogbnVtYmVyLCBzdXJ2ZXlJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleVN1Ym1pc3Npb24uc2luZ2xlKGNvbnRleHQsW10sXCJbKCdtZW1iZXJfaWQnLCc9JyxcIittZW1iZXJfaWQrXCIpLCgnc3VydmV5X2lkJywnPScsXCIrc3VydmV5SWQrXCIpXVwiKTtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXlTdWJtaXNzaW9uLk1vZGVsLCBbXSwgXCJbKCd1c2VyX2lkJywnPScsXCIgKyB1c2VySWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlVc2VyKCBjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleVN1Ym1pc3Npb24uc2VhcmNoKGNvbnRleHQsW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTdXJ2ZXkoc3VydmV5SWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoU3VydmV5U3VibWlzc2lvbi5Nb2RlbCwgW10sIFwiWygnc3VydmV5X2lkJywnPScsXCIgKyBzdXJ2ZXlJZCArIFwiKV1cIik7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VydmV5KCBjb250ZXh0OkFQSUNvbnRleHQsIHN1cnZleUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gU3VydmV5U3VibWlzc2lvbi5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3N1cnZleV9pZCcsJz0nLFwiK3N1cnZleUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlNZW1lcihtZW1iZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXlTdWJtaXNzaW9uLk1vZGVsLCBbXSwgXCJbKCdtZW1iZXJfaWQnLCc9JyxcIiArIG1lbWJlcklkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5TWVtYmVyKCBjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gU3VydmV5U3VibWlzc2lvbi5zZWFyY2goY29udGV4dCxbXSxcIlsoJ21lbWJlcl9pZCcsJz0nLFwiK21lbWJlcklkK1wiKV1cIik7XG4gICAgfVxufVxuIl19
