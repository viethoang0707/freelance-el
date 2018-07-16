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
var survey_model_1 = require("./survey.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var _ = require("underscore");
var list_api_1 = require("../../services/api/list.api");
var SurveyMember = (function (_super) {
    __extends(SurveyMember, _super);
    function SurveyMember() {
        var _this = _super.call(this) || this;
        _this.survey_id = undefined;
        _this.course_member_id = undefined;
        _this.date_register = undefined;
        _this.name = undefined;
        _this.login = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.user_id = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.enroll_status = undefined;
        _this.role = undefined;
        _this.survey = new survey_model_1.Survey();
        _this.submission_id = undefined;
        _this.survey_review_state = undefined;
        return _this;
    }
    SurveyMember_1 = SurveyMember;
    SurveyMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    SurveyMember.__api__listBySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.__api__bySurveyAndUser = function (surveyId, userId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('user_id','='," + userId + "),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.listBySurvey = function (context, surveyId) {
        return SurveyMember_1.search(context, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.listByUser = function (context, userId) {
        return SurveyMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    SurveyMember.bySurveyAndUser = function (context, userId, surveyId) {
        return SurveyMember_1.single(context, [], "[('user_id','='," + userId + "),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.prototype.__api__populateSurvey = function () {
        return new list_api_1.ListAPI(survey_model_1.Survey.Model, [this.survey_id], []);
    };
    SurveyMember.prototype.populateSurvey = function (context) {
        var _this = this;
        if (!this.survey_id)
            return Rx_1.Observable.of(null);
        return survey_model_1.Survey.get(context, this.survey_id).do(function (survey) {
            _this.survey = survey;
        });
    };
    SurveyMember.populateSurveys = function (context, members) {
        var surveyIds = _.pluck(members, 'survey_id');
        surveyIds = _.filter(surveyIds, function (id) {
            return id;
        });
        return survey_model_1.Survey.array(context, surveyIds).do(function (surveys) {
            _.each(members, function (member) {
                member.survey = _.find(surveys, function (survey) {
                    return member.survey_id == survey.id;
                });
            });
        });
    };
    SurveyMember.__api__surveyEditor = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.surveyEditor = function (context, surveyId) {
        return SurveyMember_1.single(context, [], "[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.__api__surveySupervisor = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('role','=','supervisor'),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.surveySupervisor = function (context, surveyId) {
        return SurveyMember_1.single(context, [], "[('role','=','supervisor'),('survey_id','='," + surveyId + ")]");
    };
    var SurveyMember_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], SurveyMember.prototype, "date_register", void 0);
    SurveyMember = SurveyMember_1 = __decorate([
        decorator_1.Model('etraining.survey_member'),
        __metadata("design:paramtypes", [])
    ], SurveyMember);
    return SurveyMember;
}(base_model_1.BaseModel));
exports.SurveyMember = SurveyMember;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUFtRTtBQUNuRSw0Q0FBMEM7QUFHMUMsK0NBQXdDO0FBQ3hDLDhCQUE4QztBQUM5QywwQ0FBbUQ7QUFFbkQsOEJBQWdDO0FBQ2hDLHdEQUFzRDtBQUd0RDtJQUFrQyxnQ0FBUztJQUV2QztRQUFBLFlBQ0ksaUJBQU8sU0FpQlY7UUFmRyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsZ0JBQWdCLEdBQUksU0FBUyxDQUFDO1FBQ25DLEtBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLHFCQUFNLEVBQUUsQ0FBQztRQUM1QixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsbUJBQW1CLEdBQUksU0FBUyxDQUFDOztJQUMxQyxDQUFDO3FCQXBCUSxZQUFZO0lBdUNkLDhCQUFpQixHQUF4QixVQUF5QixNQUFjO1FBQ25DLE9BQU8sSUFBSSwrQkFBYSxDQUFDLGNBQVks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LEVBQUUsRUFBRSxFQUFDLDBDQUEwQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRU0seUJBQVksR0FBbkIsVUFBb0IsT0FBbUIsRUFBRSxRQUFnQjtRQUNyRCxPQUFPLGNBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSwwQ0FBMEMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVNLG9DQUF1QixHQUE5QixVQUErQixRQUFnQjtRQUMzQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxjQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyw4Q0FBOEMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdEgsQ0FBQztJQUVNLDZCQUFnQixHQUF2QixVQUF3QixPQUFtQixFQUFFLFFBQWdCO1FBQ3pELE9BQU8sY0FBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLDhDQUE4QyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM5RyxDQUFDOztJQXpFRDtRQURDLHlCQUFhLEVBQVE7a0NBQ1AsSUFBSTt1REFBQztJQWhDWCxZQUFZO1FBRHhCLGlCQUFLLENBQUMseUJBQXlCLENBQUM7O09BQ3BCLFlBQVksQ0E0R3hCO0lBQUQsbUJBQUM7Q0E1R0QsQUE0R0MsQ0E1R2lDLHNCQUFTLEdBNEcxQztBQTVHWSxvQ0FBWSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4vc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5IH0gZnJvbSAnLi9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwsRmllbGRQcm9wZXJ0eSB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgTGlzdEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9saXN0LmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnN1cnZleV9tZW1iZXInKVxuZXhwb3J0IGNsYXNzIFN1cnZleU1lbWJlciBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN1cnZleV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb3Vyc2VfbWVtYmVyX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kYXRlX3JlZ2lzdGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubG9naW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZW1haWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGhvbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXNlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZF9fREVTQ19fID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmVucm9sbF9zdGF0dXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucm9sZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdXJ2ZXkgPSAgbmV3IFN1cnZleSgpO1xuICAgICAgICB0aGlzLnN1Ym1pc3Npb25faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3VydmV5X3Jldmlld19zdGF0ZSA9ICB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3VibWlzc2lvbl9pZDpudW1iZXI7XG4gICAgY291cnNlX21lbWJlcl9pZDogbnVtYmVyO1xuICAgIHJvbGU6IHN0cmluZztcbiAgICBzdXJ2ZXlfaWQ6IG51bWJlcjtcbiAgICBzdXJ2ZXlfcmV2aWV3X3N0YXRlOiBzdHJpbmc7XG4gICAgc3VydmV5OiBTdXJ2ZXk7XG4gICAgdXNlcl9pZDogbnVtYmVyO1xuICAgIGxvZ2luOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBkYXRlX3JlZ2lzdGVyOiBEYXRlO1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcGhvbmU6IHN0cmluZztcbiAgICBncm91cF9pZDogbnVtYmVyO1xuICAgIGdyb3VwX2lkX19ERVNDX186IHN0cmluZztcbiAgICBlbnJvbGxfc3RhdHVzOiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVVzZXIodXNlcklkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFN1cnZleU1lbWJlci5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTdXJ2ZXkoc3VydmV5SWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoU3VydmV5TWVtYmVyLk1vZGVsLCBbXSxcIlsoJ3N1cnZleV9pZCcsJz0nLFwiK3N1cnZleUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19ieVN1cnZleUFuZFVzZXIoc3VydmV5SWQ6IG51bWJlcix1c2VySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoU3VydmV5TWVtYmVyLk1vZGVsLCBbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpLCgnc3VydmV5X2lkJywnPScsXCIrc3VydmV5SWQrXCIpXVwiKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBsaXN0QnlTdXJ2ZXkoIGNvbnRleHQ6QVBJQ29udGV4dCwgc3VydmV5SWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleU1lbWJlci5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3N1cnZleV9pZCcsJz0nLFwiK3N1cnZleUlkK1wiKV1cIik7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgbGlzdEJ5VXNlciggY29udGV4dDpBUElDb250ZXh0LCB1c2VySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleU1lbWJlci5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlTdXJ2ZXlBbmRVc2VyKCBjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZDogbnVtYmVyLCBzdXJ2ZXlJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleU1lbWJlci5zaW5nbGUoY29udGV4dCxbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpLCgnc3VydmV5X2lkJywnPScsXCIrc3VydmV5SWQrXCIpXVwiKTtcbiAgICB9XG4gICAgXG4gICAgX19hcGlfX3BvcHVsYXRlU3VydmV5KCk6IExpc3RBUEkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3RBUEkoU3VydmV5Lk1vZGVsLCBbdGhpcy5zdXJ2ZXlfaWRdLCBbXSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVTdXJ2ZXkoY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5zdXJ2ZXlfaWQpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihudWxsKTtcbiAgICAgICAgcmV0dXJuIFN1cnZleS5nZXQoY29udGV4dCwgdGhpcy5zdXJ2ZXlfaWQpLmRvKHN1cnZleSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1cnZleSA9IHN1cnZleTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBvcHVsYXRlU3VydmV5cyhjb250ZXh0OiBBUElDb250ZXh0LCBtZW1iZXJzOiBTdXJ2ZXlNZW1iZXJbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBzdXJ2ZXlJZHMgPSBfLnBsdWNrKG1lbWJlcnMsJ3N1cnZleV9pZCcpO1xuICAgICAgICBzdXJ2ZXlJZHMgPSBfLmZpbHRlcihzdXJ2ZXlJZHMsIGlkPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFN1cnZleS5hcnJheShjb250ZXh0LCBzdXJ2ZXlJZHMpLmRvKHN1cnZleXM9PiB7XG4gICAgICAgICAgICBfLmVhY2gobWVtYmVycywgKG1lbWJlcjpTdXJ2ZXlNZW1iZXIpPT4ge1xuICAgICAgICAgICAgICAgIG1lbWJlci5zdXJ2ZXkgPSAgXy5maW5kKHN1cnZleXMsIChzdXJ2ZXk6U3VydmV5KT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5zdXJ2ZXlfaWQgPT0gc3VydmV5LmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fc3VydmV5RWRpdG9yKHN1cnZleUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFN1cnZleU1lbWJlci5Nb2RlbCwgW10sXCJbKCdyb2xlJywnPScsJ2VkaXRvcicpLCgnc3VydmV5X2lkJywnPScsXCIgKyBzdXJ2ZXlJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1cnZleUVkaXRvcihjb250ZXh0OiBBUElDb250ZXh0LCBzdXJ2ZXlJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleU1lbWJlci5zaW5nbGUoY29udGV4dCwgW10sIFwiWygncm9sZScsJz0nLCdlZGl0b3InKSwoJ3N1cnZleV9pZCcsJz0nLFwiICsgc3VydmV5SWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fc3VydmV5U3VwZXJ2aXNvcihzdXJ2ZXlJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXlNZW1iZXIuTW9kZWwsIFtdLFwiWygncm9sZScsJz0nLCdzdXBlcnZpc29yJyksKCdzdXJ2ZXlfaWQnLCc9JyxcIiArIHN1cnZleUlkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3VydmV5U3VwZXJ2aXNvcihjb250ZXh0OiBBUElDb250ZXh0LCBzdXJ2ZXlJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFN1cnZleU1lbWJlci5zaW5nbGUoY29udGV4dCwgW10sIFwiWygncm9sZScsJz0nLCdzdXBlcnZpc29yJyksKCdzdXJ2ZXlfaWQnLCc9JyxcIiArIHN1cnZleUlkICsgXCIpXVwiKTtcbiAgICB9XG5cblxufVxuIl19
