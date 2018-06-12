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
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var class_exam_model_1 = require("../../../shared/models/elearning/class-exam.model");
var exam_dialog_component_1 = require("../../../assessment/exam/exam-dialog/exam-dialog.component");
var class_exam_enroll_dialog_component_1 = require("../class-exam-enroll/class-exam-enroll.dialog.component");
var exam_content_dialog_component_1 = require("../../../cms/exam/content-dialog/exam-content.dialog.component");
var router_1 = require("@angular/router");
var ClassExamListDialog = (function (_super) {
    __extends(ClassExamListDialog, _super);
    function ClassExamListDialog(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.display = false;
        _this.courseClass = new course_class_model_1.CourseClass();
        _this.classExams = [];
        return _this;
    }
    ClassExamListDialog.prototype.show = function (courseClass) {
        this.display = true;
        this.courseClass = courseClass;
        this.loadExams();
    };
    ClassExamListDialog.prototype.loadExams = function () {
        var _this = this;
        class_exam_model_1.ClassExam.listByClass(this, this.courseClass.id).subscribe(function (classExams) {
            _this.classExams = classExams;
        });
    };
    ClassExamListDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassExamListDialog.prototype.enroll = function () {
        var _this = this;
        if (this.selectedClassExam) {
            exam_model_1.Exam.get(this, this.selectedClassExam.exam_id).subscribe(function (exam) {
                _this.examEnrollDialog.show(exam, _this.courseClass);
            });
        }
    };
    ClassExamListDialog.prototype.addExam = function () {
        var _this = this;
        var exam = new exam_model_1.Exam();
        exam.supervisor_id = this.authService.UserProfile.id;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(function () {
            var classExam = new class_exam_model_1.ClassExam();
            classExam.exam_id = exam.id;
            classExam.course_id = _this.courseClass.course_id;
            classExam.class_id = _this.courseClass.id;
            classExam.save(_this).subscribe(function () {
                var member = new exam_member_model_1.ExamMember();
                member.role = "supervisor";
                member.exam_id = _this.selectedClassExam.id;
                member.user_id = _this.authService.UserProfile.id;
                member.date_register = new Date();
                member.status = 'active';
                member.save(_this).subscribe(function () {
                    _this.loadExams();
                });
            });
        });
    };
    ClassExamListDialog.prototype.editExam = function () {
        var _this = this;
        if (this.selectedClassExam) {
            exam_model_1.Exam.get(this, this.selectedClassExam.exam_id).subscribe(function (exam) {
                _this.examDialog.show(exam);
                ;
            });
        }
    };
    ClassExamListDialog.prototype.manageExam = function () {
        var _this = this;
        if (this.selectedClassExam) {
            exam_member_model_1.ExamMember.byExamAndUser(this, this.selectedClassExam.id, this.authService.UserProfile.id).subscribe(function (member) {
                _this.router.navigate(['/lms/exams/manage', _this.selectedClassExam.id, member.id]);
            });
        }
    };
    ClassExamListDialog.prototype.editContent = function () {
        var _this = this;
        if (this.selectedClassExam) {
            exam_model_1.Exam.get(this, this.selectedClassExam.exam_id).subscribe(function (exam) {
                _this.examContentDialog.show(exam);
            });
        }
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ClassExamListDialog.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(class_exam_enroll_dialog_component_1.ClassExamEnrollDialog),
        __metadata("design:type", class_exam_enroll_dialog_component_1.ClassExamEnrollDialog)
    ], ClassExamListDialog.prototype, "examEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], ClassExamListDialog.prototype, "examContentDialog", void 0);
    ClassExamListDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-exam-list-dialog',
            templateUrl: 'class-exam-list.dialog.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ClassExamListDialog);
    return ClassExamListDialog;
}(base_component_1.BaseComponent));
exports.ClassExamListDialog = ClassExamListDialog;
//# sourceMappingURL=class-exam-list.dialog.component.js.map