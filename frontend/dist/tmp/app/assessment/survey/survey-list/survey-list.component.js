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
var constants_1 = require("../../../shared/models/constants");
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_dialog_component_1 = require("../survey-dialog/survey-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var SurveyListComponent = (function (_super) {
    __extends(SurveyListComponent, _super);
    function SurveyListComponent() {
        var _this = _super.call(this) || this;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        return _this;
    }
    SurveyListComponent.prototype.ngOnInit = function () {
        this.loadSurveys();
    };
    SurveyListComponent.prototype.addSurvey = function () {
        var _this = this;
        var survey = new survey_model_1.Survey();
        survey.is_public = true;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(function () {
            _this.loadSurveys();
        });
    };
    SurveyListComponent.prototype.editSurvey = function () {
        if (!this.ContextUser.IsSuperAdmin || this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have edit permission for this survey'));
            return;
        }
        this.surveyDialog.show(this.selectedSurvey);
    };
    SurveyListComponent.prototype.deleteSurvey = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have delete permission for this survey'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
            _this.selectedSurvey.delete(_this).subscribe(function () {
                _this.loadSurveys();
                _this.selectedSurvey = null;
            });
        });
    };
    SurveyListComponent.prototype.loadSurveys = function () {
        var _this = this;
        survey_model_1.Survey.listPublicSurvey(this).subscribe(function (surveys) {
            _this.surveys = surveys;
            _this.surveys.sort(function (s1, s2) {
                return (s1.id < s2.id);
            });
        });
    };
    SurveyListComponent.prototype.requestReview = function () {
        var _this = this;
        if (this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have submit-review permission for this survey'));
            return;
        }
        this.workflowService.createSurveyReviewTicket(this, this.selectedSurvey).subscribe(function () {
            _this.success(_this.translateService.instant('Request submitted'));
            _this.selectedSurvey.refresh(_this).subscribe();
        });
    };
    __decorate([
        core_1.ViewChild(survey_dialog_component_1.SurveyDialog),
        __metadata("design:type", survey_dialog_component_1.SurveyDialog)
    ], SurveyListComponent.prototype, "surveyDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.SurveyEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.SurveyEnrollDialog)
    ], SurveyListComponent.prototype, "surveyEnrollDialog", void 0);
    SurveyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-list',
            template: "<div class=\"card card-w-title\">     <h1>{{'Surveys'|translate}}</h1>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addSurvey()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editSurvey()\" *ngIf=\"selectedSurvey\"></button>                     <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteSurvey()\" *ngIf=\"selectedSurvey\"></button>                     <button pButton type=\"button\" label=\"{{'Request review'|translate}}\" class=\"purple-btn\" icon=\"ui-icon-rate-revie\" (click)=\"requestReview()\" *ngIf=\"selectedSurvey &&  selectedSurvey.review_state !='approved'\"></button>                 </div>              </p-toolbar>             <p-table #surveyTable [value]=\"surveys\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedSurvey\" [responsive]=\"true\" >                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th>                             {{'Summary'|translate}}                         </th>                         <th>                             {{'Start'|translate}}                         </th>                         <th>                             {{'End'|translate}}                         </th>                         <th [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'review_state'\">                             {{'Reviewed'|translate}}                             <p-sortIcon [field]=\"'review_state'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-survey>                     <tr [pSelectableRow]=\"survey\">                         <td  style=\"text-align: left;\">{{survey.name}}</td>                         <td class=\"showformb\" style=\"text-align: left;\">{{survey.summary}}</td>                         <td class=\"showformb\">{{survey.start | date : \"dd/MM/yyyy, h:mm a\"}}</td>                         <td class=\"showformb\">{{survey.end | date : \"dd/MM/yyyy, h:mm a\"}}</td>                         <td class=\"showformb\">{{SURVEY_STATUS[survey.status] | translate}}</td>                         <td class=\"showformb\">{{REVIEW_STATE[survey.review_state] | translate}}</td>                         <td>{{survey.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{survey.write_date | date : \"dd/MM/yyyy \"}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{surveys?.length}}                 </ng-template>                 <ng-template pTemplate=\"emptymessage\">                     <tr>                         <td [attr.colspan]=\"5\">                             {{'No records found'|translate}}                         </td>                     </tr>                 </ng-template>             </p-table>             <survey-dialog></survey-dialog>         </div>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.search input{color:#fff;padding:6px 24px 6px 6px}.search i{position:absolute;right:0;top:0;color:#e8eaf6;font-size:28px}"],
        }),
        __metadata("design:paramtypes", [])
    ], SurveyListComponent);
    return SurveyListComponent;
}(base_component_1.BaseComponent));
exports.SurveyListComponent = SurveyListComponent;
