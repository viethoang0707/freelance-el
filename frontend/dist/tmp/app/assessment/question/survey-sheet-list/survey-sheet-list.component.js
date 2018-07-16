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
var survey_sheet_preview_dialog_component_1 = require("../survey-sheet-preview/survey-sheet-preview.dialog.component");
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var SurveySheetListComponent = (function (_super) {
    __extends(SurveySheetListComponent, _super);
    function SurveySheetListComponent() {
        var _this = _super.call(this) || this;
        _this.sheets = [];
        return _this;
    }
    SurveySheetListComponent.prototype.ngOnInit = function () {
        this.loadSurveySheets();
    };
    SurveySheetListComponent.prototype.deleteSheet = function () {
        var _this = this;
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedSheet.delete(_this).subscribe(function () {
                _this.selectedSheet = null;
                _this.loadSurveySheets();
            });
        });
    };
    SurveySheetListComponent.prototype.previewSheet = function () {
        this.sheetDialog.show(this.selectedSheet);
    };
    SurveySheetListComponent.prototype.loadSurveySheets = function () {
        var _this = this;
        survey_sheet_model_1.SurveySheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
        });
    };
    __decorate([
        core_1.ViewChild(survey_sheet_preview_dialog_component_1.SurveySheetPreviewDialog),
        __metadata("design:type", survey_sheet_preview_dialog_component_1.SurveySheetPreviewDialog)
    ], SurveySheetListComponent.prototype, "sheetDialog", void 0);
    SurveySheetListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-sheet-list',
            template: "<div class=\"card card-w-title\">         <h1>{{'Survey sheet bank'|translate}}</h1>         <div class=\"ui-g\">             <div class=\"ui-g-12\">                 <p-toolbar>                     <div class=\"ui-toolbar-group-left\">                        <button pButton type=\"button\" label=\"{{'Preview'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-remove-red-eye\" (click)=\"previewSheet()\" *ngIf=\"selectedSheet\"></button>                         <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteSheet()\" *ngIf=\"selectedSheet\"></button>                      </div>                 </p-toolbar>                 <p-table  #questionSheetTable [value]=\"sheets\" [paginator]=\"true\" [rows]=\"10\"  [(selection)]=\"selectedSheet\" [responsive]=\"true\" selectionMode=\"single\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Name'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th >                                 {{'Number of question'|translate}}                             </th>                              <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>                          </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-sheet let-i=\"rowIndex\">                         <tr [pSelectableRow]=\"sheet\">                             <td style=\"text-align: left;\">{{sheet.name}}</td>                             <td >{{sheet.question_count}}</td>                             <td>{{sheet.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{sheet.write_date | date : \"dd/MM/yyyy \"}}</td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{sheets?.length}}                     </ng-template>                     <ng-template pTemplate=\"emptymessage\">                         <tr>                             <td [attr.colspan]=\"2\">                                 {{'No records found'|translate}}                             </td>                         </tr>                     </ng-template>                 </p-table>                 <question-sheet-preview-dialog></question-sheet-preview-dialog>             </div>         </div>     </div>",
            styles: [".mrg-bt{margin-bottom:15px}.q-content{text-align:left}"],
        }),
        __metadata("design:paramtypes", [])
    ], SurveySheetListComponent);
    return SurveySheetListComponent;
}(base_component_1.BaseComponent));
exports.SurveySheetListComponent = SurveySheetListComponent;
