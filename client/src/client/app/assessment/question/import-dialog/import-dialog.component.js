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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var option_model_1 = require("../../../shared/models/elearning/option.model");
var _ = require("underscore");
var excel_service_1 = require("../../../shared/services/excel.service");
var QuestionImportDialog = (function (_super) {
    __extends(QuestionImportDialog, _super);
    function QuestionImportDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.onImportCompleteReceiver = new Rx_1.Subject();
        _this.onImportComplete = _this.onImportCompleteReceiver.asObservable();
        _this.display = false;
        _this.records = [];
        return _this;
    }
    QuestionImportDialog.prototype.show = function () {
        this.display = true;
        this.percentage = 0;
    };
    QuestionImportDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionImportDialog.prototype.import = function () {
        var _this = this;
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            var questionList = [];
            for (var i = 0; i < _this.records.length;) {
                var record = _this.records[i];
                var question = new question_model_1.Question();
                Object.assign(question, record);
                var group = _.find(groups, function (obj) {
                    return obj.code == record["group_code"];
                });
                var type = record["type"];
                if (group && type) {
                    question.group_id = group.id;
                    question.type = type;
                    var options = [];
                    var optionLength = 1;
                    while (i + optionLength < _this.records.length && !_this.records[i + optionLength]["group_code"])
                        optionLength++;
                    if ((type == "sc" || type == "mc") && optionLength) {
                        for (var j = 0; j < optionLength && i < _this.records.length; j++) {
                            var optionRecord = _this.records[j + i];
                            var option = new option_model_1.QuestionOption();
                            option.is_correct = optionRecord["correct"] == 'Y';
                            option.content = optionRecord["option"];
                            options.push(option);
                        }
                        question["options"] = _.shuffle(options);
                    }
                    i += optionLength;
                }
                else
                    i++;
                questionList.push(question);
            }
            question_model_1.Question.createArray(_this, questionList).subscribe(function () {
                _this.onImportCompleteReceiver.next();
                _this.hide();
            });
        });
    };
    QuestionImportDialog.prototype.changeListner = function (event) {
        var _this = this;
        var file = event.files[0];
        this.fileName = file.name;
        this.excelService.importFromExcelFile(file).subscribe(function (data) {
            _this.records = data;
            _this.total = _this.records.length;
        });
    };
    QuestionImportDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-import-dialog',
            templateUrl: 'import-dialog.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], QuestionImportDialog);
    return QuestionImportDialog;
}(base_component_1.BaseComponent));
exports.QuestionImportDialog = QuestionImportDialog;
//# sourceMappingURL=import-dialog.component.js.map