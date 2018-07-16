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
            template: "<p-dialog header=\"{{'Class survey enroll'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"800\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">     <div class=\"ui-g-12 \">       <p-toolbar>                 <div class=\"ui-toolbar-group-left \">                     <button pButton type=\"button \" label=\"{{ 'Register all'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"enrollAll() \" *ngIf=\"surveyMembers.length==0\"></button>                 </div>                  <div class=\"ui-toolbar-group-right\">                      <button pButton type=\"button \" label=\"{{ 'Open'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"openSurvey() \" [disabled]=\" survey.status!='initial'\" ></button>                      <button pButton type=\"button \" label=\"{{ 'Close'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"closeSurvey() \" [disabled]=\" survey.status=='closed'\" ></button>                 </div>             </p-toolbar>             <p-table #candidateTable [value]=\"surveyMembers\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMember \" [responsive]=\"true \" sortField=\"name\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'email'\">                             {{'Email'|translate}}                             <p-sortIcon [field]=\"'email'\"></p-sortIcon>                         </th>                         <th>{{'Phone'|translate}}</th>                         <th [pSortableColumn]=\"'group_id__DESC__'\">                             {{'Group'|translate}}                             <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-member>                     <tr [pSelectableRow]=\"member \">                         <td>{{member.name}}</td>                         <td>{{member.email}}</td>                         <td>{{member.phone}}</td>                         <td>{{member.group_id__DESC__}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{surveyMembers?.length}}                 </ng-template>             </p-table>     </div>   </p-scrollPanel>   <p-footer>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ClassSurveyEnrollDialog);
    return ClassSurveyEnrollDialog;
}(base_component_1.BaseComponent));
exports.ClassSurveyEnrollDialog = ClassSurveyEnrollDialog;
