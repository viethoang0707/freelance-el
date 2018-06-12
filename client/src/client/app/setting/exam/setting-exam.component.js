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
var base_component_1 = require("../../shared/components/base/base.component");
var exam_setting_model_1 = require("../../shared/models/elearning/exam-setting.model");
var exam_grade_model_1 = require("../../shared/models/elearning/exam-grade.model");
var _ = require("underscore");
var base_model_1 = require("../../shared/models/base.model");
var SettingExamComponent = (function (_super) {
    __extends(SettingExamComponent, _super);
    function SettingExamComponent() {
        var _this = _super.call(this) || this;
        _this.setting = new exam_setting_model_1.ExamSetting();
        _this.grades = [];
        return _this;
    }
    SettingExamComponent.prototype.ngOnInit = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_search(this, exam_grade_model_1.ExamGrade.__api__all(), exam_setting_model_1.ExamSetting.__api__all())
            .subscribe(function (jsonArr) {
            _this.grades = exam_grade_model_1.ExamGrade.toArray(jsonArr[0]);
            var settings = exam_setting_model_1.ExamSetting.toArray(jsonArr[1]);
            if (settings.length)
                _this.setting = settings[0];
        });
    };
    SettingExamComponent.prototype.addGrade = function () {
        var grade = new exam_grade_model_1.ExamGrade();
        this.grades.push(grade);
    };
    SettingExamComponent.prototype.removeGrade = function (grade) {
        var _this = this;
        if (grade.id) {
            grade.delete(this).subscribe(function () {
                _this.grades = _.reject(_this.grades, function (obj) {
                    return obj == grade;
                });
            });
        }
        else
            this.grades = _.reject(this.grades, function (obj) {
                return obj == grade;
            });
    };
    SettingExamComponent.prototype.saveExamSetting = function () {
        var _this = this;
        var subscriptions = _.map(this.grades, function (grade) {
            return grade.save(_this);
        });
        subscriptions.push(this.setting.save(this));
        Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
            _this.success('Setting saved successfully');
        });
    };
    SettingExamComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'setting-exam',
            templateUrl: 'setting-exam.component.html',
            styleUrls: ['setting-exam.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SettingExamComponent);
    return SettingExamComponent;
}(base_component_1.BaseComponent));
exports.SettingExamComponent = SettingExamComponent;
//# sourceMappingURL=setting-exam.component.js.map