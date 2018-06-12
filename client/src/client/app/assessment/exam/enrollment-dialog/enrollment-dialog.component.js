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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var ExamEnrollDialog = (function (_super) {
    __extends(ExamEnrollDialog, _super);
    function ExamEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.EXAM_MEMBER_ROLE = constants_1.EXAM_MEMBER_ROLE;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.EXAM_MEMBER_STATUS = constants_1.EXAM_MEMBER_STATUS;
        return _this;
    }
    ExamEnrollDialog.prototype.enroll = function (exam) {
        this.display = true;
        this.exam = exam;
        this.selectedCandidates = [];
        this.selectedSupervisors = [];
        this.loadMembers();
    };
    ExamEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamEnrollDialog.prototype.addMember = function (role) {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(function (users) {
            if (role == 'candidate') {
                var userIds = _.pluck(users, 'id');
                exam_model_1.Exam.enroll(_this, _this.exam.id, userIds).subscribe(function () {
                    _this.loadMembers();
                });
            }
            else if (role == 'supervisor') {
                var members = _.map(users, function (user) {
                    var member = new exam_member_model_1.ExamMember();
                    member.role = role;
                    member.exam_id = _this.exam.id;
                    member.user_id = user.id;
                    member.date_register = new Date();
                    member.status = 'active';
                });
                exam_member_model_1.ExamMember.createArray(_this, members).subscribe(function () {
                    _this.loadMembers();
                });
            }
        });
    };
    ExamEnrollDialog.prototype.deleteMember = function (members) {
        var _this = this;
        if (members && members.length)
            this.confirm('Are you sure to delete ?', function () {
                exam_member_model_1.ExamMember.deleteArray(_this, members).subscribe(function () {
                    _this.selectedCandidates = [];
                    _this.selectedSupervisors = [];
                    _this.loadMembers();
                });
            });
    };
    ExamEnrollDialog.prototype.loadMembers = function () {
        var _this = this;
        exam_member_model_1.ExamMember.listByExam(this, this.exam.id).subscribe(function (members) {
            _this.candidates = _.filter(members, function (member) {
                return member.role == 'candidate';
            });
            _this.supervisors = _.filter(members, function (member) {
                return member.role == 'supervisor';
            });
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], ExamEnrollDialog.prototype, "usersDialog", void 0);
    ExamEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-enrollment-dialog',
            templateUrl: 'enrollment-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ExamEnrollDialog);
    return ExamEnrollDialog;
}(base_dialog_1.BaseDialog));
exports.ExamEnrollDialog = ExamEnrollDialog;
//# sourceMappingURL=enrollment-dialog.component.js.map