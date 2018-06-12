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
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_dialog_component_1 = require("../exam-dialog/exam-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var ExamListComponent = (function (_super) {
    __extends(ExamListComponent, _super);
    function ExamListComponent() {
        var _this = _super.call(this) || this;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.header = constants_1.SCHEDULER_HEADER;
        return _this;
    }
    ExamListComponent.prototype.enrollExam = function () {
        if (this.selectedExam)
            this.examEnrollDialog.enroll(this.selectedExam);
    };
    ExamListComponent.prototype.ngOnInit = function () {
        this.loadExams();
    };
    ExamListComponent.prototype.addExam = function () {
        var _this = this;
        var exam = new exam_model_1.Exam();
        exam.supervisor_id = this.authService.UserProfile.id;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(function () {
            _this.loadExams();
        });
    };
    ExamListComponent.prototype.editExam = function () {
        if (this.selectedExam)
            this.examDialog.show(this.selectedExam);
    };
    ExamListComponent.prototype.deleteExam = function () {
        var _this = this;
        if (this.selectedExam)
            this.confirm('Are you sure to delete ?', function () {
                _this.selectedExam.delete(_this).subscribe(function () {
                    _this.loadExams();
                    _this.selectedExam = null;
                });
            });
    };
    ExamListComponent.prototype.onDayClick = function () {
        this.addExam();
    };
    ExamListComponent.prototype.onEventClick = function (event) {
        var examId = event.calEvent.id;
        this.selectedExam = _.find(this.exams, function (exam) {
            return exam.id == examId;
        });
        this.editExam();
    };
    ExamListComponent.prototype.loadExams = function () {
        var _this = this;
        exam_model_1.Exam.all(this).subscribe(function (exams) {
            _this.exams = exams;
            _this.events = _.map(exams, function (exam) {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                };
            });
            _this.exams.sort(function (exam1, exam2) {
                return exam1.id < exam2.id;
            });
        });
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ExamListComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.ExamEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.ExamEnrollDialog)
    ], ExamListComponent.prototype, "examEnrollDialog", void 0);
    ExamListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-list',
            templateUrl: 'exam-list.component.html',
            styleUrls: ['exam-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ExamListComponent);
    return ExamListComponent;
}(base_component_1.BaseComponent));
exports.ExamListComponent = ExamListComponent;
//# sourceMappingURL=exam-list.component.js.map