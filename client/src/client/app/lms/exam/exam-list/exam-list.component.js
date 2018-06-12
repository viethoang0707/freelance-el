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
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var exam_content_dialog_component_1 = require("../../../cms/exam/content-dialog/exam-content.dialog.component");
var exam_study_dialog_component_1 = require("../exam-study/exam-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var router_1 = require("@angular/router");
var ExamListComponent = (function (_super) {
    __extends(ExamListComponent, _super);
    function ExamListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.exams = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    ExamListComponent.prototype.ngOnInit = function () {
        this.loadExam();
    };
    ExamListComponent.prototype.loadExam = function () {
        var _this = this;
        exam_member_model_1.ExamMember.listByUser(this, this.authService.UserProfile.id).subscribe(function (members) {
            members = _.filter(members, (function (member) {
                return (member.exam_id && member.status == 'active');
            }));
            submission_model_1.Submission.listByUser(_this, _this.authService.UserProfile.id).subscribe(function (submits) {
                var examIds = _.pluck(members, 'exam_id');
                exam_model_1.Exam.array(_this, examIds)
                    .subscribe(function (exams) {
                    _.each(exams, function (exam) {
                        exam.member = _.find(members, function (member) {
                            return member.exam_id == exam.id;
                        });
                        exam.submit = _.find(submits, function (submit) {
                            return submit.member_id == exam.member.id && submit.exam_id == exam.id;
                        });
                        if (exam.submit) {
                            if (exam.submit.score != null)
                                exam.score = exam.submit.score;
                            else
                                exam.score = '';
                        }
                        exam_question_model_1.ExamQuestion.countByExam(_this, exam.id).subscribe(function (count) {
                            exam.question_count = count;
                        });
                        exam.examMemberData = {};
                        exam_member_model_1.ExamMember.listByExam(_this, exam.id).subscribe(function (members) {
                            exam.examMemberData = _this.reportUtils.analyseExamMember(exam, members);
                        });
                    });
                    _this.exams = _.filter(exams, function (exam) {
                        return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.IsAvailable);
                    });
                    _this.exams.sort(function (exam1, exam2) {
                        if (exam1.id > exam2.id)
                            return -1;
                        else if (exam1.id < exam2.id)
                            return 1;
                        else
                            return 0;
                    });
                });
            });
        });
    };
    ExamListComponent.prototype.manageExam = function (exam, member) {
        var now = new Date();
        if (exam.start && exam.start.getTime() > now.getTime()) {
            this.warn('Exam has not been started');
            return;
        }
        if (exam.end && exam.end.getTime() < now.getTime()) {
            this.warn('Exam has ended');
            return;
        }
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    };
    ExamListComponent.prototype.editContent = function (exam) {
        this.examContentDialog.show(exam);
    };
    ExamListComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: function () {
                _this.examStudyDialog.show(exam, member);
            }
        });
    };
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], ExamListComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_study_dialog_component_1.ExamStudyDialog),
        __metadata("design:type", exam_study_dialog_component_1.ExamStudyDialog)
    ], ExamListComponent.prototype, "examStudyDialog", void 0);
    ExamListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-exam-list',
            templateUrl: 'exam-list.component.html',
            styleUrls: ['exam-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ExamListComponent);
    return ExamListComponent;
}(base_component_1.BaseComponent));
exports.ExamListComponent = ExamListComponent;
//# sourceMappingURL=exam-list.component.js.map