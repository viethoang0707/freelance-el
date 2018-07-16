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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var exam_setting_model_1 = require("../../../shared/models/elearning/exam-setting.model");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var ExamSettingDialog = (function (_super) {
    __extends(ExamSettingDialog, _super);
    function ExamSettingDialog() {
        var _this = _super.call(this) || this;
        _this.setting = new exam_setting_model_1.ExamSetting();
        _this.grades = [];
        _this.deletedGrades = [];
        _this.display = false;
        return _this;
    }
    ExamSettingDialog.prototype.show = function (exam) {
        var _this = this;
        this.display = true;
        this.exam = exam;
        this.grades = [];
        this.deletedGrades = [];
        exam_grade_model_1.ExamGrade.listByExam(this, exam.id).subscribe(function (grades) {
            _this.grades = grades;
        });
        exam_setting_model_1.ExamSetting.byExam(this, exam.id).subscribe(function (setting) {
            if (!setting) {
                setting = new exam_setting_model_1.ExamSetting();
                setting.exam_id = exam.id;
            }
            _this.setting = setting;
        });
    };
    ExamSettingDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamSettingDialog.prototype.addGrade = function () {
        var grade = new exam_grade_model_1.ExamGrade();
        grade.name = 'New grade';
        grade.exam_id = this.exam.id;
        this.grades.push(grade);
    };
    ExamSettingDialog.prototype.saveExamSetting = function () {
        var _this = this;
        this.setting.save(this).subscribe(function () {
            var existGrades = _.filter(_this.grades, function (grade) {
                return !grade.IsNew && (grade.name && grade.name != '');
            });
            var newGrades = _.filter(_this.grades, function (grade) {
                return grade.IsNew && (grade.name && grade.name != '');
            });
            var deleteGrades = _.filter(_this.grades, function (grade) {
                return !grade.IsNew && (!grade.name || grade.name === '');
            });
            Observable_1.Observable.forkJoin(exam_grade_model_1.ExamGrade.updateArray(_this, existGrades), exam_grade_model_1.ExamGrade.createArray(_this, newGrades), exam_grade_model_1.ExamGrade.deleteArray(_this, deleteGrades))
                .subscribe(function () {
                _this.success(_this.translateService.instant('Setting saved successfully.'));
                _this.hide();
            });
        });
    };
    ExamSettingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-setting-dialog',
            template: "<p-dialog header=\"{{'Exam setting'|translate}}\" [(visible)]=\"display\" modal=\"false\" width=\"500\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '300px'}\">         <form novalidate (ngSubmit)=\"f.form.valid && saveExamSetting()\" #f=\"ngForm\" autocomplete=\"off\">             <div class=\"ui-g-12 ui-fluid form-group mt20\">                 <div class=\"ui-g-6\">                     <span class=\"md-inputfield input-scale\">           <input type=\"text\"  pInputText name=\"scale\" [(ngModel)]=\"setting.scale\" pKeyFilter=\"pint\">           <label for=\"scale\">{{'Scale' | translate}}</label>         </span>                 </div>                 <div class=\"ui-g-6\">                     <p-checkbox name=\"take_pic\" binary=\"true\" label=\"{{'Take picture on submit'|translate}}\" [(ngModel)]=\"setting.take_picture_on_submit\"></p-checkbox>                 </div>                 <div class=\" ui-g-12 \">                     <p-toolbar>                         <div class=\"ui-toolbar-group-left\">                             <button pButton type=\"button\" label=\"{{'New level'|translate}}\" class=\"green-btn\" (click)=\"addGrade()\" icon=\"ui-icon-add\"></button>                         </div>                     </p-toolbar>                     <p-table #levelTable [value]=\"grades\" [paginator]=\"false\" [rows]=\"10\" [(selection)]=\"selectedGrade\" [responsive]=\"true\" selectionMode=\"single\">                         <ng-template pTemplate=\"header\">                             <tr>                                 <th>                                     {{'Name'|translate}}                                 </th>                                 <th>                                     {{'Min'|translate}}                                 </th>                                 <th>                                     {{'Max'|translate}}                                 </th>                             </tr>                         </ng-template>                         <ng-template pTemplate=\"body\" let-grade let-i=\"rowIndex\">                             <tr [pSelectableRow]=\"grade\">                                 <td pEditableColumn>                                     <p-cellEditor>                                         <ng-template pTemplate=\"input\">                                             <input type=\"text\" name=\"name\" [(ngModel)]=\"grade.name\">                                         </ng-template>                                         <ng-template pTemplate=\"output\">                                             {{grade.name}}                                         </ng-template>                                     </p-cellEditor>                                 </td>                                 <td pEditableColumn>                                     <p-cellEditor>                                         <ng-template pTemplate=\"input\">                                              <p-spinner [(ngModel)]=\"grade.min_score\" name=\"grade_min\" [min]=\"0\"></p-spinner>                                         </ng-template>                                         <ng-template pTemplate=\"output\">                                             {{grade.min_score}}                                         </ng-template>                                     </p-cellEditor>                                 </td>                                 <td pEditableColumn>                                     <p-cellEditor>                                         <ng-template pTemplate=\"input\">                                              <p-spinner [(ngModel)]=\"grade.max_score\" name=\"grade_max\" [min]=\"0\"></p-spinner>                                         </ng-template>                                         <ng-template pTemplate=\"output\">                                             {{grade.max_score}}                                         </ng-template>                                     </p-cellEditor>                                 </td>                             </tr>                         </ng-template>                     </p-table>                     <div *ngIf=\"grades | validateGrade:setting.scale\" class=\"ui-message ui-messages-error ui-corner-all\">                         {{'Invalid grade options' | translate}}                     </div>                 </div>             </div>         </form>     </p-scrollPanel>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ExamSettingDialog);
    return ExamSettingDialog;
}(base_component_1.BaseComponent));
exports.ExamSettingDialog = ExamSettingDialog;
