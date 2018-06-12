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
var exam_question_model_1 = require("../../models/elearning/exam-question.model");
var base_component_1 = require("../base/base.component");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var _ = require("underscore");
var SelectQuestionSheetDialog = (function (_super) {
    __extends(SelectQuestionSheetDialog, _super);
    function SelectQuestionSheetDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectSheetReceiver = new Rx_1.Subject();
        _this.onSelectSheet = _this.onSelectSheetReceiver.asObservable();
        _this.display = false;
        _this.sheets = [];
        return _this;
    }
    SelectQuestionSheetDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectQuestionSheetDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        question_sheet_model_1.QuestionSheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
            _.each(sheets, function (sheet) {
                exam_question_model_1.ExamQuestion.countBySheet(_this, sheet["id"]).subscribe(function (count) {
                    sheet["question_count"] = count;
                });
            });
        });
    };
    SelectQuestionSheetDialog.prototype.selectSheet = function () {
        this.onSelectSheetReceiver.next(this.selectedSheet);
        this.hide();
    };
    SelectQuestionSheetDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-question-sheet-dialog',
            templateUrl: 'select-question-sheet-dialog.component.html',
            styleUrls: ['select-question-sheet-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectQuestionSheetDialog);
    return SelectQuestionSheetDialog;
}(base_component_1.BaseComponent));
exports.SelectQuestionSheetDialog = SelectQuestionSheetDialog;
//# sourceMappingURL=select-question-sheet-dialog.component.js.map