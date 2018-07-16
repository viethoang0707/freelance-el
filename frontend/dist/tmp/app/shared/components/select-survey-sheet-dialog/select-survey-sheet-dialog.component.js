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
var Rx_1 = require("rxjs/Rx");
var base_component_1 = require("../base/base.component");
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var SelectSurveySheetDialog = (function (_super) {
    __extends(SelectSurveySheetDialog, _super);
    function SelectSurveySheetDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectSheetReceiver = new Rx_1.Subject();
        _this.onSelectSheet = _this.onSelectSheetReceiver.asObservable();
        _this.display = false;
        _this.sheets = [];
        return _this;
    }
    SelectSurveySheetDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectSurveySheetDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        survey_sheet_model_1.SurveySheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
        });
    };
    SelectSurveySheetDialog.prototype.selectSheet = function () {
        this.onSelectSheetReceiver.next(this.selectedSheet);
        this.hide();
    };
    SelectSurveySheetDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-survey-sheet-dialog',
            template: "<p-dialog header=\"{{'Select question sheet'|translate}}\" [positionTop]=\"50\" [(visible)]=\"display\" modal=\"true\" width=\"800\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g ui-fluid form-group\">     <div class=\"ui-g-7\">       <p-table  [value]=\"sheets\" [(selection)]=\"selectedSheet\" >         <ng-template pTemplate=\"header\" >           <tr>             <th style=\"width: 2.25em\">                 <p-tableHeaderCheckbox></p-tableHeaderCheckbox>             </th>             <th style=\"width: 100px;\">               {{'Name'|translate}}             </th>             <th>               {{'Number of question'|translate}}             </th>           </tr>         </ng-template>         <ng-template pTemplate=\"body\" let-rowData>           <tr [pSelectableRow]=\"rowData\">             <td>               <p-tableCheckbox [value]=\"rowData\"></p-tableCheckbox>             </td>             <td >               {{rowData.name}}             </td>             <td >               {{rowData.question_count}}             </td>           </tr>         </ng-template>       </p-table>     </div>   </div>   <p-footer>     <button type=\"button\" [disabled]=\"!selectedSheet\" pButton icon=\"fa-check\" label=\"{{'OK'|translate}}\" (click)=\"selectSheet()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".form-group{max-height:450px}"],
        }),
        __metadata("design:paramtypes", [])
    ], SelectSurveySheetDialog);
    return SelectSurveySheetDialog;
}(base_component_1.BaseComponent));
exports.SelectSurveySheetDialog = SelectSurveySheetDialog;
