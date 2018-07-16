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
var survey_content_dialog_component_1 = require("../../../cms/survey/content-dialog/survey-content.dialog.component");
var survey_study_dialog_component_1 = require("../survey-study/survey-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var router_1 = require("@angular/router");
var SurveyListComponent = (function (_super) {
    __extends(SurveyListComponent, _super);
    function SurveyListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.surveys = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    SurveyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var surveys = _this.lmsProfileService.MySurveys;
            _this.displaySurveys(surveys);
        });
    };
    SurveyListComponent.prototype.displaySurveys = function (surveys) {
        var _this = this;
        _.each(surveys, function (survey) {
            survey['candidate'] = _this.lmsProfileService.getSurveyMemberByRole('candidate', survey.id);
            survey['editor'] = _this.lmsProfileService.getSurveyMemberByRole('editor', survey.id);
            survey['supervisor'] = _this.lmsProfileService.getSurveyMemberByRole('supervisor', survey.id);
            if (survey['supervisor'])
                survey['editor'] = survey['supervisor'];
        });
        surveys.sort(function (survey1, survey2) {
            return _this.lmsProfileService.getLastSurveyTimestamp(survey2) - _this.lmsProfileService.getLastSurveyTimestamp(survey1);
        });
        this.surveys = surveys;
    };
    SurveyListComponent.prototype.editContent = function (survey) {
        this.surveyContentDialog.show(survey);
    };
    SurveyListComponent.prototype.startSurvey = function (survey, member) {
        var _this = this;
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: function () {
                _this.surveyStudyDialog.show(survey, member);
            }
        });
    };
    SurveyListComponent.prototype.publishSurvey = function (survey) {
        survey.sheet_status = 'published';
        survey.save(this).subscribe();
    };
    SurveyListComponent.prototype.unpublishSurvey = function (survey) {
        survey.sheet_status = 'unpublished';
        survey.save(this).subscribe();
    };
    __decorate([
        core_1.ViewChild(survey_content_dialog_component_1.SurveyContentDialog),
        __metadata("design:type", survey_content_dialog_component_1.SurveyContentDialog)
    ], SurveyListComponent.prototype, "surveyContentDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_study_dialog_component_1.SurveyStudyDialog),
        __metadata("design:type", survey_study_dialog_component_1.SurveyStudyDialog)
    ], SurveyListComponent.prototype, "surveyStudyDialog", void 0);
    SurveyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-survey-list',
            template: "<div class=\"card card-w-title ui-g\">     <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <h1>{{'My surveys'|translate}}</h1></div>     <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <p-dataList [value]=\"surveys\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"lms-exam-list\">             <ng-template let-survey pTemplate=\"item\">                 <p-card styleClass=\"lms-exam-list-item\">                     <div class=\"ui-g\">                         <div class=\"ui-lg-8 ui-md-12 ui-g-12\">                             <div class=\"mt5\">                                 <h4 class=\"title\">{{survey.name}}</h4>                                 <span class=\"e-status\">                   {{survey.status}}                 </span>                             </div>                             <div class=\"clearfix\"></div>                             <p-accordion styleClass=\"cont\">                                 <p-accordionTab header=\"{{'Summary' | translate}}\">                                     {{survey.summary}}                                 </p-accordionTab>                                 <p-accordionTab header=\"{{'Instruction' | translate}}\">                                     <p [innerHTML]=\"survey.instruction\"></p>                                 </p-accordionTab>                             </p-accordion>                         </div>                         <div class=\"ui-lg-4 ui-md-12 ui-g-12\">                             <p-card styleClass=\"lms-exam-detail\">                                 <ul class=\"list-cmt\">                                     <li class=\"clearfix\" *ngIf=\"!survey.IsAvailable\">                                         <i class=\"material-icons\">error-outline</i>                                         <span class=\"cmt-title\">{{'Survey not available'|translate}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">date_range</i>                                         <span class=\"cmt-title\">{{'Start date'|translate}}</span>                                         <span class=\"cmt-detail\">{{survey.start | date : \"dd/MM/yyyy\"}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">date_range</i>                                         <span class=\"cmt-title\">{{'End date'|translate}}</span>                                         <span class=\"cmt-detail\">{{survey.end | date : \"dd/MM/yyyy\"}}</span>                                     </li>                                     <li class=\"clearfix\" style=\"border-bottom: none;\">                                         <i class=\"material-icons\">done</i>                                         <span class=\"cmt-title\">{{'Number of question'|translate}}</span>                                         <span class=\"cmt-detail\">{{survey.question_count}}</span>                                     </li>                                 </ul>                                 <p-footer>                                     <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Join'| translate}}\" label=\"{{'Join'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"startSurvey(survey, survey.candidate)\" [disabled]=\"!survey.IsAvailable || survey.candidate.enroll_status=='completed'\" *ngIf=\"survey.candidate!=null\"></button>                                     <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Publish'| translate}}\" label=\"{{'Publish'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"publishSurvey(survey)\" *ngIf=\"survey.supervisor!=null && survey.sheet_status!='published'\"></button>                                     <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Unpublish'| translate}}\" label=\"{{'Unpublish'|translate}}\" class=\"mr4 red-btn\" (click)=\"unpublishSurvey(survey)\" *ngIf=\"survey.supervisor!=null && survey.sheet_status!='unpublished'\"></button>                                     <button pButton type=\"button\" icon=\"ui-icon-edit\" title=\"{{'Edit content'| translate}}\" label=\"{{'Edit content'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"editContent(survey)\" *ngIf=\"survey.editor!=null\"></button>                                 </p-footer>                             </p-card>                         </div>                     </div>                 </p-card>             </ng-template>         </p-dataList>     </div>     <survey-content-dialog></survey-content-dialog>     <survey-study-dialog></survey-study-dialog> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.head-exam{background-color:#e91e63}.head-exam button{margin:5px 0 5px 5px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#757575;float:right}.e-title{font-size:15px}.e-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.status-bars{margin-top:10px;margin-right:20px}h4.title{float:left;font-weight:600;color:#192fa9;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 15px}"],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], SurveyListComponent);
    return SurveyListComponent;
}(base_component_1.BaseComponent));
exports.SurveyListComponent = SurveyListComponent;
