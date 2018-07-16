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
var core_1 = require("@angular/core");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_member_model_1 = require("../../../shared/models/elearning/survey-member.model");
var base_model_1 = require("../../../shared/models/base.model");
var ClassSurveyEnrollDialog = (function (_super) {
    __extends(ClassSurveyEnrollDialog, _super);
    function ClassSurveyEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.SURVEY_MEMBER_ENROLL_STATUS = constants_1.SURVEY_MEMBER_ENROLL_STATUS;
        _this.display = false;
        _this.surveyMembers = [];
        _this.courseMembers = [];
        _this.survey = new survey_model_1.Survey();
        return _this;
    }
    ClassSurveyEnrollDialog.prototype.show = function (survey) {
        var _this = this;
        this.display = true;
        this.surveyMembers = [];
        this.courseMembers = [];
        this.survey = survey;
        base_model_1.BaseModel
            .bulk_search(this, course_member_model_1.CourseMember.__api__listByClass(survey.course_class_id), survey_member_model_1.SurveyMember.__api__listBySurvey(survey.id))
            .subscribe(function (jsonArr) {
            var courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
            _this.courseMembers = _.filter(courseMembers, function (member) {
                return member.role == 'student';
            });
            var surveyMembers = survey_member_model_1.SurveyMember.toArray(jsonArr[1]);
            _this.surveyMembers = _.filter(surveyMembers, function (member) {
                return member.role == 'candidate';
            });
        });
    };
    ClassSurveyEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassSurveyEnrollDialog.prototype.enrollAll = function () {
        var _this = this;
        var userIds = _.pluck(this.courseMembers, 'user_id');
        this.survey.enroll(this, userIds).subscribe(function () {
            _this.info('Register all successfully');
            survey_member_model_1.SurveyMember.listBySurvey(_this, _this.survey.id).subscribe(function (members) {
                _this.surveyMembers = members;
            });
        });
    };
    ClassSurveyEnrollDialog.prototype.closeSurvey = function () {
        var _this = this;
        this.confirm('Are you sure to proceed ?  You will not be able to enroll new members after the survey is closed', function () {
            _this.survey.close(_this).subscribe(function () {
                _this.survey.status = 'closed';
                _this.success('Survey close');
            });
        });
    };
    ClassSurveyEnrollDialog.prototype.openSurvey = function () {
        var _this = this;
        this.confirm('Are you sure to proceed ?.', function () {
            _this.survey.open(_this).subscribe(function () {
                _this.survey.status = 'open';
                _this.success('Survey open');
            });
        });
    };
    ClassSurveyEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-survey-enroll-dialog',
            templateUrl: 'class-survey-enroll.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ClassSurveyEnrollDialog);
    return ClassSurveyEnrollDialog;
}(base_component_1.BaseComponent));
exports.ClassSurveyEnrollDialog = ClassSurveyEnrollDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvY2xhc3Mtc3VydmV5LWVucm9sbC9jbGFzcy1zdXJ2ZXktZW5yb2xsLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUcvRSw4QkFBZ0M7QUFDaEMsOERBQThGO0FBRTlGLDRGQUFvRjtBQUNwRiw4RUFBdUU7QUFDdkUsNEZBQW9GO0FBRXBGLGdFQUE4RDtBQU85RDtJQUE2QywyQ0FBYTtJQVV6RDtRQUFBLFlBQ0MsaUJBQU8sU0FLUDtRQWRELGlDQUEyQixHQUFHLHVDQUEyQixDQUFDO1FBVXpELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7O0lBQzVCLENBQUM7SUFFRCxzQ0FBSSxHQUFKLFVBQUssTUFBYztRQUFuQixpQkFpQkM7UUFoQkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsc0JBQVM7YUFDUCxXQUFXLENBQUMsSUFBSSxFQUFFLGtDQUFZLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLGtDQUFZLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZILFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakIsSUFBSSxhQUFhLEdBQUcsa0NBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxVQUFDLE1BQW9CO2dCQUNqRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxhQUFhLEdBQUcsa0NBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxVQUFDLE1BQW9CO2dCQUNqRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQ0FBUyxHQUFUO1FBQUEsaUJBUUM7UUFQQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDdkMsa0NBQVksQ0FBQyxZQUFZLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztnQkFDaEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCw2Q0FBVyxHQUFYO1FBQUEsaUJBT0M7UUFOQSxJQUFJLENBQUMsT0FBTyxDQUFDLGtHQUFrRyxFQUFFO1lBQ2hILEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO2dCQUM5QixLQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsNENBQVUsR0FBVjtRQUFBLGlCQU9DO1FBTkEsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRTtZQUMxQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDNUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQW5FVyx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFdBQVcsRUFBRSwyQ0FBMkM7U0FDeEQsQ0FBQzs7T0FDVyx1QkFBdUIsQ0FvRW5DO0lBQUQsOEJBQUM7Q0FwRUQsQUFvRUMsQ0FwRTRDLDhCQUFhLEdBb0V6RDtBQXBFWSwwREFBdUIiLCJmaWxlIjoiYXBwL2xtcy9jbGFzcy9jbGFzcy1zdXJ2ZXktZW5yb2xsL2NsYXNzLXN1cnZleS1lbnJvbGwuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgU1VSVkVZX01FTUJFUl9FTlJPTExfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDb3Vyc2VDbGFzcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1jbGFzcy5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjbGFzcy1zdXJ2ZXktZW5yb2xsLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnY2xhc3Mtc3VydmV5LWVucm9sbC5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDbGFzc1N1cnZleUVucm9sbERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdFNVUlZFWV9NRU1CRVJfRU5ST0xMX1NUQVRVUyA9IFNVUlZFWV9NRU1CRVJfRU5ST0xMX1NUQVRVUztcblxuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cdHByaXZhdGUgc3VydmV5OiBTdXJ2ZXk7XG5cdHByaXZhdGUgc2VsZWN0ZWRNZW1iZXI6IFN1cnZleU1lbWJlcjtcblx0cHJpdmF0ZSBzdXJ2ZXlNZW1iZXJzOiBTdXJ2ZXlNZW1iZXJbXTtcblx0cHJpdmF0ZSBjb3Vyc2VNZW1iZXJzOiBDb3Vyc2VNZW1iZXJbXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMuc3VydmV5TWVtYmVycyA9IFtdO1xuXHRcdHRoaXMuY291cnNlTWVtYmVycyA9IFtdO1xuXHRcdHRoaXMuc3VydmV5ID0gbmV3IFN1cnZleSgpO1xuXHR9XG5cblx0c2hvdyhzdXJ2ZXk6IFN1cnZleSkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5zdXJ2ZXlNZW1iZXJzID0gW107XG5cdFx0dGhpcy5jb3Vyc2VNZW1iZXJzID0gW107XG5cdFx0dGhpcy5zdXJ2ZXkgPSBzdXJ2ZXk7XG5cdFx0QmFzZU1vZGVsXG5cdFx0XHQuYnVsa19zZWFyY2godGhpcywgQ291cnNlTWVtYmVyLl9fYXBpX19saXN0QnlDbGFzcyhzdXJ2ZXkuY291cnNlX2NsYXNzX2lkKSwgU3VydmV5TWVtYmVyLl9fYXBpX19saXN0QnlTdXJ2ZXkoc3VydmV5LmlkKSlcblx0XHRcdC5zdWJzY3JpYmUoanNvbkFyciA9PiB7XG5cdFx0XHRcdHZhciBjb3Vyc2VNZW1iZXJzID0gQ291cnNlTWVtYmVyLnRvQXJyYXkoanNvbkFyclswXSk7XG5cdFx0XHRcdHRoaXMuY291cnNlTWVtYmVycyA9IF8uZmlsdGVyKGNvdXJzZU1lbWJlcnMsIChtZW1iZXI6IENvdXJzZU1lbWJlcikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBtZW1iZXIucm9sZSA9PSAnc3R1ZGVudCc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR2YXIgc3VydmV5TWVtYmVycyA9IFN1cnZleU1lbWJlci50b0FycmF5KGpzb25BcnJbMV0pO1xuXHRcdFx0XHR0aGlzLnN1cnZleU1lbWJlcnMgPSBfLmZpbHRlcihzdXJ2ZXlNZW1iZXJzLCAobWVtYmVyOiBTdXJ2ZXlNZW1iZXIpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbWVtYmVyLnJvbGUgPT0gJ2NhbmRpZGF0ZSc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblx0ZW5yb2xsQWxsKCkge1xuXHRcdHZhciB1c2VySWRzID0gXy5wbHVjayh0aGlzLmNvdXJzZU1lbWJlcnMsICd1c2VyX2lkJyk7XG5cdFx0dGhpcy5zdXJ2ZXkuZW5yb2xsKHRoaXMsIHVzZXJJZHMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLmluZm8oJ1JlZ2lzdGVyIGFsbCBzdWNjZXNzZnVsbHknKTtcblx0XHRcdFN1cnZleU1lbWJlci5saXN0QnlTdXJ2ZXkodGhpcywgdGhpcy5zdXJ2ZXkuaWQpLnN1YnNjcmliZShtZW1iZXJzPT4ge1xuXHRcdFx0XHR0aGlzLnN1cnZleU1lbWJlcnMgPSBtZW1iZXJzO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbG9zZVN1cnZleSgpIHtcblx0XHR0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byBwcm9jZWVkID8gIFlvdSB3aWxsIG5vdCBiZSBhYmxlIHRvIGVucm9sbCBuZXcgbWVtYmVycyBhZnRlciB0aGUgc3VydmV5IGlzIGNsb3NlZCcsICgpID0+IHtcblx0XHRcdHRoaXMuc3VydmV5LmNsb3NlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuc3VydmV5LnN0YXR1cyA9ICdjbG9zZWQnO1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3MoJ1N1cnZleSBjbG9zZScpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRvcGVuU3VydmV5KCkge1xuXHRcdHRoaXMuY29uZmlybSgnQXJlIHlvdSBzdXJlIHRvIHByb2NlZWQgPy4nLCAoKSA9PiB7XG5cdFx0XHR0aGlzLnN1cnZleS5vcGVuKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuc3VydmV5LnN0YXR1cyA9ICdvcGVuJztcblx0XHRcdFx0dGhpcy5zdWNjZXNzKCdTdXJ2ZXkgb3BlbicpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==
